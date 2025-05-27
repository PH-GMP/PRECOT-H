package com.focusr.Precot.mssql.database.service.bleaching;

import java.math.BigInteger;
import java.time.LocalDateTime;
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
/*
   PRD01/F-05 - BleachContRawCottonF05
   PRD01/F-18 - BleachContAbsBleachedCottonF18
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.focusr.Precot.mssql.database.model.UserImageDetails;
import com.focusr.Precot.mssql.database.model.bleaching.BleachAppliedContRawCottonF04;
import com.focusr.Precot.mssql.database.model.bleaching.BleachContAbsBleachedCottonF18;
import com.focusr.Precot.mssql.database.model.bleaching.BleachContRawCottonF05;
import com.focusr.Precot.mssql.database.model.bleaching.BleachMachineCleaningRecordF16;
import com.focusr.Precot.mssql.database.model.bleaching.EquipLogBookHydroExtractorF11;
import com.focusr.Precot.mssql.database.model.bleaching.MetalDetectorCheckListF03;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachContAbsBleachedCottonHistoryF18;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachContRawCottonF05History;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachMachineCleaningRecordHistoryF16;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachMetalDetectorCheckListHistoryF03;
import com.focusr.Precot.mssql.database.model.bleaching.audit.EquipLogBookHydroExtractorHistoryF11;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachContAbsBleachedCottonF18Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachContRawCottonF05Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachMachineCleaningRecordF16Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.EquipLogBookHydroExtractorF11Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.MetalDetectorCheckListF03Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachContAbsBleachedCottonF18RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachContRawCottonF05RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachMachineCleaningRecordHistoryF16Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachMetalDetectorCheckListHistoryRepositoryF03;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.EquipLogBookHydroExtractorF11RepositoryHistory;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.payload.LovResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.BleachMailFunction;
import com.focusr.Precot.util.EmailHtmlLoader;
import com.focusr.Precot.util.SCAUtil;

/*
PRD01/F-05 - BleachContRawCottonF05
PRD01/F-18 - BleachContAbsBleachedCottonF18
PRD01/F-11 - EquipLogBookHydroExtractorF11
PRD01/F-03
*/

@Service
public class BleachingService1 {

	@Autowired
	private UserImageDetailsRepository imageRepository;
	
	@Autowired
	private BleachContRawCottonF05Repository bleachContRawCottonF05Repository;
	
	@Autowired
	private BleachContRawCottonF05RepositoryHistory bleachContRawCottonF05RepositoryHistory;

	@Autowired
	private BleachContAbsBleachedCottonF18Repository bleachContAbsBleachedCottonF18Repository;

	@Autowired
	private BleachContAbsBleachedCottonF18RepositoryHistory bleachContAbsBleachedCottonF18RepositoryHistory;
	
	@Autowired
	private EquipLogBookHydroExtractorF11Repository equipLogBookHydroExtractorF11Repository;

	@Autowired
	private EquipLogBookHydroExtractorF11RepositoryHistory hydroExtractorF11RepositoryHistory;
	
//	@Autowired
//	private EquipmentLogsF11Repository equipmentLogsF11Repository;

	@Autowired
	private MetalDetectorCheckListF03Repository metalDetectorCheckListF03Repository;
	
	@Autowired
	private BleachMetalDetectorCheckListHistoryRepositoryF03 metalDetectorCheckListHistoryRepositoryF03;

	@Autowired
	private BleachMachineCleaningRecordF16Repository bleachMachineCleaningRecordF16Repository;
	
	@Autowired
	private BleachMachineCleaningRecordHistoryF16Repository bleachMachineCleaningRecordHistoryF16Repository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	JwtTokenProvider tokenProvider;

	@Autowired
	private SCAUtil scaUtil;

	@Autowired
	EmailHtmlLoader emailhtmlloader;
	@Autowired
	BleachMailFunction bleachmailfunction;

	Logger log = LoggerFactory.getLogger(BleachingService1.class);

//  **************************************** PRD01/F-05  *************************************************

	// PRD01/F-05 - CREATE
//	public ResponseEntity<?> createOrUpdateBleachContRawCotton(BleachContRawCottonF05 bleachContRawCotton,
//			HttpServletRequest http) {
//		SCAUtil sca = new SCAUtil();
//
//		try {
//			Long id = bleachContRawCotton.getId();
//
//			if (id == null) {
//				bleachContRawCottonF05Repository.save(bleachContRawCotton);
//
//				if (bleachContRawCotton.getStatus().equalsIgnoreCase("SUBMIT")) {
//					bleachContRawCotton.setStatus(bleachContRawCotton.getStatus());
//					bleachContRawCotton.setMailStatus("WAITING FOR APPROVAL");
//					bleachContRawCottonF05Repository.save(bleachContRawCotton);
////					sendMailBleachingUser(bleachContRawCotton);
//				} else {
//					bleachContRawCotton.setStatus("DRAFT");
//					bleachContRawCotton.setMailStatus("PENDING");
//					bleachContRawCottonF05Repository.save(bleachContRawCotton);
//				}
//
//			} else {
//				BleachContRawCottonF05 ExistingBleachContRawCotton = bleachContRawCottonF05Repository.findFormById(id);
//
//				if (ExistingBleachContRawCotton.getStatus().equalsIgnoreCase("SUBMIT")) {
//					return new ResponseEntity(
//							new ApiResponse(false, "Bleaching Raw Cotton Contamination Details are already submitted!"),
//							HttpStatus.BAD_REQUEST);
//				}
//
//				bleachContRawCotton.setCreatedAt(ExistingBleachContRawCotton.getCreatedAt());
//				bleachContRawCotton.setCreatedBy(ExistingBleachContRawCotton.getCreatedBy());
//
////				Long userId = sca.getUserIdFromRequest(http, tokenProvider);
////
////				String updatedby = userRepository.getUserName(userId);
////				bleachContRawCotton.setUpdatedBy(updatedby);
//
//				bleachContRawCottonF05Repository.save(bleachContRawCotton);
//
//				if (bleachContRawCotton.getStatus().equalsIgnoreCase("SUBMIT")) {
//					bleachContRawCotton.setStatus(bleachContRawCotton.getStatus());
//					bleachContRawCotton.setMailStatus("WAITING FOR APPROVAL");
//					bleachContRawCottonF05Repository.save(bleachContRawCotton);
////					sendMailBleachingUser(bleachContRawCotton);
//				} else {
//					bleachContRawCotton.setStatus("DRAFT");
//					bleachContRawCotton.setMailStatus("PENDING");
//					bleachContRawCottonF05Repository.save(bleachContRawCotton);
//				}
//			}
//
//		} catch (Exception e) {
//			log.error(
//					"***************** Unable to save Bleaching Raw Cotton Contamination Details!  *********************\n"
//							+ e);
//
//			String msg = sca.getErrorMessage(e);
//
//			return new ResponseEntity(
//					new ApiResponse(false, "Unable to save Bleaching Raw Cotton Contamination Details!" + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//
//		return new ResponseEntity(bleachContRawCotton, HttpStatus.CREATED);
//	}

	public ResponseEntity<?> SaveBleachContRawCotton(BleachContRawCottonF05 bleachContRawCotton,
			HttpServletRequest http) {
		if (bleachContRawCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		BleachContRawCottonF05 bleachObj = null;

		try {

			String value = "";

			if (bleachContRawCotton.getFormatNo() == null)
				value = "formatNo";
			if (bleachContRawCotton.getRefSopNo() == null)
				value = "sopNumber";
			if (bleachContRawCotton.getRevisionNo() == null)
				value = "revisionNo";
			if (bleachContRawCotton.getFormatName() == null)
				value = "formatName";
			if (bleachContRawCotton.getDate() == null)
				value = "date";
			if (bleachContRawCotton.getUnit() == null)
				value = "unit";
			if (bleachContRawCotton.getPhNo() == null)
				value = "phNumber";
			if (bleachContRawCotton.getSupplierName() == null)
				value = "supplierName";
			if (bleachContRawCotton.getQuantity() == null)
				value = "Quantity";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (bleachContRawCotton.getId() != null) {
				bleachObj = bleachContRawCottonF05Repository.findFormById(bleachContRawCotton.getId());

				bleachContRawCotton.setCreatedAt(bleachObj.getCreatedAt());
				bleachContRawCotton.setCreatedBy(bleachObj.getCreatedBy());
			} else {
//				BeanUtils.copyProperties(bleachContRawCotton, bleachObj);
				bleachObj = bleachContRawCotton;
			}

			if (role.equals("ROLE_SUPERVISOR")) {
				
				bleachContRawCotton.setUpdatedBy(userName);

				bleachContRawCotton.setSupervisor_saved_by(userName);
				bleachContRawCotton.setSupervisor_saved_on(date);
				bleachContRawCotton.setSupervisor_saved_id(userId);
				bleachContRawCotton.setSupervisor_status(AppConstants.supervisorSave);
				bleachContRawCottonF05Repository.save(bleachContRawCotton);

			}  else {
					return new ResponseEntity(new ApiResponse(false, role + " cannot save details"),
							HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			log.error(" **** Unable to save Bleaching Raw Cotton Contamination Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(
					new ApiResponse(false, "Unable to Save Bleaching Raw Cotton Contamination Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(bleachContRawCotton, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitBleachContRawCotton(BleachContRawCottonF05 bleachContRawCotton,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (bleachContRawCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = bleachContRawCotton.getId();

		BleachContRawCottonF05 bleachObj = new BleachContRawCottonF05();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (bleachContRawCotton.getFormatNo() == null)
				value = "formatNo";
			if (bleachContRawCotton.getRefSopNo() == null)
				value = "sopNumber";
			if (bleachContRawCotton.getRevisionNo() == null)
				value = "revisionNo";
			if (bleachContRawCotton.getFormatName() == null)
				value = "formatName";
			if (bleachContRawCotton.getDate() == null)
				value = "date";
			if (bleachContRawCotton.getUnit() == null)
				value = "unit";
			if (bleachContRawCotton.getPhNo() == null)
				value = "phNumber";
			if (bleachContRawCotton.getSupplierName() == null)
				value = "supplierName";
			if (bleachContRawCotton.getQuantity() == null)
				value = "Quantity";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				bleachObj = bleachContRawCottonF05Repository.findFormById(id);

				createdAt = bleachObj.getCreatedAt();
				createdBy = bleachObj.getCreatedBy();

				bleachContRawCotton.setCreatedAt(createdAt);
				bleachContRawCotton.setCreatedBy(createdBy);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "mail_status", "supervisor_status",
						"hod_status", "supervisor_submit_by", "hod_submit_by", "supervisor_submit_on", "hod_submit_on",
						"supervisor_submit_id", "hod_submit_id", "supervisor_saved_by", "hod_saved_by",
						"supervisor_saved_on", "hod_saved_on", "supervisor_saved_id", "hod_saved_id", "supervisor_sign",
						"hod_sign" };

				BeanUtils.copyProperties(bleachContRawCotton, bleachObj, IgnoreProps);

				if (bleachObj.getSupervisor_status().equals(AppConstants.supervisorSave) || bleachObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					
					if (role.equals("ROLE_SUPERVISOR")) {
						bleachObj.setSupervisor_submit_by(userName);
						bleachObj.setSupervisor_submit_on(date);
						bleachObj.setSupervisor_submit_id(userId);
						bleachObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						bleachObj.setSupervisor_sign(userName);

						bleachObj.setHod_status(AppConstants.waitingStatus);
						bleachObj.setMail_status(AppConstants.waitingStatus);

						// IMAGE FOR SUPERVISIOR
						
						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
						
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						
						bleachObj.setSupervisor_signature_image(signature);
						
						bleachContRawCottonF05Repository.save(bleachObj);
						
						// AUDIT TRACK
						
						BleachContRawCottonF05History rawContRawCottonF05History = new BleachContRawCottonF05History();
						
						BeanUtils.copyProperties(bleachObj, rawContRawCottonF05History);
						
						int version = bleachContRawCottonF05RepositoryHistory.getMaximumVersion(rawContRawCottonF05History.getPhNo()).map(temp -> temp + 1).orElse(1);
						
						rawContRawCottonF05History.setVersion(version);
						
						bleachContRawCottonF05RepositoryHistory.save(rawContRawCottonF05History);
						
						try {

							bleachmailfunction.sendMailToHODf05(bleachObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(
									new ApiResponse(false, "Supervisor Approved but Unable to send mail to HOD! "),
									HttpStatus.OK);
						}
					} else {
						return new ResponseEntity(new ApiResponse(false, "ROLE_SUPERVISOR not yet submitted"),
								HttpStatus.BAD_REQUEST);
					}
				}
				if (bleachObj == null) {

					return new ResponseEntity(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);

				}
			} else {
				if (role.equals("ROLE_SUPERVISOR")) {

//					BeanUtils.copyProperties(bleachContRawCotton, bleachObj);

					bleachObj = bleachContRawCotton;

					bleachObj.setSupervisor_submit_by(userName);
					bleachObj.setSupervisor_submit_on(date);
					bleachObj.setSupervisor_submit_id(userId);
					bleachObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
					bleachObj.setSupervisor_sign(userName);

					bleachObj.setHod_status(AppConstants.waitingStatus);
					bleachObj.setMail_status(AppConstants.waitingStatus);

					bleachContRawCottonF05Repository.save(bleachObj);
					
					// IMAGE FOR SUPERVISIOR
					
					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
					
					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
					
					bleachObj.setSupervisor_signature_image(signature);
					
					bleachContRawCottonF05Repository.save(bleachObj);
					
					// AUDIT TRACK
					
					BleachContRawCottonF05History rawContRawCottonF05History = new BleachContRawCottonF05History();
					
					BeanUtils.copyProperties(bleachObj, rawContRawCottonF05History);
					
					int version = bleachContRawCottonF05RepositoryHistory.getMaximumVersion(rawContRawCottonF05History.getPhNo()).map(temp -> temp + 1).orElse(1);
					
					rawContRawCottonF05History.setVersion(version);
					
					bleachContRawCottonF05RepositoryHistory.save(rawContRawCottonF05History);
					
					try {

						bleachmailfunction.sendMailToHODf05(bleachObj);
					} catch (Exception ex) {
						return new ResponseEntity<>(
								new ApiResponse(false, "Supervisor Approved but Unable to send mail to HOD! "),
								HttpStatus.OK);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, "ROLE_SUPERVISOR not yet Submitted details"),
							HttpStatus.BAD_REQUEST);
				}
			}
		} catch (Exception ex) {

			log.error(" **** Unable to Submit Bleaching Raw Cotton Contamination Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(
					new ApiResponse(false, "Unable to Submit Bleaching Raw Cotton Contamination Details"),
					HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Supervisior Submitted Sucessfully"),
				HttpStatus.OK);
	

	}

//	public ResponseEntity<?> approveBleachContRawCotton(ApproveResponse approveResponse, HttpServletRequest http) {
//
//		Date date = new Date();
//		SCAUtil scaUtil = new SCAUtil();
//		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
//
//		String userName = userRepository.getUserName(userId);
//
//		String role = getUserRole();
//
//		if (!role.equals("ROLE_HOD") && !role.equals("ROLE_DESIGNEE")) {
//			return new ResponseEntity(new ApiResponse(false, "Only ROLE_HOD or ROLE_DESIGNEE can approve/reject forms"),
//					HttpStatus.BAD_REQUEST);
//		}
//
//		BleachContRawCottonF05 bleachContRawCotton = bleachContRawCottonF05Repository
//				.findFormById(approveResponse.getId());
//		String currentStatus = bleachContRawCotton.getHodApproverStatus();
//		String currentMailStatus = bleachContRawCotton.getHodMailStatus();
//
//		if (approveResponse.getStatus().equalsIgnoreCase(AppConstants.approve)) {
//			if ((currentStatus.equals(AppConstants.hodStatus) && currentMailStatus.equals(AppConstants.hodStatus))
//					|| (currentStatus.equals(AppConstants.waitingStatus)
//							&& currentMailStatus.equals(AppConstants.waitingStatus))) {
//				bleachContRawCotton.setHodApproverStatus(AppConstants.hodApproved);
//				bleachContRawCotton.setHodApprovedOn(date);
//				bleachContRawCotton.setHodSignature(userName);
//				bleachContRawCotton.setStatus(AppConstants.hodApproved);
//				bleachContRawCottonF05Repository.save(bleachContRawCotton);
//				return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
//			} else {
//				if (currentStatus.equalsIgnoreCase(AppConstants.hodApproved)) {
//					return new ResponseEntity<>(new ApiResponse(false, "Already Approved in Application"),
//							HttpStatus.BAD_REQUEST);
//				} else if (currentMailStatus.equalsIgnoreCase(AppConstants.hodApproved)) {
//					return new ResponseEntity<>(new ApiResponse(false, "Already Approved in Mail"),
//							HttpStatus.BAD_REQUEST);
//				} else {
//					return new ResponseEntity(new ApiResponse(false, "Invalid Response"), HttpStatus.BAD_REQUEST);
//				}
//			}
//		} else if (approveResponse.getStatus().equalsIgnoreCase(AppConstants.reject)) {
//			if (currentStatus.equals(AppConstants.waitingStatus)
//					&& currentMailStatus.equals(AppConstants.waitingStatus)) {
//				bleachContRawCotton.setHodApproverStatus(AppConstants.hodRejected);
//				bleachContRawCotton.setHodApprovedOn(date);
//				bleachContRawCotton.setHodSignature(userName);
//				bleachContRawCotton.setStatus(AppConstants.hodRejected);
//				bleachContRawCottonF05Repository.save(bleachContRawCotton);
//				return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);
//			} else {
//				if (currentStatus.equalsIgnoreCase(AppConstants.hodRejected)) {
//					return new ResponseEntity<>(new ApiResponse(false, "Already Rejected in Application"),
//							HttpStatus.BAD_REQUEST);
//				} else if (currentMailStatus.equalsIgnoreCase(AppConstants.hodRejected)) {
//					return new ResponseEntity<>(new ApiResponse(false, "Already Rejected in Mail"),
//							HttpStatus.BAD_REQUEST);
//				} else {
//					return new ResponseEntity(new ApiResponse(false, "Invalid Response"), HttpStatus.BAD_REQUEST);
//				}
//			}
//		} else {
//			return new ResponseEntity<>(new ApiResponse(false, "Please pass Valid Status"), HttpStatus.BAD_REQUEST);
//		}
//	}
	
	
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveRawCottonF05(ApproveResponse approvalResponse, HttpServletRequest http) {
		
		SCAUtil sca = new SCAUtil();
		
		BleachContRawCottonF05 bleachContRawCottonF05 = new BleachContRawCottonF05();
		
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			bleachContRawCottonF05 = bleachContRawCottonF05Repository.findFormById(approvalResponse.getId());
			
			BleachContRawCottonF05History bleachLayDownCheckListF42History = new BleachContRawCottonF05History();
			
			String supervisiorStatus = bleachContRawCottonF05.getSupervisor_status();
			
			String hodStatus = bleachContRawCottonF05.getHod_status();
			
			
			if(supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
				
				if(userRole.equalsIgnoreCase("ROLE_HOD")||userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
					
					if(approvalResponse.getStatus().equals("Approve")) {
						
						bleachContRawCottonF05.setHod_status(AppConstants.hodApprovedStatus);
						bleachContRawCottonF05.setHod_submit_on(date);
						bleachContRawCottonF05.setHod_submit_by(userName);
						
						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachContRawCottonF05.setHod_signature_image(signature);
						
						bleachContRawCottonF05.setHod_sign(userName);
						
						bleachContRawCottonF05Repository.save(bleachContRawCottonF05);
						
						bleachLayDownCheckListF42History = bleachContRawCottonF05RepositoryHistory.fetchLastSubmittedRecordPhNumber(bleachContRawCottonF05.getPhNo());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						
						bleachContRawCottonF05RepositoryHistory.save(bleachLayDownCheckListF42History);
						
						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
						
					}
					
					else if(approvalResponse.getStatus().equals("Reject")) {
						
						String reason = approvalResponse.getRemarks();
						bleachContRawCottonF05.setReason(reason);
						bleachContRawCottonF05.setHod_status(AppConstants.hodRejectedStatus);
						bleachContRawCottonF05.setHod_submit_on(date);
						bleachContRawCottonF05.setHod_submit_by(userName);
						
						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachContRawCottonF05.setHod_signature_image(signature);
						
						bleachContRawCottonF05.setHod_sign(userName);
						
						bleachContRawCottonF05Repository.save(bleachContRawCottonF05);
						
						bleachLayDownCheckListF42History = bleachContRawCottonF05RepositoryHistory.fetchLastSubmittedRecordPhNumber(bleachContRawCottonF05.getPhNo());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						
						bleachContRawCottonF05RepositoryHistory.save(bleachLayDownCheckListF42History);
						
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
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"), HttpStatus.BAD_REQUEST);
			}
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(
					new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
					HttpStatus.BAD_REQUEST);
			
			
		}
		
		
	}
	

	// PRD01/F-05
	public ResponseEntity<?> getBleachContRawCottonByFormatNo(String formatNo) {
		try {

			List<BleachContRawCottonF05> listOfContRawCotton = bleachContRawCottonF05Repository
					.getDetailsByFormatNo(formatNo);

			if (listOfContRawCotton == null) {

				listOfContRawCotton = new ArrayList<BleachContRawCottonF05>();
			}

			return new ResponseEntity<>(listOfContRawCotton, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Bleaching Raw Cotton Contamination Details: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getBleachContRawCottonByPhNo(String phNo) {
		try {

			List<BleachContRawCottonF05> listOfContRawCotton = bleachContRawCottonF05Repository.findByPHDetails(phNo);

			return new ResponseEntity<>(listOfContRawCotton, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Bleaching Raw Cotton Contamination Details: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	// PRD01/F-05
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllBleachContRawCotton() {
		SCAUtil sca = new SCAUtil();

		try {

			List<BleachContRawCottonF05> listOfContRawCotton = bleachContRawCottonF05Repository.findAll();

			if (listOfContRawCotton == null) {

				listOfContRawCotton = new ArrayList<BleachContRawCottonF05>();
			}

			return new ResponseEntity(listOfContRawCotton, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Contamination Raw Cotton Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Contamination Raw Cotton Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

//	public ResponseEntity<?> getAllSupervisorNotSubmittedF05(HttpServletRequest http) {
//		SCAUtil sca = new SCAUtil();
//		
//		List<BleachAppliedContRawCottonF04> Details = null;
//
//		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//
//		try {
//
//			List<BleachContRawCottonF05> listOfContRawCotton = bleachContRawCottonF05Repository
//					.findBySupervisorStatusSavedAndNotApproved(userId);
//
//			if (listOfContRawCotton == null) {
//
//				listOfContRawCotton = new ArrayList<BleachContRawCottonF05>();
//			}
//
//			return new ResponseEntity(listOfContRawCotton, HttpStatus.OK);
//
//		} catch (Exception e) {
//
//			log.error(
//					"***************** Unable to get List Of All Contamination Raw Cotton Details!  *********************\n"
//							+ e);
//
//			String msg = sca.getErrorMessage(e);
//
//			return new ResponseEntity(
//					new ApiResponse(false, "Unable to get List Of All Contamination Raw Cotton Details!" + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//	}

	public ResponseEntity<?> getAllSupervisorNotSubmittedF05() {
		SCAUtil sca = new SCAUtil();


		try {

			List<BleachContRawCottonF05> listOfContRawCotton = bleachContRawCottonF05Repository
					.findBySupervisorStatusSavedAndNotApproved();

			if (listOfContRawCotton == null) {

				listOfContRawCotton = new ArrayList<BleachContRawCottonF05>();
			}

			return new ResponseEntity(listOfContRawCotton, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Contamination Raw Cotton Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Contamination Raw Cotton Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllHodNotSubmittedF05() {
		SCAUtil sca = new SCAUtil();

		try {

			List<BleachContRawCottonF05> listOfContRawCotton = bleachContRawCottonF05Repository
					.findBySupervisorStatusApprovedAndHodStatusNotApproved();

			if (listOfContRawCotton == null) {

				listOfContRawCotton = new ArrayList<BleachContRawCottonF05>();
			}

			return new ResponseEntity(listOfContRawCotton, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Contamination Raw Cotton Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Contamination Raw Cotton Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

//	public ResponseEntity<?> getByDateDetailsF05(String date) {
//		SCAUtil sca = new SCAUtil();
//
//		try {
//
//			List<BleachContRawCottonF05> listOfContRawCotton = bleachContRawCottonF05Repository.findByDate(date);
//
//			return new ResponseEntity(listOfContRawCotton, HttpStatus.OK);
//
//		} catch (Exception e) {
//
//			log.error("***************** Unable to get List Of All details!  *********************\n" + e);
//
//			String msg = sca.getErrorMessage(e);
//
//			return new ResponseEntity(new ApiResponse(false, "Unable to get List Of All details!" + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//	}
	public ResponseEntity<?> getByDateDetailsF05(String phNo) {
		SCAUtil sca = new SCAUtil();
 
		try {
 
			List<BleachContRawCottonF05> listOfContRawCotton = bleachContRawCottonF05Repository.findByDateNew(phNo);
 
			return new ResponseEntity(listOfContRawCotton, HttpStatus.OK);
 
		} catch (Exception e) {
 
			log.error("***************** Unable to get List Of All details!  *********************\n" + e);
 
			String msg = sca.getErrorMessage(e);
 
			return new ResponseEntity(new ApiResponse(false, "Unable to get List Of All details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}
	
	// PRD01/F-05
	public ResponseEntity<?> getBleachContRawCottonById(Long id) {
		try {

			Optional<BleachContRawCottonF05> response = bleachContRawCottonF05Repository.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Raw Cotton Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// **************************************** PRD01/F-18
	// *************************************************

	// PRD01/F-18 - CREATE
//	public ResponseEntity<?> createOrUpdateBleachAbsCotton(BleachContAbsBleachedCottonF18 bleachAbsCotton,
//			HttpServletRequest http) {
//		SCAUtil sca = new SCAUtil();
//
//		try {
//			Long id = bleachAbsCotton.getId();
//
//			if (id == null) {
//				bleachContAbsBleachedCottonF18Repository.save(bleachAbsCotton);
//
//				if (bleachAbsCotton.getStatus().equalsIgnoreCase("SUBMIT")) {
//					bleachAbsCotton.setStatus(bleachAbsCotton.getStatus());
//					bleachAbsCotton.setMailStatus("WAITING FOR APPROVAL");
//					bleachContAbsBleachedCottonF18Repository.save(bleachAbsCotton);
////						sendMailBleachingUser(bleachContRawCotton);
//				} else {
//					bleachAbsCotton.setStatus("DRAFT");
//					bleachAbsCotton.setMailStatus("PENDING");
//					bleachContAbsBleachedCottonF18Repository.save(bleachAbsCotton);
//				}
//
//			} else {
//				BleachContAbsBleachedCottonF18 ExistingBleachAbsCotton = bleachContAbsBleachedCottonF18Repository
//						.findFormById(id);
//
//				if (ExistingBleachAbsCotton.getStatus().equalsIgnoreCase("SUBMIT")) {
//					return new ResponseEntity(
//							new ApiResponse(false, "Contamination Bleached Cotton Details are already submitted!"),
//							HttpStatus.BAD_REQUEST);
//				}
//
//				bleachAbsCotton.setCreatedAt(ExistingBleachAbsCotton.getCreatedAt());
//				bleachAbsCotton.setCreatedBy(ExistingBleachAbsCotton.getCreatedBy());
//
//				bleachContAbsBleachedCottonF18Repository.save(bleachAbsCotton);
//
//				if (bleachAbsCotton.getStatus().equalsIgnoreCase("SUBMIT")) {
//					bleachAbsCotton.setStatus(bleachAbsCotton.getStatus());
//					bleachAbsCotton.setMailStatus("WAITING FOR APPROVAL");
//					bleachContAbsBleachedCottonF18Repository.save(bleachAbsCotton);
////						sendMailBleachingUser(bleachContRawCotton);
//				} else {
//					bleachAbsCotton.setStatus("DRAFT");
//					bleachAbsCotton.setMailStatus("PENDING");
//					bleachContAbsBleachedCottonF18Repository.save(bleachAbsCotton);
//				}
//			}
//
//		} catch (Exception e) {
//			log.error("***************** Unable to save Contamination Bleached Cotton Details!  *********************\n"
//					+ e);
//
//			String msg = sca.getErrorMessage(e);
//
//			return new ResponseEntity(
//					new ApiResponse(false, "Unable to save Contamination Bleached Cotton Details!" + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//
//		return new ResponseEntity(bleachAbsCotton, HttpStatus.CREATED);
//	}

//		private void sendMailBleachingUser(BleachContRawCottonF05 bleachContRawCotton) {
//			// TODO Auto-generated method stub
//			
//		}

	public ResponseEntity<?> SaveBleachAbsCotton(BleachContAbsBleachedCottonF18 bleachAbsCotton,
			HttpServletRequest http) {
		if (bleachAbsCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		BleachContAbsBleachedCottonF18 bleachObj = null;
		try {

			String value = "";

			if (bleachAbsCotton.getFormatNo() == null)
				value = "formatNo";
			if (bleachAbsCotton.getRefSopNo() == null)
				value = "sopNumber";
			if (bleachAbsCotton.getRevisionNo() == null)
				value = "revisionNo";
			if (bleachAbsCotton.getFormatName() == null)
				value = "formatName";
			if (bleachAbsCotton.getDate() == null)
				value = "date";
			if (bleachAbsCotton.getUnit() == null)
				value = "unit";
			if (bleachAbsCotton.getBmrNo() == null)
				value = "BmrNumber";
			if (bleachAbsCotton.getBatchNo() == null)
				value = "BatchNo";
			if (bleachAbsCotton.getBaleNo() == null)
				value = "Bale Number";
			if (bleachAbsCotton.getQuantity() == null)
				value = "Quantity";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (bleachAbsCotton.getId() != null) {
				bleachObj = bleachContAbsBleachedCottonF18Repository.findFormById(bleachAbsCotton.getId());

				bleachAbsCotton.setCreatedAt(bleachObj.getCreatedAt());
				bleachAbsCotton.setCreatedBy(bleachObj.getCreatedBy());

				BeanUtils.copyProperties(bleachAbsCotton, bleachObj);

			} else {
//				BeanUtils.copyProperties(bleachContRawCotton, bleachObj);
				bleachObj = bleachAbsCotton;
			}

			if (role.equals("ROLE_SUPERVISOR")) {

				bleachAbsCotton.setUpdatedBy(userName);

				bleachAbsCotton.setSupervisor_saved_by(userName);
				bleachAbsCotton.setSupervisor_saved_on(date);
				bleachAbsCotton.setSupervisor_saved_id(userId);
				bleachAbsCotton.setSupervisor_status(AppConstants.supervisorSave);
				bleachContAbsBleachedCottonF18Repository.save(bleachAbsCotton);

			} else {
				return new ResponseEntity(new ApiResponse(false, role + " can not save details !!! "), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			log.error(" **** Unable to save Contamination Bleached Cotton Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(
					new ApiResponse(false, "Unable to Save Contamination Bleached Cotton Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(bleachAbsCotton, HttpStatus.CREATED);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ResponseEntity<?> SubmitBleachAbsCotton(BleachContAbsBleachedCottonF18 bleachAbsCotton,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (bleachAbsCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = bleachAbsCotton.getId();

		BleachContAbsBleachedCottonF18 bleachObj = new BleachContAbsBleachedCottonF18();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (bleachAbsCotton.getFormatNo() == null)
				value = "formatNo";
			if (bleachAbsCotton.getRefSopNo() == null)
				value = "sopNumber";
			if (bleachAbsCotton.getRevisionNo() == null)
				value = "revisionNo";
			if (bleachAbsCotton.getFormatName() == null)
				value = "formatName";
			if (bleachAbsCotton.getDate() == null)
				value = "date";
			if (bleachAbsCotton.getUnit() == null)
				value = "unit";
			if (bleachAbsCotton.getBmrNo() == null)
				value = "BmrNumber";
			if (bleachAbsCotton.getBatchNo() == null)
				value = "BatchNo";
			if (bleachAbsCotton.getBaleNo() == null)
				value = "Bale Number";
			if (bleachAbsCotton.getQuantity() == null)
				value = "Quantity";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				bleachObj = bleachContAbsBleachedCottonF18Repository.findFormById(id);

				createdAt = bleachObj.getCreatedAt();
				createdBy = bleachObj.getCreatedBy();

				bleachAbsCotton.setCreatedAt(createdAt);
				bleachAbsCotton.setCreatedBy(createdBy);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "mail_status", "supervisor_status",
						"hod_status", "supervisor_submit_by", "hod_submit_by", "supervisor_submit_on", "hod_submit_on",
						"supervisor_submit_id", "hod_submit_id", "supervisor_saved_by", "hod_saved_by",
						"supervisor_saved_on", "hod_saved_on", "supervisor_saved_id", "hod_saved_id", "supervisor_sign",
						"hod_sign" };

				BeanUtils.copyProperties(bleachAbsCotton, bleachObj, IgnoreProps);

				if (bleachObj.getSupervisor_status().equals(AppConstants.supervisorSave) || bleachObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_SUPERVISOR")) {
						bleachObj.setSupervisor_submit_by(userName);
						bleachObj.setSupervisor_submit_on(date);
						bleachObj.setSupervisor_submit_id(userId);
						bleachObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						bleachObj.setSupervisor_sign(userName);

						bleachObj.setHod_status(AppConstants.waitingStatus);
						bleachObj.setMail_status(AppConstants.waitingStatus);

						bleachContAbsBleachedCottonF18Repository.save(bleachObj);
						
						BleachContAbsBleachedCottonHistoryF18 bleachContAbsBleachedCottonHistoryF18 = new BleachContAbsBleachedCottonHistoryF18();
						
						BeanUtils.copyProperties(bleachAbsCotton, bleachContAbsBleachedCottonHistoryF18);
						
						String baleNo = bleachContAbsBleachedCottonHistoryF18.getBaleNo();
						
						String bmrNo = bleachContAbsBleachedCottonHistoryF18.getBmrNo();
						
						Long batcNo = bleachContAbsBleachedCottonHistoryF18.getBatchNo();

						int version = bleachContAbsBleachedCottonF18RepositoryHistory.getMaximumVersion(bmrNo, batcNo, baleNo).map(temp -> temp + 1).orElse(1);;
						
						bleachContAbsBleachedCottonHistoryF18.setVersion(version);
						
						bleachContAbsBleachedCottonF18RepositoryHistory.save(bleachContAbsBleachedCottonHistoryF18);
						
						try {

							bleachmailfunction.sendMailToHODf18(bleachObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(
									new ApiResponse(false, "Supervisor Approved but Unable to send mail to HOD! "),
									HttpStatus.OK);
						}
					} else {
						return new ResponseEntity(new ApiResponse(false, role + " can not submit details"),
								HttpStatus.BAD_REQUEST);
					}
				}  
				else {
					return new ResponseEntity(new ApiResponse(false, "Only Supervisior Saved or Hod Rejected Records proceed to Submit"),
							HttpStatus.BAD_REQUEST);
				}
				
				
				if (bleachObj == null) {

					return new ResponseEntity(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);

				}
			} else {
				if (role.equals("ROLE_SUPERVISOR")) {

//					BeanUtils.copyProperties(bleachContRawCotton, bleachObj);

					bleachObj = bleachAbsCotton;

					bleachObj.setSupervisor_submit_by(userName);
					bleachObj.setSupervisor_submit_on(date);
					bleachObj.setSupervisor_submit_id(userId);
					bleachObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
					bleachObj.setSupervisor_sign(userName);

					bleachObj.setHod_status(AppConstants.waitingStatus);
					bleachObj.setMail_status(AppConstants.waitingStatus);

					bleachContAbsBleachedCottonF18Repository.save(bleachObj);
					
					BleachContAbsBleachedCottonHistoryF18 bleachContAbsBleachedCottonHistoryF18 = new BleachContAbsBleachedCottonHistoryF18();
					
					BeanUtils.copyProperties(bleachAbsCotton, bleachContAbsBleachedCottonHistoryF18);
					
					String baleNo = bleachContAbsBleachedCottonHistoryF18.getBaleNo();
					
					String bmrNo = bleachContAbsBleachedCottonHistoryF18.getBmrNo();
					
					Long batcNo = bleachContAbsBleachedCottonHistoryF18.getBatchNo();

					int version = bleachContAbsBleachedCottonF18RepositoryHistory.getMaximumVersion(bmrNo, batcNo, baleNo).map(temp -> temp + 1).orElse(1);;
					
					bleachContAbsBleachedCottonHistoryF18.setVersion(version);
					
					bleachContAbsBleachedCottonF18RepositoryHistory.save(bleachContAbsBleachedCottonHistoryF18);
					
					try {

						bleachmailfunction.sendMailToHODf18(bleachObj);
					} catch (Exception ex) {
						return new ResponseEntity<>(
								new ApiResponse(false, "Supervisor Submitted but Unable to send mail to HOD! "),
								HttpStatus.OK);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, role + " cannot submit details"),
							HttpStatus.BAD_REQUEST);
				}
			}
		} catch (Exception ex) {

			log.error(" **** Unable to Submit Contamination Bleached Cotton Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Contamination Bleached Cotton Details"),
					HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Supervisior Submitted Sucessfully"),
				HttpStatus.OK);

	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveBleachAbsCotton(ApproveResponse approveResponse, HttpServletRequest http) {

		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		SCAUtil scaUtil = new SCAUtil();
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		String role = getUserRole();

		
		if (!role.equals("ROLE_HOD") && !role.equals("ROLE_DESIGNEE")) {
			return new ResponseEntity(new ApiResponse(false, "Only ROLE_HOD or ROLE_DESIGNEE can approve/reject forms"),
					HttpStatus.BAD_REQUEST);
		}

		BleachContAbsBleachedCottonF18 bleachAbsCotton = bleachContAbsBleachedCottonF18Repository
				.findFormById(approveResponse.getId());
		
		String supervisiorStatus = bleachAbsCotton.getSupervisor_status();
		String hodStatus = bleachAbsCotton.getHod_status();

		if (approveResponse.getStatus().equalsIgnoreCase("Approve")) {
			if ((supervisiorStatus.equals(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)))
			{
				bleachAbsCotton.setHod_status(AppConstants.hodApprovedStatus);
				bleachAbsCotton.setHod_submit_on(date);
				bleachAbsCotton.setHod_sign(userName);
				bleachAbsCotton.setHod_submit_by(userName);
				bleachAbsCotton.setHod_submit_id(userId);
				
				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
				bleachAbsCotton.setHodSignature(signature);
				
				bleachContAbsBleachedCottonF18Repository.save(bleachAbsCotton);
				
				BleachContAbsBleachedCottonHistoryF18 bleachContAbsBleachedCottonHistoryF18 = new BleachContAbsBleachedCottonHistoryF18();
				
				bleachContAbsBleachedCottonHistoryF18 = bleachContAbsBleachedCottonF18RepositoryHistory.fetchLastSubmittedRecordLaydown(bleachAbsCotton.getBmrNo(), bleachAbsCotton.getBatchNo(), bleachAbsCotton.getBaleNo());
				
				bleachContAbsBleachedCottonHistoryF18.setHod_status(AppConstants.hodApprovedStatus);
				bleachContAbsBleachedCottonHistoryF18.setHod_submit_on(date);
				bleachContAbsBleachedCottonHistoryF18.setHod_submit_by(userName);
				bleachContAbsBleachedCottonHistoryF18.setHod_submit_id(userId);
				bleachContAbsBleachedCottonHistoryF18.setHod_sign(userName);
				
				bleachContAbsBleachedCottonF18RepositoryHistory.save(bleachContAbsBleachedCottonHistoryF18);
				
				return new ResponseEntity(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
			
			} else {
				if (hodStatus.equalsIgnoreCase(AppConstants.hodApprovedStatus)) {
					return new ResponseEntity<>(new ApiResponse(false, "Hod Already Approved"),
							HttpStatus.BAD_REQUEST);
				} else if (hodStatus.equalsIgnoreCase(AppConstants.hodRejectedStatus)) {
					return new ResponseEntity<>(new ApiResponse(false, "Hod Already Rejected"),
							HttpStatus.BAD_REQUEST);
				} else {
					return new ResponseEntity(new ApiResponse(false, "Invalid Response"), HttpStatus.BAD_REQUEST);
				}
			}
		} else if (approveResponse.getStatus().equalsIgnoreCase("Reject")) {
			
			if ((supervisiorStatus.equals(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus))) {
				
				
				bleachAbsCotton.setHod_status(AppConstants.hodRejectedStatus);
				bleachAbsCotton.setHod_submit_on(date);
				bleachAbsCotton.setHod_submit_by(userName);
				bleachAbsCotton.setHod_sign(userName);		
				bleachAbsCotton.setReason(approveResponse.getRemarks());
				
				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
				bleachAbsCotton.setHodSignature(signature);
				
				bleachContAbsBleachedCottonF18Repository.save(bleachAbsCotton);
				
				BleachContAbsBleachedCottonHistoryF18 bleachContAbsBleachedCottonHistoryF18 = new BleachContAbsBleachedCottonHistoryF18();
				
				bleachContAbsBleachedCottonHistoryF18 = bleachContAbsBleachedCottonF18RepositoryHistory.fetchLastSubmittedRecordLaydown(bleachAbsCotton.getBmrNo(), bleachAbsCotton.getBatchNo(), bleachAbsCotton.getBaleNo());
				
				bleachContAbsBleachedCottonHistoryF18.setHod_status(AppConstants.hodRejectedStatus);
				bleachContAbsBleachedCottonHistoryF18.setHod_submit_on(date);
				bleachContAbsBleachedCottonHistoryF18.setHod_submit_by(userName);
				bleachContAbsBleachedCottonHistoryF18.setHod_sign(userName);
				bleachContAbsBleachedCottonHistoryF18.setReason(approveResponse.getRemarks());
				
				bleachContAbsBleachedCottonF18RepositoryHistory.save(bleachContAbsBleachedCottonHistoryF18);
				
				return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);
			} else {

				if (hodStatus.equalsIgnoreCase(AppConstants.hodApprovedStatus)) {
					return new ResponseEntity<>(new ApiResponse(false, "Hod Already Approved"),
							HttpStatus.BAD_REQUEST);
				} else if (hodStatus.equalsIgnoreCase(AppConstants.hodRejectedStatus)) {
					return new ResponseEntity<>(new ApiResponse(false, "Hod Already Rejected"),
							HttpStatus.BAD_REQUEST);
				} else {
					return new ResponseEntity(new ApiResponse(false, "Invalid Response"), HttpStatus.BAD_REQUEST);
				}
			
			}
		} else {
			
			return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
			
		}
		
		
	}

	// PRD01/F-18
	public ResponseEntity<?> getBleachAbsCottonByFormatNo(String formatNo) {
		try {

			List<BleachContAbsBleachedCottonF18> listOfAbsCotton = bleachContAbsBleachedCottonF18Repository
					.getDetailsByFormatNo(formatNo);

			if (listOfAbsCotton == null) {

				listOfAbsCotton = new ArrayList<BleachContAbsBleachedCottonF18>();
			}

			return new ResponseEntity<>(listOfAbsCotton, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Contamination Bleached Cotton Details: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	// PRD01/F-18
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllBleachAbsCotton() {
		SCAUtil sca = new SCAUtil();

		try {

			List<BleachContAbsBleachedCottonF18> listOfAbsCotton = bleachContAbsBleachedCottonF18Repository.findAll();

			if (listOfAbsCotton == null) {

				listOfAbsCotton = new ArrayList<BleachContAbsBleachedCottonF18>();
			}

			return new ResponseEntity(listOfAbsCotton, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Contamination Bleached Cotton Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Contamination Bleached Cotton Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

//	public ResponseEntity<?> getAllSupervisorNotSubmittedF18(HttpServletRequest http) {
//
//		SCAUtil sca = new SCAUtil();
//		List<BleachAppliedContRawCottonF04> Details = null;
//
//		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//		
//
//		try {
//
//			List<BleachContAbsBleachedCottonF18> listOfAbsCotton = bleachContAbsBleachedCottonF18Repository
//					.findBySupervisorStatusSavedAndNotApproved(userId);
//
//			if (listOfAbsCotton == null) {
//
//				listOfAbsCotton = new ArrayList<BleachContAbsBleachedCottonF18>();
//			}
//
//			return new ResponseEntity(listOfAbsCotton, HttpStatus.OK);
//
//		} catch (Exception e) {
//
//			log.error(
//					"***************** Unable to get List Of All Contamination Bleached Cotton Details!  *********************\n"
//							+ e);
//
//			String msg = sca.getErrorMessage(e);
//
//			return new ResponseEntity(
//					new ApiResponse(false, "Unable to get List Of All Contamination Bleached Cotton Details!" + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//	}

	public ResponseEntity<?> getAllSupervisorNotSubmittedF18() {

		SCAUtil sca = new SCAUtil();
		List<BleachAppliedContRawCottonF04> Details = null;

		try {

			List<BleachContAbsBleachedCottonF18> listOfAbsCotton = bleachContAbsBleachedCottonF18Repository
					.findBySupervisorStatusSavedAndNotApproved();

			if (listOfAbsCotton == null) {

				listOfAbsCotton = new ArrayList<BleachContAbsBleachedCottonF18>();
			}

			return new ResponseEntity(listOfAbsCotton, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Contamination Bleached Cotton Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Contamination Bleached Cotton Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getAllHodNotSubmittedF18() {
		SCAUtil sca = new SCAUtil();

		try {

			List<BleachContAbsBleachedCottonF18> listOfAbsCotton = bleachContAbsBleachedCottonF18Repository
					.findBySupervisorStatusApprovedAndHodStatusNotApproved();

			if (listOfAbsCotton == null) {

				listOfAbsCotton = new ArrayList<BleachContAbsBleachedCottonF18>();
			}

			return new ResponseEntity(listOfAbsCotton, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Contamination Bleached Cotton Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Contamination Bleached Cotton Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// PRD01/F-18
	public ResponseEntity<?> getBleachAbsCottonById(Long id) {
		try {

			Optional<BleachContAbsBleachedCottonF18> response = bleachContAbsBleachedCottonF18Repository.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Contamination Bleached Cotton Details: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getGetByBmrBleachAbsCotton(String bmrNo) {

		List<BleachContAbsBleachedCottonF18> response = new ArrayList<>();

		try {

			response = bleachContAbsBleachedCottonF18Repository.findByBmrList(bmrNo);

		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Get Contamination Bleached Cotton Details: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	 
	//batch number lov
	public ResponseEntity<?> bmrBasedBatchNoLov(String bmrNo) {
	 
			List<LovResponse> responseList = new ArrayList<>();
			List<BigInteger> response = new ArrayList<>();
	 
			try {
				response = bleachContAbsBleachedCottonF18Repository.bmrBasedBatchNoLov(bmrNo);
	            if(!response.isEmpty()) {
					Long id = (long) 1;
					for(BigInteger obj : response) {
						LovResponse res = new LovResponse();
						res.setId(id);
						res.setValue(obj.toString());
						res.setDescription(obj.toString());
						responseList.add(res);
						id++;
					}
	            }
	 
			} catch (Exception e) {
				return new ResponseEntity<>("Error Get Contamination Bleached Cotton Details: " + e.getMessage(),
						HttpStatus.BAD_REQUEST);
			}
	 
			return new ResponseEntity<>(responseList, HttpStatus.OK);
		}
		// bale lov
		public ResponseEntity<?> batchBasedBaleNoLov(String bmrNo,Long batchNo) {
			List<LovResponse> responseList = new ArrayList<>();
	 
			List<String> response = new ArrayList<>();
	 
			try {
	 
				response = bleachContAbsBleachedCottonF18Repository.batchBasedBaleNoLov(bmrNo,batchNo);
	           if(!response.isEmpty()) {
					Long id = (long) 1;
					for(String obj : response) {
						LovResponse res = new LovResponse();
						res.setId(id);
						res.setValue(obj);
						res.setDescription(obj);
						responseList.add(res);
						id++;
					}
	            }
	 
			} catch (Exception e) {
				return new ResponseEntity<>("Error Get Contamination Bleached Cotton Details: " + e.getMessage(),
						HttpStatus.BAD_REQUEST);
			}
	 
			return new ResponseEntity<>(responseList, HttpStatus.OK);
		}

	// **************************************** PRD01/F-11
	// *************************************************

//	public ResponseEntity<?> createOrUpdateUsageLogHydroExtractor(EquipLogBookHydroExtractorF11 equiplogDetails,
//			HttpServletRequest http) {
//		SCAUtil sca = new SCAUtil();
//
//		try {
//			Long id = equiplogDetails.getId();
//
//			if (id == null) {
//				equipLogBookHydroExtractorF11Repository.save(equiplogDetails);
//
//				List<EquipmentLogsF11> logList = equiplogDetails.getEquipmentLogDetails();
//				for (EquipmentLogsF11 log : logList) {
////					log.setEquipmentLogId(equiplogDetails);
//					log.setLogId(equiplogDetails.getId());
//					equipmentLogsF11Repository.save(log);
//				}
//
//				equiplogDetails.setEquipmentLogDetails(logList);
//
//				equipLogBookHydroExtractorF11Repository.save(equiplogDetails);
//
//				if (equiplogDetails.getStatus().equalsIgnoreCase("SUBMIT")) {
//					equiplogDetails.setStatus(equiplogDetails.getStatus());
//					equiplogDetails.setMailStatus("WAITING FOR APPROVAL");
//					equipLogBookHydroExtractorF11Repository.save(equiplogDetails);
////						sendMailBleachingUser(bleachContRawCotton);
//				} else {
//					equiplogDetails.setStatus("DRAFT");
//					equiplogDetails.setMailStatus("PENDING");
//					equipLogBookHydroExtractorF11Repository.save(equiplogDetails);
//				}
//
//			} else {
//				EquipLogBookHydroExtractorF11 ExistingDetails = equipLogBookHydroExtractorF11Repository
//						.findFormById(id);
//
//				if (ExistingDetails.getStatus().equalsIgnoreCase("SUBMIT")) {
//					return new ResponseEntity(
//							new ApiResponse(false,
//									"Equipment usage log book Hydro Extractor details are already submitted!"),
//							HttpStatus.BAD_REQUEST);
//				}
//
//				equiplogDetails.setCreatedAt(ExistingDetails.getCreatedAt());
//				equiplogDetails.setCreatedBy(ExistingDetails.getCreatedBy());
//
//				List<EquipmentLogsF11> logList = equiplogDetails.getEquipmentLogDetails();
//				for (EquipmentLogsF11 log : logList) {
////					log.setEquipmentLogId(equiplogDetails);
//					log.setLogId(equiplogDetails.getId());
//					equipmentLogsF11Repository.save(log);
//				}
//
//				equiplogDetails.setEquipmentLogDetails(logList);
//
//				equipLogBookHydroExtractorF11Repository.save(equiplogDetails);
//
//				if (equiplogDetails.getStatus().equalsIgnoreCase("SUBMIT")) {
//					equiplogDetails.setStatus(equiplogDetails.getStatus());
//					equiplogDetails.setMailStatus("WAITING FOR APPROVAL");
//					equipLogBookHydroExtractorF11Repository.save(equiplogDetails);
////						sendMailBleachingUser(bleachContRawCotton);
//				} else {
//					equiplogDetails.setStatus("DRAFT");
//					equiplogDetails.setMailStatus("PENDING");
//					equipLogBookHydroExtractorF11Repository.save(equiplogDetails);
//				}
//			}
//
//		} catch (Exception e) {
//			log.error(
//					"***************** Unable to save Equipment log book Hydro Extractor details!  *********************\n"
//							+ e);
//
//			String msg = sca.getErrorMessage(e);
//
//			return new ResponseEntity(
//					new ApiResponse(false, "Unable to save Equipment log book Hydro Extractor details!" + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//
//		return new ResponseEntity(equiplogDetails, HttpStatus.CREATED);
//	}

	@SuppressWarnings("rawtypes")
	public ResponseEntity<?> getAllUsageLogHydroExtractor() {
		SCAUtil sca = new SCAUtil();

		try {

			List<EquipLogBookHydroExtractorF11> list = equipLogBookHydroExtractorF11Repository.findAll();

			if (list == null) {

				list = new ArrayList<EquipLogBookHydroExtractorF11>();
			}

			return new ResponseEntity(list, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Equipment log book Hydro Extractor details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false,
							"Unable to get List Of All Equipment log book Hydro Extractor details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllHodNotSubmittedF11() {
		SCAUtil sca = new SCAUtil();

		try {

			List<EquipLogBookHydroExtractorF11> list = equipLogBookHydroExtractorF11Repository
					.findBySupervisorStatusApprovedAndHodStatusNotApproved();

			if (list == null) {

				list = new ArrayList<EquipLogBookHydroExtractorF11>();
			}

			return new ResponseEntity(list, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Equipment log book Hydro Extractor details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false,
							"Unable to get List Of All Equipment log book Hydro Extractor details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getAllSupervisorNotSubmittedF11() {

		SCAUtil sca = new SCAUtil();
		try {

			List<EquipLogBookHydroExtractorF11> list = equipLogBookHydroExtractorF11Repository
					.findBySupervisorStatusSavedAndNotApproved();

			if (list == null) {

				list = new ArrayList<EquipLogBookHydroExtractorF11>();
			}

			return new ResponseEntity(list, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Equipment log book Hydro Extractor details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false,
							"Unable to get List Of All Equipment log book Hydro Extractor details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getUsageLogHydroExtractorById(Long id) {
		try {

			Optional<EquipLogBookHydroExtractorF11> response = equipLogBookHydroExtractorF11Repository.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Equipment log book Hydro Extractor Details: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByBmrUsageLogHydroExtractor(String bmrNo) {
		try {

//			List<EquipmentLogsF11> response = equipmentLogsF11Repository.findByBmrNoWithDetails(bmrNo);

			EquipLogBookHydroExtractorF11 response = equipLogBookHydroExtractorF11Repository.findByBmrNo(bmrNo);

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Equipment log book Hydro Extractor Details: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}
	
	public ResponseEntity<?> findByBmrAndBatchNo(String bmrNo, String batchNo) {
		try {
 
			EquipLogBookHydroExtractorF11 response = equipLogBookHydroExtractorF11Repository
					.findByBmrAndBatchNo(bmrNo, batchNo);
 
			if (response== null) {
				Map<String, String> noDataResponse = new HashMap<>();
				noDataResponse.put("status", "No Data");
				return new ResponseEntity<>(noDataResponse, HttpStatus.OK);
			}
			
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Equipment log book Hydro Extractor Details: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByBmrRangeF11(String fromBmr, String toBmr) {
		try {

			List<EquipLogBookHydroExtractorF11> response = equipLogBookHydroExtractorF11Repository
					.findByBmrRange(fromBmr, toBmr);

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Equipment log book Hydro Extractor Details: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> SaveUsageLogHydroExtractor(EquipLogBookHydroExtractorF11 hydroExtractorReq,
			HttpServletRequest http) {
		if (hydroExtractorReq == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		EquipLogBookHydroExtractorF11 bleachObj = null;
		try {

			String value = "";

			if (hydroExtractorReq.getFormatNo() == null)
				value = "formatNo";
			if (hydroExtractorReq.getRefSopNo() == null)
				value = "sopNumber";
			if (hydroExtractorReq.getRevisionNo() == null)
				value = "revisionNo";
			if (hydroExtractorReq.getFormatName() == null)
				value = "formatName";
			if (hydroExtractorReq.getBmrNo() == null)
				value = "BMR Number";
			if (hydroExtractorReq.getSubBatchNo() == null)
				value = "Sub Batch Number";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			String[] IgnoreProps = { "id", "createdBy", "createdAt", "mail_status", "supervisor_status", "hod_status",
					"supervisor_submit_by", "hod_submit_by", "supervisor_submit_on", "hod_submit_on",
					"supervisor_submit_id", "hod_submit_id", "supervisor_saved_by", "hod_saved_by",
					"supervisor_saved_on", "hod_saved_on", "supervisor_saved_id", "hod_saved_id", "supervisor_sign",
					"hod_sign" };

			if (hydroExtractorReq.getId() != null) {
				bleachObj = equipLogBookHydroExtractorF11Repository.findFormById(hydroExtractorReq.getId());
				BeanUtils.copyProperties(hydroExtractorReq, bleachObj, IgnoreProps);
			} else {
				bleachObj = hydroExtractorReq;

			}
			if (role.equals("ROLE_SUPERVISOR")) {

				bleachObj.setSupervisor_saved_by(userName);
				bleachObj.setSupervisor_saved_on(date);
				bleachObj.setSupervisor_saved_id(userId);
				bleachObj.setSupervisor_status(AppConstants.supervisorSave);

				equipLogBookHydroExtractorF11Repository.save(bleachObj);

			} else {
				return new ResponseEntity(new ApiResponse(false, role + " cannot Save details!"), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save details!" + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(bleachObj, HttpStatus.CREATED);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ResponseEntity<?> SubmitUsageLogHydroExtractor(EquipLogBookHydroExtractorF11 hydroExtractorReq,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (hydroExtractorReq == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = hydroExtractorReq.getId();

		EquipLogBookHydroExtractorF11 bleachObj = new EquipLogBookHydroExtractorF11();

		try {
			String value = "";

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (hydroExtractorReq.getFormatNo() == null)
				value = "formatNo";
			if (hydroExtractorReq.getRefSopNo() == null)
				value = "sopNumber";
			if (hydroExtractorReq.getRevisionNo() == null)
				value = "revisionNo";
			if (hydroExtractorReq.getFormatName() == null)
				value = "formatName";
			if (hydroExtractorReq.getBmrNo() == null)
				value = "BMR Number";
			if (hydroExtractorReq.getSubBatchNo() == null)
				value = "Sub Batch Number";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				bleachObj = equipLogBookHydroExtractorF11Repository.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "mail_status", "supervisor_status",
						"hod_status", "supervisor_submit_by", "hod_submit_by", "supervisor_submit_on", "hod_submit_on",
						"supervisor_submit_id", "hod_submit_id", "supervisor_saved_by", "hod_saved_by",
						"supervisor_saved_on", "hod_saved_on", "supervisor_saved_id", "hod_saved_id", "supervisor_sign",
						"hod_sign" };

				BeanUtils.copyProperties(hydroExtractorReq, bleachObj, IgnoreProps);

				if (bleachObj.getSupervisor_status().equals(AppConstants.supervisorSave) || bleachObj.getHod_status().equalsIgnoreCase(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_SUPERVISOR")) {
						bleachObj.setSupervisor_submit_by(userName);
						bleachObj.setSupervisor_submit_on(date);
						bleachObj.setSupervisor_submit_id(userId);
						bleachObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						bleachObj.setSupervisor_sign(userName);

						bleachObj.setHod_status(AppConstants.waitingStatus);
						bleachObj.setMail_status(AppConstants.waitingStatus);

						equipLogBookHydroExtractorF11Repository.save(bleachObj);
						
						// IMAGE 
						
						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
						
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						
						bleachObj.setSupervisiorSignature(signature);
						
						// AUDIT
						
						EquipLogBookHydroExtractorHistoryF11 hydroExtractorHistoryF11 = new EquipLogBookHydroExtractorHistoryF11();
						
						BeanUtils.copyProperties(bleachObj, hydroExtractorHistoryF11);
						
						String bmrNumber = hydroExtractorHistoryF11.getBmrNo();
						String batchNumber = hydroExtractorHistoryF11.getSubBatchNo();
						
						int version = hydroExtractorF11RepositoryHistory.getMaximumVersion(bmrNumber, batchNumber).map(temp -> temp + 1).orElse(1);
						
						hydroExtractorHistoryF11.setVersion(version);
						
						hydroExtractorF11RepositoryHistory.save(hydroExtractorHistoryF11);
						
						try {

							bleachmailfunction.sendMailToHODf11(bleachObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(
									new ApiResponse(false, "Supervisor Approved but Unable to send mail to HOD! "),
									HttpStatus.OK);
						}
					} else {
						return new ResponseEntity(new ApiResponse(false, role + " can not submit details"),
								HttpStatus.BAD_REQUEST);
					}
				} else 
				{
					return new ResponseEntity(new ApiResponse(false, "Supervisior can submit Supervisior Saved or Hod Rejected Records "),
							HttpStatus.BAD_REQUEST);
				}

				if (bleachObj == null) {

					return new ResponseEntity(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);

				}

			} else {
				if (role.equals("ROLE_SUPERVISOR")) {

//					BeanUtils.copyProperties(bleachContRawCotton, bleachObj);

					bleachObj = hydroExtractorReq;

					bleachObj.setSupervisor_submit_by(userName);
					bleachObj.setSupervisor_submit_on(date);
					bleachObj.setSupervisor_submit_id(userId);
					bleachObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
					bleachObj.setSupervisor_sign(userName);
					bleachObj.setHod_status(AppConstants.waitingStatus);
					bleachObj.setMail_status(AppConstants.waitingStatus);

					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
					
					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
					
					bleachObj.setSupervisiorSignature(signature);
					
					equipLogBookHydroExtractorF11Repository.save(bleachObj);
					
					EquipLogBookHydroExtractorHistoryF11 hydroExtractorHistoryF11 = new EquipLogBookHydroExtractorHistoryF11();
					
					BeanUtils.copyProperties(bleachObj, hydroExtractorHistoryF11);
					
					String bmrNumber = hydroExtractorHistoryF11.getBmrNo();
					String batchNumber = hydroExtractorHistoryF11.getSubBatchNo();
					
					int version = hydroExtractorF11RepositoryHistory.getMaximumVersion(bmrNumber, batchNumber).map(temp -> temp + 1).orElse(1);
					
					hydroExtractorHistoryF11.setVersion(version);
					
					hydroExtractorF11RepositoryHistory.save(hydroExtractorHistoryF11);

					try {

						bleachmailfunction.sendMailToHODf11(bleachObj);
					} catch (Exception ex) {
						return new ResponseEntity<>(
								new ApiResponse(false, "Supervisor Submitted but Unable to send mail to HOD! "),
								HttpStatus.OK);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, role + "can not submit details"),
							HttpStatus.BAD_REQUEST);
				}

			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details" + msg), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"),
				HttpStatus.OK);

	}
	
	
		// APPROVE HYDRO EXTRACTOR F11
	
	public ResponseEntity<?> approveUsageLogHydroExtractor(ApproveResponse approvalResponse, HttpServletRequest http) {
		
		SCAUtil sca = new SCAUtil();
		
		EquipLogBookHydroExtractorF11 bleachCheckListF42 = new EquipLogBookHydroExtractorF11();
		
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			bleachCheckListF42 = equipLogBookHydroExtractorF11Repository.findFormById(approvalResponse.getId());
			
			EquipLogBookHydroExtractorHistoryF11 bleachLayDownCheckListF42History = new EquipLogBookHydroExtractorHistoryF11();
			
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
						bleachCheckListF42.setSupervisiorSignature(signature);
						
						bleachCheckListF42.setHod_sign(userName);
						
						equipLogBookHydroExtractorF11Repository.save(bleachCheckListF42);
						
						bleachLayDownCheckListF42History = hydroExtractorF11RepositoryHistory.fetchLastSubmittedRecord(bleachCheckListF42.getBmrNo(), bleachCheckListF42.getSubBatchNo());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_sign(userName);
					
						
						hydroExtractorF11RepositoryHistory.save(bleachLayDownCheckListF42History);
						
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
						
						equipLogBookHydroExtractorF11Repository.save(bleachCheckListF42);

						
						bleachLayDownCheckListF42History = hydroExtractorF11RepositoryHistory.fetchLastSubmittedRecord(bleachCheckListF42.getBmrNo(), bleachCheckListF42.getSubBatchNo());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						
						hydroExtractorF11RepositoryHistory.save(bleachLayDownCheckListF42History);
						
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
	

//  **************************************** PRD01/F-03  *************************************************

	public ResponseEntity<?> SaveMetalDetectorList(MetalDetectorCheckListF03 checkList, HttpServletRequest http) {
		if (checkList == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		MetalDetectorCheckListF03 listObj = null;
		try {

			String value = "";

			if (checkList.getFormatNo() == null)
				value = "formatNo";
			if (checkList.getRefSopNo() == null)
				value = "SopNumber";
			if (checkList.getRevisionNo() == null)
				value = "revisionNo";
			if (checkList.getFormatName() == null)
				value = "formatName";
			if (checkList.getUnit() == null)
				value = "unit";
			if (checkList.getDate() == null)
				value = "date";
			if (checkList.getSection() == null)
				value = "section";
			if (checkList.getEquipmentName() == null)
				value = "equipmentName";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (checkList.getListId() != null) {

				listObj = metalDetectorCheckListF03Repository.findFormById(checkList.getListId());

				Date createdAt = listObj.getCreatedAt();
				String createdBy = listObj.getCreatedBy();

				String[] IgnoreProps = { "listId", "createdBy", "createdAt", "mail_status", "supervisor_status",
						"hod_status", "supervisor_submit_by", "hod_submit_by", "supervisor_submit_on", "hod_submit_on",
						"supervisor_submit_id", "hod_submit_id", "supervisor_saved_by", "hod_saved_by",
						"supervisor_saved_on", "hod_saved_on", "supervisor_saved_id", "hod_saved_id", "supervisor_sign",
						"hod_sign" };

				BeanUtils.copyProperties(checkList, listObj, IgnoreProps);

				checkList.setCreatedAt(createdAt);
				checkList.setCreatedBy(createdBy);

				if (role.equals("ROLE_SUPERVISOR")) {
					
					listObj.setSupervisor_saved_by(userName);
					listObj.setSupervisor_saved_on(date);
					listObj.setSupervisor_saved_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);

					metalDetectorCheckListF03Repository.save(listObj);
					
				} else {
					
					return new ResponseEntity(new ApiResponse(false, role + "cannot save details"),
							HttpStatus.BAD_REQUEST);
					
				}
			} else {
				if (role.equals("ROLE_SUPERVISOR")) {
					listObj = checkList;

					listObj.setSupervisor_saved_by(userName);
					listObj.setSupervisor_saved_on(date);
					listObj.setSupervisor_saved_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);

					metalDetectorCheckListF03Repository.save(listObj);
				} else {

					return new ResponseEntity(new ApiResponse(false, role + "cannot save details"),
							HttpStatus.BAD_REQUEST);

				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!" + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitMetalDetectorList(MetalDetectorCheckListF03 checkList, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (checkList == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = checkList.getListId();

		MetalDetectorCheckListF03 checkObj = new MetalDetectorCheckListF03();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (checkList.getFormatNo() == null)
				value = "formatNo";
			if (checkList.getRefSopNo() == null)
				value = "SopNumber";
			if (checkList.getRevisionNo() == null)
				value = "revisionNo";
			if (checkList.getFormatName() == null)
				value = "formatName";
			if (checkList.getUnit() == null)
				value = "unit";
			if (checkList.getDate() == null)
				value = "date";
			if (checkList.getSection() == null)
				value = "section";
			if (checkList.getEquipmentName() == null)
				value = "equipmentName";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = metalDetectorCheckListF03Repository.findFormById(id);

				String[] IgnoreProps = { "listId", "createdBy", "createdAt", "mail_status", "supervisor_status",
						"hod_status", "supervisor_submit_by", "hod_submit_by", "supervisor_submit_on", "hod_submit_on",
						"supervisor_submit_id", "hod_submit_id", "supervisor_saved_by", "hod_saved_by",
						"supervisor_saved_on", "hod_saved_on", "supervisor_saved_id", "hod_saved_id", "supervisor_sign",
						"hod_sign" };

				BeanUtils.copyProperties(checkList, checkObj, IgnoreProps);

				createdAt = checkObj.getCreatedAt();
				createdBy = checkObj.getCreatedBy();

				checkList.setCreatedAt(createdAt);
				checkList.setCreatedBy(createdBy);

				if (checkObj.getSupervisor_status().equals(AppConstants.supervisorSave) || checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_SUPERVISOR")) {
						checkObj.setSupervisor_submit_by(userName);
						checkObj.setSupervisor_submit_on(date);
						checkObj.setSupervisor_submit_id(userId);
						checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						checkObj.setSupervisor_sign(userName);

						checkObj.setHod_status(AppConstants.waitingStatus);
						checkObj.setMail_status(AppConstants.waitingStatus);

						metalDetectorCheckListF03Repository.save(checkObj);
						
						// AUDIT TRAIL
						
						BleachMetalDetectorCheckListHistoryF03 metalDetectorCheckListHistoryF03 = new BleachMetalDetectorCheckListHistoryF03();
						
						BeanUtils.copyProperties(checkObj, metalDetectorCheckListHistoryF03);
						
						String date1 = metalDetectorCheckListHistoryF03.getDate();
						
						String section = metalDetectorCheckListHistoryF03.getSection();
						
						int version = metalDetectorCheckListHistoryRepositoryF03.getMaximumVersion(date1, section).map(temp -> temp + 1).orElse(1);
						
						metalDetectorCheckListHistoryF03.setVersion(version);
						
						metalDetectorCheckListHistoryRepositoryF03.save(metalDetectorCheckListHistoryF03);
						
						try {

							bleachmailfunction.sendMailToHODf03(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(
									new ApiResponse(false, "Supervisor Approved but Unable to send mail to HOD! "),
									HttpStatus.OK);
						}
					} else {
						return new ResponseEntity(new ApiResponse(false, role +" cannot submit details"),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, "Supervisior can submit only saved records or rejected records only !!!"),
							HttpStatus.BAD_REQUEST);
				}
				if (checkObj == null) {

					return new ResponseEntity(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);

				}
			} else {
				if (role.equals("ROLE_SUPERVISOR")) {

//					BeanUtils.copyProperties(bleachContRawCotton, bleachObj);

					checkObj = checkList;

					checkObj.setSupervisor_submit_by(userName);
					checkObj.setSupervisor_submit_on(date);
					checkObj.setSupervisor_submit_id(userId);
					checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
					checkObj.setSupervisor_sign(userName);

					checkObj.setHod_status(AppConstants.waitingStatus);
					checkObj.setMail_status(AppConstants.waitingStatus);

					metalDetectorCheckListF03Repository.save(checkObj);

					
					
					
						// AUDIT TRAIL
					
					BleachMetalDetectorCheckListHistoryF03 metalDetectorCheckListHistoryF03 = new BleachMetalDetectorCheckListHistoryF03();
					
					BeanUtils.copyProperties(checkObj, metalDetectorCheckListHistoryF03);
					
					String date1 = metalDetectorCheckListHistoryF03.getDate();
					
					String section = metalDetectorCheckListHistoryF03.getSection();
					
					int version = metalDetectorCheckListHistoryRepositoryF03.getMaximumVersion(date1, section).map(temp -> temp + 1).orElse(1);
					
					metalDetectorCheckListHistoryF03.setVersion(version);
					
					metalDetectorCheckListHistoryRepositoryF03.save(metalDetectorCheckListHistoryF03);
					
					try {

						bleachmailfunction.sendMailToHODf03(checkObj);
					} catch (Exception ex) {
						return new ResponseEntity<>(
								new ApiResponse(false, "Supervisor Submitted but Unable to send mail to HOD! " + ex),
								HttpStatus.OK);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, role + " cannot submit details"),
							HttpStatus.BAD_REQUEST);
				}
			}
		} catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"),
				HttpStatus.OK);

	}

	public ResponseEntity<?> getAllMetalDetectorList() {
		SCAUtil sca = new SCAUtil();

		try {

			List<MetalDetectorCheckListF03> list = metalDetectorCheckListF03Repository.findAll();

			if (list == null) {

				list = new ArrayList<MetalDetectorCheckListF03>();
			}

			return new ResponseEntity(list, HttpStatus.OK);

		} catch (Exception e) {

			log.error("***************** Unable to get List Of All  details!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, "Unable to get List Of All details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByMonthMetalDetectorList(int month,int year,String section) {
		SCAUtil sca = new SCAUtil();

		try {

			List<MetalDetectorCheckListF03> list = metalDetectorCheckListF03Repository.findByMonth(month,year,section);

			if (list == null) {

				list = new ArrayList<MetalDetectorCheckListF03>();
			}

			return new ResponseEntity(list, HttpStatus.OK);

		} catch (Exception e) {

			log.error("***************** Unable to get List Of All details!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, "Unable to get List Of All details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByDateMetalDetectorList(String date, String section) {
		SCAUtil sca = new SCAUtil();

		try {

			MetalDetectorCheckListF03 list = metalDetectorCheckListF03Repository.findByDateAndSection(date, section);

			return new ResponseEntity(list, HttpStatus.OK);

		} catch (Exception e) {

			log.error("***************** Unable to get List Of All details!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, "Unable to get List Of All details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}
	
	
	public ResponseEntity<?> getAllSupervisorNotSubmittedF03() {
		SCAUtil sca = new SCAUtil();

		List<MetalDetectorCheckListF03> Details = null;

		try {

			List<MetalDetectorCheckListF03> listOfContRawCotton = metalDetectorCheckListF03Repository
					.findBySupervisorStatusSavedAndNotApproved();

			if (listOfContRawCotton == null) {

				listOfContRawCotton = new ArrayList<MetalDetectorCheckListF03>();
			}

			return new ResponseEntity(listOfContRawCotton, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

		// APPROVE OR REJECT METAL CHECKLIST
	
	public ResponseEntity<?> approveOrRejectMetalDetector(ApproveResponse approvalResponse, HttpServletRequest http) {
		
		SCAUtil sca = new SCAUtil();
		
		MetalDetectorCheckListF03 bleachCheckListF42 = new MetalDetectorCheckListF03();
		
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			bleachCheckListF42 = metalDetectorCheckListF03Repository.findFormById(approvalResponse.getId());
			
			BleachMetalDetectorCheckListHistoryF03 bleachLayDownCheckListF42History = new BleachMetalDetectorCheckListHistoryF03();
			
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
						
						metalDetectorCheckListF03Repository.save(bleachCheckListF42);
						
						bleachLayDownCheckListF42History = metalDetectorCheckListHistoryRepositoryF03.fetchLastSubmittedRecords(bleachCheckListF42.getDate(), bleachCheckListF42.getSection());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_sign(userName);
					
						
						metalDetectorCheckListHistoryRepositoryF03.save(bleachLayDownCheckListF42History);
						
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
						
						metalDetectorCheckListF03Repository.save(bleachCheckListF42);

						
						bleachLayDownCheckListF42History = metalDetectorCheckListHistoryRepositoryF03.fetchLastSubmittedRecords(bleachCheckListF42.getDate(), bleachCheckListF42.getSection());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						
						metalDetectorCheckListHistoryRepositoryF03.save(bleachLayDownCheckListF42History);
						
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
			log.error("Failed to approve/reject Metal Detector Record !!!" + msg);

			return new ResponseEntity(
					new ApiResponse(false, "Failed to approve/reject Metal Detector Record " + msg),
					HttpStatus.BAD_REQUEST);
			
			
		}
		
	
		
	}
	
	
	public ResponseEntity<?> getAllHodNotSubmittedF03() {
		SCAUtil sca = new SCAUtil();

		try {

			List<MetalDetectorCheckListF03> list = metalDetectorCheckListF03Repository
					.findBySupervisorStatusApprovedAndHodStatusNotApproved();

			if (list == null) {

				list = new ArrayList<MetalDetectorCheckListF03>();
			}

			return new ResponseEntity(list, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}
//  **************************************** PRD01/F-16  *************************************************
	
	public ResponseEntity<?> SaveMachineCleaningRecordF16(BleachMachineCleaningRecordF16 details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		BleachMachineCleaningRecordF16 listObj = null;
		try {

			String value = "";

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getDate() == null)
				value = "date";
			if (details.getMonth() == null)
				value = "Month";
			if (details.getYear() == null)
				value = "year";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getRecordId() != null) {

				listObj = bleachMachineCleaningRecordF16Repository.findFormById(details.getRecordId());

				String[] IgnoreProps = { "recordId", "createdBy", "createdAt", "supervisor_status",
						"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
						"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "hod_status", "hod_save_on",
						"hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign",
						"hod_mail_status", "supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {

					if (listObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);

					bleachMachineCleaningRecordF16Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				if (role.equals("ROLE_SUPERVISOR")) {

					listObj = details;

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);
//					listObj.setsupervisor_mail_status(AppConstants.waitingStatus);

					bleachMachineCleaningRecordF16Repository.save(listObj);

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

	public ResponseEntity<?> SubmitMachineCleaningRecordF16(BleachMachineCleaningRecordF16 details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getRecordId();

		BleachMachineCleaningRecordF16 checkObj = new BleachMachineCleaningRecordF16();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getDate() == null)
				value = "date";
			if (details.getMonth() == null)
				value = "Month";
			if (details.getYear() == null)
				value = "year";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = bleachMachineCleaningRecordF16Repository.findFormById(id);

				String[] IgnoreProps = { "recordId", "createdBy", "createdAt", "supervisor_status",
						"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
						"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "hod_status", "hod_save_on",
						"hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign",
						"hod_mail_status", "supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_SUPERVISOR")) {

						checkObj.setSupervisor_submit_by(userName);
						checkObj.setSupervisor_submit_on(date);
						checkObj.setSupervisor_submit_id(userId);
						checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						checkObj.setSupervisor_sign(userName);

						checkObj.setHod_status(AppConstants.waitingStatus);

						bleachMachineCleaningRecordF16Repository.save(checkObj);

						// IMAGE

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setSupervisor_signature_image(signature);

						bleachMachineCleaningRecordF16Repository.save(checkObj);

						BleachMachineCleaningRecordHistoryF16 rejectionReportHistory = new BleachMachineCleaningRecordHistoryF16();

						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						String date1 = rejectionReportHistory.getDate();

						String month = rejectionReportHistory.getMonth();

						String year = rejectionReportHistory.getYear();

						int version = bleachMachineCleaningRecordHistoryF16Repository.getMaximumVersion(date1, month, year)
								.map(temp -> temp + 1).orElse(1);
						;

						rejectionReportHistory.setVersion(version);

						bleachMachineCleaningRecordHistoryF16Repository.save(rejectionReportHistory);

//                    Mail logic
						
						try {

							bleachmailfunction.sendMailToHODf16(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(
									new ApiResponse(false, "Supervisor Approved but Unable to send mail to HOD! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, "Invalid Status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				checkObj.setSupervisor_sign(userName);

				checkObj.setHod_status(AppConstants.waitingStatus);
				
				bleachMachineCleaningRecordF16Repository.save(checkObj);

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setSupervisor_signature_image(signature);

				bleachMachineCleaningRecordF16Repository.save(checkObj);

				BleachMachineCleaningRecordHistoryF16 rejectionReportHistory = new BleachMachineCleaningRecordHistoryF16();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				String date1 = rejectionReportHistory.getDate();

				String month = rejectionReportHistory.getMonth();

				String year = rejectionReportHistory.getYear();

				int version = bleachMachineCleaningRecordHistoryF16Repository.getMaximumVersion(date1, month, year)
						.map(temp -> temp + 1).orElse(1);
				;

				rejectionReportHistory.setVersion(version);

				bleachMachineCleaningRecordHistoryF16Repository.save(rejectionReportHistory);

//				Mail logic

				try {

					bleachmailfunction.sendMailToHODf16(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(
							new ApiResponse(false, "Supervisor Approved but Unable to send mail to HOD! "),
							HttpStatus.OK);
				}
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
	
	public ResponseEntity<?> approveRejectionF16(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		BleachMachineCleaningRecordF16 object = new BleachMachineCleaningRecordF16();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = bleachMachineCleaningRecordF16Repository.findFormById(approvalResponse.getId());

			BleachMachineCleaningRecordHistoryF16 objHistory = new BleachMachineCleaningRecordHistoryF16();

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

						bleachMachineCleaningRecordF16Repository.save(object);

						objHistory = bleachMachineCleaningRecordHistoryF16Repository.fetchLastSubmittedRecord(object.getDate(),
								object.getMonth(), object.getYear());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						bleachMachineCleaningRecordHistoryF16Repository.save(objHistory);

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

						bleachMachineCleaningRecordF16Repository.save(object);

						objHistory = bleachMachineCleaningRecordHistoryF16Repository.fetchLastSubmittedRecord(object.getDate(),
								object.getMonth(), object.getYear());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						bleachMachineCleaningRecordHistoryF16Repository.save(objHistory);

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

	public ResponseEntity<?> getByDateF16(String date) {
		try {

			BleachMachineCleaningRecordF16 list = bleachMachineCleaningRecordF16Repository.findByDate(date);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> findByMonthYearPrintApiF16(String month, String year) {
		try {

			List<BleachMachineCleaningRecordF16> list = bleachMachineCleaningRecordF16Repository.findByMonthYearPrintApi(month,
					year);

			if (list == null || list.isEmpty()) {

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getMachineCleaningRecordSummary(HttpServletRequest http) {

		List<BleachMachineCleaningRecordF16> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_SUPERVISOR")) {

				details = bleachMachineCleaningRecordF16Repository.supervisorSummary();
			}

			else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				details = bleachMachineCleaningRecordF16Repository.hodSummary();
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

	///--Contamination Report AB----//
//	BMR LOV
	
	public ResponseEntity<?> bmrLovF18() {
		List<LovResponse> responseList = new ArrayList<>();

		List<String> response = new ArrayList<>();

		try {

			response = bleachContAbsBleachedCottonF18Repository.bmrLov();
           if(!response.isEmpty()) {
				Long id = (long) 1;
				for(String obj : response) {
					LovResponse res = new LovResponse();
					res.setId(id);
					res.setValue(obj);
					res.setDescription(obj);
					responseList.add(res);
					id++;
				}
            }

		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Details : " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
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
	
}
