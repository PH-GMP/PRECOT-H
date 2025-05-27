package com.focusr.Precot.mssql.database.service.padpunching;

import java.time.LocalDateTime;

import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
import com.focusr.Precot.mssql.database.model.bleaching.BleachHouseKeepingCheckListF02A;
import com.focusr.Precot.mssql.database.model.bleaching.BleachMixingChangeMachineCleaningF38;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachHouseKeepingCheckListHistoryF02A;
import com.focusr.Precot.mssql.database.model.padpunching.BagMakingSpecificationDetailsF014;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingBagMakingDailyProductionDetailsF001;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingHouseKeepingCheckListF010;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingHouseKeepingCheckListF26;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingLogBookBagMakingF003;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingSanitizationOfMachinesAndSurfacesF21;
import com.focusr.Precot.mssql.database.model.padpunching.ProcessProductControlDetailsLineF014;
import com.focusr.Precot.mssql.database.model.padpunching.audit.BagMakingSpecificationDetailsHistoryF014;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingBagMakingDailyProductionDetailsHistoryF001;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingHouseCleaningCheckListF010History;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingHouseKeepingCleaningCheckListF26History;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingLogBookBagMakingHistoryF003;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingSanitizationOfMachinesAndSurfacesHistoryF21;
import com.focusr.Precot.mssql.database.model.padpunching.audit.ProcessProductControlDetailsLineHistoryF014;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupDetailsJetlaceAndDryerF003;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupVerificationSliterWinderF016;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceHandSanitizationListF025;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceHandSanitizationReportF025;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceShiftWiseRPProdSupportF14;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupDetailsJetlaceAndDryerHistoryF003;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupVerificationSliterWinderHistoryF016;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceHandSanitizationListHistoryF025;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceHandSanitizationReportHistoryF025;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachAppliedContAbCottonF08Repository;
import com.focusr.Precot.mssql.database.repository.padpunching.PadPunchingBagMakingDailyProductionDetailsRepositoryF001;
import com.focusr.Precot.mssql.database.repository.padpunching.PadPunchingHouseKeepingCheckListF010Repository;
import com.focusr.Precot.mssql.database.repository.padpunching.PadPunchingHouseKeepingCheckListF26Repository;
import com.focusr.Precot.mssql.database.repository.padpunching.PadPunchingLogBookBagMakingRepositoryF003;
import com.focusr.Precot.mssql.database.repository.padpunching.PadPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.PadPunchingBagMakingDailyProductionDetailsHistoryRepositoryF001;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.PadPunchingHouseKeepingCheckListF010RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.PadPunchingHouseKeepingCheckListF26RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.PadPunchingLogBookBagMakingRepositoryHistoryF003;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.PadPunchingSanitizationOfMachinesAndSurfacesRepositoryHistoryF21;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.BleachMailFunction;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.padpunching.PadPunchingMailFunction;
import com.focusr.Precot.util.splunance.AppConstantsSplunance;

@Service
public class PadPunchingService6 {

	@Autowired
	PadPunchingHouseKeepingCheckListF26Repository padPunchingHouseKeepingCheckListF26Repository;

	@Autowired
	PadPunchingHouseKeepingCheckListF010Repository padPunchingCheckListF010Repo;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	UserRepository userrepository;

	@Autowired
	private UserImageDetailsRepository imageRepository;

	@Autowired
	private PadPunchingHouseKeepingCheckListF26RepositoryHistory houseKeepingCheckListF02ARepositoryHistory;

	@Autowired
	private PadPunchingHouseKeepingCheckListF010RepositoryHistory padPunchingHouseKeepingCheckListf010RepoHistory;

	@Autowired
	BleachMailFunction bleachmailfunction;

	@Autowired
	private BleachAppliedContAbCottonF08Repository bleachappliedcontabcottonf08repository;

	@Autowired
	private PadPunchingBagMakingDailyProductionDetailsRepositoryF001 padPunchingBagMakingDailyProduction;

	@Autowired
	private PadPunchingBagMakingDailyProductionDetailsHistoryRepositoryF001 padPunchingBagMakingDailyProductionHistoryRepo;

	@Autowired
	private PadPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21 padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21;

	@Autowired
	private PadPunchingSanitizationOfMachinesAndSurfacesRepositoryHistoryF21 padPunchingSanitizationOfMachinesAndSurfacesRepositoryHistoryF21;

	@Autowired
	private PadPunchingLogBookBagMakingRepositoryF003 padPunchingLogBookBagMakingF003;

	@Autowired
	private PadPunchingLogBookBagMakingRepositoryHistoryF003 padPunchingLogBookBagMakingHistoryF003;

	@Autowired
	private PadPunchingMailFunction padPunchingMailFunction;

	SCAUtil sca = new SCAUtil();

	Logger log = LoggerFactory.getLogger(PadPunchingService6.class);

	/**
	 * 
	 * F26
	 */

//	@SuppressWarnings("unchecked")
//	public ResponseEntity<?> saveHouseKeepingF02A(PadPunchingHouseKeepingCheckListF26 details,
//			HttpServletRequest http) {
//		try {
//
//			String userRole = getUserRole();
//			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//			String userName = userrepository.getUserName(userId);
//			LocalDateTime currentDate = LocalDateTime.now();
//			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//			if (userRole.equals("ROLE_SUPERVISOR")) {
//
//				details.setSupervisor_status(AppConstants.supervisorSave);
//				details.setSupervisor_saved_on(date);
//				details.setSupervisor_saved_by(userName);
//				details.setSupervisor_saved_id(userId);
//
//				padPunchingHouseKeepingCheckListF26Repository.save(details);
//
//			} else if (userRole.equals("ROLE_HOD") || "ROLE_DESIGNEE".equals(userRole)) {
//
//				details.setHod_status(AppConstants.hodSave);
//				details.setHod_saved_on(date);
//				details.setHod_saved_by(userName);
//				details.setHod_saved_id(userId);
//
//				padPunchingHouseKeepingCheckListF26Repository.save(details);
//			}
//
//			else {
//				return new ResponseEntity<>(new ApiResponse(false, "Please log in with the correct role"),
//						HttpStatus.FORBIDDEN);
//			}
//
//			return new ResponseEntity<>(details, HttpStatus.OK);
//
//		} catch (Exception e) {
//			log.error("Unable to Save Mix Machine F38 Details!", e);
//			String msg = sca.getErrorMessage(e);
//			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Mix Machine F38 Details! " + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> saveHouseKeepingF26(PadPunchingHouseKeepingCheckListF26 details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		PadPunchingHouseKeepingCheckListF26 listObj = null;
		try {
			String missingField = "";

			// Mandatory fields check
			if (details.getFormatNo() == null)
				missingField = "formatNo";
			if (details.getRevisionNo() == null)
				missingField = "revisionNo";
			if (details.getFormatName() == null)
				missingField = "formatName";
			if (details.getUnit() == null)
				missingField = "date";
			if (details.getMonth() == null)
				missingField = "month";
			if (details.getYear() == null)
				missingField = "year";

			if (!"".equals(missingField)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields: " + missingField),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			String role = sca.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			// Update logic if ID is present
			if (details.getClean_id() != null) {
				listObj = padPunchingHouseKeepingCheckListF26Repository.findById(details.getClean_id()).orElse(null);

				if (listObj == null) {
					return new ResponseEntity<>(new ApiResponse(false, "Entity not found"), HttpStatus.NOT_FOUND);
				}

				// Exclude fields from being copied
				String[] ignoreProps = { "clean_id", "createdBy", "createdAt", "supervisor_status", "hod_status",
						"supervisor_saved_by", "hod_saved_by", "supervisor_saved_on", "hod_saved_on",
						"supervisor_saved_id", "hod_saved_id", "supervisor_sign", "hod_sign" };

				BeanUtils.copyProperties(details, listObj, ignoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {
					if (AppConstants.supervisorApprovedStatus.equals(listObj.getSupervisor_status())) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					listObj.setSupervisor_saved_by(userName);
					listObj.setSupervisor_saved_on(date);
					listObj.setSupervisor_saved_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);

				} else if (role.equals("ROLE_HOD") || "ROLE_DESIGNEE".equals(role)) {
					listObj.setHod_saved_by(userName);
					listObj.setHod_saved_on(date);
					listObj.setHod_saved_id(userId);
					listObj.setHod_status(AppConstants.hodSave);

				} else {
					return new ResponseEntity(new ApiResponse(false, "Role cannot save details."),
							HttpStatus.BAD_REQUEST);
				}

				padPunchingHouseKeepingCheckListF26Repository.save(listObj);

			} else { // Create logic
				if (role.equals("ROLE_SUPERVISOR")) {
					details.setSupervisor_saved_by(userName);
					details.setSupervisor_saved_on(date);
					details.setSupervisor_saved_id(userId);
					details.setSupervisor_status(AppConstants.supervisorSave);
				} else if (role.equals("ROLE_HOD") || "ROLE_DESIGNEE".equals(role)) {
					details.setHod_saved_by(userName);
					details.setHod_saved_on(date);
					details.setHod_saved_id(userId);
					details.setHod_status(AppConstants.hodSave);
				} else {
					return new ResponseEntity(new ApiResponse(false, "Role cannot create details."),
							HttpStatus.BAD_REQUEST);
				}

				listObj = padPunchingHouseKeepingCheckListF26Repository.save(details);
			}

		} catch (Exception ex) {
			log.error(" **** Unable to save Details! **** ", ex);
			String msg = ex.getMessage();
			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details: " + msg), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitHouseKeepingF02A(PadPunchingHouseKeepingCheckListF26 processSetupDetails,
			HttpServletRequest http) {

		PadPunchingHouseKeepingCheckListF26 processsetupdetailsjetlaceanddryerf003 = new PadPunchingHouseKeepingCheckListF26();

		Long id = processSetupDetails.getClean_id();
		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			if (processSetupDetails.getFormatNo() == null)
				value = "formatNo";

			if (processSetupDetails.getRevisionNo() == null)
				value = "revisionNo";
			if (processSetupDetails.getFormatName() == null)
				value = "formatName";
			if (processSetupDetails.getUnit() == null)
				value = "Unit";

			if (processSetupDetails.getDate() == null)
				value = "Date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			if (id != null) {

				processsetupdetailsjetlaceanddryerf003 = padPunchingHouseKeepingCheckListF26Repository
						.getHousekeepingRecordById(id);

				String[] IgnoreProps = { "clean_id", "createdBy", "createdAt", "hr_status", "hr_sign", "hr_submit_id",
						"hr_submit_by", "hr_submit_on", "supervisor_status", "supervisor_saved_on",
						"supervisor_saved_by", "supervisor_saved_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "supervisior_mail_status", "hod_status",
						"hod_saved_on", "hod_saved_by", "hod_saved_id", "hod_submit_on", "hod_submit_by",
						"hod_submit_id", "hod_sign,hod_mail_status", "operator_signature_image",
						"supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(processSetupDetails, processsetupdetailsjetlaceanddryerf003, IgnoreProps);

				if (!processsetupdetailsjetlaceanddryerf003.getSupervisor_status()
						.equals(AppConstants.supervisorApprovedStatus)
						|| processsetupdetailsjetlaceanddryerf003.getHod_status().equals(AppConstants.hodRejectedStatus)
						|| processsetupdetailsjetlaceanddryerf003.getHr_status()
								.equals(AppConstants.hrRejectedStatus)) {

					if (userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)) {
						processsetupdetailsjetlaceanddryerf003
								.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						processsetupdetailsjetlaceanddryerf003.setSupervisor_submit_by(userName);
						processsetupdetailsjetlaceanddryerf003.setSupervisor_submit_on(date);
						processsetupdetailsjetlaceanddryerf003.setSupervisor_submit_id(userId);
						processsetupdetailsjetlaceanddryerf003.setSupervisor_sign(userName);

						processsetupdetailsjetlaceanddryerf003.setHr_status(AppConstants.waitingStatus);

						processsetupdetailsjetlaceanddryerf003.setHod_status("");

						padPunchingHouseKeepingCheckListF26Repository.save(processsetupdetailsjetlaceanddryerf003);

						PadPunchingHouseKeepingCleaningCheckListF26History rejectionReportHistory = new PadPunchingHouseKeepingCleaningCheckListF26History();

						BeanUtils.copyProperties(processsetupdetailsjetlaceanddryerf003, rejectionReportHistory);

						String order1 = rejectionReportHistory.getDate();

						int version = houseKeepingCheckListF02ARepositoryHistory.getMaximumVersion(order1)
								.map(temp -> temp + 1).orElse(1);
						;

						rejectionReportHistory.setVersion(version);

						houseKeepingCheckListF02ARepositoryHistory.save(rejectionReportHistory);

						// YET TO WRITE MAIL CONTENT FOR OPERATOR SUBMIT ...
						try {

							padPunchingMailFunction.sendEmailToHRF009(processSetupDetails);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
									HttpStatus.OK);
						}
					} else {
						return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
								HttpStatus.FORBIDDEN);
					}

				} else {

					return new ResponseEntity(
							new ApiResponse(false, "Unauthorize to Submit Process Setup Details Report"),
							HttpStatus.FORBIDDEN);

				}
			} else {

				if (!userRole.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
				if (userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)) {
					processsetupdetailsjetlaceanddryerf003 = processSetupDetails;
					processsetupdetailsjetlaceanddryerf003.setSupervisor_status(AppConstants.supervisorApprovedStatus);
					processsetupdetailsjetlaceanddryerf003.setSupervisor_submit_by(userName);
					processsetupdetailsjetlaceanddryerf003.setSupervisor_submit_on(date);
					processsetupdetailsjetlaceanddryerf003.setSupervisor_submit_id(userId);
					processsetupdetailsjetlaceanddryerf003.setSupervisor_sign(userName);
					processsetupdetailsjetlaceanddryerf003.setHr_status(AppConstants.waitingStatus);

					processsetupdetailsjetlaceanddryerf003.setHod_status("");
					padPunchingHouseKeepingCheckListF26Repository.save(processSetupDetails);

					padPunchingHouseKeepingCheckListF26Repository.save(processsetupdetailsjetlaceanddryerf003);

					// AUDIT

					PadPunchingHouseKeepingCleaningCheckListF26History rejectionReportHistory = new PadPunchingHouseKeepingCleaningCheckListF26History();

					BeanUtils.copyProperties(processSetupDetails, rejectionReportHistory);

					String order1 = rejectionReportHistory.getDate();

					int version = houseKeepingCheckListF02ARepositoryHistory.getMaximumVersion(order1)
							.map(temp -> temp + 1).orElse(1);

					rejectionReportHistory.setVersion(version);

					houseKeepingCheckListF02ARepositoryHistory.save(rejectionReportHistory);

					try {

						padPunchingMailFunction.sendEmailToHRF009(processSetupDetails);
					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
								HttpStatus.OK);
					}

				}
			}
		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("Unable to Submit Process Setup Details" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit Process Setup Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

//		return new ResponseEntity(processsetupdetailsjetlaceanddryerf003, HttpStatus.CREATED);

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

	}

	public ResponseEntity<?> getHouseKeepingF02A(String date, HttpServletRequest http) {
		List<PadPunchingHouseKeepingCheckListF26> details = null;
		try {
			String userRole = getUserRole();

			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			details = padPunchingHouseKeepingCheckListF26Repository.getDetailsBaseDate(date);

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
//overall get

	public ResponseEntity<?> getHouseKeepingOverallF02A(HttpServletRequest http) {
		List<PadPunchingHouseKeepingCheckListF26> details = null;
		try {
			details = padPunchingHouseKeepingCheckListF26Repository.findAll();
			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<>("Error Getting House KeepingF02A: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
// APPROVE 

//public ResponseEntity<?> approveRejectHouseKeepingRecordF02A(ApproveResponse approvalResponse, HttpServletRequest http) {
//	
//	SCAUtil sca = new SCAUtil();
//	
//	PadPunchingHouseKeepingCheckListF26 padPunchingCheckList = new PadPunchingHouseKeepingCheckListF26();
//	
//	String userRole = getUserRole();
//	Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//	String userName = userrepository.getUserName(userId);
//	LocalDateTime currentDate = LocalDateTime.now();
//	Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//	
//	try {
//		
//		padPunchingCheckList = padPunchingHouseKeepingCheckListF26Repository.getHousekeepingRecordById(approvalResponse.getId());
//		
//		PadPunchingHouseKeepingCleaningCheckListF26History padPunchingLaydownCheckListHistory = new PadPunchingHouseKeepingCleaningCheckListF26History();
//		
//		String supervisiorStatus = padPunchingCheckList.getSupervisor_status();
//		
//		String hrStatus = padPunchingCheckList.getHr_status();
//		
//		String hodStatus = padPunchingCheckList.getHod_status();
//		
//		UserImageDetails imageDetails = new UserImageDetails();
//		
//		if(userRole.equalsIgnoreCase("ROLE_HR")) {
//			
//			if(supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hrStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
//				
//				if(approvalResponse.getStatus().equals("Approve")) {
//					
//					padPunchingCheckList.setHr_sign(userName);
//					padPunchingCheckList.setHr_status(AppConstants.hrApprovedStatus);
//					padPunchingCheckList.setHr_submit_by(userName);
//					padPunchingCheckList.setHr_submit_id(userId);
//					padPunchingCheckList.setHr_submit_on(date);
//					padPunchingCheckList.setHod_status(AppConstants.waitingStatus);
//					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					padPunchingCheckList.setHrSignature(signature);
//					
//					padPunchingHouseKeepingCheckListF26Repository.save(padPunchingCheckList);
//					
//					padPunchingLaydownCheckListHistory = houseKeepingCheckListF02ARepositoryHistory.fetchLastSubmittedRecordLaydown(padPunchingCheckList.getDate());
//					
//					padPunchingLaydownCheckListHistory.setHr_sign(userName);
//					padPunchingLaydownCheckListHistory.setHr_status(AppConstants.hrApprovedStatus);
//					padPunchingLaydownCheckListHistory.setHr_submit_by(userName);
//					padPunchingLaydownCheckListHistory.setHr_submit_id(userId);
//					padPunchingLaydownCheckListHistory.setHr_submit_on(date);
//					padPunchingLaydownCheckListHistory.setHod_status(AppConstants.waitingStatus);
//					
//					houseKeepingCheckListF02ARepositoryHistory.save(padPunchingLaydownCheckListHistory);
//					
//					return new ResponseEntity<>(new ApiResponse(true, "HR Approved Successfully"), HttpStatus.OK);
//					
//				} else if(approvalResponse.getStatus().equals("Reject")) {
//					
//					String reason = approvalResponse.getRemarks();
//					padPunchingCheckList.setReason(reason);
//					padPunchingCheckList.setHr_sign(userName);
//					padPunchingCheckList.setHr_status(AppConstants.hrRejectedStatus);
//					padPunchingCheckList.setHr_submit_by(userName);
//					padPunchingCheckList.setHr_submit_id(userId);
//					padPunchingCheckList.setHr_submit_on(date);
//					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					padPunchingCheckList.setHrSignature(signature);
//					
//					padPunchingHouseKeepingCheckListF26Repository.save(padPunchingCheckList);
//					
//					padPunchingLaydownCheckListHistory = houseKeepingCheckListF02ARepositoryHistory.fetchLastSubmittedRecordLaydown(padPunchingCheckList.getDate());
//					
//					padPunchingLaydownCheckListHistory.setReason(reason);
//					padPunchingLaydownCheckListHistory.setHr_sign(userName);
//					padPunchingLaydownCheckListHistory.setHr_status(AppConstants.hrRejectedStatus);
//					padPunchingLaydownCheckListHistory.setHr_submit_by(userName);
//					padPunchingLaydownCheckListHistory.setHr_submit_id(userId);
//					padPunchingLaydownCheckListHistory.setHr_submit_on(date);
//					
//					houseKeepingCheckListF02ARepositoryHistory.save(padPunchingLaydownCheckListHistory);
//					
//					return new ResponseEntity<>(new ApiResponse(true, "HR Rejected Successfully"), HttpStatus.OK);
//					
//				} else {
//					return new ResponseEntity(new ApiResponse(false, "Invalid Status for HR Approval"), HttpStatus.BAD_REQUEST);
//				}
//				
//			} 
//			else if(hrStatus.equalsIgnoreCase(AppConstants.hrApprovedStatus) || hrStatus.equalsIgnoreCase(AppConstants.hrRejectedStatus)) {
//				
//				return new ResponseEntity(new ApiResponse(false, "Already HR Approved or Rejected"), HttpStatus.BAD_REQUEST);
//			}
//			else {
//				return new ResponseEntity(new ApiResponse(false, "Invalid Status for HR Approval"), HttpStatus.BAD_REQUEST);
//			}
//			
//		} else if(userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
//			
//			if(hrStatus.equalsIgnoreCase(AppConstants.hrApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
//				
//				if(approvalResponse.getStatus().equals("Approve")) {
//					
//					padPunchingCheckList.setHod_sign(userName);
//					padPunchingCheckList.setHod_status(AppConstants.hodApprovedStatus);
//					padPunchingCheckList.setHod_submit_by(userName);
//					padPunchingCheckList.setHod_submit_id(userId);
//					padPunchingCheckList.setHod_submit_on(date);
//					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					padPunchingCheckList.setHodSignature(signature);
//					
//					padPunchingHouseKeepingCheckListF26Repository.save(padPunchingCheckList);
//					
//					padPunchingLaydownCheckListHistory = houseKeepingCheckListF02ARepositoryHistory.fetchLastSubmittedRecordLaydown(padPunchingCheckList.getDate());
//					
//					padPunchingLaydownCheckListHistory.setHod_sign(userName);
//					padPunchingLaydownCheckListHistory.setHod_status(AppConstants.hodApprovedStatus);
//					padPunchingLaydownCheckListHistory.setHod_submit_by(userName);
//					padPunchingLaydownCheckListHistory.setHod_submit_id(userId);
//					padPunchingLaydownCheckListHistory.setHod_submit_on(date);
//					
//					houseKeepingCheckListF02ARepositoryHistory.save(padPunchingLaydownCheckListHistory);
//					
//					return new ResponseEntity<>(new ApiResponse(true, "Hod Approved Successfully"), HttpStatus.OK);
//					
//				} else if(approvalResponse.getStatus().equals("Reject")) {
//					
//					String reason = approvalResponse.getRemarks();
//					padPunchingCheckList.setReason(reason);
//					padPunchingCheckList.setHod_sign(userName);
//					padPunchingCheckList.setHod_status(AppConstants.hodRejectedStatus);
//					padPunchingCheckList.setHod_submit_by(userName);
//					padPunchingCheckList.setHod_submit_id(userId);
//					padPunchingCheckList.setHod_submit_on(date);
//					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					padPunchingCheckList.setHrSignature(signature);
//					
//					padPunchingCheckList.setHod_sign(userName);
//					
//					padPunchingHouseKeepingCheckListF26Repository.save(padPunchingCheckList);
//					
//					padPunchingLaydownCheckListHistory = houseKeepingCheckListF02ARepositoryHistory.fetchLastSubmittedRecordLaydown(padPunchingCheckList.getDate());
//					
//					padPunchingLaydownCheckListHistory.setReason(reason);
//					padPunchingLaydownCheckListHistory.setHod_sign(userName);
//					padPunchingLaydownCheckListHistory.setHod_status(AppConstants.hodRejectedStatus);
//					padPunchingLaydownCheckListHistory.setHod_submit_by(userName);
//					padPunchingLaydownCheckListHistory.setHod_submit_id(userId);
//					padPunchingLaydownCheckListHistory.setHod_submit_on(date);
//					
//					houseKeepingCheckListF02ARepositoryHistory.save(padPunchingLaydownCheckListHistory);
//					
//					return new ResponseEntity<>(new ApiResponse(true, "Hod Rejected Successfully"), HttpStatus.OK);
//					
//				} else {
//					return new ResponseEntity(new ApiResponse(false, "Invalid Status for Hod Approval"), HttpStatus.BAD_REQUEST);
//				}
//				
//			} 
//			else if(hodStatus.equalsIgnoreCase(AppConstants.hodApprovedStatus) || hodStatus.equalsIgnoreCase(AppConstants.hodRejectedStatus)) {
//				
//				return new ResponseEntity(new ApiResponse(false, "Already HOD Approved or Rejected"), HttpStatus.BAD_REQUEST);
//			}
//			else {
//				return new ResponseEntity(new ApiResponse(false, "Invalid Status for HOD Approval"), HttpStatus.BAD_REQUEST);
//			}
//			
//		} else {
//			
//			return new ResponseEntity(new ApiResponse(false, hodStatus + "Login with Valid Role to Approve/Reject Form"), HttpStatus.BAD_REQUEST);
//			
//		}
//		
//		
//	} catch(Exception e) {
//		
//		String msg = e.getMessage();
//		log.error("Unable to Approve Record" + msg);
//
//		return new ResponseEntity(
//				new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
//				HttpStatus.BAD_REQUEST);
//		
//		
//	}
//	
//	
//
//	
//}

	public ResponseEntity<?> approveRejectHouseKeepingRecordF009(ApproveResponse approvalResponse,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		PadPunchingHouseKeepingCheckListF26 object = new PadPunchingHouseKeepingCheckListF26();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = padPunchingHouseKeepingCheckListF26Repository.getHousekeepingRecordById(approvalResponse.getId());

			PadPunchingHouseKeepingCleaningCheckListF26History objHistory = new PadPunchingHouseKeepingCleaningCheckListF26History();

			String supervisiorStatus = object.getSupervisor_status();

			String hodStatus = object.getHod_status();

			String hrStatus = object.getHr_status();

			UserImageDetails imageDetails = new UserImageDetails();

			if (hrStatus.equalsIgnoreCase(AppConstants.hrApprovedStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setHod_status(AppConstants.hodApprovedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);
						;
						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHodSignature(signature);

						object.setHod_sign(userName);

						padPunchingHouseKeepingCheckListF26Repository.save(object);

						objHistory = houseKeepingCheckListF02ARepositoryHistory
								.fetchLastSubmittedRecord(object.getDate());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						houseKeepingCheckListF02ARepositoryHistory.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();

						object.setReason(reason);
						object.setHod_status(AppConstants.hodRejectedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHodSignature(signature);

						object.setHod_sign(userName);

						padPunchingHouseKeepingCheckListF26Repository.save(object);

						objHistory = houseKeepingCheckListF02ARepositoryHistory
								.fetchLastSubmittedRecord(object.getDate());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						houseKeepingCheckListF02ARepositoryHistory.save(objHistory);

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

			else if (object.getSupervisor_status().equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
					&& hrStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HR")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setHr_status(AppConstants.hrApprovedStatus);
						object.setHr_submit_on(date);
						object.setHr_submit_by(userName);
						object.setHr_submit_id(userId);
						object.setHr_sign(userName);

						object.setHod_status(AppConstants.waitingStatus);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHrSignature(signature);

						padPunchingHouseKeepingCheckListF26Repository.save(object);

						objHistory = houseKeepingCheckListF02ARepositoryHistory
								.fetchLastSubmittedRecord(object.getDate());

						objHistory.setHr_status(AppConstants.hrApprovedStatus);
						objHistory.setHr_submit_on(date);
						objHistory.setHr_submit_by(userName);
						objHistory.setHr_submit_id(userId);
						objHistory.setHr_sign(userName);

						objHistory.setHod_status(AppConstants.waitingStatus);

						houseKeepingCheckListF02ARepositoryHistory.save(objHistory);

						try {

							padPunchingMailFunction.sendEmailToHodF009(object);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
									HttpStatus.OK);
						}

						return new ResponseEntity<>(new ApiResponse(true, " HR Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						object.setReason(reason);
						object.setHr_status(AppConstants.hrRejectedStatus);
						object.setHr_submit_on(date);
						object.setHr_submit_by(userName);
						object.setHr_submit_id(userId);
						object.setHr_sign(userName);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHrSignature(signature);

						padPunchingHouseKeepingCheckListF26Repository.save(object);

						objHistory = houseKeepingCheckListF02ARepositoryHistory
								.fetchLastSubmittedRecord(object.getDate());

//					bleachLayDownCheckListF42History = dailyRejectionReportF007RepositoryHistory
//							.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
//									bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrderNo());

						objHistory.setReason(reason);
						objHistory.setHr_status(AppConstants.hrRejectedStatus);
						objHistory.setHr_submit_on(date);
						objHistory.setHr_submit_by(userName);
						objHistory.setHr_submit_id(userId);
						objHistory.setHr_sign(userName);

						houseKeepingCheckListF02ARepositoryHistory.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, " HR Rejected Successfully"), HttpStatus.OK);

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

	public ResponseEntity<?> getHouseKeepingSummeryF0A(HttpServletRequest http) {
		List<PadPunchingHouseKeepingCheckListF26> details = null;
		try {
			String userRole = getUserRole();

			if (userRole.equals("ROLE_HR")) {

				Long userId = sca.getUserIdFromRequest(http, tokenProvider);

				details = padPunchingHouseKeepingCheckListF26Repository.getHrHodSummeryDetails();

			} else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				details = padPunchingHouseKeepingCheckListF26Repository.getHrHodSummeryDetails();
			}

			else if (userRole.equals("ROLE_SUPERVISOR")) {

				details = padPunchingHouseKeepingCheckListF26Repository.getSupervisorSummeryDetails();
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
		List<PadPunchingHouseKeepingCheckListF26> details = null;
		try {

			details = padPunchingHouseKeepingCheckListF26Repository.getMonthandYear(month, year);

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

	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}

// PRINT BY PASSING DATE & SHIFT & ORDER NO - F-014

	public ResponseEntity<?> PrintRPProdReportF14(String month, String year) {

		List<PadPunchingHouseKeepingCheckListF26> RPProdReport = new ArrayList<>();

		try {

			RPProdReport = padPunchingHouseKeepingCheckListF26Repository.printRPProdReport(month, year);

			System.out.println("Value is :" + RPProdReport);

			if (RPProdReport.isEmpty()) {

				return new ResponseEntity(
						new ApiResponse(true, "HOD Approval is Pending for the Month :" + " " + month + " "),
						HttpStatus.OK);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("Unable to get Spulance Bale Consumption" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Bale Consumption" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(RPProdReport, HttpStatus.OK);

	}

	/*
	 * f010 HouseKeeping
	 */

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> saveHouseKeepingF010(PadPunchingHouseKeepingCheckListF010 details,
			HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		PadPunchingHouseKeepingCheckListF010 listObj = null;
		try {
			String missingField = "";

			// Mandatory fields check
			if (details.getFormatNo() == null)
				missingField = "formatNo";
			if (details.getRevisionNo() == null)
				missingField = "revisionNo";
			if (details.getFormatName() == null)
				missingField = "formatName";
			if (details.getUnit() == null)
				missingField = "date";
			if (details.getMonth() == null)
				missingField = "month";
			if (details.getYear() == null)
				missingField = "year";

			if (!"".equals(missingField)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields: " + missingField),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			String role = sca.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			// Update logic if ID is present
			if (details.getClean_id() != null) {
				listObj = padPunchingCheckListF010Repo.findById(details.getClean_id()).orElse(null);

				if (listObj == null) {
					return new ResponseEntity<>(new ApiResponse(false, "Entity not found"), HttpStatus.NOT_FOUND);
				}

				// Exclude fields from being copied
				String[] ignoreProps = { "clean_id", "createdBy", "createdAt", "supervisor_status", "hod_status",
						"supervisor_saved_by", "hod_saved_by", "supervisor_saved_on", "hod_saved_on",
						"supervisor_saved_id", "hod_saved_id", "supervisor_sign", "hod_sign" };

				BeanUtils.copyProperties(details, listObj, ignoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {
					if (AppConstants.supervisorApprovedStatus.equals(listObj.getSupervisor_status())) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					listObj.setSupervisor_saved_by(userName);
					listObj.setSupervisor_saved_on(date);
					listObj.setSupervisor_saved_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);

				} else if (role.equals("ROLE_HOD") || "ROLE_DESIGNEE".equals(role)) {
					listObj.setHod_saved_by(userName);
					listObj.setHod_saved_on(date);
					listObj.setHod_saved_id(userId);
					listObj.setHod_status(AppConstants.hodSave);

				} else {
					return new ResponseEntity(new ApiResponse(false, "Role cannot save details."),
							HttpStatus.BAD_REQUEST);
				}

				padPunchingCheckListF010Repo.save(listObj);

			} else { // Create logic
				if (role.equals("ROLE_SUPERVISOR")) {
					details.setSupervisor_saved_by(userName);
					details.setSupervisor_saved_on(date);
					details.setSupervisor_saved_id(userId);
					details.setSupervisor_status(AppConstants.supervisorSave);
				} else if (role.equals("ROLE_HOD") || "ROLE_DESIGNEE".equals(role)) {
					details.setHod_saved_by(userName);
					details.setHod_saved_on(date);
					details.setHod_saved_id(userId);
					details.setHod_status(AppConstants.hodSave);
				} else {
					return new ResponseEntity(new ApiResponse(false, "Role cannot create details."),
							HttpStatus.BAD_REQUEST);
				}

				listObj = padPunchingCheckListF010Repo.save(details);
			}

		} catch (Exception ex) {
			log.error(" **** Unable to save Details! **** ", ex);
			String msg = ex.getMessage();
			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details: " + msg), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitHouseKeepingF010(PadPunchingHouseKeepingCheckListF010 processSetupDetails,
			HttpServletRequest http) {

		PadPunchingHouseKeepingCheckListF010 processsetupdetailsjetlaceanddryerf003 = new PadPunchingHouseKeepingCheckListF010();

		Long id = processSetupDetails.getClean_id();
		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			if (processSetupDetails.getFormatNo() == null)
				value = "formatNo";

			if (processSetupDetails.getRevisionNo() == null)
				value = "revisionNo";
			if (processSetupDetails.getFormatName() == null)
				value = "formatName";
			if (processSetupDetails.getUnit() == null)
				value = "Unit";

			if (processSetupDetails.getDate() == null)
				value = "Date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			if (id != null) {

				processsetupdetailsjetlaceanddryerf003 = padPunchingCheckListF010Repo.getHousekeepingRecordById(id);

				String[] IgnoreProps = { "clean_id", "createdBy", "createdAt", "hr_status", "hr_sign", "hr_submit_id",
						"hr_submit_by", "hr_submit_on", "supervisor_status", "supervisor_saved_on",
						"supervisor_saved_by", "supervisor_saved_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "supervisior_mail_status", "hod_status",
						"hod_saved_on", "hod_saved_by", "hod_saved_id", "hod_submit_on", "hod_submit_by",
						"hod_submit_id", "hod_sign,hod_mail_status", "operator_signature_image",
						"supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(processSetupDetails, processsetupdetailsjetlaceanddryerf003, IgnoreProps);

				if (!processsetupdetailsjetlaceanddryerf003.getSupervisor_status()
						.equals(AppConstants.supervisorApprovedStatus)
						|| processsetupdetailsjetlaceanddryerf003.getHod_status().equals(AppConstants.hodRejectedStatus)
						|| processsetupdetailsjetlaceanddryerf003.getHr_status()
								.equals(AppConstants.hrRejectedStatus)) {

					if (userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)) {
						processsetupdetailsjetlaceanddryerf003
								.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						processsetupdetailsjetlaceanddryerf003.setSupervisor_submit_by(userName);
						processsetupdetailsjetlaceanddryerf003.setSupervisor_submit_on(date);
						processsetupdetailsjetlaceanddryerf003.setSupervisor_submit_id(userId);
						processsetupdetailsjetlaceanddryerf003.setSupervisor_sign(userName);

						processsetupdetailsjetlaceanddryerf003.setHr_status(AppConstants.waitingStatus);

						processsetupdetailsjetlaceanddryerf003.setHod_status("");

						padPunchingCheckListF010Repo.save(processsetupdetailsjetlaceanddryerf003);

						PadPunchingHouseCleaningCheckListF010History rejectionReportHistory = new PadPunchingHouseCleaningCheckListF010History();

						BeanUtils.copyProperties(processsetupdetailsjetlaceanddryerf003, rejectionReportHistory);

						String order1 = rejectionReportHistory.getDate();

						int version = padPunchingHouseKeepingCheckListf010RepoHistory.getMaximumVersion(order1)
								.map(temp -> temp + 1).orElse(1);
						;

						rejectionReportHistory.setVersion(version);

						padPunchingHouseKeepingCheckListf010RepoHistory.save(rejectionReportHistory);

						// YET TO WRITE MAIL CONTENT FOR OPERATOR SUBMIT ...
						try {

							padPunchingMailFunction.sendEmailToHRF015(processSetupDetails);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
								HttpStatus.FORBIDDEN);
					}

				} else {

					return new ResponseEntity(
							new ApiResponse(false, "Unauthorize to Submit Process Setup Details Report"),
							HttpStatus.FORBIDDEN);

				}
			} else {

				if (!userRole.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
				if (userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)) {
					processsetupdetailsjetlaceanddryerf003 = processSetupDetails;
					processsetupdetailsjetlaceanddryerf003.setSupervisor_status(AppConstants.supervisorApprovedStatus);
					processsetupdetailsjetlaceanddryerf003.setSupervisor_submit_by(userName);
					processsetupdetailsjetlaceanddryerf003.setSupervisor_submit_on(date);
					processsetupdetailsjetlaceanddryerf003.setSupervisor_submit_id(userId);
					processsetupdetailsjetlaceanddryerf003.setSupervisor_sign(userName);
					processsetupdetailsjetlaceanddryerf003.setHr_status(AppConstants.waitingStatus);

					processsetupdetailsjetlaceanddryerf003.setHod_status("");
					padPunchingCheckListF010Repo.save(processSetupDetails);

					padPunchingCheckListF010Repo.save(processsetupdetailsjetlaceanddryerf003);

					// AUDIT

					PadPunchingHouseCleaningCheckListF010History rejectionReportHistory = new PadPunchingHouseCleaningCheckListF010History();

					BeanUtils.copyProperties(processSetupDetails, rejectionReportHistory);

					String order1 = rejectionReportHistory.getDate();

					int version = padPunchingHouseKeepingCheckListf010RepoHistory.getMaximumVersion(order1)
							.map(temp -> temp + 1).orElse(1);

					rejectionReportHistory.setVersion(version);

					padPunchingHouseKeepingCheckListf010RepoHistory.save(rejectionReportHistory);

					try {

						padPunchingMailFunction.sendEmailToHRF015(processSetupDetails);
					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
								HttpStatus.OK);
					}

				}
			}
		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("Unable to Submit Process Setup Details" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit Process Setup Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

//		return new ResponseEntity(processsetupdetailsjetlaceanddryerf003, HttpStatus.CREATED);

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

	}

	public ResponseEntity<?> getHouseKeepingF010(String date, HttpServletRequest http) {
		List<PadPunchingHouseKeepingCheckListF010> details = null;
		try {
			String userRole = getUserRole();

			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			details = padPunchingCheckListF010Repo.getDetailsBaseDate(date);

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
//overall get

	public ResponseEntity<?> getHouseKeepingOverallF010(HttpServletRequest http) {
		List<PadPunchingHouseKeepingCheckListF010> details = null;
		try {
			details = padPunchingCheckListF010Repo.findAll();
			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<>("Error Getting House KeepingF02A: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
// APPROVE 

//public ResponseEntity<?> approveRejectHouseKeepingRecordF02A(ApproveResponse approvalResponse, HttpServletRequest http) {
//	
//	SCAUtil sca = new SCAUtil();
//	
//	PadPunchingHouseKeepingCheckListF26 padPunchingCheckList = new PadPunchingHouseKeepingCheckListF26();
//	
//	String userRole = getUserRole();
//	Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//	String userName = userrepository.getUserName(userId);
//	LocalDateTime currentDate = LocalDateTime.now();
//	Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//	
//	try {
//		
//		padPunchingCheckList = padPunchingHouseKeepingCheckListF26Repository.getHousekeepingRecordById(approvalResponse.getId());
//		
//		PadPunchingHouseKeepingCleaningCheckListF26History padPunchingLaydownCheckListHistory = new PadPunchingHouseKeepingCleaningCheckListF26History();
//		
//		String supervisiorStatus = padPunchingCheckList.getSupervisor_status();
//		
//		String hrStatus = padPunchingCheckList.getHr_status();
//		
//		String hodStatus = padPunchingCheckList.getHod_status();
//		
//		UserImageDetails imageDetails = new UserImageDetails();
//		
//		if(userRole.equalsIgnoreCase("ROLE_HR")) {
//			
//			if(supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hrStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
//				
//				if(approvalResponse.getStatus().equals("Approve")) {
//					
//					padPunchingCheckList.setHr_sign(userName);
//					padPunchingCheckList.setHr_status(AppConstants.hrApprovedStatus);
//					padPunchingCheckList.setHr_submit_by(userName);
//					padPunchingCheckList.setHr_submit_id(userId);
//					padPunchingCheckList.setHr_submit_on(date);
//					padPunchingCheckList.setHod_status(AppConstants.waitingStatus);
//					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					padPunchingCheckList.setHrSignature(signature);
//					
//					padPunchingHouseKeepingCheckListF26Repository.save(padPunchingCheckList);
//					
//					padPunchingLaydownCheckListHistory = houseKeepingCheckListF02ARepositoryHistory.fetchLastSubmittedRecordLaydown(padPunchingCheckList.getDate());
//					
//					padPunchingLaydownCheckListHistory.setHr_sign(userName);
//					padPunchingLaydownCheckListHistory.setHr_status(AppConstants.hrApprovedStatus);
//					padPunchingLaydownCheckListHistory.setHr_submit_by(userName);
//					padPunchingLaydownCheckListHistory.setHr_submit_id(userId);
//					padPunchingLaydownCheckListHistory.setHr_submit_on(date);
//					padPunchingLaydownCheckListHistory.setHod_status(AppConstants.waitingStatus);
//					
//					houseKeepingCheckListF02ARepositoryHistory.save(padPunchingLaydownCheckListHistory);
//					
//					return new ResponseEntity<>(new ApiResponse(true, "HR Approved Successfully"), HttpStatus.OK);
//					
//				} else if(approvalResponse.getStatus().equals("Reject")) {
//					
//					String reason = approvalResponse.getRemarks();
//					padPunchingCheckList.setReason(reason);
//					padPunchingCheckList.setHr_sign(userName);
//					padPunchingCheckList.setHr_status(AppConstants.hrRejectedStatus);
//					padPunchingCheckList.setHr_submit_by(userName);
//					padPunchingCheckList.setHr_submit_id(userId);
//					padPunchingCheckList.setHr_submit_on(date);
//					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					padPunchingCheckList.setHrSignature(signature);
//					
//					padPunchingHouseKeepingCheckListF26Repository.save(padPunchingCheckList);
//					
//					padPunchingLaydownCheckListHistory = houseKeepingCheckListF02ARepositoryHistory.fetchLastSubmittedRecordLaydown(padPunchingCheckList.getDate());
//					
//					padPunchingLaydownCheckListHistory.setReason(reason);
//					padPunchingLaydownCheckListHistory.setHr_sign(userName);
//					padPunchingLaydownCheckListHistory.setHr_status(AppConstants.hrRejectedStatus);
//					padPunchingLaydownCheckListHistory.setHr_submit_by(userName);
//					padPunchingLaydownCheckListHistory.setHr_submit_id(userId);
//					padPunchingLaydownCheckListHistory.setHr_submit_on(date);
//					
//					houseKeepingCheckListF02ARepositoryHistory.save(padPunchingLaydownCheckListHistory);
//					
//					return new ResponseEntity<>(new ApiResponse(true, "HR Rejected Successfully"), HttpStatus.OK);
//					
//				} else {
//					return new ResponseEntity(new ApiResponse(false, "Invalid Status for HR Approval"), HttpStatus.BAD_REQUEST);
//				}
//				
//			} 
//			else if(hrStatus.equalsIgnoreCase(AppConstants.hrApprovedStatus) || hrStatus.equalsIgnoreCase(AppConstants.hrRejectedStatus)) {
//				
//				return new ResponseEntity(new ApiResponse(false, "Already HR Approved or Rejected"), HttpStatus.BAD_REQUEST);
//			}
//			else {
//				return new ResponseEntity(new ApiResponse(false, "Invalid Status for HR Approval"), HttpStatus.BAD_REQUEST);
//			}
//			
//		} else if(userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
//			
//			if(hrStatus.equalsIgnoreCase(AppConstants.hrApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
//				
//				if(approvalResponse.getStatus().equals("Approve")) {
//					
//					padPunchingCheckList.setHod_sign(userName);
//					padPunchingCheckList.setHod_status(AppConstants.hodApprovedStatus);
//					padPunchingCheckList.setHod_submit_by(userName);
//					padPunchingCheckList.setHod_submit_id(userId);
//					padPunchingCheckList.setHod_submit_on(date);
//					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					padPunchingCheckList.setHodSignature(signature);
//					
//					padPunchingHouseKeepingCheckListF26Repository.save(padPunchingCheckList);
//					
//					padPunchingLaydownCheckListHistory = houseKeepingCheckListF02ARepositoryHistory.fetchLastSubmittedRecordLaydown(padPunchingCheckList.getDate());
//					
//					padPunchingLaydownCheckListHistory.setHod_sign(userName);
//					padPunchingLaydownCheckListHistory.setHod_status(AppConstants.hodApprovedStatus);
//					padPunchingLaydownCheckListHistory.setHod_submit_by(userName);
//					padPunchingLaydownCheckListHistory.setHod_submit_id(userId);
//					padPunchingLaydownCheckListHistory.setHod_submit_on(date);
//					
//					houseKeepingCheckListF02ARepositoryHistory.save(padPunchingLaydownCheckListHistory);
//					
//					return new ResponseEntity<>(new ApiResponse(true, "Hod Approved Successfully"), HttpStatus.OK);
//					
//				} else if(approvalResponse.getStatus().equals("Reject")) {
//					
//					String reason = approvalResponse.getRemarks();
//					padPunchingCheckList.setReason(reason);
//					padPunchingCheckList.setHod_sign(userName);
//					padPunchingCheckList.setHod_status(AppConstants.hodRejectedStatus);
//					padPunchingCheckList.setHod_submit_by(userName);
//					padPunchingCheckList.setHod_submit_id(userId);
//					padPunchingCheckList.setHod_submit_on(date);
//					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					padPunchingCheckList.setHrSignature(signature);
//					
//					padPunchingCheckList.setHod_sign(userName);
//					
//					padPunchingHouseKeepingCheckListF26Repository.save(padPunchingCheckList);
//					
//					padPunchingLaydownCheckListHistory = houseKeepingCheckListF02ARepositoryHistory.fetchLastSubmittedRecordLaydown(padPunchingCheckList.getDate());
//					
//					padPunchingLaydownCheckListHistory.setReason(reason);
//					padPunchingLaydownCheckListHistory.setHod_sign(userName);
//					padPunchingLaydownCheckListHistory.setHod_status(AppConstants.hodRejectedStatus);
//					padPunchingLaydownCheckListHistory.setHod_submit_by(userName);
//					padPunchingLaydownCheckListHistory.setHod_submit_id(userId);
//					padPunchingLaydownCheckListHistory.setHod_submit_on(date);
//					
//					houseKeepingCheckListF02ARepositoryHistory.save(padPunchingLaydownCheckListHistory);
//					
//					return new ResponseEntity<>(new ApiResponse(true, "Hod Rejected Successfully"), HttpStatus.OK);
//					
//				} else {
//					return new ResponseEntity(new ApiResponse(false, "Invalid Status for Hod Approval"), HttpStatus.BAD_REQUEST);
//				}
//				
//			} 
//			else if(hodStatus.equalsIgnoreCase(AppConstants.hodApprovedStatus) || hodStatus.equalsIgnoreCase(AppConstants.hodRejectedStatus)) {
//				
//				return new ResponseEntity(new ApiResponse(false, "Already HOD Approved or Rejected"), HttpStatus.BAD_REQUEST);
//			}
//			else {
//				return new ResponseEntity(new ApiResponse(false, "Invalid Status for HOD Approval"), HttpStatus.BAD_REQUEST);
//			}
//			
//		} else {
//			
//			return new ResponseEntity(new ApiResponse(false, hodStatus + "Login with Valid Role to Approve/Reject Form"), HttpStatus.BAD_REQUEST);
//			
//		}
//		
//		
//	} catch(Exception e) {
//		
//		String msg = e.getMessage();
//		log.error("Unable to Approve Record" + msg);
//
//		return new ResponseEntity(
//				new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
//				HttpStatus.BAD_REQUEST);
//		
//		
//	}
//	
//	
//
//	
//}

	public ResponseEntity<?> approveRejectHouseKeepingRecordF010(ApproveResponse approvalResponse,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		PadPunchingHouseKeepingCheckListF010 object = new PadPunchingHouseKeepingCheckListF010();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = padPunchingCheckListF010Repo.getHousekeepingRecordById(approvalResponse.getId());

			PadPunchingHouseCleaningCheckListF010History objHistory = new PadPunchingHouseCleaningCheckListF010History();

			String supervisiorStatus = object.getSupervisor_status();

			String hodStatus = object.getHod_status();

			String hrStatus = object.getHr_status();

			UserImageDetails imageDetails = new UserImageDetails();

			if (hrStatus.equalsIgnoreCase(AppConstants.hrApprovedStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setHod_status(AppConstants.hodApprovedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);
						;
						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHodSignature(signature);

						object.setHod_sign(userName);

						padPunchingCheckListF010Repo.save(object);

						objHistory = padPunchingHouseKeepingCheckListf010RepoHistory
								.fetchLastSubmittedRecord(object.getDate());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						padPunchingHouseKeepingCheckListf010RepoHistory.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();

						object.setReason(reason);
						object.setHod_status(AppConstants.hodRejectedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHodSignature(signature);

						object.setHod_sign(userName);

						padPunchingCheckListF010Repo.save(object);

						objHistory = padPunchingHouseKeepingCheckListf010RepoHistory
								.fetchLastSubmittedRecord(object.getDate());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						padPunchingHouseKeepingCheckListf010RepoHistory.save(objHistory);

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

			else if (object.getSupervisor_status().equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
					&& hrStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HR")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setHr_status(AppConstants.hrApprovedStatus);
						object.setHr_submit_on(date);
						object.setHr_submit_by(userName);
						object.setHr_submit_id(userId);
						object.setHr_sign(userName);

						object.setHod_status(AppConstants.waitingStatus);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHrSignature(signature);

						padPunchingCheckListF010Repo.save(object);

						objHistory = padPunchingHouseKeepingCheckListf010RepoHistory
								.fetchLastSubmittedRecord(object.getDate());

						objHistory.setHr_status(AppConstants.hrApprovedStatus);
						objHistory.setHr_submit_on(date);
						objHistory.setHr_submit_by(userName);
						objHistory.setHr_submit_id(userId);
						objHistory.setHr_sign(userName);

						objHistory.setHod_status(AppConstants.waitingStatus);

						padPunchingHouseKeepingCheckListf010RepoHistory.save(objHistory);

						try {

							padPunchingMailFunction.sendEmailToHodF015(object);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
									HttpStatus.OK);
						}

						return new ResponseEntity<>(new ApiResponse(true, " HR Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						object.setReason(reason);
						object.setHr_status(AppConstants.hrRejectedStatus);
						object.setHr_submit_on(date);
						object.setHr_submit_by(userName);
						object.setHr_submit_id(userId);
						object.setHr_sign(userName);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHrSignature(signature);

						padPunchingCheckListF010Repo.save(object);

						objHistory = padPunchingHouseKeepingCheckListf010RepoHistory
								.fetchLastSubmittedRecord(object.getDate());

//					bleachLayDownCheckListF42History = dailyRejectionReportF007RepositoryHistory
//							.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
//									bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrderNo());

						objHistory.setReason(reason);
						objHistory.setHr_status(AppConstants.hrRejectedStatus);
						objHistory.setHr_submit_on(date);
						objHistory.setHr_submit_by(userName);
						objHistory.setHr_submit_id(userId);
						objHistory.setHr_sign(userName);

						padPunchingHouseKeepingCheckListf010RepoHistory.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, " HR Rejected Successfully"), HttpStatus.OK);

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

	public ResponseEntity<?> getHouseKeepingSummeryF010(HttpServletRequest http) {
		List<PadPunchingHouseKeepingCheckListF010> details = null;
		try {
			String userRole = getUserRole();

			if (userRole.equals("ROLE_HR")) {

				Long userId = sca.getUserIdFromRequest(http, tokenProvider);

				details = padPunchingCheckListF010Repo.getHrHodSummeryDetails();

			} else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				details = padPunchingCheckListF010Repo.getHrHodSummeryDetails();
			}

			else if (userRole.equals("ROLE_SUPERVISOR")) {

				details = padPunchingCheckListF010Repo.getSupervisorSummeryDetails();
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

	public ResponseEntity<?> getHouseKeepingMonthYearSummeryF010(String month, String year) {
		List<PadPunchingHouseKeepingCheckListF010> details = null;
		try {

			details = padPunchingCheckListF010Repo.getMonthandYear(month, year);

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting House Keeping Details F02A: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<?> LayDownChecklistF010(String bmr) {

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

// PRINT BY PASSING DATE & SHIFT & ORDER NO - F-014

	public ResponseEntity<?> PrintRPProdReportF010(String month, String year) {

		List<PadPunchingHouseKeepingCheckListF010> RPProdReport = new ArrayList<>();

		try {

			RPProdReport = padPunchingCheckListF010Repo.printRPProdReport(month, year);

			System.out.println("Value is :" + RPProdReport);

			if (RPProdReport.isEmpty()) {

				return new ResponseEntity(
						new ApiResponse(true, "HOD Approval is Pending for the month :" + " " + month + " "),
						HttpStatus.OK);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("Unable to get Spulance Bale Consumption" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Bale Consumption" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(RPProdReport, HttpStatus.OK);

	}

	//// ========================================== PH-PRD05/F-001
	//// ==================================================

//	Bag Making Daily Production Details F-001

	public ResponseEntity<?> SaveBagMakingDailyProductionDetailsF001(
			PadPunchingBagMakingDailyProductionDetailsF001 details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		PadPunchingBagMakingDailyProductionDetailsF001 listObj = null;
		try {

			String value = "";

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getSopNumber() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getDate() == null)
				value = "date";
			if (details.getShift() == null)
				value = "shift";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			String role = sca.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getBagmakingId() != null) {

				listObj = padPunchingBagMakingDailyProduction.findFormById(details.getBagmakingId());

				String[] IgnoreProps = { "bagmakingId", "createdBy", "createdAt", "operator_status", "operator_save_by",
						"operator_save_on", "operator_save_id", "operator_submitted_by", "operator_submitted_on",
						"operator_submitted_id", "operator_sign", "hod_status", "hod_submit_on", "hod_submit_by",
						"hod_submit_id", "hod_sign", "hod_signature_image", "operator_signature_image" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_OPERATOR")) {

					if (listObj.getOperator_status().equals(AppConstants.operatorApprove)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					padPunchingBagMakingDailyProduction.save(listObj);

//					List<PadPunchingBagMakingDailyProductionDetailsF001> list = details.getSanitizationList();
//
//					for (PadPunchingBagMakingDailyProductionDetailsF001 detail : list) {
//
//						if (detail.getListId() != null) {
//							SpunlaceHandSanitizationListF025 obj = spunlaceHandSanitizationListF025Repository
//									.findFormById(detail.getListId());
//							detail.setCreatedAt(obj.getCreatedAt());
//							detail.setCreatedBy(obj.getCreatedBy());
//							spunlaceHandSanitizationListF025Repository.save(detail);
//						}
//
//						detail.setHandSanitizationId(listObj.getHandSanitizationId());
//						spunlaceHandSanitizationListF025Repository.save(detail);
//					}

//					listObj.setSanitizationList(list);

					listObj.setOperator_save_by(userName);
					listObj.setOperator_save_on(date);
					listObj.setOperator_save_id(userId);
					listObj.setOperator_status(AppConstants.operatorSave);

					padPunchingBagMakingDailyProduction.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				if (role.equals("ROLE_OPERATOR")) {

					listObj = details;

					padPunchingBagMakingDailyProduction.save(listObj);

//					List<SpunlaceHandSanitizationListF025> list = details.getSanitizationList();
//
//					for (SpunlaceHandSanitizationListF025 detail : list) {
//
//						if (detail.getListId() != null) {
//							SpunlaceHandSanitizationListF025 obj = spunlaceHandSanitizationListF025Repository
//									.findFormById(detail.getListId());
//							detail.setCreatedAt(obj.getCreatedAt());
//							detail.setCreatedBy(obj.getCreatedBy());
//							spunlaceHandSanitizationListF025Repository.save(detail);
//						}
//
//						detail.setHandSanitizationId(listObj.getHandSanitizationId());
//						spunlaceHandSanitizationListF025Repository.save(detail);
//					}
//
//					listObj.setSanitizationList(list);

					listObj.setOperator_save_by(userName);
					listObj.setOperator_save_on(date);
					listObj.setOperator_save_id(userId);
					listObj.setOperator_status(AppConstants.operatorSave);
//					listObj.setsupervisor_mail_status(AppConstants.waitingStatus);

					padPunchingBagMakingDailyProduction.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//		return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	// Submit

	public ResponseEntity<?> SubmitBagMakingDailyProductionDetails(
			PadPunchingBagMakingDailyProductionDetailsF001 details, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getBagmakingId();

		PadPunchingBagMakingDailyProductionDetailsF001 checkObj = new PadPunchingBagMakingDailyProductionDetailsF001();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getSopNumber() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getDate() == null)
				value = "date";
			if (details.getShift() == null)
				value = "Shift";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			String userName = userrepository.getUserName(userId);

			String role = sca.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = padPunchingBagMakingDailyProduction.findFormById(id);

				String[] IgnoreProps = { "bagmakingId", "createdBy", "createdAt", "operator_status", "operator_save_by",
						"operator_save_on", "operator_save_id", "operator_submitted_by", "operator_submitted_on",
						"operator_submitted_id", "operator_sign", "hod_status", "hod_submit_on", "hod_submit_by",
						"hod_submit_id", "hod_sign", "hod_signature_image", "operator_signature_image" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getOperator_status().equals(AppConstants.operatorApprove)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_OPERATOR")) {

						padPunchingBagMakingDailyProduction.save(checkObj);

//						List<ProcessProductControlDetailsLineF014> list = details.getDetails();
//
//						for (ProcessProductControlDetailsLineF014 detail : list) {
//							detail.setBagId(checkObj.getBagId());
//							processProductControlDetailsLineF014Repository.save(detail);
//						}
//
//						checkObj.setDetails(list);

						checkObj.setOperator_submitted_by(userName);
						checkObj.setOperator_submitted_on(date);
						checkObj.setOperator_submitted_id(userId);
						checkObj.setOperator_status(AppConstants.operatorApprove);
						checkObj.setOperator_sign(userName);

						checkObj.setHod_status(AppConstants.waitingStatus);

						padPunchingBagMakingDailyProduction.save(checkObj);

						// IMAGE

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setOperator_signature_image(signature);

						padPunchingBagMakingDailyProduction.save(checkObj); // ONE TABLE

						PadPunchingBagMakingDailyProductionDetailsHistoryF001 rejectionReportHistory = new PadPunchingBagMakingDailyProductionDetailsHistoryF001();

//						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						// getter setters fields & status

						rejectionReportHistory.setFormatName(checkObj.getFormatName());
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
						rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
						rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
						rejectionReportHistory.setUnit(checkObj.getUnit());
						rejectionReportHistory.setDate(checkObj.getDate());
						rejectionReportHistory.setShift(checkObj.getShift());
						
						rejectionReportHistory.setTotalProductionDetailsInBag(checkObj.getTotalProductionDetailsInBag());
						rejectionReportHistory.setRemarks(checkObj.getRemarks());

						// status
						rejectionReportHistory.setOperator_submitted_by(checkObj.getOperator_submitted_by());
						rejectionReportHistory.setOperator_submitted_id(checkObj.getOperator_submitted_id());
						rejectionReportHistory.setOperator_submitted_on(checkObj.getOperator_submitted_on());
						rejectionReportHistory.setOperator_status(checkObj.getOperator_status());
						rejectionReportHistory.setOperator_sign(checkObj.getOperator_sign());
						rejectionReportHistory.setOperator_signature_image(checkObj.getOperator_signature_image());

						rejectionReportHistory.setHod_status(checkObj.getHod_status());

						// version
						String date1 = rejectionReportHistory.getDate();

						String shift1 = rejectionReportHistory.getShift();

						int version = padPunchingBagMakingDailyProductionHistoryRepo.getMaximumVersion(date1, shift1)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						padPunchingBagMakingDailyProductionHistoryRepo.save(rejectionReportHistory); // ONE HISTORY

//						List<ProcessProductControlDetailsLineF014> historyMapList = checkObj.getDetails();
//
//						for (ProcessProductControlDetailsLineF014 obj : historyMapList) {
//
//							ProcessProductControlDetailsLineHistoryF014 objHistory = new ProcessProductControlDetailsLineHistoryF014();
//
//							BeanUtils.copyProperties(obj, objHistory);
//							objHistory.setId(rejectionReportHistory.getId());
//							processProductControlDetailsLineHistoryF014Repository.save(objHistory);
//
//						}

						try {

							padPunchingMailFunction.sendEmailToHodF013(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_OPERATOR")) {
					return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				padPunchingBagMakingDailyProduction.save(checkObj);

//				List<ProcessProductControlDetailsLineF014> list = details.getDetails();
//
//				for (ProcessProductControlDetailsLineF014 detail : list) {
//					detail.setBagId(checkObj.getBagId());
//					processProductControlDetailsLineF014Repository.save(detail);
//				}
//
//				checkObj.setDetails(list);

				checkObj.setOperator_submitted_by(userName);
				checkObj.setOperator_submitted_on(date);
				checkObj.setOperator_submitted_id(userId);
				checkObj.setOperator_status(AppConstants.operatorApprove);
				checkObj.setOperator_sign(userName);

				checkObj.setHod_status(AppConstants.waitingStatus);

				padPunchingBagMakingDailyProduction.save(checkObj);

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setOperator_signature_image(signature);

				padPunchingBagMakingDailyProduction.save(checkObj); // ONE TABLE

				PadPunchingBagMakingDailyProductionDetailsHistoryF001 rejectionReportHistory = new PadPunchingBagMakingDailyProductionDetailsHistoryF001();

//				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				// getter setters fields & status

				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
				rejectionReportHistory.setUnit(checkObj.getUnit());
				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setShift(checkObj.getShift());
				
				rejectionReportHistory.setTotalProductionDetailsInBag(checkObj.getTotalProductionDetailsInBag());
				rejectionReportHistory.setRemarks(checkObj.getRemarks());

				// status
				rejectionReportHistory.setOperator_submitted_by(checkObj.getOperator_submitted_by());
				rejectionReportHistory.setOperator_submitted_id(checkObj.getOperator_submitted_id());
				rejectionReportHistory.setOperator_submitted_on(checkObj.getOperator_submitted_on());
				rejectionReportHistory.setOperator_status(checkObj.getOperator_status());
				rejectionReportHistory.setOperator_sign(checkObj.getOperator_sign());
				rejectionReportHistory.setOperator_signature_image(checkObj.getOperator_signature_image());

				rejectionReportHistory.setHod_status(checkObj.getHod_status());

				// version
				String date1 = rejectionReportHistory.getDate();

				String shift1 = rejectionReportHistory.getShift();

//				String machineName = rejectionReportHistory.getMachineName();
//				
//				String productName = rejectionReportHistory.getProductName();

				int version = padPunchingBagMakingDailyProductionHistoryRepo.getMaximumVersion(date1, shift1)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				padPunchingBagMakingDailyProductionHistoryRepo.save(rejectionReportHistory); // ONE HISTORY

//				List<ProcessProductControlDetailsLineF014> historyMapList = checkObj.getDetails();
//
//				for (ProcessProductControlDetailsLineF014 obj : historyMapList) {
//
//					ProcessProductControlDetailsLineHistoryF014 objHistory = new ProcessProductControlDetailsLineHistoryF014();
//
//					BeanUtils.copyProperties(obj, objHistory);
//					objHistory.setId(rejectionReportHistory.getId());
//					processProductControlDetailsLineHistoryF014Repository.save(objHistory);
//
//				}

				try {

					padPunchingMailFunction.sendEmailToHodF013(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
							HttpStatus.OK);
				}

			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Operator Submitted Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	// appproveORReject

	public ResponseEntity<?> approveRejectionBagMaking(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		PadPunchingBagMakingDailyProductionDetailsF001 object = new PadPunchingBagMakingDailyProductionDetailsF001();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = padPunchingBagMakingDailyProduction.findFormById(approvalResponse.getId());

			PadPunchingBagMakingDailyProductionDetailsHistoryF001 objHistory = new PadPunchingBagMakingDailyProductionDetailsHistoryF001();

			String supervisiorStatus = object.getOperator_status();

			String hodStatus = object.getHod_status();

			UserImageDetails imageDetails = new UserImageDetails();

			if (supervisiorStatus.equalsIgnoreCase(AppConstants.operatorApprove)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setHod_status(AppConstants.hodApprovedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						padPunchingBagMakingDailyProduction.save(object);

						objHistory = padPunchingBagMakingDailyProductionHistoryRepo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						padPunchingBagMakingDailyProductionHistoryRepo.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						object.setReason(reason);
						object.setHod_status(AppConstants.hodRejectedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						padPunchingBagMakingDailyProduction.save(object);

						objHistory = padPunchingBagMakingDailyProductionHistoryRepo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						padPunchingBagMakingDailyProductionHistoryRepo.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, " HOD Rejected Successfully"), HttpStatus.OK);

					} else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getByDateShiftBagMakingDailyProductionF001(String date, String shift) {
		try {

			PadPunchingBagMakingDailyProductionDetailsF001 list = padPunchingBagMakingDailyProduction
					.findByDateShift(date, shift);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByDateShiftPrintApiBagMakingDailyProductionF001(String date, String shift) {
		try {

			List<PadPunchingBagMakingDailyProductionDetailsF001> list = padPunchingBagMakingDailyProduction
					.findByDateShiftPrintApi(date, shift);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getBagMakingSpecificationSummaryF001(HttpServletRequest http) {

		List<PadPunchingBagMakingDailyProductionDetailsF001> details = null;
		try {
			String userRole = sca.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equalsIgnoreCase(AppConstantsSplunance.operatorRole)) {

				details = padPunchingBagMakingDailyProduction.operatorSummary();
			}

			else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				details = padPunchingBagMakingDailyProduction.hodSummary();
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

////========================================== PH-PRD03/F-008 ==================================================

//////Sanitization Of Machines And Surfaces
//
	public ResponseEntity<?> SaveSanitizationOfMachinesAndSurfacesF21(
			PadPunchingSanitizationOfMachinesAndSurfacesF21 details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		PadPunchingSanitizationOfMachinesAndSurfacesF21 listObj = null;
		try {

			String value = "";

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getSopNumber() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getMachineName() == null)
				value = "machineName";
			if (details.getWeekNo() == null)
				value = "weekNo";
			if (details.getMonth() == null)
				value = "month";
			if (details.getYear() == null)
				value = "year";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			String role = sca.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getSanitizationId() != null) {
				listObj = padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21
						.findFormById(details.getSanitizationId());

				String[] IgnoreProps = { "sanitizationId", "createdBy", "createdAt", "supervisor_status",
						"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
						"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "hod_status", "hod_save_on",
						"hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign",
						"hod_mail_status", "sanitizationList", "supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {

					if (listObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21.save(listObj);

//				List<PadPunchingBagMakingDailyProductionDetailsF001> list = details.getSanitizationList();
//
//				for (PadPunchingBagMakingDailyProductionDetailsF001 detail : list) {
//
//					if (detail.getListId() != null) {
//						SpunlaceHandSanitizationListF025 obj = spunlaceHandSanitizationListF025Repository
//								.findFormById(detail.getListId());
//						detail.setCreatedAt(obj.getCreatedAt());
//						detail.setCreatedBy(obj.getCreatedBy());
//						spunlaceHandSanitizationListF025Repository.save(detail);
//					}
//
//					detail.setHandSanitizationId(listObj.getHandSanitizationId());
//					spunlaceHandSanitizationListF025Repository.save(detail);
//				}

//				listObj.setSanitizationList(list);

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);

					padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				if (role.equals("ROLE_SUPERVISOR")) {

					listObj = details;

					padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21.save(listObj);

//				List<SpunlaceHandSanitizationListF025> list = details.getSanitizationList();
//
//				for (SpunlaceHandSanitizationListF025 detail : list) {
//
//					if (detail.getListId() != null) {
//						SpunlaceHandSanitizationListF025 obj = spunlaceHandSanitizationListF025Repository
//								.findFormById(detail.getListId());
//						detail.setCreatedAt(obj.getCreatedAt());
//						detail.setCreatedBy(obj.getCreatedBy());
//						spunlaceHandSanitizationListF025Repository.save(detail);
//					}
//
//					detail.setHandSanitizationId(listObj.getHandSanitizationId());
//					spunlaceHandSanitizationListF025Repository.save(detail);
//				}
//
//				listObj.setSanitizationList(list);

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);
//				listObj.setsupervisor_mail_status(AppConstants.waitingStatus);

					padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//	return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

//Submit

	public ResponseEntity<?> SubmitSanitizationOFMachinesAndSurfaces(PadPunchingSanitizationOfMachinesAndSurfacesF21  details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();
	 
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}
	 
		Long id = details.getSanitizationId();
	 
		PadPunchingSanitizationOfMachinesAndSurfacesF21 checkObj = new PadPunchingSanitizationOfMachinesAndSurfacesF21();
	 
		try {
			String value = "";
	 
			String createdBy = "";
			Date createdAt = null;
	 
			LocalDateTime currentDate = LocalDateTime.now();
	 
			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
	 
			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getSopNumber() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getMachineName() == null)
				value = "machineName";
			if (details.getWeekNo() == null)
				value = "weekNo";
			if (details.getMonth() == null)
				value = "month";
			if (details.getYear() == null)
				value = "year";
	 
			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}
	 
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	 
			String userName = userrepository.getUserName(userId);
	 
			String role = sca.getUserRoleFromRequest(http, tokenProvider);
	 
			if (id != null) {
	 
				checkObj = padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21.findFormById(id);
	 
				String[] IgnoreProps = { "sanitizationId", "createdBy", "createdAt", "supervisor_status","supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
						"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "hod_status", "hod_save_on",
						"hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign",
						"hod_mail_status", "supervisor_signature_image", "hod_signature_image" };
	 
				BeanUtils.copyProperties(details, checkObj, IgnoreProps);
	 
				if (!checkObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_SUPERVISOR")) {
	 
						padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21.save(checkObj);
	 
//						List<SpunlaceHandSanitizationListF025> list = details.getSanitizationList();
	//
//						for (SpunlaceHandSanitizationListF025 detail : list) {
	//
//							if (detail.getListId() != null) {
//								SpunlaceHandSanitizationListF025 obj = spunlaceHandSanitizationListF025Repository
//										.findFormById(detail.getListId());
//								detail.setCreatedAt(obj.getCreatedAt());
//								detail.setCreatedBy(obj.getCreatedBy());
//								spunlaceHandSanitizationListF025Repository.save(detail);
//							}
	//
//							detail.setHandSanitizationId(checkObj.getHandSanitizationId());
//							spunlaceHandSanitizationListF025Repository.save(detail);
//						}
	//
//						checkObj.setSanitizationList(list);
	 
						checkObj.setSupervisor_submit_by(userName);
						checkObj.setSupervisor_submit_on(date);
						checkObj.setSupervisor_submit_id(userId);
						checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						checkObj.setSupervisor_sign(userName);
	 
						checkObj.setHod_status(AppConstants.waitingStatus);
						checkObj.setHod_mail_status(AppConstants.waitingStatus);
	 
						padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21.save(checkObj);
	 
						// IMAGE
	 
						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
	 
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
	 
						checkObj.setSupervisor_signature_image(signature);
	 
						padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21.save(checkObj); // ONE TABLE
	 
						PadPunchingSanitizationOfMachinesAndSurfacesHistoryF21 rejectionReportHistory = new PadPunchingSanitizationOfMachinesAndSurfacesHistoryF21();
	 
//						BeanUtils.copyProperties(checkObj, rejectionReportHistory);
	 
						// getter setters fields & status
	 
						rejectionReportHistory.setFormatName(checkObj.getFormatName());
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
						rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
						rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
						rejectionReportHistory.setMachineName(checkObj.getMachineName());	
						rejectionReportHistory.setDate(checkObj.getDate());
						rejectionReportHistory.setWeekNo(checkObj.getWeekNo());
						rejectionReportHistory.setMonth(checkObj.getMonth());
						rejectionReportHistory.setYear(checkObj.getYear());	
						
						rejectionReportHistory.setNameOfChemical(checkObj.getNameOfChemical());	
						rejectionReportHistory.setChemicalBatchNumber(checkObj.getChemicalBatchNumber());
						rejectionReportHistory.setExpDate(checkObj.getExpDate());
						rejectionReportHistory.setRollFeedingAreaConveyor(checkObj.getRollFeedingAreaConveyor());
						rejectionReportHistory.setPunchingTools(checkObj.getPunchingTools());
						rejectionReportHistory.setToolsDiesSurfaces(checkObj.getToolsDiesSurfaces());
						rejectionReportHistory.setTravelRollers(checkObj.getTravelRollers());
						rejectionReportHistory.setCarriersWagonMagazine(checkObj.getCarriersWagonMagazine());
						rejectionReportHistory.setPushers(checkObj.getPushers());
						rejectionReportHistory.setChuteForFalu(checkObj.getChuteForFalu());
						rejectionReportHistory.setCuttingTable(checkObj.getCuttingTable());
						rejectionReportHistory.setCuttingBlades(checkObj.getCuttingBlades());
						rejectionReportHistory.setAllPackingTables(checkObj.getAllPackingTables());
						rejectionReportHistory.setRemarks(checkObj.getRevisionNo());
						rejectionReportHistory.setSanitizedBy(checkObj.getSanitizedBy());			
	 
						// status
						rejectionReportHistory.setSupervisor_submit_by(checkObj.getSupervisor_submit_by());
						rejectionReportHistory.setSupervisor_submit_id(checkObj.getSupervisor_submit_id());
						rejectionReportHistory.setSupervisor_submit_on(checkObj.getSupervisor_submit_on());
						rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
						rejectionReportHistory.setSupervisor_sign(checkObj.getSupervisor_sign());
						rejectionReportHistory.setSupervisor_signature_image(checkObj.getSupervisor_signature_image());
	 
						rejectionReportHistory.setHod_status(checkObj.getHod_status());
	 
						// version
						String machineName = rejectionReportHistory.getMachineName();
	 
						String weekNo = rejectionReportHistory.getWeekNo();
						
						String Month = rejectionReportHistory.getMonth();
						
						String year = rejectionReportHistory.getYear();				
								
						int version = padPunchingSanitizationOfMachinesAndSurfacesRepositoryHistoryF21.getMaximumVersion(machineName, weekNo,Month,year)
								.map(temp -> temp + 1).orElse(1);
	 
						rejectionReportHistory.setVersion(version);
	 
						padPunchingSanitizationOfMachinesAndSurfacesRepositoryHistoryF21.save(rejectionReportHistory); // ONE HISTORY
	 
//						List<SpunlaceHandSanitizationListF025> historyMapList = checkObj.getSanitizationList();
	//
//						for (SpunlaceHandSanitizationListF025 obj : historyMapList) {
	//
//							SpunlaceHandSanitizationListHistoryF025 objHistory = new SpunlaceHandSanitizationListHistoryF025();
	//
//							BeanUtils.copyProperties(obj, objHistory);
//							objHistory.setHandSanitizationId(rejectionReportHistory.getHandSanitizationId());
//							spunlaceHandSanitizationListHistoryF025Repo.save(objHistory);
	//
//						}
	 
//	                Mail logic
//						
//						try {
	//
//							spunlacemailfunction.sendEmailToHodF025(checkObj);
//						} catch (Exception ex) {
//							return new ResponseEntity<>(
//									new ApiResponse(false, "Approved but Unable to send mail ! "),
//									HttpStatus.OK);
//						}
	 
					} else {
						return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid Status."), HttpStatus.BAD_REQUEST);
				}
			} else {
	 
				if (!role.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;
	 
				padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21.save(checkObj);
	 
//				List<SpunlaceHandSanitizationListF025> list = details.getSanitizationList();
	//
//				for (SpunlaceHandSanitizationListF025 detail : list) {
	//
//					if (detail.getListId() != null) {
//						SpunlaceHandSanitizationListF025 obj = spunlaceHandSanitizationListF025Repository
//								.findFormById(detail.getListId());
//						detail.setCreatedAt(obj.getCreatedAt());
//						detail.setCreatedBy(obj.getCreatedBy());
//						spunlaceHandSanitizationListF025Repository.save(detail);
//					}
	//
//					detail.setHandSanitizationId(checkObj.getHandSanitizationId());
//					spunlaceHandSanitizationListF025Repository.save(detail);
//				}
	 
//				checkObj.setSanitizationList(list);
	 
				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				checkObj.setSupervisor_sign(userName);
	 
				checkObj.setHod_status(AppConstants.waitingStatus);
				checkObj.setHod_mail_status(AppConstants.waitingStatus);
	 
				padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21.save(checkObj);
	 
				// IMAGE
	 
				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
	 
				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
	 
				checkObj.setSupervisor_signature_image(signature);
	 
				padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21.save(checkObj); // ONE TABLE
	 
				PadPunchingSanitizationOfMachinesAndSurfacesHistoryF21 rejectionReportHistory = new PadPunchingSanitizationOfMachinesAndSurfacesHistoryF21();
	 
//				BeanUtils.copyProperties(checkObj, rejectionReportHistory);
	 
				// getter setters fields & status
	 
				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
				rejectionReportHistory.setMachineName(checkObj.getMachineName());	
				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setWeekNo(checkObj.getWeekNo());
				rejectionReportHistory.setMonth(checkObj.getMonth());
				rejectionReportHistory.setYear(checkObj.getYear());	
				
				rejectionReportHistory.setNameOfChemical(checkObj.getNameOfChemical());	
				rejectionReportHistory.setChemicalBatchNumber(checkObj.getChemicalBatchNumber());
				rejectionReportHistory.setExpDate(checkObj.getExpDate());
				rejectionReportHistory.setRollFeedingAreaConveyor(checkObj.getRollFeedingAreaConveyor());
				rejectionReportHistory.setPunchingTools(checkObj.getPunchingTools());
				rejectionReportHistory.setToolsDiesSurfaces(checkObj.getToolsDiesSurfaces());
				rejectionReportHistory.setTravelRollers(checkObj.getTravelRollers());
				rejectionReportHistory.setCarriersWagonMagazine(checkObj.getCarriersWagonMagazine());
				rejectionReportHistory.setPushers(checkObj.getPushers());
				rejectionReportHistory.setChuteForFalu(checkObj.getChuteForFalu());
				rejectionReportHistory.setCuttingTable(checkObj.getCuttingTable());
				rejectionReportHistory.setCuttingBlades(checkObj.getCuttingBlades());
				rejectionReportHistory.setAllPackingTables(checkObj.getAllPackingTables());
				rejectionReportHistory.setRemarks(checkObj.getRevisionNo());
				rejectionReportHistory.setSanitizedBy(checkObj.getSanitizedBy());		
	 
	 
				// status
				rejectionReportHistory.setSupervisor_submit_by(checkObj.getSupervisor_submit_by());
				rejectionReportHistory.setSupervisor_submit_id(checkObj.getSupervisor_submit_id());
				rejectionReportHistory.setSupervisor_submit_on(checkObj.getSupervisor_submit_on());
				rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
				rejectionReportHistory.setSupervisor_sign(checkObj.getSupervisor_sign());
				rejectionReportHistory.setSupervisor_signature_image(checkObj.getSupervisor_signature_image());
	 
				rejectionReportHistory.setHod_status(checkObj.getHod_status());
	 
				// version
				String machineName = rejectionReportHistory.getMachineName();
	 
				String weekNo = rejectionReportHistory.getWeekNo();
				
				String Month = rejectionReportHistory.getMonth();
				
				String year = rejectionReportHistory.getYear();				
	 
				int version = padPunchingSanitizationOfMachinesAndSurfacesRepositoryHistoryF21.getMaximumVersion(machineName, weekNo, Month, year)
						.map(temp -> temp + 1).orElse(1);
	 
				rejectionReportHistory.setVersion(version);
	 
				padPunchingSanitizationOfMachinesAndSurfacesRepositoryHistoryF21.save(rejectionReportHistory); // ONE HISTORY
	 
//				List<SpunlaceHandSanitizationListF025> historyMapList = checkObj.getSanitizationList();
	//
//				for (SpunlaceHandSanitizationListF025 obj : historyMapList) {
	//
//					SpunlaceHandSanitizationListHistoryF025 objHistory = new SpunlaceHandSanitizationListHistoryF025();
	//
//					BeanUtils.copyProperties(obj, objHistory);
//					objHistory.setHandSanitizationId(rejectionReportHistory.getHandSanitizationId());
//					spunlaceHandSanitizationListHistoryF025Repo.save(objHistory);
	//
//				}
	 
//				Mail logic
	//
//				try {
	//
//					spunlacemailfunction.sendEmailToHodF025(checkObj);
//				} catch (Exception ex) {
//					return new ResponseEntity<>(
//							new ApiResponse(false, "Approved but Unable to send mail ! "),
//							HttpStatus.OK);
//				}
			}
		}
	 
		catch (Exception ex) {
	 
			log.error(" **** Unable to Submit Details **** " + ex);
	 
			String msg = ex.getMessage();
	 
			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);
	 
		}
	 
		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);
	 
//		return new ResponseEntity(checkObj, HttpStatus.CREATED);
	 
	}
//Approve Reject

	public ResponseEntity<?> approveSanitizationOfMachinesAndSurfaces(ApproveResponse approvalResponse,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		PadPunchingSanitizationOfMachinesAndSurfacesF21 object = new PadPunchingSanitizationOfMachinesAndSurfacesF21();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21.findFormById(approvalResponse.getId());

			PadPunchingSanitizationOfMachinesAndSurfacesHistoryF21 objHistory = new PadPunchingSanitizationOfMachinesAndSurfacesHistoryF21();

			String supervisiorStatus = object.getSupervisor_status();

			String hodStatus = object.getHod_status();

			UserImageDetails imageDetails = new UserImageDetails();

			if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setHod_status(AppConstants.hodApprovedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21.save(object);

						objHistory = padPunchingSanitizationOfMachinesAndSurfacesRepositoryHistoryF21
								.fetchLastSubmittedRecord(object.getMachineName(), object.getWeekNo(),
										object.getMonth(), object.getYear());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						padPunchingSanitizationOfMachinesAndSurfacesRepositoryHistoryF21.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						object.setReason(reason);
						object.setHod_status(AppConstants.hodRejectedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21.save(object);

						objHistory = padPunchingSanitizationOfMachinesAndSurfacesRepositoryHistoryF21
								.fetchLastSubmittedRecord(object.getMachineName(), object.getWeekNo(),
										object.getMonth(), object.getYear());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						padPunchingSanitizationOfMachinesAndSurfacesRepositoryHistoryF21.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, " HOD Rejected Successfully"), HttpStatus.OK);

					} else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getBySanitisationOfMachinesAndSurfaces(String machineName, String weekNo, String month,
			String year) {
		try {

			PadPunchingSanitizationOfMachinesAndSurfacesF21 list = padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21
					.findByDateShift(machineName, weekNo, month, year);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByMachineNameWeekNoMonthYearPrint(String month, String year) {
		try {

			List<PadPunchingSanitizationOfMachinesAndSurfacesF21> list = padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21
					.findByDateShiftPrintApi(month, year);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			// Group by machine name
			Map<String, List<PadPunchingSanitizationOfMachinesAndSurfacesF21>> groupedByMachineName = list.stream()
					.collect(Collectors.groupingBy(PadPunchingSanitizationOfMachinesAndSurfacesF21::getMachineName));

			// Convert the map values to a list of lists
			List<List<PadPunchingSanitizationOfMachinesAndSurfacesF21>> responseList = new ArrayList<>(
					groupedByMachineName.values());

			return new ResponseEntity<>(responseList, HttpStatus.OK);

		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getSanitizationOfMachinesAndSurfacesReportSummary(HttpServletRequest http) {

		List<PadPunchingSanitizationOfMachinesAndSurfacesF21> details = null;
		try {
			String userRole = sca.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_SUPERVISOR")) {

				details = padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21.supervisorSummary();
			}

			else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				details = padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21.hodSummary();
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}
	
	
		// CR - LOV LIST
	
	public ResponseEntity<?> chemicalNameLOV() {
		
		List<String> chemicalNameList = new ArrayList<String>();
		
		List<IdAndValuePair> chemicalPairList = new ArrayList<IdAndValuePair>();
		
		try {
			
			chemicalNameList = padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21.fetchChemicalNames();
			
			System.out.println("Chemical Size" + chemicalNameList.size());
			
			Long id = (long) 1;
			
			for(String temp : chemicalNameList) {
				
				IdAndValuePair value = new IdAndValuePair();
				value.setValue(temp);
				value.setId(id);
				
				chemicalPairList.add(value);
				
				id++;
			}
			
		} catch(Exception ex) {
			
			SCAUtil sca = new SCAUtil();
			
			log.error(" *** !!! Unable to fetch Chemical Name !!! ***" + ex);
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Unable to get Chemical Name List !!!" + ex.getMessage()));
			
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(chemicalPairList);
		
	}
	
	
public ResponseEntity<?> batchNameLOV() {
		
		List<String> chemicalNameList = new ArrayList<String>();
		
		List<IdAndValuePair> chemicalPairList = new ArrayList<IdAndValuePair>();
		
		try {
			
			chemicalNameList = padPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21.fetchChemicalBatchNumber();
			
			Long id = (long) 1;
			
			for(String temp : chemicalNameList) {
				
				IdAndValuePair value = new IdAndValuePair();
				value.setValue(temp);
				value.setId(id);
				
				chemicalPairList.add(value);
				
				id++;
			}
			
		} catch(Exception ex) {
			
			SCAUtil sca = new SCAUtil();
			
			log.error(" *** !!! Unable to fetch Chemical Batch Number !!! ***" + ex);
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Unable to get Chemical Batch Number List !!!" + ex.getMessage()));
			
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(chemicalPairList);
		
	}
	

//========================================= Log Book Bag MakingF003 ==================================================

//========================================= Log Book Bag MakingF003 ==================================================

	public ResponseEntity<?> SaveLogBookBagMakingF003(PadPunchingLogBookBagMakingF003 details,
			HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		PadPunchingLogBookBagMakingF003 listObj = null;
		try {

			String value = "";

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getSopNumber() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getDate() == null)
				value = "date";
			if (details.getShift() == null)
				value = "Shift";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			String role = sca.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getLogBookId() != null) {

				listObj = padPunchingLogBookBagMakingF003.findFormById(details.getLogBookId());

				String[] IgnoreProps = { "logBookId", "createdBy", "createdAt", "operator_status", "operator_save_by",
						"operator_save_on", "operator_save_id", "operator_submitted_by", "operator_submitted_on",
						"operator_submitted_id", "operator_sign", "hod_status", "hod_submit_on", "hod_submit_by",
						"hod_submit_id", "hod_sign", "hod_signature_image", "operator_signature_image" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_OPERATOR")) {

					if (listObj.getOperator_status().equals(AppConstants.operatorApprove)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					padPunchingLogBookBagMakingF003.save(listObj);

//				List<ProcessProductControlDetailsLineF014> list = details.getDetails();
//
//				for (ProcessProductControlDetailsLineF014 detail : list) {
//					detail.setBagId(listObj.getBagId());
//					processProductControlDetailsLineF014Repository.save(detail);
//				}
//
//				listObj.setDetails(list);

					listObj.setOperator_save_by(userName);
					listObj.setOperator_save_on(date);
					listObj.setOperator_save_id(userId);
					listObj.setOperator_status(AppConstants.operatorSave);

					padPunchingLogBookBagMakingF003.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + "cannot save details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (role.equals("ROLE_OPERATOR")) {

					listObj = details;

					padPunchingLogBookBagMakingF003.save(listObj);

//				List<PadPunchingLogBookBagMakingF003 list = details.getDetails();
//
//				for (ProcessProductControlDetailsLineF014 detail : list) {
//					detail.setBagId(listObj.getBagId());
//					processProductControlDetailsLineF014Repository.save(detail);
//				}
//
//				listObj.setDetails(list);

					listObj.setOperator_save_by(userName);
					listObj.setOperator_save_on(date);
					listObj.setOperator_save_id(userId);
					listObj.setOperator_status(AppConstants.operatorSave);

					padPunchingLogBookBagMakingF003.save(listObj);

				} else {

					return new ResponseEntity(new ApiResponse(false, role + "cannot save details"),
							HttpStatus.BAD_REQUEST);

				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//	return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

//Submit

	public ResponseEntity<?> SubmitLogBookF003(PadPunchingLogBookBagMakingF003 details, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getLogBookId();

		PadPunchingLogBookBagMakingF003 checkObj = new PadPunchingLogBookBagMakingF003();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getSopNumber() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getDate() == null)
				value = "date";
			if (details.getShift() == null)
				value = "Shift";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			String userName = userrepository.getUserName(userId);

			String role = sca.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = padPunchingLogBookBagMakingF003.findFormById(id);

				String[] IgnoreProps = { "logBookId", "createdBy", "createdAt", "operator_status", "operator_save_by",
						"operator_save_on", "operator_save_id", "operator_submitted_by", "operator_submitted_on",
						"operator_submitted_id", "operator_sign", "hod_status", "hod_submit_on", "hod_submit_by",
						"hod_submit_id", "hod_sign", "hod_signature_image", "operator_signature_image" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getOperator_status().equals(AppConstants.operatorApprove)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_OPERATOR")) {

						padPunchingLogBookBagMakingF003.save(checkObj);

//					List<ProcessProductControlDetailsLineF014> list = details.getDetails();
//
//					for (ProcessProductControlDetailsLineF014 detail : list) {
//						detail.setBagId(checkObj.getBagId());
//						processProductControlDetailsLineF014Repository.save(detail);
//					}
//
//					checkObj.setDetails(list);

						checkObj.setOperator_submitted_by(userName);
						checkObj.setOperator_submitted_on(date);
						checkObj.setOperator_submitted_id(userId);
						checkObj.setOperator_status(AppConstants.operatorApprove);
						checkObj.setOperator_sign(userName);

						checkObj.setHod_status(AppConstants.waitingStatus);

						padPunchingLogBookBagMakingF003.save(checkObj);

						// IMAGE

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setOperator_signature_image(signature);

						padPunchingLogBookBagMakingF003.save(checkObj); // ONE TABLE

						PadPunchingLogBookBagMakingHistoryF003 rejectionReportHistory = new PadPunchingLogBookBagMakingHistoryF003();

//					BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						// getter setters fields & status

						rejectionReportHistory.setFormatName(checkObj.getFormatName());
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
						rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
						rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
						rejectionReportHistory.setUnit(checkObj.getUnit());
						rejectionReportHistory.setMachineNo1(checkObj.getMachineNo1());
						rejectionReportHistory.setMachineNo2(checkObj.getMachineNo2());
						rejectionReportHistory.setMachineAllocationAndProductionDetail(
								checkObj.getMachineAllocationAndProductionDetail());
						rejectionReportHistory.setManpowerAllocation2(checkObj.getManpowerAllocation2());
						rejectionReportHistory.setManpowerAllocation1(checkObj.getManpowerAllocation1());
						rejectionReportHistory.setOrderNo1(checkObj.getOrderNo1());
						rejectionReportHistory.setOrderNo2(checkObj.getOrderNo2());
						rejectionReportHistory.setOrderNo3(checkObj.getOrderNo3());
						rejectionReportHistory.setOrderNo4(checkObj.getOrderNo4());
						rejectionReportHistory.setProductName1(checkObj.getProductName1());
						rejectionReportHistory.setProductName2(checkObj.getProductName2());
						rejectionReportHistory.setProductName3(checkObj.getProductName3());
						rejectionReportHistory.setProductName4(checkObj.getProductName4());

						rejectionReportHistory.setDate(checkObj.getDate());
						rejectionReportHistory.setShift(checkObj.getShift());
						
						rejectionReportHistory.setRemarks(checkObj.getRemarks());
						rejectionReportHistory.setReason(checkObj.getReason());

						// status
						rejectionReportHistory.setOperator_submitted_by(checkObj.getOperator_submitted_by());
						rejectionReportHistory.setOperator_submitted_id(checkObj.getOperator_submitted_id());
						rejectionReportHistory.setOperator_submitted_on(checkObj.getOperator_submitted_on());
						rejectionReportHistory.setOperator_status(checkObj.getOperator_status());
						rejectionReportHistory.setOperator_sign(checkObj.getOperator_sign());
						rejectionReportHistory.setOperator_signature_image(checkObj.getOperator_signature_image());

						rejectionReportHistory.setHod_status(checkObj.getHod_status());

						// version
						String date1 = rejectionReportHistory.getDate();

						String shift1 = rejectionReportHistory.getShift();

//					String MachineNo = rejectionReportHistory.getMachineNo1();		

						int version = padPunchingLogBookBagMakingHistoryF003.getMaximumVersion(date1, shift1)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						padPunchingLogBookBagMakingHistoryF003.save(rejectionReportHistory); // ONE HISTORY

//					List<ProcessProductControlDetailsLineF014> historyMapList = checkObj.getDetails();
//
//					for (ProcessProductControlDetailsLineF014 obj : historyMapList) {
//
//						ProcessProductControlDetailsLineHistoryF014 objHistory = new ProcessProductControlDetailsLineHistoryF014();
//
//						BeanUtils.copyProperties(obj, objHistory);
//						objHistory.setId(rejectionReportHistory.getId());
//						processProductControlDetailsLineHistoryF014Repository.save(objHistory);
//
//					}

						try {
							padPunchingMailFunction.sendEmailToHodF012(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_OPERATOR")) {
					return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				padPunchingLogBookBagMakingF003.save(checkObj);

//			List<ProcessProductControlDetailsLineF014> list = details.getDetails();
//
//			for (ProcessProductControlDetailsLineF014 detail : list) {
//				detail.setBagId(checkObj.getBagId());
//				processProductControlDetailsLineF014Repository.save(detail);
//			}
//
//			checkObj.setDetails(list);

				checkObj.setOperator_submitted_by(userName);
				checkObj.setOperator_submitted_on(date);
				checkObj.setOperator_submitted_id(userId);
				checkObj.setOperator_status(AppConstants.operatorApprove);
				checkObj.setOperator_sign(userName);

				checkObj.setHod_status(AppConstants.waitingStatus);

				padPunchingLogBookBagMakingF003.save(checkObj);

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setOperator_signature_image(signature);

				padPunchingLogBookBagMakingF003.save(checkObj); // ONE TABLE

				PadPunchingLogBookBagMakingHistoryF003 rejectionReportHistory = new PadPunchingLogBookBagMakingHistoryF003();

//			BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				// getter setters fields & status

				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
				rejectionReportHistory.setUnit(checkObj.getUnit());
				rejectionReportHistory.setMachineNo1(checkObj.getMachineNo1());
				rejectionReportHistory.setMachineNo2(checkObj.getMachineNo2());
				rejectionReportHistory
						.setMachineAllocationAndProductionDetail(checkObj.getMachineAllocationAndProductionDetail());
				rejectionReportHistory.setManpowerAllocation2(checkObj.getManpowerAllocation2());
				rejectionReportHistory.setManpowerAllocation1(checkObj.getManpowerAllocation1());
//			rejectionReportHistory.setManpowerAllocation3(checkObj.getManpowerAllocation3());	
//			rejectionReportHistory.setManpowerAllocation4(checkObj.getManpowerAllocation4());	
				rejectionReportHistory.setOrderNo1(checkObj.getOrderNo1());
				rejectionReportHistory.setOrderNo2(checkObj.getOrderNo2());
				rejectionReportHistory.setOrderNo3(checkObj.getOrderNo3());
				rejectionReportHistory.setOrderNo4(checkObj.getOrderNo4());
//			rejectionReportHistory.setOrderNo5(checkObj.getOrderNo5());
//			rejectionReportHistory.setOrderNo6(checkObj.getOrderNo6());
//			rejectionReportHistory.setOrderNo7(checkObj.getOrderNo7());
//			rejectionReportHistory.setOrderNo8(checkObj.getOrderNo8());
				rejectionReportHistory.setProductName1(checkObj.getProductName1());
				rejectionReportHistory.setProductName2(checkObj.getProductName2());
				rejectionReportHistory.setProductName3(checkObj.getProductName3());
				rejectionReportHistory.setProductName4(checkObj.getProductName4());
//			rejectionReportHistory.setProductName5(checkObj.getProductName5());
//			rejectionReportHistory.setProductName6(checkObj.getProductName6());
//			rejectionReportHistory.setProductName7(checkObj.getProductName7());
//			rejectionReportHistory.setProductName8(checkObj.getProductName8());

				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setShift(checkObj.getShift());
				
				rejectionReportHistory.setRemarks(checkObj.getRemarks());
				rejectionReportHistory.setReason(checkObj.getReason());

				// status
				rejectionReportHistory.setOperator_submitted_by(checkObj.getOperator_submitted_by());
				rejectionReportHistory.setOperator_submitted_id(checkObj.getOperator_submitted_id());
				rejectionReportHistory.setOperator_submitted_on(checkObj.getOperator_submitted_on());
				rejectionReportHistory.setOperator_status(checkObj.getOperator_status());
				rejectionReportHistory.setOperator_sign(checkObj.getOperator_sign());
				rejectionReportHistory.setOperator_signature_image(checkObj.getOperator_signature_image());

				rejectionReportHistory.setHod_status(checkObj.getHod_status());

				// version
				String date1 = rejectionReportHistory.getDate();

				String shift1 = rejectionReportHistory.getShift();

//			String machineNo = rejectionReportHistory.getMachineNo1();

				int version = padPunchingLogBookBagMakingHistoryF003.getMaximumVersion(date1, shift1)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				padPunchingLogBookBagMakingHistoryF003.save(rejectionReportHistory); // ONE HISTORY

//			List<ProcessProductControlDetailsLineF014> historyMapList = checkObj.getDetails();

//			for (ProcessProductControlDetailsLineF014 obj : historyMapList) {
//
//				ProcessProductControlDetailsLineHistoryF014 objHistory = new ProcessProductControlDetailsLineHistoryF014();
//
//				BeanUtils.copyProperties(obj, objHistory);
//				objHistory.setId(rejectionReportHistory.getId());
//				processProductControlDetailsLineHistoryF014Repository.save(objHistory);
//
//			}
//
				try {
					padPunchingMailFunction.sendEmailToHodF012(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
							HttpStatus.OK);
				}

			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Operator Submitted Sucessfully"), HttpStatus.OK);

//	return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

//Approve Reject

	public ResponseEntity<?> approveRejectionLogBookBagMakingF003(ApproveResponse approvalResponse,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		PadPunchingLogBookBagMakingF003 object = new PadPunchingLogBookBagMakingF003();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = padPunchingLogBookBagMakingF003.findFormById(approvalResponse.getId());

			PadPunchingLogBookBagMakingHistoryF003 objHistory = new PadPunchingLogBookBagMakingHistoryF003();

			String operatorStatus = object.getOperator_status();

			String hodStatus = object.getHod_status();

			UserImageDetails imageDetails = new UserImageDetails();

			if (operatorStatus.equalsIgnoreCase(AppConstants.operatorApprove)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setHod_status(AppConstants.hodApprovedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						padPunchingLogBookBagMakingF003.save(object);

						objHistory = padPunchingLogBookBagMakingHistoryF003.fetchLastSubmittedRecord(object.getDate(),
								object.getShift());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						padPunchingLogBookBagMakingHistoryF003.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						object.setReason(reason);
						object.setHod_status(AppConstants.hodRejectedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						padPunchingLogBookBagMakingF003.save(object);

						objHistory = padPunchingLogBookBagMakingHistoryF003.fetchLastSubmittedRecord(object.getDate(),
								object.getShift());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						padPunchingLogBookBagMakingHistoryF003.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, " HOD Rejected Successfully"), HttpStatus.OK);

					} else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

//GetBy DateShiftMachineNO

	public ResponseEntity<?> getByDateShiftMachineNoF003(String date, String shift) {
		try {

			PadPunchingLogBookBagMakingF003 list = padPunchingLogBookBagMakingF003.findByDateShift(date, shift);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

//Print Api

	public ResponseEntity<?> getByDateShiftPrintAPiLogBookBagMakingF003(String date, String shift) {
		try {

			List<PadPunchingLogBookBagMakingF003> list = padPunchingLogBookBagMakingF003.findByDateShiftPrintApi(date,
					shift);

			if (list == null || list.isEmpty()) {

//			list = new ArrayList<MetalDetectorCheckListF020>();
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

//Get Summary

	public ResponseEntity<?> getLogBookBagMakingSummaryF003(HttpServletRequest http) {

		List<PadPunchingLogBookBagMakingF003> details = null;
		try {
			String userRole = sca.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_OPERATOR")) {

				details = padPunchingLogBookBagMakingF003.operatorSummary();
			}

			else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				details = padPunchingLogBookBagMakingF003.hodSummary();
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

}
