package com.focusr.Precot.mssql.database.service.splunance;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
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
import com.focusr.Precot.mssql.database.model.splunance.BMR06RP07VerificationOfRecords;
import com.focusr.Precot.mssql.database.model.splunance.BMR06RP07VerificationOfRecordsLine;
import com.focusr.Precot.mssql.database.model.splunance.BMR08RP09ProductionReconciliation;
import com.focusr.Precot.mssql.database.model.splunance.BMR09RP11ProcessDlyEqupBrkDwnRecord;
import com.focusr.Precot.mssql.database.model.splunance.BMR09RP11ProcessDlyEqupBrkDwnRecordLine;
import com.focusr.Precot.mssql.database.model.splunance.BMR12RP13PostProdReview;
import com.focusr.Precot.mssql.database.model.splunance.BMR13RP14QaRelease;
import com.focusr.Precot.mssql.database.model.splunance.BMR13RP14QaReleaseLine;
import com.focusr.Precot.mssql.database.model.splunance.BMR14RP15ProductRelease;
import com.focusr.Precot.mssql.database.model.splunance.RP02AnnexerInputDetailsProductionDetails;
import com.focusr.Precot.mssql.database.model.splunance.RPB04PackingMeterialDetails;
import com.focusr.Precot.mssql.database.model.splunance.RPB04PackingMeterialDetailsLine;
import com.focusr.Precot.mssql.database.model.splunance.RPB06ProcessingEqupments;
import com.focusr.Precot.mssql.database.model.splunance.RPB06ProcessingEqupmentsLine;
import com.focusr.Precot.mssql.database.model.splunance.RPB08ManufactureSteps;
import com.focusr.Precot.mssql.database.model.splunance.RPB10ProcessDevRecord;
import com.focusr.Precot.mssql.database.model.splunance.RPB10ProcessDevReocrdLine;
import com.focusr.Precot.mssql.database.model.splunance.RPB12ListOfEnclouser;
import com.focusr.Precot.mssql.database.model.splunance.RPB12ListOfEnclouserLine;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.DepartmentRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR01RP01ProductionDetailsRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR06RP07VerificationOfRecordsLineRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR06RP07VerificationOfRecordsRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR0809ProductionReconciliationRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR09RP11ProcessDlyEqupBrkDwnRecordLineRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR09RP11ProcessDlyEqupBrkDwnRecordRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR12RP13PostProdReviewRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR13RP14QaReleaseLineRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR13RP14QaReleaseRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR14RP15ProductReleaseRepository;
import com.focusr.Precot.mssql.database.repository.splunance.RP02AnnexerInputDetailsProductionDetailsRepository;
import com.focusr.Precot.mssql.database.repository.splunance.RPB04PackingMeterialDetailsLineRepository;
import com.focusr.Precot.mssql.database.repository.splunance.RPB04PackingMeterialDetailsRepository;
import com.focusr.Precot.mssql.database.repository.splunance.RPB06ProcessingEqupmentsLineRepository;
import com.focusr.Precot.mssql.database.repository.splunance.RPB06ProcessingEqupmentsRepository;
import com.focusr.Precot.mssql.database.repository.splunance.RPB08ManufactureStepsRepository;
import com.focusr.Precot.mssql.database.repository.splunance.RPB10ProcessDevRecordRepository;
import com.focusr.Precot.mssql.database.repository.splunance.RPB10ProcessDevReocrdLineRepository;
import com.focusr.Precot.mssql.database.repository.splunance.RPB12ListOfEnclouserLineRepository;
import com.focusr.Precot.mssql.database.repository.splunance.RPB12ListOfEnclouserRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.spulance.RPB01ProdDetailsResponse;
import com.focusr.Precot.payload.spulance.RPB02ProdDetailsResponsePrint;
import com.focusr.Precot.payload.spulance.RPB11ShopageDetailsResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;

@SuppressWarnings("unchecked")
@Service
public class SupulaceRpBmrSummaryService {

	Logger log = LoggerFactory.getLogger(SupulaceRpBmrSummaryService.class);

	@Autowired
	JwtTokenProvider tokenProvider;

//	@Autowired
//	private SCAUtil scaUtil;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserImageDetailsRepository imageRepository;

	@Autowired
	private BMR01RP01ProductionDetailsRepository bmr_01_productiondetailsrepository;

	@Autowired
	private RPB04PackingMeterialDetailsRepository rpb04packingmeterialdetailsrepository;

	@Autowired
	private RPB04PackingMeterialDetailsLineRepository rpb04packingmeterialdetailslinerepository;

	@Autowired
	private RPB06ProcessingEqupmentsRepository rpb06processingequpmentsrepository;

	@Autowired
	private RPB06ProcessingEqupmentsLineRepository rpb06processingequpmentslinerepository;

	@Autowired
	private RPB08ManufactureStepsRepository rpb08manufacturestepsrepository;

	@Autowired
	private RPB10ProcessDevRecordRepository rpb10processdevrecordrepository;

	@Autowired
	private RPB10ProcessDevReocrdLineRepository rpb10processdevreocrdlinerepository;

	@Autowired
	private RPB12ListOfEnclouserRepository rpb12listofenclouserrepository;

	@Autowired
	private RPB12ListOfEnclouserLineRepository rpb12listofenclouserlinerepository;

	@Autowired
	private BMR06RP07VerificationOfRecordsRepository bmr07verificationofrecordsrepository;

	@Autowired
	private BMR06RP07VerificationOfRecordsLineRepository bmr07verificationofrecordslinerepository;

	@Autowired
	private BMR0809ProductionReconciliationRepository bmr09productionreconciliationrepository;

	@Autowired
	private BMR09RP11ProcessDlyEqupBrkDwnRecordRepository bmr11processdlyequpbrkdwnrecordrepository;

	@Autowired
	private BMR12RP13PostProdReviewRepository Bmr12postprodreviewrepository;

	@Autowired
	private BMR13RP14QaReleaseRepository bmr13qareleaserepository;

	@Autowired
	private BMR13RP14QaReleaseLineRepository bmr13qareleaselinerepository;

	@Autowired
	private BMR14RP15ProductReleaseRepository bmr14productreleaserepository;

	@Autowired
	private DepartmentRepository departmentRepository;

	@Autowired
	private RP02AnnexerInputDetailsProductionDetailsRepository rp02annexerinputdetailsproductiondetailsrepository;

	@Autowired
	private BMR09RP11ProcessDlyEqupBrkDwnRecordLineRepository bmr09processdlyequpbrkdwnrecordlinerepository;

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveProductionDetails(BMR01RP01ProductionDetails details, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {
				details.setForm_no("PRD02/F-27");
				details.setSupervisor_id(userId);
				details.setStatus(AppConstants.supervisorSave);
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
	public ResponseEntity<?> SubmitProductionDetails(BMR01RP01ProductionDetails details, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {

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
				
				details.setForm_no("PRD02/F-27");
				details.setSupervisor_id(userId);
				details.setStatus(AppConstants.supervisorApprovedStatus);
				
				bmr_01_productiondetailsrepository.save(details);
				
				log.info("From date" + details.getStart_date() + details.getEnd_date());

			}

			else if (role.equals("ROLE_QA")) {

				details.setForm_no("PRD02/F-27");
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

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveAnnexurInputDetails(RP02AnnexerInputDetailsProductionDetails details,
			HttpServletRequest http) {
		try {
			String value = "";
			if (details.getBatch_no() == null) {
				value = "batch_no";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			details.setForm_no("PRD02/F-27");
			details.setStatus(AppConstants.supervisorSave);
			rp02annexerinputdetailsproductiondetailsrepository.save(details);

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitAnnexurInputDetails(RP02AnnexerInputDetailsProductionDetails details,
			HttpServletRequest http) {
		try {
			String value = "";
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			details.setForm_no("PRD02/F-27");
			details.setStatus(AppConstants.supervisorApprovedStatus);
			rp02annexerinputdetailsproductiondetailsrepository.save(details);

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SavePackingMeterialDetails(RPB04PackingMeterialDetails details, HttpServletRequest http) {
		Long id = details.getPacking_id();
		try {
			if (id == null) {
				String value = "";
				if (details.getBatch_no() == null) {
					value = "batch_no";
				}

				if (!"".equals(value)) {
					return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
							HttpStatus.BAD_REQUEST);
				}

				details.setForm_no("PRD02/F-27");
				rpb04packingmeterialdetailsrepository.save(details);

				for (RPB04PackingMeterialDetailsLine lineDetails : details.getDetails()) {

					Long Id = details.getPacking_id();

					lineDetails.setPacking_id(Id);

					rpb04packingmeterialdetailslinerepository.save(lineDetails);

				}

			}

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveProcessingEqupments(RPB06ProcessingEqupments details, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {
			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PRD02/F-27");
				details.setSupervisor_id(userId);
				details.setStatus(AppConstants.supervisorSave);

				rpb06processingequpmentsrepository.save(details);

				for (RPB06ProcessingEqupmentsLine lineDetails : details.getDetailsRecords06()) {

					Long Id = details.getEqup_id();

					lineDetails.setEqup_id(Id);

					rpb06processingequpmentslinerepository.save(lineDetails);

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
	public ResponseEntity<?> SubmitProcessingEqupments(RPB06ProcessingEqupments details, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {
			String value = "";
			if (details.getBatch_no() == null) {
				value = "batch_no";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PRD02/F-27");
				details.setSupervisor_id(userId);
				details.setStatus(AppConstants.supervisorApprovedStatus);

				rpb06processingequpmentsrepository.save(details);

				for (RPB06ProcessingEqupmentsLine lineDetails : details.getDetailsRecords06()) {

					Long Id = details.getEqup_id();

					lineDetails.setEqup_id(Id);

					rpb06processingequpmentslinerepository.save(lineDetails);

				}
			}

			else if (role.equals("ROLE_QA")) {

				details.setForm_no("PRD02/F-27");
				details.setQa_id(userId);
				details.setStatus(AppConstants.qaApprovedStatus);

				rpb06processingequpmentsrepository.save(details);

				for (RPB06ProcessingEqupmentsLine lineDetails : details.getDetailsRecords06()) {

					Long Id = details.getEqup_id();

					lineDetails.setEqup_id(Id);

					rpb06processingequpmentslinerepository.save(lineDetails);

				}
			} else {
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
	public ResponseEntity<?> SaveVerificationOfRecords(BMR06RP07VerificationOfRecords details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		String userRole = getUserRole();

		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		try {
//			if (id == null) {
			String value = "";
			if (details.getBatchNo() == null) {
				value = "batchNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
				
				details.setForm_no("PRD02/F-27");
				details.setSupervisor_save_by(userName);
				details.setSupervisor_save_on(date);
				details.setSupervisor_save_id(userId);
				details.setSupervisor_status(AppConstants.supervisorSave);
				bmr07verificationofrecordsrepository.save(details);

				for (BMR06RP07VerificationOfRecordsLine lineDetails : details.getDetailsRecords06()) {

					Long Id = details.getVerification_id();

					lineDetails.setVerification_id(Id);

					bmr07verificationofrecordslinerepository.save(lineDetails);

				}
			} else if(userRole.equalsIgnoreCase("ROLE_QA")) {
				
				details.setForm_no("PRD02/F-27");
//				details.setSupervisor_save_by(userName);
//				details.setSupervisor_save_on(date);
//				details.setSupervisor_save_id(userId);
				details.setQa_sign(userName);
				details.setQa_status(AppConstants.qaSave);
				bmr07verificationofrecordsrepository.save(details);

				for (BMR06RP07VerificationOfRecordsLine lineDetails : details.getDetailsRecords06()) {

					Long Id = details.getVerification_id();

					lineDetails.setVerification_id(Id);

					bmr07verificationofrecordslinerepository.save(lineDetails);

				}
			}

//			}

		} catch (Exception ex) {

			log.error("*** Unable to Save  *** " + ex);
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
			if (details.getBatchNo() == null) {
				value = "batchNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			if (id != null) {

				checkObj = bmr07verificationofrecordsrepository.getSummaryByRpVerification_id06(id);

				String[] IgnoreProps = { "verification_id", "createdBy", "createdAt", "supervisor_status",
						"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
						"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "qa_status", "qa_save_on",
						"qa_save_by", "qa_save_id", "qa_submit_on", "qa_submit_by", "qa_submit_id", "qa_mail_status",
						"qa_sign", "supervisor_signature_image", "qa_signature_image", "form_no" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {

					checkObj.setForm_no("PRD02/F-27");
					checkObj.setSupervisor_submit_by(userName);
					checkObj.setSupervisor_submit_on(date);
					checkObj.setSupervisor_submit_id(userId);
					checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);

					// Image

					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

					checkObj.setSupervisor_signature_image(signature);

					bmr07verificationofrecordsrepository.save(checkObj);

					for (BMR06RP07VerificationOfRecordsLine lineDetails : checkObj.getDetailsRecords06()) {

						Long Id = details.getVerification_id();

						lineDetails.setVerification_id(Id);

						bmr07verificationofrecordslinerepository.save(lineDetails);

					}

				}

				else if (role.equals("ROLE_QA")) {

					String supervisiorStatus = checkObj.getSupervisor_status();
					if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)) {

						checkObj.setForm_no("PRD02/F-27");

						checkObj.setQa_submit_by(userName);
						checkObj.setQa_submit_on(date);
						checkObj.setQa_submit_id(userId);
						checkObj.setQa_status(AppConstants.qaApprovedStatus);

						for (BMR06RP07VerificationOfRecordsLine lineDetails : details.getDetailsRecords06()) {

							Long Id = details.getVerification_id();

							lineDetails.setVerification_id(Id);

							lineDetails.setVerified_date(lineDetails.getVerified_date());

							bmr07verificationofrecordslinerepository.save(lineDetails);

						}

						// Qa Image
						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setQa_signature_image(signature);

						bmr07verificationofrecordsrepository.save(checkObj);

//						for (BMR06RP07VerificationOfRecordsLine lineDetails : checkObj.getDetailsRecords06()) {
//
//							Long Id = details.getVerification_id();
//
//							lineDetails.setVerification_id(Id);
//
//							bmr07verificationofrecordslinerepository.save(lineDetails);
//
//						}

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

				checkObj.setForm_no("PRD02/F-27");
				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);

				// Image

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setSupervisor_signature_image(signature);

				bmr07verificationofrecordsrepository.save(checkObj);

				for (BMR06RP07VerificationOfRecordsLine lineDetails : checkObj.getDetailsRecords06()) {

					Long Id = details.getVerification_id();

					lineDetails.setVerification_id(Id);

					bmr07verificationofrecordslinerepository.save(lineDetails);

				}

			}
		} catch (Exception ex) {

			log.error("*** Unable to Save Verification Of Records*** " + ex);
			String msg = scaUtil.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(checkObj, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveManufactureSteps(RPB08ManufactureSteps details, HttpServletRequest http) {

		SCAUtil scaUtil = new SCAUtil();
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		String userRole = getUserRole();

		try {
//			if (id == null) {
			String value = "";
			if (details.getBatch_no() == null) {
				value = "batch_no";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			
			if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
				
				details.setForm_no("PRD02/F-27");
				details.setSupervisor_save_by(userName);
				details.setSupervisor_save_on(date);
				details.setSupervisor_save_id(userId);
				details.setSupervisor_status(AppConstants.supervisorSave);
				rpb08manufacturestepsrepository.save(details);
				
			} else if(userRole.equalsIgnoreCase("ROLE_QA")) {
				
				details.setQa_sign(userName);
				details.setQa_status(AppConstants.qaSave);
				
				rpb08manufacturestepsrepository.save(details);
			}
			

//			}

		} catch (Exception ex) {

			log.error("*** Unable to Save *** " + ex);
			String msg = scaUtil.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	// New
	// Submit
	@SuppressWarnings({ "unchecked", "unchecked" })
	public ResponseEntity<?> SubmitManufactureSteps(RPB08ManufactureSteps details, HttpServletRequest http) {
		Long id = details.getMfs_id();
		RPB08ManufactureSteps checkObj = new RPB08ManufactureSteps();
		SCAUtil scaUtil = new SCAUtil();

		try {

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			String value = "";
			if (details.getBatch_no() == null) {
				value = "batch_no";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			if (id != null) {

				checkObj = rpb08manufacturestepsrepository.getSummaryByid08(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "qa_status", "qa_save_on", "qa_save_by",
						"qa_save_id", "qa_submit_on", "qa_submit_by", "qa_submit_id", "qa_mail_status", "qa_sign",
						"supervisor_signature_image", "qa_signature_image", "form_no" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {

					checkObj.setForm_no("PRD02/F-27");
					checkObj.setSupervisor_submit_by(userName);
					checkObj.setSupervisor_submit_on(date);
					checkObj.setSupervisor_submit_id(userId);
					checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);

					// Image

					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

					checkObj.setSupervisor_signature_image(signature);

					rpb08manufacturestepsrepository.save(checkObj);

				}

				else if (role.equals("ROLE_QA")) {

					String supervisiorStatus = checkObj.getSupervisor_status();
					if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)) {

						checkObj.setForm_no("PRD02/F-27");

						checkObj.setQa_submit_by(userName);
						checkObj.setQa_submit_on(date);
						checkObj.setQa_submit_id(userId);
						checkObj.setQa_status(AppConstants.qaApprovedStatus);

						// Qa Image

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setQa_signature_image(signature);

						rpb08manufacturestepsrepository.save(checkObj);

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
				checkObj.setForm_no("PRD02/F-27");
				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);

				// Image

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setSupervisor_signature_image(signature);

				rpb08manufacturestepsrepository.save(checkObj);

			}
		} catch (Exception ex) {

			log.error("*** Unable to Save Manufacturing Steps*** " + ex);
			String msg = scaUtil.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(checkObj, HttpStatus.CREATED);
	}

	// New

	public ResponseEntity<?> SaveProductReconciliation(BMR08RP09ProductionReconciliation details,
			HttpServletRequest http) {
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

				details.setForm_no("PRD02/F-27");
				bmr09productionreconciliationrepository.save(details);

			}

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SaveProcessDevRecord(RPB10ProcessDevRecord details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();

		try {

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PRD02/F-27");
				details.setStatus(AppConstants.supervisorSave);
				details.setSupervisor_id(userId);
				rpb10processdevrecordrepository.save(details);

				for (RPB10ProcessDevReocrdLine lineDetails : details.getDetailsRecords10()) {

					Long Id = details.getDev_id();

					lineDetails.setDev_id(Id);

					rpb10processdevreocrdlinerepository.save(lineDetails);

				}
			}  else if (role.equals("ROLE_QA")) {

				details.setForm_no("PRD02/F-27");
				details.setQa_id(userId);
				details.setStatus(AppConstants.qaSave);
//				details.setSupervisor_id(userId);
				rpb10processdevrecordrepository.save(details);

				for (RPB10ProcessDevReocrdLine lineDetails : details.getDetailsRecords10()) {

					Long Id = details.getDev_id();

					lineDetails.setDev_id(Id);

					rpb10processdevreocrdlinerepository.save(lineDetails);

				}
			}

			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not save  Details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			log.error("*** Unable to Save *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitProcessDevRecord(RPB10ProcessDevRecord details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();

		try {
			String value = "";
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PRD02/F-27");
				details.setStatus(AppConstants.supervisorApprovedStatus);
				details.setSupervisor_id(userId);
				rpb10processdevrecordrepository.save(details);

				for (RPB10ProcessDevReocrdLine lineDetails : details.getDetailsRecords10()) {

					Long Id = details.getDev_id();

					lineDetails.setDev_id(Id);

					rpb10processdevreocrdlinerepository.save(lineDetails);

				}
			}

			else if (role.equals("ROLE_QA")) {

				details.setForm_no("PRD02/F-27");
				details.setStatus(AppConstants.qaApprovedStatus);
				details.setQa_id(userId);
				rpb10processdevrecordrepository.save(details);

				for (RPB10ProcessDevReocrdLine lineDetails : details.getDetailsRecords10()) {

					Long Id = details.getDev_id();

					lineDetails.setDev_id(Id);

					rpb10processdevreocrdlinerepository.save(lineDetails);

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
	public ResponseEntity<?> SaveDelayEqupmentBrkDwnRecord(BMR09RP11ProcessDlyEqupBrkDwnRecord details,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PRD02/F-27");
				details.setStatus(AppConstants.supervisorSave);
				details.setSupervisor_id(userId);
				bmr11processdlyequpbrkdwnrecordrepository.save(details);

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

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PRD02/F-27");
				details.setStatus(AppConstants.supervisorApprovedStatus);
				details.setSupervisor_id(userId);
				bmr11processdlyequpbrkdwnrecordrepository.save(details);

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

	public ResponseEntity<?> SaveListOfEnclosurs(RPB12ListOfEnclouser details, HttpServletRequest http) {
		try {
			String value = "";
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			details.setForm_no("PRD02/F-27");
			details.setStatus(AppConstants.supervisorSave);

			rpb12listofenclouserrepository.save(details);

			for (RPB12ListOfEnclouserLine lineDetails : details.getDetailsRecords12()) {

				Long Id = details.getEnc_id();

				lineDetails.setEnc_id(Id);

				rpb12listofenclouserlinerepository.save(lineDetails);

			}

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save Chemical & Packing Details *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitListOfEnclosurs(RPB12ListOfEnclouser details, HttpServletRequest http) {
		try {
			String value = "";
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			details.setForm_no("PRD02/F-27");
			details.setStatus(AppConstants.supervisorApprovedStatus);
			rpb12listofenclouserrepository.save(details);

			for (RPB12ListOfEnclouserLine lineDetails : details.getDetailsRecords12()) {

				Long Id = details.getEnc_id();

				lineDetails.setEnc_id(Id);

				rpb12listofenclouserlinerepository.save(lineDetails);

			}

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save Chemical & Packing Details *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SavePostProductionReview(BMR12RP13PostProdReview details, HttpServletRequest http) {
		
		SCAUtil sca = new SCAUtil();
		try {
			
			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			
			if (role.equals("ROLE_SUPERVISOR")) {

			details.setForm_no("PRD02/F-27");
			details.setStatus(AppConstants.supervisorSave);
			details.setSupervisor_id(userId);
			Bmr12postprodreviewrepository.save(details);
			
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
	public ResponseEntity<?> SubmitPostProductionReview(BMR12RP13PostProdReview details, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {
			String value = "";
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PRD02/F-27");
				details.setStatus(AppConstants.supervisorApprovedStatus);
				details.setSupervisor_id(userId);
				Bmr12postprodreviewrepository.save(details);

			}
			
			else if (role.equals("ROLE_HOD") || role.equals("ROLE_DESIGNEE")) {

				if(details.getStatus().equals(AppConstants.supervisorApprovedStatus)) {
				
				details.setForm_no("PRD02/F-27");
				details.setHod_id(userId);
				details.setStatus(AppConstants.hodApprovedStatus);
				Bmr12postprodreviewrepository.save(details);
				
				}
				else {
					return new ResponseEntity(new ApiResponse(false, "Supervisior not yet Submitted"),
							HttpStatus.BAD_REQUEST);
				}
				
				
				
				
			}

			else if (role.equals("ROLE_QA")||role.equals("QA_MANAGER") ||role.equals("QA_DESIGNEE")) {
				
				if(details.getStatus().equals(AppConstants.hodApprovedStatus)) {

				details.setForm_no("PRD02/F-27");
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
	public ResponseEntity<?> SaveQaRelease(BMR13RP14QaRelease details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {
				
			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			
			if (role.equals("ROLE_QA")||role.equals("QA_MANAGER") ||role.equals("QA_DESIGNEE")) {

				details.setForm_no("PRD02/F-27");
				details.setStatus(AppConstants.qaSave);
				details.setQa_id(userId);
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
			
			log.error("*** Unable to Save *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitQaRelease(BMR13RP14QaRelease details, HttpServletRequest http) {
		
		SCAUtil sca = new SCAUtil();
		try {
				String value = "";
				if (details.getBatchNo() == null) {
					value = "batchNo";
				}

				if (!"".equals(value)) {
					return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
							HttpStatus.BAD_REQUEST);
				}

				String role = sca.getUserRoleFromRequest(http, tokenProvider);
				Long userId = sca.getUserIdFromRequest(http, tokenProvider);
				
				if (role.equals("ROLE_QA")||role.equals("QA_MANAGER") ||role.equals("QA_DESIGNEE")) {

					details.setForm_no("PRD02/F-27");
					details.setStatus(AppConstants.qaApprovedStatus);
					details.setQa_id(userId);
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
			
			log.error("*** Unable to Save *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	
	
	@SuppressWarnings({ "unchecked", "unchecked" })
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

				details.setForm_no("PRD02/F-27");
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

	public ResponseEntity<?> GetProductionDetails(String order_no) {
		
		
		
		List<BMR01RP01ProductionDetails> bmr01rp01productiondetails;
		List<Map<String, Object>> bmr01rp01productiondetailsSap;

		try {
			
			String[] order_number = order_no.split("-");
			
			String orderNo = order_number[0];
			
			bmr01rp01productiondetails = bmr_01_productiondetailsrepository.getSummaryByOrderNoRPB(order_no);
			bmr01rp01productiondetailsSap = bmr_01_productiondetailsrepository.getBatchSummaryRpbale(orderNo);

			RPB01ProdDetailsResponse response = new RPB01ProdDetailsResponse(bmr01rp01productiondetails,
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
	// 01

	// 02

	public ResponseEntity<?> GetAnnexurInputDetails(String order_no) {
		List<RP02AnnexerInputDetailsProductionDetails> bmrSummaryDateList;

		try {
			bmrSummaryDateList = rp02annexerinputdetailsproductiondetailsrepository.getSummaryByOrderNo02(order_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Details*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get Details" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> GetPackingMeterialDetails(String order_no) {
		List<RPB04PackingMeterialDetails> bmrSummaryDateList;

		try {
			bmrSummaryDateList = rpb04packingmeterialdetailsrepository.getSummaryByOrderNo04(order_no);

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
//04

	public ResponseEntity<?> GetProcessingEqupments(String order_no) {
		List<RPB06ProcessingEqupments> bmrSummaryDateList;

		try {
			bmrSummaryDateList = rpb06processingequpmentsrepository.getSummaryByOrderNo06(order_no);

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

//06
	public ResponseEntity<?> GetVerificationOfRecords(String order_no) {
		List<BMR06RP07VerificationOfRecords> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr07verificationofrecordsrepository.getSummaryByOrderNoRPB07(order_no);

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

	// 07
	public ResponseEntity<?> SaveManufactureSteps(String order_no) {
		List<RPB08ManufactureSteps> bmrSummaryDateList;

		try {
			bmrSummaryDateList = rpb08manufacturestepsrepository.getSummaryByOrderNo08(order_no);

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
//

	public ResponseEntity<?> GetProductReconciliation(String order_no) {
		List<BMR08RP09ProductionReconciliation> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr09productionreconciliationrepository.getSummaryByOrderNo09(order_no);

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

//
	public ResponseEntity<?> GetProcessDeviationRecord(String order_no) {
		List<RPB10ProcessDevRecord> bmrSummaryDateList;

		try {
			bmrSummaryDateList = rpb10processdevrecordrepository.getSummaryByOrderNo10(order_no);

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

//
	public ResponseEntity<?> GetDelayEqupmentBrkDwnRecord(String order_no, String fromdate, String todate) {
		List<BMR09RP11ProcessDlyEqupBrkDwnRecord> bmrSummaryDateList;
		// Map
		List<Map<String, Object>> mapList = new ArrayList<>();
		List<Map<String, Object>> stoppageMapList11 = new ArrayList<>();

		try {
			
//			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
////			
//			System.out.println("formatter");
////			
//			Date fromDates = formatter.parse(fromdate);
//			Date toDates = formatter.parse(todate);
//			
//			System.out.println("formatter date" + fromDates);
			
			bmrSummaryDateList = bmr11processdlyequpbrkdwnrecordrepository.getSummaryByOrderNoRpb11(order_no);
			mapList = departmentRepository.stoppage015BMR(order_no, fromdate, todate);

			System.out.println("Map" + mapList.size());
			
			// STOP
			for (Map<String, Object> temp : mapList) {
				// Parse PackDate from map

				Date packDate = (Date) temp.get("PackDate");
				String fromTime = (String) temp.get("fromTime");
				String toTime = (String) temp.get("toTime");

				if (packDate != null && fromTime != null && toTime != null) {
					stoppageMapList11 = departmentRepository.orderStoppage15ByBmr(packDate, fromTime, toTime);
				}

			}

			RPB11ShopageDetailsResponse response = new RPB11ShopageDetailsResponse(bmrSummaryDateList,
					stoppageMapList11);
			return new ResponseEntity<>(response, HttpStatus.OK);

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

	//
	public ResponseEntity<?> GetListOfEnclosurs(String order_no) {
		List<RPB12ListOfEnclouser> bmrSummaryDateList;

		try {
			bmrSummaryDateList = rpb12listofenclouserrepository.getSummaryByOrderNo12(order_no);

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
//

	public ResponseEntity<?> GetPostProductionReview(String order_no) {
		List<BMR12RP13PostProdReview> bmrSummaryDateList;

		try {
			bmrSummaryDateList = Bmr12postprodreviewrepository.getSummaryByOrderNo13(order_no);

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

//
	public ResponseEntity<?> GetQaRelease(String order_no) {
		List<BMR13RP14QaRelease> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr13qareleaserepository.getSummaryByOrderNoRPB14(order_no);

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

//
	public ResponseEntity<?> GetProductRelease(String order_no) {
		List<BMR14RP15ProductRelease> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr14productreleaserepository.getSummaryByOrderNoRpb15(order_no);

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
	//

	public ResponseEntity<?> GetBmrPrint(String order_no) {

		List<BMR01RP01ProductionDetails> rpb01productiondetails;
		List<Map<String, Object>> rpb01productiondetailsSap;
		List<RP02AnnexerInputDetailsProductionDetails> rp02annexerinputdetailsproductiondetails;
		List<RPB04PackingMeterialDetails> rpb04packingmeterialdetails;
		List<RPB06ProcessingEqupments> rpb06processingequpments;
		List<BMR06RP07VerificationOfRecords> rpb07verificationofrecords;
		List<RPB08ManufactureSteps> rpb08manufacturesteps;
		List<BMR08RP09ProductionReconciliation> rpb09productionreconciliation;
		List<RPB10ProcessDevRecord> rpb10processdevrecord;
		List<BMR09RP11ProcessDlyEqupBrkDwnRecord> rpb11processdlyequpbrkdwnrecord;
		List<Map<String, Object>> stoppageList11;
		List<RPB12ListOfEnclouser> rpb12listofenclouser;
		List<BMR12RP13PostProdReview> rpb13postprodreview;
		List<BMR13RP14QaRelease> rpb14qarelease;
		List<BMR14RP15ProductRelease> rpb15productrelease;

		try {
			rpb01productiondetails = bmr_01_productiondetailsrepository.getSummaryByOrderNoRPB(order_no);
			
			String fromdate = "";
			String todate = "";
			
			for(BMR01RP01ProductionDetails details : rpb01productiondetails) {
				fromdate = details.getStart_date();
				todate = details.getEnd_date();
			}
			
			
			rpb01productiondetailsSap = bmr_01_productiondetailsrepository.getBatchSummaryRpbale(order_no);
			rp02annexerinputdetailsproductiondetails = rp02annexerinputdetailsproductiondetailsrepository
					.getSummaryByOrderNo02(order_no);
			rpb04packingmeterialdetails = rpb04packingmeterialdetailsrepository.getSummaryByOrderNo04(order_no);
			rpb06processingequpments = rpb06processingequpmentsrepository.getSummaryByOrderNo06(order_no);
			rpb07verificationofrecords = bmr07verificationofrecordsrepository.getSummaryByOrderNoRPB07(order_no);
			rpb08manufacturesteps = rpb08manufacturestepsrepository.getSummaryByOrderNo08(order_no);
			rpb09productionreconciliation = bmr09productionreconciliationrepository.getSummaryByOrderNo09(order_no);
			rpb10processdevrecord = rpb10processdevrecordrepository.getSummaryByOrderNo10(order_no);
			rpb11processdlyequpbrkdwnrecord = bmr11processdlyequpbrkdwnrecordrepository
					.getSummaryByOrderNoRpb11(order_no);
			stoppageList11 = fetchStoppageDetails(order_no, fromdate, todate);
			rpb12listofenclouser = rpb12listofenclouserrepository.getSummaryByOrderNo12(order_no);
			rpb13postprodreview = Bmr12postprodreviewrepository.getSummaryByOrderNo13(order_no);
			rpb14qarelease = bmr13qareleaserepository.getSummaryByOrderNoRPB14(order_no);
			rpb15productrelease = bmr14productreleaserepository.getSummaryByOrderNoRpb15(order_no);

			RPB02ProdDetailsResponsePrint response = new RPB02ProdDetailsResponsePrint(rpb01productiondetails,
					rpb01productiondetailsSap, rp02annexerinputdetailsproductiondetails, rpb04packingmeterialdetails,
					rpb06processingequpments, rpb07verificationofrecords, rpb08manufacturesteps,
					rpb09productionreconciliation, rpb10processdevrecord, rpb11processdlyequpbrkdwnrecord,
					stoppageList11, rpb12listofenclouser, rpb13postprodreview, rpb14qarelease, rpb15productrelease);
			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Details*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get Details" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	// Add Shoppage Details

	private List<Map<String, Object>> fetchStoppageDetails(String order_no, String fromdate, String todate) {

		List<Map<String, Object>> stoppageMapList11 = new ArrayList<>();
		List<Map<String, Object>> mapList = new ArrayList<>();

		mapList = departmentRepository.stoppage015BMR(order_no, fromdate, todate);

		for (Map<String, Object> temp : mapList) {
			// Parse PackDate from map

			Date packDate = (Date) temp.get("PackDate");
			String fromTime = (String) temp.get("fromTime");
			String toTime = (String) temp.get("toTime");

			if (packDate != null && fromTime != null && toTime != null) {
				stoppageMapList11 = departmentRepository.orderStoppage15ByBmr(packDate, fromTime, toTime);
			}

		}

		return stoppageMapList11;
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
		
		
		
		
		/**
		 * CR - RP BALE -1 concept
		 */
		
		public ResponseEntity<?> getProductionDetailsLoV() {
			List<String> productionBatchDb = new ArrayList<>();
			List<String> productionnextBatch = new ArrayList<>();
			List<String> updatedProductionLov = new ArrayList<>();
			List<IdAndValuePair> productionDetailsLov = new ArrayList<>();
			
			try {
				// FROM SAP
				productionBatchDb = bmr_01_productiondetailsrepository.productionDetailsBatchNumberRpBale();

				// INCREMENTAL FOR OPEN BATCHES
				productionnextBatch = bmr_01_productiondetailsrepository.fetchOpenBatchesRpBale();

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
		

		
			// GET BALE DETAILS 
		
		
		public ResponseEntity<?> getBaleByOrderDate(String orderNumber, String fromdate, String todate) {
			
			List<String> baleResponseList = new ArrayList<>();
			
			List<IdAndValuePair> baleValuePairList = new ArrayList<IdAndValuePair>();
			
			try {
				
				baleResponseList = bmr_01_productiondetailsrepository.rpBaleByOrderDate(orderNumber, fromdate, todate);
				
				Long id = (long) 1;
				
				for(String temp : baleResponseList) {
					IdAndValuePair valuePair = new IdAndValuePair();
					valuePair.setValue(temp);
					valuePair.setId(id);
					
					baleValuePairList.add(valuePair);
					id++;
				}
				
				
			} catch (Exception ex) {

				String msg = ex.getMessage();
				log.error("Unable to Get Bale for Date " + msg);
				ex.printStackTrace();
				return new ResponseEntity(new ApiResponse(false, "Failed to Get Bale for Date " + msg),
						HttpStatus.BAD_REQUEST);
			}
			
			return new ResponseEntity(baleValuePairList, HttpStatus.OK);
			
		}
		
		
			// GET PRODUCTION DETAILS BY BALE, DATE AND ORDER
		
		public ResponseEntity<?> productionDetailsByBaleDateOrder(String orderNumber, String fromdate, String todate, String frombale, String tobale) {
			
			List<Map<String, Object>> productionDetailsByBale = new ArrayList<Map<String,Object>>();
			
			try {
				
				productionDetailsByBale = bmr_01_productiondetailsrepository.getProductionDetailsRpbaleBaleOrderDate(orderNumber, fromdate, todate, frombale, tobale);
				
			} catch (Exception ex) {

				String msg = ex.getMessage();
				log.error("Unable to Get Production Details for Bale " + msg);
				ex.printStackTrace();
				return new ResponseEntity(new ApiResponse(false, "Failed to Get Production Details for Bale" + msg),
						HttpStatus.BAD_REQUEST);
			}
			
			return new ResponseEntity(productionDetailsByBale, HttpStatus.OK);
		}
		
}
