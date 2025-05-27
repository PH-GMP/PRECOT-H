package com.focusr.Precot.mssql.database.service.bleaching;

import java.time.LocalDateTime;
import java.time.Year;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
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
import org.springframework.web.bind.annotation.RequestBody;

import com.focusr.Precot.exception.ResourceNotFoundException;
import com.focusr.Precot.mssql.database.model.UserImageDetails;
import com.focusr.Precot.mssql.database.model.bleaching.BleachEquipmentUsageLogBookCakePressF09;
import com.focusr.Precot.mssql.database.model.bleaching.BleachEquipmentUsageLogbookBlowroomAndCardingF34;
import com.focusr.Precot.mssql.database.model.bleaching.BleachSMSActivitiesF01;
import com.focusr.Precot.mssql.database.model.bleaching.BleachSanitizationOfMechineAndSurfaceF01;
import com.focusr.Precot.mssql.database.model.bleaching.BleachShiftLogBookF36;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachEquipmentUsageLogBookCakePressHistoryF09;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachEquipmentUsageLogbookBlowroomAndCardingHistoryF34;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachSMSActivitiesHistoryF01;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachSanitizationOfMechineAndSurfaceHistoryF01;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachShiftLogBookHistoryF36;
import com.focusr.Precot.mssql.database.repository.EmailDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.ActivitiesF01Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachEquipmentUsageLogBookCakePressF09Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachEquipmentUsageLogbookBlowroomAndCardingF34Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachSanitizationOfMechineAndSurfaceF01Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachShiftLogBookF36Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.ActivitiesF01RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachEquipmentUsageLogBookCakePressF09RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachEquipmentUsageLogbookBlowroomAndCardingF34RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachSanitizationOfMechineAndSurfaceF01RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachShiftLogBookF36RepositoryHistory;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.BleachMailFunction;
import com.focusr.Precot.util.EmailHtmlLoader;
import com.focusr.Precot.util.SCAUtil;

@Service
public class BleachingService3 {

	@Autowired
	BleachShiftLogBookF36Repository bleachshiftlogbookf36repository;
	
	@Autowired
	BleachSanitizationOfMechineAndSurfaceF01Repository bleachsanitizationofmechineandsurfacef01repository;
	
	@Autowired
	BleachSanitizationOfMechineAndSurfaceF01RepositoryHistory bleachSanitizationOfMechineAndSurfaceF01RepositoryHistory;
	
	@Autowired
	private ActivitiesF01RepositoryHistory activitiesF01RepositoryHistory;
	
	@Autowired
	BleachEquipmentUsageLogBookCakePressF09RepositoryHistory cakePressF09RepositoryHistory;
	
	@Autowired
	private EmailDetailsRepository emailDetailsRepository;
	@Autowired
	private UserRepository userrepository;
	@Autowired
	ActivitiesF01Repository activitiesf01repository;
	
	@Autowired
	private BleachEquipmentUsageLogBookCakePressF09Repository bleachequipmentusagelogbookcakepressf09repository;
	@Autowired
	private BleachEquipmentUsageLogbookBlowroomAndCardingF34Repository bleachequipmentusagelogbookblowroomandcardingf34repository;
	@Autowired
	private JwtTokenProvider tokenProvider;
	@Autowired
	EmailHtmlLoader emailhtmlloader;
	@Autowired
	BleachMailFunction bleachmailfunction;
	
	@Autowired
	private UserImageDetailsRepository imageRepository;
	
	@Autowired
	private BleachShiftLogBookF36RepositoryHistory bleachShiftLogBookF36RepositoryHistory;
	
	@Autowired
	BleachEquipmentUsageLogbookBlowroomAndCardingF34RepositoryHistory cardingF34RepositoryHistory;
	
	SCAUtil sca = new SCAUtil();
	private static final Logger log = LoggerFactory.getLogger(BleachShiftLogBookF36.class);

	// create or update f36

	/*
	 * public ResponseEntity<?> createUpdateShiftlogBookF36(@RequestBody
	 * BleachShiftLogBookF36 machineReq, HttpServletRequest http) { if (machineReq
	 * == null) { return new ResponseEntity<>(new ApiResponse(false,
	 * "Machine request cannot be null"), HttpStatus.BAD_REQUEST); } String role =
	 * sca.getUserRoleFromRequest(http, tokenProvider); // Assume you have a
	 * UserDetailsService to fetch user details Authentication authentication =
	 * SecurityContextHolder.getContext().getAuthentication(); String username =
	 * authentication.getName();
	 * 
	 * // Get the current time LocalDateTime now = LocalDateTime.now();
	 * 
	 * BleachShiftLogBookF36 newMachine = new BleachShiftLogBookF36(); try {
	 * BeanUtils.copyProperties(machineReq, newMachine);
	 * 
	 * // Save the new machine details first newMachine =
	 * bleachshiftlogbookf36repository.save(newMachine);
	 * 
	 * List<BleachStoppageDetailsF36> stoppageDetails = new ArrayList<>(); if
	 * (machineReq.getStoppageList() != null) { List<BleachStoppageDetailsF36>
	 * existingStoppages =
	 * bleachstoppagedetailsf36repository.getdetaisByMappedId(machineReq.getSlb_id()
	 * );
	 * 
	 * if (existingStoppages != null && !existingStoppages.isEmpty()) {
	 * bleachstoppagedetailsf36repository.deleteAll(existingStoppages); }
	 * 
	 * for (BleachStoppageDetailsF36 stoppageDetailsF36 :
	 * machineReq.getStoppageList()) { BleachStoppageDetailsF36 stoppage = new
	 * BleachStoppageDetailsF36();
	 * stoppage.setMachineName(stoppageDetailsF36.getMachineName());
	 * stoppage.setFromTime(stoppageDetailsF36.getFromTime());
	 * stoppage.setToTime(stoppageDetailsF36.getToTime());
	 * stoppage.setReason(stoppageDetailsF36.getReason()); //
	 * stoppage.setSlb_id(newMachine.getSlb_id()); stoppageDetails.add(stoppage); }
	 * 
	 * if (!stoppageDetails.isEmpty()) {
	 * newMachine.setStoppageList(stoppageDetails);
	 * bleachstoppagedetailsf36repository.saveAll(stoppageDetails); } }
	 * 
	 * // Handle status based on user role and current status String status =
	 * machineReq.getStatus(); if ("submitted".equalsIgnoreCase(status)) { if
	 * ("ROLE_SUPERVISOR".equalsIgnoreCase(userRole)) {
	 * newMachine.setSupervisor_status(AppConstants.supervisiorStatus);
	 * newMachine.setSupervisor_submitted_on(now);
	 * 
	 * // Save the updated machine details with supervisor status newMachine =
	 * bleachshiftlogbookf36repository.save(newMachine);
	 * 
	 * try { sendEmailToHOD(hodEmail); } catch (Exception ex) { return new
	 * ResponseEntity<>(new ApiResponse(false, "Unable to send mail to HOD! " + ex),
	 * HttpStatus.BAD_REQUEST); }
	 * 
	 * } else if ("ROLE_HOD".equalsIgnoreCase(userRole)) {
	 * newMachine.setHod_status(AppConstants.hodApproved);
	 * newMachine.setMail_status(AppConstants.waitingStatus);
	 * newMachine.setHod_submitted_on(now);
	 * 
	 * // Save the updated machine details with HOD status newMachine =
	 * bleachshiftlogbookf36repository.save(newMachine); } } else if
	 * ("draft".equalsIgnoreCase(status)) {
	 * newMachine.setStatus(AppConstants.waitingStatus);
	 * 
	 * // Save the updated machine details with waiting status newMachine =
	 * bleachshiftlogbookf36repository.save(newMachine); }
	 * 
	 * } catch (Exception e) { log.
	 * error("***************** Unable to save Machine Details! *********************\n"
	 * , e); return new ResponseEntity<>(new ApiResponse(false,
	 * "Unable to save Machine Details: " + e.getMessage()),
	 * HttpStatus.BAD_REQUEST); }
	 * 
	 * return new ResponseEntity<>(newMachine, HttpStatus.CREATED); }
	 */
//=============================================F36===========================================================================//
	public ResponseEntity<?> createUpdateShiftlogBookF36(@RequestBody BleachShiftLogBookF36 machineReq,
			HttpServletRequest http) {
		if (machineReq == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Machine request cannot be null"),
					HttpStatus.BAD_REQUEST);
		}

		String role = sca.getUserRoleFromRequest(http, tokenProvider);
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider); // Assuming user ID is stored in the principal

		// Get the current time
		LocalDateTime now = LocalDateTime.now();

		BleachShiftLogBookF36 newMachine = new BleachShiftLogBookF36();
		try {
			BeanUtils.copyProperties(machineReq, newMachine);

			// Save the new machine details first
//			newMachine = bleachshiftlogbookf36repository.save(newMachine);

			/*
			 * List<BleachStoppageDetailsF36> stoppageDetails = new ArrayList<>(); if
			 * (machineReq.getStoppageList() != null) { List<BleachStoppageDetailsF36>
			 * existingStoppages =
			 * bleachstoppagedetailsf36repository.getdetaisByMappedId(machineReq.getSlb_id()
			 * );
			 * 
			 * if (existingStoppages != null && !existingStoppages.isEmpty()) {
			 * bleachstoppagedetailsf36repository.deleteAll(existingStoppages); }
			 * 
			 * for (BleachStoppageDetailsF36 stoppageDetailsF36 :
			 * machineReq.getStoppageList()) { BleachStoppageDetailsF36 stoppage = new
			 * BleachStoppageDetailsF36();
			 * stoppage.setMachineName(stoppageDetailsF36.getMachineName());
			 * stoppage.setFromTime(stoppageDetailsF36.getFromTime());
			 * stoppage.setToTime(stoppageDetailsF36.getToTime());
			 * stoppage.setReason(stoppageDetailsF36.getReason()); //
			 * stoppage.setSlb_id(newMachine.getSlb_id()); stoppageDetails.add(stoppage); }
			 * 
			 * if (!stoppageDetails.isEmpty()) {
			 * newMachine.setStoppageList(stoppageDetails);
			 * bleachstoppagedetailsf36repository.saveAll(stoppageDetails); } }
			 */

			// Handle status based on user role
			if ("ROLE_SUPERVISOR".equalsIgnoreCase(role)) {
				newMachine.setSupervisor_status(AppConstants.supervisorSave);
				newMachine.setSupervisor_saved_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
				newMachine.setSupervisor_saved_by(username);
				newMachine.setSupervisor_saved_id(userId);
//				newMachine.setSupervisor_sign(username);

				// Save the updated machine details with supervisor status
				newMachine = bleachshiftlogbookf36repository.save(newMachine);

//	             try {
//	                    sendEmailToHOD(hodEmail);
//	                } catch (Exception ex) {
//	                    return new ResponseEntity<>(new ApiResponse(false, "Unable to send mail to HOD! " + ex), HttpStatus.BAD_REQUEST);
//	                }

			} else if ("ROLE_HOD".equalsIgnoreCase(role)||"ROLE_DESIGNEE".equals(role)) {
				
				if(!newMachine.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus))
				{
					return new ResponseEntity(new ApiResponse(false, "ROLE_SUPERVISOR can submit details"),
							HttpStatus.BAD_REQUEST);
				}
				
				newMachine.setHod_status(AppConstants.hodSave);
				newMachine.setHod_saved_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
				newMachine.setHod_saved_by(username);
				newMachine.setHod_saved_id(userId);
//				newMachine.setHod_sign(username);
				newMachine.setMail_status(AppConstants.waitingStatus);

				// Save the updated machine details with HOD status
				newMachine = bleachshiftlogbookf36repository.save(newMachine);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to perform this action"),
						HttpStatus.FORBIDDEN);
			}

		} catch (Exception e) {
			log.error("***************** Unable to save Machine Details! *********************\n", e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to save Machine Details: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(newMachine, HttpStatus.CREATED);
	}

	// get f36 by id
	public ResponseEntity<?> ShiftlogbookDetails(Long slb_id) {
		BleachShiftLogBookF36 newMachine = new BleachShiftLogBookF36();

		try {
			newMachine = bleachshiftlogbookf36repository.getdetaisById(slb_id);
		} catch (Exception e) {
			log.error("***************** Unable to get list Of ShiftlogbookDetails *********************\n", e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity<>(new ApiResponse(false, "Unable to get list Of ShiftlogbookDetails! " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(newMachine, HttpStatus.OK);
	}

	// get details by shift date in post method

	/*
	 * public ResponseEntity<?> createOrUpdateSanitizationofMechineAndSurfaces(
	 * BleachSanitizationOfMechineAndSurfaceF01 record, HttpServletRequest http) {
	 * 
	 * BleachSanitizationOfMechineAndSurfaceF01 BSMSF01 = new
	 * BleachSanitizationOfMechineAndSurfaceF01();
	 * 
	 * try { if (record != null) { BeanUtils.copyProperties(record, BSMSF01);
	 * BSMSF01 = bleachsanitizationofmechineandsurfacef01repository.save(BSMSF01);
	 * 
	 * // Update activities List<BleachSMSActivitiesF01> existingActivities =
	 * activitiesf01repository.getActivitesf01(record.getSms_id());
	 * 
	 * existingActivities.clear();
	 * existingActivities.addAll(record.getActivitesf01());
	 * BSMSF01.setActivitesf01(existingActivities);
	 * 
	 * 
	 * } }catch (Exception e) { // Log the error and return a response log.
	 * error("***************** Unable to save Sanitization Details!  *********************\n"
	 * + e);
	 * 
	 * return new ResponseEntity<>(new ApiResponse(false,
	 * "Unable to save Sanitization Details!"), HttpStatus.BAD_REQUEST); }
	 * 
	 * 
	 * return new ResponseEntity<>(BSMSF01, HttpStatus.OK); }
	 */

	// APPROVE F36
	
	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}

	public ResponseEntity<?> approveShiftLogBookF36(ApproveResponse approvalResponse,
			HttpServletRequest http) {

		
		SCAUtil sca = new SCAUtil();
		
		BleachShiftLogBookF36 bleachCheckListF42 = new BleachShiftLogBookF36();
		
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			bleachCheckListF42 = bleachshiftlogbookf36repository.getdetaisById(approvalResponse.getId());
			
			BleachShiftLogBookHistoryF36 bleachLayDownCheckListF42History = new BleachShiftLogBookHistoryF36();
			
			String supervisiorStatus = bleachCheckListF42.getSupervisor_status();
			
			String hodStatus = bleachCheckListF42.getHod_status();
			
			UserImageDetails imageDetails = new UserImageDetails();
			
			if(supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
				
				if(userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
					
					if(approvalResponse.getStatus().equals("Approve")) {
						
						bleachCheckListF42.setHod_status(AppConstants.hodApprovedStatus);
						bleachCheckListF42.setHod_submit_on(date);
						bleachCheckListF42.setHod_submit_by(userName);
						
						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachCheckListF42.setSupervisiorImage(signature);
						
						bleachCheckListF42.setHod_sign(userName);
						
						bleachshiftlogbookf36repository.save(bleachCheckListF42);
						
						bleachLayDownCheckListF42History = bleachShiftLogBookF36RepositoryHistory.fetchLastSubmittedRecords(bleachCheckListF42.getDate(), bleachCheckListF42.getShift());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_sign(userName);
					
						
						bleachShiftLogBookF36RepositoryHistory.save(bleachLayDownCheckListF42History);
						
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
						bleachCheckListF42.setHodImage(signature);;
						
						bleachCheckListF42.setHod_sign(userName);
						
						bleachshiftlogbookf36repository.save(bleachCheckListF42);

						
						bleachLayDownCheckListF42History = bleachShiftLogBookF36RepositoryHistory.fetchLastSubmittedRecords(bleachCheckListF42.getDate(), bleachCheckListF42.getShift());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						
						bleachShiftLogBookF36RepositoryHistory.save(bleachLayDownCheckListF42History);
						
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
					new ApiResponse(false, "Failed to approve/reject Hydro Extractor Record " + msg),
					HttpStatus.BAD_REQUEST);
			
			
		}
		
	
		
	
	}
	
	
	public ResponseEntity<?> approveShiftLogBook(@RequestBody BleachShiftLogBookF36 approveResponse,
			HttpServletRequest http) {

		if (approveResponse == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Machine request cannot be null"),
					HttpStatus.BAD_REQUEST);
		}

		String role = sca.getUserRoleFromRequest(http, tokenProvider);
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider); // Assuming user ID is stored in the principal

		// Get the current time
		LocalDateTime now = LocalDateTime.now();

		BleachShiftLogBookF36 newMachine = new BleachShiftLogBookF36();

		BeanUtils.copyProperties(approveResponse, newMachine);

		// Save the new machine details first
//		newMachine = bleachshiftlogbookf36repository.save(newMachine);

		String currentStatus = newMachine.getHod_status();
		String currentMailStatus = newMachine.getMail_status();
		String supervisorStatus = newMachine.getSupervisor_status();

		// Get the current time

		Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
		if ("ROLE_SUPERVISOR".equalsIgnoreCase(role)) {
			
			if (!AppConstants.hodApprovedStatus.equals(currentStatus)) {
				newMachine.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				newMachine.setSupervisor_submit_on(date);
				newMachine.setSupervisor_submit_by(username);
				newMachine.setSupervisor_submit_id(userId);
				newMachine.setSupervisor_sign(username);
				newMachine.setMail_status(AppConstants.waitingStatus);
				newMachine.setHod_status(AppConstants.waitingStatus);
				
					// IMAGE
					
				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(username);
				
				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
				
				newMachine.setSupervisiorImage(signature);
				
				bleachshiftlogbookf36repository.save(newMachine);
				
					// HISTORY
				
				BleachShiftLogBookHistoryF36 bleachShiftLogBookHistoryF36 = new BleachShiftLogBookHistoryF36();
				
				BeanUtils.copyProperties(newMachine, bleachShiftLogBookHistoryF36);
				
				String historydDate = bleachShiftLogBookHistoryF36.getDate();
				
				String historyShift = bleachShiftLogBookHistoryF36.getShift();
				
				int version = bleachShiftLogBookF36RepositoryHistory.getMaximumVersion(historydDate, historyShift).map(temp -> temp + 1).orElse(1);
				
				bleachShiftLogBookHistoryF36.setVersion(version);
				
				bleachShiftLogBookF36RepositoryHistory.save(bleachShiftLogBookHistoryF36);
				
				try {

					bleachmailfunction.sendEmailToHODF36(newMachine);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Supervisor Approved but Unable to send mail to HOD! "),
							HttpStatus.OK);
				}
				return new ResponseEntity<>(new ApiResponse(true, "Supervisor Approved Successfully"), HttpStatus.OK);
				
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "HOD already approved"), HttpStatus.BAD_REQUEST);
			}
		} else if ("ROLE_HOD".equalsIgnoreCase(role)||"ROLE_DESIGNEE".equals(role)) 
		{
			if(!newMachine.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus))
			{
				return new ResponseEntity(new ApiResponse(false, "ROLE_SUPERVISOR can submit details"),
						HttpStatus.BAD_REQUEST);
			}
			
			if (!AppConstants.hodApprovedStatus.equals(currentStatus)
					|| AppConstants.waitingStatus.equals(currentMailStatus)) {
				newMachine.setHod_status(AppConstants.hodApprovedStatus);
				newMachine.setHod_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
				newMachine.setHod_sign(username);
				newMachine.setHod_submit_by(username);
				newMachine.setHod_submit_id(userId);
				bleachshiftlogbookf36repository.save(newMachine);
				
			} else {
				if (AppConstants.hodApprovedStatus.equalsIgnoreCase(currentStatus)) {
					return new ResponseEntity<>(new ApiResponse(false, "Already Approved in Application"),
							HttpStatus.BAD_REQUEST);
				} else if (AppConstants.hodApprovedStatus.equalsIgnoreCase(currentMailStatus)) {
					return new ResponseEntity<>(new ApiResponse(false, "Already Approved in Mail"),
							HttpStatus.BAD_REQUEST);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "Invalid Response"), HttpStatus.BAD_REQUEST);
				}
			}
		} else {
			return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
					HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
	}
	

//=============================================================F01============================================================================//
	// SANITIZATION OF MECHINE AND SURFACES F01
	public ResponseEntity<?> saveSanitizationMachineSurfaces(
	        @RequestBody BleachSanitizationOfMechineAndSurfaceF01 sanitization, HttpServletRequest http) {
	    if (sanitization == null) {
	        return new ResponseEntity<>(new ApiResponse(false, "Sanitization request cannot be null"),
	                HttpStatus.BAD_REQUEST);
	    }

	    String role = sca.getUserRoleFromRequest(http, tokenProvider);
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String username = authentication.getName();
	    Long userId = sca.getUserIdFromRequest(http, tokenProvider); // Assuming user ID is stored in the principal

	    // Get the current time
	    LocalDateTime now = LocalDateTime.now();
	    Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());

	    BleachSanitizationOfMechineAndSurfaceF01 newSanitization = new BleachSanitizationOfMechineAndSurfaceF01();
	    try {
	        if (sanitization.getFormatNo() == null || sanitization.getSopNumber() == null
	                || sanitization.getRevisionNo() == null) {
	            return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields!"),
	                    HttpStatus.BAD_REQUEST);
	        }

	        if (sanitization.getSms_id() != null) {
	            newSanitization = bleachsanitizationofmechineandsurfacef01repository.findById(sanitization.getSms_id())
	                    .orElseThrow(() -> new ResourceNotFoundException("Sanitization Log", "id",
	                            sanitization.getSms_id()));

	            // Update existing activities
	            if (sanitization.getActivitesf01() != null) {
	                if (activitiesf01repository.existsById(sanitization.getSms_id())) {
	                    activitiesf01repository.deleteById(sanitization.getSms_id());
	                }
	                for (BleachSMSActivitiesF01 activity : sanitization.getActivitesf01()) {
	                    activity.setSmsId(sanitization.getSms_id());
	                    activitiesf01repository.save(activity);
	                }
	                BeanUtils.copyProperties(sanitization, newSanitization);
	                newSanitization = bleachsanitizationofmechineandsurfacef01repository.save(newSanitization);
	            }

	        } else {
	            BeanUtils.copyProperties(sanitization, newSanitization);
	            newSanitization = bleachsanitizationofmechineandsurfacef01repository.save(newSanitization);
	        }

	        // Handle status based on user role
	        if ("ROLE_SUPERVISOR".equalsIgnoreCase(role)) {
	            newSanitization.setSupervisor_status(AppConstants.supervisorSave);
	            newSanitization.setSupervisor_saved_on(date);
	            newSanitization.setSupervisor_saved_by(username);
	            newSanitization.setSupervisor_saved_id(userId);
	            newSanitization = bleachsanitizationofmechineandsurfacef01repository.save(newSanitization);

	        } else if ("ROLE_HOD".equalsIgnoreCase(role) || "ROLE_DESIGNEE".equals(role)) {
	            if (!newSanitization.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)) {
	                return new ResponseEntity<>(new ApiResponse(false, "ROLE_SUPERVISOR can submit details"),
	                        HttpStatus.BAD_REQUEST);
	            }

	            newSanitization.setHod_status(AppConstants.hodSave);
	            newSanitization.setHod_saved_on(date);
	            newSanitization.setHod_saved_by(username);
	            newSanitization.setHod_saved_id(userId);
	            newSanitization = bleachsanitizationofmechineandsurfacef01repository.save(newSanitization);
	        } else {
	            return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
	                    HttpStatus.FORBIDDEN);
	        }

	    } catch (Exception ex) {
	        log.error(" **** Unable to Save Sanitization and Machine Details **** ", ex);
	        return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Sanitization and Machine Details: " + ex.getMessage()),
	                HttpStatus.BAD_REQUEST);
	    }

	    return new ResponseEntity<>(newSanitization, HttpStatus.CREATED);
	}


	public ResponseEntity<?> getSanitizationMachineSurface(Long sms_id) {
		BleachSanitizationOfMechineAndSurfaceF01 sanitization = new BleachSanitizationOfMechineAndSurfaceF01();

		try {
			sanitization = bleachsanitizationofmechineandsurfacef01repository.getDetailsById(sms_id);
		} catch (Exception e) {
			log.error("***************** Unable to get list Of SanitizationMachineSurface *********************\n", e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get list Of SanitizationMachineSurfaceDetails! " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(sanitization, HttpStatus.OK);
	}
	
	public ResponseEntity<?> getdateSanitizationMechineAndSurfaceDetails(String month,String year,String week) {
		List<BleachSanitizationOfMechineAndSurfaceF01> sanitization = null;
 
		try {
			sanitization = bleachsanitizationofmechineandsurfacef01repository.getdateSanitizationMechineAndSurfaceDetails(month,year,week);
		} catch (Exception e) {
			log.error("***************** Unable to get list Of SanitizationMachineSurface *********************\n", e);
 
			String msg = sca.getErrorMessage(e);
 
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get list Of SanitizationMachineSurfaceDetails! " + msg),
					HttpStatus.BAD_REQUEST);
		}
 
		return new ResponseEntity<>(sanitization, HttpStatus.OK);
	}

//	public ResponseEntity<?> submitSanitizationMachineSurface(
//	        @RequestBody BleachSanitizationOfMechineAndSurfaceF01 approveResponse, HttpServletRequest http) {
//
//	    SCAUtil scaUtil = new SCAUtil();
//	    Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
//	    String userName = userrepository.getUserName(userId);
//	    String role = sca.getUserRoleFromRequest(http, tokenProvider);
//
//	    try {
//	        BleachSanitizationOfMechineAndSurfaceF01 sanitizationLog;
//
//	        // Check if 'sms_id' is null; if so, treat it as a new record
//	        if (approveResponse.getSms_id() == null) {
//	            // Create a new sanitization log entity
//	            sanitizationLog = new BleachSanitizationOfMechineAndSurfaceF01();
//	        } else {
//	            // Fetch the existing sanitization log if 'sms_id' is provided
//	            Optional<BleachSanitizationOfMechineAndSurfaceF01> optionalSanitizationLog =
//	                    bleachsanitizationofmechineandsurfacef01repository.findById(approveResponse.getSms_id());
//
//	            if (optionalSanitizationLog.isPresent()) {
//	                sanitizationLog = optionalSanitizationLog.get();
//	            } else {
//	                return new ResponseEntity<>(new ApiResponse(false, "Sanitization log not found"),
//	                        HttpStatus.NOT_FOUND);
//	            }
//	        }
//
//	        // Copy properties from approveResponse to sanitizationLog
//	        BeanUtils.copyProperties(approveResponse, sanitizationLog, "activitesf01");
//
//	        // Perform validation on mandatory fields
//	        if (sanitizationLog.getFormatNo() == null || sanitizationLog.getSopNumber() == null
//	                || sanitizationLog.getRevisionNo() == null) {
//	            return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields!"),
//	                    HttpStatus.BAD_REQUEST);
//	        }
//
//	        // Handle activities
//	        if (approveResponse.getActivitesf01() != null) {
//	            // Clear existing activities to avoid duplicates
//	            if (sanitizationLog.getSms_id() != null) {
//	                activitiesf01repository.deleteById(sanitizationLog.getSms_id());
//	            }
//
//	            // Save new activities
//	            for (BleachSMSActivitiesF01 activity : approveResponse.getActivitesf01()) {
////	                activity.setBleachSanitizationOfMechineAndSurfaceF01(sanitizationLog); // Ensure correct association
//	                activitiesf01repository.save(activity);
//	            }
//	        }
//
//	        // Get the current time
//	        LocalDateTime now = LocalDateTime.now();
//	        Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
//
//	        // Handle approval based on user role
//	        if ("ROLE_SUPERVISOR".equalsIgnoreCase(role)) {
//	            if (!AppConstants.hodApprovedStatus.equals(sanitizationLog.getHod_status())) {
//	                sanitizationLog.setSupervisor_status(AppConstants.supervisorApprovedStatus);
//	                sanitizationLog.setSupervisor_submit_on(date);
//	                sanitizationLog.setSupervisor_submit_by(userName);
//	                sanitizationLog.setSupervisor_submit_id(userId);
//	                sanitizationLog.setSupervisor_sign(userName);
//	                sanitizationLog.setHod_status(AppConstants.waitingStatus);
//	                sanitizationLog.setMail_status(AppConstants.waitingStatus);
//	                bleachsanitizationofmechineandsurfacef01repository.save(sanitizationLog);
//
//	                try {
//	                    bleachmailfunction.sendEmailToHODF01(sanitizationLog);
//	                } catch (Exception ex) {
//	                    return new ResponseEntity<>(new ApiResponse(true, "Supervisor Approved but Unable to send mail to HOD! "),
//	                            HttpStatus.OK);
//	                }
//	                return new ResponseEntity<>(new ApiResponse(true, "Supervisor Approved Successfully"), HttpStatus.OK);
//	            } else {
//	                return new ResponseEntity<>(new ApiResponse(false, "HOD already approved"), HttpStatus.BAD_REQUEST);
//	            }
//	        } else if ("ROLE_HOD".equalsIgnoreCase(role) || "ROLE_DESIGNEE".equals(role)) {
//	            if (AppConstants.supervisorApprovedStatus.equals(sanitizationLog.getSupervisor_status())) {
//	                return new ResponseEntity<>(new ApiResponse(false, "ROLE_SUPERVISOR must approve first"),
//	                        HttpStatus.BAD_REQUEST);
//	            }
//
//	            if (!AppConstants.hodApprovedStatus.equals(sanitizationLog.getHod_status())
//	                    || AppConstants.waitingStatus.equals(sanitizationLog.getMail_status())) {
//	                sanitizationLog.setHod_status(AppConstants.hodApprovedStatus);
//	                sanitizationLog.setHod_submit_on(date);
//	                sanitizationLog.setHod_submit_by(userName);
//	                sanitizationLog.setHod_sign(userName);
//	                sanitizationLog.setHod_submit_id(userId);
//	                bleachsanitizationofmechineandsurfacef01repository.save(sanitizationLog);
//	            } else {
//	                if (AppConstants.hodApprovedStatus.equalsIgnoreCase(sanitizationLog.getHod_status())) {
//	                    return new ResponseEntity<>(new ApiResponse(false, "Already Approved in Application"),
//	                            HttpStatus.BAD_REQUEST);
//	                } else if (AppConstants.hodApprovedStatus.equalsIgnoreCase(sanitizationLog.getMail_status())) {
//	                    return new ResponseEntity<>(new ApiResponse(false, "Already Approved in Mail"),
//	                            HttpStatus.BAD_REQUEST);
//	                } else {
//	                    return new ResponseEntity<>(new ApiResponse(false, "Invalid Response"), HttpStatus.BAD_REQUEST);
//	                }
//	            }
//	        } else {
//	            return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
//	                    HttpStatus.FORBIDDEN);
//	        }
//
//	        return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
//
//	    } catch (ResourceNotFoundException ex) {
//	        return new ResponseEntity<>(new ApiResponse(false, ex.getMessage()), HttpStatus.NOT_FOUND);
//	    } catch (Exception ex) {
//	        return new ResponseEntity<>(new ApiResponse(false, "Internal Server Error: " + ex.getMessage()),
//	                HttpStatus.INTERNAL_SERVER_ERROR);
//	    }
//	}
	
	
	
	
	
	public ResponseEntity<?> submitSanitizationMachineSurface(
	        @RequestBody BleachSanitizationOfMechineAndSurfaceF01 approveResponse, HttpServletRequest http) {
 
	    SCAUtil scaUtil = new SCAUtil();
	    Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
	    String userName = userrepository.getUserName(userId);
	    String role = sca.getUserRoleFromRequest(http, tokenProvider);
 
	    BleachSanitizationOfMechineAndSurfaceF01 sanitizationLog = new BleachSanitizationOfMechineAndSurfaceF01();
	    try {
	        if (approveResponse.getFormatNo() == null || approveResponse.getSopNumber() == null
	                || approveResponse.getRevisionNo() == null) {
	            return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields!"),
	                    HttpStatus.BAD_REQUEST);
	        }
 
	        if (approveResponse.getSms_id() != null) {
	        	sanitizationLog = bleachsanitizationofmechineandsurfacef01repository.findById(approveResponse.getSms_id())
	                    .orElseThrow(() -> new ResourceNotFoundException("Sanitization Log", "id",
	                    		approveResponse.getSms_id()));
 
	            // Update existing activities
	            if (approveResponse.getActivitesf01() != null) {
	                if (activitiesf01repository.existsById(approveResponse.getSms_id())) {
	                    activitiesf01repository.deleteById(approveResponse.getSms_id());
	                }
	                for (BleachSMSActivitiesF01 activity : approveResponse.getActivitesf01()) {
	                    activity.setSmsId(approveResponse.getSms_id());
	                    activitiesf01repository.save(activity);
	                }
	                BeanUtils.copyProperties(approveResponse, sanitizationLog);
	                
	                sanitizationLog = bleachsanitizationofmechineandsurfacef01repository.save(sanitizationLog);
	            }
 
	        } else {
	            BeanUtils.copyProperties(approveResponse, sanitizationLog);
	            
	            sanitizationLog = bleachsanitizationofmechineandsurfacef01repository.save(sanitizationLog);
	        }
 
 
	        // Get the current time
	        LocalDateTime now = LocalDateTime.now();
	        Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
 
	        // Handle approval based on user role
	        if ("ROLE_SUPERVISOR".equalsIgnoreCase(role)) {
	        	
	            if (!AppConstants.hodApprovedStatus.equals(sanitizationLog.getHod_status())) {
	            	
	                sanitizationLog.setSupervisor_status(AppConstants.supervisorApprovedStatus);
	                sanitizationLog.setSupervisor_submit_on(date);
	                sanitizationLog.setSupervisor_submit_by(userName);
	                sanitizationLog.setSupervisor_submit_id(userId);
	                sanitizationLog.setSupervisor_sign(userName);
	                sanitizationLog.setHod_status(AppConstants.waitingStatus);
	                sanitizationLog.setMail_status(AppConstants.waitingStatus);
	                
	                	// IMAGE
	                
	                Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
					sanitizationLog.setSupervisisorSignature(signature);
	                
	                
	                bleachsanitizationofmechineandsurfacef01repository.save(sanitizationLog);
 
	                // AUDIT
	                
	                BleachSanitizationOfMechineAndSurfaceHistoryF01 sanitizationHistory = new BleachSanitizationOfMechineAndSurfaceHistoryF01();
	                
	                
	                sanitizationHistory.setBmrNumber(sanitizationLog.getBmrNumber());
	                sanitizationHistory.setFrequency(sanitizationLog.getFrequency());
	                sanitizationHistory.setUnit(sanitizationLog.getUnit());
	                sanitizationHistory.setDepartment(sanitizationLog.getDepartment());
	                sanitizationHistory.setWeekAndDate(sanitizationLog.getWeekAndDate());
	                sanitizationHistory.setWeek(sanitizationLog.getWeek());
	                sanitizationHistory.setMonth(sanitizationLog.getMonth());
	                sanitizationHistory.setYear(sanitizationLog.getYear());
	                sanitizationHistory.setFormatName(sanitizationLog.getFormatName());
	                sanitizationHistory.setFormatNo(sanitizationLog.getFormatNo());
	                sanitizationHistory.setRemarks(sanitizationLog.getRemarks());
	                
	                sanitizationHistory.setNameOfTheChemical(sanitizationLog.getNameOfTheChemical());
	                sanitizationHistory.setChemicalBatchNumber(sanitizationLog.getChemicalBatchNumber());
	                sanitizationHistory.setExpDate(sanitizationLog.getExpDate());
	                
	                sanitizationHistory.setSopNumber(sanitizationLog.getSopNumber());
	                sanitizationHistory.setRevisionNo(sanitizationLog.getRevisionNo());
	                sanitizationHistory.setSanitized_by(sanitizationLog.getSanitized_by());
//	                
//	                	// STATUS
	                sanitizationHistory.setSupervisor_sign(sanitizationLog.getSupervisor_sign());
	                sanitizationHistory.setSupervisor_status(sanitizationLog.getSupervisor_status());
	                sanitizationHistory.setSupervisor_submit_by(sanitizationLog.getSupervisor_submit_by());
	                sanitizationHistory.setSupervisor_submit_id(sanitizationLog.getSupervisor_submit_id());
	                sanitizationHistory.setSupervisor_submit_on(sanitizationLog.getSupervisor_submit_on());
	                sanitizationHistory.setHod_status(sanitizationLog.getHod_status());
	               
	                int version = bleachSanitizationOfMechineAndSurfaceF01RepositoryHistory.getMaximumVersion(sanitizationHistory.getYear(), sanitizationHistory.getMonth(), sanitizationHistory.getWeek()).map(temp -> temp + 1).orElse(1);
	                
	                sanitizationHistory.setVersion(version);
	                
	                bleachSanitizationOfMechineAndSurfaceF01RepositoryHistory.save(sanitizationHistory);
	                
	                System.out.println("Valid");
	                
	                for(BleachSMSActivitiesF01 activities : approveResponse.getActivitesf01()) {
	                	
	                	System.out.println("SMS ID" + approveResponse.getSms_id());
	                	System.out.println("SMM IIID" + sanitizationHistory.getSms_id());
	                	
	                	BleachSMSActivitiesHistoryF01 historyActivity = new BleachSMSActivitiesHistoryF01();
	                	
	                	BeanUtils.copyProperties(activities, historyActivity);
	                	
//	                	historyActivity.setCompleted(activities.isCompleted());
//	                	historyActivity.setDescription(activities.getDescription());
//	                	historyActivity.setNot_completed(activities.isNot_completed());
//	                	historyActivity.setNotApplicable(activities.isNotApplicable());
	                	historyActivity.setSmsId(sanitizationHistory.getSms_id());
	                	
	                	
	                	
	                	activitiesF01RepositoryHistory.save(historyActivity);
	                	
	                }
	                
	                try {
	                    bleachmailfunction.sendEmailToHODF01(sanitizationLog);
	                } catch (Exception ex) {
	                    return new ResponseEntity<>(new ApiResponse(true, "Supervisor Approved but Unable to send mail to HOD! "),
	                            HttpStatus.OK);
	                }
	                return new ResponseEntity<>(new ApiResponse(true, "Supervisor Approved Successfully"), HttpStatus.OK);
	            } else {
	                return new ResponseEntity<>(new ApiResponse(false, "HOD already approved"), HttpStatus.BAD_REQUEST);
	            }
	        }  else {
	            return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to Submit"),
	                    HttpStatus.FORBIDDEN);
	        }
 
	    } catch (ResourceNotFoundException ex) {
	        return new ResponseEntity<>(new ApiResponse(false, ex.getMessage()), HttpStatus.NOT_FOUND);
	    } catch (Exception ex) {
	        return new ResponseEntity<>(new ApiResponse(false, "Internal Server Error: " + ex.getMessage()),
	                HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}


	public ResponseEntity<?> approveSanitizationLog(ApproveResponse approvalResponse, HttpServletRequest http) {
		
		SCAUtil sca = new SCAUtil();
		
		BleachSanitizationOfMechineAndSurfaceF01 bleachCheckListF42 = new BleachSanitizationOfMechineAndSurfaceF01();
		
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			bleachCheckListF42 = bleachsanitizationofmechineandsurfacef01repository.getDetailsById(approvalResponse.getId());
			
			BleachSanitizationOfMechineAndSurfaceHistoryF01 bleachLayDownCheckListF42History = new BleachSanitizationOfMechineAndSurfaceHistoryF01();
			
			String supervisiorStatus = bleachCheckListF42.getSupervisor_status();
			
			String hodStatus = bleachCheckListF42.getHod_status();
			
			UserImageDetails imageDetails = new UserImageDetails();
			
			if(supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
				
				if(userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
					
					if(approvalResponse.getStatus().equals("Approve")) {
						
						bleachCheckListF42.setHod_status(AppConstants.hodApprovedStatus);
						bleachCheckListF42.setHod_submit_on(date);
						bleachCheckListF42.setHod_submit_by(userName);
						
						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachCheckListF42.setSupervisisorSignature(signature);
						
						bleachCheckListF42.setHod_sign(userName);
						
						bleachsanitizationofmechineandsurfacef01repository.save(bleachCheckListF42);
						
						String year = bleachCheckListF42.getYear();
						
						String month = bleachCheckListF42.getMonth();
						
						String week = bleachCheckListF42.getWeek();
						
						bleachLayDownCheckListF42History = bleachSanitizationOfMechineAndSurfaceF01RepositoryHistory.fetchLastSubmittedRecords(year, month, week);
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_sign(userName);
					
						
						bleachSanitizationOfMechineAndSurfaceF01RepositoryHistory.save(bleachLayDownCheckListF42History);
						
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
						
						bleachsanitizationofmechineandsurfacef01repository.save(bleachCheckListF42);

						String year = bleachCheckListF42.getYear();
						
						String month = bleachCheckListF42.getMonth();
						
						String week = bleachCheckListF42.getWeek();
						
						bleachLayDownCheckListF42History = bleachSanitizationOfMechineAndSurfaceF01RepositoryHistory.fetchLastSubmittedRecords(year, month, week);
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						
						bleachSanitizationOfMechineAndSurfaceF01RepositoryHistory.save(bleachLayDownCheckListF42History);
						
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
					new ApiResponse(false, "Failed to approve/reject Hydro Extractor Record " + msg),
					HttpStatus.BAD_REQUEST);
			
			
		}
		
	
		
	
		
		
		
	}
	

	// =================================================F09=============================================================//
	public ResponseEntity<?> createUpdateEquipmentUsageLogBookF09(@RequestBody BleachEquipmentUsageLogBookCakePressF09 request, HttpServletRequest http) {
		if (request == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Request cannot be null"), HttpStatus.BAD_REQUEST);
		}

		String role = sca.getUserRoleFromRequest(http, tokenProvider);
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);

		LocalDateTime now = LocalDateTime.now();
		BleachEquipmentUsageLogBookCakePressF09 logBookEntry;

		if (request.getEquipc_id() != null) {
			Optional<BleachEquipmentUsageLogBookCakePressF09> existingEntry = bleachequipmentusagelogbookcakepressf09repository
					.findById(request.getEquipc_id());
			if (existingEntry.isPresent()) {
				logBookEntry = existingEntry.get();
				BeanUtils.copyProperties(request, logBookEntry);
			} else {
				logBookEntry = new BleachEquipmentUsageLogBookCakePressF09();
				BeanUtils.copyProperties(request, logBookEntry);
			}
		} else {
			logBookEntry = new BleachEquipmentUsageLogBookCakePressF09();
			BeanUtils.copyProperties(request, logBookEntry);
		}

		try {
//			logBookEntry = bleachequipmentusagelogbookcakepressf09repository.save(logBookEntry);

			if ("ROLE_SUPERVISOR".equalsIgnoreCase(role)) {
				logBookEntry.setSupervisor_status(AppConstants.supervisorSave);
				logBookEntry.setSupervisor_saved_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
				logBookEntry.setSupervisor_saved_by(username);
				logBookEntry.setSupervisor_saved_id(userId);
//				logBookEntry.setHod_status("");
//				logBookEntry.setSupervisor_sign(username);

				logBookEntry = bleachequipmentusagelogbookcakepressf09repository.save(logBookEntry);

			} else if ("ROLE_HOD".equalsIgnoreCase(role)||"ROLE_DESIGNEE".equals(role)) {
				
				if(!logBookEntry.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus))
				{
					return new ResponseEntity(new ApiResponse(false, "ROLE_SUPERVISOR can submit details"),
							HttpStatus.BAD_REQUEST);
				}
				
				logBookEntry.setHod_status(AppConstants.hodSave);
				logBookEntry.setHod_saved_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
				logBookEntry.setHod_saved_by(username);
				logBookEntry.setHod_saved_id(userId);
//				logBookEntry.setHod_sign(username);
				logBookEntry.setMail_status(AppConstants.waitingStatus);

				logBookEntry = bleachequipmentusagelogbookcakepressf09repository.save(logBookEntry);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to perform this action"),
						HttpStatus.FORBIDDEN);
			}

		} catch (Exception e) {
			return new ResponseEntity<>(new ApiResponse(false, "Unable to save log book entry: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(logBookEntry, HttpStatus.CREATED);
	

	}
	
	public ResponseEntity<?> submitEquipmentUsageLogBookF09(@RequestBody BleachEquipmentUsageLogBookCakePressF09 request, HttpServletRequest http) {
	    SCAUtil scaUtil = new SCAUtil();
	    Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
	    String userName = userrepository.getUserName(userId);
	    String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

	    BleachEquipmentUsageLogBookCakePressF09 logBookEntry;

	    // Validate mandatory fields
	    if (request.getFormatNo() == null || request.getSopNumber() == null || request.getRevisionNo() == null) {
	        return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields!"), HttpStatus.BAD_REQUEST);
	    }

	    // Handle new or existing log book entry
	    if (request.getEquipc_id() != null) {
	        logBookEntry = bleachequipmentusagelogbookcakepressf09repository.findById(request.getEquipc_id()).orElseThrow(
	                () -> new ResourceNotFoundException("Equipment Usage Log", "id", request.getEquipc_id()));
	        BeanUtils.copyProperties(request, logBookEntry);
	    } else {
	        logBookEntry = new BleachEquipmentUsageLogBookCakePressF09();
	        BeanUtils.copyProperties(request, logBookEntry);
//	        logBookEntry = bleachequipmentusagelogbookcakepressf09repository.save(logBookEntry); // Save new entry to generate ID
	    }

	    String currentStatus = logBookEntry.getHod_status();
	    String currentMailStatus = logBookEntry.getMail_status();

	    LocalDateTime now = LocalDateTime.now();
	    Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());

	    if ("ROLE_SUPERVISOR".equalsIgnoreCase(role)) {
	    	
	    	System.out.println("HHH" + currentStatus);
	    	
	        if (!AppConstants.hodApprovedStatus.equals(currentStatus)) {
	            logBookEntry.setSupervisor_status(AppConstants.supervisorApprovedStatus);
	            logBookEntry.setSupervisor_submit_on(date);
	            logBookEntry.setSupervisor_submit_by(userName);
	            logBookEntry.setSupervisor_submit_id(userId);
	            logBookEntry.setSupervisor_sign(userName);
	            logBookEntry.setHod_status(AppConstants.waitingStatus);
	            logBookEntry.setMail_status(AppConstants.waitingStatus);
	            
	            Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
				logBookEntry.setSupervisisorSignature(signature);
				
					// HISTORY
	            
	            bleachequipmentusagelogbookcakepressf09repository.save(logBookEntry);
	            
	            BleachEquipmentUsageLogBookCakePressHistoryF09 cakePressHistoryF09 = new BleachEquipmentUsageLogBookCakePressHistoryF09();
	            BeanUtils.copyProperties(logBookEntry, cakePressHistoryF09);
	            
	            String bmrNo = cakePressHistoryF09.getBmrNumber();
	            String subbatchNo = cakePressHistoryF09.getSubbatch_no();
	            
	            int version = cakePressF09RepositoryHistory.getMaximumVersion(bmrNo, subbatchNo).map(temp -> temp + 1).orElse(1);
	            
	            cakePressHistoryF09.setVersion(version);
	            
	            cakePressF09RepositoryHistory.save(cakePressHistoryF09);
	            
	            try {
	                bleachmailfunction.sendEmailToHODF09(logBookEntry);
	            } catch (Exception ex) {
	                return new ResponseEntity<>(new ApiResponse(false, "Supervisor Approved but Unable to send mail to HOD! "),
	                        HttpStatus.OK);
	            }
//	            return new ResponseEntity<>(new ApiResponse(true, "Supervisor Approved Successfully"), HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(new ApiResponse(false, "HOD already approved"), HttpStatus.BAD_REQUEST);
	        }
	    }  else {
	        return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"), HttpStatus.FORBIDDEN);
	    }
		return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
	}

		// APPROVE OR REJECT 
	
	public ResponseEntity<?> approveRejectF09(ApproveResponse approvalResponse, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		
		BleachEquipmentUsageLogBookCakePressF09 bleachCheckListF42 = new BleachEquipmentUsageLogBookCakePressF09();
		
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			bleachCheckListF42 = bleachequipmentusagelogbookcakepressf09repository.getDetailsById(approvalResponse.getId());
			
			BleachEquipmentUsageLogBookCakePressHistoryF09 bleachLayDownCheckListF42History = new BleachEquipmentUsageLogBookCakePressHistoryF09();
			
			String supervisiorStatus = bleachCheckListF42.getSupervisor_status();
			
			String hodStatus = bleachCheckListF42.getHod_status();
			
			UserImageDetails imageDetails = new UserImageDetails();
			
			if(supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
				
				if(userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
					
					if(approvalResponse.getStatus().equals("Approve")) {
						
						bleachCheckListF42.setHod_status(AppConstants.hodApprovedStatus);
						bleachCheckListF42.setHod_submit_on(date);
						bleachCheckListF42.setHod_submit_id(userId);
						bleachCheckListF42.setHod_submit_by(userName);
						
						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachCheckListF42.setHodSignature(signature);
						
						bleachCheckListF42.setHod_sign(userName);
						
						bleachequipmentusagelogbookcakepressf09repository.save(bleachCheckListF42);
						
						bleachLayDownCheckListF42History = cakePressF09RepositoryHistory.fetchLastSubmittedRecordLaydown(bleachCheckListF42.getBmrNumber(), bleachCheckListF42.getSubbatch_no());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_sign(userName);
					
						
						cakePressF09RepositoryHistory.save(bleachLayDownCheckListF42History);
						
						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
						
					}
					
					else if(approvalResponse.getStatus().equals("Reject")) {
						
						String reason = approvalResponse.getRemarks();
						bleachCheckListF42.setReason(reason);
						bleachCheckListF42.setHod_status(AppConstants.hodRejectedStatus);
						bleachCheckListF42.setHod_submit_on(date);
						bleachCheckListF42.setHod_submit_by(userName);
						bleachCheckListF42.setHod_submit_id(userId);
						
						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachCheckListF42.setHodSignature(signature);
						
						bleachCheckListF42.setHod_sign(userName);
						
						bleachequipmentusagelogbookcakepressf09repository.save(bleachCheckListF42);

						
						bleachLayDownCheckListF42History = cakePressF09RepositoryHistory.fetchLastSubmittedRecordLaydown(bleachCheckListF42.getBmrNumber(), bleachCheckListF42.getSubbatch_no());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						
						cakePressF09RepositoryHistory.save(bleachLayDownCheckListF42History);
						
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
					new ApiResponse(false, "Failed to approve/reject Hydro Extractor Record " + msg),
					HttpStatus.BAD_REQUEST);
			
			
		}
		
	
		
	
		
	}
	
    
	public ResponseEntity<?> getbleachequipmentusagelogbookcakepressf09(Long equipc_id) {
		BleachEquipmentUsageLogBookCakePressF09 logBook = new BleachEquipmentUsageLogBookCakePressF09();

		try {
			logBook = bleachequipmentusagelogbookcakepressf09repository.getDetailsById(equipc_id);
		} catch (Exception e) {
			log.error("***************** Unable to get list Of SanitizationMachineSurface *********************\n", e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get list Of SanitizationMachineSurfaceDetails! " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(logBook, HttpStatus.OK);
	}
//==============================================F34============================================================//
	public ResponseEntity<?> createUpdateEquipmentUsageLogBookF34(@RequestBody BleachEquipmentUsageLogbookBlowroomAndCardingF34 request, HttpServletRequest http) {
	    if (request == null) {
	        return new ResponseEntity<>(new ApiResponse(false, "Request cannot be null"), HttpStatus.BAD_REQUEST);
	    }

	    String role = sca.getUserRoleFromRequest(http, tokenProvider);
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String username = authentication.getName();
	    Long userId = sca.getUserIdFromRequest(http, tokenProvider);

	    LocalDateTime now = LocalDateTime.now();
	    BleachEquipmentUsageLogbookBlowroomAndCardingF34 logBookEntry;

	    if (request.getEquipb_id() != null) {
	        Optional<BleachEquipmentUsageLogbookBlowroomAndCardingF34> existingEntry = bleachequipmentusagelogbookblowroomandcardingf34repository
	                .findById(request.getEquipb_id());
	        if (existingEntry.isPresent()) {
	            logBookEntry = existingEntry.get();
	            BeanUtils.copyProperties(request, logBookEntry);
	        } else {
	            logBookEntry = new BleachEquipmentUsageLogbookBlowroomAndCardingF34();
	            BeanUtils.copyProperties(request, logBookEntry);
	        }
	    } else {
	        logBookEntry = new BleachEquipmentUsageLogbookBlowroomAndCardingF34();
	        BeanUtils.copyProperties(request, logBookEntry);
	    }

	    try {
//	        logBookEntry = bleachequipmentusagelogbookblowroomandcardingf34repository.save(logBookEntry);

	        if ("ROLE_SUPERVISOR".equalsIgnoreCase(role)) {
	            logBookEntry.setSupervisor_status(AppConstants.supervisorSave);
	            logBookEntry.setSupervisor_saved_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
	            logBookEntry.setSupervisor_saved_by(username);
	            logBookEntry.setSupervisor_saved_id(userId);
//	            logBookEntry.setSupervisor_sign(username);

	            logBookEntry = bleachequipmentusagelogbookblowroomandcardingf34repository.save(logBookEntry);

	        } else if ("ROLE_HOD".equalsIgnoreCase(role)||"ROLE_DESIGNEE".equals(role)) {
	        	
	        	if(!logBookEntry.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus))
				{
					return new ResponseEntity(new ApiResponse(false, "ROLE_SUPERVISOR can submit details"),
							HttpStatus.BAD_REQUEST);
				}
	        	
	            logBookEntry.setHod_status(AppConstants.hodSave);
	            logBookEntry.setHod_saved_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
	            logBookEntry.setHod_saved_by(username);
	            logBookEntry.setHod_saved_id(userId);
//	            logBookEntry.setHod_sign(username);
	            logBookEntry.setMail_status(AppConstants.waitingStatus);

	            logBookEntry = bleachequipmentusagelogbookblowroomandcardingf34repository.save(logBookEntry);
	        } else {
	            return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to perform this action"), HttpStatus.FORBIDDEN);
	        }

	    } catch (Exception e) {
	        return new ResponseEntity<>(new ApiResponse(false, "Unable to save log book entry: " + e.getMessage()), HttpStatus.BAD_REQUEST);
	    }

	    return new ResponseEntity<>(logBookEntry, HttpStatus.CREATED);
	}
	public ResponseEntity<?> submitEquipmentUsageLogBookF34(@RequestBody BleachEquipmentUsageLogbookBlowroomAndCardingF34 request, HttpServletRequest http) {
	    SCAUtil scaUtil = new SCAUtil();
	    Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
	    String userName = userrepository.getUserName(userId);
	    String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

	    // Check for mandatory fields
	    if (request.getFormatNo() == null || request.getSopNumber() == null || request.getRevisionNo() == null) {
	        return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields!"), HttpStatus.BAD_REQUEST);
	    }

	    BleachEquipmentUsageLogbookBlowroomAndCardingF34 logBookEntry;
	    if (request.getEquipb_id() != null) {
	        // Update existing record
	        logBookEntry = bleachequipmentusagelogbookblowroomandcardingf34repository.findById(request.getEquipb_id())
	                .orElseThrow(() -> new ResourceNotFoundException("Equipment Usage Log", "id", request.getEquipb_id()));
	        
	        
	        String existingBmrNumber = logBookEntry.getBmrNumber();
	        BeanUtils.copyProperties(request, logBookEntry, "equipb_id", "bmrNumber");
	        logBookEntry.setBmrNumber(existingBmrNumber);
	        
	    } else {
	        // Create new record
	        logBookEntry = new BleachEquipmentUsageLogbookBlowroomAndCardingF34();
	        BeanUtils.copyProperties(request, logBookEntry);
	    }

	    // Save the logbook entry
//	    logBookEntry = bleachequipmentusagelogbookblowroomandcardingf34repository.save(logBookEntry);

	    LocalDateTime now = LocalDateTime.now();
	    Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());

	    if ("ROLE_SUPERVISOR".equalsIgnoreCase(role)) {
	        if (!AppConstants.hodApprovedStatus.equals(logBookEntry.getHod_status())) {
	            logBookEntry.setSupervisor_status(AppConstants.supervisorApprovedStatus);
	            logBookEntry.setSupervisor_submit_on(date);
	            logBookEntry.setSupervisor_submit_by(userName);
	            logBookEntry.setSupervisor_submit_id(userId);
	            logBookEntry.setSupervisor_sign(userName);
	            logBookEntry.setHod_status(AppConstants.waitingStatus);
	            logBookEntry.setMail_status(AppConstants.waitingStatus);
	            
	            Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
				logBookEntry.setSupervisisorSignature(signature);
				
	            
	            bleachequipmentusagelogbookblowroomandcardingf34repository.save(logBookEntry);
	            
	            	// HISTORY
	            
	            BleachEquipmentUsageLogbookBlowroomAndCardingHistoryF34 cardingHistoryF34 = new BleachEquipmentUsageLogbookBlowroomAndCardingHistoryF34();
	            
	            BeanUtils.copyProperties(logBookEntry, cardingHistoryF34);
	            
	            int version = cardingF34RepositoryHistory.getMaximumVersion(logBookEntry.getBmrNumber()).map(temp -> temp + 1).orElse(1);
	            
	            cardingHistoryF34.setVersion(version);
	            
	            cardingF34RepositoryHistory.save(cardingHistoryF34);
	            
	            try {
	                bleachmailfunction.sendEmailToHODF34(logBookEntry);
	            } catch (Exception ex) {
	                return new ResponseEntity<>(new ApiResponse(false, "Supervisor Approved but Unable to send mail to HOD! "), HttpStatus.OK);
	            }
//	            return new ResponseEntity<>(new ApiResponse(true, "Supervisor Approved Successfully"), HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(new ApiResponse(false, "Already approved"), HttpStatus.BAD_REQUEST);
	        }
	    }  else {
	        return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"), HttpStatus.FORBIDDEN);
	    }
		return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
	}


	// ***********************************MAIL FUNTIONALITY*************************************************************//
 
//	public ResponseEntity<?> getLastSubbatchNoDetails() {
//		 
//		List<Map<String, Object>> getLastSubbatchNo;
// 
//		try {
// 
//			getLastSubbatchNo = bleachequipmentusagelogbookcakepressf09repository.getLastSubbatchNo();
//			
//			if(getLastSubbatchNo.isEmpty()) {
//				
//				int year = Year.now().getValue();
//				
//				String lastTwoDigits = String.valueOf(year).substring(2);
//				
//				String subBatchNo = lastTwoDigits + "/0000";
//				
//			}
// 
//		} catch (Exception ex) {
// 
//			String msg = ex.getMessage();
// 
//			log.error("Unable to get Sub Batch Details" + msg);
// 
//			return new ResponseEntity(new ApiResponse(false, "Unable to get Sub Batch Details" + msg),
// 
//					HttpStatus.BAD_REQUEST);
// 
//		}
// 
//		return new ResponseEntity(getLastSubbatchNo, HttpStatus.OK);
// 
//	}
	
	
	public ResponseEntity<?> getLastSubbatchNoDetails() {
	    List<Map<String, Object>> getLastSubbatchNo;

	    try {
	        // Fetch the last subbatch number from the database
	        getLastSubbatchNo = bleachequipmentusagelogbookcakepressf09repository.getLastSubbatchNo();

	        if (getLastSubbatchNo == null || getLastSubbatchNo.isEmpty()) {
	            // If no records exist, start with the first subbatch number for the current year
	            int currentYear = Year.now().getValue();
	            String lastTwoDigitsOfYear = String.valueOf(currentYear).substring(2);
	            String subBatchNo = lastTwoDigitsOfYear + "/0001";

	            // Create a default response
	            Map<String, Object> defaultResponse = new HashMap<>();
	            defaultResponse.put("SUBBATCH_NO", subBatchNo);
	            defaultResponse.put("START_DATE", null);
	            defaultResponse.put("START_TIME", null);

	            List<Map<String, Object>> defaultList = new ArrayList<>();
	            defaultList.add(defaultResponse);

	            return new ResponseEntity<>(defaultList, HttpStatus.OK);
	        } else {
	            // Return the latest record from the database without modifying it
	            return new ResponseEntity<>(getLastSubbatchNo, HttpStatus.OK);
	        }
	    } catch (Exception ex) {
	        // Handle any exceptions
	        String msg = ex.getMessage();
	        log.error("Unable to get Sub Batch Details: " + msg);
	        return new ResponseEntity<>(
	            new ApiResponse(false, "Unable to get Sub Batch Details: " + msg),
	            HttpStatus.BAD_REQUEST
	        );
	    }
	}



	
	
	public ResponseEntity<?> getLastSubbatchNo34() {
		 
		List<Map<String, Object>> getLastSubbatchNo;
 
		try {
 
			getLastSubbatchNo = bleachequipmentusagelogbookblowroomandcardingf34repository.getLastSubbatchNo();
 
		} catch (Exception ex) {
 
			String msg = ex.getMessage();
 
			log.error("Unable to get Details" + msg);
 
			return new ResponseEntity(new ApiResponse(false, "Unable to get  Details" + msg),
 
					HttpStatus.BAD_REQUEST);
 
		}
 
		return new ResponseEntity(getLastSubbatchNo, HttpStatus.OK);
 
	}
	
	
	public ResponseEntity<?> approveRejectF34(ApproveResponse approvalResponse, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		
		BleachEquipmentUsageLogbookBlowroomAndCardingF34 bleachCheckListF42 = new BleachEquipmentUsageLogbookBlowroomAndCardingF34();
		
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			bleachCheckListF42 = bleachequipmentusagelogbookblowroomandcardingf34repository.getById(approvalResponse.getId());
			
			BleachEquipmentUsageLogbookBlowroomAndCardingHistoryF34 bleachLayDownCheckListF42History = new BleachEquipmentUsageLogbookBlowroomAndCardingHistoryF34();
			
			String supervisiorStatus = bleachCheckListF42.getSupervisor_status();
			
			String hodStatus = bleachCheckListF42.getHod_status();
			
			UserImageDetails imageDetails = new UserImageDetails();
			
			if(supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
				
				if(userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
					
					if(approvalResponse.getStatus().equals("Approve")) {
						
						bleachCheckListF42.setHod_status(AppConstants.hodApprovedStatus);
						bleachCheckListF42.setHod_submit_on(date);
						bleachCheckListF42.setHod_submit_id(userId);
						bleachCheckListF42.setHod_submit_by(userName);
						
						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachCheckListF42.setHodSignature(signature);
						
						bleachCheckListF42.setHod_sign(userName);
						
						bleachequipmentusagelogbookblowroomandcardingf34repository.save(bleachCheckListF42);
						
						bleachLayDownCheckListF42History = cardingF34RepositoryHistory.fetchLastSubmittedRecordLaydown(bleachCheckListF42.getBmrNumber());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_sign(userName);
					
						
						cardingF34RepositoryHistory.save(bleachLayDownCheckListF42History);
						
						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
						
					}
					
					else if(approvalResponse.getStatus().equals("Reject")) {
						
						String reason = approvalResponse.getRemarks();
						bleachCheckListF42.setReason(reason);
						bleachCheckListF42.setHod_status(AppConstants.hodRejectedStatus);
						bleachCheckListF42.setHod_submit_on(date);
						bleachCheckListF42.setHod_submit_by(userName);
						bleachCheckListF42.setHod_submit_id(userId);
						
						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachCheckListF42.setHodSignature(signature);;
						
						bleachCheckListF42.setHod_sign(userName);
						
						bleachequipmentusagelogbookblowroomandcardingf34repository.save(bleachCheckListF42);

						
						bleachLayDownCheckListF42History = cardingF34RepositoryHistory.fetchLastSubmittedRecordLaydown(bleachCheckListF42.getBmrNumber());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						
						cardingF34RepositoryHistory.save(bleachLayDownCheckListF42History);
						
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
					new ApiResponse(false, "Failed to approve/reject Hydro Extractor Record " + msg),
					HttpStatus.BAD_REQUEST);
			
			
		}
		
	
		
	
		
	}
	
}
