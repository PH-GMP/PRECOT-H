package com.focusr.Precot.mssql.database.service.Store;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

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

import com.focusr.Precot.mssql.database.model.UserImageDetails;
import com.focusr.Precot.mssql.database.model.Store.EyeWashConditionChecklistF009;
import com.focusr.Precot.mssql.database.model.Store.ForkliftMovementCheckListF008;
import com.focusr.Precot.mssql.database.model.Store.MaterialInwardRegister;
import com.focusr.Precot.mssql.database.model.Store.NonReturnableGatePassF006;
import com.focusr.Precot.mssql.database.model.Store.NonReturnableGoodsDetail;
import com.focusr.Precot.mssql.database.model.Store.ReceptionCheckListF003;
import com.focusr.Precot.mssql.database.model.Store.audit.EyeWashConditionChecklistHistoryF009;
import com.focusr.Precot.mssql.database.model.Store.audit.ForkliftMovementCheckListHistoryF008;
import com.focusr.Precot.mssql.database.model.Store.audit.NonReturnableGatePassHistoryF006;
import com.focusr.Precot.mssql.database.model.Store.audit.NonReturnableGoodsDetailHistory;
import com.focusr.Precot.mssql.database.model.Store.audit.ReceptionCheckListHistoryF003;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.Store.EyeWashConditionChecklistRepoF009;
import com.focusr.Precot.mssql.database.repository.Store.ForkliftMovementCheckListRepositoryF008;
import com.focusr.Precot.mssql.database.repository.Store.MaterialInwardRegisterRepo;
import com.focusr.Precot.mssql.database.repository.Store.NonReturnableGatePassRepositoryF006;
import com.focusr.Precot.mssql.database.repository.Store.NonReturnableGoodsDetailRepo;
import com.focusr.Precot.mssql.database.repository.Store.ReceptionCheckListRepositoryF003;
import com.focusr.Precot.mssql.database.repository.Store.audit.EyeWashConditionChecklistHistoryRepoF009;
import com.focusr.Precot.mssql.database.repository.Store.audit.ForkliftMovementCheckListHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Store.audit.NonReturnableGatePassHistoryRepositoryF006;
import com.focusr.Precot.mssql.database.repository.Store.audit.NonReturnableGoodsDetailHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Store.audit.ReceptionCheckListHistoryRepositoryF003;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.Store.AppConstantStore;



@Service
public class StoreService9 {



	Logger logger = LoggerFactory.getLogger(StoreService9.class);
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtTokenProvider tokenProvider;
	
	@Autowired
	private UserImageDetailsRepository imageRepository;
	
	@Autowired
	private SCAUtil scaUtil;
	
	
	@Autowired 
	private ReceptionCheckListRepositoryF003 receptionCheckListRepository;
	
	
	@Autowired 
private ReceptionCheckListHistoryRepositoryF003 receptionCheckListHistoryRepository;
	
	@Autowired
	private NonReturnableGatePassRepositoryF006 NonReturnableGatePassRepo;
	
	@Autowired
private NonReturnableGatePassHistoryRepositoryF006 NonReturnableGatePassHistoryRepo;
	
	 @Autowired
	    private NonReturnableGoodsDetailHistoryRepo nonReturnableGoodsDetailHistoryRepo;
	 
	 @Autowired
	 private NonReturnableGoodsDetailRepo NonReturnableGoodsRepo;
	 
	 @Autowired
	 private ForkliftMovementCheckListRepositoryF008 ForkliftCheckListRepo;
	 
	 @Autowired 
	 private ForkliftMovementCheckListHistoryRepo forkCheckListHistoryRepo;
	 
	 @Autowired
	 private EyeWashConditionChecklistHistoryRepoF009 eyeChecklistHistoryRepoF009;
	 
	 @Autowired 
	 private EyeWashConditionChecklistRepoF009 EyeWashChecklistRepo;
	 
	 
	 @Autowired
     private StoreMailFunction mailFunction;
	 
	 @Autowired
	 private MaterialInwardRegisterRepo materialInwardRepo ;
	
	
	Logger log = LoggerFactory.getLogger(StoreService9.class);

	SCAUtil sca = new SCAUtil();
	
	
	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}
	
	public List<String> getAllUniqueInvoiceNumbers() {
        return receptionCheckListRepository.findAllUniqueInvoiceNumbers();
    }
	
	public List<String> getDescriptionsByInvoiceNo(String invoiceNo) {
        List<ReceptionCheckListF003> records = receptionCheckListRepository.findByInvoiceNo(invoiceNo);
        return records.stream()
                      .map(ReceptionCheckListF003::getDescription)
                      .collect(Collectors.toList());
    }
	
	 public List<String> getAllGatePassNos() {
	        return NonReturnableGatePassRepo.findAllGatePassNos();
	    }
	
	
public ResponseEntity<?> saveReceptionChecklist(ReceptionCheckListF003 receptionCheckList, HttpServletRequest http) {
		
		try {
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			
			if(userRole.equals("STORE_OPERATOR")) {
				
				Long rawId = receptionCheckList.getId();
				
				if(rawId != null)
				{
					ReceptionCheckListF003 ReceptionCheckList = new ReceptionCheckListF003();	
					ReceptionCheckList = receptionCheckListRepository.fetchReceptionChecklistById(rawId);
					receptionCheckList.setCreatedAt(ReceptionCheckList.getCreatedAt());
					receptionCheckList.setCreatedBy(ReceptionCheckList.getCreatedBy());
					receptionCheckListRepository.save(receptionCheckList);
				}
				
				receptionCheckList.setOperator_status(AppConstantStore.operatorSave);
				receptionCheckList.setOperator_saved_on(date);
				receptionCheckList.setOperator_saved_by(userName);
				receptionCheckList.setOperator_saved_id(userId);
				
				receptionCheckListRepository.save(receptionCheckList);
				
			} else {
				
				return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to save form !!! "), HttpStatus.BAD_REQUEST);
				
			}
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			log.error("Unable to Save Record" + msg);

			return new ResponseEntity(
					new ApiResponse(false, "Failed to Save Reception Check List" + msg),
					HttpStatus.BAD_REQUEST);
			
			
		}
		return new ResponseEntity(receptionCheckList, HttpStatus.CREATED);
		
	}

public ResponseEntity<?> submitReceptionChecklist(
		@RequestBody ReceptionCheckListF003 ReceptionCheckList, HttpServletRequest http) {
	if (ReceptionCheckList == null) {
		return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
				HttpStatus.BAD_REQUEST);
	}

	SCAUtil scaUtil = new SCAUtil();
	Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
	String userName = userRepository.getUserName(userId);
	String role = sca.getUserRoleFromRequest(http, tokenProvider);

	Long id = ReceptionCheckList.getId();
	ReceptionCheckListF003 bleachObj = new ReceptionCheckListF003();
	// Get the current time
	LocalDateTime now = LocalDateTime.now();
	Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
	


	try {
		String missingField = "";
		if (ReceptionCheckList.getFormatNo() == null)
			missingField = "formatNo";
		if (ReceptionCheckList.getSopNumber() == null)
			missingField = "sopNumber";
		if (ReceptionCheckList.getRevisionNo() == null)
			missingField = "revisionNo";

		if (!missingField.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
					HttpStatus.BAD_REQUEST);
		}

		if (id != null) {
			bleachObj = receptionCheckListRepository.fetchReceptionChecklistById(id);
			if (bleachObj == null) {
				return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
			}
		}
		ReceptionCheckList.setCreatedAt(bleachObj.getCreatedAt());
		ReceptionCheckList.setCreatedBy(bleachObj.getCreatedBy());

			String currentStatus = bleachObj.getOperator_status();
			String currentMailStatus = bleachObj.getMailStatus();

			if ("STORE_OPERATOR".equalsIgnoreCase(role)) {

				if (!AppConstantStore.StoreInchargeAPPROVED.equals(currentStatus)) 
				{

					ReceptionCheckList.setOperator_status(AppConstantStore.operatorApproved);
					ReceptionCheckList.setOperator_submit_on(date);
					ReceptionCheckList.setOperator_sign(userName);
					ReceptionCheckList.setOperator_submit_by(userName);
					ReceptionCheckList.setOperator_submit_id(userId);
					ReceptionCheckList.setStore_in_charge_status(AppConstantStore.waitingStatus);
					ReceptionCheckList.setMailStatus(AppConstantStore.waitingStatus);;
					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					ReceptionCheckList.setOperator_Signature(signature);
					
					receptionCheckListRepository.save(ReceptionCheckList);
					

					
					// HISTORY
					
					ReceptionCheckListHistoryF003 ReceptionCheckListHistory = new ReceptionCheckListHistoryF003();
					
					ReceptionCheckListHistory.setUnit(ReceptionCheckList.getUnit());
					ReceptionCheckListHistory.setFormatName(ReceptionCheckList.getFormatName());
					ReceptionCheckListHistory.setFormatNo(ReceptionCheckList.getFormatNo());
					ReceptionCheckListHistory.setRevisionNo(ReceptionCheckList.getRevisionNo());
					ReceptionCheckListHistory.setSopNumber(ReceptionCheckList.getSopNumber());
					ReceptionCheckListHistory.setDate(ReceptionCheckList.getDate());
					ReceptionCheckListHistory.setNoOfBalesOrCansCount(ReceptionCheckList.getNoOfBalesOrCansCount());
					ReceptionCheckListHistory.setInvoiceNo(ReceptionCheckList.getInvoiceNo());
					ReceptionCheckListHistory.setDescription(ReceptionCheckList.getDescription());
					ReceptionCheckListHistory.setTotalQuantity(ReceptionCheckList.getTotalQuantity());
					ReceptionCheckListHistory.setNoOfBalesOrCans(ReceptionCheckList.getNoOfBalesOrCans());
					ReceptionCheckListHistory.setWeight(ReceptionCheckList.getWeight());
					ReceptionCheckListHistory.setVehicleNo(ReceptionCheckList.getVehicleNo());
					ReceptionCheckListHistory.setOrganicIdentification(ReceptionCheckList.getOrganicIdentification());
					ReceptionCheckListHistory.setVehicleCondition(ReceptionCheckList.getVehicleCondition());
					ReceptionCheckListHistory.setPackingCondition(ReceptionCheckList.getPackingCondition());
					ReceptionCheckListHistory.setWetCondition(ReceptionCheckList.getWetCondition());
					ReceptionCheckListHistory.setContamination(ReceptionCheckList.getContamination());
					ReceptionCheckListHistory.setRemarks(ReceptionCheckList.getRemarks());
					ReceptionCheckListHistory.setSupplierName(ReceptionCheckList.getSupplierName());
					
//					 Version 
					
					
					

						// STATUS
					ReceptionCheckListHistory.setOperator_status(ReceptionCheckList.getOperator_status());
					ReceptionCheckListHistory.setOperator_sign(ReceptionCheckList.getOperator_sign());
					ReceptionCheckListHistory.setOperator_submit_by(ReceptionCheckList.getOperator_submit_by());
					ReceptionCheckListHistory.setOperator_submit_id(ReceptionCheckList.getOperator_submit_id());
					ReceptionCheckListHistory.setOperator_submit_on(ReceptionCheckList.getOperator_submit_on());
					ReceptionCheckListHistory.setStore_in_charge_status(ReceptionCheckList.getStore_in_charge_status());
					
					
					
//					Version
					String 	Invoice  = ReceptionCheckListHistory.getInvoiceNo();
					
					String 	Description  = ReceptionCheckListHistory.getDescription();	
					
					int version = receptionCheckListHistoryRepository.getMaximumVersion(Invoice,Description)
							.map(temp -> temp + 1).orElse(1);

					ReceptionCheckListHistory.setVersion(version);
	                
	               
					
					
					
					receptionCheckListHistoryRepository.save(ReceptionCheckListHistory);

					try {

						mailFunction.sendEmailToStoreIncharge03(ReceptionCheckList);
					} catch (Exception ex) {
						return new ResponseEntity<>(
								new ApiResponse(false, "STORE_OPERATOR Approved but Unable to send mail to HOD! "),
								HttpStatus.OK);
					}
				}
				
				else {
					return new ResponseEntity<>(new ApiResponse(false, "INCHARGE already approved"),
							HttpStatus.BAD_REQUEST);
				}
			} 

			else {
				return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
						HttpStatus.FORBIDDEN);
			}

	} catch (Exception ex) {
		logger.error(" **** Unable to submit Reception Check List Details **** ", ex);
		return new ResponseEntity<>(
				new ApiResponse(false, "Unable to submit Reception Check List Details: " + ex.getMessage()),
				HttpStatus.BAD_REQUEST);
	}

	return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"),
			HttpStatus.OK);
}



public ResponseEntity<?> approveRejectReceptionChecklist(ApproveResponse approveResponse, HttpServletRequest http) {
	
	SCAUtil sca = new SCAUtil();
	
	ReceptionCheckListF003 ReceptionCheckList = new ReceptionCheckListF003();
	
	String userRole = getUserRole();
	Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	String userName = userRepository.getUserName(userId);
	LocalDateTime currentDate = LocalDateTime.now();
	Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
	
	try {
		
		ReceptionCheckList = receptionCheckListRepository.fetchReceptionChecklistById(approveResponse.getId());
		
		
		ReceptionCheckListHistoryF003 ReceptionCheckListHistory = new ReceptionCheckListHistoryF003();
		
		String supervisiorStatus = ReceptionCheckList.getOperator_status();
		
		String hodStatus = ReceptionCheckList.getStore_in_charge_status();
		
		UserImageDetails imageDetails = new UserImageDetails();
		
		if(supervisiorStatus.equalsIgnoreCase(AppConstantStore.operatorApproved) && hodStatus.equalsIgnoreCase(AppConstantStore.waitingStatus)) {
			
			if(userRole.equalsIgnoreCase("STORE_INCHARGE") ) {
				
				if(approveResponse.getStatus().equals("Approve")) {
					
					ReceptionCheckList.setStore_in_charge_status(AppConstantStore.StoreInchargeAPPROVED);
					ReceptionCheckList.setStore_in_charge_submit_on(date);
					ReceptionCheckList.setStore_in_charge_submit_by(userName);
					ReceptionCheckList.setStore_in_charge_submit_id(userId);
					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					ReceptionCheckList.setStore_in_charge_Signature(signature);
					
					ReceptionCheckList.setStore_in_charge_sign(userName);
					
					receptionCheckListRepository.save(ReceptionCheckList);
					
					ReceptionCheckListHistory = receptionCheckListHistoryRepository.fetchLastSubmittedReceptionCheckList(ReceptionCheckList.getInvoiceNo(), ReceptionCheckList.getDescription());
					
					ReceptionCheckListHistory.setStore_in_charge_status(AppConstantStore.StoreInchargeAPPROVED);
					ReceptionCheckListHistory.setStore_in_charge_submit_on(date);
					ReceptionCheckListHistory.setStore_in_charge_submit_by(userName);
					ReceptionCheckListHistory.setStore_in_charge_sign(userName);
					ReceptionCheckListHistory.setStore_in_charge_submit_id(userId);
				
					
					receptionCheckListHistoryRepository.save(ReceptionCheckListHistory);
					
					return new ResponseEntity<>(new ApiResponse(true, "STORE_INCHARGE Approved Successfully"), HttpStatus.OK);
					
				}
				
				else if(approveResponse.getStatus().equals("Reject")) {
					
					String reason = approveResponse.getRemarks();
					ReceptionCheckList.setReason(reason);
					ReceptionCheckList.setStore_in_charge_status(AppConstantStore.StoreInchargeREJECTED);
					ReceptionCheckList.setStore_in_charge_submit_on(date);
					ReceptionCheckList.setStore_in_charge_submit_id(userId);
					ReceptionCheckList.setStore_in_charge_submit_by(userName);
					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					ReceptionCheckList.setStore_in_charge_Signature(signature);
					
					ReceptionCheckList.setStore_in_charge_sign(userName);
					
					receptionCheckListRepository.save(ReceptionCheckList);

					
					ReceptionCheckListHistory = receptionCheckListHistoryRepository.fetchLastSubmittedReceptionCheckList(ReceptionCheckList.getInvoiceNo(), ReceptionCheckList.getDescription());
					
					ReceptionCheckListHistory.setStore_in_charge_status(AppConstantStore.StoreInchargeREJECTED);
					ReceptionCheckListHistory.setReason(reason);
					ReceptionCheckListHistory.setStore_in_charge_submit_on(date);
					ReceptionCheckListHistory.setStore_in_charge_submit_by(userName);
					ReceptionCheckList.setStore_in_charge_submit_id(userId);
					ReceptionCheckListHistory.setStore_in_charge_sign(userName);
					
					receptionCheckListHistoryRepository.save(ReceptionCheckListHistory);
					
					return new ResponseEntity<>(new ApiResponse(true, "STORE_INCHARGE Rejected Successfully"), HttpStatus.OK);
					
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




public ResponseEntity<?> getReceptionCheckListSummary() {
	
	String userRole = getUserRole();
	
	List<ReceptionCheckListF003> ReceptionCheckList = new ArrayList<>();
	
	try {
		
		if(userRole.equals("STORE_OPERATOR")) {
			
			
			ReceptionCheckList = receptionCheckListRepository.ReceptionChecklistSummaryforAssistant();
			
		} else if(userRole.equals("STORE_INCHARGE")) {
			
			ReceptionCheckList = receptionCheckListRepository.ReceptionChecklistSummaryforHod();
			
		} else {
			return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to access ReceptionCheckList form"), HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(ReceptionCheckList, HttpStatus.OK);
	} catch(Exception ex) {
		String msg = ex.getMessage();
		ex.printStackTrace();
		logger.error("Unable to get summary record" + msg);
		return new ResponseEntity(
				new ApiResponse(false, "Failed to get summary record" + msg),
				HttpStatus.BAD_REQUEST);
	}
	
	
	
}



//public ResponseEntity<?> getReceptionCheckListSummaryPrint(String date) {
//	
//	List<ReceptionCheckListF003> ReceptionCheckList = new ArrayList<>();
//	
//	try {
//		ReceptionCheckList = receptionCheckListRepository.getMonthlyplanSummaryPrint(date);
//		
//	} catch(Exception ex) {
//		String msg = ex.getMessage();
//		ex.printStackTrace();
//		logger.error("Unable to get hand Sanitation List" + msg);
//		return new ResponseEntity(
//				new ApiResponse(false, "Unable to get hand Sanitation List" + msg),
//				HttpStatus.BAD_REQUEST);
//	}
//	
//	return new ResponseEntity(ReceptionCheckList, HttpStatus.OK);
//
//}


//public ResponseEntity<?> getReceptionCheckListSummaryPrint(String year, String month, String date) {
//    List<ReceptionCheckListF003> receptionCheckList = new ArrayList<>();
//
//    try {
//        if (date != null && !date.isEmpty()) {
//            receptionCheckList = receptionCheckListRepository.getReceptionCheckListByDate(date);
//        } else if (year != null && !year.isEmpty() && month != null && !month.isEmpty()) {
//            receptionCheckList = receptionCheckListRepository.getReceptionCheckListByYearAndMonth(year, month);
//        } else if (year != null && !year.isEmpty()) {
//            receptionCheckList = receptionCheckListRepository.getReceptionCheckListByYear(year);
//        }
//    } catch (Exception ex) {
//        String msg = ex.getMessage();
//        logger.error("Unable to get Reception Check List: " + msg);
//        return new ResponseEntity<>(
//                new ApiResponse(false, "Unable to get Reception Check List: " + msg),
//                HttpStatus.BAD_REQUEST);
//    }
//
//    return new ResponseEntity<>(receptionCheckList, HttpStatus.OK);
//}


public ResponseEntity<?> getReceptionCheckListSummaryPrint(String year, String month, String invoice, String fromDate, String toDate) {
    List<ReceptionCheckListF003> receptionCheckList = new ArrayList<>();

    try {
        if (fromDate != null && toDate != null && !fromDate.isEmpty() && !toDate.isEmpty()) {
            // Fetch by date range
            receptionCheckList = receptionCheckListRepository.getReceptionCheckListByDateRange(fromDate, toDate);
        } else if (year != null && month != null && invoice != null 
                   && !year.isEmpty() && !month.isEmpty() && !invoice.isEmpty()) {
            // Fetch by year, month, and invoice
            receptionCheckList = receptionCheckListRepository.getReceptionCheckListByYearMonthInvoice(year, month, invoice);
        } else if (year != null && month != null && !year.isEmpty() && !month.isEmpty()) {
            // Fetch by year and month
            receptionCheckList = receptionCheckListRepository.getReceptionCheckListByYearAndMonth(year, month);
        } else if (year != null && !year.isEmpty()) {
            // Fetch by year only
            receptionCheckList = receptionCheckListRepository.getReceptionCheckListByYear(year);
        } else {
            return new ResponseEntity<>(
                    new ApiResponse(false, "Invalid input. Provide either year/month/invoice or fromDate/toDate."),
                    HttpStatus.BAD_REQUEST);
        }
    } catch (Exception ex) {
        String msg = ex.getMessage();
        logger.error("Unable to get Reception Check List: " + msg);
        return new ResponseEntity<>(
                new ApiResponse(false, "Unable to get Reception Check List: " + msg),
                HttpStatus.BAD_REQUEST);
    }

    return new ResponseEntity<>(receptionCheckList, HttpStatus.OK);
}


public ResponseEntity<?> getReceptionCheckListByInvoiceAndDescription(String invoiceNo, String description) {
    List<ReceptionCheckListF003> receptionCheckList = new ArrayList<>();
    try {
        receptionCheckList = receptionCheckListRepository.findByInvoiceNoAndDescription(invoiceNo, description);
    } catch (Exception ex) {
        String msg = ex.getMessage();
        ex.printStackTrace();
        logger.error("Unable to get Reception Check List: " + msg);
        return new ResponseEntity<>(new ApiResponse(false, "Unable to get Reception Check List: " + msg), HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(receptionCheckList, HttpStatus.OK);
}



//public ResponseEntity<?> saveNonReturnableGatePass(NonReturnableGatePassF006 nonReturnableGatePass, HttpServletRequest http) {
//	
//	try {
//		String userRole = getUserRole();
//		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//		String userName = userRepository.getUserName(userId);
//		LocalDateTime currentDate = LocalDateTime.now();
//		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//		
//		if(userRole.equals("STORE_INCHARGE")) {
//			
//			Long rawId = nonReturnableGatePass.getId();
//			
//			if(rawId != null)
//			{
//				NonReturnableGatePassF006 ReceptionCheckList = new NonReturnableGatePassF006();	
//				nonReturnableGatePass = NonReturnableGatePassRepo.fetchNonReturnableGateById(rawId);
//				nonReturnableGatePass.setCreatedAt(ReceptionCheckList.getCreatedAt());
//				nonReturnableGatePass.setCreatedBy(ReceptionCheckList.getCreatedBy());
//			}
//			
//			
//			
//			nonReturnableGatePass.setStoreInchargeStatus(AppConstantStore.StoreInchargestatussave);
//			nonReturnableGatePass.setStoreInchargeSavedOn(date);
//			nonReturnableGatePass.setStoreInchargeSavedBy(userName);
//			nonReturnableGatePass.setStoreInchargeSavedId(userId);
//			NonReturnableGatePassRepo.save(nonReturnableGatePass);
//			
//
//			
//			List<NonReturnableGoodsDetail> productionDataList = nonReturnableGatePass.getGoodsDetails();
//			
//			if(!productionDataList.isEmpty() || productionDataList != null) {
//				for (NonReturnableGoodsDetail data : productionDataList) {
//					data.setGatePass(nonReturnableGatePass);
//					NonReturnableGoodsRepo.save(data);
//				}
//			}
//
//            NonReturnableGatePassRepo.save(nonReturnableGatePass);  // Save the gate pass and related goods details
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
//				new ApiResponse(false, "Failed to Save Reception Check List" + msg),
//				HttpStatus.BAD_REQUEST);
//		
//		
//	}
//	return new ResponseEntity(nonReturnableGatePass, HttpStatus.CREATED);
//	
//}

//
//public String getLastGatePassNumber() {
//    // Fetch the latest gate pass number
//    String latestGatePassNo = NonReturnableGatePassRepo.findLatestGatePassNo();
//    if (latestGatePassNo != null) {
//        return latestGatePassNo;
//    } else {
//        throw new RuntimeException("No Gate Pass records found.");
//    }
//}

//public ResponseEntity<String> generateGatePassNumber() {
//    String lastGatePassNo = NonReturnableGatePassRepo.findLastgatepassnO(); // Fetch the last Gate Pass number
//    int number = 1; // Default sequence number
//    int currentYear = Year.now().getValue();
//    String yearPart;
//
//    try {
//        // Check if the last gate pass exists
//        if (lastGatePassNo != null) {
//            String[] parts = lastGatePassNo.split("/");
//
//            // Get the year range (24-25)
//            String lastYearRange = parts[0]; // e.g., "24-25"
//            String[] years = lastYearRange.split("-");
//            int lastYear = Integer.parseInt(years[0]) + 2000; // Convert "24" to 2024
//
//            // If the last gate pass was generated in the current year range, increment the sequence number
//            if (lastYear == currentYear) {
//                number = Integer.parseInt(parts[2]) + 1; // Increment the sequence number
//            }
//        }
//
//        // Generate the new Gate Pass number in the format "YY-YY/NRGP/000001"
//        String startYear = String.format("%02d", currentYear % 100);  // e.g., 24 for 2024
//        String endYear = String.format("%02d", (currentYear + 1) % 100);  // e.g., 25 for 2025
//        yearPart = startYear + "-" + endYear;  // e.g., "24-25"
//        
//        String sequenceNumber = String.format("%06d", number);  // Format the sequence as 6 digits
//        String gatePassNo = yearPart + "/NRGP/" + sequenceNumber; // Construct the Gate Pass number
//
//        // Optionally, save the new gate pass (if you want to persist it)
//        NonReturnableGatePassF006 newGatePass = new NonReturnableGatePassF006();
//        newGatePass.setGatePassNo(gatePassNo);
//        NonReturnableGatePassRepo.save(newGatePass);
//
//        // Return only the Gate Pass number
//        return ResponseEntity.ok(gatePassNo);
//
//    } catch (Exception ex) {
//        String msg = ex.getMessage();
//        log.error("**** Unable to generate Gate Pass **** " + ex);
//        return new ResponseEntity<>("Error: " + msg, HttpStatus.BAD_REQUEST);
//    }
//}

public ResponseEntity<String> generateGatePassNumber() {
    try {
        // Fetch the last gate pass number
        String lastGatePassNo = NonReturnableGatePassRepo.findLastgatepassnO();
 
        // If no gate pass is found, return the default value
        if (lastGatePassNo == null) {
            return ResponseEntity.ok("24-25/NRGP/000000");
        }
 
        // If gate pass exists, return the last found gate pass number
        return ResponseEntity.ok(lastGatePassNo);
 
    } catch (Exception ex) {
        String msg = ex.getMessage();
        log.error("**** Unable to retrieve Gate Pass **** " + ex);
        return new ResponseEntity<>("Error: " + msg, HttpStatus.BAD_REQUEST);
    }
}





public ResponseEntity<?> saveNonReturnableGatePass(NonReturnableGatePassF006 nonReturnableGatePass, HttpServletRequest http) { 
    try {
        String userRole = getUserRole();
        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
        String userName = userRepository.getUserName(userId);
        LocalDateTime currentDate = LocalDateTime.now();
        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

        if (userRole.equals("STORE_INCHARGE")|| userRole.equals("DISPATCH_SUPERVISOR")) {

            Long rawId = nonReturnableGatePass.getId();
            NonReturnableGatePassF006 existingGatePass = null;

            // Fetch the existing gate pass from the database if it exists
            if (rawId != null) {
                existingGatePass = NonReturnableGatePassRepo.fetchNonReturnableGateById(rawId);
                if (existingGatePass != null) {
                    // Update only the necessary fields
                	nonReturnableGatePass.setCreatedAt(nonReturnableGatePass.getCreatedAt());
    				nonReturnableGatePass.setCreatedBy(nonReturnableGatePass.getCreatedBy());
                    existingGatePass.setUnit(nonReturnableGatePass.getUnit());
                    existingGatePass.setFormatName(nonReturnableGatePass.getFormatName());
                    existingGatePass.setFormatNo(nonReturnableGatePass.getFormatNo());
                    existingGatePass.setRevisionNo(nonReturnableGatePass.getRevisionNo());
                    existingGatePass.setRefSopNo(nonReturnableGatePass.getRefSopNo());
                    existingGatePass.setDate(nonReturnableGatePass.getDate());
                    existingGatePass.setGatePassNo(nonReturnableGatePass.getGatePassNo());
                    existingGatePass.setGoodsSentTo(nonReturnableGatePass.getGoodsSentTo());
                    existingGatePass.setAddress(nonReturnableGatePass.getAddress());
                    existingGatePass.setTransporterName(nonReturnableGatePass.getTransporterName());
                    existingGatePass.setVehicleNo(nonReturnableGatePass.getVehicleNo());
                    existingGatePass.setRemark(nonReturnableGatePass.getRemark());
                    // Update store-incharge related fields
                    existingGatePass.setStoreInchargeStatus(AppConstantStore.StoreInchargestatussave);
                    existingGatePass.setStoreInchargeSavedOn(date);
                    existingGatePass.setStoreInchargeSavedBy(userName);
                    existingGatePass.setStoreInchargeSavedId(userId);
                } else {
                    return new ResponseEntity<>(new ApiResponse(false, "Gate Pass not found!"), HttpStatus.NOT_FOUND);
                }
            } else {
                // New Gate Pass, just save
                existingGatePass = nonReturnableGatePass;
                existingGatePass.setStoreInchargeStatus(AppConstantStore.StoreInchargestatussave);
                existingGatePass.setStoreInchargeSavedOn(date);
                existingGatePass.setStoreInchargeSavedBy(userName);
                existingGatePass.setStoreInchargeSavedId(userId);
            }

            // Save the gate pass first
            NonReturnableGatePassRepo.save(existingGatePass);

            // Handle goods details - update or add new ones
            List<NonReturnableGoodsDetail> productionDataList = nonReturnableGatePass.getGoodsDetails();
            if (productionDataList != null && !productionDataList.isEmpty()) {
                for (NonReturnableGoodsDetail goodsDetail : productionDataList) {
                    goodsDetail.setGatePass(existingGatePass);  // Attach gate pass
                    NonReturnableGoodsRepo.save(goodsDetail);
                }
            }

            // Finally, save the gate pass again to ensure everything is in sync
            NonReturnableGatePassRepo.save(existingGatePass);

        } else {
            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to save form !!! "), HttpStatus.BAD_REQUEST);
        }

    } catch (Exception e) {
        String msg = e.getMessage();
        log.error("Unable to Save Record: " + msg);
        return new ResponseEntity<>(new ApiResponse(false, "Failed to Save Non-Returnable Gate Pass: " + msg), HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(nonReturnableGatePass, HttpStatus.CREATED);
}





public ResponseEntity<?> submitNonReturnableGatePass(
        @RequestBody NonReturnableGatePassF006 NonReturnableGatePass, HttpServletRequest http) {

    if (NonReturnableGatePass == null) {
        return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
    }

    SCAUtil scaUtil = new SCAUtil();
    Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
    String userName = userRepository.getUserName(userId);
    String role = sca.getUserRoleFromRequest(http, tokenProvider);

    Long id = NonReturnableGatePass.getId();
    NonReturnableGatePassF006 bleachObj = new NonReturnableGatePassF006();
    LocalDateTime now = LocalDateTime.now();
    Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());

    try {
        String missingField = "";
        if (NonReturnableGatePass.getFormatNo() == null) missingField = "formatNo";
        if (NonReturnableGatePass.getRefSopNo() == null) missingField = "sopNumber";
        if (NonReturnableGatePass.getRevisionNo() == null) missingField = "revisionNo";

        if (!missingField.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField), HttpStatus.BAD_REQUEST);
        }

        if (id != null) {
            bleachObj = NonReturnableGatePassRepo.fetchNonReturnableGateById(id);
            if (bleachObj == null) {
                return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
            }
        }

        NonReturnableGatePass.setCreatedAt(bleachObj.getCreatedAt());
        NonReturnableGatePass.setCreatedBy(bleachObj.getCreatedBy());

        String currentStatus = bleachObj.getStoreInchargeStatus();
        String currentMailStatus = bleachObj.getMailStatus();

        if ("STORE_INCHARGE".equalsIgnoreCase(role)|| "DISPATCH_SUPERVISOR".equalsIgnoreCase(role)) {

//            if (!AppConstantStore.StoreInchargeAPPROVED.equals(currentStatus))
            {

                NonReturnableGatePass.setStoreInchargeStatus(AppConstantStore.StoreInchargestatussubmit);
                NonReturnableGatePass.setStoreInchargeSubmitOn(date);
                NonReturnableGatePass.setStoreInchargeSign(userName);
                NonReturnableGatePass.setStoreInchargeSubmitBy(userName);
                NonReturnableGatePass.setStoreInchargeSubmitId(id);
                NonReturnableGatePass.setHod_status(AppConstantStore.waitingStatus);
                NonReturnableGatePass.setMailStatus(AppConstantStore.waitingStatus);

//                Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//                byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//                NonReturnableGatePass.setStoreInchargeSignature(signature);
                
                List<NonReturnableGoodsDetail> productionDataList = NonReturnableGatePass.getGoodsDetails();
    			
    			if(!productionDataList.isEmpty() || productionDataList != null) {
    				for (NonReturnableGoodsDetail data : productionDataList) {
    					data.setGatePass(NonReturnableGatePass);
//    	                productionDataRepository.save(data);
    				}
    			}

                NonReturnableGatePassRepo.save(NonReturnableGatePass);

                // Save history of NonReturnableGatePass
                NonReturnableGatePassHistoryF006 NonReturnableGatePassHistory = new NonReturnableGatePassHistoryF006();
                NonReturnableGatePassHistory.setUnit(NonReturnableGatePass.getUnit());
                NonReturnableGatePassHistory.setFormatName(NonReturnableGatePass.getFormatName());
                NonReturnableGatePassHistory.setFormatNo(NonReturnableGatePass.getFormatNo());
                NonReturnableGatePassHistory.setRevisionNo(NonReturnableGatePass.getRevisionNo());
                NonReturnableGatePassHistory.setRefSopNo(NonReturnableGatePass.getRefSopNo());
                NonReturnableGatePassHistory.setDate(NonReturnableGatePass.getDate());         
                NonReturnableGatePassHistory.setGatePassNo(NonReturnableGatePass.getGatePassNo());
                NonReturnableGatePassHistory.setGoodsSentTo(NonReturnableGatePass.getGoodsSentTo());
                NonReturnableGatePassHistory.setAddress(NonReturnableGatePass.getAddress());
                NonReturnableGatePassHistory.setTransporterName(NonReturnableGatePass.getTransporterName());
                NonReturnableGatePassHistory.setVehicleNo(NonReturnableGatePass.getVehicleNo());
                NonReturnableGatePassHistory.setRemark(NonReturnableGatePass.getRemark());
                NonReturnableGatePassHistory.setStoreInchargeStatus(NonReturnableGatePass.getStoreInchargeStatus());
                NonReturnableGatePassHistory.setStoreInchargeSubmitOn(NonReturnableGatePass.getStoreInchargeSubmitOn());
                NonReturnableGatePassHistory.setStoreInchargeSubmitBy(NonReturnableGatePass.getStoreInchargeSubmitBy());
                NonReturnableGatePassHistory.setStoreInchargeSubmitId(NonReturnableGatePass.getStoreInchargeSubmitId());
                NonReturnableGatePassHistory.setStoreInchargeSign(NonReturnableGatePass.getStoreInchargeSign());
               
                
                
                String gatepassNo = NonReturnableGatePassHistory.getGatePassNo();				
				
				int version = NonReturnableGatePassHistoryRepo.getMaximumVersion(gatepassNo)
						.map(temp -> temp + 1).orElse(1);

				NonReturnableGatePassHistory.setVersion(version);

                NonReturnableGatePassHistoryRepo.save(NonReturnableGatePassHistory);

                // Save Non-Returnable Goods Details History
               
                if (NonReturnableGatePass.getGoodsDetails() != null && !NonReturnableGatePass.getGoodsDetails().isEmpty()) {
                    List<NonReturnableGoodsDetail> goodsDetails = NonReturnableGatePass.getGoodsDetails();
                    for (NonReturnableGoodsDetail goodsDetail : goodsDetails) {
                    	NonReturnableGoodsDetailHistory nonReturnableGoodsHistoryDetail = new NonReturnableGoodsDetailHistory();
                    	
                    	 nonReturnableGoodsHistoryDetail.setGatePass(NonReturnableGatePassHistory);

                        nonReturnableGoodsHistoryDetail.setSno(goodsDetail.getSno());
                        nonReturnableGoodsHistoryDetail.setDescription(goodsDetail.getDescription());
                        nonReturnableGoodsHistoryDetail.setQuantity(goodsDetail.getQuantity());
                        nonReturnableGoodsHistoryDetail.setReasonForSendingOut(goodsDetail.getReasonForSendingOut());
                        nonReturnableGoodsHistoryDetail.setRemark(goodsDetail.getRemark());

                       

                        nonReturnableGoodsDetailHistoryRepo.save(nonReturnableGoodsHistoryDetail);
                    }
                }
                
                try {

					mailFunction.sendEmailToStoreHod06(NonReturnableGatePass);
				} catch (Exception ex) {
					return new ResponseEntity<>(
							new ApiResponse(false, "STORE_INCHARGE Approved but Unable to send mail to HOD! "),
							HttpStatus.OK);
				}

            } 
//            else {
//                return new ResponseEntity<>(new ApiResponse(false, "INCHARGE already approved"), HttpStatus.BAD_REQUEST);
//            }

        } else {
            return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"), HttpStatus.FORBIDDEN);
        }

    } catch (Exception ex) {
        logger.error(" **** Unable to submit Non-Returnable Gate Pass **** ", ex);
        return new ResponseEntity<>(new ApiResponse(false, "Unable to submit Non-Returnable Gate Pass: " + ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
}





public ResponseEntity<?> approveRejectGatePass(ApproveResponse approveResponse, HttpServletRequest http) {
	
	SCAUtil sca = new SCAUtil();
	
	NonReturnableGatePassF006 ReceptionCheckList = new NonReturnableGatePassF006();
	
	String userRole = getUserRole();
	Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	String userName = userRepository.getUserName(userId);
	LocalDateTime currentDate = LocalDateTime.now();
	Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
	
	try {
		
		ReceptionCheckList = NonReturnableGatePassRepo.fetchNonReturnableGateById(approveResponse.getId());
		
		
		NonReturnableGatePassHistoryF006 ReceptionCheckListHistory = new NonReturnableGatePassHistoryF006();
		
		String supervisiorStatus = ReceptionCheckList.getStoreInchargeStatus();
		
		String hodStatus = ReceptionCheckList.getHod_status();
		
		UserImageDetails imageDetails = new UserImageDetails();
		
		if(supervisiorStatus.equalsIgnoreCase(AppConstantStore.StoreInchargestatussubmit) && hodStatus.equalsIgnoreCase(AppConstantStore.waitingStatus)) {
			
			if(userRole.equalsIgnoreCase("ROLE_HOD") ) {
				
				if(approveResponse.getStatus().equals("Approve")) {
					
					ReceptionCheckList.setHod_status(AppConstantStore.hodApprovedStatus);
					ReceptionCheckList.setHod_submit_on(date);
					ReceptionCheckList.setHod_submit_by(userName);
					ReceptionCheckList.setHod_submit_id(userId);
					
					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					ReceptionCheckList.setHodSignature(signature);
					
					ReceptionCheckList.setHod_sign(userName);
					
					NonReturnableGatePassRepo.save(ReceptionCheckList);
					
					ReceptionCheckListHistory = NonReturnableGatePassHistoryRepo.fetchLastSubmittedNonReturnableGate(ReceptionCheckList.getGatePassNo());
					
					ReceptionCheckListHistory.setHod_status(AppConstantStore.hodApprovedStatus);
					ReceptionCheckListHistory.setHod_submit_on(date);
					ReceptionCheckListHistory.setHod_submit_by(userName);
					ReceptionCheckListHistory.setHod_sign(userName);
					ReceptionCheckListHistory.setHod_submit_id(userId);
				
					
					NonReturnableGatePassHistoryRepo.save(ReceptionCheckListHistory);
					
					return new ResponseEntity<>(new ApiResponse(true, "Hod Approved Successfully"), HttpStatus.OK);
					
				}
				
				else if(approveResponse.getStatus().equals("Reject")) {
					
					String reason = approveResponse.getRemarks();
					ReceptionCheckList.setHod_status(AppConstantStore.hodRejectedStatus);
					ReceptionCheckList.setReason(reason);					
					ReceptionCheckList.setHod_submit_on(date);
					ReceptionCheckList.setHod_submit_by(userName);
					ReceptionCheckList.setHod_sign(userName);
					ReceptionCheckList.setHod_submit_id(userId);
					
					
					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					ReceptionCheckList.setHodSignature(signature);
					
					ReceptionCheckList.setHod_sign(userName);
					
					NonReturnableGatePassRepo.save(ReceptionCheckList);

					
					ReceptionCheckListHistory = NonReturnableGatePassHistoryRepo.fetchLastSubmittedNonReturnableGate(ReceptionCheckList.getGatePassNo());
					
					ReceptionCheckListHistory.setHod_status(AppConstantStore.hodRejectedStatus);
					ReceptionCheckListHistory.setReason(reason);
					ReceptionCheckListHistory.setHod_submit_on(date);
					ReceptionCheckListHistory.setHod_submit_by(userName);
					ReceptionCheckListHistory.setHod_sign(userName);
					ReceptionCheckListHistory.setHod_submit_id(userId);
					
					NonReturnableGatePassHistoryRepo.save(ReceptionCheckListHistory);
					
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
				new ApiResponse(false, "Failed to approve/reject ReceptionCheckList Record " + msg),
				HttpStatus.BAD_REQUEST);
		
		
	}
}



public ResponseEntity<?> getGatePassSummary() {
	
	String userRole = getUserRole();
	
	List<NonReturnableGatePassF006> ReceptionCheckList = new ArrayList<>();
	
	try {
		
		if(userRole.equals("STORE_INCHARGE")|| userRole.equals("DISPATCH_SUPERVISOR")) {
			
			
			ReceptionCheckList = NonReturnableGatePassRepo.NonReturnableSummaryforAssistant();
			
		} else if(userRole.equals("ROLE_HOD")) {
			
			ReceptionCheckList = NonReturnableGatePassRepo.NonReturnableSummaryforHod();
			
		} else {
			return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to access ReceptionCheckList form"), HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(ReceptionCheckList, HttpStatus.OK);
	} catch(Exception ex) {
		String msg = ex.getMessage();
		ex.printStackTrace();
		logger.error("Unable to get summary record" + msg);
		return new ResponseEntity(
				new ApiResponse(false, "Failed to get summary record" + msg),
				HttpStatus.BAD_REQUEST);
	}
	
}







public ResponseEntity<?> getGatePassByid(String gatePassNo) {
    List<NonReturnableGatePassF006> receptionCheckList = new ArrayList<>();
    try {
        receptionCheckList = NonReturnableGatePassRepo.findByNonReturnable(gatePassNo);
    } catch (Exception ex) {
        String msg = ex.getMessage();
        ex.printStackTrace();
        logger.error("Unable to get Reception Check List: " + msg);
        return new ResponseEntity<>(new ApiResponse(false, "Unable to get GatePass List: " + msg), HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(receptionCheckList, HttpStatus.OK);
}




//public ResponseEntity<?> getGatePassSummaryPrint(String year, String month, String date) {
//    List<NonReturnableGatePassF006> gatePassList = new ArrayList<>();
//
//    try {
//        if (date != null && !date.isEmpty()) {
//            gatePassList = NonReturnableGatePassRepo.getNonReturnableGatePassByDate(date);
//        } else if (year != null && !year.isEmpty() && month != null && !month.isEmpty()) {
//            gatePassList = NonReturnableGatePassRepo.getNonReturnableGatePassByYearAndMonth(year, month);
//        } else if (year != null && !year.isEmpty()) {
//            gatePassList = NonReturnableGatePassRepo.getNonReturnableGatePassByYear(year);
//        }
//    } catch (Exception ex) {
//        String msg = ex.getMessage();
//        logger.error("Unable to get Non-Returnable Gate Pass list: " + msg);
//        return new ResponseEntity<>(
//                new ApiResponse(false, "Unable to get Non-Returnable Gate Pass list: " + msg),
//                HttpStatus.BAD_REQUEST);
//    }
//
//    return new ResponseEntity<>(gatePassList, HttpStatus.OK);
//}

public ResponseEntity<?> getGatePassSummaryPrint(String year, String month, String fromDate, String toDate) {
    List<NonReturnableGatePassF006> gatePassList = new ArrayList<>();

    try {
        if (fromDate != null && !fromDate.isEmpty() && toDate != null && !toDate.isEmpty()) {
            gatePassList = NonReturnableGatePassRepo.getNonReturnableGatePassByDateRange(fromDate, toDate);
        } else if (year != null && !year.isEmpty() && month != null && !month.isEmpty()) {
            gatePassList = NonReturnableGatePassRepo.getNonReturnableGatePassByYearAndMonth(year, month);
        } else if (year != null && !year.isEmpty()) {
            gatePassList = NonReturnableGatePassRepo.getNonReturnableGatePassByYear(year);
        }
    } catch (Exception ex) {
        String msg = ex.getMessage();
        logger.error("Unable to get Non-Returnable Gate Pass list: " + msg);
        return new ResponseEntity<>(
                new ApiResponse(false, "Unable to get Non-Returnable Gate Pass list: " + msg),
                HttpStatus.BAD_REQUEST
        );
    }

    return new ResponseEntity<>(gatePassList, HttpStatus.OK);
}


//public ResponseEntity<?> SaveForkliftCheckList(ForkliftMovementCheckListF008 SaveForkliftCheckList, HttpServletRequest http) {
//	
//	try {
//		String userRole = getUserRole();
//		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//		String userName = userRepository.getUserName(userId);
//		LocalDateTime currentDate = LocalDateTime.now();
//		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//		
//		if(userRole.equals("STORE_OPERATOR")) {
//			
//			Long rawId = SaveForkliftCheckList.getId();
//			
//			if(rawId != null)
//			{
//				ForkliftMovementCheckListF008 ReceptionCheckList = new ForkliftMovementCheckListF008();	
//				SaveForkliftCheckList = ForkliftCheckListRepo.fetchForkliftMovementCheckListById(rawId);
//				SaveForkliftCheckList.setCreatedAt(ReceptionCheckList.getCreatedAt());
//				SaveForkliftCheckList.setCreatedBy(ReceptionCheckList.getCreatedBy());
//				
//				SaveForkliftCheckList.setUnit(ReceptionCheckList.getUnit());
//				SaveForkliftCheckList.setFormatNo(ReceptionCheckList.getFormatNo());
//				SaveForkliftCheckList.setFormatName(ReceptionCheckList.getFormatName());
//				SaveForkliftCheckList.setRevisionNo(ReceptionCheckList.getRevisionNo());
//				SaveForkliftCheckList.setSopNumber(ReceptionCheckList.getSopNumber());
//				SaveForkliftCheckList.setDate(ReceptionCheckList.getDate());
//				SaveForkliftCheckList.setForkliftNo(ReceptionCheckList.getForkliftNo());
//				SaveForkliftCheckList.setYear(ReceptionCheckList.getYear());
//				SaveForkliftCheckList.setMonth(ReceptionCheckList.getMonth());
//				SaveForkliftCheckList.setStartMeterReading(ReceptionCheckList.getStartMeterReading());
//				SaveForkliftCheckList.setEndMeterReading(ReceptionCheckList.getEndMeterReading());
//				SaveForkliftCheckList.setTotalMeterReading(ReceptionCheckList.getTotalMeterReading());
//				SaveForkliftCheckList.setInKm(ReceptionCheckList.getInKm());
//				SaveForkliftCheckList.setOutKm(ReceptionCheckList.getOutKm());
//				SaveForkliftCheckList.setTotalKm(ReceptionCheckList.getTotalKm());
//				SaveForkliftCheckList.setChargeInTime(ReceptionCheckList.getChargeInTime());
//				SaveForkliftCheckList.setChargeOutTime(ReceptionCheckList.getChargeOutTime());
//				SaveForkliftCheckList.setTotalCharge(ReceptionCheckList.getTotalCharge());
//				SaveForkliftCheckList.setRemarks(ReceptionCheckList.getRemarks());
//				SaveForkliftCheckList.setOperator_status(AppConstantStore.operatorSave);
//				SaveForkliftCheckList.setOperator_saved_on(ReceptionCheckList.getOperator_saved_on());
//				SaveForkliftCheckList.setOperator_saved_by(ReceptionCheckList.getOperator_saved_by());
//				SaveForkliftCheckList.setOperator_saved_id(ReceptionCheckList.getOperator_saved_id());
//			
//				ForkliftCheckListRepo.save(SaveForkliftCheckList);
//			}
//			
//			SaveForkliftCheckList.setOperator_status(AppConstantStore.operatorSave);
//			SaveForkliftCheckList.setOperator_saved_on(date);
//			SaveForkliftCheckList.setOperator_saved_by(userName);
//			SaveForkliftCheckList.setOperator_saved_id(userId);
//			
//			ForkliftCheckListRepo.save(SaveForkliftCheckList);
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
//				new ApiResponse(false, "Failed to Save Reception Check List" + msg),
//				HttpStatus.BAD_REQUEST);
//		
//		
//	}
//	return new ResponseEntity(SaveForkliftCheckList, HttpStatus.CREATED);
//	
//}
public ResponseEntity<?> SaveForkliftCheckList(ForkliftMovementCheckListF008 SaveForkliftCheckList, HttpServletRequest http) {
    try {
        String userRole = getUserRole();
        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
        String userName = userRepository.getUserName(userId);
        LocalDateTime currentDate = LocalDateTime.now();
        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

        if (userRole.equals("DISPATCH_OPEARTOR")) {
            Long rawId = SaveForkliftCheckList.getId();

            if (rawId != null) {
                // Fetch the existing record by ID from the database
                ForkliftMovementCheckListF008 existingCheckList = ForkliftCheckListRepo.fetchForkliftMovementCheckListById(rawId);

                if (existingCheckList != null) {
                    // Update only the fields that have new values
                    existingCheckList.setUnit(SaveForkliftCheckList.getUnit());
                    existingCheckList.setFormatNo(SaveForkliftCheckList.getFormatNo());
                    existingCheckList.setFormatName(SaveForkliftCheckList.getFormatName());
                    existingCheckList.setRevisionNo(SaveForkliftCheckList.getRevisionNo());
                    existingCheckList.setSopNumber(SaveForkliftCheckList.getSopNumber());
                    existingCheckList.setDate(SaveForkliftCheckList.getDate());
                    existingCheckList.setForkliftNo(SaveForkliftCheckList.getForkliftNo());
                    existingCheckList.setYear(SaveForkliftCheckList.getYear());
                    existingCheckList.setMonth(SaveForkliftCheckList.getMonth());
                    existingCheckList.setStartMeterReading(SaveForkliftCheckList.getStartMeterReading());
                    existingCheckList.setEndMeterReading(SaveForkliftCheckList.getEndMeterReading());
                    existingCheckList.setTotalMeterReading(SaveForkliftCheckList.getTotalMeterReading());
                    existingCheckList.setInKm(SaveForkliftCheckList.getInKm());
                    existingCheckList.setOutKm(SaveForkliftCheckList.getOutKm());
                    existingCheckList.setTotalKm(SaveForkliftCheckList.getTotalKm());
                    existingCheckList.setChargeInTime(SaveForkliftCheckList.getChargeInTime());
                    existingCheckList.setChargeOutTime(SaveForkliftCheckList.getChargeOutTime());
                    existingCheckList.setTotalCharge(SaveForkliftCheckList.getTotalCharge());
                    existingCheckList.setRemarks(SaveForkliftCheckList.getRemarks());

                    // Update audit fields
                    existingCheckList.setOperator_status(AppConstantStore.operatorSave);
                    existingCheckList.setOperator_saved_on(date);
                    existingCheckList.setOperator_saved_by(userName);
                    existingCheckList.setOperator_saved_id(userId);

                    // Save the updated entity
                    ForkliftCheckListRepo.save(existingCheckList);
                } else {
                    return new ResponseEntity(new ApiResponse(false, "Record not found"), HttpStatus.NOT_FOUND);
                }
            } else {
                // Create new record if rawId is null
                SaveForkliftCheckList.setOperator_status(AppConstantStore.operatorSave);
                SaveForkliftCheckList.setOperator_saved_on(date);
                SaveForkliftCheckList.setOperator_saved_by(userName);
                SaveForkliftCheckList.setOperator_saved_id(userId);

                ForkliftCheckListRepo.save(SaveForkliftCheckList);
            }
        } else {
            return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to save form !!!"), HttpStatus.BAD_REQUEST);
        }
    } catch (Exception e) {
        String msg = e.getMessage();
        log.error("Unable to Save Record: " + msg);

        return new ResponseEntity(new ApiResponse(false, "Failed to Save Forklift Check List: " + msg), HttpStatus.BAD_REQUEST);
    }
    
    return new ResponseEntity(SaveForkliftCheckList, HttpStatus.CREATED);
}

public ResponseEntity<?> SubmitForkliftCheckList(
		@RequestBody ForkliftMovementCheckListF008 submitForkliftCheckList, HttpServletRequest http) {
	if (submitForkliftCheckList == null) {
		return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
				HttpStatus.BAD_REQUEST);
	}

	SCAUtil scaUtil = new SCAUtil();
	Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
	String userName = userRepository.getUserName(userId);
	String role = sca.getUserRoleFromRequest(http, tokenProvider);

	Long id = submitForkliftCheckList.getId();
	ForkliftMovementCheckListF008 bleachObj = new ForkliftMovementCheckListF008();
	// Get the current time
	LocalDateTime now = LocalDateTime.now();
	Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
	


	try {
		String missingField = "";
		if (submitForkliftCheckList.getFormatNo() == null)
			missingField = "formatNo";
		if (submitForkliftCheckList.getSopNumber() == null)
			missingField = "sopNumber";
		if (submitForkliftCheckList.getRevisionNo() == null)
			missingField = "revisionNo";

		if (!missingField.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
					HttpStatus.BAD_REQUEST);
		}

		if (id != null) {
			bleachObj = ForkliftCheckListRepo.fetchForkliftMovementCheckListById(id);
			if (bleachObj == null) {
				return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
			}
		}
		submitForkliftCheckList.setCreatedAt(bleachObj.getCreatedAt());
		submitForkliftCheckList.setCreatedBy(bleachObj.getCreatedBy());

			String currentStatus = bleachObj.getOperator_status();
			String currentMailStatus = bleachObj.getMailStatus();

			if ("DISPATCH_OPEARTOR".equalsIgnoreCase(role)) {

				if (!AppConstantStore.StoreInchargeAPPROVED.equals(currentStatus)) 
				{

					submitForkliftCheckList.setOperator_status(AppConstantStore.operatorApproved);
					submitForkliftCheckList.setOperator_submit_on(date);
					submitForkliftCheckList.setOperator_sign(userName);
					submitForkliftCheckList.setOperator_submit_by(userName);
					submitForkliftCheckList.setOperator_submit_id(userId);
					submitForkliftCheckList.setStore_in_charge_status(AppConstantStore.waitingStatus);
					submitForkliftCheckList.setMailStatus(AppConstantStore.waitingStatus);;
					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					submitForkliftCheckList.setOperator_Signature(signature);
					
					ForkliftCheckListRepo.save(submitForkliftCheckList);
					

					
					// HISTORY
					
					ForkliftMovementCheckListHistoryF008 ForkliftCheckListHistory = new ForkliftMovementCheckListHistoryF008();
		
					
					
					ForkliftCheckListHistory.setUnit(submitForkliftCheckList.getUnit());
					ForkliftCheckListHistory.setFormatName(submitForkliftCheckList.getFormatName());
					ForkliftCheckListHistory.setFormatNo(submitForkliftCheckList.getFormatNo());
					ForkliftCheckListHistory.setRevisionNo(submitForkliftCheckList.getRevisionNo());
					ForkliftCheckListHistory.setSopNumber(submitForkliftCheckList.getSopNumber());
					ForkliftCheckListHistory.setDate(submitForkliftCheckList.getDate());
					ForkliftCheckListHistory.setForkliftNo(submitForkliftCheckList.getForkliftNo());  // Forklift number
					ForkliftCheckListHistory.setYear(submitForkliftCheckList.getYear());
					ForkliftCheckListHistory.setMonth(submitForkliftCheckList.getMonth());
					ForkliftCheckListHistory.setStartMeterReading(submitForkliftCheckList.getStartMeterReading());
					ForkliftCheckListHistory.setEndMeterReading(submitForkliftCheckList.getEndMeterReading());
					ForkliftCheckListHistory.setTotalMeterReading(submitForkliftCheckList.getTotalMeterReading());
					ForkliftCheckListHistory.setInKm(submitForkliftCheckList.getInKm());
					ForkliftCheckListHistory.setOutKm(submitForkliftCheckList.getOutKm());
					ForkliftCheckListHistory.setTotalKm(submitForkliftCheckList.getTotalKm());
					ForkliftCheckListHistory.setChargeInTime(submitForkliftCheckList.getChargeInTime());
					ForkliftCheckListHistory.setChargeOutTime(submitForkliftCheckList.getChargeOutTime());
					ForkliftCheckListHistory.setTotalCharge(submitForkliftCheckList.getTotalCharge());
					ForkliftCheckListHistory.setRemarks(submitForkliftCheckList.getRemarks());
					
					
//					Version 
					
					// version
					String forkliftNo = ForkliftCheckListHistory.getForkliftNo();
 
					LocalDate 	Date = ForkliftCheckListHistory.getDate();
					
					String Month = ForkliftCheckListHistory.getMonth();
					
					String year = ForkliftCheckListHistory.getYear();				
							
					int version = forkCheckListHistoryRepo.getMaximumVersion(forkliftNo,Date ,Month,year)
							.map(temp -> temp + 1).orElse(1);
 
					ForkliftCheckListHistory.setVersion(version);
					

						// STATUS
					ForkliftCheckListHistory.setOperator_status(submitForkliftCheckList.getOperator_status());
					ForkliftCheckListHistory.setOperator_sign(submitForkliftCheckList.getOperator_sign());
					ForkliftCheckListHistory.setOperator_submit_by(submitForkliftCheckList.getOperator_submit_by());
					ForkliftCheckListHistory.setOperator_submit_id(submitForkliftCheckList.getOperator_submit_id());
					ForkliftCheckListHistory.setOperator_submit_on(submitForkliftCheckList.getOperator_submit_on());
					ForkliftCheckListHistory.setStore_in_charge_status(submitForkliftCheckList.getStore_in_charge_status());
					
					
					
					forkCheckListHistoryRepo.save(ForkliftCheckListHistory);

					try {

						mailFunction.sendEmailToHODF08(submitForkliftCheckList);
					} catch (Exception ex) {
						return new ResponseEntity<>(
								new ApiResponse(false, "DISPATCH_OPEARTOR Approved but Unable to send mail to HOD! "),
								HttpStatus.OK);
					}
				}
				
				else {
					return new ResponseEntity<>(new ApiResponse(false, "DISPATCH_SUPERVISOR already approved"),
							HttpStatus.BAD_REQUEST);
				}
			} 

			else {
				return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
						HttpStatus.FORBIDDEN);
			}

	} catch (Exception ex) {
		logger.error(" **** Unable to submit Forklift Check List Details **** ", ex);
		return new ResponseEntity<>(
				new ApiResponse(false, "Unable to submit Forklift Check List Details: " + ex.getMessage()),
				HttpStatus.BAD_REQUEST);
	}

	return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"),
			HttpStatus.OK);
}

public ResponseEntity<?> approveRejectForkliftCheckList(ApproveResponse approveResponse, HttpServletRequest http) {
	
	SCAUtil sca = new SCAUtil();
	
	ForkliftMovementCheckListF008 ForkliftCheckList = new ForkliftMovementCheckListF008();
	
	String userRole = getUserRole();
	Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	String userName = userRepository.getUserName(userId);
	LocalDateTime currentDate = LocalDateTime.now();
	Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
	
	try {
		
		ForkliftCheckList = ForkliftCheckListRepo.fetchForkliftMovementCheckListById(approveResponse.getId());
		
		
		ForkliftMovementCheckListHistoryF008 ForkliftCheckListHistory = new ForkliftMovementCheckListHistoryF008();
		
		String supervisiorStatus = ForkliftCheckList.getOperator_status();
		
		String hodStatus = ForkliftCheckList.getStore_in_charge_status();
		
		UserImageDetails imageDetails = new UserImageDetails();
		
		if(supervisiorStatus.equalsIgnoreCase(AppConstantStore.operatorApproved) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus))
		{
			
			if(userRole.equalsIgnoreCase("DISPATCH_SUPERVISOR") ) {
				
				if(approveResponse.getStatus().equals("Approve")) {
					
					ForkliftCheckList.setStore_in_charge_status(AppConstantStore.StoreInchargeAPPROVED);
					ForkliftCheckList.setStore_in_charge_submit_on(date);
					ForkliftCheckList.setStore_in_charge_submit_by(userName);
					ForkliftCheckList.setStore_in_charge_submit_id(userId);
					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					ForkliftCheckList.setStore_in_charge_Signature(signature);
//					
					ForkliftCheckList.setStore_in_charge_sign(userName);
					
					ForkliftCheckListRepo.save(ForkliftCheckList);
					
				
					ForkliftCheckListHistory = forkCheckListHistoryRepo.fetchLastSubmittedForkliftMovementCheckList(ForkliftCheckList.getDate(), ForkliftCheckList.getForkliftNo());



					
					ForkliftCheckListHistory.setStore_in_charge_status(AppConstantStore.StoreInchargeAPPROVED);
					ForkliftCheckListHistory.setStore_in_charge_submit_on(date);
					ForkliftCheckListHistory.setStore_in_charge_submit_by(userName);
					ForkliftCheckListHistory.setStore_in_charge_sign(userName);
					ForkliftCheckListHistory.setStore_in_charge_submit_id(userId);
				
					
					forkCheckListHistoryRepo.save(ForkliftCheckListHistory);
					
					return new ResponseEntity<>(new ApiResponse(true, "STORE_INCHARGE Approved Successfully"), HttpStatus.OK);
					
				}
				
				else if(approveResponse.getStatus().equals("Reject")) {
					
					String reason = approveResponse.getRemarks();
					ForkliftCheckList.setReason(reason);
					ForkliftCheckList.setStore_in_charge_status(AppConstantStore.StoreInchargeREJECTED);
					ForkliftCheckList.setStore_in_charge_submit_on(date);
					ForkliftCheckList.setStore_in_charge_submit_id(userId);
					ForkliftCheckList.setStore_in_charge_submit_by(userName);
					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					ForkliftCheckListHistory.setStore_in_charge_Signature(signature);
					
					ForkliftCheckList.setStore_in_charge_sign(userName);
					
					ForkliftCheckListRepo.save(ForkliftCheckList);

					
					ForkliftCheckListHistory = forkCheckListHistoryRepo.fetchLastSubmittedForkliftMovementCheckList(ForkliftCheckList.getDate(), ForkliftCheckList.getForkliftNo());
					
					ForkliftCheckListHistory.setStore_in_charge_status(AppConstantStore.StoreInchargeREJECTED);
					ForkliftCheckListHistory.setReason(reason);
					ForkliftCheckListHistory.setStore_in_charge_submit_on(date);
					ForkliftCheckListHistory.setStore_in_charge_submit_by(userName);
					ForkliftCheckListHistory.setStore_in_charge_submit_id(userId);
					ForkliftCheckListHistory.setStore_in_charge_sign(userName);
					
					forkCheckListHistoryRepo.save(ForkliftCheckListHistory);
					
					return new ResponseEntity<>(new ApiResponse(true, "DISPATCH_SUPERVISOR Rejected Successfully"), HttpStatus.OK);
					
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
				new ApiResponse(false, "Failed to approve/reject Forklift Record " + msg),
				HttpStatus.BAD_REQUEST);
		
		
	}
}

//public ResponseEntity<?> getForkliftCheckListPrint(String year, String month, String date) {
//    List<ForkliftMovementCheckListF008> ForkliftCheckList = new ArrayList<>();
//
//    try {
//        if (date != null && !date.isEmpty()) {
//        	ForkliftCheckList = ForkliftCheckListRepo.getNonReturnableGatePassByDate(date);
//        } else if (year != null && !year.isEmpty() && month != null && !month.isEmpty()) {
//        	ForkliftCheckList = ForkliftCheckListRepo.getNonReturnableGatePassByYearAndMonth(year, month);
//        } else if (year != null && !year.isEmpty()) {
//        	ForkliftCheckList = ForkliftCheckListRepo.getNonReturnableGatePassPassByYear(year);
//        }
//    } catch (Exception ex) {
//        String msg = ex.getMessage();
//        logger.error("Unable to get Non-Returnable Gate Pass list: " + msg);
//        return new ResponseEntity<>(
//                new ApiResponse(false, "Unable to get Non-Returnable Gate Pass list: " + msg),
//                HttpStatus.BAD_REQUEST);
//    }
//
//    return new ResponseEntity<>(ForkliftCheckList, HttpStatus.OK);
//}

//public ResponseEntity<?> getForkliftCheckListPrint(String year, String month, String fromDate, String toDate) {
//    List<ForkliftMovementCheckListF008> ForkliftCheckList = new ArrayList<>();
//
//    try {
//        if (fromDate != null && !fromDate.isEmpty() && toDate != null && !toDate.isEmpty()) {
//        	ForkliftCheckList = ForkliftCheckListRepo.getNonReturnableGatePassByDate(fromDate, toDate);
//        } else if (year != null && !year.isEmpty() && month != null && !month.isEmpty()) {
//        	ForkliftCheckList = ForkliftCheckListRepo.getNonReturnableGatePassByYearAndMonth(year, month);
//        } else if (year != null && !year.isEmpty()) {
//        	ForkliftCheckList = ForkliftCheckListRepo.getNonReturnableGatePassPassByYear(year);
//        }
//    } catch (Exception ex) {
//        String msg = ex.getMessage();
//        logger.error("Unable to get Forklift Checklist: " + msg);
//        return new ResponseEntity<>(
//                new ApiResponse(false, "Unable to get Forklift Checklist: " + msg),
//                HttpStatus.BAD_REQUEST);
//    }
//
//    return new ResponseEntity<>(ForkliftCheckList, HttpStatus.OK);
//}


public ResponseEntity<?> getForkliftCheckListPrint(String year, String month, String forkliftNo, String fromDate, String toDate) {
    List<ForkliftMovementCheckListF008> forkliftCheckList = new ArrayList<>();

    try {
        if (forkliftNo != null && !forkliftNo.isEmpty()) {
            // Fetch by forkliftNo (with optional year and month)
            if (year != null && !year.isEmpty() && month != null && !month.isEmpty()) {
                forkliftCheckList = ForkliftCheckListRepo.getByForkliftNoYearAndMonth(forkliftNo, year, month);
            } else if (year != null && !year.isEmpty()) {
                forkliftCheckList = ForkliftCheckListRepo.getByForkliftNoAndYear(forkliftNo, year);
            } else {
                forkliftCheckList = ForkliftCheckListRepo.getByForkliftNo(forkliftNo);
            }
        } else if (fromDate != null && !fromDate.isEmpty() && toDate != null && !toDate.isEmpty()) {
            // Fetch by date range
            forkliftCheckList = ForkliftCheckListRepo.getByDateRange(fromDate, toDate);
        } else if (year != null && !year.isEmpty() && month != null && !month.isEmpty()) {
            // Fetch by year and month
            forkliftCheckList = ForkliftCheckListRepo.getByYearAndMonth(year, month);
        } else if (year != null && !year.isEmpty()) {
            // Fetch by year only
            forkliftCheckList = ForkliftCheckListRepo.getByYear(year);
        } else {
            return new ResponseEntity<>(
                    new ApiResponse(false, "Invalid input. Provide valid filters."),
                    HttpStatus.BAD_REQUEST);
        }
    } catch (Exception ex) {
        String msg = ex.getMessage();
        logger.error("Unable to get Forklift Checklist: " + msg);
        return new ResponseEntity<>(
                new ApiResponse(false, "Unable to get Forklift Checklist: " + msg),
                HttpStatus.BAD_REQUEST);
    }

    return new ResponseEntity<>(forkliftCheckList, HttpStatus.OK);
}




public ResponseEntity<?> getForkliftCheckListSummary() {
	
	String userRole = getUserRole();
	
	List<ForkliftMovementCheckListF008> ReceptionCheckList = new ArrayList<>();
	
	try {
		
		if(userRole.equals("DISPATCH_OPEARTOR")) {
			
			
			ReceptionCheckList = ForkliftCheckListRepo.ForkliftCheckListforAssistant();
			
		} else if(userRole.equals("DISPATCH_SUPERVISOR")) {
			
			ReceptionCheckList = ForkliftCheckListRepo.ForkliftCheckListSummaryforHod();
			
		} else {
			return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to access Hand Sanitation form"), HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(ReceptionCheckList, HttpStatus.OK);
	} catch(Exception ex) {
		String msg = ex.getMessage();
		ex.printStackTrace();
		logger.error("Unable to get summary record" + msg);
		return new ResponseEntity(
				new ApiResponse(false, "Failed to get  Forklift summary record" + msg),
				HttpStatus.BAD_REQUEST);
	}
	
}

//public ResponseEntity<?> getGatePassByid(String gatePassNo) {
//    
//}


public ResponseEntity<?> getForkliftCheckListByDateAndForkliftNo(String date, String forkliftNo) {
    List<ForkliftMovementCheckListF008> forkliftCheckList = new ArrayList<>();
    try {
        forkliftCheckList = ForkliftCheckListRepo.findByForkliftNoAndDate(forkliftNo, date);
    } catch (Exception ex) {
        String msg = ex.getMessage();
        ex.printStackTrace();
        logger.error("Unable to get Forklift Check List: " + msg);
        return new ResponseEntity<>(new ApiResponse(false, "Unable to get Forklift Check List: " + msg), HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(forkliftCheckList, HttpStatus.OK);
}




public ResponseEntity<?> saveEyeWashConditionChecklist(EyeWashConditionChecklistF009 saveEyeWashChecklist, HttpServletRequest http) {
    try {
        String userRole = getUserRole();
        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
        String userName = userRepository.getUserName(userId);
        LocalDateTime currentDate = LocalDateTime.now();
        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

        if (userRole.equals("STORE_OPERATOR")) {
            Long rawId = saveEyeWashChecklist.getId();

            if (rawId != null) {
                // Fetch the existing record by ID from the database
            	EyeWashConditionChecklistF009 existingCheckList = EyeWashChecklistRepo.fetchEyeWashConditionChecklistById(rawId);

                if (existingCheckList != null) {
                    // Update only the fields that have new values
                	  existingCheckList.setUnit(saveEyeWashChecklist.getUnit());
                      existingCheckList.setFormatNo(saveEyeWashChecklist.getFormatNo());
                      existingCheckList.setFormatName(saveEyeWashChecklist.getFormatName());
                      existingCheckList.setRevisionNo(saveEyeWashChecklist.getRevisionNo());
                      existingCheckList.setSopNumber(saveEyeWashChecklist.getSopNumber());
                      existingCheckList.setDate(saveEyeWashChecklist.getDate());
                      existingCheckList.setShowerPullRod(saveEyeWashChecklist.getShowerPullRod());
                      existingCheckList.setPushboard(saveEyeWashChecklist.getPushboard());
                      existingCheckList.setWaterflow(saveEyeWashChecklist.getWaterflow());
                      existingCheckList.setRemarks(saveEyeWashChecklist.getRemarks());

                    // Update audit fields
                    existingCheckList.setOperator_status(AppConstantStore.operatorSave);
                    existingCheckList.setOperator_saved_on(date);
                    existingCheckList.setOperator_saved_by(userName);
                    existingCheckList.setOperator_saved_id(userId);

                    // Save the updated entity
                    EyeWashChecklistRepo.save(existingCheckList);
                } else {
                    return new ResponseEntity(new ApiResponse(false, "Record not found"), HttpStatus.NOT_FOUND);
                }
            } else {
                // Create new record if rawId is null
            	saveEyeWashChecklist.setOperator_status(AppConstantStore.operatorSave);
            	saveEyeWashChecklist.setOperator_saved_on(date);
            	saveEyeWashChecklist.setOperator_saved_by(userName);
            	saveEyeWashChecklist.setOperator_saved_id(userId);

            	EyeWashChecklistRepo.save(saveEyeWashChecklist);
            }
        } else {
            return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to save form !!!"), HttpStatus.BAD_REQUEST);
        }
    } catch (Exception e) {
        String msg = e.getMessage();
        log.error("Unable to Save Record: " + msg);

        return new ResponseEntity(new ApiResponse(false, "Failed to Save EyeWashCondition Check List: " + msg), HttpStatus.BAD_REQUEST);
    }
    
    return new ResponseEntity(saveEyeWashChecklist, HttpStatus.CREATED);
}

public ResponseEntity<?> SubmitEyeWashConditionChecklist(
		@RequestBody EyeWashConditionChecklistF009 submitEyeChecklist, HttpServletRequest http) {
	if (submitEyeChecklist == null) {
		return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
				HttpStatus.BAD_REQUEST);
	}

	SCAUtil scaUtil = new SCAUtil();
	Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
	String userName = userRepository.getUserName(userId);
	String role = sca.getUserRoleFromRequest(http, tokenProvider);

	Long id = submitEyeChecklist.getId();
	EyeWashConditionChecklistF009 bleachObj = new EyeWashConditionChecklistF009();
	// Get the current time
	LocalDateTime now = LocalDateTime.now();
	Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
	


	try {
		String missingField = "";
		if (submitEyeChecklist.getFormatNo() == null)
			missingField = "formatNo";
		if (submitEyeChecklist.getSopNumber() == null)
			missingField = "sopNumber";
		if (submitEyeChecklist.getRevisionNo() == null)
			missingField = "revisionNo";

		if (!missingField.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
					HttpStatus.BAD_REQUEST);
		}

		if (id != null) {
			bleachObj = EyeWashChecklistRepo.fetchEyeWashConditionChecklistById(id);
			if (bleachObj == null) {
				return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
			}
		}
		submitEyeChecklist.setCreatedAt(bleachObj.getCreatedAt());
		submitEyeChecklist.setCreatedBy(bleachObj.getCreatedBy());

			String currentStatus = bleachObj.getOperator_status();
			String currentMailStatus = bleachObj.getMailStatus();

			if ("STORE_OPERATOR".equalsIgnoreCase(role)) {

				if (!AppConstantStore.StoreInchargeAPPROVED.equals(currentStatus)) 
				{

					submitEyeChecklist.setOperator_status(AppConstantStore.operatorApproved);
					submitEyeChecklist.setOperator_submit_on(date);
					submitEyeChecklist.setOperator_sign(userName);
					submitEyeChecklist.setOperator_submit_by(userName);
					submitEyeChecklist.setOperator_submit_id(userId);
					submitEyeChecklist.setStore_in_charge_status(AppConstantStore.waitingStatus);
					submitEyeChecklist.setMailStatus(AppConstantStore.waitingStatus);;
					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					submitEyeChecklist.setOperator_Signature(signature);
					
					EyeWashChecklistRepo.save(submitEyeChecklist);
					

					
					// HISTORY
					
					EyeWashConditionChecklistHistoryF009 EyeWashChecklistHistory = new EyeWashConditionChecklistHistoryF009();
		
					
					
					EyeWashChecklistHistory.setUnit(submitEyeChecklist.getUnit());
					EyeWashChecklistHistory.setFormatName(submitEyeChecklist.getFormatName());
					EyeWashChecklistHistory.setFormatNo(submitEyeChecklist.getFormatNo());
					EyeWashChecklistHistory.setRevisionNo(submitEyeChecklist.getRevisionNo());
					EyeWashChecklistHistory.setSopNumber(submitEyeChecklist.getSopNumber());
					EyeWashChecklistHistory.setDate(submitEyeChecklist.getDate());  
					EyeWashChecklistHistory.setShowerPullRod(submitEyeChecklist.getShowerPullRod());
					EyeWashChecklistHistory.setPushboard(submitEyeChecklist.getPushboard());
					EyeWashChecklistHistory.setWaterflow(submitEyeChecklist.getWaterflow());
					EyeWashChecklistHistory.setRemarks(submitEyeChecklist.getRemarks());
				
					

						// STATUS
					EyeWashChecklistHistory.setOperator_status(submitEyeChecklist.getOperator_status());
					EyeWashChecklistHistory.setOperator_sign(submitEyeChecklist.getOperator_sign());
					EyeWashChecklistHistory.setOperator_submit_by(submitEyeChecklist.getOperator_submit_by());
					EyeWashChecklistHistory.setOperator_submit_id(submitEyeChecklist.getOperator_submit_id());
					EyeWashChecklistHistory.setOperator_submit_on(submitEyeChecklist.getOperator_submit_on());
					EyeWashChecklistHistory.setStore_in_charge_status(submitEyeChecklist.getStore_in_charge_status());
					
					
                    // Version 
					
                       
					
					 
                        LocalDate Date  = EyeWashChecklistHistory.getDate();
					
					
					int version = eyeChecklistHistoryRepoF009.getMaximumVersion(Date)
							.map(temp -> temp + 1).orElse(1);

					EyeWashChecklistHistory.setVersion(version);
					
					
					eyeChecklistHistoryRepoF009.save(EyeWashChecklistHistory);

					try {

						mailFunction.sendEmailToHODF09(submitEyeChecklist);
					} catch (Exception ex) {
						return new ResponseEntity<>(
								new ApiResponse(false, "Store Operator Approved but Unable to send mail to HOD! "),
								HttpStatus.OK);
					}
				}
				
				else {
					return new ResponseEntity<>(new ApiResponse(false, "INCHARGE already approved"),
							HttpStatus.BAD_REQUEST);
				}
			} 

			else {
				return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
						HttpStatus.FORBIDDEN);
			}

	} catch (Exception ex) {
		logger.error(" **** Unable to submit Reception Check List Details **** ", ex);
		return new ResponseEntity<>(
				new ApiResponse(false, "Unable to submit EyeWashCondition Check List Details: " + ex.getMessage()),
				HttpStatus.BAD_REQUEST);
	}

	return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"),
			HttpStatus.OK);
}

public ResponseEntity<?> approveRejectEyeWashChecklist(ApproveResponse approveResponse, HttpServletRequest http) {
	
	SCAUtil sca = new SCAUtil();
	
	EyeWashConditionChecklistF009 EyeWashChecklist = new EyeWashConditionChecklistF009();
	
	String userRole = getUserRole();
	Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	String userName = userRepository.getUserName(userId);
	LocalDateTime currentDate = LocalDateTime.now();
	Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
	
	try {
		
		EyeWashChecklist = EyeWashChecklistRepo.fetchEyeWashConditionChecklistById(approveResponse.getId());
		
		
		EyeWashConditionChecklistHistoryF009 EyeWashChecklistHistory = new EyeWashConditionChecklistHistoryF009();
		
		String supervisiorStatus = EyeWashChecklist.getOperator_status();
		
		String hodStatus = EyeWashChecklist.getStore_in_charge_status();
		
		UserImageDetails imageDetails = new UserImageDetails();
		
//		if(supervisiorStatus.equalsIgnoreCase(AppConstantStore.operatorApproved) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus))
		{
			
			if(userRole.equalsIgnoreCase("STORE_INCHARGE") ) {
				
				if(approveResponse.getStatus().equals("Approve")) {
					
					EyeWashChecklist.setStore_in_charge_status(AppConstantStore.StoreInchargeAPPROVED);
					EyeWashChecklist.setStore_in_charge_submit_on(date);
					EyeWashChecklist.setStore_in_charge_submit_by(userName);
					EyeWashChecklist.setStore_in_charge_submit_id(userId);
					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					EyeWashChecklist.setStore_in_charge_Signature(signature);
					
					EyeWashChecklist.setStore_in_charge_sign(userName);
					
					EyeWashChecklistRepo.save(EyeWashChecklist);
					
				
					EyeWashChecklistHistory = eyeChecklistHistoryRepoF009.fetchLastSubmittedEyeWashConditionChecklistCheckList(EyeWashChecklist.getDate());



					
					EyeWashChecklistHistory.setStore_in_charge_status(AppConstants.hodApprovedStatus);
					EyeWashChecklistHistory.setStore_in_charge_submit_on(date);
					EyeWashChecklistHistory.setStore_in_charge_submit_by(userName);
					EyeWashChecklistHistory.setStore_in_charge_sign(userName);
					EyeWashChecklistHistory.setStore_in_charge_submit_id(userId);
				
					
					eyeChecklistHistoryRepoF009.save(EyeWashChecklistHistory);
					
					return new ResponseEntity<>(new ApiResponse(true, "STORE_INCHARGE Approved Successfully"), HttpStatus.OK);
					
				}
				
				else if(approveResponse.getStatus().equals("Reject")) {
					
					String reason = approveResponse.getRemarks();
					EyeWashChecklist.setReason(reason);
					EyeWashChecklist.setStore_in_charge_status(AppConstantStore.StoreInchargeREJECTED);
					EyeWashChecklist.setStore_in_charge_submit_on(date);
					EyeWashChecklist.setStore_in_charge_submit_id(userId);
					EyeWashChecklist.setStore_in_charge_submit_by(userName);
					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					EyeWashChecklistHistory.setStore_in_charge_Signature(signature);
					
					EyeWashChecklist.setStore_in_charge_sign(userName);
					
					EyeWashChecklistRepo.save(EyeWashChecklist);

					
					EyeWashChecklistHistory = eyeChecklistHistoryRepoF009.fetchLastSubmittedEyeWashConditionChecklistCheckList(EyeWashChecklist.getDate());
					
					EyeWashChecklistHistory.setStore_in_charge_status(AppConstants.hodRejectedStatus);
					EyeWashChecklistHistory.setReason(reason);
					EyeWashChecklistHistory.setStore_in_charge_submit_on(date);
					EyeWashChecklistHistory.setStore_in_charge_submit_by(userName);
					EyeWashChecklist.setStore_in_charge_submit_id(userId);
					EyeWashChecklistHistory.setStore_in_charge_sign(userName);
					
					eyeChecklistHistoryRepoF009.save(EyeWashChecklistHistory);
					
					return new ResponseEntity<>(new ApiResponse(true, "STORE_INCHARGE Rejected Successfully"), HttpStatus.OK);
					
				} 
				
				else {
					return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
				}
				
			} else {
				return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"), HttpStatus.BAD_REQUEST);
			}
			
		}
		
//		else {
//			return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Submitted"), HttpStatus.BAD_REQUEST);
//		}
		
	} catch(Exception e) {
		
		String msg = e.getMessage();
		log.error("Unable to Approve Record" + msg);

		return new ResponseEntity(
				new ApiResponse(false, "Failed to approve/reject EyeWashCondition Record " + msg),
				HttpStatus.BAD_REQUEST);
		
		
	}
}




//public ResponseEntity<?> getEyeWashConditionChecklistPrint(String year, String month, String date) {
//    List<EyeWashConditionChecklistF009> EyeWashConditionChecklist = new ArrayList<>();
//
//    try {
//        if (date != null && !date.isEmpty()) {
//        	EyeWashConditionChecklist = EyeWashChecklistRepo.getEyeWashCheckListByDate(date);
//        } else if (year != null && !year.isEmpty() && month != null && !month.isEmpty()) {
//        	EyeWashConditionChecklist = EyeWashChecklistRepo.getEyeWashCheckListByYearAndMonth(year, month);
//        } else if (year != null && !year.isEmpty()) {
//        	EyeWashConditionChecklist = EyeWashChecklistRepo.getEyeWashCheckListByYear(year);
//        }
//    } catch (Exception ex) {
//        String msg = ex.getMessage();
//        logger.error("Unable to get Non-Returnable Gate Pass list: " + msg);
//        return new ResponseEntity<>(
//                new ApiResponse(false, "Unable to get Non-Returnable Gate Pass list: " + msg),
//                HttpStatus.BAD_REQUEST);
//    }
//
//    return new ResponseEntity<>(EyeWashConditionChecklist, HttpStatus.OK);
//}

// CR


public ResponseEntity<?> getEyeWashConditionChecklistPrint(String year, String month, String fromDate, String toDate) {
    List<EyeWashConditionChecklistF009> EyeWashConditionChecklist = new ArrayList<>();

    try {
        if (fromDate != null && !fromDate.isEmpty() && toDate != null && !toDate.isEmpty()) {
            EyeWashConditionChecklist = EyeWashChecklistRepo.getEyeWashCheckListByDateRange(fromDate, toDate);
        } else if (year != null && !year.isEmpty() && month != null && !month.isEmpty()) {
            EyeWashConditionChecklist = EyeWashChecklistRepo.getEyeWashCheckListByYearAndMonth(year, month);
        } else if (year != null && !year.isEmpty()) {
            EyeWashConditionChecklist = EyeWashChecklistRepo.getEyeWashCheckListByYear(year);
        }
    } catch (Exception ex) {
        String msg = ex.getMessage();
        logger.error("Unable to get Eye Wash Condition Checklist: " + msg);
        return new ResponseEntity<>(
                new ApiResponse(false, "Unable to get Eye Wash Condition Checklist: " + msg),
                HttpStatus.BAD_REQUEST);
    }

    return new ResponseEntity<>(EyeWashConditionChecklist, HttpStatus.OK);
}


public ResponseEntity<?> getEyeWashChecklistSummary() {
	
	String userRole = getUserRole();
	
	List<EyeWashConditionChecklistF009> EyeWashChecklist = new ArrayList<>();
	
	try {
		
		if(userRole.equals("STORE_OPERATOR")) {
			
			
			EyeWashChecklist = EyeWashChecklistRepo.EyeWashCheckListforAssistant();
			
		} else if(userRole.equals("STORE_INCHARGE")) {
			
			EyeWashChecklist = EyeWashChecklistRepo.EyeWashCheckListforHod();
			
		} else {
			return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to access Hand Sanitation form"), HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(EyeWashChecklist, HttpStatus.OK);
	} catch(Exception ex) {
		String msg = ex.getMessage();
		ex.printStackTrace();
		logger.error("Unable to get summary record" + msg);
		return new ResponseEntity(
				new ApiResponse(false, "Failed to get  EyeWashCondition summary record" + msg),
				HttpStatus.BAD_REQUEST);
	}
}

public ResponseEntity<?> getEyeWashChecklistCheckList(String date) {
    List<EyeWashConditionChecklistF009> forkliftCheckList = new ArrayList<>();
    try {
        forkliftCheckList = EyeWashChecklistRepo.findByWashChecklistDate(date);
    } catch (Exception ex) {
        String msg = ex.getMessage();
        ex.printStackTrace();
        logger.error("Unable to get Forklift Check List: " + msg);
        return new ResponseEntity<>(new ApiResponse(false, "Unable to get Forklift Check List: " + msg), HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(forkliftCheckList, HttpStatus.OK);
}


// 23-12-2024

public ResponseEntity<?> saveMetarialInwards(MaterialInwardRegister MaterialInwardRegister, HttpServletRequest http) {
	
	try {
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		if(userRole.equals("STORE_INCHARGE")) {
			
			Long rawId = MaterialInwardRegister.getId();
			
			if(rawId != null)
			{
				MaterialInwardRegister MaterialInward = new MaterialInwardRegister();	
				MaterialInward = materialInwardRepo.fetchReceptionChecklistById(rawId);
				MaterialInwardRegister.setCreatedAt(MaterialInward.getCreatedAt());
				MaterialInwardRegister.setCreatedBy(MaterialInward.getCreatedBy());
				materialInwardRepo.save(MaterialInwardRegister);
			}
			
			MaterialInwardRegister.setStore_in_charge_status(AppConstantStore.StoreInchargeSave);		
			MaterialInwardRegister.setStore_in_charge_saved_by(userName);;
			MaterialInwardRegister.setStore_in_charge_saved_id(userId);
			MaterialInwardRegister.setStore_in_charge_saved_on(date);
	
			materialInwardRepo.save(MaterialInwardRegister);
			
		} else {
			
			return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to save form !!! "), HttpStatus.BAD_REQUEST);
			
		}
		
	} catch(Exception e) {
		
		String msg = e.getMessage();
		log.error("Unable to Save Record" + msg);

		return new ResponseEntity(
				new ApiResponse(false, "Failed to Save MATERIAL INWARDS REGISTER" + msg),
				HttpStatus.BAD_REQUEST);
		
		
	}
	return new ResponseEntity(MaterialInwardRegister, HttpStatus.CREATED);
	
}


public ResponseEntity<?> submitMetarialInwards(MaterialInwardRegister materialInwardRegister, HttpServletRequest http) {
    try {
        // Retrieve user details
        String userRole = getUserRole();
        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
        String userName = userRepository.getUserName(userId);
        LocalDateTime currentDate = LocalDateTime.now();
        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

        if (userRole.equals("STORE_INCHARGE")) {

            Long rawId = materialInwardRegister.getId();

            if (rawId != null) {
                // Fetch existing record and preserve created details
                MaterialInwardRegister materialInward = materialInwardRepo.fetchReceptionChecklistById(rawId);
                materialInwardRegister.setCreatedAt(materialInward.getCreatedAt());
                materialInwardRegister.setCreatedBy(materialInward.getCreatedBy());
            }

            // Update Store Incharge submission details
            materialInwardRegister.setStore_in_charge_status(AppConstantStore.StoreInchargestatussubmit);
            materialInwardRegister.setStore_in_charge_submit_by(userName);
            materialInwardRegister.setStore_in_charge_submit_id(userId);
            materialInwardRegister.setStore_in_charge_submit_on(date);
            materialInwardRegister.setStore_in_charge_sign(userName);

            // Save to repository
            materialInwardRepo.save(materialInwardRegister);

            // Success response
            return ResponseEntity.ok(new ApiResponse(true, "Material Inwards submitted successfully!"));
        } else {
            // Unauthorized response
            return new ResponseEntity<>(
                    new ApiResponse(false, userRole + " not authorized to submit this form!"),
                    HttpStatus.BAD_REQUEST
            );
        }
    } catch (Exception e) {
        String msg = e.getMessage();
        log.error("Unable to Submit Record: " + msg);

        // Failure response
        return new ResponseEntity<>(
                new ApiResponse(false, "Failed to Submit MATERIAL INWARDS REGISTER: " + msg),
                HttpStatus.BAD_REQUEST
        );
    }
}

public ResponseEntity<?> getMetarialInwardsSummary() {
	
	String userRole = getUserRole();
	
	List<MaterialInwardRegister> MaterialInward = new ArrayList<>();
	
	try {
		
		if(userRole.equals("STORE_INCHARGE")) {
			
			
			MaterialInward = materialInwardRepo.MaterialInwardRegisterforIncharge();
			
		} 
		else {
			
			return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to access Hand Sanitation form"), HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(MaterialInward, HttpStatus.OK);
	} catch(Exception ex) {
		String msg = ex.getMessage();
		ex.printStackTrace();
		logger.error("Unable to get summary record" + msg);
		return new ResponseEntity(
				new ApiResponse(false, "Failed to get  Metarial Inwards summary record" + msg),
				HttpStatus.BAD_REQUEST);
	}
}



public ResponseEntity<?> getMetarialInwards(String date) {
    List<MaterialInwardRegister> MaterialInward = new ArrayList<>();
    try {
    	MaterialInward = materialInwardRepo.findByMaterialInwardRegisterDate(date);
    } catch (Exception ex) {
        String msg = ex.getMessage();
        ex.printStackTrace();
        logger.error("Unable to get Forklift Check List: " + msg);
        return new ResponseEntity<>(new ApiResponse(false, "Unable to get Forklift Check List: " + msg), HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(MaterialInward, HttpStatus.OK);
}



public ResponseEntity<?> getMetarialInwardsPrint(String year, String month, String fromDate, String toDate) {
    List<MaterialInwardRegister> MaterialInwardRegister = new ArrayList<>();

    try {
        if (fromDate != null && !fromDate.isEmpty() && toDate != null && !toDate.isEmpty()) {
        	MaterialInwardRegister = materialInwardRepo.getMaterialInwardRegisterforByDateRange(fromDate, toDate);
        } else if (year != null && !year.isEmpty() && month != null && !month.isEmpty()) {
        	MaterialInwardRegister = materialInwardRepo.getMaterialInwardRegisterforByYearAndMonth(year, month);
        } else if (year != null && !year.isEmpty()) {
        	MaterialInwardRegister = materialInwardRepo.getMaterialInwardRegisterforByYear(year);
        }
    } catch (Exception ex) {
        String msg = ex.getMessage();
        logger.error("Unable to get Eye Wash Condition Checklist: " + msg);
        return new ResponseEntity<>(
                new ApiResponse(false, "Unable to get Eye Wash Condition Checklist: " + msg),
                HttpStatus.BAD_REQUEST);
    }

    return new ResponseEntity<>(MaterialInwardRegister, HttpStatus.OK);
}




}
