package com.focusr.Precot.Buds.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

import com.focusr.Precot.Buds.Payload.BudsBaleRequest;
import com.focusr.Precot.Buds.Payload.BudsBaleRequest;
import com.focusr.Precot.Buds.Payload.BudsBmrPrintRequest;
import com.focusr.Precot.Buds.Payload.BudsStoppageRequest;
import com.focusr.Precot.Buds.Payload.BudsTraceabilityRequest;
import com.focusr.Precot.Buds.Payload.BudsTraceabilitySliverLineDTO;
import com.focusr.Precot.Buds.model.BudsDailyProductionSliverHeader;
import com.focusr.Precot.Buds.model.BudsDailyProductionSliverLine;
import com.focusr.Precot.Buds.model.bmr.BudsBmrEnclosureListHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrEquipmentAnnexureHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrEquipmentAnnexureLine;
import com.focusr.Precot.Buds.model.bmr.BudsBmrManufacturerStepsHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrManufacturerStepsLine;
import com.focusr.Precot.Buds.model.bmr.BudsBmrPackingMaterialHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrPackingMaterialLine;
import com.focusr.Precot.Buds.model.bmr.BudsBmrPostProductionReview;
import com.focusr.Precot.Buds.model.bmr.BudsBmrProcessDeviationRecordHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrProcessDeviationRecordLine;
import com.focusr.Precot.Buds.model.bmr.BudsBmrProductRelease;
import com.focusr.Precot.Buds.model.bmr.BudsBmrProductionDetails;
import com.focusr.Precot.Buds.model.bmr.BudsBmrQualityReleaseHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrQualityReleaseLine;
import com.focusr.Precot.Buds.model.bmr.BudsBmrRework;
import com.focusr.Precot.Buds.model.bmr.BudsBmrStoppageHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrStoppageLine;
import com.focusr.Precot.Buds.model.bmr.BudsBmrVerificationOfRecordsHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrVerificationOfRecordsLine;
import com.focusr.Precot.Buds.repository.BudsDailyProductionSliverHeaderRepository;
import com.focusr.Precot.Buds.repository.bmr.BudsBmrEnclosureListRepository;
import com.focusr.Precot.Buds.repository.bmr.BudsBmrEquipmentAnnexureHeaderRepository;
import com.focusr.Precot.Buds.repository.bmr.BudsBmrManufacturerStepsHeaderRepository;
import com.focusr.Precot.Buds.repository.bmr.BudsBmrPackingMaterialLineRepository;
import com.focusr.Precot.Buds.repository.bmr.BudsBmrPackingMaterialRepository;
import com.focusr.Precot.Buds.repository.bmr.BudsBmrPostProductionReviewRepository;
import com.focusr.Precot.Buds.repository.bmr.BudsBmrProcessDeviationRecordRepository;
import com.focusr.Precot.Buds.repository.bmr.BudsBmrProductReleaseRepository;
import com.focusr.Precot.Buds.repository.bmr.BudsBmrProductionDetailsRepository;
import com.focusr.Precot.Buds.repository.bmr.BudsBmrQualityReleaseRepository;
import com.focusr.Precot.Buds.repository.bmr.BudsBmrReworkRepository;
import com.focusr.Precot.Buds.repository.bmr.BudsBmrStoppageHeaderRepository;
import com.focusr.Precot.Buds.repository.bmr.BudsBmrVerificationOfRecordsHeaderRepository;
import com.focusr.Precot.Buds.util.AppConstantsBuds;
import com.focusr.Precot.QA.model.FinalInspectionReportF037;
import com.focusr.Precot.QA.model.QaOnlineInspectionReport;
import com.focusr.Precot.QA.repository.FinalInspectionReportRepositoryF037;
import com.focusr.Precot.QA.repository.QaOnlineInspectionRepository;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummary;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachBmrSummaryRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR001GoodsProductionDetailsRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.payload.padpunching.PunchingBmrProductionDetailsResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.drygoods.AppConstantDryGoods;
import com.focusr.Precot.util.drygoods.GoodsAbCons;


@Service
public class BudsBmrSummaryService {
	
	Logger logger = LoggerFactory.getLogger(BudsBmrSummaryService.class);

	@Autowired
	private BudsBmrPostProductionReviewRepository postProductionReviewRepository;
	
	@Autowired
	private BudsBmrProductReleaseRepository productReleaseRepository;
	
	@Autowired
	private BudsBmrVerificationOfRecordsHeaderRepository verificationRecordHeaderRepository;
	
	@Autowired
	private BudsBmrManufacturerStepsHeaderRepository manufacturingStepsRepository;
	
	@Autowired
	private BudsBmrEquipmentAnnexureHeaderRepository equipmentDetailsRepository;
	
	@Autowired
	private BudsBmrProductionDetailsRepository productionDetailsRepository;
	
	@Autowired
	private BudsBmrEnclosureListRepository enclosureListRepository;
	
	@Autowired
	private BudsBmrQualityReleaseRepository qualityReleaseRepository;
	
	@Autowired
	private BudsBmrProcessDeviationRecordRepository processDeviationRecordRepository;
	
	@Autowired
	private BudsBmrStoppageHeaderRepository stoppageHeaderRepository;
	
	@Autowired
	private BudsBmrReworkRepository reworkRepository;
	
	@Autowired
	private BudsBmrPackingMaterialRepository packingMaterialRepository;
	
	@Autowired
	private BudsBmrPackingMaterialLineRepository packingMaterialLineRepository;
	
	
		// TRACEABILITY 
	
	@Autowired
	private BleachBmrSummaryRepository bleachBmrSummaryRepository;
	
	@Autowired
	private BudsDailyProductionSliverHeaderRepository sliverProductionRepository;
	
	@Autowired
	private QaOnlineInspectionRepository onlineInspectionRepository;
	
	@Autowired
	private FinalInspectionReportRepositoryF037 finalInspectionRepository;
	
	@Autowired
	private BMR001GoodsProductionDetailsRepository bMR001GoodsProductionDetailsRepository;
	
	@Autowired
	private JwtTokenProvider tokenProvider;
	
	@Autowired
	private UserRepository userRepository;
	
		/**
		 *  postProductionReview
		 */
	
	public ResponseEntity<?> submitPostProductionReview(BudsBmrPostProductionReview postProductionReview, HttpServletRequest http) {
		
		SCAUtil sca = new SCAUtil();
		
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		
		try {
			
			if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
				postProductionReview.setSupervisorStatus(AppConstants.supervisorApprovedStatus);
				postProductionReview.setSupervisorId(userId);
				postProductionReviewRepository.save(postProductionReview);
				
			} else if(userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
				postProductionReview.setHodStatus(AppConstants.hodApprovedStatus);
				postProductionReview.setHodId(userId);
				postProductionReviewRepository.save(postProductionReview);
			} else if(userRole.equalsIgnoreCase(AppConstantsBuds.qa) || userRole.equalsIgnoreCase(AppConstantsBuds.qaManager)
					|| userRole.equalsIgnoreCase(AppConstantsBuds.qaDesignee)) {
				postProductionReview.setQaStatus(AppConstants.qaApprovedStatus);
				postProductionReview.setQaId(userId);
				postProductionReviewRepository.save(postProductionReview);
			}
			
			else {
				return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to get post production Review"), HttpStatus.BAD_REQUEST);
			}
			
		} catch(Exception e) {
			
			logger.error("**** !!!! Failed to Submit Post production Review !!!!****" + e);
			String msg = e.getMessage();
			e.printStackTrace();
			
			return new ResponseEntity(new ApiResponse(false, "Failed to Submit Post production Review"), HttpStatus.BAD_REQUEST);
			
		}
		
		return new ResponseEntity(postProductionReview, HttpStatus.OK);
		
	}
	
	
	public ResponseEntity<?> getPostProductionReviewByBatchNo(String batchNo) {
		
		List<BudsBmrPostProductionReview> postProductionReviewList = new LinkedList<BudsBmrPostProductionReview>();
		
		try {
			
			postProductionReviewList = postProductionReviewRepository.postProductionReviewByBatchNo(batchNo);
			
		} catch(Exception e) {
			
			logger.error("**** !!!! Failed to Get Post production Review !!!!****" + e);
			String msg = e.getMessage();
			e.printStackTrace();
			
			return new ResponseEntity(new ApiResponse(false, " Unable to get post production Review"), HttpStatus.BAD_REQUEST);
			
		}
		
		return new ResponseEntity(postProductionReviewList, HttpStatus.OK);
	}
	
	
	/**
	 * PRODUCT RELASE
	 */
	
	public ResponseEntity<?> submitProductRelease(BudsBmrProductRelease productRelease, HttpServletRequest http) {
		
		String userRole = getUserRole();
		
		try {
			
			BudsBmrProductRelease productReleaseObj = new BudsBmrProductRelease();
			
			Long productId = productRelease.getId();
			
			if(productId != null) {
				
				productReleaseObj = productReleaseRepository.productReleaseById(productId);
				
				productRelease.setCreatedAt(productReleaseObj.getCreatedAt());
				productRelease.setCreatedBy(productReleaseObj.getCreatedBy());
				
			}
			
			if(userRole.equalsIgnoreCase(AppConstantsBuds.qa) || userRole.equalsIgnoreCase(AppConstantsBuds.qaManager)) {
				
				if(productRelease.getCheckerStatus() == null || "".equals(productRelease.getCheckerStatus())) {
					productRelease.setCheckerName(productRelease.getCheckerName());
					productRelease.setCheckerStatus("SAVED");
					productRelease.setCheckerDate(productRelease.getCheckerDate());
				} else if(productRelease.getCheckerStatus().equals("SAVED") || productRelease.getCheckerStatus().equalsIgnoreCase("Saved")){
					
					productRelease.setApproverStatus("Approved");
					productRelease.setApproverDate(productRelease.getApproverDate());
					productRelease.setApproverName(productRelease.getApproverName());
				}
				
				productReleaseRepository.save(productRelease);
			} 
			else {
				return new ResponseEntity(new ApiResponse(false, userRole + " not authorize to submit product release"), HttpStatus.BAD_REQUEST);
			}
		} catch(Exception e) {
		
			logger.error("**** !!!! Failed to Submit Product Release !!!****" + e);
			
			String msg = e.getMessage();
			
			return new ResponseEntity(new ApiResponse(false, " Failed to Submit Product Release " + msg), HttpStatus.BAD_REQUEST);
			
		}
		
		return new ResponseEntity(productRelease, HttpStatus.OK);
		
	}
	
	
	public ResponseEntity<?> getProductReleaseByBatchNo(String batchNo) {
		
		List<BudsBmrProductRelease> productReleaseList = new LinkedList<>();
	
		try {
			
			productReleaseList = productReleaseRepository.productReleaseByBatchNo(batchNo);
			
		} catch(Exception e) {
		
			logger.error("**** !!!! Failed to Get Product Release !!!****" + e);
			
			String msg = e.getMessage();
			
			return new ResponseEntity(new ApiResponse(false, " Failed to Get Product Release " + msg), HttpStatus.BAD_REQUEST);
			
		}
		
		return new ResponseEntity(productReleaseList, HttpStatus.OK);
	}
	
	
	/**
	 * VERIFICATION OF RECORDS
	 */
	
	public ResponseEntity<?> saveVerificationOfRecords(BudsBmrVerificationOfRecordsHeader verificationRecords, HttpServletRequest http) {
		
		Long id = verificationRecords.getId();
		SCAUtil sca = new SCAUtil();
		
		String userRole = getUserRole();
	    Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	    String userName = userRepository.getUserName(userId);
	    LocalDateTime currentDate = LocalDateTime.now();
	    Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
				
				if (id != null) {
	                BudsBmrVerificationOfRecordsHeader existingVerification = verificationRecordHeaderRepository.getVerificationOfRecordsById(id);
	                verificationRecords.setCreatedAt(existingVerification.getCreatedAt());
	                verificationRecords.setCreatedBy(existingVerification.getCreatedBy());
	            }

//	            verificationRecords.setSupervisor_save_by(userName);
//	            verificationRecords.setSupervisor_save_id(userId);
//	            verificationRecords.setSupervisor_save_on(date);
	            verificationRecords.setSupervisor_status(AppConstants.supervisorSave);
				
	            for(BudsBmrVerificationOfRecordsLine line : verificationRecords.getDetails()) {
	            	
	            	line.setVerificationRecord(verificationRecords);
	            	line.setChecked_name(line.getChecked_name());
	            	line.setChecked_status(AppConstants.supervisorSave);
	            	Long lineUserId = userRepository.getUsernameByUserId(line.getChecked_name());
	            	line.setChecked_id(lineUserId);
	            	line.setChecked_date(date);
	            }
	            
	            verificationRecordHeaderRepository.save(verificationRecords);
	            
			} else if(userRole.equalsIgnoreCase(AppConstantsBuds.qa) || userRole.equalsIgnoreCase(AppConstantsBuds.qaManager)) {
				
				if(verificationRecords.getSupervisor_status().equalsIgnoreCase(AppConstants.supervisorSave) || verificationRecords.getSupervisor_status().equalsIgnoreCase(AppConstants.supervisorApprovedStatus)) {
					
					verificationRecords.setQa_status(AppConstants.qaSave);
//	                verificationRecords.setQa_submit_by(userName);
//	                verificationRecords.setQa_submit_id(userId);
	                
	                for(BudsBmrVerificationOfRecordsLine line : verificationRecords.getDetails()) {
		            	
		            	line.setVerificationRecord(verificationRecords);
		            	line.setVerified_name(line.getVerified_name());
		            	line.setVerified_status(AppConstants.qaSave);
		            	Long lineUserId = userRepository.getUsernameByUserId(line.getVerified_name());
		            	line.setVerified_id(lineUserId);
		            	line.setVerified_date(date);
		            }
	                
	                verificationRecordHeaderRepository.save(verificationRecords);
					
				} else  {
	            	return new ResponseEntity(new ApiResponse(false,  "Supervisor not yet saved verification of records"), HttpStatus.BAD_REQUEST);
	            }
				
			} else {
	            return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to save verification of records"), HttpStatus.BAD_REQUEST);
	        }
			
		} catch(Exception ex) {
			
			String msg = ex.getMessage();
	        logger.error("Unable to Save Verification of Records form: " + msg);
	        ex.printStackTrace();

	        return new ResponseEntity<>(new ApiResponse(false, "Failed to Save Verification of Records form: " + msg), HttpStatus.BAD_REQUEST);
			
		}
		
		return new ResponseEntity(verificationRecords, HttpStatus.OK);
		
	}
	
	
	public ResponseEntity<?> submitVerificationRecords(BudsBmrVerificationOfRecordsHeader verificationRecords, HttpServletRequest http) {
		
		Long id = verificationRecords.getId();
		SCAUtil sca = new SCAUtil();
		
		String userRole = getUserRole();
	    Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	    String userName = userRepository.getUserName(userId);
	    LocalDateTime currentDate = LocalDateTime.now();
	    Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
	    
	    try {
	    	
	    	if (userRole.equals("ROLE_SUPERVISOR")) {
	            if (id != null) {
	                BudsBmrVerificationOfRecordsHeader existingVerification = verificationRecordHeaderRepository.getVerificationOfRecordsById(id);
	                verificationRecords.setCreatedAt(existingVerification.getCreatedAt());
	                verificationRecords.setCreatedBy(existingVerification.getCreatedBy());
	            }

//	            verificationRecords.setSupervisor_save_by(userName);
//	            verificationRecords.setSupervisor_save_id(userId);
//	            verificationRecords.setSupervisor_save_on(date);
	            
	            verificationRecords.setSupervisor_status(AppConstants.supervisorApprovedStatus);

	        
	            
	            for(BudsBmrVerificationOfRecordsLine line : verificationRecords.getDetails()) {
	            	
	            	line.setVerificationRecord(verificationRecords);
	            	line.setChecked_name(line.getChecked_name());
	            	line.setChecked_status(AppConstants.supervisorApprovedStatus);
	            	Long lineUserId = userRepository.getUsernameByUserId(line.getChecked_name());
	            	line.setChecked_id(lineUserId);
	            	line.setChecked_date(date);
	            }
	            
	            verificationRecordHeaderRepository.save(verificationRecords);
	            
	    	} else if(userRole.equalsIgnoreCase(AppConstantsBuds.qa) || userRole.equalsIgnoreCase(AppConstantsBuds.qaManager)) {
	            if (verificationRecords.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)) {
	                verificationRecords.setQa_status(AppConstants.qaApprovedStatus);
//	                verificationRecords.setQa_submit_by(userName);
//	                verificationRecords.setQa_submit_id(userId);

//	                
	                for(BudsBmrVerificationOfRecordsLine line : verificationRecords.getDetails()) {
		            	
		            	line.setVerificationRecord(verificationRecords);
		            	line.setVerified_name(line.getVerified_name());
		            	line.setVerified_status(AppConstants.qaApprovedStatus);
		            	Long lineUserId = userRepository.getUsernameByUserId(line.getVerified_name());
		            	line.setVerified_id(lineUserId);
		            	line.setVerified_date(date);
		            }
	                
	                verificationRecordHeaderRepository.save(verificationRecords);
	            }
	            
	            else {
	            	return new ResponseEntity(new ApiResponse(false,  "Supervisor not yet submit verification of records"), HttpStatus.BAD_REQUEST);
	            }
	            
	        } else {
	            return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to Submit verification of records"), HttpStatus.BAD_REQUEST);
	        }
	    	
	    	
	    } catch(Exception ex) {
			
			String msg = ex.getMessage();
	        logger.error("Unable to Submit Verification of Records form: " + msg);
	        ex.printStackTrace();

	        return new ResponseEntity<>(new ApiResponse(false, "Failed to Submit Verification of Records form: " + msg), HttpStatus.BAD_REQUEST);
			
		}
		
	    return new ResponseEntity(new ApiResponse(true, "Verification of Records Submitted Successfully !!!"), HttpStatus.OK);
	    
	}
	
	
	// GET VERIFICATION OF RECORDS

	public ResponseEntity<?> getVerificationOfRecords(String batchNo) {

		List<BudsBmrVerificationOfRecordsHeader> verificationRecordList = new LinkedList();

		try {

			verificationRecordList = verificationRecordHeaderRepository.verificationRecordByBatch(batchNo);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Get Verification of Records form" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Get Verification of Records form" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(verificationRecordList, HttpStatus.OK);

	}
	
	
	/**
	 * MANUFACTURER STEPS
	 */
	
	public ResponseEntity<?> saveManufacturerSteps(BudsBmrManufacturerStepsHeader manufacturerSteps, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			if (userRole.equals("ROLE_SUPERVISOR")) {

				manufacturerSteps.setBatchNo(manufacturerSteps.getBatchNo());
				manufacturerSteps.setOrderNo(manufacturerSteps.getOrderNo());

//				manufacturerSteps.setSupervisor_save_by(userName);
//				manufacturerSteps.setSupervisor_save_id(userId);
				manufacturerSteps.setSupervisor_status(AppConstants.supervisorSave);
//				manufacturerSteps.setSupervisor_save_on(manufacturerSteps.getSupervisor_save_on());

				for (BudsBmrManufacturerStepsLine steps : manufacturerSteps.getDetails()) {

					steps.setManufactureRecord(manufacturerSteps);

				}

				manufacturingStepsRepository.save(manufacturerSteps);

			} else if(userRole.equalsIgnoreCase(AppConstantsBuds.qa) || userRole.equalsIgnoreCase(AppConstantsBuds.qaManager)) {

				manufacturerSteps.setBatchNo(manufacturerSteps.getBatchNo());
				manufacturerSteps.setOrderNo(manufacturerSteps.getOrderNo());

				manufacturerSteps.setQa_status(AppConstants.qaSave);
//				manufacturerSteps.setQa_sign(userName);

				for (BudsBmrManufacturerStepsLine steps : manufacturerSteps.getDetails()) {

					steps.setManufactureRecord(manufacturerSteps);

				}

				manufacturingStepsRepository.save(manufacturerSteps);

			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, userRole + " not authroized to save manufacturer steps"));
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to Save Manufacturer Steps: " + msg);
			ex.printStackTrace();

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to Save Manufacturer Steps: " + ex.getMessage()));
	}
		return ResponseEntity.status(HttpStatus.OK).body(manufacturerSteps);
	}
	
	
		// SUBMIT MANUFACTURER STEPS 
	
	public ResponseEntity<?> submitManufacturerSteps(BudsBmrManufacturerStepsHeader manufacturerSteps, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			if (userRole.equals("ROLE_SUPERVISOR")) {

				manufacturerSteps.setBatchNo(manufacturerSteps.getBatchNo());
				manufacturerSteps.setOrderNo(manufacturerSteps.getOrderNo());

//				manufacturerSteps.setSupervisor_save_by(userName);
//				manufacturerSteps.setSupervisor_save_id(userId);
				manufacturerSteps.setSupervisor_status(AppConstants.supervisorApprovedStatus);
//				manufacturerSteps.setSupervisor_save_on(manufacturerSteps.getSupervisor_save_on());

				for (BudsBmrManufacturerStepsLine steps : manufacturerSteps.getDetails()) {

					steps.setManufactureRecord(manufacturerSteps);

				}

				manufacturingStepsRepository.save(manufacturerSteps);

			} else if(userRole.equalsIgnoreCase(AppConstantsBuds.qa) || userRole.equalsIgnoreCase(AppConstantsBuds.qaManager)) {

				manufacturerSteps.setBatchNo(manufacturerSteps.getBatchNo());
				manufacturerSteps.setOrderNo(manufacturerSteps.getOrderNo());

				manufacturerSteps.setQa_status(AppConstants.qaApprovedStatus);
//				manufacturerSteps.setQa_sign(userName);

				for (BudsBmrManufacturerStepsLine steps : manufacturerSteps.getDetails()) {

					steps.setManufactureRecord(manufacturerSteps);

				}

				manufacturingStepsRepository.save(manufacturerSteps);

			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false,  userRole + " not authroized to Submit Manufacturer Steps: "));
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to submit manufacturing Details: " + msg);
			ex.printStackTrace();

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to Submit Manufacturer Steps: " + ex.getMessage()));
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(true, userRole + " submitted Successfully"));
		
	}
	
		// GET MANUFACTURER STEPS BY BATCHNo
	
	public ResponseEntity<?> getManufacturerStepsByOrder(String batchNumber) {

		List<BudsBmrManufacturerStepsHeader> manufacturingStepsList = new ArrayList<>();

		try {

			manufacturingStepsList = manufacturingStepsRepository.manufacturingStepsByBatchNo(batchNumber);

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Stoppage Details: " + msg);
			ex.printStackTrace();

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to get Manufacturer Steps by Batch Number " + ex.getMessage()));
		}

		return ResponseEntity.status(HttpStatus.OK).body(manufacturingStepsList);

	}
	
	
		// EQUIPMENT ANNEXURE 
	
	public ResponseEntity<?> saveEquipmentAnnexure(BudsBmrEquipmentAnnexureHeader equipmentDetails, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			Long id = equipmentDetails.getEquipmentId();

			if (userRole.equals("ROLE_SUPERVISOR")) {

				if (id != null) {
					BudsBmrEquipmentAnnexureHeader existingVerification = equipmentDetailsRepository
							.getEquipmentDetailsById(id);
					equipmentDetails.setCreatedAt(existingVerification.getCreatedAt());
					equipmentDetails.setCreatedBy(existingVerification.getCreatedBy());
				}

				equipmentDetails.setSupervisor_save_by(userName);
				equipmentDetails.setSupervisor_save_id(userId);
				equipmentDetails.setSupervisor_save_on(date);
				equipmentDetails.setSupervisor_status(AppConstants.supervisorSave);

				for (BudsBmrEquipmentAnnexureLine line : equipmentDetails.getDetails()) {

					line.setEquipmentRecord(equipmentDetails);
					line.setChecked_name(line.getChecked_name());
					line.setChecked_status(AppConstants.supervisorSave);
					Long lineUserId = userRepository.getUsernameByUserId(line.getChecked_name());
					line.setChecked_id(lineUserId);
					line.setChecked_date(date);
				}

				equipmentDetailsRepository.save(equipmentDetails);

			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, userRole + " not authroized to save equipment details"));
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save Equipment Annexure Details" + msg);
			ex.printStackTrace();

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to save equipment details") + ex.getMessage());
		}

		return ResponseEntity.status(HttpStatus.OK).body(equipmentDetails);
		
	}
	
	
		// SUBMIT EQUIPMENT ANNEXURE DETAILS
	
	public ResponseEntity<?> submitEquipmentAnnexureDetails(BudsBmrEquipmentAnnexureHeader equipmentDetails, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			Long id = equipmentDetails.getEquipmentId();

			if (userRole.equals("ROLE_SUPERVISOR")) {

				if (id != null) {
					BudsBmrEquipmentAnnexureHeader existingVerification = equipmentDetailsRepository
							.getEquipmentDetailsById(id);
					equipmentDetails.setCreatedAt(existingVerification.getCreatedAt());
					equipmentDetails.setCreatedBy(existingVerification.getCreatedBy());
				}

				equipmentDetails.setSupervisor_save_by(userName);
				equipmentDetails.setSupervisor_save_id(userId);
				equipmentDetails.setSupervisor_save_on(date);
				equipmentDetails.setSupervisor_status(AppConstants.supervisorApprovedStatus);

				for (BudsBmrEquipmentAnnexureLine line : equipmentDetails.getDetails()) {

					line.setEquipmentRecord(equipmentDetails);
					line.setChecked_name(line.getChecked_name());
					line.setChecked_status(AppConstants.supervisorApprovedStatus);
					Long lineUserId = userRepository.getUsernameByUserId(line.getChecked_name());
					line.setChecked_id(lineUserId);
					line.setChecked_date(date);
				}

				equipmentDetailsRepository.save(equipmentDetails);

			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, userRole + " not authroize to submit equipment details"));
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit Equipment Annexure Details" + msg);
			ex.printStackTrace();

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to submit equipment details") + ex.getMessage());
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(true, userRole + " submitted Successfully"));
		
	}
	
		// EQUIPMENT ANNEXURE DETAILS BY BATCH NUmber
	
	public ResponseEntity<?> getEquipmentAnnexureDeatilsByBatchNumber(String batchNumber) {
		
		List<BudsBmrEquipmentAnnexureHeader> equipmentDetails = new ArrayList<>();

		try {

			equipmentDetails = equipmentDetailsRepository.getEquipmentDetailsByOrder(batchNumber);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Equipment Annexure Details" + msg);
			ex.printStackTrace();

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to get equipment details") + ex.getMessage());
		}

		return ResponseEntity.status(HttpStatus.OK).body(equipmentDetails);
		
	}
	
	/*
	 * PRODUCTION DETAILS
	 */
	
//	public ResponseEntity<?> fetchProductionDetailsSAP() {
//
//		List<PunchingBmrProductionDetailsResponse> productionDetailsList = new ArrayList<>();
//		List<Object[]> productionDetailsObject = new ArrayList<>();
//		Map<String, Integer> batchCounterMap = new HashMap<>();
//
//		List<String> keyValueList = new ArrayList<>();
//
//		List<IdAndValuePair> valuePairList = new ArrayList<>();
//
//		try {
//
//			productionDetailsObject = productionDetailsRepository.productionDetailsResponse();
//
//			for (Object[] result : productionDetailsObject) {
//				PunchingBmrProductionDetailsResponse response = new PunchingBmrProductionDetailsResponse();
//				response.setSaleOrder((BigDecimal) result[0]);
//				response.setSaleOrderItem((BigDecimal) result[1]);
//				response.setOrderNumber((String) result[2]);
//				response.setQuantity((BigDecimal) result[3]);
//				response.setBags((BigDecimal) result[4]);
//				response.setPoNumber((String) result[5]);
//				response.setMaterial((String) result[6]);
//				response.setProductionDescription((String) result[7]);
//				response.setBagWeight((BigDecimal) result[8]);
//
////				String key = response.getSaleOrder() + "-" + response.getSaleOrderItem();
//				String key = response.getSaleOrder().toString() + response.getSaleOrderItem().toString();
//				int suffix = batchCounterMap.getOrDefault(key, 0) + 1;
//				batchCounterMap.put(key, suffix);
//
//				String batchNo = key + "-" + suffix;
//				
//
//				keyValueList.add(batchNo);
//
//				for (String temp : keyValueList) {
//					Long id = (long) 1;
//					IdAndValuePair lovResponse = new IdAndValuePair();
//					lovResponse.setId(id);
//					lovResponse.setValue(temp);
//
//					valuePairList.add(lovResponse);
//					id++;
//
//				}
//
////	            response.setMapVariable(batchCounterMap);
//				productionDetailsList.add(response);
//			}
//
//		} catch (Exception ex) {
//
//			String msg = ex.getMessage();
//			logger.error("Unable to Get Production Details" + msg);
//			ex.printStackTrace();
//
//			return new ResponseEntity(new ApiResponse(false, "Failed to Get Production Details" + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//
//		return new ResponseEntity(valuePairList, HttpStatus.OK);
//	}
	
	public ResponseEntity<?> fetchProductionDetailsSAP() {

	    List<PunchingBmrProductionDetailsResponse> productionDetailsList = new ArrayList<>();
	    List<Object[]> productionDetailsObject = new ArrayList<>();
	    Map<String, Integer> batchCounterMap = new HashMap<>();
	    List<IdAndValuePair> valuePairList = new ArrayList<>();

	    try {
	        productionDetailsObject = productionDetailsRepository.productionDetailsResponse();

	        Long id = 1L; // Initialize id outside the loop

	        for (Object[] result : productionDetailsObject) {
	            PunchingBmrProductionDetailsResponse response = new PunchingBmrProductionDetailsResponse();
	            response.setSaleOrder((BigDecimal) result[0]);
	            response.setSaleOrderItem((BigDecimal) result[1]);
	            response.setOrderNumber((String) result[2]);
	            response.setQuantity((BigDecimal) result[3]);
	            response.setBags((BigDecimal) result[4]);
	            response.setPoNumber((String) result[5]);
	            response.setMaterial((String) result[6]);
	            response.setProductionDescription((String) result[7]);
	            response.setBagWeight((BigDecimal) result[8]);

	            // Concatenate SaleOrder and SOitem without separator, then add suffix
	            String key = response.getSaleOrder().toString() + response.getSaleOrderItem().toString();
	            int suffix = batchCounterMap.getOrDefault(key, 0) + 1;
	            batchCounterMap.put(key, suffix);

	            String batchNo = key + "-" + suffix;

	            // Create IdAndValuePair and add to valuePairList
	            IdAndValuePair lovResponse = new IdAndValuePair();
	            lovResponse.setId(id++);
	            lovResponse.setValue(batchNo);
	            valuePairList.add(lovResponse);

	            productionDetailsList.add(response);
	        }

	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        logger.error("Unable to Get Production Details" + msg);
	        ex.printStackTrace();

	        return new ResponseEntity<>(new ApiResponse(false, "Failed to Get Production Details" + msg),
	                HttpStatus.BAD_REQUEST);
	    }

	    return new ResponseEntity<>(valuePairList, HttpStatus.OK);
	}

	
	
//	public ResponseEntity<?> fetchBatchNumberSAP() {
//		
//		List<String> batchNumberList = new LinkedList<String>();
//		
//		List<IdAndValuePair> valuePairList = new LinkedList<IdAndValuePair>();
//		
//		try {
//			
//			batchNumberList = productionDetailsRepository.productionDetailsBatchNumber();
//			
//			Long id = (long) 1;
//			
//			for(String batchNo : batchNumberList) {
//				
//				IdAndValuePair values = new IdAndValuePair();
//				values.setValue(batchNo);
//				values.setId(id);
//				
//				valuePairList.add(values);
//				
//				String incrementedBatchNo = getProductionBatchNoIncrements(batchNo);
//				
//				System.out.println("increement" + incrementedBatchNo);
//				
//				if (!batchNo.equals(incrementedBatchNo)) {
//					IdAndValuePair incrementedValue = new IdAndValuePair();
//					incrementedValue.setValue(incrementedBatchNo);
//					incrementedValue.setId(id);
//					valuePairList.add(incrementedValue);
////					id++;
//				}
//				
//			}
//			id++;
//			
//		} catch (Exception ex) {
//
//			String msg = ex.getMessage();
//			logger.error("Unable to get Production Details" + msg);
//			ex.printStackTrace();
//
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to get production details" + ex.getMessage()));
//		}
//		
//		return ResponseEntity.status(HttpStatus.OK).body(valuePairList);
//	}
//	
//	
//	// GET INCREMENTING PRODUCTION LOV
//
//		public String getProductionBatchNoIncrements(String batchNo) {
//
//			List<String> productionList = new ArrayList<>();
//
//			String productionBatchNo = batchNo;
//
//			try {
//
//				Optional<String> statusOpt = productionDetailsRepository.checkStatusByBatchNo(batchNo);
//
//				if (statusOpt.isPresent()) {
//
//					String status = statusOpt.get();
//
//					if (status.equalsIgnoreCase("Open")) {
//
//						String[] batchNoParts = batchNo.split("-");
//						int number = Integer.parseInt(batchNoParts[1]);
//						number++;
//
//						productionBatchNo = batchNoParts[0] + "-" + number;
//						return productionBatchNo;
//
//					} else {
//						return batchNo;
//					}
//
//				} else {
//					return batchNo;
//				}
//
//			} catch (Exception ex) {
//
//				String msg = ex.getMessage();
//				logger.error("Unable to Get Batch for Production Details" + msg);
//				ex.printStackTrace();
//
//				return "Failed to Get Batch for Production Details";
//			}
//
//		}
//	
	
	
	public ResponseEntity<?> getProductionDetailsLoV() {
		List<String> productionBatchDb = new ArrayList<>();
		List<String> productionnextBatch = new ArrayList<>();
		List<String> updatedProductionLov = new ArrayList<>();
		List<IdAndValuePair> productionDetailsLov = new ArrayList<>();
		try {
			// FROM SAP
			productionBatchDb = productionDetailsRepository.productionDetailsBatchNumber();
			// INCREMENTAL FOR OPEN BATCHES
			productionnextBatch = productionDetailsRepository.fetchOpenBatches();

			updatedProductionLov.addAll(productionBatchDb);
			updatedProductionLov.addAll(productionnextBatch);
			// SET ID AND VALUE PAIR
			for (String prod : updatedProductionLov) {
				Long id = (long) 1;
				IdAndValuePair value = new IdAndValuePair();
				value.setValue(prod);
				value.setId(id);
				productionDetailsLov.add(value);
				id++;
			}
			logger.info("*** Production in Database" + productionBatchDb.size());
			logger.info("*** Production in Next Batch" + productionnextBatch.size());
			logger.info("*** Updated Production" + updatedProductionLov.size());
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Get Batch for Production Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Get Batch for Production Details" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(productionDetailsLov, HttpStatus.OK);
	}
	
	
	public ResponseEntity<?> fetchBatchNumberSAP() {
	    
	    List<String> batchNumberList = new LinkedList<>();
	    List<IdAndValuePair> valuePairList = new LinkedList<>();

	    try {
	        
	        batchNumberList = productionDetailsRepository.productionDetailsBatchNumber();
	        
	        Long id = 1L; // Initialize id
	        
	        for (String batchNo : batchNumberList) {
	            
	            // Add the original batch number
	            IdAndValuePair values = new IdAndValuePair();
	            values.setValue(batchNo);
	            values.setId(id++);
	            valuePairList.add(values);
	            
	            // Get the incremented batch number, if applicable
	            String incrementedBatchNo = getProductionBatchNoIncrements(batchNo);
	            System.out.println("Incremented BatchNo: " + incrementedBatchNo);
	            
	            // Add incremented batch number if it's different from the original
	            if (!batchNo.equals(incrementedBatchNo)) {
	                IdAndValuePair incrementedValue = new IdAndValuePair();
	                incrementedValue.setValue(incrementedBatchNo);
	                incrementedValue.setId(id++);
	                valuePairList.add(incrementedValue);
	            }
	        }
	        
	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        logger.error("Unable to get Production Details: " + msg);
	        ex.printStackTrace();

	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	            .body(new ApiResponse(false, "Failed to get production details: " + ex.getMessage()));
	    }
	    
	    return ResponseEntity.status(HttpStatus.OK).body(valuePairList);
	}

	// GET INCREMENTING PRODUCTION LOV
	public String getProductionBatchNoIncrements(String batchNo) {

	    String productionBatchNo = batchNo;

	    try {
	        Optional<String> statusOpt = productionDetailsRepository.checkStatusByBatchNo(batchNo);

	        if (statusOpt.isPresent()) {
	            String status = statusOpt.get();
	            if (status.equalsIgnoreCase("Open")) {
	                String[] batchNoParts = batchNo.split("-");
	                int number = Integer.parseInt(batchNoParts[1]);
	                number++;

	                productionBatchNo = batchNoParts[0] + "-" + number;
	                return productionBatchNo;
	            }
	        }
	        return batchNo;

	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        logger.error("Unable to get batch for production details: " + msg);
	        ex.printStackTrace();
	        return "Failed to get batch for production details";
	    }
	}

	
	
		// GET SAP DATA BASED ON BATCH NUMBER
	
	public ResponseEntity<?> getProductionDetailsByOrder(String batchNumber, String orderNumber, String fromDate, String toDate) {
		
		List<Object[]> productionDetailsResponse = new ArrayList<Object[]>();
		List<PunchingBmrProductionDetailsResponse> list = new ArrayList<PunchingBmrProductionDetailsResponse>();
		
		try {
			
			String[] batchNoParts = batchNumber.split("-");
			String genNumber = "";
			String batchNo = "";
			if (batchNoParts.length > 1) {
				genNumber = batchNoParts[1];
				batchNo = batchNoParts[0];
				System.out.println("Generated Number" + genNumber);
				System.out.println("Generated Number" + batchNo);
			}
			productionDetailsResponse = productionDetailsRepository.productionResponseByBatchOrder(batchNo, orderNumber);

			for (Object[] result : productionDetailsResponse) {

				PunchingBmrProductionDetailsResponse response = new PunchingBmrProductionDetailsResponse();
				response.setSaleOrder((BigDecimal) result[0]);
				response.setSaleOrderItem((BigDecimal) result[1]);
				response.setOrderNumber((String) result[2]);
				response.setQuantity((BigDecimal) result[3]);
				response.setBags((BigDecimal) result[7]);
				response.setPoNumber((String) result[4]);
				response.setMaterial((String) result[5]);
				response.setProductionDescription((String) result[6]);

				// Calculate box quantity
				response.setBoxQuantity(response.getQuantity().divide(response.getBags(), RoundingMode.HALF_UP));

				// Validate and parse fromDate and toDate
				LocalDate fromLocalDate = null;
				LocalDate toLocalDate = null;

				if (fromDate != null && !fromDate.isEmpty()) {
					try {
						fromLocalDate = LocalDate.parse(fromDate);
					} catch (DateTimeParseException e) {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid fromDate format: " + fromDate),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "fromDate cannot be null or empty"),
							HttpStatus.BAD_REQUEST);
				}

				if (toDate != null && !toDate.isEmpty()) {
					try {
						toLocalDate = LocalDate.parse(toDate);
					} catch (DateTimeParseException e) {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid toDate format: " + toDate),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "toDate cannot be null or empty"),
							HttpStatus.BAD_REQUEST);
				}

				logger.info("*** gdjfkghjlk");

				// SPLIT BATCH_NO

				BigDecimal farQuantityBag = BigDecimal.ZERO;
				BigDecimal farQuantityBox = BigDecimal.ZERO;

				if (genNumber.equals("1")) {
					farQuantityBag = BigDecimal.ZERO;
					farQuantityBox = BigDecimal.ZERO;
				} else {
					farQuantityBag = productionDetailsRepository.soFarPackQtyBag(batchNo);
					farQuantityBox = productionDetailsRepository.soFarPackQtyBox(batchNo);
				}

				// Fetch data for the given date range
				BigDecimal nbagDate = productionDetailsRepository.productionBagsOnDate(orderNumber, fromLocalDate,
						toLocalDate);
				BigDecimal nocDate = productionDetailsRepository.productionBagNocOnDate(orderNumber, fromLocalDate,
						toLocalDate);

				// PACKED QTY IN BAGS AND BOXES
//					BigDecimal packQtyBag = productionDetailsRepository.packedQtyInBags(orderNo);
//					BigDecimal packQtyBox = productionDetailsRepository.packedQtyInBoxes(orderNo);

				response.setBagPackDate(nbagDate != null ? nbagDate.toString() : "--");
				response.setBoxPackDate(nocDate != null ? nocDate.toString() : "--");
				response.setBoxPackQty(farQuantityBox);
				response.setBagPackQty(farQuantityBag);

				// Add the response to the list
				list.add(response);
			}
			
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Production Details" + msg);
			ex.printStackTrace();

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to get production details" + ex.getMessage()));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(list);
		
	}
	
	
	// SAVE PRODUCTION DETAILS

		@SuppressWarnings("unchecked")
		public ResponseEntity<?> saveProductionDetails(BudsBmrProductionDetails productionDetails,
				HttpServletRequest http) {

			SCAUtil sca = new SCAUtil();

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			try {
				
				if (productionDetails.getProductionId() != null) {

					BudsBmrProductionDetails existing = productionDetailsRepository
							.findById(productionDetails.getProductionId()).orElse(null);

					if (existing != null) {

						productionDetails.setCreatedAt(existing.getCreatedAt());
						productionDetails.setCreatedBy(existing.getCreatedBy());
					}
				}

				if (userRole.equals("ROLE_SUPERVISOR") || userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

					productionDetails.setSupervisiorStatus(AppConstants.supervisorSave);
					productionDetails.setSupervisiorName(productionDetails.getSupervisiorName());

					Long id1 = userRepository.getUsernameByUserId(productionDetails.getSupervisiorName());
					productionDetails.setSupervisiorId(id1);
					productionDetails.setSupervisiorDate(date);

					productionDetailsRepository.save(productionDetails);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not save  Details"),
							HttpStatus.BAD_REQUEST);
				}

			} catch (Exception ex) {

				String msg = ex.getMessage();
				logger.error("Unable to save Production Details" + msg);
				ex.printStackTrace();

				return new ResponseEntity(new ApiResponse(false, "Failed to save Production Details" + msg),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity(productionDetails, HttpStatus.OK);

		}
	
		
		// SUBMIT PRODUCTION DETAILS

		public ResponseEntity<?> submitProductionDetails(BudsBmrProductionDetails productionDetails,
				HttpServletRequest http) {

			SCAUtil sca = new SCAUtil();

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			try {
				
				if (productionDetails.getProductionId() != null) {

					BudsBmrProductionDetails existing = productionDetailsRepository
							.findById(productionDetails.getProductionId()).orElse(null);

					if (existing != null) {

						productionDetails.setCreatedAt(existing.getCreatedAt());
						productionDetails.setCreatedBy(existing.getCreatedBy());
					}
				}

				if (userRole.equals("ROLE_SUPERVISOR") || userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

					productionDetails.setSupervisiorStatus(AppConstants.supervisorApprovedStatus);
					productionDetails.setSupervisiorName(productionDetails.getSupervisiorName());

					Long id1 = userRepository.getUsernameByUserId(productionDetails.getSupervisiorName());
					productionDetails.setSupervisiorId(id1);
					productionDetails.setSupervisiorDate(date);

					if (productionDetails.getPoStatus().equalsIgnoreCase("OPEN")) {
						String[] batchNoParts = productionDetails.getBatchNo().split("-");
						int number = Integer.parseInt(batchNoParts[1]);
						number++;
						String productionBatchNo = batchNoParts[0] + "-" + number;
						productionDetails.setNextBatch(productionBatchNo);
						logger.info("*** !!! Current Batch No !!!***" + productionDetails.getBatchNo());
						logger.info("*** !!! Next Batch No !!!***" + productionDetails.getNextBatch());
					}
					productionDetailsRepository.save(productionDetails);
					
				} else if(userRole.equalsIgnoreCase(AppConstantsBuds.qa) || userRole.equalsIgnoreCase(AppConstantsBuds.qaManager)) {

					productionDetails.setQaStatus(AppConstants.qaApprovedStatus);
					productionDetails.setQaName(productionDetails.getQaName());

					Long id1 = userRepository.getUsernameByUserId(productionDetails.getQaName());
					productionDetails.setQaId(id1);
					productionDetails.setQaDate(date);

					productionDetailsRepository.save(productionDetails);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not Submit  Details"),
							HttpStatus.BAD_REQUEST);
				}
			} catch (Exception ex) {

				String msg = ex.getMessage();
				logger.error("Unable to Submit Production Details" + msg);
				ex.printStackTrace();

				return new ResponseEntity(new ApiResponse(false, "Failed to Submit Production Details" + msg),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity(productionDetails, HttpStatus.OK);

		}
		
			// GET ORDER BY BATCH NO
		
		public ResponseEntity<?> getOrderNoByBatchNo(String batchNumber) {
			
			List<String> orderList = new LinkedList<String>();
			
			List<IdAndValuePair> orderValueList = new LinkedList<IdAndValuePair>();
			
			try {
				
				orderList = productionDetailsRepository.getOrderByBatchNo(batchNumber);
				
				Long id = (long) 1;
				
				for(String value : orderList) {
					IdAndValuePair pairValue = new IdAndValuePair();
					pairValue.setValue(value);
					pairValue.setId(id);
					
					orderValueList.add(pairValue);
				}
				
				id++;
				
			} catch (Exception ex) {

				String msg = ex.getMessage();
				logger.error("Unable to get Production Details" + msg);
				ex.printStackTrace();

				return new ResponseEntity(new ApiResponse(false, "Failed to get Production Details" + msg),
						HttpStatus.BAD_REQUEST);
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(orderValueList);
		}
		
		
			// GET SUBMITTED PRODUCTION DETAILS
		
		public ResponseEntity<?> getSubmittedProductionDetaillsByBatchNumber(String batchNumber) {
			
			List<BudsBmrProductionDetails> productionDetails = new LinkedList<BudsBmrProductionDetails>();
			
			try {
				productionDetails = productionDetailsRepository.productionDetailsByBatchNumber(batchNumber);
			} catch (Exception ex) {

				String msg = ex.getMessage();
				logger.error("Unable to get Production Details" + msg);
				ex.printStackTrace();

				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, " Failed to get Production Details") + ex.getMessage());
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(productionDetails);
		}
		
		
		// ENCLOSURE LIST
		
	public ResponseEntity<?> saveEnclosureList(BudsBmrEnclosureListHeader enclosureList, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			if (userRole.equals("ROLE_SUPERVISOR")) {
				enclosureList.setSupervisiorStatus(AppConstants.supervisorApprovedStatus);
				enclosureListRepository.save(enclosureList);
			} 
			
			else if(userRole.equalsIgnoreCase(AppConstantsBuds.qa) || userRole.equalsIgnoreCase(AppConstantsBuds.qaManager)) {
				
				if(enclosureList.getSupervisiorStatus().equals(AppConstants.supervisorApprovedStatus)) {
					
					enclosureList.setQaStatus(AppConstants.qaApprovedStatus);
					enclosureListRepository.save(enclosureList);
				}
				else {
					return new ResponseEntity(new ApiResponse(false, "Supervisor not yet submitted"), HttpStatus.BAD_REQUEST);
				}
			}
			
			else {
				return new ResponseEntity(new ApiResponse(false, userRole + "not authorized to submit "),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Equipment Annexure Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to get Equipment Annexure Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(enclosureList, HttpStatus.OK);
	}
	
	// 10. GET ENCLOSURE LIST

		public ResponseEntity<?> getEnclosureListOrder(String order) {

			List<BudsBmrEnclosureListHeader> enclosureList = new ArrayList<>();

			try {

				enclosureList = enclosureListRepository.getEnclosureListByOrder(order);

			} catch (Exception ex) {

				String msg = ex.getMessage();
				logger.error("Unable to get Enclosure List Details" + msg);
				ex.printStackTrace();

				return new ResponseEntity(new ApiResponse(false, "Failed to get Enclosure List Details" + msg),
						HttpStatus.BAD_REQUEST);
			}

			return ResponseEntity.status(HttpStatus.OK).body(enclosureList);

		}
		
		
		public ResponseEntity<?> saveQualityRelease(BudsBmrQualityReleaseHeader qualityRelease, HttpServletRequest http) {

			SCAUtil sca = new SCAUtil();

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			try {

				if(userRole.equalsIgnoreCase(AppConstantsBuds.qa) || userRole.equalsIgnoreCase(AppConstantsBuds.qaManager)
						|| userRole.equalsIgnoreCase(AppConstantsBuds.qaDesignee)) {
					
					qualityRelease.setStatus(AppConstants.qaSave);

					qualityRelease.setDepartment("Cotton Buds");

					for (BudsBmrQualityReleaseLine qualityLine : qualityRelease.getDetails()) {
						qualityLine.setQualityRecord(qualityRelease);
						qualityLine.setQaName(qualityLine.getQaName());

						Long qaId = userRepository.getUsernameByUserId(qualityLine.getQaName());
//						qualityLine.setQaStatus(AppConstants.qaSave);
//						qualityLine.setQaDate(qualityLine.getQaDate());
					}

					qualityReleaseRepository.save(qualityRelease);

				} else {
					return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to save Quality Release"),
							HttpStatus.BAD_REQUEST);
				}

			} catch (Exception ex) {

				String msg = ex.getMessage();
				logger.error("Unable to Submit Quality Release List Details" + msg);
				ex.printStackTrace();

				return new ResponseEntity(new ApiResponse(false, "Failed to Save Quality Release List Details" + msg),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity(new ApiResponse(true, "Quality Release saved Successfully"), HttpStatus.OK);
		
			
		}
		
		// SUBMIT QUALITY RELEASE
		
		public ResponseEntity<?> submitQualityRelease(BudsBmrQualityReleaseHeader qualityRelease, HttpServletRequest http) {


			SCAUtil sca = new SCAUtil();

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			try {

				if(userRole.equalsIgnoreCase(AppConstantsBuds.qa) || userRole.equalsIgnoreCase(AppConstantsBuds.qaManager)
						|| userRole.equalsIgnoreCase(AppConstantsBuds.qaDesignee)){

					qualityRelease.setStatus(AppConstants.qaApprovedStatus);
					qualityRelease.setDepartment("CottonBuds");

					for (BudsBmrQualityReleaseLine qualityLine : qualityRelease.getDetails()) {
						qualityLine.setQualityRecord(qualityRelease);
						qualityLine.setQaName(qualityLine.getQaName());

						Long qaId = userRepository.getUsernameByUserId(qualityLine.getQaName());
						
//						qualityLine.setQaDate(qualityLine.getQaDate());
					}

					qualityReleaseRepository.save(qualityRelease);

				} else {
					return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to submit Quality Release"),
							HttpStatus.BAD_REQUEST);
				}

			} catch (Exception ex) {

				String msg = ex.getMessage();
				logger.error("Unable to Submit Quality Release List Details" + msg);
				ex.printStackTrace();

				return new ResponseEntity(new ApiResponse(false, "Failed to Submit Quality Release List Details" + msg),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity(new ApiResponse(true, "Quality Release Submitted Successfully"), HttpStatus.OK);
		
		}
		
		
		// GET QUALITY RELEASE BY BATCH NUMBER
		
		public ResponseEntity<?> getQualityReleaseByBatchNo(String batchNumber) {
			
			List<BudsBmrQualityReleaseHeader> qualityReleaseList = new LinkedList<BudsBmrQualityReleaseHeader>();
			
			try {
				
				qualityReleaseList = qualityReleaseRepository.qualityReleaseByBatchNo(batchNumber);
				
			} catch (Exception ex) {

				String msg = ex.getMessage();
				logger.error("Unable to get Quality Release List Details" + msg);
				ex.printStackTrace();

				return new ResponseEntity(new ApiResponse(false, "Failed to get Quality Release List Details" + msg),
						HttpStatus.BAD_REQUEST);
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(qualityReleaseList);
		}
	
		
		// PROCESS DEVIATION RECORD
		
	public ResponseEntity<?> saveProcessDeviationRecordHeader(BudsBmrProcessDeviationRecordHeader deviationRecord, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			if (userRole.equals("ROLE_SUPERVISOR")) {

				deviationRecord.setOrderNo(deviationRecord.getOrderNo());
				deviationRecord.setStatus(AppConstants.supervisorSave);

				for (BudsBmrProcessDeviationRecordLine deviationLine : deviationRecord.getDetails()) {

					deviationLine.setDeviationRecord(deviationRecord);
					deviationLine.setSupervisorName(deviationLine.getSupervisorName());

					Long superId = userRepository.getUsernameByUserId(deviationLine.getSupervisorName());
					deviationLine.setSupervisorId(superId);
					deviationLine.setSupervisorStatus(AppConstants.supervisorSave);
					deviationLine.setSupervisorDate(deviationLine.getSupervisorDate());
				}

				processDeviationRecordRepository.save(deviationRecord);

			} else {
				return new ResponseEntity(
						new ApiResponse(false, userRole + "not authorized to save process deviation records"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to save process deviation Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to save process deviation records " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(deviationRecord, HttpStatus.OK);
	
	}
		
	public ResponseEntity<?> submitProcessDeviation(BudsBmrProcessDeviationRecordHeader deviationRecord,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			if (userRole.equals("ROLE_SUPERVISOR")) {

				deviationRecord.setOrderNo(deviationRecord.getOrderNo());
				deviationRecord.setStatus(AppConstants.supervisorApprovedStatus);

				for (BudsBmrProcessDeviationRecordLine deviationLine : deviationRecord.getDetails()) {

					deviationLine.setDeviationRecord(deviationRecord);
					deviationLine.setSupervisorName(deviationLine.getSupervisorName());

					Long superId = userRepository.getUsernameByUserId(deviationLine.getSupervisorName());
					deviationLine.setSupervisorId(superId);
					deviationLine.setSupervisorStatus(AppConstants.supervisorApprovedStatus);
					deviationLine.setSupervisorDate(deviationLine.getSupervisorDate());
				}

				processDeviationRecordRepository.save(deviationRecord);

			} else if(userRole.equalsIgnoreCase(AppConstantsBuds.qa) || userRole.equalsIgnoreCase(AppConstantsBuds.qaManager)) {

				deviationRecord.setOrderNo(deviationRecord.getOrderNo());
				deviationRecord.setStatus(AppConstants.qaApprovedStatus);

				for (BudsBmrProcessDeviationRecordLine deviationLine : deviationRecord.getDetails()) {
					deviationLine.setDeviationRecord(deviationRecord);
					deviationLine.setQaName(deviationLine.getQaName());

					Long superId = userRepository.getUsernameByUserId(deviationLine.getQaName());
					deviationLine.setQaId(superId);
//					deviationLine.setQaStatus(AppConstants.qaApprovedStatus);
//					deviationLine.setQaDate(deviationLine.getQaDate());
				}

				processDeviationRecordRepository.save(deviationRecord);

			} else {
				return new ResponseEntity(
						new ApiResponse(false, userRole + "not authorized to save process deviation records"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to save process deviation Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to save process deviation records " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(deviationRecord, HttpStatus.OK);
	}

		// GET PROCESS DEVIATION BY BATCH NO
	
	public ResponseEntity<?> getProcessDeviationByOrder(String orderNo) {

		List<BudsBmrProcessDeviationRecordHeader> deviationRecordList = new ArrayList<>();

		try {

			deviationRecordList = processDeviationRecordRepository.deviationByBatchNo(orderNo);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get process deviation Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to get process deviation records " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(deviationRecordList, HttpStatus.OK);
	}
	
	
		// PRODUCT RECONILLATION 
	
	// PRODUCT RECONCILIATION 
//	public Map<String, Object> productReconciliation(String orderNumber, String batchNumber, String startDate, String endDate) {
//	    BigDecimal yield = BigDecimal.ZERO;
//	    Map<String, Object> response = new HashMap<>();
//
//	    try {
//	        // Validate input parameters
////	        if (orderNumber == null || orderNumber.isEmpty()) {
////	            throw new IllegalArgumentException("Order number cannot be null or empty");
////	        }
////	        if (batchNumber == null || batchNumber.isEmpty()) {
////	            throw new IllegalArgumentException("Batch number cannot be null or empty");
////	        }
////	        if (startDate == null || endDate == null) {
////	            throw new IllegalArgumentException("Start date and end date cannot be null");
////	        }
//
//	        // Parse and validate dates
//	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//	        LocalDate parsedStartDate;
//	        LocalDate parsedEndDate;
//	        try {
//	            parsedStartDate = LocalDate.parse(startDate, formatter);
//	            parsedEndDate = LocalDate.parse(endDate, formatter);
//	        } catch (Exception e) {
//	            throw new IllegalArgumentException("Invalid date format. Expected format is yyyy-MM-dd");
//	        }
//
//	        // Format dates for repository queries
//	        String formattedStartDate = parsedStartDate.format(formatter);
//	        String formattedEndDate = parsedEndDate.format(formatter);
//
//	        // Fetch input and output quantities
//	        BigDecimal inputQuantity = productionDetailsRepository.inputQuantity(orderNumber, formattedStartDate, formattedEndDate);
//	        BigDecimal outputQuantity = productionDetailsRepository.outputQuantity(orderNumber, formattedStartDate, formattedEndDate);
//
//	        // Calculate yield
//	        if (inputQuantity != null && inputQuantity.compareTo(BigDecimal.ZERO) > 0) {
//	            yield = outputQuantity.divide(inputQuantity, 2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));
//	        }
//
//	        // Populate response map
//	        response.put("inputQuantity", inputQuantity != null ? inputQuantity : BigDecimal.ZERO);
//	        response.put("outputQuantity", outputQuantity != null ? outputQuantity : BigDecimal.ZERO);
//	        response.put("yield", yield + "%");
//
//	    } catch (IllegalArgumentException ex) {
//	        logger.error("Validation error: " + ex.getMessage(), ex);
//	        response.put("error", ex.getMessage());
//	    } catch (Exception ex) {
//	        logger.error("Unable to get product reconciliation: " + ex.getMessage(), ex);
//	        response.put("error", "An unexpected error occurred");
//	    }
//
//	    return response;
//	}
	
	
	public Map<String, Object> productReconciliation(String orderNumber, String batchNumber, String startDate, String endDate) {
	    
	    BigDecimal yield = BigDecimal.ZERO;
	    Map<String, Object> response = new HashMap<>();
	    
	    try {
	        // Convert String dates to LocalDate
	        LocalDate start = LocalDate.parse(startDate);
	        LocalDate end = LocalDate.parse(endDate);
	        
	        // Call repository methods
	        BigDecimal inputQuantity = productionDetailsRepository.inputQuantity(orderNumber, start, end);
	        BigDecimal outputQuantity = productionDetailsRepository.outputQuantity(orderNumber, start, end);
	        
	        // Calculate yield
	        if (inputQuantity != null && inputQuantity.compareTo(BigDecimal.ZERO) > 0) {
	            yield = outputQuantity.divide(inputQuantity, 2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));
	        }
	        
	        // Prepare response
	        response.put("inputQuantity", inputQuantity);
	        response.put("outputQuantity", outputQuantity);
	        response.put("yield", yield + "%");
	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        logger.error("Unable to get product Reconciliation: " + msg);
	        ex.printStackTrace();
	    }
	    
	    return response;
	}

	

	
//public Map<String, Object> productReconciliation(String orderNumber,String batchNumber,String startDate, String endDate) {
//		
//		BigDecimal yield = BigDecimal.ZERO;
//		
//		Map<String, Object> response = new HashMap<>();
//		try {
//			
//			BigDecimal inputQuantity = productionDetailsRepository.inputQuantity(orderNumber, startDate, endDate);
//			
//			BigDecimal outputQuantity = productionDetailsRepository.outputQuantity(orderNumber, startDate, endDate);
//			
//			if (inputQuantity != null && inputQuantity.compareTo(BigDecimal.ZERO) > 0) {
//	            yield = outputQuantity.divide(inputQuantity, 2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));
//	        }
//			
//	        response.put("inputQuantity", inputQuantity);
//	        response.put("outputQuantity", outputQuantity);
//	        response.put("yield", yield + "%");
//			
//		} catch(Exception ex) {
//			
//			String msg = ex.getMessage();
//			logger.error("Unable to get product Reconillation" + msg);
//			ex.printStackTrace();
//			
//		}
//		
//		return response;
//		
//	}
		
		// STOPPAGE 
	
	public ResponseEntity<?> saveStoppage(BudsBmrStoppageHeader stoppageHeader, HttpServletRequest http) {
		
		SCAUtil sca = new SCAUtil();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);

		try {

			if (userRole.equals("ROLE_SUPERVISOR")) {

				stoppageHeader.setFromdate(stoppageHeader.getFromdate());
				stoppageHeader.setTodate(stoppageHeader.getTodate());
				stoppageHeader.setMachineName(stoppageHeader.getMachineName());
				stoppageHeader.setStatus(AppConstants.supervisorSave);
				stoppageHeader.setSupervisor_id(userId);

				for (BudsBmrStoppageLine stop : stoppageHeader.getDetails()) {

					stop.setStoppageRecord(stoppageHeader);

				}

				stoppageHeaderRepository.save(stoppageHeader);

			} else {
				return new ResponseEntity(new ApiResponse(false, userRole + "not authorized to submit stoppage"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to save Stoppage Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to save stoppage records: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(stoppageHeader, HttpStatus.OK);
		
	}
	
	
		// SUBMIT STOPPAGE 
	
	public ResponseEntity<?> submitStoppage(BudsBmrStoppageHeader stoppageHeader, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);

		try {

			if (userRole.equals("ROLE_SUPERVISOR")) {

				stoppageHeader.setFromdate(stoppageHeader.getFromdate());
				stoppageHeader.setTodate(stoppageHeader.getTodate());
				stoppageHeader.setMachineName(stoppageHeader.getMachineName());
				stoppageHeader.setStatus(AppConstants.supervisorApprovedStatus);
				stoppageHeader.setSupervisor_id(userId);

				for (BudsBmrStoppageLine stop : stoppageHeader.getDetails()) {

					stop.setStoppageRecord(stoppageHeader);

				}

				stoppageHeaderRepository.save(stoppageHeader);

			} else {
				return new ResponseEntity(new ApiResponse(false, userRole + "not authorized to submit stoppage"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to save Stoppage Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to save stoppage records: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(stoppageHeader, HttpStatus.OK);
		
	}
	
	
		// GET STOPPAGE DETAILS BY BATCH NUMBER
	
	public ResponseEntity<?> getStoppageDetailsByBatch(String batchNumber) {
		
		List<BudsBmrStoppageHeader> stoppageDetails = new LinkedList<BudsBmrStoppageHeader>();
		
		try {
			
			stoppageDetails = stoppageHeaderRepository.getStoppageBatchNo(batchNumber);
			
		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Stoppage Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get stoppage records: " + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(stoppageDetails);
	}
	
	
		// GET STOPPAGE FROM SAP 
	
	public ResponseEntity<?> getStoppageSAPData(String fromDate, String toDate, String shiftId) {
		
		List<BudsStoppageRequest> budsStoppageList = new LinkedList<BudsStoppageRequest>();
		
		try {
			
			List<Object[]> results = stoppageHeaderRepository.getStoppageRecord(fromDate, toDate, shiftId);
			
			budsStoppageList = results.stream().map(record -> {
		        BudsStoppageRequest stoppageRequest = new BudsStoppageRequest();
		        stoppageRequest.setPackDate((Date) record[0]);
		        stoppageRequest.setShiftId((BigDecimal) record[1]);
		        stoppageRequest.setType((String) record[2]);
		        stoppageRequest.setMachine((String) record[3]);
		        stoppageRequest.setFromTime((String) record[4]);
		        stoppageRequest.setToTime((String) record[5]);
		        stoppageRequest.setReason((String) record[6]);
		        stoppageRequest.setTotalHours((BigDecimal) record[7]);
		        return stoppageRequest;
		    }).collect(Collectors.toList());
			
		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Stoppage Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get stoppage records: " + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(budsStoppageList);
		
	}
	
			// BMR REWORK FORM 
	
	// BMR REWORK FORM 
	
	public ResponseEntity<?> saveReworkForm(BudsBmrRework reworkForm, HttpServletRequest http) {
		
		String userRole = getUserRole();
		
		SCAUtil sca = new SCAUtil();
		
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			Long id = reworkForm.getId();
			
			BudsBmrRework existingReworkReport;
			
			String[] ignoreProps = {
						"supervisorStatus", "supervisorSign", "supervisorSaveBy", "supervisorSavedOn", 
	                      "supervisorSavedId", "supervisorSubmittedId", "supervisorSubmittedBy", 
	                      "supervisorSubmittedOn", "hodStatus", "hodSign", "hodSubmittedBy", 
	                      "hodSubmittedId", "hodSubmittedDate", "qaStatus", "qaSign", "qaSubmittedBy", 
	                      "qaSubmittedId", "qaSubmittedDate", "createdBy", "createdAt"
			};
			
			if(userRole.equalsIgnoreCase(AppConstantsBuds.supervisor)) {
				
				if(id!= null) {
					
					existingReworkReport = reworkRepository.reworkObjectById(id);
					
					BeanUtils.copyProperties(reworkForm,existingReworkReport, ignoreProps);
					
				} else {
					existingReworkReport = reworkForm;
				}
				
				reworkForm.setSupervisorStatus(AppConstants.supervisorSave);
				reworkForm.setSupervisorSaveBy(userName);
				reworkForm.setSupervisorSavedId(userId);
				reworkForm.setSupervisorSavedOn(date);
				
				reworkRepository.save(reworkForm);
				
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, userRole + " not authorized to save Bmr Rework for " + reworkForm.getDepartmentName()));
			}
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			logger.error("Unable to save Bmr Rework report !!!" + msg);

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to save Bmr Rework report !!!" + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(reworkForm);
	
		
	}
	
	public ResponseEntity<?> submitReworkForm(BudsBmrRework reworkForm, HttpServletRequest http) {
		
		String userRole = getUserRole();
		
		SCAUtil sca = new SCAUtil();
		
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			Long id = reworkForm.getId();
			
			BudsBmrRework existingReworkReport;
			
			String[] ignoreProps = {
						"supervisorStatus", "supervisorSign", "supervisorSaveBy", "supervisorSavedOn", 
	                      "supervisorSavedId", "supervisorSubmittedId", "supervisorSubmittedBy", 
	                      "supervisorSubmittedOn", "hodStatus", "hodSign", "hodSubmittedBy", 
	                      "hodSubmittedId", "hodSubmittedDate", "qaStatus", "qaSign", "qaSubmittedBy", 
	                      "qaSubmittedId", "qaSubmittedDate", "createdBy", "createdAt"
			};
			
			if(userRole.equalsIgnoreCase(AppConstantsBuds.supervisor)) {
				
				if(id!= null) {
					
					existingReworkReport = reworkRepository.reworkObjectById(id);
					
					BeanUtils.copyProperties(reworkForm,existingReworkReport, ignoreProps);
					
				} else {
					existingReworkReport = reworkForm;
				}
				
				reworkForm.setSupervisorStatus(AppConstants.supervisorApprovedStatus);
				reworkForm.setSupervisorSubmittedBy(userName);;
				reworkForm.setSupervisorSubmittedId(userId);
				reworkForm.setSupervisorSubmittedOn(date);;
				
				reworkForm.setHodStatus(AppConstants.waitingStatus);
				reworkForm.setQaStatus("");
				
				reworkRepository.save(reworkForm);
				
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, userRole + " not authorized to submit Bmr Rework for " + reworkForm.getDepartmentName()));
			}
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			logger.error("Unable to submit Bmr Rework report !!!" + msg);

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to submit Bmr Rework report !!!" + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Supervisor Submitted Successfully !!!"));
	}
	
	public ResponseEntity<?> approveReworkForm(ApproveResponse approveResponse, HttpServletRequest http) {
		
		String userRole = getUserRole();
		
		SCAUtil sca = new SCAUtil();
		
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			Long id = approveResponse.getId();
			
			BudsBmrRework reworkReport = reworkRepository.reworkObjectById(id);
			
			String supervisorStatus = reworkReport.getSupervisorStatus();
			
			String hodStatus = reworkReport.getHodStatus();
			
			if(userRole.equalsIgnoreCase(AppConstantsBuds.hod) || userRole.equalsIgnoreCase(AppConstantsBuds.designee)) {
				
				if(supervisorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
					
					
					reworkReport.setHodSubmittedBy(userName);
					reworkReport.setHodSign(userName);
					reworkReport.setHodSubmittedId(userId);
					reworkReport.setHodSubmittedDate(date);
					
					
					
					if(approveResponse.getStatus().equalsIgnoreCase(AppConstantsBuds.approvalStatus)) {
						
						reworkReport.setHodStatus(AppConstants.hodApprovedStatus);
						reworkReport.setQaStatus(AppConstants.waitingStatus);
						
						reworkRepository.save(reworkReport);
						
						return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Hod Approved Successfully"));
						
					} else if(approveResponse.getStatus().equalsIgnoreCase(AppConstantsBuds.rejectedStatus)) {
						
						reworkReport.setHodStatus(AppConstants.hodRejectedStatus);
						reworkReport.setRejectReason(approveResponse.getRemarks());
						
						reworkRepository.save(reworkReport);
						
						return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Hod Rejected Successfully"));
						
					} else {
						return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Invalid Status !!!"));
					}
					
				} else {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Invalid Status !!!"));
				}
				
			} else if(userRole.equalsIgnoreCase(AppConstantsBuds.qa)) {
				
				String qaStatus = reworkReport.getQaStatus();
				
				if(hodStatus.equalsIgnoreCase(AppConstants.hodApprovedStatus) && qaStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
					
					reworkReport.setQaSubmittedBy(userName);
					reworkReport.setQaSign(userName);
					reworkReport.setQaSubmittedId(userId);
					reworkReport.setQaSubmittedDate(date);
					
					
					
					if(approveResponse.getStatus().equalsIgnoreCase(AppConstantsBuds.approvalStatus)) {
						
						reworkReport.setQaStatus(AppConstants.qaApprovedStatus);
						reworkRepository.save(reworkReport);
						
						return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "QA Approved Successfully"));
						
					} else if(approveResponse.getStatus().equalsIgnoreCase(AppConstantsBuds.rejectedStatus)) {
						
						reworkReport.setQaStatus(AppConstants.qaRejectedStatus);
						reworkReport.setRejectReason(approveResponse.getRemarks());
						reworkRepository.save(reworkReport);
						
						return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "QA Rejected Successfully"));
						
					} else {
						return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Invalid Status !!!"));
					}
					
				} else {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Invalid Status !!!"));
				}
				
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, userRole + " not authroized to approve bmr rework form !!!"));
			}
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			logger.error("Unable to approve Bmr Rework report !!!" + msg);

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to approve Bmr Rework report !!!" + msg));
		}
		
	}
	
	
	public ResponseEntity<?> getReworkFormByBatchNumber(String batchNumber) {
		
		String userRole = getUserRole();
		
		List<BudsBmrRework> reworkForm = new LinkedList<BudsBmrRework>();
		
		try {
			
			reworkForm = reworkRepository.reworkListByBmrNumber(batchNumber);
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			logger.error("Unable to get Bmr Rework report !!!" + msg);

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to get Bmr Rework report !!!" + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(reworkForm);
	}
	
	
		// PACKING MATERIAL 
	
	public ResponseEntity<?> savePackingMaterial(BudsBmrPackingMaterialHeader packingMaterialHeader, HttpServletRequest http) {
		


		SCAUtil sca = new SCAUtil();
		try {
			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {
				packingMaterialHeader.setForm_no("PRD03/F-25");
				packingMaterialHeader.setStatus(AppConstants.supervisorSave);

				packingMaterialHeader.setSupervisor_id(userId);
				packingMaterialRepository.save(packingMaterialHeader);

				for (BudsBmrPackingMaterialLine lineDetails : packingMaterialHeader.getPckdetails()) {
					Long Id = packingMaterialHeader.getPack_id();
					lineDetails.setPack_id(Id);
					packingMaterialLineRepository.save(lineDetails);

				}
			}

			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not save  Details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			logger.error("*** Unable to Save*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(packingMaterialHeader, HttpStatus.CREATED);
	
		
	}
	
	
	public ResponseEntity<?> SubmitPackingMeterialIssue(BudsBmrPackingMaterialHeader details,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {
			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PRD03/F-25");
				details.setStatus(AppConstantDryGoods.supervisorApprovedStatus);

				details.setSupervisor_id(userId);
				packingMaterialRepository.save(details);

				for (BudsBmrPackingMaterialLine lineDetails : details.getPckdetails()) {
					Long Id = details.getPack_id();
					lineDetails.setPack_id(Id);
					packingMaterialLineRepository.save(lineDetails);

				}
			}

			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not Submit  Details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			logger.error("*** Unable to Submit*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Submit " + msg), HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(details, HttpStatus.CREATED);
	}
	
	
	public ResponseEntity<?> GetPackingMeterial(String batch_no) {
		List<BudsBmrPackingMaterialHeader> bmrSummaryDateList;

		try {
			bmrSummaryDateList = packingMaterialRepository.getDetails25(batch_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}
	
	
	public ResponseEntity<?> GetPackingMeterialPde(String batch_no, String fromdate, String todate) {
		
		List<Map<String, Object>> GetPackingMeterialPde;

		try {
			GetPackingMeterialPde = packingMaterialRepository.getpackingmeterialpde(batch_no, fromdate,
					todate);

			return new ResponseEntity<>(GetPackingMeterialPde, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}
	
			// BMR PRINT 
	
	public ResponseEntity<?> getBudsPrint(String batchNumber) {
		
		List<BudsBmrProductionDetails> productionDetails = new LinkedList<BudsBmrProductionDetails>();
		
		List<BudsBmrPackingMaterialHeader> packingMaterialHeaders = new LinkedList<BudsBmrPackingMaterialHeader>();
		
		List<BudsBmrEquipmentAnnexureHeader> equipmentProcessList = new LinkedList<BudsBmrEquipmentAnnexureHeader>();
		
		List<BudsBmrVerificationOfRecordsHeader> verificationRecordList = new LinkedList<BudsBmrVerificationOfRecordsHeader>();
		
		List<BudsBmrManufacturerStepsHeader> manufacturerStepsList = new LinkedList<BudsBmrManufacturerStepsHeader>();
		
		List<BudsBmrStoppageHeader> stoppageList = new LinkedList<BudsBmrStoppageHeader>();
		
		List<BudsBmrEnclosureListHeader> enclosureList = new LinkedList<BudsBmrEnclosureListHeader>();
		
		List<BudsBmrProcessDeviationRecordHeader> processDeviationRecordList = new LinkedList<BudsBmrProcessDeviationRecordHeader>();
		
		List<BudsBmrPostProductionReview> postProductionList = new LinkedList<BudsBmrPostProductionReview>();
		
		List<BudsBmrQualityReleaseHeader> qualityReleaseList = new LinkedList<BudsBmrQualityReleaseHeader>();
		
		List<BudsBmrProductRelease> productReleaseList = new LinkedList<BudsBmrProductRelease>();
		
		List<BudsBmrRework> reworkForm = new LinkedList<BudsBmrRework>();
		
		Map<String, Object> productReconillation = new HashMap<String, Object>();
		
		BudsBmrPrintRequest printRequest = new BudsBmrPrintRequest();
		
		try {
			
			productionDetails = productionDetailsRepository.productionDetailsByBatchNumber(batchNumber);
			
			packingMaterialHeaders = packingMaterialRepository.getDetails25(batchNumber);
			
			equipmentProcessList = equipmentDetailsRepository.getEquipmentDetailsByOrder(batchNumber);
			
			verificationRecordList = verificationRecordHeaderRepository.verificationRecordByBatch(batchNumber);
			
			manufacturerStepsList = manufacturingStepsRepository.manufacturingStepsByBatchNo(batchNumber);
			
			stoppageList = stoppageHeaderRepository.getStoppageBatchNo(batchNumber);
			
			enclosureList = enclosureListRepository.getEnclosureListByOrder(batchNumber);
			
			processDeviationRecordList = processDeviationRecordRepository.deviationByBatchNo(batchNumber);
			
			postProductionList = postProductionReviewRepository.postProductionReviewByBatchNo(batchNumber);
			
			qualityReleaseList = qualityReleaseRepository.qualityReleaseByBatchNo(batchNumber);
			
			productReleaseList = productReleaseRepository.productReleaseByBatchNo(batchNumber);
			
			reworkForm = reworkRepository.reworkListByBmrNumber(batchNumber);
			
			BudsBmrProductionDetails productionDetailsObj = productionDetailsRepository.productionDetailsByBatchNo(batchNumber);
			
			String orderNumber = productionDetailsObj.getOrderNumber();
			
			String fromDate = productionDetailsObj.getManufactureStartDate();
			
			String toDate = productionDetailsObj.getManufactureEndDate();
			
			productReconillation = productReconciliation(orderNumber,batchNumber,fromDate, toDate);
			
				// SET INTO RESPONSE
			
			printRequest.setProductionDetails(productionDetails);
			printRequest.setPackingMaterialHeaders(packingMaterialHeaders);
			printRequest.setEquipmentDetails(equipmentProcessList);
			printRequest.setVerificationRecords(verificationRecordList);
			printRequest.setManufactureSteps(manufacturerStepsList);
			printRequest.setReconillation(productReconillation);
			printRequest.setStoppageList(stoppageList);
			printRequest.setEnclosureList(enclosureList);
			printRequest.setProcessDeviation(processDeviationRecordList);
			printRequest.setPostProductionReview(postProductionList);
			printRequest.setQualityRelease(qualityReleaseList);
			printRequest.setProductRelease(productReleaseList);
			printRequest.setReworkList(reworkForm);
			
		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Bmr Print Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get bmr print records: " + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(printRequest);
	}
	
	
	public ResponseEntity<?> budsTraceability(int julianDay, int year) {
		
		List<String> budsBmrList = new LinkedList<String>();
		
		try {
			
			String bmrDate = convertJulianToDate(julianDay, year);
			
			budsBmrList = productionDetailsRepository.fetchBmrListByStartEndDate(bmrDate);
			
				
			
		} catch(Exception ex) {
			
			String msg = ex.getMessage();
			logger.error("Unable to get Buds Traceability Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get buds traceability records: " + msg),
					HttpStatus.BAD_REQUEST);
			
		}
		return ResponseEntity.status(HttpStatus.OK).body(budsBmrList);
		
	}
	
	
		// GET DETAILS BY BATCH NUMBER FOR TRACEABILITY 
	
	public ResponseEntity<?> budsTraceabilityByBatchNumber(String batchNumber) {
		
		BudsBmrProductionDetails productionDetails = new BudsBmrProductionDetails();
		
		List<BudsBmrPackingMaterialHeader> packingMaterial = new LinkedList<BudsBmrPackingMaterialHeader>();
		
		List<BudsDailyProductionSliverHeader> sliverHeaderList = new LinkedList<BudsDailyProductionSliverHeader>();
		
		List<BudsDailyProductionSliverLine> sliverProductionLine = new LinkedList<BudsDailyProductionSliverLine>();
		
		BudsTraceabilityRequest traceabilityRequest = null;
		
		try {
			
			productionDetails = productionDetailsRepository.productionDetailsByBatchNo(batchNumber);
			
			packingMaterial = packingMaterialRepository.getDetails25(batchNumber);
			
				// GET ORDER, FROM DATE AND TO DATE FOR FETCHING SLIVER PRODUCTION
			
			String orderNumber = productionDetails.getOrderNumber();
			
			String fromDate = productionDetails.getManufactureStartDate();
			
			String toDate = productionDetails.getManufactureEndDate();
			
			
			sliverHeaderList = sliverProductionRepository.fetchDailyProductionByOrderDate(orderNumber, fromDate, toDate);
			
			for(BudsDailyProductionSliverHeader list : sliverHeaderList) {
				
				sliverProductionLine.addAll(list.getSliverLine());
				
			}
			
				
				// FROM SLIVER LINE GET CANNO AND MCN AND COMPARE WITH SLIVER MAKING 
			
			
			traceabilityRequest.setPackingMaterial(packingMaterial);
			traceabilityRequest.setProductionDetails(productionDetails);
//			traceabilityRequest.setSliverLine(sliverProductionLine);
			
				return ResponseEntity.status(HttpStatus.OK).body(traceabilityRequest);
			
		} catch(Exception ex) {
			
			String msg = ex.getMessage();
			logger.error("Unable to get Buds Traceability Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get buds traceability records: " + msg),
					HttpStatus.BAD_REQUEST);
			
		}
		
	}
	
	
	public String convertJulianToDate(int julianDay, int year) {
		
		Calendar calendar = Calendar.getInstance();
        calendar.clear();            
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.DAY_OF_YEAR, julianDay);
		
        Date date = calendar.getTime();
        
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        
        String finalDate = dateFormat.format(date);
        
        return finalDate;
	}
	
	
	
	
	
	public ResponseEntity<?> getBallsTraceblityBatchNo(String julianDay, String yearLastTwoDigits) {

		List<Map<String, Object>> getBatchNo;

		try {

			String date = bMR001GoodsProductionDetailsRepository.getDateFromJulianDay(julianDay, yearLastTwoDigits);

			if (date == null || date.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(false, "No data found for the given Julian Day and Year"),
						HttpStatus.NOT_FOUND);
			}

			getBatchNo = productionDetailsRepository.fetchBatchNumberListByStartEndDate(date);

		} catch (Exception ex) {
			String msg = ex.getMessage();
//			logger.error("Unable to Get Production Reconciliation Details: " + msg);
			ex.printStackTrace();
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to Get Production Reconciliation Details: " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(getBatchNo, HttpStatus.OK);
	}
	
	
	
	public ResponseEntity<?> budsTraceabilityByBatchNumbers(String batchNumber) {
		try {

			BudsTraceabilityRequest traceabilityRequest = buildTraceabilityRequest(batchNumber);
			return ResponseEntity.ok(traceabilityRequest);
		} catch (Exception ex) {
			logger.error("Error fetching traceability data for batch {}: {}", batchNumber, ex.getMessage(), ex);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse(false, "Error fetching traceability data"));
		}
	}

	// TRACEABILITY BY BATCH NUMBER

	private BudsTraceabilityRequest buildTraceabilityRequest(String batchNumber) throws Exception {

		BudsTraceabilityRequest traceabilityRequest = new BudsTraceabilityRequest();

		List<String> orderList = new LinkedList<String>();

		List<List<BmrSummary>> bmrSummary = new ArrayList();

		Set<String> listBmrNo = new HashSet<>();

		Set<String> bmrList = new HashSet<>();

		// Fetch production details
		BudsBmrProductionDetails productionDetails = productionDetailsRepository
				.productionDetailsByBatchNo(batchNumber);
		if (productionDetails == null) {
			throw new Exception("Production details not found for batch number: " + batchNumber);
		}

		traceabilityRequest.setProductionDetails(productionDetails);

		// Fetch packing materials
		List<BudsBmrPackingMaterialHeader> packingMaterial = packingMaterialRepository.getDetails25(batchNumber);
		traceabilityRequest.setPackingMaterial(packingMaterial);

		// Fetch sliver production details by bmr production details 
		String orderNumber = productionDetails.getOrderNumber();
		String fromDate = productionDetails.getManufactureStartDate();
		String toDate = productionDetails.getManufactureEndDate();

		List<BudsDailyProductionSliverHeader> sliverHeaderList = sliverProductionRepository
				.fetchDailyProductionByOrderDate(orderNumber, fromDate, toDate);

		// Extract sliver lines
		List<BudsDailyProductionSliverLine> sliverProductionLine = new LinkedList<>();
		for (BudsDailyProductionSliverHeader header : sliverHeaderList) {
			sliverProductionLine.addAll(header.getSliverLine());
		}

		List<QaOnlineInspectionReport> onlineInspectionReport = onlineInspectionRepository.onlineInspectionTraceForBuds(batchNumber);
		
		
			// FROM QA (IF NEEDED)
		List<FinalInspectionReportF037> finalInspectionReport = finalInspectionRepository.finalInspectionQAFormTrace(batchNumber);
		
		
			// FROM BUDS DEPT 
		List<FinalInspectionReportF037> finalInspectionBudsReport = finalInspectionRepository.finalInspectionBudsFormTrace(batchNumber);

		traceabilityRequest.setOnlineInspection(onlineInspectionReport);
		traceabilityRequest.setFinalInspectionReport(finalInspectionReport);
		traceabilityRequest.setFinalInspectionBudsReport(finalInspectionBudsReport);

		// Fetch sliver making lines
		List<BudsTraceabilitySliverLineDTO> sliverMakingLine = fetchOrderfromCanNumber2(sliverProductionLine);
		traceabilityRequest.setSliverLines(sliverMakingLine);

		List<BudsBaleRequest> request = new LinkedList<BudsBaleRequest>();

		orderList = sliverMakingLine.stream().map(BudsTraceabilitySliverLineDTO::getOrderNumber).distinct()
				.collect(Collectors.toList());

		// AB CONS - BLEACHING DATA 

		for (String temp : orderList) {

			List<String> baleList = bMR001GoodsProductionDetailsRepository.getBaleByOrder(temp);

			for (String bale : baleList) {
				System.out.println(" ******************************** bale " + bale + " ********************");
				BudsBaleRequest abcons = new BudsBaleRequest();
				abcons.setBale(bale);

				Map<String, Object> bmrNetWt = bMR001GoodsProductionDetailsRepository.getBmrByBale(bale);
				if (bmrNetWt != null) {

					String bmrNo = (String) bmrNetWt.get("bmr_no");
					BigDecimal netWt = (BigDecimal) bmrNetWt.get("NetWt");

					System.out.println(" ******************************** netwt " + netWt + " bmr " + bmrNo
							+ " ********************");
					abcons.setNetWt(netWt);
					abcons.setBmr(bmrNo);

					bmrList.add(bmrNo);

					if (bmrNo != null) {
						String laydown = bMR001GoodsProductionDetailsRepository.getLaydownByBmr(bmrNo);
						abcons.setLaydown(laydown);

						List<String> subBatch = bMR001GoodsProductionDetailsRepository.getBatchByBmr(bmrNo);
						abcons.setBatchNo(subBatch);

						List<String> rmBatch = bMR001GoodsProductionDetailsRepository.getRmBatchByLaydown(laydown);
						abcons.setRmBatch(rmBatch);

						System.out.println(" ******************************** laydown " + laydown + " subbatch "
								+ subBatch + " ********************");
						System.out.println(
								" ******************************** rmbatch " + rmBatch + " ********************");
					}
				}

				request.add(abcons);
			}

		}

		for (String bmr : bmrList) {
			List<BmrSummary> summary = bleachBmrSummaryRepository.getSummaryByBMR(bmr);
			bmrSummary.add(summary);
		}

		traceabilityRequest.setBaleRequest(request);
		traceabilityRequest.setChemicalDetails(bmrSummary);

		return traceabilityRequest;
	}

	//FETCH SLIVER LINES

	public List<BudsTraceabilitySliverLineDTO> fetchOrderfromCanNumber2(
			List<BudsDailyProductionSliverLine> productionLine) {

		List<BudsTraceabilitySliverLineDTO> lineRecordDTO = new LinkedList<>();

		try {

			List<String> canNumbers = productionLine.stream()
					.flatMap(line -> Stream.of(line.getSliverCanNumber1(), line.getSliverCanNumber2()))
					.filter(Objects::nonNull).distinct().collect(Collectors.toList());

			List<String> machineNames = productionLine.stream()
					.flatMap(line -> Stream.of(line.getCardingMachineNumber1(), line.getCardingMachineNumber2()))
					.filter(Objects::nonNull).distinct().collect(Collectors.toList());


			List<Object[]> filteredSliverLines = sliverProductionRepository.fetchSliverLinesWithHeaderData(canNumbers,
					machineNames);

			lineRecordDTO = filteredSliverLines.stream().map(temp -> new BudsTraceabilitySliverLineDTO((String) temp[0], // CAN_NO
					(String) temp[1],
					(String) temp[2],
					(String) temp[3],
					(String) temp[4],
					(String) temp[5])).collect(Collectors.toList());

		} catch (Exception ex) {
			logger.error("Failed to fetch SLiver Making lines {}", ex.getMessage(), ex);
		}

		return lineRecordDTO;
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
