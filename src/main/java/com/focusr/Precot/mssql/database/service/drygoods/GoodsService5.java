package com.focusr.Precot.mssql.database.service.drygoods;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collector;
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

import com.focusr.Precot.mssql.database.model.drygoods.GoodsHandSanitationF06;
import com.focusr.Precot.mssql.database.model.drygoods.GoodsProductChangeOverF09;
import com.focusr.Precot.mssql.database.model.drygoods.GoodsSanitationListF06;
import com.focusr.Precot.mssql.database.model.drygoods.audit.GoodsHandSanitationHistoryF06;
import com.focusr.Precot.mssql.database.model.drygoods.audit.GoodsProductChangeOverHistoryF09;
import com.focusr.Precot.mssql.database.model.drygoods.audit.GoodsSanitationListHistoryF06;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.GoodsHandSanitationRepositoryF13;
import com.focusr.Precot.mssql.database.repository.drygoods.GoodsProductChangeRepositoryF09;
import com.focusr.Precot.mssql.database.repository.drygoods.GoodsSanitationListRepositoryF13;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.GoodsHandSanitationHistoryRepositoryF06;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.GoodsProductChangeOverRepositoryHistoryF09;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.GoodsSanitationListHistoryRepositoryF06;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.drygoods.DryGoodsMailFunction;

@Service
public class GoodsService5 {

	Logger logger = LoggerFactory.getLogger(GoodsService5.class);

	SCAUtil sca = new SCAUtil();

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private GoodsHandSanitationRepositoryF13 handSanitationRepository;

	@Autowired
	private GoodsSanitationListRepositoryF13 sanitationListRepository;

	@Autowired
	private GoodsHandSanitationHistoryRepositoryF06 handSanitationRepositoryHistory;

	@Autowired
	private GoodsSanitationListHistoryRepositoryF06 sanitationListHistoyRepository;

	@Autowired
	private GoodsProductChangeRepositoryF09 productChangeOverRepositoryF09;

	@Autowired
	private GoodsProductChangeOverRepositoryHistoryF09 productChangeOverRepositoryHistoryF09;
	
	@Autowired
	private DryGoodsMailFunction drygoodsmailfunction;

//	// SAVE HAND SANITATION REPORT
//	
//		@SuppressWarnings("null")
//		public ResponseEntity<?> saveHandSanitation(GoodsHandSanitationF06 productChangeOver, HttpServletRequest http) {
//			
//			GoodsHandSanitationF06 punchingExistingObj;
//			
//			try {
//				
//				String userRole = getUserRole();
//				Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//				String userName = userRepository.getUserName(userId);
//				LocalDateTime currentDate = LocalDateTime.now();
//				Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//				
//				Long id = productChangeOver.getHandSanitizationId();
//				
//				if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
//					
//					if(id != null) {
//						punchingExistingObj = handSanitationRepository.fetchHandSanitizationABPressF41ById(id);
//						
//						productChangeOver.setCreatedAt(punchingExistingObj.getCreatedAt());
//						productChangeOver.setCreatedBy(punchingExistingObj.getCreatedBy());
//						
//						List<GoodsSanitationListF06> sanitationListF24 = productChangeOver.getSanitizationList();
//						
//						if(sanitationListF24 != null || !sanitationListF24.isEmpty()) {
//							
//							for(GoodsSanitationListF06 punchSanitationList : sanitationListF24) {
//								
//								Long sanitationId = punchSanitationList.getId();
//								
//								if(sanitationId != null) {
//									GoodsSanitationListF06 existingSanitationObj = sanitationListRepository.getSanitationListById(sanitationId);
//									
//									punchSanitationList.setHandSanitizationId(existingSanitationObj.getHandSanitizationId());
//									punchSanitationList.setCreatedAt(existingSanitationObj.getCreatedAt());
//									punchSanitationList.setCreatedBy(existingSanitationObj.getCreatedBy());
//								}
//								
//								sanitationListRepository.save(punchSanitationList);
//							}
//							
//						}
//						
//					} 
//					
//					productChangeOver.setSupervisor_status(AppConstants.supervisorSave);
//					productChangeOver.setSupervisor_sign(userName);
//					productChangeOver.setSupervisor_save_id(userId);
//					productChangeOver.setSupervisor_save_on(date);
//					
//					handSanitationRepository.save(productChangeOver);
//					
//					List<GoodsSanitationListF06> sanitationListF24 = productChangeOver.getSanitizationList();
//					
//					for(GoodsSanitationListF06 punchSanitationList : sanitationListF24) {
//						
//						Long sanitationId = punchSanitationList.getId();
//						
//						if(sanitationId != null) {
//							GoodsSanitationListF06 existingSanitationObj = sanitationListRepository.getSanitationListById(sanitationId);
//							
//							punchSanitationList.setHandSanitizationId(existingSanitationObj.getHandSanitizationId());
//							punchSanitationList.setCreatedAt(existingSanitationObj.getCreatedAt());
//							punchSanitationList.setCreatedBy(existingSanitationObj.getCreatedBy());
//						}
//						
//						sanitationListRepository.save(punchSanitationList);
//					}
//					
//					
//				} else {
//					return new ResponseEntity(new ApiResponse(false, userRole + " not authroized to save hand sanitation form !!!"), HttpStatus.BAD_REQUEST);
//				}
//				
//				
//			} catch (Exception ex) {
//
//				String msg = ex.getMessage();
//				logger.error("Unable to Save hand sanitation form" + msg);
//				ex.printStackTrace();
//
//				return new ResponseEntity(new ApiResponse(false, "Failed to Save hand sanitation form" + msg),
//						HttpStatus.BAD_REQUEST);
//			}
//			
//			
//			return new ResponseEntity(productChangeOver, HttpStatus.OK);
//			
//		}
	
	// SAVE HAND SANITATION REPORT
			@SuppressWarnings("null")
			public ResponseEntity<?> saveHandSanitation(GoodsHandSanitationF06 productChangeOver, HttpServletRequest http) {
				GoodsHandSanitationF06 punchingExistingObj;
				try {
					String userRole = getUserRole();
					Long userId = sca.getUserIdFromRequest(http, tokenProvider);
					String userName = userRepository.getUserName(userId);
					LocalDateTime currentDate = LocalDateTime.now();
					Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
	 
					
					Long id = productChangeOver.getHandSanitizationId();
					if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
						if(id != null) {
							punchingExistingObj = handSanitationRepository.fetchHandSanitizationABPressF41ById(id);
							productChangeOver.setCreatedAt(punchingExistingObj.getCreatedAt());
							productChangeOver.setCreatedBy(punchingExistingObj.getCreatedBy());
							List<GoodsSanitationListF06> sanitationListF24 = productChangeOver.getSanitizationList();
//							if(sanitationListF24 != null || !sanitationListF24.isEmpty()) {
//								
//								for(GoodsSanitationListF06 punchSanitationList : sanitationListF24) {
//									
//									Long sanitationId = punchSanitationList.getId();
//									
//									if(sanitationId != null) {
//										GoodsSanitationListF06 existingSanitationObj = sanitationListRepository.getSanitationListById(sanitationId);
//										
//										
//										punchSanitationList.setCreatedAt(existingSanitationObj.getCreatedAt());
//										punchSanitationList.setCreatedBy(existingSanitationObj.getCreatedBy());
//									}
//									
//									sanitationListRepository.save(punchSanitationList);
//								}
//								
//							}
//							
						} 
						productChangeOver.setSupervisor_status(AppConstants.supervisorSave);
						productChangeOver.setSupervisor_sign(userName);
						productChangeOver.setSupervisor_save_id(userId);
						productChangeOver.setSupervisor_save_on(date);

						List<GoodsSanitationListF06> sanitationListF24 = productChangeOver.getSanitizationList();
						for(GoodsSanitationListF06 punchSanitationList : sanitationListF24) {
//							Long sanitationId = punchSanitationList.getId();
//							
//							if(sanitationId != null) {
//								GoodsSanitationListF06 existingSanitationObj = sanitationListRepository.getSanitationListById(sanitationId);
//								
//								
//								punchSanitationList.setCreatedAt(existingSanitationObj.getCreatedAt());
//								punchSanitationList.setCreatedBy(existingSanitationObj.getCreatedBy());
//							}
							punchSanitationList.setDetails(productChangeOver);
//							sanitationListRepository.save(punchSanitationList);
						}
						handSanitationRepository.save(productChangeOver);
					} else {
						return new ResponseEntity(new ApiResponse(false, userRole + " not authroized to save hand sanitation form !!!"), HttpStatus.BAD_REQUEST);
					}

				} catch (Exception ex) {
	 
					String msg = ex.getMessage();
					logger.error("Unable to Save hand sanitation form" + msg);
					ex.printStackTrace();
	 
					return new ResponseEntity(new ApiResponse(false, "Failed to Save hand sanitation form" + msg),
							HttpStatus.BAD_REQUEST);
				}

				return new ResponseEntity(productChangeOver, HttpStatus.OK);
			}
		
		
//		// SUBMIT HAND SANITATION REPORT
//		
//		public ResponseEntity<?> submitHandSanitationReport(GoodsHandSanitationF06 productChangeOver, HttpServletRequest http) {
//			
//			GoodsHandSanitationF06 punchingExistingObj;
//			
//			try {
//				
//				String userRole = getUserRole();
//				Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//				String userName = userRepository.getUserName(userId);
//				LocalDateTime currentDate = LocalDateTime.now();
//				Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//				
//				Long id = productChangeOver.getHandSanitizationId();
//				
//				if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
//					
//					if(id != null) {
//						punchingExistingObj = handSanitationRepository.fetchHandSanitizationABPressF41ById(id);
//						
//						productChangeOver.setCreatedAt(punchingExistingObj.getCreatedAt());
//						productChangeOver.setCreatedBy(punchingExistingObj.getCreatedBy());
//						
//						productChangeOver.setSupervisor_save_by(punchingExistingObj.getSupervisor_save_by());
//						productChangeOver.setSupervisor_save_id(punchingExistingObj.getSupervisor_save_id());
//						productChangeOver.setSupervisor_save_on(punchingExistingObj.getSupervisor_save_on());
//						
//						List<GoodsSanitationListF06> sanitationListF24s = productChangeOver.getSanitizationList();
//						
////						for(PunchingSanitationListF24 sanitationListpunch : sanitationListF24s) {
////							
////							Long sanitationId = sanitationListpunch.getId();
////							
////							if(sanitationId != null) {
////								PunchingSanitationListF24 existingSanitationObj = sanitationListRepository.getSanitationListById(sanitationId);
////								
////								sanitationListpunch.setHandSanitizationId(existingSanitationObj.getHandSanitizationId());
////								sanitationListpunch.setCreatedAt(existingSanitationObj.getCreatedAt());
////								sanitationListpunch.setCreatedBy(existingSanitationObj.getCreatedBy());
////							}
////							
////							sanitationListRepository.save(sanitationListpunch);
////							
////						}
//					} 
//					
//					productChangeOver.setSupervisor_status(AppConstants.supervisorApprovedStatus);
//					productChangeOver.setSupervisor_sign(userName);
//					productChangeOver.setSupervisor_submit_id(userId);
//					productChangeOver.setSupervisor_submit_by(userName);
//					productChangeOver.setSupervisor_submit_on(date);
//					
//					productChangeOver.setHod_status(AppConstants.waitingStatus);
//					
//					handSanitationRepository.save(productChangeOver);
//					
////					List<GoodsSanitationListF06> sanitationListF24s = productChangeOver.getSanitizationList();
//					
////					for(GoodsSanitationListF06 sanitationListpunch : sanitationListF24s) {
////						
////						Long sanitationId = sanitationListpunch.getId();
////						
////						System.out.println("Sanitation" + sanitationId);
////						
////						if(sanitationId != null) {
////							GoodsSanitationListF06 existingSanitationObj = sanitationListRepository.getSanitationListById(sanitationId);
////							
////							sanitationListpunch.setHandSanitizationId(existingSanitationObj.getHandSanitizationId());
////							sanitationListpunch.setCreatedAt(existingSanitationObj.getCreatedAt());
////							sanitationListpunch.setCreatedBy(existingSanitationObj.getCreatedBy());
////						}
////						
////						sanitationListRepository.save(sanitationListpunch);
////						
////					}
//					
////					List<GoodsSanitationListF06> sanitationListF24 = productChangeOver.getSanitizationList();
//					
////					for(GoodsSanitationListF06 punchSanitationList : sanitationListF24) {
////						
////						Long sanitationId = punchSanitationList.getId();
////						
//////						if(sanitationId != null) {
//////							GoodsSanitationListF06 existingSanitationObj = sanitationListRepository.getSanitationListById(sanitationId);
//////							
//////							punchSanitationList.setHandSanitizationId(productChangeOver.getHandSanitizationId());
//////							punchSanitationList.setCreatedAt(existingSanitationObj.getCreatedAt());
//////							punchSanitationList.setCreatedBy(existingSanitationObj.getCreatedBy());
//////						} else {
//////							punchSanitationList.setHandSanitizationId(productChangeOver.getHandSanitizationId());
//////						}
////						
////						punchSanitationList.setHandSanitizationId(productChangeOver.getHandSanitizationId());
////						
////						sanitationListRepository.save(punchSanitationList);
////						System.out.println("**** Ids are: " + punchSanitationList.getHandSanitizationId());
////					}
//					
//					List<GoodsSanitationListF06> sanitationListF24 = productChangeOver.getSanitizationList();
//
//					for (GoodsSanitationListF06 punchSanitationList : sanitationListF24) {
//						
//						System.out.println("***" + sanitationListF24.size());
//					    // Always set the HandSanitizationId from the parent entity
//					    punchSanitationList.setHandSanitizationId(productChangeOver.getHandSanitizationId());
//
//					    // Save the updated sanitation list entry
//					    sanitationListRepository.save(punchSanitationList);
//
//					    // Log the saved ID to verify it's correct
//					    System.out.println("**** Ids are: " + punchSanitationList.getId() + "****" + punchSanitationList.getHandSanitizationId());
//					}
//					
//					
//							// SAVE HISTORY 
//					
//					GoodsHandSanitationHistoryF06 productChangeOverHistoryF03 = new GoodsHandSanitationHistoryF06();
//					
//					productChangeOverHistoryF03.setUnit(productChangeOver.getUnit());
//					productChangeOverHistoryF03.setFormatName(productChangeOver.getFormatName());
//					productChangeOverHistoryF03.setFormatNo(productChangeOver.getFormatNo());
//					productChangeOverHistoryF03.setRevisionNo(productChangeOver.getRevisionNo());
//					productChangeOverHistoryF03.setSopNumber(productChangeOver.getSopNumber());
//					productChangeOverHistoryF03.setDate(productChangeOver.getDate());
//					productChangeOverHistoryF03.setShift(productChangeOver.getShift());
//					
//						// STATUS
//					productChangeOverHistoryF03.setSupervisor_status(productChangeOver.getSupervisor_status());
//					productChangeOverHistoryF03.setSupervisor_sign(productChangeOver.getSupervisor_sign());
//					productChangeOverHistoryF03.setSupervisor_submit_by(productChangeOver.getSupervisor_submit_by());
//					productChangeOverHistoryF03.setSupervisor_submit_id(productChangeOver.getSupervisor_submit_id());
//					productChangeOverHistoryF03.setSupervisor_submit_on(productChangeOver.getSupervisor_submit_on());
//					productChangeOverHistoryF03.setHod_status(productChangeOver.getHod_status());
//					
//						// SET VERSION BASED ON UNIQUE FIELDS
//					
//					String historyDate = productChangeOverHistoryF03.getDate();
//					String historyShift = productChangeOverHistoryF03.getShift();
//					
//					
//					int version = handSanitationRepositoryHistory.getMaximumVersion(historyDate, historyShift).map(temp -> temp + 1).orElse(1);
//					
//					System.out.println("Version" + version);
//					
//					productChangeOverHistoryF03.setVersion(version);
//					
//					handSanitationRepositoryHistory.save(productChangeOverHistoryF03);
//					
//					
//					for(GoodsSanitationListF06 sanitationListHistoryF24 : productChangeOver.getSanitizationList()) {
//						
//						GoodsSanitationListHistoryF06 history = new GoodsSanitationListHistoryF06();
//						
//						Long historyId = productChangeOverHistoryF03.getHandSanitizationId();
//						
////						Long sanitationId = sanitationListHistoryF24.getId();
//						
//						history.setHandSanitizationId(historyId);
//						history.setHour1(sanitationListHistoryF24.getHour1());
//						history.setHour2(sanitationListHistoryF24.getHour2());
//						history.setHour3(sanitationListHistoryF24.getHour3());
//						history.setHour4(sanitationListHistoryF24.getHour4());
//						history.setHour5(sanitationListHistoryF24.getHour5());
//						history.setHour6(sanitationListHistoryF24.getHour6());
//						history.setHour7(sanitationListHistoryF24.getHour7());
//						history.setHour8(sanitationListHistoryF24.getHour8());
//						history.setIdNumber(sanitationListHistoryF24.getIdNumber());
//						history.setRemarks(sanitationListHistoryF24.getRemarks());
//						history.setSerialNumber(sanitationListHistoryF24.getSerialNumber());
//						history.setName(sanitationListHistoryF24.getName());
//						
//						sanitationListHistoyRepository.save(history);
//						
//					}
//					
//							// SEND MAIL 
//					
//					try {
//	
//						drygoodsmailfunction.sendEmailToHodF010(productChangeOver);
//					} catch (Exception ex) {
//						return new ResponseEntity<>(new ApiResponse(false, "Unable to send mail to HOD! "),
//								HttpStatus.BAD_REQUEST);
//					}
//					
//					
//				} else {
//					return new ResponseEntity(new ApiResponse(false, userRole + " not authroized to Submit hand Sanitation form !!!"), HttpStatus.BAD_REQUEST);
//				}
//				
//				
//			} catch (Exception ex) {
//
//				String msg = ex.getMessage();
//				logger.error("Unable to Submit hand Sanitation form" + msg);
//				ex.printStackTrace();
//
//				return new ResponseEntity(new ApiResponse(false, "Failed to Submit hand Sanitation form" + msg),
//						HttpStatus.BAD_REQUEST);
//			}
//			
//			return new ResponseEntity(new ApiResponse(true,"Supervisior Submitted Successfully"), HttpStatus.OK);
//			
//		}
			
			// SUBMIT HAND SANITATION REPORT
			public ResponseEntity<?> submitHandSanitationReport(GoodsHandSanitationF06 productChangeOver, HttpServletRequest http) {
				GoodsHandSanitationF06 punchingExistingObj;
				try {
					String userRole = getUserRole();
					Long userId = sca.getUserIdFromRequest(http, tokenProvider);
					String userName = userRepository.getUserName(userId);
					LocalDateTime currentDate = LocalDateTime.now();
					Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
	 
					
					Long id = productChangeOver.getHandSanitizationId();
					if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
						if(id != null) {
							punchingExistingObj = handSanitationRepository.fetchHandSanitizationABPressF41ById(id);
							productChangeOver.setCreatedAt(punchingExistingObj.getCreatedAt());
							productChangeOver.setCreatedBy(punchingExistingObj.getCreatedBy());
							productChangeOver.setSupervisor_save_by(punchingExistingObj.getSupervisor_save_by());
							productChangeOver.setSupervisor_save_id(punchingExistingObj.getSupervisor_save_id());
							productChangeOver.setSupervisor_save_on(punchingExistingObj.getSupervisor_save_on());
							List<GoodsSanitationListF06> sanitationListF24s = productChangeOver.getSanitizationList();
//							for(PunchingSanitationListF24 sanitationListpunch : sanitationListF24s) {
//								
//								Long sanitationId = sanitationListpunch.getId();
//								
//								if(sanitationId != null) {
//									PunchingSanitationListF24 existingSanitationObj = sanitationListRepository.getSanitationListById(sanitationId);
//									
//									sanitationListpunch.setHandSanitizationId(existingSanitationObj.getHandSanitizationId());
//									sanitationListpunch.setCreatedAt(existingSanitationObj.getCreatedAt());
//									sanitationListpunch.setCreatedBy(existingSanitationObj.getCreatedBy());
//								}
//								
//								sanitationListRepository.save(sanitationListpunch);
//								
//							}
						} 
						productChangeOver.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						productChangeOver.setSupervisor_sign(userName);
						productChangeOver.setSupervisor_submit_id(userId);
						productChangeOver.setSupervisor_submit_by(userName);
						productChangeOver.setSupervisor_submit_on(date);
						productChangeOver.setHod_status(AppConstants.waitingStatus);

//						List<GoodsSanitationListF06> sanitationListF24s = productChangeOver.getSanitizationList();
//						for(GoodsSanitationListF06 sanitationListpunch : sanitationListF24s) {
//							
//							Long sanitationId = sanitationListpunch.getId();
//							
//							System.out.println("Sanitation" + sanitationId);
//							
//							if(sanitationId != null) {
//								GoodsSanitationListF06 existingSanitationObj = sanitationListRepository.getSanitationListById(sanitationId);
//								
//								sanitationListpunch.setHandSanitizationId(existingSanitationObj.getHandSanitizationId());
//								sanitationListpunch.setCreatedAt(existingSanitationObj.getCreatedAt());
//								sanitationListpunch.setCreatedBy(existingSanitationObj.getCreatedBy());
//							}
//							
//							sanitationListRepository.save(sanitationListpunch);
//							
//						}
//						List<GoodsSanitationListF06> sanitationListF24 = productChangeOver.getSanitizationList();
//						for(GoodsSanitationListF06 punchSanitationList : sanitationListF24) {
//							
//							Long sanitationId = punchSanitationList.getId();
//							
////							if(sanitationId != null) {
////								GoodsSanitationListF06 existingSanitationObj = sanitationListRepository.getSanitationListById(sanitationId);
////								
////								punchSanitationList.setHandSanitizationId(productChangeOver.getHandSanitizationId());
////								punchSanitationList.setCreatedAt(existingSanitationObj.getCreatedAt());
////								punchSanitationList.setCreatedBy(existingSanitationObj.getCreatedBy());
////							} else {
////								punchSanitationList.setHandSanitizationId(productChangeOver.getHandSanitizationId());
////							}
//							
//							punchSanitationList.setHandSanitizationId(productChangeOver.getHandSanitizationId());
//							
//							sanitationListRepository.save(punchSanitationList);
//							System.out.println("**** Ids are: " + punchSanitationList.getHandSanitizationId());
//						}
						List<GoodsSanitationListF06> sanitationListF24 = productChangeOver.getSanitizationList();
	 
						for (GoodsSanitationListF06 punchSanitationList : sanitationListF24) {
							System.out.println("***" + sanitationListF24.size());
						    // Always set the HandSanitizationId from the parent entity
//						    punchSanitationList.setHandSanitizationId(productChangeOver.getHandSanitizationId());
							punchSanitationList.setDetails(productChangeOver);
	 
						    // Save the updated sanitation list entry
//						    sanitationListRepository.save(punchSanitationList);
	 
						    // Log the saved ID to verify it's correct
						}
						handSanitationRepository.save(productChangeOver);

								// SAVE HISTORY 
						GoodsHandSanitationHistoryF06 productChangeOverHistoryF03 = new GoodsHandSanitationHistoryF06();
						productChangeOverHistoryF03.setUnit(productChangeOver.getUnit());
						productChangeOverHistoryF03.setFormatName(productChangeOver.getFormatName());
						productChangeOverHistoryF03.setFormatNo(productChangeOver.getFormatNo());
						productChangeOverHistoryF03.setRevisionNo(productChangeOver.getRevisionNo());
						productChangeOverHistoryF03.setSopNumber(productChangeOver.getSopNumber());
						productChangeOverHistoryF03.setDate(productChangeOver.getDate());
						productChangeOverHistoryF03.setShift(productChangeOver.getShift());
							// STATUS
						productChangeOverHistoryF03.setSupervisor_status(productChangeOver.getSupervisor_status());
						productChangeOverHistoryF03.setSupervisor_sign(productChangeOver.getSupervisor_sign());
						productChangeOverHistoryF03.setSupervisor_submit_by(productChangeOver.getSupervisor_submit_by());
						productChangeOverHistoryF03.setSupervisor_submit_id(productChangeOver.getSupervisor_submit_id());
						productChangeOverHistoryF03.setSupervisor_submit_on(productChangeOver.getSupervisor_submit_on());
						productChangeOverHistoryF03.setHod_status(productChangeOver.getHod_status());
							// SET VERSION BASED ON UNIQUE FIELDS
						String historyDate = productChangeOverHistoryF03.getDate();
						String historyShift = productChangeOverHistoryF03.getShift();

						int version = handSanitationRepositoryHistory.getMaximumVersion(historyDate, historyShift).map(temp -> temp + 1).orElse(1);
						System.out.println("Version" + version);
						productChangeOverHistoryF03.setVersion(version);
						handSanitationRepositoryHistory.save(productChangeOverHistoryF03);

						for(GoodsSanitationListF06 sanitationListHistoryF24 : productChangeOver.getSanitizationList()) {
							GoodsSanitationListHistoryF06 history = new GoodsSanitationListHistoryF06();
							Long historyId = productChangeOverHistoryF03.getHandSanitizationId();
//							Long sanitationId = sanitationListHistoryF24.getId();
							history.setHandSanitizationId(historyId);
							history.setHour1(sanitationListHistoryF24.getHour1());
							history.setHour2(sanitationListHistoryF24.getHour2());
							history.setHour3(sanitationListHistoryF24.getHour3());
							history.setHour4(sanitationListHistoryF24.getHour4());
							history.setHour5(sanitationListHistoryF24.getHour5());
							history.setHour6(sanitationListHistoryF24.getHour6());
							history.setHour7(sanitationListHistoryF24.getHour7());
							history.setHour8(sanitationListHistoryF24.getHour8());
							history.setIdNumber(sanitationListHistoryF24.getIdNumber());
							history.setRemarks(sanitationListHistoryF24.getRemarks());
							history.setSerialNumber(sanitationListHistoryF24.getSerialNumber());
							history.setName(sanitationListHistoryF24.getName());
							sanitationListHistoyRepository.save(history);
						}
								// SEND MAIL 
						try {
							drygoodsmailfunction.sendEmailToHodF010(productChangeOver);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Unable to send mail to HOD! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, userRole + " not authroized to Submit hand Sanitation form !!!"), HttpStatus.BAD_REQUEST);
					}

				} catch (Exception ex) {
	 
					String msg = ex.getMessage();
					logger.error("Unable to Submit hand Sanitation form" + msg);
					ex.printStackTrace();
	 
					return new ResponseEntity(new ApiResponse(false, "Failed to Submit hand Sanitation form" + msg),
							HttpStatus.BAD_REQUEST);
				}
				return new ResponseEntity(new ApiResponse(true,"Supervisior Submitted Successfully"), HttpStatus.OK);
			}
		
		// HAND SANITATION - PRINTING PARAMETERS
		
		public ResponseEntity<?> handSanitationPrint(String date, String shift) {
			
			List<GoodsHandSanitationF06> handSanitationList = new ArrayList<>();
			
			try {
				
				handSanitationList = handSanitationRepository.getHandSanitationPrint(date, shift);
				
			} catch(Exception ex) {
				String msg = ex.getMessage();
				ex.printStackTrace();
				logger.error("Unable to get hand Sanitation List" + msg);
				return new ResponseEntity(
						new ApiResponse(false, "Unable to get hand Sanitation List" + msg),
						HttpStatus.BAD_REQUEST);
			}
			
			return new ResponseEntity(handSanitationList, HttpStatus.OK);
			
		}
		
		
		public ResponseEntity<?> getHandSanitationByDateShift(String date, String shift) {
			
			GoodsHandSanitationF06 handSanitationF24;
			
			try {
				handSanitationF24 = handSanitationRepository.handSanitationDetailsByDate(date, shift);
			} catch(Exception e) {
				
				String msg = e.getMessage();
				e.printStackTrace();
				logger.error("Unable to get record" + msg);
				return new ResponseEntity(
						new ApiResponse(false, "Failed to get record" + msg),
						HttpStatus.BAD_REQUEST);
				
				
			}
			
			return new ResponseEntity(handSanitationF24, HttpStatus.OK);
		}
		
		
		public ResponseEntity<?> getHandSanitationSummary() {
			
			String userRole = getUserRole();
			
			List<GoodsHandSanitationF06> handSanitationF24s = new ArrayList<>();
			
			try {
				
				if(userRole.equals("ROLE_SUPERVISOR")) {
					
					
					handSanitationF24s = handSanitationRepository.getPunchingSupervisorSummary();
					
				} else if(userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {
					
					handSanitationF24s = handSanitationRepository.getPunchingHodSummary();
					
				} else {
					return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to access Hand Sanitation form"), HttpStatus.BAD_REQUEST);
				}
				
				return new ResponseEntity(handSanitationF24s, HttpStatus.OK);
			} catch(Exception ex) {
				String msg = ex.getMessage();
				ex.printStackTrace();
				logger.error("Unable to get summary record" + msg);
				return new ResponseEntity(
						new ApiResponse(false, "Failed to get summary record" + msg),
						HttpStatus.BAD_REQUEST);
			}
			
		}
		
		// APPROVE OR REJECT
		
		public ResponseEntity<?> approveOrRejectHandSanitation(ApproveResponse approveResponse, HttpServletRequest http) {
			
			SCAUtil sca = new SCAUtil();
			
			GoodsHandSanitationF06 bleachCheckListF42 = new GoodsHandSanitationF06();
			
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			
			try {
				
				bleachCheckListF42 = handSanitationRepository.fetchHandSanitizationABPressF41ById(approveResponse.getId());
				
				GoodsHandSanitationHistoryF06 bleachLayDownCheckListF42History = new GoodsHandSanitationHistoryF06();
				
				String supervisiorStatus = bleachCheckListF42.getSupervisor_status();
				
				String hodStatus = bleachCheckListF42.getHod_status();
				
				if(supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
					
					if(userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
						
						if(approveResponse.getStatus().equals("Approve")) {
							
							bleachCheckListF42.setHod_status(AppConstants.hodApprovedStatus);
							bleachCheckListF42.setHod_submit_on(date);
							bleachCheckListF42.setHod_submit_by(userName);
							bleachCheckListF42.setHod_submit_id(userId);
							
							bleachCheckListF42.setHod_sign(userName);
							
							handSanitationRepository.save(bleachCheckListF42);
							
//							bleachCheckListF42 = null;
							
							bleachLayDownCheckListF42History = handSanitationRepositoryHistory.findLastSubmittedRecord(bleachCheckListF42.getDate(), bleachCheckListF42.getShift());
							
							bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
							bleachLayDownCheckListF42History.setHod_submit_on(date);
							bleachLayDownCheckListF42History.setHod_submit_by(userName);
							bleachLayDownCheckListF42History.setHod_sign(userName);
							bleachLayDownCheckListF42History.setHod_submit_id(userId);
						
							
							handSanitationRepositoryHistory.save(bleachLayDownCheckListF42History);
							
//							bleachLayDownCheckListF42History = null;
							
							return new ResponseEntity<>(new ApiResponse(true, "Hod Approved Successfully"), HttpStatus.OK);
							
						}
						
						else if(approveResponse.getStatus().equals("Reject")) {
							
							String reason = approveResponse.getRemarks();
							bleachCheckListF42.setReason(reason);
							bleachCheckListF42.setHod_status(AppConstants.hodRejectedStatus);
							bleachCheckListF42.setHod_submit_on(date);
							bleachCheckListF42.setHod_submit_id(userId);
							bleachCheckListF42.setHod_submit_by(userName);
							
							bleachCheckListF42.setHod_sign(userName);
							
							handSanitationRepository.save(bleachCheckListF42);

//							bleachCheckListF42 = null;
							
							bleachLayDownCheckListF42History = handSanitationRepositoryHistory.findLastSubmittedRecord(bleachCheckListF42.getDate(), bleachCheckListF42.getShift());
							
							bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
							bleachLayDownCheckListF42History.setReason(reason);
							bleachLayDownCheckListF42History.setHod_submit_on(date);
							bleachLayDownCheckListF42History.setHod_submit_by(userName);
							bleachCheckListF42.setHod_submit_id(userId);
							bleachLayDownCheckListF42History.setHod_sign(userName);
							
							handSanitationRepositoryHistory.save(bleachLayDownCheckListF42History);
							
//							bleachLayDownCheckListF42History = null;
							
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
				logger.error("Unable to Approve Record" + msg);

				return new ResponseEntity(
						new ApiResponse(false, "Failed to approve/reject Hand Sanitation " + msg),
						HttpStatus.BAD_REQUEST);
				
				
			}
			
		}
		
		/**
		 * PRODUCT CHANGE OVER - F09
		 */
		
		public ResponseEntity<?> saveProductChangeOver(GoodsProductChangeOverF09 productChangeOver, HttpServletRequest http) {
			
			GoodsProductChangeOverF09 punchingExistingObj;
			
			try {
				
				String userRole = getUserRole();
				Long userId = sca.getUserIdFromRequest(http, tokenProvider);
				String userName = userRepository.getUserName(userId);
				LocalDateTime currentDate = LocalDateTime.now();
				Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

				
				Long id = productChangeOver.getProductId();
				
				if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
					
					if(id != null) {
						punchingExistingObj = productChangeOverRepositoryF09.productChangeoverDetailsById(id);
						
						productChangeOver.setCreatedAt(punchingExistingObj.getCreatedAt());
						productChangeOver.setCreatedBy(punchingExistingObj.getCreatedBy());
					} 
					
					productChangeOver.setSupervisor_status(AppConstants.supervisorSave);
					productChangeOver.setSupervisor_sign(userName);
					productChangeOver.setSupervisor_save_id(userId);
					productChangeOver.setSupervisor_save_on(date);
					
					productChangeOverRepositoryF09.save(productChangeOver);
					
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
		
		
		public ResponseEntity<?> submitProductChangeOver(GoodsProductChangeOverF09 productChangeOver, HttpServletRequest http) {
			
			GoodsProductChangeOverF09 punchingExistingObj;
			
			try {
				
				String userRole = getUserRole();
				Long userId = sca.getUserIdFromRequest(http, tokenProvider);
				String userName = userRepository.getUserName(userId);
				LocalDateTime currentDate = LocalDateTime.now();
				Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

				
				Long id = productChangeOver.getProductId();
				
				if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
					
					if(id != null) {
						punchingExistingObj = productChangeOverRepositoryF09.productChangeoverDetailsById(id);
						
						productChangeOver.setCreatedAt(punchingExistingObj.getCreatedAt());
						productChangeOver.setCreatedBy(punchingExistingObj.getCreatedBy());
						
						productChangeOver.setSupervisor_save_by(punchingExistingObj.getSupervisor_save_by());
						productChangeOver.setSupervisor_save_id(punchingExistingObj.getSupervisor_save_id());
						productChangeOver.setSupervisor_save_on(punchingExistingObj.getSupervisor_save_on());
					} 
					
					productChangeOver.setSupervisor_status(AppConstants.supervisorApprovedStatus);
					productChangeOver.setSupervisor_sign(userName);
					productChangeOver.setSupervisor_submit_id(userId);
					productChangeOver.setSupervisor_submit_by(userName);
					productChangeOver.setSupervisor_submit_on(date);
					
					productChangeOver.setHod_status(AppConstants.waitingStatus);
					productChangeOver.setQa_status("");
					
						// SAVE IMAGE
					
					productChangeOverRepositoryF09.save(productChangeOver);
					
							// SAVE HISTORY 
					
					GoodsProductChangeOverHistoryF09 productChangeOverHistoryF03 = new GoodsProductChangeOverHistoryF09();
					BeanUtils.copyProperties(productChangeOver, productChangeOverHistoryF03, "productId");
					
						// SET VERSION BASED ON UNIQUE FIELDS
					
					String historyDate = productChangeOverHistoryF03.getDate();
					String historyShift = productChangeOverHistoryF03.getSection();
					String historyMachine = productChangeOverHistoryF03.getMachineName();
					
					int version = productChangeOverRepositoryHistoryF09.getMaximumVersion(historyDate, historyShift, historyMachine).map(temp -> temp + 1).orElse(1);
					
					System.out.println("Version" + version);
					
					productChangeOverHistoryF03.setVersion(version);
					
					productChangeOverRepositoryHistoryF09.save(productChangeOverHistoryF03);
					
							// SEND MAIL 
					
					try {
	
						drygoodsmailfunction.sendEmailToHodF009(productChangeOver);
					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Unable to send mail to HOD! "),
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
			
			
			return new ResponseEntity(new ApiResponse(true, "Supervisior Submitted Successfully"), HttpStatus.OK);
			
		}
		
		public ResponseEntity<?> getProductDetailsbyUniquefIELD(String date, String shift, String machine) {
			
			GoodsProductChangeOverF09 punchingProductChangeOverF03;
			
			try {
				punchingProductChangeOverF03 = productChangeOverRepositoryF09.productChangeoverDetailsByDateMachineShift(date, shift, machine);
				
				if(punchingProductChangeOverF03 == null) {
					return new ResponseEntity(new ApiResponse(false, "No Records Found"),
							HttpStatus.BAD_REQUEST);
				}
				
			}  catch (Exception ex) {

				String msg = ex.getMessage();
				logger.error("Unable to Get Product Change over Details" + msg);
				ex.printStackTrace();

				return new ResponseEntity(new ApiResponse(false, "Failed to Get Product Change over Details" + msg),
						HttpStatus.BAD_REQUEST);
			}
			
			return new ResponseEntity(punchingProductChangeOverF03, HttpStatus.OK);
			
		}
		
			// GET UNIQUE BY ORDER
		
		public ResponseEntity<?> getProductDetailsbyUniqueOrder(String date,String orderNo, String machine) {
			
			List<GoodsProductChangeOverF09> punchingProductChangeOverF03;
			
			try {
				punchingProductChangeOverF03 = productChangeOverRepositoryF09.productChangeOverBYoRder(orderNo, date, machine);
				
				if(punchingProductChangeOverF03 == null) {
					return new ResponseEntity(new ApiResponse(false, "No Records Found"),
							HttpStatus.BAD_REQUEST);
				}
				
			}  catch (Exception ex) {

				String msg = ex.getMessage();
				logger.error("Unable to Get Product Change over Details" + msg);
				ex.printStackTrace();

				return new ResponseEntity(new ApiResponse(false, "Failed to Get Product Change over Details" + msg),
						HttpStatus.BAD_REQUEST);
			}
			
			return new ResponseEntity(punchingProductChangeOverF03, HttpStatus.OK);
			
		}
		
		
		
		public ResponseEntity<?> getSummaryRoles() {
			
			List<GoodsProductChangeOverF09> productChangeOverF03List = new ArrayList<>();
			
			try {
				String userRole = getUserRole();
				
				if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
					
					productChangeOverF03List = productChangeOverRepositoryF09.getPunchingSupervisorSummary();
					
				} else if(userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE") || userRole.equalsIgnoreCase("ROLE_QA"))  {
					productChangeOverF03List = productChangeOverRepositoryF09.getPunchingHodQASummary();
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
		
		public ResponseEntity<?> approveRejectProductChangeOver(ApproveResponse approveResponse, HttpServletRequest http) {
		    String userRole = getUserRole();
		    Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		    String userName = userRepository.getUserName(userId);
		    LocalDateTime currentDate = LocalDateTime.now();
		    Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		    try {
		        GoodsProductChangeOverF09 productChangeOverF03 = productChangeOverRepositoryF09.productChangeoverDetailsById(approveResponse.getId());

		        GoodsProductChangeOverHistoryF09 productChangeOverHistoryF03 = new GoodsProductChangeOverHistoryF09();

		        String supervisorStatus = productChangeOverF03.getSupervisor_status();
		        String hodStatus = productChangeOverF03.getHod_status();

		        if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

		            if (supervisorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

		                if (approveResponse.getStatus().equalsIgnoreCase("Approve")) {
		                    productChangeOverF03.setHod_status(AppConstants.hodApprovedStatus);
		                    productChangeOverF03.setHod_submit_by(userName);
		                    productChangeOverF03.setHod_submit_id(userId);
		                    productChangeOverF03.setHod_submit_on(date);
		                    productChangeOverF03.setQa_status(AppConstants.waitingStatus);

		         
		                    productChangeOverF03.setHod_sign(userName);

		                    productChangeOverRepositoryF09.save(productChangeOverF03);

		                    // HISTORY
		                    productChangeOverHistoryF03 = productChangeOverRepositoryHistoryF09.findLastSubmittedRecord(productChangeOverF03.getDate(), productChangeOverF03.getSection(), productChangeOverF03.getMachineName());
		                    productChangeOverHistoryF03.setHod_status(AppConstants.hodApprovedStatus);
		                    productChangeOverHistoryF03.setHod_submit_on(date);
		                    productChangeOverHistoryF03.setHod_submit_by(userName);
		                    productChangeOverHistoryF03.setHod_submit_id(userId);
		                    productChangeOverHistoryF03.setHod_sign(userName);

		                    productChangeOverRepositoryHistoryF09.save(productChangeOverHistoryF03);
		                    
		                    
			                 // SEND MAIL 
								
								try {
				
									drygoodsmailfunction.sendEmailQaF006(productChangeOverF03);
								} catch (Exception ex) {
									return new ResponseEntity<>(new ApiResponse(false, "Unable to send mail to HOD! "),
											HttpStatus.OK);
								}
							

		                    return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

		                } else if (approveResponse.getStatus().equalsIgnoreCase("Reject")) {
		                    productChangeOverF03.setHod_status(AppConstants.hodRejectedStatus);
		                    productChangeOverF03.setHod_submit_by(userName);
		                    productChangeOverF03.setHod_submit_id(userId);
		                    productChangeOverF03.setHod_submit_on(date);

		                    productChangeOverF03.setHod_sign(userName);
		                    
		                    productChangeOverF03.setReason(approveResponse.getRemarks());

		                    productChangeOverRepositoryF09.save(productChangeOverF03);

		                    // HISTORY
		                    productChangeOverHistoryF03 = productChangeOverRepositoryHistoryF09.findLastSubmittedRecord(productChangeOverF03.getDate(), productChangeOverF03.getSection(), productChangeOverF03.getMachineName());
		                    productChangeOverHistoryF03.setHod_status(AppConstants.hodRejectedStatus);
		                    productChangeOverHistoryF03.setHod_submit_on(date);
		                    productChangeOverHistoryF03.setHod_submit_by(userName);
		                    productChangeOverHistoryF03.setHod_submit_id(userId);
		                    productChangeOverHistoryF03.setHod_sign(userName);

		                    productChangeOverRepositoryHistoryF09.save(productChangeOverHistoryF03);

		                    return new ResponseEntity<>(new ApiResponse(true, "HOD Rejected Successfully"), HttpStatus.OK);
		                }

		            } else {
		                return new ResponseEntity<>(new ApiResponse(false, "please check Supervisor is Approved or not"), HttpStatus.BAD_REQUEST);
		            }

		        } else if (userRole.equalsIgnoreCase("ROLE_QA")) {

		            if (supervisorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.hodApprovedStatus) && productChangeOverF03.getQa_status().equalsIgnoreCase(AppConstants.waitingStatus)) {

		                if (approveResponse.getStatus().equalsIgnoreCase("Approve")) {
		                    productChangeOverF03.setQa_status(AppConstants.qaApprovedStatus);
		                    productChangeOverF03.setQa_submit_by(userName);
		                    productChangeOverF03.setQa_submit_id(userId);
		                    productChangeOverF03.setQa_submit_on(date);

		                    productChangeOverF03.setQa_sign(userName);

		                    productChangeOverRepositoryF09.save(productChangeOverF03);

		                    // HISTORY
		                    productChangeOverHistoryF03 = productChangeOverRepositoryHistoryF09.findLastSubmittedRecord(productChangeOverF03.getDate(), productChangeOverF03.getSection(), productChangeOverF03.getMachineName());
		                    productChangeOverHistoryF03.setQa_status(AppConstants.qaApprovedStatus);
		                    productChangeOverHistoryF03.setQa_submit_on(date);
		                    productChangeOverHistoryF03.setQa_submit_by(userName);
		                    productChangeOverHistoryF03.setQa_submit_id(userId);
		                    productChangeOverHistoryF03.setQa_sign(userName);

		                    productChangeOverHistoryF03.setReason(approveResponse.getRemarks());
		                    
		                    productChangeOverRepositoryHistoryF09.save(productChangeOverHistoryF03);
		               

		                    return new ResponseEntity<>(new ApiResponse(true, "QA Approved Successfully"), HttpStatus.OK);

		                } else if (approveResponse.getStatus().equalsIgnoreCase("Reject")) {
		                    productChangeOverF03.setQa_status(AppConstants.qaRejectedStatus);
		                    productChangeOverF03.setQa_submit_by(userName);
		                    productChangeOverF03.setQa_submit_id(userId);
		                    productChangeOverF03.setQa_submit_on(date);


		                    productChangeOverF03.setQa_sign(userName);

		                    productChangeOverF03.setReason(approveResponse.getRemarks());
		                    
		                    productChangeOverRepositoryF09.save(productChangeOverF03);

		                    // HISTORY
		                    productChangeOverHistoryF03 = productChangeOverRepositoryHistoryF09.findLastSubmittedRecord(productChangeOverF03.getDate(), productChangeOverF03.getSection(), productChangeOverF03.getMachineName());
		                    productChangeOverHistoryF03.setQa_status(AppConstants.qaRejectedStatus);
		                    productChangeOverHistoryF03.setQa_submit_on(date);
		                    productChangeOverHistoryF03.setQa_submit_by(userName);
		                    productChangeOverHistoryF03.setQa_submit_id(userId);
		                    productChangeOverHistoryF03.setQa_sign(userName);
		                    
		                    productChangeOverHistoryF03.setReason(approveResponse.getRemarks());

		                    productChangeOverRepositoryHistoryF09.save(productChangeOverHistoryF03);

		                    return new ResponseEntity<>(new ApiResponse(true, "QA Rejected Successfully"), HttpStatus.OK);
		                }

		            } else {
		                return new ResponseEntity<>(new ApiResponse(false, "please check Hod Approvals !!!"), HttpStatus.BAD_REQUEST);
		            }
		        } else {
		            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to approve form !!!"), HttpStatus.BAD_REQUEST);
		        }

		    } catch (Exception ex) {
		        String msg = ex.getMessage();
		        logger.error("Unable to Get Product Change over Summary Details" + msg);
		        ex.printStackTrace();

		        return new ResponseEntity<>(new ApiResponse(false, "Failed to Get Product Change over Summary Details: " + msg), HttpStatus.BAD_REQUEST);
		    }
		    
		    return null;
		}

		
			// FOR PRINT 
		public ResponseEntity<?> fetchPunchingPrintParameters(String date, String machine) {
			
			List<GoodsProductChangeOverF09> productChangeOverF03List = new ArrayList<>();
			
			try {
				
				System.out.println("Date" + date + "Machine" + machine);
				
				productChangeOverF03List = productChangeOverRepositoryF09.productChangeoverDetailsPrint(date, machine);
				
			} catch (Exception ex) {

				String msg = ex.getMessage();
				logger.error("Unable to Get Product Change over Summary Details" + msg);
				ex.printStackTrace();

				return new ResponseEntity(new ApiResponse(false, "Failed to Get Product Change over  Summary Details" + msg),
						HttpStatus.BAD_REQUEST);
			}
			
			return new ResponseEntity(productChangeOverF03List, HttpStatus.OK);
		}
		
//---------------------------------------------------------PDE---------------------------------------------------------------------------------
		public ResponseEntity<?> fetchMachineBasedDetails(String date, String shift, String machineName) {
		    List<Map<String, Object>> response = new ArrayList<>();

		    try {
		        List<Object[]> results = productChangeOverRepositoryF09.mechineBasedDetailsLogBook(date, shift, machineName);

		        for (Object[] result : results) {
		            Map<String, Object> rowMap = new HashMap<>();
		            rowMap.put("OrderNumber", result[0]);
		            rowMap.put("Material", result[1]);
		            rowMap.put("Bags", result[2]);
		            rowMap.put("OrderQty", result[3]);
		            rowMap.put("ProductionBalance", result[4]);
		            rowMap.put("Box", result[5]);
		            response.add(rowMap);
		        }

		    } catch (Exception ex) {
		        String msg = ex.getMessage();
		        logger.error("Unable to get Machine Details: " + msg);
		        return new ResponseEntity<>(new ApiResponse(false, "Failed to get Machine details: " + msg), HttpStatus.BAD_REQUEST);
		    }

		    return new ResponseEntity<>(response, HttpStatus.OK);
		}
	
		public ResponseEntity<?> fetchProductChangeOverDetails(String orderNo) {
		    List<Map<String, Object>> response = new ArrayList<>();

		    try {
		        List<Object[]> results = productChangeOverRepositoryF09.productChangeOverDetails(orderNo);

		        for (Object[] result : results) {
		            Map<String, Object> rowMap = new HashMap<>();
		            rowMap.put("SaleOrder", result[0]);
		            rowMap.put("SOItem", result[1]);
		            rowMap.put("POrder", result[2]);
		            rowMap.put("Qty", result[3]);
		            rowMap.put("Bags", result[4]);
		            rowMap.put("PONo", result[5]);
		            rowMap.put("Material", result[6]);
		            rowMap.put("ProdDesc", result[7]);
		            response.add(rowMap);
		        }

		    } catch (Exception ex) {
		        String msg = ex.getMessage();
		        logger.error("Unable to get Product Change Over Details: " + msg);
		        return new ResponseEntity<>(new ApiResponse(false, "Failed to get Product Change Over details: " + msg), HttpStatus.BAD_REQUEST);
		    }

		    return new ResponseEntity<>(response, HttpStatus.OK);
		}

//------------------------------------------------miniroll PDE F005--------------------------------------------------------------
		//Mini Roll
		
		public ResponseEntity<?> getMiniRoll(String date, String shift , String order) {
			try {
	
					
					List<Map<String, Object>> mapedOrders = productChangeOverRepositoryF09.getProductionMiniROll(date,  shift , order);
					
					
			
				return new ResponseEntity<>(mapedOrders, HttpStatus.OK);
//				return productChangeOverRepositoryF09.getProductionMiniROll(date,  shift);

			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace(); // Log the error for debugging
				throw e;
			}

		}
		
		public ResponseEntity<?> getOder(String date, String shift) {
			try {
				
				List<String> listodOrderNov= productChangeOverRepositoryF09.getORDERNO(date, shift);
				
				List<String> uniqueList  = listodOrderNov.stream().distinct().collect(Collectors.toList());
				
	
//				return jsonList;
				return new ResponseEntity<>(uniqueList, HttpStatus.OK);
//				return productChangeOverRepositoryF09.getProductionMiniROll(date,  shift);

			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace(); // Log the error for debugging
				throw e;
			}

		}


		
		public List<Map<String, Object>> getMiniRollStoppage(String date, String shift,String order_no) {
			try {

				return productChangeOverRepositoryF09.getProductionMiniROllStoppage(date,  shift,order_no);

			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace(); // Log the error for debugging
				throw e;
			}

		}
		
		//Sliver
		
		public ResponseEntity<?> getSliver() {
			
			List<Map<String, Object>> responseList = new ArrayList<>();
			
			try {
				
				responseList = productChangeOverRepositoryF09.getSliver();
				
			}catch (Exception ex) {
				String msg = ex.getMessage();
//				log.error("Error fetching Machine LOV : " + msg);
				return new ResponseEntity<>(
						new ApiResponse(false, "Failed to details."),
						HttpStatus.BAD_REQUEST);
			}
			
			return new ResponseEntity<>(responseList, HttpStatus.OK);
		}
		
		
		
		
		public List<Map<String, Object>> getSliverStoppage(String date, String shift,String machine_name) {
			try {
	 
				return productChangeOverRepositoryF09.getSliverStoppage(date,  shift,machine_name);
	 
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace(); // Log the error for debugging
				throw e;
			}
	 
		}
//---------------------------------------------------------------------------------------------------------------------------------------------//	
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
