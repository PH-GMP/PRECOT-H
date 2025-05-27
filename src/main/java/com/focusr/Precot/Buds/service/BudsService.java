package com.focusr.Precot.Buds.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

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

import com.focusr.Precot.Buds.model.BudsDailyProductionSliverHeader;
import com.focusr.Precot.Buds.model.BudsDailyProductionSliverLine;
import com.focusr.Precot.Buds.model.BudsDailyProductionStoppageLine;
import com.focusr.Precot.Buds.model.BudsEquipmentUsuageHeader;
import com.focusr.Precot.Buds.model.BudsEquipmentUsuageLine;
import com.focusr.Precot.Buds.model.BudsLogbookHeader;
import com.focusr.Precot.Buds.model.BudsLogbookProductionLine;
import com.focusr.Precot.Buds.model.BudsProductChangeOver;
import com.focusr.Precot.Buds.model.audit.BudsDailyProductionSliverHeaderHistory;
import com.focusr.Precot.Buds.model.audit.BudsDailyProductionSliverLineHistory;
import com.focusr.Precot.Buds.model.audit.BudsDailyProductionStoppageLineHistory;
import com.focusr.Precot.Buds.model.audit.BudsEquipmentUsuageHeaderHistory;
import com.focusr.Precot.Buds.model.audit.BudsEquipmentUsuageLineHistory;
import com.focusr.Precot.Buds.model.audit.BudsLogbookHeaderHistory;
import com.focusr.Precot.Buds.model.audit.BudsLogbookProductionLineHistory;
import com.focusr.Precot.Buds.model.audit.BudsProductChangeOverHistory;
import com.focusr.Precot.Buds.repository.BudsDailyProductionSliveLineRepository;
import com.focusr.Precot.Buds.repository.BudsDailyProductionSliveLineRepositoryHistory;
import com.focusr.Precot.Buds.repository.BudsDailyProductionSliverHeaderHistoryRepository;
import com.focusr.Precot.Buds.repository.BudsDailyProductionSliverHeaderRepository;
import com.focusr.Precot.Buds.repository.BudsDailyProductionStoppageLineRepository;
import com.focusr.Precot.Buds.repository.BudsDailyProductionStoppageLineRepositoryHistory;
import com.focusr.Precot.Buds.repository.BudsEquipmentUsuageHeaderRepository;
import com.focusr.Precot.Buds.repository.BudsEquipmentUsuageHeaderRepositoryHistory;
import com.focusr.Precot.Buds.repository.BudsEquipmentUsuageLineRepository;
import com.focusr.Precot.Buds.repository.BudsEquipmentUsuageLineRepositoryHistory;
import com.focusr.Precot.Buds.repository.BudsLogbookHeaderRepository;
import com.focusr.Precot.Buds.repository.BudsLogbookHeaderRepositoryHistory;
import com.focusr.Precot.Buds.repository.BudsLogbookLineRepository;
import com.focusr.Precot.Buds.repository.BudsLogbookLineRepositoryHistory;
import com.focusr.Precot.Buds.repository.BudsProductChangeOverRepository;
import com.focusr.Precot.Buds.repository.BudsProductChangeOverRepositoryHistory;
import com.focusr.Precot.Buds.util.AppConstantsBuds;
import com.focusr.Precot.Buds.util.BudsMailFunction;
import com.focusr.Precot.mssql.database.model.drygoods.LogBookHeader;
import com.focusr.Precot.mssql.database.model.padpunching.PunchingHandSanitationF24;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.service.drygoods.GoodsService5;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;

@Service
public class BudsService {

	Logger logger = LoggerFactory.getLogger(GoodsService5.class);

	SCAUtil sca = new SCAUtil();

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BudsMailFunction mailFunction;
	
		// PRODUCT CHANGE OVER
	
	@Autowired
	private BudsProductChangeOverRepository productChangeOverRepository;
	
	@Autowired
	private BudsProductChangeOverRepositoryHistory productChangerOverRepositoryHistory;
	
		// DAILY PRODUCTION 
	
	@Autowired
	private BudsDailyProductionSliverHeaderRepository sliverProductionHeaderRepository;
	
	@Autowired
	private BudsDailyProductionSliverHeaderHistoryRepository sliverProductionHeaderHistoryRepository;
	
	@Autowired
	private BudsDailyProductionSliveLineRepository sliverLineRepository;
	
	@Autowired
	private BudsDailyProductionStoppageLineRepository stoppageLineRepository;
	
	@Autowired
	private BudsDailyProductionSliveLineRepositoryHistory sliverLineHistoryRepository;
	
	@Autowired
	private BudsDailyProductionStoppageLineRepositoryHistory stoppageLineHistoryRepository;
	
		// LOGBOOK 
	
	@Autowired
	private BudsLogbookHeaderRepository logbookRepository;
	
	@Autowired
	private BudsLogbookLineRepository logbookLineRepository;
	
	@Autowired
	private BudsLogbookHeaderRepositoryHistory logbookRepositoryHistory;
	
	@Autowired
	private BudsLogbookLineRepositoryHistory logbookLineRepositoryHistory;
	
		// EQUIPMENT DETAILS 
	
	@Autowired
	private BudsEquipmentUsuageHeaderRepository equipmentHeaderRepository;
	
	@Autowired
	private BudsEquipmentUsuageLineRepository equipmentLineRepository;
	
	@Autowired
	private BudsEquipmentUsuageHeaderRepositoryHistory equipmentHeaderRepositoryHistory;
	
	@Autowired
	private BudsEquipmentUsuageLineRepositoryHistory equipmentLineRepositoryHistory;
	
	/**
	 * PRODUCT CHANGE OVER - F09
	 */
	
	public ResponseEntity<?> saveProductChangeOver(BudsProductChangeOver productChangeOver, HttpServletRequest http) {
		
		BudsProductChangeOver punchingExistingObj = null;
		
		try {
			
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			
			Long id = productChangeOver.getProductId();
			
			String deptName = "COTTON_BUDS";
			
			if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
				
				if(id != null) {
					punchingExistingObj = productChangeOverRepository.productChangeoverDetailsById(id);
					
//					productChangeOver.setCreatedAt(punchingExistingObj.getCreatedAt());
//					productChangeOver.setCreatedBy(punchingExistingObj.getCreatedBy());
					
					String[] ignoreProps = { "hodName", "hodStatus", "hodId", "hodDate",
	                         "supervisorSubmittedName", "supervisorSavedName", "supervisorSavedDate", "supervisorSubmittedDate",
	                         "qaApprovedDate", 
	                         "supervisorName", "supervisorStatus", "supervisorId", "supervisorDate",
	                         "qaName", "qaStatus", "qaId", "qaDate" , "createdAt", "createdBy" };
					
					BeanUtils.copyProperties(productChangeOver, punchingExistingObj,ignoreProps);
					
				} else {
					punchingExistingObj = productChangeOver;
				}
				
				productChangeOver.setDeptName(deptName);
				productChangeOver.setSupervisorStatus(AppConstants.supervisorSave);
				productChangeOver.setSupervisorSavedName(userName);
				productChangeOver.setSupervisorId(userId);
				productChangeOver.setSupervisorSavedDate(date);
				
				productChangeOverRepository.save(productChangeOver);
				
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
	
		// SUBMIT PRODUCT CHANGE OVER
	
	public ResponseEntity<?> submitProductChangeOver(BudsProductChangeOver productChangeOver, HttpServletRequest http) {
		
		BudsProductChangeOver punchingExistingObj = null;
		
		try {
			
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			
			Long id = productChangeOver.getProductId();
			
			if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
				
				if(id != null) {
					punchingExistingObj = productChangeOverRepository.productChangeoverDetailsById(id);
					
					String[] ignoreProps = { "hodName", "hodStatus", "hodId", "hodDate",
	                         "supervisorSubmittedName", "supervisorSavedName", "supervisorSavedDate", "supervisorSubmittedDate",
	                         "qaApprovedDate", 
	                         "supervisorName", "supervisorStatus", "supervisorId", "supervisorDate",
	                         "qaName", "qaStatus", "qaId", "qaDate", "createdAt", "createdBy"  };

					
//					productChangeOver.setCreatedAt(punchingExistingObj.getCreatedAt());
//					productChangeOver.setCreatedBy(punchingExistingObj.getCreatedBy());
//					
////					productChangeOver.setDeptName(deptName);
//					productChangeOver.setSupervisorSavedName(punchingExistingObj.getSupervisorSavedName());
//					productChangeOver.setSupervisorSavedDate(punchingExistingObj.getSupervisorSavedDate());
					
					BeanUtils.copyProperties(productChangeOver,punchingExistingObj, ignoreProps);
				}  else {
					punchingExistingObj = productChangeOver;
				}
				
				productChangeOver.setSupervisorStatus(AppConstants.supervisorApprovedStatus);
//				productChangeOver.setDeptName(deptName);
				productChangeOver.setSupervisorSubmittedName(userName);
				productChangeOver.setSupervisorId(userId);
				productChangeOver.setSupervisorName(userName);
				productChangeOver.setSupervisorSubmittedDate(date);
				
				productChangeOver.setQaStatus(AppConstants.waitingStatus);
				productChangeOver.setHodStatus("");
				
					// SAVE IMAGE
				
				productChangeOverRepository.save(productChangeOver);
				
						// SAVE HISTORY 
				
				BudsProductChangeOverHistory productChangeOverHistoryF03 = new BudsProductChangeOverHistory();
				BeanUtils.copyProperties(productChangeOver, productChangeOverHistoryF03, "productId");
				
					// SET VERSION BASED ON UNIQUE FIELDS
				
				String historyDate = productChangeOverHistoryF03.getDate();
				String historyShift = productChangeOverHistoryF03.getSection();
				String historyMachine = productChangeOverHistoryF03.getMachineName();
				String department = productChangeOverHistoryF03.getDeptName();
				String orderNumber1 = productChangeOverHistoryF03.getOrderNo1();
				
				int version = productChangerOverRepositoryHistory.getMaximumVersion(orderNumber1).map(temp -> temp + 1).orElse(1);
				
				System.out.println("Version" + version);
				
				productChangeOverHistoryF03.setVersion(version);
				
				
				productChangerOverRepositoryHistory.save(productChangeOverHistoryF03);
				
						// SEND MAIL 
				
				try {

					mailFunction.sendProductChangeOverMailInspector(productChangeOver);
				} catch (Exception ex) {
					
					String msg = ex.getMessage();
					return new ResponseEntity<>(new ApiResponse(false, "Supervisor Submitted, but Unable to send mail to QA Inspector !!!" + msg),
							HttpStatus.OK);
				}
//				
				
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
		
		
		return new ResponseEntity(new ApiResponse(true, "Supervisior Submitted Successfully"), HttpStatus.CREATED);
		
	}
	
	// GET LIST FOR PRODUCT CHANGE OVER
	
	public ResponseEntity<?> getProductChangeOverSummary() {
		
		List<BudsProductChangeOver> productChangeOverF03List = new ArrayList<>();
		
		try {
			String userRole = getUserRole();
			
			if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
				
				productChangeOverF03List = productChangeOverRepository.getPunchingSupervisorSummary();
				
			} else if(userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE") || userRole.equalsIgnoreCase("ROLE_QA"))  {
				productChangeOverF03List = productChangeOverRepository.getPunchingHodQASummary();
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
	
	public ResponseEntity<?> getProductChangeOverDetailsByUnique(String orderNumber) {
		
		List<BudsProductChangeOver> productChangeOverList = new LinkedList<BudsProductChangeOver>();
		
		try {
			
			productChangeOverList = productChangeOverRepository.productChangeOverByOrderNumberList(orderNumber);
			
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Get Product Change Details by Order Number" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Get Product Change over Details" + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(productChangeOverList, HttpStatus.OK);
	}
	
	
	public ResponseEntity<?> approveProductChangeOver(ApproveResponse approveResponse, HttpServletRequest http) {
		
		String userRole = getUserRole();
	    Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	    String userName = userRepository.getUserName(userId);
	    LocalDateTime currentDate = LocalDateTime.now();
	    Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
	    
	    try {
	    	BudsProductChangeOver productChangeOver = productChangeOverRepository.productChangeoverDetailsById(approveResponse.getId());
	    	
	    	BudsProductChangeOverHistory productChangeOverHistory = new BudsProductChangeOverHistory();
	    	
	    	String supervisorStatus = productChangeOver.getSupervisorStatus();
	    	String qaInspectorStatus = productChangeOver.getQaStatus();
	    	String hodStatus = productChangeOver.getHodStatus();
	    	
	    	if(userRole.equalsIgnoreCase(AppConstantsBuds.qa)) {
	    		
	    		if(supervisorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && qaInspectorStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
	    			
	    			if(approveResponse.getStatus().equalsIgnoreCase(AppConstantsBuds.approvalStatus)) {
	    				
	    				productChangeOver.setQaStatus(AppConstantsBuds.qaInspectorApproved);
	    				productChangeOver.setQaId(userId);
	    				productChangeOver.setQaName(userName);
	    				productChangeOver.setQaApprovedDate(date);
	    				
	    				productChangeOver.setHodStatus(AppConstants.waitingStatus);
	    				
	    				productChangeOverRepository.save(productChangeOver);
	    				
	    				// HISTORY -- 
	    				
	    				productChangeOverHistory = productChangerOverRepositoryHistory.findLastSubmittedRecord(productChangeOver.getOrderNo1());
	    				
	    				productChangeOverHistory.setQaStatus(AppConstantsBuds.qaInspectorApproved);
	    				productChangeOverHistory.setQaId(userId);
	    				productChangeOverHistory.setQaName(userName);
	    				productChangeOverHistory.setQaApprovedDate(date);
	    				
	    				productChangerOverRepositoryHistory.save(productChangeOverHistory);
	    				
	    				// SEND MAIL 
						
						try {
							mailFunction.sendproductChangeOverMailHod(productChangeOver);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "QA Inspector Approved, but Unable to send mail to HOD !!!" + ex.getMessage()),
									HttpStatus.OK);
						}
	    				
	    				return new ResponseEntity<>(new ApiResponse(true, userRole + " Approved Successfully"), HttpStatus.OK);
	    				
	    			} else if(approveResponse.getStatus().equalsIgnoreCase(AppConstantsBuds.rejectedStatus)) {
	    				
	    				productChangeOver.setQaStatus(AppConstantsBuds.qaInspectorRejected);
	    				productChangeOver.setQaId(userId);
	    				productChangeOver.setQaName(userName);
	    				productChangeOver.setQaApprovedDate(date);
	    				
	    				productChangeOver.setHodStatus("");
	    				productChangeOver.setReason(approveResponse.getRemarks());
	    				
	    				productChangeOverRepository.save(productChangeOver);
	    				
	    				// HISTORY -- 
	    				
	    				productChangeOverHistory = productChangerOverRepositoryHistory.findLastSubmittedRecord(productChangeOver.getOrderNo1());
	    				
	    				productChangeOverHistory.setQaStatus(AppConstantsBuds.qaInspectorRejected);
	    				productChangeOverHistory.setQaId(userId);
	    				productChangeOverHistory.setQaName(userName);
	    				productChangeOverHistory.setQaApprovedDate(date);
	    				
	    				productChangeOverHistory.setReason(approveResponse.getRemarks());
	    				
	    				productChangerOverRepositoryHistory.save(productChangeOverHistory);
	    				
	    				return new ResponseEntity<>(new ApiResponse(true, userRole + " Rejected Successfully"), HttpStatus.OK);
	    			}
	    			
	    		} else {
	    			return new ResponseEntity(new ApiResponse(false, supervisorStatus + " is not valid for proceed qa Approval"), HttpStatus.BAD_REQUEST);
	    		}
	    		
	    	} else if(userRole.equalsIgnoreCase(AppConstantsBuds.hod) || userRole.equalsIgnoreCase(AppConstantsBuds.designee)) {
	    		
	    		if(supervisorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && qaInspectorStatus.equalsIgnoreCase(AppConstantsBuds.qaInspectorApproved)) {
	    			
	    			if(approveResponse.getStatus().equalsIgnoreCase(AppConstantsBuds.approvalStatus)) {
	    				
	    				productChangeOver.setHodStatus(AppConstants.hodApprovedStatus);
	    				productChangeOver.setHodId(userId);
	    				productChangeOver.setHodName(userName);
	    				productChangeOver.setHodDate(date);
	    				
//	    				productChangeOver.setReason(approveResponse.getRemarks());
	    				
	    				productChangeOverRepository.save(productChangeOver);
	    				
	    					// HISTORY 
	    				
	    				productChangeOverHistory = productChangerOverRepositoryHistory.findLastSubmittedRecord(productChangeOver.getOrderNo1());
	    				
	    				productChangeOverHistory.setHodStatus(AppConstants.hodApprovedStatus);
	    				productChangeOverHistory.setHodId(userId);
	    				productChangeOverHistory.setHodName(userName);
	    				productChangeOverHistory.setHodDate(date);
	    				
	    				productChangerOverRepositoryHistory.save(productChangeOverHistory);
	    				
	    				return new ResponseEntity<>(new ApiResponse(true, userRole + " Approved Successfully"), HttpStatus.OK);
	    				
	    			} else if(approveResponse.getStatus().equalsIgnoreCase(AppConstantsBuds.rejectedStatus)) {
	    				
	    				productChangeOver.setHodStatus(AppConstants.hodRejectedStatus);
	    				productChangeOver.setHodId(userId);
	    				productChangeOver.setHodName(userName);
	    				productChangeOver.setHodDate(date);
	    				
	    				productChangeOver.setReason(approveResponse.getRemarks());
	    				
	    				productChangeOverRepository.save(productChangeOver);
	    				
	    					// HISTORY 
	    				
	    				productChangeOverHistory = productChangerOverRepositoryHistory.findLastSubmittedRecord(productChangeOver.getOrderNo1());
	    				
	    				productChangeOverHistory.setHodStatus(AppConstants.hodRejectedStatus);
	    				productChangeOverHistory.setHodId(userId);
	    				productChangeOverHistory.setHodName(userName);
	    				productChangeOverHistory.setHodDate(date);
	    				
	    				productChangeOverHistory.setReason(approveResponse.getRemarks());
	    				
	    				productChangerOverRepositoryHistory.save(productChangeOverHistory);
	    				
	    				return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "rejected successfully"));
	    			}
	    			
	    		} else {
	    			return new ResponseEntity(new ApiResponse(false, " not valid for proceed Hod Approval Sequence. please check previous approvals !!!"), HttpStatus.BAD_REQUEST);
	    		}
	    		
	    		
	    	} else {
	    		return new ResponseEntity(new ApiResponse(false, userRole + " not authorize for approvals !!!"), HttpStatus.BAD_REQUEST);
	    	}
	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        logger.error("Unable to Approve/Reject Product Change over Summary Details" + msg);
	        ex.printStackTrace();

	        return new ResponseEntity<>(new ApiResponse(false, "Failed to Approve/Reject Product Change over Summary Details: " + msg), HttpStatus.BAD_REQUEST);
	    }
		return null;
	}
	
	public ResponseEntity<?> printProductChangeOver(String date, String machineName) {
		
		List<BudsProductChangeOver> productChangeOverList = new LinkedList<BudsProductChangeOver>();
		
		try {
			
			productChangeOverList = productChangeOverRepository.productChangeoverDetailsPrint(date, machineName);
			
		} catch (Exception ex) {
	        String msg = ex.getMessage();
	        logger.error("Unable to get print for product change over" + msg);
	        ex.printStackTrace();

	        return new ResponseEntity<>(new ApiResponse(false, "Failed to get Product Change over Summary Details: " + msg), HttpStatus.BAD_REQUEST);
	    }
		
		return new ResponseEntity(productChangeOverList, HttpStatus.OK);
	}
	
	
		/**
		 * DAILY PRODUCTION SLIVER MAKING 
		 */
	
//	public ResponseEntity<?> saveProductionSliverMaking(BudsDailyProductionSliverHeader productionDetails, HttpServletRequest http) {
//		
//		BudsDailyProductionSliverHeader existingProductionDetails = null;
//		
//		try {
//			
//			String userRole = getUserRole();
//			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//			String userName = userRepository.getUserName(userId);
//			LocalDateTime currentDate = LocalDateTime.now();
//			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//			
//			Long id = productionDetails.getId();
//			
//			if(userRole.equalsIgnoreCase(AppConstantsBuds.operator)) {
//				
//				if(id != null) {
//					existingProductionDetails = sliverProductionHeaderRepository.productionDetailsbyId(id);
//					
////					productChangeOver.setCreatedAt(punchingExistingObj.getCreatedAt());
////					productChangeOver.setCreatedBy(punchingExistingObj.getCreatedBy());
//					
//					String[] ignoreProps = {
//						    "operator_status", "operator_save_by", "operator_save_on", "operator_save_id",
//						    "operator_submitted_by", "operator_submitted_on", "operator_submitted_id", "operator_sign",
//						    "supervisor_status", "supervisor_submit_on", "supervisor_submit_by", "supervisor_submit_id",
//						    "supervisor_sign", "hod_status", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign",
//						    "hod_signature_image", "operator_signature_image", "supervisor_signature_image",
//						    "createdBy", "createdAt"
//						};
//
//					
//					BeanUtils.copyProperties(productionDetails, existingProductionDetails,ignoreProps);
//					
//				} else {
//					existingProductionDetails = productionDetails;
//				}
//				
//				productionDetails.setOperator_save_by(userName);
//				productionDetails.setOperator_save_id(userId);
//				productionDetails.setOperator_sign(userName);
//				productionDetails.setOperator_save_on(date);
//				productionDetails.setOperator_status(AppConstants.operatorSave);
//				
//				for(BudsDailyProductionSliverLine sliverLine : productionDetails.getSliverLine()) {
//					sliverLine.setSliverProduction(productionDetails);
//				}
//				
//				for(BudsDailyProductionStoppageLine stoppageLine : productionDetails.getStoppageDetails()) {
//					stoppageLine.setStoppage(productionDetails);
//				}
//				
////				productionDetails.getSliverLine().forEach(line -> line.setSliverProduction(productionDetails));
////	            productionDetails.getStoppageDetails().forEach(stoppage -> stoppage.setStoppage(productionDetails));
//				
//				sliverProductionHeaderRepository.save(productionDetails);
//				
//			} else {
//				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, userRole + " not authorized to save sliver daily production details form!"));
//			}
//			
//			
//		} catch (Exception ex) {
//
//			String msg = ex.getMessage();
//			logger.error("Unable to Save Daily Production Sliver Form" + msg);
//			ex.printStackTrace();
//
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to Save Sliver Daily Production Details: " + ex.getMessage()));
//		}
//		
//		return ResponseEntity.ok(productionDetails);
//		
//	}
	
//		public ResponseEntity<?> saveProductionSliverMaking(BudsDailyProductionSliverHeader productionDetails,
//				HttpServletRequest http) {
//			BudsDailyProductionSliverHeader existingProductionDetails = null;
//
//			try {
//				// Get user role and details
//				String userRole = getUserRole();
//				Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//				String userName = userRepository.getUserName(userId);
//				LocalDateTime currentDate = LocalDateTime.now();
//				Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//				Long id = productionDetails.getId();
//
//				if (userRole.equalsIgnoreCase(AppConstantsBuds.operator)) {
//					if (id != null) {
//						// Fetch existing production details from the database
//						existingProductionDetails = sliverProductionHeaderRepository.productionDetailsbyId(id);
//
//						// Copy properties except for the ignored ones
//						String[] ignoreProps = { "operator_status", "operator_save_by", "operator_save_on",
//								"operator_save_id", "operator_submitted_by", "operator_submitted_on",
//								"operator_submitted_id", "operator_sign", "supervisor_status", "supervisor_submit_on",
//								"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "hod_status",
//								"hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign", "hod_signature_image",
//								"operator_signature_image", "supervisor_signature_image", "createdBy", "createdAt" };
//
//						// Update existing production details
//						BeanUtils.copyProperties(productionDetails, existingProductionDetails, ignoreProps);
//						productionDetails = existingProductionDetails; // Update productionDetails reference
//					} else {
//						existingProductionDetails = productionDetails;
//						}
//
//					// Set operator details
//					productionDetails.setOperator_save_by(userName);
//					productionDetails.setOperator_save_id(userId);
//					productionDetails.setOperator_sign(userName);
//					productionDetails.setOperator_save_on(date);
//					productionDetails.setOperator_status(AppConstants.operatorSave);
//					
//					// Ensure bi-directional relationships are set correctly
//					
//					// Ensure sliverLine collection is initialized
//					if (existingProductionDetails.getSliverLine() != null && !existingProductionDetails.getSliverLine().isEmpty()) {
//					    existingProductionDetails.getSliverLine().clear();
//					    existingProductionDetails.getSliverLine().addAll(productionDetails.getSliverLine());
//					} else if (productionDetails.getSliverLine() != null) {
//					    // Initialize the relationship if sliverLine is not null in productionDetails
//					    existingProductionDetails.setSliverLine(new ArrayList<>(productionDetails.getSliverLine()));
//					    for (BudsDailyProductionSliverLine sliverLine : existingProductionDetails.getSliverLine()) {
//					        sliverLine.setSliverProduction(existingProductionDetails);
//					    }
//					}
//
//					// Ensure stoppageDetails collection is initialized
//					if (existingProductionDetails.getStoppageDetails() != null && !existingProductionDetails.getStoppageDetails().isEmpty()) {
//					    existingProductionDetails.getStoppageDetails().clear();
//					    existingProductionDetails.getStoppageDetails().addAll(productionDetails.getStoppageDetails());
//					} else if (productionDetails.getStoppageDetails() != null) {
//					    // Initialize the relationship if stoppageDetails is not null in productionDetails
//					    existingProductionDetails.setStoppageDetails(new ArrayList<>(productionDetails.getStoppageDetails()));
//					    for (BudsDailyProductionStoppageLine stoppageLine : existingProductionDetails.getStoppageDetails()) {
//					        stoppageLine.setStoppage(existingProductionDetails);
//					    }
//					}
//
//
//					// Save or update the production details
//					sliverProductionHeaderRepository.save(productionDetails);
//				} else {
//					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false,
//							userRole + " not authorized to save sliver daily production details form!"));
//				}
//
//			} catch (Exception ex) {
//				String msg = ex.getMessage();
//				logger.error("Unable to Save Daily Production Sliver Form: " + msg);
//				ex.printStackTrace();
//
//				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
//						new ApiResponse(false, "Failed to Save Sliver Daily Production Details: " + ex.getMessage()));
//			}
//
//			return ResponseEntity.ok(productionDetails);
//		}

//	public ResponseEntity<?> saveProductionSliverMaking(BudsDailyProductionSliverHeader productionDetails, HttpServletRequest http) {
//	    BudsDailyProductionSliverHeader existingProductionDetails = null;
//
//	    try {
//	        // Get user role and details
//	        String userRole = getUserRole();
//	        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//	        String userName = userRepository.getUserName(userId);
//	        LocalDateTime currentDate = LocalDateTime.now();
//	        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//	        Long id = productionDetails.getId();
//
//	        if (userRole.equalsIgnoreCase(AppConstantsBuds.operator)) {
//	            if (id != null) {
//	                // Fetch existing production details from the database
//	                existingProductionDetails = sliverProductionHeaderRepository.productionDetailsbyId(id);
//
//	                if (existingProductionDetails != null) {
//	                    String[] ignoreProps = {
//	                        "operator_status", "operator_save_by", "operator_save_on", "operator_save_id", "operator_submitted_by", 
//	                        "operator_submitted_on", "operator_submitted_id", "operator_sign", "supervisor_status", "supervisor_submit_on",
//	                        "supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "hod_status", "hod_submit_on", 
//	                        "hod_submit_by", "hod_submit_id", "hod_sign", "hod_signature_image", "operator_signature_image", 
//	                        "supervisor_signature_image", "createdBy", "createdAt"
//	                    };
//
//	                    // Copy properties except for the ignored ones
//	                    BeanUtils.copyProperties(productionDetails, existingProductionDetails, ignoreProps);
//	                    productionDetails = existingProductionDetails;
//
//	                    // Clear and update lists with new details
//	                    if (existingProductionDetails.getSliverLine() != null && !existingProductionDetails.getSliverLine().isEmpty()) {
//	                        existingProductionDetails.getSliverLine().clear();
//	                        existingProductionDetails.getSliverLine().addAll(productionDetails.getSliverLine());
//	                    } else {
//	                        for (BudsDailyProductionSliverLine sliverLine : productionDetails.getSliverLine()) {
//	                            sliverLine.setSliverProduction(productionDetails);
//	                        }
//	                    }
//
//	                    if (existingProductionDetails.getStoppageDetails() != null && !existingProductionDetails.getStoppageDetails().isEmpty()) {
//	                        existingProductionDetails.getStoppageDetails().clear();
//	                        existingProductionDetails.getStoppageDetails().addAll(productionDetails.getStoppageDetails());
//	                    } else {
//	                        for (BudsDailyProductionStoppageLine stoppageLine : productionDetails.getStoppageDetails()) {
//	                            stoppageLine.setStoppage(productionDetails);
//	                        }
//	                    }
//	                }
//	            }
//
//	            // Set operator details
//	            productionDetails.setOperator_save_by(userName);
//	            productionDetails.setOperator_save_id(userId);
//	            productionDetails.setOperator_sign(userName);
//	            productionDetails.setOperator_save_on(date);
//	            productionDetails.setOperator_status(AppConstants.operatorSave);
//
//	            // Ensure bi-directional relationships are set correctly for new records
//	            for (BudsDailyProductionSliverLine sliverLine : productionDetails.getSliverLine()) {
//	                sliverLine.setSliverProduction(productionDetails);
//	            }
//
//	            for (BudsDailyProductionStoppageLine stoppageLine : productionDetails.getStoppageDetails()) {
//	                stoppageLine.setStoppage(productionDetails);
//	            }
//
//	            // Save or update the production details
//	            sliverProductionHeaderRepository.save(productionDetails);
//	        } else {
//	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, userRole + " not authorized to save sliver daily production details form!"));
//	        }
//
//	    } catch (Exception ex) {
//	        String msg = ex.getMessage();
//	        logger.error("Unable to Save Daily Production Sliver Form: " + msg);
//	        ex.printStackTrace();
//	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to Save Sliver Daily Production Details: " + ex.getMessage()));
//	    }
//
//	    return ResponseEntity.ok(productionDetails);
//	}

	
	public ResponseEntity<?> saveSliverDailyProductionDetails(BudsDailyProductionSliverHeader productionDetails, HttpServletRequest http) {
		
		BudsDailyProductionSliverHeader existingProductionDetails = null; 
		
		try {
			
			// Get user role and details
	        String userRole = getUserRole();
	        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	        String userName = userRepository.getUserName(userId);
	        LocalDateTime currentDate = LocalDateTime.now();
	        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

	        Long id = productionDetails.getId();
	        
	        if(productionDetails.getId() != null) {
	        	
	        	existingProductionDetails = sliverProductionHeaderRepository.productionDetailsbyId(id);
	        	
	        	String[] ignoreProps = {
                        "operator_status", "operator_save_by", "operator_save_on", "operator_save_id", "operator_submitted_by", 
                        "operator_submitted_on", "operator_submitted_id", "operator_sign", "supervisor_status", "supervisor_submit_on",
                        "supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "hod_status", "hod_submit_on", 
                        "hod_submit_by", "hod_submit_id", "hod_sign", "hod_signature_image", "operator_signature_image", 
                        "supervisor_signature_image", "createdBy", "createdAt"
                    };
	        	
	        	BeanUtils.copyProperties(productionDetails,  existingProductionDetails, ignoreProps);
	        } else {
	        	existingProductionDetails = productionDetails;
	        }
			
	        if(userRole.equalsIgnoreCase(AppConstantsBuds.operator)) {
	        	
	        	List<BudsDailyProductionSliverLine> sliverLineDetails = productionDetails.getSliverLine();
	        	
	        	List<BudsDailyProductionStoppageLine> stoppageLineDetails = productionDetails.getStoppageDetails();
	        	
	        	productionDetails.setOperator_save_by(userName);
	            productionDetails.setOperator_save_id(userId);
	            productionDetails.setOperator_sign(userName);
	            productionDetails.setOperator_save_on(date);
	            productionDetails.setOperator_status(AppConstants.operatorSave);
	            
	            productionDetails.setSupervisor_status("");
	            productionDetails.setHod_status("");
	        	
	            productionDetails.setSliverLine(sliverLineDetails);
	            productionDetails.setStoppageDetails(stoppageLineDetails);
	            
	            sliverProductionHeaderRepository.save(productionDetails);
	            
	        } else {
	        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Role not authorize to access the form."));
	        }
			
		} catch (Exception ex) {
	        String msg = ex.getMessage();
	        logger.error("Unable to Save Daily Production Sliver Form: " + msg);
	        ex.printStackTrace();
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to Save Sliver Daily Production Details: " + ex.getMessage()));
	    }
		
		return ResponseEntity.ok(productionDetails);
	}
	
	
		// SUBMIT DAILY SLIVER PRODUCTION 
	
//	public ResponseEntity<?> submitSliverDailyProductionDetails(BudsDailyProductionSliverHeader productionDetails, HttpServletRequest http) {
//		
//		BudsDailyProductionSliverHeader existingProductionDetails = null;
//		
//		try {
//			
//			String userRole = getUserRole();
//			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//			String userName = userRepository.getUserName(userId);
//			LocalDateTime currentDate = LocalDateTime.now();
//			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//			
//			Long id = productionDetails.getId();
//			
//			if(userRole.equalsIgnoreCase(AppConstantsBuds.operator)) {
//				
//				if(id != null) {
//					existingProductionDetails = sliverProductionHeaderRepository.productionDetailsbyId(id);
//					
//					String[] ignoreProps = {
//						    "operator_status", "operator_save_by", "operator_save_on", "operator_save_id",
//						    "operator_submitted_by", "operator_submitted_on", "operator_submitted_id", "operator_sign",
//						    "supervisor_status", "supervisor_submit_on", "supervisor_submit_by", "supervisor_submit_id",
//						    "supervisor_sign", "hod_status", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign",
//						    "hod_signature_image", "operator_signature_image", "supervisor_signature_image",
//						    "createdBy", "createdAt"
//						};
//					BeanUtils.copyProperties(productionDetails,existingProductionDetails, ignoreProps);
//				}  else {
//					existingProductionDetails = productionDetails;
//				}
//				
//				productionDetails.setOperator_save_by(userName);
//				productionDetails.setOperator_save_id(userId);
//				productionDetails.setOperator_sign(userName);
//				productionDetails.setOperator_save_on(date);
//				productionDetails.setOperator_status(AppConstants.operatorApprove);
//				
//				productionDetails.setSupervisor_status(AppConstants.waitingStatus);
//				productionDetails.setHod_status("");
//				
//				for(BudsDailyProductionSliverLine sliverLine : productionDetails.getSliverLine()) {
//					sliverLine.setSliverProduction(productionDetails);
//				}
//				
//				for(BudsDailyProductionStoppageLine stoppageLine : productionDetails.getStoppageDetails()) {
//					stoppageLine.setStoppage(productionDetails);
//				}
//				
//				sliverProductionHeaderRepository.save(productionDetails);
//				
//				// SAVE TO HISTORY
//				
//				BudsDailyProductionSliverHeaderHistory productionDetailsHistory = new BudsDailyProductionSliverHeaderHistory();
//				BeanUtils.copyProperties(productionDetails, productionDetailsHistory, "id");
//				
//					// SET VERSION BASED ON UNIQUE FIELDS
//				
//				
//				String machineName = productionDetailsHistory.getMachineName();
//				
//				int version = productChangerOverRepositoryHistory.getMaximumVersion(machineName).map(temp -> temp + 1).orElse(1);
//				
//				System.out.println("Version" + version);
//				
//				productionDetailsHistory.setVersion(version);
//				
//				sliverProductionHeaderHistoryRepository.save(productionDetailsHistory);
//
//			}
//			
//		} catch (Exception ex) {
//
//			String msg = ex.getMessage();
//			logger.error("Unable to submit Daily Production Sliver Form" + msg);
//			ex.printStackTrace();
//
//			return new ResponseEntity(new ApiResponse(false, "Failed to submit Sliver Daily Production Details" + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//		return new ResponseEntity(new ApiResponse(true, "Operator Submitted Successfully"), HttpStatus.CREATED);
//		
//	}
	
	
//	public ResponseEntity<?> submitSliverDailyProductionDetails(BudsDailyProductionSliverHeader productionDetails, HttpServletRequest http) {
//	    BudsDailyProductionSliverHeader existingProductionDetails = null;
//
//	    try {
//	        // Get user role and details
//	        String userRole = getUserRole();
//	        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//	        String userName = userRepository.getUserName(userId);
//	        LocalDateTime currentDate = LocalDateTime.now();
//	        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//	        Long id = productionDetails.getId();
//
//	        if (userRole.equalsIgnoreCase(AppConstantsBuds.operator)) {
//	            if (id != null) {
//	                // Fetch existing production details from the database
//	                existingProductionDetails = sliverProductionHeaderRepository.productionDetailsbyId(id);
//
//	                // Copy properties except for the ignored ones
//	                String[] ignoreProps = {
//	                    "operator_status", "operator_save_by", "operator_save_on", "operator_save_id",
//	                    "operator_submitted_by", "operator_submitted_on", "operator_submitted_id", "operator_sign",
//	                    "supervisor_status", "supervisor_submit_on", "supervisor_submit_by", "supervisor_submit_id",
//	                    "supervisor_sign", "hod_status", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign",
//	                    "hod_signature_image", "operator_signature_image", "supervisor_signature_image",
//	                    "createdBy", "createdAt"
//	                };
//
//	                // Update existing production details
//	                BeanUtils.copyProperties(productionDetails, existingProductionDetails, ignoreProps);
//	                productionDetails = existingProductionDetails; // Update reference to existing object
//	            }
//
//	            // Set operator details
//	            productionDetails.setOperator_save_by(userName);
//	            productionDetails.setOperator_save_id(userId);
//	            productionDetails.setOperator_sign(userName);
//	            productionDetails.setOperator_save_on(date);
//	            productionDetails.setOperator_status(AppConstants.operatorApprove);
//	            productionDetails.setSupervisor_status(AppConstants.waitingStatus);
//	            productionDetails.setHod_status(""); // Consider if you need to set this based on specific logic
//
//	            // Ensure bi-directional relationships are set correctly
//	            for (BudsDailyProductionSliverLine sliverLine : productionDetails.getSliverLine()) {
//	                sliverLine.setSliverProduction(productionDetails);
//	                sliverLine.setLineId(id);
//	            }
//
//	            for (BudsDailyProductionStoppageLine stoppageLine : productionDetails.getStoppageDetails()) {
//	                stoppageLine.setStoppage(productionDetails);
//	            }
//
//	            // Save or update the production details
//	            sliverProductionHeaderRepository.save(productionDetails);
//
//	            // Save to history
//	            BudsDailyProductionSliverHeaderHistory productionDetailsHistory = new BudsDailyProductionSliverHeaderHistory();
//	            BeanUtils.copyProperties(productionDetails, productionDetailsHistory, "id");
//
//	            // Set version based on unique fields
//	            String machineName = productionDetailsHistory.getMachineName();
//	            int version = productChangerOverRepositoryHistory.getMaximumVersion(machineName).map(temp -> temp + 1).orElse(1);
//
//	            System.out.println("Version: " + version);
//	            productionDetailsHistory.setVersion(version);
//
//	            // Save history
//	            sliverProductionHeaderHistoryRepository.save(productionDetailsHistory);
//
//	        } else {
//	            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//	                .body(new ApiResponse(false, userRole + " not authorized to submit sliver daily production details!"));
//	        }
//
//	    } catch (Exception ex) {
//	        String msg = ex.getMessage();
//	        logger.error("Unable to submit Daily Production Sliver Form: " + msg);
//	        ex.printStackTrace();
//
//	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//	            .body(new ApiResponse(false, "Failed to submit Sliver Daily Production Details: " + msg));
//	    }
//	    
//	    return ResponseEntity.status(HttpStatus.CREATED)
//	        .body(new ApiResponse(true, "Operator Submitted Successfully"));
//	}
	
//	public ResponseEntity<?> submitSliverDailyProductionDetails(BudsDailyProductionSliverHeader productionDetails, HttpServletRequest http) {
//	    BudsDailyProductionSliverHeader existingProductionDetails = null;
//
//	    try {
//	        // Get user role and details
//	        String userRole = getUserRole();
//	        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//	        String userName = userRepository.getUserName(userId);
//	        LocalDateTime currentDate = LocalDateTime.now();
//	        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//	        Long id = productionDetails.getId();
//
//	        if (userRole.equalsIgnoreCase(AppConstantsBuds.operator)) {
//	            if (id != null) {
//	                // Fetch existing production details from the database
//	                existingProductionDetails = sliverProductionHeaderRepository.productionDetailsbyId(id);
//
//	                if (existingProductionDetails == null) {
//	                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
//	                        .body(new ApiResponse(false, "Production details not found for ID: " + id));
//	                }
//
//	                // Copy properties except for the ignored ones
//	                String[] ignoreProps = {
//	                    "operator_status", "operator_save_by", "operator_save_on", "operator_save_id",
//	                    "operator_submitted_by", "operator_submitted_on", "operator_submitted_id", "operator_sign",
//	                    "supervisor_status", "supervisor_submit_on", "supervisor_submit_by", "supervisor_submit_id",
//	                    "supervisor_sign", "hod_status", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign",
//	                    "hod_signature_image", "operator_signature_image", "supervisor_signature_image",
//	                    "createdBy", "createdAt"
//	                };
//
//	                // Update existing production details
//	                BeanUtils.copyProperties(productionDetails, existingProductionDetails, ignoreProps);
//	            } else {
//	                existingProductionDetails = productionDetails; // For new records
//	            }
//
//	            // Set operator details
//	            existingProductionDetails.setOperator_save_by(userName);
//	            existingProductionDetails.setOperator_save_id(userId);
//	            existingProductionDetails.setOperator_sign(userName);
//	            existingProductionDetails.setOperator_save_on(date);
//	            existingProductionDetails.setOperator_status(AppConstants.operatorApprove);
//	            existingProductionDetails.setSupervisor_status(AppConstants.waitingStatus);
//	            existingProductionDetails.setHod_status(""); // Adjust as needed
//
//	            // Ensure bi-directional relationships are set correctly
//	            List<BudsDailyProductionSliverLine> sliverLines = existingProductionDetails.getSliverLine();
//	            if (sliverLines != null) {
//	            	final BudsDailyProductionSliverHeader finalProductionDetails = existingProductionDetails;
//	                sliverLines.forEach(sliverLine -> {
//	                    sliverLine.setSliverProduction(finalProductionDetails);
//	                    sliverLine.setLineId(finalProductionDetails.getId()); // Ensure line ID is set correctly
//	                });
//	            }
//
//	            List<BudsDailyProductionStoppageLine> stoppageLines = existingProductionDetails.getStoppageDetails();
//	            if (stoppageLines != null) {
//	            	final BudsDailyProductionSliverHeader finalProductionDetails = existingProductionDetails;
//	                stoppageLines.forEach(stoppageLine -> {
//	                    stoppageLine.setStoppage(finalProductionDetails);
//	                });
//	            }
//
//	            // Save or update the production details
//	            sliverProductionHeaderRepository.save(existingProductionDetails);
//
//	            // Save to history
//	            BudsDailyProductionSliverHeaderHistory productionDetailsHistory = new BudsDailyProductionSliverHeaderHistory();
//	            BeanUtils.copyProperties(existingProductionDetails, productionDetailsHistory, "id");
//
//	            // Set version based on unique fields
//	            String machineName = productionDetailsHistory.getMachineName();
//	            int version = productChangerOverRepositoryHistory.getMaximumVersion(machineName).map(temp -> temp + 1).orElse(1);
//	            productionDetailsHistory.setVersion(version);
//
//	            // Save history
//	            sliverProductionHeaderHistoryRepository.save(productionDetailsHistory);
//
//	        } else {
//	            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//	                .body(new ApiResponse(false, userRole + " not authorized to submit sliver daily production details!"));
//	        }
//
//	    } catch (Exception ex) {
//	        String msg = ex.getMessage();
//	        logger.error("Unable to submit Daily Production Sliver Form: " + msg);
//	        ex.printStackTrace();
//
//	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//	            .body(new ApiResponse(false, "Failed to submit Sliver Daily Production Details: " + msg));
//	    }
//
//	    return ResponseEntity.status(HttpStatus.CREATED)
//	        .body(new ApiResponse(true, "Operator Submitted Successfully"));
//	}
	
	
//	public ResponseEntity<?> submitProductionDetails(BudsDailyProductionSliverHeader productionDetails, HttpServletRequest http) {
//	    BudsDailyProductionSliverHeader existingProductionDetails = null;
//
//	    try {
//	        // Get user role and details
//	        String userRole = getUserRole();
//	        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//	        String userName = userRepository.getUserName(userId);
//	        LocalDateTime currentDate = LocalDateTime.now();
//	        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//	        Long id = productionDetails.getId();
//
//	        if (userRole.equalsIgnoreCase(AppConstantsBuds.operator)) {
//	            if (id != null) {
//	                existingProductionDetails = sliverProductionHeaderRepository.productionDetailsbyId(id);
//	                
//	                String[] ignoreProps = {
//	                        "operator_status", "operator_save_by", "operator_save_on", "operator_save_id", "operator_submitted_by", 
//	                        "operator_submitted_on", "operator_submitted_id", "operator_sign", "supervisor_status", "supervisor_submit_on",
//	                        "supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "hod_status", "hod_submit_on", 
//	                        "hod_submit_by", "hod_submit_id", "hod_sign", "hod_signature_image", "operator_signature_image", 
//	                        "supervisor_signature_image", "createdBy", "createdAt"
//	                    };
//
//	                BeanUtils.copyProperties(productionDetails, existingProductionDetails, ignoreProps);
//	            } else {
//	                existingProductionDetails = productionDetails;
//	            }
//
//	            List<BudsDailyProductionSliverLine> sliverLineDetails = productionDetails.getSliverLine();
//	            List<BudsDailyProductionStoppageLine> stoppageLineDetails = productionDetails.getStoppageDetails();
//
//	            // Set required fields
//	            productionDetails.setOperator_save_by(userName);
//	            productionDetails.setOperator_save_id(userId);
//	            productionDetails.setOperator_sign(userName);
//	            productionDetails.setOperator_save_on(date);
//	            productionDetails.setOperator_status(AppConstants.operatorApprove);
//	            productionDetails.setSupervisor_status(AppConstants.waitingStatus);
//	            productionDetails.setHod_status("");
//
//	            // Manage sliver line collection properly
//	            existingProductionDetails.setSliverLine(new ArrayList<>(sliverLineDetails)); // Reinitialize if necessary
//	            existingProductionDetails.setStoppageDetails(stoppageLineDetails);
//
//	            sliverProductionHeaderRepository.save(existingProductionDetails);
//
//	            // Save to history
//	            BudsDailyProductionSliverHeaderHistory productionDetailsHistory = new BudsDailyProductionSliverHeaderHistory();
//	            BeanUtils.copyProperties(existingProductionDetails, productionDetailsHistory, "id");
//
//	            // Set version based on unique fields
//	            String machineName = productionDetailsHistory.getMachineName();
//	            int version = sliverProductionHeaderHistoryRepository.getMaximumVersion(machineName).map(temp -> temp + 1).orElse(1);
//	            productionDetailsHistory.setVersion(version);
//
//	            List<BudsDailyProductionSliverLineHistory> sliverLineDetailsHistory = new ArrayList<>();
//	            for (BudsDailyProductionSliverLine sliverline : existingProductionDetails.getSliverLine()) {
//	                BudsDailyProductionSliverLineHistory lineHistory = new BudsDailyProductionSliverLineHistory();
//	                BeanUtils.copyProperties(sliverline, lineHistory, "id");
//	                sliverLineDetailsHistory.add(lineHistory);
//	            }
//
//	            List<BudsDailyProductionStoppageLineHistory> stoppageLineDetailsHistory = new ArrayList<>();
//	            for (BudsDailyProductionStoppageLine stoppageLine : existingProductionDetails.getStoppageDetails()) {
//	                BudsDailyProductionStoppageLineHistory lineHistory = new BudsDailyProductionStoppageLineHistory();
//	                BeanUtils.copyProperties(stoppageLine, lineHistory, "id");
//	                stoppageLineDetailsHistory.add(lineHistory);
//	            }
//
//	            productionDetailsHistory.setSliverLine(sliverLineDetailsHistory);
//	            productionDetailsHistory.setStoppageDetails(stoppageLineDetailsHistory);
//
//	            // Save history
//	            sliverProductionHeaderHistoryRepository.save(productionDetailsHistory);
//
//	        } else {
//	            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//	                .body(new ApiResponse(false, userRole + " not authorized to submit sliver daily production details!"));
//	        }
//	    } catch (Exception ex) {
//	        String msg = ex.getMessage();
//	        logger.error("Unable to submit Daily Production Sliver Form: " + msg);
//	        ex.printStackTrace();
//
//	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//	            .body(new ApiResponse(false, "Failed to submit Sliver Daily Production Details: " + msg));
//	    }
//
//	    return ResponseEntity.status(HttpStatus.CREATED)
//	            .body(new ApiResponse(true, "Operator Submitted Successfully"));
//	}

	
	public ResponseEntity<?> submitProductionDetails(BudsDailyProductionSliverHeader productionDetails, HttpServletRequest http) {
		
		BudsDailyProductionSliverHeader existingProductionDetails = null;
		
		try {
			
			String userRole = getUserRole();
	        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	        String userName = userRepository.getUserName(userId);
	        LocalDateTime currentDate = LocalDateTime.now();
	        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
	        
	        Long id = productionDetails.getId();
	        
	        String[] ignoreHistory = {
                    "id","sliverLine","stoppageDetails"
                };

	        
	        if(id != null) {
	        	
	        	existingProductionDetails = sliverProductionHeaderRepository.productionDetailsbyId(id);
	        	
	        	String[] ignoreProps = {
                        "operator_status", "operator_save_by", "operator_save_on", "operator_save_id", "operator_submitted_by", 
                        "operator_submitted_on", "operator_submitted_id", "operator_sign", "supervisor_status", "supervisor_submit_on",
                        "supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "hod_status", "hod_submit_on", 
                        "hod_submit_by", "hod_submit_id", "hod_sign", "hod_signature_image", "operator_signature_image", 
                        "supervisor_signature_image", "createdBy", "createdAt"
                    };
	        	
	        	
                BeanUtils.copyProperties(productionDetails, existingProductionDetails, ignoreProps);
                
	        } else {
	        	
	        	existingProductionDetails = productionDetails;
	        	
	        }
	        
	        	
                if(userRole.equalsIgnoreCase(AppConstantsBuds.operator)) {
                	

            		
            		sliverProductionHeaderRepository.save(existingProductionDetails);
            		
            		List<BudsDailyProductionSliverLine> sliverLine = productionDetails.getSliverLine();
            		
            		for(BudsDailyProductionSliverLine line : sliverLine) {
            			line.setId(existingProductionDetails.getId());
            			
            			sliverLineRepository.save(line);
            		}
            		
            		existingProductionDetails.setSliverLine(sliverLine);
            		
            		List<BudsDailyProductionStoppageLine> stoppageLine = productionDetails.getStoppageDetails();
            		
            		for(BudsDailyProductionStoppageLine line : stoppageLine) {
            			line.setId(existingProductionDetails.getId());
            			
            			stoppageLineRepository.save(line);
            		}
            		
            		existingProductionDetails.setStoppageDetails(stoppageLine);
            		
            		existingProductionDetails.setOperator_submitted_by(userName);
            		existingProductionDetails.setOperator_submitted_id(userId);
            		existingProductionDetails.setOperator_sign(userName);
            		existingProductionDetails.setOperator_submitted_on(date);
            		existingProductionDetails.setDepartment(AppConstantsBuds.department);
            		existingProductionDetails.setOperator_status(AppConstants.operatorApprove);
            		existingProductionDetails.setSupervisor_status(AppConstants.waitingStatus);
            		existingProductionDetails.setHod_status("");
            		
            		sliverProductionHeaderRepository.save(existingProductionDetails);
            		
            			// SAVE TO HISTORY
            		
            		BudsDailyProductionSliverHeaderHistory productionDetailsHistory = new BudsDailyProductionSliverHeaderHistory();
            		
            		
            		BeanUtils.copyProperties(existingProductionDetails, productionDetailsHistory, ignoreHistory);
            		
            		// Set version based on unique fields
    	            String machineName = productionDetailsHistory.getMachineName();
    	            String machineDate = productionDetailsHistory.getMachineDate();
    	            String shift = productionDetailsHistory.getShift();
    	            int version = sliverProductionHeaderHistoryRepository.getMaximumVersion(machineName, machineDate, shift).map(temp -> temp + 1).orElse(1);
    	            productionDetailsHistory.setVersion(version);
            		
    	            sliverProductionHeaderHistoryRepository.save(productionDetailsHistory);
//    	            sliverProductionHeaderHistoryRepository.save(productionDetailsHistory);
    	            
    	            List<BudsDailyProductionSliverLine> sliverLineHistory = productionDetails.getSliverLine();
    	            
    	            for(BudsDailyProductionSliverLine line : sliverLineHistory) {
    	            	
    	            	BudsDailyProductionSliverLineHistory lineHistory = new BudsDailyProductionSliverLineHistory();
    	            	
    	            	BeanUtils.copyProperties(line, lineHistory);
            			lineHistory.setId(productionDetailsHistory.getId());
            			
            			sliverLineHistoryRepository.save(lineHistory);
            			
            		}
    	            
    	            List<BudsDailyProductionStoppageLine> stoppageLineHistory = productionDetails.getStoppageDetails();
    	            
    	            for(BudsDailyProductionStoppageLine line : stoppageLineHistory) {
    	            	
    	            	BudsDailyProductionStoppageLineHistory lineHistory = new BudsDailyProductionStoppageLineHistory();
    	            	
    	            	BeanUtils.copyProperties(line, lineHistory);
            			lineHistory.setId(productionDetailsHistory.getId());
            			
            			stoppageLineHistoryRepository.save(lineHistory);
            		}
    	            
    	            sliverProductionHeaderHistoryRepository.save(productionDetailsHistory);
    	            
    	            try {
						mailFunction.sliverProductionMailSupervisor(existingProductionDetails);
					} catch (Exception ex) {
						return new ResponseEntity<>(
								new ApiResponse(false, "Operator Submitted but Unable to send mail to Supervisor !!! "),
								HttpStatus.OK);
					}
    	           
            	
                	
                } else {
                	return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            	            .body(new ApiResponse(false, userRole + " not authroized to submit Sliver Daily Production Details: "));
                }
                
			
		} catch(Exception ex) {
			String msg = ex.getMessage();
	        logger.error("Unable to submit Daily Production Sliver Form: " + msg);
	        ex.printStackTrace();

	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	            .body(new ApiResponse(false, "Failed to submit Sliver Daily Production Details: " + msg));
		}
		
		return ResponseEntity.status(HttpStatus.CREATED)
	            .body(new ApiResponse(true, "Operator Submitted Successfully"));
		
	}
	

	// GET BY UNIQUE 
	
	public ResponseEntity<?> getProductionDetailsByMachine(String machineName, String machineDate, String shift) {
		List<BudsDailyProductionSliverHeader> sliverProductionDetails = new LinkedList<BudsDailyProductionSliverHeader>();
		
		try {
			
			sliverProductionDetails = sliverProductionHeaderRepository.productionDetailsByMachine(machineName, machineDate, shift);
			
		} catch(Exception ex) {
			String msg = ex.getMessage();
	        logger.error("Unable to get Daily Production Sliver Form: " + msg);
	        ex.printStackTrace();

	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	            .body(new ApiResponse(false, "Failed to get Sliver Daily Production Details: " + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(sliverProductionDetails);
	}
	
	// GET BY SUMMARY 
	
	public ResponseEntity<?> getProductionDetailsSummary() {
		
		String userRole = getUserRole();
		List<BudsDailyProductionSliverHeader> sliverProductionDetails = new LinkedList<BudsDailyProductionSliverHeader>();
		
		try {
			
			if(userRole.equalsIgnoreCase(AppConstantsBuds.operator)) {
				
				sliverProductionDetails = sliverProductionHeaderRepository.productionDetailsByOperator();
				
			} else if(userRole.equalsIgnoreCase(AppConstantsBuds.supervisor)) {
				
				sliverProductionDetails = sliverProductionHeaderRepository.productionDetailsBySupervisorHod();
				
			} else if(userRole.equalsIgnoreCase(AppConstantsBuds.hod) || userRole.equalsIgnoreCase(AppConstantsBuds.designee)) {
				
				sliverProductionDetails = sliverProductionHeaderRepository.productionDetailsBySupervisorHod();
				
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			            .body(new ApiResponse(false, userRole + " not authorized to get Sliver production details summary"));
			}
			
		}catch(Exception ex) {
			String msg = ex.getMessage();
	        logger.error("Unable to get Daily Production Sliver Form Summary" + msg);
	        ex.printStackTrace();

	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	            .body(new ApiResponse(false, "Failed to get Sliver Daily Production Details Summary " + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(sliverProductionDetails);
	}
	
	
		// DELETE DAILY SLIVER PRODUCTION LINE  
	
	public ResponseEntity<?> deleteProductionSliverLine(Long id) {
		
		BudsDailyProductionSliverLine productionDetailsLine = new BudsDailyProductionSliverLine();
		
		try {
			
			productionDetailsLine = sliverLineRepository.productionLineById(id);
			
			if(productionDetailsLine != null) {
				sliverLineRepository.deleteProductionLineById(id);
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, " data not found !!!"));
			}
			
		}  catch(Exception ex) {
			String msg = ex.getMessage();
			
			logger.error(" *** !!! Unable to delete Sliver Line summary !!!*** " + msg);
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to delete Sliver Line summary !!!" + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Sliver Production Line Deleted "));
	}
	
	// DELETE DAILY STOPPAGE PRODUCTION LINE  
	
	public ResponseEntity<?> deleteProductionStoppageLine(Long id) {

		BudsDailyProductionStoppageLine productionDetailsLine = new BudsDailyProductionStoppageLine();

		try {

			productionDetailsLine = stoppageLineRepository.productionLineById(id);

			if (productionDetailsLine != null) {
				stoppageLineRepository.deleteProductionLineById(id);
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(new ApiResponse(false, " data not found !!!"));
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();

			logger.error(" *** !!! Unable to delete Sliver Line summary !!!*** " + msg);

			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse(false, "Failed to delete Sliver Line summary !!!" + msg));
		}

		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Sliver Production Line Deleted "));
	}
	
	
		// APPROVE SLIVER DAILY PRODUCTION DETAILS
	
	public ResponseEntity<?> approveSliverProductionDetails(ApproveResponse approveResponse, HttpServletRequest http) {
		
		SCAUtil sca = new SCAUtil();
		
		BudsDailyProductionSliverHeader productionHeaderList = new BudsDailyProductionSliverHeader();
		
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			productionHeaderList = sliverProductionHeaderRepository.productionDetailsbyId(approveResponse.getId());
			
			BudsDailyProductionSliverHeaderHistory sliverHistory = new BudsDailyProductionSliverHeaderHistory();
			
			String operatorStatus = productionHeaderList.getOperator_status();
			
			String supervisorStatus = productionHeaderList.getSupervisor_status();
			
			String hodStatus = productionHeaderList.getHod_status();
			
			String machineName = productionHeaderList.getMachineName();
			
			String machinedate = productionHeaderList.getMachineDate();
			
			String machineShift = productionHeaderList.getShift();
			
			if(userRole.equalsIgnoreCase(AppConstantsBuds.supervisor)) {
				
				if(operatorStatus.equalsIgnoreCase(AppConstants.operatorApprove) && supervisorStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
					
					if(approveResponse.getStatus().equalsIgnoreCase(AppConstantsBuds.approvalStatus)) {
						
						productionHeaderList.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						productionHeaderList.setSupervisor_sign(userName);
						productionHeaderList.setSupervisor_submit_by(userName);
						productionHeaderList.setSupervisor_submit_on(date);
						productionHeaderList.setSupervisor_submit_id(userId);
						
						productionHeaderList.setHod_status(AppConstants.waitingStatus);
						
						sliverProductionHeaderRepository.save(productionHeaderList);
						
							// HISTORY 
						
						sliverHistory = sliverProductionHeaderHistoryRepository.findLastSubmittedRecord(machineName, machinedate, machineShift);
						
						sliverHistory.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						sliverHistory.setSupervisor_submit_by(userName);
						sliverHistory.setSupervisor_submit_id(userId);
						sliverHistory.setSupervisor_sign(userName);
						
						sliverProductionHeaderHistoryRepository.save(sliverHistory);
						
						try {
							mailFunction.sliverProductionMailHod(productionHeaderList);
						} catch (Exception ex) {
							return new ResponseEntity<>(
									new ApiResponse(false, "Supervisor Approved but Unable to send mail to Hod !!! "),
									HttpStatus.OK);
						}
						
						return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Supervisor Approved Successfully"));
						
					} else if(approveResponse.getStatus().equalsIgnoreCase(AppConstantsBuds.rejectedStatus)) {
						
						productionHeaderList.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						productionHeaderList.setSupervisor_sign(userName);
						productionHeaderList.setSupervisor_submit_by(userName);
						productionHeaderList.setSupervisor_submit_on(date);
						productionHeaderList.setSupervisor_submit_id(userId);
						
						productionHeaderList.setRejectReason(approveResponse.getRemarks());
						
						sliverProductionHeaderRepository.save(productionHeaderList);
						
							// HISTORY 
						
						sliverHistory = sliverProductionHeaderHistoryRepository.findLastSubmittedRecord(machineName, machinedate, machineShift);
						
						sliverHistory.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						sliverHistory.setSupervisor_submit_by(userName);
						sliverHistory.setSupervisor_submit_id(userId);
						sliverHistory.setSupervisor_sign(userName);
						
						
						sliverProductionHeaderHistoryRepository.save(sliverHistory);
						
						return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Supervisor Rejected Successfully"));
						
					} else {
						return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Invalid Status !!!"));
					}
					
				} else {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Please Check Operator Approvals !!!"));
				}
				
			} else if(userRole.equalsIgnoreCase(AppConstantsBuds.hod) || userRole.equalsIgnoreCase(AppConstantsBuds.designee)) {
				
				if(operatorStatus.equalsIgnoreCase(AppConstants.operatorApprove) && supervisorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
					if(approveResponse.getStatus().equalsIgnoreCase(AppConstantsBuds.approvalStatus)) {
						
						productionHeaderList.setHod_status(AppConstants.hodApprovedStatus);
						productionHeaderList.setHod_submit_by(userName);
						productionHeaderList.setHod_submit_id(userId);
						productionHeaderList.setHod_submit_on(date);
						
						sliverProductionHeaderRepository.save(productionHeaderList);
						
							// HISTORy
					
						sliverHistory = sliverProductionHeaderHistoryRepository.findLastSubmittedRecord(machineName, machinedate, machineShift);
						
						sliverHistory.setHod_status(AppConstants.hodApprovedStatus);
						sliverHistory.setHod_submit_by(userName);
						sliverHistory.setHod_submit_id(userId);
						sliverHistory.setHod_submit_on(date);
						
						sliverProductionHeaderHistoryRepository.save(sliverHistory);
						
						return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Hod Approved Successfully"));
						
					} else if(approveResponse.getStatus().equalsIgnoreCase(AppConstantsBuds.rejectedStatus)) {
						
						productionHeaderList.setHod_status(AppConstants.hodRejectedStatus);
						productionHeaderList.setHod_submit_by(userName);
						productionHeaderList.setHod_submit_id(userId);
						productionHeaderList.setHod_submit_on(date);
						
						productionHeaderList.setRejectReason(approveResponse.getRemarks());
						
						sliverProductionHeaderRepository.save(productionHeaderList);
						
							// HISTORy
					
						sliverHistory = sliverProductionHeaderHistoryRepository.findLastSubmittedRecord(machineName, machinedate, machineShift);
						
						sliverHistory.setHod_status(AppConstants.hodApprovedStatus);
						sliverHistory.setHod_submit_by(userName);
						sliverHistory.setHod_submit_id(userId);
						sliverHistory.setHod_submit_on(date);
						
						sliverProductionHeaderHistoryRepository.save(sliverHistory);
						
						return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Hod Rejected Successfully"));
						
					} else {
						return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Invalid Status !!!"));
					}
				} else {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Please Check Supervisor Approvals !!!"));
				}
				
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, userRole + " not authorized to Approve"));
			}
			
		} catch(Exception ex) {
			String msg = ex.getMessage();
	        logger.error("Unable to approve Daily production SLiver" + msg);
	        ex.printStackTrace();

	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	            .body(new ApiResponse(false, "Failed to approve Daily production SLiver " + msg));
		}
	}
	
	
	/**
	 * LOG BOOK 
	 */
	
	public ResponseEntity<?> saveLogbook(BudsLogbookHeader logbookHeader, HttpServletRequest http) {
		
		BudsLogbookHeader existingLogbook = null;
		
		try {
			
			String userRole = getUserRole();
	        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	        String userName = userRepository.getUserName(userId);
	        LocalDateTime currentDate = LocalDateTime.now();
	        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
	        
	        Long id = logbookHeader.getLogId();
	        
	        if(userRole.equalsIgnoreCase(AppConstantsBuds.supervisor)) {
	        	
	        	if(id != null) {
	        		existingLogbook = logbookRepository.logbookHeaderById(id);
	        		
	        		String ignoreProps[] = { "supervisor_status",
	        				"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
	        				"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "hod_status",
	        				"hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id",
	        				"hod_sign","hod_mail_status","supervisor_signature_image","hod_signature_image", "createdAt", "createdBy"};
	        		
	        		BeanUtils.copyProperties(logbookHeader, existingLogbook,ignoreProps);
	        		
//	        		List<BudsLogbookProductionLine> logbookLine = logbookHeader.getProductionLine();
//		        	
//		        	for(BudsLogbookProductionLine line : logbookLine) {
//		        		line.setLogId(existingLogbook.getLogId());
//		        		logbookLineRepository.save(line);
//		        	}
//		        	
//		        	existingLogbook.setProductionLine(logbookLine);
//		        	
//		        	existingLogbook.setSupervisor_status(AppConstants.supervisorSave);
//		        	existingLogbook.setSupervisor_save_by(userName);
//		        	existingLogbook.setSupervisor_save_id(userId);
//		        	existingLogbook.setSupervisor_save_on(date);
//		        	
//		        	logbookRepository.save(existingLogbook);
	        		
	        	} else {
	        		existingLogbook = logbookHeader;
	        	}
	        	
	        	existingLogbook.setSupervisor_status(AppConstants.supervisorSave);
	        	existingLogbook.setSupervisor_save_by(userName);
	        	existingLogbook.setSupervisor_save_id(userId);
	        	existingLogbook.setSupervisor_save_on(date);
	        	
	        	logbookRepository.save(existingLogbook);
	        	
	        	List<BudsLogbookProductionLine> productionLineList = existingLogbook.getProductionLine();
	        	
	        	for(BudsLogbookProductionLine line : productionLineList) {
	        		
	        		Long id1 = line.getLineId();
	        		
	        		if(id1 != null) {
	        			BudsLogbookProductionLine existingLine = logbookLineRepository.productionLineById(id1);
	        			line.setLogId(existingLine.getLogId());
	        		}
	        		
	        		logbookLineRepository.save(line);
	        		
	        	}
	        	
	        } else {
	        	return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	    	            .body(new ApiResponse(false, userRole + " not authorized to save Logbook Summary "));
	        }
			
		} catch(Exception ex) {
			String msg = ex.getMessage();
	        logger.error("Unable to get Logbook Form Summary" + msg);
	        ex.printStackTrace();

	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	            .body(new ApiResponse(false, "Failed to save Logbook Summary " + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(existingLogbook);
	}
	
	
		// SUBMIT LOGBOOK
	
	public ResponseEntity<?> submitLogbook(BudsLogbookHeader logbookHeader, HttpServletRequest http) {
		
		BudsLogbookHeader existingLogbook = null;
		
		try {
			
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			String ignoreProps[] = { "logId","supervisor_status",
    				"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
    				"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "hod_status",
    				"hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id",
    				"hod_sign","hod_mail_status","supervisor_signature_image","hod_signature_image", "createdAt", "createdBy"};
			
			String ignorePropsHistory[] = { "logId","productionLine" };
			
			if (userRole.equals("ROLE_SUPERVISOR")) {
				
				logbookHeader.setCreatedAt(logbookHeader.getCreatedAt());
				logbookHeader.setCreatedBy(logbookHeader.getCreatedBy());
				
				logbookHeader.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				logbookHeader.setSupervisor_submit_by(userName);
				logbookHeader.setSupervisor_submit_id(userId);
				logbookHeader.setSupervisor_submit_on(date);
				logbookHeader.setSupervisor_sign(userName);
				logbookHeader.setDepartment(AppConstantsBuds.department);			
				logbookHeader.setHod_status(AppConstants.waitingStatus);
				
				logbookRepository.save(logbookHeader);
				
				for(BudsLogbookProductionLine line : logbookHeader.getProductionLine()) {
					
					Long logId = logbookHeader.getLogId();
					line.setLogId(logId);
					
					logbookLineRepository.save(line);
					
				}
				
					// HISTORY
				
				BudsLogbookHeaderHistory logbookHistory = new BudsLogbookHeaderHistory();
				
//				BeanUtils.copyProperties(logbookHistory, logbookHeader, ignorePropsHistory);
				
				logbookHistory.setFormatName(logbookHeader.getFormatName());
			    logbookHistory.setFormNumber(logbookHeader.getFormNumber());
			    logbookHistory.setLogDate(logbookHeader.getLogDate());
			    logbookHistory.setLogShift(logbookHeader.getLogShift());
			    logbookHistory.setDepartment(logbookHeader.getDepartment());
			    logbookHistory.setRemarks(logbookHeader.getRemarks());
			    logbookHistory.setRejectReason(logbookHeader.getRejectReason());
//			    logbookHistory.setVersion(logbookHeader.getVersion());
			    logbookHistory.setStoppageDetails(logbookHeader.getStoppageDetails());
			    

			    	// Supervisor-related fields
			    logbookHistory.setSupervisor_status(logbookHeader.getSupervisor_status());
			    logbookHistory.setSupervisor_save_on(logbookHeader.getSupervisor_save_on());
			    logbookHistory.setSupervisor_save_by(logbookHeader.getSupervisor_save_by());
			    logbookHistory.setSupervisor_save_id(logbookHeader.getSupervisor_save_id());
			    logbookHistory.setSupervisor_submit_on(logbookHeader.getSupervisor_submit_on());
			    logbookHistory.setSupervisor_submit_by(logbookHeader.getSupervisor_submit_by());
			    logbookHistory.setSupervisor_submit_id(logbookHeader.getSupervisor_submit_id());
			    logbookHistory.setSupervisor_sign(logbookHeader.getSupervisor_sign());

			    	// HOD-related fields
			    logbookHistory.setHod_status(logbookHeader.getHod_status());
			    logbookHistory.setHod_submit_on(logbookHeader.getHod_submit_on());
			    logbookHistory.setHod_submit_by(logbookHeader.getHod_submit_by());
			    logbookHistory.setHod_submit_id(logbookHeader.getHod_submit_id());
			    logbookHistory.setHod_sign(logbookHeader.getHod_sign());
				
				
				String logDate = logbookHistory.getLogDate();
				
				String logShift = logbookHistory.getLogShift();
				
				int version = logbookRepositoryHistory.getMaximumVersion(logDate, logShift).map(temp -> temp + 1).orElse(1);
				
				logbookHistory.setVersion(version);
				
				logbookRepositoryHistory.save(logbookHistory);
				
				System.out.println("Size " + logbookHeader.getProductionLine().size());
				
				List<BudsLogbookProductionLine> details = logbookHeader.getProductionLine();
				
				for(BudsLogbookProductionLine historyLine : details) {
					
					BudsLogbookProductionLineHistory history = new BudsLogbookProductionLineHistory();
					
					BeanUtils.copyProperties(historyLine, history );
//					BeanUtils.copyProperties(history, historyLine);
					history.setLogId(logbookHistory.getLogId());
					
					logbookLineRepositoryHistory.save(history);
					
				}
				logbookRepositoryHistory.save(logbookHistory);
				
				
				try {

					mailFunction.sendLogbookMailHod(logbookHeader);
				} catch (Exception ex) {
					return new ResponseEntity<>(
							new ApiResponse(false, "Supervisor Submitted but Unable to send mail to HOD !!! "),
							HttpStatus.OK);
				}
				
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			            .body(new ApiResponse(false, "not authroized to submit form !!! "));
			}
			
		} catch(Exception ex) {
			String msg = ex.getMessage();
	        logger.error("Unable to submit Logbook Form Summary" + msg);
	        ex.printStackTrace();

	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	            .body(new ApiResponse(false, "Failed to submit Logbook Summary " + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Supervisor Submitted Successfully"));
		
	}
	
		// APPROVAL RESPONSE 
	
	public ResponseEntity<?> approveLogbook(ApproveResponse approveResponse, HttpServletRequest http) {
		
		BudsLogbookHeader logbookHeader = new BudsLogbookHeader();
		
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			logbookHeader = logbookRepository.logbookHeaderById(approveResponse.getId());
			
			BudsLogbookHeaderHistory logbookHistory = new BudsLogbookHeaderHistory();
			
			String supervisorStatus = logbookHeader.getSupervisor_status();
			
			String hodStatus = logbookHeader.getHod_status();
			
			String logDate = logbookHeader.getLogDate();
			
			String logShift = logbookHeader.getLogShift();
			
			if(userRole.equalsIgnoreCase(AppConstantsBuds.hod) || userRole.equalsIgnoreCase(AppConstantsBuds.designee)) {
				
				if(supervisorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
					
					if(approveResponse.getStatus().equalsIgnoreCase(AppConstantsBuds.approvalStatus)) {
						
						logbookHeader.setHod_status(AppConstants.hodApprovedStatus);
						logbookHeader.setHod_submit_by(userName);
						logbookHeader.setHod_submit_on(date);
						logbookHeader.setHod_submit_id(userId);
						
						logbookRepository.save(logbookHeader);
						
							// SAVE TO HISTORY
						
						logbookHistory = logbookRepositoryHistory.fetchLastSubmittedRecord(logDate, logShift);
						
						logbookHistory.setHod_status(AppConstants.hodApprovedStatus);
						logbookHistory.setHod_submit_by(userName);
						logbookHistory.setHod_submit_on(date);
						logbookHistory.setHod_submit_id(userId);
						
						logbookRepositoryHistory.save(logbookHistory);
						
						return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Hod Approved Successfully"));
						
					} else if(approveResponse.getStatus().equalsIgnoreCase(AppConstantsBuds.rejectedStatus)) {
						
						logbookHeader.setHod_status(AppConstants.hodRejectedStatus);
						logbookHeader.setHod_submit_by(userName);
						logbookHeader.setHod_submit_on(date);
						logbookHeader.setHod_submit_id(userId);
						
						logbookHeader.setRejectReason(approveResponse.getRemarks());
						
						logbookRepository.save(logbookHeader);
						
							// SAVE TO HISTORY
						
						logbookHistory = logbookRepositoryHistory.fetchLastSubmittedRecord(logDate, logShift);
						
						logbookHistory.setHod_status(AppConstants.hodRejectedStatus);
						logbookHistory.setHod_submit_by(userName);
						logbookHistory.setHod_submit_on(date);
						logbookHistory.setHod_submit_id(userId);
						
						logbookRepositoryHistory.save(logbookHistory);
						
						return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Hod Rejected Successfully"));
						
					} else {
						return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Invalid Status"));
					}
					
				} else {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Please check Hod Approvals !!!"));
				}
				
			}  else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, userRole + " not authorized to Approve/Reject "));
			}
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(
					new ApiResponse(false, "Failed to approve/reject Logbook " + msg),
					HttpStatus.BAD_REQUEST);
			
			
		}
		
	}
	
		// GET SUMMARY BY LOGBOOK 
	
	public ResponseEntity<?> getLogbookSummary() {
		
		String userRole = getUserRole();
		
		List<BudsLogbookHeader> logbookSummaryList = new LinkedList<>();
		
		try {
			
			if(userRole.equalsIgnoreCase(AppConstantsBuds.supervisor)) {
				
				logbookSummaryList = logbookRepository.logbookHeaderSupervisor();
				
			} else if(userRole.equalsIgnoreCase(AppConstantsBuds.hod) || userRole.equalsIgnoreCase(AppConstantsBuds.designee)) {
				
				logbookSummaryList = logbookRepository.logbookHeaderHod();
				
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(logbookSummaryList);
			}
			
		} catch(Exception ex) {
			String msg = ex.getMessage();
			
			logger.error(" *** !!! Unable to get Logbook summary !!!*** " + msg);
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to get Logbook Summary !!!" + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(logbookSummaryList);
	}
		
	
		// GET LOGBOOK BY BATCHNUMBER
	
	public ResponseEntity<?> getLogbookDetailsByUnique(String date, String shift) {
		
		List<BudsLogbookHeader> logbookHeaderList = new LinkedList<BudsLogbookHeader>();
		
		try {
			
			logbookHeaderList = logbookRepository.logbookHeaderByDateShift(date, shift);
			
		} catch(Exception ex) {
			String msg = ex.getMessage();
			
			logger.error(" *** !!! Unable to get Logbook summary !!!*** " + msg);
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to get Logbook Summary !!!" + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(logbookHeaderList);
	}
	
		// DELETE LOGBOOK PRODUCTION LINE 
	
	public ResponseEntity<?> deleteProductionLine(Long id) {
		
		BudsLogbookProductionLine productionDetailsLine = new BudsLogbookProductionLine();
		
		try {
			
			productionDetailsLine = logbookLineRepository.productionLineById(id);
			
			if(productionDetailsLine != null) {
				logbookLineRepository.deleteProductionLineById(id);
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, " data not found !!!"));
			}
			
		}  catch(Exception ex) {
			String msg = ex.getMessage();
			
			logger.error(" *** !!! Unable to delete Logbook summary !!!*** " + msg);
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to delete Logbook Summary !!!" + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Logbook Production Line Deleted "));
	}
	
	
		// PRINT DAILY PRODUCTION HEAD SUMMARY 
	
	public ResponseEntity<?> printDailySliverProduction(String machineName, String date, String shift) {
		
		List<BudsDailyProductionSliverHeader> sliverHeaderList = new LinkedList<BudsDailyProductionSliverHeader>();
		
		try {
			
			sliverHeaderList = sliverProductionHeaderRepository.printDailyProductionSliverHeader(machineName, date, shift);
			
		} catch(Exception ex) {
			String msg = ex.getMessage();
			
			logger.error(" *** !!! Unable to get print Logbook summary !!!*** " + msg);
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to get print Logbook Summary !!!" + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(sliverHeaderList);
	}
		
	
		// PRINT LOGBOOK SUMMARY
	
	public ResponseEntity<?> printLogbookSummary(String year, String month, String date, String shift) {
		
		List<BudsLogbookHeader> logbookList = new LinkedList<BudsLogbookHeader>();
		
try {
			
		logbookList = logbookRepository.printLogbookHeaders(date, shift, year, month);
			
		} catch(Exception ex) {
			String msg = ex.getMessage();
			
			logger.error(" *** !!! Unable to get print Logbook summary !!!*** " + msg);
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to get print Logbook Summary !!!" + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(logbookList);
		
	}
	
	
		/**
		 * EQUIPMENT USUAGE HEADER
		 */
	
	public ResponseEntity<?> saveEquipmentUsuageHeader(BudsEquipmentUsuageHeader equipmentDetails, HttpServletRequest http) {
		
		BudsEquipmentUsuageHeader existingEquipmentDetails = null;
		
		String userRole = getUserRole();
		
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			Long id = equipmentDetails.getEquipmentId();
			
			if(userRole.equalsIgnoreCase(AppConstantsBuds.operator)) {
				
				if(id != null) {
					
					existingEquipmentDetails = equipmentHeaderRepository.equipmentDetailsById(id);
					
					String[] ignoreProps = { "operator_status", "operator_save_by", "operator_save_on", "operator_save_id", 
	                         "operator_submitted_by", "operator_submitted_on", "operator_submitted_id", 
	                         "operator_sign", "supervisor_status", "supervisor_submit_on", 
	                         "supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", 
	                         "hod_status", "hod_submit_on", "hod_submit_by", "hod_submit_id", 
	                         "hod_sign", "hod_signature_image", "operator_signature_image", 
	                         "supervisor_signature_image", "createdAt", "createdBy" };

					BeanUtils.copyProperties(equipmentDetails, existingEquipmentDetails, ignoreProps);
					
				} else {
					existingEquipmentDetails = equipmentDetails;
				}
				
				existingEquipmentDetails.setOperator_status(AppConstants.operatorSave);
				existingEquipmentDetails.setOperator_save_by(userName);
				existingEquipmentDetails.setOperator_save_id(userId);
				existingEquipmentDetails.setOperator_save_on(date);
				
				equipmentHeaderRepository.save(existingEquipmentDetails);
				
				List<BudsEquipmentUsuageLine> equipmentLine = existingEquipmentDetails.getEquipmentLine();
				
				for(BudsEquipmentUsuageLine line : equipmentLine) {
					
					Long lineId = line.getId();
					
					if(lineId != null) {
						BudsEquipmentUsuageLine existingLine = equipmentLineRepository.equipmentUsuageLineById(lineId);
						line.setEquipmentId(existingEquipmentDetails.getEquipmentId());
					}
					
					equipmentLineRepository.save(line);
				}
				
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, userRole + " not authorized to save Equipment Ususge Details"));
			}
			
		} catch(Exception ex) {
			String msg = ex.getMessage();
			
			logger.error(" *** !!! Unable to save Equipment Usuage Details !!!*** " + msg);
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to save Equipment Ususage Details !!!" + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(equipmentDetails);
	}
	
	
		// SUBMIT EQUIPMENT USUAGE 
	
	public ResponseEntity<?> submitEquipmentUsuage(BudsEquipmentUsuageHeader equipmentDetails, HttpServletRequest http) {
		
		BudsEquipmentUsuageHeader existingEquipmentDetails = null;
		
		String userRole = getUserRole();
		
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			if(userRole.equalsIgnoreCase(AppConstantsBuds.operator)) {

				
				Long id = equipmentDetails.getEquipmentId();
				
				if(userRole.equalsIgnoreCase(AppConstantsBuds.operator)) {
					
					if(id != null) {
						
						existingEquipmentDetails = equipmentHeaderRepository.equipmentDetailsById(id);
						
						String[] ignoreProps = { "operator_status", "operator_save_by", "operator_save_on", "operator_save_id", 
		                         "operator_submitted_by", "operator_submitted_on", "operator_submitted_id", 
		                         "operator_sign", "supervisor_status", "supervisor_submit_on", 
		                         "supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", 
		                         "hod_status", "hod_submit_on", "hod_submit_by", "hod_submit_id", 
		                         "hod_sign", "hod_signature_image", "operator_signature_image", 
		                         "supervisor_signature_image", "createdAt", "createdBy" };

						BeanUtils.copyProperties(equipmentDetails, existingEquipmentDetails, ignoreProps);
						
					
					} else {
						existingEquipmentDetails = equipmentDetails;
					}
					
					existingEquipmentDetails.setOperator_status(AppConstants.operatorApprove);
					existingEquipmentDetails.setOperator_submitted_by(userName);
					existingEquipmentDetails.setOperator_submitted_on(date);
					existingEquipmentDetails.setOperator_submitted_id(userId);
					
					existingEquipmentDetails.setSupervisor_status(AppConstants.waitingStatus);
					existingEquipmentDetails.setHod_status("");
					
					equipmentHeaderRepository.save(existingEquipmentDetails);
					
					List<BudsEquipmentUsuageLine> equipmentLine = existingEquipmentDetails.getEquipmentLine();
					
					for(BudsEquipmentUsuageLine line : equipmentLine) {
						
						Long lineId = line.getId();
						
						if(lineId != null) {
							BudsEquipmentUsuageLine existingLine = equipmentLineRepository.equipmentUsuageLineById(lineId);
							line.setEquipmentId(existingEquipmentDetails.getEquipmentId());
						}
						
						equipmentLineRepository.save(line);
					}
					
						// SAVE TO HISTORY
					
					String ignorePropsHistory[] = { "equipmentId","equipmentLine" };
					
					BudsEquipmentUsuageHeaderHistory equipmentUsuageHeaderHistory = new BudsEquipmentUsuageHeaderHistory();
					
					BeanUtils.copyProperties(existingEquipmentDetails, equipmentUsuageHeaderHistory, ignorePropsHistory);
					
					String equipmentDate = equipmentUsuageHeaderHistory.getEquipmentDate();
					String equipmentShift = equipmentUsuageHeaderHistory.getEquipmentShift();
					String bmrNo = equipmentUsuageHeaderHistory.getSaleOrderNo();
					
					int version = equipmentHeaderRepositoryHistory.getMaximumVersion(equipmentDate, equipmentShift, bmrNo).map(temp -> temp + 1).orElse(1);
					equipmentUsuageHeaderHistory.setVersion(version);
					
					equipmentHeaderRepositoryHistory.save(equipmentUsuageHeaderHistory);
					
						// SAVE LINE
					
					List<BudsEquipmentUsuageLine> existingEquipLine = existingEquipmentDetails.getEquipmentLine();
					
					for(BudsEquipmentUsuageLine line : existingEquipLine) {
						
						BudsEquipmentUsuageLineHistory lineHistory = new BudsEquipmentUsuageLineHistory();
						
						BeanUtils.copyProperties(line, lineHistory);
						lineHistory.setEquipmentId(equipmentUsuageHeaderHistory.getEquipmentId());
						
						equipmentLineRepositoryHistory.save(lineHistory);

						
					}
					
					try {
						mailFunction.equipmentMailSupervisor(existingEquipmentDetails);
					} catch (Exception ex) {
						return new ResponseEntity<>(
								new ApiResponse(false, "Operator Submitted but Unable to send mail to Supervisor !!! "),
								HttpStatus.OK);
					}
					
				}
				
			
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, userRole + " not authorized to submit equipment !!!"));
			}
			
		} catch(Exception ex) {
			String msg = ex.getMessage();
			
			logger.error(" *** !!! Unable to submit Equipment Usuage Details !!!*** " + msg);
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Failed to submit Equipment Ususage Details !!!" + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Operator Submitted Successfully"));
	}
	
		// APPROVE EQUIPMENT USUAGE 
	
	public ResponseEntity<?> approveEquipmentUsuage(ApproveResponse approveResponse, HttpServletRequest http) {
		
		String userRole = getUserRole();
		
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			Long id = approveResponse.getId();
			
			BudsEquipmentUsuageHeaderHistory equipmentHistory = new BudsEquipmentUsuageHeaderHistory();
			
			BudsEquipmentUsuageHeader equipmentUsuage = equipmentHeaderRepository.equipmentDetailsById(id);
			
			System.out.println("Equipment Usugae");
			
			String supervisorStatus = equipmentUsuage.getSupervisor_status();
			
			String operatorStatus = equipmentUsuage.getOperator_status();
			
			
			
			String equipDate = equipmentUsuage.getEquipmentDate();
			
			String equipShift = equipmentUsuage.getEquipmentShift();
			
			String bmrNo = equipmentUsuage.getSaleOrderNo();
			
			if(userRole.equalsIgnoreCase(AppConstantsBuds.supervisor)) {
				
				if(operatorStatus.equalsIgnoreCase(AppConstants.operatorApprove) && supervisorStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
					
					if(approveResponse.getStatus().equalsIgnoreCase(AppConstantsBuds.approvalStatus)) {
						
						equipmentUsuage.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						equipmentUsuage.setSupervisor_sign(userName);
						equipmentUsuage.setSupervisor_submit_by(userName);
						equipmentUsuage.setSupervisor_submit_on(date);
						equipmentUsuage.setSupervisor_submit_id(userId);
						
						equipmentUsuage.setHod_status(AppConstants.waitingStatus);
						
						equipmentHeaderRepository.save(equipmentUsuage);
						
							// SAVE TO HISTORY
						
						equipmentHistory = equipmentHeaderRepositoryHistory.fetchLastSubmittedRecord(equipDate, equipShift, bmrNo);
						
						equipmentHistory.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						equipmentHistory.setSupervisor_sign(userName);
						equipmentHistory.setSupervisor_submit_by(userName);
						equipmentHistory.setSupervisor_submit_on(date);
						equipmentHistory.setSupervisor_submit_id(userId);
						
						equipmentHistory.setHod_status(AppConstants.waitingStatus);
						
						equipmentHeaderRepositoryHistory.save(equipmentHistory);
						
						try {
							mailFunction.equipmentMailHod(equipmentUsuage);
						} catch (Exception ex) {
							return new ResponseEntity<>(
									new ApiResponse(false, "Supervisor Approved but Unable to send mail to HOD !!! "),
									HttpStatus.OK);
						}
						
						return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Supervisor Approved Successfully"));
						
					} else if(approveResponse.getStatus().equalsIgnoreCase(AppConstantsBuds.rejectedStatus)) {
						
						equipmentUsuage.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						equipmentUsuage.setSupervisor_sign(userName);
						equipmentUsuage.setSupervisor_submit_by(userName);
						equipmentUsuage.setSupervisor_submit_on(date);
						equipmentUsuage.setSupervisor_submit_id(userId);
						
						equipmentUsuage.setRejectReason(approveResponse.getRemarks());
						
						equipmentHeaderRepository.save(equipmentUsuage);
						
						// SAVE TO HISTORY
						
						equipmentHistory = equipmentHeaderRepositoryHistory.fetchLastSubmittedRecord(equipDate, equipShift, bmrNo);
						
						equipmentHistory.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						equipmentHistory.setSupervisor_sign(userName);
						equipmentHistory.setSupervisor_submit_by(userName);
						equipmentHistory.setSupervisor_submit_on(date);
						equipmentHistory.setSupervisor_submit_id(userId);
						
						equipmentHistory.setRejectReason(approveResponse.getRemarks());
						
						equipmentHeaderRepositoryHistory.save(equipmentHistory);
						
						return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Supervisor Rejected Successfully"));
						
						
					} else {
						return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Invalid Status !!!"));
					}
					
				} else {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Please Check previous Approvals !!!"));
				}
				
			} else if(userRole.equalsIgnoreCase(AppConstantsBuds.hod)) {
				
				String hodStatus = equipmentUsuage.getHod_status();
				
				if(supervisorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
					
					if(approveResponse.getStatus().equalsIgnoreCase(AppConstantsBuds.approvalStatus)) {
						equipmentUsuage.setHod_status(AppConstants.hodApprovedStatus);
						equipmentUsuage.setHod_sign(userName);
						equipmentUsuage.setHod_submit_by(userName);
						equipmentUsuage.setHod_submit_id(userId);
						equipmentUsuage.setHod_submit_on(date);
						
						equipmentHeaderRepository.save(equipmentUsuage);
						
						// SAVE TO HISTORY
						
						equipmentHistory = equipmentHeaderRepositoryHistory.fetchLastSubmittedRecord(equipDate, equipShift, bmrNo);
						
						equipmentHistory.setHod_status(AppConstants.hodApprovedStatus);
						equipmentHistory.setHod_sign(userName);
						equipmentHistory.setHod_submit_by(userName);
						equipmentHistory.setHod_submit_id(userId);
						equipmentHistory.setHod_submit_on(date);
						
						equipmentHeaderRepositoryHistory.save(equipmentHistory);
						
						return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Hod Approved Successfully"));
						
						
					} else if(approveResponse.getStatus().equalsIgnoreCase(AppConstantsBuds.rejectedStatus)) {
						
						equipmentUsuage.setHod_status(AppConstants.hodRejectedStatus);
						equipmentUsuage.setHod_sign(userName);
						equipmentUsuage.setHod_submit_by(userName);
						equipmentUsuage.setHod_submit_id(userId);
						equipmentUsuage.setHod_submit_on(date);
						
						equipmentUsuage.setRejectReason(approveResponse.getRemarks());
						
						equipmentHeaderRepository.save(equipmentUsuage);
						
						// SAVE HISTORY
						
						equipmentHistory = equipmentHeaderRepositoryHistory.fetchLastSubmittedRecord(equipDate, equipShift, bmrNo);
						
						equipmentHistory.setHod_status(AppConstants.hodRejectedStatus);
						equipmentHistory.setHod_sign(userName);
						equipmentHistory.setHod_submit_by(userName);
						equipmentHistory.setHod_submit_id(userId);
						equipmentHistory.setHod_submit_on(date);
						
						equipmentHeaderRepositoryHistory.save(equipmentHistory);
						
						return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Hod Rejected Successfully"));
						
					} else {
						return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Please Check previous Approvals !!!"));
					}

				}
				
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, userRole + " not authroize for Equipment Approvals !!! "));
			}
			
		} catch(Exception ex) {
			
			String msg = ex.getLocalizedMessage();
			
			logger.error("!!! *** Unable to approve Equipment !!! ***" + ex);
			ex.printStackTrace();
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Unable to approve Equipment Usuage") + msg);
			
		}
		return null;
		
	}
	
	
	// DELETE EQUIPMENT USUAGE LINE 
	
	public ResponseEntity<?> deleteEquipmentUsuageLine(Long id) {

		BudsEquipmentUsuageLine equipmentUsuageLine = new BudsEquipmentUsuageLine();

		try {

			equipmentUsuageLine = equipmentLineRepository.equipmentUsuageLineById(id);

			if (equipmentUsuageLine != null) {
				equipmentLineRepository.deleteEquipmentLineById(id);
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(new ApiResponse(false, " data not found !!!"));
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();

			logger.error(" *** !!! Unable to delete Equipment Line !!!*** " + msg);

			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse(false, "Failed to delete Equipment line !!!" + msg));
		}

		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Equipment Usuage Line Deleted "));
	}
		
	
	public ResponseEntity<?> getEquipmentUsuageSummary() {
		
		String userRole = getUserRole();
		
		List<BudsEquipmentUsuageHeader> equipmentDetailsList = new LinkedList<BudsEquipmentUsuageHeader>();
		
		try {
			
			if(userRole.equalsIgnoreCase(AppConstantsBuds.operator)) {
				
				equipmentDetailsList = equipmentHeaderRepository.equipmentDetailsForOperator();
				
			} else if(userRole.equalsIgnoreCase(AppConstantsBuds.supervisor) || userRole.equalsIgnoreCase(AppConstantsBuds.hod) || userRole.equalsIgnoreCase(AppConstantsBuds.designee)) {
				
				equipmentDetailsList = equipmentHeaderRepository.equipmentDetailsForSupervisor();
				
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(new ApiResponse(false, userRole + " not authorized to access Equipment Usuage Details !!!"));
			}
			
		} catch (Exception ex) {
			String msg = ex.getMessage();

			logger.error(" *** !!! Unable to get Equipment Usuage Details !!!*** " + msg);

			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse(false, "Failed to get Equipment Usuage Details !!!" + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(equipmentDetailsList);
	}
	
	
	public ResponseEntity<?> getEquipmentDetailsByUnique(String date, String shift, String bmrNumber) {
		
		List<BudsEquipmentUsuageHeader> equipmentDetailsList = new LinkedList<BudsEquipmentUsuageHeader>();
		
		try {
			
			equipmentDetailsList = equipmentHeaderRepository.equipmentUsuageDetailsByUnique(date, shift, bmrNumber);
			
		} catch (Exception ex) {
			String msg = ex.getMessage();

			logger.error(" *** !!! Unable to get Equipment Usuage Details !!!*** " + msg);

			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse(false, "Failed to get Equipment Usuage Details !!!" + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(equipmentDetailsList);
	}
	
	
		// PRINT EQUIPMENT DETAILS
	
	public ResponseEntity<?> printEquipmentUsuageDetails(String date, String shift,  Integer year,Integer month) {
		
		List<BudsEquipmentUsuageHeader> equipmentHeaderList = new LinkedList<BudsEquipmentUsuageHeader>();
		
		try {
			
			equipmentHeaderList = equipmentHeaderRepository.printEquipmentUsuageDetails(date, shift, year, month);
			
		} catch (Exception ex) {
			String msg = ex.getMessage();

			logger.error(" *** !!! Unable to get print Equipment Usuage Details !!!*** " + msg);

			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse(false, "Failed to get print  Equipment Usuage Details !!!" + msg));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(equipmentHeaderList);
	}
	
	
	public ResponseEntity<?> getqamanager() {
		 
		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();
 
		try {
			orderProductResponse = userRepository.getbudsByDepartment();
 
			if (orderProductResponse.isEmpty() || orderProductResponse == null) {
 
			} else {
 
				Long id = (long) 1;
 
				for (String order : orderProductResponse) {
					IdAndValuePair values = new IdAndValuePair();
					values.setId(id);
					values.setType(order);
					values.setValue(order);
					responseList.add(values);
					id++;
				}
			}
 
		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Error fetching Order Number Details with Pads category : " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to get Order Number Details with Pads category. "),
					HttpStatus.BAD_REQUEST);
		}
 
		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}
	
	public ResponseEntity<?> getsupervisoname() {
 
		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();
 
		try {
			orderProductResponse = userRepository.getbudssupervisorByDepartment();
 
			if (orderProductResponse.isEmpty() || orderProductResponse == null) {
 
			} else {
 
				Long id = (long) 1;
 
				for (String order : orderProductResponse) {
					IdAndValuePair values = new IdAndValuePair();
					values.setId(id);
					values.setType(order);
					values.setValue(order);
					responseList.add(values);
					id++;
				}
			}
 
		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Error fetching Order Number Details with Pads category : " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to get Order Number Details with Pads category. "),
					HttpStatus.BAD_REQUEST);
		}
 
		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}
	
	
	public ResponseEntity<?> getinspectoroname() {
 
		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();
 
		try {
			orderProductResponse = userRepository.getinspectorByDepartment();
 
			if (orderProductResponse.isEmpty() || orderProductResponse == null) {
 
			} else {
 
				Long id = (long) 1;
 
				for (String order : orderProductResponse) {
					IdAndValuePair values = new IdAndValuePair();
					values.setId(id);
					values.setType(order);
					values.setValue(order);
					responseList.add(values);
					id++;
				}
			}
 
		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Error fetching Order Number Details with Pads category : " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to get Order Number Details with Pads category. "),
					HttpStatus.BAD_REQUEST);
		}
 
		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}
	public ResponseEntity<?> gethodname() {
 
		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();
 
		try {
			orderProductResponse = userRepository.getHodByDepartment();
 
			if (orderProductResponse.isEmpty() || orderProductResponse == null) {
 
			} else {
 
				Long id = (long) 1;
 
				for (String order : orderProductResponse) {
					IdAndValuePair values = new IdAndValuePair();
					values.setId(id);
					values.setType(order);
					values.setValue(order);
					responseList.add(values);
					id++;
				}
			}
 
		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Error fetching Order Number Details with Pads category : " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to get Order Number Details with Pads category. "),
					HttpStatus.BAD_REQUEST);
		}
 
		return new ResponseEntity<>(responseList, HttpStatus.OK);
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
