package com.focusr.Precot.mssql.database.service.bleaching;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
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
import com.focusr.Precot.mssql.database.model.bleaching.BleachAppliedContAbCottonF08;
import com.focusr.Precot.mssql.database.model.bleaching.BleachAppliedContAbCottonTypesF08;
import com.focusr.Precot.mssql.database.model.bleaching.BleachHouseKeepingCheckListF02;
import com.focusr.Precot.mssql.database.model.bleaching.BleachHouseKeepingCheckListF02A;
import com.focusr.Precot.mssql.database.model.bleaching.BleachJobCardF13;
import com.focusr.Precot.mssql.database.model.bleaching.BleachMixingChangeMachineCleaningF38;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachAppliedContAbCottonHistoryF08;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachAppliedContAbCottonTypesHistoryF08;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachHouseKeepingCheckListHistoryF02;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachHouseKeepingCheckListHistoryF02A;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachMixingChangeMachineCleaningHistoryF38;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachingJobcard13History;
import com.focusr.Precot.mssql.database.repository.EmailDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachAppliedContAbCottonF08Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachAppliedContAbCottonTypesF08Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachHouseKeepingCheckListF02ARepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachHouseKeepingCheckListF02Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachJobCard13Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachMixingChangeMachineCleaningF38Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachAppliedContAbCottonF08RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachAppliedContAbCottonTypesF08RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachHouseKeepingCheckListF02RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachHouseKeepingCheckListHistoryRepositoryF02A;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachJobCard13RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachMixingChangeMachineCleaningF38RepositoryHistory;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.payload.LovResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.BleachMailFunction;
import com.focusr.Precot.util.EmailHtmlLoader;
import com.focusr.Precot.util.SCAUtil;

/**
 * 
 * @author Sivaprakasam.V
 *
 */

@Service
public class BleachingService4 {

	@Autowired
	EmailHtmlLoader emailhtmlloader;

	@Autowired
	EmailDetailsRepository emaildetailsrepository;

	@Autowired
	BleachMixingChangeMachineCleaningF38Repository bleachmixingchangemachinecleaningf38repository;

	@Autowired
	BleachJobCard13Repository bleachingheaderrepository;

	@Autowired
	UserRepository userrepository;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private BleachAppliedContAbCottonF08Repository bleachappliedcontabcottonf08repository;

	@Autowired
	private BleachAppliedContAbCottonTypesF08Repository bleachappliedcontabcottontypesf08repository;

	@Autowired
	BleachAppliedContAbCottonF08RepositoryHistory appliedCottonF08RepositoryHistory;

	@Autowired
	BleachAppliedContAbCottonTypesF08RepositoryHistory typesF08RepositoryHistory;

	@Autowired
	BleachJobCard13Repository bleachjobcard13repository;

	@Autowired
	BleachJobCard13RepositoryHistory jobCard13RepositoryHistory;

	@Autowired
	BleachHouseKeepingCheckListF02Repository bleachhousekeepingchecklistf02repository;

	@Autowired
	private BleachHouseKeepingCheckListF02RepositoryHistory houseKeepingCheckListF02RepositoryHistory;

	@Autowired
	BleachHouseKeepingCheckListF02ARepository bleachhousekeepingchecklistf02arepository;

	@Autowired
	BleachHouseKeepingCheckListHistoryRepositoryF02A houseKeepingCheckListF02ARepositoryHistory;

	@Autowired
	BleachMixingChangeMachineCleaningF38RepositoryHistory mixingHistoryRepo;

	@Autowired
	BleachMailFunction bleachmailfunction;

	@Autowired
	private UserImageDetailsRepository imageRepository;

	SCAUtil sca = new SCAUtil();

	Logger log = LoggerFactory.getLogger(BleachingService4.class);

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> saveMixchMachineF38(BleachMixingChangeMachineCleaningF38 details,
			HttpServletRequest http) {
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (userRole.equals("ROLE_SUPERVISOR")) {

				details.setSupervisor_status(AppConstants.supervisorSave);
				details.setSupervisor_saved_on(date);
				details.setSupervisor_saved_by(userName);
				details.setSupervisor_saved_id(userId);

				bleachmixingchangemachinecleaningf38repository.save(details);

			} else if (userRole.equals("ROLE_HOD") || "ROLE_DESIGNEE".equals(userRole)) {

				details.setHod_status(AppConstants.hodSave);
				details.setHod_saved_on(date);
				details.setHod_saved_by(userName);
				details.setHod_saved_id(userId);

				bleachmixingchangemachinecleaningf38repository.save(details);
			}

			else {
				return new ResponseEntity<>(new ApiResponse(false, "Please log in with the correct role"),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to Save Mix Machine F38 Details!", e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Mix Machine F38 Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> submitMixchMachineF38(BleachMixingChangeMachineCleaningF38 details,
			HttpServletRequest http) {

		try {

			String userRole = getUserRole();

			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			String userName = userrepository.getUserName(userId);

			if (userRole.equals("ROLE_SUPERVISOR")) {

				details.setSupervisor_status(AppConstants.supervisorApprovedStatus);

				LocalDateTime currentDate = LocalDateTime.now();
				// Convert LocalDateTime to Date
				Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
				details.setSupervisor_submit_on(date);
				details.setSupervisor_submit_by(userName);
				details.setSupervisor_submit_id(userId);
				details.setSupervisor_sign(userName);
				details.setHod_status(AppConstants.waitingStatus);
				details.setMail_status(AppConstants.waitingStatus);

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
				details.setSupervisisorSignature(signature);

				bleachmixingchangemachinecleaningf38repository.save(details);

				// HISTORY
				BleachMixingChangeMachineCleaningHistoryF38 mixingChangeMachineCleaningHistoryF38 = new BleachMixingChangeMachineCleaningHistoryF38();

				BeanUtils.copyProperties(details, mixingChangeMachineCleaningHistoryF38);

				String frombmr = mixingChangeMachineCleaningHistoryF38.getBmr_no_from();
				String tobmr = mixingChangeMachineCleaningHistoryF38.getBmr_no_to();
				String dateB = mixingChangeMachineCleaningHistoryF38.getDate();

				int version = mixingHistoryRepo.getMaximumVersion(frombmr, tobmr, dateB).map(temp -> temp + 1)
						.orElse(1);

				mixingChangeMachineCleaningHistoryF38.setVersion(version);

				mixingHistoryRepo.save(mixingChangeMachineCleaningHistoryF38);

				// mail
				try {

					bleachmailfunction.sendEmailToHODF38(details);
				} catch (Exception ex) {
					return new ResponseEntity<>(
							new ApiResponse(false, "Supervisor Approved but Unable to send mail to HOD! "),
							HttpStatus.OK);
				}
			}

			else {
				return new ResponseEntity<>(new ApiResponse(false, "Please log in with the correct role"),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

		}

		catch (Exception e) {

			log.error("***************** Unable to Submit  Mix Machine F38 Details!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, " Unable to Submit  Mix Machine F38 Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getMixchMachineF38(Long id) {

		try {

			List<BleachMixingChangeMachineCleaningF38> getJobcardDetails = bleachmixingchangemachinecleaningf38repository
					.getAlldetails(id);

			if (getJobcardDetails == null) {

				getJobcardDetails = new ArrayList<BleachMixingChangeMachineCleaningF38>();
			}

			return new ResponseEntity<>(getJobcardDetails, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Job Card Details: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	// Approve

	public ResponseEntity<?> approveRejectF38(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		BleachMixingChangeMachineCleaningF38 bleachCheckListF42 = new BleachMixingChangeMachineCleaningF38();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			bleachCheckListF42 = bleachmixingchangemachinecleaningf38repository
					.getMachineCleanF38(approvalResponse.getId());

			BleachMixingChangeMachineCleaningHistoryF38 bleachLayDownCheckListF42History = new BleachMixingChangeMachineCleaningHistoryF38();

			String supervisiorStatus = bleachCheckListF42.getSupervisor_status();

			String hodStatus = bleachCheckListF42.getHod_status();

			UserImageDetails imageDetails = new UserImageDetails();

			if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						bleachCheckListF42.setHod_status(AppConstants.hodApprovedStatus);
						bleachCheckListF42.setHod_submit_on(date);
						bleachCheckListF42.setHod_submit_by(userName);
						bleachCheckListF42.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachCheckListF42.setSupervisisorSignature(signature);

						bleachCheckListF42.setHod_sign(userName);

						bleachmixingchangemachinecleaningf38repository.save(bleachCheckListF42);

						bleachLayDownCheckListF42History = mixingHistoryRepo.fetchLastSubmittedRecordLaydown(
								bleachCheckListF42.getBmr_no_from(), bleachCheckListF42.getBmr_no_to(),
								bleachCheckListF42.getDate());

						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_sign(userName);

						mixingHistoryRepo.save(bleachLayDownCheckListF42History);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						bleachCheckListF42.setReason(reason);
						bleachCheckListF42.setHod_status(AppConstants.hodRejectedStatus);
						bleachCheckListF42.setHod_submit_on(date);
						bleachCheckListF42.setHod_submit_by(userName);
						bleachCheckListF42.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachCheckListF42.setHodSignature(signature);

						bleachCheckListF42.setHod_sign(userName);

						bleachmixingchangemachinecleaningf38repository.save(bleachCheckListF42);

						bleachLayDownCheckListF42History = mixingHistoryRepo.fetchLastSubmittedRecordLaydown(
								bleachCheckListF42.getBmr_no_from(), bleachCheckListF42.getBmr_no_to(),
								bleachCheckListF42.getDate());

						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_sign(userName);

						mixingHistoryRepo.save(bleachLayDownCheckListF42History);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Submitted"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/reject Hydro Extractor Record " + msg),
					HttpStatus.BAD_REQUEST);

		}

	}

	// Caking List......
	public ResponseEntity<?> getSuperviserF38(HttpServletRequest http) {

		List<BleachMixingChangeMachineCleaningF38> Details = null;

		Long userId = sca.getUserIdFromRequest(http, tokenProvider);

		try {

//			Details = bleachmixingchangemachinecleaningf38repository.findAll();
//			Details = bleachmixingchangemachinecleaningf38repository.getSupervisorSummeryDetails(userId);
			Details = bleachmixingchangemachinecleaningf38repository.getSupervisorSummeryDetails();

			if (Details == null) {

				Details = new ArrayList<BleachMixingChangeMachineCleaningF38>();
			}

		} catch (Exception e) {

			log.error(
					"***************** Unable to  get Supervisor Summery Mix Machine F38 F38 Form Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, " Unable to get Supervisor Summery Mix Machine F38 F38 Form Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(Details, HttpStatus.OK);

	}

	// Caking List......
	public ResponseEntity<?> getHodSummeryF38(HttpServletRequest http) {

		List<BleachMixingChangeMachineCleaningF38> Details = null;

//			  Long userId = sca.getUserIdFromRequest(http, tokenProvider);

		try {

//				Details = bleachmixingchangemachinecleaningf38repository.findAll();
			Details = bleachmixingchangemachinecleaningf38repository.getHodSummeryDetails();

			if (Details == null) {

				Details = new ArrayList<BleachMixingChangeMachineCleaningF38>();
			}

		} catch (Exception e) {

			log.error("***************** Unable to get List Of All F38 Form Details!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, "Unable to get List Of All Caking Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(Details, HttpStatus.OK);

	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> UpdateHodMixchMachineF38(BleachMixingChangeMachineCleaningF38 details,
			HttpServletRequest http) {

		try {

			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			String userName = userrepository.getUserName(userId);
//
//			details.setHod_status(AppConstants.submitStatus);
//
//			details.setHod_approve_status(AppConstants.waitingStatus);

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			details.setHod_submit_on(date);
			details.setHod_submit_by(userName);
//			details.setHod_sign(userName);

			bleachmixingchangemachinecleaningf38repository.save(details);

			return new ResponseEntity<>(details, HttpStatus.OK);

		}

		catch (Exception e) {

			log.error("*****************  Unable to Submit  Mix Machine F38 Details! *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, " Unable to Submit  Mix Machine F38 Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getListOfF38() {

		List<BleachMixingChangeMachineCleaningF38> Details = null;

		try {

			Details = bleachmixingchangemachinecleaningf38repository.getHodSummeryDetails();

			if (Details == null) {

				Details = new ArrayList<BleachMixingChangeMachineCleaningF38>();
			}

		} catch (Exception e) {

			log.error(
					"*****************  Unable to  get Hod Summery Mix Machine F38 F38 Form Details! *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "  Unable to  get Hod Summery Mix Machine F38 F38 Form Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(Details, HttpStatus.OK);

	}

//
//
//	public ResponseEntity<?> getBmrFromToSummeryF38(String date, String bmrFrom, String bmrTo,
//			HttpServletRequest http) {
//		List<BleachMixingChangeMachineCleaningF38> details = null;
//		try {
//			String userRole = getUserRole();
//
//			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//
//			details = bleachmixingchangemachinecleaningf38repository.getDetailsbmrFromTo(date, bmrFrom, bmrTo);
//
//			return new ResponseEntity<>(details, HttpStatus.OK);
//		} catch (Exception e) {
//			return new ResponseEntity<>(" Unable to  get Details Mix Machine F38 F38 Form Details! " + e.getMessage(),
//					HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}

	public ResponseEntity<?> getBmrFromToSummeryF38(String date, String bmrFrom, String bmrTo,
			HttpServletRequest http) {
		List<BleachMixingChangeMachineCleaningF38> details = null;
		try {
			String userRole = getUserRole();

			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			details = bleachmixingchangemachinecleaningf38repository.getDetailsbmrFromTo(date, bmrFrom, bmrTo);

			if (details == null || details.isEmpty()) {
				return new ResponseEntity<>("No Data Found !!!", HttpStatus.OK);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(" Unable to  get Details Mix Machine F38 F38 Form Details! " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<?> getdetailsBsedonDateF38(String date, HttpServletRequest http) {
		List<BleachMixingChangeMachineCleaningF38> details = null;
		try {
			String userRole = getUserRole();

			{

				details = bleachmixingchangemachinecleaningf38repository.getDateBaseSummDetails(date);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Job Card Details: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

//	public ResponseEntity<?> ApproveOrRejectMixchMachineF38(Long id, ApprovalResponse response,
//			HttpServletRequest http) {
//		try {
//
//			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//
//			String userName = userrepository.getUserName(userId);
//
//			List<BleachMixingChangeMachineCleaningF38> getDetails = bleachmixingchangemachinecleaningf38repository
//					.getAlldetails(id);
//
//			for (BleachMixingChangeMachineCleaningF38 setDetails : getDetails) {
//
//				if (response.getApprovalStatus().equalsIgnoreCase("approve")) {
//
//					setDetails.setHod_approve_status(AppConstants.approve);
//					setDetails.setHod_approve_on(
//							Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
//					setDetails.setHod_sign(userName);
//
//					bleachmixingchangemachinecleaningf38repository.save(setDetails);
//				} else if (response.getApprovalStatus().equalsIgnoreCase("reject")) {
//					setDetails.setHod_approve_status(AppConstants.reject);
//					setDetails.setHod_approve_on(
//							Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
//					setDetails.setHod_sign(userName);
//
//					bleachmixingchangemachinecleaningf38repository.save(setDetails);
//				}
//			}
//
//			return new ResponseEntity<>(getDetails, HttpStatus.OK);
//		} catch (Exception e) {
//			return new ResponseEntity<>("Error Approving/Rejection Mixch Machine F38: " + e.getMessage(),
//					HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}

	/////////////////////////////////////

	public ResponseEntity<?> saveBleachingJobCardF13(BleachJobCardF13 details, HttpServletRequest http) {

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			if (userRole.equals("ROLE_SUPERVISOR")) {

				details.setSupervisor_status(AppConstants.supervisorSave);
				details.setSupervisor_saved_on(date);
				details.setSupervisor_saved_by(userName);
				details.setSupervisor_saved_id(userId);

				bleachingheaderrepository.save(details);

			}

			else if (userRole.equals("ROLE_HOD") || "ROLE_DESIGNEE".equals(userRole)) {

				details.setHod_status(AppConstants.hodSave);
				details.setHod_saved_on(date);
				details.setHod_saved_by(userName);
				details.setHod_saved_id(userId);

				bleachingheaderrepository.save(details);

			}

			else if (userRole.equals("ROLE_QA") || userRole.equalsIgnoreCase("QA_INSPECTOR")) {

				details.setQa_status(AppConstants.qaSave);
				details.setQa_saved_on(date);
				details.setQa_saved_by(userName);
				details.setQa_saved_id(userId);

				bleachingheaderrepository.save(details);

			}

			else {
				return new ResponseEntity<>(new ApiResponse(false, "Please log in with the correct role"),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("***************** Unable to Save  Bleach Job Card F13 Details!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, "Unable to Save  Bleach Job Card F13 Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> submitBleachingJobCardF13(BleachJobCardF13 details, HttpServletRequest http) {

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			if (userRole.equals("ROLE_SUPERVISOR")) {

				details.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				details.setSupervisor_submit_on(date);
				details.setSupervisor_submit_by(userName);
				details.setSupervisor_submit_id(userId);
				details.setSupervisor_sign(userName);
				details.setQa_status(AppConstants.waitingStatus);
				details.setQa_mail_status(AppConstants.waitingStatus);

				details.setHod_status("");

				// IMAGE
				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
				details.setSupervisisorSignature(signature);

				bleachingheaderrepository.save(details);

				// HISTORY
				BleachingJobcard13History jobcard13History = new BleachingJobcard13History();

				BeanUtils.copyProperties(details, jobcard13History);

				String bmr = jobcard13History.getBmr_no();

				String bat = jobcard13History.getSub_batch_no();

				int version = jobCard13RepositoryHistory.getMaximumVersion(bmr, bat).map(temp -> temp + 1).orElse(1);

				jobcard13History.setVersion(version);

				jobCard13RepositoryHistory.save(jobcard13History);

				try {

					bleachmailfunction.sendEmailToHODF13(details);
				} catch (Exception ex) {
					return new ResponseEntity<>(
							new ApiResponse(false, "Supervisor Approved but Unable to send mail to QA! "),
							HttpStatus.OK);
				}
			}

//			else if (userRole.equals("ROLE_HOD") || "ROLE_DESIGNEE".equals(userRole)) {
//
//				if (AppConstants.supervisorApprovedStatus.equals(details.getSupervisor_status())) {
//
//					details.setHod_status(AppConstants.hodApprovedStatus);
//					details.setHod_submit_on(date);
//					details.setHod_submit_by(userName);
//					details.setHod_submit_id(userId);
//					details.setHod_sign(userName);
//					details.setQa_status(AppConstants.waitingStatus);
//					details.setQa_mail_status(AppConstants.waitingStatus);
//
//					bleachingheaderrepository.save(details);
//					try {
//
//						bleachmailfunction.sendEmailToQAF13(details);
//					} catch (Exception ex) {
//						return new ResponseEntity<>(
//								new ApiResponse(false, "Supervisor Approved but Unable to send mail to HOD! " + ex),
//								HttpStatus.OK);
//					}
//
//				}
//
//				else {
//					return new ResponseEntity<>(new ApiResponse(false, "Role_Supervisor is not Approve"),
//							HttpStatus.FORBIDDEN);
//				}
//			}

//			else if (userRole.equals("ROLE_QA")) {
//
//				if (AppConstants.hodApprovedStatus.equals(details.getHod_status())) {
//
//					details.setQa_status(AppConstants.qaApprovedStatus);
//					details.setQa_submit_on(date);
//					details.setQa_submit_by(userName);
//					details.setQa_submit_id(userId);
//					details.setQa_sign(userName);
//
//					bleachingheaderrepository.save(details);
//
//				}
//
//				else {
//					return new ResponseEntity<>(new ApiResponse(false, "Role_Hod is not Approve"),
//							HttpStatus.FORBIDDEN);
//				}
//
//			}

			else {
				return new ResponseEntity<>(new ApiResponse(false, "Please log in with the correct role"),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

		} catch (Exception e) {

			log.error("***************** Unable to Submit  Bleach Job Card F13 Details!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit  Bleach Job Card F13 Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> approveRejectF13(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		BleachJobCardF13 bleachCheckListF42 = new BleachJobCardF13();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			bleachCheckListF42 = bleachjobcard13repository.getBleachJobcardById(approvalResponse.getId());

			BleachingJobcard13History bleachLayDownCheckListF42History = new BleachingJobcard13History();

			String supervisiorStatus = bleachCheckListF42.getSupervisor_status();

			String hodStatus = bleachCheckListF42.getHod_status();

			String qaStatus = bleachCheckListF42.getQa_status();

			UserImageDetails imageDetails = new UserImageDetails();

			if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
					&& qaStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_QA") || userRole.equalsIgnoreCase("QA_INSPECTOR")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						bleachCheckListF42.setQa_status(AppConstants.qaApprovedStatus);
						bleachCheckListF42.setQa_submit_on(date);
						bleachCheckListF42.setQa_submit_by(userName);
						bleachCheckListF42.setQa_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachCheckListF42.setQaSignature(signature);

						bleachCheckListF42.setQa_sign(userName);

						bleachCheckListF42.setHod_status(AppConstants.waitingStatus);

						bleachjobcard13repository.save(bleachCheckListF42);

						bleachLayDownCheckListF42History = jobCard13RepositoryHistory.fetchLastSubmittedRecordLaydown(
								bleachCheckListF42.getBmr_no(), bleachCheckListF42.getSub_batch_no());

						bleachLayDownCheckListF42History.setQa_status(AppConstants.qaApprovedStatus);
						bleachLayDownCheckListF42History.setQa_submit_on(date);
						bleachLayDownCheckListF42History.setQa_submit_by(userName);
						bleachLayDownCheckListF42History.setQa_submit_id(userId);
						bleachLayDownCheckListF42History.setQa_sign(userName);

						bleachLayDownCheckListF42History.setHod_status(AppConstants.waitingStatus);

						jobCard13RepositoryHistory.save(bleachLayDownCheckListF42History);

						return new ResponseEntity<>(new ApiResponse(true, "QA Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						bleachCheckListF42.setReason(reason);
						bleachCheckListF42.setQa_status(AppConstants.qaRejectedStatus);
						bleachCheckListF42.setQa_submit_on(date);
						bleachLayDownCheckListF42History.setQa_submit_id(userId);
						bleachCheckListF42.setQa_submit_by(userName);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachCheckListF42.setQaSignature(signature);

						bleachCheckListF42.setQa_sign(userName);

						bleachjobcard13repository.save(bleachCheckListF42);

						bleachLayDownCheckListF42History = jobCard13RepositoryHistory.fetchLastSubmittedRecordLaydown(
								bleachCheckListF42.getBmr_no(), bleachCheckListF42.getSub_batch_no());

						bleachLayDownCheckListF42History.setQa_status(AppConstants.qaRejectedStatus);
						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setQa_submit_on(date);
						bleachLayDownCheckListF42History.setQa_submit_by(userName);
						bleachLayDownCheckListF42History.setQa_submit_id(userId);
						bleachLayDownCheckListF42History.setQa_sign(userName);

						jobCard13RepositoryHistory.save(bleachLayDownCheckListF42History);

						return new ResponseEntity<>(new ApiResponse(true, "QA Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid"), HttpStatus.BAD_REQUEST);
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else if (qaStatus.equalsIgnoreCase(AppConstants.qaApprovedStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						bleachCheckListF42.setHod_status(AppConstants.hodApprovedStatus);
						bleachCheckListF42.setHod_submit_on(date);
						bleachCheckListF42.setHod_submit_by(userName);
						bleachCheckListF42.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachCheckListF42.setSupervisisorSignature(signature);

						bleachCheckListF42.setHod_sign(userName);

						bleachjobcard13repository.save(bleachCheckListF42);

						bleachLayDownCheckListF42History = jobCard13RepositoryHistory.fetchLastSubmittedRecordLaydown(
								bleachCheckListF42.getBmr_no(), bleachCheckListF42.getSub_batch_no());

						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_sign(userName);

						jobCard13RepositoryHistory.save(bleachLayDownCheckListF42History);

						return new ResponseEntity<>(new ApiResponse(true, "Hod Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						bleachCheckListF42.setReason(reason);
						bleachCheckListF42.setHod_status(AppConstants.hodRejectedStatus);
						bleachCheckListF42.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachCheckListF42.setHod_submit_by(userName);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachCheckListF42.setHodSignature(signature);

						bleachCheckListF42.setHod_sign(userName);

						bleachjobcard13repository.save(bleachCheckListF42);

						bleachLayDownCheckListF42History = jobCard13RepositoryHistory.fetchLastSubmittedRecordLaydown(
								bleachCheckListF42.getBmr_no(), bleachCheckListF42.getSub_batch_no());

						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_sign(userName);

						jobCard13RepositoryHistory.save(bleachLayDownCheckListF42History);

						return new ResponseEntity<>(new ApiResponse(true, "Hod Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Submitted"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/reject Hydro Extractor Record " + msg),
					HttpStatus.BAD_REQUEST);

		}

	}

	public ResponseEntity<?> getBmrDetails13(String bmr_no) {

		try {

			List<BleachJobCardF13> getJobcardDetails = bleachingheaderrepository.getBmrDetails(bmr_no);

			if (getJobcardDetails == null) {

				getJobcardDetails = new ArrayList<BleachJobCardF13>();
			}

			return new ResponseEntity<>(getJobcardDetails, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Bmr Details Details: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	public ResponseEntity<?> getApprovedBmrDetails13(String bmr_no) {

		try {

			List<BleachJobCardF13> getJobcardDetails = bleachingheaderrepository.getApprovedBmrDetails13(bmr_no);

			if (getJobcardDetails == null || getJobcardDetails.isEmpty()) {

				return new ResponseEntity<>(new ApiResponse(false, "Qa not yet Approved for this Bmr No" + bmr_no),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(getJobcardDetails, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Bmr Details Details: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	// Caking List......
	public ResponseEntity<?> getBleachingJobSupervisorSummeryF13(HttpServletRequest http) {

		List<BleachJobCardF13> Details = null;

		Long userId = sca.getUserIdFromRequest(http, tokenProvider);

		try {

			Details = bleachjobcard13repository.getBleachSupervisorSummeryDetails();

			if (Details == null) {

				Details = new ArrayList<BleachJobCardF13>();
			}

		} catch (Exception e) {

			log.error(
					"***************** Unable to get  Bleaching Job Card F13  Supervisor Summery Form Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false,
							"Unable to get  Bleaching Job Card F13  Supervisor Summery Form Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(Details, HttpStatus.OK);

	}

	// Caking List......
	public ResponseEntity<?> geBleachingJobtHodSummeryF13(HttpServletRequest http) {

		List<BleachJobCardF13> Details = null;

		try {

//								Details = bleachmixingchangemachinecleaningf38repository.findAll();
			Details = bleachjobcard13repository.getBleachHodSummeryDetails();

			if (Details == null) {

				Details = new ArrayList<BleachJobCardF13>();
			}

		} catch (Exception e) {

			log.error(
					"***************** Unable to get  Bleaching Job Card F13  Hod Summery Form Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get  Bleaching Job Card F13  Hod Summery Form Details!  " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(Details, HttpStatus.OK);

	}

	// Caking List......
	public ResponseEntity<?> geBleachingJobQaSummeryF13(HttpServletRequest http) {

		List<BleachJobCardF13> Details = null;

		try {

//										Details = bleachmixingchangemachinecleaningf38repository.findAll();
			Details = bleachjobcard13repository.getBleachQaSummeryDetails();

			if (Details == null) {

				Details = new ArrayList<BleachJobCardF13>();
			}

		} catch (Exception e) {

			log.error(
					"***************** Unable to get  Bleaching Job Card F13  Qa Summery Form Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get  Bleaching Job Card F13  Qa Summery Form Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(Details, HttpStatus.OK);

	}

	public ResponseEntity<?> getBmrbatchDetails13(String bmr_no, String batchNo) {

		try {

			List<BleachJobCardF13> getJobcardDetails = bleachingheaderrepository.getBmrBatchDetails(bmr_no, batchNo);

			if (getJobcardDetails == null) {

				getJobcardDetails = new ArrayList<BleachJobCardF13>();
			}

			return new ResponseEntity<>(getJobcardDetails, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Bmr batch Details Details: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	public ResponseEntity<?> getLastSubbatchNo13() {

		List<Map<String, Object>> getLastSubbatchNo;

		try {

			getLastSubbatchNo = bleachingheaderrepository.getLastSubbatchNo();

		} catch (Exception ex) {

			String msg = ex.getMessage();

			log.error("Unable to get Ladt Sub Batch Details" + msg);

			return new ResponseEntity(new ApiResponse(false, "Unable to get Ladt Sub Batch Details" + msg),

					HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(getLastSubbatchNo, HttpStatus.OK);

	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> createOrUpdateAppliedRawCotton(BleachAppliedContAbCottonF08 bleachappliedcontabcottonf08,
			HttpServletRequest http) {

		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (userRole.equals("ROLE_SUPERVISOR")) {

				bleachappliedcontabcottonf08.setSupervisor_status(AppConstants.supervisorSave);
				bleachappliedcontabcottonf08.setSupervisor_saved_on(date);
				bleachappliedcontabcottonf08.setSupervisor_saved_by(userName);
				bleachappliedcontabcottonf08.setSupervisor_saved_id(userId);

				bleachappliedcontabcottonf08repository.save(bleachappliedcontabcottonf08);

				for (BleachAppliedContAbCottonTypesF08 lineDetails : bleachappliedcontabcottonf08
						.getDetailsAbCottonF04()) {

					Long abId = bleachappliedcontabcottonf08.getAb_id();

					lineDetails.setAb_id(abId);

					bleachappliedcontabcottontypesf08repository.save(lineDetails);

				}

			}

			else if (userRole.equals("ROLE_HOD") || "ROLE_DESIGNEE".equals(userRole)) {

				bleachappliedcontabcottonf08.setHod_status(AppConstants.hodSave);
				bleachappliedcontabcottonf08.setHod_saved_on(date);
				bleachappliedcontabcottonf08.setHod_saved_by(userName);
				bleachappliedcontabcottonf08.setHod_saved_id(userId);

				bleachappliedcontabcottonf08repository.save(bleachappliedcontabcottonf08);

				for (BleachAppliedContAbCottonTypesF08 lineDetails : bleachappliedcontabcottonf08
						.getDetailsAbCottonF04()) {

					Long abId = bleachappliedcontabcottonf08.getAb_id();

					lineDetails.setAb_id(abId);

					bleachappliedcontabcottontypesf08repository.save(lineDetails);

				}

			}
			return new ResponseEntity<>(bleachappliedcontabcottonf08, HttpStatus.OK);

		}

		catch (Exception e) {

			log.error("***************** Unable to Save  Applied Cont AB F08 Details! *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, "Unable to Save  Applied Cont AB F08 Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> submitAppliedRawCottonF04(BleachAppliedContAbCottonF08 bleachappliedcontabcottonf08,
			HttpServletRequest http) {

		try {
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			Date date = new Date();

			if (userRole.equals("ROLE_SUPERVISOR")) {
				bleachappliedcontabcottonf08.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				bleachappliedcontabcottonf08.setSupervisor_submit_on(date);
				bleachappliedcontabcottonf08.setSupervisor_submit_by(userName);
				bleachappliedcontabcottonf08.setSupervisor_submit_id(userId);
				bleachappliedcontabcottonf08.setSupervisor_sign(userName);
				bleachappliedcontabcottonf08.setHod_status(AppConstants.waitingStatus);
				bleachappliedcontabcottonf08.setMail_status(AppConstants.waitingStatus);

				// IMAGE
				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
				bleachappliedcontabcottonf08.setSupervisisorSignature(signature);

				bleachappliedcontabcottonf08repository.save(bleachappliedcontabcottonf08);

				for (BleachAppliedContAbCottonTypesF08 lineDetails : bleachappliedcontabcottonf08
						.getDetailsAbCottonF04()) {
					Long abId = bleachappliedcontabcottonf08.getAb_id();
					lineDetails.setAb_id(abId);
					bleachappliedcontabcottontypesf08repository.save(lineDetails);
				}

				// HISTORY
				log.info("Processing history for BMR Number: {} and AB ID: {}",
						bleachappliedcontabcottonf08.getBmrNumber(), bleachappliedcontabcottonf08.getAb_id());
				BleachAppliedContAbCottonHistoryF08 appliedContAbCottonHistoryF08 = new BleachAppliedContAbCottonHistoryF08();
				appliedContAbCottonHistoryF08.setBmrNumber(bleachappliedcontabcottonf08.getBmrNumber());
				appliedContAbCottonHistoryF08.setDate(bleachappliedcontabcottonf08.getDate());
				appliedContAbCottonHistoryF08.setFormatName(bleachappliedcontabcottonf08.getFormatName());
				appliedContAbCottonHistoryF08.setFormatNo(bleachappliedcontabcottonf08.getFormatNo());
				appliedContAbCottonHistoryF08.setSopNumber(bleachappliedcontabcottonf08.getSopNumber());
				appliedContAbCottonHistoryF08.setRevisionNo(bleachappliedcontabcottonf08.getRevisionNo());
				appliedContAbCottonHistoryF08.setTotal_01(bleachappliedcontabcottonf08.getTotal_01());
				appliedContAbCottonHistoryF08.setTotal_02(bleachappliedcontabcottonf08.getTotal_02());

				// STATUS
				appliedContAbCottonHistoryF08.setSupervisor_status(bleachappliedcontabcottonf08.getSupervisor_status());
				appliedContAbCottonHistoryF08.setSupervisor_sign(bleachappliedcontabcottonf08.getSupervisor_sign());
				appliedContAbCottonHistoryF08
						.setSupervisor_submit_on(bleachappliedcontabcottonf08.getSupervisor_submit_on());
				appliedContAbCottonHistoryF08
						.setSupervisor_submit_by(bleachappliedcontabcottonf08.getSupervisor_submit_by());
				appliedContAbCottonHistoryF08
						.setSupervisor_submit_id(bleachappliedcontabcottonf08.getSupervisor_submit_id());
				appliedContAbCottonHistoryF08.setHod_status(bleachappliedcontabcottonf08.getHod_status());

				int version = appliedCottonF08RepositoryHistory
						.getMaximumVersion(appliedContAbCottonHistoryF08.getBmrNumber()).map(temp -> temp + 1)
						.orElse(1);
				log.info("Setting version: {}", version);
				appliedContAbCottonHistoryF08.setVersion(version);

				appliedCottonF08RepositoryHistory.save(appliedContAbCottonHistoryF08);

				// Save history details
				for (BleachAppliedContAbCottonTypesF08 lineDetails : bleachappliedcontabcottonf08
						.getDetailsAbCottonF04()) {

					log.info("Processing history for line detail AB ID: {}", appliedContAbCottonHistoryF08.getAb_id());
					BleachAppliedContAbCottonTypesHistoryF08 types = new BleachAppliedContAbCottonTypesHistoryF08();

					types.setBw1Contamination(lineDetails.getBw1Contamination());
					types.setBw2Contamination(lineDetails.getBw2Contamination());
					types.setBw3Sample(lineDetails.getBw3Sample());
					types.setBw4Sample(lineDetails.getBw4Sample());
					types.setType(lineDetails.getType());
					Long abId = appliedContAbCottonHistoryF08.getAb_id();
					types.setAb_id(abId);

					typesF08RepositoryHistory.save(types);
				}

				try {
					bleachmailfunction.sendEmailToHODF08(bleachappliedcontabcottonf08);
				} catch (Exception ex) {
					log.error("Supervisor approved but unable to send mail to HOD!", ex);
					return new ResponseEntity<>(
							new ApiResponse(false, "Supervisor Approved but Unable to send mail to HOD!"),
							HttpStatus.OK);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Please Login with the Correct Role"),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to Submit Applied Cont AB F08 Details!", e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Applied Cont AB F08 Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}

	}

	// GET BY BMR NUMBER
	public ResponseEntity<?> getAppliedAbCottonByBmrNumber(String bmrNumber, HttpServletRequest http) {

//			BleachAppliedContRawCottonF04 appliedRawCottonList = new BleachAppliedContRawCottonF04();
		List<BleachAppliedContAbCottonF08> Details = new ArrayList<>();

		Long userId = sca.getUserIdFromRequest(http, tokenProvider);

		try {
//			Details = bleachappliedcontabcottonf08repository.appliedRawCottonByBMR(bmrNumber, userId);
			Details = bleachappliedcontabcottonf08repository.appliedRawCottonByBMR(bmrNumber);

			if (Details == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("Unable to get Applied Ab cotton Details by BMR" + msg);

			return new ResponseEntity(new ApiResponse(false, "Unable to get Applied Ab cotton Details by BMR" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(Details, HttpStatus.OK);
	}

	// Caking List......
	public ResponseEntity<?> getAbCottonSuperviserF04(HttpServletRequest http) {

		List<BleachAppliedContAbCottonF08> Details = null;

		Long userId = sca.getUserIdFromRequest(http, tokenProvider);

		try {

//					Details = bleachmixingchangemachinecleaningf38repository.findAll();
			Details = bleachappliedcontabcottonf08repository.getSupervisorSummeryDetails(userId);

			if (Details == null) {

				Details = new ArrayList<BleachAppliedContAbCottonF08>();
			}

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of Ab Cotton F08 supervisor Summery  Form Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false,
							"Unable to get List Of Ab Cotton F08 supervisor Summery  Form Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(Details, HttpStatus.OK);

	}

	// Caking List......
	public ResponseEntity<?> getAbCottonHodSummeryF04(HttpServletRequest http) {

		List<BleachAppliedContAbCottonF08> Details = null;

		try {

//							Details = bleachmixingchangemachinecleaningf38repository.findAll();
			Details = bleachappliedcontabcottonf08repository.getHodSummeryDetails();

			if (Details == null) {

				Details = new ArrayList<BleachAppliedContAbCottonF08>();
			}

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of Ab Cotton F08 Hod Summery  Form Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of Ab Cotton F08 Hod Summery  Form Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(Details, HttpStatus.OK);

	}

	// Approve Or rEJECT

	public ResponseEntity<?> approveRejectF08(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		BleachAppliedContAbCottonF08 bleachCheckListF42 = new BleachAppliedContAbCottonF08();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			bleachCheckListF42 = bleachappliedcontabcottonf08repository.getdetailsById(approvalResponse.getId());

			BleachAppliedContAbCottonHistoryF08 bleachLayDownCheckListF42History = new BleachAppliedContAbCottonHistoryF08();

			String supervisiorStatus = bleachCheckListF42.getSupervisor_status();

			String hodStatus = bleachCheckListF42.getHod_status();

			UserImageDetails imageDetails = new UserImageDetails();

			if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						bleachCheckListF42.setHod_status(AppConstants.hodApprovedStatus);
						bleachCheckListF42.setHod_submit_on(date);
						bleachCheckListF42.setHod_submit_by(userName);
						bleachCheckListF42.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachCheckListF42.setHodSignature(signature);

						bleachCheckListF42.setHod_sign(userName);

						bleachappliedcontabcottonf08repository.save(bleachCheckListF42);

						bleachLayDownCheckListF42History = appliedCottonF08RepositoryHistory
								.fetchLastSubmittedRecordLaydown(bleachCheckListF42.getBmrNumber());

						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_sign(userName);

						appliedCottonF08RepositoryHistory.save(bleachLayDownCheckListF42History);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						bleachCheckListF42.setReason(reason);
						bleachCheckListF42.setHod_status(AppConstants.hodRejectedStatus);
						bleachCheckListF42.setHod_submit_on(date);
						bleachCheckListF42.setHod_submit_by(userName);
						bleachCheckListF42.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachCheckListF42.setHodSignature(signature);

						bleachCheckListF42.setHod_sign(userName);

						bleachappliedcontabcottonf08repository.save(bleachCheckListF42);

						bleachLayDownCheckListF42History = appliedCottonF08RepositoryHistory
								.fetchLastSubmittedRecordLaydown(bleachCheckListF42.getBmrNumber());

						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_sign(userName);

						appliedCottonF08RepositoryHistory.save(bleachLayDownCheckListF42History);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Submitted"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/reject Hydro Extractor Record " + msg),
					HttpStatus.BAD_REQUEST);

		}

	}

//	public ResponseEntity<?> SubmitHouseKeepingF02(BleachHouseKeepingCheckListF02 details, HttpServletRequest http) {
//
//		String userRole = getUserRole();
//		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//		String userName = userrepository.getUserName(userId);
//		LocalDateTime currentDate = LocalDateTime.now();
//		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//		try {
//
//			if (userRole.equals("ROLE_SUPERVISOR")) {
//
//				details.setSupervisor_status(AppConstants.supervisorApprovedStatus);
//				details.setSupervisor_submit_on(date);
//				details.setSupervisor_submit_by(userName);
//				details.setSupervisor_submit_id(userId);
//				details.setSupervisor_sign(userName);
//				details.setHod_status(AppConstants.waitingStatus);
//				details.setMail_status(AppConstants.waitingStatus);
//
//				bleachhousekeepingchecklistf02repository.save(details);
//
//			}
//
//			else if (userRole.equals("ROLE_HR")) {
//
//				details.setHr_status(AppConstants.hodApprovedStatus);
//				details.setHr_submit_on(date);
//				details.setHr_submit_by(userName);
//				details.setHr_submit_id(userId);
//				details.setHr_sign(userName);
//				details.setHod_status(AppConstants.waitingStatus);
//
//				bleachhousekeepingchecklistf02repository.save(details);
//
//			}
//
//			else if (userRole.equals("ROLE_HOD")) {
//
//				details.setHod_status(AppConstants.hodApprovedStatus);
//				details.setHod_submit_on(date);
//				details.setHod_submit_by(userName);
//				details.setHod_submit_id(userId);
//				details.setHod_sign(userName);
//
//				bleachhousekeepingchecklistf02repository.save(details);
//
//			}
//
//			return new ResponseEntity<>(details, HttpStatus.OK);
//		} catch (Exception e) {
//
//			log.error("***************** Unable to Save  Bleach Job Card F13 Details!  *********************\n" + e);
//
//			String msg = sca.getErrorMessage(e);
//
//			return new ResponseEntity(new ApiResponse(false, "Unable to Save  Bleach Job Card F13 Details!" + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//	}

	public ResponseEntity<?> SubmitHouseKeepingF02(BleachHouseKeepingCheckListF02 details, HttpServletRequest http) {
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			switch (userRole) {

			case "ROLE_HR":

//				details.setSupervisor_status(AppConstants.supervisorApprovedStatus);
//				details.setSupervisor_submit_on(date);
//				details.setSupervisor_submit_by(userName);
//				details.setSupervisor_submit_id(userId);
//				details.setSupervisor_sign(userName);
//				details.setHr_status(AppConstants.waitingStatus);
//				details.setHr_mail_status(AppConstants.waitingStatus);
//				details.setHod_status("");

				details.setHr_status(AppConstants.hrApprovedStatus);
				details.setHr_submit_on(date);
				details.setHr_submit_by(userName);
				details.setHr_submit_id(userId);
				details.setHr_sign(userName);
				details.setSupervisor_status(AppConstants.waitingStatus);
				details.setHod_status("");

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				details.setHrSignature(signature);

				bleachhousekeepingchecklistf02repository.save(details);

				// AUDIT

				BleachHouseKeepingCheckListHistoryF02 houseKeepingCheckListHistoryF02 = new BleachHouseKeepingCheckListHistoryF02();

				BeanUtils.copyProperties(details, houseKeepingCheckListHistoryF02);

				String historyDate = houseKeepingCheckListHistoryF02.getDate();

				int version = houseKeepingCheckListF02RepositoryHistory.getMaximumVersion(historyDate)
						.map(temp -> temp + 1).orElse(1);

				houseKeepingCheckListHistoryF02.setVersion(version);

				houseKeepingCheckListF02RepositoryHistory.save(houseKeepingCheckListHistoryF02);

				try {

					bleachmailfunction.sendEmailToHRF02(details);
				} catch (Exception ex) {
					return new ResponseEntity<>(
							new ApiResponse(false, "Supervisor Approved but Unable to send mail to HOD! "),
							HttpStatus.OK);
				}
				break;

//			case "ROLE_HR":
//
//				if (AppConstants.supervisorApprovedStatus.equals(details.getSupervisor_status())) {
//
//					details.setHr_status(AppConstants.hrApprovedStatus);
//					details.setHr_submit_on(date);
//					details.setHr_submit_by(userName);
//					details.setHr_submit_id(userId);
//					details.setHr_sign(userName);
//					details.setHod_status(AppConstants.waitingStatus);
//					details.setMail_status(AppConstants.waitingStatus);
//					
//					bleachhousekeepingchecklistf02repository.save(details);
//
//					try {
//						bleachmailfunction.sendEmailToHODF02(details);
//					} catch (Exception ex) {
//						return new ResponseEntity<>(
//								new ApiResponse(false, "HR Approved but Unable to send mail to HOD! "), HttpStatus.OK);
//					}
//				} else {
//					return new ResponseEntity<>(new ApiResponse(false, "ROLE_SUPERVISOR Is Not Approved"),
//							HttpStatus.BAD_REQUEST);
//				}
//				break;
//
//			case "ROLE_HOD":
//			case "ROLE_DESIGNEE":
//
//				if (AppConstants.hrApprovedStatus.equals(details.getHr_status())) {
//
//					details.setHod_status(AppConstants.hodApprovedStatus);
//					details.setHod_submit_on(date);
//					details.setHod_submit_by(userName);
//					details.setHod_submit_id(userId);
//					details.setHod_sign(userName);
//					bleachhousekeepingchecklistf02repository.save(details);
//
//				}
//
//				else {
//					return new ResponseEntity<>(new ApiResponse(false, "ROLE_HR Is Not Approved"),
//							HttpStatus.BAD_REQUEST);
//				}
//				break;

			default:
				return new ResponseEntity<>(
						new ApiResponse(false, userRole
								+ " cannot submit House keeping forms. please login as Supervisor to submit form"),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity(new ApiResponse(true, "Supervisior Submitted Sucessfully"), HttpStatus.OK);

		} catch (Exception e) {
			log.error(
					"***************** Unable to Submit House Keeping Check List F02 Details!  *********************\n"
							+ e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Submit House Keeping Check List F02 Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getHouseKeepingF02(String date, HttpServletRequest http) {
		List<BleachHouseKeepingCheckListF02> details = null;
		try {
			String userRole = getUserRole();

			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			details = bleachhousekeepingchecklistf02repository.getDetailsBaseDate(date);

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting House KeepingF02: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<?> getHouseKeepingSummeryF02(HttpServletRequest http) {
		List<BleachHouseKeepingCheckListF02> details = null;
		try {
			String userRole = getUserRole();

			if (userRole.equals("ROLE_HR")) {

				Long userId = sca.getUserIdFromRequest(http, tokenProvider);

				details = bleachhousekeepingchecklistf02repository.getHRSummeryDetails();

			} else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				details = bleachhousekeepingchecklistf02repository.getHodSummeryDetails();
			} else if (userRole.equals("ROLE_SUPERVISOR")) {

				details = bleachhousekeepingchecklistf02repository.getHRSummeryDetails();
			}

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

	public ResponseEntity<?> getHouseKeepingMonthYearSummeryF02(String month, String year) {
		List<BleachHouseKeepingCheckListF02> details = null;
		try {

			details = bleachhousekeepingchecklistf02repository.getMonthandYear(month, year);

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting House Keeping Details F02: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

//	public ResponseEntity<?> approveRejectHouseKeepingRecordF02(ApproveResponse approvalResponse, HttpServletRequest http) {
//		
//		SCAUtil sca = new SCAUtil();
//		
//		BleachHouseKeepingCheckListF02 bleachContRawCottonF05 = new BleachHouseKeepingCheckListF02();
//		
//		String userRole = getUserRole();
//		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//		String userName = userrepository.getUserName(userId);
//		LocalDateTime currentDate = LocalDateTime.now();
//		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//		
//		try {
//			
//			bleachContRawCottonF05 = bleachhousekeepingchecklistf02repository.getHousekeepingRecordById(approvalResponse.getId());
//			
//			BleachHouseKeepingCheckListHistoryF02 bleachLayDownCheckListF42History = new BleachHouseKeepingCheckListHistoryF02();
//			
//			String supervisiorStatus = bleachContRawCottonF05.getSupervisor_status();
//			
//			String hrStatus = bleachContRawCottonF05.getHr_status();
//			
//			String hodStatus = bleachContRawCottonF05.getHod_status();
//			
//			UserImageDetails imageDetails = new UserImageDetails();
//			
//			if(userRole.equalsIgnoreCase("ROLE_HR")) {
//				
//				if(supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hrStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
//					
//					if(approvalResponse.getStatus().equals("Approve")) {
//						
//						bleachContRawCottonF05.setHr_sign(userName);
//						bleachContRawCottonF05.setHr_status(AppConstants.hrApprovedStatus);
//						bleachContRawCottonF05.setHr_submit_by(userName);
//						bleachContRawCottonF05.setHr_submit_id(userId);
//						bleachContRawCottonF05.setHr_submit_on(date);
//						bleachContRawCottonF05.setHod_status(AppConstants.waitingStatus);
//						
//						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						bleachContRawCottonF05.setHrSignature(signature);
//						
//						bleachhousekeepingchecklistf02repository.save(bleachContRawCottonF05);
//						
//						bleachLayDownCheckListF42History = houseKeepingCheckListF02RepositoryHistory.fetchLastSubmittedRecordLaydown(bleachContRawCottonF05.getDate());
//						
//						bleachLayDownCheckListF42History.setHr_sign(userName);
//						bleachLayDownCheckListF42History.setHr_status(AppConstants.hrApprovedStatus);
//						bleachLayDownCheckListF42History.setHr_submit_by(userName);
//						bleachLayDownCheckListF42History.setHr_submit_id(userId);
//						bleachLayDownCheckListF42History.setHr_submit_on(date);
//						bleachLayDownCheckListF42History.setHod_status(AppConstants.waitingStatus);
//						
//						houseKeepingCheckListF02RepositoryHistory.save(bleachLayDownCheckListF42History);
//						
//						return new ResponseEntity<>(new ApiResponse(true, "HR Approved Successfully"), HttpStatus.OK);
//						
//					} else if(approvalResponse.getStatus().equals("Reject")) {
//						
//						String reason = approvalResponse.getRemarks();
//						bleachContRawCottonF05.setReason(reason);
//						bleachContRawCottonF05.setHr_sign(userName);
//						bleachContRawCottonF05.setHr_status(AppConstants.hrRejectedStatus);
//						bleachContRawCottonF05.setHr_submit_by(userName);
//						bleachContRawCottonF05.setHr_submit_id(userId);
//						bleachContRawCottonF05.setHr_submit_on(date);
//						
//						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						bleachContRawCottonF05.setHrSignature(signature);
//						
//						bleachhousekeepingchecklistf02repository.save(bleachContRawCottonF05);
//						
//						bleachLayDownCheckListF42History = houseKeepingCheckListF02RepositoryHistory.fetchLastSubmittedRecordLaydown(bleachContRawCottonF05.getDate());
//						
//						bleachLayDownCheckListF42History.setReason(reason);
//						bleachLayDownCheckListF42History.setHr_sign(userName);
//						bleachLayDownCheckListF42History.setHr_status(AppConstants.hrRejectedStatus);
//						bleachLayDownCheckListF42History.setHr_submit_by(userName);
//						bleachLayDownCheckListF42History.setHr_submit_id(userId);
//						bleachLayDownCheckListF42History.setHr_submit_on(date);
//						
//						houseKeepingCheckListF02RepositoryHistory.save(bleachLayDownCheckListF42History);
//						
//						return new ResponseEntity<>(new ApiResponse(true, "HR Rejected Successfully"), HttpStatus.OK);
//						
//					} else {
//						return new ResponseEntity(new ApiResponse(false, "Invalid Status for HR Approval"), HttpStatus.BAD_REQUEST);
//					}
//					
//				} 
//				else if(hrStatus.equalsIgnoreCase(AppConstants.hrApprovedStatus) || hrStatus.equalsIgnoreCase(AppConstants.hrRejectedStatus)) {
//					
//					return new ResponseEntity(new ApiResponse(false, "Already HR Approved or Rejected"), HttpStatus.BAD_REQUEST);
//				}
//				else {
//					return new ResponseEntity(new ApiResponse(false, "Invalid Status for HR Approval"), HttpStatus.BAD_REQUEST);
//				}
//				
//			} else if(userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
//				
//				if(hrStatus.equalsIgnoreCase(AppConstants.hrApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
//					
//					if(approvalResponse.getStatus().equals("Approve")) {
//						
//						bleachContRawCottonF05.setHod_sign(userName);
//						bleachContRawCottonF05.setHod_status(AppConstants.hodApprovedStatus);
//						bleachContRawCottonF05.setHod_submit_by(userName);
//						bleachContRawCottonF05.setHod_submit_id(userId);
//						bleachContRawCottonF05.setHod_submit_on(date);
//						
//						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						bleachContRawCottonF05.setHodSignature(signature);
//						
//						bleachhousekeepingchecklistf02repository.save(bleachContRawCottonF05);
//						
//						bleachLayDownCheckListF42History = houseKeepingCheckListF02RepositoryHistory.fetchLastSubmittedRecordLaydown(bleachContRawCottonF05.getDate());
//						
//						bleachLayDownCheckListF42History.setHod_sign(userName);
//						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
//						bleachLayDownCheckListF42History.setHod_submit_by(userName);
//						bleachLayDownCheckListF42History.setHod_submit_id(userId);
//						bleachLayDownCheckListF42History.setHod_submit_on(date);
//						
//						houseKeepingCheckListF02RepositoryHistory.save(bleachLayDownCheckListF42History);
//						
//						return new ResponseEntity<>(new ApiResponse(true, "Hod Approved Successfully"), HttpStatus.OK);
//						
//					} else if(approvalResponse.getStatus().equals("Reject")) {
//						
//						String reason = approvalResponse.getRemarks();
//						bleachContRawCottonF05.setReason(reason);
//						bleachContRawCottonF05.setHod_sign(userName);
//						bleachContRawCottonF05.setHod_status(AppConstants.hodRejectedStatus);
//						bleachContRawCottonF05.setHod_submit_by(userName);
//						bleachContRawCottonF05.setHod_submit_id(userId);
//						bleachContRawCottonF05.setHod_submit_on(date);
//						
//						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						bleachContRawCottonF05.setHrSignature(signature);
//						
//						bleachContRawCottonF05.setHod_sign(userName);
//						
//						bleachhousekeepingchecklistf02repository.save(bleachContRawCottonF05);
//						
//						bleachLayDownCheckListF42History = houseKeepingCheckListF02RepositoryHistory.fetchLastSubmittedRecordLaydown(bleachContRawCottonF05.getDate());
//						
//						bleachLayDownCheckListF42History.setReason(reason);
//						bleachLayDownCheckListF42History.setHod_sign(userName);
//						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
//						bleachLayDownCheckListF42History.setHod_submit_by(userName);
//						bleachLayDownCheckListF42History.setHod_submit_id(userId);
//						bleachLayDownCheckListF42History.setHod_submit_on(date);
//						
//						houseKeepingCheckListF02RepositoryHistory.save(bleachLayDownCheckListF42History);
//						
//						return new ResponseEntity<>(new ApiResponse(true, "Hod Rejected Successfully"), HttpStatus.OK);
//						
//					} else {
//						return new ResponseEntity(new ApiResponse(false, "Invalid Status for Hod Approval"), HttpStatus.BAD_REQUEST);
//					}
//					
//				} 
//				else if(hodStatus.equalsIgnoreCase(AppConstants.hodApprovedStatus) || hodStatus.equalsIgnoreCase(AppConstants.hodRejectedStatus)) {
//					
//					return new ResponseEntity(new ApiResponse(false, "Already HOD Approved or Rejected"), HttpStatus.BAD_REQUEST);
//				}
//				else {
//					return new ResponseEntity(new ApiResponse(false, "Invalid Status for HOD Approval"), HttpStatus.BAD_REQUEST);
//				}
//				
//			} else {
//				
//				return new ResponseEntity(new ApiResponse(false, hodStatus + "Login with Valid Role to Approve/Reject Form"), HttpStatus.BAD_REQUEST);
//				
//			}
//			
//			
//		} catch(Exception e) {
//			
//			String msg = e.getMessage();
//			log.error("Unable to Approve Record" + msg);
//
//			return new ResponseEntity(
//					new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
//					HttpStatus.BAD_REQUEST);
//			
//			
//		}
//		
//		
//	
//		
//	}

	// AMC

	public ResponseEntity<?> approveRejectHouseKeepingRecordF02(ApproveResponse approvalResponse,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		BleachHouseKeepingCheckListF02 bleachContRawCottonF05 = new BleachHouseKeepingCheckListF02();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			bleachContRawCottonF05 = bleachhousekeepingchecklistf02repository
					.getHousekeepingRecordById(approvalResponse.getId());

			BleachHouseKeepingCheckListHistoryF02 bleachLayDownCheckListF42History = new BleachHouseKeepingCheckListHistoryF02();

			String supervisiorStatus = bleachContRawCottonF05.getSupervisor_status();

			String hrStatus = bleachContRawCottonF05.getHr_status();

			String hodStatus = bleachContRawCottonF05.getHod_status();

			UserImageDetails imageDetails = new UserImageDetails();

//			if (userRole.equalsIgnoreCase("ROLE_HR")) {

			if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {

//				if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
//						&& hrStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (hrStatus.equalsIgnoreCase(AppConstants.hrApprovedStatus)
						&& supervisiorStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

					if (approvalResponse.getStatus().equals("Approve")) {

//						bleachContRawCottonF05.setHr_sign(userName);
//						bleachContRawCottonF05.setHr_status(AppConstants.hrApprovedStatus);
//						bleachContRawCottonF05.setHr_submit_by(userName);
//						bleachContRawCottonF05.setHr_submit_id(userId);
//						bleachContRawCottonF05.setHr_submit_on(date);
//						bleachContRawCottonF05.setHod_status(AppConstants.waitingStatus);

						bleachContRawCottonF05.setSupervisor_sign(userName);
						bleachContRawCottonF05.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						bleachContRawCottonF05.setSupervisor_submit_by(userName);
						bleachContRawCottonF05.setSupervisor_submit_id(userId);
						bleachContRawCottonF05.setSupervisor_submit_on(date);
						bleachContRawCottonF05.setHod_status(AppConstants.waitingStatus);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachContRawCottonF05.setSupervisisorSignature(signature);

						bleachhousekeepingchecklistf02repository.save(bleachContRawCottonF05);

						bleachLayDownCheckListF42History = houseKeepingCheckListF02RepositoryHistory
								.fetchLastSubmittedRecordLaydown(bleachContRawCottonF05.getDate());

//						bleachLayDownCheckListF42History.setHr_sign(userName);
//						bleachLayDownCheckListF42History.setHr_status(AppConstants.hrApprovedStatus);
//						bleachLayDownCheckListF42History.setHr_submit_by(userName);
//						bleachLayDownCheckListF42History.setHr_submit_id(userId);
//						bleachLayDownCheckListF42History.setHr_submit_on(date);
//						bleachLayDownCheckListF42History.setHod_status(AppConstants.waitingStatus);

						bleachLayDownCheckListF42History.setSupervisor_sign(userName);
						bleachLayDownCheckListF42History.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						bleachLayDownCheckListF42History.setSupervisor_submit_by(userName);
						bleachLayDownCheckListF42History.setSupervisor_submit_id(userId);
						bleachLayDownCheckListF42History.setSupervisor_submit_on(date);
						bleachLayDownCheckListF42History.setHod_status(AppConstants.waitingStatus);

						houseKeepingCheckListF02RepositoryHistory.save(bleachLayDownCheckListF42History);

						return new ResponseEntity<>(new ApiResponse(true, "HR Approved Successfully"), HttpStatus.OK);

					} else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();

//						bleachContRawCottonF05.setReason(reason);
//						bleachContRawCottonF05.setHr_sign(userName);
//						bleachContRawCottonF05.setHr_status(AppConstants.hrRejectedStatus);
//						bleachContRawCottonF05.setHr_submit_by(userName);
//						bleachContRawCottonF05.setHr_submit_id(userId);
//						bleachContRawCottonF05.setHr_submit_on(date);

						bleachContRawCottonF05.setReason(reason);
						bleachContRawCottonF05.setSupervisor_sign(userName);
						bleachContRawCottonF05.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						bleachContRawCottonF05.setSupervisor_submit_by(userName);
						bleachContRawCottonF05.setSupervisor_submit_id(userId);
						bleachContRawCottonF05.setSupervisor_submit_on(date);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachContRawCottonF05.setSupervisisorSignature(signature);

						bleachhousekeepingchecklistf02repository.save(bleachContRawCottonF05);

						bleachLayDownCheckListF42History = houseKeepingCheckListF02RepositoryHistory
								.fetchLastSubmittedRecordLaydown(bleachContRawCottonF05.getDate());

//						bleachLayDownCheckListF42History.setReason(reason);
//						bleachLayDownCheckListF42History.setHr_sign(userName);
//						bleachLayDownCheckListF42History.setHr_status(AppConstants.hrRejectedStatus);
//						bleachLayDownCheckListF42History.setHr_submit_by(userName);
//						bleachLayDownCheckListF42History.setHr_submit_id(userId);
//						bleachLayDownCheckListF42History.setHr_submit_on(date);

						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setSupervisor_sign(userName);
						bleachLayDownCheckListF42History.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						bleachLayDownCheckListF42History.setSupervisor_submit_by(userName);
						bleachLayDownCheckListF42History.setSupervisor_submit_id(userId);
						bleachLayDownCheckListF42History.setSupervisor_submit_on(date);

						houseKeepingCheckListF02RepositoryHistory.save(bleachLayDownCheckListF42History);

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

				if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
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

						bleachhousekeepingchecklistf02repository.save(bleachContRawCottonF05);

						bleachLayDownCheckListF42History = houseKeepingCheckListF02RepositoryHistory
								.fetchLastSubmittedRecordLaydown(bleachContRawCottonF05.getDate());

						bleachLayDownCheckListF42History.setHod_sign(userName);
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_submit_on(date);

						houseKeepingCheckListF02RepositoryHistory.save(bleachLayDownCheckListF42History);

						return new ResponseEntity<>(new ApiResponse(true, "Hod Approved Successfully"), HttpStatus.OK);

					} else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						bleachContRawCottonF05.setReason(reason);
						bleachContRawCottonF05.setHod_sign(userName);
						bleachContRawCottonF05.setHod_status(AppConstants.hodRejectedStatus);
						bleachContRawCottonF05.setHod_submit_by(userName);
						bleachContRawCottonF05.setHod_submit_id(userId);
						bleachContRawCottonF05.setHod_submit_on(date);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachContRawCottonF05.setHrSignature(signature);

						bleachContRawCottonF05.setHod_sign(userName);

						bleachhousekeepingchecklistf02repository.save(bleachContRawCottonF05);

						bleachLayDownCheckListF42History = houseKeepingCheckListF02RepositoryHistory
								.fetchLastSubmittedRecordLaydown(bleachContRawCottonF05.getDate());

						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_submit_on(date);

						houseKeepingCheckListF02RepositoryHistory.save(bleachLayDownCheckListF42History);

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

	// DELETE MACHINE CLEANING RECORD

	public ResponseEntity<?> deleteMachineCleaningRecord(Long id) {

		BleachMixingChangeMachineCleaningF38 productionDetailsLine = new BleachMixingChangeMachineCleaningF38();

		try {

			productionDetailsLine = bleachmixingchangemachinecleaningf38repository.getMachineCleanF38(id);

			if (productionDetailsLine != null) {
				bleachmixingchangemachinecleaningf38repository.deleteMachineCleaningLineById(id);
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(new ApiResponse(false, " data not found !!!"));
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();

			log.error(" *** !!! Unable to delete Machine Cleaning Record !!!*** " + msg);

			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse(false, "Failed to delete Machine Cleaning Record !!!" + msg));
		}

		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Machine Cleaning Line Deleted "));
	}

	/**
	 * 
	 * F-02A
	 */

	public ResponseEntity<?> SubmitHouseKeepingF02A(BleachHouseKeepingCheckListF02A details, HttpServletRequest http) {
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

				bleachhousekeepingchecklistf02arepository.save(details);

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				details.setSupervisisorSignature(signature);

				bleachhousekeepingchecklistf02arepository.save(details);

				// AUDIT

				BleachHouseKeepingCheckListHistoryF02A houseKeepingCheckListHistoryF02 = new BleachHouseKeepingCheckListHistoryF02A();

				BeanUtils.copyProperties(details, houseKeepingCheckListHistoryF02);

				String historyDate = houseKeepingCheckListHistoryF02.getDate();

				int version = houseKeepingCheckListF02ARepositoryHistory.getMaximumVersion(historyDate)
						.map(temp -> temp + 1).orElse(1);

				houseKeepingCheckListHistoryF02.setVersion(version);

				houseKeepingCheckListF02ARepositoryHistory.save(houseKeepingCheckListHistoryF02);

				try {

					bleachmailfunction.sendEmailToHRF02A(details);
				} catch (Exception ex) {
					return new ResponseEntity<>(
							new ApiResponse(false, "Supervisor Approved but Unable to send mail to HOD! "),
							HttpStatus.OK);
				}
				break;

//			case "ROLE_HR":
//
//				if (AppConstants.supervisorApprovedStatus.equals(details.getSupervisor_status())) {
//
//					details.setHr_status(AppConstants.hrApprovedStatus);
//					details.setHr_submit_on(date);
//					details.setHr_submit_by(userName);
//					details.setHr_submit_id(userId);
//					details.setHr_sign(userName);
//					details.setHod_status(AppConstants.waitingStatus);
//					bleachhousekeepingchecklistf02arepository.save(details);
//					try {
//
//						bleachmailfunction.sendEmailToHODF02A(details);
//					} catch (Exception ex) {
//						return new ResponseEntity<>(
//								new ApiResponse(false, "Supervisor Approved but Unable to send mail to HOD! "),
//								HttpStatus.OK);
//					}
//				}
//
//				else {
//					return new ResponseEntity<>(new ApiResponse(false, "ROLE_SUPERVISOR Is Not Approved"),
//							HttpStatus.BAD_REQUEST);
//				}
//				break;
//
//			case "ROLE_HOD":
//			case "ROLE_DESIGNEE":
//
//				if (AppConstants.hrApprovedStatus.equals(details.getHr_status())) {
//
//					details.setHod_status(AppConstants.hodApprovedStatus);
//					details.setHod_submit_on(date);
//					details.setHod_submit_by(userName);
//					details.setHod_submit_id(userId);
//					details.setHod_sign(userName);
//					bleachhousekeepingchecklistf02arepository.save(details);
//
//				}
//
//				else {
//					return new ResponseEntity<>(new ApiResponse(false, "ROLE_HR Is Not Approved"),
//							HttpStatus.BAD_REQUEST);
//				}
//				break;

			default:
				return new ResponseEntity<>(new ApiResponse(false, "Please log in with the correct role"),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity(new ApiResponse(true, "Supervisor Submitted Sucessfully"), HttpStatus.OK);

		} catch (Exception e) {
			log.error(
					"***************** Unable to Submit House Keeping Check List F02A Details!  *********************\n"
							+ e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Submit House Keeping Check List F02A Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getHouseKeepingF02A(String date, HttpServletRequest http) {
		List<BleachHouseKeepingCheckListF02A> details = null;
		try {
			String userRole = getUserRole();

			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			details = bleachhousekeepingchecklistf02arepository.getDetailsBaseDate(date);

			if (userRole.equalsIgnoreCase("ROLE_HR")) {

			} else {
				System.out.println("ROLE");
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting House KeepingF02A: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// APPROVE

	public ResponseEntity<?> approveRejectHouseKeepingRecordF02A(ApproveResponse approvalResponse,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		BleachHouseKeepingCheckListF02A bleachContRawCottonF05 = new BleachHouseKeepingCheckListF02A();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			bleachContRawCottonF05 = bleachhousekeepingchecklistf02arepository
					.getHousekeepingRecordById(approvalResponse.getId());

			BleachHouseKeepingCheckListHistoryF02A bleachLayDownCheckListF42History = new BleachHouseKeepingCheckListHistoryF02A();

			String supervisiorStatus = bleachContRawCottonF05.getSupervisor_status();

			String hrStatus = bleachContRawCottonF05.getHr_status();

			String hodStatus = bleachContRawCottonF05.getHod_status();

			UserImageDetails imageDetails = new UserImageDetails();

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

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachContRawCottonF05.setHrSignature(signature);

						bleachhousekeepingchecklistf02arepository.save(bleachContRawCottonF05);

						bleachLayDownCheckListF42History = houseKeepingCheckListF02ARepositoryHistory
								.fetchLastSubmittedRecordLaydown(bleachContRawCottonF05.getDate());

						bleachLayDownCheckListF42History.setHr_sign(userName);
						bleachLayDownCheckListF42History.setHr_status(AppConstants.hrApprovedStatus);
						bleachLayDownCheckListF42History.setHr_submit_by(userName);
						bleachLayDownCheckListF42History.setHr_submit_id(userId);
						bleachLayDownCheckListF42History.setHr_submit_on(date);
						bleachLayDownCheckListF42History.setHod_status(AppConstants.waitingStatus);

						houseKeepingCheckListF02ARepositoryHistory.save(bleachLayDownCheckListF42History);

						return new ResponseEntity<>(new ApiResponse(true, "HR Approved Successfully"), HttpStatus.OK);

					} else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						bleachContRawCottonF05.setReason(reason);
						bleachContRawCottonF05.setHr_sign(userName);
						bleachContRawCottonF05.setHr_status(AppConstants.hrRejectedStatus);
						bleachContRawCottonF05.setHr_submit_by(userName);
						bleachContRawCottonF05.setHr_submit_id(userId);
						bleachContRawCottonF05.setHr_submit_on(date);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachContRawCottonF05.setHrSignature(signature);

						bleachhousekeepingchecklistf02arepository.save(bleachContRawCottonF05);

						bleachLayDownCheckListF42History = houseKeepingCheckListF02ARepositoryHistory
								.fetchLastSubmittedRecordLaydown(bleachContRawCottonF05.getDate());

						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHr_sign(userName);
						bleachLayDownCheckListF42History.setHr_status(AppConstants.hrRejectedStatus);
						bleachLayDownCheckListF42History.setHr_submit_by(userName);
						bleachLayDownCheckListF42History.setHr_submit_id(userId);
						bleachLayDownCheckListF42History.setHr_submit_on(date);

						houseKeepingCheckListF02ARepositoryHistory.save(bleachLayDownCheckListF42History);

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

						bleachhousekeepingchecklistf02arepository.save(bleachContRawCottonF05);

						bleachLayDownCheckListF42History = houseKeepingCheckListF02ARepositoryHistory
								.fetchLastSubmittedRecordLaydown(bleachContRawCottonF05.getDate());

						bleachLayDownCheckListF42History.setHod_sign(userName);
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_submit_on(date);

						houseKeepingCheckListF02ARepositoryHistory.save(bleachLayDownCheckListF42History);

						return new ResponseEntity<>(new ApiResponse(true, "Hod Approved Successfully"), HttpStatus.OK);

					} else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						bleachContRawCottonF05.setReason(reason);
						bleachContRawCottonF05.setHod_sign(userName);
						bleachContRawCottonF05.setHod_status(AppConstants.hodRejectedStatus);
						bleachContRawCottonF05.setHod_submit_by(userName);
						bleachContRawCottonF05.setHod_submit_id(userId);
						bleachContRawCottonF05.setHod_submit_on(date);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachContRawCottonF05.setHrSignature(signature);

						bleachContRawCottonF05.setHod_sign(userName);

						bleachhousekeepingchecklistf02arepository.save(bleachContRawCottonF05);

						bleachLayDownCheckListF42History = houseKeepingCheckListF02ARepositoryHistory
								.fetchLastSubmittedRecordLaydown(bleachContRawCottonF05.getDate());

						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_submit_on(date);

						houseKeepingCheckListF02ARepositoryHistory.save(bleachLayDownCheckListF42History);

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

	public ResponseEntity<?> getHouseKeepingSummeryF0A(HttpServletRequest http) {
		List<BleachHouseKeepingCheckListF02A> details = null;
		try {
			String userRole = getUserRole();

			if (userRole.equals("ROLE_HR")) {

				Long userId = sca.getUserIdFromRequest(http, tokenProvider);

				details = bleachhousekeepingchecklistf02arepository.getHRSummeryDetails();

			} else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				details = bleachhousekeepingchecklistf02arepository.getHodSummeryDetails();
			}

			else if (userRole.equals("ROLE_SUPERVISOR")) {

				details = bleachhousekeepingchecklistf02arepository.getHodSummeryDetails();
			}

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

	public ResponseEntity<?> getHouseKeepingMonthYearSummeryF02A(String month, String year) {
		List<BleachHouseKeepingCheckListF02A> details = null;
		try {

			details = bleachhousekeepingchecklistf02arepository.getMonthandYear(month, year);

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting House Keeping Details F02A: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<?> LayDownChecklist(String bmr) {

		List<BleachAppliedContAbCottonF08> response = new ArrayList<>();
		try {

			response = bleachappliedcontabcottonf08repository.getBmrDetailsF08(bmr);

			if (response == null || response.isEmpty()) {

				return new ResponseEntity<>(new ApiResponse(false, "HOD not yet Approved for this Bmr No" + bmr),
						HttpStatus.BAD_REQUEST);
			}

		}

		catch (Exception e) {

			log.error("***************** Unable to get Bmr Number:  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity<>(new ApiResponse(false, "Unable to get Bmr Number:  " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	// ---BMRLOV--Applied Contamination
//	BMR LOV

	public ResponseEntity<?> bmrLovF08() {
		List<LovResponse> responseList = new ArrayList<>();

		List<String> response = new ArrayList<>();

		try {

			response = bleachappliedcontabcottonf08repository.bmrLov();
			if (!response.isEmpty()) {
				Long id = (long) 1;
				for (String obj : response) {
					LovResponse res = new LovResponse();
					res.setId(id);
					res.setValue(obj);
					res.setDescription(obj);
					responseList.add(res);
					id++;
				}
			}

		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Details : " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}

	public ResponseEntity<?> getdetailsBsedonDateF38Print(String date, String month, String year) {
		List<BleachMixingChangeMachineCleaningF38> details = null;
		try {
			details = bleachmixingchangemachinecleaningf38repository.getDateBaseSummDetailsPrint(date, month, year);
			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Job Card Details: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// CR

	public ResponseEntity<?> getSummaryF38(String date, String month, String year, String fromBmr, String toBmr) {
		List<BleachMixingChangeMachineCleaningF38> details = null;
		try {
			details = bleachmixingchangemachinecleaningf38repository.getSummaryF38(date, month, year, fromBmr, toBmr);
			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Job Card Details: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<?> getFromBmr(String date, String month, String year) {
		List<Map<String, Object>> details;
		try {
			details = bleachmixingchangemachinecleaningf38repository.getFromBmr(date, month, year);
			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Job Card Details: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<?> getToBmr(String date, String month, String year) {
		List<Map<String, Object>> details;
		try {
			details = bleachmixingchangemachinecleaningf38repository.getToBmr(date, month, year);
			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Job Card Details: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
