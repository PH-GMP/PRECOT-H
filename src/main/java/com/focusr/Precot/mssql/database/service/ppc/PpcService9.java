package com.focusr.Precot.mssql.database.service.ppc;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.focusr.Precot.mssql.database.model.PPC.ContractReviewMeetingDepartmentMemberF003;
import com.focusr.Precot.mssql.database.model.PPC.ContractReviewMeetingExcel;
import com.focusr.Precot.mssql.database.model.PPC.ContractReviewMeetingF003;
import com.focusr.Precot.mssql.database.model.PPC.ContractReviewProductDetailF003;
import com.focusr.Precot.mssql.database.model.PPC.MonthlyplanSummaryF002;
import com.focusr.Precot.mssql.database.model.PPC.MonthlyplanSummary_ProductionData_F_002;
import com.focusr.Precot.mssql.database.model.PPC.PreProductionMeetingF004;
import com.focusr.Precot.mssql.database.model.PPC.PreProductionParticipant;
import com.focusr.Precot.mssql.database.model.PPC.PreproductionMeetingDetailsF004;
import com.focusr.Precot.mssql.database.model.PPC.audit.MonthlyplanSummaryHistoryF_002;
import com.focusr.Precot.mssql.database.model.PPC.audit.MonthlyplanSummaryProductHistoryF_002;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.ppc.ContractReviewDepartmentMemberRepositoryF003;
import com.focusr.Precot.mssql.database.repository.ppc.ContractReviewMeetingExcelRepo;
import com.focusr.Precot.mssql.database.repository.ppc.ContractReviewMeetingRepositoryF003;
import com.focusr.Precot.mssql.database.repository.ppc.ContractReviewProductDetailRepositoryF003;
import com.focusr.Precot.mssql.database.repository.ppc.MonthlyplanSummaryF002Repository;
import com.focusr.Precot.mssql.database.repository.ppc.MonthlyplanSummaryProductionDataF002Repository;
import com.focusr.Precot.mssql.database.repository.ppc.PreProductionMeetingF004Repository;
import com.focusr.Precot.mssql.database.repository.ppc.PreProductionParticipantRepository;
import com.focusr.Precot.mssql.database.repository.ppc.PreproductionMeetingDetailsF004Repository;
import com.focusr.Precot.mssql.database.repository.ppc.audit.MonthlyplanSummaryHistoryF_002Repository;
import com.focusr.Precot.mssql.database.repository.ppc.audit.MonthlyplanSummaryProductionDataHistoryF002Repository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.ppc.AppConstantPpc;

@Service
public class PpcService9 {

	Logger logger = LoggerFactory.getLogger(PpcService9.class);

	SCAUtil sca = new SCAUtil();

	@Autowired
	private MonthlyplanSummaryF002Repository monthlyPlanRepository;

	@Autowired
	private MonthlyplanSummaryProductionDataF002Repository productionDataRepository;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserImageDetailsRepository imageRepository;

	@Autowired
	private MonthlyplanSummaryHistoryF_002Repository monthlyplanSummaryHistoryF002Repository;

	@Autowired
	private MonthlyplanSummaryProductionDataHistoryF002Repository monthlyplanSummaryDataHistoryF002Repository;

	@Autowired
	private PreProductionMeetingF004Repository preProductionMeetingRepository;

	@Autowired
	private PreproductionMeetingDetailsF004Repository preproductionMeetingDetailsF004Repository;

	@Autowired
	private ContractReviewMeetingRepositoryF003 contractReviewMeetingRepositoryF003;

	@Autowired
	private ContractReviewMeetingExcelRepo contractReviewMeetingExcelRepo;

	@Autowired
	private ContractReviewDepartmentMemberRepositoryF003 departmentMemberRepository;

	@Autowired
	private ContractReviewProductDetailRepositoryF003 productDetailRepository;

	@Autowired
	private PreProductionParticipantRepository preProductionParticipantRepository;

	@Autowired
	private PpcMailFunction mailFunction;

	public MonthlyplanSummaryF002 findByMonthyear(String monthyear) {
		return monthlyPlanRepository.findByMonthyear(monthyear);
	}

	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}

	public ResponseEntity<?> saveMonthlyPlanSummary(MonthlyplanSummaryF002 Monthlyplan, HttpServletRequest http) {

		try {
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (userRole.equals("PPC_ASSISTANT")) {

				Long rawId = Monthlyplan.getId();

				if (rawId != null) {
					MonthlyplanSummaryF002 rawAppliedContRawCottonF04 = new MonthlyplanSummaryF002();
					rawAppliedContRawCottonF04 = monthlyPlanRepository.fetchMontlyPlanById(rawId);
					Monthlyplan.setCreatedAt(rawAppliedContRawCottonF04.getCreatedAt());
					Monthlyplan.setCreatedBy(rawAppliedContRawCottonF04.getCreatedBy());
				}

				Monthlyplan.setAssistant_status(AppConstantPpc.PccAssistantsave);
				Monthlyplan.setAssistant_saved_on(date);
				Monthlyplan.setAssistant_saved_by(userName);
				Monthlyplan.setAssistant_saved_id(userId);

				monthlyPlanRepository.save(Monthlyplan);

				List<MonthlyplanSummary_ProductionData_F_002> productionDataList = Monthlyplan.getProductionData();
				for (MonthlyplanSummary_ProductionData_F_002 data : productionDataList) {
					data.setMonthlyPlan(Monthlyplan);
					productionDataRepository.save(data);
				}

				Monthlyplan.setProductionData(productionDataList);
				monthlyPlanRepository.save(Monthlyplan);

			} else {

				return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to save form !!! "),
						HttpStatus.BAD_REQUEST);

			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(
					new ApiResponse(false, "Failed to approve/reject Applied Raw Cotton Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
		return new ResponseEntity(Monthlyplan, HttpStatus.CREATED);

	}

	public ResponseEntity<?> submitMonthlyPlanSummary(MonthlyplanSummaryF002 monthlyPlan, HttpServletRequest http) {
		try {
			SCAUtil sca = new SCAUtil();
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (userRole.equals("PPC_ASSISTANT")) {
				// Handle existing or new monthly plan
				if (monthlyPlan.getId() != null) {
					MonthlyplanSummaryF002 existingPlan = monthlyPlanRepository.findById(monthlyPlan.getId())
							.orElse(null);
					if (existingPlan != null) {
						monthlyPlan.setCreatedAt(existingPlan.getCreatedAt());
						monthlyPlan.setCreatedBy(existingPlan.getCreatedBy());
					}
				}

				monthlyPlan.setAssistant_status(AppConstantPpc.PccAssistantsubmit);
//                monthlyPlan.setAssistant_saved_on(date);
				monthlyPlan.setAssistant_submit_on(date);
				monthlyPlan.setAssistant_submit_by(userName);
				monthlyPlan.setAssistant_submit_id(userId);
				monthlyPlan.setPpc_Incharge_status(AppConstants.waitingStatus);
				monthlyPlan.setAssistant_sign(userName);

//                UserImageDetails imageDetails = new UserImageDetails();
//                
//                
//
//                Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//                byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//                monthlyPlan.setAssistant_Signature(signature);

				monthlyPlanRepository.save(monthlyPlan);

				List<MonthlyplanSummary_ProductionData_F_002> productionDataList = monthlyPlan.getProductionData();
				for (MonthlyplanSummary_ProductionData_F_002 data : productionDataList) {
					data.setMonthlyPlan(monthlyPlan);
					productionDataRepository.save(data);
				}

				monthlyPlan.setProductionData(productionDataList);
				monthlyPlanRepository.save(monthlyPlan);

				// Save history record
				MonthlyplanSummaryHistoryF_002 history = new MonthlyplanSummaryHistoryF_002();
				history.setFormatName(monthlyPlan.getFormatName());
				history.setFormatNo(monthlyPlan.getFormatNo());
				history.setRevisionNo(monthlyPlan.getRevisionNo());
				history.setRefSopNo(monthlyPlan.getRefSopNo());
				history.setUnit(monthlyPlan.getUnit());
				history.setMonthyear(monthlyPlan.getMonthyear());
				history.setDate(monthlyPlan.getDate());
				history.setNote(monthlyPlan.getNote());
				history.setChallenges(monthlyPlan.getChallenges());
				history.setMail_status(monthlyPlan.getMail_status());
				history.setAssistant_status(monthlyPlan.getAssistant_status());
				history.setAssistant_submit_on(date);
				history.setAssistant_submit_by(userName);
				history.setAssistant_submit_id(userId);
				history.setAssistant_sign(userName);
				history.setPpc_Incharge_status(AppConstantPpc.waitingstatus);
//              history.setProductionData(monthlyPlan.getProductionData()); 

				String Monthyear = history.getMonthyear();

				int version = monthlyplanSummaryHistoryF002Repository.getMaximumVersion(Monthyear).map(temp -> temp + 1)
						.orElse(1);

				history.setVersion(version);

				monthlyplanSummaryHistoryF002Repository.save(history);

				for (MonthlyplanSummary_ProductionData_F_002 data : productionDataList) {
					MonthlyplanSummaryProductHistoryF_002 historyData = new MonthlyplanSummaryProductHistoryF_002();
					historyData.setMonthlyPlan(history);
					historyData.setBleachingKg(data.getBleachingKg());
					historyData.setSpunlaceKg(data.getSpunlaceKg());
					historyData.setPadPunchingBags(data.getPadPunchingBags());
					historyData.setBallMakingBags(data.getBallMakingBags());
					historyData.setPleatMakingBags(data.getPleatMakingBags());
					historyData.setBudsMakingBags(data.getBudsMakingBags());
					historyData.setWoolRollBags(data.getWoolRollBags());
					historyData.setExternalFleece(data.getExternalFleece());
					historyData.setTotalProdBleaching(data.getTotalProdBleaching());
					historyData.setTotalProdSpunlace(data.getTotalProdSpunlace());
					historyData.setTotalProdPadPunching(data.getTotalProdPadPunching());
					historyData.setTotalProdBallMaking(data.getTotalProdBallMaking());
					historyData.setTotalProdPleatMaking(data.getTotalProdPleatMaking());
					historyData.setTotalProdBudsMaking(data.getTotalProdBudsMaking());
					historyData.setTotalProdWoolRoll(data.getTotalProdWoolRoll());
					historyData.setTotalProdExternalFleece(data.getTotalProdExternalFleece());

					historyData.setWorkDaysBleaching(data.getWorkDaysBleaching());
					historyData.setWorkDaysSpunlace(data.getWorkDaysSpunlace());
					historyData.setWorkDaysPadPunching(data.getWorkDaysPadPunching());
					historyData.setWorkDaysBallMaking(data.getWorkDaysBallMaking());
					historyData.setWorkDaysPleatMaking(data.getWorkDaysPleatMaking());
					historyData.setWorkDaysBudsMaking(data.getWorkDaysBudsMaking());
					historyData.setWorkDaysWoolRoll(data.getWorkDaysWoolRoll());
					historyData.setWorkDaysExternalFleece(data.getWorkDaysExternalFleece());

					monthlyplanSummaryDataHistoryF002Repository.save(historyData);
				}

				try {

					mailFunction.sendEmailTomonthlyPlan(monthlyPlan);
				} catch (Exception ex) {
					return new ResponseEntity<>(
							new ApiResponse(false, "PPC_ASSISTANT APPROVED but Unable to send mail to PPC_INCHARGE! "),
							HttpStatus.OK);
				}

			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to submit form!"),
						HttpStatus.FORBIDDEN);
			}

		} catch (Exception e) {
			String msg = e.getMessage();
			return new ResponseEntity<>(new ApiResponse(false, "Failed to submit monthly plan summary: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(monthlyPlan, HttpStatus.OK);
	}

	public ResponseEntity<?> approveRejectMonthlyPlan(ApproveResponse approveResponse, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		MonthlyplanSummaryF002 monthlyPlan = new MonthlyplanSummaryF002();

		MonthlyplanSummaryHistoryF_002 historyRecord = new MonthlyplanSummaryHistoryF_002();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			monthlyPlan = monthlyPlanRepository.fetchmonthlyPlanSummaryById(approveResponse.getId());
			String assistantStatus = monthlyPlan.getAssistant_status();
			String hodStatus = monthlyPlan.getPpc_Incharge_status();

//            if (assistantStatus.equalsIgnoreCase(AppConstantPpc.PccAssistantsubmit) && hodStatus.equalsIgnoreCase(AppConstantPpc.waitingstatus))
//        	{

			if (userRole.equalsIgnoreCase("PPC_INCHARGE")) {

				if (approveResponse.getStatus().equals("Approve")) {

					monthlyPlan.setPpc_Incharge_status(AppConstantPpc.hodApprovedStatus);
					monthlyPlan.setPpc_Incharge_submit_on(date);
					monthlyPlan.setPpc_Incharge_submit_by(userName);
					monthlyPlan.setPpc_Incharge_submit_id(userId);
					monthlyPlan.setPpc_Incharge_sign(userName);

					monthlyPlanRepository.save(monthlyPlan);

					historyRecord = monthlyplanSummaryHistoryF002Repository
							.findLastSubmittedRecord(monthlyPlan.getMonthyear());
					historyRecord.setPpc_Incharge_status(AppConstantPpc.hodApprovedStatus);
					historyRecord.setPpc_Incharge_submit_on(date);
					historyRecord.setPpc_Incharge_submit_id(userId);
					historyRecord.setPpc_Incharge_submit_by(userName);
					historyRecord.setPpc_Incharge_sign(userName);

					monthlyplanSummaryHistoryF002Repository.save(historyRecord);

					return new ResponseEntity<>(new ApiResponse(true, "PPC_INCHARGE Approved Successfully"),
							HttpStatus.OK);

				} else if (approveResponse.getStatus().equals("Reject")) {

					String reason = approveResponse.getRemarks();
					monthlyPlan.setReason(reason);
					monthlyPlan.setPpc_Incharge_status(AppConstantPpc.hodRejectedStatus);
					monthlyPlan.setPpc_Incharge_submit_on(date);
					monthlyPlan.setPpc_Incharge_submit_id(userId);
					monthlyPlan.setPpc_Incharge_submit_by(userName);
					monthlyPlan.setPpc_Incharge_sign(userName);

					monthlyPlan.setPpc_Incharge_sign(userName);

					monthlyPlanRepository.save(monthlyPlan);

					historyRecord = monthlyplanSummaryHistoryF002Repository
							.findLastSubmittedRecord(monthlyPlan.getMonthyear());
					historyRecord.setPpc_Incharge_status(AppConstantPpc.hodRejectedStatus);
					historyRecord.setReason(reason);
					historyRecord.setPpc_Incharge_submit_on(date);
					historyRecord.setPpc_Incharge_submit_id(userId);
					historyRecord.setPpc_Incharge_submit_by(userName);
					historyRecord.setPpc_Incharge_sign(userName);

					monthlyplanSummaryHistoryF002Repository.save(historyRecord);

					return new ResponseEntity<>(new ApiResponse(true, "PPC_INCHARGE Rejected Successfully"),
							HttpStatus.OK);

				} else {
					return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
				}

			} else {
				return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"),
						HttpStatus.BAD_REQUEST);
			}

//            } 
//        	else
//            {
//            	
//                return new ResponseEntity<>(new ApiResponse(false, "Assistant Not yet Submitted"), HttpStatus.BAD_REQUEST);
//            }

		} catch (Exception e) {
			String msg = e.getMessage();
			logger.error("Unable to Approve Record: " + msg);

			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/reject Monthly Plan Record: " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getMonthlyplanSummary() {

		String userRole = getUserRole();

		List<MonthlyplanSummaryF002> Monthlyplan = new ArrayList<>();

		try {

			if (userRole.equals("PPC_ASSISTANT")) {

				Monthlyplan = monthlyPlanRepository.MonthlyplanSummaryforAssistant();

			} else if (userRole.equals("PPC_INCHARGE")) {

				Monthlyplan = monthlyPlanRepository.MonthlyplanSummaryforHod();

			} else {
				return new ResponseEntity(
						new ApiResponse(false, userRole + " not authorized to access Hand Sanitation form"),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity(Monthlyplan, HttpStatus.OK);
		} catch (Exception ex) {
			String msg = ex.getMessage();
			ex.printStackTrace();
			logger.error("Unable to get summary record" + msg);
			return new ResponseEntity(new ApiResponse(false, "Failed to get summary record" + msg),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getMonthlyplanSummaryPrint(String monthYear) {

		List<MonthlyplanSummaryF002> handSanitationList = new ArrayList<>();

		try {

			handSanitationList = monthlyPlanRepository.getMonthlyplanSummaryPrint(monthYear);

		} catch (Exception ex) {
			String msg = ex.getMessage();
			ex.printStackTrace();
			logger.error("Unable to get MonthlyplanSummary List" + msg);
			return new ResponseEntity(new ApiResponse(false, "Unable to get MonthlyplanSummary List" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(handSanitationList, HttpStatus.OK);

	}

	public ResponseEntity<?> getMonthlyPlanSummaryByMonthYear(String monthYear) {
		List<MonthlyplanSummaryF002> monthlyPlanList = new ArrayList<>();
		try {
			monthlyPlanList = monthlyPlanRepository.findByMonthYear(monthYear);
		} catch (Exception ex) {
			String msg = ex.getMessage();
			ex.printStackTrace();
			logger.error("Unable to get monthly plan summary for " + monthYear + ": " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get monthly plan summary for " + monthYear + ": " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(monthlyPlanList, HttpStatus.OK);
	}

	public PreProductionMeetingF004 savePreProductionMeeting(PreProductionMeetingF004 preProductionMeetingF004) {
		// Save the PreProductionMeeting entity and its details
		return preProductionMeetingRepository.save(preProductionMeetingF004);
	}

	public String getLastNote() {
		return monthlyPlanRepository.findLastNote();
	}

	public ResponseEntity<?> savePreproductionMeetingForm(PreProductionMeetingF004 PreProductionMeetingF004,
			HttpServletRequest http) {
		try {
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (userRole.equals("ROLE_QA")) {
				Long rawId = PreProductionMeetingF004.getId();

				if (rawId != null) {
					PreProductionMeetingF004 existingRecord = preProductionMeetingRepository
							.fetchPreProductionMeetingF004ById(rawId);
					PreProductionMeetingF004.setCreatedAt(existingRecord.getCreatedAt());
					PreProductionMeetingF004.setCreatedBy(existingRecord.getCreatedBy());
				}

				PreProductionMeetingF004.setAssistantStatus(AppConstantPpc.PccAssistantsave);
				PreProductionMeetingF004.setAssistantSavedOn(date);
				PreProductionMeetingF004.setAssistantSavedBy(userName);
				PreProductionMeetingF004.setAssistantSavedId(userId);

				PreProductionMeetingF004 savedMeeting = preProductionMeetingRepository.save(PreProductionMeetingF004);

				// Set the reference to the saved PreProductionMeetingF004 in each detail record
				List<PreproductionMeetingDetailsF004> detailsMeetingList = PreProductionMeetingF004.getDetailsMeeting();
				for (PreproductionMeetingDetailsF004 details : detailsMeetingList) {
					details.setPreproductionMeeting(savedMeeting); // Ensure proper association with parent entity
				}

				preproductionMeetingDetailsF004Repository.saveAll(detailsMeetingList);

				// No need to manually save child entities if cascade = CascadeType.ALL is set
				return new ResponseEntity<>(savedMeeting, HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to save form !!!"),
						HttpStatus.BAD_REQUEST);
			}
		} catch (ConstraintViolationException e) {
			logger.error("Constraint violation: " + e.getMessage());
			return new ResponseEntity<>(new ApiResponse(false, "Constraint violation: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			String msg = e.getMessage();
			logger.error("Unable to Approve Record: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to Save the Preproduction  Record: " + msg),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> submitPreproductionMeeting(@RequestBody PreProductionMeetingF004 preProductionMeetingF004,
			HttpServletRequest http) {
		if (preProductionMeetingF004 == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}

		SCAUtil scaUtil = new SCAUtil();
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		String role = sca.getUserRoleFromRequest(http, tokenProvider);

		Long id = preProductionMeetingF004.getId();
		PreProductionMeetingF004 existingMeeting = new PreProductionMeetingF004();
		// Get the current time
		LocalDateTime now = LocalDateTime.now();
		Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());

		try {
			String missingField = "";
			if (preProductionMeetingF004.getFormatNo() == null)
				missingField = "formatNo";
			if (preProductionMeetingF004.getRefSopNo() == null)
				missingField = "sopNumber";
			if (preProductionMeetingF004.getRevisionNo() == null)
				missingField = "revisionNo";

			if (!missingField.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
						HttpStatus.BAD_REQUEST);
			}

			if (id != null) {
				existingMeeting = preProductionMeetingRepository.findById(id).orElse(null);
				if (existingMeeting == null) {
					return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
				}
			}

			preProductionMeetingF004.setCreatedAt(existingMeeting.getCreatedAt());
			preProductionMeetingF004.setCreatedBy(existingMeeting.getCreatedBy());

			String currentStatus = existingMeeting.getAssistantStatus();

			if ("ROLE_QA".equalsIgnoreCase(role)) {

				if (!AppConstantPpc.hodApprovedStatus.equals(currentStatus)) {

					preProductionMeetingF004.setAssistantStatus(AppConstantPpc.PccAssistantsubmit);
					preProductionMeetingF004.setAssistantSubmitOn(date);
					preProductionMeetingF004.setAssistantSubmitBy(userName);
					preProductionMeetingF004.setAssistantSubmitId(userId);

					preProductionMeetingRepository.save(preProductionMeetingF004);

				} else {
					return new ResponseEntity<>(new ApiResponse(false, "HOD already approved"), HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
						HttpStatus.FORBIDDEN);
			}
		} catch (Exception ex) {
			logger.error(" **** Unable to submit Preproduction Meeting Details **** ", ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to submit Preproduction Meeting Details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
	}

	public ResponseEntity<?> GetPrintPreproductionMeeting(String year, String month, String date) {
		List<PreProductionMeetingF004> preproductionMeetingList = new ArrayList<>();

		try {
			if (date != null && !date.isEmpty()) {
				preproductionMeetingList = preProductionMeetingRepository.getPreproductionMeetingByDate(date);
			} else if (year != null && !year.isEmpty() && month != null && !month.isEmpty()) {
				preproductionMeetingList = preProductionMeetingRepository.getPreproductionMeetingByYearAndMonth(year,
						month);
			} else if (year != null && !year.isEmpty()) {
				preproductionMeetingList = preProductionMeetingRepository.getPreproductionMeetingByYear(year);
			}
		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Preproduction Meeting List: " + msg);
			return new ResponseEntity(new ApiResponse(false, "Unable to get Preproduction Meeting List: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(preproductionMeetingList, HttpStatus.OK);
	}

	public ResponseEntity<?> GetPreproductionMeetingBydate(String date) {
		List<PreProductionMeetingF004> PreProductionMeeting = new ArrayList<>();
		try {
			PreProductionMeeting = preProductionMeetingRepository.getPreproductionMeetingByid(date);
		} catch (Exception ex) {
			String msg = ex.getMessage();
			ex.printStackTrace();
			logger.error("Unable to get monthly plan summary for " + date + ": " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get monthly plan summary for " + date + ": " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(PreProductionMeeting, HttpStatus.OK);
	}

	public ResponseEntity<?> GetPreproductionSummary() {
		String userRole = getUserRole();
		List<PreProductionMeetingF004> monthlyPlan = new ArrayList<>();

		try {
			if (userRole.equals("ROLE_QA")) {
				monthlyPlan = preProductionMeetingRepository.getPreproductionMeeting();
			} else {
				return new ResponseEntity(
						new ApiResponse(false, userRole + " not authorized to access Hand Sanitation form"),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity(monthlyPlan, HttpStatus.OK);
		} catch (Exception ex) {
			String msg = ex.getMessage();
			ex.printStackTrace();
			logger.error("Unable to get summary record" + msg);
			return new ResponseEntity(new ApiResponse(false, "Failed to get summary record" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> saveBussinessContractReviewMeeting(ContractReviewMeetingF003 contractReviewMeeting,
			HttpServletRequest http) {
		try {
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

//            if (userRole.equals("ROLE_ASSISTANT")) {
//                Long rawId = contractReviewMeeting.getId();

			if (userRole.equals("MARKET_REPRESENTATIVE")) {
				Long rawId = contractReviewMeeting.getId();

				if (rawId != null) {
					ContractReviewMeetingF003 existingRecord = contractReviewMeetingRepositoryF003
							.fetchContractReviewMeetingById(rawId);
					contractReviewMeeting.setCreatedAt(existingRecord.getCreatedAt());
					contractReviewMeeting.setCreatedBy(existingRecord.getCreatedBy());
				}

				contractReviewMeeting.setMarketRepresentativeStatus(AppConstantPpc.Marketingsave);
				contractReviewMeeting.setMarketRepresentativeSavedOn(date);
				contractReviewMeeting.setMarketRepresentativeSavedBy(userName);
				contractReviewMeeting.setMarketRepresentativeId(userId);

				// Save the main ContractReviewMeetingF003 entity
				ContractReviewMeetingF003 savedMeeting = contractReviewMeetingRepositoryF003
						.save(contractReviewMeeting);

				// Save Department Member Details
				List<ContractReviewMeetingDepartmentMemberF003> memberDetails = contractReviewMeeting
						.getMemberDetails();
				if (memberDetails != null) {
					for (ContractReviewMeetingDepartmentMemberF003 member : memberDetails) {
						member.setContractReviewMeeting(savedMeeting);
					}
					departmentMemberRepository.saveAll(memberDetails);
				}

				// Save Product Details
				List<ContractReviewProductDetailF003> productDetails = contractReviewMeeting.getProductDetails();
				if (productDetails != null) {
					for (ContractReviewProductDetailF003 productDetail : productDetails) {
						productDetail.setContractReviewMeeting(savedMeeting);
					}
					productDetailRepository.saveAll(productDetails);
				}

				return new ResponseEntity<>(savedMeeting, HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to save form"),
						HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			String msg = e.getMessage();
			logger.error("Unable to save record: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to save record: " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> BussinessSubmitContractReviewMeeting(
			@RequestBody ContractReviewMeetingF003 ContractReviewMeeting, HttpServletRequest http) {
		if (ContractReviewMeeting == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}

		SCAUtil scaUtil = new SCAUtil();
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		String role = sca.getUserRoleFromRequest(http, tokenProvider);

		Long id = ContractReviewMeeting.getId();
		ContractReviewMeetingF003 existingMeeting = new ContractReviewMeetingF003();
		// Get the current time
		LocalDateTime now = LocalDateTime.now();
		Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());

		try {
			String missingField = "";
			if (ContractReviewMeeting.getFormatNo() == null)
				missingField = "formatNo";
			if (ContractReviewMeeting.getRefSopNo() == null)
				missingField = "sopNumber";
			if (ContractReviewMeeting.getRevisionNo() == null)
				missingField = "revisionNo";

			if (!missingField.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
						HttpStatus.BAD_REQUEST);
			}

			if (id != null) {
				existingMeeting = contractReviewMeetingRepositoryF003.findById(id).orElse(null);
				if (existingMeeting == null) {
					return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
				}
			}

			ContractReviewMeeting.setCreatedAt(existingMeeting.getCreatedAt());
			ContractReviewMeeting.setCreatedBy(existingMeeting.getCreatedBy());

			ContractReviewMeeting
					.setMarketRepresentativeSavedOn(existingMeeting.getMarketRepresentativeSavedOn() != null
							? existingMeeting.getMarketRepresentativeSavedOn()
							: date);

			ContractReviewMeeting
					.setMarketRepresentativeSavedBy(existingMeeting.getMarketRepresentativeSavedBy() != null
							? existingMeeting.getMarketRepresentativeSavedBy()
							: userName);

			ContractReviewMeeting.setMarketRepresentativeId(
					existingMeeting.getMarketRepresentativeId() != null ? existingMeeting.getMarketRepresentativeId()
							: userId);

			// Save updated entity
			contractReviewMeetingRepositoryF003.save(ContractReviewMeeting);

			contractReviewMeetingRepositoryF003.save(ContractReviewMeeting);

			String currentStatus = existingMeeting.getAssistantStatus();

			if ("MARKET_REPRESENTATIVE".equalsIgnoreCase(role)) {

				if (!AppConstantPpc.hodApprovedStatus.equals(currentStatus)) {

					ContractReviewMeeting.setMarketRepresentativeStatus(AppConstantPpc.Marketingsubmit);
					ContractReviewMeeting.setMarketRepresentativeSubmitOn(date);
					ContractReviewMeeting.setMarketRepresentativeSubmitBy(userName);
					ContractReviewMeeting.setMarketRepresentativeSubmitId(userId);

					contractReviewMeetingRepositoryF003.save(ContractReviewMeeting);

				}

			} else {
				return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
						HttpStatus.FORBIDDEN);
			}
		} catch (Exception ex) {
			logger.error(" **** Unable to submit Preproduction Meeting Details **** ", ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to submit Preproduction Meeting Details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
	}

	public ResponseEntity<?> saveContractReviewMeeting(ContractReviewMeetingF003 contractReviewMeeting,
			HttpServletRequest http) {
		try {
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

//            if (userRole.equals("ROLE_ASSISTANT")) {
//                Long rawId = contractReviewMeeting.getId();

			if (userRole.equals("PPC_ASSISTANT")) {
				Long rawId = contractReviewMeeting.getId();

				if (rawId != null) {
					ContractReviewMeetingF003 existingRecord = contractReviewMeetingRepositoryF003
							.fetchContractReviewMeetingById(rawId);
					contractReviewMeeting.setCreatedAt(existingRecord.getCreatedAt());
					contractReviewMeeting.setCreatedBy(existingRecord.getCreatedBy());

					contractReviewMeeting
							.setMarketRepresentativeSubmitOn(existingRecord.getMarketRepresentativeSubmitOn() != null
									? existingRecord.getMarketRepresentativeSubmitOn()
									: date);

					contractReviewMeeting
							.setMarketRepresentativeSubmitBy(existingRecord.getMarketRepresentativeSubmitBy() != null
									? existingRecord.getMarketRepresentativeSubmitBy()
									: userName);

					contractReviewMeeting
							.setMarketRepresentativeSubmitId(existingRecord.getMarketRepresentativeSubmitId() != null
									? existingRecord.getMarketRepresentativeSubmitId()
									: userId);

					contractReviewMeeting
							.setMarketRepresentativeStatus(existingRecord.getMarketRepresentativeStatus() != null
									? existingRecord.getMarketRepresentativeStatus()
									: AppConstantPpc.Marketingsubmit);

					contractReviewMeeting.setAssistantStatus(AppConstantPpc.PccAssistantsave);
					contractReviewMeeting.setAssistantSavedOn(date);
					contractReviewMeeting.setAssistantSavedBy(userName);
					contractReviewMeeting.setAssistantSavedId(userId);

					ContractReviewMeetingF003 savedMeeting = contractReviewMeetingRepositoryF003
							.save(contractReviewMeeting);

					// Save Department Member Details
					List<ContractReviewMeetingDepartmentMemberF003> memberDetails = contractReviewMeeting
							.getMemberDetails();
					if (memberDetails != null) {
						for (ContractReviewMeetingDepartmentMemberF003 member : memberDetails) {
							member.setContractReviewMeeting(savedMeeting);
						}
						departmentMemberRepository.saveAll(memberDetails);
					}

					// Save Product Details
					List<ContractReviewProductDetailF003> productDetails = contractReviewMeeting.getProductDetails();
					if (productDetails != null) {
						for (ContractReviewProductDetailF003 productDetail : productDetails) {
							productDetail.setContractReviewMeeting(savedMeeting);
						}
						productDetailRepository.saveAll(productDetails);
					}

				}

				contractReviewMeeting.setAssistantStatus(AppConstantPpc.PccAssistantsave);
				contractReviewMeeting.setAssistantSavedOn(date);
				contractReviewMeeting.setAssistantSavedBy(userName);
				contractReviewMeeting.setAssistantSavedId(userId);

				// Save the main ContractReviewMeetingF003 entity
				ContractReviewMeetingF003 savedMeeting = contractReviewMeetingRepositoryF003
						.save(contractReviewMeeting);

				// Save Department Member Details
				List<ContractReviewMeetingDepartmentMemberF003> memberDetails = contractReviewMeeting
						.getMemberDetails();
				if (memberDetails != null) {
					for (ContractReviewMeetingDepartmentMemberF003 member : memberDetails) {
						member.setContractReviewMeeting(savedMeeting);
					}
					departmentMemberRepository.saveAll(memberDetails);
				}

				// Save Product Details
				List<ContractReviewProductDetailF003> productDetails = contractReviewMeeting.getProductDetails();
				if (productDetails != null) {
					for (ContractReviewProductDetailF003 productDetail : productDetails) {
						productDetail.setContractReviewMeeting(savedMeeting);
					}
					productDetailRepository.saveAll(productDetails);
				}

				return new ResponseEntity<>(savedMeeting, HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to save form"),
						HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			String msg = e.getMessage();
			logger.error("Unable to save record: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to save record: " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> SubmitContractReviewMeeting(@RequestBody ContractReviewMeetingF003 ContractReviewMeeting,
			HttpServletRequest http) {
		if (ContractReviewMeeting == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}

		SCAUtil scaUtil = new SCAUtil();
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		String role = sca.getUserRoleFromRequest(http, tokenProvider);

		Long id = ContractReviewMeeting.getId();
		ContractReviewMeetingF003 existingMeeting = new ContractReviewMeetingF003();
		// Get the current time
		LocalDateTime now = LocalDateTime.now();
		Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());

		try {
			String missingField = "";
			if (ContractReviewMeeting.getFormatNo() == null)
				missingField = "formatNo";
			if (ContractReviewMeeting.getRefSopNo() == null)
				missingField = "sopNumber";
			if (ContractReviewMeeting.getRevisionNo() == null)
				missingField = "revisionNo";

			if (!missingField.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
						HttpStatus.BAD_REQUEST);
			}

			if (id != null) {
				existingMeeting = contractReviewMeetingRepositoryF003.findById(id).orElse(null);
				if (existingMeeting == null) {
					return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
				}
			}

			ContractReviewMeeting.setCreatedAt(existingMeeting.getCreatedAt());
			ContractReviewMeeting.setCreatedBy(existingMeeting.getCreatedBy());

			ContractReviewMeeting
					.setMarketRepresentativeSubmitOn(existingMeeting.getMarketRepresentativeSubmitOn() != null
							? existingMeeting.getMarketRepresentativeSubmitOn()
							: date);

			ContractReviewMeeting
					.setMarketRepresentativeSubmitBy(existingMeeting.getMarketRepresentativeSubmitBy() != null
							? existingMeeting.getMarketRepresentativeSubmitBy()
							: userName);

			ContractReviewMeeting
					.setMarketRepresentativeSubmitId(existingMeeting.getMarketRepresentativeSubmitId() != null
							? existingMeeting.getMarketRepresentativeSubmitId()
							: userId);

			ContractReviewMeeting.setMarketRepresentativeStatus(existingMeeting.getMarketRepresentativeStatus() != null
					? existingMeeting.getMarketRepresentativeStatus()
					: AppConstantPpc.Marketingsubmit);

			contractReviewMeetingRepositoryF003.save(ContractReviewMeeting);

			ContractReviewMeetingF003 savedMeeting = contractReviewMeetingRepositoryF003.save(ContractReviewMeeting);

			// Save Department Member Details
			List<ContractReviewMeetingDepartmentMemberF003> memberDetails = ContractReviewMeeting.getMemberDetails();
			if (memberDetails != null) {
				for (ContractReviewMeetingDepartmentMemberF003 member : memberDetails) {
					member.setContractReviewMeeting(savedMeeting);
				}
				departmentMemberRepository.saveAll(memberDetails);
			}

			// Save Product Details
			List<ContractReviewProductDetailF003> productDetails = ContractReviewMeeting.getProductDetails();
			if (productDetails != null) {
				for (ContractReviewProductDetailF003 productDetail : productDetails) {
					productDetail.setContractReviewMeeting(savedMeeting);
				}
				productDetailRepository.saveAll(productDetails);
			}

			String currentStatus = existingMeeting.getAssistantStatus();

			if ("PPC_ASSISTANT".equalsIgnoreCase(role)) {

				if (!AppConstantPpc.hodApprovedStatus.equals(currentStatus)) {

					ContractReviewMeeting.setAssistantStatus(AppConstantPpc.PccAssistantsubmit);
					ContractReviewMeeting.setAssistantSubmitOn(date);
					ContractReviewMeeting.setAssistantSubmitBy(userName);
					ContractReviewMeeting.setAssistantSubmitId(userId);

					ContractReviewMeeting.setAssistantSign(userName);

					contractReviewMeetingRepositoryF003.save(ContractReviewMeeting);

				}

			} else {
				return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
						HttpStatus.FORBIDDEN);
			}

			try {

				mailFunction.sendEmailContractreViewMeeting(ContractReviewMeeting);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "PPC_ASSISTANT APPROVED but Unable to send mail ! "),
						HttpStatus.OK);
			}
		} catch (Exception ex) {
			logger.error(" **** Unable to submit Preproduction Meeting Details **** ", ex);
			return new ResponseEntity<>(

					new ApiResponse(false, "Unable to submit Preproduction Meeting Details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
	}

//	public ResponseEntity<?> GetPrintContractReviewMeeting(String year, String month, String date) {
//	    List<ContractReviewMeetingF003> contractReviewMeetingList = new ArrayList<>();
//
//	    try {
//	        if (date != null && !date.isEmpty()) {
//	            contractReviewMeetingList = contractReviewMeetingRepositoryF003.getContractReviewMeetingByDate(date);
//	        } else if (year != null && !year.isEmpty() && month != null && !month.isEmpty()) {
//	            contractReviewMeetingList = contractReviewMeetingRepositoryF003.getContractReviewMeetingByYearAndMonth(year, month);
//	        } else if (year != null && !year.isEmpty()) {
//	            contractReviewMeetingList = contractReviewMeetingRepositoryF003.getContractReviewMeetingByYear(year);
//	        }
//	    } catch (Exception ex) {
//	        String msg = ex.getMessage();
//	        logger.error("Unable to get Contract Review Meeting List: " + msg);
//	        return new ResponseEntity<>(
//	                new ApiResponse(false, "Unable to get Contract Review Meeting List: " + msg),
//	                HttpStatus.BAD_REQUEST);
//	    }
//
//	    return new ResponseEntity<>(contractReviewMeetingList, HttpStatus.OK);
//	}

	// AMC

	public ResponseEntity<?> GetPrintContractReviewMeetingAMC(String year, String month, String date, String customer) {
		List<ContractReviewMeetingF003> contractReviewMeetingList = new ArrayList<>();

		try {
			contractReviewMeetingList = contractReviewMeetingRepositoryF003.getContractReviewMeetingFlexible(year,
					month, date, customer);
		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Contract Review Meeting List: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to get Contract Review Meeting List: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(contractReviewMeetingList, HttpStatus.OK);
	}

	public ResponseEntity<?> GetContractReviewMeetingBydate(String date, String customer) {
		List<ContractReviewMeetingF003> ContractReviewMeeting = new ArrayList<>();
		try {
			ContractReviewMeeting = contractReviewMeetingRepositoryF003.getContractReviewMeetingByid(date, customer);
		} catch (Exception ex) {
			String msg = ex.getMessage();
			ex.printStackTrace();
			logger.error("Unable to get monthly plan summary for " + date + ": " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get monthly plan summary for " + date + ": " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(ContractReviewMeeting, HttpStatus.OK);
	}

	public ResponseEntity<?> GetContractReviewMeetingSummary() {
		String userRole = getUserRole();
		List<ContractReviewMeetingF003> monthlyPlan = new ArrayList<>();

		try {

			if (userRole.equals("MARKET_REPRESENTATIVE")) {

				monthlyPlan = contractReviewMeetingRepositoryF003.getContractReviewMeetingMarketRepresentative();

			} else if (userRole.equals("PPC_ASSISTANT")) {
				monthlyPlan = contractReviewMeetingRepositoryF003.getContractReviewMeeting();
			} else {
				return new ResponseEntity(
						new ApiResponse(false, userRole + " not authorized to access Hand Sanitation form"),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity(monthlyPlan, HttpStatus.OK);
		} catch (Exception ex) {
			String msg = ex.getMessage();
			ex.printStackTrace();
			logger.error("Unable to get summary record" + msg);
			return new ResponseEntity(new ApiResponse(false, "Failed to get summary record" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public String getLastchallenges() {
		return monthlyPlanRepository.findLastchallenges();
	}

//	 
//	public void processExcelFile(MultipartFile file, String date) throws Exception {
//	    if (file.isEmpty()) {
//	        throw new Exception("File is empty!");
//	    }
//
//	    // Parse the date parameter
//	    Date parsedDate = new SimpleDateFormat("yyyy-MM-dd").parse(date);
//
//	    // Create a new entity instance
//	    ContractReviewMeetingExcel meeting = new ContractReviewMeetingExcel();
//
//	    // Set the necessary fields
//	    meeting.setDate(date);
//	    meeting.setExcelFile(file.getBytes()); // Store the file content as a byte array
//	    meeting.setDetails(file.getOriginalFilename()); // Store the file name
//
//	    // Save the record in the database
//	    contractReviewMeetingExcelRepo.save(meeting);
//	}

	public void processExcelFiles(MultipartFile[] files, String date,String customerName) throws Exception {
		// Parse the date parameter
		Date parsedDate = new SimpleDateFormat("yyyy-MM-dd").parse(date);

		for (MultipartFile file : files) {
			if (file.isEmpty()) {
				throw new Exception("One of the files is empty!");
			}

			// Create a new entity instance for each file
			ContractReviewMeetingExcel meeting = new ContractReviewMeetingExcel();

			// Set the necessary fields
			meeting.setDate(date);
			meeting.setExcelFile(file.getBytes());
			meeting.setDetails(file.getOriginalFilename());
			meeting.setCustomerName(customerName);

			// Save the record in the database
			contractReviewMeetingExcelRepo.save(meeting);
		}
	}

//	public List<String> getDetailsByDate(String date) {
//	    return contractReviewMeetingExcelRepo.findDetailsByDate(date);
//	}

	public List<IdAndValuePair> getIdAndDetailsByDate(String date, String customer) {

		List<Object[]> results = contractReviewMeetingExcelRepo.findIdAndDetailsByDate(date, customer);

		List<IdAndValuePair> idAndValuePairs = new ArrayList<>();

		for (Object[] result : results) {
			IdAndValuePair pair = new IdAndValuePair();
			pair.setId(((Number) result[0]).longValue());
			pair.setValue((String) result[1]);
			idAndValuePairs.add(pair);
		}
		return idAndValuePairs;
	}

	@Transactional
	public String deleteById(Long id) {
		Optional<ContractReviewMeetingExcel> record = contractReviewMeetingExcelRepo.findById(id);
		if (record.isPresent()) {
			contractReviewMeetingExcelRepo.deleteById(id);
			return "Record with ID " + id + " deleted successfully.";
		} else {
			return "Record with ID " + id + " not found.";
		}
	}

	///////// CR --- FILTER BY FOUR FIELDS

	public ResponseEntity<?> getCustomerNameList() {

		List<String> customerList = new ArrayList<String>();

		List<IdAndValuePair> customerValuePair = new ArrayList<IdAndValuePair>();

		try {

			customerList = preProductionMeetingRepository.customerNameList();

			Long id = (long) 1;

			for (String custom : customerList) {

				IdAndValuePair value = new IdAndValuePair();
				value.setId(id);
				value.setValue(custom);

				customerValuePair.add(value);
				id++;
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			ex.printStackTrace();
			logger.error("Unable to get customer" + msg);
			return new ResponseEntity(new ApiResponse(false, "Failed to get customer record" + msg),
					HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(customerValuePair, HttpStatus.OK);

	}

	public ResponseEntity<?> getProductCodeBrandByCustomer(String customer) {

		Map<String, List<String>> response = new HashMap<String, List<String>>();

		List<String> productCodeList = new ArrayList<String>();

		List<String> brandCodeList = new ArrayList<String>();

		try {

			brandCodeList = preProductionMeetingRepository.brandNameList(customer);

			productCodeList = preProductionMeetingRepository.materialCodeByCustomer(customer);

			response.put("Brand", brandCodeList);
			response.put("ProductCode", productCodeList);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			ex.printStackTrace();
			logger.error("Unable to get brand, material by customer" + msg);
			return new ResponseEntity(
					new ApiResponse(false, "Failed to get brand, material record by customer !!!" + msg),
					HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(response, HttpStatus.OK);

	}

	public ResponseEntity<?> getProductDescriptionByProductCode(String productCode, String customer) {

		List<String> productDescList = new ArrayList<String>();

		List<IdAndValuePair> customerValuePair = new ArrayList<IdAndValuePair>();

		try {

			productDescList = preProductionMeetingRepository.productDescriptionByCustomerBrand(customer, productCode);

			Long id = (long) 1;

			for (String custom : productDescList) {

				IdAndValuePair value = new IdAndValuePair();
				value.setId(id);
				value.setValue(custom);

				customerValuePair.add(value);
				id++;
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			ex.printStackTrace();
			logger.error("Unable to get customer" + msg);
			return new ResponseEntity(new ApiResponse(false, "Failed to get customer record" + msg),
					HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(customerValuePair, HttpStatus.OK);

	}

	// AMC LOV ADD, GET, DELETE

	public ResponseEntity<?> saveAuditParticipant(PreProductionParticipant participantList, HttpServletRequest http) {
		try {
			preProductionParticipantRepository.save(participantList);
		} catch (Exception ex) {
			logger.error(" **** Unable to save Details! **** " + ex);
			String msg = ex.getMessage();
			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(participantList, HttpStatus.CREATED);
	}

	public ResponseEntity<?> getAuditParticipants() {
		try {
			List<PreProductionParticipant> participantList = preProductionParticipantRepository.findAll();
			if (participantList == null || participantList.isEmpty()) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(participantList, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> deleteAuditParticipant(Long id) {
		try {
			PreProductionParticipant participantList = preProductionParticipantRepository.findParticipantById(id);
			if (participantList == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
			}
			preProductionParticipantRepository.deleteById(id);
		} catch (Exception ex) {
			logger.error(" **** Unable to delete details! **** " + ex);
			String msg = ex.getMessage();
			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}

	public ResponseEntity<?> getCustomerName() {

		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			orderProductResponse = contractReviewMeetingRepositoryF003.getCustomerName();

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

}