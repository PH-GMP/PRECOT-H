package com.focusr.Precot.mssql.database.service.engineering;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.focusr.Precot.Buds.repository.bmr.BudsBmrProductionDetailsRepository;
import com.focusr.Precot.mssql.database.model.UserImageDetails;
import com.focusr.Precot.mssql.database.model.PPC.PreProductionMeetingF004;
import com.focusr.Precot.mssql.database.model.Store.NonReturnableGatePassF006;
import com.focusr.Precot.mssql.database.model.Store.NonReturnableGoodsDetail;
import com.focusr.Precot.mssql.database.model.Store.ReceptionCheckListF003;
import com.focusr.Precot.mssql.database.model.Store.audit.ReceptionCheckListHistoryF003;
import com.focusr.Precot.mssql.database.model.engineering.BreakdownIntimationSlipF003;
import com.focusr.Precot.mssql.database.model.engineering.RootCauseAnalysisCorrectiveAction;
import com.focusr.Precot.mssql.database.model.engineering.RootCauseAnalysisF004;
import com.focusr.Precot.mssql.database.model.engineering.RootCauseAnalysisPreventiveAction;
import com.focusr.Precot.mssql.database.model.engineering.WeightScalesCalibrationDetail;
import com.focusr.Precot.mssql.database.model.engineering.WeightScalesCalibrationF016;
import com.focusr.Precot.mssql.database.model.engineering.WorkOrderRequestFormF020;
import com.focusr.Precot.mssql.database.model.engineering.audit.RootCauseAnalysisCorrectiveActionHistory;
import com.focusr.Precot.mssql.database.model.engineering.audit.RootCauseAnalysisHistoryF004;
import com.focusr.Precot.mssql.database.model.engineering.audit.RootCauseAnalysisPreventiveActionHistory;
import com.focusr.Precot.mssql.database.model.engineering.audit.WeightScalesCalibrationDetailHistory;
import com.focusr.Precot.mssql.database.model.engineering.audit.WeightScalesCalibrationHistoryF016;
import com.focusr.Precot.mssql.database.model.productDevelopment.ProductDevelopmentSheetF001;
import com.focusr.Precot.mssql.database.model.productDevelopment.audit.ProductDevelopmentSheetHistoryF001;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.Store.ReceptionCheckListRepositoryF003;
import com.focusr.Precot.mssql.database.repository.bleaching.BmrSummaryProductionDetailsRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR001GoodsProductionDetailsRepository;
import com.focusr.Precot.mssql.database.repository.engineering.BreakdownIntimationSlipRepoF003;
import com.focusr.Precot.mssql.database.repository.engineering.RootCauseAnalysisCorrectiveRepoF004;
import com.focusr.Precot.mssql.database.repository.engineering.RootCauseAnalysisPreventiveRepoF004;
import com.focusr.Precot.mssql.database.repository.engineering.RootCauseAnalysisRepoF004;
import com.focusr.Precot.mssql.database.repository.engineering.WeightScalesCalibrationRepoF016;
import com.focusr.Precot.mssql.database.repository.engineering.WorkOrderRequestFormRepoF020;
import com.focusr.Precot.mssql.database.repository.engineering.audit.RootCauseAnalysisCorrectiveActionHistoryRepo;
import com.focusr.Precot.mssql.database.repository.engineering.audit.RootCauseAnalysisHistoryRepoF004;
import com.focusr.Precot.mssql.database.repository.engineering.audit.RootCauseAnalysisPreventiveActionHistoryRepo;
import com.focusr.Precot.mssql.database.repository.engineering.audit.WeightScalesCalibrationDetailHistoryRepo;
import com.focusr.Precot.mssql.database.repository.engineering.audit.WeightScalesCalibrationHistoryRepoF016;
import com.focusr.Precot.mssql.database.repository.padpunching.bmr.PunchingBmrProductionDetailsRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR01RP01ProductionDetailsRepository;
import com.focusr.Precot.mssql.database.service.Store.StoreMailFunction;
import com.focusr.Precot.mssql.database.service.Store.StoreService9;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.Engineering.AppConstantEngineering;
import com.focusr.Precot.util.Engineering.EngineeringMailfunction;
import com.focusr.Precot.util.Store.AppConstantStore;
import com.focusr.Precot.util.productDevelopment.AppConstantsproductdevelopment;

@Service
public class EngineeringService9 {
	
	
	
	
	Logger log = LoggerFactory.getLogger(EngineeringService9.class);

	SCAUtil sca = new SCAUtil();
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SCAUtil scaUtil;
	
	@Autowired
	private JwtTokenProvider tokenProvider;
	
	@Autowired 
	private WeightScalesCalibrationRepoF016 weightCalibrationRepo;
	
	@Autowired 
	private WeightScalesCalibrationHistoryRepoF016 weightScalesHistoryRepo;
	
	@Autowired 
	private RootCauseAnalysisRepoF004 rootCauseRepo;
	
	@Autowired 
	private RootCauseAnalysisCorrectiveRepoF004 rootCauseCorrectiveRepo;
	
	@Autowired 
	private RootCauseAnalysisPreventiveRepoF004 rootCausePreventiveRepo;
	
	@Autowired 
	private RootCauseAnalysisHistoryRepoF004 rootCauseHistory;
	
	@Autowired 
	private RootCauseAnalysisCorrectiveActionHistoryRepo CorrectiveActionHistoryRepo;
	
	@Autowired 
	private RootCauseAnalysisPreventiveActionHistoryRepo PreventiveActionHistoryRepo;
	
	@Autowired 
	private WorkOrderRequestFormRepoF020 workOrderRepo;
	
	@Autowired 
	private BreakdownIntimationSlipRepoF003 breakdownSlipRepo;
	
	 @Autowired
     private EngineeringMailfunction mailFunction;
	 
	 @Autowired 
	 private BmrSummaryProductionDetailsRepository bmrSummaryProductionRepository;
	 
	 @Autowired 
	 private WeightScalesCalibrationDetailHistoryRepo weightScalesDetailHistoryRepo;
	 
	 
	 @Autowired 
	 private BMR01RP01ProductionDetailsRepository bMR01RP01ProductionRepository;
	 
	 @Autowired 
	 private PunchingBmrProductionDetailsRepository punchingBmrProductionRepository;
	 
	 @Autowired 
	 private BMR001GoodsProductionDetailsRepository bmrGoodsProductionRepository;
	 
	 @Autowired
	 private BudsBmrProductionDetailsRepository budsbmrproductiondetailsrepository;
	
	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}
	
	
	public ResponseEntity<String> generateRcaNo() {
	    try {
	        // Fetch the last gate pass number
	        String RCAno = rootCauseRepo.findLastrcaNo();
	 
	        // If no gate pass is found, return the default value
	        if (RCAno == null) {
	            return ResponseEntity.ok("24-25/RCA/000000");
	        }
	 
	        // If gate pass exists, return the last found gate pass number
	        return ResponseEntity.ok(RCAno);
	 
	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        log.error("**** Unable to retrieve RAC No **** " + ex);
	        return new ResponseEntity<>("Error: " + msg, HttpStatus.BAD_REQUEST);
	    }
	}
	
	public ResponseEntity<String> generatebsiNo() {
	    try {
	        // Fetch the last gate pass number
	        String bsino = breakdownSlipRepo.findLastBsiNo();
	 
	        // If no gate pass is found, return the default value
	        if (bsino == null) {
	            return ResponseEntity.ok("24-25/BIS/000000");
	        }
	 
	        // If gate pass exists, return the last found gate pass number
	        return ResponseEntity.ok(bsino);
	 
	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        log.error("**** Unable to retrieve BSI No **** " + ex);
	        return new ResponseEntity<>("Error: " + msg, HttpStatus.BAD_REQUEST);
	    }
	}

	public ResponseEntity<String> generateWorNo() {
	    try {
	        // Fetch the last gate pass number
	        String RCAno = workOrderRepo.findLastWorNo();
	 
	        // If no gate pass is found, return the default value
	        if (RCAno == null) {
	            return ResponseEntity.ok("24-25/WOR/000000");
	        }
	 
	        // If gate pass exists, return the last found gate pass number
	        return ResponseEntity.ok(RCAno);
	 
	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        log.error("**** Unable to retrieve RAC No **** " + ex);
	        return new ResponseEntity<>("Error: " + msg, HttpStatus.BAD_REQUEST);
	    }
	}
	
	 public List<WeightScalesCalibrationF016> getMachinesByDepartment(String department) {
	        return weightCalibrationRepo.findByDepartment(department);
	    }

	
	
//public ResponseEntity<?> SaveWeightCalibration(WeightScalesCalibrationF016 weightScalesF016, HttpServletRequest http) {
//		
//		try {
//			String userRole = getUserRole();
//			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//			String userName = userRepository.getUserName(userId);
//			LocalDateTime currentDate = LocalDateTime.now();
//			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//			
//		
//				if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")||userRole.equalsIgnoreCase("STORE_OPERATOR")||userRole.equalsIgnoreCase("DISPATCH_SUPERVISOR"))
//			{
//				
//				Long rawId = weightScalesF016.getId();
//				
//				if(rawId != null)
//				{
//					WeightScalesCalibrationF016 ReceptionCheckList = new WeightScalesCalibrationF016();	
//					ReceptionCheckList = weightCalibrationRepo.fetchWeightScalesById(rawId);
//					weightScalesF016.setCreatedAt(weightScalesF016.getCreatedAt());
//					weightScalesF016.setCreatedBy(weightScalesF016.getCreatedBy());
//					weightCalibrationRepo.save(weightScalesF016);
//				}
//				
//
//				
//				weightScalesF016.setEngineeringSupervisorStatus(AppConstantEngineering.supervisor_Save);
//				weightScalesF016.setEngineeringSupervisorSavedOn(date);;
//				weightScalesF016.setEngineeringSupervisorSavedBy(userName);
//				weightScalesF016.setEngineeringSupervisorSavedId(userId);
//				
//				weightCalibrationRepo.save(weightScalesF016);
//				
//			} else {
//				
//				return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to save form !!! "), HttpStatus.BAD_REQUEST);
//				
//			}
//			
//		} catch(Exception e) {
//			
//			String msg = e.getMessage();
//			log.error("Unable to Save Record" + msg);
//
//			return new ResponseEntity(
//					new ApiResponse(false, "Failed to Save Reception Check List" + msg),
//					HttpStatus.BAD_REQUEST);
//			
//			
//		}
//		return new ResponseEntity(weightScalesF016, HttpStatus.CREATED);
//		
//	}

	 
//	 public ResponseEntity<?> SaveWeightCalibration(WeightScalesCalibrationF016 weightScalesF016, HttpServletRequest http) {
//		    try {
//		        String userRole = getUserRole();
//		        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//		        String userName = userRepository.getUserName(userId);
//		        LocalDateTime currentDate = LocalDateTime.now();
//		        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//		        if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR") || 
//		            userRole.equalsIgnoreCase("STORE_OPERATOR") || 
//		            userRole.equalsIgnoreCase("DISPATCH_SUPERVISOR")) {
//
//		            Long rawId = weightScalesF016.getId();
//
//		            WeightScalesCalibrationF016 existingRecord;
//		            if (rawId != null) {
//		                // Fetch the existing record
//		                existingRecord = weightCalibrationRepo.findById(rawId)
//		                        .orElse(new WeightScalesCalibrationF016());
//		                // Update fields
//		                existingRecord.setFormat(weightScalesF016.getFormat());
//		                existingRecord.setFormat_no(weightScalesF016.getFormat_no());
//		                existingRecord.setRef_sop_no(weightScalesF016.getRef_sop_no());
//		                existingRecord.setRevisionNo(weightScalesF016.getRevisionNo());
//		                existingRecord.setUnit(weightScalesF016.getUnit());
//		                existingRecord.setDepartment(weightScalesF016.getDepartment());
//		                existingRecord.setCapacity(weightScalesF016.getCapacity());
//		                existingRecord.setTolerances(weightScalesF016.getTolerances());
//		                existingRecord.setMachineIdNo(weightScalesF016.getMachineIdNo());
//		                existingRecord.setStdWtCalCertNo(weightScalesF016.getStdWtCalCertNo());
//		                existingRecord.setDate(weightScalesF016.getDate());
//		                existingRecord.setWeightInGKg(weightScalesF016.getWeightInGKg());
//		                existingRecord.setObservedWeightInGKg(weightScalesF016.getObservedWeightInGKg());
//		                existingRecord.setRangeInGKg(weightScalesF016.getRangeInGKg());
//		                existingRecord.setStatus(weightScalesF016.getStatus());
//		                existingRecord.setRemarks(weightScalesF016.getRemarks());
//		                existingRecord.setReason(weightScalesF016.getReason());
//
//		                // Engineering supervisor-specific fields
//		                existingRecord.setEngineeringSupervisorStatus(AppConstantEngineering.supervisor_Save);
//		                existingRecord.setEngineeringSupervisorSavedOn(date);
//		                existingRecord.setEngineeringSupervisorSavedBy(userName);
//		                existingRecord.setEngineeringSupervisorSavedId(userId);
//
//
//		                // Save the updated record
//		                weightCalibrationRepo.save(existingRecord);
//		            } else {
//		                // If no ID is provided, save as a new entry
//		                weightScalesF016.setEngineeringSupervisorStatus(AppConstantEngineering.supervisor_Save);
//		                weightScalesF016.setEngineeringSupervisorSavedOn(date);
//		                weightScalesF016.setEngineeringSupervisorSavedBy(userName);
//		                weightScalesF016.setEngineeringSupervisorSavedId(userId);
//
//		                weightCalibrationRepo.save(weightScalesF016);
//		            }
//
//		        } else {
//		            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to save form !!!"),
//		                                        HttpStatus.BAD_REQUEST);
//		        }
//
//		    } catch (Exception e) {
//		        String msg = e.getMessage();
//		        log.error("Unable to Save Record: " + msg);
//		        return new ResponseEntity<>(new ApiResponse(false, "Failed to Save Reception Check List: " + msg),
//		                                    HttpStatus.BAD_REQUEST);
//		    }
//
//		    return new ResponseEntity<>(weightScalesF016, HttpStatus.CREATED);
//		}

	 
	 public ResponseEntity<?> SaveWeightCalibration(WeightScalesCalibrationF016 weightScalesF016, HttpServletRequest http) {
		    try {
		        String userRole = getUserRole();
		        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		        String userName = userRepository.getUserName(userId);
		        LocalDateTime currentDate = LocalDateTime.now();
		        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		        if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR") ||
		            userRole.equalsIgnoreCase("STORE_OPERATOR") ||
		            userRole.equalsIgnoreCase("DISPATCH_SUPERVISOR")) {

		            Long rawId = weightScalesF016.getId();

		            WeightScalesCalibrationF016 existingRecord;
		            if (rawId != null) {
		                // Fetch the existing parent record
		                existingRecord = weightCalibrationRepo.findById(rawId)
		                        .orElse(new WeightScalesCalibrationF016());

		                // Update parent fields
		                existingRecord.setFormat(weightScalesF016.getFormat());
		                existingRecord.setFormat_no(weightScalesF016.getFormat_no());
		                existingRecord.setRef_sop_no(weightScalesF016.getRef_sop_no());
		                existingRecord.setRevisionNo(weightScalesF016.getRevisionNo());
		                existingRecord.setUnit(weightScalesF016.getUnit());
		                existingRecord.setDepartment(weightScalesF016.getDepartment());
		                existingRecord.setCapacity(weightScalesF016.getCapacity());
		                existingRecord.setTolerances(weightScalesF016.getTolerances());
		                existingRecord.setMachineIdNo(weightScalesF016.getMachineIdNo());
		                existingRecord.setStdWtCalCertNo(weightScalesF016.getStdWtCalCertNo());
		                existingRecord.setReason(weightScalesF016.getReason());

		                // Update child records (details)
		                if (weightScalesF016.getDetails() != null && !weightScalesF016.getDetails().isEmpty()) {
		                    // Clear existing child records if present
		                    if (existingRecord.getDetails() != null) {
		                        existingRecord.getDetails().clear();
		                    }
		                    for (WeightScalesCalibrationDetail detail : weightScalesF016.getDetails()) {
		                        detail.setParentRecord(existingRecord); // Link the parent
		                        existingRecord.getDetails().add(detail);
		                    }
		                }

		                // Supervisor-specific fields
		                existingRecord.setEngineeringSupervisorStatus(AppConstantEngineering.supervisor_Save);
		                existingRecord.setEngineeringSupervisorSavedOn(date);
		                existingRecord.setEngineeringSupervisorSavedBy(userName);
		                existingRecord.setEngineeringSupervisorSavedId(userId);

		                // Save the updated record
		                weightCalibrationRepo.save(existingRecord);

		            } else {
		                // If no ID is provided, save as a new entry
		                weightScalesF016.setEngineeringSupervisorStatus(AppConstantEngineering.supervisor_Save);
		                weightScalesF016.setEngineeringSupervisorSavedOn(date);
		                weightScalesF016.setEngineeringSupervisorSavedBy(userName);
		                weightScalesF016.setEngineeringSupervisorSavedId(userId);

		                // Link child records to the new parent
		                if (weightScalesF016.getDetails() != null && !weightScalesF016.getDetails().isEmpty()) {
		                    for (WeightScalesCalibrationDetail detail : weightScalesF016.getDetails()) {
		                        detail.setParentRecord(weightScalesF016);
		                    }
		                }

		                weightCalibrationRepo.save(weightScalesF016);
		            }

		        } else {
		            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to save form !!!"),
		                                        HttpStatus.BAD_REQUEST);
		        }

		    } catch (Exception e) {
		        String msg = e.getMessage();
		        log.error("Unable to Save Record: " + msg);
		        return new ResponseEntity<>(new ApiResponse(false, "Failed to Save Calibration Record: " + msg),
		                                    HttpStatus.BAD_REQUEST);
		    }

		    return new ResponseEntity<>(weightScalesF016, HttpStatus.CREATED);
		}



//public ResponseEntity<?> SubmitWeightCalibration(
//		@RequestBody WeightScalesCalibrationF016 weightScalesF016, HttpServletRequest http) {
//	if (weightScalesF016 == null) {
//		return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
//				HttpStatus.BAD_REQUEST);
//	}
//
//	SCAUtil scaUtil = new SCAUtil();
//	Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
//	String userName = userRepository.getUserName(userId);
//	String role = sca.getUserRoleFromRequest(http, tokenProvider);
//
//	Long id = weightScalesF016.getId();
//	WeightScalesCalibrationF016 bleachObj = new WeightScalesCalibrationF016();
//	// Get the current time
//	LocalDateTime now = LocalDateTime.now();
//	Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
//	
//
//
//	try {
//		String missingField = "";
//		if (weightScalesF016.getFormat_no() == null)
//			missingField = "formatNo";
//		if (weightScalesF016.getRef_sop_no() == null)
//			missingField = "sopNumber";
//		if (weightScalesF016.getRevisionNo() == null)
//			missingField = "revisionNo";
//
//		if (!missingField.isEmpty()) {
//			return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
//					HttpStatus.BAD_REQUEST);
//		}
//
//		if (id != null) {
//			bleachObj = weightCalibrationRepo.fetchWeightScalesById(id);
//			if (bleachObj == null) {
//				return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
//			}
//		}
//		weightScalesF016.setCreatedAt(bleachObj.getCreatedAt());
//		weightScalesF016.setCreatedBy(bleachObj.getCreatedBy());
//
////			String currentStatus = bleachObj.getEngineeringSupervisorStatus();
////			String currentMailStatus = bleachObj.getMailStatus();
//
//			if(role.equalsIgnoreCase("ROLE_SUPERVISOR")||role.equalsIgnoreCase("STORE_OPERATOR")||role.equalsIgnoreCase("DISPATCH_SUPERVISOR")) 
//			{
//
//				
//				{
//
//					weightScalesF016.setEngineeringSupervisorStatus(AppConstantEngineering.supervisor_Submit);
//					weightScalesF016.setEngineeringSupervisorSubmitOn(date);;
//					weightScalesF016.setEngineeringSupervisorSign(userName);;
//					weightScalesF016.setEngineeringSupervisorSubmitBy(userName);;
//					weightScalesF016.setEngineeringSupervisorSubmitId(userId);;
//					weightScalesF016.setHodStatus(AppConstantEngineering.waitingStatus);
////					weightScalesF016.setMailStatus(AppConstantEngineering.waitingStatus);;
//					
//					
//					
//					weightCalibrationRepo.save(weightScalesF016);
//					
//
//					
//					// HISTORY
//					
//					WeightScalesCalibrationHistoryF016 calibrationHistory = new WeightScalesCalibrationHistoryF016();
//					
//					calibrationHistory.setUnit(weightScalesF016.getUnit());
//					calibrationHistory.setFormat(weightScalesF016.getFormat());
//					calibrationHistory.setFormat_no(weightScalesF016.getFormat_no());
//					calibrationHistory.setRevisionNo(weightScalesF016.getRevisionNo());
//					calibrationHistory.setRef_sop_no(weightScalesF016.getRef_sop_no());
//					calibrationHistory.setDate(weightScalesF016.getDate());
//					calibrationHistory.setDepartment(weightScalesF016.getDepartment());
//					calibrationHistory.setCapacity(weightScalesF016.getCapacity());
//					calibrationHistory.setTolerances(weightScalesF016.getTolerances());
//					calibrationHistory.setMachineIdNo(weightScalesF016.getMachineIdNo());
//					calibrationHistory.setStdWtCalCertNo(weightScalesF016.getStdWtCalCertNo());
//					calibrationHistory.setWeightInGKg(weightScalesF016.getWeightInGKg());
//					calibrationHistory.setObservedWeightInGKg(weightScalesF016.getObservedWeightInGKg());
//					calibrationHistory.setRangeInGKg(weightScalesF016.getRangeInGKg());
//					calibrationHistory.setStatus(weightScalesF016.getStatus());
//					calibrationHistory.setRemarks(weightScalesF016.getRemarks());
//					calibrationHistory.setReason(weightScalesF016.getReason());
//
//		
//					
//					
//					
//
//						// STATUS
//										
//				
//
//					calibrationHistory.setEngineeringSupervisorStatus(weightScalesF016.getEngineeringSupervisorStatus());
//					calibrationHistory.setEngineeringSupervisorSubmitOn(weightScalesF016.getEngineeringSupervisorSubmitOn());
//					calibrationHistory.setEngineeringSupervisorSubmitBy(weightScalesF016.getEngineeringSupervisorSubmitBy());
//					calibrationHistory.setEngineeringSupervisorSubmitId(weightScalesF016.getEngineeringSupervisorSubmitId());
//					calibrationHistory.setEngineeringSupervisorSign(weightScalesF016.getEngineeringSupervisorSign());
//					calibrationHistory.setHodStatus(weightScalesF016.getHodStatus());					
//					
//					
////					Version
//					String 	dates  = calibrationHistory.getDate();
//					
//					String 	department = calibrationHistory.getDepartment();	
//					
//					int version = weightScalesHistoryRepo.getMaximumVersion(dates,department)
//							.map(temp -> temp + 1).orElse(1);
//
//					calibrationHistory.setVersion(version);
//	                
//	               
//					
//					
//					
//					weightScalesHistoryRepo.save(calibrationHistory);
//
//					try {
//
//						mailFunction.sendEmailToHod(weightScalesF016, http);
//					} catch (Exception ex) {
//						return new ResponseEntity<>(
//								new ApiResponse(false, "SUPERVISOR  Approved but Unable to send mail to HOD! "),
//								HttpStatus.OK);
//					}
//				}
//				
//				
//			} 
//
//			else {
//				return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
//						HttpStatus.FORBIDDEN);
//			}
//
//	} catch (Exception ex) {
//		log.error(" **** Unable to submit Weight Scales Calibration Details **** ", ex);
//		return new ResponseEntity<>(
//				new ApiResponse(false, "Unable to submit Weight Scales Calibration Details Details: " + ex.getMessage()),
//				HttpStatus.BAD_REQUEST);
//	}
//
//	return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"),
//			HttpStatus.OK);
//}

	 
	 public ResponseEntity<?> SubmitWeightCalibration(
		        @RequestBody WeightScalesCalibrationF016 weightScalesF016, HttpServletRequest http) {
		    if (weightScalesF016 == null) {
		        return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
		                HttpStatus.BAD_REQUEST);
		    }

		    SCAUtil scaUtil = new SCAUtil();
		    Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		    String userName = userRepository.getUserName(userId);
		    String role = sca.getUserRoleFromRequest(http, tokenProvider);

		    Long id = weightScalesF016.getId();
		    WeightScalesCalibrationF016 bleachObj = new WeightScalesCalibrationF016();
		    // Get the current time
		    LocalDateTime now = LocalDateTime.now();
		    Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());

		    try {
		        String missingField = "";
		        if (weightScalesF016.getFormat_no() == null)
		            missingField = "formatNo";
		        if (weightScalesF016.getRef_sop_no() == null)
		            missingField = "sopNumber";
		        if (weightScalesF016.getRevisionNo() == null)
		            missingField = "revisionNo";

		        if (!missingField.isEmpty()) {
		            return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
		                    HttpStatus.BAD_REQUEST);
		        }

		        if (id != null) {
		            bleachObj = weightCalibrationRepo.fetchWeightScalesById(id);
		            if (bleachObj == null) {
		                return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
		            }
		        }
		        weightScalesF016.setCreatedAt(bleachObj.getCreatedAt());
		        weightScalesF016.setCreatedBy(bleachObj.getCreatedBy());

		        if (role.equalsIgnoreCase("ROLE_SUPERVISOR") || role.equalsIgnoreCase("STORE_OPERATOR") || role.equalsIgnoreCase("DISPATCH_SUPERVISOR")) {

		            weightScalesF016.setEngineeringSupervisorStatus(AppConstantEngineering.supervisor_Submit);
		            weightScalesF016.setEngineeringSupervisorSubmitOn(date);
		            weightScalesF016.setEngineeringSupervisorSign(userName);
		            weightScalesF016.setEngineeringSupervisorSubmitBy(userName);
		            weightScalesF016.setEngineeringSupervisorSubmitId(userId);
		            weightScalesF016.setHodStatus(AppConstantEngineering.waitingStatus);

		            weightCalibrationRepo.save(weightScalesF016);

		            // HISTORY for parent record
		            WeightScalesCalibrationHistoryF016 calibrationHistory = new WeightScalesCalibrationHistoryF016();
		            calibrationHistory.setUnit(weightScalesF016.getUnit());
		            calibrationHistory.setFormat(weightScalesF016.getFormat());
		            calibrationHistory.setFormat_no(weightScalesF016.getFormat_no());
		            calibrationHistory.setRevisionNo(weightScalesF016.getRevisionNo());
		            calibrationHistory.setRef_sop_no(weightScalesF016.getRef_sop_no());
		            calibrationHistory.setDate(weightScalesF016.getDate());
		            calibrationHistory.setDepartment(weightScalesF016.getDepartment());
		            calibrationHistory.setCapacity(weightScalesF016.getCapacity());
		            calibrationHistory.setTolerances(weightScalesF016.getTolerances());
		            calibrationHistory.setMachineIdNo(weightScalesF016.getMachineIdNo());
		            calibrationHistory.setStdWtCalCertNo(weightScalesF016.getStdWtCalCertNo());
		            calibrationHistory.setReason(weightScalesF016.getReason());
		            calibrationHistory.setMeasurementunit(weightScalesF016.getMeasurementunit());
		            // Copy engineering details and status
		            calibrationHistory.setEngineeringSupervisorStatus(weightScalesF016.getEngineeringSupervisorStatus());
		            calibrationHistory.setEngineeringSupervisorSubmitOn(weightScalesF016.getEngineeringSupervisorSubmitOn());
		            calibrationHistory.setEngineeringSupervisorSubmitBy(weightScalesF016.getEngineeringSupervisorSubmitBy());
		            calibrationHistory.setEngineeringSupervisorSubmitId(weightScalesF016.getEngineeringSupervisorSubmitId());
		            calibrationHistory.setEngineeringSupervisorSign(weightScalesF016.getEngineeringSupervisorSign());
		            calibrationHistory.setHodStatus(weightScalesF016.getHodStatus());

		            // Version control for history
		            String dates = calibrationHistory.getDate();
		            String department = calibrationHistory.getDepartment();
		            String machine_id = calibrationHistory.getMachineIdNo();

		            int version = weightScalesHistoryRepo.getMaximumVersion(dates, department,machine_id)
		                    .map(temp -> temp + 1).orElse(1);

		            calibrationHistory.setVersion(version);
		            weightScalesHistoryRepo.save(calibrationHistory);

		            // HISTORY for child records
		            for (WeightScalesCalibrationDetail detail : weightScalesF016.getDetails()) {
		                WeightScalesCalibrationDetailHistory detailHistory = new WeightScalesCalibrationDetailHistory();
		                detailHistory.setWeightInGKg(detail.getWeightInGKg());
		                detailHistory.setObservedWeightInGKg(detail.getObservedWeightInGKg());
		                detailHistory.setRangeInGKg(detail.getRangeInGKg());
		                detailHistory.setStatus(detail.getStatus());
		                detailHistory.setRemarks(detail.getRemarks());

		                // Set the parent reference
		                detailHistory.setParentRecord(calibrationHistory); // Link to parent history record

		                // Save the child history record
		                weightScalesDetailHistoryRepo.save(detailHistory);
		            }

		            // Send email to HOD after saving the history
		            try {
		                mailFunction.sendEmailToHod(weightScalesF016, http);
		            } catch (Exception ex) {
		                return new ResponseEntity<>(new ApiResponse(false, "SUPERVISOR  Approved but Unable to send mail to HOD! "),
		                        HttpStatus.OK);
		            }

		        } else {
		            return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
		                    HttpStatus.FORBIDDEN);
		        }

		    } catch (Exception ex) {
		        log.error(" **** Unable to submit Weight Scales Calibration Details **** ", ex);
		        return new ResponseEntity<>(new ApiResponse(false, "Unable to submit Weight Scales Calibration Details Details: " + ex.getMessage()),
		                HttpStatus.BAD_REQUEST);
		    }

		    return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
		}



public ResponseEntity<?> approveRejectWeightCalibration(ApproveResponse approveResponse, HttpServletRequest http) {
	
	SCAUtil sca = new SCAUtil();
	
	WeightScalesCalibrationF016 WeightScale = new WeightScalesCalibrationF016();
	
	String userRole = getUserRole();
	Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	String userName = userRepository.getUserName(userId);
	LocalDateTime currentDate = LocalDateTime.now();
	Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
	
	try {
		
		WeightScale = weightCalibrationRepo.fetchWeightScalesById(approveResponse.getId());
		
		
		WeightScalesCalibrationHistoryF016 WeightScalesHistory = new WeightScalesCalibrationHistoryF016();
		
		String supervisiorStatus = WeightScale.getEngineeringSupervisorStatus();
		
		String hodStatus = WeightScale.getHodStatus();
		
		UserImageDetails imageDetails = new UserImageDetails();
		
		if(supervisiorStatus.equalsIgnoreCase(AppConstantEngineering.supervisor_Submit) && hodStatus.equalsIgnoreCase(AppConstantEngineering.waitingStatus)) {
			
			if(userRole.equalsIgnoreCase("ROLE_HOD")||userRole.equalsIgnoreCase("ROLE_DESIGNEE") ) {
				
				if(approveResponse.getStatus().equals("Approve")) {
					
				

					WeightScale.setHodStatus(AppConstantEngineering.hodApprovedStatus);;
					WeightScale.setHodSubmitOn(date);;
					WeightScale.setHodSubmitBy(userName);;
					WeightScale.setHodSubmitId(userId);
					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					ReceptionCheckList.setStore_in_charge_Signature(signature);
					
					WeightScale.setHodSign(userName);;
					
					weightCalibrationRepo.save(WeightScale);
					
					WeightScalesHistory = weightScalesHistoryRepo.fetchLastWeightScalesCalibration(WeightScale.getDate(), WeightScale.getDepartment(), WeightScale.getMachineIdNo());
					
					WeightScalesHistory.setHodStatus(AppConstantEngineering.hodApprovedStatus);
					WeightScalesHistory.setHodSubmitOn(date);
					WeightScalesHistory.setHodSubmitBy(userName);
					WeightScalesHistory.setHodSign(userName);
					WeightScalesHistory.setHodSubmitId(userId);
				
					
					weightScalesHistoryRepo.save(WeightScalesHistory);
					
					return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);
					
				}
				
				else if(approveResponse.getStatus().equals("Reject")) {
					
					String reason = approveResponse.getRemarks();
					WeightScale.setReason(reason);
					WeightScale.setHodStatus(AppConstantEngineering.hodRejectedStatus);
					WeightScale.setHodSubmitOn(date);
					WeightScale.setHodSubmitBy(userName);
					WeightScale.setHodSubmitId(userId);
					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					ReceptionCheckList.setStore_in_charge_Signature(signature);
					
					WeightScale.setHodSign(userName);
					
					weightCalibrationRepo.save(WeightScale);

					
					WeightScalesHistory = weightScalesHistoryRepo.fetchLastWeightScalesCalibration(WeightScale.getDate(), WeightScale.getDepartment(), WeightScale.getMachineIdNo());
					
					WeightScalesHistory.setHodStatus(AppConstantEngineering.hodRejectedStatus);
					WeightScalesHistory.setReason(reason);
					WeightScalesHistory.setHodSubmitOn(date);
					WeightScalesHistory.setHodSubmitBy(userName);
					WeightScalesHistory.setHodSubmitId(userId);
					WeightScalesHistory.setHodSign(userName);
					
					weightScalesHistoryRepo.save(WeightScalesHistory);
					
					return new ResponseEntity<>(new ApiResponse(true, "HOD Rejected Successfully"), HttpStatus.OK);
					
				} 
				
				else {
					return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
				}
				
			} else {
				return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"), HttpStatus.BAD_REQUEST);
			}
			
		}
		
		else {
			return new ResponseEntity(new ApiResponse(false, "SUPERVISOR  Not yet Submitted"), HttpStatus.BAD_REQUEST);
		}
		
	} catch(Exception e) {
		
		String msg = e.getMessage();
		log.error("Unable to Approve Record" + msg);

		return new ResponseEntity(
				new ApiResponse(false, "Failed to approve/reject Weight Scales Calibration Details Record " + msg),
				HttpStatus.BAD_REQUEST);
		
		
	}
	

}




public ResponseEntity<?> getweightScale(String date, String machineIdNo, String department) {
    List<WeightScalesCalibrationF016> WeightScales = new ArrayList<>();
    try {
    	WeightScales = weightCalibrationRepo.findBydateNoAndmachineId(date, machineIdNo,department);
    } catch (Exception ex) {
        String msg = ex.getMessage();
        ex.printStackTrace();
        log.error("Unable to get Weight Scales Calibration Details: " + msg);
        return new ResponseEntity<>(new ApiResponse(false, "Unable to get Weight Scales Calibration Details: " + msg), HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(WeightScales, HttpStatus.OK);
}





//public ResponseEntity<?> getweightScaleSummary() {
//	
//	String userRole = getUserRole();
//	
//	List<WeightScalesCalibrationF016> WeightScales = new ArrayList<>();
//	
//	try {
//		
//		if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")||userRole.equalsIgnoreCase("STORE_OPERATOR")||userRole.equalsIgnoreCase("DISPATCH_SUPERVISOR"))
//		{
//			
//			
//			WeightScales = weightCalibrationRepo.WeightScalesSummaryforAssistant();
//			
//		} else if(userRole.equals("ROLE_HOD")) {
//			
//			WeightScales = weightCalibrationRepo.WeightScalesSummaryforHod();
//			
//		} else {
//			return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to access WeightScales form"), HttpStatus.BAD_REQUEST);
//		}
//		
//		return new ResponseEntity(WeightScales, HttpStatus.OK);
//	} catch(Exception ex) {
//		String msg = ex.getMessage();
//		ex.printStackTrace();
//		log.error("Unable to get Weight Scales Calibration  summary record" + msg);
//		return new ResponseEntity(
//				new ApiResponse(false, "Failed to get Weight Scales Calibration summary record" + msg),
//				HttpStatus.BAD_REQUEST);
//	}
//	
//	
//	
//}

//public ResponseEntity<?> getWeightScaleSummary(String username) {
//    String userRole = getUserRole();
//    String userDepartment = userRepository.getDepartmentByUserName(username); // Get the user's department by username
//    List<WeightScalesCalibrationF016> weightScales = new ArrayList<>();
//
//    try {
//        // Retrieve records based on user role
//        if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR") || 
//            userRole.equalsIgnoreCase("STORE_OPERATOR") || 
//            userRole.equalsIgnoreCase("DISPATCH_SUPERVISOR")) {
//            
//            weightScales = weightCalibrationRepo.WeightScalesSummaryforAssistant();
//        } else if (userRole.equals("ROLE_HOD")|| userRole.equalsIgnoreCase("ROLE_DESIGNEE") ) {
//            weightScales = weightCalibrationRepo.WeightScalesSummaryforHod();
//        } else {
//            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to access Weight Scales form"), HttpStatus.BAD_REQUEST);
//        }
//
//        // Filter weight scales by department of the user who created each entry
//        List<WeightScalesCalibrationF016> filteredWeightScales = weightScales.stream()
//            .filter(ws -> ws.getCreatedBy() != null && userRepository.getDepartmentByUserName(ws.getCreatedBy()).equals(userDepartment))
//            .collect(Collectors.toList());
//
//        return new ResponseEntity<>(filteredWeightScales, HttpStatus.OK);
//
//    } catch (Exception ex) {
//        String msg = ex.getMessage();
//        ex.printStackTrace();
//        log.error("Unable to get Weight Scales Calibration summary record: " + msg);
//        return new ResponseEntity<>(
//            new ApiResponse(false, "Failed to get Weight Scales Calibration summary record: " + msg),
//            HttpStatus.BAD_REQUEST);
//    }



public ResponseEntity<?> getWeightScaleSummary(String username) {
    String userRole = getUserRole();
    String userDepartment = userRepository.getDepartmentByUserName(username); // Get the user's department by username
    List<WeightScalesCalibrationF016> weightScales = new ArrayList<>();
 
    try {
        // Retrieve records based on user role
        if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR") ||
            userRole.equalsIgnoreCase("STORE_OPERATOR") ||
            userRole.equalsIgnoreCase("DISPATCH_SUPERVISOR")) {
            
            weightScales = weightCalibrationRepo.WeightScalesSummaryforAssistant();
        } else if (userRole.equals("ROLE_HOD")|| userRole.equalsIgnoreCase("ROLE_DESIGNEE") ) {
            weightScales = weightCalibrationRepo.WeightScalesSummaryforHod();
        } else {
            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to access Weight Scales form"), HttpStatus.BAD_REQUEST);
        }
 
        // Filter weight scales by department of the user who created each entry
        List<WeightScalesCalibrationF016> filteredWeightScales = weightScales.stream()
            .filter(ws -> ws.getCreatedBy() != null && userRepository.getDepartmentByUserName(ws.getCreatedBy()).equals(userDepartment))
            .collect(Collectors.toList());
 
        return new ResponseEntity<>(filteredWeightScales, HttpStatus.OK);
 
    } catch (Exception ex) {
        String msg = ex.getMessage();
        ex.printStackTrace();
        log.error("Unable to get Weight Scales Calibration summary record: " + msg);
        return new ResponseEntity<>(
            new ApiResponse(false, "Failed to get Weight Scales Calibration summary record: " + msg),
            HttpStatus.BAD_REQUEST);
    }
}








	 


//public ResponseEntity<?> getWeightScalePrint(String machineIdNo, String year, String month) {
//    List<WeightScalesCalibrationF016> weightCalibrationList = new ArrayList<>();
//
//    try {
//        if (machineIdNo != null && !machineIdNo.isEmpty() && year != null && !year.isEmpty() && month != null && !month.isEmpty()) {
//
//            // Call repository method with year, month, and machineIdNo
//            weightCalibrationList = weightCalibrationRepo.getWeightCalibrationByMachineIdNoAndYearMonth(year, month, machineIdNo);
//
//            // Return 404 if no records are found
//            if (weightCalibrationList.isEmpty()) {
//                return new ResponseEntity<>(new ApiResponse(false, "No records found for the given Machine ID and Date."), HttpStatus.NOT_FOUND);
//            }
//
//        } else {
//            return new ResponseEntity<>(new ApiResponse(false, "Machine ID, Year or Month is missing."), HttpStatus.BAD_REQUEST);
//        }
//    } catch (Exception ex) {
//        log.error("Unable to get Weight Calibration: " + ex.getMessage());
//        return new ResponseEntity<>(new ApiResponse(false, "Unable to get Weight Calibration: " + ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//
//    return new ResponseEntity<>(weightCalibrationList, HttpStatus.OK);
//}


public ResponseEntity<?> getWeightScalePrint(String machineIdNo, String year, String month) {
    List<WeightScalesCalibrationF016> weightCalibrationList = new ArrayList<>();

    try {
        // Check if at least one parameter set is provided
        if ((year != null && !year.isEmpty() && month != null && !month.isEmpty()) || 
            (machineIdNo != null && !machineIdNo.isEmpty())) {
            
            // If year or month is empty, set to null to exclude from query
            year = (year != null && !year.isEmpty()) ? year : null;
            month = (month != null && !month.isEmpty()) ? month : null;
            machineIdNo = (machineIdNo != null && !machineIdNo.isEmpty()) ? machineIdNo : null;

            // Call repository method with optional parameters
            weightCalibrationList = weightCalibrationRepo.getWeightCalibrationByOptionalParams(year, month, machineIdNo);

            // Return 404 if no records are found
            if (weightCalibrationList.isEmpty()) {
                return new ResponseEntity<>(new ApiResponse(false, "No records found for the given parameters."), HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(new ApiResponse(false, "Machine ID, Year or Month is missing."), HttpStatus.BAD_REQUEST);
        }
    } catch (Exception ex) {
        log.error("Unable to get Weight Calibration: " + ex.getMessage());
        return new ResponseEntity<>(new ApiResponse(false, "Unable to get Weight Calibration: " + ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return new ResponseEntity<>(weightCalibrationList, HttpStatus.OK);
}





public ResponseEntity<?> SaverootAnalysis(RootCauseAnalysisF004 rootCauseAnalysis, HttpServletRequest http) { 
    try {
        // Fetch user information from request
        String userRole = getUserRole();
        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
        String userName = userRepository.getUserName(userId);
        LocalDateTime currentDate = LocalDateTime.now();
        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

        // Check if the user has the proper role
        if (userRole.equals("ROLE_ENGINEER") || userRole.equals("ROLE_MECHANICAL") || userRole.equals("ROLE_ELECTRICAL"))
        {
            
            Long rootId = rootCauseAnalysis.getId();
            RootCauseAnalysisF004 existingAnalysis = null;

            // Check if the RCA already exists
            if (rootId != null) {
                existingAnalysis = rootCauseRepo.fetchRootCauseAnalysisById(rootId);

                if (existingAnalysis != null) {
                    // Update the necessary fields in the existing analysis
                    existingAnalysis.setFormat(rootCauseAnalysis.getFormat());
                    existingAnalysis.setFormat_no(rootCauseAnalysis.getFormat_no());
                    existingAnalysis.setRef_sop_no(rootCauseAnalysis.getRef_sop_no());
                    existingAnalysis.setRevisionNo(rootCauseAnalysis.getRevisionNo());
                    existingAnalysis.setUnit(rootCauseAnalysis.getUnit());
                    existingAnalysis.setRcaNo(rootCauseAnalysis.getRcaNo());
                    existingAnalysis.setBisNo(rootCauseAnalysis.getBisNo());
                    existingAnalysis.setDate(rootCauseAnalysis.getDate());
                    existingAnalysis.setDepartment(rootCauseAnalysis.getDepartment());
                    existingAnalysis.setProduct(rootCauseAnalysis.getProduct());
                    existingAnalysis.setProductionLossMt(rootCauseAnalysis.getProductionLossMt());
                    existingAnalysis.setBatchTimeLost(rootCauseAnalysis.getBatchTimeLost());
                    existingAnalysis.setRcaOwner(rootCauseAnalysis.getRcaOwner());
                    existingAnalysis.setRcaTeamMembers(rootCauseAnalysis.getRcaTeamMembers());
                    existingAnalysis.setProblemDescription(rootCauseAnalysis.getProblemDescription());
                    existingAnalysis.setWhy1(rootCauseAnalysis.getWhy1());
                    existingAnalysis.setWhy2(rootCauseAnalysis.getWhy2());
                    existingAnalysis.setWhy3(rootCauseAnalysis.getWhy3());
                    existingAnalysis.setWhy4(rootCauseAnalysis.getWhy4());
                    existingAnalysis.setWhy5(rootCauseAnalysis.getWhy5());
                    existingAnalysis.setRootCause(rootCauseAnalysis.getRootCause());

                } else {
                    return new ResponseEntity<>(new ApiResponse(false, "Root Cause Analysis not found!"), HttpStatus.NOT_FOUND);
                }
            } else {
                // New Root Cause Analysis case
                existingAnalysis = rootCauseAnalysis;
                existingAnalysis.setSupervisorStatus(AppConstantEngineering.supervisor_Save);
                existingAnalysis.setSupervisorSavedOn(date);
                existingAnalysis.setSupervisorSavedBy(userName);
                existingAnalysis.setSupervisorSavedId(userId);
            }

            // Save the root cause analysis FIRST to ensure it has a valid ID
            existingAnalysis = rootCauseRepo.save(existingAnalysis);  // This ensures RCA_ID is set

            // Handle corrective actions
            List<RootCauseAnalysisCorrectiveAction> correctiveActions = rootCauseAnalysis.getCorrectiveActions();
            if (correctiveActions != null && !correctiveActions.isEmpty()) {
                for (RootCauseAnalysisCorrectiveAction action : correctiveActions) {
                    action.setRootCauseAnalysis(existingAnalysis);  // Attach RCA to corrective actions
                    rootCauseCorrectiveRepo.save(action);
                }
            }

            // Handle preventive actions
            List<RootCauseAnalysisPreventiveAction> preventiveActions = rootCauseAnalysis.getPreventiveActions();
            if (preventiveActions != null && !preventiveActions.isEmpty()) {
                for (RootCauseAnalysisPreventiveAction action : preventiveActions) {
                    action.setRootCauseAnalysis(existingAnalysis);  // Attach RCA to preventive actions
                    rootCausePreventiveRepo.save(action);
                }
            }

        } else {
            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to save form!"), HttpStatus.BAD_REQUEST);
        }

    } catch (Exception e) {
        String msg = e.getMessage();
        log.error("Unable to Save Record: " + msg);
        return new ResponseEntity<>(new ApiResponse(false, "Failed to Save Root Cause Analysis: " + msg), HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(rootCauseAnalysis, HttpStatus.CREATED);
}



public ResponseEntity<?> SubmitRootCauseAnalysis(
	    @RequestBody RootCauseAnalysisF004 rootCauseAnalysisF004, HttpServletRequest http) {

	    if (rootCauseAnalysisF004 == null) {
	        return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
	                HttpStatus.BAD_REQUEST);
	    }

	    SCAUtil scaUtil = new SCAUtil();
	    Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
	    String userName = userRepository.getUserName(userId);
	    String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

	    Long id = rootCauseAnalysisF004.getId();
	    RootCauseAnalysisF004 rootCauseObj = new RootCauseAnalysisF004();
	    LocalDateTime now = LocalDateTime.now();
	    Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());

	    try {
	        String missingField = "";
	        if (rootCauseAnalysisF004.getFormat_no() == null) 
	            missingField = "formatNo";
	        if (rootCauseAnalysisF004.getRef_sop_no() == null) 
	            missingField = "sopNumber";
	        if (rootCauseAnalysisF004.getRevisionNo() == null) 
	            missingField = "revisionNo";

	        if (!missingField.isEmpty()) {
	            return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
	                    HttpStatus.BAD_REQUEST);
	        }

	        if (id != null) {
	            rootCauseObj = rootCauseRepo.findById(id).orElse(null);
	            if (rootCauseObj == null) {
	                return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
	            }
	        }
	        rootCauseAnalysisF004.setCreatedAt(rootCauseObj.getCreatedAt());
	        rootCauseAnalysisF004.setCreatedBy(rootCauseObj.getCreatedBy());

	        String currentStatus = rootCauseObj.getSupervisorStatus();

	        	if (role.equals("ROLE_ENGINEER") || role.equals("ROLE_MECHANICAL") || role.equals("ROLE_ELECTRICAL"))
	        
	        {

	            rootCauseAnalysisF004.setSupervisorStatus(AppConstantEngineering.supervisor_Submit);
	            rootCauseAnalysisF004.setSupervisorSubmitOn(date);
	            rootCauseAnalysisF004.setSupervisorSubmitBy(userName);
	            rootCauseAnalysisF004.setSupervisorSubmitId(userId);
	            rootCauseAnalysisF004.setSupervisorSign(userName);
	           

	            rootCauseAnalysisF004.setHodStatus(AppConstantEngineering.waitingStatus);      
	            

                

	            rootCauseRepo.save(rootCauseAnalysisF004);

	            // HISTORY: Root Cause Analysis History
	            RootCauseAnalysisHistoryF004 rootCauseAnalaysisHistory = new RootCauseAnalysisHistoryF004();
	            copyRootCauseAnalysisToHistory(rootCauseAnalaysisHistory, rootCauseAnalysisF004);
	            
//	            Version
				String 	dates  = rootCauseAnalaysisHistory.getDate();
				
				String 	RCA = rootCauseAnalaysisHistory.getRcaNo();	
				
				int version = rootCauseHistory.getMaximumVersion(dates,RCA)
						.map(temp -> temp + 1).orElse(1);

				rootCauseAnalaysisHistory.setVersion(version);
	            rootCauseHistory.save(rootCauseAnalaysisHistory);

	            // HISTORY: Corrective Action History
	            List<RootCauseAnalysisCorrectiveActionHistory> correctiveActionHistoryList = new ArrayList<>();
	            copyCorrectiveActionToHistory(correctiveActionHistoryList, rootCauseAnalysisF004.getCorrectiveActions());
	            CorrectiveActionHistoryRepo.saveAll(correctiveActionHistoryList);
	            
	         // HISTORY: Preventive Action History
	            List<RootCauseAnalysisPreventiveActionHistory> preventiveActionHistoryList = new ArrayList<>();
	            copyPreventiveActionToHistory(preventiveActionHistoryList, rootCauseAnalysisF004.getPreventiveActions());
	            PreventiveActionHistoryRepo.saveAll(preventiveActionHistoryList);

	            try {

					mailFunction.sendEmailToHod(rootCauseAnalysisF004, http);
				} catch (Exception ex) {
					return new ResponseEntity<>(
							new ApiResponse(false, " Approved but Unable to send mail to HOD! "),
							HttpStatus.OK);
				}
			

	        } else {
	            return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"), HttpStatus.FORBIDDEN);
	        }

	    } catch (Exception ex) {
	        log.error(" **** Unable to submit Save Root Cause Analysis Details **** ", ex);
	        return new ResponseEntity<>(new ApiResponse(false, "Unable to submit Save Root Cause Analysis Details: " + ex.getMessage()),
	                HttpStatus.BAD_REQUEST);
	    }

	    return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
	}

	// Utility methods to copy details into history tables
private void copyRootCauseAnalysisToHistory(RootCauseAnalysisHistoryF004 history, RootCauseAnalysisF004 analysis) {
    history.setUnit(analysis.getUnit());
    history.setFormat(analysis.getFormat());
    history.setFormat_no(analysis.getFormat_no());
    history.setRef_sop_no(analysis.getRef_sop_no());
    history.setRevisionNo(analysis.getRevisionNo());
    history.setRcaNo(analysis.getRcaNo());
    history.setBisNo(analysis.getBisNo());
    history.setDate(analysis.getDate());
    history.setDepartment(analysis.getDepartment());
    history.setProduct(analysis.getProduct());
    history.setProductionLossMt(analysis.getProductionLossMt());
    history.setBatchTimeLost(analysis.getBatchTimeLost());
    history.setRcaOwner(analysis.getRcaOwner());
    history.setRcaTeamMembers(analysis.getRcaTeamMembers());
    history.setProblemDescription(analysis.getProblemDescription());
    history.setWhy1(analysis.getWhy1());
    history.setWhy2(analysis.getWhy2());
    history.setWhy3(analysis.getWhy3());
    history.setWhy4(analysis.getWhy4());
    history.setWhy5(analysis.getWhy5());
    history.setRootCause(analysis.getRootCause());
    // Handle Supervisor and HOD fields
    history.setSupervisorStatus(analysis.getSupervisorStatus());
    history.setSupervisorSubmitOn(analysis.getSupervisorSubmitOn());
    history.setSupervisorSubmitBy(analysis.getSupervisorSubmitBy());
    history.setSupervisorSubmitId(analysis.getSupervisorSubmitId());
    history.setSupervisorSign(analysis.getSupervisorSign());
    // Add any additional fields as needed
}

private void copyCorrectiveActionToHistory(List<RootCauseAnalysisCorrectiveActionHistory> historyList, List<RootCauseAnalysisCorrectiveAction> correctiveActions) {
    if (correctiveActions != null) {
        for (RootCauseAnalysisCorrectiveAction action : correctiveActions) {
            RootCauseAnalysisCorrectiveActionHistory history = new RootCauseAnalysisCorrectiveActionHistory();
            history.setCorrectiveaction(action.getCorrectiveaction()); // Assuming getCorrectiveAction() is a String field
            history.setRootCauseAnalysis(action.getRootCauseAnalysis());            history.setCorrectivetargetDate(action.getCorrectivetargetDate()); // Assuming getCorrectiveTargetDate() is a String field
            history.setCorrectiveresponsibility(action.getCorrectiveresponsibility()); // Assuming getCorrectiveResponsibility() is a String field
            history.setCorrectivestatus(action.getCorrectivestatus()); // Assuming getCorrectiveStatus() is a String field
            historyList.add(history); // Add the new history record to the history list
        }
    }
}


private void copyPreventiveActionToHistory(List<RootCauseAnalysisPreventiveActionHistory> historyList, List<RootCauseAnalysisPreventiveAction> preventiveActions) {
    if (preventiveActions != null) {
        for (RootCauseAnalysisPreventiveAction action : preventiveActions) {
            RootCauseAnalysisPreventiveActionHistory history = new RootCauseAnalysisPreventiveActionHistory();
            history.setPreventiveaction(action.getPreventiveaction()); // Assuming getPreventiveAction() returns a String
            history.setRootCauseAnalysis(action.getRootCauseAnalysis()); 
            history.setPreventivetargetDate(action.getPreventivetargetDate()); // Assuming getPreventiveTargetDate() returns a String
            history.setPreventiveresponsibility(action.getPreventiveresponsibility()); // Assuming getPreventiveResponsibility() returns a String
            history.setPreventivestatus(action.getPreventivestatus()); // Assuming getPreventiveStatus() returns a String
            historyList.add(history); // Add the new history record to the history list
        }
    }
}






public ResponseEntity<?> approveRejectrootAnalysis(ApproveResponse approveResponse, HttpServletRequest http) {
	
	SCAUtil sca = new SCAUtil();
	
	RootCauseAnalysisF004 RootCauseAnalysis = new RootCauseAnalysisF004();
	
	String userRole = getUserRole();
	Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	String userName = userRepository.getUserName(userId);
	LocalDateTime currentDate = LocalDateTime.now();
	Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
	
	try {
		
		RootCauseAnalysis = rootCauseRepo.fetchRootCauseAnalysisById(approveResponse.getId());
		
		
		RootCauseAnalysisHistoryF004 rootHistory = new RootCauseAnalysisHistoryF004();
		
		String supervisiorStatus = RootCauseAnalysis.getSupervisorStatus();
		
		String hodStatus = RootCauseAnalysis.getHodStatus();
		
		UserImageDetails imageDetails = new UserImageDetails();
		
		if(supervisiorStatus.equalsIgnoreCase(AppConstantEngineering.supervisor_Submit) && hodStatus.equalsIgnoreCase(AppConstantEngineering.waitingStatus)) {
			
			if(userRole.equalsIgnoreCase("ROLE_HOD")||userRole.equalsIgnoreCase("ROLE_DESIGNEE") ) {
				
				if(approveResponse.getStatus().equals("Approve")) {
					
				

					RootCauseAnalysis.setHodStatus(AppConstantEngineering.hodApprovedStatus);;
					RootCauseAnalysis.setHodSubmitOn(date);;
					RootCauseAnalysis.setHodSubmitBy(userName);;
					RootCauseAnalysis.setHodSubmitId(userId);
					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					ReceptionCheckList.setStore_in_charge_Signature(signature);
					
					RootCauseAnalysis.setHodSign(userName);;
					
					rootCauseRepo.save(RootCauseAnalysis);
					
					rootHistory = rootCauseHistory.fetchLastrootCause(RootCauseAnalysis.getDate(), RootCauseAnalysis.getRcaNo());
					
					rootHistory.setHodStatus(AppConstantEngineering.hodApprovedStatus);
					rootHistory.setHodSubmitOn(date);
					rootHistory.setHodSubmitBy(userName);
					rootHistory.setHodSign(userName);
					rootHistory.setHodSubmitId(userId);
				
					
					rootCauseHistory.save(rootHistory);
					
					return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);
					
				}
				
				else if(approveResponse.getStatus().equals("Reject")) {
					
					String reason = approveResponse.getRemarks();
					RootCauseAnalysis.setReason(reason);
					RootCauseAnalysis.setHodStatus(AppConstantEngineering.hodRejectedStatus);
					RootCauseAnalysis.setHodSubmitOn(date);
					RootCauseAnalysis.setHodSubmitBy(userName);
					RootCauseAnalysis.setHodSubmitId(userId);
					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					ReceptionCheckList.setStore_in_charge_Signature(signature);
					
					RootCauseAnalysis.setHodSign(userName);
					
					rootCauseRepo.save(RootCauseAnalysis);

					
					rootHistory = rootCauseHistory.fetchLastrootCause(RootCauseAnalysis.getDate(), RootCauseAnalysis.getRcaNo());
					
					rootHistory.setHodStatus(AppConstantEngineering.hodRejectedStatus);
					rootHistory.setReason(reason);
					rootHistory.setHodSubmitOn(date);
					rootHistory.setHodSubmitBy(userName);
					rootHistory.setHodSubmitId(userId);
					rootHistory.setHodSign(userName);
					
					rootCauseHistory.save(rootHistory);
					
					return new ResponseEntity<>(new ApiResponse(true, "HOD Rejected Successfully"), HttpStatus.OK);
					
				} 
				
				else {
					return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
				}
				
			} else {
				return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"), HttpStatus.BAD_REQUEST);
			}
			
		}
		
		else {
			return new ResponseEntity(new ApiResponse(false, "STORE_OPERATOR Not yet Submitted"), HttpStatus.BAD_REQUEST);
		}
		
	} catch(Exception e) {
		
		String msg = e.getMessage();
		log.error("Unable to Approve Record" + msg);

		return new ResponseEntity(
				new ApiResponse(false, "Failed to approve/reject ReceptionCheckList Record " + msg),
				HttpStatus.BAD_REQUEST);
		
		
	}
	

}








public ResponseEntity<?> getrootAnalysis(String date, String rcaNo) {
    List<RootCauseAnalysisF004> RootCauseAnalysis = new ArrayList<>();
    try {
    	RootCauseAnalysis = rootCauseRepo.findBydateNoAndrcaNo(date, rcaNo);
    } catch (Exception ex) {
        String msg = ex.getMessage();
        ex.printStackTrace();
        log.error("Unable to get RootCauseAnalysis: " + msg);
        return new ResponseEntity<>(new ApiResponse(false, "Unable to get RootCauseAnalysis: " + msg), HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(RootCauseAnalysis, HttpStatus.OK);
}







//public ResponseEntity<?> getRootCauseSummary() {
//	
//	String userRole = getUserRole();
//	
//	List<RootCauseAnalysisF004> RootAnalysis = new ArrayList<>();
//	
//	try {
//		
//		if (userRole.equals("ROLE_ENGINEER") || userRole.equals("ROLE_MECHANICAL") || userRole.equals("ROLE_ELECTRICAL"))
//		{
//			
//			
//			RootAnalysis = rootCauseRepo.SummaryforAssistant();
//			
//		} else if(userRole.equals("ROLE_HOD")) {
//			
//			RootAnalysis = rootCauseRepo.SummaryforHod();
//			
//		} else {
//			return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to access WeightScales form"), HttpStatus.BAD_REQUEST);
//		}
//		
//		return new ResponseEntity(RootAnalysis, HttpStatus.OK);
//	} catch(Exception ex) {
//		String msg = ex.getMessage();
//		ex.printStackTrace();
//		log.error("Unable to get summary record" + msg);
//		return new ResponseEntity(
//				new ApiResponse(false, "Failed to get summary record" + msg),
//				HttpStatus.BAD_REQUEST);
//	}
//	
//	
//	
//}

//public ResponseEntity<?> getRootCauseSummary(String username) {
//    String userRole = getUserRole();
//    String userDepartment = userRepository.getDepartmentByUserName(username); // Get the user's department
//    List<RootCauseAnalysisF004> rootAnalysis = new ArrayList<>();
//
//    try {
//        // Retrieve records based on user role
//        if (userRole.equals("ROLE_ENGINEER") || 
//            userRole.equals("ROLE_MECHANICAL") || 
//            userRole.equals("ROLE_ELECTRICAL")) {
//            
//            rootAnalysis = rootCauseRepo.SummaryforAssistant();
//        } else if (userRole.equals("ROLE_HOD")) {
//            rootAnalysis = rootCauseRepo.SummaryforHod();
//        } else {
//            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to access Root Cause Analysis form"), HttpStatus.BAD_REQUEST);
//        }
//
//        // Filter root cause analysis entries by department of the user who created each entry
//        List<RootCauseAnalysisF004> filteredRootAnalysis = rootAnalysis.stream()
//            .filter(rc -> rc.getCreatedBy() != null && userRepository.getDepartmentByUserName(rc.getCreatedBy()).equals(userDepartment))
//            .collect(Collectors.toList());
//
//        return new ResponseEntity<>(filteredRootAnalysis, HttpStatus.OK);
//
//    } catch (Exception ex) {
//        String msg = ex.getMessage();
//        ex.printStackTrace();
//        log.error("Unable to get Root Cause Analysis summary record: " + msg);
//        return new ResponseEntity<>(
//            new ApiResponse(false, "Failed to get Root Cause Analysis summary record: " + msg),
//            HttpStatus.BAD_REQUEST);
//    }
//}


public ResponseEntity<?> getRootCauseSummary(String username) {
    String userRole = getUserRole();
    String userDepartment = userRepository.getDepartmentByUserName(username); // Get the user's department
    List<RootCauseAnalysisF004> rootAnalysis = new ArrayList<>();

    try {
        String assignedDepartment = null;

        // Determine the assigned department filter based on the user's role
        if (userRole.equals("ROLE_ENGINEER")) {
            assignedDepartment = "ENGINEERING";
        } else if (userRole.equals("ROLE_MECHANICAL")) {
            assignedDepartment = "MECHANICAL";
        } else if (userRole.equals("ROLE_ELECTRICAL")) {
            assignedDepartment = "ELECTRICAL";
        } else if (userRole.equals("ROLE_HOD")||userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
            rootAnalysis = rootCauseRepo.SummaryforHod();
        } else {
            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to access Root Cause Analysis form"),
                                        HttpStatus.BAD_REQUEST);
        }

        // Fetch root cause analysis records with department filtering if required
        if (!userRole.equals("ROLE_HOD")||userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
            rootAnalysis = rootCauseRepo.SummaryforAssistant(assignedDepartment);
        }

        // Further filter by department of the user who created each entry
        List<RootCauseAnalysisF004> filteredRootAnalysis = rootAnalysis.stream()
            .filter(rc -> rc.getCreatedBy() != null && userRepository.getDepartmentByUserName(rc.getCreatedBy()).equals(userDepartment))
            .collect(Collectors.toList());

        return new ResponseEntity<>(filteredRootAnalysis, HttpStatus.OK);

    } catch (Exception ex) {
        String msg = ex.getMessage();
        log.error("Unable to get Root Cause Analysis summary record: " + msg);
        return new ResponseEntity<>(new ApiResponse(false, "Failed to get Root Cause Analysis summary record: " + msg),
                                    HttpStatus.BAD_REQUEST);
    }
}






public ResponseEntity<?> getRootCausePrint(String rcaNo, String year, String month) {
    List<RootCauseAnalysisF004> rootCauseAnalysisList = new ArrayList<>();

    try {
        // Check if at least one parameter set is provided
        if ((year != null && !year.isEmpty() && month != null && !month.isEmpty()) || 
            (rcaNo != null && !rcaNo.isEmpty())) {
            
            // If year, month, or RCA No is empty, set to null to exclude from query
            year = (year != null && !year.isEmpty()) ? year : null;
            month = (month != null && !month.isEmpty()) ? month : null;
            rcaNo = (rcaNo != null && !rcaNo.isEmpty()) ? rcaNo : null;

            // Call repository method with optional parameters
            rootCauseAnalysisList = rootCauseRepo.getRcaByOptionalParams(year, month, rcaNo);

            // Return 404 if no records are found
            if (rootCauseAnalysisList.isEmpty()) {
                return new ResponseEntity<>(new ApiResponse(false, "No records found for the given parameters."), HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(new ApiResponse(false, "RCA No, Year, or Month is missing."), HttpStatus.BAD_REQUEST);
        }
    } catch (Exception ex) {
        log.error("Unable to get Root Cause Analysis: " + ex.getMessage());
        return new ResponseEntity<>(new ApiResponse(false, "Unable to get Root Cause Analysis: " + ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return new ResponseEntity<>(rootCauseAnalysisList, HttpStatus.OK);
}




//public ResponseEntity<?> SaveWorkorder(WorkOrderRequestFormF020 workOrderRequest, HttpServletRequest http) {
//	
//	try {
//		String userRole = getUserRole();
//		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//		String userName = userRepository.getUserName(userId);
//		LocalDateTime currentDate = LocalDateTime.now();
//		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//		
//	
//			if(userRole.equalsIgnoreCase("ROLE_HOD"))
//		{
//			
//			Long rawId = workOrderRequest.getId();
//			
//			if(rawId != null)
//			{
//				WorkOrderRequestFormF020 ReceptionCheckList = new WorkOrderRequestFormF020();	
//				ReceptionCheckList = workOrderRepo.fetchWorkOrderRequestsById(rawId);
//				workOrderRequest.setCreatedAt(workOrderRequest.getCreatedAt());
//				workOrderRequest.setCreatedBy(workOrderRequest.getCreatedBy());
//			}
//			
//			workOrderRequest.setRequesterStatus(AppConstantEngineering.Requester_save);	
//			workOrderRequest.setRequesterSavedOn(date);
//			workOrderRequest.setRequesterSavedBy(userName);	
//			workOrderRequest.setRequesterSavedId(userId);
//			
//		;
//			
//			workOrderRepo.save(workOrderRequest);
//			
//		} else {
//			
//			return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to save form !!! "), HttpStatus.BAD_REQUEST);
//			
//		}
//		
//	} catch(Exception e) {
//		
//		String msg = e.getMessage();
//		log.error("Unable to Save Record" + msg);
//
//		return new ResponseEntity(
//				new ApiResponse(false, "Failed to Save Work Order Request" + msg),
//				HttpStatus.BAD_REQUEST);
//		
//		
//	}
//	return new ResponseEntity(workOrderRequest, HttpStatus.CREATED);
//	
//}

public ResponseEntity<?> SaveWorkorder(WorkOrderRequestFormF020 workOrderRequest, HttpServletRequest http) {
    try {
        String userRole = getUserRole();
        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
        String userName = userRepository.getUserName(userId);
        LocalDateTime currentDate = LocalDateTime.now();
        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

        if (userRole.equalsIgnoreCase("ROLE_HOD")||userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
            Long rawId = workOrderRequest.getId();
            WorkOrderRequestFormF020 existingRecord;

            if (rawId != null) {
                // Fetch existing record by ID
                existingRecord = workOrderRepo.findById(rawId)
                    .orElse(new WorkOrderRequestFormF020());

                // Update fields
                existingRecord.setFormat(workOrderRequest.getFormat());
                existingRecord.setFormat_no(workOrderRequest.getFormat_no());
                existingRecord.setRef_sop_no(workOrderRequest.getRef_sop_no());
                existingRecord.setRevisionNo(workOrderRequest.getRevisionNo());
                existingRecord.setUnit(workOrderRequest.getUnit());
                existingRecord.setDateOfRequest(workOrderRequest.getDateOfRequest());
                existingRecord.setWorNo(workOrderRequest.getWorNo());
                existingRecord.setDepartment(workOrderRequest.getDepartment());
                existingRecord.setArea(workOrderRequest.getArea());
                existingRecord.setTargetDate(workOrderRequest.getTargetDate());
                existingRecord.setDetailsOfWork(workOrderRequest.getDetailsOfWork());
                existingRecord.setAssignedDepartment(workOrderRequest.getAssignedDepartment());
                existingRecord.setClosureDate(workOrderRequest.getClosureDate());
                existingRecord.setComments(workOrderRequest.getComments());

                // Set requester-specific fields
                existingRecord.setRequesterStatus(AppConstantEngineering.Requester_save);
                existingRecord.setRequesterSavedOn(date);
                existingRecord.setRequesterSavedBy(userName);
                existingRecord.setRequesterSavedId(userId);

                // Save the updated record
                workOrderRepo.save(existingRecord);
            } else {
                // Save as new entry if no ID is provided
                workOrderRequest.setRequesterStatus(AppConstantEngineering.Requester_save);
                workOrderRequest.setRequesterSavedOn(date);
                workOrderRequest.setRequesterSavedBy(userName);
                workOrderRequest.setRequesterSavedId(userId);
                workOrderRepo.save(workOrderRequest);
            }
        } else {
            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to save form !!!"),
                                        HttpStatus.BAD_REQUEST);
        }

    } catch (Exception e) {
        String msg = e.getMessage();
        log.error("Unable to Save Record: " + msg);
        return new ResponseEntity<>(new ApiResponse(false, "Failed to Save Work Order Request: " + msg),
                                    HttpStatus.BAD_REQUEST);
    }

    return new ResponseEntity<>(workOrderRequest, HttpStatus.CREATED);
}






public ResponseEntity<?> SubmitWorkOrderRequest(
		@RequestBody WorkOrderRequestFormF020 workOrderRequest, HttpServletRequest http) {
	if (workOrderRequest == null) {
		return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
				HttpStatus.BAD_REQUEST);
	}

	SCAUtil scaUtil = new SCAUtil();
	Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
	String userName = userRepository.getUserName(userId);
	String role = sca.getUserRoleFromRequest(http, tokenProvider);

	Long id = workOrderRequest.getId();
	WorkOrderRequestFormF020 bleachObj = new WorkOrderRequestFormF020();
	// Get the current time
	LocalDateTime now = LocalDateTime.now();
	Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
	


	try {
		String missingField = "";
		if (workOrderRequest.getFormat_no() == null)
			missingField = "formatNo";
		if (workOrderRequest.getRef_sop_no() == null)
			missingField = "sopNumber";
		if (workOrderRequest.getRevisionNo() == null)
			missingField = "revisionNo";

		if (!missingField.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
					HttpStatus.BAD_REQUEST);
		}

		if (id != null) {
			bleachObj = workOrderRepo.fetchWorkOrderRequestsById(id);
			if (bleachObj == null) {
				return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
			}
		}
		workOrderRequest.setCreatedAt(bleachObj.getCreatedAt());
		workOrderRequest.setCreatedBy(bleachObj.getCreatedBy());
		 workOrderRequest.setRequesterSavedOn(bleachObj.getRequesterSavedOn());
		    workOrderRequest.setRequesterSavedBy(bleachObj.getRequesterSavedBy());
		    workOrderRequest.setRequesterStatus(bleachObj.getRequesterStatus());

			String currentStatus = bleachObj.getRequesterStatus();
//			String currentMailStatus = bleachObj.getMailStatus();

			if(role.equalsIgnoreCase("ROLE_HOD")||role.equalsIgnoreCase("ROLE_DESIGNEE")) 
			{

				
				{

					workOrderRequest.setRequesterStatus(AppConstantEngineering.Requester_submit);
					
					workOrderRequest.setRequesterSubmitOn(date);
					workOrderRequest.setRequesterSubmitBy(userName);;
					workOrderRequest.setRequesterSign(userName);;
					workOrderRequest.setRequesterSubmitId(userId);;
					workOrderRequest.setReceiverstatus(AppConstantEngineering.waitingStatus);	
					workOrderRequest.setHodStatus(AppConstantEngineering.waitingStatus);
					
//					workOrderRequest.setMailStatus(AppConstantEngineering.waitingStatus);;
					
					
					
					workOrderRepo.save(workOrderRequest);
					

			

//					try {
//
//						mailFunction.sendEmailToStoreIncharge03(ReceptionCheckList);
//					} catch (Exception ex) {
//						return new ResponseEntity<>(
//								new ApiResponse(false, "STORE_OPERATOR Approved but Unable to send mail to HOD! "),
//								HttpStatus.OK);
//					}
					
					
					String AssignedDepartment = workOrderRequest.getAssignedDepartment();

					// Define department-role mapping
					// Define department-role mapping
					Map<String, String> departmentRoleMap = new HashMap<>();
					departmentRoleMap.put("Engineering", "ROLE_ENGINEER");
					departmentRoleMap.put("Mechanical", "ROLE_MECHANICAL");
					departmentRoleMap.put("Electrical", "ROLE_ELECTRICAL");
					departmentRoleMap.put("CIVIL", "ROLE_CIVIL");


					// Check if issuerDepartment exists in the map, and send email to corresponding role
					if (departmentRoleMap.containsKey(AssignedDepartment)) {
					    String roleToNotify = departmentRoleMap.get(AssignedDepartment);

					    try {
					        mailFunction.sendEmailToRole(workOrderRequest, roleToNotify, http);
					    } catch (Exception ex) {
					        return new ResponseEntity<>(
					                new ApiResponse(false, " approved but unable to send mail to " + roleToNotify),
					                HttpStatus.OK);
					    }
					} else {
					    // Log or handle case where issuer department doesn't match expected values
					    log.warn("Issuer department '{}' does not match expected departments", AssignedDepartment);
					}
				}
				
				
			} 

			else {
				return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
						HttpStatus.FORBIDDEN);
			}

	} catch (Exception ex) {
		log.error(" **** Unable to submit Work Order Request **** ", ex);
		return new ResponseEntity<>(
				new ApiResponse(false, "Unable to submit Work Order Request : " + ex.getMessage()),
				HttpStatus.BAD_REQUEST);
	}

	return new ResponseEntity(new ApiResponse(true, "Request Sucessfully Placed"),
			HttpStatus.OK);
}



public ResponseEntity<?> AcceptWorkOrderRequest(
		@RequestBody WorkOrderRequestFormF020 workOrderRequest, HttpServletRequest http) {
	if (workOrderRequest == null) {
		return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
				HttpStatus.BAD_REQUEST);
	}

	SCAUtil scaUtil = new SCAUtil();
	Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
	String userName = userRepository.getUserName(userId);
	String role = sca.getUserRoleFromRequest(http, tokenProvider);

	Long id = workOrderRequest.getId();
	WorkOrderRequestFormF020 bleachObj = new WorkOrderRequestFormF020();
	// Get the current time
	LocalDateTime now = LocalDateTime.now();
	Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
	


	try {
		String missingField = "";
		if (workOrderRequest.getFormat_no() == null)
			missingField = "formatNo";
		if (workOrderRequest.getRef_sop_no() == null)
			missingField = "sopNumber";
		if (workOrderRequest.getRevisionNo() == null)
			missingField = "revisionNo";

		if (!missingField.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
					HttpStatus.BAD_REQUEST);
		}

		if (id != null) {
			bleachObj = workOrderRepo.fetchWorkOrderRequestsById(id);
			if (bleachObj == null) {
				return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
			}
		}
		workOrderRequest.setCreatedAt(bleachObj.getCreatedAt());
		workOrderRequest.setCreatedBy(bleachObj.getCreatedBy());
		 workOrderRequest.setRequesterStatus(bleachObj.getRequesterStatus());
		    workOrderRequest.setRequesterSubmitOn(bleachObj.getRequesterSubmitOn());
		    workOrderRequest.setRequesterSubmitBy(bleachObj.getRequesterSubmitBy());
		    workOrderRequest.setRequesterSign(bleachObj.getRequesterSign());
		    workOrderRequest.setRequesterSubmitId(bleachObj.getRequesterSubmitId());
			workOrderRequest.setRequesterSavedOn(bleachObj.getRequesterSavedOn());
			workOrderRequest.setRequesterSavedBy(bleachObj.getRequesterSavedBy());	
			workOrderRequest.setRequesterSavedId(bleachObj.getRequesterSavedId());
			workOrderRequest.setHodStatus(bleachObj.getHodStatus());

			String currentStatus = bleachObj.getRequesterStatus();
//			String currentMailStatus = bleachObj.getMailStatus();

			if (role.equals("ROLE_ENGINEER") || role.equals("ROLE_MECHANICAL") || role.equals("ROLE_ELECTRICAL")|| role.equals("ROLE_CIVIL"))
			{

				
				{

					
//					workOrderRequest.setReceiverstatus(AppConstantEngineering.Receiver_Accepted);					
					
					
					
					
					workOrderRequest.setAccepterStatus(AppConstantEngineering.Accepter_status);
					workOrderRequest.setAccepterSubmitOn(date);
					workOrderRequest.setAccepterSubmitBy(userName);
					workOrderRequest.setAccepterSign(userName);
					workOrderRequest.setAccepterSubmitId(userId);
					
					
					
					workOrderRepo.save(workOrderRequest);
					

			

//					try {
//
//						mailFunction.sendEmailHod(workOrderRequest);
//					} catch (Exception ex) {
//						return new ResponseEntity<>(
//								new ApiResponse(false, "WORK ORDER  ACCETEPED but Unable to send mail to HOD! "),
//								HttpStatus.OK);
//					}
					
					
					 String submitterEmail = userRepository.getUserEmailById(bleachObj.getRequesterSubmitBy());

			            if (submitterEmail != null) {
			                try {
			                    mailFunction.sendEmailToSubmitter(workOrderRequest, submitterEmail); // Send email to the submitter
			                } catch (Exception ex) {
			                    return new ResponseEntity<>(new ApiResponse(false, "WORK ORDER ACCEPTED but Unable to send mail to HOD!"),
			                            HttpStatus.OK);
			                }
					
//					
				}
				}
				
				
			} 

			else {
				return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
						HttpStatus.FORBIDDEN);
			}

	} catch (Exception ex) {
		log.error(" **** Unable to Accept Work Order Request **** ", ex);
		return new ResponseEntity<>(
				new ApiResponse(false, "Unable to Accept Work Order Request : " + ex.getMessage()),
				HttpStatus.BAD_REQUEST);
	}

	return new ResponseEntity(new ApiResponse(true, "Request Accepted  Sucessfully"),
			HttpStatus.OK);
}


public ResponseEntity<?> CompletedWorkorder(
		@RequestBody WorkOrderRequestFormF020 workOrderRequest, HttpServletRequest http) {
	if (workOrderRequest == null) {
		return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
				HttpStatus.BAD_REQUEST);
	}

	SCAUtil scaUtil = new SCAUtil();
	Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
	String userName = userRepository.getUserName(userId);
	String role = sca.getUserRoleFromRequest(http, tokenProvider);

	Long id = workOrderRequest.getId();
	WorkOrderRequestFormF020 bleachObj = new WorkOrderRequestFormF020();
	// Get the current time
	LocalDateTime now = LocalDateTime.now();
	Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
	


	try {
		String missingField = "";
		if (workOrderRequest.getFormat_no() == null)
			missingField = "formatNo";
		if (workOrderRequest.getRef_sop_no() == null)
			missingField = "sopNumber";
		if (workOrderRequest.getRevisionNo() == null)
			missingField = "revisionNo";

		if (!missingField.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
					HttpStatus.BAD_REQUEST);
		}

		if (id != null) {
			bleachObj = workOrderRepo.fetchWorkOrderRequestsById(id);
			if (bleachObj == null) {
				return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
			}
		}
		workOrderRequest.setCreatedAt(bleachObj.getCreatedAt());
		workOrderRequest.setCreatedBy(bleachObj.getCreatedBy());
		 workOrderRequest.setRequesterStatus(bleachObj.getRequesterStatus());
		    workOrderRequest.setRequesterSubmitOn(bleachObj.getRequesterSubmitOn());
		    workOrderRequest.setRequesterSubmitBy(bleachObj.getRequesterSubmitBy());
		    workOrderRequest.setRequesterSign(bleachObj.getRequesterSign());
		    workOrderRequest.setReceiver(bleachObj.getReceiver());
		    workOrderRequest.setRequesterSubmitId(bleachObj.getRequesterSubmitId());
			workOrderRequest.setRequesterSavedOn(bleachObj.getRequesterSavedOn());
			workOrderRequest.setRequesterSavedBy(bleachObj.getRequesterSavedBy());	
			workOrderRequest.setRequesterSavedId(bleachObj.getRequesterSavedId());
			workOrderRequest.setHodStatus(bleachObj.getHodStatus());
			workOrderRequest.setInitialComments(bleachObj.getInitialComments());
			workOrderRequest.setAccepterSubmitBy(bleachObj.getAccepterSubmitBy());
			workOrderRequest.setAccepterSign(bleachObj.getAccepterSign());
			workOrderRequest.setAccepterSubmitId(bleachObj.getAccepterSubmitId());
			workOrderRequest.setAccepterSubmitOn(bleachObj.getAccepterSubmitOn());
			workOrderRequest.setAccepterStatus(bleachObj.getAccepterStatus());
			


			String currentStatus = bleachObj.getRequesterStatus();
//			String currentMailStatus = bleachObj.getMailStatus();

			if (role.equals("ROLE_ENGINEER") || role.equals("ROLE_MECHANICAL") || role.equals("ROLE_ELECTRICAL")|| role.equals("ROLE_CIVIL"))
			{

				
				{

					
					workOrderRequest.setReceiverstatus(AppConstantEngineering.Receiver_Completed);	
					
					workOrderRequest.setReceiverSign(userName);
					workOrderRequest.setReceiverSubmitBy(userName);;
					workOrderRequest.setReceiverSubmitId(userId);
					workOrderRequest.setReceiverSubmiton(date);
					workOrderRequest.setHodStatus(AppConstantEngineering.waitingStatus);
					
//					workOrderRequest.setMailStatus(AppConstantEngineering.waitingStatus);;
					
					
					
					workOrderRepo.save(workOrderRequest);
					

			

//					try {
//
//						mailFunction.sendEmailToStoreIncharge03(ReceptionCheckList);
//					} catch (Exception ex) {
//						return new ResponseEntity<>(
//								new ApiResponse(false, "STORE_OPERATOR Approved but Unable to send mail to HOD! "),
//								HttpStatus.OK);
//					}
					
					String submitterEmail = userRepository.getUserEmailById(bleachObj.getRequesterSubmitBy());

			            if (submitterEmail != null) {
			                try {
			                    mailFunction.sendEmailToAppoved(workOrderRequest, submitterEmail); // Send email to the submitter
			                } catch (Exception ex) {
			                    return new ResponseEntity<>(new ApiResponse(false, "Work Order Completed but Unable to send mail to HOD!"),
			                            HttpStatus.OK);
			                }
				}
				}
				
			} 

			else {
				return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
						HttpStatus.FORBIDDEN);
			}

	} catch (Exception ex) {
		log.error(" **** Unable to Completed Work Order Request **** ", ex);
		return new ResponseEntity<>(
				new ApiResponse(false, "Unable to  Work Order Completed : " + ex.getMessage()),
				HttpStatus.BAD_REQUEST);
	}

	return new ResponseEntity(new ApiResponse(true, "Completed Work  Sucessfully"),
			HttpStatus.OK);
}



public ResponseEntity<?> AppoveWorkorder(ApproveResponse approveResponse, HttpServletRequest http) {
	
	SCAUtil sca = new SCAUtil();
	
	WorkOrderRequestFormF020 WorkOrderRequest = new WorkOrderRequestFormF020();
	
	String userRole = getUserRole();
	Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	String userName = userRepository.getUserName(userId);
	LocalDateTime currentDate = LocalDateTime.now();
	Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
	
	try {
		
		WorkOrderRequest = workOrderRepo.fetchWorkOrderRequestsById(approveResponse.getId());
		
		
		
		
		String supervisiorStatus = WorkOrderRequest.getReceiverstatus();
		
		String hodStatus = WorkOrderRequest.getHodStatus();
		
		UserImageDetails imageDetails = new UserImageDetails();
		
		if(supervisiorStatus.equalsIgnoreCase(AppConstantEngineering.Receiver_Completed) && hodStatus.equalsIgnoreCase(AppConstantEngineering.waitingStatus)) {
			
			if(userRole.equalsIgnoreCase("ROLE_HOD")||userRole.equalsIgnoreCase("ROLE_DESIGNEE") ) {
				
				if(approveResponse.getStatus().equals("Approve")) {
					
				

					WorkOrderRequest.setHodStatus(AppConstantEngineering.hodApprovedStatus);
					String reason = approveResponse.getRemarks();
					WorkOrderRequest.setComments(reason);

					

					WorkOrderRequest.setHodSubmitOn(date);;
					WorkOrderRequest.setHodSubmitBy(userName);;
					WorkOrderRequest.setHodSubmitId(userId);
					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					ReceptionCheckList.setStore_in_charge_Signature(signature);
					
					WorkOrderRequest.setHodSign(userName);;
					
					workOrderRepo.save(WorkOrderRequest);
					
					
					
					return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);
					
				}
				
			
				
				
				else {
					return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
				}
				
			} else {
				return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"), HttpStatus.BAD_REQUEST);
			}
			
		}
		
		else {
			return new ResponseEntity(new ApiResponse(false, "STORE_OPERATOR Not yet Submitted"), HttpStatus.BAD_REQUEST);
		}
		
	} catch(Exception e) {
		
		String msg = e.getMessage();
		log.error("Unable to Approve Record" + msg);

		return new ResponseEntity(
				new ApiResponse(false, "Failed to approve/reject ReceptionCheckList Record " + msg),
				HttpStatus.BAD_REQUEST);
		
		
	}
	

}



//public ResponseEntity<?> getWorkorder(String dateOfRequest, String worNo) {
//    List<WorkOrderRequestFormF016> WorkOrderRequest = new ArrayList<>();
//    try {
//    	WorkOrderRequest = workOrderRepo.findBydateNoAndWor(dateOfRequest, worNo);
//    } catch (Exception ex) {
//        String msg = ex.getMessage();
//        ex.printStackTrace();
//        log.error("Unable to get Work Order List: " + msg);
//        return new ResponseEntity<>(new ApiResponse(false, "Unable to get weightScale: " + msg), HttpStatus.BAD_REQUEST);
//    }
//    return new ResponseEntity<>(worNo, HttpStatus.OK);
//}


public ResponseEntity<?> getWorkorder(String dateOfRequest, String worNo) {
    List<WorkOrderRequestFormF020> WorkOrder = new ArrayList<>();
    try {
    	WorkOrder = workOrderRepo.findBydateNoAndWor(dateOfRequest, worNo);
    } catch (Exception ex) {
        String msg = ex.getMessage();
        ex.printStackTrace();
        log.error("Unable to get  Work Order List: " + msg);
        return new ResponseEntity<>(new ApiResponse(false, "Unable to get  Work Order List: " + msg), HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(WorkOrder, HttpStatus.OK);
}



//public ResponseEntity<?> getWorkorderlistSummary() {
//	
//	String userRole = getUserRole();
//	
//	List<WorkOrderRequestFormF020> WorkOrderRequest = new ArrayList<>();
//	
//	try {
//		
//		 if(userRole.equals("ROLE_HOD"))
//		{
//			
//			
//			WorkOrderRequest = workOrderRepo.SummaryforAssistant();
//			
//		} 
//		 else if (userRole.equals("ROLE_ENGINEER") || userRole.equals("ROLE_MECHANICAL") || userRole.equals("ROLE_ELECTRICAL"))
//		{
//			
//			WorkOrderRequest = workOrderRepo.SummaryforEngineer();
//			
//		} else {
//			return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to access WeightScales form"), HttpStatus.BAD_REQUEST);
//		}
//		
//		return new ResponseEntity(WorkOrderRequest, HttpStatus.OK);
//	} catch(Exception ex) {
//		String msg = ex.getMessage();
//		ex.printStackTrace();
//		log.error("Unable to get summary record" + msg);
//		return new ResponseEntity(
//				new ApiResponse(false, "Failed to get summary record" + msg),
//				HttpStatus.BAD_REQUEST);
//	}
//	
//	
//	
//}

//public ResponseEntity<?> getWorkorderlistSummary(Long userId) {
//    String userRole = getUserRole();
//    String userDepartment = userRepository.getDepartmentById(userId); // Get the user's department
//    List<WorkOrderRequestFormF020> workOrderRequest = new ArrayList<>();
//
//    try {
//        // Retrieve records based on user role
//        if (userRole.equals("ROLE_HOD")) {
//            workOrderRequest = workOrderRepo.SummaryforAssistant();
//        } else if (userRole.equals("ROLE_ENGINEER") || userRole.equals("ROLE_MECHANICAL") || userRole.equals("ROLE_ELECTRICAL")) {
//            workOrderRequest = workOrderRepo.SummaryforEngineer();
//        } else {
//            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to access Work Order list form"), HttpStatus.BAD_REQUEST);
//        }
//
//        // Filter work order requests by department of the user who created each entry
//        List<WorkOrderRequestFormF020> filteredWorkOrderRequest = workOrderRequest.stream()
//            .filter(wo -> wo.getCreatedBy() != null && userRepository.getDepartmentByUserName(wo.getCreatedBy()).equals(userDepartment))
//            .collect(Collectors.toList());
//
//        return new ResponseEntity<>(filteredWorkOrderRequest, HttpStatus.OK);
//
//    } catch (Exception ex) {
//        String msg = ex.getMessage();
//        ex.printStackTrace();
//        log.error("Unable to get Work Order list summary record: " + msg);
//        return new ResponseEntity<>(
//            new ApiResponse(false, "Failed to get Work Order list summary record: " + msg),
//            HttpStatus.BAD_REQUEST);
//    }
//}


//public ResponseEntity<?> getWorkorderlistSummary(String username) {
//    String userRole = getUserRole();
//    String userDepartment = userRepository.getDepartmentByUserName(username); // Get the user's department based on username
//    List<WorkOrderRequestFormF020> workOrderRequest = new ArrayList<>();
//
//    try {
//        // Retrieve records based on user role
//        if (userRole.equals("ROLE_HOD")) {
//            workOrderRequest = workOrderRepo.SummaryforAssistant();
//        } else if (userRole.equals("ROLE_ENGINEER") || userRole.equals("ROLE_MECHANICAL") || userRole.equals("ROLE_ELECTRICAL") || userRole.equals("ROLE_CIVIL")) {
//            workOrderRequest = workOrderRepo.SummaryforEngineer();
//        } else {
//            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to access Work Order list form"), HttpStatus.BAD_REQUEST);
//        }
//
//        // Filter work order requests by department of the user who created each entry
//        List<WorkOrderRequestFormF020> filteredWorkOrderRequest = workOrderRequest.stream()
//            .filter(wo -> wo.getCreatedBy() != null && userRepository.getDepartmentByUserName(wo.getCreatedBy()).equals(userDepartment))
//            .collect(Collectors.toList());
//
//        return new ResponseEntity<>(filteredWorkOrderRequest, HttpStatus.OK);
//
//    } catch (Exception ex) {
//        String msg = ex.getMessage();
//        ex.printStackTrace();
//        log.error("Unable to get Work Order list summary record: " + msg);
//        return new ResponseEntity<>(
//            new ApiResponse(false, "Failed to get Work Order list summary record: " + msg),
//            HttpStatus.BAD_REQUEST);
//    }
//}


//public ResponseEntity<?> getWorkorderlistSummary(String username) {
//    String userRole = getUserRole();
//    String userDepartment = userRepository.getDepartmentByUserName(username); // Get the user's department
//    List<WorkOrderRequestFormF020> workOrderRequest = new ArrayList<>();
//
//    try {
//        String assignedDepartment = null;
//
//        // Determine the receiver department filter based on the user's role
//        if (userRole.equals("ROLE_MECHANICAL")) {
//        	assignedDepartment = "Mechanical";
//        } else if (userRole.equals("ROLE_ELECTRICAL")) {
//        	assignedDepartment = "Electrical";
//        } else if (userRole.equals("ROLE_ENGINEER")) {
//        	assignedDepartment = "Engineering";
//        } else if (userRole.equals("ROLE_CIVIL")) {
//        	assignedDepartment = "Civil";
//        	}
//        	else if (userRole.equals("ROLE_HOD")) {
//                // Fetch work orders specifically for HOD
//                workOrderRequest = workOrderRepo.SummaryforAssistant();
//        } 
//        
//        else {
//            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to access Work Order list form"),
//                                        HttpStatus.BAD_REQUEST);
//        }
//
//        // Fetch work orders based on the role-specific department filter
//        workOrderRequest = workOrderRepo.SummaryforEngineer(assignedDepartment);
//
//        // Further filter by department of the user who created each entry
//        List<WorkOrderRequestFormF020> filteredWorkOrderRequest = workOrderRequest.stream()
//            .filter(wo -> wo.getCreatedBy() != null && userRepository.getDepartmentByUserName(wo.getCreatedBy()).equals(userDepartment))
//            .collect(Collectors.toList());
//
//        return new ResponseEntity<>(filteredWorkOrderRequest, HttpStatus.OK);
//
//    } catch (Exception ex) {
//        String msg = ex.getMessage();
//        log.error("Unable to get Work Order list summary record: " + msg);
//        return new ResponseEntity<>(new ApiResponse(false, "Failed to get Work Order list summary record: " + msg),
//                                    HttpStatus.BAD_REQUEST);
//    }
//}

public ResponseEntity<?> getWorkorderlistSummary(String username) {
    String userRole = getUserRole();
    String userDepartment = userRepository.getDepartmentByUserName(username); // Get the user's department
    List<WorkOrderRequestFormF020> workOrderRequest = new ArrayList<>();

    try {
        String assignedDepartment = null;

        // Determine the receiver department filter based on the user's role
        if (userRole.equals("ROLE_MECHANICAL")) {
            assignedDepartment = "Mechanical";
        } else if (userRole.equals("ROLE_ELECTRICAL")) {
            assignedDepartment = "Electrical";
        } else if (userRole.equals("ROLE_ENGINEER")) {
            assignedDepartment = "Engineering";
        } else if (userRole.equals("ROLE_CIVIL")) {
            assignedDepartment = "Civil";
        } else if (userRole.equals("ROLE_HOD")) {
            // Fetch work orders specifically for HOD
            workOrderRequest = workOrderRepo.SummaryforAssistant();
        } else {
            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to access Work Order list form"),
                                        HttpStatus.BAD_REQUEST);
        }

        // Fetch work orders based on the role-specific department filter, if not HOD
        if (!userRole.equals("ROLE_HOD")) {
            workOrderRequest = workOrderRepo.SummaryforEngineer(assignedDepartment);
        }

        // Further filter by department of the user who created each entry
        List<WorkOrderRequestFormF020> filteredWorkOrderRequest = workOrderRequest.stream()
            .filter(wo -> wo.getCreatedBy() != null && userRepository.getDepartmentByUserName(wo.getCreatedBy()).equals(userDepartment))
            .collect(Collectors.toList());

        return new ResponseEntity<>(filteredWorkOrderRequest, HttpStatus.OK);

    } catch (Exception ex) {
        String msg = ex.getMessage();
        log.error("Unable to get Work Order list summary record: " + msg);
        return new ResponseEntity<>(new ApiResponse(false, "Failed to get Work Order list summary record: " + msg),
                                    HttpStatus.BAD_REQUEST);
    }
}






public ResponseEntity<?> getWorkorderlistPrint(String worNo, String year, String month) {
    List<WorkOrderRequestFormF020> workOrderRequestList = new ArrayList<>();

    try {
        // Check if at least one parameter is provided
        if ((year != null && !year.isEmpty() && month != null && !month.isEmpty()) || 
            (worNo != null && !worNo.isEmpty())) {
            
            // If year, month, or worNo is empty, set to null to exclude from query
            year = (year != null && !year.isEmpty()) ? year : null;
            month = (month != null && !month.isEmpty()) ? month : null;
            worNo = (worNo != null && !worNo.isEmpty()) ? worNo : null;

            // Call repository method with optional parameters
            workOrderRequestList = workOrderRepo.getWorByOptionalParams(year, month, worNo);

            // Return 404 if no records are found
            if (workOrderRequestList.isEmpty()) {
                return new ResponseEntity<>(new ApiResponse(false, "No records found for the given parameters."), HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(new ApiResponse(false, "WOR No, Year, or Month is missing."), HttpStatus.BAD_REQUEST);
        }
    } catch (Exception ex) {
        log.error("Unable to get Work Order list: " + ex.getMessage());
        return new ResponseEntity<>(new ApiResponse(false, "Unable to get Work Order list: " + ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return new ResponseEntity<>(workOrderRequestList, HttpStatus.OK);
}


//public ResponseEntity<?> SaveBreakdown(BreakdownIntimationSlipF003 breakdownSlip, HttpServletRequest http) {
//	
//	try {
//		String userRole = getUserRole();
//		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//		String userName = userRepository.getUserName(userId);
//		LocalDateTime currentDate = LocalDateTime.now();
//		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//		
//	
//			if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR"))
//		{
//			
//			Long rawId = breakdownSlip.getId();
//			
//			if(rawId != null)
//			{
//				BreakdownIntimationSlipF003 ReceptionCheckList = new BreakdownIntimationSlipF003();	
//				ReceptionCheckList = breakdownSlipRepo.fetchBreakdownSlipById(rawId);
//				breakdownSlip.setCreatedAt(breakdownSlip.getCreatedAt());
//				breakdownSlip.setCreatedBy(breakdownSlip.getCreatedBy());
//				
//			}
//			
//			breakdownSlip.setSupervisorStatus(AppConstantEngineering.supervisor_Save);		
//			breakdownSlip.setSupervisorSavedBy(userName);		
//			breakdownSlip.setSupervisorSavedId(userId);	
//			breakdownSlip.setSupervisorSavedOn(date);;
//			
//			
//			
//			breakdownSlipRepo.save(breakdownSlip);
//			
//		} else {
//			
//			return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to save form !!! "), HttpStatus.BAD_REQUEST);
//			
//		}
//		
//	} catch(Exception e) {
//		
//		String msg = e.getMessage();
//		log.error("Unable to Save Record" + msg);
//
//		return new ResponseEntity(
//				new ApiResponse(false, "Failed to Save Breakdown Intimation Slip" + msg),
//				HttpStatus.BAD_REQUEST);
//		
//		
//	}
//	return new ResponseEntity(breakdownSlip, HttpStatus.CREATED);
//	
//}


//public ResponseEntity<?> saveOrUpdateBreakdown(BreakdownIntimationSlipF003 breakdownSlip, HttpServletRequest http) {
//    try {
//        String userRole = getUserRole();
//        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//        String userName = userRepository.getUserName(userId);
//        LocalDateTime currentDate = LocalDateTime.now();
//        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//        if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
//            Long rawId = breakdownSlip.getId();
//
//            if (rawId != null) {
//                // Fetch existing slip using ID
////                BreakdownIntimationSlipF003 existingSlip = breakdownSlipRepo.findById(rawId)
////                        .orElse(null);
//                BreakdownIntimationSlipF003 existingSlip = new BreakdownIntimationSlipF003();	
//                existingSlip = breakdownSlipRepo.fetchBreakdownSlipById(rawId);
//                
//
//                if (existingSlip != null) {
//                    // Preserve non-updatable fields
//                    breakdownSlip.setCreatedAt(existingSlip.getCreatedAt());
//                    breakdownSlip.setCreatedBy(existingSlip.getCreatedBy());
//                    breakdownSlip.setFormat(existingSlip.getFormat());
//                    breakdownSlip.setFormat_no(existingSlip.getFormat_no());
//                    breakdownSlip.setRef_sop_no(existingSlip.getRef_sop_no());
//                    breakdownSlip.setRevisionNo(existingSlip.getRevisionNo());
//                    breakdownSlip.setUnit(existingSlip.getUnit());
//                    breakdownSlip.setDate(existingSlip.getDate());
//                    breakdownSlip.setIssuerDepartment(existingSlip.getIssuerDepartment());
//                    breakdownSlip.setBisNo(existingSlip.getBisNo());
//                    breakdownSlip.setBmrNo(existingSlip.getBmrNo());
//                    breakdownSlip.setReceiverDepartment(existingSlip.getReceiverDepartment());
//                    breakdownSlip.setEquipmentAttended(existingSlip.getEquipmentAttended());
//                    breakdownSlip.setBreakdownDetails(existingSlip.getBreakdownDetails());
//                    breakdownSlip.setSupervisorStatus(AppConstantEngineering.supervisor_Submit);
//                    breakdownSlip.setSupervisorSavedBy(userName);
//                    breakdownSlip.setSupervisorSavedId(userId);
//                    breakdownSlip.setSupervisorSavedOn(date);
//                    
//                
//                } else {
//                    return new ResponseEntity<>(new ApiResponse(false, "Record not found with ID: " + rawId), HttpStatus.NOT_FOUND);
//                }
//            }
//
//            // Set supervisor-specific fields for save or update
//            breakdownSlip.setSupervisorStatus(AppConstantEngineering.supervisor_Save);
//            breakdownSlip.setSupervisorSavedBy(userName);
//            breakdownSlip.setSupervisorSavedId(userId);
//            breakdownSlip.setSupervisorSavedOn(date);
//
//            // Save or update the breakdown slip
//            breakdownSlipRepo.save(breakdownSlip);
//            return new ResponseEntity<>(breakdownSlip, HttpStatus.CREATED);
//        } else {
//            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to save form !!!"), HttpStatus.BAD_REQUEST);
//        }
//
//    } catch (Exception e) {
//        String msg = e.getMessage();
//        log.error("Unable to Save Record: " + msg);
//        return new ResponseEntity<>(new ApiResponse(false, "Failed to Save Breakdown Intimation Slip: " + msg), HttpStatus.BAD_REQUEST);
//    }
//}
//

public ResponseEntity<?> SaveBreakdown(BreakdownIntimationSlipF003 breakdownSlip, HttpServletRequest http) {
    try {
        String userRole = getUserRole();
        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
        String userName = userRepository.getUserName(userId);
        LocalDateTime currentDate = LocalDateTime.now();
        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

        if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
            Long rawId = breakdownSlip.getId();

            if (rawId != null) {
                // Fetch the existing slip record using the ID
                BreakdownIntimationSlipF003 existingSlip = breakdownSlipRepo.fetchBreakdownSlipById(rawId);

                if (existingSlip != null) {
                    // Preserve non-updatable fields by updating only required fields
                    existingSlip.setSupervisorStatus(AppConstantEngineering.supervisor_Save);
                    existingSlip.setSupervisorSavedBy(userName);
                    existingSlip.setSupervisorSavedId(userId);
                    existingSlip.setSupervisorSavedOn(date);

                    // Optionally update other fields as needed
                    existingSlip.setDate(breakdownSlip.getDate());
                    existingSlip.setIssuerDepartment(breakdownSlip.getIssuerDepartment());
                    existingSlip.setBisNo(breakdownSlip.getBisNo());
                    existingSlip.setBmrNo(breakdownSlip.getBmrNo());
                    existingSlip.setReceiverDepartment(breakdownSlip.getReceiverDepartment());
                    existingSlip.setEquipmentAttended(breakdownSlip.getEquipmentAttended());
                    existingSlip.setBreakdownDetails(breakdownSlip.getBreakdownDetails());
                    existingSlip.setMachineStartTime(breakdownSlip.getMachineStartTime());
                    existingSlip.setProcessStopTime(breakdownSlip.getProcessStopTime());;
                    existingSlip.setEquipmentAttended(breakdownSlip.getEquipmentAttended());
                    existingSlip.setBreakdownDetails(breakdownSlip.getBreakdownDetails());
                    existingSlip.setFirstInformationTime(breakdownSlip.getFirstInformationTime());                    
                   
                    
                    // Save the updated slip back to the database
                    breakdownSlipRepo.save(existingSlip);
                    return new ResponseEntity<>(existingSlip, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(new ApiResponse(false, "Record not found with ID: " + rawId), HttpStatus.NOT_FOUND);
                }
            } else {
                // Handle creation of a new record if ID is null
                breakdownSlip.setSupervisorStatus(AppConstantEngineering.supervisor_Save);
                breakdownSlip.setSupervisorSavedBy(userName);
                breakdownSlip.setSupervisorSavedId(userId);
                breakdownSlip.setSupervisorSavedOn(date);
                breakdownSlipRepo.save(breakdownSlip);

                return new ResponseEntity<>(breakdownSlip, HttpStatus.CREATED);
            }
        } else {
            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to save form!"), HttpStatus.BAD_REQUEST);
        }

    } catch (Exception e) {
        String msg = e.getMessage();
        log.error("Unable to Save Record: " + msg);
        return new ResponseEntity<>(new ApiResponse(false, "Failed to Save Breakdown Intimation Slip: " + msg), HttpStatus.BAD_REQUEST);
    }
}



public ResponseEntity<?> SubmitBreakdown(
		@RequestBody BreakdownIntimationSlipF003 breakdownSlip, HttpServletRequest http) {
	if (breakdownSlip == null) {
		return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
				HttpStatus.BAD_REQUEST);
	}

	SCAUtil scaUtil = new SCAUtil();
	Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
	String userName = userRepository.getUserName(userId);
	String role = sca.getUserRoleFromRequest(http, tokenProvider);

	Long id = breakdownSlip.getId();
	BreakdownIntimationSlipF003 bleachObj = new BreakdownIntimationSlipF003();
	// Get the current time
	LocalDateTime now = LocalDateTime.now();
	Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
	


	try {
		String missingField = "";
		if (breakdownSlip.getFormat_no() == null)
			missingField = "formatNo";
		if (breakdownSlip.getRef_sop_no() == null)
			missingField = "sopNumber";
		if (breakdownSlip.getRevisionNo() == null)
			missingField = "revisionNo";

		if (!missingField.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
					HttpStatus.BAD_REQUEST);
		}

		if (id != null) {
			bleachObj = breakdownSlipRepo.fetchBreakdownSlipById(id);
			if (bleachObj == null) {
				return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
			}
		}
		breakdownSlip.setCreatedAt(bleachObj.getCreatedAt());
		breakdownSlip.setCreatedBy(bleachObj.getCreatedBy());
		
		breakdownSlip.setSupervisorSavedBy(bleachObj.getSupervisorSavedBy());		
		breakdownSlip.setSupervisorSavedId(bleachObj.getSupervisorSavedId());	
		breakdownSlip.setSupervisorSavedOn(bleachObj.getSupervisorSavedOn());;

			String currentStatus = bleachObj.getSupervisorStatus();
//			String currentMailStatus = bleachObj.getMailStatus();

			if(role.equalsIgnoreCase("ROLE_SUPERVISOR")) 
			{

				
				{

					breakdownSlip.setSupervisorStatus(AppConstantEngineering.supervisor_Submit);
					
					breakdownSlip.setSupervisorSubmitBy(userName);
					breakdownSlip.setSupervisorSubmitId(userId);
					breakdownSlip.setSupervisorSubmitOn(date);
					breakdownSlip.setSupervisorSign(userName);	
					breakdownSlip.setReceiverstatus(AppConstantEngineering.waitingStatus);	
					breakdownSlip.setClosureStatus(AppConstantEngineering.waitingStatus);					
					
//					workOrderRequest.setMailStatus(AppConstantEngineering.waitingStatus);;
					
					
					
					breakdownSlipRepo.save(breakdownSlip);
					
					
					
//		            try {
//					
//										mailFunction.sendEmailToenginner(breakdownSlip, http);
//									} catch (Exception ex) {
//										return new ResponseEntity<>(
//												new ApiResponse(false, "SUPERVISOR  Approved but Unable to send mail to HOD! "),
//												HttpStatus.OK);
//									}
					
					String issuerDepartment = breakdownSlip.getIssuerDepartment();

					// Define department-role mapping
					// Define department-role mapping
					Map<String, String> departmentRoleMap = new HashMap<>();
					departmentRoleMap.put("Engineering", "ROLE_ENGINEER");
					departmentRoleMap.put("Mechanical", "ROLE_MECHANICAL");
					departmentRoleMap.put("Electrical", "ROLE_ELECTRICAL");


					// Check if issuerDepartment exists in the map, and send email to corresponding role
					if (departmentRoleMap.containsKey(issuerDepartment)) {
					    String roleToNotify = departmentRoleMap.get(issuerDepartment);

					    try {
					        mailFunction.sendEmailToRole(breakdownSlip, roleToNotify, http);
					    } catch (Exception ex) {
					        return new ResponseEntity<>(
					                new ApiResponse(false, "Supervisor approved but unable to send mail to " + roleToNotify),
					                HttpStatus.OK);
					    }
					} else {
					    // Log or handle case where issuer department doesn't match expected values
					    log.warn("Issuer department '{}' does not match expected departments", issuerDepartment);
					}
		
					
					
				}
				
				
			} 

			else {
				return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
						HttpStatus.FORBIDDEN);
			}

	} catch (Exception ex) {
		log.error(" **** Unable to submit Work Order Request **** ", ex);
		return new ResponseEntity<>(
				new ApiResponse(false, "Unable to submit Work Order Request : " + ex.getMessage()),
				HttpStatus.BAD_REQUEST);
	}

	return new ResponseEntity(new ApiResponse(true, "Approved Successfully"),
			HttpStatus.OK);
}


public ResponseEntity<?> EngineerSubmitBreakdown(
		@RequestBody BreakdownIntimationSlipF003 breakdownSlip, HttpServletRequest http) {
	if (breakdownSlip == null) {
		return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
				HttpStatus.BAD_REQUEST);
	}

	SCAUtil scaUtil = new SCAUtil();
	Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
	String userName = userRepository.getUserName(userId);
	String role = sca.getUserRoleFromRequest(http, tokenProvider);

	Long id = breakdownSlip.getId();
	BreakdownIntimationSlipF003 bleachObj = new BreakdownIntimationSlipF003();
	// Get the current time
	LocalDateTime now = LocalDateTime.now();
	Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
	


	try {
		String missingField = "";
		if (breakdownSlip.getFormat_no() == null)
			missingField = "formatNo";
		if (breakdownSlip.getRef_sop_no() == null)
			missingField = "sopNumber";
		if (breakdownSlip.getRevisionNo() == null)
			missingField = "revisionNo";

		if (!missingField.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
					HttpStatus.BAD_REQUEST);
		}

		if (id != null) {
			bleachObj = breakdownSlipRepo.fetchBreakdownSlipById(id);
			if (bleachObj == null) {
				return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
			}
		}
		breakdownSlip.setCreatedAt(bleachObj.getCreatedAt());
		breakdownSlip.setCreatedBy(bleachObj.getCreatedBy());
		
		breakdownSlip.setSupervisorSavedBy(bleachObj.getSupervisorSavedBy());		
		breakdownSlip.setSupervisorSavedId(bleachObj.getSupervisorSavedId());	
		breakdownSlip.setSupervisorSavedOn(bleachObj.getSupervisorSavedOn());
		
		breakdownSlip.setSupervisorStatus(bleachObj.getSupervisorStatus());
		
		breakdownSlip.setSupervisorSubmitBy(bleachObj.getSupervisorSubmitBy());
		breakdownSlip.setSupervisorSubmitId(bleachObj.getSupervisorSubmitId());
		breakdownSlip.setSupervisorSign(bleachObj.getSupervisorSign());	
		breakdownSlip.setSupervisorSubmitOn(bleachObj.getSupervisorSubmitOn());
		

			String currentStatus = bleachObj.getSupervisorStatus();
//			String currentMailStatus = bleachObj.getMailStatus();

			if (role.equals("ROLE_ENGINEER") || role.equals("ROLE_MECHANICAL") || role.equals("ROLE_ELECTRICAL")|| role.equals("ROLE_CIVIL")) 
			{

				
				{

					
					breakdownSlip.setEngineerIssuerStatus(AppConstantEngineering.Engineer_status);					
//					breakdownSlip.setReceiverSubmitBy(userName);		
//					breakdownSlip.setReceiverSubmitId(userId);	
//					breakdownSlip.setReceiverSign(userName);
//					breakdownSlip.setReceiverSubmiton(date);		
					
					breakdownSlip.setEngineerIssuerSubmitBy(userName);		
					breakdownSlip.setEngineerIssuerSubmitId(userId);	
					breakdownSlip.setEngineerIssuerSign(userName);
					breakdownSlip.setEngineerIssuerSubmitOn(date);
					breakdownSlip.setClosureStatus(AppConstantEngineering.waitingStatus);

					
//					workOrderRequest.setMailStatus(AppConstantEngineering.waitingStatus);;
					
					
					
					breakdownSlipRepo.save(breakdownSlip);
					

			


				}
				
				
			} 

			else {
				return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
						HttpStatus.FORBIDDEN);
			}

	} catch (Exception ex) {
		log.error(" **** Unable to submit Work Order Request **** ", ex);
		return new ResponseEntity<>(
				new ApiResponse(false, "Unable to submit Work Order Request : " + ex.getMessage()),
				HttpStatus.BAD_REQUEST);
	}

	return new ResponseEntity(new ApiResponse(true, "Approved Successfully"),
			HttpStatus.OK);
}

public ResponseEntity<?> ReceiverSubmitBreakdown(
		@RequestBody BreakdownIntimationSlipF003 breakdownSlip, HttpServletRequest http) {
	if (breakdownSlip == null) {
		return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
				HttpStatus.BAD_REQUEST);
	}

	SCAUtil scaUtil = new SCAUtil();
	Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
	String userName = userRepository.getUserName(userId);
	String role = sca.getUserRoleFromRequest(http, tokenProvider);

	Long id = breakdownSlip.getId();
	BreakdownIntimationSlipF003 bleachObj = new BreakdownIntimationSlipF003();
	// Get the current time
	LocalDateTime now = LocalDateTime.now();
	Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
	


	try {
		String missingField = "";
		if (breakdownSlip.getFormat_no() == null)
			missingField = "formatNo";
		if (breakdownSlip.getRef_sop_no() == null)
			missingField = "sopNumber";
		if (breakdownSlip.getRevisionNo() == null)
			missingField = "revisionNo";

		if (!missingField.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
					HttpStatus.BAD_REQUEST);
		}

		if (id != null) {
			bleachObj = breakdownSlipRepo.fetchBreakdownSlipById(id);
			if (bleachObj == null) {
				return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
			}
		}
		breakdownSlip.setCreatedAt(bleachObj.getCreatedAt());
		breakdownSlip.setCreatedBy(bleachObj.getCreatedBy());
		
		breakdownSlip.setSupervisorSavedBy(bleachObj.getSupervisorSavedBy());		
		breakdownSlip.setSupervisorSavedId(bleachObj.getSupervisorSavedId());	
		breakdownSlip.setSupervisorSavedOn(bleachObj.getSupervisorSavedOn());
		
		breakdownSlip.setSupervisorStatus(bleachObj.getSupervisorStatus());
		
		breakdownSlip.setSupervisorSubmitBy(bleachObj.getSupervisorSubmitBy());
		breakdownSlip.setSupervisorSubmitId(bleachObj.getSupervisorSubmitId());
		breakdownSlip.setSupervisorSign(bleachObj.getSupervisorSign());	
		breakdownSlip.setSupervisorSubmitOn(bleachObj.getSupervisorSubmitOn());
		breakdownSlip.setEngineerIssuerSubmitBy(bleachObj.getEngineerIssuerSubmitBy());
		breakdownSlip.setEngineerIssuerSubmitId(bleachObj.getEngineerIssuerSubmitId());
		breakdownSlip.setEngineerIssuerSign(bleachObj.getEngineerIssuerSign());
		breakdownSlip.setEngineerIssuerSubmitOn(bleachObj.getEngineerIssuerSubmitOn());
		breakdownSlip.setEngineerIssuerStatus(bleachObj.getEngineerIssuerStatus());

		

			String currentStatus = bleachObj.getSupervisorStatus();
//			String currentMailStatus = bleachObj.getMailStatus();

			if (role.equals("ROLE_ENGINEER") || role.equals("ROLE_MECHANICAL") || role.equals("ROLE_ELECTRICAL")|| role.equals("ROLE_CIVIL")) 
			{

				
				{

					breakdownSlip.setReceiverstatus(AppConstantEngineering.Receiver_status);
					
					breakdownSlip.setReceiverSubmitBy(userName);		
					breakdownSlip.setReceiverSubmitId(userId);	
					breakdownSlip.setReceiverSign(userName);
					breakdownSlip.setReceiverSubmiton(date);
					breakdownSlip.setClosureStatus(AppConstantEngineering.waitingStatus);
					
					
//					workOrderRequest.setMailStatus(AppConstantEngineering.waitingStatus);;
					
					
					
					breakdownSlipRepo.save(breakdownSlip);
					

			


				}
				
				
			} 

			else {
				return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
						HttpStatus.FORBIDDEN);
			}

	} catch (Exception ex) {
		log.error(" **** Unable to submit Work Order Request **** ", ex);
		return new ResponseEntity<>(
				new ApiResponse(false, "Unable to submit Work Order Request : " + ex.getMessage()),
				HttpStatus.BAD_REQUEST);
	}

	return new ResponseEntity(new ApiResponse(true, "Approved Successfully"),
			HttpStatus.OK);
}


public ResponseEntity<?> CloserSubmitBreakdown(
		@RequestBody BreakdownIntimationSlipF003 breakdownSlip, HttpServletRequest http) {
	if (breakdownSlip == null) {
		return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
				HttpStatus.BAD_REQUEST);
	}

	SCAUtil scaUtil = new SCAUtil();
	Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
	String userName = userRepository.getUserName(userId);
	String role = sca.getUserRoleFromRequest(http, tokenProvider);

	Long id = breakdownSlip.getId();
	BreakdownIntimationSlipF003 bleachObj = new BreakdownIntimationSlipF003();
	// Get the current time
	LocalDateTime now = LocalDateTime.now();
	Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
	


	try {
		String missingField = "";
		if (breakdownSlip.getFormat_no() == null)
			missingField = "formatNo";
		if (breakdownSlip.getRef_sop_no() == null)
			missingField = "sopNumber";
		if (breakdownSlip.getRevisionNo() == null)
			missingField = "revisionNo";

		if (!missingField.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
					HttpStatus.BAD_REQUEST);
		}

		if (id != null) {
			bleachObj = breakdownSlipRepo.fetchBreakdownSlipById(id);
			if (bleachObj == null) {
				return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
			}
		}
		breakdownSlip.setCreatedAt(bleachObj.getCreatedAt());
		breakdownSlip.setCreatedBy(bleachObj.getCreatedBy());
		
		breakdownSlip.setSupervisorSavedBy(bleachObj.getSupervisorSavedBy());		
		breakdownSlip.setSupervisorSavedId(bleachObj.getSupervisorSavedId());	
		breakdownSlip.setSupervisorSavedOn(bleachObj.getSupervisorSavedOn());
		
		breakdownSlip.setSupervisorStatus(bleachObj.getSupervisorStatus());
		
		breakdownSlip.setSupervisorSubmitBy(bleachObj.getSupervisorSubmitBy());
		breakdownSlip.setSupervisorSubmitId(bleachObj.getSupervisorSubmitId());
		breakdownSlip.setSupervisorSign(bleachObj.getSupervisorSign());	
		breakdownSlip.setSupervisorSubmitOn(bleachObj.getSupervisorSubmitOn());
		breakdownSlip.setEngineerIssuerSubmitBy(bleachObj.getEngineerIssuerSubmitBy());
		breakdownSlip.setEngineerIssuerSubmitId(bleachObj.getEngineerIssuerSubmitId());
		breakdownSlip.setEngineerIssuerSign(bleachObj.getEngineerIssuerSign());
		breakdownSlip.setEngineerIssuerSubmitOn(bleachObj.getEngineerIssuerSubmitOn());
		breakdownSlip.setEngineerIssuerStatus(bleachObj.getEngineerIssuerStatus());
		breakdownSlip.setReceiverstatus(bleachObj.getReceiverstatus());
		breakdownSlip.setReceiverSubmitBy(bleachObj.getReceiverSubmitBy());
		breakdownSlip.setReceiverSubmitId(bleachObj.getReceiverSubmitId());
		breakdownSlip.setReceiverSubmiton(bleachObj.getReceiverSubmiton());
		breakdownSlip.setReceiverSign(bleachObj.getReceiverSign());


		

			String currentStatus = bleachObj.getSupervisorStatus();
//			String currentMailStatus = bleachObj.getMailStatus();

			if (role.equals("ROLE_SUPERVISOR")) 
			{

				
				{

					breakdownSlip.setClosureStatus(AppConstantEngineering.Closure_status);
					
					breakdownSlip.setClosureSubmitBy(userName);		
					breakdownSlip.setClosureSubmitId(userId);	
					breakdownSlip.setClosureSign(userName);
					breakdownSlip.setClosureSubmitOn(date);
		
					
					
					
					breakdownSlipRepo.save(breakdownSlip);
					

			


				}
				
				
			} 

			else {
				return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
						HttpStatus.FORBIDDEN);
			}

	} catch (Exception ex) {
		log.error(" **** Unable to submit Work Order Request **** ", ex);
		return new ResponseEntity<>(
				new ApiResponse(false, "Unable to submit Work Order Request : " + ex.getMessage()),
				HttpStatus.BAD_REQUEST);
	}

	return new ResponseEntity(new ApiResponse(true, "Approved Successfully"),
			HttpStatus.OK);
}

public ResponseEntity<?> getBreakdown(String date, String bisNo) {
    List<BreakdownIntimationSlipF003> BreakdownSlip = new ArrayList<>();
    try {
    	BreakdownSlip = breakdownSlipRepo.findBydateNoAndbisnO(date, bisNo);
    } catch (Exception ex) {
        String msg = ex.getMessage();
        ex.printStackTrace();
        log.error("Unable to get Breakdown Slip: " + msg);
        return new ResponseEntity<>(new ApiResponse(false, "Unable to get Breakdown Slip: " + msg), HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(BreakdownSlip, HttpStatus.OK);
}




//public ResponseEntity<?> getBreakdownPrint(String bisNo, String year, String month) {
//    List<BreakdownIntimationSlipF003> BreakdownSlip = new ArrayList<>();
//
//    try {
//        if (bisNo != null && !bisNo.isEmpty() && year != null && !year.isEmpty() && month != null && !month.isEmpty()) {
//
//            // Call repository method with year, month, and machineIdNo
//        	BreakdownSlip = breakdownSlipRepo.getbsinoNoAndYearMonth(year, month, bisNo);
//
//            // Return 404 if no records are found
//            if (BreakdownSlip.isEmpty()) {
//                return new ResponseEntity<>(new ApiResponse(false, "No records found for the given BSI no and Date."), HttpStatus.NOT_FOUND);
//            }
//
//        } else {
//            return new ResponseEntity<>(new ApiResponse(false, "BSI NO ID, Year or Month is missing."), HttpStatus.BAD_REQUEST);
//        }
//    } catch (Exception ex) {
//        log.error("Unable to get Break Down : " + ex.getMessage());
//        return new ResponseEntity<>(new ApiResponse(false, "Unable to get Break Down: " + ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//
//    return new ResponseEntity<>(BreakdownSlip, HttpStatus.OK);
//}

public ResponseEntity<?> getBreakdownPrint(String bisNo, String year, String month) {
    List<BreakdownIntimationSlipF003> breakdownSlipList = new ArrayList<>();

    try {
        // Parse year and month to Integer if not empty; set to null otherwise
        Integer parsedYear = (year != null && !year.isEmpty()) ? Integer.parseInt(year) : null;
        Integer parsedMonth = (month != null && !month.isEmpty()) ? Integer.parseInt(month) : null;
        bisNo = (bisNo != null && !bisNo.isEmpty()) ? bisNo : null;

        // Call repository method with parsed parameters
        breakdownSlipList = breakdownSlipRepo.getBreakdownByOptionalParams(parsedYear, parsedMonth, bisNo);

        if (breakdownSlipList.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(false, "No records found for the given parameters."), HttpStatus.NOT_FOUND);
        }
    } catch (Exception ex) {
        log.error("Unable to get Breakdown: " + ex.getMessage());
        return new ResponseEntity<>(new ApiResponse(false, "Unable to get Breakdown: " + ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return new ResponseEntity<>(breakdownSlipList, HttpStatus.OK);
}




//public ResponseEntity<?> getBreakdownSummary() {
//	
//	String userRole = getUserRole();
//	
//	
//	List<BreakdownIntimationSlipF003> BreakdownSlip = new ArrayList<>();
//	
//	try {
//		
//		if (userRole.equals("ROLE_ENGINEER") || userRole.equals("ROLE_MECHANICAL") || userRole.equals("ROLE_ELECTRICAL"))
//		{
//			
//			
//			
//			BreakdownSlip = breakdownSlipRepo.SummaryforEngineer();
//			
//		} 
//		else if(userRole.equals("ROLE_SUPERVISOR"))
//		{
//			BreakdownSlip = breakdownSlipRepo.SummaryforAssistant();
//			
//		
//			
//		} else {
//			return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to access WeightScales form"), HttpStatus.BAD_REQUEST);
//		}
//		
//		return new ResponseEntity(BreakdownSlip, HttpStatus.OK);
//	} catch(Exception ex) {
//		String msg = ex.getMessage();
//		ex.printStackTrace();
//		log.error("Unable to get summary record" + msg);
//		return new ResponseEntity(
//				new ApiResponse(false, "Failed to get summary record" + msg),
//				HttpStatus.BAD_REQUEST);
//	}
//	
//	
//	
//}


//public ResponseEntity<?> getBreakdownSummary(String username) {
//    String userRole = getUserRole();
//    String userDepartment = userRepository.getDepartmentByUserName(username); // Get the user's department
//    List<BreakdownIntimationSlipF003> breakdownSlip = new ArrayList<>();
//
//    try {
//        // Retrieve records based on user role
//        if (userRole.equals("ROLE_ENGINEER") || 
//            userRole.equals("ROLE_MECHANICAL") || 
//            userRole.equals("ROLE_ELECTRICAL")) {
//            
//            breakdownSlip = breakdownSlipRepo.SummaryforEngineer();
//        } else if (userRole.equals("ROLE_SUPERVISOR")) {
//            breakdownSlip = breakdownSlipRepo.SummaryforAssistant();
//        } else {
//            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to access Breakdown Slip form"), HttpStatus.BAD_REQUEST);
//        }
//
//        // Filter the breakdown slips by department
//        List<BreakdownIntimationSlipF003> filteredSlips = breakdownSlip.stream()
//            .filter(sl -> sl.getCreatedBy() != null && userRepository.getDepartmentByUserName(sl.getCreatedBy()).equals(userDepartment))
//            .collect(Collectors.toList());
//
//        return new ResponseEntity<>(filteredSlips, HttpStatus.OK);
//
//    } catch (Exception ex) {
//        String msg = ex.getMessage();
//        ex.printStackTrace();
//        log.error("Unable to get summary record: " + msg);
//        return new ResponseEntity<>(
//            new ApiResponse(false, "Failed to get summary record: " + msg),
//            HttpStatus.BAD_REQUEST);
//    }
//}

public ResponseEntity<?> getBreakdownSummary(String username) {
    String userRole = getUserRole();
    String userDepartment = userRepository.getDepartmentByUserName(username); // Get the user's department
    List<BreakdownIntimationSlipF003> breakdownSlip = new ArrayList<>();

    try {
        String receiverDepartment = null;

        // Determine assigned department filter based on user role
        if (userRole.equals("ROLE_ENGINEER")) {
        	receiverDepartment = "ENGINEERING";
        } else if (userRole.equals("ROLE_MECHANICAL")) {
        	receiverDepartment = "MECHANICAL";
        } else if (userRole.equals("ROLE_ELECTRICAL")) {
        	receiverDepartment = "ELECTRICAL";
        } else if (userRole.equals("ROLE_SUPERVISOR")) {
            breakdownSlip = breakdownSlipRepo.SummaryforAssistant(); // Fetch all for supervisor
        } else {
            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to access Breakdown Slip form"),
                                        HttpStatus.BAD_REQUEST);
        }

        // Fetch records based on the assigned department for engineers and mechanics
        if (!userRole.equals("ROLE_SUPERVISOR")) {
            breakdownSlip = breakdownSlipRepo.SummaryforEngineer(receiverDepartment);
        }

        // Further filter by the user's department if necessary
        List<BreakdownIntimationSlipF003> filteredSlips = breakdownSlip.stream()
            .filter(sl -> sl.getCreatedBy() != null && userRepository.getDepartmentByUserName(sl.getCreatedBy()).equals(userDepartment))
            .collect(Collectors.toList());

        return new ResponseEntity<>(filteredSlips, HttpStatus.OK);

    } catch (Exception ex) {
        String msg = ex.getMessage();
        log.error("Unable to get summary record: " + msg);
        return new ResponseEntity<>(new ApiResponse(false, "Failed to get summary record: " + msg),
                                    HttpStatus.BAD_REQUEST);
    }
}






public List<String> getAllDistinctBisNo() {
    return breakdownSlipRepo.findAllDistinctBisNo();
}


public List<String> getFilteredDistinctBisNo() {
    return breakdownSlipRepo.findDistinctBisNoExcludingSupervisorStatus();
}

public List<String> getAllDistinctRcaNo() {
    return rootCauseRepo.findAllDistinctrcaNo();
}


public List<String> getAllDistinctworNos() {
    return workOrderRepo.getAllDistinctworNos();
}

//public ResponseEntity<?> getProductionDetails(String department) {
//    List<?> result;
//
//    try {
//        switch (department.toUpperCase()) {
//            case "BLEACHING":
//                result = bmrSummaryProductionRepository.findAllByBmrNo();  // Retrieves data based on BMR_NO
//                break;
//            case "SPUNLACE":
//                result = bMR01RP01ProductionRepository.findAllByBatchNo();  // Retrieves data based on BATCH_NO
//                break;
//            case "PAD_PUNCHING":
//                result = punchingBmrProductionRepository.findAllByBatchNo();  // Retrieves data based on BATCH_NO
//                break;
//            case "DRYGOODS":
//                result = bmrGoodsProductionRepository.findAllByBatchNo();  // Retrieves data based on BATCH_NO
//                break;
//            default:
//                return new ResponseEntity<>(new ApiResponse(false, "Invalid department name."), HttpStatus.BAD_REQUEST);
//        }
//
//        if (result.isEmpty()) {
//            return new ResponseEntity<>(new ApiResponse(false, "No records found for the given department."), HttpStatus.NOT_FOUND);
//        }
//    } catch (Exception e) {
//        return new ResponseEntity<>(new ApiResponse(false, "Error retrieving production details: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//
//    return new ResponseEntity<>(result, HttpStatus.OK);
//}

public ResponseEntity<?> getProductionDetails(String department) {
    List<String> result;

    try {
        switch (department) {
            case "Bleaching":
                result = bmrSummaryProductionRepository.findAllByBmrNoBleaching();  // Retrieves data based on BMR_NO
                break;
            case "Spunlace":
                result = bMR01RP01ProductionRepository.findAllByBatchNo();  // Retrieves data based on BATCH_NO
                break;
            case "Pad_Punching":
                result = punchingBmrProductionRepository.findAllByBatchNo();  // Retrieves data based on BATCH_NO
                break;
            case "Dry_Goods":
                result = bmrGoodsProductionRepository.findAllByBatchNo();  // Retrieves data based on BATCH_NO
                break;
            case "Cotton_Buds":
                result = budsbmrproductiondetailsrepository.findAllByBatchNo();  // Retrieves data based on BATCH_NO
                break; 
               
            default:
                return new ResponseEntity<>(new ApiResponse(false, "Invalid department name."), HttpStatus.BAD_REQUEST);
        }

        // Filter out null values from the result list
        result = result.stream()
                       .filter(Objects::nonNull)
                       .collect(Collectors.toList());

        if (result.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(false, "No records found for the given department."), HttpStatus.NOT_FOUND);
        }
    } catch (Exception e) {
        return new ResponseEntity<>(new ApiResponse(false, "Error retrieving production details: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return new ResponseEntity<>(result, HttpStatus.OK);
}








}
