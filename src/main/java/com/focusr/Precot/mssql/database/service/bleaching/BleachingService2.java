package com.focusr.Precot.mssql.database.service.bleaching;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
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
import com.focusr.Precot.mssql.database.model.bleaching.BleachEquipmentUsageLogBookF33;
import com.focusr.Precot.mssql.database.model.bleaching.BleachLayDownCheckListF42;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachEquipmentUsageLogBookHistoryF33;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachLayDownCheckListF42History;
import com.focusr.Precot.mssql.database.repository.EmailDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachEquipmentUsageLogBookF33Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachLayDownCheckListF42Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachEquipmentUsageLogBookF33RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachLayDownCheckListF42RepositoryHistory;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.payload.BleachingWasteBaleResponseNew;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.BleachMailFunction;
import com.focusr.Precot.util.EmailHtmlLoader;
import com.focusr.Precot.util.EmailSubject;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.SendMail;

@Service
public class BleachingService2 {

	@Autowired
	EmailHtmlLoader emailhtmlloader;

	@Autowired
	EmailDetailsRepository emaildetailsrepository;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	SCAUtil scaUtil;

	@Autowired
	private UserRepository userrepository;

	@Autowired
	private EmailDetailsRepository emailDetailsRepository;

	@Autowired
	BleachEquipmentUsageLogBookF33Repository bleachEquipmentUsageLogBookF33Repository;
	
	@Autowired
	BleachEquipmentUsageLogBookF33RepositoryHistory bleachEquipmentUsageLogBookF33RepositoryHistory;

	@Autowired
	BleachLayDownCheckListF42Repository bleachLayDownCheckListF42Repository;
	
	@Autowired
	BleachMailFunction bleachmailfunction;
	
	@Autowired
	private UserImageDetailsRepository imageRepository;
	
	@Autowired
	private BleachLayDownCheckListF42RepositoryHistory bleachLayDownCheckListF42RepositoryHistory;

	SCAUtil sca = new SCAUtil();

	Logger log = LoggerFactory.getLogger(BleachingService2.class);

	// SUPERVISOR & HOD SAVE

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> saveEquipmentUsageF33(List<BleachEquipmentUsageLogBookF33> detailsList,
			HttpServletRequest http) {

		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

		String userName = userRepository.getUserName(userId);

		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

		BleachEquipmentUsageLogBookF33 bleachEquipment = new BleachEquipmentUsageLogBookF33();

		try {

			if (role.equals("ROLE_SUPERVISOR")) {

				// SUPERVISOR SAVE

				for (BleachEquipmentUsageLogBookF33 details : detailsList) {

					Date date = new Date();

					details.setSupervisor_status(AppConstants.supervisorSave);
					details.setSupervisor_saved_on(date);
					details.setSupervisor_saved_by(userName);
					details.setSupervisor_saved_id(userId);
					details.setSupervisor_sign(userName);

					Long id = details.getId();

					String createdBy = "";
					Date createdAt = null;

					if (id != null) {

						bleachEquipment = bleachEquipmentUsageLogBookF33Repository.BleachEquipmentUsageById(id);

						createdAt = bleachEquipment.getCreatedAt();
						createdBy = bleachEquipment.getCreatedBy();

						details.setCreatedAt(createdAt);
						details.setCreatedBy(createdBy);

					}

					bleachEquipmentUsageLogBookF33Repository.save(details);

					System.out.println("ROLE_SUPERVISOR LOGIN");

				}

			} else if (role.equals("ROLE_HOD")||"ROLE_DESIGNEE".equals(role)) {

				BleachEquipmentUsageLogBookF33 bleachEquipmentUsage = new BleachEquipmentUsageLogBookF33();

				for (BleachEquipmentUsageLogBookF33 details : detailsList) {
					
					if(!details.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus))
					{
						return new ResponseEntity(new ApiResponse(false, "ROLE_SUPERVISOR can submit details"),
								HttpStatus.BAD_REQUEST);
					}

					Long id = details.getId();


					String value = "";

					Date date = new Date();

					String createdBy = "";
					Date createdAt = null;

					bleachEquipmentUsage = bleachEquipmentUsageLogBookF33Repository.BleachEquipmentUsageById(id);

					createdAt = bleachEquipmentUsage.getCreatedAt();
					createdBy = bleachEquipmentUsage.getCreatedBy();

					details.setCreatedAt(createdAt);
					details.setCreatedBy(createdBy);

					details.setSupervisor_sign(bleachEquipmentUsage.getSupervisor_sign());
					details.setSupervisor_status(bleachEquipmentUsage.getSupervisor_status());

					details.setSupervisor_saved_on(bleachEquipmentUsage.getSupervisor_saved_on());
					details.setSupervisor_saved_by(bleachEquipmentUsage.getSupervisor_saved_by());
					details.setSupervisor_saved_id(bleachEquipmentUsage.getSupervisor_saved_id());

					details.setSupervisor_submit_on(bleachEquipmentUsage.getSupervisor_submit_on());
					details.setSupervisor_submit_by(bleachEquipmentUsage.getSupervisor_submit_by());
					details.setSupervisor_submit_id(bleachEquipmentUsage.getSupervisor_submit_id());

					details.setHod_sign(userName);
					details.setHod_saved_by(userName);
					details.setHod_saved_id(userId);
					details.setHod_saved_on(date);
					details.setHod_status(AppConstants.hodSave);

					details.setMail_status(AppConstants.waitingStatus);

					bleachEquipmentUsageLogBookF33Repository.save(details);

					System.out.println("ROLE_HOD LOGIN");

				}

			}

			return new ResponseEntity<>(detailsList, HttpStatus.OK);

		}

		catch (Exception e) {

			log.error(
					"***************** Unable to Save Equipment Usage Log Details - F33!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Equipment Usage Log Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// SUPERVISOR & HOD SUBMIT

	@SuppressWarnings("unchecked")
//	public ResponseEntity<?> submitEquipmentUsageF33(List<BleachEquipmentUsageLogBookF33> detailsList,
//			HttpServletRequest http) {
//
//		SCAUtil scaUtil = new SCAUtil();
//
//		if (detailsList == null) {
//			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
//		}
//
//		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
//
//		String userName = userRepository.getUserName(userId);
//
//		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
//
//		BleachEquipmentUsageLogBookF33 bleachEquipment = new BleachEquipmentUsageLogBookF33();
//
//		try {
//
//			List<BleachEquipmentUsageLogBookF33> equipmentList = new ArrayList<>();
//			
//			if (role.equals("ROLE_SUPERVISOR")) {
//
//				// SUPERVISOR SUBMIT
//
//				for (BleachEquipmentUsageLogBookF33 details : detailsList) {
//
//					Long id = details.getId();
//
//					
//
//					Date date = new Date();
//
//					String createdBy = "";
//					Date createdAt = null;
//
//					if (id != null) {
//						BleachEquipmentUsageLogBookF33 Status = bleachEquipmentUsageLogBookF33Repository.getStatus2(id);
//
//						String status = Status.getSupervisor_status();
//
//						if (AppConstants.supervisorApprovedStatus.equals(status)) {
//
//							return new ResponseEntity<>(new ApiResponse(true, "Supervisor Already Submitted"),
//									HttpStatus.OK);
//
//						}
//
//						bleachEquipment = bleachEquipmentUsageLogBookF33Repository.BleachEquipmentUsageById(id);
//
//						createdAt = bleachEquipment.getCreatedAt();
//						createdBy = bleachEquipment.getCreatedBy();
//
//						details.setCreatedAt(createdAt);
//						details.setCreatedBy(createdBy);
//
//						details.setSupervisor_saved_on(bleachEquipment.getSupervisor_saved_on());
//						details.setSupervisor_saved_by(bleachEquipment.getSupervisor_saved_by());
//						details.setSupervisor_saved_id(bleachEquipment.getSupervisor_saved_id());
//
//					}
//
//					details.setSupervisor_status(AppConstants.supervisorApprovedStatus);
//					details.setSupervisor_submit_on(date);
//					details.setSupervisor_submit_by(userName);
//					details.setSupervisor_submit_id(userId);
//					details.setSupervisor_sign(userName);
//					
//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					details.setSupervisiorSignature(signature);
//
//					details.setMail_status(AppConstants.waitingStatus);
//
//					details.setHod_status(AppConstants.waitingStatus);
//
//					bleachEquipmentUsageLogBookF33Repository.save(details);
//					
//					equipmentList.add(details);
//
//					System.out.println("ROLE_SUPERVISOR LOGIN");
//					
////					BleachEquipmentUsageLogBookHistoryF33 equipmentUsageLogBookHistoryF33 = new BleachEquipmentUsageLogBookHistoryF33();
////					
////					BeanUtils.copyProperties(details, equipmentUsageLogBookHistoryF33);
////					
////					String date1 = equipmentUsageLogBookHistoryF33.getDate();
////					
////					int version = bleachEquipmentUsageLogBookF33RepositoryHistory.getMaximumVersion(date1).map(temp -> temp + 1).orElse(1);
////					
////					equipmentUsageLogBookHistoryF33.setVersion(version);
////					
////					bleachEquipmentUsageLogBookF33RepositoryHistory.save(equipmentUsageLogBookHistoryF33);
//				}
//				
//				
//				// SAVE HISTORY 
//				saveHistoryWasteBaleRecords(equipmentList);
//				
//				//mail for hod
//				try {
//
//					bleachmailfunction.sendMailToHODf33(detailsList);
//			} catch (Exception ex) {
//				return new ResponseEntity<>(new ApiResponse(false, "Unable to send mail to HOD! "),
//						HttpStatus.BAD_REQUEST);
//			}
//
//			} 
//			else
//			{
//				return new ResponseEntity(new ApiResponse(false, "User role not authorized to Submit"),
//						HttpStatus.BAD_REQUEST);
//			}
//
//			return new ResponseEntity(new ApiResponse(true, "Supervisior Submitted Sucessfully"),
//					HttpStatus.OK);
//
//		}
//
//		catch (Exception e) {
//
//			log.error(
//					"***************** Unable to Save Equipment Usage Log Details - F33!  *********************\n" + e);
//
//			String msg = sca.getErrorMessage(e);
//
//			return new ResponseEntity(new ApiResponse(false, "Unable to Save Equipment Usage Log Details!" + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//	}
	
	public ResponseEntity<?> submitEquipmentUsageF33(List<BleachEquipmentUsageLogBookF33> detailsList, HttpServletRequest http) {
	    SCAUtil scaUtil = new SCAUtil();

	    if (detailsList == null) {
	        return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
	    }

	    Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
	    String userName = userRepository.getUserName(userId);
	    String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

	    if (!role.equals("ROLE_SUPERVISOR")) {
	        return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to Submit"), HttpStatus.BAD_REQUEST);
	    }

	    try {
	        List<BleachEquipmentUsageLogBookF33> equipmentList = new ArrayList<>();

	        for (BleachEquipmentUsageLogBookF33 details : detailsList) {
	            Long id = details.getId();
	            Date date = new Date();

	            if (id != null) {
	                BleachEquipmentUsageLogBookF33 existingRecord = bleachEquipmentUsageLogBookF33Repository.findById(id).orElse(null);

	                if (existingRecord != null) {
	                    String status = existingRecord.getSupervisor_status();
	                    String hodStatus = existingRecord.getHod_status();
	                    
	                    if(status.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && status.equalsIgnoreCase(AppConstants.hodRejectedStatus)) {
	                    	details.setCreatedAt(existingRecord.getCreatedAt());
		                    details.setCreatedBy(existingRecord.getCreatedBy());
	                    }
	                    
	                }
	            }

	            details.setSupervisor_status(AppConstants.supervisorApprovedStatus);
	            details.setSupervisor_submit_on(date);
	            details.setSupervisor_submit_by(userName);
	            details.setSupervisor_submit_id(userId);
	            details.setSupervisor_sign(userName);

	            Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
	            byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
	            details.setSupervisiorSignature(signature);

	            details.setMail_status(AppConstants.waitingStatus);
	            details.setHod_status(AppConstants.waitingStatus);

	            bleachEquipmentUsageLogBookF33Repository.save(details);
	            equipmentList.add(details);
	        }

	        // SAVE HISTORY 
	        saveHistoryWasteBaleRecords(equipmentList);

	        // mail for hod
	        try {
	            bleachmailfunction.sendMailToHODf33(detailsList);
	        } catch (Exception ex) {
                return new ResponseEntity<>(new ApiResponse(true, "Supervisor Submitted but Unable to send mail to HOD! "),
                        HttpStatus.OK);
            }

	        return new ResponseEntity<>(new ApiResponse(true, "Supervisor Submitted Successfully"), HttpStatus.OK);

	    } catch (Exception e) {
	        log.error("Unable to Save Equipment Usage Log Details - F33! ", e);
	        String msg = scaUtil.getErrorMessage(e);
	        return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Equipment Usage Log Details! " + msg), HttpStatus.BAD_REQUEST);
	    }
	}

	
	
//	public void saveHistoryWasteBaleRecords(List<BleachEquipmentUsageLogBookF33> list) {
//		
//		System.out.println("BBB" + list.size());
//		
//		BleachEquipmentUsageLogBookHistoryF33 equipmentHistory = new BleachEquipmentUsageLogBookHistoryF33();
//		
//		List<BleachEquipmentUsageLogBookHistoryF33> equipmentHistoryList = new ArrayList<>();
//		
//		BeanUtils.copyProperties(list, equipmentHistoryList);
//		
//		for(BleachEquipmentUsageLogBookHistoryF33 history : equipmentHistoryList) {
//			
//			int version = bleachEquipmentUsageLogBookF33RepositoryHistory.getMaximumVersion(history.getDate()).map(temp -> temp + 1).orElse(1);
//			
//			history.setVersion(version);
//			
//			bleachEquipmentUsageLogBookF33RepositoryHistory.save(history);
//			
//			System.out.println("version" + version);
//			
//		}
//		
//	}
	
	public void saveHistoryWasteBaleRecords(List<BleachEquipmentUsageLogBookF33> list) {
	    List<BleachEquipmentUsageLogBookHistoryF33> equipmentHistoryList = new ArrayList<>();

	    for (BleachEquipmentUsageLogBookF33 record : list) {
	        BleachEquipmentUsageLogBookHistoryF33 equipmentHistory = new BleachEquipmentUsageLogBookHistoryF33();
	        BeanUtils.copyProperties(record, equipmentHistory);

	        String dateStr = equipmentHistory.getDate();
	        int version = bleachEquipmentUsageLogBookF33RepositoryHistory.getMaximumVersion(dateStr).map(temp -> temp + 1).orElse(1);

	        equipmentHistory.setVersion(version);
	        equipmentHistoryList.add(equipmentHistory);
	    }

	    bleachEquipmentUsageLogBookF33RepositoryHistory.saveAll(equipmentHistoryList);
	}

	

	public ResponseEntity<?> getAllEquipmentUsage() {
		SCAUtil sca = new SCAUtil();

		try {

			List<BleachEquipmentUsageLogBookF33> listOfContRawCotton = bleachEquipmentUsageLogBookF33Repository
					.findAll();

			if (listOfContRawCotton == null) {

				listOfContRawCotton = new ArrayList<BleachEquipmentUsageLogBookF33>();
			}

			return new ResponseEntity(listOfContRawCotton, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Equipment Usage Log Book Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Equipment Usage Log Book Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// SUMMARY DATE UNIQUE RECORD

	public ResponseEntity<?> getSummary(HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();

		List<BleachEquipmentUsageLogBookF33> listOfContRawCotton = null;

		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

		String userName = userRepository.getUserName(userId);

		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

		try {

			if (role.equals("ROLE_SUPERVISOR")) {

				listOfContRawCotton = bleachEquipmentUsageLogBookF33Repository.GetAllUniqueDate();

			} else if (role.equals("ROLE_HOD")||"ROLE_DESIGNEE".equals(role)) {
				listOfContRawCotton = bleachEquipmentUsageLogBookF33Repository.GetAllUniqueDateHOD();

			}

			if (listOfContRawCotton == null) {

				listOfContRawCotton = new ArrayList<BleachEquipmentUsageLogBookF33>();
			}

			return new ResponseEntity(listOfContRawCotton, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Equipment Usage Log Book Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Equipment Usage Log Book Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getEquipmentUsageById(Long id) {
		try {

			Optional<BleachEquipmentUsageLogBookF33> response = bleachEquipmentUsageLogBookF33Repository.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Equipment Usage Log Book Details: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	// BY DATE

	public ResponseEntity<?> getEquipmentUsageByDate(String date, HttpServletRequest http) {
		try {

			List<BleachEquipmentUsageLogBookF33> response = null;

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				response = bleachEquipmentUsageLogBookF33Repository.findByEquipmentUsageF33detailsByDate(date);

				System.out.println("SUPERVISOR LOGIN");

			} else if (role.equals("ROLE_HOD")||"ROLE_DESIGNEE".equals(role)) {

				String submit = AppConstants.supervisorApprovedStatus;

				response = bleachEquipmentUsageLogBookF33Repository.HODEquipmentUsageF33detailsByDate(date, submit);

				System.out.println("HOD LOGIN");

			}

//			response = bleachEquipmentUsageLogBookF33Repository.findByEquipmentUsageF33detailsByDate(date);

			if (response == null) {

				response = new ArrayList<BleachEquipmentUsageLogBookF33>();
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Equipment Usage Log Book Details: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}
	
		// FOR PRINT 
	
//	public ResponseEntity<?> wasteBaleApprovalPrint(Integer year, Integer month, String date, HttpServletRequest http) {
//		
//
//		try {
//
//			String yearStr = (year != null) ? String.valueOf(year) : null;
//	        String monthStr = (month != null) ? String.format("%02d", month) : null;
//			
//			List<BleachEquipmentUsageLogBookF33> response = null;
//
//			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
//
//			String userName = userRepository.getUserName(userId);
//
//			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
//
//			
//			log.info("Query Params : " +  "Year :" + year  + "Year STring :" + yearStr +  "Month: " + month + "Month String: " + monthStr + "Date : " + date);
//			
//			response = bleachEquipmentUsageLogBookF33Repository.findByEquipmentUsageF33detailsByDatePrint(yearStr, monthStr, date);
//
//			if (response == null || response.isEmpty()) {
//
//				log.info("No data found for the provided parameters.");
//				response = new ArrayList<BleachEquipmentUsageLogBookF33>();
//			}
//
//			return new ResponseEntity<>(response, HttpStatus.OK);
//		} catch (Exception e) {
//			return new ResponseEntity<>("Error Get Equipment Usage Log Book Details: " + e.getMessage(),
//					HttpStatus.BAD_REQUEST);
//		}
//	
//		
//	}
	
	
	public ResponseEntity<?> wasteBaleApprovalPrint(Integer year, Integer month, String fromDate, String toDate, HttpServletRequest http) {
	    try {
	        String yearStr = (year != null) ? String.valueOf(year) : null;
	        String monthStr = (month != null) ? String.valueOf(month) : null;

	        List<BleachEquipmentUsageLogBookF33> response = bleachEquipmentUsageLogBookF33Repository
	                .findByEquipmentUsageF33detailsByDatePrint(yearStr, monthStr, fromDate, toDate);

	        if (response == null || response.isEmpty()) {
	            response = new ArrayList<>();
	        }

	        return new ResponseEntity<>(response, HttpStatus.OK);
	    } catch (Exception e) {
	        return new ResponseEntity<>("Error Get Equipment Usage Log Book Details: " + e.getMessage(),
	                HttpStatus.BAD_REQUEST);
	    }
	}

	
	public ResponseEntity<?> approveRejectWasteBale(ApproveResponse approveResponse, HttpServletRequest http) {
		
		SCAUtil sca = new SCAUtil();
		
		BleachEquipmentUsageLogBookF33 bleachCheckListF42 = new BleachEquipmentUsageLogBookF33();
		
		List<BleachEquipmentUsageLogBookF33> wasteBaleList = new ArrayList<>();
		List<BleachEquipmentUsageLogBookHistoryF33> wasteBaleHistoryList = new ArrayList<>();
		
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			wasteBaleList = bleachEquipmentUsageLogBookF33Repository.findWasteBaleForApproval(approveResponse.getFormatNo());
			
			if(wasteBaleList.isEmpty() || wasteBaleList == null || wasteBaleList.equals(null)) {
				return new ResponseEntity(new ApiResponse(false, "No records found for approval"), HttpStatus.BAD_REQUEST);
			}
			
			if(userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
				
				if(approveResponse.getStatus().equalsIgnoreCase("Approve")) {
					
					for(BleachEquipmentUsageLogBookF33 equipments : wasteBaleList) {
						
						equipments.setHod_status(AppConstants.hodApprovedStatus);
						equipments.setHod_sign(userName);
						equipments.setHod_submit_by(userName);
						equipments.setHod_submit_id(userId);
						
						equipments.setHod_submit_on(date);
						
						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						equipments.setHodSignature(signature);
						
						bleachEquipmentUsageLogBookF33Repository.save(equipments);
						
							// AUDIT HISTORY 
						
						wasteBaleHistoryList = bleachEquipmentUsageLogBookF33RepositoryHistory.fetchLastSubmittedRecordList(equipments.getDate());
						
						for(BleachEquipmentUsageLogBookHistoryF33 history : wasteBaleHistoryList) {
							
							history.setHod_status(AppConstants.hodApprovedStatus);
							history.setHod_sign(userName);
							history.setHod_submit_id(userId);
							history.setHod_submit_on(date);
							
							bleachEquipmentUsageLogBookF33RepositoryHistory.save(history);
							
						}
					}
					
					return new ResponseEntity(new ApiResponse(true, "Hod Approved Successfully"), HttpStatus.OK);
					
				} else if(approveResponse.getStatus().equalsIgnoreCase("Reject")) {
					
					for(BleachEquipmentUsageLogBookF33 equipments : wasteBaleList) {
						
						equipments.setHod_status(AppConstants.hodRejectedStatus);
						equipments.setHod_sign(userName);
						equipments.setHod_submit_by(userName);
						equipments.setHod_submit_id(userId);
						
						equipments.setHod_submit_on(date);
						
						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						equipments.setHodSignature(signature);
						
						bleachEquipmentUsageLogBookF33Repository.save(equipments);
						
						wasteBaleHistoryList = bleachEquipmentUsageLogBookF33RepositoryHistory.fetchLastSubmittedRecordList(equipments.getDate());
						
						for(BleachEquipmentUsageLogBookHistoryF33 history : wasteBaleHistoryList) {
							
							history.setHod_status(AppConstants.hodRejectedStatus);
							history.setHod_sign(userName);
							history.setHod_submit_id(userId);
							history.setHod_submit_on(date);
							
							bleachEquipmentUsageLogBookF33RepositoryHistory.save(history);
							
						}
						
					}
					
					return new ResponseEntity(new ApiResponse(true, "Hod Rejected Successfully"), HttpStatus.OK);
					
				} else {
					return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
				}
				
			} else {
			
				return new ResponseEntity(new ApiResponse(false, userRole + " not able to approve records"), HttpStatus.BAD_REQUEST);
			}
		} catch(Exception e) {
			
			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(
					new ApiResponse(false, "Failed to approve/reject Waste Bale Record " + msg),
					HttpStatus.BAD_REQUEST);
			
			
		}
		
	}
	
	
		// APPROVE OR REJECT 
	
	public ResponseEntity<?> approveRejectF33(ApproveResponse approvalResponse, HttpServletRequest http) {
		

		
		SCAUtil sca = new SCAUtil();
		
		BleachEquipmentUsageLogBookF33 bleachCheckListF42 = new BleachEquipmentUsageLogBookF33();
		
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			bleachCheckListF42 = bleachEquipmentUsageLogBookF33Repository.getStatus2(approvalResponse.getId());
			
			BleachEquipmentUsageLogBookHistoryF33 bleachLayDownCheckListF42History = new BleachEquipmentUsageLogBookHistoryF33();
			
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
						
						bleachEquipmentUsageLogBookF33Repository.save(bleachCheckListF42);
						
						bleachLayDownCheckListF42History = bleachEquipmentUsageLogBookF33RepositoryHistory.fetchLastSubmittedRecords(bleachCheckListF42.getDate());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_sign(userName);
					
						
						bleachEquipmentUsageLogBookF33RepositoryHistory.save(bleachLayDownCheckListF42History);
						
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
						
						bleachEquipmentUsageLogBookF33Repository.save(bleachCheckListF42);

						
						bleachLayDownCheckListF42History = bleachEquipmentUsageLogBookF33RepositoryHistory.fetchLastSubmittedRecords(bleachCheckListF42.getDate());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						
						bleachEquipmentUsageLogBookF33RepositoryHistory.save(bleachLayDownCheckListF42History);
						
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
	

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	// FORMAT NO = PRD01/F-42

	// SAVE LAY DOWN CHECK LIST

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> saveLayDownCheckF42(BleachLayDownCheckListF42 details, HttpServletRequest http) {

		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

		String userName = userRepository.getUserName(userId);

		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

		BleachLayDownCheckListF42 bleachLayDown = new BleachLayDownCheckListF42();

		try {

			String layDown = "";

			if (role.equals("ROLE_SUPERVISOR")) {

				Long id = details.getId();

				if (id == null) {

					layDown = details.getLayDownNo();

					String LayDown = bleachLayDownCheckListF42Repository.getLayDownDetailsSubmit(layDown);

					if (LayDown != null) {
						return new ResponseEntity<>(
								new ApiResponse(true, "Record Already Created for the Laydown Number :" + layDown),
								HttpStatus.OK);

					}

				}

				Date date = new Date();

				details.setSupervisor_status(AppConstants.supervisorSave);
				details.setSupervisor_saved_on(date);
				details.setSupervisor_saved_by(userName);
				details.setSupervisor_saved_id(userId);
				details.setSupervisor_sign(userName);

				String createdBy = "";
				Date createdAt = null;

				if (id != null) {

//					String layDown = details.getLayDownNo();

					String LayDown = bleachLayDownCheckListF42Repository.getLayDownDetails(layDown, id);

					if (LayDown != null) {
						return new ResponseEntity<>(
								new ApiResponse(true, "Record Already Created for the Laydown Number :" + layDown),
								HttpStatus.OK);

					}

					bleachLayDown = bleachLayDownCheckListF42Repository.BleachLayDownById(id);

					createdAt = bleachLayDown.getCreatedAt();
					createdBy = bleachLayDown.getCreatedBy();

					details.setCreatedAt(createdAt);
					details.setCreatedBy(createdBy);
				}

				bleachLayDownCheckListF42Repository.save(details);

				System.out.println("ROLE_SUPERVISOR LOGIN");

			}
			
			else {
				return new ResponseEntity(new ApiResponse(false, "User Not Authorized to Submit Form!"),
						HttpStatus.BAD_REQUEST);
			}
			
//			} else if (role.equals("ROLE_HOD")||"ROLE_DESIGNEE".equals(role)) {
//				Long id = details.getId();
//
//				BleachLayDownCheckListF42 Status = bleachLayDownCheckListF42Repository.getStatus2(id);
//
//				if(!Status.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus))
//				{
//					return new ResponseEntity(new ApiResponse(false, "ROLE_SUPERVISOR can submit details"),
//							HttpStatus.BAD_REQUEST);
//				}
//				
//				BleachLayDownCheckListF42 bleachLayDownCheck = new BleachLayDownCheckListF42();
//
//			
//
//				String value = "";
//
//				Date date = new Date();
//
//				String createdBy = "";
//				Date createdAt = null;
//
//				bleachLayDownCheck = bleachLayDownCheckListF42Repository.BleachLayDownById(id);
//
//				createdAt = bleachLayDownCheck.getCreatedAt();
//				createdBy = bleachLayDownCheck.getCreatedBy();
//
//				details.setCreatedAt(createdAt);
//				details.setCreatedBy(createdBy);
//
//				details.setSupervisor_sign(bleachLayDownCheck.getSupervisor_sign());
//				details.setSupervisor_status(bleachLayDownCheck.getSupervisor_status());
//
//				details.setSupervisor_saved_on(bleachLayDownCheck.getSupervisor_saved_on());
//				details.setSupervisor_saved_by(bleachLayDownCheck.getSupervisor_saved_by());
//				details.setSupervisor_saved_id(bleachLayDownCheck.getSupervisor_saved_id());
//
//				details.setSupervisor_submit_on(bleachLayDownCheck.getSupervisor_submit_on());
//				details.setSupervisor_submit_by(bleachLayDownCheck.getSupervisor_submit_by());
//				details.setSupervisor_submit_id(bleachLayDownCheck.getSupervisor_submit_id());
//
////				details.setHod_sign(userName);
//				details.setHod_saved_by(userName);
//				details.setHod_saved_id(userId);
//				details.setHod_saved_on(date);
//				details.setHod_status(AppConstants.hodSave);
//				details.setMail_status(AppConstants.waitingStatus);
//
//				bleachLayDownCheckListF42Repository.save(details);
//
//				System.out.println("ROLE_HOD LOGIN");
//
//			}

			return new ResponseEntity<>(details, HttpStatus.OK);

		}

		catch (Exception e) {

			log.error(
					"***************** Unable to Save Lay Down Check List Details - F42!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Lay Down Check List Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// SUBMIT LAY DOWN CHECK LIST -- SUPERVISIOR

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> submitLayDownCheckF42(BleachLayDownCheckListF42 details, HttpServletRequest http) {

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		BleachLayDownCheckListF42 bleachLayDown = new BleachLayDownCheckListF42();

		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

		String userName = userRepository.getUserName(userId);

		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

		try {

			if (role.equals("ROLE_SUPERVISOR")) {
//				String value = "";
//				if (details.getFormatNo() == null ||  details.getFormatNo().isEmpty())
//					value = "FormatNo";
//				if (details.getFormatName() == null || details.getFormatName().isEmpty() )
//					value = "FormatName";
//				if (details.getRefSopNo() == null || details.getRefSopNo().isEmpty())
//					value = "RefSopNo";
//				if (details.getRevisionNo() == null || "".equals(details.getRevisionNo()))
//					value = "RevisionNo";
//				if (details.getLayDownNo() == null || details.getLayDownNo().isEmpty())
//					value = "LayDownNo";
//				if (details.getLayDownStartdate() == null || details.getLayDownStartdate().isEmpty())
//					value = "LayDownStartdate";
//				if (details.getLayDownEnddate() == null || details.getLayDownEnddate().isEmpty())
//					value = "LayDownEnddate";
//				if (details.getLayDownStartTime() == null || details.getLayDownStartTime().isEmpty())
//					value = "LayDownStartTime";
//				if (details.getLayDownEndTime() == null || details.getLayDownEndTime().isEmpty() )
//					value = "LayDownEndTime";
// 
//				if (details.getCheckBaleCondition() == null || details.getCheckBaleCondition().isEmpty())
//					value = "CheckBaleCondition";
//				if (details.getCheckForkliftClean() == null || details.getCheckForkliftClean().isEmpty())
//					value = "CheckForkliftClean";
//				if (details.getCheckCleanLayDown() == null || details.getCheckCleanLayDown().isEmpty())
//					value = "CheckCleanLayDown";
//				if (details.getSuppliedBales() == null || details.getSuppliedBales().isEmpty())
//					value = "SuppliedBales";
//				if (details.getToolsForCuttingStraps() == null || details.getToolsForCuttingStraps().isEmpty())
//					value = "ToolsForCuttingStraps";
//				if (details.getPackingMaterial() == null || details.getPackingMaterial().isEmpty())
//					value = "PackingMaterial";
//				if (details.getContaminationInspection() == null || details.getContaminationInspection().isEmpty())
//					value = "ContaminationInspection";
//				if (details.getLayDownWise() == null || details.getLayDownWise().isEmpty())
//					value = "LayDownWise";
//				if (details.getReferenceSample() == null || details.getReferenceSample().isEmpty())
//					value = "ReferenceSample";
// 
//				if (!"".equals(value)) {
//					return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
//							HttpStatus.BAD_REQUEST);
//				}

				// SUBMIT LAY DOWN SUPERVISOR

				Long id = details.getId();

				String Status = bleachLayDownCheckListF42Repository.getStatus(id);


				if (id == null) {
					String layDown = details.getLayDownNo();

					String LayDown = bleachLayDownCheckListF42Repository.getLayDownDetailsSubmit(layDown);

					if (LayDown != null) {
						return new ResponseEntity<>(
								new ApiResponse(true, "Record Already Created for the Laydown Number :" + layDown),
								HttpStatus.OK);

					}

				}

				Date date = new Date();

				String createdBy = "";
				Date createdAt = null;

				if (id != null) {

					String layDown = details.getLayDownNo();

					bleachLayDown = bleachLayDownCheckListF42Repository.BleachLayDownById(id);

					String LayDown2 = bleachLayDownCheckListF42Repository.getLayDownDetails(layDown, id);

					if (LayDown2 != null) {
						return new ResponseEntity<>(
								new ApiResponse(true, "Record Already Created for the Laydown Number :" + layDown),
								HttpStatus.OK);

					}

					createdAt = bleachLayDown.getCreatedAt();
					createdBy = bleachLayDown.getCreatedBy();

					details.setCreatedAt(createdAt);
					details.setCreatedBy(createdBy);

					details.setSupervisor_saved_on(bleachLayDown.getSupervisor_saved_on());
					details.setSupervisor_saved_by(bleachLayDown.getSupervisor_saved_by());
					details.setSupervisor_saved_id(bleachLayDown.getSupervisor_saved_id());

				}

				details.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				details.setSupervisor_submit_on(date);
				details.setSupervisor_submit_by(userName);
				details.setSupervisor_submit_id(userId);
				details.setSupervisor_sign(userName);
				
				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
				
				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
				
				details.setSupervisor_signature_image(signature);

				details.setHod_status(AppConstants.waitingStatus);

				bleachLayDownCheckListF42Repository.save(details);
				
				BleachLayDownCheckListF42History laydownHistory = new BleachLayDownCheckListF42History();
				
				BeanUtils.copyProperties(details, laydownHistory);
				
				String laydown = laydownHistory.getLayDownNo();
				System.out.println("LLL" + laydown);
				
				int version = bleachLayDownCheckListF42RepositoryHistory.getMaximumVersion(laydownHistory.getLayDownNo()).map(temp -> temp + 1).orElse(1);

				laydownHistory.setVersion(version);
				
				bleachLayDownCheckListF42RepositoryHistory.save(laydownHistory);
				
				System.out.println("ROLE_SUPERVISOR LOGIN");

				try {

					bleachmailfunction.sendEmailToHOD42(details);
				} catch (Exception ex) {
	                return new ResponseEntity<>(new ApiResponse(true, "Supervisor Submitted but Unable to send mail to HOD! "),
	                        HttpStatus.OK);
	            }

				return new ResponseEntity<>(new ApiResponse(true, "Supervisor Submitted Succesfully"), HttpStatus.OK);

			} 
//				else if (role.equals("ROLE_HOD")||"ROLE_DESIGNEE".equals(role)) {
//
//				BleachLayDownCheckListF42 bleachLayDownCheck = new BleachLayDownCheckListF42();
//
//				Long id = details.getId();
//
//				BleachLayDownCheckListF42 Status = bleachLayDownCheckListF42Repository.getStatus2(id);
//
//				if(!Status.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus))
//				{
//					return new ResponseEntity(new ApiResponse(false, "ROLE_SUPERVISOR can submit details"),
//							HttpStatus.BAD_REQUEST);
//				}
//				
//				if (Status.getHod_status().equals(AppConstants.hodApprovedStatus)
//						|| Status.getMail_status().equals(AppConstants.hodApprovedStatus)) {
//
//					return new ResponseEntity<>(new ApiResponse(true, "HOD Already Approved"), HttpStatus.OK);
//
//				}
//
//				Date date = new Date();
//
//				String createdBy = "";
//				Date createdAt = null;
//
//				bleachLayDownCheck = bleachLayDownCheckListF42Repository.BleachLayDownById(id);
//
//				createdAt = bleachLayDownCheck.getCreatedAt();
//				createdBy = bleachLayDownCheck.getCreatedBy();
//
//				details.setCreatedAt(createdAt);
//				details.setCreatedBy(createdBy);
//
//				details.setSupervisor_sign(bleachLayDownCheck.getSupervisor_sign());
//				details.setSupervisor_status(bleachLayDownCheck.getSupervisor_status());
//
//				details.setSupervisor_saved_on(bleachLayDownCheck.getSupervisor_saved_on());
//				details.setSupervisor_saved_by(bleachLayDownCheck.getSupervisor_saved_by());
//				details.setSupervisor_saved_id(bleachLayDownCheck.getSupervisor_saved_id());
//
//				details.setSupervisor_submit_on(bleachLayDownCheck.getSupervisor_submit_on());
//				details.setSupervisor_submit_by(bleachLayDownCheck.getSupervisor_submit_by());
//				details.setSupervisor_submit_id(bleachLayDownCheck.getSupervisor_submit_id());
//
//				details.setHod_saved_on(bleachLayDownCheck.getHod_saved_on());
//				details.setHod_saved_by(bleachLayDownCheck.getHod_saved_by());
//				details.setHod_saved_id(bleachLayDownCheck.getHod_saved_id());
//
//				details.setHod_sign(userName);
//
//				details.setHod_status(AppConstants.hodApprovedStatus);
//				details.setMail_status(AppConstants.waitingStatus);
//
//				details.setHod_submit_by(userName);
//				details.setHod_submit_id(userId);
//				details.setHod_submit_on(date);
//
//				bleachLayDownCheckListF42Repository.save(details);
//
//				System.out.println("ROLE_HOD LOGIN");
//
////				return new ResponseEntity<>(new ApiResponse(true, "HOD Submitted Succesfully"), HttpStatus.OK);
//			}
			else
			{
				return new ResponseEntity(new ApiResponse(false, "User role not authorized to Submit Form"),
						HttpStatus.BAD_REQUEST);
			}

		}

		catch (Exception e) {

			log.error(
					"***************** Unable to Submit Lay Down Check List Details - F42!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Lay Down Check List Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getLaydownChechListById(Long id) {
		try {

			Optional<BleachLayDownCheckListF42> response = bleachLayDownCheckListF42Repository.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Lay Down Check List Details: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getAllLaydownChechList() {
		SCAUtil sca = new SCAUtil();

		try {

			List<BleachLayDownCheckListF42> listOfContRawCotton = bleachLayDownCheckListF42Repository.findAll();

			if (listOfContRawCotton == null) {

				listOfContRawCotton = new ArrayList<BleachLayDownCheckListF42>();
			}

			return new ResponseEntity(listOfContRawCotton, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Lay Down Check List Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Lay Down Check List Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}
	// GET BY TOKEN - SUPERVISOR SUMMARY

	public ResponseEntity<?> LaydownChechListSummary(HttpServletRequest http) {
		try {

			List<BleachLayDownCheckListF42> response = null;



			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

//			response = bleachLayDownCheckListF42Repository.LayDowndetailsSummary();
			
			if (role.equals("ROLE_SUPERVISOR")) {

				response = bleachLayDownCheckListF42Repository.LayDowndetailsSummary();

			} else if (role.equals("ROLE_HOD")||"ROLE_DESIGNEE".equals(role)) {
				response = bleachLayDownCheckListF42Repository.LayDowndetailsSummaryHOD();

			} else {
				return new ResponseEntity(new ApiResponse(false, role + " not Authorized to access this form !!!"), HttpStatus.BAD_REQUEST);
			}

			if (response == null) {

				response = new ArrayList<BleachLayDownCheckListF42>();
			}

			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Lay Down Chech List Details: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	// GET BY BMR

	public ResponseEntity<?> getLaydownChechListByBmr(String formatNo, String bmrNo, HttpServletRequest http) {
		try {

			List<BleachLayDownCheckListF42> response = null;

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);


			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

		

			if (role.equals("ROLE_SUPERVISOR")) {

				response = bleachLayDownCheckListF42Repository.findByLayDowndetailsByBMR(formatNo, bmrNo);

				System.out.println("SUPERVISOR LOGIN");

			} else if (role.equals("ROLE_HOD")||"ROLE_DESIGNEE".equals(role)) {

				response = bleachLayDownCheckListF42Repository.HODLayDowndetailsByBMR(formatNo, bmrNo);

				System.out.println("HOD LOGIN");

			}

			if (response == null) {

				response = new ArrayList<BleachLayDownCheckListF42>();
			}

			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Lay Down Chech List Details: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	// GET BY BMR NEW

	public ResponseEntity<?> getLaydownChechList(String formatNo, String bmrNo, String layDownNo,
			HttpServletRequest http) {
		try {

			List<BleachLayDownCheckListF42> response = null;



			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				response = bleachLayDownCheckListF42Repository.findByLayDowndetails(formatNo, bmrNo, layDownNo);

				System.out.println("SUPERVISOR LOGIN");

			} else if (role.equals("ROLE_HOD")||"ROLE_DESIGNEE".equals(role)) {


				response = bleachLayDownCheckListF42Repository.HODLayDowndetails(formatNo, bmrNo, layDownNo);

				System.out.println("HOD LOGIN");

			}

			if (response == null) {

				response = new ArrayList<BleachLayDownCheckListF42>();
			}

			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Lay Down Chech List Details: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}
	// GET BY LAYDOWN

	public ResponseEntity<?> getByLaydown(String layDownNo, HttpServletRequest http) {
		try {

			List<BleachLayDownCheckListF42> response = null;

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);


			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				response = bleachLayDownCheckListF42Repository.getLayDowndetails(layDownNo);

				System.out.println("SUPERVISOR LOGIN");

			} else if (role.equals("ROLE_HOD")||"ROLE_DESIGNEE".equals(role)) {

				response = bleachLayDownCheckListF42Repository.getLayDowndetailsHOD(layDownNo);

				System.out.println("HOD LOGIN");

			}

			if (response == null) {

				response = new ArrayList<BleachLayDownCheckListF42>();
			}

			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Lay Down Chech List Details: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> GetBaleNO() {
		SCAUtil sca = new SCAUtil();

		try {

			List<String> baleNo = bleachLayDownCheckListF42Repository.getBaleNo();

			List<IdAndValuePair> users = new ArrayList<>();

			Long id = (long) 1;

			for (String res : baleNo) {
				IdAndValuePair idAndValuePair = new IdAndValuePair();
				idAndValuePair.setId(id);
				idAndValuePair.setValue(res);
				users.add(idAndValuePair);
				id++;
			}

			if (baleNo == null) {

				baleNo = new ArrayList<String>();
			}

			return new ResponseEntity(users, HttpStatus.OK);

		} catch (Exception e) {

			log.error("***************** Unable to get List Of All Bale No!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, "Unable to get List Of All Bale No!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}
	// ***********************************MAIL// FUNTIONALITY*************************************************************//

	

	public void send_mail(String mailId, EmailSubject emailSubject, String text1, String subject) {

		String emailFrom = new String();
		List<String> emailTo = new ArrayList<String>();
		List<String> emailCC = new ArrayList<String>();
//String subject = "";

//EmailSubject emailSubject = null;
		String text = text1;

		emailTo.add(mailId);
//emailTo.add(new_manager_mail);
		String fromEmail = emailSubject.getUsername();

		emailFrom = fromEmail;

		emailSubject.init(emailFrom, emailTo, emailCC, null, subject, text);
		emailSubject.setHTML(true);

		SendMail sm = new SendMail();

		sm.sendMail(emailSubject);

	}

//mail approve

//@SuppressWarnings("unchecked")
//public ResponseEntity<?> approveLayDownCheckF42(BleachLayDownCheckListF42 details, HttpServletRequest http) {
//
////	BleachLayDownCheckListF42 bleachLayDown = new BleachLayDownCheckListF42();
//
//	Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
//
//	String userName = userRepository.getUserName(userId);
//
//	String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
//	
//	try {
//
//		if (role.equals("ROLE_SUPERVISOR")) {
//
//			Long id = details.getId();
//
//			String Status = bleachLayDownCheckListF42Repository.getStatus(id);
//
//			if (AppConstants.supervisorApprovedStatus.equals(Status)) {
//
//				return new ResponseEntity<>(new ApiResponse(true, "Supervisor Already Submitted"), HttpStatus.OK);
//
//			}
//			 // Get the current time
//	        LocalDateTime now = LocalDateTime.now();
//	        details.setMail_status(AppConstants.hodApprovedStatus);
//			details.setSupervisor_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
//			details.setSupervisor_submit_by(userName);
//			details.setSupervisor_submit_id(userId);
//			details.setSupervisor_sign(userName);
//			details.setHod_status(AppConstants.waitingStatus);
//
//			
//
//			bleachLayDownCheckListF42Repository.save(details);
//		}
//	
//} catch (Exception e) {
//	return new ResponseEntity<>("Error Approving Lay Down Chech List Details: " + e.getMessage(),
//			HttpStatus.BAD_REQUEST);
//}
//	return new ResponseEntity<>(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);
//}

	public ResponseEntity<?> getSummaryNew(HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
 
		List<BleachEquipmentUsageLogBookF33> listOfContRawCotton = null;
 
		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
 
		try {
 
			if (role.equals("ROLE_SUPERVISOR")) {
 
				List<BleachingWasteBaleResponseNew> response = new ArrayList<BleachingWasteBaleResponseNew>();
 
				List<BleachingWasteBaleResponseNew> getDetails = bleachEquipmentUsageLogBookF33Repository.getTblrejbale();
 
				List<String> mm = bleachEquipmentUsageLogBookF33Repository.status();
 
				for (BleachingWasteBaleResponseNew List : getDetails) {
 
					String date = List.getdate();
 
					Optional<String> matchingObject = mm.parallelStream().filter(p -> p.equals(date)).findFirst();
 
					if (!matchingObject.isPresent()) {
						response.add(List);
					}
				}
				return new ResponseEntity(response, HttpStatus.OK);
 
			} else if (role.equals("ROLE_HOD")) {
				listOfContRawCotton = bleachEquipmentUsageLogBookF33Repository.GetAllUniqueDateHOD();
				return new ResponseEntity(listOfContRawCotton, HttpStatus.OK);
			}
 
			if (listOfContRawCotton == null) {
 
				listOfContRawCotton = new ArrayList<BleachEquipmentUsageLogBookF33>();
			}
 
			return new ResponseEntity<>("No Records Found", HttpStatus.OK);
 
		} catch (Exception e) {
 
			log.error(
					"***************** Unable to get List Of All Equipment Usage Log Book Details!  *********************\n"
							+ e);
 
			String msg = sca.getErrorMessage(e);
 
			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Equipment Usage Log Book Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}
	
	
	public ResponseEntity<?> LayDownChecklist(String layDownNo) {
		 
		List<BleachLayDownCheckListF42> response = new ArrayList<>();
		try {
 
			response = bleachLayDownCheckListF42Repository.LayDownChecklist(layDownNo);
 
			if (response == null || response.isEmpty()) {
 
				return new ResponseEntity<>(
						new ApiResponse(false, "HOD not yet Approved for this laydown No" + layDownNo),
						HttpStatus.BAD_REQUEST);
			}
 
		}
 
		catch (Exception e) {
 
			log.error("***************** Unable to get Laydown Number:  *********************\n" + e);
 
			String msg = sca.getErrorMessage(e);
 
			return new ResponseEntity<>(new ApiResponse(false, "Unable to get Laydown Number:  " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
 
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
		// GET HOD APPROVED LAYDOWN
	
	public ResponseEntity<?> laydownCheckListHOD() {
			 
			List<String> response = new ArrayList<>();
			List<IdAndValuePair> laydoNResponse = new ArrayList<>();
			
			try {
	 
				response = bleachLayDownCheckListF42Repository.getLayDownNumberList();
	 
				Long id = (long) 1;
				
				for(String temp : response) {
					IdAndValuePair idAndValuePair = new IdAndValuePair();
					idAndValuePair.setId(id);
					idAndValuePair.setType(temp);
					idAndValuePair.setValue(temp);
					
					laydoNResponse.add(idAndValuePair);
					id++;
				}
				
			}
	 
			catch (Exception e) {
	 
				log.error("***************** Unable to get Laydown Number:  *********************\n" + e);
	 
	 
				return new ResponseEntity<>(new ApiResponse(false, "Unable to get Laydown Number:  " + e.getMessage()),
						HttpStatus.BAD_REQUEST);
			}
	 
			return new ResponseEntity<>(laydoNResponse, HttpStatus.OK);
	}
	
		// APPROVAL LOGIC FOR F42
	
	public ResponseEntity<?> approveLaydownCheckList(ApproveResponse approvalResponse, HttpServletRequest http) {
		
		BleachLayDownCheckListF42 bleachCheckListF42 = new BleachLayDownCheckListF42();
		
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			bleachCheckListF42 = bleachLayDownCheckListF42Repository.BleachLayDownById(approvalResponse.getId());
			
			BleachLayDownCheckListF42History bleachLayDownCheckListF42History = new BleachLayDownCheckListF42History();
			
			String supervisiorStatus = bleachCheckListF42.getSupervisor_status();
			
			String hodStatus = bleachCheckListF42.getHod_status();
			
			
			if(supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
				
				if(userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
					
					if(approvalResponse.getStatus().equals("Approve")) {
						
						bleachCheckListF42.setHod_status(AppConstants.hodApprovedStatus);
						bleachCheckListF42.setHod_submit_on(date);
						bleachCheckListF42.setHod_submit_by(userName);
						
						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachCheckListF42.setHod_signature_image(signature);
						
						bleachCheckListF42.setHod_sign(userName);
						
						bleachLayDownCheckListF42Repository.save(bleachCheckListF42);
						
						bleachLayDownCheckListF42History = bleachLayDownCheckListF42RepositoryHistory.fetchLastSubmittedRecordLaydown(bleachCheckListF42.getLayDownNo());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						
//						BeanUtils.copyProperties(bleachCheckListF42, bleachLayDownCheckListF42History);
//						
//						int version = bleachLayDownCheckListF42RepositoryHistory.getMaximumVersion(bleachLayDownCheckListF42History.getLayDownNo()).map(temp -> temp + 1).orElse(1);
//						bleachLayDownCheckListF42History.setVersion(version);
						
						bleachLayDownCheckListF42RepositoryHistory.save(bleachLayDownCheckListF42History);
						
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
						bleachCheckListF42.setHod_signature_image(signature);
						
						bleachCheckListF42.setHod_sign(userName);
						
						bleachLayDownCheckListF42Repository.save(bleachCheckListF42);
						
//						BeanUtils.copyProperties(bleachCheckListF42, bleachLayDownCheckListF42History);
//						
//						int version = bleachLayDownCheckListF42RepositoryHistory.getMaximumVersion(bleachLayDownCheckListF42History.getLayDownNo()).map(temp -> temp + 1).orElse(1);
//						bleachLayDownCheckListF42History.setVersion(version);
						
						bleachLayDownCheckListF42History = bleachLayDownCheckListF42RepositoryHistory.fetchLastSubmittedRecordLaydown(bleachCheckListF42.getLayDownNo());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						
						bleachLayDownCheckListF42RepositoryHistory.save(bleachLayDownCheckListF42History);
						
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
					new ApiResponse(false, "Failed to approve Laydown Checklist" + msg),
					HttpStatus.BAD_REQUEST);
			
			
		}
		
		
	}
	
	
		// LAYDOWN CHECKLIST - CUTTER TOOLS - CR SIGNOFF
	
	
	public ResponseEntity<?> getStrapCutterTools() {
		
		List<String> cutterStrapToolList = new ArrayList<String>();
		
		List<IdAndValuePair> cutterValueList = new ArrayList<IdAndValuePair>();
		
		try {
			
			cutterStrapToolList = bleachLayDownCheckListF42Repository.cutterStarpTools();
			
			Long id = (long) 1;
			
			for(String temp : cutterStrapToolList) {
				
				IdAndValuePair value = new IdAndValuePair();
				value.setValue(temp);
				value.setId(id);
				
				cutterValueList.add(value);
				
				id++;
			}
			
		}catch(Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get details of Strap cutter tools !!!"), HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(cutterStrapToolList, HttpStatus.OK);
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
