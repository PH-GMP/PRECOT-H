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
import com.focusr.Precot.mssql.database.model.drygoods.BMR07ManufacturingStepsCottonWoolRoll;
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
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR001GoodsProductionDetailsRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR03GoodsPackingMeterialIssueLineRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR03GoodsPackingMeterialIssueRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR05EquipmentUsedLineRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR05EquipmentUsedRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR06GoodsVerificationOfRecordsLineRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR06GoodsVerificationOfRecordsRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR07GoodsManufacturingStepsCottonWoolRoolRepository;
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
import com.focusr.Precot.mssql.database.repository.drygoods.SliverMakingHeaderRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.padpunching.DrygoodsBmrProductionDetailsResponse;
import com.focusr.Precot.payload.padpunching.PadPunchingStoppageResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.drygoods.AppConstantDryGoods;
import com.focusr.Precot.util.drygoods.BMRCottonWollRollResponcePrint;

@Service
public class BmrCottonWoolRollService {

	Logger log = LoggerFactory.getLogger(BmrCottonWoolRollService.class);

	@Autowired
	private SliverMakingHeaderRepository slivermakingheaderrepository;

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
	private BMR06GoodsVerificationOfRecordsLineRepository bmr06goodsverificationofrecordslinerepository;

	@Autowired
	private BMR06GoodsVerificationOfRecordsRepository bmr06goodsverificationofrecordsrepository;

	@Autowired
	private BMR07GoodsManufacturingStepsCottonWoolRoolRepository bMR07GoodsManufacturingStepsCottonWoolRoolRepository;

	// 9.0
	@Autowired
	private BMR09GoodsProcessDevReocrdLineRepository bmr09goodsprocessdevreocrdlinerepository;

	@Autowired
	private BMR09GoodsProcessDevRecordRepository bmr09goodsprocessdevrecordrepository;

	// 10.0

	@Autowired
	private BMR10GoodsProcessDelayEqupmentRepository bmr10goodsprocessdelayequpmentrepository;

	@Autowired
	private BMR10GoodsProcessDelayEqupmentLineRepository bmr10goodsprocessdelayequpmentlinerepository;

	// 11.0

	@Autowired
	private BMR11GoodsListOfEnclouserRepository bmr11goodslistofenclouserrepository;

	@Autowired
	private BMRGoods11ListOfEnclouserLineReposirory bmrgoods11listofenclouserlinereposirory;

	// 12.0

	@Autowired
	private BMR12GoodsPostProdReviewRepository bmr12goodspostprodreviewrepository;

	// 13.0

	@Autowired
	private BMR13GoodsQaReleaserRepository bmr13goodsqareleaserrepository;

	@Autowired
	private BMR13GoodsQaReleaseLineRepository bmr13goodsqareleaselinerepository;

	// 14.0

	@Autowired
	private BMR14GoodsProductReleaseRepository bmr14goodsproductreleaserepository;

	@Autowired
	private BMR03GoodsPackingMeterialIssueRepository bmr03goodspackingmeterialissuerepository;

	@Autowired
	private BMR03GoodsPackingMeterialIssueLineRepository bmr03goodspackingmeterialissuelinerepository;

	@Autowired
	private BudsBmrReworkRepository reworkRepository;

	// FOR PRODUCT RECONILLATION

	@Autowired
	private BMR10ReconillationRepository reconillationRepository;

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveProductionDetails(BMR001GoodsProductionDetails details, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setStatus(AppConstantDryGoods.supervisorSave);
				details.setSupervisor_id(userId);
				details.setForm_no("PH-PRD04/F-008");
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

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setStatus(AppConstantDryGoods.supervisorApprovedStatus);
				details.setForm_no("PH-PRD04/F-008");
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
				details.setForm_no("PH-PRD04/F-008");
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

	// GET PRODUCTION DETAILS

	public ResponseEntity<?> GetProductionDetails(String batch_no) {

		List<BMR001GoodsProductionDetails> bmrSummaryProductionWool;

		try {
			bmrSummaryProductionWool = bmr001goodsproductiondetailsrepository.GetProductionDetailsWool(batch_no);

			return new ResponseEntity<>(bmrSummaryProductionWool, HttpStatus.OK);

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
				details.setForm_no("PH-PRD04/F-008");
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

				details.setForm_no("PH-PRD04/F-008");
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
			bmrSummaryDateList = bmr03goodspackingmeterialissuerepository.getDetails08(batch_no);

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

	// 5.0 EQUIPMENT PROCESS

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveProcessingEquipments(BMR05GoodsEquipmentUsed details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {
				details.setForm_no("PH-PRD04/F-008");
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

				details.setForm_no("PH-PRD04/F-008");
				details.setStatus(AppConstantDryGoods.supervisorApprovedStatus);
				details.setSupervisor_id(userId);
				bmr05equipmentusedrepository.save(details);

				for (BMR05GoodsEquipmentUsedLine lineDetails : details.getDetails()) {

					Long Id = details.getEqup_id();

					lineDetails.setEqup_id(Id);

					bmr05equipmentusedlinerepository.save(lineDetails);

				}
			} else if (role.equals("ROLE_QA")) {

				details.setForm_no("PH-PRD04/F-008");
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

	// 5.0 GET PROCESSING EQUIPMENTS

	public ResponseEntity<?> GetProcessingEquipments(String batch_no) {

		List<BMR05GoodsEquipmentUsed> bmrSummary05GoodsEquipmentUsedWool;

		try {
			bmrSummary05GoodsEquipmentUsedWool = bmr05equipmentusedrepository.getProcessingEquipmentsWool(batch_no);

			return new ResponseEntity<>(bmrSummary05GoodsEquipmentUsedWool, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	// 6.0 SAVE VERIFICATION OF RECORDS

	public ResponseEntity<?> SaveVerificationOfRecords(BMR06GoodsVerificationOfRecords details,
			HttpServletRequest http) {
		Long id = details.getVerification_id();
		SCAUtil scaUtil = new SCAUtil();

		BMR06GoodsVerificationOfRecords checkObj = new BMR06GoodsVerificationOfRecords();

		try {
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);

			if (id != null) {

				checkObj = bmr06goodsverificationofrecordsrepository.getSummaryByVerification_id08(id);

				details.setCreatedAt(checkObj.getCreatedAt());
				details.setCreatedBy(checkObj.getCreatedBy());

			}

			details.setForm_no("PH-PRD04/F-008");

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

				checkObj = bmr06goodsverificationofrecordsrepository.getSummaryByVerification_id08(id);

				String[] IgnoreProps = { "verification_id", "createdBy", "createdAt", "supervisor_status",
						"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
						"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "qa_status", "qa_save_on",
						"qa_save_by", "qa_save_id", "qa_submit_on", "qa_submit_by", "qa_submit_id", "qa_mail_status",
						"qa_sign", "supervisor_signature_image", "qa_signature_image", "form_no",
						"detailsVerificationRecords" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {

					checkObj.setForm_no("PH-PRD04/F-008");
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

						checkObj.setForm_no("PH-PRD04/F-008");

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

				checkObj.setForm_no("PH-PRD04/F-008");
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

	// 6.0 GET VERIFICATION OF RECORDS

	public ResponseEntity<?> GetVerificationOfRecords(String batch_no) {

		List<BMR06GoodsVerificationOfRecords> bmrSummary06GoodsVerificationWool;

		try {
			bmrSummary06GoodsVerificationWool = bmr06goodsverificationofrecordsrepository
					.getGoodsVerificationWool(batch_no);

			return new ResponseEntity<>(bmrSummary06GoodsVerificationWool, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	// 7.0 SAVE MANUFACTURING STEPS

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveManufacturingSteps(BMR07ManufacturingStepsCottonWoolRoll details,
			HttpServletRequest http) {

		SCAUtil scaUtil = new SCAUtil();
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		try {

			details.setForm_no("PH-PRD04/F-008");
			details.setSupervisor_save_by(userName);
			details.setSupervisor_save_on(date);
			details.setSupervisor_save_id(userId);
			details.setSupervisor_status(AppConstants.supervisorSave);
			bMR07GoodsManufacturingStepsCottonWoolRoolRepository.save(details);

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(details, HttpStatus.CREATED);
	}

//	7.0 MANUFACTURING STEPS SUBMIT 

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitManufacturingSteps(BMR07ManufacturingStepsCottonWoolRoll details,
			HttpServletRequest http) {
		Long id = details.getId();
		BMR07ManufacturingStepsCottonWoolRoll checkObj = new BMR07ManufacturingStepsCottonWoolRoll();

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

				checkObj = bMR07GoodsManufacturingStepsCottonWoolRoolRepository.getmanufacturingStepsById08(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "qa_status", "qa_save_on", "qa_save_by",
						"qa_save_id", "qa_submit_on", "qa_submit_by", "qa_submit_id", "qa_mail_status", "qa_sign",
						"supervisor_signature_image", "qa_signature_image", "form_no" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {

					checkObj.setForm_no("PH-PRD04/F-008");
					checkObj.setSupervisor_sign(userName);
					checkObj.setSupervisor_submit_by(userName);
					checkObj.setSupervisor_submit_on(date);
					checkObj.setSupervisor_submit_id(userId);
					checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);

					bMR07GoodsManufacturingStepsCottonWoolRoolRepository.save(checkObj);

				}

				else if (role.equals("ROLE_QA")) {

					String supervisiorStatus = checkObj.getSupervisor_status();
					if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)) {

						checkObj.setForm_no("PH-PRD04/F-008");
						checkObj.setQa_sign(userName);
						checkObj.setQa_submit_by(userName);
						checkObj.setQa_submit_on(date);
						checkObj.setQa_submit_id(userId);
						checkObj.setQa_status(AppConstants.qaApprovedStatus);

						bMR07GoodsManufacturingStepsCottonWoolRoolRepository.save(checkObj);

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

				checkObj.setForm_no("PH-PRD04/F-008");
				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);

				bMR07GoodsManufacturingStepsCottonWoolRoolRepository.save(checkObj);

			}
		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save Manufacturing Steps*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Submit " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(checkObj, HttpStatus.CREATED);
	}

	// 7.0 GET MANUFACTURING STEPS

	public ResponseEntity<?> GetManufacturingSteps(String batch_no) {

		List<BMR07ManufacturingStepsCottonWoolRoll> bmrSummaryManufacturingStepsWool;

		try {
			bmrSummaryManufacturingStepsWool = bMR07GoodsManufacturingStepsCottonWoolRoolRepository
					.getManufacturingStepsWool(batch_no);

			return new ResponseEntity<>(bmrSummaryManufacturingStepsWool, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	// 9.0 PROCESS DEVIATION RECORDS - SUBMIT

	public ResponseEntity<?> SaveProcessDevRecord(BMR09GoodsProcessDevRecord details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {
			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PH-PRD04/F-008");
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

				details.setForm_no("PH-PRD04/F-008");
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

				details.setForm_no("PH-PRD04/F-008");
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

	// 9.0 GET PROCESS DEVATION RECORDS

	public ResponseEntity<?> GetProcessDevRecord(String batch_no) {

		List<BMR09GoodsProcessDevRecord> bmrSummaryProcessDevRecordWool;

		try {
			bmrSummaryProcessDevRecordWool = bmr09goodsprocessdevrecordrepository.GetProcessDevRecordWool(batch_no);

			return new ResponseEntity<>(bmrSummaryProcessDevRecordWool, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	// 10.0 PROCESS DELAY EQUIPMENT BREAK

	public ResponseEntity<?> SaveProcessDelayEqupment(BMR10GoodsProcessDelayEqupment details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PH-PRD04/F-008");
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

				details.setForm_no("PH-PRD04/F-008");
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
	// 10.0 GET PROCESS DELAY EQUPMENT

	public ResponseEntity<?> GetProcessDelayEquipment(String batch_no) {

		List<BMR10GoodsProcessDelayEqupment> bmrSummaryProcessDelayEquipmentWool;

		try {
			bmrSummaryProcessDelayEquipmentWool = bmr10goodsprocessdelayequpmentrepository
					.GetProcessDelayEquipmentWool(batch_no);

			return new ResponseEntity<>(bmrSummaryProcessDelayEquipmentWool, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	// 11.0 SAVE LIST OF ENCLOSURES

	public ResponseEntity<?> SaveListOfEnclosurs(BMR11GoodsListOfEnclouser details, HttpServletRequest http) {
		try {

			details.setForm_no("PH-PRD04/F-008");

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

	// 11.0 SUBMIT LIST OF ENCLOSURES

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

			details.setForm_no("PH-PRD04/F-008");

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

	// 11.0 GET LIST OF ENCLOSURS

	public ResponseEntity<?> GetListOfEnclosurs(String batch_no) {

		List<BMR11GoodsListOfEnclouser> bmrSummaryListOfEnclosursWool;

		try {
			bmrSummaryListOfEnclosursWool = bmr11goodslistofenclouserrepository.GetListOfEnclosursWool(batch_no);

			return new ResponseEntity<>(bmrSummaryListOfEnclosursWool, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	// 12.0 POST PRODUCTION LIST

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SavePostProductionReview(BMR12GoodsPostProdReview details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {
			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PH-PRD04/F-008");
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
				details.setForm_no("PH-PRD04/F-008");
				details.setStatus(AppConstantDryGoods.supervisorApprovedStatus);
				details.setSupervisor_id(userId);
				bmr12goodspostprodreviewrepository.save(details);

			} else if (role.equals("ROLE_HOD") || role.equals("ROLE_DESIGNEE")) {

				if (details.getStatus().equals(AppConstantDryGoods.supervisorApprovedStatus)) {

					details.setForm_no("PH-PRD04/F-008");
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

					details.setForm_no("PH-PRD04/F-008");
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

	// 12.0 GET POST PRODUCTION REVIEW

	public ResponseEntity<?> GetPostProductionReview(String batch_no) {

		List<BMR12GoodsPostProdReview> bmrSummaryPostProductionReviewWool;

		try {
			bmrSummaryPostProductionReviewWool = bmr12goodspostprodreviewrepository
					.GetPostProductionReviewWool(batch_no);

			return new ResponseEntity<>(bmrSummaryPostProductionReviewWool, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	// 13.0 SUBMIT QA RELEASE

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveQaRelease(BMR13GoodsQaRelease details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_QA") || role.equals("QA_MANAGER") || role.equals("QA_DESIGNEE")) {

				details.setForm_no("PH-PRD04/F-008");
				details.setQa_id(userId);
				details.setStatus(AppConstants.qaSave);
				bmr13goodsqareleaserrepository.save(details);

				for (BMR13GoodsQaReleaseLine lineDetails : details.getDetails()) {
					lineDetails.setRls_id(details.getRls_id());
					bmr13goodsqareleaselinerepository.save(lineDetails);
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

				details.setForm_no("PH-PRD04/F-008");
				details.setQa_id(userId);
				details.setStatus(AppConstants.qaApprovedStatus);
				bmr13goodsqareleaserrepository.save(details);

				for (BMR13GoodsQaReleaseLine lineDetails : details.getDetails()) {
					lineDetails.setRls_id(details.getRls_id());
					bmr13goodsqareleaselinerepository.save(lineDetails);
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
	// 13.0 GET QA RELEASE

	public ResponseEntity<?> GetQaRelease(String batch_no) {

		List<BMR13GoodsQaRelease> bmrSummaryQaReleaseWool;

		try {
			bmrSummaryQaReleaseWool = bmr13goodsqareleaserrepository.GetQaReleaseWool(batch_no);

			return new ResponseEntity<>(bmrSummaryQaReleaseWool, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	// 14.0 PRODUCTION RELEASE

	public ResponseEntity<?> SaveProductRelease(BMR14GoodsProductRelease details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			if (role.equals("ROLE_SUPERVISOR")) {

				details.setForm_no("PH-PRD04/F-008");
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

			String role = sca.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			if (role.equals("ROLE_QA")) {

				details.setForm_no("PH-PRD04/F-008");
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

	// 14.0 GET PRODUCT RELEASE

	public ResponseEntity<?> GetProductRelease(String batch_no) {

		List<BMR14GoodsProductRelease> bmrSummaryProductReleaseWool;

		try {
			bmrSummaryProductReleaseWool = bmr14goodsproductreleaserepository.GetProductReleaseWool(batch_no);

			return new ResponseEntity<>(bmrSummaryProductReleaseWool, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	// PRINT COTTON WOOL ROLL BMR

	public ResponseEntity<?> GetCottonWoolRollPrint(String batch_no) {

		List<BMR001GoodsProductionDetails> bmr001goodsproductiondetails;

		List<BMR03GoodsPackingMeterialIssue> bmr03goodspackingmeterialissue;

		List<BMR05GoodsEquipmentUsed> bmr05goodsequipmentused;

		List<BMR06GoodsVerificationOfRecords> bmr06goodsverificationofrecords;

		List<BMR07ManufacturingStepsCottonWoolRoll> bmr07manufacturingstepscottonwoolroll;

		List<BMR09GoodsProcessDevRecord> bmr09goodsprocessdevrecord;

		List<BMR10GoodsProcessDelayEqupment> bmr10goodsprocessdelayequpment;

		List<BMR11GoodsListOfEnclouser> bmr11goodslistofenclouser;

		List<BMR12GoodsPostProdReview> bmr12goodspostprodreview;

		List<BMR13GoodsQaRelease> bmr13goodsqarelease;

		List<BMR14GoodsProductRelease> bmr14goodsproductrelease;

		List<BudsBmrRework> reworkList;

		try {

			bmr001goodsproductiondetails = bmr001goodsproductiondetailsrepository.GetProductionDetailsWool(batch_no);
			bmr03goodspackingmeterialissue = bmr03goodspackingmeterialissuerepository.getDetails08(batch_no);

			bmr05goodsequipmentused = bmr05equipmentusedrepository.getProcessingEquipmentsWool(batch_no);

			bmr06goodsverificationofrecords = bmr06goodsverificationofrecordsrepository
					.getGoodsVerificationWool(batch_no);

			bmr07manufacturingstepscottonwoolroll = bMR07GoodsManufacturingStepsCottonWoolRoolRepository
					.getManufacturingStepsWool(batch_no);

			bmr09goodsprocessdevrecord = bmr09goodsprocessdevrecordrepository.GetProcessDevRecordWool(batch_no);

			bmr10goodsprocessdelayequpment = bmr10goodsprocessdelayequpmentrepository
					.GetProcessDelayEquipmentWool(batch_no);

			bmr11goodslistofenclouser = bmr11goodslistofenclouserrepository.GetListOfEnclosursWool(batch_no);

			bmr12goodspostprodreview = bmr12goodspostprodreviewrepository.GetPostProductionReviewWool(batch_no);

			bmr13goodsqarelease = bmr13goodsqareleaserrepository.GetQaReleaseWool(batch_no);

			bmr14goodsproductrelease = bmr14goodsproductreleaserepository.GetProductReleaseWool(batch_no);

			reworkList = reworkRepository.reworkListByBmrNumber(batch_no);

			BMRCottonWollRollResponcePrint response = new BMRCottonWollRollResponcePrint(bmr001goodsproductiondetails,
					bmr03goodspackingmeterialissue, bmr05goodsequipmentused, bmr06goodsverificationofrecords,
					bmr07manufacturingstepscottonwoolroll, bmr09goodsprocessdevrecord, bmr10goodsprocessdelayequpment,
					bmr11goodslistofenclouser, bmr12goodspostprodreview, bmr13goodsqarelease, bmr14goodsproductrelease,
					reworkList);

//			

			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Cotton Wool Roll by Batch No*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get Cotton Wool Roll by Batch No" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// New

//	public ResponseEntity<?> getProductionLOV() {
//	    List<IdAndValuePair> valuePairList = new ArrayList<>();
//	    List<String> productionDetailsList = new ArrayList<>();
//
//	    try {
//	        // Fetch initial batch numbers
//	        productionDetailsList = bmr001goodsproductiondetailsrepository.productionDetailsBatchNumberWoolRoll();
//
//	        Long id = 1L; // Initialize ID
//
//	        // Iterate over the batch numbers
//	        for (String temp : productionDetailsList) {
//
//	            // Add the original batch number
//	            IdAndValuePair values = new IdAndValuePair();
//	            values.setValue(temp);
//	            values.setId(id);
//	            valuePairList.add(values);
//
//	            // Increment ID
//	            id++;
//
//	            // Get the first incremented batch number
//	            String incrementedBatchNo = getNextAvailableBatchNo(temp);
//
//	            // Keep incrementing while the batch is "Open"
//	            while (incrementedBatchNo != null) {
//	                IdAndValuePair incrementedValue = new IdAndValuePair();
//	                incrementedValue.setValue(incrementedBatchNo);
//	                incrementedValue.setId(id);
//	                valuePairList.add(incrementedValue);
//
//	                // Update temp to the current incremented value
//	                temp = incrementedBatchNo;
//	                id++;
//
//	                // Get the next incremented batch number
//	                incrementedBatchNo = getNextAvailableBatchNo(temp);
//	            }
//	        }
//
//	        log.info("*** Production Details LOV ****" + valuePairList.size());
//
//	    } catch (Exception ex) {
//	        String msg = ex.getMessage();
//	        log.error("Unable to Get Batch for Production Details: " + msg);
//	        ex.printStackTrace();
//
//	        return new ResponseEntity<>(new ApiResponse(false, "Failed to Get Batch for Production Details: " + msg),
//	                HttpStatus.BAD_REQUEST);
//	    }
//
//	    return new ResponseEntity<>(valuePairList, HttpStatus.OK);
//	}
//
//	// Method to check the status and increment the batch number
//	public String getNextAvailableBatchNo(String batchNo) {
//	    try {
//	        // Check if the current batch exists and its status
//	        Optional<String> statusOpt = bmr001goodsproductiondetailsrepository.productionDetailsByBatchNo(batchNo);
//
//	        if (statusOpt.isPresent()) {
//	            String status = statusOpt.get();
//
//	            // If the batch is "Open", increment the batch number
//	            if (status.equalsIgnoreCase("Open")) {
//	                // Increment the batch number (e.g., "95325120-2" becomes "95325120-3")
//	                String[] batchNoParts = batchNo.split("-");
//	                int incrementedNumber = Integer.parseInt(batchNoParts[1]) + 1;
//	                return batchNoParts[0] + "-" + incrementedNumber;
//	            }
//	        }
//	        return null;
//	    } catch (Exception ex) {
//	        String msg = ex.getMessage();
//	        log.error("Unable to Get Batch for Production Details: " + msg);
//	        ex.printStackTrace();
//
//	        return null;
//	    }
//	}

	public ResponseEntity<?> getProductionLOV() {
		List<String> productionBatchDb = new ArrayList<>();
		List<String> productionnextBatch = new ArrayList<>();
		List<String> updatedProductionLov = new ArrayList<>();
		List<IdAndValuePair> productionDetailsLov = new ArrayList<>();
		try {
			// FROM SAP
			productionBatchDb = bmr001goodsproductiondetailsrepository.productionDetailsBatchNumberWoolRoll();

			// INCREMENTAL FOR OPEN BATCHES
			productionnextBatch = bmr001goodsproductiondetailsrepository.fetchOpenBatchesform8();

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

			goodsDetailsResponse = bmr001goodsproductiondetailsrepository
					.productionResponseByBatchOrderWool(batchNumber, orderNo);

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

//				List<Object[]> packQtyList = new ArrayList<>();
//				packQtyList = bmr001goodsproductiondetailsrepository
//						.productionResponseByOrder2(response.getOrderNumber());
//
//				for (Object[] temp : packQtyList) {
//
//					System.out.println("temp" + temp[0] + temp[1]);
//
//					response.setBagPackQty((BigDecimal) temp[0]);
//					response.setBoxPackQty((BigDecimal) temp[1]);
//
//					response.setBagPackDate(bmr001goodsproductiondetailsrepository.productionDetailsDatencb(orderNo,
//							response.getBagPackQty()));
//					response.setBoxPackDate(bmr001goodsproductiondetailsrepository.productionDetailsDatenoc(orderNo,
//							response.getBoxPackQty()));
//				}
//
//				// New
//
//				packQtyList = bmr001goodsproductiondetailsrepository.productionResponseQty(response.getOrderNumber());
//
//				for (Object[] qty : packQtyList) {
//
//					System.out.println("temp" + qty[0] + qty[1]);
//
//					response.setPoQtyBag((BigDecimal) qty[0]);
//					response.setPoQtyBox((BigDecimal) qty[1]);
//
//				}

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

				// SPLIT BATCH_NO

				BigDecimal farQuantityBag = BigDecimal.ZERO;
				BigDecimal farQuantityBox = BigDecimal.ZERO;

				if (genNumber.equals("1")) {
					farQuantityBag = BigDecimal.ZERO;
					farQuantityBox = BigDecimal.ZERO;
				} else {
					farQuantityBag = bmr001goodsproductiondetailsrepository.soFarPackQtyBagWool(batchNumber);
					farQuantityBox = bmr001goodsproductiondetailsrepository.soFarPackQtyBoxWool(batchNumber);
				}

				// Fetch data for the given date range
				BigDecimal nbagDate = bmr001goodsproductiondetailsrepository.productionBagsOnDate(orderNo,
						fromLocalDate, toLocalDate);
				BigDecimal nocDate = bmr001goodsproductiondetailsrepository.productionBagNocOnDate(orderNo,
						fromLocalDate, toLocalDate);

				// PACKED QTY IN BAGS AND BOXES
				BigDecimal packQtyBag = bmr001goodsproductiondetailsrepository.packedQtyInBags(orderNo);
				BigDecimal packQtyBox = bmr001goodsproductiondetailsrepository.packedQtyInBoxes(orderNo);

				response.setBagPackDate(nbagDate != null ? nbagDate.toString() : "--");
				response.setBoxPackDate(nocDate != null ? nocDate.toString() : "--");
				response.setBoxPackQty(packQtyBox);
				response.setBagPackQty(packQtyBag);

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

	// RECON

	public ResponseEntity<?> productReconillation(String order, String fromdate, String todate) {
		Map<String, BigDecimal> productRecon = new HashMap<>();
		try {
			// Fetch input quantity
			BigDecimal inputQuantity = bmr001goodsproductiondetailsrepository.inputQuantity(order, fromdate, todate);

			// Fetch output rows
			List<Object[]> outputRows = bmr001goodsproductiondetailsrepository.outputQuantityQuery(order, fromdate,
					todate);

			BigDecimal outputString = BigDecimal.ZERO;

			// Calculate total output as sum of fbag * noc
			for (Object[] resp : outputRows) {
				BigDecimal fbag = (BigDecimal) resp[2];
				BigDecimal noc = (BigDecimal) resp[3];
				outputString = outputString.add(fbag.multiply(noc));
			}

			log.info("**** !!!! Output Rows !!!! ****" + outputRows.size());

			// Calculate yield (output/input * 100)
			BigDecimal yield = BigDecimal.ZERO;
			if (inputQuantity.compareTo(BigDecimal.ZERO) > 0) { // Avoid division by zero
				yield = outputString.divide(inputQuantity, 4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));
			}

			// Store data in the map
			productRecon.put("input", inputQuantity);
			productRecon.put("output", outputString);
			productRecon.put("yield", yield);

		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("Unable to Get Production Reconciliation Details: " + msg);
			ex.printStackTrace();
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to Get Production Reconciliation Details: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		// Return successful response
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

	// STOPPAGE

	public ResponseEntity<?> dailyProductionDetails(String fromdate, String todate, String orderNo,
			String machine_name) {
		List<Map<String, Object>> stoppageResponse = new ArrayList<>();

		try {
			List<Object[]> results = bmr001goodsproductiondetailsrepository.fetchStoppagedetailsForF006(fromdate,
					todate, orderNo, machine_name);

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

	// FLEECE RECEIPT

	public ResponseEntity<?> getFleecetDetails(String fromdate, String todate, String orderNo) {

		System.out.println("FORM " + fromdate + todate + orderNo);

		List<Map<String, Object>> responseList = new ArrayList<>();

		try {
			List<Object[]> orderResponse = bmr001goodsproductiondetailsrepository.fetchfleecetReceiptForF006(fromdate,
					todate, orderNo);

			System.out.println("Call");

			// Convert each Object[] to a Map<String, Object>
			for (Object[] record : orderResponse) {
				Map<String, Object> map = new HashMap<>();
				map.put("rollNo", record[0]);
				map.put("width_in_mm", record[1]);
				map.put("gsm", record[2]);
				map.put("net_wt", record[3]);

				responseList.add(map);
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("Unable to get Production Report: " + msg);

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Production Report: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	// HEADERS

	public ResponseEntity<?> getHeaderDetails(String orderNo) {

		List<Map<String, Object>> responseList = new ArrayList<>();

		try {
			List<Object[]> orderResponse = bmr001goodsproductiondetailsrepository.fetchheaderdetailsForF006(orderNo);

			// Convert each Object[] to a Map<String, Object>
			for (Object[] record : orderResponse) {
				Map<String, Object> map = new HashMap<>();
				map.put("customerName", record[0]);
				map.put("brand", record[1]);
				map.put("bagByBox", record[2]);
				map.put("grams", record[3]);

				responseList.add(map);
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("Unable to get Production Report: " + msg);

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Production Report: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	// CR

	public ResponseEntity<?> submitProductReconillation(BMR10GoodsProductReconillation productReconillation,
			HttpServletRequest http) {

		SCAUtil scaUtil = new SCAUtil();

		try {

//				Long id = productReconillation.getId();

//				if(id == null) {
//					
//					String value = "";
//					
//					if("".equals(productReconillation.getBatchNo()) || productReconillation.getBatchNo() == null) {
//						value = "batchNo";
//					}
//					
//					return new ResponseEntity(new ApiResponse(false, "Should Fill Mandaory Fields !!!" + value), HttpStatus.BAD_REQUEST);
//					
//				}

			productReconillation.setForm_no("WoolRoll");

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

	public ResponseEntity<?> getProductReconillationForWoolRollByBatchNumber(String batchNo) {

		List<BMR10GoodsProductReconillation> reconillationList = new ArrayList<BMR10GoodsProductReconillation>();

		try {

			reconillationList = reconillationRepository.fetchReconillationRolls(batchNo);

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
