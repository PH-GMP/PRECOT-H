package com.focusr.Precot.QA.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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

import com.focusr.Precot.QA.model.BmrIssueRegisterF045;
import com.focusr.Precot.QA.model.BmrIssueRegisterLineF045;
import com.focusr.Precot.QA.model.DistributionAndDestructionRecordF003;
import com.focusr.Precot.QA.model.DistributionAndDestructionRecordLinesF003;
import com.focusr.Precot.QA.model.FinalInspectionReportF037;
import com.focusr.Precot.QA.model.FinalInspectionReportSummaryDto;
import com.focusr.Precot.QA.model.ProductDispositionLogBookF049;
import com.focusr.Precot.QA.model.ProductDispositionLogBookLineDetails;
import com.focusr.Precot.QA.model.QaContainerInspectionReport;
import com.focusr.Precot.QA.model.QaContainerInspectionReportLines;
import com.focusr.Precot.QA.model.QaOnlineInspectionList;
import com.focusr.Precot.QA.model.QaOnlineInspectionReport;
import com.focusr.Precot.QA.model.QaOnlineInspectionReportDto;
import com.focusr.Precot.QA.model.QaQualityReviewMeetingAttendanceSheet;
import com.focusr.Precot.QA.model.QaQualityReviewMeetingDiscussionPoints;
import com.focusr.Precot.QA.model.QaQualityReviewMeetings;
import com.focusr.Precot.QA.model.QaQualityReviewMeetingsDiscussion;
import com.focusr.Precot.QA.model.RequestAndIssunceOfDocumentF002;
import com.focusr.Precot.QA.model.RequestAndIssunceOfLineDocumentsF002;
import com.focusr.Precot.QA.model.audit.BmrIssueRegisterHistoryF045;
import com.focusr.Precot.QA.model.audit.BmrIssueRegisterLineHistoryF045;
import com.focusr.Precot.QA.model.audit.DistributionAndDestructionRecordHistoryF003;
import com.focusr.Precot.QA.model.audit.DistributionAndDestructionRecordLinesHistoryF003;
import com.focusr.Precot.QA.model.audit.FinalInspectionReportHistoryF037;
import com.focusr.Precot.QA.model.audit.ProductDispositionLogBookHistoryF049;
import com.focusr.Precot.QA.model.audit.ProductDispositionLogBookHistoryLineDetailsF049;
import com.focusr.Precot.QA.model.audit.QaContainerInspectionReportHistory;
import com.focusr.Precot.QA.model.audit.QaContainerInspectionReportLinesHistory;
import com.focusr.Precot.QA.model.audit.QaOnlineInspectionListHistory;
import com.focusr.Precot.QA.model.audit.QaOnlineInspectionReportHistory;
import com.focusr.Precot.QA.model.audit.QualityReviewMeetingAttendanceSheetHistory;
import com.focusr.Precot.QA.model.audit.QualityReviewMeetingDiscussionHistory;
import com.focusr.Precot.QA.model.audit.QualityReviewMeetingHistory;
import com.focusr.Precot.QA.model.audit.RequestAndIssunceOfDocumentHistoryF002;
import com.focusr.Precot.QA.model.audit.RequestAndIssunceOfDocumentLinesHisotryF002;
import com.focusr.Precot.QA.repository.BmrIssueRegisterLineRepositoryF045;
import com.focusr.Precot.QA.repository.BmrIssueRegisterRepositoryF045;
import com.focusr.Precot.QA.repository.DistributionAndDestructionRecordLinesRepositoryF003;
import com.focusr.Precot.QA.repository.DistributionAndDestructionRecordRepositoryF003;
import com.focusr.Precot.QA.repository.FinalInspectionReportRepositoryF037;
import com.focusr.Precot.QA.repository.ProductDispositionLogBookLineDetailsRepository;
import com.focusr.Precot.QA.repository.ProductDispositionLogBookRepositoryF049;
import com.focusr.Precot.QA.repository.QaContainerInspectionReportLinesRepository;
import com.focusr.Precot.QA.repository.QaContainerInspectionReportRepository;
import com.focusr.Precot.QA.repository.QaOnlineInspectionListRepository;
import com.focusr.Precot.QA.repository.QaOnlineInspectionRepository;
import com.focusr.Precot.QA.repository.QaQualityReviewMeetingDiscussionPointsRepository;
import com.focusr.Precot.QA.repository.QualityReviewMeetingAttendanceRepository;
import com.focusr.Precot.QA.repository.QualityReviewMeetingsDiscussionRepository;
import com.focusr.Precot.QA.repository.QualityReviewMeetingsRepository;
import com.focusr.Precot.QA.repository.RequestAndIssunceOfDocumentLinesRepository;
import com.focusr.Precot.QA.repository.RequestAndIssunceOfDocumentRepositoryF002;
import com.focusr.Precot.QA.repository.audit.BmrIssueRegisterHistoryRepositoryF045;
import com.focusr.Precot.QA.repository.audit.BmrIssueRegisterLineHistoryRepositoryF045;
import com.focusr.Precot.QA.repository.audit.DistributionAndDestructionRecordLinesHistoryRepositoryF003;
import com.focusr.Precot.QA.repository.audit.DistributionAndDistructionRecordHistoryRespositoryF003;
import com.focusr.Precot.QA.repository.audit.FinalInspectionReportHistoryRepository;
import com.focusr.Precot.QA.repository.audit.ProductDispositionLogBookHistoryRepository;
import com.focusr.Precot.QA.repository.audit.ProductDispositionLogBookLinesHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QaContainerInspectionReportHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QaContainerInspectionReportLinesHisotryRepository;
import com.focusr.Precot.QA.repository.audit.QaOnlineInspectionListHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QaOnlineInspectionReportHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QualityReviewMeetingDiscussionHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QualityReviewMeetingsAttendanceHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QualityReviewMeetingsHisotoryRepository;
import com.focusr.Precot.QA.repository.audit.RequestAndIssunceOfDocumentHistoryRepository;
import com.focusr.Precot.QA.repository.audit.RequestAndIssunceOfDocumentLinesHistoryRepository;
import com.focusr.Precot.QA.util.QaAppConstants;
import com.focusr.Precot.QA.util.mail.QAMailFunction;
import com.focusr.Precot.mssql.database.model.User;
import com.focusr.Precot.mssql.database.model.UserImageDetails;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.DepartmentRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.payload.ApproveResponseContainerInspection;
import com.focusr.Precot.payload.RequestAndIssuenceOfDocChild;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.QAUtil;
import com.focusr.Precot.util.SCAUtil;

@Service
public class QaService4 {

	Logger log = LoggerFactory.getLogger(QaService4.class);

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private SCAUtil scaUtil;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private DepartmentRepository departmentRepository;

	@Autowired
	private QaOnlineInspectionRepository qaOnlineInspectionReportRepository;

	@Autowired
	private QaOnlineInspectionListRepository qaOnlineInspectionListRepository;

	@Autowired
	private QaOnlineInspectionReportHistoryRepository qaOnlineInspectionReportHistoryRepository;

	@Autowired
	private QaOnlineInspectionListHistoryRepository qaOnlineInspectionListHistoryRepository;

	@Autowired
	private QaContainerInspectionReportRepository qaContainerInspectionReportRepository;

	@Autowired
	private QaContainerInspectionReportHistoryRepository qaContainerInspectionReportHistoryRepository;

	@Autowired
	private QaContainerInspectionReportLinesRepository qaContainerInspectionReportLinesRepository;

	@Autowired
	private QaContainerInspectionReportLinesHisotryRepository qaContainerInspectionReportLinesHisotryRepository;

	@Autowired
	private RequestAndIssunceOfDocumentRepositoryF002 requestAndIssunceOfDocumentRepositoryF002;

	@Autowired
	private RequestAndIssunceOfDocumentLinesRepository requestAndIssunceOfDocumentLinesRepository;

	@Autowired
	private RequestAndIssunceOfDocumentHistoryRepository requestAndIssunceOfDocumentHistoryRepository;

	@Autowired
	private RequestAndIssunceOfDocumentLinesHistoryRepository requestAndIssunceOfDocumentLinesHistoryRepository;

	@Autowired
	private DistributionAndDestructionRecordRepositoryF003 distributionAndDestructionRecordRepositoryF003;

	@Autowired
	private DistributionAndDestructionRecordLinesRepositoryF003 distributionAndDestructionRecordLinesRepositoryF003;

	@Autowired
	private DistributionAndDistructionRecordHistoryRespositoryF003 distributionAndDistructionRecordHistoryRespositoryF003;

	@Autowired
	private DistributionAndDestructionRecordLinesHistoryRepositoryF003 distributionAndDestructionRecordLinesHistoryRepositoryF003;

	@Autowired
	private FinalInspectionReportRepositoryF037 finalInspectionReportRepositoryF037;

	@Autowired
	private FinalInspectionReportHistoryRepository finalInspectionReportHistoryRepository;

	@Autowired
	private ProductDispositionLogBookRepositoryF049 productDispositionLogBookRepositoryF049;

	@Autowired
	private ProductDispositionLogBookLineDetailsRepository productDispositionLogBookLineDetailsRepository;

	@Autowired
	private ProductDispositionLogBookHistoryRepository productDispositionLogBookHistoryRepository;

	@Autowired
	private ProductDispositionLogBookLinesHistoryRepository productDispositionLogBookLinesHistoryRepository;

	@Autowired
	private BmrIssueRegisterRepositoryF045 bmrIssueRegisterRepositoryF045;

	@Autowired
	private BmrIssueRegisterLineRepositoryF045 bmrIssueRegisterLineRepositoryF045;

	@Autowired
	private BmrIssueRegisterHistoryRepositoryF045 bmrIssueRegisterHistoryRepositoryF045;

	@Autowired
	private BmrIssueRegisterLineHistoryRepositoryF045 bmrIssueRegisterLineHistoryRepositoryF045;

	@Autowired
	private QualityReviewMeetingsRepository qualityReviewMeetingsRepository;

	@Autowired
	private QualityReviewMeetingAttendanceRepository qualityReviewMeetingAttendanceRepository;

	@Autowired
	private QualityReviewMeetingsDiscussionRepository qualityReviewMeetingsDiscussionRepository;

	@Autowired
	private QualityReviewMeetingsHisotoryRepository qualityReviewMeetingsHisotoryRepository;

	@Autowired
	private QualityReviewMeetingsAttendanceHistoryRepository QualityReviewMeetingsAttendanceHistoryRepository;

	@Autowired
	private QualityReviewMeetingDiscussionHistoryRepository qualityReviewMeetingDiscussionHistoryRepository;

	@Autowired
	private QaQualityReviewMeetingDiscussionPointsRepository qaQualityReviewMeetingDiscussionPointsRepository;

	@Autowired
	private QAMailFunction qamailfunction;

	SCAUtil sca = new SCAUtil();

	// PDE Online Inspection Report 34
	public ResponseEntity<?> getMachineNameLov(String department) {

		List<Map<String, Object>> MachineNameLov;
		try {

			if (department.equalsIgnoreCase("pad punching")) {

				MachineNameLov = qaOnlineInspectionReportRepository.getMachineNameForPadPunching();

			} else if (department.equalsIgnoreCase("cotton buds")) {

				MachineNameLov = qaOnlineInspectionReportRepository.getMachineNameForBuds();

			} else if (department.equalsIgnoreCase("balls")) {

				MachineNameLov = qaOnlineInspectionReportRepository.getMachineNameForBalls();

			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Invalid department specified."),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			// TODO: handle exception
			String msg = e.getMessage();
			log.error("Error fetching Machine Name Details for department " + department + ": " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Order Number Details."),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(MachineNameLov, HttpStatus.OK);

	}

	// BMR Number Lov

	public ResponseEntity<?> getBmrLov(String department) {
		List<String> records;

		try {
			if ("pad punching".equalsIgnoreCase(department)) {

				records = qaOnlineInspectionReportRepository.getBmrNumberLovPadPunching(department);
			} else if ("dry goods".equalsIgnoreCase(department)) {

				records = qaOnlineInspectionReportRepository.getBmrLovDryGoods(department);
			} else if ("cotton buds".equalsIgnoreCase(department)) {

				records = qaOnlineInspectionReportRepository.getBmrLovCottonBuds(department);
			} else {

				return new ResponseEntity<>(new ApiResponse(false, "Invalid department specified."),
						HttpStatus.BAD_REQUEST);
			}

			if (records == null || records.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(false, "No records found."), HttpStatus.NOT_FOUND);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("Error fetching Order Number Details for department " + department + ": " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Order Number Details."),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(records, HttpStatus.OK);
	}

//Getting the POrder Number LOV

	public ResponseEntity<?> getOrderNoByDepartmentAndBmr(String department, String batchNo) {
		List<String> orderNos;

		try {
			// Check which department is specified and fetch order numbers accordingly
			if ("pad punching".equalsIgnoreCase(department)) {
				orderNos = qaOnlineInspectionReportRepository.findOrderNoByPadPunchingBmr(batchNo);
			} else if ("dry goods".equalsIgnoreCase(department)) {
				orderNos = qaOnlineInspectionReportRepository.findOrderNoByDryGoodsBmr(batchNo);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Invalid department specified."),
						HttpStatus.BAD_REQUEST);
			}

			// Check if any order numbers were found
			if (orderNos == null || orderNos.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(false, "No order numbers found for the given BMR number."),
						HttpStatus.NOT_FOUND);
			}

		} catch (Exception ex) {
			// Log the exception and return an error response
			String msg = ex.getMessage();
			log.error("Error fetching Order Numbers for department " + department + " and BMR " + batchNo + ": " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Order Numbers."), HttpStatus.BAD_REQUEST);
		}

		// Return the list of order numbers found
		return new ResponseEntity<>(orderNos, HttpStatus.OK);
	}

	// PONo And Material

//		public ResponseEntity<?> getPoNoMaterial(String pOrder) {
//		    List<String> records;
//
//		    try {
//
//				return (ResponseEntity<?>) qaOnlineInspectionReportRepository.findPoNoAndMaterial(pOrder);
//			} catch (Exception e) {
//				// TODO: handle exception
//				e.printStackTrace(); // Log the error for debugging
//				throw e;
//			}
//
//		}

	public Map<String, String> getPoNoMaterial(String pOrder) {
		List<Object[]> records;

		try {
			// Fetching records from the repository
			records = qaOnlineInspectionReportRepository.findPoNoAndMaterial(pOrder);

			// Create a map to hold the results
			Map<String, String> recordMap = new LinkedHashMap<>();

			if (records == null || records.isEmpty()) {
				recordMap.put("message", "No records found for the given POrder");
				return recordMap; // Return message if no records found
			}

			// Assuming you expect only one record
			Object[] record = records.get(0); // Get the first (and presumably only) result
			recordMap.put("pono", (String) record[0]);
			recordMap.put("porder", (String) record[1]);
			recordMap.put("itemcode", (String) record[2]);

			return recordMap; // This will return a JSON object

		} catch (Exception e) {
			// Log the error and return a message in the map
			e.printStackTrace();
			Map<String, String> errorMap = new HashMap<>();
			errorMap.put("error", "An error occurred while fetching the records");
			return errorMap;
		}
	}

	// CustomerName and ProductDescription

	public Map<String, String> getCustomerNameANdProductDesc(String material) {
		List<Object[]> results = qaOnlineInspectionReportRepository.findCustomerNameAndProductDesc(material);
		Map<String, String> records = new HashMap<>();

		// Assuming you expect only one record
		if (!results.isEmpty()) {
			Object[] row = results.get(0); // Get the first (and presumably only) result
			String custName = (String) row[0]; // Assuming CUST_NAME is at index 0
			String matDesc = (String) row[1]; // Assuming MAT_DESC is at index 1
			records.put("customerName", custName); // You can name your key as per requirement
			records.put("productDesc", matDesc);
		}

		return records; // This will return a JSON object
	}

	// Save

	public ResponseEntity<?> saveInspection34(QaOnlineInspectionReport details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		QaOnlineInspectionReport listObj = null;
		try {

			String missingField = "";
//
//			// Mandatory fields check
//			if (details.getFormatNo() == null)
//				missingField = "formatNo";
//			if (details.getRevisionNo() == null)
//				missingField = "revisionNo";
//			if (details.getFormatName() == null)
//				missingField = "formatName";
//			if (details.getDate() == null)
//				missingField = "date";
//			if (details.getShift() == null)
//				missingField = "shift";
//			if (details.getMachineNo() == null)
//				missingField = "machineNo";
//			if (details.getBmrNo() == null)
//				missingField = "BmrNo";
////						if (details.getPOrder() == null)
////							missingField = "pOrder";

			if (!"".equals(missingField)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields: " + missingField),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getInspectionId() != null) {

				listObj = qaOnlineInspectionReportRepository.findFormById(details.getInspectionId());

				String[] IgnoreProps = { "inspectionId", "createdBy", "createdAt", "qa_inspector_status",
						"qa_inspector_save_on", "qa_inspector_save_by", "qa_inspector_save_id",
						"qa_inspector_submit_on", "qa_inspector_submit_by", "qa_inspector_submit_id",
						"qa_inspector_sign", "prod_supervisor_status", "prod_supervisor_save_on",
						"prod_supervisor_save_by", "prod_supervisor_save_id", "prod_supervisor_submit_on",
						"prod_supervisor_submit_by", "prod_supervisor_submit_id", "prod_supervisor_sign",
						"qa_mr_status", "qa_mr_submit_on", "qa_mr_submit_by", "qa_mr_submit_id", "qa_mr_sign" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_QA")) {

					if (listObj.getQa_inspector_status().equals(AppConstants.qaInsSubmitStatus)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					qaOnlineInspectionReportRepository.save(listObj);

					List<QaOnlineInspectionList> list = details.getDetails();

					for (QaOnlineInspectionList detail : list) {
						detail.setInspectionId(listObj.getInspectionId());
						qaOnlineInspectionListRepository.save(detail);
					}

					listObj.setDetails(list);

					listObj.setQa_inspector_save_by(userName);
					listObj.setQa_inspector_save_on(date);
					listObj.setQa_inspector_save_id(userId);
					listObj.setQa_inspector_status(AppConstants.qaInsSave);

					qaOnlineInspectionReportRepository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + "cannot save details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (role.equals("ROLE_QA")) {

					listObj = details;

					qaOnlineInspectionReportRepository.save(listObj);

					List<QaOnlineInspectionList> list = details.getDetails();

					for (QaOnlineInspectionList detail : list) {
						detail.setInspectionId(listObj.getInspectionId());
						qaOnlineInspectionListRepository.save(detail);
					}

					listObj.setDetails(list);

					listObj.setQa_inspector_save_by(userName);
					listObj.setQa_inspector_save_on(date);
					listObj.setQa_inspector_save_id(userId);
					listObj.setQa_inspector_status(AppConstants.qaInsSave);

					qaOnlineInspectionReportRepository.save(listObj);

				} else {

					return new ResponseEntity(new ApiResponse(false, role + " cannot save details"),
							HttpStatus.BAD_REQUEST);

				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//		return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	// Submit

	public ResponseEntity<?> SubmitOnlineInspectionF034(QaOnlineInspectionReport details, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getInspectionId();

		QaOnlineInspectionReport checkObj = new QaOnlineInspectionReport();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

//			if (details.getFormatNo() == null)
//				value = "formatNo";
//			if (details.getRevisionNo() == null)
//				value = "revisionNo";
//			if (details.getFormatName() == null)
//				value = "formatName";
//			if (details.getDate() == null)
//				value = "date";
//			if (details.getShift() == null)
//				value = "shift";
//			if (details.getMachineNo() == null)
//				value = "machineNo";
//			if (details.getBmrNo() == null)
//				value = "BmrNo";
//			if (details.getPOrder() == null)
//				value = "pOrder";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = qaOnlineInspectionReportRepository.findFormById(id);

				String[] IgnoreProps = { "inspectionId", "createdBy", "createdAt", "qa_inspector_status",
						"qa_inspector_save_on", "qa_inspector_save_by", "qa_inspector_save_id",
						"qa_inspector_submit_on", "qa_inspector_submit_by", "qa_inspector_submit_id",
						"qa_inspector_sign", "prod_supervisor_status", "prod_supervisor_save_on",
						"prod_supervisor_save_by", "prod_supervisor_save_id", "prod_supervisor_submit_on",
						"prod_supervisor_submit_by", "prod_supervisor_submit_id", "prod_supervisor_sign",
						"qa_mr_status", "qa_mr_submit_on", "qa_mr_submit_by", "qa_mr_submit_id", "qa_mr_sign" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getQa_inspector_status().equals(AppConstants.qaInsSubmitStatus)
						|| checkObj.getProd_supervisor_status().equals(AppConstants.supervisorRejectedStatus)
						|| checkObj.getQa_mr_status().equals(AppConstants.qaMrRejectedStatus)) {
					if (role.equals("ROLE_QA")) {

						qaOnlineInspectionReportRepository.save(checkObj);

						List<QaOnlineInspectionList> list = details.getDetails();

						for (QaOnlineInspectionList detail : list) {
							detail.setInspectionId(checkObj.getInspectionId());
							qaOnlineInspectionListRepository.save(detail);
						}

						checkObj.setDetails(list);

						checkObj.setQa_inspector_submit_by(userName);
						checkObj.setQa_inspector_submit_on(date);
						checkObj.setQa_inspector_submit_id(userId);
						checkObj.setQa_inspector_status(AppConstants.qaInsSubmitStatus);
						checkObj.setQa_inspector_sign(userName);

						checkObj.setProd_supervisor_status(AppConstants.waitingStatus);
						checkObj.setQa_mr_status("");

						qaOnlineInspectionReportRepository.save(checkObj);

						// IMAGE

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//
//						checkObj.setOperator_signature_image(signature);
//
//						bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

						QaOnlineInspectionReportHistory rejectionReportHistory = new QaOnlineInspectionReportHistory();

						// getter setters fields & status

						rejectionReportHistory.setFormatName(checkObj.getFormatName());
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
						rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
						rejectionReportHistory.setRefSopNo(checkObj.getRefSopNo());
						rejectionReportHistory.setProductDescription(checkObj.getProductDescription());
						rejectionReportHistory.setBmrNo(checkObj.getBmrNo());
						rejectionReportHistory.setShift(checkObj.getShift());
						rejectionReportHistory.setCustomerName(checkObj.getCustomerName());
						rejectionReportHistory.setPOrder(checkObj.getPOrder());
						rejectionReportHistory.setDate(checkObj.getDate());
						rejectionReportHistory.setItemCode(checkObj.getItemCode());
						rejectionReportHistory.setMachineNo(checkObj.getMachineNo());
						rejectionReportHistory.setFgNo(checkObj.getFgNo());
						rejectionReportHistory.setPoNo(checkObj.getPoNo());
						rejectionReportHistory.setAqlSampleSize(checkObj.getAqlSampleSize());
						rejectionReportHistory.setLotNo(checkObj.getLotNo());
						rejectionReportHistory.setDepartment(checkObj.getDepartment());

						// Setting Specification fields
						rejectionReportHistory
								.setSurfacePatternSpecification(checkObj.getSurfacePatternSpecification());
						rejectionReportHistory
								.setAverageGsmWeightSpecification(checkObj.getAverageGsmWeightSpecification());
						rejectionReportHistory.setProductSizeDiaOfRollsSpecification(
								checkObj.getProductSizeDiaOfRollsSpecification());
						rejectionReportHistory
								.setNoOfFoldsPleatSpecification(checkObj.getNoOfFoldsPleatSpecification());
						rejectionReportHistory.setArtworkPrintingOnBagsLablesSpecification(
								checkObj.getArtworkPrintingOnBagsLablesSpecification());
						rejectionReportHistory
								.setNoofBagsPerCartonSpecification(checkObj.getNoofBagsPerCartonSpecification());
						rejectionReportHistory.setMoistureSpecification(checkObj.getMoistureSpecification());

						// Setting Observation fields
						rejectionReportHistory.setSurfacePatternObservation(checkObj.getSurfacePatternObservation());
						rejectionReportHistory
								.setAverageGsmWeightObservation(checkObj.getAverageGsmWeightObservation());
						rejectionReportHistory
								.setProductSizeDiaOfRollsObservation(checkObj.getProductSizeDiaOfRollsObservation());
						rejectionReportHistory.setNoOfFoldsPleatObservation(checkObj.getNoOfFoldsPleatObservation());
						rejectionReportHistory.setArtworkPrintingOnBagsLablesObservation(
								checkObj.getArtworkPrintingOnBagsLablesObservation());
						rejectionReportHistory
								.setNoofBagsPerCartonObservation(checkObj.getNoofBagsPerCartonObservation());
						rejectionReportHistory.setMoistureObservation(checkObj.getMoistureObservation());

						// Setting Bag/Box Weight fields
						rejectionReportHistory.setBagWeightSpecification(checkObj.getBagWeightSpecification());
						rejectionReportHistory
								.setAverageWeightOfBallsSpecification(checkObj.getAverageWeightOfBallsSpecification());
						rejectionReportHistory
								.setNoOfBallsPerPackSpecification(checkObj.getNoOfBallsPerPackSpecification());
						rejectionReportHistory.setBallsDiaSpecification(checkObj.getBallsDiaSpecification());
						rejectionReportHistory.setArtworkPrintingOnBagsLabelsSpecification(
								checkObj.getArtworkPrintingOnBagsLabelsSpecification());
						rejectionReportHistory
								.setNoOfPackPerCotton35Specification(checkObj.getNoOfPackPerCotton35Specification());
						rejectionReportHistory.setBagWeightObservation(checkObj.getBagWeightObservation());
						rejectionReportHistory
								.setAverageWeightOfBallsObservation(checkObj.getAverageWeightOfBallsObservation());
						rejectionReportHistory
								.setNoOfBallsPerPackObservation(checkObj.getNoOfBallsPerPackObservation());
						rejectionReportHistory.setBallsDiaObservation(checkObj.getBallsDiaObservation());
						rejectionReportHistory.setArtworkPrintingOnBagsLabelsObservation(
								checkObj.getArtworkPrintingOnBagsLabelsObservation());
						rejectionReportHistory
								.setNoOfPackPerCotton35Observation(checkObj.getNoOfPackPerCotton35Observation());

						// Setting Buds fields
						rejectionReportHistory.setBagBoxWeightSpecification(checkObj.getBagBoxWeightSpecification());
						rejectionReportHistory
								.setAverageWeightOfBudsSpecification(checkObj.getAverageWeightOfBudsSpecification());
						rejectionReportHistory
								.setNoOfBudsPerPackSpecification(checkObj.getNoOfBudsPerPackSpecification());
						rejectionReportHistory
								.setBudssizedDiameterSpecification(checkObj.getBudssizedDiameterSpecification());
						rejectionReportHistory.setArtworkPrintingOnBudsLabelsSpecification(
								checkObj.getArtworkPrintingOnBudsLabelsSpecification());
						rejectionReportHistory
								.setNoOfPackPerCotton36Specification(checkObj.getNoOfPackPerCotton36Specification());
						rejectionReportHistory.setBagBoxWeightObservation(checkObj.getBagBoxWeightObservation());
						rejectionReportHistory
								.setAverageWeightOfBudsObservation(checkObj.getAverageWeightOfBudsObservation());
						rejectionReportHistory.setNoOfBudsPerPackObservation(checkObj.getNoOfBudsPerPackObservation());
						rejectionReportHistory
								.setBudssizedDiameterObservation(checkObj.getBudssizedDiameterObservation());
						rejectionReportHistory.setArtworkPrintingOnBudsLabelsObservation(
								checkObj.getArtworkPrintingOnBudsLabelsObservation());
						rejectionReportHistory
								.setNoOfPackPerCotton36Observation(checkObj.getNoOfPackPerCotton36Observation());

						// Setting remark and status
						rejectionReportHistory.setRemark(checkObj.getRemark());
						rejectionReportHistory.setLotStatus(checkObj.getLotStatus());

						// status
						rejectionReportHistory.setQa_inspector_submit_by(checkObj.getQa_inspector_submit_by());
						rejectionReportHistory.setQa_inspector_submit_id(checkObj.getQa_inspector_submit_id());
						rejectionReportHistory.setQa_inspector_submit_on(checkObj.getQa_inspector_submit_on());
						rejectionReportHistory.setQa_inspector_status(checkObj.getQa_inspector_status());
						rejectionReportHistory.setQa_inspector_sign(checkObj.getQa_inspector_sign());
						rejectionReportHistory
								.setQa_inspector_signature_image(checkObj.getQa_inspector_signature_image());

						rejectionReportHistory.setProd_supervisor_status(checkObj.getProd_supervisor_status());
						rejectionReportHistory.setQa_mr_status(checkObj.getQa_mr_status());

						// version
						String date1 = rejectionReportHistory.getDate();

						String shift1 = rejectionReportHistory.getShift();

						String machineName = rejectionReportHistory.getMachineNo();

						String BmrNo = rejectionReportHistory.getBmrNo();

						String POrder = rejectionReportHistory.getPOrder();

						int version = qaOnlineInspectionReportHistoryRepository
								.getMaximumVersion(date1, shift1, machineName, POrder, BmrNo).map(temp -> temp + 1)
								.orElse(1);

						rejectionReportHistory.setVersion(version);

						qaOnlineInspectionReportHistoryRepository.save(rejectionReportHistory); // ONE HISTORY

						List<QaOnlineInspectionList> historyMapList = checkObj.getDetails();

						for (QaOnlineInspectionList obj : historyMapList) {

							QaOnlineInspectionListHistory objHistory = new QaOnlineInspectionListHistory();

							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setInspectionId(rejectionReportHistory.getInspectionId());
							qaOnlineInspectionListHistoryRepository.save(objHistory);

						}

						qaOnlineInspectionReportHistoryRepository.save(rejectionReportHistory);

						// MAIL
						try {

							qamailfunction.sendMailToProdSupervisor(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_QA")) {
					return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				qaOnlineInspectionReportRepository.save(checkObj);

				List<QaOnlineInspectionList> list = details.getDetails();

				for (QaOnlineInspectionList detail : list) {
					detail.setInspectionId(checkObj.getInspectionId());
					qaOnlineInspectionListRepository.save(detail);
				}

				checkObj.setDetails(list);

				checkObj.setQa_inspector_submit_by(userName);
				checkObj.setQa_inspector_submit_on(date);
				checkObj.setQa_inspector_submit_id(userId);
				checkObj.setQa_inspector_status(AppConstants.qaInsSubmitStatus);
				checkObj.setQa_inspector_sign(userName);

				checkObj.setProd_supervisor_status(AppConstants.waitingStatus);
				checkObj.setQa_mr_status("");

				qaOnlineInspectionReportRepository.save(checkObj);

				// IMAGE

//				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//
//				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//
//				checkObj.setOperator_signature_image(signature);
//
//				bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

				QaOnlineInspectionReportHistory rejectionReportHistory = new QaOnlineInspectionReportHistory();

				// getter setters fields & status

				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setRefSopNo(checkObj.getRefSopNo());
				rejectionReportHistory.setProductDescription(checkObj.getProductDescription());
				rejectionReportHistory.setBmrNo(checkObj.getBmrNo());
				rejectionReportHistory.setShift(checkObj.getShift());
				rejectionReportHistory.setCustomerName(checkObj.getCustomerName());
				rejectionReportHistory.setPOrder(checkObj.getPOrder());
				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setItemCode(checkObj.getItemCode());
				rejectionReportHistory.setMachineNo(checkObj.getMachineNo());
				rejectionReportHistory.setFgNo(checkObj.getFgNo());
				rejectionReportHistory.setPoNo(checkObj.getPoNo());
				rejectionReportHistory.setAqlSampleSize(checkObj.getAqlSampleSize());
				rejectionReportHistory.setLotNo(checkObj.getLotNo());
				rejectionReportHistory.setDepartment(checkObj.getDepartment());

				// Setting Specification fields
				rejectionReportHistory.setSurfacePatternSpecification(checkObj.getSurfacePatternSpecification());
				rejectionReportHistory.setAverageGsmWeightSpecification(checkObj.getAverageGsmWeightSpecification());
				rejectionReportHistory
						.setProductSizeDiaOfRollsSpecification(checkObj.getProductSizeDiaOfRollsSpecification());
				rejectionReportHistory.setNoOfFoldsPleatSpecification(checkObj.getNoOfFoldsPleatSpecification());
				rejectionReportHistory.setArtworkPrintingOnBagsLablesSpecification(
						checkObj.getArtworkPrintingOnBagsLablesSpecification());
				rejectionReportHistory.setNoofBagsPerCartonSpecification(checkObj.getNoofBagsPerCartonSpecification());
				rejectionReportHistory.setMoistureSpecification(checkObj.getMoistureSpecification());

				// Setting Observation fields
				rejectionReportHistory.setSurfacePatternObservation(checkObj.getSurfacePatternObservation());
				rejectionReportHistory.setAverageGsmWeightObservation(checkObj.getAverageGsmWeightObservation());
				rejectionReportHistory
						.setProductSizeDiaOfRollsObservation(checkObj.getProductSizeDiaOfRollsObservation());
				rejectionReportHistory.setNoOfFoldsPleatObservation(checkObj.getNoOfFoldsPleatObservation());
				rejectionReportHistory.setArtworkPrintingOnBagsLablesObservation(
						checkObj.getArtworkPrintingOnBagsLablesObservation());
				rejectionReportHistory.setNoofBagsPerCartonObservation(checkObj.getNoofBagsPerCartonObservation());
				rejectionReportHistory.setMoistureObservation(checkObj.getMoistureObservation());

				// Setting Bag/Box Weight fields
				rejectionReportHistory.setBagWeightSpecification(checkObj.getBagWeightSpecification());
				rejectionReportHistory
						.setAverageWeightOfBallsSpecification(checkObj.getAverageWeightOfBallsSpecification());
				rejectionReportHistory.setNoOfBallsPerPackSpecification(checkObj.getNoOfBallsPerPackSpecification());
				rejectionReportHistory.setBallsDiaSpecification(checkObj.getBallsDiaSpecification());
				rejectionReportHistory.setArtworkPrintingOnBagsLabelsSpecification(
						checkObj.getArtworkPrintingOnBagsLabelsSpecification());
				rejectionReportHistory
						.setNoOfPackPerCotton35Specification(checkObj.getNoOfPackPerCotton35Specification());
				rejectionReportHistory.setBagWeightObservation(checkObj.getBagWeightObservation());
				rejectionReportHistory
						.setAverageWeightOfBallsObservation(checkObj.getAverageWeightOfBallsObservation());
				rejectionReportHistory.setNoOfBallsPerPackObservation(checkObj.getNoOfBallsPerPackObservation());
				rejectionReportHistory.setBallsDiaObservation(checkObj.getBallsDiaObservation());
				rejectionReportHistory.setArtworkPrintingOnBagsLabelsObservation(
						checkObj.getArtworkPrintingOnBagsLabelsObservation());
				rejectionReportHistory.setNoOfPackPerCotton35Observation(checkObj.getNoOfPackPerCotton35Observation());

				// Setting Buds fields
				rejectionReportHistory.setBagBoxWeightSpecification(checkObj.getBagBoxWeightSpecification());
				rejectionReportHistory
						.setAverageWeightOfBudsSpecification(checkObj.getAverageWeightOfBudsSpecification());
				rejectionReportHistory.setNoOfBudsPerPackSpecification(checkObj.getNoOfBudsPerPackSpecification());
				rejectionReportHistory.setBudssizedDiameterSpecification(checkObj.getBudssizedDiameterSpecification());
				rejectionReportHistory.setArtworkPrintingOnBudsLabelsSpecification(
						checkObj.getArtworkPrintingOnBudsLabelsSpecification());
				rejectionReportHistory
						.setNoOfPackPerCotton36Specification(checkObj.getNoOfPackPerCotton36Specification());
				rejectionReportHistory.setBagBoxWeightObservation(checkObj.getBagBoxWeightObservation());
				rejectionReportHistory.setAverageWeightOfBudsObservation(checkObj.getAverageWeightOfBudsObservation());
				rejectionReportHistory.setNoOfBudsPerPackObservation(checkObj.getNoOfBudsPerPackObservation());
				rejectionReportHistory.setBudssizedDiameterObservation(checkObj.getBudssizedDiameterObservation());
				rejectionReportHistory.setArtworkPrintingOnBudsLabelsObservation(
						checkObj.getArtworkPrintingOnBudsLabelsObservation());
				rejectionReportHistory.setNoOfPackPerCotton36Observation(checkObj.getNoOfPackPerCotton36Observation());

				// Setting remark and status
				rejectionReportHistory.setRemark(checkObj.getRemark());
				rejectionReportHistory.setLotStatus(checkObj.getLotStatus());

				// status
				rejectionReportHistory.setQa_inspector_submit_by(checkObj.getQa_inspector_submit_by());
				rejectionReportHistory.setQa_inspector_submit_id(checkObj.getQa_inspector_submit_id());
				rejectionReportHistory.setQa_inspector_submit_on(checkObj.getQa_inspector_submit_on());
				rejectionReportHistory.setQa_inspector_status(checkObj.getQa_inspector_status());
				rejectionReportHistory.setQa_inspector_sign(checkObj.getQa_inspector_sign());
				rejectionReportHistory.setQa_inspector_signature_image(checkObj.getQa_inspector_signature_image());

				rejectionReportHistory.setProd_supervisor_status(checkObj.getProd_supervisor_status());
				rejectionReportHistory.setQa_mr_status(checkObj.getQa_mr_status());

				// version
				// version
				String date1 = rejectionReportHistory.getDate();

				String shift1 = rejectionReportHistory.getShift();

				String machineName = rejectionReportHistory.getMachineNo();

				String BmrNo = rejectionReportHistory.getBmrNo();

				String POrder = rejectionReportHistory.getPOrder();

				int version = qaOnlineInspectionReportHistoryRepository
						.getMaximumVersion(date1, shift1, machineName, POrder, BmrNo).map(temp -> temp + 1).orElse(1);

//				
//				int version = qaOnlineInspectionReportHistoryRepository
//					    .getMaximumVersion(date1, shift1, machineName, BmrNo, POrder)
//					    .map(maxVersion -> maxVersion + 1) // Increment the version by 1
//					    .orElse(1); // If no maximum version is found, start with version 1

				rejectionReportHistory.setVersion(version);

				qaOnlineInspectionReportHistoryRepository.save(rejectionReportHistory); // ONE HISTORY

				List<QaOnlineInspectionList> historyMapList = checkObj.getDetails();

				for (QaOnlineInspectionList obj : historyMapList) {

					QaOnlineInspectionListHistory objHistory = new QaOnlineInspectionListHistory();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setInspectionId(rejectionReportHistory.getInspectionId());
					qaOnlineInspectionListHistoryRepository.save(objHistory);

				}

				qaOnlineInspectionReportHistoryRepository.save(rejectionReportHistory);

				// MAIL
				try {

					qamailfunction.sendMailToProdSupervisor(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
							HttpStatus.OK);
				}

			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Operator Submitted Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	// APPROVE OR REJECT

	public ResponseEntity<?> approveRejectionOnlineInspectionReportF034(ApproveResponse approvalResponse,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		QaOnlineInspectionReport object = new QaOnlineInspectionReport();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = qaOnlineInspectionReportRepository.findFormById(approvalResponse.getId());

			QaOnlineInspectionReportHistory objHistory = new QaOnlineInspectionReportHistory();

			String supervisiorStatus = object.getProd_supervisor_status();

			String hodStatus = object.getQa_mr_status();

			UserImageDetails imageDetails = new UserImageDetails();

			if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setQa_mr_status(AppConstants.qMrApprovedStatus);
						object.setQa_mr_submit_on(date);
						object.setQa_mr_submit_by(userName);
						object.setQa_mr_submit_id(userId);

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						object.setHod_signature_image(signature);

						object.setQa_mr_sign(userName);

						qaOnlineInspectionReportRepository.save(object);

						objHistory = qaOnlineInspectionReportHistoryRepository.fetchLastSubmittedRecord(
								object.getDate(), object.getShift(), object.getMachineNo(), object.getPOrder(),
								object.getBmrNo());

						objHistory.setQa_mr_status(AppConstants.qMrApprovedStatus);
						objHistory.setQa_mr_submit_on(date);
						objHistory.setQa_mr_submit_by(userName);
						objHistory.setQa_mr_submit_id(userId);
						objHistory.setQa_mr_sign(userName);

						qaOnlineInspectionReportHistoryRepository.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, "QA_MANAGER Approved Successfully"),
								HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();

						object.setReason(reason);
						object.setQa_mr_status(AppConstants.qaMrRejectedStatus);
						object.setQa_mr_submit_on(date);
						object.setQa_mr_submit_by(userName);
						object.setQa_mr_submit_id(userId);

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						object.setHod_signature_image(signature);

						object.setQa_mr_sign(userName);

						qaOnlineInspectionReportRepository.save(object);

						objHistory = qaOnlineInspectionReportHistoryRepository.fetchLastSubmittedRecord(
								object.getDate(), object.getShift(), object.getMachineNo(), object.getPOrder(),
								object.getBmrNo());

						objHistory.setReason(reason);
						objHistory.setQa_mr_status(AppConstants.qaMrRejectedStatus);
						objHistory.setQa_mr_submit_on(date);
						objHistory.setQa_mr_submit_by(userName);
						objHistory.setQa_mr_submit_id(userId);
						objHistory.setQa_mr_sign(userName);

						qaOnlineInspectionReportHistoryRepository.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, " QA_MANAGER Rejected Successfully"),
								HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else if (object.getQa_inspector_status().equalsIgnoreCase(AppConstants.qaInsSubmitStatus)
					&& supervisiorStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setProd_supervisor_status(AppConstants.supervisorApprovedStatus);
						object.setProd_supervisor_submit_on(date);
						object.setProd_supervisor_submit_by(userName);
						object.setProd_supervisor_submit_id(userId);
						object.setQa_mr_status(AppConstants.waitingStatus);

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						object.setSupervisor_signature_image(signature);

						object.setProd_supervisor_sign(userName);

						qaOnlineInspectionReportRepository.save(object);

						objHistory = qaOnlineInspectionReportHistoryRepository.fetchLastSubmittedRecord(
								object.getDate(), object.getShift(), object.getMachineNo(), object.getPOrder(),
								object.getBmrNo());

						objHistory.setProd_supervisor_status(AppConstants.supervisorApprovedStatus);
						objHistory.setProd_supervisor_submit_on(date);
						objHistory.setProd_supervisor_submit_by(userName);
						objHistory.setProd_supervisor_submit_id(userId);
						objHistory.setProd_supervisor_sign(userName);
						objHistory.setQa_mr_status(AppConstants.waitingStatus);

						qaOnlineInspectionReportHistoryRepository.save(objHistory);

						// MAIL
						try {

							qamailfunction.sendMailToQaManagerOnlineInspection(object);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
									HttpStatus.OK);
						}

						return new ResponseEntity<>(new ApiResponse(true, " Supervisor Approved Successfully"),
								HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						object.setReason(reason);
						object.setProd_supervisor_status(AppConstants.supervisorRejectedStatus);
						object.setProd_supervisor_submit_on(date);
						object.setProd_supervisor_submit_by(userName);
						object.setProd_supervisor_submit_id(userId);

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						object.setSupervisor_signature_image(signature);

						object.setProd_supervisor_sign(userName);

						qaOnlineInspectionReportRepository.save(object);

						objHistory = qaOnlineInspectionReportHistoryRepository.fetchLastSubmittedRecord(
								object.getDate(), object.getShift(), object.getMachineNo(), object.getPOrder(),
								object.getBmrNo());

//						bleachLayDownCheckListF42History = dailyRejectionReportF007RepositoryHistory
//								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
//										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrderNo());

						objHistory.setReason(reason);
						objHistory.setProd_supervisor_status(AppConstants.supervisorRejectedStatus);
						objHistory.setProd_supervisor_submit_on(date);
						objHistory.setProd_supervisor_submit_by(userName);
						objHistory.setProd_supervisor_submit_id(userId);
						objHistory.setProd_supervisor_sign(userName);

						qaOnlineInspectionReportHistoryRepository.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, " Supervisor Rejected Successfully"),
								HttpStatus.OK);

					} else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {

					return new ResponseEntity(new ApiResponse(false, userRole + " not authroized to Approve"),
							HttpStatus.BAD_REQUEST);

				}
			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Record " + e.getMessage() + msg),
					HttpStatus.BAD_REQUEST);

		}

	}

//Param Based Get

//	public ResponseEntity<?> getByDateShiftMachineNoBmrPOrder(String date, String shift, String machineNo,
//			String pOrder, String bmrNo, String formatNo) {
//		try {
// 
//			List<QaOnlineInspectionReport> list = qaOnlineInspectionReportRepository.getDetailsBaseParam(date, shift,
//					machineNo, pOrder, bmrNo,formatNo);
// 
//			if (list == null) {
//				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
//			}
// 
//			return new ResponseEntity<>(list, HttpStatus.OK);
//		} catch (Exception e) {
//			log.error("Unable to get Details!", e);
// 
//			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
//		}
//	}
//06-11-2024	
	public ResponseEntity<?> getByDateShiftMachineNoBmrPOrder(String date, String shift, String machineNo,
			String pOrder, String bmrNo, String formatNo) {
		try {

			List<QaOnlineInspectionReport> list = qaOnlineInspectionReportRepository.getDetailsBaseParam(date, shift,
					machineNo, pOrder, bmrNo, formatNo);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

//	//SUMMARY API
//	public ResponseEntity<?> getOnlineInspectionReportF034Summary(HttpServletRequest http, String department) {
//	    List<QaOnlineInspectionReportDto> details = null;
//	    try {
//	        String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
//
//	        if (userRole.equals("ROLE_QA")) {
//	            details = qaOnlineInspectionReportRepository.qaInspectorSummaryGet();
//	        } else if (userRole.equals("ROLE_SUPERVISOR") || userRole.equals("QA_MANAGER") || userRole.equals("ROLE_DESIGNEE")) {
//	            
//	        	log.info("Requesting inspection report for department: " + department);
//	        	details = qaOnlineInspectionReportRepository.supervisorMrSummary(department);
//	            
//	            
//	        } else {
//	            return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorized to access the form."),
//	                                        HttpStatus.FORBIDDEN);
//	        }
//
//	        return new ResponseEntity<>(details, HttpStatus.OK);
//	    } catch (Exception e) {
//	        log.error("Unable to get Details!", e);
//	        return new ResponseEntity<>("Unable to get Details!", HttpStatus.BAD_REQUEST);
//	    }
//	}

	public ResponseEntity<?> getOnlineInspectionReportF034Summary(HttpServletRequest http, String department,
			String formatNo) {
		List<QaOnlineInspectionReportDto> details;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			log.info("User role: " + userRole);
			log.info("Requested department: " + department); // Log the department

			if (userRole.equals("ROLE_QA")) {
				details = qaOnlineInspectionReportRepository.qaInspectorSummaryGet(formatNo);

				if (formatNo == null || formatNo.isEmpty()) {
					return new ResponseEntity<>(new ApiResponse(false, "formatNo parameter is required"),
							HttpStatus.BAD_REQUEST);
				}
			} else if (userRole.equals("ROLE_SUPERVISOR")) {
				if (department == null || department.isEmpty()) {
					return new ResponseEntity<>(new ApiResponse(false, "Department parameter is required"),
							HttpStatus.BAD_REQUEST);
				}
				if (formatNo == null || formatNo.isEmpty()) {
					return new ResponseEntity<>(new ApiResponse(false, "formatNo parameter is required"),
							HttpStatus.BAD_REQUEST);
				}

				log.info("Requesting inspection report for department: " + department);
				details = qaOnlineInspectionReportRepository.supervisorSummary(department, formatNo);
			} else if (userRole.equals("QA_MANAGER") || userRole.equals("ROLE_DESIGNEE")) {
				if (formatNo == null || formatNo.isEmpty()) {
					return new ResponseEntity<>(new ApiResponse(false, "formatNo parameter is required"),
							HttpStatus.BAD_REQUEST);
				}
				details = qaOnlineInspectionReportRepository.managerAndMrSummary(formatNo);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorized to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Unable to get Details!", HttpStatus.BAD_REQUEST);
		}
	}

//	//SUMMARY FOR QAINSPECTOR
//	
//		public ResponseEntity<?> getOnlineInspectionReportF034QaInspectorSummary(HttpServletRequest http ) {
//
//			List<QaOnlineInspectionReportDto> details = null;
//			try {
//				String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
//
//				if (userRole.equals("ROLE_QA")) {
//
//					details = qaOnlineInspectionReportRepository.qaInspectorSummaryGet();
//				}
//
//				else {
//					return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
//							HttpStatus.FORBIDDEN);
//				}
//
//				return new ResponseEntity<>(details, HttpStatus.OK);
//			} catch (Exception e) {
//
//				log.error("Unable to get Details!", e);
//
//				return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
//			}
//		}
//	

//	PRINT API

	public ResponseEntity<?> getByOnlineInspectionReportPrint(String date, String shift, String machineNo,
			String pOrder, String bmrNo, String formatNo) {
		try {
			if (formatNo == null || formatNo.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(false, "formatNo parameter is required"),
						HttpStatus.BAD_REQUEST);
			}

			List<QaOnlineInspectionReport> list = qaOnlineInspectionReportRepository
					.printOnlineInspectionReportF034(date, shift, machineNo, pOrder, bmrNo, formatNo);

			if (list == null || list.isEmpty()) {

//				list = new ArrayList<MetalDetectorCheckListF020>();
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

//	public ResponseEntity<?> getByOnlineInspectionReportPrint(String date, String shift, String machineNo,
//			String pOrder, String bmrNo, String formatNo) {
//		try {
//
//			List<QaOnlineInspectionReport> list = qaOnlineInspectionReportRepository
//					.printOnlineInspectionReportF034(date, shift, machineNo, pOrder, bmrNo, formatNo);
//
//			if (list == null || list.isEmpty()) {
//
////					list = new ArrayList<MetalDetectorCheckListF020>();
//				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
//			}
//			return new ResponseEntity<>(list, HttpStatus.OK);
//		} catch (Exception e) {
//			log.error("Unable to get Details!", e);
//			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
//		}
//	}

	public List<String> getDepartments() {
		return Arrays.asList("pad punching", "dry goods", "cotton buds");
	}

//	========================================== CONTAINER INSPECTION REPORT ===============================================

	// Save

	public ResponseEntity<?> saveContainerOnlineException(QaContainerInspectionReport details,
			HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		QaContainerInspectionReport listObj = null;
		try {

			String missingField = "";

			// Mandatory fields check
			if (details.getFormatNo() == null)
				missingField = "formatNo";
			if (details.getRevisionNo() == null)
				missingField = "revisionNo";
			if (details.getFormatName() == null)
				missingField = "formatName";
			if (details.getDate() == null)
				missingField = "date";
			if (details.getCirNo() == null)
				missingField = "cirNo";

			if (!"".equals(missingField)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields: " + missingField),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getContainerId() != null) {

				listObj = qaContainerInspectionReportRepository.findFormById(details.getContainerId());

				String[] IgnoreProps = { "containerId", "createdBy", "createdAt", "qa_inspector_status",
						"qa_inspector_save_on", "qa_inspector_save_by", "qa_inspector_save_id",
						"qa_inspector_submit_on", "qa_inspector_submit_by", "qa_inspector_submit_id",
						"qa_inspector_sign", "prod_supervisor_status", "prod_supervisor_save_on",
						"prod_supervisor_save_by", "prod_supervisor_save_id", "prod_supervisor_submit_on",
						"prod_supervisor_submit_by", "prod_supervisor_submit_id", "prod_supervisor_sign",
						"qa_mr_status", "qa_mr_submit_on", "qa_mr_submit_by", "qa_mr_submit_id", "qa_mr_sign",
						"security_status", "security_saved_on", "security_saved_by", "security_saved_id",
						"security_submit_on", "security_submit_by", "security_submit_id", "security_sign",
						"dispatch_supervisor_status", "dispatch_supervisor_save_on", "dispatch_supervisor_save_by",
						"dispatch_supervisor_save_id", "dispatch_supervisor_submit_on", "dispatch_supervisor_submit_by",
						"dispatch_supervisor_submit_id", "dispatch_supervisor_sign" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_QA")) {

					if (listObj.getQa_inspector_status().equals(AppConstants.qaInsApprovedStatus)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					qaContainerInspectionReportRepository.save(listObj);

					List<QaContainerInspectionReportLines> list = details.getDetails();

					for (QaContainerInspectionReportLines detail : list) {
						detail.setContainerId(listObj.getContainerId());
						qaContainerInspectionReportLinesRepository.save(detail);
					}

					listObj.setDetails(list);

					listObj.setQa_inspector_save_by(userName);
					listObj.setQa_inspector_save_on(date);
					listObj.setQa_inspector_save_id(userId);
					listObj.setQa_inspector_status(AppConstants.qaInsSave);

					qaContainerInspectionReportRepository.save(listObj);

				} else if (role.equals("DISPATCH_SUPERVISOR")
						&& listObj.getQa_inspector_status().equals(AppConstants.qaInsApprovedStatus)) {

					if (listObj.getQa_inspector_status().equals(AppConstants.supervisorApprovedStatus)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					qaContainerInspectionReportRepository.save(listObj);

					List<QaContainerInspectionReportLines> list = details.getDetails();

					for (QaContainerInspectionReportLines detail : list) {
						detail.setContainerId(listObj.getContainerId());
						qaContainerInspectionReportLinesRepository.save(detail);
					}

					listObj.setDetails(list);

					listObj.setDispatch_supervisor_save_by(userName);
					listObj.setDispatch_supervisor_save_on(date);
					listObj.setDispatch_supervisor_save_id(userId);
					listObj.setDispatch_supervisor_status(AppConstants.supervisorSave);
					qaContainerInspectionReportRepository.save(listObj);

				} else if (role.equals("SECURITY")
						&& listObj.getDispatch_supervisor_status().equals(AppConstants.supervisorApprovedStatus)) {

					if (listObj.getQa_inspector_status().equals(QaAppConstants.securityApproveStatus)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					qaContainerInspectionReportRepository.save(listObj);

					List<QaContainerInspectionReportLines> list = details.getDetails();

					for (QaContainerInspectionReportLines detail : list) {
						detail.setContainerId(listObj.getContainerId());
						qaContainerInspectionReportLinesRepository.save(detail);
					}

					listObj.setDetails(list);

					listObj.setSecurity_saved_by(userName);
					listObj.setSecurity_saved_on(date);
					listObj.setSecurity_saved_id(userId);
					listObj.setSecurity_status(QaAppConstants.securitySavedStatus);

					qaContainerInspectionReportRepository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + "cannot save details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (role.equals("ROLE_QA")) {

					listObj = details;

					qaContainerInspectionReportRepository.save(listObj);

					List<QaContainerInspectionReportLines> list = details.getDetails();

					for (QaContainerInspectionReportLines detail : list) {
						detail.setContainerId(listObj.getContainerId());
						qaContainerInspectionReportLinesRepository.save(detail);
					}

					listObj.setDetails(list);

					listObj.setQa_inspector_save_by(userName);
					listObj.setQa_inspector_save_on(date);
					listObj.setQa_inspector_save_id(userId);
					listObj.setQa_inspector_status(AppConstants.qaInsSave);

					qaContainerInspectionReportRepository.save(listObj);

				} else {

					return new ResponseEntity(new ApiResponse(false, role + " cannot save details"),
							HttpStatus.BAD_REQUEST);

				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//			return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	// Submit

	public ResponseEntity<?> SubmitContainerInspectionReport(QaContainerInspectionReport details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getContainerId();

		QaContainerInspectionReport checkObj = new QaContainerInspectionReport();

		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

		String userName = userRepository.getUserName(userId);

		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getDate() == null)
				value = "date";
			if (details.getCirNo() == null)
				value = "cirNo";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

//				Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
//
//				String userName = userRepository.getUserName(userId);
//
//				String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = qaContainerInspectionReportRepository.findFormById(id);

				String[] IgnoreProps = { "containerId", "createdBy", "createdAt", "qa_inspector_status",
						"qa_inspector_save_on", "qa_inspector_save_by", "qa_inspector_save_id",
						"qa_inspector_submit_on", "qa_inspector_submit_by", "qa_inspector_submit_id",
						"qa_inspector_sign", "security_status", "security_submit_on", "security_submit_by",
						"security_submit_id", "security_sign", "dispatch_supervisor_status",
						"dispatch_supervisor_save_on", "dispatch_supervisor_save_by", "dispatch_supervisor_save_id",
						"dispatch_supervisor_submit_on", "dispatch_supervisor_submit_by",
						"dispatch_supervisor_submit_id", "dispatch_supervisor_sign", "qa_mr_status", "qa_mr_submit_on",
						"qa_mr_submit_by", "qa_mr_submit_id", "qa_mr_sign" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

//				if (!checkObj.getQa_inspector_status().equals(AppConstants.qaInsApprovedStatus)
//						|| !checkObj.getDispatch_supervisor_status().equals(AppConstants.supervisorApprovedStatus)
//						|| !checkObj.getSecurity_status().equals(QaAppConstants.securityApproveStatus)
//						|| checkObj.getSecurity_status().equals(QaAppConstants.securityRejectStatus)
//						|| checkObj.getDispatch_supervisor_status().equals(AppConstants.supervisorRejectedStatus)
//						|| checkObj.getQa_mr_status().equals(AppConstants.qaMrRejectedStatus)) {
				if (!checkObj.getQa_inspector_status().equals(AppConstants.qaInsApprovedStatus)
						|| !checkObj.getDispatch_supervisor_status().equals(AppConstants.supervisorApprovedStatus)
						|| !checkObj.getSecurity_status().equals(QaAppConstants.securityApproveStatus)
						|| checkObj.getQa_mr_status().equals(AppConstants.qaMrRejectedStatus)) {

					if (role.equals("ROLE_QA") || role.equals("DISPATCH_SUPERVISOR") || role.equals("SECURITY")) {

						qaContainerInspectionReportRepository.save(checkObj);

						List<QaContainerInspectionReportLines> list = details.getDetails();

						for (QaContainerInspectionReportLines detail : list) {
							detail.setContainerId(checkObj.getContainerId());
							qaContainerInspectionReportLinesRepository.save(detail);
						}

						checkObj.setDetails(list);

//						checkObj.setQa_inspector_submit_by(userName);
//						checkObj.setQa_inspector_submit_on(date);
//						checkObj.setQa_inspector_submit_id(userId);
//						checkObj.setQa_inspector_status(AppConstants.qaInsApprovedStatus);
//						checkObj.setQa_inspector_sign(userName);
//
//						checkObj.setSecurity_status(AppConstants.waitingStatus);
//						checkObj.setDispatch_supervisor_status("");
//						checkObj.setQa_mr_status("");

						if (role.equals("ROLE_QA")) {
							checkObj.setQa_inspector_submit_by(userName);
							checkObj.setQa_inspector_submit_on(date);
							checkObj.setQa_inspector_submit_id(userId);
							checkObj.setQa_inspector_status(AppConstants.qaInsApprovedStatus);
							checkObj.setQa_inspector_sign(userName);

							checkObj.setSecurity_status("");
							checkObj.setDispatch_supervisor_status(AppConstants.waitingStatus);
							checkObj.setQa_mr_status("");

						} else if (role.equals("DISPATCH_SUPERVISOR")
								&& checkObj.getQa_inspector_status().equals(AppConstants.qaInsApprovedStatus)) {

							checkObj.setDispatch_supervisor_submit_by(userName);
							checkObj.setDispatch_supervisor_submit_on(date);
							checkObj.setDispatch_supervisor_submit_id(userId);
							checkObj.setDispatch_supervisor_status(QaAppConstants.SupervisorApprove);
							checkObj.setDispatch_supervisor_sign(userName);
							checkObj.setSecurity_status(AppConstants.waitingStatus);

						} else if (role.equals("SECURITY") && checkObj.getDispatch_supervisor_status()
								.equals(AppConstants.supervisorApprovedStatus)) {

							checkObj.setSecurity_submit_by(userName);
							checkObj.setSecurity_submit_on(date);
							checkObj.setSecurity_submit_id(userId);
							checkObj.setSecurity_status(QaAppConstants.securityApproveStatus);
							checkObj.setSecurity_sign(userName);
							checkObj.setQa_mr_status(AppConstants.waitingStatus);

						} else {
							return new ResponseEntity<>(
									new ApiResponse(false,
											"For the role " + role + "the previous has not yet been approved"),
									HttpStatus.BAD_REQUEST);
						}

						qaContainerInspectionReportRepository.save(checkObj);

						// IMAGE

//							Optional<UserImageDetails> imageDetailsOpt = imageRepository
//									.fetchItemDetailsByUsername(userName);
						//
//							byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						//
//							checkObj.setOperator_signature_image(signature);
						//
//							bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

						QaContainerInspectionReportHistory rejectionReportHistory = new QaContainerInspectionReportHistory();

						// getter setters fields & status

						rejectionReportHistory.setUnit(checkObj.getUnit());
						rejectionReportHistory.setFormatName(checkObj.getFormatName());
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
						rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
						rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
						rejectionReportHistory.setDepartment(checkObj.getDepartment());
						rejectionReportHistory.setDate(checkObj.getDate());
						rejectionReportHistory.setCirNo(checkObj.getCirNo());
						rejectionReportHistory.setProductDescription(checkObj.getProductDescription());
						rejectionReportHistory.setCustomer(checkObj.getCustomer());
						rejectionReportHistory.setContainerNO(checkObj.getContainerNO());
						rejectionReportHistory.setLotNo(checkObj.getLotNo());
						rejectionReportHistory.setInvoiceNo(checkObj.getInvoiceNo());
						rejectionReportHistory.setSealOneTimeLockNo(checkObj.getSealOneTimeLockNo());
						rejectionReportHistory.setSealSteamerSealNo(checkObj.getSealSteamerSealNo());
						rejectionReportHistory.setHighSecuritySeal(checkObj.getHighSecuritySeal());
						rejectionReportHistory.setSealAffixPropertyVerified(checkObj.getSealAffixPropertyVerified());

						// 17 Points Container Inspection Review
						rejectionReportHistory.setBumper(checkObj.getBumper());
						rejectionReportHistory.setEngine(checkObj.getEngine());
						rejectionReportHistory.setTyre(checkObj.getTyre());
						rejectionReportHistory.setTruckFloor(checkObj.getTruckFloor());
						rejectionReportHistory.setFuelTank(checkObj.getFuelTank());
						rejectionReportHistory.setCabSotrageCompartment(checkObj.getCabSotrageCompartment());
						rejectionReportHistory.setAirTanks(checkObj.getAirTanks());
						rejectionReportHistory.setDriveShafts(checkObj.getDriveShafts());
						rejectionReportHistory.setFifthWheel(checkObj.getFifthWheel());
						rejectionReportHistory.setOutsideUnderCarriage(checkObj.getOutsideUnderCarriage());
						rejectionReportHistory.setOutsideInsideDoors(checkObj.getOutsideInsideDoors());
						rejectionReportHistory.setInsideFloor(checkObj.getInsideFloor());
						rejectionReportHistory.setSideWalls(checkObj.getSideWalls());
						rejectionReportHistory.setFrontWalls(checkObj.getFrontWalls());
						rejectionReportHistory.setCeilingRoof(checkObj.getCeilingRoof());
						rejectionReportHistory.setRefrigerationUnit(checkObj.getRefrigerationUnit());
						rejectionReportHistory.setExhaust(checkObj.getExhaust());

						// Condition of Container
						rejectionReportHistory.setConditionOfContainer(checkObj.getConditionOfContainer());
						rejectionReportHistory.setRoofFreeFromDamagesHoles(checkObj.getRoofFreeFromDamagesHoles());
						rejectionReportHistory
								.setAllTheSidesFreeFromDamagesHoles(checkObj.getAllTheSidesFreeFromDamagesHoles());
						rejectionReportHistory.setFreeFromJointGraps(checkObj.getFreeFromJointGraps());
						rejectionReportHistory.setFreeFromRust(checkObj.getFreeFromRust());
						rejectionReportHistory.setProperlyPainted(checkObj.getProperlyPainted());
						rejectionReportHistory.setOverallGoodCondition(checkObj.getOverallGoodCondition());
						rejectionReportHistory.setFreeFromStaindirt(checkObj.getFreeFromStaindirt());
						rejectionReportHistory.setProperlyCleaned(checkObj.getProperlyCleaned());
						rejectionReportHistory.setFreeFromAnyUnwantedSmell(checkObj.getFreeFromAnyUnwantedSmell());
						rejectionReportHistory
								.setDepartmentHavingAnyStuffingPlan(checkObj.getDepartmentHavingAnyStuffingPlan());
						rejectionReportHistory.setStuffedAsPerPlan(checkObj.getStuffedAsPerPlan());
						rejectionReportHistory.setNoOfPackagesStuffed(checkObj.getNoOfPackagesStuffed());
						rejectionReportHistory
								.setDepartmentHavingCopyOfContract(checkObj.getDepartmentHavingCopyOfContract());
						rejectionReportHistory.setStuffingIsCarriedOutAsPerInstruction(
								checkObj.getStuffingIsCarriedOutAsPerInstruction());
						rejectionReportHistory
								.setIsThereAnySpecialInstruction(checkObj.getIsThereAnySpecialInstruction());
						rejectionReportHistory.setIsTheStuffingIsDoneAsPerSpecialInstruction(
								checkObj.getIsTheStuffingIsDoneAsPerSpecialInstruction());
						rejectionReportHistory.setIsPolytheneSheetUsedForFloorCovering(
								checkObj.getIsPolytheneSheetUsedForFloorCovering());
						rejectionReportHistory.setIsPolytheneClean(checkObj.getIsPolytheneClean());
						rejectionReportHistory
								.setAllThePackagesProperlyIdentified(checkObj.getAllThePackagesProperlyIdentified());
						rejectionReportHistory.setFamigationDone(checkObj.getFamigationDone());
						rejectionReportHistory.setAnyOtherSpecialRequriement(checkObj.getAnyOtherSpecialRequriement());
						rejectionReportHistory.setRemarks(checkObj.getRemarks());
						rejectionReportHistory.setFinalConclusion(checkObj.getFinalConclusion());
						rejectionReportHistory.setReason(checkObj.getReason());

						// Setting remark and status
						rejectionReportHistory.setRemarks(checkObj.getRemarks());
						rejectionReportHistory.setLotNo(checkObj.getLotNo());

						// status
						rejectionReportHistory.setQa_inspector_submit_by(checkObj.getQa_inspector_submit_by());
						rejectionReportHistory.setQa_inspector_submit_id(checkObj.getQa_inspector_submit_id());
						rejectionReportHistory.setQa_inspector_submit_on(checkObj.getQa_inspector_submit_on());
						rejectionReportHistory.setQa_inspector_status(checkObj.getQa_inspector_status());
						rejectionReportHistory.setQa_inspector_sign(checkObj.getQa_inspector_sign());
						rejectionReportHistory
								.setQa_inspector_signature_image(checkObj.getQa_inspector_signature_image());

						rejectionReportHistory.setSecurity_status(checkObj.getSecurity_status());
						rejectionReportHistory.setSecurity_submit_by(checkObj.getSecurity_submit_by());
						rejectionReportHistory.setSecurity_submit_id(checkObj.getSecurity_submit_id());
						rejectionReportHistory.setSecurity_submit_on(checkObj.getSecurity_submit_on());
						rejectionReportHistory.setSecurity_sign(checkObj.getSecurity_sign());

						rejectionReportHistory.setDispatch_supervisor_status(checkObj.getDispatch_supervisor_status());
						rejectionReportHistory.setDispatch_supervisor_submit_by(checkObj.getSecurity_submit_by());
						rejectionReportHistory.setDispatch_supervisor_submit_id(checkObj.getSecurity_submit_id());
						rejectionReportHistory.setDispatch_supervisor_submit_on(checkObj.getSecurity_submit_on());
						rejectionReportHistory.setDispatch_supervisor_sign(checkObj.getSecurity_sign());

						rejectionReportHistory.setQa_mr_status(checkObj.getQa_mr_status());

						// version
						String date1 = rejectionReportHistory.getDate();

						String cirNo = rejectionReportHistory.getCirNo();

						int version = qaContainerInspectionReportHistoryRepository.getMaximumVersion(date1, cirNo)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						qaContainerInspectionReportHistoryRepository.save(rejectionReportHistory); // ONE HISTORY

						List<QaContainerInspectionReportLines> historyMapList = checkObj.getDetails();

						for (QaContainerInspectionReportLines obj : historyMapList) {

							QaContainerInspectionReportLinesHistory objHistory = new QaContainerInspectionReportLinesHistory();

							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setContainerId(rejectionReportHistory.getContainerId());
							qaContainerInspectionReportLinesHisotryRepository.save(objHistory);

						}

						qaContainerInspectionReportHistoryRepository.save(rejectionReportHistory);

						// MAIL
						try {

							qamailfunction.sendMailToSecurityContainerInspection(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(
							new ApiResponse(false, " Invalid status. Sent to manager for final approval"),
							HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_QA")) {
					return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				qaContainerInspectionReportRepository.save(checkObj);

				List<QaContainerInspectionReportLines> list = details.getDetails();

				for (QaContainerInspectionReportLines detail : list) {
					detail.setContainerId(checkObj.getContainerId());
					qaContainerInspectionReportLinesRepository.save(detail);
				}

				checkObj.setDetails(list);

				if (role.equals("ROLE_QA")) {
					checkObj.setQa_inspector_submit_by(userName);
					checkObj.setQa_inspector_submit_on(date);
					checkObj.setQa_inspector_submit_id(userId);
					checkObj.setQa_inspector_status(AppConstants.qaInsApprovedStatus);
					checkObj.setQa_inspector_sign(userName);

					checkObj.setSecurity_status("");
					checkObj.setDispatch_supervisor_status(AppConstants.waitingStatus);
					checkObj.setQa_mr_status("");

				} else if (role.equals("DISPATCH_SUPERVISOR")
						&& checkObj.getQa_inspector_status().equals(AppConstants.qaInsApprovedStatus)) {

					checkObj.setDispatch_supervisor_submit_by(userName);
					checkObj.setDispatch_supervisor_submit_on(date);
					checkObj.setDispatch_supervisor_submit_id(userId);
					checkObj.setDispatch_supervisor_status(QaAppConstants.SupervisorApprove);
					checkObj.setDispatch_supervisor_sign(userName);
					checkObj.setSecurity_status(AppConstants.waitingStatus);

				} else if (role.equals("SECURITY")
						&& checkObj.getDispatch_supervisor_status().equals(AppConstants.supervisorApprovedStatus)) {

					checkObj.setSecurity_submit_by(userName);
					checkObj.setSecurity_submit_on(date);
					checkObj.setSecurity_submit_id(userId);
					checkObj.setSecurity_status(QaAppConstants.securityApproveStatus);
					checkObj.setSecurity_sign(userName);
					checkObj.setQa_mr_status(AppConstants.waitingStatus);

				} else {
					return new ResponseEntity<>(
							new ApiResponse(false, "For the role " + role + "the previous has not yet been approved"),
							HttpStatus.BAD_REQUEST);
				}

				qaContainerInspectionReportRepository.save(checkObj);

				// IMAGE

//					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
				//
//					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
				//
//					checkObj.setOperator_signature_image(signature);
				//
//					bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

				QaContainerInspectionReportHistory rejectionReportHistory = new QaContainerInspectionReportHistory();

				// getter setters fields & status

				rejectionReportHistory.setUnit(checkObj.getUnit());
				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setDepartment(checkObj.getDepartment());
				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setCirNo(checkObj.getCirNo());
				rejectionReportHistory.setProductDescription(checkObj.getProductDescription());
				rejectionReportHistory.setCustomer(checkObj.getCustomer());
				rejectionReportHistory.setContainerNO(checkObj.getContainerNO());
				rejectionReportHistory.setLotNo(checkObj.getLotNo());
				rejectionReportHistory.setInvoiceNo(checkObj.getInvoiceNo());
				rejectionReportHistory.setSealOneTimeLockNo(checkObj.getSealOneTimeLockNo());
				rejectionReportHistory.setSealSteamerSealNo(checkObj.getSealSteamerSealNo());
				rejectionReportHistory.setHighSecuritySeal(checkObj.getHighSecuritySeal());
				rejectionReportHistory.setSealAffixPropertyVerified(checkObj.getSealAffixPropertyVerified());

				// 17 Points Container Inspection Review
				rejectionReportHistory.setBumper(checkObj.getBumper());
				rejectionReportHistory.setEngine(checkObj.getEngine());
				rejectionReportHistory.setTyre(checkObj.getTyre());
				rejectionReportHistory.setTruckFloor(checkObj.getTruckFloor());
				rejectionReportHistory.setFuelTank(checkObj.getFuelTank());
				rejectionReportHistory.setCabSotrageCompartment(checkObj.getCabSotrageCompartment());
				rejectionReportHistory.setAirTanks(checkObj.getAirTanks());
				rejectionReportHistory.setDriveShafts(checkObj.getDriveShafts());
				rejectionReportHistory.setFifthWheel(checkObj.getFifthWheel());
				rejectionReportHistory.setOutsideUnderCarriage(checkObj.getOutsideUnderCarriage());
				rejectionReportHistory.setOutsideInsideDoors(checkObj.getOutsideInsideDoors());
				rejectionReportHistory.setInsideFloor(checkObj.getInsideFloor());
				rejectionReportHistory.setSideWalls(checkObj.getSideWalls());
				rejectionReportHistory.setFrontWalls(checkObj.getFrontWalls());
				rejectionReportHistory.setCeilingRoof(checkObj.getCeilingRoof());
				rejectionReportHistory.setRefrigerationUnit(checkObj.getRefrigerationUnit());
				rejectionReportHistory.setExhaust(checkObj.getExhaust());

				// Condition of Container
				rejectionReportHistory.setConditionOfContainer(checkObj.getConditionOfContainer());
				rejectionReportHistory.setRoofFreeFromDamagesHoles(checkObj.getRoofFreeFromDamagesHoles());
				rejectionReportHistory
						.setAllTheSidesFreeFromDamagesHoles(checkObj.getAllTheSidesFreeFromDamagesHoles());
				rejectionReportHistory.setFreeFromJointGraps(checkObj.getFreeFromJointGraps());
				rejectionReportHistory.setFreeFromRust(checkObj.getFreeFromRust());
				rejectionReportHistory.setProperlyPainted(checkObj.getProperlyPainted());
				rejectionReportHistory.setOverallGoodCondition(checkObj.getOverallGoodCondition());
				rejectionReportHistory.setFreeFromStaindirt(checkObj.getFreeFromStaindirt());
				rejectionReportHistory.setProperlyCleaned(checkObj.getProperlyCleaned());
				rejectionReportHistory.setFreeFromAnyUnwantedSmell(checkObj.getFreeFromAnyUnwantedSmell());
				rejectionReportHistory
						.setDepartmentHavingAnyStuffingPlan(checkObj.getDepartmentHavingAnyStuffingPlan());
				rejectionReportHistory.setStuffedAsPerPlan(checkObj.getStuffedAsPerPlan());
				rejectionReportHistory.setNoOfPackagesStuffed(checkObj.getNoOfPackagesStuffed());
				rejectionReportHistory.setDepartmentHavingCopyOfContract(checkObj.getDepartmentHavingCopyOfContract());
				rejectionReportHistory
						.setStuffingIsCarriedOutAsPerInstruction(checkObj.getStuffingIsCarriedOutAsPerInstruction());
				rejectionReportHistory.setIsThereAnySpecialInstruction(checkObj.getIsThereAnySpecialInstruction());
				rejectionReportHistory.setIsTheStuffingIsDoneAsPerSpecialInstruction(
						checkObj.getIsTheStuffingIsDoneAsPerSpecialInstruction());
				rejectionReportHistory
						.setIsPolytheneSheetUsedForFloorCovering(checkObj.getIsPolytheneSheetUsedForFloorCovering());
				rejectionReportHistory.setIsPolytheneClean(checkObj.getIsPolytheneClean());
				rejectionReportHistory
						.setAllThePackagesProperlyIdentified(checkObj.getAllThePackagesProperlyIdentified());
				rejectionReportHistory.setFamigationDone(checkObj.getFamigationDone());
				rejectionReportHistory.setAnyOtherSpecialRequriement(checkObj.getAnyOtherSpecialRequriement());
				rejectionReportHistory.setRemarks(checkObj.getRemarks());
				rejectionReportHistory.setRemarks(checkObj.getRemarks());
				rejectionReportHistory.setFinalConclusion(checkObj.getFinalConclusion());
				rejectionReportHistory.setReason(checkObj.getReason());

				// Setting remark and status
				rejectionReportHistory.setRemarks(checkObj.getRemarks());
				rejectionReportHistory.setLotNo(checkObj.getLotNo());

				// status
				rejectionReportHistory.setQa_inspector_submit_by(checkObj.getQa_inspector_submit_by());
				rejectionReportHistory.setQa_inspector_submit_id(checkObj.getQa_inspector_submit_id());
				rejectionReportHistory.setQa_inspector_submit_on(checkObj.getQa_inspector_submit_on());
				rejectionReportHistory.setQa_inspector_status(checkObj.getQa_inspector_status());
				rejectionReportHistory.setQa_inspector_sign(checkObj.getQa_inspector_sign());
				rejectionReportHistory.setQa_inspector_signature_image(checkObj.getQa_inspector_signature_image());

				rejectionReportHistory.setSecurity_status(checkObj.getSecurity_status());
				rejectionReportHistory.setSecurity_submit_by(checkObj.getSecurity_submit_by());
				rejectionReportHistory.setSecurity_submit_id(checkObj.getSecurity_submit_id());
				rejectionReportHistory.setSecurity_submit_on(checkObj.getSecurity_submit_on());
				rejectionReportHistory.setSecurity_sign(checkObj.getSecurity_sign());

				rejectionReportHistory.setDispatch_supervisor_status(checkObj.getDispatch_supervisor_status());
				rejectionReportHistory.setDispatch_supervisor_submit_by(checkObj.getSecurity_submit_by());
				rejectionReportHistory.setDispatch_supervisor_submit_id(checkObj.getSecurity_submit_id());
				rejectionReportHistory.setDispatch_supervisor_submit_on(checkObj.getSecurity_submit_on());
				rejectionReportHistory.setDispatch_supervisor_sign(checkObj.getSecurity_sign());

				rejectionReportHistory.setQa_mr_status(checkObj.getQa_mr_status());

				// version
				// version
				String date1 = rejectionReportHistory.getDate();

				String cirNo = rejectionReportHistory.getCirNo();

				int version = qaContainerInspectionReportHistoryRepository.getMaximumVersion(date1, cirNo)
						.map(temp -> temp + 1).orElse(1);

//					
//					int version = qaOnlineInspectionReportHistoryRepository
//						    .getMaximumVersion(date1, shift1, machineName, BmrNo, POrder)
//						    .map(maxVersion -> maxVersion + 1) // Increment the version by 1
//						    .orElse(1); // If no maximum version is found, start with version 1

				rejectionReportHistory.setVersion(version);

				qaContainerInspectionReportHistoryRepository.save(rejectionReportHistory); // ONE HISTORY

				List<QaContainerInspectionReportLines> historyMapList = checkObj.getDetails();

				for (QaContainerInspectionReportLines obj : historyMapList) {

					QaContainerInspectionReportLinesHistory objHistory = new QaContainerInspectionReportLinesHistory();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setContainerId(rejectionReportHistory.getContainerId());
					qaContainerInspectionReportLinesHisotryRepository.save(objHistory);

				}

				qaContainerInspectionReportHistoryRepository.save(rejectionReportHistory);

				// MAIL
				try {

					qamailfunction.sendMailToSecurityContainerInspection(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
							HttpStatus.OK);
				}

			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

//		return new ResponseEntity(new ApiResponse(true, role + "Submitted Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	// APPROVE OR REJECT

	public ResponseEntity<?> approveRejectionContainerInspectionReport(
			ApproveResponseContainerInspection approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		QaContainerInspectionReport object = new QaContainerInspectionReport();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = qaContainerInspectionReportRepository.findFormById(approvalResponse.getId());

			QaContainerInspectionReportHistory objHistory = new QaContainerInspectionReportHistory();

			String securityStatus = object.getSecurity_status();

//			String supervisiorStatus = object.getDispatch_supervisor_status();

			String hodStatus = object.getQa_mr_status();

			UserImageDetails imageDetails = new UserImageDetails();

			if (securityStatus.equalsIgnoreCase(QaAppConstants.securityApproveStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setQa_mr_status(AppConstants.qMrApprovedStatus);
						object.setQa_mr_submit_on(date);
						object.setQa_mr_submit_by(userName);
						object.setQa_mr_submit_id(userId);

						object.setQa_mr_sign(userName);

						qaContainerInspectionReportRepository.save(object);

						objHistory = qaContainerInspectionReportHistoryRepository
								.fetchLastSubmittedRecord(object.getDate(), object.getCirNo());

						objHistory.setQa_mr_status(AppConstants.qMrApprovedStatus);
						objHistory.setQa_mr_submit_on(date);
						objHistory.setQa_mr_submit_by(userName);
						objHistory.setQa_mr_submit_id(userId);
						objHistory.setQa_mr_sign(userName);

						qaContainerInspectionReportHistoryRepository.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, "QA_MANAGER Approved Successfully"),
								HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();

						object.setReason(reason);
						object.setQa_mr_status(AppConstants.qaMrRejectedStatus);
						object.setQa_mr_submit_on(date);
						object.setQa_mr_submit_by(userName);
						object.setQa_mr_submit_id(userId);

						object.setQa_mr_sign(userName);
						// Handle Final Conclusion
						String finalConclusion = approvalResponse.getFinalConclusion();
						if (finalConclusion != null) {
							object.setFinalConclusion(finalConclusion);
						} else {
							// Log and handle the case where finalConclusion is null
							System.out.println("Final Conclusion is null!");

							return new ResponseEntity<>(
									new ApiResponse(false, "Final Conclusion is required for approval."),
									HttpStatus.BAD_REQUEST);

						}

						qaContainerInspectionReportRepository.save(object);

						objHistory = qaContainerInspectionReportHistoryRepository
								.fetchLastSubmittedRecord(object.getDate(), object.getCirNo());

						objHistory.setReason(reason);
						objHistory.setQa_mr_status(AppConstants.qaMrRejectedStatus);
						objHistory.setQa_mr_submit_on(date);
						objHistory.setQa_mr_submit_by(userName);
						objHistory.setQa_mr_submit_id(userId);
						objHistory.setQa_mr_sign(userName);

						if (finalConclusion != null) {
							objHistory.setFinalConclusion(finalConclusion);
						} else {
							// Log and handle the case where finalConclusion is null
							System.out.println("Final Conclusion is null in history!");
							return new ResponseEntity<>(
									new ApiResponse(false, "Final Conclusion is required for approval."),
									HttpStatus.BAD_REQUEST);

						}

						qaContainerInspectionReportHistoryRepository.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, " QA_MANAGER Rejected Successfully"),
								HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Record " + e.getMessage() + msg),
					HttpStatus.BAD_REQUEST);

		}

	}

//		PRINT API

	public ResponseEntity<?> getByContainerInspectionReportPrint(String date, String cirNo) {
		try {

			List<QaContainerInspectionReport> list = qaContainerInspectionReportRepository
					.printContainerInspectionReport(date, cirNo);

			if (list == null || list.isEmpty()) {

//					list = new ArrayList<MetalDetectorCheckListF020>();
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// Param Based Get

	public ResponseEntity<?> getByDateCirNo(String date, String cirNo) {
		try {

			List<QaContainerInspectionReport> list = qaContainerInspectionReportRepository.getDetailsBaseParam(date,
					cirNo);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// SUMMARY API

	public ResponseEntity<?> getContainerInspectionReportSummary(HttpServletRequest http) {

		List<QaContainerInspectionReport> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_QA")) {

				details = qaContainerInspectionReportRepository.qaInspectorSummary();
			}

			else if (userRole.equals("SECURITY") || userRole.equals("DISPATCH_SUPERVISOR")
					|| userRole.equals("QA_MANAGER") || userRole.equals("ROLE_DESIGNEE")) {

				details = qaContainerInspectionReportRepository.securitySupervisorMrSummary();
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

//		CLOSING BMR BASED ON DEPARTMENT

	public List<Object[]> getClosingBmrByDepartment(String department) {
		if ("padpunching".equalsIgnoreCase(department)) {
			return qaContainerInspectionReportRepository.punchingClosingBmr();
		} else if ("drygoods".equalsIgnoreCase(department)) {
			return qaContainerInspectionReportRepository.dryGoodsClosingBmr();
		} else if ("spunlace".equalsIgnoreCase(department)) {
			return qaContainerInspectionReportRepository.spunlaunceClosingBmr();
		} else if ("bleaching".equalsIgnoreCase(department)) {
			return qaContainerInspectionReportRepository.bleachingClosingBmr();
		} else {
			throw new IllegalArgumentException("Invalid department: " + department);
		}
	}

//		APPROVED CIR NO

	public List<Map<String, String>> getApprovedCir(HttpServletRequest http) {
		List<String> approvedCirList = qaContainerInspectionReportRepository.approvedCirNo();

		// Create a list of key-value pairs (Map)
		List<Map<String, String>> keyValueList = new ArrayList<>();

		for (String cirNo : approvedCirList) {
			// Create a key-value pair for each CIR_NO
			Map<String, String> keyValueMap = new HashMap<>();
			keyValueMap.put("CIR_NO", cirNo);
			keyValueList.add(keyValueMap);
		}

		return keyValueList;
	}

	// Method to fetch closing BMR based on department
	public List<Map<String, String>> getClosingBmrDepartment(String department) {
		List<Object[]> results;
		if ("padpunching".equalsIgnoreCase(department)) {
			results = qaContainerInspectionReportRepository.punchingClosingBmr();
		} else if ("drygoods".equalsIgnoreCase(department)) {
			results = qaContainerInspectionReportRepository.dryGoodsClosingBmr();
		} else {
			throw new IllegalArgumentException("Invalid department: " + department);
		}

		// Convert Object[] to Map<String, String>
		List<Map<String, String>> mappedResults = new ArrayList<>();
		for (Object[] result : results) {
			Map<String, String> map = new HashMap<>();
			map.put("batchNo", (String) result[0]);
			map.put("status", (String) result[1]);
			mappedResults.add(map);
		}
		return mappedResults;
	}

//		  ========================================== REQUEST AND ISSUNCE OF DOCUMENTS ============================================

	public ResponseEntity<?> saveRequestAndIssunceOfDocumnet(RequestAndIssunceOfDocumentF002 details,
			HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}
		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		// For Fetching Current Date
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = QAUtil.convertLocalDateTimeToDate(currentDate);
		RequestAndIssunceOfDocumentF002 savedRequest = null;
		try {

			if (details.getRequestId() != null) {
				savedRequest = requestAndIssunceOfDocumentRepositoryF002.findById(details.getRequestId())
						.orElseThrow(() -> new RuntimeException("Tool not found with id " + details.getRequestId()));

				// Copy properties, ignoring certain fields
				String[] ignoreProps = { "requestId", "createdBy", "createdAt", "qa_hod_designee_status",
						"qa_hod_designee_save_on", "qa_hod_designee_save_by", "qa_hod_designee_save_id",
						"qa_hod_designee_submit_on", "qa_hod_designee_submit_by", "qa_hod_designee_submit_id",
						"qa_hod_designee_sign", "qa_mr_status", "qa_mr_submit_on", "qa_mr_submit_by", "qa_mr_submit_id",
						"qa_mr_sign" };
				BeanUtils.copyProperties(details, savedRequest, ignoreProps);
			} else {
				savedRequest = details;
			}
			if (role.equals("ROLE_HOD") || role.equals("ROLE_DESIGNEE") || role.equals("ROLE_SUPERVISOR")) {
				// Save the main tool details
				savedRequest = requestAndIssunceOfDocumentRepositoryF002.save(savedRequest);

				// Save associated line items
				List<RequestAndIssunceOfLineDocumentsF002> lineItems = details.getDetails();
				if (lineItems != null) {
					for (RequestAndIssunceOfLineDocumentsF002 line : lineItems) {
						line.setRequestId(savedRequest.getRequestId());
						requestAndIssunceOfDocumentLinesRepository.save(line);
					}
				}

				savedRequest.setQa_hod_designee_save_by(userName);
				savedRequest.setQa_hod_designee_save_on(date);
				savedRequest.setQa_hod_designee_save_id(userId);
				savedRequest.setQa_hod_designee_status(QaAppConstants.hoddesigneeSaved);

				requestAndIssunceOfDocumentRepositoryF002.save(savedRequest);

			} else {
				return new ResponseEntity(new ApiResponse(false, role + " is not allowed to save details"),
						HttpStatus.BAD_REQUEST);
			}
		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "Unable to save details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
	}

	// Submit

	public ResponseEntity<?> submitRequestAndIssunceOfDocument(RequestAndIssunceOfDocumentF002 details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getRequestId();

		RequestAndIssunceOfDocumentF002 checkObj = new RequestAndIssunceOfDocumentF002();

		try {
			String value = "";
			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRevisionNumber() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getDate() == null)
				value = "date";
			if (details.getSopNumber() == null)
				value = "SopNumber";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = requestAndIssunceOfDocumentRepositoryF002.findFormById(id);

				String[] IgnoreProps = { "requestId", "createdBy", "createdAt", "qa_hod_designee_status",
						"qa_hod_designee_save_on", "qa_hod_designee_save_by", "qa_hod_designee_save_id",
						"qa_hod_designee_submit_on", "qa_hod_designee_submit_by", "qa_hod_designee_submit_id",
						"qa_hod_designee_sign", "qa_mr_status", "qa_mr_submit_on", "qa_mr_submit_by", "qa_mr_submit_id",
						"qa_mr_sign" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getQa_hod_designee_status().equals(QaAppConstants.hodDesigneeApproved)
						|| checkObj.getQa_mr_status().equals(AppConstants.qaMrRejectedStatus)) {
					if (role.equals("ROLE_HOD") || role.equals("ROLE_DESIGNEE") || role.equals("ROLE_SUPERVISOR")) {

						requestAndIssunceOfDocumentRepositoryF002.save(checkObj);

						List<RequestAndIssunceOfLineDocumentsF002> list = details.getDetails();

						for (RequestAndIssunceOfLineDocumentsF002 detail : list) {
							detail.setRequestId(checkObj.getRequestId());
							requestAndIssunceOfDocumentLinesRepository.save(detail);
						}
//						if(checkObj.getQa_mr_status().equals(AppConstants.qaMrRejectedStatus)) {
//							for (RequestAndIssunceOfLineDocumentsF002 rejectedResetList : list) {
//								rejectedResetList.setDocumentGivenBy("");
//								rejectedResetList.setDocumentCollectedBy("");
//								rejectedResetList.setRemark("");
//								rejectedResetList.setReason("");
//							}
//						}
						if (checkObj != null && AppConstants.qaMrRejectedStatus.equals(checkObj.getQa_mr_status())) {
							if (list != null) { // Ensure list is not null before iterating
								for (RequestAndIssunceOfLineDocumentsF002 rejectedResetList : list) {
									if (rejectedResetList != null) { // Ensure each item is not null
										rejectedResetList.setDocumentGivenBy("");
										rejectedResetList.setDocumentCollectedBy("");
										rejectedResetList.setRemark("");
										rejectedResetList.setReason("");
									}
								}
							}
						}
						checkObj.setDetails(list);

						checkObj.setQa_hod_designee_submit_by(userName);
						checkObj.setQa_hod_designee_submit_on(date);
						checkObj.setQa_hod_designee_submit_id(userId);
						checkObj.setQa_hod_designee_status(QaAppConstants.hodDesigneeApproved);
						checkObj.setQa_hod_designee_sign(userName);

//		  							checkObj.setSecurity_status(AppConstants.waitingStatus);
//		  							checkObj.setDispatch_supervisor_status("");
						checkObj.setQa_mr_status(AppConstants.waitingStatus);

						requestAndIssunceOfDocumentRepositoryF002.save(checkObj);

						// IMAGE

//		  							Optional<UserImageDetails> imageDetailsOpt = imageRepository
//		  									.fetchItemDetailsByUsername(userName);
						//
//		  							byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						//
//		  							checkObj.setOperator_signature_image(signature);
						//
//		  							bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

						RequestAndIssunceOfDocumentHistoryF002 rejectionReportHistory = new RequestAndIssunceOfDocumentHistoryF002();

						// getter setters fields & status

						rejectionReportHistory.setUnit(checkObj.getUnit()); // Set unit
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo()); // Set format number
						rejectionReportHistory.setFormatName(checkObj.getFormatName());// Set format name
						rejectionReportHistory.setSopNumber(checkObj.getSopNumber()); // Set SOP number
						rejectionReportHistory.setRevisionNumber(checkObj.getRevisionNumber()); // Set revision number
						rejectionReportHistory.setDate(checkObj.getDate());
						rejectionReportHistory.setMonth(checkObj.getMonth()); // Set date
						rejectionReportHistory.setYear(checkObj.getYear());
						rejectionReportHistory.setDepartment(checkObj.getDepartment());
						rejectionReportHistory.setComments(checkObj.getComments()); // Set comments

						// status
						rejectionReportHistory.setQa_hod_designee_submit_by(checkObj.getQa_hod_designee_submit_by());
						rejectionReportHistory.setQa_hod_designee_submit_id(checkObj.getQa_hod_designee_submit_id());
						rejectionReportHistory.setQa_hod_designee_submit_on(checkObj.getQa_hod_designee_submit_on());
						rejectionReportHistory.setQa_hod_designee_status(checkObj.getQa_hod_designee_status());
						rejectionReportHistory.setQa_hod_designee_sign(checkObj.getQa_hod_designee_sign());
						rejectionReportHistory
								.setHod_designee_signature_image(checkObj.getHod_designee_signature_image());

//		  							rejectionReportHistory.setSecurity_status(checkObj.getSecurity_status());
//		  									rejectionReportHistory.setDispatch_supervisor_status(checkObj.getDispatch_supervisor_status());
						rejectionReportHistory.setQa_mr_status(checkObj.getQa_mr_status());

						// version
						String date1 = rejectionReportHistory.getDate();

//		  							String cirNo = rejectionReportHistory.getCirNo();
						String month = rejectionReportHistory.getMonth();

						String year = rejectionReportHistory.getYear();

						String dept = rejectionReportHistory.getDepartment();

						int version = requestAndIssunceOfDocumentHistoryRepository
								.getMaximumVersion(date1, month, year, dept).map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						requestAndIssunceOfDocumentHistoryRepository.save(rejectionReportHistory); // ONE HISTORY

						List<RequestAndIssunceOfLineDocumentsF002> historyMapList = checkObj.getDetails();

						for (RequestAndIssunceOfLineDocumentsF002 obj : historyMapList) {

							RequestAndIssunceOfDocumentLinesHisotryF002 objHistory = new RequestAndIssunceOfDocumentLinesHisotryF002();

							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setRequestId(rejectionReportHistory.getRequestId());
							requestAndIssunceOfDocumentLinesHistoryRepository.save(objHistory);

						}

						requestAndIssunceOfDocumentHistoryRepository.save(rejectionReportHistory);

						// MAIL
//						try {
//
//							qamailfunction.sendMailToMRRequestAndIssuanceOfDocument(checkObj);
//						} catch (Exception ex) {
//							return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
//									HttpStatus.OK);
//						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_HOD") && !role.equals("ROLE_DESIGNEE") || role.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				requestAndIssunceOfDocumentRepositoryF002.save(checkObj);

				List<RequestAndIssunceOfLineDocumentsF002> list = details.getDetails();

				for (RequestAndIssunceOfLineDocumentsF002 detail : list) {
					detail.setRequestId(checkObj.getRequestId());
					requestAndIssunceOfDocumentLinesRepository.save(detail);
				}

				checkObj.setDetails(list);

				checkObj.setQa_hod_designee_submit_by(userName);
				checkObj.setQa_hod_designee_submit_on(date);
				checkObj.setQa_hod_designee_submit_id(userId);
				checkObj.setQa_hod_designee_status(QaAppConstants.hodDesigneeApproved);
				checkObj.setQa_hod_designee_sign(userName);
//		  		checkObj.setSecurity_status(AppConstants.waitingStatus);
//		  		checkObj.setDispatch_supervisor_status("");
				checkObj.setQa_mr_status(AppConstants.waitingStatus);

				requestAndIssunceOfDocumentRepositoryF002.save(checkObj);

				// IMAGE

//		  		Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//		  		byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//		  		checkObj.setOperator_signature_image(signature);
//		  		bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

				RequestAndIssunceOfDocumentHistoryF002 rejectionReportHistory = new RequestAndIssunceOfDocumentHistoryF002();

				// Getter setters fields & status

				rejectionReportHistory.setUnit(checkObj.getUnit()); // Set unit
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo()); // Set format number
				rejectionReportHistory.setFormatName(checkObj.getFormatName());// Set format name
				rejectionReportHistory.setSopNumber(checkObj.getSopNumber()); // Set SOP number
				rejectionReportHistory.setRevisionNumber(checkObj.getRevisionNumber()); // Set revision number
				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setMonth(checkObj.getMonth()); // Set date
				rejectionReportHistory.setYear(checkObj.getYear());
				rejectionReportHistory.setDepartment(checkObj.getDepartment());
				rejectionReportHistory.setComments(checkObj.getComments()); // Set comments

				// status
				rejectionReportHistory.setQa_hod_designee_submit_by(checkObj.getQa_hod_designee_submit_by());
				rejectionReportHistory.setQa_hod_designee_submit_id(checkObj.getQa_hod_designee_submit_id());
				rejectionReportHistory.setQa_hod_designee_submit_on(checkObj.getQa_hod_designee_submit_on());
				rejectionReportHistory.setQa_hod_designee_status(checkObj.getQa_hod_designee_status());
				rejectionReportHistory.setQa_hod_designee_sign(checkObj.getQa_hod_designee_sign());
				rejectionReportHistory.setHod_designee_signature_image(checkObj.getHod_designee_signature_image());

//		  					
//		  		rejectionReportHistory.setSecurity_status(checkObj.getSecurity_status());
//		  		rejectionReportHistory.setDispatch_supervisor_status(checkObj.getDispatch_supervisor_status());
				rejectionReportHistory.setQa_mr_status(checkObj.getQa_mr_status());

				// version
				String date1 = rejectionReportHistory.getDate();
				String month = rejectionReportHistory.getMonth();
				String year = rejectionReportHistory.getYear();
				String dept = rejectionReportHistory.getDepartment();

				int version = requestAndIssunceOfDocumentHistoryRepository.getMaximumVersion(date1, month, year, dept)
						.map(temp -> temp + 1).orElse(1);

//		  					
//		  					int version = qaOnlineInspectionReportHistoryRepository
//		  						    .getMaximumVersion(date1, shift1, machineName, BmrNo, POrder)
//		  						    .map(maxVersion -> maxVersion + 1) // Increment the version by 1
//		  						    .orElse(1); // If no maximum version is found, start with version 1

				rejectionReportHistory.setVersion(version);

				requestAndIssunceOfDocumentHistoryRepository.save(rejectionReportHistory); // ONE HISTORY

				List<RequestAndIssunceOfLineDocumentsF002> historyMapList = checkObj.getDetails();

				for (RequestAndIssunceOfLineDocumentsF002 obj : historyMapList) {

					RequestAndIssunceOfDocumentLinesHisotryF002 objHistory = new RequestAndIssunceOfDocumentLinesHisotryF002();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setRequestId(rejectionReportHistory.getRequestId());
					requestAndIssunceOfDocumentLinesHistoryRepository.save(objHistory);

				}

				requestAndIssunceOfDocumentHistoryRepository.save(rejectionReportHistory);

				// MAIL
//				try {
//
//					qamailfunction.sendMailToMRRequestAndIssuanceOfDocument(checkObj);
//				} catch (Exception ex) {
//					return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
//							HttpStatus.OK);
//				}

			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

//		return new ResponseEntity(new ApiResponse(true, " Submitted Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	// APPROVE OR REJECT

	public ResponseEntity<?> approveRejectRequestAndIssunceOfDocuments(ApproveResponse approvalResponse,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		RequestAndIssunceOfDocumentF002 Obj = null;

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);

		// Fetching current date
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

		try {
			// Fetching the incidence object by ID
			Obj = requestAndIssunceOfDocumentRepositoryF002.findById(approvalResponse.getId())
					.orElseThrow(() -> new RuntimeException("Report not found with id " + approvalResponse.getId()));
			;
			List<RequestAndIssunceOfLineDocumentsF002> details = Obj.getDetails();
			List<RequestAndIssuenceOfDocChild> approvalDetails = approvalResponse.getQaF002Details();
			// Fetching the current status of the HOD and QA Manager
			String qaInspectorStatus = Obj.getQa_hod_designee_status();

			String qaManagerStatus = Obj.getQa_mr_status();

			String status = "";
			RequestAndIssunceOfLineDocumentsF002 matchingLineDocument;
			RequestAndIssunceOfDocumentHistoryF002 objHistory = new RequestAndIssunceOfDocumentHistoryF002();
			// First level of approval/rejection by QA Manager
			if (qaInspectorStatus.equalsIgnoreCase(QaAppConstants.hodDesigneeApproved)
					&& qaManagerStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_MR")) {

					String reason = approvalResponse.getRemarks();
					objHistory = requestAndIssunceOfDocumentHistoryRepository.fetchLastSubmittedRecord(Obj.getDate(),
							Obj.getMonth(), Obj.getYear(), Obj.getDepartment());
					if (approvalResponse.getStatus().equals("Approve")) {
						Obj.setQa_mr_status(QaAppConstants.qaMrApprovedStatus);
						// saving the child entries saved by the Qa manger/mr
						for (RequestAndIssuenceOfDocChild approvalDetailsObj : approvalDetails) {
							Long lineId = approvalDetailsObj.getLineId();

							// Find matching line document by lineId
							matchingLineDocument = details.stream()
									.filter(lineDoc -> lineDoc.getLineId().equals(lineId)).findFirst().orElse(null);

							if (matchingLineDocument != null) {
								// Update the fields in the matching line document
								matchingLineDocument.setDocumentGivenBy(approvalDetailsObj.getDocumentGivenBy());
								matchingLineDocument
										.setDocumentCollectedBy(approvalDetailsObj.getDocumentCollectedBy());
								matchingLineDocument.setRemark(approvalDetailsObj.getRemark());
								matchingLineDocument.setStatus(approvalResponse.getStatus());
								matchingLineDocument.setReason(approvalDetailsObj.getComments()); // Assuming comments
																									// is mapped to
																									// reason
							}

						}
						List<RequestAndIssunceOfDocumentLinesHisotryF002> historyDetails = objHistory.getDetails();
						List<RequestAndIssunceOfLineDocumentsF002> sourceDetails = Obj.getDetails();

						// Check if historyDetails is null or empty (initialize if needed)
						if (historyDetails == null) {
							historyDetails = new ArrayList<>();
							objHistory.setDetails(historyDetails);
						}

						// Update existing history details with source details
						for (int i = 0; i < sourceDetails.size(); i++) {
							RequestAndIssunceOfLineDocumentsF002 sourceDetail = sourceDetails.get(i);

							RequestAndIssunceOfDocumentLinesHisotryF002 historyDetail;

							// Check if there’s an existing entry in the historyDetails list
							if (i < historyDetails.size()) {
								historyDetail = historyDetails.get(i);
							} else {
								// If no matching history entry exists, create a new one and add to the list
								historyDetail = new RequestAndIssunceOfDocumentLinesHisotryF002();
								historyDetails.add(historyDetail);
							}

							// Update fields from sourceDetail to historyDetail
							historyDetail.setDepartment(sourceDetail.getDepartment());
							historyDetail.setDocumentName(sourceDetail.getDocumentName());
							historyDetail.setDocumentNo(sourceDetail.getDocumentNo());
							historyDetail.setRevisionNo(sourceDetail.getRevisionNo());
							historyDetail.setTypeOfCopy(sourceDetail.getTypeOfCopy());
							historyDetail.setNumberOfCopies(sourceDetail.getNumberOfCopies());
							historyDetail.setDocumentGivenBy(sourceDetail.getDocumentGivenBy());
							historyDetail.setDocumentCollectedBy(sourceDetail.getDocumentCollectedBy());
							historyDetail.setRemark(sourceDetail.getRemark());
							historyDetail.setReasonLine(sourceDetail.getReason());

							// Do not set the `id` field as it may mismatch
							// Optionally, if `id` exists, you can log it for tracking
							// Example: log.info("Skipping id field: " + sourceDetail.getId());
						}

						// Ensure the updated list is set in the history object
						objHistory.setDetails(historyDetails);

//						requestAndIssunceOfDocumentRepositoryF002.save(Obj);

						objHistory.setQa_mr_status(QaAppConstants.qaMrApprovedStatus);
						status = "Approved";
					} else if (approvalResponse.getStatus().equals("Reject")) {
						Obj.setReason(reason);
						Obj.setQa_mr_status(QaAppConstants.qaMrRejectedStatus);

						for (RequestAndIssuenceOfDocChild approvalDetailsObj : approvalDetails) {
							Long lineId = approvalDetailsObj.getLineId();

							// Find matching line document by lineId
							matchingLineDocument = details.stream()
									.filter(lineDoc -> lineDoc.getLineId().equals(lineId)).findFirst().orElse(null);

							if (matchingLineDocument != null) {
								// Update the fields in the matching line document
								matchingLineDocument.setDocumentGivenBy(approvalDetailsObj.getDocumentGivenBy());
								matchingLineDocument
										.setDocumentCollectedBy(approvalDetailsObj.getDocumentCollectedBy());
								matchingLineDocument.setRemark(approvalDetailsObj.getRemark());
								matchingLineDocument.setStatus(approvalResponse.getStatus());
								matchingLineDocument.setReason(approvalDetailsObj.getComments()); // Assuming comments
																									// is mapped to
																									// reason
							}

						}
//						objHistory.setReason(reason);
						List<RequestAndIssunceOfDocumentLinesHisotryF002> historyDetails = objHistory.getDetails();
						List<RequestAndIssunceOfLineDocumentsF002> sourceDetails = Obj.getDetails();

						// Check if historyDetails is null or empty (initialize if needed)
						if (historyDetails == null) {
							historyDetails = new ArrayList<>();
							objHistory.setDetails(historyDetails);
						}

						// Update existing history details with source details
						for (int i = 0; i < sourceDetails.size(); i++) {
							RequestAndIssunceOfLineDocumentsF002 sourceDetail = sourceDetails.get(i);

							RequestAndIssunceOfDocumentLinesHisotryF002 historyDetail;

							// Check if there’s an existing entry in the historyDetails list
							if (i < historyDetails.size()) {
								historyDetail = historyDetails.get(i);
							} else {
								// If no matching history entry exists, create a new one and add to the list
								historyDetail = new RequestAndIssunceOfDocumentLinesHisotryF002();
								historyDetails.add(historyDetail);
							}

							// Update fields from sourceDetail to historyDetail
							historyDetail.setDepartment(sourceDetail.getDepartment());
							historyDetail.setDocumentName(sourceDetail.getDocumentName());
							historyDetail.setDocumentNo(sourceDetail.getDocumentNo());
							historyDetail.setRevisionNo(sourceDetail.getRevisionNo());
							historyDetail.setTypeOfCopy(sourceDetail.getTypeOfCopy());
							historyDetail.setNumberOfCopies(sourceDetail.getNumberOfCopies());
							historyDetail.setDocumentGivenBy(sourceDetail.getDocumentGivenBy());
							historyDetail.setDocumentCollectedBy(sourceDetail.getDocumentCollectedBy());
							historyDetail.setRemark(sourceDetail.getRemark());
							historyDetail.setReasonLine(sourceDetail.getReason());

							// Do not set the `id` field as it may mismatch
							// Optionally, if `id` exists, you can log it for tracking
							// Example: log.info("Skipping id field: " + sourceDetail.getId());
						}

						// Ensure the updated list is set in the history object
						objHistory.setDetails(historyDetails);

						objHistory.setQa_mr_status(QaAppConstants.qaMrRejectedStatus);
						status = "Rejected";
					}

					Obj.setQa_mr_submit_on(date);
					Obj.setQa_mr_submit_by(userName);
					Obj.setQa_mr_submit_id(userId);
					Obj.setQa_mr_sign(userName);
					// Save the updated incidence object
					requestAndIssunceOfDocumentRepositoryF002.save(Obj);
					// History
					objHistory.setQa_mr_submit_on(date);
					objHistory.setQa_mr_submit_by(userName);
					objHistory.setQa_mr_submit_id(userId);
					objHistory.setQa_mr_sign(userName);
					// Save the updated incidence object
					requestAndIssunceOfDocumentHistoryRepository.save(objHistory);

//					return new ResponseEntity<>(new ApiResponse(true, "QA Manager " + status + " successfully"),
//							HttpStatus.OK);
					return new ResponseEntity<>(Obj, HttpStatus.CREATED);

				} else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to approve/reject"),
							HttpStatus.FORBIDDEN);
				}

			} else {
				return new ResponseEntity<>(
						new ApiResponse(false, "Invalid status or no pending approval for this user"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			log.error("Unable to approve/reject List Of Sharp Tools", e);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/reject: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

//			PRINT API

//	public ResponseEntity<?> getByRequestDocumentOfIssuncePrint(String date, String month, String year) {
//		try {
//
//			List<RequestAndIssunceOfDocumentF002> list = requestAndIssunceOfDocumentRepositoryF002
//					.printContainerInspectionReport(date, month, year);
//
//			if (list == null || list.isEmpty()) {
//
////						list = new ArrayList<MetalDetectorCheckListF020>();
//				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
//			}
//			return new ResponseEntity<>(list, HttpStatus.OK);
//		} catch (Exception e) {
//			log.error("Unable to get Details!", e);
//			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
//		}
//	}

	public ResponseEntity<?> getByRequestDocumentOfIssuncePrint(String department, String date, String month,
			String year) {
		try {
			// Fetch all data from the repository without filtering by department
			List<RequestAndIssunceOfDocumentF002> list = requestAndIssunceOfDocumentRepositoryF002
					.printContainerInspectionReport(date, month, year);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			// If department is provided, filter the list based on the department
			if (department != null && !department.isEmpty()) {
				list = list.stream()
						.filter(doc -> doc.getDetails().stream().anyMatch(
								line -> line.getDepartment() != null && line.getDepartment().equals(department)))
						.collect(Collectors.toList());
			}

			if (list.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(true, "No data matching the department filter"),
						HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
	public ResponseEntity<?> getF002Print(String department, String date, String month,
			String year) {
		try {
			// Fetch all data from the repository without filtering by department
			List<RequestAndIssunceOfDocumentF002> list = requestAndIssunceOfDocumentRepositoryF002
					.printF002Report(date, month, year,department);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}


	// Param Based Get

	public ResponseEntity<?> getByDateRequestDocumentOfIssunce(String date, String month, String year) {
		try {

			List<RequestAndIssunceOfDocumentF002> list = requestAndIssunceOfDocumentRepositoryF002
					.getDetailsBaseParam(date, month, year);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}
	
	public ResponseEntity<?> findRequestAndIssunceOfDocument(String date, String month, String year, String department) {
		try {

			List<RequestAndIssunceOfDocumentF002> list = requestAndIssunceOfDocumentRepositoryF002
					.getDetailsByDepartment(date, month, year,department);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}


	// SUMMARY API

	public ResponseEntity<?> getRequestAndIssunceOfDocument(HttpServletRequest http) {

		List<RequestAndIssunceOfDocumentF002> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE") || userRole.equals("ROLE_SUPERVISOR")) {

				details = requestAndIssunceOfDocumentRepositoryF002.qaHodDesigneeSummary();
			}

			else if (userRole.equals("QA_MANAGER") || userRole.equals("ROLE_MR")) {

				details = requestAndIssunceOfDocumentRepositoryF002.qaManagerAndMrSummmary();
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

// ===================================== DISTRIBUTION AND DISTRUCTION RECORD ==============================================

// GET ALL APPROVED DATA FROM REQUEST ISSUANCE OF DOCUMENT

	public ResponseEntity<?> getAllFromRequestAndIssunceOfDocument() {
		try {
			// Fetch all approved records
			List<RequestAndIssunceOfDocumentF002> list = requestAndIssunceOfDocumentRepositoryF002
					.getAllIfApproveForDistributionAndDistructions();

			if (list == null || list.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			// Use a map to ensure unique header records
			Map<Long, RequestAndIssunceOfDocumentF002> uniqueRequests = new HashMap<>();

			for (RequestAndIssunceOfDocumentF002 request : list) {
				// If the request ID is not already present, add it to the map
				if (!uniqueRequests.containsKey(request.getRequestId())) {
					uniqueRequests.put(request.getRequestId(), request);
				}

				// Filter out line items with status "YES"
				List<RequestAndIssunceOfLineDocumentsF002> filteredDetails = request.getDetails().stream()
						.filter(line -> !"YES".equals(line.getStatus())).collect(Collectors.toList());

				// Update the details of the existing request in the map
				uniqueRequests.get(request.getRequestId()).setDetails(filteredDetails);
			}

			// Convert the map values to a list
			List<RequestAndIssunceOfDocumentF002> finalList = new ArrayList<>(uniqueRequests.values());

			// Return the filtered list
			return new ResponseEntity<>(finalList, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

//				

//				SAVE

	public ResponseEntity<?> saveDistributionAndDesctruction(DistributionAndDestructionRecordF003 details,
			HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}
		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		// For Fetching Current Date
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = QAUtil.convertLocalDateTimeToDate(currentDate);
		DistributionAndDestructionRecordF003 savedRequest = null;
		try {

			if (details.getDistructionId() != null) {
				savedRequest = distributionAndDestructionRecordRepositoryF003.findById(details.getDistructionId())
						.orElseThrow(
								() -> new RuntimeException("Tool not found with id " + details.getDistructionId()));

				// Copy properties, ignoring certain fields
				String[] ignoreProps = { "distructionId", "createdBy", "createdAt", "qa_mr_status", "qa_mr_save_on",
						"qa_mr_save_by", "qa_mr_save_id", "qa_mr_submit_on", "qa_mr_submit_by", "qa_mr_submit_id",
						"qa_mr_sign" };
				BeanUtils.copyProperties(details, savedRequest, ignoreProps);
			} else {
				savedRequest = details;
			}
			if (role.equals("ROLE_MR") || role.equals("ROLE_DESIGNEE")) {
				// Save the main tool details
				savedRequest = distributionAndDestructionRecordRepositoryF003.save(savedRequest);

				// Save associated line items
				List<DistributionAndDestructionRecordLinesF003> lineItems = details.getDetails();
				if (lineItems != null) {
					for (DistributionAndDestructionRecordLinesF003 line : lineItems) {
						line.setDistructionId(savedRequest.getDistructionId());
						distributionAndDestructionRecordLinesRepositoryF003.save(line);
//						Long lineId = line.getRequestLineId();
//						Long requestId = line.getRequestId();
//
//						List<RequestAndIssunceOfLineDocumentsF002> requestIssuances = requestAndIssunceOfDocumentLinesRepository
//								.findByLineIdAndRequestId(lineId, requestId);
//
//						// Step 3: If matching records are found, update their status to 'YES'
//						if (!requestIssuances.isEmpty()) {
//							for (RequestAndIssunceOfLineDocumentsF002 requestIssuance : requestIssuances) {
//								requestIssuance.setStatus("YES"); // Update status if IDs match
//								requestAndIssunceOfDocumentLinesRepository.save(requestIssuance); // Save the
//																									// updated
//																									// status
//							}
//						}
//						

					}
				}

				savedRequest.setQa_mr_save_by(userName);
				savedRequest.setQa_mr_save_on(date);
				savedRequest.setQa_mr_save_id(userId);
				savedRequest.setQa_mr_status(QaAppConstants.mrDesigneeSaved);

				distributionAndDestructionRecordRepositoryF003.save(savedRequest);

			} else {
				return new ResponseEntity(new ApiResponse(false, role + " is not allowed to save details"),
						HttpStatus.BAD_REQUEST);
			}
		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "Unable to save details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
	}

	// Submit

	public ResponseEntity<?> submitDistributionAndDestruction(DistributionAndDestructionRecordF003 details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getDistructionId();

		DistributionAndDestructionRecordF003 checkObj = new DistributionAndDestructionRecordF003();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			//
//					  				if (details.getFormatNo() == null)
//					  					value = "formatNo";
//					  				if (details.getRevisionNumber() == null)
//					  					value = "revisionNo";
//					  				if (details.getFormatName() == null)
//					  					value = "formatName";
//					  				if (details.getDate() == null)
//					  					value = "date";
//					  				if (details.getMonth() == null)
//					  					value = "month";
//					  				if (details.getYear() == null)
//					  					value = "year";
//					  				if(details.getSopNumber() == null)
//					  					value ="SopNumber";
//					  				
//					  				
//					  				if (!"".equals(value)) {
//					  					return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
//					  							HttpStatus.BAD_REQUEST);
//					  				}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = distributionAndDestructionRecordRepositoryF003.findFormById(id);

				String[] IgnoreProps = { "distructionId", "createdBy", "createdAt", "qa_mr_status", "qa_mr_save_on",
						"qa_mr_save_by", "qa_mr_save_id", "qa_mr_submit_on", "qa_mr_submit_by", "qa_mr_submit_id",
						"qa_mr_sign" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getQa_mr_status().equals(QaAppConstants.qaMrApprovedStatus)) {
					if (role.equals("ROLE_MR") || role.equals("ROLE_DESIGNEE")) {

						distributionAndDestructionRecordRepositoryF003.save(checkObj);

						List<DistributionAndDestructionRecordLinesF003> list = details.getDetails();

						for (DistributionAndDestructionRecordLinesF003 detail : list) {
							detail.setDistructionId(checkObj.getDistructionId());
							distributionAndDestructionRecordLinesRepositoryF003.save(detail);

							Long lineId = detail.getLineId();
							Long requestId = detail.getRequestId();

							List<RequestAndIssunceOfLineDocumentsF002> requestIssuances = requestAndIssunceOfDocumentLinesRepository
									.findByLineIdAndRequestId(lineId, requestId);

							// Step 3: If matching records are found, update their status to 'YES'
							if (!requestIssuances.isEmpty()) {
								for (RequestAndIssunceOfLineDocumentsF002 requestIssuance : requestIssuances) {
									requestIssuance.setStatus("YES"); // Update status if IDs match
									requestAndIssunceOfDocumentLinesRepository.save(requestIssuance); // Save the
																										// updated
																										// status
								}
							}

						}

						checkObj.setDetails(list);

						checkObj.setQa_mr_submit_by(userName);
						checkObj.setQa_mr_submit_on(date);
						checkObj.setQa_mr_submit_id(userId);
						checkObj.setQa_mr_status(QaAppConstants.qaMrApprovedStatus);
						checkObj.setQa_mr_sign(userName);

						distributionAndDestructionRecordRepositoryF003.save(checkObj);

						// IMAGE

//					  							Optional<UserImageDetails> imageDetailsOpt = imageRepository
//					  									.fetchItemDetailsByUsername(userName);
						//
//					  							byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						//
//					  							checkObj.setOperator_signature_image(signature);
						//
//					  							bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

						DistributionAndDestructionRecordHistoryF003 rejectionReportHistory = new DistributionAndDestructionRecordHistoryF003();

						// getter setters fields & status

						rejectionReportHistory.setUnit(checkObj.getUnit()); // Set unit
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo()); // Set format number
						rejectionReportHistory.setFormatName(checkObj.getFormatName()); // Set format name
						rejectionReportHistory.setSopNumber(checkObj.getSopNumber()); // Set SOP number
						rejectionReportHistory.setRevisionNumber(checkObj.getRevisionNumber()); // Set revision number

						// ISSUANCE RECORD
						rejectionReportHistory.setDate(checkObj.getDate()); // Set date
						rejectionReportHistory.setMonth(checkObj.getMonth()); // Set month
						rejectionReportHistory.setYear(checkObj.getYear()); // Set year
//					  							rejectionReportHistory.setDepartment(checkObj.getDepartment());    // Set department
						//
//					  							// DOCUMENT DETAILS
//					  							rejectionReportHistory.setDocumentName(checkObj.getDocumentName());      // Set document name
//					  							rejectionReportHistory.setDocumentNo(checkObj.getDocumentNo());          // Set document number
//					  							rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());          // Set revision number
//					  							rejectionReportHistory.setTypeOfCopy(checkObj.getTypeOfCopy());          // Set type of copy
//					  							rejectionReportHistory.setNumberOfCopies(checkObj.getNumberOfCopies());  // Set number of copies
//					  							rejectionReportHistory.setDocumentGivenBy(checkObj.getDocumentGivenBy()); // Set document given by
//					  							rejectionReportHistory.setDocumentCollectedBy(checkObj.getDocumentCollectedBy()); // Set document collected by
						//
//					  							// DESTRUCTION RECORD
//					  							rejectionReportHistory.setNoOfCopiesReturned(checkObj.getNoOfCopiesReturned()); // Set number of copies returned
//					  							rejectionReportHistory.setReturnedByDateAndSign(checkObj.getReturnedByDateAndSign()); // Set returned by (date and signature)
//					  							rejectionReportHistory.setDestroyedByDateAndSign(checkObj.getDestroyedByDateAndSign()); // Set destroyed by (date and signature)
						;

						// status
						rejectionReportHistory.setQa_mr_submit_by(checkObj.getQa_mr_submit_by());
						rejectionReportHistory.setQa_mr_submit_id(checkObj.getQa_mr_submit_id());
						rejectionReportHistory.setQa_mr_submit_on(checkObj.getQa_mr_submit_on());
						rejectionReportHistory.setQa_mr_status(checkObj.getQa_mr_status());
						rejectionReportHistory.setQa_mr_sign(checkObj.getQa_mr_sign());
						rejectionReportHistory.setQa_mr_signature_image(checkObj.getQa_mr_signature_image());

						// version
						String date1 = rejectionReportHistory.getDate();

//					  							String cirNo = rejectionReportHistory.getCirNo();
						String month = rejectionReportHistory.getMonth();

						String year = rejectionReportHistory.getYear();

						int version = distributionAndDistructionRecordHistoryRespositoryF003
								.getMaximumVersion(date1, month, year).map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						distributionAndDistructionRecordHistoryRespositoryF003.save(rejectionReportHistory); // ONE
																												// HISTORY

						List<DistributionAndDestructionRecordLinesF003> historyMapList = checkObj.getDetails();

						for (DistributionAndDestructionRecordLinesF003 obj : historyMapList) {

							DistributionAndDestructionRecordLinesHistoryF003 objHistory = new DistributionAndDestructionRecordLinesHistoryF003();

							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setDistructionId(rejectionReportHistory.getDistructionId());
							distributionAndDestructionRecordLinesHistoryRepositoryF003.save(objHistory);

						}

						distributionAndDistructionRecordHistoryRespositoryF003.save(rejectionReportHistory);

						try {

//					  								padPunchingMailFunction.sendEmailToSupervisorF002(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_MR") && !role.equals("ROLE_DESIGNEE")) {
					return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				distributionAndDestructionRecordRepositoryF003.save(checkObj);

				List<DistributionAndDestructionRecordLinesF003> list = details.getDetails();

				for (DistributionAndDestructionRecordLinesF003 detail : list) {
					detail.setDistructionId(checkObj.getDistructionId());
					distributionAndDestructionRecordLinesRepositoryF003.save(detail);

					Long lineId = detail.getLineId();
					Long requestId = detail.getRequestId();

					List<RequestAndIssunceOfLineDocumentsF002> requestIssuances = requestAndIssunceOfDocumentLinesRepository
							.findByLineIdAndRequestId(lineId, requestId);

					// Step 3: If matching records are found, update their status to 'YES'
					if (!requestIssuances.isEmpty()) {
						for (RequestAndIssunceOfLineDocumentsF002 requestIssuance : requestIssuances) {
							requestIssuance.setStatus("YES"); // Update status if IDs match
							requestAndIssunceOfDocumentLinesRepository.save(requestIssuance); // Save the
																								// updated
																								// status
						}
					}
				}

				checkObj.setDetails(list);

				checkObj.setQa_mr_submit_by(userName);
				checkObj.setQa_mr_submit_on(date);
				checkObj.setQa_mr_submit_id(userId);
				checkObj.setQa_mr_status(QaAppConstants.qaMrApprovedStatus);
				checkObj.setQa_mr_sign(userName);

////					  					checkObj.setSecurity_status(AppConstants.waitingStatus);
////					  					checkObj.setDispatch_supervisor_status("");
//					  					checkObj.setQa_mr_status(AppConstants.waitingStatus);

				distributionAndDestructionRecordRepositoryF003.save(checkObj);

				// IMAGE

//					  					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
				//
//					  					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
				//
//					  					checkObj.setOperator_signature_image(signature);
				//
//					  					bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

				DistributionAndDestructionRecordHistoryF003 rejectionReportHistory = new DistributionAndDestructionRecordHistoryF003();

				// getter setters fields & status

				// getter setters fields & status

				rejectionReportHistory.setUnit(checkObj.getUnit()); // Set unit
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo()); // Set format number
				rejectionReportHistory.setFormatName(checkObj.getFormatName()); // Set format name
				rejectionReportHistory.setSopNumber(checkObj.getSopNumber()); // Set SOP number
				rejectionReportHistory.setRevisionNumber(checkObj.getRevisionNumber()); // Set revision number

				// ISSUANCE RECORD
				rejectionReportHistory.setDate(checkObj.getDate()); // Set date
				rejectionReportHistory.setMonth(checkObj.getMonth()); // Set month
				rejectionReportHistory.setYear(checkObj.getYear()); // Set year
//			  							rejectionReportHistory.setDepartment(checkObj.getDepartment());    // Set department
				//
//			  							// DOCUMENT DETAILS
//			  							rejectionReportHistory.setDocumentName(checkObj.getDocumentName());      // Set document name
//			  							rejectionReportHistory.setDocumentNo(checkObj.getDocumentNo());          // Set document number
//			  							rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());          // Set revision number
//			  							rejectionReportHistory.setTypeOfCopy(checkObj.getTypeOfCopy());          // Set type of copy
//			  							rejectionReportHistory.setNumberOfCopies(checkObj.getNumberOfCopies());  // Set number of copies
//			  							rejectionReportHistory.setDocumentGivenBy(checkObj.getDocumentGivenBy()); // Set document given by
//			  							rejectionReportHistory.setDocumentCollectedBy(checkObj.getDocumentCollectedBy()); // Set document collected by
				//
//			  							// DESTRUCTION RECORD
//			  							rejectionReportHistory.setNoOfCopiesReturned(checkObj.getNoOfCopiesReturned()); // Set number of copies returned
//			  							rejectionReportHistory.setReturnedByDateAndSign(checkObj.getReturnedByDateAndSign()); // Set returned by (date and signature)
//			  							rejectionReportHistory.setDestroyedByDateAndSign(checkObj.getDestroyedByDateAndSign()); // Set destroyed by (date and signature)
				;

				// status
				rejectionReportHistory.setQa_mr_submit_by(checkObj.getQa_mr_submit_by());
				rejectionReportHistory.setQa_mr_submit_id(checkObj.getQa_mr_submit_id());
				rejectionReportHistory.setQa_mr_submit_on(checkObj.getQa_mr_submit_on());
				rejectionReportHistory.setQa_mr_status(checkObj.getQa_mr_status());
				rejectionReportHistory.setQa_mr_sign(checkObj.getQa_mr_sign());
				rejectionReportHistory.setQa_mr_signature_image(checkObj.getQa_mr_signature_image());

				// version
				// version
				String date1 = rejectionReportHistory.getDate();
				String month = rejectionReportHistory.getMonth();

				String year = rejectionReportHistory.getYear();

				int version = distributionAndDistructionRecordHistoryRespositoryF003
						.getMaximumVersion(date1, month, year).map(temp -> temp + 1).orElse(1);

//					  					
//					  					int version = qaOnlineInspectionReportHistoryRepository
//					  						    .getMaximumVersion(date1, shift1, machineName, BmrNo, POrder)
//					  						    .map(maxVersion -> maxVersion + 1) // Increment the version by 1
//					  						    .orElse(1); // If no maximum version is found, start with version 1

				rejectionReportHistory.setVersion(version);

				distributionAndDistructionRecordHistoryRespositoryF003.save(rejectionReportHistory); // ONE HISTORY

				List<DistributionAndDestructionRecordLinesF003> historyMapList = checkObj.getDetails();

				for (DistributionAndDestructionRecordLinesF003 obj : historyMapList) {

					DistributionAndDestructionRecordLinesHistoryF003 objHistory = new DistributionAndDestructionRecordLinesHistoryF003();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setDistructionId(rejectionReportHistory.getDistructionId());
					distributionAndDestructionRecordLinesHistoryRepositoryF003.save(objHistory);

				}

				distributionAndDistructionRecordHistoryRespositoryF003.save(rejectionReportHistory);

				try {

//					  						padPunchingMailFunction.sendEmailToSupervisorF002(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
							HttpStatus.OK);
				}

			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, " Submitted Sucessfully"), HttpStatus.OK);

//					  			return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}
//				PRINT API

	public ResponseEntity<?> getByDistributionAndDistructionRecordPrint(String date, String month, String year) {
		try {

			List<DistributionAndDestructionRecordF003> list = distributionAndDestructionRecordRepositoryF003
					.printContainerInspectionReport(date, month, year);

			if (list == null || list.isEmpty()) {

//								list = new ArrayList<MetalDetectorCheckListF020>();
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// Param Based Get

	public ResponseEntity<?> getByDateDistributionAndDistructionRecord(String date, String month, String year) {
		try {

			List<DistributionAndDestructionRecordF003> list = distributionAndDestructionRecordRepositoryF003
					.getDetailsBaseParam(date, month, year);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// SUMMARY API

	public ResponseEntity<?> getDistributionAndDistructionRecordSummary(HttpServletRequest http) {

		List<DistributionAndDestructionRecordF003> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_MR") || userRole.equals("ROLE_DESIGNEE")) {

				details = distributionAndDestructionRecordRepositoryF003.qaMrDesigneeSummary();
			}

//								else if (userRole.equals("QA_MANAGER")
//										|| userRole.equals("ROLE_MR")) {
//
//									details = distributionAndDestructionRecordRepositoryF003.qaManagerAndMrSummmary();
//								} 
			else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

// ============================================== FINAL INSPECTION REPORT F037 =============================================

	// PDE Online Inspection Report 34
	public List<Map<String, Object>> getMachineNameLovFinalInspectionReport() {
		try {

			return finalInspectionReportRepositoryF037.getAllMachineName();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); // Log the error for debugging
			throw e;
		}

	}

	// BMR Number Lov

	public List<String> getAllBatchNumbersFinalInspectionReport() {
		try {
			// Attempt to fetch all batch numbers from the repository
			return finalInspectionReportRepositoryF037.getBmrNumberLovForFinalInspectionReport();
		} catch (Exception e) {
			// Log the exception for debugging purposes
			log.error("Error occurred while fetching batch numbers", e);

			// Log the exception for debugging purposes
			log.error("Error occurred while fetching batch numbers", e);

			// Return null in case of an error
			return null;

		}
	}

	// Getting the POrder Number LOV

	public List<String> findOrderNoByBmr(String batchNo) {
		try {
			// Try fetching the order numbers using the batch number
			return finalInspectionReportRepositoryF037.findOrderNoByBmr(batchNo);
		} catch (Exception e) {
			// Log the error message and stack trace
			log.error("Error occurred while fetching order numbers for batchNo: " + batchNo, e);

			// Return null or a default value in case of error
			return null;
		}
	}

	// PONo And Material

	public Map<String, String> getPoNoMaterialFinalInspectionReport(String pOrder) {
		List<Object[]> records;

		try {
			// Fetching records from the repository
			records = finalInspectionReportRepositoryF037.findPoNoAndMaterial(pOrder);

			// Create a map to hold the results
			Map<String, String> recordMap = new LinkedHashMap<>();

			if (records == null || records.isEmpty()) {
				recordMap.put("message", "No records found for the given POrder");
				return recordMap; // Return message if no records found
			}

			// Assuming you expect only one record
			Object[] record = records.get(0); // Get the first (and presumably only) result
			recordMap.put("pono", (String) record[0]);
			recordMap.put("porder", (String) record[1]);
			recordMap.put("itemcode", (String) record[2]);

			return recordMap; // This will return a JSON object

		} catch (Exception e) {
			// Log the error and return a message in the map
			e.printStackTrace();
			Map<String, String> errorMap = new HashMap<>();
			errorMap.put("error", "An error occurred while fetching the records");
			return errorMap;
		}
	}

	public List<Map<String, Object>> getPoNoMaterialFinalInspectionReportt(String pOrder) {
		List<Object[]> result = finalInspectionReportRepositoryF037.findPoNoAndMaterial(pOrder);
		List<Map<String, Object>> poMaterialList = new ArrayList<>();

		for (Object[] row : result) {
			if (row.length >= 2) { // Ensure that there are at least 2 columns in the result
				Map<String, Object> poMaterial = new HashMap<>();
				poMaterial.put("PoNo", row[0]);
				poMaterial.put("Itemcode", row[1]);
				poMaterialList.add(poMaterial);
			} else {
				log.error("Unexpected result size: " + row.length + " for POrder: " + pOrder);
			}
		}
		return poMaterialList;
	}

	// CustomerName and ProductDescription

	public Map<String, String> getCustomerNameANdProductDescFinalInspectionReport(String material) {
		List<Object[]> results = finalInspectionReportRepositoryF037.findCustomerNameAndProductDesc(material);
		Map<String, String> records = new HashMap<>();

		// Assuming you expect only one record
		if (!results.isEmpty()) {
			Object[] row = results.get(0); // Get the first (and presumably only) result
			String custName = (String) row[0]; // Assuming CUST_NAME is at index 0
			String matDesc = (String) row[1]; // Assuming MAT_DESC is at index 1
			records.put("customerName", custName); // You can name your key as per requirement
			records.put("productDesc", matDesc);
		}

		return records; // This will return a JSON object
	}

	// Save

	public ResponseEntity<?> saveFinalInspectionReportF037(FinalInspectionReportF037 details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		FinalInspectionReportF037 listObj = null;
		try {

			String missingField = "";

			// Mandatory fields check
			if (details.getFormatNo() == null)
				missingField = "formatNo";
			if (details.getRevisionNo() == null)
				missingField = "revisionNo";
			if (details.getFormatName() == null)
				missingField = "formatName";
			if (details.getDate() == null)
				missingField = "date";
			if (details.getShift() == null)
				missingField = "shift";
			if (details.getBmrNo() == null)
				missingField = "BmrNo";
//											if (details.getPOrder() == null)
//												missingField = "pOrder";

			if (!"".equals(missingField)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields: " + missingField),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			User user = userRepository.findUserByIdToActiveOrInactive(userId);

			String deptName = "";

			if (details.getFormatNo().equalsIgnoreCase("PH-QAD01/F-037")) {

				deptName = "QUALITY_ASSURANCE";

			} else if (details.getFormatNo().equalsIgnoreCase("PH-QAD01/F-038")) {

				deptName = "COTTON_BUDS";

			} else {
				deptName = "NA";
			}

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFinalInspectionId() != null) {

				listObj = finalInspectionReportRepositoryF037.findFormById(details.getFinalInspectionId());

				String[] IgnoreProps = { "inspectionId", "createdBy", "createdAt", "qa_inspector_status",
						"qa_inspector_save_on", "qa_inspector_save_by", "qa_inspector_save_id",
						"qa_inspector_submit_on", "qa_inspector_submit_by", "qa_inspector_submit_id",
						"qa_inspector_sign", "qa_mr_status", "qa_mr_submit_on", "qa_mr_submit_by", "qa_mr_submit_id",
						"qa_mr_sign" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_QA")) {

					if (listObj.getQa_inspector_status().equals(AppConstants.qaInsApprovedStatus)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					finalInspectionReportRepositoryF037.save(listObj);

//										List<QaOnlineInspectionList> list = details.getDetails();
//
//										for (QaOnlineInspectionList detail : list) {
//											detail.setInspectionId(listObj.getInspectionId());
//											qaOnlineInspectionListRepository.save(detail);
//										}
//
//										listObj.setDetails(list);

					listObj.setDeptName(deptName);
					listObj.setQa_inspector_save_by(userName);
					listObj.setQa_inspector_save_on(date);
					listObj.setQa_inspector_save_id(userId);
					listObj.setQa_inspector_status(AppConstants.qaInsSave);

					finalInspectionReportRepositoryF037.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + "cannot save details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (role.equals("ROLE_QA")) {

					listObj = details;

					finalInspectionReportRepositoryF037.save(listObj);

//										List<QaOnlineInspectionList> list = details.getDetails();
//
//										for (QaOnlineInspectionList detail : list) {
//											detail.setInspectionId(listObj.getInspectionId());
//											qaOnlineInspectionListRepository.save(detail);
//										}
//
//										listObj.setDetails(list);

					listObj.setDeptName(deptName);
					listObj.setQa_inspector_save_by(userName);
					listObj.setQa_inspector_save_on(date);
					listObj.setQa_inspector_save_id(userId);
					listObj.setQa_inspector_status(AppConstants.qaInsSave);

					finalInspectionReportRepositoryF037.save(listObj);

				} else {

					return new ResponseEntity(new ApiResponse(false, role + " cannot save details"),
							HttpStatus.BAD_REQUEST);

				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//							return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	// Submit

	public ResponseEntity<?> SubmitFinalInspectionReportF037(FinalInspectionReportF037 details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getFinalInspectionId();

//		User user = userRepository.findUserByIdToActiveOrInactive(userId);
//		Long deptId = user.getDepartmentId();
//		
//		String deptName = departmentRepository.getDeaprtmentById(deptId);

		FinalInspectionReportF037 checkObj = new FinalInspectionReportF037();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getDate() == null)
				value = "date";
			if (details.getShift() == null)
				value = "shift";
			if (details.getBmrNo() == null)
				value = "BmrNo";
			if (details.getPOrder() == null)
				value = "pOrder";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			String deptName = "";

			if (details.getFormatNo().equalsIgnoreCase("PH-QAD01/F-037")) {

				deptName = "QUALITY_ASSURANCE";

			} else if (details.getFormatNo().equalsIgnoreCase("PH-QAD01/F-038")) {

				deptName = "COTTON_BUDS";

			} else {
				deptName = "NA";
			}

			if (id != null) {

				checkObj = finalInspectionReportRepositoryF037.findFormById(id);

				String[] IgnoreProps = { "inspectionId", "createdBy", "createdAt", "qa_inspector_status",
						"qa_inspector_save_on", "qa_inspector_save_by", "qa_inspector_save_id",
						"qa_inspector_submit_on", "qa_inspector_submit_by", "qa_inspector_submit_id",
						"qa_inspector_sign", "qa_mr_status", "qa_mr_submit_on", "qa_mr_submit_by", "qa_mr_submit_id",
						"qa_mr_sign" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getQa_inspector_status().equals(AppConstants.qaInsApprovedStatus)
						|| checkObj.getQa_mr_status().equals(AppConstants.qaMrRejectedStatus)) {
					if (role.equals("ROLE_QA")) {

						finalInspectionReportRepositoryF037.save(checkObj);

//											List<QaOnlineInspectionList> list = details.getDetails();
//
//											for (QaOnlineInspectionList detail : list) {
//												detail.setInspectionId(checkObj.getInspectionId());
//												qaOnlineInspectionListRepository .save(detail);
//											}
//
//											checkObj.setDetails(list);

						checkObj.setDeptName(deptName);
						checkObj.setQa_inspector_submit_by(userName);
						checkObj.setQa_inspector_submit_on(date);
						checkObj.setQa_inspector_submit_id(userId);
						checkObj.setQa_inspector_status(AppConstants.qaInsApprovedStatus);
						checkObj.setQa_inspector_sign(userName);

						checkObj.setQa_mr_status(AppConstants.waitingStatus);

						finalInspectionReportRepositoryF037.save(checkObj);

						// IMAGE

//											Optional<UserImageDetails> imageDetailsOpt = imageRepository
//													.fetchItemDetailsByUsername(userName);
						//
//											byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						//
//											checkObj.setOperator_signature_image(signature);
						//
//											bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

						FinalInspectionReportHistoryF037 rejectionReportHistory = new FinalInspectionReportHistoryF037();

						// getter setters fields & status

						rejectionReportHistory.setFormatName(checkObj.getFormatName());
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
						rejectionReportHistory.setDeptName(checkObj.getDeptName());
						rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
						rejectionReportHistory.setRefSopNo(checkObj.getRefSopNo());
						rejectionReportHistory.setProductDescription(checkObj.getProductDescription());
						rejectionReportHistory.setBmrNo(checkObj.getBmrNo());
						rejectionReportHistory.setShift(checkObj.getShift());
						rejectionReportHistory.setCustomerName(checkObj.getCustomerName());
						rejectionReportHistory.setPOrder(checkObj.getPOrder());
						rejectionReportHistory.setTotalQantity(checkObj.getTotalQantity());
						rejectionReportHistory.setFirNo(checkObj.getFirNo());
						rejectionReportHistory.setDate(checkObj.getDate());
						rejectionReportHistory.setItemCode(checkObj.getItemCode());
						rejectionReportHistory.setFgNo(checkObj.getFgNo());
						rejectionReportHistory.setAqlSampleSize(checkObj.getAqlSampleSize());
						rejectionReportHistory.setLotNo(checkObj.getLotNo());
						rejectionReportHistory.setGeneralInspectionLevel(checkObj.getGeneralInspectionLevel());
						rejectionReportHistory.setQtyBagSpecification(checkObj.getQtyBagSpecification());
						rejectionReportHistory.setWeightBagSpecification(checkObj.getWeightBagSpecification());
						rejectionReportHistory.setFillingHeightSpecification(checkObj.getFillingHeightSpecification());
						rejectionReportHistory
								.setGsmWeightOfBallsSpecification(checkObj.getGsmWeightOfBallsSpecification());
						rejectionReportHistory
								.setSurfacePatternSpecification(checkObj.getSurfacePatternSpecification());
						rejectionReportHistory.setNoOfFoldsSpecification(checkObj.getNoOfFoldsSpecification());
						rejectionReportHistory.setMoistureSpecification(checkObj.getMoistureSpecification());
						rejectionReportHistory.setQtyBagSamplesize(checkObj.getQtyBagSamplesize());
						rejectionReportHistory.setWeightBagSamplesize(checkObj.getWeightBagSamplesize());
						rejectionReportHistory.setFillingHeightSamplesize(checkObj.getFillingHeightSamplesize());
						rejectionReportHistory.setGsmWeightOfBallsSamplesize(checkObj.getGsmWeightOfBallsSamplesize());
						rejectionReportHistory.setSurfacePatternSamplesize(checkObj.getSurfacePatternSamplesize());
						rejectionReportHistory.setNoOfFoldsSamplesize(checkObj.getNoOfFoldsSamplesize());
						rejectionReportHistory.setMoistureSamplesize(checkObj.getMoistureSamplesize());
						rejectionReportHistory.setQtyBagActualFindings(checkObj.getQtyBagActualFindings());
						rejectionReportHistory.setWeightBagActualFindings(checkObj.getWeightBagActualFindings());
						rejectionReportHistory
								.setFillingHeightActualFindings(checkObj.getFillingHeightActualFindings());
						rejectionReportHistory
								.setGsmWeightOfBallsActualFindings(checkObj.getGsmWeightOfBallsActualFindings());
						rejectionReportHistory
								.setSurfacePatternActualFindings(checkObj.getSurfacePatternActualFindings());
						rejectionReportHistory.setNoOfFoldsActualFindings(checkObj.getNoOfFoldsActualFindings());
						rejectionReportHistory.setMoistureActualFindings(checkObj.getMoistureActualFindings());
						rejectionReportHistory.setLesserQuantity(checkObj.getLesserQuantity());
						rejectionReportHistory.setIncorrectPackagingMaterial(checkObj.getIncorrectPackagingMaterial());
						rejectionReportHistory.setWrongMissingLotNumber(checkObj.getWrongMissingLotNumber());
						rejectionReportHistory.setMetalInsectContamination(checkObj.getMetalInsectContamination());
						rejectionReportHistory.setSignificantForeignMaterial(checkObj.getSignificantForeignMaterial());
						rejectionReportHistory.setIncorrectBarCodeOnBag(checkObj.getIncorrectBarCodeOnBag());
						rejectionReportHistory.setImproperShaperSize(checkObj.getImproperShaperSize());
						rejectionReportHistory.setMajorDiscoloration(checkObj.getMajorDiscoloration());
						rejectionReportHistory.setFoldedPads(checkObj.getFoldedPads());
						rejectionReportHistory.setDustContamination(checkObj.getDustContamination());
						rejectionReportHistory.setLowerFillingHeight(checkObj.getLowerFillingHeight());
						rejectionReportHistory.setImproperOpenDamagedSealing(checkObj.getImproperOpenDamagedSealing());
						rejectionReportHistory.setNoCottonAtEnds(checkObj.getNoCottonAtEnds());
						rejectionReportHistory.setMinorColourContamination(checkObj.getMinorColourContamination());
						rejectionReportHistory.setBlackContamination(checkObj.getBlackContamination());
						rejectionReportHistory.setLessGsm(checkObj.getLessGsm());
						rejectionReportHistory.setEdgeCondition(checkObj.getEdgeCondition());
						rejectionReportHistory.setHardBalls(checkObj.getHardBalls());
						rejectionReportHistory.setLessCotton(checkObj.getLessCotton());
						rejectionReportHistory
								.setCriticalTotalNoOfDefectObserved(checkObj.getCriticalTotalNoOfDefectObserved());
						rejectionReportHistory
								.setMajorTotalNoOfDefectObserved(checkObj.getMajorTotalNoOfDefectObserved());
						rejectionReportHistory
								.setMinorTotalNoOfDefectObserved(checkObj.getMinorTotalNoOfDefectObserved());
						rejectionReportHistory
								.setCriticalMaximumNoOfDefectObserved(checkObj.getCriticalMaximumNoOfDefectObserved());
						rejectionReportHistory
								.setMajorMaximumNoOfDefectObserved(checkObj.getMajorMaximumNoOfDefectObserved());
						rejectionReportHistory
								.setMinorMaximumNoOfDefectObserved(checkObj.getMinorMaximumNoOfDefectObserved());
						rejectionReportHistory.setLotStatus(checkObj.getLotStatus());
						rejectionReportHistory.setREMARK(checkObj.getREMARK());
						rejectionReportHistory.setReason(checkObj.getReason());
						rejectionReportHistory.setQa_inspector_status(checkObj.getQa_inspector_status());
						rejectionReportHistory.setQa_inspector_save_on(checkObj.getQa_inspector_save_on());
						rejectionReportHistory.setQa_inspector_save_by(checkObj.getQa_inspector_save_by());
						rejectionReportHistory.setQa_inspector_save_id(checkObj.getQa_inspector_save_id());
						rejectionReportHistory.setQa_inspector_submit_on(checkObj.getQa_inspector_submit_on());
						rejectionReportHistory.setQa_inspector_submit_by(checkObj.getQa_inspector_submit_by());
						rejectionReportHistory.setQa_inspector_submit_id(checkObj.getQa_inspector_submit_id());
						rejectionReportHistory.setQa_inspector_sign(checkObj.getQa_inspector_sign());
						rejectionReportHistory.setQa_mr_status(checkObj.getQa_mr_status());
						rejectionReportHistory.setQa_mr_submit_on(checkObj.getQa_mr_submit_on());
						rejectionReportHistory.setQa_mr_submit_by(checkObj.getQa_mr_submit_by());
						rejectionReportHistory.setQa_mr_submit_id(checkObj.getQa_mr_submit_id());
						rejectionReportHistory.setQa_mr_sign(checkObj.getQa_mr_sign());
						rejectionReportHistory.setRemarks(checkObj.getRemarks());

						// status
						rejectionReportHistory.setQa_inspector_submit_by(checkObj.getQa_inspector_submit_by());
						rejectionReportHistory.setQa_inspector_submit_id(checkObj.getQa_inspector_submit_id());
						rejectionReportHistory.setQa_inspector_submit_on(checkObj.getQa_inspector_submit_on());
						rejectionReportHistory.setQa_inspector_status(checkObj.getQa_inspector_status());
						rejectionReportHistory.setQa_inspector_sign(checkObj.getQa_inspector_sign());
						rejectionReportHistory
								.setQa_inspector_signature_image(checkObj.getQa_inspector_signature_image());

//											rejectionReportHistory.setProd_supervisor_status(checkObj.getProd_supervisor_status());
						rejectionReportHistory.setQa_mr_status(checkObj.getQa_mr_status());

						// version
						String date1 = rejectionReportHistory.getDate();

						String shift1 = rejectionReportHistory.getShift();

						String POrder = rejectionReportHistory.getPOrder();

						int version = finalInspectionReportHistoryRepository.getMaximumVersion(date1, shift1, POrder)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						finalInspectionReportHistoryRepository.save(rejectionReportHistory); // ONE HISTORY

//											List<QaOnlineInspectionList> historyMapList = checkObj.getDetails();
//
//											for (QaOnlineInspectionList obj : historyMapList) {
//
//												QaOnlineInspectionListHistory objHistory = new QaOnlineInspectionListHistory();
//
//												BeanUtils.copyProperties(obj, objHistory);
//												objHistory.setInspectionId(rejectionReportHistory.getInspectionId());
//												qaOnlineInspectionListHistoryRepository.save(objHistory);
//
//											}

						finalInspectionReportHistoryRepository.save(rejectionReportHistory);

						// MAIL
						try {

							qamailfunction.sendMailToQaManagerFinalInspectionReportF037(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_QA")) {
					return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				finalInspectionReportRepositoryF037.save(checkObj);

//									List<QaOnlineInspectionList> list = details.getDetails();
//
//									for (QaOnlineInspectionList detail : list) {
//										detail.setInspectionId(checkObj.getInspectionId());
//										qaOnlineInspectionListRepository.save(detail);
//									}
//
//									checkObj.setDetails(list);

				checkObj.setDeptName(deptName);
				checkObj.setQa_inspector_submit_by(userName);
				checkObj.setQa_inspector_submit_on(date);
				checkObj.setQa_inspector_submit_id(userId);
				checkObj.setQa_inspector_status(AppConstants.qaInsApprovedStatus);
				checkObj.setQa_inspector_sign(userName);

				checkObj.setQa_mr_status(AppConstants.waitingStatus);

				finalInspectionReportRepositoryF037.save(checkObj);

				// IMAGE

//									Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
				//
//									byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
				//
//									checkObj.setOperator_signature_image(signature);
				//
//									bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

				FinalInspectionReportHistoryF037 rejectionReportHistory = new FinalInspectionReportHistoryF037();

				// getter setters fields & status

				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setDeptName(checkObj.getDeptName());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setRefSopNo(checkObj.getRefSopNo());
				rejectionReportHistory.setProductDescription(checkObj.getProductDescription());
				rejectionReportHistory.setBmrNo(checkObj.getBmrNo());
				rejectionReportHistory.setShift(checkObj.getShift());
				rejectionReportHistory.setCustomerName(checkObj.getCustomerName());
				rejectionReportHistory.setPOrder(checkObj.getPOrder());
				rejectionReportHistory.setTotalQantity(checkObj.getTotalQantity());
				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setItemCode(checkObj.getItemCode());
				rejectionReportHistory.setFirNo(checkObj.getFirNo());
				rejectionReportHistory.setFgNo(checkObj.getFgNo());
				rejectionReportHistory.setAqlSampleSize(checkObj.getAqlSampleSize());
				rejectionReportHistory.setLotNo(checkObj.getLotNo());
				rejectionReportHistory.setGeneralInspectionLevel(checkObj.getGeneralInspectionLevel());
				rejectionReportHistory.setQtyBagSpecification(checkObj.getQtyBagSpecification());
				rejectionReportHistory.setWeightBagSpecification(checkObj.getWeightBagSpecification());
				rejectionReportHistory.setFillingHeightSpecification(checkObj.getFillingHeightSpecification());
				rejectionReportHistory.setGsmWeightOfBallsSpecification(checkObj.getGsmWeightOfBallsSpecification());
				rejectionReportHistory.setSurfacePatternSpecification(checkObj.getSurfacePatternSpecification());
				rejectionReportHistory.setNoOfFoldsSpecification(checkObj.getNoOfFoldsSpecification());
				rejectionReportHistory.setMoistureSpecification(checkObj.getMoistureSpecification());
				rejectionReportHistory.setQtyBagSamplesize(checkObj.getQtyBagSamplesize());
				rejectionReportHistory.setWeightBagSamplesize(checkObj.getWeightBagSamplesize());
				rejectionReportHistory.setFillingHeightSamplesize(checkObj.getFillingHeightSamplesize());
				rejectionReportHistory.setGsmWeightOfBallsSamplesize(checkObj.getGsmWeightOfBallsSamplesize());
				rejectionReportHistory.setSurfacePatternSamplesize(checkObj.getSurfacePatternSamplesize());
				rejectionReportHistory.setNoOfFoldsSamplesize(checkObj.getNoOfFoldsSamplesize());
				rejectionReportHistory.setMoistureSamplesize(checkObj.getMoistureSamplesize());
				rejectionReportHistory.setQtyBagActualFindings(checkObj.getQtyBagActualFindings());
				rejectionReportHistory.setWeightBagActualFindings(checkObj.getWeightBagActualFindings());
				rejectionReportHistory.setFillingHeightActualFindings(checkObj.getFillingHeightActualFindings());
				rejectionReportHistory.setGsmWeightOfBallsActualFindings(checkObj.getGsmWeightOfBallsActualFindings());
				rejectionReportHistory.setSurfacePatternActualFindings(checkObj.getSurfacePatternActualFindings());
				rejectionReportHistory.setNoOfFoldsActualFindings(checkObj.getNoOfFoldsActualFindings());
				rejectionReportHistory.setMoistureActualFindings(checkObj.getMoistureActualFindings());
				rejectionReportHistory.setLesserQuantity(checkObj.getLesserQuantity());
				rejectionReportHistory.setIncorrectPackagingMaterial(checkObj.getIncorrectPackagingMaterial());
				rejectionReportHistory.setWrongMissingLotNumber(checkObj.getWrongMissingLotNumber());
				rejectionReportHistory.setMetalInsectContamination(checkObj.getMetalInsectContamination());
				rejectionReportHistory.setSignificantForeignMaterial(checkObj.getSignificantForeignMaterial());
				rejectionReportHistory.setIncorrectBarCodeOnBag(checkObj.getIncorrectBarCodeOnBag());
				rejectionReportHistory.setImproperShaperSize(checkObj.getImproperShaperSize());
				rejectionReportHistory.setMajorDiscoloration(checkObj.getMajorDiscoloration());
				rejectionReportHistory.setFoldedPads(checkObj.getFoldedPads());
				rejectionReportHistory.setDustContamination(checkObj.getDustContamination());
				rejectionReportHistory.setLowerFillingHeight(checkObj.getLowerFillingHeight());
				rejectionReportHistory.setImproperOpenDamagedSealing(checkObj.getImproperOpenDamagedSealing());
				rejectionReportHistory.setNoCottonAtEnds(checkObj.getNoCottonAtEnds());
				rejectionReportHistory.setMinorColourContamination(checkObj.getMinorColourContamination());
				rejectionReportHistory.setBlackContamination(checkObj.getBlackContamination());
				rejectionReportHistory.setLessGsm(checkObj.getLessGsm());
				rejectionReportHistory.setEdgeCondition(checkObj.getEdgeCondition());
				rejectionReportHistory.setHardBalls(checkObj.getHardBalls());
				rejectionReportHistory.setLessCotton(checkObj.getLessCotton());
				rejectionReportHistory
						.setCriticalTotalNoOfDefectObserved(checkObj.getCriticalTotalNoOfDefectObserved());
				rejectionReportHistory.setMajorTotalNoOfDefectObserved(checkObj.getMajorTotalNoOfDefectObserved());
				rejectionReportHistory.setMinorTotalNoOfDefectObserved(checkObj.getMinorTotalNoOfDefectObserved());
				rejectionReportHistory
						.setCriticalMaximumNoOfDefectObserved(checkObj.getCriticalMaximumNoOfDefectObserved());
				rejectionReportHistory.setMajorMaximumNoOfDefectObserved(checkObj.getMajorMaximumNoOfDefectObserved());
				rejectionReportHistory.setMinorMaximumNoOfDefectObserved(checkObj.getMinorMaximumNoOfDefectObserved());
				rejectionReportHistory.setLotStatus(checkObj.getLotStatus());
				rejectionReportHistory.setREMARK(checkObj.getREMARK());
				rejectionReportHistory.setReason(checkObj.getReason());
				rejectionReportHistory.setQa_inspector_status(checkObj.getQa_inspector_status());
				rejectionReportHistory.setQa_inspector_save_on(checkObj.getQa_inspector_save_on());
				rejectionReportHistory.setQa_inspector_save_by(checkObj.getQa_inspector_save_by());
				rejectionReportHistory.setQa_inspector_save_id(checkObj.getQa_inspector_save_id());
				rejectionReportHistory.setQa_inspector_submit_on(checkObj.getQa_inspector_submit_on());
				rejectionReportHistory.setQa_inspector_submit_by(checkObj.getQa_inspector_submit_by());
				rejectionReportHistory.setQa_inspector_submit_id(checkObj.getQa_inspector_submit_id());
				rejectionReportHistory.setQa_inspector_sign(checkObj.getQa_inspector_sign());
				rejectionReportHistory.setQa_mr_status(checkObj.getQa_mr_status());
				rejectionReportHistory.setQa_mr_submit_on(checkObj.getQa_mr_submit_on());
				rejectionReportHistory.setQa_mr_submit_by(checkObj.getQa_mr_submit_by());
				rejectionReportHistory.setQa_mr_submit_id(checkObj.getQa_mr_submit_id());
				rejectionReportHistory.setQa_mr_sign(checkObj.getQa_mr_sign());
				rejectionReportHistory.setRemarks(checkObj.getRemarks());

				// status
				rejectionReportHistory.setQa_inspector_submit_by(checkObj.getQa_inspector_submit_by());
				rejectionReportHistory.setQa_inspector_submit_id(checkObj.getQa_inspector_submit_id());
				rejectionReportHistory.setQa_inspector_submit_on(checkObj.getQa_inspector_submit_on());
				rejectionReportHistory.setQa_inspector_status(checkObj.getQa_inspector_status());
				rejectionReportHistory.setQa_inspector_sign(checkObj.getQa_inspector_sign());
				rejectionReportHistory.setQa_inspector_signature_image(checkObj.getQa_inspector_signature_image());

//									rejectionReportHistory.setProd_supervisor_status(checkObj.getProd_supervisor_status());
				rejectionReportHistory.setQa_mr_status(checkObj.getQa_mr_status());

				// version
				// version
				String date1 = rejectionReportHistory.getDate();

				String shift1 = rejectionReportHistory.getShift();

				String POrder = rejectionReportHistory.getPOrder();

				int version = finalInspectionReportHistoryRepository.getMaximumVersion(date1, shift1, POrder)
						.map(temp -> temp + 1).orElse(1);

//									
//									int version = qaOnlineInspectionReportHistoryRepository
//										    .getMaximumVersion(date1, shift1, machineName, BmrNo, POrder)
//										    .map(maxVersion -> maxVersion + 1) // Increment the version by 1
//										    .orElse(1); // If no maximum version is found, start with version 1

				rejectionReportHistory.setVersion(version);

				finalInspectionReportHistoryRepository.save(rejectionReportHistory); // ONE HISTORY

//									List<QaOnlineInspectionList> historyMapList = checkObj.getDetails();
//
//									for (QaOnlineInspectionList obj : historyMapList) {
//
//										QaOnlineInspectionListHistory objHistory = new QaOnlineInspectionListHistory();
//
//										BeanUtils.copyProperties(obj, objHistory);
//										objHistory.setInspectionId(rejectionReportHistory.getInspectionId());
//										qaOnlineInspectionListHistoryRepository.save(objHistory);
//
//									}

				finalInspectionReportHistoryRepository.save(rejectionReportHistory);

				// MAIL
				try {

					qamailfunction.sendMailToQaManagerFinalInspectionReportF037(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
							HttpStatus.OK);
				}
			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Operator Submitted Sucessfully"), HttpStatus.OK);

//							return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	// APPROVE OR REJECT

	public ResponseEntity<?> approveRejectFinalInspectionReport(ApproveResponse approvalResponse,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		FinalInspectionReportF037 Obj = null;

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);

		// Fetching current date
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

		try {
			// Fetching the incidence object by ID
			Obj = finalInspectionReportRepositoryF037.findById(approvalResponse.getId())
					.orElseThrow(() -> new RuntimeException("Report not found with id " + approvalResponse.getId()));
			;

			// Fetching the current status of the HOD and QA Manager
			String qaInspectorStatus = Obj.getQa_inspector_status();

			String qaManagerStatus = Obj.getQa_mr_status();

			String status = "";
			FinalInspectionReportHistoryF037 objHistory = new FinalInspectionReportHistoryF037();
			// First level of approval/rejection by QA Manager
			if (qaInspectorStatus.equalsIgnoreCase(AppConstants.qaInsApprovedStatus)
					&& qaManagerStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					String reason = approvalResponse.getRemarks();
					objHistory = finalInspectionReportHistoryRepository.fetchLastSubmittedRecord(Obj.getDate(),
							Obj.getShift(), Obj.getPOrder());
					if (approvalResponse.getStatus().equals("Approve")) {
						Obj.setQa_mr_status(QaAppConstants.qaMrApprovedStatus);
						objHistory.setQa_mr_status(QaAppConstants.qaMrApprovedStatus);
						status = "Approved";
					} else if (approvalResponse.getStatus().equals("Reject")) {
						Obj.setReason(reason);
						Obj.setQa_mr_status(QaAppConstants.qaMrRejectedStatus);
						objHistory.setReason(reason);
						objHistory.setQa_mr_status(QaAppConstants.qaMrRejectedStatus);
						status = "Rejected";
					}

					Obj.setQa_mr_submit_on(date);
					Obj.setQa_mr_submit_by(userName);
					Obj.setQa_mr_submit_id(userId);
					Obj.setQa_mr_sign(userName);
					// Save the updated incidence object
					finalInspectionReportRepositoryF037.save(Obj);
					// History
					objHistory.setQa_mr_submit_on(date);
					objHistory.setQa_mr_submit_by(userName);
					objHistory.setQa_mr_submit_id(userId);
					objHistory.setQa_mr_sign(userName);
					// Save the updated incidence object
					finalInspectionReportHistoryRepository.save(objHistory);

					return new ResponseEntity<>(new ApiResponse(true, "QA Manager " + status + " successfully"),
							HttpStatus.OK);

				} else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to approve/reject"),
							HttpStatus.FORBIDDEN);
				}

			} else {
				return new ResponseEntity<>(
						new ApiResponse(false, "Invalid status or no pending approval for this user"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			log.error("Unable to approve/reject List Of Sharp Tools", e);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/reject: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	// FOR PRINT API

	public ResponseEntity<?> getByFinalInspectionReportPrint(String date, String shift, String bmrNo, String pOrder,
			String formatNo, HttpServletRequest http) {

		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

		String userName = userRepository.getUserName(userId);

		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

		String deptName = "";

		if (formatNo.equalsIgnoreCase("PH-QAD01/F-037")) {

			deptName = "QUALITY_ASSURANCE";

		} else if (formatNo.equalsIgnoreCase("PH-QAD01/F-038")) {

			deptName = "COTTON_BUDS";

		} else {
			deptName = "NA";
		}

		try {

			List<FinalInspectionReportF037> list = finalInspectionReportRepositoryF037.printFinalInspectionReport(date,
					shift, bmrNo, pOrder, deptName);

			if (list == null || list.isEmpty()) {

//										list = new ArrayList<MetalDetectorCheckListF020>();
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// Param Based Get

	public ResponseEntity<?> getByParamFinalInspectionRecord(String date, String shift, String pOrder, String bmrNo,
			String formatNo, HttpServletRequest http) {

		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

		String userName = userRepository.getUserName(userId);

		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

		String deptName = "";

		if (formatNo.equalsIgnoreCase("PH-QAD01/F-037")) {

			deptName = "QUALITY_ASSURANCE";

		} else if (formatNo.equalsIgnoreCase("PH-QAD01/F-038")) {

			deptName = "COTTON_BUDS";

		} else {
			deptName = "NA";
		}

		try {

			List<FinalInspectionReportF037> list = finalInspectionReportRepositoryF037.getDetailsBaseParam(date, shift,
					pOrder, bmrNo, deptName);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// SUMMARY

	// SUMMARY API

	public ResponseEntity<?> getFinalInspectionReportSummary(String formatNo, HttpServletRequest http) {

		List<FinalInspectionReportSummaryDto> details = null;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			User user = userRepository.findUserByIdToActiveOrInactive(userId);

			String deptName = "";

			if (formatNo.equalsIgnoreCase("PH-QAD01/F-037")) {

				deptName = "QUALITY_ASSURANCE";

			} else if (formatNo.equalsIgnoreCase("PH-QAD01/F-038")) {

				deptName = "COTTON_BUDS";

			} else {
				deptName = "NA";
			}

			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_QA")) {

				details = finalInspectionReportRepositoryF037.getFinalInspectionSummary(deptName);
			}

			else if (userRole.equals("QA_MANAGER") || userRole.equals("ROLE_DESIGNEE")) {

				details = finalInspectionReportRepositoryF037.getMrSummary(deptName);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

//	========================================== PRODUCT DISPOSITION LOG BOOK ===============================================

	// Save

	public ResponseEntity<?> saveProductDispositionLogBook(ProductDispositionLogBookF049 details,
			HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		ProductDispositionLogBookF049 listObj = null;
		try {

			String missingField = "";
//
//			// Mandatory fields check
//			if (details.getFormatNo() == null)
//				missingField = "formatNo";
//			if (details.getRevisionNo() == null)
//				missingField = "revisionNo";
//			if (details.getFormatName() == null)
//				missingField = "formatName";
//			if (details.getDate() == null)
//				missingField = "date";
//			if (details.getCirNo() == null)
//				missingField = "cirNo";

			if (!"".equals(missingField)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields: " + missingField),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getProductId() != null) {

				listObj = productDispositionLogBookRepositoryF049.findFormById(details.getProductId());

				String[] IgnoreProps = { "productId", "createdBy", "createdAt", "qa_inspector_status",
						"qa_inspector_save_on", "qa_inspector_save_by", "qa_inspector_save_id",
						"qa_inspector_submit_on", "qa_inspector_submit_by", "qa_inspector_submit_id",
						"qa_inspector_sign", "qa_mr_status", "qa_mr_submit_on", "qa_mr_submit_by", "qa_mr_submit_id",
						"qa_mr_sign" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_QA")) {

//					if (listObj.getQa_inspector_status().equals(QaAppConstants.qaInspectorSaved)) {
//						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
//								HttpStatus.BAD_REQUEST);
//					}

					productDispositionLogBookRepositoryF049.save(listObj);

					List<ProductDispositionLogBookLineDetails> list = details.getDetails();

					for (ProductDispositionLogBookLineDetails detail : list) {
						detail.setProductId(listObj.getProductId());
						productDispositionLogBookLineDetailsRepository.save(detail);
					}

					listObj.setDetails(list);

					listObj.setQa_inspector_save_by(userName);
					listObj.setQa_inspector_save_on(date);
					listObj.setQa_inspector_save_id(userId);
					listObj.setQa_inspector_status(QaAppConstants.qaInspectorSaved);

					productDispositionLogBookRepositoryF049.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + "cannot save details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (role.equals("ROLE_QA")) {

					listObj = details;

					productDispositionLogBookRepositoryF049.save(listObj);

					List<ProductDispositionLogBookLineDetails> list = details.getDetails();

					for (ProductDispositionLogBookLineDetails detail : list) {
						detail.setProductId(listObj.getProductId());
						productDispositionLogBookLineDetailsRepository.save(detail);
					}

					listObj.setDetails(list);

					listObj.setQa_inspector_save_by(userName);
					listObj.setQa_inspector_save_on(date);
					listObj.setQa_inspector_save_id(userId);
					listObj.setQa_inspector_status(QaAppConstants.qaInspectorSaved);

					productDispositionLogBookRepositoryF049.save(listObj);

				} else {

					return new ResponseEntity(new ApiResponse(false, role + " cannot save details"),
							HttpStatus.BAD_REQUEST);

				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//			return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	// Submit

	public ResponseEntity<?> submitProductDispostionLogBook(ProductDispositionLogBookF049 details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getProductId();

		ProductDispositionLogBookF049 checkObj = new ProductDispositionLogBookF049();

		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

		String userName = userRepository.getUserName(userId);

		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

//				if (details.getFormatNo() == null)
//					value = "formatNo";
//				if (details.getRevisionNo() == null)
//					value = "revisionNo";
//				if (details.getFormatName() == null)
//					value = "formatName";
//				if (details.getDate() == null)
//					value = "date";
//				if (details.getCirNo() == null)
//					value = "cirNo";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

//					Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			//
//					String userName = userRepository.getUserName(userId);
			//
//					String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = productDispositionLogBookRepositoryF049.findFormById(id);

				String[] IgnoreProps = { "productId", "createdBy", "createdAt", "qa_inspector_status",
						"qa_inspector_save_on", "qa_inspector_save_by", "qa_inspector_save_id",
						"qa_inspector_submit_on", "qa_inspector_submit_by", "qa_inspector_submit_id",
						"qa_inspector_sign", "qa_mr_status", "qa_mr_submit_on", "qa_mr_submit_by", "qa_mr_submit_id",
						"qa_mr_sign" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getQa_inspector_status().equals(QaAppConstants.qaInspectorApprove)
						|| checkObj.getQa_mr_status().equals(AppConstants.qaMrRejectedStatus)) {
					if (role.equals("ROLE_QA")) {

						productDispositionLogBookRepositoryF049.save(checkObj);

						List<ProductDispositionLogBookLineDetails> list = details.getDetails();

						for (ProductDispositionLogBookLineDetails detail : list) {
							detail.setProductId(checkObj.getProductId());
							productDispositionLogBookLineDetailsRepository.save(detail);
						}

						checkObj.setDetails(list);

						checkObj.setQa_inspector_submit_by(userName);
						checkObj.setQa_inspector_submit_on(date);
						checkObj.setQa_inspector_submit_id(userId);
						checkObj.setQa_inspector_status(QaAppConstants.qaInspectorApprove);
						checkObj.setQa_inspector_sign(userName);

						checkObj.setQa_mr_status(AppConstants.waitingStatus);

						productDispositionLogBookRepositoryF049.save(checkObj);

						// IMAGE

//								Optional<UserImageDetails> imageDetailsOpt = imageRepository
//										.fetchItemDetailsByUsername(userName);
						//
//								byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						//
//								checkObj.setOperator_signature_image(signature);
						//
//								bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

						ProductDispositionLogBookHistoryF049 rejectionReportHistory = new ProductDispositionLogBookHistoryF049();

						// getter setters fields & status

						rejectionReportHistory.setUnit(checkObj.getUnit());
						rejectionReportHistory.setFormatName(checkObj.getFormatName());
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
						rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
						rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
						rejectionReportHistory.setDate(checkObj.getDate());
						rejectionReportHistory.setMonth(checkObj.getMonth());
						rejectionReportHistory.setYear(checkObj.getYear());
						rejectionReportHistory.setReason(checkObj.getReason());

						// status
						rejectionReportHistory.setQa_inspector_submit_by(checkObj.getQa_inspector_submit_by());
						rejectionReportHistory.setQa_inspector_submit_id(checkObj.getQa_inspector_submit_id());
						rejectionReportHistory.setQa_inspector_submit_on(checkObj.getQa_inspector_submit_on());
						rejectionReportHistory.setQa_inspector_status(checkObj.getQa_inspector_status());
						rejectionReportHistory.setQa_inspector_sign(checkObj.getQa_inspector_sign());
						rejectionReportHistory
								.setQa_inspector_signature_image(checkObj.getQa_inspector_signature_image());

						rejectionReportHistory.setQa_mr_status(checkObj.getQa_mr_status());

						// version
						String date1 = rejectionReportHistory.getDate();

						int version = productDispositionLogBookHistoryRepository.getMaximumVersion(date1)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						productDispositionLogBookHistoryRepository.save(rejectionReportHistory); // ONE HISTORY

						List<ProductDispositionLogBookLineDetails> historyMapList = checkObj.getDetails();

						for (ProductDispositionLogBookLineDetails obj : historyMapList) {

							ProductDispositionLogBookHistoryLineDetailsF049 objHistory = new ProductDispositionLogBookHistoryLineDetailsF049();

							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setHistoryId(rejectionReportHistory.getHistoryId());
							productDispositionLogBookLinesHistoryRepository.save(objHistory);

						}

						productDispositionLogBookHistoryRepository.save(rejectionReportHistory);

						// MAIL
						try {

							qamailfunction.sendMailToQaManagerRoleDesigneeProductDisposition(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_QA")) {
					return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				productDispositionLogBookRepositoryF049.save(checkObj);

				List<ProductDispositionLogBookLineDetails> list = details.getDetails();

				for (ProductDispositionLogBookLineDetails detail : list) {
					detail.setProductId(checkObj.getProductId());
					productDispositionLogBookLineDetailsRepository.save(detail);
				}

				checkObj.setDetails(list);

				checkObj.setQa_inspector_submit_by(userName);
				checkObj.setQa_inspector_submit_on(date);
				checkObj.setQa_inspector_submit_id(userId);
				checkObj.setQa_inspector_status(QaAppConstants.qaInspectorApprove);
				checkObj.setQa_inspector_sign(userName);

				checkObj.setQa_mr_status(AppConstants.waitingStatus);

				productDispositionLogBookRepositoryF049.save(checkObj);

				// IMAGE

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
				//
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
				//
//						checkObj.setOperator_signature_image(signature);
				//
//						bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

				ProductDispositionLogBookHistoryF049 rejectionReportHistory = new ProductDispositionLogBookHistoryF049();

				// getter setters fields & status

				rejectionReportHistory.setUnit(checkObj.getUnit());
				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setMonth(checkObj.getMonth());
				rejectionReportHistory.setYear(checkObj.getYear());
				rejectionReportHistory.setReason(checkObj.getReason());

				// status
				rejectionReportHistory.setQa_inspector_submit_by(checkObj.getQa_inspector_submit_by());
				rejectionReportHistory.setQa_inspector_submit_id(checkObj.getQa_inspector_submit_id());
				rejectionReportHistory.setQa_inspector_submit_on(checkObj.getQa_inspector_submit_on());
				rejectionReportHistory.setQa_inspector_status(checkObj.getQa_inspector_status());
				rejectionReportHistory.setQa_inspector_sign(checkObj.getQa_inspector_sign());
				rejectionReportHistory.setQa_inspector_signature_image(checkObj.getQa_inspector_signature_image());

				rejectionReportHistory.setQa_mr_status(checkObj.getQa_mr_status());

				// version
				// version
				String date1 = rejectionReportHistory.getDate();

				int version = productDispositionLogBookHistoryRepository.getMaximumVersion(date1).map(temp -> temp + 1)
						.orElse(1);

//						
//						int version = qaOnlineInspectionReportHistoryRepository
//							    .getMaximumVersion(date1, shift1, machineName, BmrNo, POrder)
//							    .map(maxVersion -> maxVersion + 1) // Increment the version by 1
//							    .orElse(1); // If no maximum version is found, start with version 1

				rejectionReportHistory.setVersion(version);

				productDispositionLogBookHistoryRepository.save(rejectionReportHistory); // ONE HISTORY

				List<ProductDispositionLogBookLineDetails> historyMapList = checkObj.getDetails();

				for (ProductDispositionLogBookLineDetails obj : historyMapList) {

					ProductDispositionLogBookHistoryLineDetailsF049 objHistory = new ProductDispositionLogBookHistoryLineDetailsF049();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setHistoryId(rejectionReportHistory.getHistoryId());
					productDispositionLogBookLinesHistoryRepository.save(objHistory);

				}

				productDispositionLogBookHistoryRepository.save(rejectionReportHistory);

				// MAIL
				try {

					qamailfunction.sendMailToQaManagerRoleDesigneeProductDisposition(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
							HttpStatus.OK);
				}

			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, role + "Submitted Sucessfully"), HttpStatus.OK);

//				return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	// APPROVE OR REJECT

	public ResponseEntity<?> approveRejectProductDispositionLogBook(ApproveResponse approvalResponse,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		ProductDispositionLogBookF049 Obj = null;

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);

		// Fetching current date
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

		try {
			// Fetching the incidence object by ID
			Obj = productDispositionLogBookRepositoryF049.findById(approvalResponse.getId())
					.orElseThrow(() -> new RuntimeException("Report not found with id " + approvalResponse.getId()));
			;

			// Fetching the current status of the HOD and QA Manager
			String qaInspectorStatus = Obj.getQa_inspector_status();

			String qaManagerStatus = Obj.getQa_mr_status();

			String status = "";
			ProductDispositionLogBookHistoryF049 objHistory = new ProductDispositionLogBookHistoryF049();
			// First level of approval/rejection by QA Manager
			if (qaInspectorStatus.equalsIgnoreCase(QaAppConstants.qaInspectorApprove)
					&& qaManagerStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_MR")
						|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					String reason = approvalResponse.getRemarks();
					objHistory = productDispositionLogBookHistoryRepository.fetchLastSubmittedRecord(Obj.getDate());
					if (approvalResponse.getStatus().equals("Approve")) {
						Obj.setQa_mr_status(QaAppConstants.qaMrApprovedStatus);
						objHistory.setQa_mr_status(QaAppConstants.qaMrApprovedStatus);
						status = "Approved";
					} else if (approvalResponse.getStatus().equals("Reject")) {
						Obj.setReason(reason);
						Obj.setQa_mr_status(QaAppConstants.qaMrRejectedStatus);
						objHistory.setReason(reason);
						objHistory.setQa_mr_status(QaAppConstants.qaMrRejectedStatus);
						status = "Rejected";
					}

					Obj.setQa_mr_submit_on(date);
					Obj.setQa_mr_submit_by(userName);
					Obj.setQa_mr_submit_id(userId);
					Obj.setQa_mr_sign(userName);
					// Save the updated incidence object
					productDispositionLogBookRepositoryF049.save(Obj);
					// History
					objHistory.setQa_mr_submit_on(date);
					objHistory.setQa_mr_submit_by(userName);
					objHistory.setQa_mr_submit_id(userId);
					objHistory.setQa_mr_sign(userName);
					// Save the updated incidence object
					productDispositionLogBookHistoryRepository.save(objHistory);

					return new ResponseEntity<>(new ApiResponse(true, "QA Manager " + status + " successfully"),
							HttpStatus.OK);

				} else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to approve/reject"),
							HttpStatus.FORBIDDEN);
				}

			} else {
				return new ResponseEntity<>(
						new ApiResponse(false, "Invalid status or no pending approval for this user"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			log.error("Unable to approve/reject List Of Sharp Tools", e);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/reject: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

//		PRINT API

	public ResponseEntity<?> getByProductDispositionLogBookPrint(String date, String month, String year) {
		try {

			List<ProductDispositionLogBookF049> list = productDispositionLogBookRepositoryF049
					.printProductDispositionLogBookReport(date, month, year);

			if (list == null || list.isEmpty()) {

//						list = new ArrayList<MetalDetectorCheckListF020>();
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

//Param Based Get

	public ResponseEntity<?> getByParamProductDispositionRecord(String date) {
		try {

			List<ProductDispositionLogBookF049> list = productDispositionLogBookRepositoryF049
					.getDetailsBaseParam(date);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

//SUMMARY

	// SUMMARY API

	public ResponseEntity<?> getProductDispositionLogBookSummary(HttpServletRequest http) {

		List<ProductDispositionLogBookF049> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_QA")) {

				details = productDispositionLogBookRepositoryF049.qaInspectorSummary();
			}

			else if (userRole.equals("QA_MANAGER") || userRole.equals("ROLE_MR") || userRole.equals("ROLE_DESIGNEE")) {

				details = productDispositionLogBookRepositoryF049.qaMrSummary();
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

	// delete api
	public ResponseEntity<?> deleteProductDispositionLines(Long id) {
		try {

			Optional<ProductDispositionLogBookLineDetails> details = productDispositionLogBookLineDetailsRepository
					.findById(id);

			if (details == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
			}

			productDispositionLogBookLineDetailsRepository.deleteById(id);

		} catch (Exception ex) {

			log.error(" **** Unable to delete details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}

//		========================================== BMR ISSUE REGISTER f045 ===============================================

	// Save

	public ResponseEntity<?> saveBmrIssueRegister(BmrIssueRegisterF045 details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		BmrIssueRegisterF045 listObj = null;
		try {

			String missingField = "";

			if (!"".equals(missingField)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields: " + missingField),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getBmrIssueId() != null) {

				listObj = bmrIssueRegisterRepositoryF045.findFormById(details.getBmrIssueId());

				String[] IgnoreProps = { "productId", "createdBy", "createdAt", "qa_inspector_status",
						"qa_inspector_save_on", "qa_inspector_save_by", "qa_inspector_save_id",
						"qa_inspector_submit_on", "qa_inspector_submit_by", "qa_inspector_submit_id",
						"qa_inspector_sign", "supervisor_status", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_QA")) {

//					if (listObj.getQa_inspector_status().equals(QaAppConstants.qaInspectorSaved)) {
//						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
//								HttpStatus.BAD_REQUEST);
//					}

					bmrIssueRegisterRepositoryF045.save(listObj);

					List<BmrIssueRegisterLineF045> list = details.getDetails();

					for (BmrIssueRegisterLineF045 detail : list) {
						detail.setBmrIssueId(listObj.getBmrIssueId());
						bmrIssueRegisterLineRepositoryF045.save(detail);
					}

					listObj.setDetails(list);

					listObj.setQa_inspector_save_by(userName);
					listObj.setQa_inspector_save_on(date);
					listObj.setQa_inspector_save_id(userId);
					listObj.setQa_inspector_status(QaAppConstants.qaInspectorSaved);

					bmrIssueRegisterRepositoryF045.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + "cannot save details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (role.equals("ROLE_QA")) {

					listObj = details;

					bmrIssueRegisterRepositoryF045.save(listObj);

					List<BmrIssueRegisterLineF045> list = details.getDetails();

					for (BmrIssueRegisterLineF045 detail : list) {
						detail.setBmrIssueId(listObj.getBmrIssueId());
						bmrIssueRegisterLineRepositoryF045.save(detail);
					}

					listObj.setDetails(list);

					listObj.setQa_inspector_save_by(userName);
					listObj.setQa_inspector_save_on(date);
					listObj.setQa_inspector_save_id(userId);
					listObj.setQa_inspector_status(QaAppConstants.qaInspectorSaved);

					bmrIssueRegisterRepositoryF045.save(listObj);

				} else {

					return new ResponseEntity(new ApiResponse(false, role + " cannot save details"),
							HttpStatus.BAD_REQUEST);

				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//				return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	// Submit

	public ResponseEntity<?> submitBmrIssueRegister(BmrIssueRegisterF045 details, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getBmrIssueId();

		BmrIssueRegisterF045 checkObj = new BmrIssueRegisterF045();

		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

		String userName = userRepository.getUserName(userId);

		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

//						Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			//
//						String userName = userRepository.getUserName(userId);
			//
//						String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = bmrIssueRegisterRepositoryF045.findFormById(id);

				String[] IgnoreProps = { "productId", "createdBy", "createdAt", "qa_inspector_status",
						"qa_inspector_save_on", "qa_inspector_save_by", "qa_inspector_save_id",
						"qa_inspector_submit_on", "qa_inspector_submit_by", "qa_inspector_submit_id",
						"qa_inspector_sign", "supervisor_status", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getQa_inspector_status().equals(QaAppConstants.qaInspectorApprove)
						|| checkObj.getSupervisor_status().equals(QaAppConstants.prodSupReject)) {
					if (role.equals("ROLE_QA")) {

						bmrIssueRegisterRepositoryF045.save(checkObj);

						List<BmrIssueRegisterLineF045> list = details.getDetails();

						for (BmrIssueRegisterLineF045 detail : list) {
							detail.setBmrIssueId(checkObj.getBmrIssueId());
							bmrIssueRegisterLineRepositoryF045.save(detail);
						}

						checkObj.setDetails(list);

						checkObj.setQa_inspector_submit_by(userName);
						checkObj.setQa_inspector_submit_on(date);
						checkObj.setQa_inspector_submit_id(userId);
						checkObj.setQa_inspector_status(QaAppConstants.qaInspectorApprove);
						checkObj.setQa_inspector_sign(userName);

						checkObj.setSupervisor_status(AppConstants.waitingStatus);

						bmrIssueRegisterRepositoryF045.save(checkObj);

						// IMAGE

//									Optional<UserImageDetails> imageDetailsOpt = imageRepository
//											.fetchItemDetailsByUsername(userName);
						//
//									byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						//
//									checkObj.setOperator_signature_image(signature);
						//
//									bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

						BmrIssueRegisterHistoryF045 rejectionReportHistory = new BmrIssueRegisterHistoryF045();

						// getter setters fields & status

						rejectionReportHistory.setUnit(checkObj.getUnit());
						rejectionReportHistory.setFormatName(checkObj.getFormatName());
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
						rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
						rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
						rejectionReportHistory.setDate(checkObj.getDate());
						rejectionReportHistory.setMonth(checkObj.getMonth());
						rejectionReportHistory.setYear(checkObj.getYear());
						rejectionReportHistory.setReason(checkObj.getReason());
						rejectionReportHistory.setDepartmentName(checkObj.getDepartmentName());

						// status
						rejectionReportHistory.setQa_inspector_submit_by(checkObj.getQa_inspector_submit_by());
						rejectionReportHistory.setQa_inspector_submit_id(checkObj.getQa_inspector_submit_id());
						rejectionReportHistory.setQa_inspector_submit_on(checkObj.getQa_inspector_submit_on());
						rejectionReportHistory.setQa_inspector_status(checkObj.getQa_inspector_status());
						rejectionReportHistory.setQa_inspector_sign(checkObj.getQa_inspector_sign());
						rejectionReportHistory
								.setQa_inspector_signature_image(checkObj.getQa_inspector_signature_image());

						rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());

						// version
						String date1 = rejectionReportHistory.getDate();

						int version = bmrIssueRegisterHistoryRepositoryF045.getMaximumVersion(date1)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						bmrIssueRegisterHistoryRepositoryF045.save(rejectionReportHistory); // ONE HISTORY

						List<BmrIssueRegisterLineF045> historyMapList = checkObj.getDetails();

						for (BmrIssueRegisterLineF045 obj : historyMapList) {

							BmrIssueRegisterLineHistoryF045 objHistory = new BmrIssueRegisterLineHistoryF045();

							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setHistoryId(rejectionReportHistory.getHistoryId());
							bmrIssueRegisterLineHistoryRepositoryF045.save(objHistory);

						}

						bmrIssueRegisterHistoryRepositoryF045.save(rejectionReportHistory);

						// MAIL
						try {

							qamailfunction.sendMailToRoleSupervisorBmrIssueRegister(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_QA")) {
					return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				bmrIssueRegisterRepositoryF045.save(checkObj);

				List<BmrIssueRegisterLineF045> list = details.getDetails();

				for (BmrIssueRegisterLineF045 detail : list) {
					detail.setBmrIssueId(checkObj.getBmrIssueId());
					bmrIssueRegisterLineRepositoryF045.save(detail);
				}

				checkObj.setDetails(list);

				checkObj.setQa_inspector_submit_by(userName);
				checkObj.setQa_inspector_submit_on(date);
				checkObj.setQa_inspector_submit_id(userId);
				checkObj.setQa_inspector_status(QaAppConstants.qaInspectorApprove);
				checkObj.setQa_inspector_sign(userName);

				checkObj.setSupervisor_status(AppConstants.waitingStatus);

				bmrIssueRegisterRepositoryF045.save(checkObj);

				// IMAGE

//							Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
				//
//							byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
				//
//							checkObj.setOperator_signature_image(signature);
				//
//							bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

				BmrIssueRegisterHistoryF045 rejectionReportHistory = new BmrIssueRegisterHistoryF045();

				// getter setters fields & status

				rejectionReportHistory.setUnit(checkObj.getUnit());
				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setMonth(checkObj.getMonth());
				rejectionReportHistory.setYear(checkObj.getYear());
				rejectionReportHistory.setReason(checkObj.getReason());
				rejectionReportHistory.setDepartmentName(checkObj.getDepartmentName());

				// status
				rejectionReportHistory.setQa_inspector_submit_by(checkObj.getQa_inspector_submit_by());
				rejectionReportHistory.setQa_inspector_submit_id(checkObj.getQa_inspector_submit_id());
				rejectionReportHistory.setQa_inspector_submit_on(checkObj.getQa_inspector_submit_on());
				rejectionReportHistory.setQa_inspector_status(checkObj.getQa_inspector_status());
				rejectionReportHistory.setQa_inspector_sign(checkObj.getQa_inspector_sign());
				rejectionReportHistory.setQa_inspector_signature_image(checkObj.getQa_inspector_signature_image());

				rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());

				// version
				// version
				String date1 = rejectionReportHistory.getDate();

				int version = bmrIssueRegisterHistoryRepositoryF045.getMaximumVersion(date1).map(temp -> temp + 1)
						.orElse(1);

//							
//							int version = qaOnlineInspectionReportHistoryRepository
//								    .getMaximumVersion(date1, shift1, machineName, BmrNo, POrder)
//								    .map(maxVersion -> maxVersion + 1) // Increment the version by 1
//								    .orElse(1); // If no maximum version is found, start with version 1

				rejectionReportHistory.setVersion(version);

				bmrIssueRegisterHistoryRepositoryF045.save(rejectionReportHistory); // ONE HISTORY

				List<BmrIssueRegisterLineF045> historyMapList = checkObj.getDetails();

				for (BmrIssueRegisterLineF045 obj : historyMapList) {

					BmrIssueRegisterLineHistoryF045 objHistory = new BmrIssueRegisterLineHistoryF045();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setHistoryId(rejectionReportHistory.getHistoryId());
					bmrIssueRegisterLineHistoryRepositoryF045.save(objHistory);

				}

				bmrIssueRegisterHistoryRepositoryF045.save(rejectionReportHistory);

				// MAIL
				try {

					qamailfunction.sendMailToRoleSupervisorBmrIssueRegister(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
							HttpStatus.OK);
				}

			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, role + "Submitted Sucessfully"), HttpStatus.OK);

//					return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	// APPROVE OR REJECT

	public ResponseEntity<?> approveRejectBmrIssueRegister(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		BmrIssueRegisterF045 Obj = null;

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);

		// Fetching current date
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

		try {
			// Fetching the incidence object by ID
			Obj = bmrIssueRegisterRepositoryF045.findById(approvalResponse.getId())
					.orElseThrow(() -> new RuntimeException("Report not found with id " + approvalResponse.getId()));
			;

			// Fetching the current status of the HOD and QA Manager
			String qaInspectorStatus = Obj.getQa_inspector_status();

			String qaManagerStatus = Obj.getSupervisor_status();

			String status = "";
			BmrIssueRegisterHistoryF045 objHistory = new BmrIssueRegisterHistoryF045();
			// First level of approval/rejection by QA Manager
			if (qaInspectorStatus.equalsIgnoreCase(QaAppConstants.qaInspectorApprove)
					&& qaManagerStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {

					String reason = approvalResponse.getRemarks();
					objHistory = bmrIssueRegisterHistoryRepositoryF045.fetchLastSubmittedRecord(Obj.getDate());
					if (approvalResponse.getStatus().equals("Approve")) {
						Obj.setSupervisor_status(QaAppConstants.prodSupApprove);
						objHistory.setSupervisor_status(QaAppConstants.prodSupApprove);
						status = "Approved";
					} else if (approvalResponse.getStatus().equals("Reject")) {
						Obj.setReason(reason);
						Obj.setSupervisor_status(QaAppConstants.prodSupReject);
						objHistory.setReason(reason);
						objHistory.setSupervisor_status(QaAppConstants.prodSupReject);
						status = "Rejected";
					}

					Obj.setSupervisor_submit_on(date);
					Obj.setSupervisor_submit_by(userName);
					Obj.setSupervisor_submit_id(userId);
					Obj.setSupervisor_sign(userName);
					// Save the updated incidence object
					bmrIssueRegisterRepositoryF045.save(Obj);
					// History
					objHistory.setSupervisor_submit_on(date);
					objHistory.setSupervisor_submit_by(userName);
					objHistory.setSupervisor_submit_id(userId);
					objHistory.setSupervisor_sign(userName);
					// Save the updated incidence object
					bmrIssueRegisterHistoryRepositoryF045.save(objHistory);

					return new ResponseEntity<>(new ApiResponse(true, "QA Manager " + status + " successfully"),
							HttpStatus.OK);

				} else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to approve/reject"),
							HttpStatus.FORBIDDEN);
				}

			} else {
				return new ResponseEntity<>(
						new ApiResponse(false, "Invalid status or no pending approval for this user"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			log.error("Unable to approve/reject", e);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/reject: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

//			PRINT API

	public ResponseEntity<?> getByBmrIssueRegisterPrint(String date, String month, String year, String department) {
		try {

			List<BmrIssueRegisterF045> list = bmrIssueRegisterRepositoryF045.printBmrIssueRegisterF045(date, month,
					year, department);

			if (list == null || list.isEmpty()) {

//							list = new ArrayList<MetalDetectorCheckListF020>();
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// Param Based Get

	public ResponseEntity<?> getByParamBmrIssueRegister(String date, String department) {
		try {

			List<BmrIssueRegisterF045> list = bmrIssueRegisterRepositoryF045.getDetailsBaseParam(date, department);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// SUMMARY

	// SUMMARY API

	public ResponseEntity<?> getBmrIssueRegisterSummary(HttpServletRequest http) {

		List<BmrIssueRegisterF045> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_QA")) {

				details = bmrIssueRegisterRepositoryF045.qaInspectorSummary();
			}

//			else if (userRole.equals("ROLE_SUPERVISOR")) {
//
//				details = bmrIssueRegisterRepositoryF045.qaProdSupervisorSummary();
//			} 

			else if (userRole.equals("ROLE_SUPERVISOR") || userRole.equals("ROLE_MR")
					|| userRole.equals("QA_MANAGER")) {

				details = bmrIssueRegisterRepositoryF045.qaProdSupervisorSummary();
			}

			else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

	// delete api
	public ResponseEntity<?> deleteBmrIssueRegisterLines(Long id) {
		try {

			Optional<BmrIssueRegisterLineF045> details = bmrIssueRegisterLineRepositoryF045.findById(id);

			if (details == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
			}

			bmrIssueRegisterLineRepositoryF045.deleteById(id);

		} catch (Exception ex) {

			log.error(" **** Unable to delete details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}

	// Save

	public ResponseEntity<?> saveQualityReviewMeeting(QaQualityReviewMeetings details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		QaQualityReviewMeetings listObj = null;
		try {

			String missingField = "";

			if (!"".equals(missingField)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields: " + missingField),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getMeetingId() != null) {

				listObj = qualityReviewMeetingsRepository.findFormById(details.getMeetingId());

				String[] IgnoreProps = { "meetingId", "createdBy", "createdAt", "qa_inspector_status",
						"qa_inspector_save_on", "qa_inspector_save_by", "qa_inspector_save_id",
						"qa_inspector_submit_on", "qa_inspector_submit_by", "qa_inspector_submit_id",
						"qa_inspector_sign", "qa_mr_status", "qa_mr_submit_on", "qa_mr_submit_by", "qa_mr_submit_id",
						"qa_mr_sign" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_QA")) {

//					if (listObj.getQa_inspector_status().equals(QaAppConstants.qaInspectorSaved)) {
//						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
//								HttpStatus.BAD_REQUEST);
//					}

					qualityReviewMeetingsRepository.save(listObj);

					// Save line items for Line1
					List<QaQualityReviewMeetingAttendanceSheet> line1 = details.getDetails();
					for (QaQualityReviewMeetingAttendanceSheet line : line1) {
						line.setMeetingId(listObj.getMeetingId());
						qualityReviewMeetingAttendanceRepository.save(line);
					}

					// Save line items for Line2
					List<QaQualityReviewMeetingsDiscussion> line2 = details.getDetail();
					for (QaQualityReviewMeetingsDiscussion line : line2) {
						line.setMeetingId(listObj.getMeetingId());
						qualityReviewMeetingsDiscussionRepository.save(line);
					}

					// Set QA Inspector save details
					listObj.setDetails(line1);
					listObj.setDetail(line2);

					listObj.setQa_inspector_save_by(userName);
					listObj.setQa_inspector_save_on(date);
					listObj.setQa_inspector_save_id(userId);
					listObj.setQa_inspector_status(QaAppConstants.qaInspectorSave);

//					List<QaQualityReviewMeetingAttendanceSheet> list = details.getDetails();
					//
//					for (QaQualityReviewMeetingAttendanceSheet detail : list) {
//						detail.setMeetingId(listObj.getMeetingId());
//						qualityReviewMeetingAttendanceRepository.save(detail);
//					}
//					
//				
					//
//					listObj.setDetails(list);
					//
//					listObj.setQa_inspector_save_by(userName);
//					listObj.setQa_inspector_save_on(date);
//					listObj.setQa_inspector_save_id(userId);
//					listObj.setQa_inspector_status(QaAppConstants.qaInspectorSaved);

					qualityReviewMeetingsRepository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + "cannot save details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (role.equals("ROLE_QA")) {

					listObj = details;

					qualityReviewMeetingsRepository.save(listObj);

					// Save line items for Line1
					List<QaQualityReviewMeetingAttendanceSheet> line1 = details.getDetails();
					for (QaQualityReviewMeetingAttendanceSheet line : line1) {
						line.setMeetingId(listObj.getMeetingId());
						qualityReviewMeetingAttendanceRepository.save(line);
					}

					// Save line items for Line2
					List<QaQualityReviewMeetingsDiscussion> line2 = details.getDetail();
					for (QaQualityReviewMeetingsDiscussion line : line2) {
						line.setMeetingId(listObj.getMeetingId());
						qualityReviewMeetingsDiscussionRepository.save(line);
					}

					// Set QA Inspector save details
					listObj.setDetails(line1);
					listObj.setDetail(line2);

					listObj.setQa_inspector_save_by(userName);
					listObj.setQa_inspector_save_on(date);
					listObj.setQa_inspector_save_id(userId);
					listObj.setQa_inspector_status(QaAppConstants.qaInspectorSaved);

					qualityReviewMeetingsRepository.save(listObj);

				} else {

					return new ResponseEntity(new ApiResponse(false, role + " cannot save details"),
							HttpStatus.BAD_REQUEST);

				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//				return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	// Submit

	public ResponseEntity<?> submitQualityReviewMeetings(QaQualityReviewMeetings details, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getMeetingId();

		QaQualityReviewMeetings checkObj = new QaQualityReviewMeetings();

		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

		String userName = userRepository.getUserName(userId);

		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

//							Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			//
//							String userName = userRepository.getUserName(userId);
			//
//							String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = qualityReviewMeetingsRepository.findFormById(id);

				String[] IgnoreProps = { "meetingId", "createdBy", "createdAt", "qa_inspector_status",
						"qa_inspector_save_on", "qa_inspector_save_by", "qa_inspector_save_id",
						"qa_inspector_submit_on", "qa_inspector_submit_by", "qa_inspector_submit_id",
						"qa_inspector_sign", "qa_mr_status", "qa_mr_submit_on", "qa_mr_submit_by", "qa_mr_submit_id",
						"qa_mr_sign" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getQa_inspector_status().equals(QaAppConstants.qaInspectorApprove)
						|| checkObj.getQa_mr_status().equals(QaAppConstants.qaMrRejectedStatus)) {
					if (role.equals("ROLE_QA")) {

						qualityReviewMeetingsRepository.save(checkObj);

//							List<BmrIssueRegisterLineF045> list = details.getDetails();
						//
//							for (BmrIssueRegisterLineF045 detail : list) {
//								detail.setBmrIssueId(checkObj.getBmrIssueId());
//								bmrIssueRegisterLineRepositoryF045.save(detail);
//							}
						//
//							checkObj.setDetails(list);

						// Save line items for Line1
						List<QaQualityReviewMeetingAttendanceSheet> line1 = details.getDetails();
						for (QaQualityReviewMeetingAttendanceSheet line : line1) {
							line.setMeetingId(checkObj.getMeetingId());
							qualityReviewMeetingAttendanceRepository.save(line);
						}

						// Save line items for Line2
						List<QaQualityReviewMeetingsDiscussion> line2 = details.getDetail();
						for (QaQualityReviewMeetingsDiscussion line : line2) {
							line.setMeetingId(checkObj.getMeetingId());
							qualityReviewMeetingsDiscussionRepository.save(line);
						}

						// Set QA Inspector save details
						checkObj.setDetails(line1);
						checkObj.setDetail(line2);

						checkObj.setQa_inspector_submit_by(userName);
						checkObj.setQa_inspector_submit_on(date);
						checkObj.setQa_inspector_submit_id(userId);
						checkObj.setQa_inspector_status(QaAppConstants.qaInspectorApprove);
						checkObj.setQa_inspector_sign(userName);

						checkObj.setQa_mr_status(AppConstants.waitingStatus);

						qualityReviewMeetingsRepository.save(checkObj);

						// IMAGE

//										Optional<UserImageDetails> imageDetailsOpt = imageRepository
//												.fetchItemDetailsByUsername(userName);
						//
//										byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						//
//										checkObj.setOperator_signature_image(signature);
						//
//										bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

						QualityReviewMeetingHistory rejectionReportHistory = new QualityReviewMeetingHistory();

						// getter setters fields & status

						rejectionReportHistory.setUnit(checkObj.getUnit());
						rejectionReportHistory.setFormatName(checkObj.getFormatName());
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
						rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
						rejectionReportHistory.setRevisionNumber(checkObj.getRevisionNumber());
						rejectionReportHistory.setDate(checkObj.getDate());
						rejectionReportHistory.setMonth(checkObj.getMonth());
						rejectionReportHistory.setYear(checkObj.getYear());
						rejectionReportHistory.setReason(checkObj.getReason());
						rejectionReportHistory.setStartTime(checkObj.getStartTime());
						rejectionReportHistory.setEndTime(checkObj.getEndTime());
						rejectionReportHistory.setVenue(checkObj.getVenue());

						// status
						rejectionReportHistory.setQa_inspector_submit_by(checkObj.getQa_inspector_submit_by());
						rejectionReportHistory.setQa_inspector_submit_id(checkObj.getQa_inspector_submit_id());
						rejectionReportHistory.setQa_inspector_submit_on(checkObj.getQa_inspector_submit_on());
						rejectionReportHistory.setQa_inspector_status(checkObj.getQa_inspector_status());
						rejectionReportHistory.setQa_inspector_sign(checkObj.getQa_inspector_sign());
						rejectionReportHistory
								.setQa_inspector_signature_image(checkObj.getQa_inspector_signature_image());

						rejectionReportHistory.setQa_mr_status(checkObj.getQa_mr_status());

						// version
						String date1 = rejectionReportHistory.getDate();

						int version = qualityReviewMeetingsHisotoryRepository.getMaximumVersion(date1)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						qualityReviewMeetingsHisotoryRepository.save(rejectionReportHistory); // ONE HISTORY

						// Save line items for

						List<QaQualityReviewMeetingAttendanceSheet> line3 = details.getDetails();
						for (QaQualityReviewMeetingAttendanceSheet line : line1) {
							line.setMeetingId(checkObj.getMeetingId());
							qualityReviewMeetingAttendanceRepository.save(line);
						}

						// Save line items for Line2
						List<QaQualityReviewMeetingsDiscussion> line4 = details.getDetail();
						for (QaQualityReviewMeetingsDiscussion line : line2) {
							line.setMeetingId(checkObj.getMeetingId());
							qualityReviewMeetingsDiscussionRepository.save(line);
						}

						// Set QA Inspector save details
						checkObj.setDetails(line3);
						checkObj.setDetail(line4);
						qualityReviewMeetingsHisotoryRepository.save(rejectionReportHistory);

						// MAIL
						try {

							qamailfunction.sendMailToQaManagerQualityReviewMeeting(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_QA")) {
					return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				qualityReviewMeetingsRepository.save(checkObj);

				// Save line items for Line1
				List<QaQualityReviewMeetingAttendanceSheet> line1 = details.getDetails();
				for (QaQualityReviewMeetingAttendanceSheet line : line1) {
					line.setMeetingId(checkObj.getMeetingId());
					qualityReviewMeetingAttendanceRepository.save(line);
				}

				// Save line items for Line2
				List<QaQualityReviewMeetingsDiscussion> line2 = details.getDetail();
				for (QaQualityReviewMeetingsDiscussion line : line2) {
					line.setMeetingId(checkObj.getMeetingId());
					qualityReviewMeetingsDiscussionRepository.save(line);
				}

				// Set QA Inspector save details
				checkObj.setDetails(line1);
				checkObj.setDetail(line2);

				checkObj.setQa_inspector_submit_by(userName);
				checkObj.setQa_inspector_submit_on(date);
				checkObj.setQa_inspector_submit_id(userId);
				checkObj.setQa_inspector_status(QaAppConstants.qaInspectorApprove);
				checkObj.setQa_inspector_sign(userName);

				checkObj.setQa_mr_status(AppConstants.waitingStatus);

				qualityReviewMeetingsRepository.save(checkObj);

				// IMAGE

//								Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
				//
//								byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
				//
//								checkObj.setOperator_signature_image(signature);
				//
//								bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

				QualityReviewMeetingHistory rejectionReportHistory = new QualityReviewMeetingHistory();

				// getter setters fields & status

				rejectionReportHistory.setUnit(checkObj.getUnit());
				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
				rejectionReportHistory.setRevisionNumber(checkObj.getRevisionNumber());
				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setMonth(checkObj.getMonth());
				rejectionReportHistory.setYear(checkObj.getYear());
				rejectionReportHistory.setReason(checkObj.getReason());
				rejectionReportHistory.setStartTime(checkObj.getStartTime());
				rejectionReportHistory.setEndTime(checkObj.getEndTime());
				rejectionReportHistory.setVenue(checkObj.getVenue());

				// status
				rejectionReportHistory.setQa_inspector_submit_by(checkObj.getQa_inspector_submit_by());
				rejectionReportHistory.setQa_inspector_submit_id(checkObj.getQa_inspector_submit_id());
				rejectionReportHistory.setQa_inspector_submit_on(checkObj.getQa_inspector_submit_on());
				rejectionReportHistory.setQa_inspector_status(checkObj.getQa_inspector_status());
				rejectionReportHistory.setQa_inspector_sign(checkObj.getQa_inspector_sign());
				rejectionReportHistory.setQa_inspector_signature_image(checkObj.getQa_inspector_signature_image());

				rejectionReportHistory.setQa_mr_status(checkObj.getQa_mr_status());

				// version
				String date1 = rejectionReportHistory.getDate();

				int version = qualityReviewMeetingsHisotoryRepository.getMaximumVersion(date1).map(temp -> temp + 1)
						.orElse(1);

//								
//								int version = qaOnlineInspectionReportHistoryRepository
//									    .getMaximumVersion(date1, shift1, machineName, BmrNo, POrder)
//									    .map(maxVersion -> maxVersion + 1) // Increment the version by 1
//									    .orElse(1); // If no maximum version is found, start with version 1

				rejectionReportHistory.setVersion(version);

				qualityReviewMeetingsHisotoryRepository.save(rejectionReportHistory); // ONE HISTORY

				// Save line items for Line1
				List<QaQualityReviewMeetingAttendanceSheet> line3 = details.getDetails();
				for (QaQualityReviewMeetingAttendanceSheet line : line1) {

					QualityReviewMeetingAttendanceSheetHistory objHistory = new QualityReviewMeetingAttendanceSheetHistory();

					BeanUtils.copyProperties(line, objHistory);
					objHistory.setMeetingId(rejectionReportHistory.getMeetingId());
					QualityReviewMeetingsAttendanceHistoryRepository.save(objHistory);
				}

				// Save line items for Line2
				List<QaQualityReviewMeetingsDiscussion> line4 = details.getDetail();
				for (QaQualityReviewMeetingsDiscussion line : line2) {

					QualityReviewMeetingDiscussionHistory objHistory = new QualityReviewMeetingDiscussionHistory();

					BeanUtils.copyProperties(line, objHistory);
					objHistory.setMeetingId(rejectionReportHistory.getMeetingId());
					qualityReviewMeetingDiscussionHistoryRepository.save(objHistory);
				}

//					List<BmrIssueRegisterLineF045> historyMapList = checkObj.getDetails();
				//
//					for (BmrIssueRegisterLineF045 obj : historyMapList) {
				//
//						BmrIssueRegisterLineHistoryF045 objHistory = new BmrIssueRegisterLineHistoryF045();
				//
//						BeanUtils.copyProperties(obj, objHistory);
//						objHistory.setHistoryId(rejectionReportHistory.getHistoryId());
//						bmrIssueRegisterLineHistoryRepositoryF045.save(objHistory);
				//
//					}

//					
				qualityReviewMeetingsHisotoryRepository.save(rejectionReportHistory);

//					List<BmrIssueRegisterLineF045> historyMapList = checkObj.getDetails();
				//
//					for (BmrIssueRegisterLineF045 obj : historyMapList) {
				//
//						BmrIssueRegisterLineHistoryF045 objHistory = new BmrIssueRegisterLineHistoryF045();
				//
//						BeanUtils.copyProperties(obj, objHistory);
//						objHistory.setHistoryId(rejectionReportHistory.getHistoryId());
//						bmrIssueRegisterLineHistoryRepositoryF045.save(objHistory);
				//
//					}
				//
//					bmrIssueRegisterHistoryRepositoryF045.save(rejectionReportHistory);

				// MAIL
				try {

					qamailfunction.sendMailToQaManagerQualityReviewMeeting(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
							HttpStatus.OK);
				}

			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, role + "Submitted Sucessfully"), HttpStatus.OK);

//						return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	// APPROVE OR REJECT

	public ResponseEntity<?> approveOrRejectQualityReviewMeeting(ApproveResponse approvalResponse,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		QaQualityReviewMeetings Obj = null;

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);

		// Fetching current date
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

		try {
			// Fetching the incidence object by ID
			Obj = qualityReviewMeetingsRepository.findById(approvalResponse.getId())
					.orElseThrow(() -> new RuntimeException("Report not found with id " + approvalResponse.getId()));
			;

			// Fetching the current status of the HOD and QA Manager
			String qaInspectorStatus = Obj.getQa_inspector_status();

			String qaManagerStatus = Obj.getQa_mr_status();

			String status = "";
			QualityReviewMeetingHistory objHistory = new QualityReviewMeetingHistory();
			// First level of approval/rejection by QA Manager
			if (qaInspectorStatus.equalsIgnoreCase(QaAppConstants.qaInspectorApprove)
					&& qaManagerStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
						|| userRole.equalsIgnoreCase("ROLE_MR")) {

					String reason = approvalResponse.getRemarks();
					objHistory = qualityReviewMeetingsHisotoryRepository.fetchLastSubmittedRecord(Obj.getDate());
					if (approvalResponse.getStatus().equals("Approve")) {
						Obj.setQa_mr_status(QaAppConstants.qaMrApprovedStatus);
						objHistory.setQa_mr_status(QaAppConstants.qaMrApprovedStatus);
						status = "Approved";
					} else if (approvalResponse.getStatus().equals("Reject")) {
						Obj.setReason(reason);
						Obj.setQa_mr_status(QaAppConstants.qaMrRejectedStatus);
						objHistory.setReason(reason);
						objHistory.setQa_mr_status(QaAppConstants.qaMrRejectedStatus);
						status = "Rejected";
					}

					Obj.setQa_mr_submit_on(date);
					Obj.setQa_mr_submit_by(userName);
					Obj.setQa_mr_submit_id(userId);
					Obj.setQa_mr_sign(userName);
					// Save the updated incidence object
					qualityReviewMeetingsRepository.save(Obj);
					// History
					objHistory.setQa_mr_submit_on(date);
					objHistory.setQa_mr_submit_by(userName);
					objHistory.setQa_mr_submit_id(userId);
					objHistory.setQa_mr_sign(userName);

					// Save the updated incidence object
					qualityReviewMeetingsHisotoryRepository.save(objHistory);

					return new ResponseEntity<>(new ApiResponse(true, "QA Manager " + status + " successfully"),
							HttpStatus.OK);

				} else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to approve/reject"),
							HttpStatus.FORBIDDEN);
				}

			} else {
				return new ResponseEntity<>(
						new ApiResponse(false, "Invalid status or no pending approval for this user"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			log.error("Unable to approve/reject", e);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/reject: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	// DiscussionPoints Lotv

	public ResponseEntity<List<QaQualityReviewMeetingDiscussionPoints>> getQualityReviewMeetingDiscussionPoints() {
		List<QaQualityReviewMeetingDiscussionPoints> records;

		try {
			records = qaQualityReviewMeetingDiscussionPointsRepository.getDiscussionPointsLov();

			if (records == null || records.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // or return an empty list:
																				// Collections.emptyList();
			}

			return ResponseEntity.ok(records);

		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("Error fetching discussion points: {}", msg);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // or an empty list if preferred
		}
	}

	// Param Based Get

	public ResponseEntity<?> getByParamQaQualityReviewMeetings(String date) {
		try {

			List<QaQualityReviewMeetings> list = qualityReviewMeetingsRepository.getDetailsBaseParam(date);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// SUMMARY API

	public ResponseEntity<?> getQaQualityReviewMeetingsSummary(HttpServletRequest http) {

		List<QaQualityReviewMeetings> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_QA")) {

				details = qualityReviewMeetingsRepository.qaInspectorSummary();
			}

			else if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
					|| userRole.equalsIgnoreCase("ROLE_MR")) {

				details = qualityReviewMeetingsRepository.qaManagerMrSummary();
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

//			PRINT API

	public ResponseEntity<?> getByQualityReviewMeetingsPrint(String date, String month, String year) {
		try {

			List<QaQualityReviewMeetings> list = qualityReviewMeetingsRepository.printQualityReviewMeeting(date, month,
					year);

			if (list == null || list.isEmpty()) {

//							list = new ArrayList<MetalDetectorCheckListF020>();
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// delete api for AttendanceSheet

	public ResponseEntity<?> deleteQualityReviewMeetingsAttendanceSheet(Long id) {
		try {

			Optional<QaQualityReviewMeetingAttendanceSheet> details = qualityReviewMeetingAttendanceRepository
					.findById(id);

			if (details == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
			}

			qualityReviewMeetingAttendanceRepository.deleteById(id);

		} catch (Exception ex) {

			log.error(" **** Unable to delete details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}

	// delete api for Discussion

	public ResponseEntity<?> deleteQualityReviewMeetingsDiscussion(Long id) {
		try {

			Optional<QaQualityReviewMeetingsDiscussion> details = qualityReviewMeetingsDiscussionRepository
					.findById(id);

			if (details == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
			}

			qualityReviewMeetingsDiscussionRepository.deleteById(id);

		} catch (Exception ex) {

			log.error(" **** Unable to delete details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}

//		=======================================================================================================================

	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}

}
