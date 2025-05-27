package com.focusr.Precot.mssql.database.service.splunance;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
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

import com.focusr.Precot.mssql.database.model.UserImageDetails;
import com.focusr.Precot.mssql.database.model.splunance.BMR01RP01ProductionDetails;
import com.focusr.Precot.mssql.database.model.splunance.BMR03PackingMeterialIssue;
import com.focusr.Precot.mssql.database.model.splunance.BMR03PackingMeterialIssueList;
import com.focusr.Precot.mssql.database.model.splunance.BMR05AnnexureList;
import com.focusr.Precot.mssql.database.model.splunance.BMR05AnnexureListLine;
import com.focusr.Precot.mssql.database.model.splunance.BMR06RP07VerificationOfRecords;
import com.focusr.Precot.mssql.database.model.splunance.BMR06RP07VerificationOfRecordsLine;
import com.focusr.Precot.mssql.database.model.splunance.BMR07ManufacturingSteps;
import com.focusr.Precot.mssql.database.model.splunance.BMR08RP09ProductionReconciliation;
import com.focusr.Precot.mssql.database.model.splunance.BMR09RP11ProcessDlyEqupBrkDwnRecord;
import com.focusr.Precot.mssql.database.model.splunance.BMR09RP11ProcessDlyEqupBrkDwnRecordLine;
import com.focusr.Precot.mssql.database.model.splunance.BMR10ProcessDeviationRecord;
import com.focusr.Precot.mssql.database.model.splunance.BMR11ListsOfEnclosures;
import com.focusr.Precot.mssql.database.model.splunance.BMR12RP13PostProdReview;
import com.focusr.Precot.mssql.database.model.splunance.BMR13RP14QaRelease;
import com.focusr.Precot.mssql.database.model.splunance.BMR13RP14QaReleaseLine;
import com.focusr.Precot.mssql.database.model.splunance.BMR14RP15ProductRelease;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.DepartmentRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR01RP01ProductionDetailsRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR03PackingMeterialIssueListRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR03PackingMeterialIssueRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR05AnnexureListLineRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR05AnnexureListRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR06RP07VerificationOfRecordsLineRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR06RP07VerificationOfRecordsRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR07ManufacturingStepsRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR0809ProductionReconciliationRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR09RP11ProcessDlyEqupBrkDwnRecordLineRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR09RP11ProcessDlyEqupBrkDwnRecordRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR10ProcessDeviationRecordRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR11ListsOfEnclosuresRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR12RP13PostProdReviewRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR13RP14QaReleaseLineRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR13RP14QaReleaseRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR14RP15ProductReleaseRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.spulance.BMR01ProdDetailsResponse;
import com.focusr.Precot.payload.spulance.BMR01ProdDetailsResponsePrint;
import com.focusr.Precot.payload.spulance.BMR09ShopageDetailsResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.splunance.RGoodsSummaryDTO;

@Service
public class SupulaceBmrSummaryService {

	Logger log = LoggerFactory.getLogger(SupulaceBmrSummaryService.class);

	@Autowired
	JwtTokenProvider tokenProvider;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserImageDetailsRepository imageRepository;

	@Autowired
	BMR01RP01ProductionDetailsRepository bmr_01_productiondetailsrepository;

	@Autowired
	BMR03PackingMeterialIssueRepository bmr03packingmeterialissuerepository;

	@Autowired
	BMR03PackingMeterialIssueListRepository bmr03packingmeterialissuelistrepository;

	@Autowired
	BMR05AnnexureListRepository bmr05annexurelistrepository;

	@Autowired
	BMR05AnnexureListLineRepository bmr05annexurelistlinerepository;

	@Autowired
	BMR06RP07VerificationOfRecordsRepository bmr06verificationofrecordsrepository;

	@Autowired
	BMR06RP07VerificationOfRecordsLineRepository bmr06verificationofrecordslinerepository;

	@Autowired
	BMR07ManufacturingStepsRepository bmr07manufacturingstepsrepository;

	@Autowired
	BMR0809ProductionReconciliationRepository bmr08productionreconciliationrepository;

	@Autowired
	BMR09RP11ProcessDlyEqupBrkDwnRecordRepository bmr09processdlyequpbrkdwnrecordrepository;

	@Autowired
	BMR10ProcessDeviationRecordRepository bmr10processdeviationrecordrepository;

	@Autowired
	BMR11ListsOfEnclosuresRepository bmr11listsofenclosuresrepository;

	@Autowired
	BMR12RP13PostProdReviewRepository Bmr12postprodreviewrepository;

	@Autowired
	BMR13RP14QaReleaseRepository bmr13qareleaserepository;

	@Autowired
	BMR13RP14QaReleaseLineRepository bmr13qareleaselinerepository;

	@Autowired
	BMR14RP15ProductReleaseRepository bmr14productreleaserepository;

	@Autowired
	private DepartmentRepository departmentRepository;

	// OBJECTS

	BMR01RP01ProductionDetails productionDetailsObj;
	
	@Autowired
	private BMR09RP11ProcessDlyEqupBrkDwnRecordLineRepository bmr09processdlyequpbrkdwnrecordlinerepository;

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveProductionDetails(BMR01RP01ProductionDetails details, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {
				details.setForm_no("PRD02/F-26");
				details.setStatus(AppConstants.supervisorSave);
				details.setSupervisor_id(userId);

				bmr_01_productiondetailsrepository.save(details);

			}

			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not Submit  Details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			log.error("*** Unable to Save *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> bmr_01_productiondetails(BMR01RP01ProductionDetails details, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {
			String value = "";
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}
			
			if (details.getBatchNo() == null) {
				value = "BatchNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				if (details.getPoStatus().equalsIgnoreCase("Open")) {
					String[] batchNoParts = details.getBatchNo().split("-");
					int number = Integer.parseInt(batchNoParts[1]);
					number++;
					String productionBatchNo = batchNoParts[0] + "-" + number;
					details.setNextBatch(productionBatchNo);
					log.info("*** !!! Current Batch No !!!***" + details.getBatchNo());
					log.info("*** !!! Next Batch No !!!***" + details.getNextBatch());
				}

				details.setStatus(AppConstants.supervisorApprovedStatus);
				details.setForm_no("PRD02/F-26");
				details.setSupervisor_id(userId);
				bmr_01_productiondetailsrepository.save(details);
				
				int updateBatch = bmr_01_productiondetailsrepository.updateBatchNoByOrderNoAndManDates(
						details.getBatchNo(), details.getOrder_no(), details.getStart_date(), details.getEnd_date());

				if (updateBatch > 0) {
					log.info("**** !!! UPDATE BATCH Successful !!! ****" + updateBatch);
				} else {
					log.info("**** CLOSING *** ");
				}

			}

			else if (role.equals("ROLE_QA")) {

				details.setForm_no("PRD02/F-26");
				details.setQa_id(userId);
				details.setStatus(AppConstants.qaApprovedStatus);
				bmr_01_productiondetailsrepository.save(details);

			}

			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not Submit  Details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			log.error("*** Unable to Save *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	public ResponseEntity<?> getProductionDetailsLoV() {
		List<String> productionBatchDb = new ArrayList<>();
		List<String> productionnextBatch = new ArrayList<>();
		List<String> updatedProductionLov = new ArrayList<>();
		List<IdAndValuePair> productionDetailsLov = new ArrayList<>();
		
		try {
			// FROM SAP
			productionBatchDb = bmr_01_productiondetailsrepository.productionDetailsBatchNumber();

			// INCREMENTAL FOR OPEN BATCHES
			productionnextBatch = bmr_01_productiondetailsrepository.fetchOpenBatches();

			updatedProductionLov.addAll(productionBatchDb);
			updatedProductionLov.addAll(productionnextBatch);

			try {
				productionBatchDb = null;
				productionnextBatch = null;
			} catch (NullPointerException n) {
				n.printStackTrace();
			}

			// SET ID AND VALUE PAIR
			Long id = (long) 1;
			for (String prod : updatedProductionLov) {
				IdAndValuePair value = new IdAndValuePair();
				value.setValue(prod);
				value.setId(id);
				productionDetailsLov.add(value);
				id++;
			}

			log.info("*** Updated Production" + updatedProductionLov.size());

			try {
				updatedProductionLov = null;
			} catch (NullPointerException n) {
				n.printStackTrace();
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("Unable to Get Batch for Production Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Get Batch for Production Details" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(productionDetailsLov, HttpStatus.OK);
	}
	
	
		// FETCH PRODUCTION DETAILS
	
	public ResponseEntity<?> fetchProductionDetailsByBatchNumber(String batchNo) {
		
		List<BMR01RP01ProductionDetails> productionDetailsList = new LinkedList<>();
		
		try {
			productionDetailsList = bmr_01_productiondetailsrepository.getSummaryByOrderNo(batchNo);
		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("Unable to Get Batch for Production Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, msg), HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(productionDetailsList, HttpStatus.OK);
	}
	
	

	// GET INCREMENTING PRODUCTION LOV

	public String getProductionBatchNoIncrements(String batchNo) {

		List<String> productionList = new ArrayList<>();

		String productionBatchNo = batchNo;

		try {

			Optional<String> statusOpt = bmr_01_productiondetailsrepository.productionDetailsByBatchNo(batchNo);

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
			log.error("Unable to Get Batch for Production Details" + msg);
			ex.printStackTrace();

			return "Failed to Get Batch for Production Details";
		}

	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SavePackingMeterialIssue(BMR03PackingMeterialIssue details, HttpServletRequest http) {
		Long id = details.getPck_id();
		try {
			String value = "";
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			details.setForm_no("PRD02/F-26");
			details.setStatus(AppConstants.supervisorSave);
			bmr03packingmeterialissuerepository.save(details);

			for (BMR03PackingMeterialIssueList lineDetails : details.getDetailsRecords03()) {

				Long Id = details.getPck_id();

				lineDetails.setPck_id(Id);

				bmr03packingmeterialissuelistrepository.save(lineDetails);

			}

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save Chemical & Packing Details *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitPackingMeterialIssue(BMR03PackingMeterialIssue details, HttpServletRequest http) {
		try {
			String value = "";
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}

			if (details.getBatchNo() == null) {
				value = "BatchNo";
			}
			
			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			details.setForm_no("PRD02/F-26");
			details.setStatus(AppConstants.supervisorApprovedStatus);
			bmr03packingmeterialissuerepository.save(details);

			for (BMR03PackingMeterialIssueList lineDetails : details.getDetailsRecords03()) {

				Long Id = details.getPck_id();

				lineDetails.setPck_id(Id);

				bmr03packingmeterialissuelistrepository.save(lineDetails);

			}

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save Chemical & Packing Details *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveProcessingEquipments(BMR05AnnexureList details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {
			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PRD02/F-26");
				details.setSupervisor_id(userId);
				details.setStatus(AppConstants.supervisorSave);
				bmr05annexurelistrepository.save(details);

				for (BMR05AnnexureListLine lineDetails : details.getDetailsAnnexureRecords05()) {

					Long Id = details.getId();

					lineDetails.setId(Id);

					bmr05annexurelistlinerepository.save(lineDetails);

				}
			}

			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not Submit  Details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {
			log.error("*** Unable to Save Chemical & Packing Details *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitProcessingEquipments(BMR05AnnexureList details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {
			String value = "";
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}
			
			if (details.getBatchNo() == null) {
				value = "BatchNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PRD02/F-26");
				details.setSupervisor_id(userId);
				details.setStatus(AppConstants.supervisorApprovedStatus);
				bmr05annexurelistrepository.save(details);

				for (BMR05AnnexureListLine lineDetails : details.getDetailsAnnexureRecords05()) {

					Long Id = details.getId();

					lineDetails.setId(Id);

					bmr05annexurelistlinerepository.save(lineDetails);

				}

			}

			else if (role.equals("ROLE_QA")) {

				details.setForm_no("PRD02/F-26");
				details.setQa_id(userId);
				details.setStatus(AppConstants.qaApprovedStatus);
				bmr05annexurelistrepository.save(details);

				for (BMR05AnnexureListLine lineDetails : details.getDetailsAnnexureRecords05()) {

					Long Id = details.getId();

					lineDetails.setId(Id);

					bmr05annexurelistlinerepository.save(lineDetails);

				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not Submit  Details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			log.error("*** Unable to Save Chemical & Packing Details *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveVerificationOfRecords(BMR06RP07VerificationOfRecords details,
			HttpServletRequest http) {
		String role = getUserRole();
		
		SCAUtil scaUtil = new SCAUtil();
		try {

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
//			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

//			if (id == null) {
			String value = "";
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}
			
			
			if(role.equalsIgnoreCase("ROLE_SUPERVISOR")) {
				
				details.setForm_no("PRD02/F-26");

				details.setSupervisor_save_by(userName);
				details.setSupervisor_save_on(date);
				details.setSupervisor_save_id(userId);
				details.setSupervisor_status(AppConstants.supervisorSave);
				bmr06verificationofrecordsrepository.save(details);

				for (BMR06RP07VerificationOfRecordsLine lineDetails : details.getDetailsRecords06()) {

					Long Id = details.getVerification_id();

					lineDetails.setVerification_id(Id);

					bmr06verificationofrecordslinerepository.save(lineDetails);

				}
				
			}
			
			else if(role.equalsIgnoreCase("ROLE_QA")) {
				
				details.setForm_no("PRD02/F-26");

//				details.setSupervisor_save_by(userName);
//				details.setSupervisor_save_on(date);
//				details.setSupervisor_save_id(userId);
				details.setQa_sign(userName);
				details.setQa_status(AppConstants.qaSave);
				bmr06verificationofrecordsrepository.save(details);

				for (BMR06RP07VerificationOfRecordsLine lineDetails : details.getDetailsRecords06()) {

					Long Id = details.getVerification_id();

					lineDetails.setVerification_id(Id);

					bmr06verificationofrecordslinerepository.save(lineDetails);

				}
				
			}
			

//			}

		} catch (Exception ex) {

			log.error("*** Unable to Save Chemical & Packing Details *** " + ex);
			String msg = scaUtil.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	// Submit

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitVerificationOfRecords(BMR06RP07VerificationOfRecords details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();
		Long id = details.getVerification_id();
		BMR06RP07VerificationOfRecords checkObj = new BMR06RP07VerificationOfRecords();

		try {

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			String value = "";
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}
			
			if (details.getBatchNo() == null) {
				value = "BatchNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			if (id != null) {

				checkObj = bmr06verificationofrecordsrepository.getSummaryByVerification_id06(id);

				String[] IgnoreProps = { "verification_id", "createdBy", "createdAt", "supervisor_status",
						"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
						"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "qa_status", "qa_save_on",
						"qa_save_by", "qa_save_id", "qa_submit_on", "qa_submit_by", "qa_submit_id", "qa_mail_status",
						"qa_sign", "supervisor_signature_image", "qa_signature_image", "form_no" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {

					checkObj.setForm_no("PRD02/F-26");
					checkObj.setSupervisor_submit_by(userName);
					checkObj.setSupervisor_submit_on(date);
					checkObj.setSupervisor_submit_id(userId);
					checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);

					// Image

					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

					checkObj.setSupervisor_signature_image(signature);

					bmr06verificationofrecordsrepository.save(checkObj);

					for (BMR06RP07VerificationOfRecordsLine lineDetails : checkObj.getDetailsRecords06()) {

						Long Id = details.getVerification_id();

						lineDetails.setVerification_id(Id);

						bmr06verificationofrecordslinerepository.save(lineDetails);

					}

				}

				else if (role.equals("ROLE_QA")) {

					String supervisiorStatus = checkObj.getSupervisor_status();
					if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)) {

						checkObj.setForm_no("PRD02/F-26");

						checkObj.setQa_submit_by(userName);
						checkObj.setQa_submit_on(date);
						checkObj.setQa_submit_id(userId);
						checkObj.setQa_status(AppConstants.qaApprovedStatus);

						for (BMR06RP07VerificationOfRecordsLine lineDetails : details.getDetailsRecords06()) {

							Long Id = details.getVerification_id();

							lineDetails.setVerification_id(Id);

							bmr06verificationofrecordslinerepository.save(lineDetails);

						}

						// Qa Image

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setQa_signature_image(signature);

						bmr06verificationofrecordsrepository.save(checkObj);

					} else {

						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}

			}

			else {

				if (!role.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity(new ApiResponse(false, role + "can not submit New Details"),
							HttpStatus.BAD_REQUEST);
				}

				checkObj = details;

				checkObj.setForm_no("PRD02/F-26");
				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);

				// Image

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setSupervisor_signature_image(signature);

				bmr06verificationofrecordsrepository.save(checkObj);

				for (BMR06RP07VerificationOfRecordsLine lineDetails : checkObj.getDetailsRecords06()) {

					Long Id = details.getVerification_id();

					lineDetails.setVerification_id(Id);

					bmr06verificationofrecordslinerepository.save(lineDetails);

				}

			}
		} catch (Exception ex) {
			log.error("*** Unable to Save Verification Of Records*** " + ex);
			String msg = scaUtil.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(checkObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SaveManufacturingSteps(BMR07ManufacturingSteps details, HttpServletRequest http) {
		Long id = details.getId();
		SCAUtil scaUtil = new SCAUtil();

		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		
		try {

			String value = "";
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			if(role.equalsIgnoreCase("ROLE_SUPERVISOR")) {
				details.setForm_no("PRD02/F-26");
				details.setSupervisor_save_by(userName);
				details.setSupervisor_save_on(date);
				details.setSupervisor_save_id(userId);
				details.setSupervisor_status(AppConstants.supervisorSave);
				bmr07manufacturingstepsrepository.save(details);
			}
			else if(role.equalsIgnoreCase("ROLE_QA")) {
				details.setQa_sign(userName);
				details.setQa_status(AppConstants.qaSave);
				bmr07manufacturingstepsrepository.save(details);
			}
			

		} catch (Exception ex) {

			log.error("*** Unable to Save Manufacturing Steps *** " + ex);
			String msg = scaUtil.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save Manufacturing Steps " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	// Submit
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitManufacturingSteps(BMR07ManufacturingSteps details, HttpServletRequest http) {
		Long id = details.getId();
		BMR07ManufacturingSteps checkObj = new BMR07ManufacturingSteps();
		SCAUtil scaUtil = new SCAUtil();
		try {

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			String value = "";
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}
			if (details.getBatchNo() == null) {
				value = "BatchNo";
			}
			
			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			if (id != null) {

				checkObj = bmr07manufacturingstepsrepository.getSummaryById07(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "qa_status", "qa_save_on", "qa_save_by",
						"qa_save_id", "qa_submit_on", "qa_submit_by", "qa_submit_id", "qa_mail_status", "qa_sign",
						"supervisor_signature_image", "qa_signature_image", "form_no" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {

					checkObj.setForm_no("PRD02/F-26");
					checkObj.setSupervisor_submit_by(userName);
					checkObj.setSupervisor_submit_on(date);
					checkObj.setSupervisor_submit_id(userId);
					checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);

					// Image

					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

					checkObj.setSupervisor_signature_image(signature);

					bmr07manufacturingstepsrepository.save(checkObj);

				}

				else if (role.equals("ROLE_QA")) {

					String supervisiorStatus = checkObj.getSupervisor_status();
					if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)) {

						checkObj.setForm_no("PRD02/F-26");

						checkObj.setQa_submit_by(userName);
						checkObj.setQa_submit_on(date);
						checkObj.setQa_submit_id(userId);
						checkObj.setQa_status(AppConstants.qaApprovedStatus);

						// Qa Image

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setQa_signature_image(signature);

						bmr07manufacturingstepsrepository.save(checkObj);

					} else {

						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}

			}

			else {

				if (!role.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity(new ApiResponse(false, role + "can not submit New Details"),
							HttpStatus.BAD_REQUEST);
				}

				checkObj = details;
				checkObj.setForm_no("PRD02/F-26");
				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);

				// Image

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setSupervisor_signature_image(signature);

				bmr07manufacturingstepsrepository.save(checkObj);

			}
		} catch (Exception ex) {

			log.error("*** Unable to Save *** " + ex);
			String msg = scaUtil.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(checkObj, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveProductReconciliation(BMR08RP09ProductionReconciliation details,
			HttpServletRequest http) {
		Long id = details.getId();
		try {
			if (id == null) {
				String value = "";
				if (details.getOrder_no() == null) {
					value = "OrderNo";
				}
				
				if (details.getBatchNo() == null) {
					value = "BatchNo";
				}

				if (!"".equals(value)) {
					return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
							HttpStatus.BAD_REQUEST);
				}

				details.setForm_no("PRD02/F-26");
				bmr08productionreconciliationrepository.save(details);

			}

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save  *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveDelayEqupmentBrkDwnRecord(BMR09RP11ProcessDlyEqupBrkDwnRecord details,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PRD02/F-26");
				details.setStatus(AppConstants.supervisorSave);
				details.setSupervisor_id(userId);
				bmr09processdlyequpbrkdwnrecordrepository.save(details);
				
				
				for (BMR09RP11ProcessDlyEqupBrkDwnRecordLine lineDetails : details.getSpunlacrdetails()) {
					
					lineDetails.setId(details.getId());
					
					bmr09processdlyequpbrkdwnrecordlinerepository.save(lineDetails);
				}
				

			}

			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not Submit  Details"),
						HttpStatus.BAD_REQUEST);
			}
		} catch (Exception ex) {

			log.error("*** Unable to Save *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitDelayEqupmentBrkDwnRecord(BMR09RP11ProcessDlyEqupBrkDwnRecord details,

			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {
			String value = "";
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}
			
			if (details.getBatchNo() == null) {
				value = "BatchNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PRD02/F-26");
				details.setStatus(AppConstants.supervisorApprovedStatus);
				details.setSupervisor_id(userId);
				bmr09processdlyequpbrkdwnrecordrepository.save(details);
				
				
				for (BMR09RP11ProcessDlyEqupBrkDwnRecordLine lineDetails : details.getSpunlacrdetails()) {
					
					lineDetails.setId(details.getId());
					
					bmr09processdlyequpbrkdwnrecordlinerepository.save(lineDetails);
				}

			}

			

			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not Submit  Details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			log.error("*** Unable to Save *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveProcessDeviationRecord(BMR10ProcessDeviationRecord details, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PRD02/F-26");
				details.setStatus(AppConstants.supervisorSave);
				details.setSupervisor_id(userId);
				bmr10processdeviationrecordrepository.save(details);
			}

			else if (role.equals("ROLE_QA")) {

				details.setForm_no("PRD02/F-26");
				details.setStatus(AppConstants.qaSave);
				details.setQa_id(userId);
//				details.setSupervisor_id(userId);
				bmr10processdeviationrecordrepository.save(details);
			}
			
			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not Save  Details"),
						HttpStatus.BAD_REQUEST);

			}
		} catch (Exception ex) {

			log.error("*** Unable to Save  *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitProcessDeviationRecord(BMR10ProcessDeviationRecord details,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		try {
			String value = "";
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}

			
			if (details.getBatchNo() == null) {
				value = "BatchNo";
			}
			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PRD02/F-26");
				details.setStatus(AppConstants.supervisorApprovedStatus);
				details.setSupervisor_id(userId);
				bmr10processdeviationrecordrepository.save(details);
			}

			else if (role.equals("ROLE_QA")) {

				details.setForm_no("PRD02/F-26");
				details.setStatus(AppConstants.qaApprovedStatus);
				details.setQa_id(userId);
				bmr10processdeviationrecordrepository.save(details);

			}

			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not Submit  Details"),
						HttpStatus.BAD_REQUEST);

			}

		} catch (Exception ex) {

			log.error("*** Unable to Save Chemical & Packing Details *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveListOFEnclousers(BMR11ListsOfEnclosures details, HttpServletRequest http) {
		try {
			String value = "";
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			details.setForm_no("PRD02/F-26");
			bmr11listsofenclosuresrepository.save(details);

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save Chemical & Packing Details *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SavePostProductionReview(BMR12RP13PostProdReview details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PRD02/F-26");
				details.setStatus(AppConstants.supervisorSave);
				details.setSupervisor_id(userId);
				Bmr12postprodreviewrepository.save(details);

			}

			else if (role.equals("ROLE_HOD") || role.equals("ROLE_DESIGNEE")) {
//
//				if(details.getStatus().equals(AppConstants.supervisorSave)) {
//				
//				details.setForm_no("PH-PRD04/F-26");
//				details.setHod_id(userId);
//				details.setStatus(AppConstants.hodApprovedStatus);
//				Bmr12postprodreviewrepository.save(details);
//				
//				}
//				else {
//					return new ResponseEntity(new ApiResponse(false, "Supervisior not yet Submitted"),
//							HttpStatus.BAD_REQUEST);
//				}
				
				details.setForm_no("PH-PRD04/F-26");
				details.setHod_id(userId);
				details.setStatus(AppConstants.hodApprovedStatus);
				Bmr12postprodreviewrepository.save(details);
				
//				
			}

			else if (role.equals("ROLE_QA")) {

//				if(details.getStatus().equals(AppConstants.hodApprovedStatus)) {
//
//				details.setForm_no("PRD02/F-26");
//				details.setStatus(AppConstants.qaApprovedStatus);
//				details.setQa_id(userId);
//				Bmr12postprodreviewrepository.save(details);
//
//			}
				
				details.setForm_no("PRD02/F-26");
				details.setStatus(AppConstants.qaApprovedStatus);
				details.setQa_id(userId);
				Bmr12postprodreviewrepository.save(details);
				
			}
			
			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not Submit Details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			log.error("*** Unable to Save Chemical & Packing Details *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitPostProductionReview(BMR12RP13PostProdReview details, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {
			String value = "";
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}
			
			if (details.getBatchNo() == null) {
				value = "BatchNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PRD02/F-26");
				details.setStatus(AppConstants.supervisorApprovedStatus);
				details.setSupervisor_id(userId);
				Bmr12postprodreviewrepository.save(details);

			}
			
			else if (role.equals("ROLE_HOD") || role.equals("ROLE_DESIGNEE")) {

				if(details.getStatus().equals(AppConstants.supervisorApprovedStatus)) {
				
				details.setForm_no("PRD02/F-26");
				details.setHod_id(userId);
				details.setStatus(AppConstants.hodApprovedStatus);
				Bmr12postprodreviewrepository.save(details);
				
				}
				else {
					return new ResponseEntity(new ApiResponse(false, "Supervisior not yet Submitted"),
							HttpStatus.BAD_REQUEST);
				}
				
			}

			else if (role.equals("ROLE_QA")) {
				
				if(details.getStatus().equals(AppConstants.hodApprovedStatus)) {

				details.setForm_no("PRD02/F-26");
				details.setStatus(AppConstants.qaApprovedStatus);
				details.setQa_id(userId);
				Bmr12postprodreviewrepository.save(details);

			}
				else {
					return new ResponseEntity(new ApiResponse(false, "HOD not yet Submitted"),
							HttpStatus.BAD_REQUEST);
				}
				
			}

			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not Submit  Details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			log.error("*** Unable to Save Chemical & Packing Details *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveQaRelease(BMR13RP14QaRelease details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {
			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_QA")) {

				details.setForm_no("PRD02/F-26");
				details.setQa_id(userId);
				details.setStatus(AppConstants.qaSave);
				bmr13qareleaserepository.save(details);

				for (BMR13RP14QaReleaseLine lineDetails : details.getDetails()) {
					lineDetails.setRls_id(details.getRls_id());
					bmr13qareleaselinerepository.save(lineDetails);
				}
			}

			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not Submit  Details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {
			log.error("*** Unable to Save Chemical & Packing Details *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitQaRelease(BMR13RP14QaRelease details, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {
			String value = "";
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}
			if (details.getBatchNo() == null) {
				value = "BatchNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_QA")) {

				details.setForm_no("PRD02/F-26");
				details.setQa_id(userId);
				details.setStatus(AppConstants.qaApprovedStatus);
				bmr13qareleaserepository.save(details);

				for (BMR13RP14QaReleaseLine lineDetails : details.getDetails()) {
					lineDetails.setRls_id(details.getRls_id());
					bmr13qareleaselinerepository.save(lineDetails);
				}
			}

			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not Submit  Details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			log.error("*** Unable to Save Chemical & Packing Details *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveProductRelease(BMR14RP15ProductRelease details, HttpServletRequest http) {
		Long id = details.getId();
		try {
			if (id == null) {
				String value = "";
				if (details.getOrder_no() == null) {
					value = "OrderNo";
				}

				if (!"".equals(value)) {
					return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
							HttpStatus.BAD_REQUEST);
				}

				details.setForm_no("PRD02/F-26");
				bmr14productreleaserepository.save(details);

			}

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save Chemical & Packing Details *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	public ResponseEntity<?> GetProductionDetails(String order_no, String fromdate, String todate) {
		List<BMR01RP01ProductionDetails> bmr01rp01productiondetails;
		List<Map<String, Object>> bmr01rp01productiondetailsSap;

		try {
			bmr01rp01productiondetails = bmr_01_productiondetailsrepository.getSummaryByOrderNo(order_no);
			bmr01rp01productiondetailsSap = bmr_01_productiondetailsrepository.getRGoodsSummaryByPOrder(order_no,
					fromdate, todate);

			BMR01ProdDetailsResponse response = new BMR01ProdDetailsResponse(bmr01rp01productiondetails,
					bmr01rp01productiondetailsSap);
			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get 01.Production Details by Order No*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Get 01.Production Details by Order No " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}
	
	
	
		// GET PRODUCTION DETAILS BY DATE   -- CR PRODUCTION DETAILS
	
	public ResponseEntity<?> getShaftNumberDetailsByDate(String orderNumber, String fromDate, String toDate) {
		
		List<String> shaftNumberList = new ArrayList<String>();
		
		List<IdAndValuePair> shaftvaluePairList = new ArrayList<IdAndValuePair>();
		
		try {
			
			shaftNumberList = bmr_01_productiondetailsrepository.shaftByDate(orderNumber, fromDate, toDate);
			
			Long id = (long) 1;
			
			for(String temp : shaftNumberList) {
				
				IdAndValuePair value = new IdAndValuePair();
				value.setValue(temp);
				value.setId(id);
				
				shaftvaluePairList.add(value);
				
				id++;
			}
			
		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Shaft Number by Order No*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Get Shaft Number by Order No " + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(shaftvaluePairList);
	}
	
	
		// GET PRODUCTION DETAILS BY SHAFT, DATE AND ORDER
	
	
	public ResponseEntity<?> getProductionDetailsByShaftDateOrder(String orderNumber, String fromDate, String toDate, String fromShaft, String toShaft) {
		
		List<Map<String, Object>> bmr01rp01productiondetailsSap;
//		List<RGoodsSummaryDTO> bmrproductionDetailsSap;
		
		try {
			
			Long fromShaftNumber = Long.parseLong(fromShaft);
			Long toShaftNumber = Long.parseLong(toShaft);
					
			log.info("From Shaft: {} To Shaft: {}", fromShaftNumber, toShaftNumber);
			log.info("From Date: {} To Date: {} OrderNumber {}", fromDate, toDate, orderNumber);
			
//			bmr01rp01productiondetailsSap = bmr_01_productiondetailsrepository.getRGoodsSummaryByPOrder1(orderNumber, fromDate, toDate, fromShaft, toShaft);
			bmr01rp01productiondetailsSap = bmr_01_productiondetailsrepository.productionDetailsByShaftDate(orderNumber, fromDate, toDate, fromShaft, toShaft);
			
//			BMR01ProdDetailsResponse response = new BMR01ProdDetailsResponse(null,
//					bmr01rp01productiondetailsSap);
			
//			bmr01rp01productiondetailsSap = bmr_01_productiondetailsrepository.productionDetailsByShaftDateOrder(orderNumber, fromDate, toDate, fromShaft, toShaft);
			
			return ResponseEntity.status(HttpStatus.OK).body(bmr01rp01productiondetailsSap);
			
		} catch(Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Production Details by Order No and Shaft Number*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Get Production details by order and shaft number and by date !!! " + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		
	}
	
	

	public ResponseEntity<?> GetPackingMeterialIssue(String order_no) {
		List<BMR03PackingMeterialIssue> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr03packingmeterialissuerepository.getSummaryByOrderNo03(order_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get 01.Production Details by Order No*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Get 01.Production Details by Order No " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> GetProcessingEquipments(String order_no) {
		List<BMR05AnnexureList> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr05annexurelistrepository.getSummaryByOrderNo05(order_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get 01.Production Details by Order No*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Get 01.Production Details by Order No " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> GetVerificationOfRecords(String order_no) {
		List<BMR06RP07VerificationOfRecords> bmrSummaryDateList;

		try {

			bmrSummaryDateList = bmr06verificationofrecordsrepository.getSummaryByOrderNo06(order_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get 01.Production Details by Order No*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Get 01.Production Details by Order No " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> GetManufacturingSteps(String order_no) {
		List<BMR07ManufacturingSteps> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr07manufacturingstepsrepository.getSummaryByOrderNo07(order_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get 01.Production Details by Order No*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Get 01.Production Details by Order No " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> GetProductReconciliation(String order_no) {
		List<BMR08RP09ProductionReconciliation> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr08productionreconciliationrepository.getSummaryByOrderNo08(order_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get 01.Production Details by Order No*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Get 01.Production Details by Order No " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

//	public ResponseEntity<?> GetDelayEqupmentBrkDwnRecord(String order_no) {
//		List<BMR09RP11ProcessDlyEqupBrkDwnRecord> bmrSummaryDateList;
//
//		try {
//			bmrSummaryDateList = bmr09processdlyequpbrkdwnrecordrepository.getSummaryByOrderNo09(order_no);
//
//			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);
//
//		}
//
//		catch (Exception ex) {
//			SCAUtil sca = new SCAUtil();
//			log.error("*** Unable to Get 01.Production Details by Order No*** " + ex);
//			String msg = sca.getErrorMessage(ex);
//			return new ResponseEntity<>(
//					new ApiResponse(false, "Unable to Get 01.Production Details by Order No " + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//	}

	public ResponseEntity<?> GetDelayEqupmentBrkDwnRecord(String batch_no,String order_no, String from_date, String to_date) {
		List<BMR09RP11ProcessDlyEqupBrkDwnRecord> bmrSummaryDateList;
		List<Map<String, Object>> mapList = new ArrayList<>();
		List<Map<String, Object>> stoppageList09 = new ArrayList<>();

		try {
			
		
			if("".equals(from_date) || "".equals(to_date) || from_date == null || to_date == null) {
				return new ResponseEntity(new ApiResponse(false, "Should pass fromdate and todate to fetch stoppage details"), HttpStatus.BAD_REQUEST);
			}
			
			bmrSummaryDateList = bmr09processdlyequpbrkdwnrecordrepository.getSummaryByOrderNo09(batch_no);
			mapList = departmentRepository.stoppage8BMR(order_no, from_date, to_date);

			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			for (Map<String, Object> temp : mapList) {
				Date packDate = (Date) temp.get("PackDate");
				String fromTime = (String) temp.get("fromTime");
				String toTime = (String) temp.get("toTime");

				if (packDate != null && fromTime != null && toTime != null) {
					stoppageList09 = departmentRepository.orderStoppageByBmr(packDate, fromTime, toTime);
				}
			}

			BMR09ShopageDetailsResponse response = new BMR09ShopageDetailsResponse(bmrSummaryDateList, stoppageList09);
			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Production Details  *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get Production Details " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> GetProcessDeviationRecord(String order_no) {
		List<BMR10ProcessDeviationRecord> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr10processdeviationrecordrepository.getSummaryByOrderNo10(order_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get 01.Production Details by Order No*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Get 01.Production Details by Order No " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> GetListOFEnclousers(String order_no) {
		List<BMR11ListsOfEnclosures> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr11listsofenclosuresrepository.getSummaryByOrderNo11(order_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get 01.Production Details by Order No*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Get 01.Production Details by Order No " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> GetPostProductionReview(String order_no) {
		List<BMR12RP13PostProdReview> bmrSummaryDateList;

		try {
			bmrSummaryDateList = Bmr12postprodreviewrepository.getSummaryByOrderNo12(order_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get 01.Production Details by Order No*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Get 01.Production Details by Order No " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> GetQaRelease(String order_no) {
		List<BMR13RP14QaRelease> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr13qareleaserepository.getSummaryByOrderNo13(order_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get 01.Production Details by Order No*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Get 01.Production Details by Order No " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> GetProductRelease(String order_no) {
		List<BMR14RP15ProductRelease> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr14productreleaserepository.getSummaryByOrderNo14(order_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get 01.Production Details by Order No*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Get 01.Production Details by Order No " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> GetBmrPrint(String order_no) {
		List<BMR01RP01ProductionDetails> bmr01productiondetails;
		List<Map<String, Object>> bmr01productiondetailsSap;
		List<BMR03PackingMeterialIssue> bmr03packingmeterialissue;
		List<BMR05AnnexureList> bmr05annexurelist;
		List<BMR06RP07VerificationOfRecords> bmr06verificationofrecords;
		List<BMR07ManufacturingSteps> bmr07manufacturingsteps;
		List<BMR08RP09ProductionReconciliation> bmr08productionreconciliation;
		List<BMR09RP11ProcessDlyEqupBrkDwnRecord> bmr09processdlyequpbrkdwnrecord;
		List<Map<String, Object>> stoppageList09;
		List<BMR10ProcessDeviationRecord> bmr10processdeviationrecord;
		List<BMR11ListsOfEnclosures> bmr11listsofenclosures;
		List<BMR12RP13PostProdReview> bmr12postprodreview;
		List<BMR13RP14QaRelease> bmr13qarelease;
		List<BMR14RP15ProductRelease> bmr14productrelease;

		try {

			productionDetailsObj = bmr_01_productiondetailsrepository.getproductionDetailsByBatchNo(order_no);
			String fromdate = productionDetailsObj.getStart_date();
			String todate = productionDetailsObj.getEnd_date();
			
			System.out.println("From Date" + fromdate + todate + order_no);
			
			
			String order_number = productionDetailsObj.getOrder_no();
			
			System.out.println("Order Number" + order_number);

			bmr01productiondetails = bmr_01_productiondetailsrepository.getSummaryByOrderNo(order_no);
			
			bmr01productiondetailsSap = bmr_01_productiondetailsrepository.getRGoodsSummaryByPOrder(order_number, fromdate,
					todate);
			
			System.out.println("sap" + bmr01productiondetailsSap.size());
			
			bmr03packingmeterialissue = bmr03packingmeterialissuerepository.getSummaryByOrderNo03(order_no);
			bmr05annexurelist = bmr05annexurelistrepository.getSummaryByOrderNo05(order_no);
			bmr06verificationofrecords = bmr06verificationofrecordsrepository.getSummaryByOrderNo06(order_no);
			bmr07manufacturingsteps = bmr07manufacturingstepsrepository.getSummaryByOrderNo07(order_no);
			bmr08productionreconciliation = bmr08productionreconciliationrepository.getSummaryByOrderNo08(order_no);
			bmr09processdlyequpbrkdwnrecord = bmr09processdlyequpbrkdwnrecordrepository.getSummaryByOrderNo09(order_no);
			stoppageList09 = fetchStoppageDetails(order_number, fromdate, todate);
			bmr10processdeviationrecord = bmr10processdeviationrecordrepository.getSummaryByOrderNo10(order_no);
			bmr11listsofenclosures = bmr11listsofenclosuresrepository.getSummaryByOrderNo11(order_no);
			bmr12postprodreview = Bmr12postprodreviewrepository.getSummaryByOrderNo12(order_no);
			bmr13qarelease = bmr13qareleaserepository.getSummaryByOrderNo13(order_no);
			bmr14productrelease = bmr14productreleaserepository.getSummaryByOrderNo14(order_no);

			BMR01ProdDetailsResponsePrint response = new BMR01ProdDetailsResponsePrint(bmr01productiondetails,
					bmr01productiondetailsSap, bmr03packingmeterialissue, bmr05annexurelist, bmr06verificationofrecords,
					bmr07manufacturingsteps, bmr08productionreconciliation, bmr09processdlyequpbrkdwnrecord,
					stoppageList09, bmr10processdeviationrecord, bmr11listsofenclosures, bmr12postprodreview,
					bmr13qarelease, bmr14productrelease);
			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get 01.Production Details by Order No*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Get 01.Production Details by Order No " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// Add Shoppage Details

	private List<Map<String, Object>> fetchStoppageDetails(String order_no, String from_date, String to_date) {
		List<Map<String, Object>> stoppageList09 = new ArrayList<>();
		List<Map<String, Object>> mapList = departmentRepository.stoppage8BMR(order_no, from_date, to_date);

		for (Map<String, Object> temp : mapList) {
			Date packDate = (Date) temp.get("PackDate");
			String fromTime = (String) temp.get("fromTime");
			String toTime = (String) temp.get("toTime");

			if (packDate != null && fromTime != null && toTime != null) {
				List<Map<String, Object>> tempStoppageList = departmentRepository.orderStoppageByBmr(packDate, fromTime,
						toTime);
				if (tempStoppageList != null) {
					stoppageList09.addAll(tempStoppageList);
				}
			}
		}

		return stoppageList09;
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
