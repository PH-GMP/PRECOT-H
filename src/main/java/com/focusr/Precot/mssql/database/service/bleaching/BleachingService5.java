package com.focusr.Precot.mssql.database.service.bleaching;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
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
import org.springframework.web.bind.annotation.RequestBody;

import com.focusr.Precot.mssql.database.model.UserImageDetails;
import com.focusr.Precot.mssql.database.model.bleaching.BleachAppliedContRawCottonF04;
import com.focusr.Precot.mssql.database.model.bleaching.BleachContaminationTypesF04;
import com.focusr.Precot.mssql.database.model.bleaching.BleachHandSanitizationABPressF41;
import com.focusr.Precot.mssql.database.model.bleaching.BleachReprocessReportF16;
import com.focusr.Precot.mssql.database.model.bleaching.BleachSanitizationListF41;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachAppliedContRawCottonHistoryF04;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachContaminationTypesHistoryF04;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachHandSanitizationABPressHistoryF41;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachReprocessReportHistory;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachSanitizationListHistoryF41;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachAppliedContRawCottonF04Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachContaminationTypesF04Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachHandSanitizationABPressF41Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachReprocessRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachSanitizationListF41Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachAppliedContRawCottonF04RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachContaminationTypesF04RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachHandSanitizationABPressF41RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachReprocessReportRepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachSanitizationListF41RepositoryHistory;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.BleachMailFunction;
import com.focusr.Precot.util.SCAUtil;

/**
 * 
 * @author Jawahar.M
 * 
 *         Forms -- Form 04, Form 41
 */

@Service
public class BleachingService5 {

	Logger logger = LoggerFactory.getLogger(BleachingService5.class);

	@Autowired
	private BleachAppliedContRawCottonF04Repository bleachAppliedContRawCottonF04Repository;

	@Autowired
	private BleachContaminationTypesF04Repository bleachContaminationTypesF04Repository;

	@Autowired
	private BleachAppliedContRawCottonF04RepositoryHistory appliedContRawCottonF04RepositoryHistory;
	
	@Autowired
	private BleachContaminationTypesF04RepositoryHistory contaminationTypesF04RepositoryHistory;
	
	@Autowired
	private BleachHandSanitizationABPressF41Repository handSanitizationABPressF41Repository;

	@Autowired
	private BleachSanitizationListF41Repository sanitizationListF41Repository;
	
	@Autowired
	private BleachSanitizationListF41RepositoryHistory sanitizationListF41RepositoryHistory;

	@Autowired
	private BleachHandSanitizationABPressF41RepositoryHistory handSanitizationABPressF41RepositoryHistory;
	
	@Autowired
	private BleachReprocessRepository reprocessRepository;
	
	@Autowired
	private BleachReprocessReportRepositoryHistory reprocessRepositoryHistory;
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtTokenProvider tokenProvider;
	
	@Autowired
	private UserImageDetailsRepository imageRepository;

	@Autowired
	BleachMailFunction bleachmailfunction;

	Logger log = LoggerFactory.getLogger(BleachingService4.class);

	SCAUtil sca = new SCAUtil();
	
	
	
	

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> createOrUpdateAppliedRawCotton(BleachAppliedContRawCottonF04 appliedContRawCottonF04,
			HttpServletRequest http) {

		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (userRole.equals("ROLE_SUPERVISOR")) {
				
				Long rawId = appliedContRawCottonF04.getRaw_id();
				
				if(rawId != null)
				{
					BleachAppliedContRawCottonF04 rawAppliedContRawCottonF04 = new BleachAppliedContRawCottonF04();	
					rawAppliedContRawCottonF04 = bleachAppliedContRawCottonF04Repository.appliedRawCottonById(rawId);
					appliedContRawCottonF04.setCreatedAt(rawAppliedContRawCottonF04.getCreatedAt());
					appliedContRawCottonF04.setCreatedBy(rawAppliedContRawCottonF04.getCreatedBy());
				}
				
				appliedContRawCottonF04.setSupervisor_status(AppConstants.supervisorSave);
				appliedContRawCottonF04.setSupervisor_saved_on(date);
				appliedContRawCottonF04.setSupervisor_saved_by(userName);
				appliedContRawCottonF04.setSupervisor_saved_id(userId);
				
				bleachAppliedContRawCottonF04Repository.save(appliedContRawCottonF04);

				List<BleachContaminationTypesF04> list = appliedContRawCottonF04.getDetailsRawCottonF04();
				
				for (BleachContaminationTypesF04 lineDetails : list) {

					Long rawIdId = appliedContRawCottonF04.getRaw_id();

					lineDetails.setRaw_id(rawIdId);

					bleachContaminationTypesF04Repository.save(lineDetails);

				}
				
				appliedContRawCottonF04.setDetailsRawCottonF04(list);
				bleachAppliedContRawCottonF04Repository.save(appliedContRawCottonF04);

			}

//			else if (userRole.equals("ROLE_HOD") || "ROLE_DESIGNEE".equals(userRole)) {
				
//				if(!appliedContRawCottonF04.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus))
//				{
//					return new ResponseEntity(new ApiResponse(false, "ROLE_SUPERVISOR can submit details"),
//							HttpStatus.BAD_REQUEST);
//				}
//
//				appliedContRawCottonF04.setHod_status(AppConstants.hodSave);
//				appliedContRawCottonF04.setHod_saved_on(date);
//				appliedContRawCottonF04.setHod_saved_by(userName);
//				appliedContRawCottonF04.setHod_saved_id(userId);
//
//				bleachAppliedContRawCottonF04Repository.save(appliedContRawCottonF04);
//
//				for (BleachContaminationTypesF04 lineDetails : appliedContRawCottonF04.getDetailsRawCottonF04()) {
//
//					Long rawIdId = appliedContRawCottonF04.getRaw_id();
//
//					lineDetails.setRaw_id(rawIdId);
//
//					bleachContaminationTypesF04Repository.save(lineDetails);
//
//				}

//			}
			
			else {
				return new ResponseEntity(new ApiResponse(false, "ROLE_SUPERVISOR can submit details"),
						HttpStatus.BAD_REQUEST);
			}
			
			return new ResponseEntity<>(appliedContRawCottonF04, HttpStatus.OK);

		}

		catch (Exception e) {

			log.error("***************** Unable to Save  Mix Machine F03 Details!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, "Unable to Save  Mix Machine F03 Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> submitAppliedRawCottonF04(BleachAppliedContRawCottonF04 appliedContRawCottonF04,
			HttpServletRequest http) {

		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (userRole.equals("ROLE_SUPERVISOR")) {

				appliedContRawCottonF04.setSupervisor_status(AppConstants.supervisorApprovedStatus);

				appliedContRawCottonF04.setSupervisor_submit_on(date);
				appliedContRawCottonF04.setSupervisor_submit_by(userName);
				appliedContRawCottonF04.setSupervisor_submit_id(userId);
				appliedContRawCottonF04.setSupervisor_sign(userName);
				appliedContRawCottonF04.setHod_status(AppConstants.waitingStatus);
				appliedContRawCottonF04.setMail_status(AppConstants.waitingStatus);

						// IMAGE
					
				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
				appliedContRawCottonF04.setSupervisisorSignature(signature);
				
				bleachAppliedContRawCottonF04Repository.save(appliedContRawCottonF04);

				
				for (BleachContaminationTypesF04 lineDetails : appliedContRawCottonF04.getDetailsRawCottonF04()) {

					Long rawIdId = appliedContRawCottonF04.getRaw_id();

					lineDetails.setRaw_id(rawIdId);

					bleachContaminationTypesF04Repository.save(lineDetails);

				}
				
					// HISTORY
				
				BleachAppliedContRawCottonHistoryF04 rawCottonHistoryF04 = new BleachAppliedContRawCottonHistoryF04();
				
				rawCottonHistoryF04.setBmrNumber(appliedContRawCottonF04.getBmrNumber());
				rawCottonHistoryF04.setDate(appliedContRawCottonF04.getDate());
				rawCottonHistoryF04.setTotal_0ne(appliedContRawCottonF04.getTotal_0ne());
				rawCottonHistoryF04.setTotal_four(appliedContRawCottonF04.getTotal_four());
				rawCottonHistoryF04.setTotal_three(appliedContRawCottonF04.getTotal_three());
				rawCottonHistoryF04.setTotal_two(appliedContRawCottonF04.getTotal_two());
				rawCottonHistoryF04.setUnit(appliedContRawCottonF04.getUnit());
				rawCottonHistoryF04.setFormatName(appliedContRawCottonF04.getFormatName());
				rawCottonHistoryF04.setFormatNo(appliedContRawCottonF04.getFormatNo());
				rawCottonHistoryF04.setSopNumber(appliedContRawCottonF04.getSopNumber());
				rawCottonHistoryF04.setRevisionNo(appliedContRawCottonF04.getRevisionNo());
				
					// STTAUS
				rawCottonHistoryF04.setSupervisor_sign(appliedContRawCottonF04.getSupervisor_sign());
				rawCottonHistoryF04.setSupervisor_status(appliedContRawCottonF04.getSupervisor_status());
				rawCottonHistoryF04.setSupervisor_submit_by(appliedContRawCottonF04.getSupervisor_submit_by());
				rawCottonHistoryF04.setSupervisor_submit_id(appliedContRawCottonF04.getSupervisor_submit_id());
				rawCottonHistoryF04.setSupervisor_submit_on(appliedContRawCottonF04.getSupervisor_submit_on());
				rawCottonHistoryF04.setHod_status(appliedContRawCottonF04.getHod_status());
				
				int version = appliedContRawCottonF04RepositoryHistory.getMaximumVersion(rawCottonHistoryF04.getBmrNumber()).map(temp -> temp + 1).orElse(1);
				
				rawCottonHistoryF04.setVersion(version);
				
				appliedContRawCottonF04RepositoryHistory.save(rawCottonHistoryF04);
				
				for(BleachContaminationTypesF04 contamination : appliedContRawCottonF04.getDetailsRawCottonF04()) {
					
					BleachContaminationTypesHistoryF04 contaminationHistory = new BleachContaminationTypesHistoryF04();
					
					BeanUtils.copyProperties(contamination, contaminationHistory);
					contaminationHistory.setRaw_id(rawCottonHistoryF04.getRaw_id());
					
					contaminationTypesF04RepositoryHistory.save(contaminationHistory);
					
				}
				
				try {

					bleachmailfunction.sendEmailToHODF04(appliedContRawCottonF04);
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

			return new ResponseEntity(new ApiResponse(true, "Supervisor Submitted Sucessfully"), HttpStatus.OK);

		}

		catch (Exception e) {

			log.error("***************** Unable to Save  Mix Machine F03 Details!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, "Unable to Save  Mix Machine F03 Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getAppliedRawCottonById(Long id) {

		List<BleachAppliedContRawCottonF04> appliedRawCottonList = new ArrayList<>();
		BleachAppliedContRawCottonF04 appliedContRawCottonF04;

		try {
			appliedContRawCottonF04 = bleachAppliedContRawCottonF04Repository.appliedRawCottonById(id);
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Applied Raw cotton Details" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Applied Raw Cotton Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(appliedContRawCottonF04, HttpStatus.OK);
	}

// GET BY BMR NUMBER
	public ResponseEntity<?> getAppliedRawCottonByBmrNumber(String bmrNumber) {

//		BleachAppliedContRawCottonF04 appliedRawCottonList = new BleachAppliedContRawCottonF04();
		List<BleachAppliedContRawCottonF04> Details = new ArrayList<>();

		try {
			Details = bleachAppliedContRawCottonF04Repository.appliedRawCottonByBMR(bmrNumber);
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Applied Raw cotton Details by BMR" + msg);

			return new ResponseEntity(
					new ApiResponse(false, "Failed to get Applied Raw Cotton Details By BMR Number" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(Details, HttpStatus.OK);
	}

	// Caking List......
	public ResponseEntity<?> getSuperviserF04(HttpServletRequest http) {

		List<BleachAppliedContRawCottonF04> Details = null;

		Long userId = sca.getUserIdFromRequest(http, tokenProvider);

		try {

//				Details = bleachmixingchangemachinecleaningf38repository.findAll();
			Details = bleachAppliedContRawCottonF04Repository.getSupervisorSummeryDetails();

			if (Details == null) {

				Details = new ArrayList<BleachAppliedContRawCottonF04>();
			}

		} catch (Exception e) {

			log.error("***************** Unable to get List Of All F03 Form Details!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, "Unable to get List Of All F03 Form Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(Details, HttpStatus.OK);

	}

	// Caking List......
	public ResponseEntity<?> getHodSummeryF04(HttpServletRequest http) {

		List<BleachAppliedContRawCottonF04> Details = null;

		try {

//						Details = bleachmixingchangemachinecleaningf38repository.findAll();
			Details = bleachAppliedContRawCottonF04Repository.getHodSummeryDetails();

			if (Details == null) {

				Details = new ArrayList<BleachAppliedContRawCottonF04>();
			}

		} catch (Exception e) {

			log.error("***************** Unable to get List Of All F03 Form Details!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, "Unable to get List Of All F03 Form Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(Details, HttpStatus.OK);

	}
	
	
	
	
	public ResponseEntity<?> getBmrDetailsF04(String bmr) {
		 
		List<BleachAppliedContRawCottonF04> response = new ArrayList<>();
		try {
 
			response = bleachAppliedContRawCottonF04Repository.getBmrDetailsF04(bmr);
 
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
	
	
	// APPROVE F04
	
	public ResponseEntity<?> approveRejectF04(ApproveResponse approvalResponse, HttpServletRequest http) {
		
		SCAUtil sca = new SCAUtil();
		
		BleachAppliedContRawCottonF04 bleachCheckListF42 = new BleachAppliedContRawCottonF04();
		
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			bleachCheckListF42 = bleachAppliedContRawCottonF04Repository.appliedRawCottonById(approvalResponse.getId());
			
			BleachAppliedContRawCottonHistoryF04 bleachLayDownCheckListF42History = new BleachAppliedContRawCottonHistoryF04();
			
			String supervisiorStatus = bleachCheckListF42.getSupervisor_status();
			
			String hodStatus = bleachCheckListF42.getHod_status();
			
			UserImageDetails imageDetails = new UserImageDetails();
			
			if(supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
				
				if(userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
					
					if(approvalResponse.getStatus().equals("Approve")) {
						
						bleachCheckListF42.setHod_status(AppConstants.hodApprovedStatus);
						bleachCheckListF42.setHod_submit_on(date);
						bleachCheckListF42.setHod_submit_by(userName);
						bleachCheckListF42.setHod_submit_id(userId);
						
						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachCheckListF42.setHodSignature(signature);
						
						bleachCheckListF42.setHod_sign(userName);
						
						bleachAppliedContRawCottonF04Repository.save(bleachCheckListF42);
						
						bleachLayDownCheckListF42History = appliedContRawCottonF04RepositoryHistory.fetchLastSubmittedRecordLaydown(bleachCheckListF42.getBmrNumber());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
					
						
						appliedContRawCottonF04RepositoryHistory.save(bleachLayDownCheckListF42History);
						
						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
						
					}
					
					else if(approvalResponse.getStatus().equals("Reject")) {
						
						String reason = approvalResponse.getRemarks();
						bleachCheckListF42.setReason(reason);
						bleachCheckListF42.setHod_status(AppConstants.hodRejectedStatus);
						bleachCheckListF42.setHod_submit_on(date);
						bleachCheckListF42.setHod_submit_by(userName);
						
						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachCheckListF42.setHodSignature(signature);
						
						bleachCheckListF42.setHod_sign(userName);
						
						bleachAppliedContRawCottonF04Repository.save(bleachCheckListF42);

						
						bleachLayDownCheckListF42History = appliedContRawCottonF04RepositoryHistory.fetchLastSubmittedRecordLaydown(bleachCheckListF42.getBmrNumber());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						
						appliedContRawCottonF04RepositoryHistory.save(bleachLayDownCheckListF42History);
						
						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);
						
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
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(
					new ApiResponse(false, "Failed to approve/reject Applied Raw Cotton Record " + msg),
					HttpStatus.BAD_REQUEST);
			
			
		}
		
	}
	

	// K
	
	public ResponseEntity<?> saveHandSanitizationForm(BleachHandSanitizationABPressF41 handSanAbPressHistoryF41, HttpServletRequest http) {
		
		try {
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			
			if(userRole.equals("ROLE_SUPERVISOR")) {
				
				Long rawId = handSanAbPressHistoryF41.getHandSanitizationId();
				
				if(rawId != null)
				{
					BleachHandSanitizationABPressF41 rawAppliedContRawCottonF04 = new BleachHandSanitizationABPressF41();	
					rawAppliedContRawCottonF04 = handSanitizationABPressF41Repository.fetchHandSanitizationABPressF41ById(rawId);
					handSanAbPressHistoryF41.setCreatedAt(rawAppliedContRawCottonF04.getCreatedAt());
					handSanAbPressHistoryF41.setCreatedBy(rawAppliedContRawCottonF04.getCreatedBy());
				}
				
				handSanAbPressHistoryF41.setSupervisor_status(AppConstants.supervisorSave);
				handSanAbPressHistoryF41.setSupervisor_saved_on(date);
				handSanAbPressHistoryF41.setSupervisor_saved_by(userName);
				handSanAbPressHistoryF41.setSupervisor_saved_id(userId);
				
				handSanitizationABPressF41Repository.save(handSanAbPressHistoryF41);

				List<BleachSanitizationListF41> list = handSanAbPressHistoryF41.getSanitizationList();
				
				for (BleachSanitizationListF41 lineDetails : list) {

					Long rawIdId = handSanAbPressHistoryF41.getHandSanitizationId();

					lineDetails.setHandSanitizationId(rawIdId);

					sanitizationListF41Repository.save(lineDetails);

				}
				
				handSanAbPressHistoryF41.setSanitizationList(list);
				handSanitizationABPressF41Repository.save(handSanAbPressHistoryF41);
				
			} else {
				
				return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to save form !!! "), HttpStatus.BAD_REQUEST);
				
			}
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(
					new ApiResponse(false, "Failed to approve/reject Applied Raw Cotton Record " + msg),
					HttpStatus.BAD_REQUEST);
			
			
		}
		return new ResponseEntity(handSanAbPressHistoryF41, HttpStatus.CREATED);
		
	}
	
	public ResponseEntity<?> saveHandSanitization(
			@RequestBody BleachHandSanitizationABPressF41 handSanitizationABPressF41, HttpServletRequest http) {
		if (handSanitizationABPressF41 == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}

		String role = sca.getUserRoleFromRequest(http, tokenProvider);
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		LocalDateTime now = LocalDateTime.now();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		BleachHandSanitizationABPressF41 newSanitization = new BleachHandSanitizationABPressF41();
		try {
			String missingField = "";
			if (handSanitizationABPressF41.getFormatNo() == null)
				missingField = "formatNo";
			if (handSanitizationABPressF41.getSopNumber() == null)
				missingField = "sopNumber";
			if (handSanitizationABPressF41.getRevisionNo() == null)
				missingField = "revisionNo";

			if (!missingField.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
						HttpStatus.BAD_REQUEST);
			}

			Long id = handSanitizationABPressF41.getHandSanitizationId();
			if (id != null) {
				newSanitization = handSanitizationABPressF41Repository.fetchHandSanitizationABPressF41ById(id);
				if (newSanitization == null) {
					return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
				}

				BeanUtils.copyProperties(handSanitizationABPressF41, newSanitization);
			} else {
				newSanitization = handSanitizationABPressF41;
			}

			List<BleachSanitizationListF41> sanitizationDetails = new ArrayList<>();
			if (handSanitizationABPressF41.getSanitizationList() != null) {
				for (BleachSanitizationListF41 sanitization : handSanitizationABPressF41.getSanitizationList()) {
					sanitization.setHandSanitizationId(newSanitization.getHandSanitizationId());
					sanitizationDetails.add(sanitization);
				}
				sanitizationListF41Repository.saveAll(sanitizationDetails);
			}

			if ("ROLE_SUPERVISOR".equalsIgnoreCase(role)) {
				newSanitization.setSupervisor_status(AppConstants.supervisorSave);
				newSanitization.setSupervisor_saved_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
				newSanitization.setSupervisor_saved_by(username);
				newSanitization.setSupervisor_saved_id(userId);
				newSanitization.setHod_status(AppConstants.waitingStatus);
				handSanitizationABPressF41Repository.save(newSanitization);
			} else if ("ROLE_HOD".equalsIgnoreCase(role) || "ROLE_DESIGNEE".equals(role)) {
				
				if(!newSanitization.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus))
				{
					return new ResponseEntity(new ApiResponse(false, "ROLE_SUPERVISOR can submit details"),
							HttpStatus.BAD_REQUEST);
				}
				
				newSanitization.setHod_status(AppConstants.hodSave);
				newSanitization.setHod_saved_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
				newSanitization.setHod_saved_by(username);
				newSanitization.setHod_saved_id(userId);
				newSanitization.setMail_status(AppConstants.waitingStatus);

				handSanitizationABPressF41Repository.save(newSanitization);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to perform this action"),
						HttpStatus.FORBIDDEN);
			}

		} catch (Exception ex) {
			logger.error(" **** Unable to save Hand Sanitization Details **** ", ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to save Hand Sanitization Details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(newSanitization, HttpStatus.CREATED);
	}

	// kaviya
	public ResponseEntity<?> submitHandSanitization(
			@RequestBody BleachHandSanitizationABPressF41 bleachHandSanitizationABPressF41, HttpServletRequest http) {
		if (bleachHandSanitizationABPressF41 == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}

		SCAUtil scaUtil = new SCAUtil();
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		String role = sca.getUserRoleFromRequest(http, tokenProvider);

		Long id = bleachHandSanitizationABPressF41.getHandSanitizationId();
		BleachHandSanitizationABPressF41 bleachObj = new BleachHandSanitizationABPressF41();
		// Get the current time
		LocalDateTime now = LocalDateTime.now();
		Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
		
		BleachHandSanitizationABPressHistoryF41 handSanAbPressHistoryF41;

		try {
			String missingField = "";
			if (bleachHandSanitizationABPressF41.getFormatNo() == null)
				missingField = "formatNo";
			if (bleachHandSanitizationABPressF41.getSopNumber() == null)
				missingField = "sopNumber";
			if (bleachHandSanitizationABPressF41.getRevisionNo() == null)
				missingField = "revisionNo";

			if (!missingField.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
						HttpStatus.BAD_REQUEST);
			}

			if (id != null) {
				bleachObj = handSanitizationABPressF41Repository.fetchHandSanitizationABPressF41ById(id);
				if (bleachObj == null) {
					return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
				}
			}
				bleachHandSanitizationABPressF41.setCreatedAt(bleachObj.getCreatedAt());
				bleachHandSanitizationABPressF41.setCreatedBy(bleachObj.getCreatedBy());

				String currentStatus = bleachObj.getSupervisor_status();
				String currentMailStatus = bleachObj.getMail_status();

				if ("ROLE_SUPERVISOR".equalsIgnoreCase(role)) {

					if (!AppConstants.hodApprovedStatus.equals(currentStatus)) {

						bleachHandSanitizationABPressF41.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						bleachHandSanitizationABPressF41.setSupervisor_submit_on(date);
						bleachHandSanitizationABPressF41.setSupervisor_sign(userName);
						bleachHandSanitizationABPressF41.setSupervisor_submit_by(userName);
						bleachHandSanitizationABPressF41.setSupervisor_submit_id(userId);
						bleachHandSanitizationABPressF41.setHod_status(AppConstants.waitingStatus);
						bleachHandSanitizationABPressF41.setMail_status(AppConstants.waitingStatus);
						
						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachHandSanitizationABPressF41.setSupervisisorSignature(signature);
						
						handSanitizationABPressF41Repository.save(bleachHandSanitizationABPressF41);
						
						for (BleachSanitizationListF41 sanitization : bleachHandSanitizationABPressF41.getSanitizationList()) {
							sanitization.setHandSanitizationId(bleachHandSanitizationABPressF41.getHandSanitizationId());
							sanitizationListF41Repository.save(sanitization);
						}

						handSanitizationABPressF41Repository.save(bleachHandSanitizationABPressF41);
						
						
						// HISTORY
						
						BleachHandSanitizationABPressHistoryF41 handSanitizationABPressHistoryF41 = new BleachHandSanitizationABPressHistoryF41();
						
						handSanitizationABPressHistoryF41.setUnit(bleachHandSanitizationABPressF41.getUnit());
						handSanitizationABPressHistoryF41.setFormatName(bleachHandSanitizationABPressF41.getFormatName());
						handSanitizationABPressHistoryF41.setFormatNo(bleachHandSanitizationABPressF41.getFormatNo());
						handSanitizationABPressHistoryF41.setRevisionNo(bleachHandSanitizationABPressF41.getRevisionNo());
						handSanitizationABPressHistoryF41.setSopNumber(bleachHandSanitizationABPressF41.getSopNumber());
						handSanitizationABPressHistoryF41.setDate(bleachHandSanitizationABPressF41.getDate());
						handSanitizationABPressHistoryF41.setShift(bleachHandSanitizationABPressF41.getShift());
						
							// STATUS
						handSanitizationABPressHistoryF41.setSupervisor_status(bleachHandSanitizationABPressF41.getSupervisor_status());
						handSanitizationABPressHistoryF41.setSupervisor_sign(bleachHandSanitizationABPressF41.getSupervisor_sign());
						handSanitizationABPressHistoryF41.setSupervisor_submit_by(bleachHandSanitizationABPressF41.getSupervisor_submit_by());
						handSanitizationABPressHistoryF41.setSupervisor_submit_id(bleachHandSanitizationABPressF41.getSupervisor_submit_id());
						handSanitizationABPressHistoryF41.setSupervisor_submit_on(bleachHandSanitizationABPressF41.getSupervisor_submit_on());
						handSanitizationABPressHistoryF41.setHod_status(bleachHandSanitizationABPressF41.getHod_status());
						
						String date1 = handSanitizationABPressHistoryF41.getDate();
						String shift1 = handSanitizationABPressHistoryF41.getShift();
						
						int version = handSanitizationABPressF41RepositoryHistory.getMaximumVersion(date1, shift1).map(temp -> temp + 1).orElse(1);
						
						handSanitizationABPressHistoryF41.setVersion(version);
						
						handSanitizationABPressF41RepositoryHistory.save(handSanitizationABPressHistoryF41);
						
						for(BleachSanitizationListF41 sanitizationListHistoryF41 : bleachHandSanitizationABPressF41.getSanitizationList()) {
							
							System.out.println("ID" + handSanitizationABPressHistoryF41.getHandSanitizationId());
							
							BleachSanitizationListHistoryF41 history = new BleachSanitizationListHistoryF41();
//							BeanUtils.copyProperties(sanitizationListHistoryF41, history);
							
							history.setHour1(sanitizationListHistoryF41.getHour1());
							history.setHour2(sanitizationListHistoryF41.getHour2());
							history.setHour3(sanitizationListHistoryF41.getHour3());
							history.setHour4(sanitizationListHistoryF41.getHour4());
							history.setHour5(sanitizationListHistoryF41.getHour5());
							history.setHour6(sanitizationListHistoryF41.getHour6());
							history.setHour7(sanitizationListHistoryF41.getHour7());
							history.setHour8(sanitizationListHistoryF41.getHour8());
							history.setIdNumber(sanitizationListHistoryF41.getIdNumber());
							history.setRemarks(sanitizationListHistoryF41.getRemarks());
							history.setSerialNumber(sanitizationListHistoryF41.getSerialNumber());
							
							System.out.println("hist" + history.getHour2());
							
							history.setHandSanitizationId(handSanitizationABPressHistoryF41.getHandSanitizationId());
							
							sanitizationListF41RepositoryHistory.save(history);
							
						}
						
						try {

							bleachmailfunction.sendEmailToHODF41(bleachHandSanitizationABPressF41);
						} catch (Exception ex) {
							return new ResponseEntity<>(
									new ApiResponse(false, "Supervisor Approved but Unable to send mail to HOD! "),
									HttpStatus.OK);
						}
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "HOD already approved"),
								HttpStatus.BAD_REQUEST);
					}
				} 

				else {
					return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
							HttpStatus.FORBIDDEN);
				}
			

			
			

		} catch (Exception ex) {
			logger.error(" **** Unable to submit Hand Sanitization Details **** ", ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to submit Hand Sanitization Details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"),
				HttpStatus.OK);
	}

	public ResponseEntity<?> getHandSanitizationForApprovalSummary() {
		List<BleachHandSanitizationABPressF41> bleachHandSanitizationABPressF41s = new ArrayList<>();
		try {
			bleachHandSanitizationABPressF41s = handSanitizationABPressF41Repository.submittedHandSanitization();
			if (bleachHandSanitizationABPressF41s == null) {
				bleachHandSanitizationABPressF41s = new ArrayList<>();
			}
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			String msg = sca.getErrorMessage(e);
			logger.error("***** Unable to Get List of Submitted Hand Sanitization: " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Get List of Submitted Hand Sanitization: " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(bleachHandSanitizationABPressF41s, HttpStatus.OK);
	}

	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}
	
	
	public ResponseEntity<?> approveRejectF41(ApproveResponse approveResponse, HttpServletRequest http) {
		
		SCAUtil sca = new SCAUtil();
		
		BleachHandSanitizationABPressF41 bleachCheckListF42 = new BleachHandSanitizationABPressF41();
		
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			bleachCheckListF42 = handSanitizationABPressF41Repository.fetchHandSanitizationABPressF41ById(approveResponse.getId());
			
			BleachHandSanitizationABPressHistoryF41 bleachLayDownCheckListF42History = new BleachHandSanitizationABPressHistoryF41();
			
			String supervisiorStatus = bleachCheckListF42.getSupervisor_status();
			
			String hodStatus = bleachCheckListF42.getHod_status();
			
			UserImageDetails imageDetails = new UserImageDetails();
			
			if(supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
				
				if(userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
					
					if(approveResponse.getStatus().equals("Approve")) {
						
						bleachCheckListF42.setHod_status(AppConstants.hodApprovedStatus);
						bleachCheckListF42.setHod_submit_on(date);
						bleachCheckListF42.setHod_submit_by(userName);
						bleachCheckListF42.setHod_submit_id(userId);
						
						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachCheckListF42.setHodSignature(signature);
						
						bleachCheckListF42.setHod_sign(userName);
						
						handSanitizationABPressF41Repository.save(bleachCheckListF42);
						
						bleachLayDownCheckListF42History = handSanitizationABPressF41RepositoryHistory.fetchLastSubmittedRecordLaydown(bleachCheckListF42.getDate(), bleachCheckListF42.getShift());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
					
						
						handSanitizationABPressF41RepositoryHistory.save(bleachLayDownCheckListF42History);
						
						return new ResponseEntity<>(new ApiResponse(true, "Hod Approved Successfully"), HttpStatus.OK);
						
					}
					
					else if(approveResponse.getStatus().equals("Reject")) {
						
						String reason = approveResponse.getRemarks();
						bleachCheckListF42.setReason(reason);
						bleachCheckListF42.setHod_status(AppConstants.hodRejectedStatus);
						bleachCheckListF42.setHod_submit_on(date);
						bleachCheckListF42.setHod_submit_id(userId);
						bleachCheckListF42.setHod_submit_by(userName);
						
						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachCheckListF42.setHodSignature(signature);
						
						bleachCheckListF42.setHod_sign(userName);
						
						handSanitizationABPressF41Repository.save(bleachCheckListF42);

						
						bleachLayDownCheckListF42History = handSanitizationABPressF41RepositoryHistory.fetchLastSubmittedRecordLaydown(bleachCheckListF42.getDate(), bleachCheckListF42.getShift());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachCheckListF42.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						
						handSanitizationABPressF41RepositoryHistory.save(bleachLayDownCheckListF42History);
						
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
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(
					new ApiResponse(false, "Failed to approve/reject Hydro Extractor Record " + msg),
					HttpStatus.BAD_REQUEST);
			
			
		}
		
	}

		// SAVE REPROCESS FORM 
	
	public ResponseEntity<?> saveBleachReprocessForm(BleachReprocessReportF16 reprocessReport, HttpServletRequest http) {
		
		String userRole = getUserRole();
		
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			Long id = reprocessReport.getId();
			
			BleachReprocessReportF16 existingBleachReport;
			
			String[] ignoreProps = {
						"supervisorStatus", "supervisorSign", "supervisorSaveBy", "supervisorSavedOn", 
	                      "supervisorSavedId", "supervisorSubmittedId", "supervisorSubmittedBy", 
	                      "supervisorSubmittedOn", "hodStatus", "hodSign", "hodSubmittedBy", 
	                      "hodSubmittedId", "hodSubmittedDate", "qaStatus", "qaSign", "qaSubmittedBy", 
	                      "qaSubmittedId", "qaSubmittedDate", "createdBy", "createdAt"
			};
			
			if(userRole.equalsIgnoreCase(AppConstants.supervisor)) {
				
				if(id!= null) {
					
					existingBleachReport = reprocessRepository.reprocessReportById(id);
					
					BeanUtils.copyProperties(reprocessReport,existingBleachReport, ignoreProps);
					
				} else {
					existingBleachReport = reprocessReport;
				}
				
				reprocessReport.setSupervisorStatus(AppConstants.supervisorSave);
				reprocessReport.setSupervisorSaveBy(userName);
				reprocessReport.setSupervisorSavedId(userId);
				reprocessReport.setSupervisorSavedOn(date);
				
				reprocessRepository.save(reprocessReport);
				
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, userRole + " not authorized to save Bleach Reprocess"));
			}
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			log.error("Unable to save Bleach Reprocess report !!!" + msg);

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to save Bleach Reprocess report !!!" + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(reprocessReport);
	}
	
	
		// SUBMIT REPROCESS FORM 
	
	public ResponseEntity<?> submitReprocessForm(BleachReprocessReportF16 reprocessReport, HttpServletRequest http) {
		
		String userRole = getUserRole();
		
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			Long id = reprocessReport.getId();
			
			BleachReprocessReportF16 existingReprocess;
			
			String[] ignoreProps = {
					"supervisorStatus", "supervisorSign", "supervisorSaveBy", "supervisorSavedOn", 
                      "supervisorSavedId", "supervisorSubmittedId", "supervisorSubmittedBy", 
                      "supervisorSubmittedOn", "hodStatus", "hodSign", "hodSubmittedBy", 
                      "hodSubmittedId", "hodSubmittedDate", "qaStatus", "qaSign", "qaSubmittedBy", 
                      "qaSubmittedId", "qaSubmittedDate", "createdBy", "createdAt"
		};
			
			if(id != null) {
				existingReprocess = reprocessRepository.reprocessReportById(id);
				
				BeanUtils.copyProperties(reprocessReport, existingReprocess, ignoreProps);
				
			} else {
				existingReprocess = reprocessReport;
			}
			
			reprocessReport.setSupervisorStatus(AppConstants.supervisorApprovedStatus);
			reprocessReport.setSupervisorSubmittedBy(userName);
			reprocessReport.setSupervisorSubmittedId(userId);
			reprocessReport.setSupervisorSubmittedOn(date);
			
			reprocessReport.setHodStatus(AppConstants.waitingStatus);
			
			reprocessReport.setQaStatus("");
			
			reprocessRepository.save(reprocessReport);
			
			BleachReprocessReportHistory reprocessHistory = new BleachReprocessReportHistory();
			
			BeanUtils.copyProperties(reprocessReport, reprocessHistory, "id");
			
				// SET VERSION
			
			String bmrNumber = reprocessHistory.getBmrNumber();
			
			String subBatchNumber = reprocessHistory.getSubBatchNumber();
			
			int version = reprocessRepositoryHistory.getMaximumVersion(bmrNumber, subBatchNumber).map(temp -> temp + 1).orElse(1);
			
			reprocessHistory.setVersion(version);
			
			reprocessRepositoryHistory.save(reprocessHistory);
			
//			try {
//
//				mailFunction.sendProductChangeOverMailInspector(productChangeOver);
//			} catch (Exception ex) {
//				
//				String msg = ex.getMessage();
//				return new ResponseEntity<>(new ApiResponse(false, "Supervisor Submitted, but Unable to send mail to QA Inspector !!!" + msg),
//						HttpStatus.OK);
//			}
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			log.error("Unable to save Bleach Reprocess report !!!" + msg);

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to save Bleach Reprocess report !!!" + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Supervisor Submitted Successfully !!!"));
	}
	
	
		// GET REPROCESS SUMMARY 
	
	public ResponseEntity<?> reprocessSummary() {
	
		String userRole = getUserRole();
		
		List<BleachReprocessReportF16> reprocessList = new LinkedList<BleachReprocessReportF16>();
		
		try {
			
			if(userRole.equalsIgnoreCase(AppConstants.supervisor)) {
				
				reprocessList = reprocessRepository.reprocessReportSupervisor();
				
			} else if(userRole.equalsIgnoreCase(AppConstants.hod) || userRole.equalsIgnoreCase(AppConstants.designee)) {
				
				reprocessList = reprocessRepository.reprocessReportHod();
				
			} else if(userRole.equalsIgnoreCase(AppConstants.qa)) {
				
				reprocessList = reprocessRepository.reprocessReportHod();
				
			} else {
				
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, userRole + " not authorized to access form !!!"));
			}
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			log.error("Unable to get Bleach Reprocess report !!!" + msg);

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to get Bleach Reprocess report !!!" + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(reprocessList);
	}
	
	
		// GET BY PRINT
	
	
	
	
		// APPROVAL
	
	public ResponseEntity<?> approveReprocessReport(ApproveResponse approveResponse, HttpServletRequest http) {
		
		String userRole = getUserRole();
		
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			BleachReprocessReportF16 reprocessReport = reprocessRepository.reprocessReportById(approveResponse.getId());
			
			BleachReprocessReportHistory reprocessReportHistory = new BleachReprocessReportHistory();
			
			String supervisorStatus = reprocessReport.getSupervisorStatus();
			
			String hodStatus = reprocessReport.getHodStatus();
			
			String qaStatus = reprocessReport.getQaStatus();
			
			if(userRole.equalsIgnoreCase(AppConstants.hod) || userRole.equalsIgnoreCase(AppConstants.designee)) {
				
				if(approveResponse.getStatus().equalsIgnoreCase(AppConstants.approvalStatus)) {
					
					reprocessReport.setHodStatus(AppConstants.hodApprovedStatus);
					reprocessReport.setHodSign(userName);
					reprocessReport.setHodSubmittedBy(userName);
					reprocessReport.setHodSubmittedId(userId);
					reprocessReport.setHodSubmittedDate(date);
					
					reprocessReport.setQaStatus(AppConstants.waitingStatus);
					
					reprocessRepository.save(reprocessReport);
					
						// SAVE TO HISTORY
					
					reprocessReportHistory = reprocessRepositoryHistory.findLastSubmittedRecord(reprocessReport.getBmrNumber(), reprocessReport.getSubBatchNumber());
					
					reprocessReportHistory.setHodStatus(AppConstants.hodApprovedStatus);
					reprocessReportHistory.setHodSign(userName);
					reprocessReportHistory.setHodSubmittedBy(userName);
					reprocessReportHistory.setHodSubmittedId(userId);
					reprocessReportHistory.setHodSubmittedDate(date);
					
					reprocessReportHistory.setQaStatus(AppConstants.waitingStatus);
					
					reprocessRepositoryHistory.save(reprocessReportHistory);
					
					return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "HOD Approved Successfully !!!"));
					
				} else if(approveResponse.getStatus().equalsIgnoreCase(AppConstants.rejectedStatus)) {
					
					reprocessReport.setHodStatus(AppConstants.hodRejectedStatus);
					reprocessReport.setHodSign(userName);
					reprocessReport.setHodSubmittedBy(userName);
					reprocessReport.setHodSubmittedId(userId);
					reprocessReport.setHodSubmittedDate(date);
					
					reprocessReport.setRejectReason(approveResponse.getRemarks());
					
					reprocessRepository.save(reprocessReport);
					
						// SET HISTORY
					
					reprocessReportHistory = reprocessRepositoryHistory.findLastSubmittedRecord(reprocessReport.getBmrNumber(), reprocessReport.getSubBatchNumber());
					
					reprocessReportHistory.setHodStatus(AppConstants.hodRejectedStatus);
					reprocessReportHistory.setHodSign(userName);
					reprocessReportHistory.setHodSubmittedBy(userName);
					reprocessReportHistory.setHodSubmittedId(userId);
					reprocessReportHistory.setHodSubmittedDate(date);
					
					reprocessReportHistory.setRejectReason(approveResponse.getRemarks());
					
					reprocessRepositoryHistory.save(reprocessReportHistory);
					
					return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "HOD Rejected Successfully !!!"));
					
				} else {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to Approve  !!!"));
				}
				
			} else if(userRole.equalsIgnoreCase(AppConstants.qa)) {
				
				if(approveResponse.getStatus().equalsIgnoreCase(AppConstants.approvalStatus)) {
					
					reprocessReport.setQaStatus(AppConstants.qaApprovedStatus);
					reprocessReport.setQaSign(userName);
					reprocessReport.setQaSubmittedBy(userName);
					reprocessReport.setQaSubmittedDate(date);
					reprocessReport.setQaSubmittedId(userId);
					
					reprocessRepository.save(reprocessReport);
					
						// SET HISTORY 
					
					reprocessReportHistory = reprocessRepositoryHistory.findLastSubmittedRecord(reprocessReport.getBmrNumber(), reprocessReport.getSubBatchNumber());
					
					reprocessReportHistory.setQaStatus(AppConstants.qaApprovedStatus);
					reprocessReportHistory.setQaSign(userName);
					reprocessReportHistory.setQaSubmittedBy(userName);
					reprocessReportHistory.setQaSubmittedDate(date);
					reprocessReportHistory.setQaSubmittedId(userId);
					
					reprocessRepositoryHistory.save(reprocessReportHistory);
					
					return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "QA Approved Successfully !!!"));
					
				} else if(approveResponse.getStatus().equalsIgnoreCase(AppConstants.rejectedStatus)) {
					
					reprocessReport.setQaStatus(AppConstants.qaRejectedStatus);
					reprocessReport.setQaSign(userName);
					reprocessReport.setQaSubmittedBy(userName);
					reprocessReport.setQaSubmittedDate(date);
					reprocessReport.setQaSubmittedId(userId);
					
					reprocessRepository.save(reprocessReport);
					
						// SET HISTORY
					
					reprocessReportHistory = reprocessRepositoryHistory.findLastSubmittedRecord(reprocessReport.getBmrNumber(), reprocessReport.getSubBatchNumber());
					
					reprocessReportHistory.setQaStatus(AppConstants.qaRejectedStatus);
					reprocessReportHistory.setQaSign(userName);
					reprocessReportHistory.setQaSubmittedBy(userName);
					reprocessReportHistory.setQaSubmittedDate(date);
					reprocessReportHistory.setQaSubmittedId(userId);
					reprocessReportHistory.setRejectReason(approveResponse.getRemarks());
					
					reprocessRepositoryHistory.save(reprocessReportHistory);
					
					return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "QA Rejected Successfully !!!"));
					
				} else {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to Approve  !!!"));
				}
				
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, userRole + " not authroized to Access this form !!!"));
			}
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			log.error("Unable to approve Bleach Reprocess report !!!" + msg);

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to approve Bleach Reprocess report !!!" + msg));
		}
		
	}
	
	
		// GET REPROCESS REPORT 
	
	public ResponseEntity<?> getReprocessReportUnique(String bmrNumber, String subBatchNumber) {
		
		List<BleachReprocessReportF16> reprocessReportList = new LinkedList<BleachReprocessReportF16>();
		
		try {
			
			reprocessReportList = reprocessRepository.reprocessReportUnique(bmrNumber, subBatchNumber);
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			log.error("Unable to get Bleach Reprocess report !!!" + msg);

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to get Bleach Reprocess report !!!" + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(reprocessReportList);
		
	}
	
	
	public ResponseEntity<?> getReprocessReportById(Long id) {
		
		List<BleachReprocessReportF16> reprocessReportList = new LinkedList<BleachReprocessReportF16>();
		
		try {
			
			reprocessReportList = reprocessRepository.reprocessReportListById(id);
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			log.error("Unable to get Bleach Reprocess report !!!" + msg);

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to get Bleach Reprocess report !!!" + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(reprocessReportList);
		
	}
	
	
		// PRINT 
	
	public ResponseEntity<?> getReprocessPrint(String date, String bmrNumber) {
		
		List<BleachReprocessReportF16> reprocessReportList = new LinkedList<BleachReprocessReportF16>();
		
		try {
			
			reprocessReportList = reprocessRepository.reprocessReportPrint(bmrNumber, date);
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			log.error("Unable to get Bleach Reprocess report !!!" + msg);

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to get Bleach Reprocess report !!!" + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(reprocessReportList);
		
	}
	
	
	
		// EXCEL 
	
//	public ResponseEntity<?> reprocessExcelReport(String fromDate, String toDate, String date, String bmrNumber) {
//		
//		List<BleachReprocessReportHistory> reprocessReportHistory = new LinkedList<BleachReprocessReportHistory>();
//		
//		try {
//			
//			
//			
//		} catch(Exception e) {
//			
//			String msg = e.getMessage();
//			log.error("Unable to get Bleach Reprocess Excel report !!!" + msg);
//
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to get Bleach Reprocess Excel report !!!" + msg));
//		}
		
		
//	}
	
	
}
