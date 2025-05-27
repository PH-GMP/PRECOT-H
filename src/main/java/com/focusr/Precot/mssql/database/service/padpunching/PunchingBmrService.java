package com.focusr.Precot.mssql.database.service.padpunching;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;
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

import com.focusr.Precot.Buds.model.bmr.BudsBmrRework;
import com.focusr.Precot.Buds.repository.bmr.BudsBmrReworkRepository;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummary;
import com.focusr.Precot.mssql.database.model.drygoods.BMR03GoodsPackingMeterialIssue;
import com.focusr.Precot.mssql.database.model.drygoods.BMR03GoodsPackingMeterialIssueLine;
import com.focusr.Precot.mssql.database.model.padpunching.DailyProdPackingDetailsF004;
import com.focusr.Precot.mssql.database.model.padpunching.PunchingSanitationListF24;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrEnclosureList;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrEquipmentDetails;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrEquipmentDetailsLine;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrEquipmentSAP;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrManufacturingSteps;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrManufacturingStepsLine;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrPostProductionReview;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrProcessDeviationRecordHeader;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrProcessDeviationRecordLine;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrProductRelease;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrProductionDetails;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrQualityReleaseHeader;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrQualityReleaseLine;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrStoppageHeader;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrStoppageLine;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrVerificationOfRecords;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrVerificationOfRecordsLine;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachBmrLaydownMappingRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachBmrSummaryRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR03GoodsPackingMeterialIssueLineRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR03GoodsPackingMeterialIssueRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.bmr.PunchingBmrDeviationLineRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.bmr.PunchingBmrDeviationRecordHeaderRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.bmr.PunchingBmrEnclosureListRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.bmr.PunchingBmrEquipmentDetailsLineRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.bmr.PunchingBmrEquipmentDetailsRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.bmr.PunchingBmrEquipmentSAPRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.bmr.PunchingBmrManufacturingStepsLineRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.bmr.PunchingBmrManufacturingStepsRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.bmr.PunchingBmrPostProductionRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.bmr.PunchingBmrProductReleaseRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.bmr.PunchingBmrProductionDetailsRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.bmr.PunchingBmrQualityReleaseHeadRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.bmr.PunchingBmrStoppageHeadRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.bmr.PunchingBmrVerificationOfRecordsListRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.bmr.PunchingBmrVerificationOfRecordsRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.BleachingProductionDetailsResponse;
import com.focusr.Precot.payload.LovResponse;
import com.focusr.Precot.payload.padpunching.DailyProductionDetailsBmrResponse;
import com.focusr.Precot.payload.padpunching.DryGoodsTraceabilityResponse;
import com.focusr.Precot.payload.padpunching.PadPunchingBmrProdResponse;
import com.focusr.Precot.payload.padpunching.PadPunchingBmrRequest;
import com.focusr.Precot.payload.padpunching.PadPunchingMachineTraceResponse;
import com.focusr.Precot.payload.padpunching.PadPunchingMachineTraceabilityResponse;
import com.focusr.Precot.payload.padpunching.PadPunchingStoppageResponse;
import com.focusr.Precot.payload.padpunching.PadPunchingTraceSpulanceDataResponse;
import com.focusr.Precot.payload.padpunching.PadPunchingTraceabilityResponse;
import com.focusr.Precot.payload.padpunching.PunchingBmrProductionDetailsResponse;
import com.focusr.Precot.payload.padpunching.PunchingTraceabilityResponse;
import com.focusr.Precot.payload.spulance.SplBaleTraceResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.drygoods.AppConstantDryGoods;

@Service
public class PunchingBmrService {

	Logger logger = LoggerFactory.getLogger(PunchingBmrService.class);

	@Autowired
	private PunchingBmrProductReleaseRepository bmrProductReleaseRepository;

	@Autowired
	private PunchingBmrVerificationOfRecordsRepository verificationOfRecordsRepository;

	@Autowired
	private PunchingBmrVerificationOfRecordsListRepository verificationOfRecordListRepository;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PunchingBmrProductionDetailsRepository productionDetailsRepository;

	@Autowired
	private PunchingBmrPostProductionRepository postProductionRepository;

	@Autowired
	private PunchingBmrEquipmentDetailsRepository equipmentDetailsRepository;

	@Autowired
	private PunchingBmrEquipmentDetailsLineRepository equipmentDetailsLineRepository;

	@Autowired
	private PunchingBmrEnclosureListRepository enclosureListRepository;

	@Autowired
	private PunchingBmrQualityReleaseHeadRepository qualityReleaseHeadRepository;

	@Autowired
	private PunchingBmrDeviationRecordHeaderRepository deviationRecordHeaderRepository;

	@Autowired
	private PunchingBmrManufacturingStepsRepository manufacturingStepsRepository;

	@Autowired
	private PunchingBmrManufacturingStepsLineRepository manufacturingStepsLineRepository;

	@Autowired
	private PunchingBmrStoppageHeadRepository stoppageHeaderRepository;

	@Autowired
	private BleachBmrLaydownMappingRepository bleachBmrMappingRepository;

	@Autowired
	private BleachBmrSummaryRepository bmrSummaryRepository;
	
	@Autowired
	private BudsBmrReworkRepository reworkRepository;

	@Autowired
	private BMR03GoodsPackingMeterialIssueRepository bmr03goodspackingmeterialissuerepository;

	@Autowired
	private BMR03GoodsPackingMeterialIssueLineRepository bmr03goodspackingmeterialissuelinerepository;
	
	@Autowired
	private PunchingBmrEquipmentSAPRepository equipmentSAPRepository;
	

	public ResponseEntity<?> saveProductRelease(PunchingBmrProductRelease productRelease, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			Long id = productRelease.getProductId();

			if (userRole.equals("ROLE_QA")) {

				if (id != null) {

					PunchingBmrProductRelease productRelease2 = bmrProductReleaseRepository.productReleaseById(id);
					productRelease.setCreatedAt(productRelease2.getCreatedAt());
					productRelease.setCreatedBy(productRelease2.getCreatedBy());
				}

				if (productRelease.getCheckerStatus() == null || "".equals(productRelease.getCheckerStatus())) {
					productRelease.setCheckedBy(productRelease.getCheckedBy());
					productRelease.setCheckerStatus("SAVED");
					productRelease.setCheckedOn(productRelease.getCheckedOn());
				} else if (productRelease.getCheckerStatus().equals("SAVED")) {

					logger.info("**** !!! ");

					productRelease.setAppoverStatus("APPROVED");
					productRelease.setApprovedOn(productRelease.getApprovedOn());
					productRelease.setApprovedBy(productRelease.getApprovedBy());
				}

				bmrProductReleaseRepository.save(productRelease);

			} else {
				return new ResponseEntity(new ApiResponse(false, userRole + " not authorize to submit product release"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit Bmr Product Release form" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit Bmr Product Release form" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(
				new ApiResponse(true, "Product Release " + productRelease.getCheckerStatus() + " Successfully"),
				HttpStatus.OK);

	}

	// GET PRODUCT RELEASE BY ORDER
	public ResponseEntity<?> getProductReleaseByOrder(String order) {

		String userRole = getUserRole();
		PunchingBmrProductRelease productRelease = new PunchingBmrProductRelease();

		try {
//			if (userRole.equals("ROLE_QA")) {
			
				productRelease = bmrProductReleaseRepository.productReleaseByOrder(order);
//			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get product release form" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to get product release form" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(productRelease, HttpStatus.OK);

	}

	// GET PRODUCT RELEASE BY BATCH
	public ResponseEntity<?> getProductReleaseByBatch(String batchNo) {

		String userRole = getUserRole();
		PunchingBmrProductRelease productRelease = new PunchingBmrProductRelease();

		try {
			if (userRole.equals("ROLE_QA")) {
				productRelease = bmrProductReleaseRepository.productReleaseByBatchNo(batchNo);
			} else {
				return new ResponseEntity(new ApiResponse(false, userRole + " not authorize to get product release"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get product release form" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to get product release form" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(productRelease, HttpStatus.OK);

	}

	// SAVE VERIFICATION OF RECORDS

	public ResponseEntity<?> saveVerificationOfRecords(PunchingBmrVerificationOfRecords verificationRecords,
			HttpServletRequest http) {

		Long id = verificationRecords.getVerificationId();

		SCAUtil sca = new SCAUtil();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		String value = "";

		try {

			if (userRole.equals("ROLE_SUPERVISOR")) {

				if (id != null) {
					PunchingBmrVerificationOfRecords bmrVerificationRecords = verificationOfRecordsRepository
							.getVerificationOfRecordsById(id);
					verificationRecords.setCreatedAt(bmrVerificationRecords.getCreatedAt());
					verificationRecords.setCreatedBy(bmrVerificationRecords.getCreatedBy());

//					List<PunchingBmrVerificationOfRecordsLine> sanitationListF24 = bmrVerificationRecords.getDetails();
//					
//					if(sanitationListF24 != null || !sanitationListF24.isEmpty()) {
//						
//						for(PunchingBmrVerificationOfRecordsLine punchSanitationList : sanitationListF24) {
//							
//							Long sanitationId = punchSanitationList.getLineId();
//							
//							if(sanitationId != null) {
//								PunchingBmrVerificationOfRecordsLine existingSanitationObj = verificationOfRecordListRepository.findById(sanitationId).orElse(null);
//								
//								punchSanitationList.setVerificationId(existingSanitationObj.getVerificationId());
//								punchSanitationList.setCreatedAt(existingSanitationObj.getCreatedAt());
//								punchSanitationList.setCreatedBy(existingSanitationObj.getCreatedBy());
//								
//							}
//							
//							verificationOfRecordListRepository.save(punchSanitationList);
//						}
//						
//					}

				}

				verificationRecords.setSupervisor_save_by(userName);
				verificationRecords.setSupervisor_save_id(userId);
				verificationRecords.setSupervisor_save_on(date);
				verificationRecords.setSupervisor_status(AppConstants.supervisorSave);

				verificationOfRecordsRepository.save(verificationRecords);

//				for(PunchingBmrVerificationOfRecordsLine line : verificationRecords.getDetails()) {
//					
//					Long line_id = line.getLineId();
//					Long verification_id = verificationRecords.getVerificationId();
//					
//					if (line_id != null) {
//	                    // Check if the line already exists in the database
//	                    PunchingBmrVerificationOfRecordsLine existingLine = verificationOfRecordListRepository.findById(line_id).orElse(null);
//	                    if (existingLine != null) {
//	                        line = existingLine;
//	                    }
//	                }
//					
////					if(line_id != null) {
////						line.setVerificationId(verification_id);
////					} else {
////						line.setVerificationId(verification_id);
////					}
//					line.setVerificationId(verification_id);
//					
//					line.setChecked_name(line.getChecked_name());
//					Long lineUserId = userRepository.getUsernameByUserId(line.getChecked_name());
//					line.setChecked_id(lineUserId);
//					line.setChecked_status(AppConstants.supervisorSave);
//					line.setChecked_date(date);
//					
//					verificationOfRecordListRepository.save(line);
//					
//				}

				for (PunchingBmrVerificationOfRecordsLine line : verificationRecords.getDetails()) {

					System.out.println("Verification of Records size ***" + verificationRecords.getDetails().size());

					line.setChecked_name(line.getChecked_name());
					Long lineUserId = userRepository.getUsernameByUserId(line.getChecked_name());
					line.setChecked_id(lineUserId);
					line.setChecked_status(AppConstants.supervisorSave);
					line.setChecked_date(date);

					verificationOfRecordListRepository.save(line);

				}

			} else if (userRole.equals("ROLE_QA")) {

				if (verificationRecords.getSupervisor_status().equals(AppConstants.supervisorSave)) {

					verificationRecords.setQa_status(AppConstants.qaSave);
					verificationRecords.setQa_submit_by(userName);
					verificationRecords.setQa_submit_id(userId);

					for (PunchingBmrVerificationOfRecordsLine line : verificationRecords.getDetails()) {

						Long line_id = line.getLineId();
						Long verification_id = verificationRecords.getVerificationId();

//						if(line_id != null) {
//							line.setVerificationId(verification_id);
//						} else {
//							line.setVerificationId(verification_id);
//						}

						line.setVerified_name(line.getVerified_name());
						Long lineUserId = userRepository.getUsernameByUserId(line.getVerified_name());
						line.setVerified_id(lineUserId);
						line.setVerified_status(AppConstants.qaSave);
						line.setVerified_date(date);

						verificationOfRecordListRepository.save(line);

					}

				}

			}

			else {
				return new ResponseEntity(
						new ApiResponse(false, userRole + " not authorized to save verification of records"),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity(verificationRecords, HttpStatus.OK);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save Verification of Records form" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Save Verification of Records form" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}
//	

	public ResponseEntity<?> saveVerificationOfRecords1(PunchingBmrVerificationOfRecords verificationRecords,
			HttpServletRequest http) {
		Long id = verificationRecords.getVerificationId();

		SCAUtil sca = new SCAUtil();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			if (userRole.equals("ROLE_SUPERVISOR")) {
				if (id != null) {
					PunchingBmrVerificationOfRecords existingVerification = verificationOfRecordsRepository
							.getVerificationOfRecordsById(id);
					verificationRecords.setCreatedAt(existingVerification.getCreatedAt());
					verificationRecords.setCreatedBy(existingVerification.getCreatedBy());
				}

				verificationRecords.setSupervisor_save_by(userName);
				verificationRecords.setSupervisor_save_id(userId);
				verificationRecords.setSupervisor_save_on(verificationRecords.getSupervisor_save_on());
				verificationRecords.setSupervisor_status(AppConstants.supervisorSave);

				// Save the main verification record first

				// Handle details, ensuring no duplication
//	            for (PunchingBmrVerificationOfRecordsLine line : verificationRecords.getDetails()) {
//	                Long lineId = line.getLineId();
//
//	                if (lineId != null) {
//	                    // Fetch the existing line by ID and update
//	                    PunchingBmrVerificationOfRecordsLine existingLine = verificationOfRecordListRepository.findById(lineId).orElse(null);
//	                    if (existingLine != null) {
//	                        existingLine.setChecked_name(line.getChecked_name());
//	                        Long lineUserId = userRepository.getUsernameByUserId(line.getChecked_name());
//	                        existingLine.setChecked_id(lineUserId);
//	                        existingLine.setChecked_status(AppConstants.supervisorSave);
//	                        existingLine.setChecked_date(date);
//	                        verificationOfRecordListRepository.save(existingLine);
//	                    }
//	                } else {
//	                    // This is a new line; create and save it
////	                    line.setVerificationId(verificationRecords.getVerificationId());
//	                    Long lineUserId = userRepository.getUsernameByUserId(line.getChecked_name());
//	                    line.setChecked_id(lineUserId);
//	                    line.setChecked_status(AppConstants.supervisorSave);
//	                    line.setChecked_date(date);
//	                    verificationOfRecordListRepository.save(line);
//	                }
//	            }

				for (PunchingBmrVerificationOfRecordsLine line : verificationRecords.getDetails()) {

					line.setVerificationRecord(verificationRecords);
					line.setChecked_name(line.getChecked_name());
					line.setChecked_status(AppConstants.supervisorSave);
					Long lineUserId = userRepository.getUsernameByUserId(line.getChecked_name());
					line.setChecked_id(lineUserId);
					line.setChecked_date(line.getChecked_date());
				}

				verificationOfRecordsRepository.save(verificationRecords);

			} else if (userRole.equals("ROLE_QA")) {
				if (verificationRecords.getSupervisor_status().equals(AppConstants.supervisorSave)) {
					verificationRecords.setQa_status(AppConstants.qaSave);
					verificationRecords.setQa_submit_by(userName);
					verificationRecords.setQa_submit_id(userId);

//	                for (PunchingBmrVerificationOfRecordsLine line : verificationRecords.getDetails()) {
//	                    Long lineId = line.getLineId();
//
//	                    if (lineId != null) {
//	                        PunchingBmrVerificationOfRecordsLine existingLine = verificationOfRecordListRepository.findById(lineId).orElse(null);
//	                        if (existingLine != null) {
//	                            existingLine.setVerified_name(line.getVerified_name());
//	                            Long lineUserId = userRepository.getUsernameByUserId(line.getVerified_name());
//	                            existingLine.setVerified_id(lineUserId);
//	                            existingLine.setVerified_status(AppConstants.qaSave);
//	                            existingLine.setVerified_date(date);
//	                            verificationOfRecordListRepository.save(existingLine);
//	                        }
//	                    } else {
//	                        line.setVerificationId(verificationRecords.getVerificationId());
//	                        Long lineUserId = userRepository.getUsernameByUserId(line.getVerified_name());
//	                        line.setVerified_id(lineUserId);
//	                        line.setVerified_status(AppConstants.qaSave);
//	                        line.setVerified_date(date);
//	                        verificationOfRecordListRepository.save(line);
//	                    }
//	                }

					for (PunchingBmrVerificationOfRecordsLine line : verificationRecords.getDetails()) {

						line.setVerificationRecord(verificationRecords);
						line.setVerified_name(line.getVerified_name());
						line.setVerified_status(AppConstants.qaSave);
						Long lineUserId = userRepository.getUsernameByUserId(line.getVerified_name());
						line.setVerified_id(lineUserId);
						line.setVerified_date(date);
					}

					verificationOfRecordsRepository.save(verificationRecords);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, "supervisor not yet Save verification of records"),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				return new ResponseEntity(
						new ApiResponse(false, userRole + " not authorized to save verification of records"),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(verificationRecords, HttpStatus.OK);

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to Save Verification of Records form: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to Save Verification of Records form: " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// SUBMIT VERIFICATION OF RECORDS

//		public ResponseEntity<?> submitVerificationOfRecords(PunchingBmrVerificationOfRecords verificationRecords, HttpServletRequest http) {
//
//		    Long id = verificationRecords.getVerificationId();
//
//		    SCAUtil sca = new SCAUtil();
//
//		    String userRole = getUserRole();
//		    Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//		    String userName = userRepository.getUserName(userId);
//		    LocalDateTime currentDate = LocalDateTime.now();
//		    Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//		    try {
//		        if (userRole.equals("ROLE_SUPERVISOR")) {
//		            if (id != null) {
//		                PunchingBmrVerificationOfRecords existingVerification = verificationOfRecordsRepository.getVerificationOfRecordsById(id);
//		                verificationRecords.setCreatedAt(existingVerification.getCreatedAt());
//		                verificationRecords.setCreatedBy(existingVerification.getCreatedBy());
//		            }
//
//		            verificationRecords.setSupervisor_save_by(userName);
//		            verificationRecords.setSupervisor_save_id(userId);
//		            verificationRecords.setSupervisor_save_on(date);
//		            verificationRecords.setSupervisor_status(AppConstants.supervisorApprovedStatus);
//
//		        
//		            
//		            for(PunchingBmrVerificationOfRecordsLine line : verificationRecords.getDetails()) {
//		            	
//		            	line.setVerificationRecord(verificationRecords);
//		            	line.setChecked_name(line.getChecked_name());
//		            	line.setChecked_status(AppConstants.supervisorApprovedStatus);
//		            	Long lineUserId = userRepository.getUsernameByUserId(line.getChecked_name());
//		            	line.setChecked_id(lineUserId);
//		            	line.setChecked_date(date);
//		            }
//		            
//		            verificationOfRecordsRepository.save(verificationRecords);
//
//		        } else if (userRole.equals("ROLE_QA")) {
//		            if (verificationRecords.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)) {
//		                verificationRecords.setQa_status(AppConstants.qaApprovedStatus);
//		                verificationRecords.setQa_submit_by(userName);
//		                verificationRecords.setQa_submit_id(userId);
//
////		                
//		                for(PunchingBmrVerificationOfRecordsLine line : verificationRecords.getDetails()) {
//			            	
//			            	line.setVerificationRecord(verificationRecords);
//			            	line.setVerified_name(line.getVerified_name());
//			            	line.setVerified_status(AppConstants.qaApprovedStatus);
//			            	Long lineUserId = userRepository.getUsernameByUserId(line.getVerified_name());
//			            	line.setVerified_id(lineUserId);
//			            	line.setVerified_date(date);
//			            }
//		                
//		                verificationOfRecordsRepository.save(verificationRecords);
//		            }
//		            
//		            else {
//		            	return new ResponseEntity(new ApiResponse(false,  "supervisor not yet Submit verification of records"), HttpStatus.BAD_REQUEST);
//		            }
//		            
//		        } else {
//		            return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to Submit verification of records"), HttpStatus.BAD_REQUEST);
//		        }
//
//		        return new ResponseEntity<>(new ApiResponse(true, "Verification of Records Submitted Successfully"), HttpStatus.OK);
//
//		    } catch (Exception ex) {
//		        String msg = ex.getMessage();
//		        logger.error("Unable to Submit Verification of Records form: " + msg);
//		        ex.printStackTrace();
//
//		        return new ResponseEntity<>(new ApiResponse(false, "Failed to Submit Verification of Records form: " + msg), HttpStatus.BAD_REQUEST);
//		    }
//		
//		}

	// SUBMIT VERIFICATION OF RECORDS
	public ResponseEntity<?> submitVerificationOfRecords(PunchingBmrVerificationOfRecords verificationRecords,
			HttpServletRequest http) {

		Long id = verificationRecords.getVerificationId();

		SCAUtil sca = new SCAUtil();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			if (userRole.equals("ROLE_SUPERVISOR")) {
				if (id != null) {
					PunchingBmrVerificationOfRecords existingVerification = verificationOfRecordsRepository
							.getVerificationOfRecordsById(id);
					verificationRecords.setCreatedAt(existingVerification.getCreatedAt());
					verificationRecords.setCreatedBy(existingVerification.getCreatedBy());
				}

				verificationRecords.setSupervisor_save_by(userName);
				verificationRecords.setSupervisor_save_id(userId);
				verificationRecords.setSupervisor_save_on(verificationRecords.getSupervisor_save_on());
				verificationRecords.setSupervisor_status(AppConstants.supervisorApprovedStatus);

				for (PunchingBmrVerificationOfRecordsLine line : verificationRecords.getDetails()) {
					line.setVerificationRecord(verificationRecords);
					line.setChecked_name(line.getChecked_name());
					line.setChecked_status(AppConstants.supervisorApprovedStatus);
					Long lineUserId = userRepository.getUsernameByUserId(line.getChecked_name());
					line.setChecked_id(lineUserId);
					line.setChecked_date(date);
				}
				verificationOfRecordsRepository.save(verificationRecords);

			} else if (userRole.equals("ROLE_QA")) {
				if (verificationRecords.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)) {
					verificationRecords.setQa_status(AppConstants.qaApprovedStatus);
					verificationRecords.setQa_submit_by(userName);
					verificationRecords.setQa_submit_id(userId);

//			                
					for (PunchingBmrVerificationOfRecordsLine line : verificationRecords.getDetails()) {
						line.setVerificationRecord(verificationRecords);
						line.setVerified_name(line.getVerified_name());
						line.setVerified_status(AppConstants.qaApprovedStatus);
						Long lineUserId = userRepository.getUsernameByUserId(line.getVerified_name());
						line.setVerified_id(lineUserId);
						line.setVerified_date(date);
					}
					verificationOfRecordsRepository.save(verificationRecords);
				} else {
					return new ResponseEntity(
							new ApiResponse(false, "supervisor not yet Submit verification of records"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity(
						new ApiResponse(false, userRole + " not authorized to Submit verification of records"),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(new ApiResponse(true, "Verification of Records Submitted Successfully"),
					HttpStatus.OK);

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to Submit Verification of Records form: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to Submit Verification of Records form: " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// GET VERIFICATION OF RECORDS

	public ResponseEntity<?> getVerificationOfRecords(String order) {

		List<PunchingBmrVerificationOfRecords> verificationRecordList = new ArrayList<>();

		try {

			verificationRecordList = verificationOfRecordsRepository.getVerificationOfRecordsByBatch(order);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Get Verification of Records form" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Get Verification of Records form" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(verificationRecordList, HttpStatus.OK);

	}

	// SAVE PRODUCTION DETAILS

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> saveProductionDetails(PunchingBmrProductionDetails productionDetails,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			if (userRole.equals("ROLE_SUPERVISOR") || userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				productionDetails.setSupervisiorStatus(AppConstants.supervisorSave);
				productionDetails.setSupervisiorName(productionDetails.getSupervisiorName());

				Long id1 = userRepository.getUsernameByUserId(productionDetails.getSupervisiorName());
				productionDetails.setSupervisiorId(id1);
				productionDetails.setSupervisiorDate(date);

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

	// SUBMIT PRODUCTION DETAILS

	public ResponseEntity<?> submitProductionDetails(PunchingBmrProductionDetails productionDetails,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

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
				int updateBatch = productionDetailsRepository.updateBatchNoByOrderNoAndMachineName(
						productionDetails.getBatchNo(), productionDetails.getOrderNumber(),
						productionDetails.getMachine());

				if (updateBatch > 0) {
					logger.info("**** !!! UPDATE BATCH !!! ****" + updateBatch);
				} else {
					logger.info("**** CLOSING *** ");
				}
			} else if (userRole.equals("ROLE_QA")) {

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

	// GET PRODUCTION DETAILS

	public ResponseEntity<?> getProductionDetails(String batchNo) {

		List<PunchingBmrProductionDetails> productionDetailsList = new ArrayList<>();

		try {

			productionDetailsList = productionDetailsRepository.productionDetailsByOrder(batchNo);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Get Production Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Get Production Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(productionDetailsList, HttpStatus.OK);
	}
	
	
		// FETCH PRODUCTION DETAILS BY BATCH NUMBER
	
	
	public ResponseEntity<?> fetchProductionDetailsByBatchNumber(String batchNumber) {
		
		List<PadPunchingBmrProdResponse> productionDetailsList = new ArrayList<PadPunchingBmrProdResponse>();
		
		Map<String, Object> productionDetailsMap = new HashMap();
		
		try {
			
			productionDetailsMap = productionDetailsRepository.productionDetailsByNumber(batchNumber);
			
			String orderNumber = (String) productionDetailsMap.get("orderNumber");
			String batchNo = (String) productionDetailsMap.get("batchNumber");
			String product = (String) productionDetailsMap.get("product");
			Integer quantity = (Integer) productionDetailsMap.get("quantity");
			
			String edge = productionDetailsRepository.edgeByOrder(orderNumber);
			
			PadPunchingBmrProdResponse response = new PadPunchingBmrProdResponse();
			
			response.setBatchNumber(batchNumber);
			response.setOrderNumber(orderNumber);
			response.setProduct(product);
			response.setEdge(edge);
			response.setQuantity(quantity);
			
			productionDetailsList.add(response);
			
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Get Batch Number Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Get Batch number Details" + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(productionDetailsList);
	}
	

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

	// GET PRODUCTION DETAILS BY BATCH NO AND ORDER NO
	public ResponseEntity<?> getProductionResponseByBatchOrder(String batchNumber, String orderNo, String fromDate,
			String toDate) {

		List<Object[]> productionDetailsResponse = new ArrayList<>();
		List<PunchingBmrProductionDetailsResponse> list = new ArrayList<>();

		try {
			// Fetch production details by batch and order

			String[] batchNoParts = batchNumber.split("-");
			String genNumber = "";
			String batchNo = "";
			if (batchNoParts.length > 1) {
				genNumber = batchNoParts[1];
				batchNo = batchNoParts[0];
				System.out.println("Generated Number" + genNumber);
				System.out.println("Generated Number" + batchNo);
			}
			productionDetailsResponse = productionDetailsRepository.productionResponseByBatchOrder(batchNo, orderNo);

			for (Object[] result : productionDetailsResponse) {

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
				BigDecimal nbagDate = productionDetailsRepository.productionBagsOnDate(orderNo, fromLocalDate,
						toLocalDate);
				BigDecimal nocDate = productionDetailsRepository.productionBagNocOnDate(orderNo, fromLocalDate,
						toLocalDate);

				// PACKED QTY IN BAGS AND BOXES
//					BigDecimal packQtyBag = productionDetailsRepository.packedQtyInBags(orderNo);
//					BigDecimal packQtyBox = productionDetailsRepository.packedQtyInBoxes(orderNo);
				String productCode = productionDetailsRepository.getProductCode(response.getOrderNumber());
				

				response.setBagPackDate(nbagDate != null ? nbagDate.toString() : "--");
				response.setBoxPackDate(nocDate != null ? nocDate.toString() : "--");
				response.setBoxPackQty(farQuantityBox);
				response.setBagPackQty(farQuantityBag);
				response.setProductCode(productCode);
				
				// Add the response to the list
				list.add(response);
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to Get Production Details: " + msg, ex);

			return new ResponseEntity<>(new ApiResponse(false, "Failed to Get Production Details: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		// Return the processed response
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

//	public ResponseEntity<?> getFilteredBatchNumbers() {
//        // Fetch all batch numbers
//        List<String> batchNumbers = productionDetailsRepository.productionDetailsBatchNumber();
//        List<String> filteredBatchNumbers = new ArrayList<>();
//
//        // Iterate over each batch number and apply filtering logic
//        for (String batchNo : batchNumbers) {
//            Optional<String> poStatus = productionDetailsRepository.productionDetailsByBatchNo(batchNo);
//
//            if (poStatus.isPresent() && "Open".equals(poStatus.get())) {
//                // Generate a new batch number by incrementing the last part
//                String newBatchNo = generateNewBatchNo(batchNo);
//                filteredBatchNumbers.add(newBatchNo);
//            } else {
//                // If status is not "Open" or not present, add the existing batch number
//                filteredBatchNumbers.add(batchNo);
//            }
//        }
//
//        // Return the list of batch numbers
//        return new ResponseEntity(filteredBatchNumbers, HttpStatus.OK);
//    }
//
//    // Helper method to generate the new batch number
//    private String generateNewBatchNo(String batchNo) {
//        // Split the batch number into the base and the incremental part
//        String[] parts = batchNo.split("-");
//        String basePart = parts[0];
//        int incrementPart = Integer.parseInt(parts[1]);
//
//        // Increment the numeric part to generate the new batch number
//        int newIncrementPart = incrementPart + 1;
//        return basePart + "-" + newIncrementPart;
//    }

	public ResponseEntity<?> getProductionLOV() {

		List<IdAndValuePair> valuePairList = new ArrayList<>();
		List<String> productionDetailsList = new ArrayList<>();

		try {

			productionDetailsList = productionDetailsRepository.productionDetailsBatchNumber();

			for (String temp : productionDetailsList) {

				Long id = (long) 1;
				IdAndValuePair values = new IdAndValuePair();
				values.setValue(temp);
				values.setId(id);

				valuePairList.add(values);
				id++;

//				Optional<String> statusOpt = productionDetailsRepository.productionDetailsByBatchNo(temp);
//				
//				if(statusOpt.isPresent()) {
//					
//					String status = statusOpt.get();
//					
//					if("Open".equals(status)) {
//						String[] batchNoParts = temp.split("-");
//						int number = Integer.parseInt(batchNoParts[1]);
//						number++;
//						
//						String temp1 = batchNoParts[0] + "-" + number;
//						values.setValue(temp1);
//						values.setId(id);
//						
//						valuePairList.add(values);
//					}
//					
//				}

				String incrementedBatchNo = getProductionBatchNoIncrements(temp);
				if (!temp.equals(incrementedBatchNo)) {
					IdAndValuePair incrementedValue = new IdAndValuePair();
					incrementedValue.setValue(incrementedBatchNo);
					incrementedValue.setId(id);
					valuePairList.add(incrementedValue);
					id++;
				}

			}

			logger.info("*** Production Details LOV ****" + valuePairList.size());

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Get Batch for Production Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Get Batch for Production Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(valuePairList, HttpStatus.OK);

	}

	// GET INCREMENTING PRODUCTION LOV

	public String getProductionBatchNoIncrements(String batchNo) {

		List<String> productionList = new ArrayList<>();

		String productionBatchNo = batchNo;

		try {

			Optional<String> statusOpt = productionDetailsRepository.productionDetailsByBatchNo(batchNo);

			if (statusOpt.isPresent()) {

				String status = statusOpt.get();

				if (status.equalsIgnoreCase("Open")) {

					String[] batchNoParts = batchNo.split("-");
					int number = Integer.parseInt(batchNoParts[1]);
					number++;

					productionBatchNo = batchNoParts[0] + "-" + number;
					return productionBatchNo;

				} else {
					return batchNo;
				}

			} else {
				return batchNo;
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Get Batch for Production Details" + msg);
			ex.printStackTrace();

			return "Failed to Get Batch for Production Details";
		}

	}

	public ResponseEntity<?> getOrderLovOnBatchNo(String batchNo) {

		List<String> orderList = new ArrayList<>();
		List<IdAndValuePair> valueList = new ArrayList<>();

		try {

			orderList = productionDetailsRepository.getOrderByBatchNo(batchNo);

			for (String temp : orderList) {
				Long id = (long) 1;
				IdAndValuePair value = new IdAndValuePair();
				value.setValue(temp);
				value.setId(id);

				valueList.add(value);
				id++;
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Get Batch for Production Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, msg), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(valueList, HttpStatus.OK);
	}

	// GET PRODUCTION DETAILS - SAP

	public ResponseEntity<?> getProductionDetailsSAP() {

		List<PunchingBmrProductionDetailsResponse> productionDetailsList = new ArrayList<>();
		List<Object[]> productionDetailsObject = new ArrayList<>();
		Map<String, Integer> batchCounterMap = new HashMap<>();

		List<String> keyValueList = new ArrayList<>();

		List<IdAndValuePair> valuePairList = new ArrayList<>();

		try {

			productionDetailsObject = productionDetailsRepository.productionDetailsResponse();

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

//				String key = response.getSaleOrder() + "-" + response.getSaleOrderItem();
				String key = response.getSaleOrder().toString() + response.getSaleOrderItem().toString();
				int suffix = batchCounterMap.getOrDefault(key, 0) + 1;
				batchCounterMap.put(key, suffix);

				String batchNo = key + "-" + suffix;
				

				keyValueList.add(batchNo);

				for (String temp : keyValueList) {
					Long id = (long) 1;
					IdAndValuePair lovResponse = new IdAndValuePair();
					lovResponse.setId(id);
					lovResponse.setValue(temp);

					valuePairList.add(lovResponse);
					id++;

				}

//	            response.setMapVariable(batchCounterMap);
				productionDetailsList.add(response);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Get Production Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Get Production Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(valuePairList, HttpStatus.OK);
	}

	// PRODUCT RECONILLATION

//	public ResponseEntity<?> productReconillation(String order) {
//		
//		Map<String, BigDecimal> productRecon = new HashMap<>();
//		
//		try {
//			
//			BigDecimal inputQuantity = productionDetailsRepository.inputQuantity(order);
//			
//			List<Object[]> outputRows = productionDetailsRepository.outputQuantityQuery(order);
//			
//			BigDecimal outputString = BigDecimal.ZERO;
//			
//			for(Object[] resp : outputRows) {
//				
//				BigDecimal fbag = (BigDecimal) resp[2];
//				BigDecimal noc = (BigDecimal) resp[3];
//				
//				outputString = outputString.add(fbag.multiply(noc));
//				
//			}
//			
//			logger.info("**** !!!! Output Rows !!!! ****" + outputRows.size());
//			
//			BigDecimal yield = BigDecimal.ZERO;
//			
//			if (outputString.compareTo(BigDecimal.ZERO) > 0) {  
//			    yield = inputQuantity.divide(outputString, 4, RoundingMode.HALF_UP) 
//			                                   .multiply(BigDecimal.valueOf(100));
//			}
//			
//			BigDecimal orderDecimal = new BigDecimal(order);
//			
//			
//			productRecon.put("input", inputQuantity);
//			productRecon.put("output", outputString);
//			productRecon.put("yield", yield);
//			productRecon.put("order", orderDecimal);
//			
//			
//		} catch (Exception ex) {
//
//			String msg = ex.getMessage();
//			logger.error("Unable to Get Production Reconillation Details" + msg);
//			ex.printStackTrace();
//
//			return new ResponseEntity(new ApiResponse(false, "Failed to Get Production Reconillation Details" + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//		
//		return new ResponseEntity(productRecon, HttpStatus.OK);
//		
//	}

	// PRODUCT RECONCILIATION
	public ResponseEntity<?> productReconillation(String batchNo, String order, String from_date, String to_date) {
		Map<String, String> productRecon = new HashMap<>();
		try {
			// Fetch input quantity, handle null by defaulting to BigDecimal.ZERO
			BigDecimal inputQuantity = productionDetailsRepository.inputQuantity(order, from_date, to_date);
			if (inputQuantity == null) {
				inputQuantity = BigDecimal.ZERO;
				logger.warn("Input Quantity not found, defaulting to 0");
			}
			// Fetch output rows
			List<Object[]> outputRows = productionDetailsRepository.outputQuantityQuery(order, from_date, to_date);
			BigDecimal outputString = BigDecimal.ZERO;
			// Sum output quantities, handle potential nulls in the result set
			for (Object[] resp : outputRows) {
				BigDecimal fbag = (BigDecimal) resp[2];
				BigDecimal noc = (BigDecimal) resp[3];
				if (fbag != null && noc != null) {
					outputString = outputString.add(fbag.multiply(noc));
				} else {
					logger.warn("Null value encountered in output rows: fbag or noc is null");
				}
			}
			logger.info("**** Output Rows Count: " + outputRows.size());
			BigDecimal yield = BigDecimal.ZERO;
			// Calculate yield only if both input and output are greater than zero
			if (inputQuantity.compareTo(BigDecimal.ZERO) > 0 && outputString.compareTo(BigDecimal.ZERO) > 0) {
				yield = outputString.divide(inputQuantity, 4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));
			} else {
				logger.warn("Cannot calculate yield, inputQuantity or outputString is invalid.");
			}
			BigDecimal orderDecimal = new BigDecimal(order);
			// Store results in productRecon map
			productRecon.put("input", inputQuantity.toString());
			productRecon.put("output", outputString.toString());
			productRecon.put("yield", yield.toString());
			productRecon.put("order", orderDecimal.toString());
			productRecon.put("batchNo", batchNo);
		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to Get Production Reconciliation Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to Get Production Reconciliation Details: " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(productRecon, HttpStatus.OK);
	}

	// Save

	public ResponseEntity<?> savePostProductionReview(PunchingBmrPostProductionReview postProductionReview,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			if (userRole.equals("ROLE_SUPERVISOR")) {
				 
				postProductionReview.setSupervisorName(postProductionReview.getSupervisorName());
				Long id1 = userRepository.getUsernameByUserId(postProductionReview.getSupervisorName());
				postProductionReview.setSupervisorId(id1);
//				postProductionReview.setSupervisiorSubmittedDate(postProductionReview.getSupervisiorSubmittedDate());
				postProductionReview.setSupervisorStatus(AppConstants.supervisorSave);
 
				postProductionRepository.save(postProductionReview);
 
			} else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {
 
				if (postProductionReview.getSupervisorStatus().equals(AppConstants.supervisorApprovedStatus)) {
 
					postProductionReview.setHodName(postProductionReview.getHodName());
					Long id1 = userRepository.getUsernameByUserId(postProductionReview.getHodName());
					postProductionReview.setHodId(id1);
//					postProductionReview.setHodSubmittedDate(postProductionReview.getHodSubmittedDate());
					postProductionReview.setHodStatus(AppConstants.hodSave);
 
					postProductionRepository.save(postProductionReview);
 
				} else {
					return new ResponseEntity(new ApiResponse(false, "Supervisior not yet Saved"),
							HttpStatus.BAD_REQUEST);
				}
 
			} else if (userRole.equals("ROLE_QA")) {
 
				if (postProductionReview.getHodStatus().equals(AppConstants.hodApprovedStatus)) {
 
					postProductionReview.setQaName(postProductionReview.getQaName());
					Long id1 = userRepository.getUsernameByUserId(postProductionReview.getQaName());
					postProductionReview.setQaId(id1);
//					postProductionReview.setQaSubmittedDate(postProductionReview.getQaSubmittedDate());
					postProductionReview.setQaStatus(AppConstants.qaSave);
 
					postProductionRepository.save(postProductionReview);
 
				} else {
					return new ResponseEntity(new ApiResponse(false, "Hod not yet Saved"), HttpStatus.BAD_REQUEST);
				}
 
			} else {
				return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to save form"),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity(postProductionReview, HttpStatus.OK);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save Post Production Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Save Post Production Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

	}

	// POST PRODUCTION REVIEW

	public ResponseEntity<?> submitPostProductionReview(PunchingBmrPostProductionReview postProductionReview,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			if (userRole.equals("ROLE_SUPERVISOR")) {

				postProductionReview.setSupervisorName(postProductionReview.getSupervisorName());
				Long id1 = userRepository.getUsernameByUserId(postProductionReview.getSupervisorName());
				postProductionReview.setSupervisorId(id1);
				postProductionReview.setSupervisiorSubmittedDate(postProductionReview.getSupervisiorSubmittedDate());
				postProductionReview.setSupervisorStatus(AppConstants.supervisorApprovedStatus);

				postProductionRepository.save(postProductionReview);

			} else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				if (postProductionReview.getSupervisorStatus().equals(AppConstants.supervisorApprovedStatus)) {

					postProductionReview.setHodName(postProductionReview.getHodName());
					Long id1 = userRepository.getUsernameByUserId(postProductionReview.getHodName());
					postProductionReview.setHodId(id1);
					postProductionReview.setHodSubmittedDate(postProductionReview.getHodSubmittedDate());
					postProductionReview.setHodStatus(AppConstants.hodApprovedStatus);

					postProductionRepository.save(postProductionReview);

				} else {
					return new ResponseEntity(new ApiResponse(false, "Supervisior not yet Submitted"),
							HttpStatus.BAD_REQUEST);
				}

			} else if (userRole.equals("ROLE_QA")) {

				if (postProductionReview.getHodStatus().equals(AppConstants.hodApprovedStatus)) {

					postProductionReview.setQaName(postProductionReview.getQaName());
					Long id1 = userRepository.getUsernameByUserId(postProductionReview.getQaName());
					postProductionReview.setQaId(id1);
					postProductionReview.setQaSubmittedDate(postProductionReview.getQaSubmittedDate());
					postProductionReview.setQaStatus(AppConstants.qaApprovedStatus);

					postProductionRepository.save(postProductionReview);

				} else {
					return new ResponseEntity(new ApiResponse(false, "Hod not yet Submitted"), HttpStatus.BAD_REQUEST);
				}

			} else {
				return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to submit form"),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity(postProductionReview, HttpStatus.OK);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save Post Production Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Save Post Production Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

	}

	// GET POST PRODUCTION REVIEW BY ORDER

	public ResponseEntity<?> getPostProductionReviewByOrder(String order) {

		List<PunchingBmrPostProductionReview> postProductionList = new ArrayList<>();

		try {

			postProductionList = postProductionRepository.postproductionReviewByOrder(order);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Get Post Production Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Get Post Production Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(postProductionList, HttpStatus.OK);

	}

	// 5. SAVE EQUIPMENT - ANNEXURE
	
	public ResponseEntity<?> saveEquipmentAnnexure(PunchingBmrEquipmentDetails equipmentDetails,
	        HttpServletRequest http) {

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
	                PunchingBmrEquipmentDetails existingVerification = equipmentDetailsRepository
	                        .getEquipmentDetailsById(id);
	                equipmentDetails.setCreatedAt(existingVerification.getCreatedAt());
	                equipmentDetails.setCreatedBy(existingVerification.getCreatedBy());
	            }

	            equipmentDetails.setSupervisor_save_by(userName);
	            equipmentDetails.setSupervisor_save_id(userId);
	            equipmentDetails.setSupervisor_save_on(date);
	            equipmentDetails.setSupervisor_status(AppConstants.supervisorSave);

	            for (PunchingBmrEquipmentDetailsLine line : equipmentDetails.getDetails()) {

	                line.setEquipmentRecord(equipmentDetails);
	                line.setChecked_name(line.getChecked_name());
	                line.setChecked_status(AppConstants.supervisorSave);
	                Long lineUserId = userRepository.getUsernameByUserId(line.getChecked_name());
	                line.setChecked_id(lineUserId);
	                line.setChecked_date(date);

	                // SAP EQUIPMENT DETAILS
	                PunchingBmrEquipmentSAP equipmentSAP = equipmentSAPRepository.fetchEquipmentByEquipmentName(line.getEquipmentName());

	                if (equipmentSAP != null) {
	                    // Define the date format that matches "yyyy-MM-dd" for database and "dd-MM-yyyy" for input
	                    DateTimeFormatter dbFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	                    DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

	                    // Validate and update startDate
	                    if (line.getDateOfCalibration() != null) {
	                        try {
	                            // Parse the new date (entered by the user) using the "dd-MM-yyyy" format
	                            LocalDate newStartDate = LocalDate.parse(line.getDateOfCalibration(), inputFormatter);

	                            // Parse the existing startDate (from the database) using the "yyyy-MM-dd" format
	                            if (equipmentSAP.getStartDate() != null) {
	                                LocalDate existingStartDate = LocalDate.parse(equipmentSAP.getStartDate(), dbFormatter);

	                                // Compare the dates
	                                if (existingStartDate.isBefore(newStartDate)) {
	                                    // Convert the new date to "yyyy-MM-dd" format before saving
	                                    equipmentSAP.setStartDate(newStartDate.format(dbFormatter)); // Save in "yyyy-MM-dd" format
	                                }
	                            } else {
	                                // If the existing start date is null, set the new start date
	                                equipmentSAP.setStartDate(newStartDate.format(dbFormatter)); // Save in "yyyy-MM-dd" format
	                            }

	                            // Save the updated equipmentSAP record
	                            equipmentSAPRepository.save(equipmentSAP);

	                        } catch (DateTimeParseException e) {
	                            System.out.println("Invalid DateOfCalibration format: " + line.getDateOfCalibration());
	                        }
	                    }

	                    // Validate and update endDate
	                    if (line.getCalibrationDueOn() != null) {
	                        try {
	                            // Parse the new date (entered by the user) using the "dd-MM-yyyy" format
	                            LocalDate newEndDate = LocalDate.parse(line.getCalibrationDueOn(), inputFormatter);

	                            if (equipmentSAP.getEndDate() != null) {
	                                LocalDate existingEndDate = LocalDate.parse(equipmentSAP.getEndDate(), dbFormatter);

	                                // Compare the dates
	                                if (existingEndDate.isBefore(newEndDate)) {
	                                    equipmentSAP.setEndDate(newEndDate.format(dbFormatter)); // Save in "yyyy-MM-dd" format
	                                }
	                            } else {
	                                // If the existing end date is null, set the new end date
	                                equipmentSAP.setEndDate(newEndDate.format(dbFormatter)); // Save in "yyyy-MM-dd" format
	                            }

	                            // Save the updated equipmentSAP record
	                            equipmentSAPRepository.save(equipmentSAP);

	                        } catch (DateTimeParseException e) {
	                            System.out.println("Invalid CalibrationDueOn format: " + line.getCalibrationDueOn());
	                        }
	                    }
	                }
	                
	                // OBJECT 2
	                
	                PunchingBmrEquipmentSAP equipmentSAP1 = equipmentSAPRepository.fetchEquipmentByMachineName(line.getEquipmentName());
	                
	                if (equipmentSAP1 != null) {
	                    // Define the date format that matches "yyyy-MM-dd" for database and "dd-MM-yyyy" for input
	                    DateTimeFormatter dbFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	                    DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

	                    // Validate and update startDate
	                    if (line.getDateOfCalibration() != null) {
	                        try {
	                            // Parse the new date (entered by the user) using the "dd-MM-yyyy" format
	                            LocalDate newStartDate = LocalDate.parse(line.getDateOfCalibration(), inputFormatter);

	                            // Parse the existing startDate (from the database) using the "yyyy-MM-dd" format
	                            if (equipmentSAP1.getStartDate() != null) {
	                                LocalDate existingStartDate = LocalDate.parse(equipmentSAP1.getStartDate(), dbFormatter);

	                                // Compare the dates
	                                if (existingStartDate.isBefore(newStartDate)) {
	                                    // Convert the new date to "yyyy-MM-dd" format before saving
	                                    equipmentSAP1.setStartDate(newStartDate.format(dbFormatter)); // Save in "yyyy-MM-dd" format
	                                }
	                            } else {
	                                // If the existing start date is null, set the new start date
	                                equipmentSAP1.setStartDate(newStartDate.format(dbFormatter)); // Save in "yyyy-MM-dd" format
	                            }

	                            // Save the updated equipmentSAP1 record
	                            equipmentSAPRepository.save(equipmentSAP1);

	                        } catch (DateTimeParseException e) {
	                            System.out.println("Invalid DateOfCalibration format: " + line.getDateOfCalibration());
	                        }
	                    }

	                    // Validate and update endDate
	                    if (line.getCalibrationDueOn() != null) {
	                        try {
	                            // Parse the new date (entered by the user) using the "dd-MM-yyyy" format
	                            LocalDate newEndDate = LocalDate.parse(line.getCalibrationDueOn(), inputFormatter);

	                            if (equipmentSAP1.getEndDate() != null) {
	                                LocalDate existingEndDate = LocalDate.parse(equipmentSAP1.getEndDate(), dbFormatter);

	                                // Compare the dates
	                                if (existingEndDate.isBefore(newEndDate)) {
	                                    equipmentSAP1.setEndDate(newEndDate.format(dbFormatter)); // Save in "yyyy-MM-dd" format
	                                }
	                            } else {
	                                // If the existing end date is null, set the new end date
	                                equipmentSAP1.setEndDate(newEndDate.format(dbFormatter)); // Save in "yyyy-MM-dd" format
	                            }

	                            // Save the updated equipmentSAP1 record
	                            equipmentSAPRepository.save(equipmentSAP1);

	                        } catch (DateTimeParseException e) {
	                            System.out.println("Invalid CalibrationDueOn format: " + line.getCalibrationDueOn());
	                        }
	                    }
	                }
	                
	            }

	            equipmentDetailsRepository.save(equipmentDetails);

	        } else {
	            return new ResponseEntity(
	                    new ApiResponse(false, userRole + " not authorized to save equipment Annexure form"),
	                    HttpStatus.BAD_REQUEST);
	        }

	    } catch (Exception ex) {

	        String msg = ex.getMessage();
	        logger.error("Unable to Save Equipment Annexure Details" + msg);
	        ex.printStackTrace();

	        return new ResponseEntity(new ApiResponse(false, "Failed to Save Equipment Annexure Details" + msg),
	                HttpStatus.BAD_REQUEST);
	    }

	    return new ResponseEntity(equipmentDetails, HttpStatus.OK);
	}

	

	// 5. SUBMIT EQUIPMENT - ANNEXURE

	public ResponseEntity<?> submitEquipmentAnnexure(PunchingBmrEquipmentDetails equipmentDetails,
			HttpServletRequest http) {

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
					PunchingBmrEquipmentDetails existingVerification = equipmentDetailsRepository
							.getEquipmentDetailsById(id);
					equipmentDetails.setCreatedAt(existingVerification.getCreatedAt());
					equipmentDetails.setCreatedBy(existingVerification.getCreatedBy());
				}

				equipmentDetails.setSupervisor_save_by(userName);
				equipmentDetails.setSupervisor_save_id(userId);
				equipmentDetails.setSupervisor_save_on(date);
				equipmentDetails.setSupervisor_status(AppConstants.supervisorApprovedStatus);

				for (PunchingBmrEquipmentDetailsLine line : equipmentDetails.getDetails()) {

					line.setEquipmentRecord(equipmentDetails);
					line.setChecked_name(line.getChecked_name());
					line.setChecked_status(AppConstants.supervisorApprovedStatus);
					Long lineUserId = userRepository.getUsernameByUserId(line.getChecked_name());
					line.setChecked_id(lineUserId);
					line.setChecked_date(date);
					
					
					 // SAP EQUIPMENT DETAILS
	                PunchingBmrEquipmentSAP equipmentSAP = equipmentSAPRepository.fetchEquipmentByEquipmentName(line.getEquipmentName());

	                if (equipmentSAP != null) {
	                    // Define the date format that matches "yyyy-MM-dd" for database and "dd-MM-yyyy" for input
	                    DateTimeFormatter dbFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	                    DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

	                    // Validate and update startDate
	                    if (line.getDateOfCalibration() != null) {
	                        try {
	                            // Parse the new date (entered by the user) using the "dd-MM-yyyy" format
	                            LocalDate newStartDate = LocalDate.parse(line.getDateOfCalibration(), inputFormatter);

	                            // Parse the existing startDate (from the database) using the "yyyy-MM-dd" format
	                            if (equipmentSAP.getStartDate() != null) {
	                                LocalDate existingStartDate = LocalDate.parse(equipmentSAP.getStartDate(), dbFormatter);

	                                // Compare the dates
	                                if (existingStartDate.isBefore(newStartDate)) {
	                                    // Convert the new date to "yyyy-MM-dd" format before saving
	                                    equipmentSAP.setStartDate(newStartDate.format(dbFormatter)); // Save in "yyyy-MM-dd" format
	                                }
	                            } else {
	                                // If the existing start date is null, set the new start date
	                                equipmentSAP.setStartDate(newStartDate.format(dbFormatter)); // Save in "yyyy-MM-dd" format
	                            }

	                            // Save the updated equipmentSAP record
	                            equipmentSAPRepository.save(equipmentSAP);

	                        } catch (DateTimeParseException e) {
	                            System.out.println("Invalid DateOfCalibration format: " + line.getDateOfCalibration());
	                        }
	                    }

	                    // Validate and update endDate
	                    if (line.getCalibrationDueOn() != null) {
	                        try {
	                            // Parse the new date (entered by the user) using the "dd-MM-yyyy" format
	                            LocalDate newEndDate = LocalDate.parse(line.getCalibrationDueOn(), inputFormatter);

	                            if (equipmentSAP.getEndDate() != null) {
	                                LocalDate existingEndDate = LocalDate.parse(equipmentSAP.getEndDate(), dbFormatter);

	                                // Compare the dates
	                                if (existingEndDate.isBefore(newEndDate)) {
	                                    equipmentSAP.setEndDate(newEndDate.format(dbFormatter)); // Save in "yyyy-MM-dd" format
	                                }
	                            } else {
	                                // If the existing end date is null, set the new end date
	                                equipmentSAP.setEndDate(newEndDate.format(dbFormatter)); // Save in "yyyy-MM-dd" format
	                            }

	                            // Save the updated equipmentSAP record
	                            equipmentSAPRepository.save(equipmentSAP);

	                        } catch (DateTimeParseException e) {
	                            System.out.println("Invalid CalibrationDueOn format: " + line.getCalibrationDueOn());
	                        }
	                    }
	                }
	                
	                // OBJECT 2
	                
	                PunchingBmrEquipmentSAP equipmentSAP1 = equipmentSAPRepository.fetchEquipmentByMachineName(line.getEquipmentName());
	                
	                if (equipmentSAP1 != null) {
	                    // Define the date format that matches "yyyy-MM-dd" for database and "dd-MM-yyyy" for input
	                    DateTimeFormatter dbFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	                    DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

	                    // Validate and update startDate
	                    if (line.getDateOfCalibration() != null) {
	                        try {
	                            // Parse the new date (entered by the user) using the "dd-MM-yyyy" format
	                            LocalDate newStartDate = LocalDate.parse(line.getDateOfCalibration(), inputFormatter);

	                            // Parse the existing startDate (from the database) using the "yyyy-MM-dd" format
	                            if (equipmentSAP1.getStartDate() != null) {
	                                LocalDate existingStartDate = LocalDate.parse(equipmentSAP1.getStartDate(), dbFormatter);

	                                // Compare the dates
	                                if (existingStartDate.isBefore(newStartDate)) {
	                                    // Convert the new date to "yyyy-MM-dd" format before saving
	                                    equipmentSAP1.setStartDate(newStartDate.format(dbFormatter)); // Save in "yyyy-MM-dd" format
	                                }
	                            } else {
	                                // If the existing start date is null, set the new start date
	                                equipmentSAP1.setStartDate(newStartDate.format(dbFormatter)); // Save in "yyyy-MM-dd" format
	                            }

	                            // Save the updated equipmentSAP1 record
	                            equipmentSAPRepository.save(equipmentSAP1);

	                        } catch (DateTimeParseException e) {
	                            System.out.println("Invalid DateOfCalibration format: " + line.getDateOfCalibration());
	                        }
	                    }

	                    // Validate and update endDate
	                    if (line.getCalibrationDueOn() != null) {
	                        try {
	                            // Parse the new date (entered by the user) using the "dd-MM-yyyy" format
	                            LocalDate newEndDate = LocalDate.parse(line.getCalibrationDueOn(), inputFormatter);

	                            if (equipmentSAP1.getEndDate() != null) {
	                                LocalDate existingEndDate = LocalDate.parse(equipmentSAP1.getEndDate(), dbFormatter);

	                                // Compare the dates
	                                if (existingEndDate.isBefore(newEndDate)) {
	                                    equipmentSAP1.setEndDate(newEndDate.format(dbFormatter)); // Save in "yyyy-MM-dd" format
	                                }
	                            } else {
	                                // If the existing end date is null, set the new end date
	                                equipmentSAP1.setEndDate(newEndDate.format(dbFormatter)); // Save in "yyyy-MM-dd" format
	                            }

	                            // Save the updated equipmentSAP1 record
	                            equipmentSAPRepository.save(equipmentSAP1);

	                        } catch (DateTimeParseException e) {
	                            System.out.println("Invalid CalibrationDueOn format: " + line.getCalibrationDueOn());
	                        }
	                    }
	                }
					
				}

				equipmentDetailsRepository.save(equipmentDetails);

			} else {
				return new ResponseEntity(
						new ApiResponse(false, userRole + " not authorized to save equipment Annexure form"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit Equipment Annexure Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit Equipment Annexure Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(equipmentDetails, HttpStatus.OK);

	}

	public ResponseEntity<?> getEquipmentAnnexure(String order) {

		List<PunchingBmrEquipmentDetails> equipmentDetails = new ArrayList<>();

		try {

			equipmentDetails = equipmentDetailsRepository.getEquipmentDetailsByOrder(order);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Equipment Annexure Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to get Equipment Annexure Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(equipmentDetails, HttpStatus.OK);

	}

	// 10. ENCLOSURE LIST

	public ResponseEntity<?> saveEnclosureList(PunchingBmrEnclosureList enclosureList, HttpServletRequest http) {

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
			
			else if (userRole.equals("ROLE_QA")) {
				
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

		List<PunchingBmrEnclosureList> enclosureList = new ArrayList<>();

		try {

			enclosureList = enclosureListRepository.getEnclosureListByOrder(order);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Enclosure List Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to get Enclosure List Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(enclosureList, HttpStatus.OK);

	}

	// 13. QA RELEASE SAVE

	public ResponseEntity<?> saveQARelease(PunchingBmrQualityReleaseHeader qualityRelease, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			if (userRole.equals("ROLE_QA")) {
				
				qualityRelease.setStatus(AppConstants.qaSave);

				qualityRelease.setDepartment("Pad Punching");

				for (PunchingBmrQualityReleaseLine qualityLine : qualityRelease.getDetails()) {
					qualityLine.setQualityRecord(qualityRelease);
					qualityLine.setQaName(qualityLine.getQaName());

					Long qaId = userRepository.getUsernameByUserId(qualityLine.getQaName());
//					qualityLine.setQaStatus(AppConstants.qaSave);
//					qualityLine.setQaDate(qualityLine.getQaDate());
				}

				qualityReleaseHeadRepository.save(qualityRelease);

			} else {
				return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to save Quality Release"),
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

	// 13. QA RELEASE SUBMIT

	public ResponseEntity<?> submitQARelease(PunchingBmrQualityReleaseHeader qualityRelease, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			if (userRole.equals("ROLE_QA")) {

				qualityRelease.setStatus(AppConstants.qaApprovedStatus);
				qualityRelease.setDepartment("Pad Punching");

				for (PunchingBmrQualityReleaseLine qualityLine : qualityRelease.getDetails()) {
					qualityLine.setQualityRecord(qualityRelease);
					qualityLine.setQaName(qualityLine.getQaName());

					Long qaId = userRepository.getUsernameByUserId(qualityLine.getQaName());
					
//					qualityLine.setQaDate(qualityLine.getQaDate());
				}

				qualityReleaseHeadRepository.save(qualityRelease);

			} else {
				return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to save Quality Release"),
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

	public ResponseEntity<?> getQualityRelease(String order) {

		List<PunchingBmrQualityReleaseHeader> qualityReleaseList = new ArrayList<>();

		try {

			qualityReleaseList = qualityReleaseHeadRepository.getQualityReleaseHeaderByOrder(order);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Quality Release List Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to get Quality Release List Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(qualityReleaseList, HttpStatus.OK);

	}

	// 02. DAILY PRODUCTION - PACKING DETAILS F04

	public ResponseEntity<?> dailyProductionPackingDetails(String fromDate, String toDate, String order) {

		List<DailyProductionDetailsBmrResponse> productionDetailsList = new ArrayList<>();

		List<Object[]> productionDetailsObjectList = new ArrayList<>();

		try {

//			productionDetailsList = qualityReleaseHeadRepository.getProductionDetailsByDateFields(fromDate, toDate);

			productionDetailsObjectList = qualityReleaseHeadRepository.productionDetailsSAP(fromDate, toDate, order);

			DailyProductionDetailsBmrResponse respone = new DailyProductionDetailsBmrResponse();

			for (Object[] details : productionDetailsObjectList) {

				respone.setPackdate((Date) details[0]);
				respone.setShiftId((BigDecimal) details[1]);
				respone.setJulianday((String) details[2]);
				respone.setMachine((String) details[3]);
				respone.setOrderNo((String) details[4]);
				respone.setNcb((BigDecimal) details[5]);
				respone.setNoc((BigDecimal) details[6]);
				respone.setBags((BigDecimal) details[7]);
				respone.setPoNumber((String) details[8]);
				respone.setMaterial((String) details[9]);

				productionDetailsList.add(respone);

			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Daily production Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to get Daily production Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(productionDetailsList, HttpStatus.OK);

	}

	// save09. PROCESS DEVIATION

	public ResponseEntity<?> saveProcessDeviation(PunchingBmrProcessDeviationRecordHeader deviationRecord,
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
				deviationRecord.setStatus(AppConstants.supervisorSave);

				for (PunchingBmrProcessDeviationRecordLine deviationLine : deviationRecord.getDetails()) {

					deviationLine.setDeviationRecord(deviationRecord);
					deviationLine.setSupervisorName(deviationLine.getSupervisorName());

					Long superId = userRepository.getUsernameByUserId(deviationLine.getSupervisorName());
					deviationLine.setSupervisorId(superId);
					deviationLine.setSupervisorStatus(AppConstants.supervisorSave);
					deviationLine.setSupervisorDate(deviationLine.getSupervisorDate());
				}

				deviationRecordHeaderRepository.save(deviationRecord);

			} 
			else if(userRole.equalsIgnoreCase("ROLE_QA")) {
				
				deviationRecord.setOrderNo(deviationRecord.getOrderNo());
				deviationRecord.setStatus(AppConstants.qaSave);
				
				for (PunchingBmrProcessDeviationRecordLine deviationLine : deviationRecord.getDetails()) {

					deviationLine.setDeviationRecord(deviationRecord);
					deviationLine.setQaName(deviationLine.getQaName());

					Long superId = userRepository.getUsernameByUserId(deviationLine.getQaName());
					
					deviationLine.setQaStatus(AppConstants.qaSave);
					deviationLine.setQaDate(deviationLine.getQaDate());
				}

				deviationRecordHeaderRepository.save(deviationRecord);
				
			}
			
			else {
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

	// submit precess dev

	public ResponseEntity<?> submitProcessDeviation(PunchingBmrProcessDeviationRecordHeader deviationRecord,
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

				for (PunchingBmrProcessDeviationRecordLine deviationLine : deviationRecord.getDetails()) {

					deviationLine.setDeviationRecord(deviationRecord);
					deviationLine.setSupervisorName(deviationLine.getSupervisorName());

					Long superId = userRepository.getUsernameByUserId(deviationLine.getSupervisorName());
					deviationLine.setSupervisorId(superId);
					deviationLine.setSupervisorStatus(AppConstants.supervisorApprovedStatus);
					deviationLine.setSupervisorDate(deviationLine.getSupervisorDate());
				}

				deviationRecordHeaderRepository.save(deviationRecord);

			} else if (userRole.equals("ROLE_QA")) {

				deviationRecord.setOrderNo(deviationRecord.getOrderNo());
				deviationRecord.setStatus(AppConstants.qaApprovedStatus);

				for (PunchingBmrProcessDeviationRecordLine deviationLine : deviationRecord.getDetails()) {
					deviationLine.setDeviationRecord(deviationRecord);
					deviationLine.setQaName(deviationLine.getQaName());

					Long superId = userRepository.getUsernameByUserId(deviationLine.getQaName());
					deviationLine.setQaId(superId);
//					deviationLine.setQaStatus(AppConstants.qaApprovedStatus);
//					deviationLine.setQaDate(deviationLine.getQaDate());
				}

				deviationRecordHeaderRepository.save(deviationRecord);

			} else {
				return new ResponseEntity(
						new ApiResponse(false, userRole + "not authorized to submit process deviation records"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to submit process deviation Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to submit process deviation records " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity("Process Deviation Submitted Successfully !!!", HttpStatus.OK);
	}

	public ResponseEntity<?> getProcessDeviationByOrder(String orderNo) {

		List<PunchingBmrProcessDeviationRecordHeader> deviationRecordList = new ArrayList<>();

		try {

			deviationRecordList = deviationRecordHeaderRepository.getDeviationRecordByOrder(orderNo);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get process deviation Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to get process deviation records " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(deviationRecordList, HttpStatus.OK);
	}

	// STOPPAGE QUERY

//	public ResponseEntity<?> getStoppageOrders(String fromdate, String todate, String machine) {
//		
//		List<PadPunchingStoppageResponse> stoppageList = new ArrayList<>();
//		
//		try {
//			
//			stoppageList = deviationRecordHeaderRepository.stoppageResponse(fromdate, todate, machine);
//			
//		} catch (Exception ex) {
//
//			String msg = ex.getMessage();
//			logger.error("Unable to get Stoppage Details" + msg);
//			ex.printStackTrace();
//
//			return new ResponseEntity(new ApiResponse(false, "Failed to get stoppage records " + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//		
//		return new ResponseEntity(stoppageList, HttpStatus.OK);
//	}

	public ResponseEntity<?> getStoppageOrders(String fromdate, String todate, String machine) {
		List<PadPunchingStoppageResponse> stoppageList = new ArrayList<>();

		try {
			List<Object[]> results = deviationRecordHeaderRepository.stoppageResponse(fromdate, todate, machine);

			stoppageList = results.stream().map(record -> {
				PadPunchingStoppageResponse response = new PadPunchingStoppageResponse();
				response.setPackdate((Date) record[0]);
				response.setShift((BigDecimal) record[1]);
				response.setType((String) record[2]);
				response.setMachine((String) record[3]);
				response.setFromTime((String) record[4]);
				response.setToTime((String) record[5]);
				response.setTotalTime((BigDecimal) record[7]);
				response.setRemarks((String) record[6]);
				return response;
			}).collect(Collectors.toList());

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Stoppage Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get stoppage records: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(stoppageList, HttpStatus.OK);
	}

	// SAVE STOPPAGE

	public ResponseEntity<?> saveStoppageRows(PunchingBmrStoppageHeader stoppageHeader, HttpServletRequest http) {

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

				for (PunchingBmrStoppageLine stop : stoppageHeader.getDetails()) {

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

	// submit stopage
	public ResponseEntity<?> submitStoppageRows(PunchingBmrStoppageHeader stoppageHeader, HttpServletRequest http) {

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

				for (PunchingBmrStoppageLine stop : stoppageHeader.getDetails()) {

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

	public ResponseEntity<?> getStoppageRows(String from_date, String to_date, String machine) {

		List<PunchingBmrStoppageHeader> stoppageHeaderList = new ArrayList<>();

		try {

			stoppageHeaderList = stoppageHeaderRepository.getStoppageHeader(from_date, to_date, machine);

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Stoppage Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get stoppage records: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(stoppageHeaderList, HttpStatus.OK);
	}

	// New

	public ResponseEntity<?> getStoppagesBybatch(String batchNo) {

		List<PunchingBmrStoppageHeader> stoppageHeaderList = new ArrayList<>();

		try {

			stoppageHeaderList = stoppageHeaderRepository.getStoppageBatchNo(batchNo);

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Stoppage Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get stoppage records: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(stoppageHeaderList, HttpStatus.OK);
	}

	// SAVE MANUFACTURER STEPS

	public ResponseEntity<?> saveManufacturerSteps(PunchingBmrManufacturingSteps manufacturerSteps,
			HttpServletRequest http) {

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

				manufacturerSteps.setSupervisor_save_by(userName);
				manufacturerSteps.setSupervisor_save_id(userId);
				manufacturerSteps.setSupervisor_status(AppConstants.supervisorSave);
				manufacturerSteps.setSupervisor_save_on(manufacturerSteps.getSupervisor_save_on());

				for (PunchingBmrManufacturingStepsLine steps : manufacturerSteps.getDetails()) {

					steps.setManufactureRecord(manufacturerSteps);

				}

				manufacturingStepsRepository.save(manufacturerSteps);

			} else if (userRole.equals("ROLE_QA")) {

				manufacturerSteps.setBatchNo(manufacturerSteps.getBatchNo());
				manufacturerSteps.setOrderNo(manufacturerSteps.getOrderNo());

				manufacturerSteps.setQa_status(AppConstants.qaSave);
				manufacturerSteps.setQa_sign(userName);

				for (PunchingBmrManufacturingStepsLine steps : manufacturerSteps.getDetails()) {

					steps.setManufactureRecord(manufacturerSteps);

				}

				manufacturingStepsRepository.save(manufacturerSteps);

			} else {
				return new ResponseEntity(
						new ApiResponse(false, userRole + " not authroized to save manufacturer steps"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Stoppage Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get stoppage records: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(manufacturerSteps, HttpStatus.OK);

	}

	// SUBMIT MANUFACTURER STEPS

	public ResponseEntity<?> submitManufacturerSteps(PunchingBmrManufacturingSteps manufacturerSteps,
			HttpServletRequest http) {

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

				manufacturerSteps.setSupervisor_save_by(userName);
				manufacturerSteps.setSupervisor_save_id(userId);
				manufacturerSteps.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				manufacturerSteps.setSupervisor_save_on(manufacturerSteps.getSupervisor_save_on());

				for (PunchingBmrManufacturingStepsLine steps : manufacturerSteps.getDetails()) {

					steps.setManufactureRecord(manufacturerSteps);

				}

				manufacturingStepsRepository.save(manufacturerSteps);

			} else if (userRole.equals("ROLE_QA")) {

				manufacturerSteps.setBatchNo(manufacturerSteps.getBatchNo());
				manufacturerSteps.setOrderNo(manufacturerSteps.getOrderNo());

				manufacturerSteps.setQa_status(AppConstants.qaApprovedStatus);
				manufacturerSteps.setQa_sign(userName);

				for (PunchingBmrManufacturingStepsLine steps : manufacturerSteps.getDetails()) {

					steps.setManufactureRecord(manufacturerSteps);

				}

				manufacturingStepsRepository.save(manufacturerSteps);

			} else {
				return new ResponseEntity(
						new ApiResponse(false, userRole + " not authroized to save manufacturer steps"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to submit manufacturing Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to submit manufacturing records: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(manufacturerSteps, HttpStatus.OK);

	}

	public ResponseEntity<?> getManufacturerSteps(String batchNo) {

		List<PunchingBmrManufacturingSteps> manufacturingStepsList = new ArrayList<>();

		try {

			manufacturingStepsList = manufacturingStepsRepository.manufacturingStepsByBatchNo(batchNo);

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Stoppage Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get stoppage records: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(manufacturingStepsList, HttpStatus.OK);

	}

	public ResponseEntity<?> getManufacturerStepsByOrder(String orderNo) {

		List<PunchingBmrManufacturingSteps> manufacturingStepsList = new ArrayList<>();

		try {

			manufacturingStepsList = manufacturingStepsRepository.manufacturingStepsByOrder(orderNo);

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Stoppage Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get stoppage records: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(manufacturingStepsList, HttpStatus.OK);

	}

	// TRACEABILITY

	public ResponseEntity<?> punchingTraceability(String manufactureDate, String product) {

		List<PunchingTraceabilityResponse> traceabilityResponseList = new ArrayList();
		PunchingTraceabilityResponse response = new PunchingTraceabilityResponse();

		List<String> orderList = new ArrayList<>();
		List<String> batchNoList = new ArrayList<>();

		List<Object[]> orderInfoList = new ArrayList<>();
		List<Object[]> machineOrderList = new ArrayList<>();

		List<PadPunchingMachineTraceResponse> machineOrderResponseList = new ArrayList<>();

		// SPULANCE ROLL

		List<Object[]> spulanceRollByOrder = new ArrayList<>();

		// AB/RP BALE

		List<Map<String, Object>> spulanceResponseList = new ArrayList<>();
		List<Map<String, Object>> abOrderList = new ArrayList<>();
		List<String> phNumberList = new ArrayList<>();
		List<String> bmrNumberList = new ArrayList<>();
		List<BmrSummary> packingDetailsList = new ArrayList<>();

		List<SplBaleTraceResponse> orderResponse = new ArrayList<>();
		List<SplBaleTraceResponse> orderResponse1 = new ArrayList<>();

		try {

			batchNoList = productionDetailsRepository.getBatchNoforTraceParameters(manufactureDate, product);

			response.setBatchNos(batchNoList);

			orderList = productionDetailsRepository.getOrderNoforTraceParameters(manufactureDate, product);

			response.setOrderList(orderList);

			logger.info("*** Batch and Order size" + batchNoList.size() + orderList.size());

			for (String temp : orderList) {

				orderInfoList = productionDetailsRepository.getProductionDetailsByOrderInfo(temp);

				for (Object[] resp : orderInfoList) {

					logger.info("*** !!! Order Info List !!! ***" + orderInfoList.size());

					response.setMaterial((String) resp[0]);
					response.setMixDescription((String) resp[1]);
					response.setPattern((String) resp[2]);
					response.setGsm((BigDecimal) resp[3]);
					response.setSaleOrder((BigDecimal) resp[4]);
					response.setSoItem((BigDecimal) resp[5]);
					response.setPoNumber((String) resp[6]);
					response.setCustomerPO((String) resp[7]);
					response.setOrderNo((String) resp[8]);
					;

				}

				response.setManDate(manufactureDate);

				machineOrderList = productionDetailsRepository.machinesList(manufactureDate, temp);

				for (Object[] machine : machineOrderList) {

					PadPunchingMachineTraceResponse machineResponse = new PadPunchingMachineTraceResponse();

					machineResponse.setMachine((String) machine[2]);
					machineResponse.setBagPackQty((BigDecimal) machine[0]);
					machineResponse.setBoxPackQty((BigDecimal) machine[1]);

					machineOrderResponseList.add(machineResponse);
				}

				response.setMachineList(machineOrderResponseList);

				// ROLL GOODS

				spulanceRollByOrder = productionDetailsRepository.fetchProductionDetailsSplByOrder(temp);
				List<PadPunchingTraceSpulanceDataResponse> spulanceDatalist = new ArrayList<>();

				logger.info("*** Spulance Data" + spulanceRollByOrder.size());

				for (Object[] spulance : spulanceRollByOrder) {

					String rollNo = (String) spulance[0];
					Date proddate = (Date) spulance[1];
					BigDecimal netWeight = (BigDecimal) spulance[2];
					BigDecimal shiftId = (BigDecimal) spulance[3];

					String shaftno = (String) spulance[4];

					PadPunchingTraceSpulanceDataResponse spulancedata = new PadPunchingTraceSpulanceDataResponse();
					spulancedata.setNetWeight(netWeight);
					spulancedata.setShift(shiftId);
					spulancedata.setRollNo(rollNo);
					spulancedata.setProdDate(proddate);
					spulancedata.setShaftNo(shaftno);

					spulanceDatalist.add(spulancedata);
				}

				logger.info("*** Spulance List Size ***" + spulanceDatalist.size());

				response.setRollConsumption(spulanceDatalist);

				spulanceResponseList = productionDetailsRepository.baleByOrder(temp);

				for (Map<String, Object> result : spulanceResponseList) {

					String baleNo = (String) result.get("bale");
					String wei = String.valueOf(result.get("netWeight"));

					SplBaleTraceResponse splresponse = new SplBaleTraceResponse();
					splresponse.setBaleNo(baleNo);
					splresponse.setNetWeight(wei);
					splresponse.setOrderNumber(temp);

					if (baleNo.startsWith("B")) {
						abOrderList = bleachBmrMappingRepository.fetchBatchByBale(baleNo);

						System.out.println("orderList" + abOrderList.size());

						for (Map<String, Object> order : abOrderList) {
							String batchNo = String.valueOf(order.get("batch"));
							String bmr = (String) order.get("bmrNumber");

							splresponse.setBmrNumber(bmr);
							splresponse.setBatchNo(batchNo);

							System.out.println("lay" + splresponse.getBatchNo());

							String laydownNumber = bleachBmrMappingRepository
									.getLaydownByBmr(splresponse.getBmrNumber());

//							phNumberList = BleachBmrLaydownMappingRepository.getPHByLaydownDate(laydownNumber, dateString);
							phNumberList = bleachBmrMappingRepository.getPHByLaydownDate(laydownNumber);
							packingDetailsList = bmrSummaryRepository.getSummaryByBMR(splresponse.getBmrNumber());

							splresponse.setLaydownNumber(laydownNumber);
							splresponse.setPhNumber(phNumberList);
							splresponse.setSummaryDetails(packingDetailsList);
							orderResponse.add(splresponse);
						}
					} else {
						orderResponse1.add(splresponse);
					}

				}

				response.setAbCottonResponse(orderResponse);
				response.setRpCottonResponse(orderResponse1);
				;
				traceabilityResponseList.add(response);

			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Traceability Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Traceability Records: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(traceabilityResponseList, HttpStatus.OK);

	}

	// PUNCHING TRACEABILITY

//	public ResponseEntity<?> punchingTraceabilityRequest(String saleOrder, String item, String product) {
//		
//		List<Map<String, Object>> detailsBySaleOrder = new ArrayList<>();
//		
//		List<Object[]> machineTraceResponse = new ArrayList<>();
//		
//		List<PadPunchingMachineTraceResponse> machineList = new ArrayList<>();
//		
//		List<PadPunchingMachineTraceabilityResponse> response = new ArrayList<>();
//		
//		try {
//			
//			detailsBySaleOrder = productionDetailsRepository.getProductionResponseBySaleOrderItem(saleOrder, item, product);
//			
//			PadPunchingMachineTraceabilityResponse machineTrace = new PadPunchingMachineTraceabilityResponse();
//			
//			for(Map<String, Object> temp : detailsBySaleOrder) {
//				
//				BigDecimal saleOrders = (BigDecimal) temp.get("saleOrder");
//				BigDecimal saleOrderitem = (BigDecimal) temp.get("item");
//				String productionOrder = (String) temp.get("orderNo");
//				String poNumber = (String) temp.get("poNumber");
//				String material = (String) temp.get("material");
//				String productDesc = (String) temp.get("product");
//				
//				
//				machineTraceResponse = productionDetailsRepository.machinesListByOrder(productionOrder);
//				
//				for(Object[] machine : machineTraceResponse) {
//					
//					String machineName = (String) machine[2];
//					BigDecimal bags = (BigDecimal) machine[1];
//					BigDecimal boxes = (BigDecimal) machine[0];
//					
//					PadPunchingMachineTraceResponse obj1 = new PadPunchingMachineTraceResponse();
//					obj1.setBagPackQty(bags);
//					obj1.setBoxPackQty(boxes);
//					obj1.setMachine(machineName);
//					
//					machineList.add(obj1);
//					
//					
//					machineTrace.setMachineList(machineList);
//				}
//				
//				machineTrace.setDetails(detailsBySaleOrder);
//				
//				response.add(machineTrace);
//				
//			}
//			
//		} catch (Exception ex) {
//			String msg = ex.getMessage();
//			logger.error("Unable to get Traceability Details: " + msg);
//			ex.printStackTrace();
//
//			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Traceability Records: " + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//		
//		return new ResponseEntity(response, HttpStatus.OK);
//	}

	public ResponseEntity<?> traceAbility1(String saleOrder, String item, String product) {

		// FOR HEADER DETAILS
		List<Map<String, Object>> detailsBySaleOrder = new ArrayList<>();

		List<Object[]> machineTraceResponse;
		List<Map<String, Object>> rollConsumptionResponse = new ArrayList<>();
		List<Map<String, Object>> bleachConsumptionResponse = new ArrayList<>();
		List<Map<String, Object>> spulanceConsumptionResponse = new ArrayList<>();

		// SUPPLIER LIST
		List<String> supplierList = new ArrayList<>();
		List<String> rmBatchList = new ArrayList<>();

		List<PadPunchingMachineTraceResponse> machineList = new ArrayList<>();
		List<PadPunchingMachineTraceResponse> rollConsumptionList = new ArrayList<>();
		List<SplBaleTraceResponse> bleachConsumptionList = new ArrayList<>();
		Set<SplBaleTraceResponse> bleachConsumptionSet = new HashSet<>();
		List<SplBaleTraceResponse> spulanceConsumptionList = new ArrayList<>();
		Set<SplBaleTraceResponse> spulanceConsumptionSet = new HashSet<>();

		List<PadPunchingMachineTraceabilityResponse> response = new ArrayList<>();

		try {

			detailsBySaleOrder = productionDetailsRepository.getProductionResponseBySaleOrderItem(saleOrder, item,
					product);
			logger.info("**** !!!! Sale Order, Item, Order !!!!**** " + detailsBySaleOrder.size());

			for (Map<String, Object> temp : detailsBySaleOrder) {

				PadPunchingMachineTraceabilityResponse machineTrace = new PadPunchingMachineTraceabilityResponse();

				// Extract details from each sale order
				String productionOrder = (String) temp.get("orderNo");
				String poNumber = (String) temp.get("poNumber");
				String material = (String) temp.get("material");
				String productCode = (String) temp.get("product");
				String customerPO = (String) temp.get("customer");
				String productDesc = (String) temp.get("productDescription");
				String edge = (String) temp.get("edge");
				String batchNo = (String) temp.get("batchNo");
				BigDecimal gsm = (BigDecimal) temp.get("gsm");

				// Initialize lists for each production order
				machineList = new ArrayList<>();
				rollConsumptionList = new ArrayList<>();
				bleachConsumptionList = new ArrayList<>();

				spulanceConsumptionList = new ArrayList<>();

				// Fetch Machine Details by productionOrder
				machineTraceResponse = productionDetailsRepository.machinesListByOrder(productionOrder);
				logger.info("**** !!!! Machine Trace response size !!!! ****" + machineTraceResponse.size());

				for (Object[] machine : machineTraceResponse) {
					String machineName = (String) machine[2];
					BigDecimal bags = (BigDecimal) machine[1];
					BigDecimal boxes = (BigDecimal) machine[0];

					PadPunchingMachineTraceResponse machineData = new PadPunchingMachineTraceResponse();
					machineData.setBagPackQty(bags);
					machineData.setBoxPackQty(boxes);
					machineData.setMachine(machineName);

					machineList.add(machineData);
				}

				// Fetch Roll Consumption Details by productionOrder
				rollConsumptionResponse = productionDetailsRepository.fetchRollConsumptionByOrder(productionOrder);
				logger.info("**** !!!! Roll Consumption response size !!!! ****" + rollConsumptionResponse.size());

				for (Map<String, Object> roll : rollConsumptionResponse) {
					String rollNo = (String) roll.get("rollNo");
					Date prodDate = (Date) roll.get("prodDate");
					BigDecimal shiftId = (BigDecimal) roll.get("shiftId");
					String shaftNo = (String) roll.get("shaftNo");
					BigDecimal netWeight = (BigDecimal) roll.get("netWeight");

					// Format Date to String
					SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
					String dateString = formatter.format(prodDate);

					PadPunchingMachineTraceResponse rollData = new PadPunchingMachineTraceResponse();
					rollData.setRollNo(rollNo);
					rollData.setProdDate(dateString);
					rollData.setShiftId(shiftId);
					rollData.setShaftNo(shaftNo);
					rollData.setNetWeight(netWeight);

					rollConsumptionList.add(rollData);

					// Fetch baleNo details based on roll consumption
					List<String> baleNos = productionDetailsRepository.baleNoByOrder(productionOrder, dateString);
					logger.info("*** Bale No count ***" + baleNos.size());

//	                for (String baleNumber : baleNos) {
//
//	                    logger.info("*** Bale No ***" + baleNumber);
//
//	                    if (baleNumber.startsWith("B")) {
//
//	                        bleachConsumptionResponse = productionDetailsRepository.fetchBatchByBale(baleNumber);
//
//	                        for (Map<String, Object> bleachData : bleachConsumptionResponse) {
//
//	                            SplBaleTraceResponse baleResponse = new SplBaleTraceResponse();
//
//	                            BigDecimal batchNumber = (BigDecimal) bleachData.get("batch");
//	                            String batchNoString = String.valueOf(batchNumber);
//	                            String bmrNumber = (String) bleachData.get("bmrNumber");
//	                            BigDecimal netWeight1 = (BigDecimal) bleachData.get("netWeight");
//	                            
//	                            String weight = String.valueOf(netWeight1);
//
//	                            String laydownNumber = "";
//
//	                            if (bmrNumber != null && !bmrNumber.isEmpty()) {
//
//	                                laydownNumber = bleachBmrMappingRepository.getLaydownByBmr(bmrNumber);
//	                                supplierList = bleachBmrMappingRepository.getSupplierByLaydown(laydownNumber);
//	                                rmBatchList = bleachBmrMappingRepository.getPHByLaydown(laydownNumber);
//	                                baleResponse.setLaydownNumber(laydownNumber);
//	                                baleResponse.setPhNumber(rmBatchList);
//	                                baleResponse.setSupplier(supplierList);
//
//	                            }
//
//	                            baleResponse.setBaleNo(baleNumber);
//	                            baleResponse.setBatchNo(batchNoString);
//	                            baleResponse.setBmrNumber(bmrNumber);
//	                            baleResponse.setNetWeight(weight);
//
//	                            bleachConsumptionList.add(baleResponse);
//	                        }
//
//	                        logger.info("*** Response Found ****" + bleachConsumptionResponse.size());
//
//	                    } else if (baleNumber.startsWith("R")) {
//	                        // Fetch RP Cotton details
//	                        // Add code to handle RP Cotton details similar to AB Cotton
//	                    }
//	                }

					for (String baleNumber : baleNos) {
						logger.info("*** Processing Bale No ***" + baleNumber);

						if (baleNumber.startsWith("B")) {
							bleachConsumptionResponse = productionDetailsRepository.fetchBatchByBale(baleNumber);

							// Debug: Log the size of bleachConsumptionResponse and its contents
							logger.info("**** Bleach Consumption Response Size for Bale No " + baleNumber + " : "
									+ bleachConsumptionResponse.size());
							logger.info("**** Bleach Consumption Response Data: " + bleachConsumptionResponse);

							for (Map<String, Object> bleachData : bleachConsumptionResponse) {
								SplBaleTraceResponse baleResponse = new SplBaleTraceResponse();

								BigDecimal batchNumber = (BigDecimal) bleachData.get("batch");
								String batchNoString = String.valueOf(batchNumber);
								String bmrNumber = (String) bleachData.get("bmrNumber");
								BigDecimal netWeight1 = (BigDecimal) bleachData.get("netWeight");
								String weight = String.valueOf(netWeight1);

								String laydownNumber = "";

								if (bmrNumber != null && !bmrNumber.isEmpty()) {
									laydownNumber = bleachBmrMappingRepository.getLaydownByBmr(bmrNumber);
									supplierList = bleachBmrMappingRepository.getSupplierByLaydown(laydownNumber);
									rmBatchList = bleachBmrMappingRepository.getPHByLaydown(laydownNumber);
									baleResponse.setLaydownNumber(laydownNumber);
									baleResponse.setPhNumber(rmBatchList);
									baleResponse.setSupplier(supplierList);
								}

								baleResponse.setBaleNo(baleNumber);
								baleResponse.setBatchNo(batchNoString);
								baleResponse.setBmrNumber(bmrNumber);
								baleResponse.setNetWeight(weight);

								bleachConsumptionSet.add(baleResponse);
//	                            bleachConsumptionList.add(baleResponse);
							}

							logger.info("*** Bleach Consumption List Size After Processing Bale No " + baleNumber
									+ " : " + bleachConsumptionSet.size());
						} else if (baleNumber.startsWith("R")) {

							logger.info("**** R Starting");

							spulanceConsumptionResponse = productionDetailsRepository.baleByOrderOnly(baleNumber);

							for (Map<String, Object> spulanceData : spulanceConsumptionResponse) {

								SplBaleTraceResponse spulanceResponse = new SplBaleTraceResponse();

//	                    		BigDecimal batchNumber = (BigDecimal) spulanceData.get("batch");
//	                    		String batchNoString = String.valueOf(batchNumber);
//	                            String bmrNumber = (String) spulanceData.get("bmrNumber");
								BigDecimal netWeight1 = (BigDecimal) spulanceData.get("netWeight");
								String weight = String.valueOf(netWeight1);

								spulanceResponse.setBaleNo(baleNumber);
//	                            spulanceResponse.setBatchNo(batchNoString);
								spulanceResponse.setBmrNumber(batchNo);
								spulanceResponse.setNetWeight(weight);

								spulanceConsumptionSet.add(spulanceResponse);

							}

						}
					}

				}

				// Set Machine, Roll, Bleach, and Spulance lists into response
				machineTrace.setDetails(detailsBySaleOrder);
				machineTrace.setMachineList(machineList);
				machineTrace.setRollConsumption(rollConsumptionList);
				machineTrace.setBleachConsumption(bleachConsumptionSet);
				machineTrace.setSpulanceConsumption(spulanceConsumptionSet); // Add Spulance consumption details if
																				// needed

				// Add to the main response
				response.add(machineTrace);
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Traceability Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Traceability Records: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// DRY GOODS TRACEABILITY
	public ResponseEntity<?> dryGoodsTraceability(String saleOrder, String item, String product) {
		// FOR HEADER DETAILS
		List<Map<String, Object>> detailsBySaleOrder = new ArrayList<>();
		List<Object[]> machineTraceResponse;
		List<PadPunchingMachineTraceResponse> machineList = new ArrayList<>();
		// SLIVER MAKING
		List<Map<String, Object>> sliverMakingList = new ArrayList<>();
		// AB COTTON
		List<Map<String, Object>> bleachBaleList = new ArrayList<>();
		List<Map<String, Object>> bleachBmrList = new ArrayList<>();
		List<String> phNumberList;
		List<String> supplierList;
		Set<SplBaleTraceResponse> spulanceResponse = new HashSet<>();
		// FULL RESPONSE
		List<DryGoodsTraceabilityResponse> goodsResponse = new ArrayList<>();
		DryGoodsTraceabilityResponse goodsTrace = new DryGoodsTraceabilityResponse();
		try {
			detailsBySaleOrder = productionDetailsRepository.getProductionResponseBySaleOrderItemDryGoods(saleOrder,
					item, product);
			logger.info("**** !!!! Sale Order, Item, Order !!!!**** " + detailsBySaleOrder.size());

			for (Map<String, Object> temp : detailsBySaleOrder) {

				PadPunchingMachineTraceabilityResponse machineTrace = new PadPunchingMachineTraceabilityResponse();

				// Extract details from each sale order
				String productionOrder = (String) temp.get("orderNo");
				String poNumber = (String) temp.get("poNumber");
				String material = (String) temp.get("material");
				String productCode = (String) temp.get("product");
				String customerPO = (String) temp.get("customer");
				String productDesc = (String) temp.get("productDescription");
				String edge = (String) temp.get("edge");
				String batchNo = (String) temp.get("batchNo");
				BigDecimal gsm = (BigDecimal) temp.get("gsm");

				// FETCH SLIVER MAKING BY ORDER
				logger.info("*** order ***" + productionOrder);
				sliverMakingList = productionDetailsRepository.sliverMakingDetails(productionOrder);
				logger.info("*** Sliver Making List ****" + sliverMakingList.size());
				// FETCH AB COTTON DETAILS
				bleachBaleList = productionDetailsRepository.bleachBaleByOrder(productionOrder);
				for (Map<String, Object> bleachdata : bleachBaleList) {
					String baleNo = (String) bleachdata.get("bale");
					bleachBmrList = productionDetailsRepository.fetchBatchByBale(baleNo);
					SplBaleTraceResponse spulanceResp = new SplBaleTraceResponse();
					for (Map<String, Object> post : bleachBmrList) {
						spulanceResp.setBaleNo(baleNo);
						String batchNumber = String.valueOf(post.get("batch"));
						BigDecimal weight = (BigDecimal) post.get("netWeight");
						String weightS = String.valueOf(weight);
						String bmr = (String) post.get("bmrNumber");
						logger.info("**** batchNo" + batchNumber);
						String laydownNumber = bleachBmrMappingRepository.getLaydownByBmr(bmr);

//								phNumberList = BleachBmrLaydownMappingRepository.getPHByLaydownDate(laydownNumber, dateString);
						phNumberList = bleachBmrMappingRepository.getPHByLaydownDate(laydownNumber);
						supplierList = bleachBmrMappingRepository.getSupplierByLaydown(laydownNumber);
						spulanceResp.setBatchNo(batchNumber);
						spulanceResp.setBmrNumber(bmr);
						spulanceResp.setNetWeight(weightS);
						spulanceResp.setLaydownNumber(laydownNumber);
						spulanceResp.setOrderNumber(productionOrder);
						spulanceResp.setPhNumber(phNumberList);
						spulanceResp.setSupplier(supplierList);
						spulanceResponse.add(spulanceResp);
					}
				}

				goodsTrace.setDetails(detailsBySaleOrder);
				goodsTrace.setSliverList(sliverMakingList);
				goodsTrace.setBleachConsumption(spulanceResponse);
			}
		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Traceability Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Traceability Records: " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(goodsTrace, HttpStatus.OK);
	}

	private boolean isEmpty(String str) {
		return str == null || str.trim().isEmpty();
	}

	public ResponseEntity<?> traceAbility1(String saleOrder, String item, String product, String manDate, String year,
			String day, String shift) {

		// VALIDATIONS

//			    if ((!isEmpty(saleOrder) && !isEmpty(item)) && !isEmpty(manDate)) {
//			        return new ResponseEntity<>(new ApiResponse(false, "Either saleOrder and item or manufacturing date must be provided, not both"),
//			                HttpStatus.BAD_REQUEST);
//			    } else if ((isEmpty(saleOrder) || isEmpty(item)) && isEmpty(manDate)) {
//			        return new ResponseEntity<>(new ApiResponse(false, "Either saleOrder and item or manufacturing date must be provided"),
//			                HttpStatus.BAD_REQUEST);
//			    } else if (year != 0 && day != 0 && shift != 0) {
//			        if (isEmpty(product)) {
//			            return new ResponseEntity<>(new ApiResponse(false, "Product must be provided."),
//			                    HttpStatus.BAD_REQUEST);
//			        }
//			    } else {
//			    	return new ResponseEntity(new ApiResponse(false, "please provide valid inputs"), HttpStatus.BAD_REQUEST);
//			    }

		if (!isEmpty(saleOrder) && !isEmpty(item)) {
			if (!isEmpty(manDate)) {
				return new ResponseEntity<>(new ApiResponse(false,
						"If saleOrder and item are provided, manufacturing date or year, day, and shift should not be provided."),
						HttpStatus.BAD_REQUEST);
			}
			if (isEmpty(product)) {
				return new ResponseEntity<>(new ApiResponse(false, "Product must be provided."),
						HttpStatus.BAD_REQUEST);
			}

			// Proceed with logic for SaleOrder and Item
			// Your existing code to fetch and process data...

		} else if (!isEmpty(manDate)) {
			// VALIDATION 2: Check for manufacturing date
			if (isEmpty(product)) {
				return new ResponseEntity<>(new ApiResponse(false, "Product must be provided."),
						HttpStatus.BAD_REQUEST);
			}

			// Validate manufacturing date format
//			        try {
//			            LocalDate.parse(manDate); // Validate date format
//			        } catch (DateTimeParseException e) {
//			            return new ResponseEntity<>(new ApiResponse(false, "Invalid manufacturing date format. Expected format: YYYY-MM-DD."),
//			                    HttpStatus.BAD_REQUEST);
//			        }

			// Proceed with logic for manufacturing date
			// Your existing code to fetch and process data...

		} else if (!isEmpty(year) && !isEmpty(day) && !isEmpty(shift)) {
			// VALIDATION 3: Check for year, day, and shift
			if (isEmpty(product)) {
				return new ResponseEntity<>(new ApiResponse(false, "Product must be provided."),
						HttpStatus.BAD_REQUEST);
			}

			// Proceed with logic for year, day, and shift
			// Your existing code to fetch and process data...

		} else {
			// VALIDATION 4: Handle missing required parameters
			return new ResponseEntity<>(new ApiResponse(false,
					"Invalid input parameters. Please provide either saleOrder and item, or manDate, or year, day, and shift."),
					HttpStatus.BAD_REQUEST);
		}

		// FOR HEADER DETAILS
		List<Map<String, Object>> detailsBySaleOrder = new ArrayList<>();

		List<Object[]> machineTraceResponse;
		List<Map<String, Object>> rollConsumptionResponse = new ArrayList<>();
		List<Map<String, Object>> bleachConsumptionResponse = new ArrayList<>();
		List<Map<String, Object>> spulanceConsumptionResponse = new ArrayList<>();

		// SUPPLIER LIST
		List<String> supplierList = new ArrayList<>();
		List<String> rmBatchList = new ArrayList<>();

		List<PadPunchingMachineTraceResponse> machineList = new ArrayList<>();
		List<PadPunchingMachineTraceResponse> rollConsumptionList = new ArrayList<>();
		List<SplBaleTraceResponse> bleachConsumptionList = new ArrayList<>();
		Set<SplBaleTraceResponse> bleachConsumptionSet = new HashSet<>();
		List<SplBaleTraceResponse> spulanceConsumptionList = new ArrayList<>();
		Set<SplBaleTraceResponse> spulanceConsumptionSet = new HashSet<>();

		List<PadPunchingMachineTraceabilityResponse> response = new ArrayList<>();

		try {

//			    	if(!"".equals(manDate) || !manDate.equals(null)) {
//			    		
//			    		detailsBySaleOrder = productionDetailsRepository.getProductionResponsebymANDAte(manDate, product);
//			    		
//			    	} else if(!"".equals(saleOrder) || !saleOrder.equals(null) && !"".equals(item) || !item.equals(null)) {
//			    		
//			    		detailsBySaleOrder = productionDetailsRepository.getProductionResponseBySaleOrderItem(saleOrder, item, product);
//			    	}

			if (!isEmpty(manDate)) {
				detailsBySaleOrder = productionDetailsRepository.getProductionResponsebymANDAte(manDate, product);

			} else if (!isEmpty(saleOrder) && !isEmpty(item)) {
				detailsBySaleOrder = productionDetailsRepository.getProductionResponseBySaleOrderItem(saleOrder, item,
						product);
			} else {

				Long yearVal = Long.valueOf(year);
				Long dayVal = Long.valueOf(day);
				Long shiftVal = Long.valueOf(shift);
				String packDate = productionDetailsRepository.convertDateFromJulian(yearVal, dayVal);
				logger.info("**** Date *****" + packDate);
				detailsBySaleOrder = productionDetailsRepository.getProductionResponsebyJulian(packDate, shiftVal,
						product);

//			        	String packDate = productionDetailsRepository.convertDateFromJulian(year, day);
//			        	
//			        	logger.info("**** Date *****" + packDate);
//			        	
//			        	detailsBySaleOrder = productionDetailsRepository.getProductionResponsebyJulian(packDate, shift, product);
			}

			logger.info("**** !!!! Sale Order, Item, Order !!!!**** " + detailsBySaleOrder.size());

			for (Map<String, Object> temp : detailsBySaleOrder) {

				PadPunchingMachineTraceabilityResponse machineTrace = new PadPunchingMachineTraceabilityResponse();

				// Extract details from each sale order
				String productionOrder = (String) temp.get("orderNo");
				String poNumber = (String) temp.get("poNumber");
				String material = (String) temp.get("material");
				String productCode = (String) temp.get("product");
				String customerPO = (String) temp.get("customer");
				String productDesc = (String) temp.get("productDescription");
				String edge = (String) temp.get("edge");
				String batchNo = (String) temp.get("batchNo");
				BigDecimal gsm = (BigDecimal) temp.get("gsm");

				// Initialize lists for each production order
				machineList = new ArrayList<>();
				rollConsumptionList = new ArrayList<>();
				bleachConsumptionList = new ArrayList<>();

				spulanceConsumptionList = new ArrayList<>();

				// Fetch Machine Details by productionOrder
				machineTraceResponse = productionDetailsRepository.machinesListByOrder(productionOrder);
				logger.info("**** !!!! Machine Trace response size !!!! ****" + machineTraceResponse.size());

				for (Object[] machine : machineTraceResponse) {
					String machineName = (String) machine[2];
					BigDecimal bags = (BigDecimal) machine[1];
					BigDecimal boxes = (BigDecimal) machine[0];

					PadPunchingMachineTraceResponse machineData = new PadPunchingMachineTraceResponse();
					machineData.setBagPackQty(bags);
					machineData.setBoxPackQty(boxes);
					machineData.setMachine(machineName);

					machineList.add(machineData);
				}

				// Fetch Roll Consumption Details by productionOrder
				rollConsumptionResponse = productionDetailsRepository.fetchRollConsumptionByOrder(productionOrder);
				logger.info("**** !!!! Roll Consumption response size !!!! ****" + rollConsumptionResponse.size());

				for (Map<String, Object> roll : rollConsumptionResponse) {
					String rollNo = (String) roll.get("rollNo");
					Date prodDate = (Date) roll.get("prodDate");
					BigDecimal shiftId = (BigDecimal) roll.get("shiftId");
					String shaftNo = (String) roll.get("shaftNo");
					BigDecimal netWeight = (BigDecimal) roll.get("netWeight");

					// Format Date to String
					SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
					String dateString = formatter.format(prodDate);

					PadPunchingMachineTraceResponse rollData = new PadPunchingMachineTraceResponse();
					rollData.setRollNo(rollNo);
					rollData.setProdDate(dateString);
					rollData.setShiftId(shiftId);
					rollData.setShaftNo(shaftNo);
					rollData.setNetWeight(netWeight);

					rollConsumptionList.add(rollData);

					// Fetch baleNo details based on roll consumption
					List<String> baleNos = productionDetailsRepository.baleNoByOrder(productionOrder, dateString);
					logger.info("*** Bale No count ***" + baleNos.size());

//			                for (String baleNumber : baleNos) {
					//
//			                    logger.info("*** Bale No ***" + baleNumber);
					//
//			                    if (baleNumber.startsWith("B")) {
					//
//			                        bleachConsumptionResponse = productionDetailsRepository.fetchBatchByBale(baleNumber);
					//
//			                        for (Map<String, Object> bleachData : bleachConsumptionResponse) {
					//
//			                            SplBaleTraceResponse baleResponse = new SplBaleTraceResponse();
					//
//			                            BigDecimal batchNumber = (BigDecimal) bleachData.get("batch");
//			                            String batchNoString = String.valueOf(batchNumber);
//			                            String bmrNumber = (String) bleachData.get("bmrNumber");
//			                            BigDecimal netWeight1 = (BigDecimal) bleachData.get("netWeight");
//			                            
//			                            String weight = String.valueOf(netWeight1);
					//
//			                            String laydownNumber = "";
					//
//			                            if (bmrNumber != null && !bmrNumber.isEmpty()) {
					//
//			                                laydownNumber = bleachBmrMappingRepository.getLaydownByBmr(bmrNumber);
//			                                supplierList = bleachBmrMappingRepository.getSupplierByLaydown(laydownNumber);
//			                                rmBatchList = bleachBmrMappingRepository.getPHByLaydown(laydownNumber);
//			                                baleResponse.setLaydownNumber(laydownNumber);
//			                                baleResponse.setPhNumber(rmBatchList);
//			                                baleResponse.setSupplier(supplierList);
					//
//			                            }
					//
//			                            baleResponse.setBaleNo(baleNumber);
//			                            baleResponse.setBatchNo(batchNoString);
//			                            baleResponse.setBmrNumber(bmrNumber);
//			                            baleResponse.setNetWeight(weight);
					//
//			                            bleachConsumptionList.add(baleResponse);
//			                        }
					//
//			                        logger.info("*** Response Found ****" + bleachConsumptionResponse.size());
					//
//			                    } else if (baleNumber.startsWith("R")) {
//			                        // Fetch RP Cotton details
//			                        // Add code to handle RP Cotton details similar to AB Cotton
//			                    }
//			                }

					for (String baleNumber : baleNos) {
						logger.info("*** Processing Bale No ***" + baleNumber);

						if (baleNumber.startsWith("B")) {
							bleachConsumptionResponse = productionDetailsRepository.fetchBatchByBale(baleNumber);

							// Debug: Log the size of bleachConsumptionResponse and its contents
							logger.info("**** Bleach Consumption Response Size for Bale No " + baleNumber + " : "
									+ bleachConsumptionResponse.size());
							logger.info("**** Bleach Consumption Response Data: " + bleachConsumptionResponse);

							for (Map<String, Object> bleachData : bleachConsumptionResponse) {
								SplBaleTraceResponse baleResponse = new SplBaleTraceResponse();

								BigDecimal batchNumber = (BigDecimal) bleachData.get("batch");
								String batchNoString = String.valueOf(batchNumber);
								String bmrNumber = (String) bleachData.get("bmrNumber");
								BigDecimal netWeight1 = (BigDecimal) bleachData.get("netWeight");
								String weight = String.valueOf(netWeight1);

								String laydownNumber = "";

								if (bmrNumber != null && !bmrNumber.isEmpty()) {
									laydownNumber = bleachBmrMappingRepository.getLaydownByBmr(bmrNumber);
									supplierList = bleachBmrMappingRepository.getSupplierByLaydown(laydownNumber);
									rmBatchList = bleachBmrMappingRepository.getPHByLaydown(laydownNumber);
									baleResponse.setLaydownNumber(laydownNumber);
									baleResponse.setPhNumber(rmBatchList);
									baleResponse.setSupplier(supplierList);
								}

								baleResponse.setBaleNo(baleNumber);
								baleResponse.setBatchNo(batchNoString);
								baleResponse.setBmrNumber(bmrNumber);
								baleResponse.setNetWeight(weight);

								bleachConsumptionSet.add(baleResponse);
//			                            bleachConsumptionList.add(baleResponse);
							}

							logger.info("*** Bleach Consumption List Size After Processing Bale No " + baleNumber
									+ " : " + bleachConsumptionSet.size());
						} else if (baleNumber.startsWith("R")) {

							logger.info("**** R Starting");

							spulanceConsumptionResponse = productionDetailsRepository.baleByOrderOnly(baleNumber);

							for (Map<String, Object> spulanceData : spulanceConsumptionResponse) {

								SplBaleTraceResponse spulanceResponse = new SplBaleTraceResponse();

//			                    		BigDecimal batchNumber = (BigDecimal) spulanceData.get("batch");
//			                    		String batchNoString = String.valueOf(batchNumber);
//			                            String bmrNumber = (String) spulanceData.get("bmrNumber");
								BigDecimal netWeight1 = (BigDecimal) spulanceData.get("netWeight");
								String weight = String.valueOf(netWeight1);

								spulanceResponse.setBaleNo(baleNumber);
//			                            spulanceResponse.setBatchNo(batchNoString);
								spulanceResponse.setBmrNumber(batchNo);
								spulanceResponse.setNetWeight(weight);

								spulanceConsumptionSet.add(spulanceResponse);

							}

						}
					}

				}

				// Set Machine, Roll, Bleach, and Spulance lists into response
				machineTrace.setDetails(detailsBySaleOrder);
				machineTrace.setMachineList(machineList);
				machineTrace.setRollConsumption(rollConsumptionList);
				machineTrace.setBleachConsumption(bleachConsumptionSet);
				machineTrace.setSpulanceConsumption(spulanceConsumptionSet); // Add Spulance consumption details if
																				// needed

				// Add to the main response
				response.add(machineTrace);
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Traceability Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Traceability Records: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// DRY GOODS TRACEABILITY

	public ResponseEntity<?> dryGoodsTraceability(String saleOrder, String item, String product, String manDate,
			String year, String day, String shift) {

		// FOR HEADER DETAILS
		List<Map<String, Object>> detailsBySaleOrder = new ArrayList<>();

		List<Object[]> machineTraceResponse;
		List<PadPunchingMachineTraceResponse> machineList = new ArrayList<>();

		// SLIVER MAKING

		List<Map<String, Object>> sliverMakingList = new ArrayList<>();

		// AB COTTON
		List<Map<String, Object>> bleachBaleList = new ArrayList<>();
		List<Map<String, Object>> bleachBmrList = new ArrayList<>();
		List<String> phNumberList;
		List<String> supplierList;

		Set<SplBaleTraceResponse> spulanceResponse = new HashSet<>();

		// FULL RESPONSE

		List<DryGoodsTraceabilityResponse> goodsResponse = new ArrayList<>();

		DryGoodsTraceabilityResponse goodsTrace = new DryGoodsTraceabilityResponse();

		if (!isEmpty(saleOrder) && !isEmpty(item)) {
			if (!isEmpty(manDate)) {
				return new ResponseEntity<>(new ApiResponse(false,
						"If saleOrder and item are provided, manufacturing date or year, day, and shift should not be provided."),
						HttpStatus.BAD_REQUEST);
			}
			if (isEmpty(product)) {
				return new ResponseEntity<>(new ApiResponse(false, "Product must be provided."),
						HttpStatus.BAD_REQUEST);
			}

			// Proceed with logic for SaleOrder and Item
			// Your existing code to fetch and process data...

		} else if (!isEmpty(manDate)) {
			// VALIDATION 2: Check for manufacturing date
			if (isEmpty(product)) {
				return new ResponseEntity<>(new ApiResponse(false, "Product must be provided."),
						HttpStatus.BAD_REQUEST);
			}

			// Validate manufacturing date format
//			        try {
//			            LocalDate.parse(manDate); // Validate date format
//			        } catch (DateTimeParseException e) {
//			            return new ResponseEntity<>(new ApiResponse(false, "Invalid manufacturing date format. Expected format: YYYY-MM-DD."),
//			                    HttpStatus.BAD_REQUEST);
//			        }

			// Proceed with logic for manufacturing date
			// Your existing code to fetch and process data...

		} else if (!isEmpty(shift) && !isEmpty(day) && !isEmpty(year)) {
			// VALIDATION 3: Check for year, day, and shift
			if (isEmpty(product)) {
				return new ResponseEntity<>(new ApiResponse(false, "Product must be provided."),
						HttpStatus.BAD_REQUEST);
			}

		} else {
			// VALIDATION 4: Handle missing required parameters
			return new ResponseEntity<>(new ApiResponse(false,
					"Invalid input parameters. Please provide either saleOrder and item, or manDate, or year, day, and shift."),
					HttpStatus.BAD_REQUEST);
		}

		try {

			logger.info("**** product ****" + product);

//					detailsBySaleOrder = productionDetailsRepository.getProductionResponseBySaleOrderItemDryGoods(saleOrder, item, product);
//			        logger.info("**** !!!! Sale Order, Item, Order !!!!**** " + detailsBySaleOrder.size());

			if (!isEmpty(manDate)) {
				detailsBySaleOrder = productionDetailsRepository.getProductionResponseByManDateDryGoods(manDate,
						product);

			} else if (!isEmpty(saleOrder) && !isEmpty(item)) {
				detailsBySaleOrder = productionDetailsRepository.getProductionResponseBySaleOrderItemDryGoods(saleOrder,
						item, product);
			} else {

				Long yearVal = Long.valueOf(year);
				Long dayVal = Long.valueOf(day);
				Long shiftVal = Long.valueOf(shift);
				String packDate = productionDetailsRepository.convertDateFromJulian(yearVal, dayVal);
				logger.info("**** Date *****" + packDate);
				detailsBySaleOrder = productionDetailsRepository.getProductionResponseByJulianDryGoods(packDate,
						shiftVal, product);

			}

			for (Map<String, Object> temp : detailsBySaleOrder) {

				PadPunchingMachineTraceabilityResponse machineTrace = new PadPunchingMachineTraceabilityResponse();

				// Extract details from each sale order
				String productionOrder = (String) temp.get("orderNo");
				String poNumber = (String) temp.get("poNumber");
				String material = (String) temp.get("material");
				String productCode = (String) temp.get("product");
				String customerPO = (String) temp.get("customer");
				String productDesc = (String) temp.get("productDescription");
				String edge = (String) temp.get("edge");
				String batchNo = (String) temp.get("batchNo");
				BigDecimal gsm = (BigDecimal) temp.get("gsm");

				// FETCH SLIVER MAKING BY ORDER

				logger.info("order" + productionOrder);

				sliverMakingList = productionDetailsRepository.sliverMakingDetails(productionOrder);

				logger.info("*** Sliver Size ****" + sliverMakingList.size());

				// FETCH AB COTTON DETAILS

				bleachBaleList = productionDetailsRepository.bleachBaleByOrder(productionOrder);

				for (Map<String, Object> bleachdata : bleachBaleList) {

					String baleNo = (String) bleachdata.get("bale");

					bleachBmrList = productionDetailsRepository.fetchBatchByBale(baleNo);

					SplBaleTraceResponse spulanceResp = new SplBaleTraceResponse();
					for (Map<String, Object> post : bleachBmrList) {

						spulanceResp.setBaleNo(baleNo);

						String batchNumber = String.valueOf(post.get("batch"));
						String bmr = (String) post.get("bmrNumber");

						String laydownNumber = bleachBmrMappingRepository.getLaydownByBmr(bmr);

//								phNumberList = BleachBmrLaydownMappingRepository.getPHByLaydownDate(laydownNumber, dateString);
						phNumberList = bleachBmrMappingRepository.getPHByLaydownDate(laydownNumber);
						supplierList = bleachBmrMappingRepository.getSupplierByLaydown(laydownNumber);

						spulanceResp.setBatchNo(batchNo);
						spulanceResp.setBmrNumber(bmr);
						spulanceResp.setLaydownNumber(laydownNumber);
						spulanceResp.setPhNumber(phNumberList);
						spulanceResp.setSupplier(supplierList);

						spulanceResponse.add(spulanceResp);
					}

				}

				goodsTrace.setDetails(detailsBySaleOrder);
				goodsTrace.setSliverList(sliverMakingList);
				goodsTrace.setBleachConsumption(spulanceResponse);

			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Traceability Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Traceability Records: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(goodsTrace, HttpStatus.OK);
	}

	// GET PRINT API FOR BMR
		public ResponseEntity<?> punchingPrint(String batchNo) {
			List<PadPunchingBmrRequest> bmrPrintList = new ArrayList<>();
			PadPunchingBmrRequest bmrPrintRequest = new PadPunchingBmrRequest();
			try {

				List<BudsBmrRework> reworkList = reworkRepository.reworkListByBmrNumber(batchNo);
				
				// 1. PROD DETAILS
				List<PunchingBmrProductionDetails> prodDetailsList = productionDetailsRepository
						.productionDetailsByOrder(batchNo);
//				printValidations(prodDetailsList, "Production Details");
				// 3. PACKING MATERIAL LIST
				List<BMR03GoodsPackingMeterialIssue> packingMaterialList = bmr03goodspackingmeterialissuerepository.getDetails25(batchNo);
//				printValidations(packingMaterialList, "Packing Material");
				// 5. ANNEXURE
				List<PunchingBmrEquipmentDetails> equipmentDetails = equipmentDetailsRepository
						.getEquipmentDetailsByOrder(batchNo);
//				printValidations(equipmentDetails, "Annexure");
				// 6. VERIFICATION OF RECORDS
				List<PunchingBmrVerificationOfRecords> verificationRecords = verificationOfRecordsRepository
						.getVerificationOfRecordsByBatch(batchNo);
//				printValidations(verificationRecords, "Verification Of Records");
				// 7. MAN STEPS
				List<PunchingBmrManufacturingSteps> manufacturerSteps = manufacturingStepsRepository
						.manufacturingStepsByBatchNo(batchNo);
//				printValidations(manufacturerSteps, "Manufacturer Steps");
				// 9. STOPPAGE
				List<PunchingBmrStoppageHeader> stoppage = stoppageHeaderRepository.fetchStoppageByBatchNo(batchNo);
//				printValidations(stoppage, "Stoppage/Process Delay");
				// 10. ENCLOSURE LIST
				List<PunchingBmrEnclosureList> enclosureList = enclosureListRepository.getEnclosureListByOrder(batchNo);
//				printValidations(enclosureList, "Enclosure List");
	 
				// 11. PROCESS DEVIATION
				List<PunchingBmrProcessDeviationRecordHeader> deviationRecord = deviationRecordHeaderRepository
						.getDeviationRecordByOrder(batchNo);
	 
//				printValidations(deviationRecord, "Process Deviation Record");
				// 12. POST PRODUCTION
				List<PunchingBmrPostProductionReview> postProdList = postProductionRepository
						.postproductionReviewByOrder(batchNo);
//				printValidations(postProdList, "Post Production Review");
				// 13. QA RELEASE
				List<PunchingBmrQualityReleaseHeader> qualityRelease = qualityReleaseHeadRepository
						.getQualityReleaseHeaderByOrder(batchNo);
//				printValidations(qualityRelease, "Quality Release");
				// 14. PRODUCT RELEASE
				List<PunchingBmrProductRelease> productRelease = bmrProductReleaseRepository
						.productReleaseListByBatchNo(batchNo);
//				printValidations(productRelease, "Product Release");
				// 01. PRODUCTION DETAILS
				PunchingBmrProductionDetails productionDetails = productionDetailsRepository
						.fetchProductionByBatch(batchNo);

				String manStartDate = "";
				String manEndDate = "";
				String orderNumber = "";

				if(productionDetails == null) {
					 return new ResponseEntity(new ApiResponse(false, "Production Details not yet submitted"), HttpStatus.BAD_REQUEST);
				} else {
					manStartDate = productionDetails.getManufactureStartDate();
					manEndDate = productionDetails.getManufactureEndDate();
					orderNumber = productionDetails.getOrderNumber();
				}

				Map<String, String> productRecMap = reconillation(batchNo, orderNumber, manStartDate, manEndDate);
				List<DailyProductionDetailsBmrResponse> dailyprodResponse = productionDetailsDaily(orderNumber,
						manStartDate, manEndDate);
				bmrPrintRequest.setProductionDetails(prodDetailsList);
				bmrPrintRequest.setPackingMaterial(packingMaterialList);
				bmrPrintRequest.setDeviationRecord(deviationRecord);
				bmrPrintRequest.setEnclosureList(enclosureList);
				bmrPrintRequest.setEquipmentDetails(equipmentDetails);
				bmrPrintRequest.setVerificationOfRecords(verificationRecords);
				bmrPrintRequest.setManufactureSteps(manufacturerSteps);
				bmrPrintRequest.setPostProductionReview(postProdList);
				bmrPrintRequest.setStoppage(stoppage);
				bmrPrintRequest.setQualityRelease(qualityRelease);
				bmrPrintRequest.setProductRelease(productRelease);
				bmrPrintRequest.setReconillation(productRecMap);
				bmrPrintRequest.setDailyProductionDetailsBmrResponses(dailyprodResponse);
				bmrPrintRequest.setReworkList(reworkList);
				bmrPrintList.add(bmrPrintRequest);
			} catch (Exception ex) {
				String msg = ex.getMessage();
				logger.error("Unable to get Punching Details for print : " + msg);
				ex.printStackTrace();
	 
				return new ResponseEntity<>(new ApiResponse(false, "Failed to get Punching Details for print : " + msg),
						HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity(bmrPrintList, HttpStatus.OK);
		}
		
		
		
	public Map<String, String> reconillation(String batchNo, String order, String from_date, String to_date) {
		Map<String, String> productRecon = new HashMap<>();
		try {
			// Fetch input quantity, handle null by defaulting to BigDecimal.ZERO
			BigDecimal inputQuantity = productionDetailsRepository.inputQuantity(order, from_date, to_date);
			if (inputQuantity == null) {
				inputQuantity = BigDecimal.ZERO;
				logger.warn("Input Quantity not found, defaulting to 0");
			}
			// Fetch output rows
			List<Object[]> outputRows = productionDetailsRepository.outputQuantityQuery(order, from_date, to_date);
			BigDecimal outputString = BigDecimal.ZERO;
			// Sum output quantities, handle potential nulls in the result set
			for (Object[] resp : outputRows) {
				BigDecimal fbag = (BigDecimal) resp[2];
				BigDecimal noc = (BigDecimal) resp[3];
				if (fbag != null && noc != null) {
					outputString = outputString.add(fbag.multiply(noc));
				} else {
					logger.warn("Null value encountered in output rows: fbag or noc is null");
				}
			}
			logger.info("**** Output Rows Count: " + outputRows.size());
			BigDecimal yield = BigDecimal.ZERO;
			// Calculate yield only if both input and output are greater than zero
			if (inputQuantity.compareTo(BigDecimal.ZERO) > 0 && outputString.compareTo(BigDecimal.ZERO) > 0) {
				yield = outputString.divide(inputQuantity, 4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));
			} else {
				logger.warn("Cannot calculate yield, inputQuantity or outputString is invalid.");
			}
			BigDecimal orderDecimal = new BigDecimal(order);
			// Store results in productRecon map
			productRecon.put("input", inputQuantity.toString());
			productRecon.put("output", outputString.toString());
			productRecon.put("yield", yield.toString());
			productRecon.put("order", orderDecimal.toString());
			productRecon.put("batchNo", batchNo);
		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to Get Production Reconciliation Details: " + msg);
			ex.printStackTrace();

		}
		return productRecon;
	}

	
	// CHECK PRINT VALIDATION - ALL TABS COMPLETED ONLY ABLE TO PRINT
	public void printValidations(List<?> list, String listName) throws Exception {
		if (list == null || list.isEmpty()) {
			throw new Exception(listName + " not yet submitted. please check !!!");
		}
	}
		
		
	public List<DailyProductionDetailsBmrResponse> productionDetailsDaily(String order, String fromDate,
			String toDate) {
		List<DailyProductionDetailsBmrResponse> productionDetailsList = new ArrayList<>();
		List<Object[]> productionDetailsObjectList = new ArrayList<>();
		try {
//					productionDetailsList = qualityReleaseHeadRepository.getProductionDetailsByDateFields(fromDate, toDate);
			productionDetailsObjectList = qualityReleaseHeadRepository.productionDetailsSAP(fromDate, toDate, order);
			DailyProductionDetailsBmrResponse respone = new DailyProductionDetailsBmrResponse();
			for (Object[] details : productionDetailsObjectList) {
				respone.setPackdate((Date) details[0]);
				respone.setShiftId((BigDecimal) details[1]);
				respone.setJulianday((String) details[2]);
				respone.setMachine((String) details[3]);
				respone.setOrderNo((String) details[4]);
				respone.setNcb((BigDecimal) details[5]);
				respone.setNoc((BigDecimal) details[6]);
				respone.setBags((BigDecimal) details[7]);
				respone.setPoNumber((String) details[8]);
				respone.setMaterial((String) details[9]);
				productionDetailsList.add(respone);
			}
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Daily production Details" + msg);
			ex.printStackTrace();

		}
		return productionDetailsList;
	}

	// Siva

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SavePackingMeterialIssue(BMR03GoodsPackingMeterialIssue details, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {
			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {
				details.setForm_no("PRD03/F-25");
				details.setStatus(AppConstantDryGoods.supervisorSave);

				details.setSupervisor_id(userId);
				bmr03goodspackingmeterialissuerepository.save(details);

				for (BMR03GoodsPackingMeterialIssueLine lineDetails : details.getPckdetails()) {
					Long Id = details.getPack_id();
					lineDetails.setPack_id(Id);
					bmr03goodspackingmeterialissuelinerepository.save(lineDetails);

				}
			}

			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not Submit  Details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			logger.error("*** Unable to Save*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	// Submit

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitPackingMeterialIssue(BMR03GoodsPackingMeterialIssue details,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {
			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PRD03/F-25");
				details.setStatus(AppConstantDryGoods.supervisorApprovedStatus);

				details.setSupervisor_id(userId);
				bmr03goodspackingmeterialissuerepository.save(details);

				for (BMR03GoodsPackingMeterialIssueLine lineDetails : details.getPckdetails()) {
					Long Id = details.getPack_id();
					lineDetails.setPack_id(Id);
					bmr03goodspackingmeterialissuelinerepository.save(lineDetails);

				}
			}

			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not Submit  Details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			logger.error("*** Unable to Save*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	public ResponseEntity<?> GetPackingMeterial(String batch_no) {
		List<BMR03GoodsPackingMeterialIssue> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr03goodspackingmeterialissuerepository.getDetails25(batch_no);

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
			GetPackingMeterialPde = bmr03goodspackingmeterialissuerepository.getpackingmeterialpde(batch_no, fromdate,
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

	
	
		// EQUIPMENT ANNEXURE - PDE
	
	public ResponseEntity<?> saveEquipmentAnnexureSAP(PunchingBmrEquipmentSAP punchingBmrEquipments) {
		
		SCAUtil scaUtil = new SCAUtil();
		
		try {
			
//			if(punchingBmrEquipments.getEquipmentName() != null || "".equals(punchingBmrEquipments.getEquipmentName())) {
//				
//				return new ResponseEntity(new ApiResponse(false, "Equipment Name should be mandatory !!!"), HttpStatus.BAD_REQUEST);
//				
//			}
			
			equipmentSAPRepository.save(punchingBmrEquipments);
			
		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to save Equipment Annexure *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to save equipment annexure " + msg), HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(punchingBmrEquipments, HttpStatus.OK);
	}
	
	
	public ResponseEntity<?> getEquipmentAnnexureByEquipmentName(String equipmentName) {
		
		List<PunchingBmrEquipmentSAP> equipmentList = new ArrayList<PunchingBmrEquipmentSAP>();
		
		try {
			
			equipmentList = equipmentSAPRepository.fetchEquipmentByEquipCode(equipmentName);
			
		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to get Equipment Annexure Master *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to get equipment annexure master !!!" + msg), HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(equipmentList, HttpStatus.OK);
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
