package com.focusr.Precot.mssql.database.service.drygoods;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.Buds.model.bmr.BudsBmrRework;
import com.focusr.Precot.Buds.repository.bmr.BudsBmrReworkRepository;
import com.focusr.Precot.mssql.database.model.drygoods.BMR001GoodsProductionDetails;
import com.focusr.Precot.mssql.database.model.drygoods.BMR03GoodsPackingMeterialIssue;
import com.focusr.Precot.mssql.database.model.drygoods.BMR03GoodsPackingMeterialIssueLine;
import com.focusr.Precot.mssql.database.model.drygoods.BMR05GoodsEquipmentUsed;
import com.focusr.Precot.mssql.database.model.drygoods.BMR05GoodsEquipmentUsedLine;
import com.focusr.Precot.mssql.database.model.drygoods.BMR06GoodsVerificationOfRecords;
import com.focusr.Precot.mssql.database.model.drygoods.BMR06GoodsVerificationOfRecordsLine;
import com.focusr.Precot.mssql.database.model.drygoods.BMR07GoodsManufacturingStepsCottonBalls;
import com.focusr.Precot.mssql.database.model.drygoods.BMR09GoodsProcessDevRecord;
import com.focusr.Precot.mssql.database.model.drygoods.BMR09GoodsProcessDevReocrdLine;
import com.focusr.Precot.mssql.database.model.drygoods.BMR10GoodsProcessDelayEqupment;
import com.focusr.Precot.mssql.database.model.drygoods.BMR10GoodsProcessDelayEqupmentLine;
import com.focusr.Precot.mssql.database.model.drygoods.BMR10GoodsProductReconillation;
import com.focusr.Precot.mssql.database.model.drygoods.BMR11GoodsListOfEnclouser;
import com.focusr.Precot.mssql.database.model.drygoods.BMR12GoodsPostProdReview;
import com.focusr.Precot.mssql.database.model.drygoods.BMR13GoodsQaRelease;
import com.focusr.Precot.mssql.database.model.drygoods.BMR13GoodsQaReleaseLine;
import com.focusr.Precot.mssql.database.model.drygoods.BMR14GoodsProductRelease;
import com.focusr.Precot.mssql.database.model.drygoods.BMRGoods11ListOfEnclouserLine;
import com.focusr.Precot.mssql.database.model.drygoods.DailyProductionCottonBallsF003;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR001GoodsProductionDetailsRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR03GoodsPackingMeterialIssueLineRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR03GoodsPackingMeterialIssueRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR05EquipmentUsedLineRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR05EquipmentUsedRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR06GoodsVerificationOfRecordsLineRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR06GoodsVerificationOfRecordsRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR07GoodsManufacturingStepsCottonBallRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR09GoodsProcessDevRecordRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR09GoodsProcessDevReocrdLineRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR10GoodsProcessDelayEqupmentLineRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR10GoodsProcessDelayEqupmentRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR10ReconillationRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR11GoodsListOfEnclouserRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR12GoodsPostProdReviewRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR13GoodsQaReleaseLineRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR13GoodsQaReleaserRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR14GoodsProductReleaseRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMRGoods11ListOfEnclouserLineReposirory;
import com.focusr.Precot.mssql.database.repository.drygoods.DailyProductionCottonBallsF003Repository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.padpunching.DrygoodsBmrProductionDetailsResponse;
import com.focusr.Precot.payload.padpunching.PadPunchingStoppageResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.drygoods.AppConstantDryGoods;
import com.focusr.Precot.util.drygoods.BMRCottonBallResponsePrint;

@Service
public class BmrCottonBallService {

	Logger log = LoggerFactory.getLogger(BmrCottonBallService.class);

	@Autowired
	private BMR001GoodsProductionDetailsRepository bmr001goodsproductiondetailsrepository;

	@Autowired
	private BMR05EquipmentUsedRepository bmr05equipmentusedrepository;

	@Autowired
	private BMR05EquipmentUsedLineRepository bmr05equipmentusedlinerepository;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private UserRepository userrepository;

	@Autowired
	private BMR06GoodsVerificationOfRecordsRepository bmr06goodsverificationofrecordsrepository;

	@Autowired
	private BMR06GoodsVerificationOfRecordsLineRepository bmr06goodsverificationofrecordslinerepository;

	@Autowired
	private BMR07GoodsManufacturingStepsCottonBallRepository bmr07goodsmanufacturingstepsrepository;

	@Autowired
	private BMR07GoodsManufacturingStepsCottonBallRepository bmr07goodsmanufacturingstepscottonballrepository;

	@Autowired
	private BMR09GoodsProcessDevRecordRepository bmr09goodsprocessdevrecordrepository;

	@Autowired
	private BMR09GoodsProcessDevReocrdLineRepository bmr09goodsprocessdevreocrdlinerepository;

	@Autowired
	private BMR10GoodsProcessDelayEqupmentRepository bmr10goodsprocessdelayequpmentrepository;

	@Autowired
	private BMR10GoodsProcessDelayEqupmentLineRepository bmr10goodsprocessdelayequpmentlinerepository;

	@Autowired
	private BMR11GoodsListOfEnclouserRepository bmr11goodslistofenclouserrepository;

	@Autowired
	private BMRGoods11ListOfEnclouserLineReposirory bmrgoods11listofenclouserlinereposirory;

	@Autowired
	private BMR12GoodsPostProdReviewRepository bmr12goodspostprodreviewrepository;

	@Autowired
	private BMR13GoodsQaReleaserRepository bmr13goodsqareleaserrepository;

	@Autowired
	private BMR13GoodsQaReleaseLineRepository bmr13goodsqareleaselinerepository;

	@Autowired
	private BMR14GoodsProductReleaseRepository bmr14goodsproductreleaserepository;

	@Autowired
	private DailyProductionCottonBallsF003Repository dailyproductioncottonballsf003repository;

	@Autowired
	private BMR03GoodsPackingMeterialIssueRepository bmr03goodspackingmeterialissuerepository;

	@Autowired
	private BMR03GoodsPackingMeterialIssueLineRepository bmr03goodspackingmeterialissuelinerepository;

	@Autowired
	private BudsBmrReworkRepository reworkRepository;

	// FOR PRODUCT RECONILLATION

	@Autowired
	private BMR10ReconillationRepository reconillationRepository;

	// Save

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveProductionDetails(BMR001GoodsProductionDetails details, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			
			if (details.getProd_id() != null) {

				BMR001GoodsProductionDetails existing = bmr001goodsproductiondetailsrepository
						.findById(details.getProd_id()).orElse(null);

				if (existing != null) {

					details.setCreatedAt(existing.getCreatedAt());
					details.setCreatedBy(existing.getCreatedBy());
				}
			}

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setStatus(AppConstantDryGoods.supervisorSave);
				details.setSupervisor_id(userId);
				details.setForm_no("PH-PRD04/F-004");
				bmr001goodsproductiondetailsrepository.save(details);

			}

			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not save  Details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			log.error("*** Unable to Save*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	// Submit

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> bmr001goodsproductiondetails(BMR001GoodsProductionDetails details,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();

		try {
			String value = "";
			if (details.getBatch_no() == null) {
				value = "BatchNo";
			}
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			
			if (details.getProd_id() != null) {

				BMR001GoodsProductionDetails existing = bmr001goodsproductiondetailsrepository
						.findById(details.getProd_id()).orElse(null);

				if (existing != null) {

					details.setCreatedAt(existing.getCreatedAt());
					details.setCreatedBy(existing.getCreatedBy());
				}
			}

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setStatus(AppConstantDryGoods.supervisorApprovedStatus);
				details.setForm_no("PH-PRD04/F-004");
				details.setSupervisor_id(userId);

				// GENERATE NEXT BATCH
				if (details.getPo_comp_status().equalsIgnoreCase("OPEN")) {
					String[] batchNoParts = details.getBatch_no().split("-");
					int number = Integer.parseInt(batchNoParts[1]);
					number++;
					String productionBatchNo = batchNoParts[0] + "-" + number;
					details.setNextBatch(productionBatchNo);
					log.info("*** !!! Current Batch No !!!***" + details.getBatch_no());
					log.info("*** !!! Next Batch No !!!***" + details.getNextBatch());
				}

				bmr001goodsproductiondetailsrepository.save(details);

			}

			else if (role.equals("ROLE_QA")) {

				details.setStatus(AppConstantDryGoods.qaApprovedStatus);
				details.setForm_no("PH-PRD04/F-004");
				details.setQa_id(userId);
				bmr001goodsproductiondetailsrepository.save(details);

			}

			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not Submit  Details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			log.error("*** Unable to Save*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	public ResponseEntity<?> GetProductionDetails(String batch_no) {
		List<BMR001GoodsProductionDetails> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr001goodsproductiondetailsrepository.getDetails(batch_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SavePackingMeterialIssue(BMR03GoodsPackingMeterialIssue details, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {
			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {
				details.setForm_no("PH-PRD04/F-004");
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

			log.error("*** Unable to Save*** " + ex);
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

				details.setForm_no("PH-PRD04/F-004");
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

			log.error("*** Unable to Save*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	public ResponseEntity<?> GetPackingMeterial(String batch_no) {
		List<BMR03GoodsPackingMeterialIssue> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr03goodspackingmeterialissuerepository.getDetails(batch_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
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
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveProcessingEquipments(BMR05GoodsEquipmentUsed details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {
				details.setForm_no("PH-PRD04/F-004");
				details.setStatus(AppConstantDryGoods.supervisorSave);

				details.setSupervisor_id(userId);
				bmr05equipmentusedrepository.save(details);

				for (BMR05GoodsEquipmentUsedLine lineDetails : details.getDetails()) {

					Long Id = details.getEqup_id();

					lineDetails.setEqup_id(Id);

					bmr05equipmentusedlinerepository.save(lineDetails);

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

	//
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitProcessingEquipments(BMR05GoodsEquipmentUsed details, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {
			String value = "";
			if (details.getBatch_no() == null) {
				value = "BatchNo";
			}
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

				details.setForm_no("PH-PRD04/F-004");
				details.setStatus(AppConstantDryGoods.supervisorApprovedStatus);
				details.setSupervisor_id(userId);
				bmr05equipmentusedrepository.save(details);

				for (BMR05GoodsEquipmentUsedLine lineDetails : details.getDetails()) {

					Long Id = details.getEqup_id();

					lineDetails.setEqup_id(Id);

					bmr05equipmentusedlinerepository.save(lineDetails);

				}
			} else if (role.equals("ROLE_QA")) {

				details.setForm_no("PH-PRD04/F-004");
				details.setQa_id(userId);
				details.setStatus(AppConstantDryGoods.qaApprovedStatus);
				bmr05equipmentusedrepository.save(details);

				for (BMR05GoodsEquipmentUsedLine lineDetails : details.getDetails()) {

					Long Id = details.getEqup_id();

					lineDetails.setEqup_id(Id);

					bmr05equipmentusedlinerepository.save(lineDetails);

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

	//

	public ResponseEntity<?> GetProcessEqupDetails(String batch_no) {
		List<BMR05GoodsEquipmentUsed> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr05equipmentusedrepository.getDetails(batch_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> SaveVerificationOfRecords(BMR06GoodsVerificationOfRecords details,
			HttpServletRequest http) {
		Long id = details.getVerification_id();
		SCAUtil scaUtil = new SCAUtil();
		try {
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);

			details.setForm_no("PH-PRD04/F-004");

			details.setSupervisor_save_by(userName);
			details.setSupervisor_save_on(date);
			details.setSupervisor_save_id(userId);
			details.setSupervisor_status(AppConstants.supervisorSave);

			bmr06goodsverificationofrecordsrepository.save(details);

			for (BMR06GoodsVerificationOfRecordsLine lineDetails : details.getDetailsVerificationRecords()) {

				Long Id = details.getVerification_id();

				lineDetails.setVerification_id(Id);

				bmr06goodsverificationofrecordslinerepository.save(lineDetails);

			}

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save Chemical & Packing Details *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	// Submit

	public ResponseEntity<?> SubmitVerificationOfRecords(BMR06GoodsVerificationOfRecords details,
			HttpServletRequest http) {
		Long id = details.getVerification_id();
		SCAUtil scaUtil = new SCAUtil();
		BMR06GoodsVerificationOfRecords checkObj = new BMR06GoodsVerificationOfRecords();

		try {

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			String value = "";
			if (details.getBatch_no() == null) {
				value = "BatchNo";
			}
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			if (id != null) {

				checkObj = bmr06goodsverificationofrecordsrepository.getSummaryByVerification_id06(id);

				String[] IgnoreProps = { "verification_id", "createdBy", "createdAt", "supervisor_status",
						"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
						"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "qa_status", "qa_save_on",
						"qa_save_by", "qa_save_id", "qa_submit_on", "qa_submit_by", "qa_submit_id", "qa_mail_status",
						"qa_sign", "supervisor_signature_image", "qa_signature_image", "form_no",
						"detailsVerificationRecords" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {

//					checkObj = details;

					checkObj.setForm_no("PH-PRD04/F-004");
					checkObj.setSupervisor_submit_by(userName);
					checkObj.setSupervisor_submit_on(date);
					checkObj.setSupervisor_submit_id(userId);
					checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);

					bmr06goodsverificationofrecordsrepository.save(checkObj);

					for (BMR06GoodsVerificationOfRecordsLine lineDetails : details.getDetailsVerificationRecords()) {

						Long Id = details.getVerification_id();

						lineDetails.setVerification_id(Id);

						bmr06goodsverificationofrecordslinerepository.save(lineDetails);

					}

				}

				else if (role.equals("ROLE_QA")) {

//					checkObj = details;

					String supervisiorStatus = checkObj.getSupervisor_status();
					if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)) {

						checkObj.setForm_no("PH-PRD04/F-004");

						checkObj.setQa_submit_by(userName);
						checkObj.setQa_submit_on(date);
						checkObj.setQa_submit_id(userId);
						checkObj.setQa_status(AppConstants.qaApprovedStatus);

						bmr06goodsverificationofrecordsrepository.save(checkObj);

						for (BMR06GoodsVerificationOfRecordsLine lineDetails : details
								.getDetailsVerificationRecords()) {

							Long Id = details.getVerification_id();

							lineDetails.setVerification_id(Id);

							bmr06goodsverificationofrecordslinerepository.save(lineDetails);

						}

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

				checkObj.setForm_no("PH-PRD04/F-004");
				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);

				bmr06goodsverificationofrecordsrepository.save(checkObj);

				for (BMR06GoodsVerificationOfRecordsLine lineDetails : checkObj.getDetailsVerificationRecords()) {

					Long Id = details.getVerification_id();

					lineDetails.setVerification_id(Id);

					bmr06goodsverificationofrecordslinerepository.save(lineDetails);

				}

			}
		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(checkObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> GetVerificationOfRecords(String batch_no) {
		List<BMR06GoodsVerificationOfRecords> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr06goodsverificationofrecordsrepository.getDetails(batch_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveManufacturingSteps(BMR07GoodsManufacturingStepsCottonBalls details,
			HttpServletRequest http) {

		SCAUtil scaUtil = new SCAUtil();
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		try {

			details.setForm_no("PH-PRD04/F-004");
			details.setSupervisor_save_by(userName);
			details.setSupervisor_save_on(date);
			details.setSupervisor_save_id(userId);
			details.setSupervisor_status(AppConstants.supervisorSave);
			bmr07goodsmanufacturingstepsrepository.save(details);

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	// Submit
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitManufacturingSteps(BMR07GoodsManufacturingStepsCottonBalls details,
			HttpServletRequest http) {
		Long id = details.getId();
		BMR07GoodsManufacturingStepsCottonBalls checkObj = new BMR07GoodsManufacturingStepsCottonBalls();

		SCAUtil scaUtil = new SCAUtil();

		try {

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			String value = "";
			if (details.getBatch_no() == null) {
				value = "BatchNo";
			}
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			if (id != null) {

				checkObj = bmr07goodsmanufacturingstepscottonballrepository.getSummaryByRpVerification_id06(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "qa_status", "qa_save_on", "qa_save_by",
						"qa_save_id", "qa_submit_on", "qa_submit_by", "qa_submit_id", "qa_mail_status", "qa_sign",
						"supervisor_signature_image", "qa_signature_image", "form_no" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {

					checkObj.setForm_no("PH-PRD04/F-004");
					checkObj.setSupervisor_submit_by(userName);
					checkObj.setSupervisor_submit_on(date);
					checkObj.setSupervisor_submit_id(userId);
					checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);

					bmr07goodsmanufacturingstepscottonballrepository.save(checkObj);

				}

				else if (role.equals("ROLE_QA")) {

					String supervisiorStatus = checkObj.getSupervisor_status();
					if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)) {

//						//new
//						checkObj = details;

						checkObj.setForm_no("PH-PRD04/F-004");
						checkObj.setQa_sign(userName);
						checkObj.setQa_submit_by(userName);
						checkObj.setQa_submit_on(date);
						checkObj.setQa_submit_id(userId);
						checkObj.setQa_status(AppConstants.qaApprovedStatus);

						bmr07goodsmanufacturingstepscottonballrepository.save(checkObj);

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

				checkObj.setForm_no("PH-PRD04/F-004");
				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);

				bmr07goodsmanufacturingstepscottonballrepository.save(checkObj);

			}
		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save Manufacturing Steps*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(checkObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> GetManufacturingSteps(String batch_no) {
		List<BMR07GoodsManufacturingStepsCottonBalls> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr07goodsmanufacturingstepscottonballrepository.getDetails(batch_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> SaveProcessDevRecord(BMR09GoodsProcessDevRecord details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {
			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PH-PRD04/F-004");
				details.setStatus(AppConstantDryGoods.supervisorSave);
				details.setSupervisor_id(userId);
				bmr09goodsprocessdevrecordrepository.save(details);

				for (BMR09GoodsProcessDevReocrdLine lineDetails : details.getDetailsDevRecords()) {

					Long Id = details.getDev_id();

					lineDetails.setDev_id(Id);

					bmr09goodsprocessdevreocrdlinerepository.save(lineDetails);

				}

			} else {
				return new ResponseEntity(new ApiResponse(false, role + "can not Submit  Details"),
						HttpStatus.BAD_REQUEST);
			}
		} catch (Exception ex) {

			log.error("*** Unable to Save*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	public ResponseEntity<?> submitProcessDevRecord(BMR09GoodsProcessDevRecord details, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {
			String value = "";
			if (details.getBatch_no() == null) {
				value = "BatchNo";
			}
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

				details.setForm_no("PH-PRD04/F-004");
				details.setStatus(AppConstantDryGoods.supervisorApprovedStatus);
				details.setSupervisor_id(userId);
				bmr09goodsprocessdevrecordrepository.save(details);

				for (BMR09GoodsProcessDevReocrdLine lineDetails : details.getDetailsDevRecords()) {

					Long Id = details.getDev_id();

					lineDetails.setDev_id(Id);

					bmr09goodsprocessdevreocrdlinerepository.save(lineDetails);

				}

			}

			else if (role.equals("ROLE_QA")) {

				details.setForm_no("PH-PRD04/F-004");
				details.setQa_id(userId);
				details.setStatus(AppConstantDryGoods.qaApprovedStatus);
				bmr09goodsprocessdevrecordrepository.save(details);

				for (BMR09GoodsProcessDevReocrdLine lineDetails : details.getDetailsDevRecords()) {

					Long Id = details.getDev_id();

					lineDetails.setDev_id(Id);

					bmr09goodsprocessdevreocrdlinerepository.save(lineDetails);

				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not Submit  Details"),
						HttpStatus.BAD_REQUEST);
			}
		} catch (Exception ex) {
			log.error("*** Unable to Save*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	public ResponseEntity<?> GetProcessDevRecord(String batch_no) {
		List<BMR09GoodsProcessDevRecord> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr09goodsprocessdevrecordrepository.getDetails(batch_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> SaveProcessDelayEqupment(BMR10GoodsProcessDelayEqupment details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PH-PRD04/F-004");
				details.setStatus(AppConstantDryGoods.supervisorSave);
				details.setSupervisor_id(userId);
				bmr10goodsprocessdelayequpmentrepository.save(details);

				for (BMR10GoodsProcessDelayEqupmentLine lineDetails : details.getDetailsDly()) {

					Long detailsList = details.getProcess_id();

					lineDetails.setProcess_id(detailsList);

					bmr10goodsprocessdelayequpmentlinerepository.save(lineDetails);

				}
			}

			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not Submit  Details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			log.error("*** Unable to Save*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save" + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitProcessDelayEqupment(BMR10GoodsProcessDelayEqupment details,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {
			String value = "";
			if (details.getBatch_no() == null) {
				value = "BatchNo";
			}
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

				details.setForm_no("PH-PRD04/F-004");
				details.setStatus(AppConstantDryGoods.supervisorApprovedStatus);
				details.setSupervisor_id(userId);
				bmr10goodsprocessdelayequpmentrepository.save(details);

				for (BMR10GoodsProcessDelayEqupmentLine lineDetails : details.getDetailsDly()) {

					Long detailsList = details.getProcess_id();

					lineDetails.setProcess_id(detailsList);

					bmr10goodsprocessdelayequpmentlinerepository.save(lineDetails);

				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, role + "can not Submit  Details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			log.error("*** Unable to Save*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save" + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	public ResponseEntity<?> GetProcessDelayEqupment(String batch_no) {
		List<BMR10GoodsProcessDelayEqupment> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr10goodsprocessdelayequpmentrepository.getDetails(batch_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> SaveListOfEnclosurs(BMR11GoodsListOfEnclouser details, HttpServletRequest http) {
		try {

			details.setForm_no("PH-PRD04/F-004");

			details.setStatus(AppConstantDryGoods.supervisorSave);

			bmr11goodslistofenclouserrepository.save(details);

			for (BMRGoods11ListOfEnclouserLine lineDetails : details.getDetailsEncloser()) {

				Long Id = details.getEnc_id();

				lineDetails.setEnc_id(Id);

				bmrgoods11listofenclouserlinereposirory.save(lineDetails);

			}

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	public ResponseEntity<?> submitListOfEnclosurs(BMR11GoodsListOfEnclouser details, HttpServletRequest http) {
		try {
			String value = "";
			if (details.getBatch_no() == null) {
				value = "BatchNo";
			}
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			details.setForm_no("PH-PRD04/F-004");

			details.setStatus(AppConstantDryGoods.supervisorApprovedStatus);

			bmr11goodslistofenclouserrepository.save(details);

			for (BMRGoods11ListOfEnclouserLine lineDetails : details.getDetailsEncloser()) {

				Long Id = details.getEnc_id();

				lineDetails.setEnc_id(Id);

				bmrgoods11listofenclouserlinereposirory.save(lineDetails);

			}

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	public ResponseEntity<?> GetListOfEnclosurs(String batch_no) {
		List<BMR11GoodsListOfEnclouser> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr11goodslistofenclouserrepository.getDetails(batch_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SavePostProductionReview(BMR12GoodsPostProdReview details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {
			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PH-PRD04/F-004");
				details.setStatus(AppConstantDryGoods.supervisorSave);

				details.setSupervisor_id(userId);

				bmr12goodspostprodreviewrepository.save(details);
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
	public ResponseEntity<?> SubmitPostProductionReview(BMR12GoodsPostProdReview details, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {
			String value = "";
			if (details.getBatch_no() == null) {
				value = "BatchNo";
			}
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
				details.setForm_no("PH-PRD04/F-004");
				details.setStatus(AppConstantDryGoods.supervisorApprovedStatus);
				details.setSupervisor_id(userId);
				bmr12goodspostprodreviewrepository.save(details);

			} else if (role.equals("ROLE_HOD") || role.equals("ROLE_DESIGNEE")) {

				if (details.getStatus().equals(AppConstantDryGoods.supervisorApprovedStatus)) {

					details.setForm_no("PH-PRD04/F-004");
					details.setHod_id(userId);
					details.setStatus(AppConstantDryGoods.hodApprovedStatus);
					bmr12goodspostprodreviewrepository.save(details);

				} else {
					return new ResponseEntity(new ApiResponse(false, "Supervisior not yet Submitted"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else if (role.equals("ROLE_QA") || role.equals("QA_MANAGER") || role.equals("QA_DESIGNEE")) {

				if (details.getStatus().equals(AppConstantDryGoods.hodApprovedStatus)) {

					details.setForm_no("PH-PRD04/F-004");
					details.setQa_id(userId);
					details.setStatus(AppConstantDryGoods.qaApprovedStatus);
					bmr12goodspostprodreviewrepository.save(details);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, "HOD not yet Submitted"), HttpStatus.BAD_REQUEST);
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

	public ResponseEntity<?> GetPostProductionReview(String batch_no) {
		List<BMR12GoodsPostProdReview> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr12goodspostprodreviewrepository.getDetails(batch_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveQaRelease(BMR13GoodsQaRelease details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_QA") || role.equals("QA_MANAGER") || role.equals("QA_DESIGNEE")) {

				details.setForm_no("PH-PRD04/F-004");
				details.setQa_id(userId);
				details.setStatus(AppConstants.qaSave);
				bmr13goodsqareleaserrepository.save(details);

				for (BMR13GoodsQaReleaseLine lineDetails : details.getDetails()) {
					lineDetails.setRls_id(details.getRls_id());
					bmr13goodsqareleaselinerepository.save(lineDetails);
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
	public ResponseEntity<?> SubmitQaRelease(BMR13GoodsQaRelease details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {

			String value = "";
			if (details.getBatch_no() == null) {
				value = "BatchNo";
			}
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_QA") || role.equals("QA_MANAGER") || role.equals("QA_DESIGNEE")) {

				details.setForm_no("PH-PRD04/F-004");
				details.setQa_id(userId);
				details.setStatus(AppConstants.qaApprovedStatus);
				bmr13goodsqareleaserrepository.save(details);

				for (BMR13GoodsQaReleaseLine lineDetails : details.getDetails()) {
					lineDetails.setRls_id(details.getRls_id());
					bmr13goodsqareleaselinerepository.save(lineDetails);
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

	public ResponseEntity<?> GetQaRelease(String batch_no) {
		List<BMR13GoodsQaRelease> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr13goodsqareleaserrepository.getDetails(batch_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> SaveProductRelease(BMR14GoodsProductRelease details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PH-PRD04/F-004");
//				details.setSupervisor_id(userId);
				details.setStatus(AppConstantDryGoods.supervisorSave);
				bmr14goodsproductreleaserepository.save(details);
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

	public ResponseEntity<?> SubmitProductRelease(BMR14GoodsProductRelease details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {

			String value = "";
			if (details.getBatch_no() == null) {
				value = "BatchNo";
			}
			if (details.getOrder_no() == null) {
				value = "OrderNo";
			}

			if (!"".equals(value)) {
				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
						HttpStatus.BAD_REQUEST);
			}

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_QA")) {

				details.setForm_no("PH-PRD04/F-004");
				details.setQa_id(userId);
				details.setStatus(AppConstantDryGoods.qaApprovedStatus);
				bmr14goodsproductreleaserepository.save(details);
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

	public ResponseEntity<?> GetProductRelease(String batch_no) {
		List<BMR14GoodsProductRelease> bmrSummaryDateList;

		try {
			bmrSummaryDateList = bmr14goodsproductreleaserepository.getDetails(batch_no);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	//

//	public ResponseEntity<?> getProductionLOV() {
//		List<IdAndValuePair> valuePairList = new ArrayList<>();
//		List<String> productionDetailsList = new ArrayList<>();
//
//		try {
//			// Fetch initial batch numbers
//			productionDetailsList = bmr001goodsproductiondetailsrepository.productionDetailsBatchNumber();
//
//			Long id = 1L; // Initialize ID
//
//			// Iterate over the batch numbers
//			for (String temp : productionDetailsList) {
//
//				// Add the original batch number
//				IdAndValuePair values = new IdAndValuePair();
//				values.setValue(temp);
//				values.setId(id);
//				valuePairList.add(values);
//
//				// Increment ID
//				id++;
//
//				// Get the first incremented batch number
//				String incrementedBatchNo = getNextAvailableBatchNo(temp);
//
//				// Keep incrementing while the batch is "Open"
//				while (incrementedBatchNo != null) {
//					IdAndValuePair incrementedValue = new IdAndValuePair();
//					incrementedValue.setValue(incrementedBatchNo);
//					incrementedValue.setId(id);
//					valuePairList.add(incrementedValue);
//
//					// Update temp to the current incremented value
//					temp = incrementedBatchNo;
//					id++;
//
//					// Get the next incremented batch number
//					incrementedBatchNo = getNextAvailableBatchNo(temp);
//				}
//			}
//
//			log.info("*** Production Details LOV ****" + valuePairList.size());
//
//		} catch (Exception ex) {
//			String msg = ex.getMessage();
//			log.error("Unable to Get Batch for Production Details: " + msg);
//			ex.printStackTrace();
//
//			return new ResponseEntity<>(new ApiResponse(false, "Failed to Get Batch for Production Details: " + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//
//		return new ResponseEntity<>(valuePairList, HttpStatus.OK);
//	}
//
//	// Method to check the status and increment the batch number
//	public String getNextAvailableBatchNo(String batchNo) {
//		
//		try {
//			
//			log.info("****" + batchNo);
//			
//			Optional<String> statusOpt = bmr001goodsproductiondetailsrepository.productionDetailsByBatchNo(batchNo); // OPEN
//			
////			Optional<String> supstatusOpt = bmr001goodsproductiondetailsrepository.supproductionDetailsByBatchNo(batchNo); // APPRO
//
//			if (statusOpt.isPresent()) {
//				String status = statusOpt.get();
////				  String supStatus = supstatusOpt.get();
//
//				  if (status.equalsIgnoreCase("Open")) {
//					String[] batchNoParts = batchNo.split("-");
//					int incrementedNumber = Integer.parseInt(batchNoParts[1]) + 1;
//					 
//					String nextNumber =	batchNoParts[0] + "-" + incrementedNumber;
//					
//					log.info("Next Number : " + nextNumber + " Batch nO: " + batchNo);
//					
//					return nextNumber;
//				}
//			}
//			return null;
//		} catch (Exception ex) {
//			String msg = ex.getMessage();
//			log.error("Unable to Get Batch for Production Details: " + msg);
//			ex.printStackTrace();
//
//			return null;
//		}
//	}

	// new

	public ResponseEntity<?> getProductionLOV() {
		List<String> productionBatchDb = new ArrayList<>();
		List<String> productionnextBatch = new ArrayList<>();
		List<String> updatedProductionLov = new ArrayList<>();
		List<IdAndValuePair> productionDetailsLov = new ArrayList<>();
		try {
			// FROM SAP
			productionBatchDb = bmr001goodsproductiondetailsrepository.productionDetailsBatchNumber();

			// INCREMENTAL FOR OPEN BATCHES
			productionnextBatch = bmr001goodsproductiondetailsrepository.fetchOpenBatchesform4();

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

	public ResponseEntity<?> getOrderLovOnBatchNo(String batchNo) {

		List<String> orderList = new ArrayList<>();
		List<IdAndValuePair> valueList = new ArrayList<>();

		try {

			orderList = bmr001goodsproductiondetailsrepository.getOrderByBatchNo(batchNo);

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
			log.error("Unable to Get Batch for Production Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, msg), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(valueList, HttpStatus.OK);
	}

//GET PRODUCTION DETAILS BY BATCH NO AND ORDER NO

	public ResponseEntity<?> getProductionResponseByBatchOrder(String batchNo, String orderNo, String fromDate,
			String toDate) {

		List<Object[]> goodsDetailsResponse = new ArrayList<>();

		List<DrygoodsBmrProductionDetailsResponse> list = new ArrayList<>();

		try {

			String[] batchNoParts = batchNo.split("-");
			String genNumber = "";
			String batchNumber = "";
			if (batchNoParts.length > 1) {
				genNumber = batchNoParts[1];
				batchNumber = batchNoParts[0];
				System.out.println("Generated Number" + genNumber);
				System.out.println(batchNumber);
			}

			goodsDetailsResponse = bmr001goodsproductiondetailsrepository.productionResponseByBatchOrder(batchNumber,
					orderNo);

			for (Object[] result : goodsDetailsResponse) {

				DrygoodsBmrProductionDetailsResponse response = new DrygoodsBmrProductionDetailsResponse();
				response.setSaleOrder((BigDecimal) result[0]);
				response.setSaleOrderItem((BigDecimal) result[1]);
				response.setOrderNumber((String) result[2]);
				response.setQuantity((BigDecimal) result[3]);
				response.setBags((BigDecimal) result[4]);
				response.setPoNumber((String) result[5]);
				response.setMaterial((String) result[6]);
				response.setProductCode((String) result[7]);
				response.setProductionDescription((String) result[8]);
				response.setBagWeight((BigDecimal) result[9]);

				// OTHER FIELDS

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

				// Fetch data for the given date range

				// SPLIT BATCH_NO

				BigDecimal farQuantityBag = BigDecimal.ZERO;
				BigDecimal farQuantityBox = BigDecimal.ZERO;

				if (genNumber.equals("1")) {
					farQuantityBag = BigDecimal.ZERO;
					farQuantityBox = BigDecimal.ZERO;
				} else {
					farQuantityBag = bmr001goodsproductiondetailsrepository.soFarPackQtyBagCottonBall(batchNumber);
					farQuantityBox = bmr001goodsproductiondetailsrepository.soFarPackQtyBoxCottonBall(batchNumber);
				}

				BigDecimal nbagDate = bmr001goodsproductiondetailsrepository.productionBagsOnDate(orderNo,
						fromLocalDate, toLocalDate);
				BigDecimal nocDate = bmr001goodsproductiondetailsrepository.productionBagNocOnDate(orderNo,
						fromLocalDate, toLocalDate);

				// PACKED QTY IN BAGS AND BOXES
				BigDecimal packQtyBag = bmr001goodsproductiondetailsrepository.packedQtyInBags(orderNo);
				BigDecimal packQtyBox = bmr001goodsproductiondetailsrepository.packedQtyInBoxes(orderNo);

				response.setBagPackDate(nbagDate != null ? nbagDate.toString() : "--");
				response.setBoxPackDate(nocDate != null ? nocDate.toString() : "--");
				response.setBoxPackQty(farQuantityBox);
				response.setBagPackQty(farQuantityBag);

				list.add(response);

			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("Unable to Get Production Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Get Production Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(list, HttpStatus.OK);
	}

	public ResponseEntity<?> GetBmrPrint(String batch_no) {
		List<BMR001GoodsProductionDetails> bmr001goodsproductiondetails;
		List<BMR03GoodsPackingMeterialIssue> bmr03goodspackingmeterialissue;
		List<BMR05GoodsEquipmentUsed> bmr05goodsequipmentused;
		List<BMR06GoodsVerificationOfRecords> bmr06goodsverificationofrecords;
		List<BMR07GoodsManufacturingStepsCottonBalls> bmr07goodsmanufacturingstepscottonballs;
		List<BMR09GoodsProcessDevRecord> bmr09goodsprocessdevrecord;
		List<BMR10GoodsProcessDelayEqupment> bmr10goodsprocessdelayequpment;
		List<BMR11GoodsListOfEnclouser> bmr11goodslistofenclouser;
		List<BMR12GoodsPostProdReview> bmr12goodspostprodreview;
		List<BMR13GoodsQaRelease> bmr13goodsqarelease;
		List<BMR14GoodsProductRelease> bmr14goodsproductrelease;
		List<BMR10GoodsProductReconillation> bmrReconillation;
		List<BudsBmrRework> reworkList;

		try {
			bmr001goodsproductiondetails = bmr001goodsproductiondetailsrepository.getDetails(batch_no);
			bmr03goodspackingmeterialissue = bmr03goodspackingmeterialissuerepository.getDetails(batch_no);
			bmr05goodsequipmentused = bmr05equipmentusedrepository.getDetails(batch_no);
			bmr06goodsverificationofrecords = bmr06goodsverificationofrecordsrepository.getDetails(batch_no);
			bmr07goodsmanufacturingstepscottonballs = bmr07goodsmanufacturingstepscottonballrepository
					.getDetails(batch_no);
			bmr09goodsprocessdevrecord = bmr09goodsprocessdevrecordrepository.getDetails(batch_no);
			bmr10goodsprocessdelayequpment = bmr10goodsprocessdelayequpmentrepository.getDetails(batch_no);
			bmr11goodslistofenclouser = bmr11goodslistofenclouserrepository.getDetails(batch_no);
			bmr12goodspostprodreview = bmr12goodspostprodreviewrepository.getDetails(batch_no);
			bmr13goodsqarelease = bmr13goodsqareleaserrepository.getDetails(batch_no);
			bmr14goodsproductrelease = bmr14goodsproductreleaserepository.getDetails(batch_no);
			bmrReconillation = reconillationRepository.fetchReconillationBalls(batch_no);
			reworkList = reworkRepository.reworkListByBmrNumber(batch_no);

			BMRCottonBallResponsePrint response = new BMRCottonBallResponsePrint(bmr001goodsproductiondetails,
					bmr03goodspackingmeterialissue, bmr05goodsequipmentused, bmr06goodsverificationofrecords,
					bmr07goodsmanufacturingstepscottonballs, bmr09goodsprocessdevrecord, bmr10goodsprocessdelayequpment,
					bmr11goodslistofenclouser, bmr12goodspostprodreview, bmr13goodsqarelease, bmr14goodsproductrelease,
					bmrReconillation, reworkList);

			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	// RECON

//	public ResponseEntity<?> productReconillation(String order, String fromdate, String todate) {
//		
//		 Map<String, String> productRecon = new HashMap<>();
//	    try {
//	        // Fetch input quantity
////	        BigDecimal inputQuantity = bmr001goodsproductiondetailsrepository.inputQuantity(order);
//	        BigDecimal inputQuantity = bmr001goodsproductiondetailsrepository.inputQuantitynNew(order, fromdate, todate);
//	        
//	        // Fetch output rows
//	        List<Object[]> outputRows = bmr001goodsproductiondetailsrepository.outputQuantityQuery(order,fromdate, todate);
//	        
//	        BigDecimal outputString = BigDecimal.ZERO;
//	        // Sum output quantities, handle potential nulls in the result set
//	        for (Object[] resp : outputRows) {
//	            BigDecimal fbag = (BigDecimal) resp[2];
//	            BigDecimal noc = (BigDecimal) resp[3];
//	            if (fbag != null && noc != null) {
//	                outputString = outputString.add(fbag.multiply(noc));
//	            } else {
//	                log.warn("Null value encountered in output rows: fbag or noc is null");
//	            }
//	        }
//	        log.info("**** Output Rows Count: " + outputRows.size());
//	        BigDecimal yield = BigDecimal.ZERO;
//	        // Calculate yield only if both input and output are greater than zero
//	        if (inputQuantity.compareTo(BigDecimal.ZERO) > 0 && outputString.compareTo(BigDecimal.ZERO) > 0) {
//	            yield = outputString.divide(inputQuantity, 4, RoundingMode.HALF_UP)
//	                                .multiply(BigDecimal.valueOf(100));
//	        } else {
//	            log.warn("Cannot calculate yield, inputQuantity or outputString is invalid.");
//	        }
//	        BigDecimal orderDecimal = new BigDecimal(order);
//	        // Store results in productRecon map
//	        productRecon.put("input", inputQuantity.toString());
//	        productRecon.put("output", outputString.toString());
//	        productRecon.put("yield", yield.toString());
//	        productRecon.put("order", orderDecimal.toString());
//	    } catch (Exception ex) {
//	        String msg = ex.getMessage();
//	        log.error("Unable to Get Production Reconciliation Details: " + msg);
//	        ex.printStackTrace();
// 
//	        return new ResponseEntity<>(new ApiResponse(false, "Failed to Get Production Reconciliation Details: " + msg),
//	                                    HttpStatus.BAD_REQUEST);
//	    }
//	    return new ResponseEntity<>(productRecon, HttpStatus.OK);
//	}
//	

	// PRODUCT RECONCILIATION
	public ResponseEntity<?> productReconillation(String order, String from_date, String to_date) {
		Map<String, String> productRecon = new HashMap<>();
		try {
			// Fetch input quantity, handle null by defaulting to BigDecimal.ZERO
			BigDecimal inputQuantity = bmr001goodsproductiondetailsrepository.inputQuantity(order, from_date, to_date);
			if (inputQuantity == null) {
				inputQuantity = BigDecimal.ZERO;
				log.warn("Input Quantity not found, defaulting to 0");
			}
			// Fetch output rows
			List<Object[]> outputRows = bmr001goodsproductiondetailsrepository.outputQuantityQuery(order, from_date,
					to_date);
			BigDecimal outputString = BigDecimal.ZERO;
			// Sum output quantities, handle potential nulls in the result set
			for (Object[] resp : outputRows) {
				BigDecimal fbag = (BigDecimal) resp[2];
				BigDecimal noc = (BigDecimal) resp[3];
				if (fbag != null && noc != null) {
					outputString = outputString.add(fbag.multiply(noc));
				} else {
					log.warn("Null value encountered in output rows: fbag or noc is null");
				}
			}
			log.info("**** Output Rows Count: " + outputRows.size());
			BigDecimal yield = BigDecimal.ZERO;
			// Calculate yield only if both input and output are greater than zero
			if (inputQuantity.compareTo(BigDecimal.ZERO) > 0 && outputString.compareTo(BigDecimal.ZERO) > 0) {
				yield = outputString.divide(inputQuantity, 4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));
			} else {
				log.warn("Cannot calculate yield, inputQuantity or outputString is invalid.");
			}
			BigDecimal orderDecimal = new BigDecimal(order);
			// Store results in productRecon map
			productRecon.put("input", inputQuantity.toString());
			productRecon.put("output", outputString.toString());
			productRecon.put("yield", yield.toString());
			productRecon.put("order", orderDecimal.toString());
		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("Unable to Get Production Reconciliation Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to Get Production Reconciliation Details: " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(productRecon, HttpStatus.OK);
	}

	public ResponseEntity<?> getStoppageOrders(String fromdate, String todate, String machine) {
		List<PadPunchingStoppageResponse> stoppageList = new ArrayList<>();

		try {
			List<Object[]> results = bmr001goodsproductiondetailsrepository.stoppageResponse(fromdate, todate, machine);

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
			log.error("Unable to get Stoppage Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get stoppage records: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(stoppageList, HttpStatus.OK);
	}

	public ResponseEntity<?> getDrygoodsStoppageDetailsF003(String fromdate, String todate, String orderNo,
			String machine_name) {
		List<Map<String, Object>> stoppageResponse = new ArrayList<>();

		try {
			List<Object[]> results = bmr001goodsproductiondetailsrepository.fetchStoppageF003(fromdate, todate, orderNo,
					machine_name);

			for (Object[] result : results) {
				Map<String, Object> rowMap = new HashMap<>();
				rowMap.put("SCAUSE", result[0]);
				rowMap.put("FTime", result[1]);
				rowMap.put("TTime", result[2]);
				rowMap.put("TotHrs", result[3]);
				stoppageResponse.add(rowMap);
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("Unable to get stoppage Details: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to get stoppage details: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(stoppageResponse, HttpStatus.OK);
	}

//	2. Fleece 

	public ResponseEntity<?> getDrygoodsFleece(String fromdate, String todate, String orderNo) {

		List<DailyProductionCottonBallsF003> bmrSummaryDateList;

		try {
			bmrSummaryDateList = dailyproductioncottonballsf003repository.getDrygoodsFleece(fromdate, todate, orderNo);

			return new ResponseEntity<>(bmrSummaryDateList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * CR - PRODUCT RECONILLATION
	 */

	public ResponseEntity<?> submitProductReconillation(BMR10GoodsProductReconillation productReconillation,
			HttpServletRequest http) {

		SCAUtil scaUtil = new SCAUtil();

		try {

//			Long id = productReconillation.getId();

//			if(id == null) {
//				
//				String value = "";
//				
//				if("".equals(productReconillation.getBatchNo()) || productReconillation.getBatchNo() == null) {
//					value = "batchNo";
//				}
//				
//				return new ResponseEntity(new ApiResponse(false, "Should Fill Mandaory Fields !!!" + value), HttpStatus.BAD_REQUEST);
//				
//			}

			productReconillation.setForm_no("Balls");

			reconillationRepository.save(productReconillation);

		} catch (Exception ex) {

			log.error("***!!! Unable to Submit Product Reconillation !!! ***" + ex.getMessage());
			ex.printStackTrace();
			;

			return new ResponseEntity(
					new ApiResponse(false, "Unable to submit product Reconillation" + ex.getMessage()),
					HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(productReconillation, HttpStatus.OK);
	}

	// Fecth reconillation details by Batch Number

	public ResponseEntity<?> getProductReconillationForBallsByBatchNumber(String batchNo) {

		List<BMR10GoodsProductReconillation> reconillationList = new ArrayList<BMR10GoodsProductReconillation>();

		try {

			reconillationList = reconillationRepository.fetchReconillationBalls(batchNo);

		} catch (Exception ex) {
			log.error("***!!! Unable to get Product Reconillation !!! ***" + ex.getMessage());
			ex.printStackTrace();
			;

			return new ResponseEntity(new ApiResponse(false, "Unable to get product Reconillation" + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(reconillationList, HttpStatus.OK);
	}

}
