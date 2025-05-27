package com.focusr.Precot.QA.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
/**
 *PH-QCL01-F-029 
 *@author Gokul B
 */

import com.focusr.Precot.QA.model.batchReleaseChecklist;
import com.focusr.Precot.QA.model.newamplerequestQA;
import com.focusr.Precot.QA.model.productionretainedsampleregister40;
import com.focusr.Precot.QA.model.productionretainedsampleregisterchild1;
import com.focusr.Precot.QA.model.productionretainedsampleregisterchild2;
import com.focusr.Precot.QA.model.audit.batchReleaseChecklisthistory;
import com.focusr.Precot.QA.model.audit.newamplerequestQAhistory;
import com.focusr.Precot.QA.model.audit.productionretainedsampleregister40history;
import com.focusr.Precot.QA.model.audit.productionretainedsampleregisterHistorychild1;
import com.focusr.Precot.QA.model.audit.productionretainedsampleregisterHistorychild2;
import com.focusr.Precot.QA.repository.batchReleaseChecklistRepo;
import com.focusr.Precot.QA.repository.newamplerequestQARepo;
import com.focusr.Precot.QA.repository.productionretainedsampleregister40Repo;
import com.focusr.Precot.QA.repository.productionretainedsampleregister40childARepo;
import com.focusr.Precot.QA.repository.productionretainedsampleregister40childBRepo;
import com.focusr.Precot.QA.repository.audit.batchReleaseChecklisthistoryRepo;
import com.focusr.Precot.QA.repository.audit.newamplerequestQAhistoryRepo;
import com.focusr.Precot.QA.repository.audit.productionretainedsampleregister40HistoryRepo;
import com.focusr.Precot.QA.repository.audit.productionretainedsampleregister40childAHistoryRepo;
import com.focusr.Precot.QA.repository.audit.productionretainedsampleregister40childBHistoryRepo;
import com.focusr.Precot.QA.util.QaAppConstants;
import com.focusr.Precot.QA.util.mail.QAMailFunction;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.service.engineering.EngineeringService9;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.Qc.AppConstantsQc;

@Service
public class QaService8 {

	@Autowired
	private QAMailFunction qamailfunction;
	
	@Autowired
	newamplerequestQARepo newamplerequestQARepo;

	@Autowired
	newamplerequestQAhistoryRepo newamplerequestQAhistoryRepo;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private SCAUtil scaUtil;

	@Autowired
	private EngineeringService9 engService;

	@Autowired
	private batchReleaseChecklistRepo batchReleaseChecklistRepo;

	@Autowired
	private batchReleaseChecklisthistoryRepo batchhistoryRepo;

	@Autowired
	productionretainedsampleregister40Repo productionretainedsampleregister40repo;

	@Autowired
	productionretainedsampleregister40childARepo productionretainedsampleregister40childARepo;

	@Autowired
	productionretainedsampleregister40childBRepo productionretainedsampleregister40childBRepo;

	@Autowired
	productionretainedsampleregister40HistoryRepo productionretainedsampleregister40historyRepo;

	@Autowired
	productionretainedsampleregister40childAHistoryRepo productionretainedsampleregister40childAHistoryRepo;

	@Autowired
	productionretainedsampleregister40childBHistoryRepo productionretainedsampleregister40childBHistoryRepo;

	String[] IgnoreProps = { 
		    "test_id", "micro_id", "obs_id", "qAqcObservations", "microbiologicalTest", "lab_id",
		    "physicalandchemicaltest", "MICROBIOLOGICAL TEST", "QAQC OBSERVATIONS", "observations",
		    "microbilogytestf004", "exfoliatingfabricanalysisreporthistory", "microbilogytestf006",
		    "finishedproductanalysisreportF006", "obser", "weighingscalecalibrationreportCLF007", "createdAt",
		    "updatedAt", "createdBy", "updatedBy", "qc_", "chemist_", "micro_", "fumigationARF011", "CREATED BY",
		    "UPDATED BY", "UPDATED AT", "CREATED AT",

		    // Existing entries from previous code
		    "chemist_status", "chemist_saved_on", "chemist_saved_by", "chemist_saved_id", "chemist_submit_on",
		    "chemist_submit_by", "chemist_submit_id", "chemist_sign", "micro_status", "microbiologist_saved_on",
		    "microbiologist_saved_by", "microbiologist_saved_id", "micro_submit_on", "micro_submit_by",
		    "micro_submit_id", "micro_sign", "qc_status", "qc_submit_on", "qc_submit_by", "qc_submit_id",

		    // New entries from latest code
		    "qa_inspector_status", "qa_inspector_saved_on", "qa_inspector_saved_by", "qa_inspector_saved_id",
		    "qa_inspector_submit_on", "qa_inspector_submit_by", "qa_inspector_submit_id", "qa_inspector_sign",
		    "qa_mng_status", "qa_mng_submit_on", "qa_mng_submit_by", "qa_mng_submit_id", "qa_mng_sign",

		    // Additional new entries
		    "ins_saved_on", "ins_saved_by", "ins_saved_id", "hod_submit_on", "hod_submit_by", "hod_sign", "hod_id",
		    "hod_status", "develop_submit_on", "develop_submit_by", "develop_id", "develop_sign", "develop_status",
		    "qc_status_b", "qc_submit_on_b", "qc_submit_by_b", "qc_sign_b", "qc_submit_id_b", "ins_sign", "ins_status",
		    "ins_submit_on", "ins_submit_by", "ins_submit_id", "potableWaterARF013Report",

		    // Newly added fields
		    "is_image_uploaded", "mark_rep_status", "mark_rep_saved_on", "mark_rep_saved_by", "mark_rep_saved_id",
		    "mark_rep_saved_on_b", "mark_rep_saved_by_b", "mark_rep_saved_id_b", "mark_rep_submit_on",
		    "mark_rep_submit_by", "mark_rep_submit_id", "mark_rep_sign", "mark_rep_submit_on_b", "mark_rep_submit_by_b",
		    "mark_rep_submit_id_b", "mark_rep_sign_b", "mark_rep_status_b", "qc_status", "qc_submit_on", "qc_submit_by",
		    "qc_submit_id", "qc_sign"
		};


	org.jboss.logging.Logger logger = LoggerFactory.logger(QaService8.class);

	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
//			  mediaDisposalCLF022 mediaDis
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}

	private static final String PREFIX = "24/NSR/";

	@Transactional
	public String getNextCode(String lastCode) {

		Long newNumber = (long) 1;
//        if(lastCode!=null &&lastCode.contains("24/NSR/") ) {
		if (lastCode != null && lastCode.startsWith(PREFIX)) {
			String numberPart = lastCode.substring(PREFIX.length());
			try {
				newNumber = Long.parseLong(numberPart) + 1;
			} catch (NumberFormatException e) {
				throw new IllegalStateException("Invalid code format in database: " + lastCode);
			}

			String newCode = PREFIX + String.format("%04d", newNumber);

			return newCode;
		} else {
			return null;
		}
	}

	public ResponseEntity<?> saveSampleRequest(newamplerequestQA newSample, HttpServletRequest http) {

		newamplerequestQA newSampleObject = new newamplerequestQA();

		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = newSample.getTest_id();

			if (id != null) {
				newSampleObject = newamplerequestQARepo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}
			BeanUtils.copyProperties(newSample, newSampleObject, IgnoreProps);

			if (id != null) {
				if (userRole.equalsIgnoreCase("MARKET_REPRESENTATIVE") && newSampleObject.getMark_rep_status_b()!=null ) {

					String num = newamplerequestQARepo.getRequis() != "" ? newamplerequestQARepo.getRequis() : null;
					if (newamplerequestQARepo.getRequis(newSampleObject.getTest_id()) != null
							&& newamplerequestQARepo.getRequis(newSampleObject.getTest_id()).startsWith(PREFIX)) {
						newSampleObject.setRequisitionNo(newamplerequestQARepo.getRequis(newSampleObject.getTest_id()));
					} else {
						newSampleObject.setRequisitionNo(getNextCode(num));
					}
					newSampleObject.setMark_rep_saved_on(date);

					newSampleObject.setMark_rep_saved_id(userId);
//					newSampleObject.setMark_rep_sign(userName);

					newSampleObject.setMark_rep_status(QaAppConstants.marketrepresentativesaved);

					newSampleObject = newamplerequestQARepo.save(newSampleObject);
				}

				else if (userRole.equalsIgnoreCase("QA_MANAGER") ||userRole.equalsIgnoreCase("QC_MANAGER") ){
				
				newSampleObject.setQc_save_on(date);
					newSampleObject.setQc_save_id(id);

					newSampleObject.setQc_status(QaAppConstants.QCsaved);

					newamplerequestQARepo.save(newSampleObject);
				}

//				else if (userRole.equalsIgnoreCase("MARKET_REPRESENTATIVE") && newSampleObject.getMark_rep_status_b()==null) {
//
//					newSampleObject.setMark_rep_saved_on_b(date);
//
//					newSampleObject.setMark_rep_saved_id_b(userId);
//					newSampleObject.setMark_rep_saved_by_b(userName);
////					
//
//					newSampleObject.setMark_rep_status_b(QaAppConstants.marketrepresentativesaved);
//
//					newamplerequestQARepo.save(newSampleObject);
//				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (userRole.equalsIgnoreCase("MARKET_REPRESENTATIVE")) {

					String num = newamplerequestQARepo.getRequis() != "" ? newamplerequestQARepo.getRequis() : null;
					if (newamplerequestQARepo.getRequis(newSample.getTest_id()) != null
							&& newamplerequestQARepo.getRequis(newSample.getTest_id()).startsWith(PREFIX)) {
						newSample.setRequisitionNo(newamplerequestQARepo.getRequis(newSample.getTest_id()));
					} else {
						newSample.setRequisitionNo(getNextCode(num));
					}
					newSample.setMark_rep_saved_on(date);
					newSample.setMark_rep_saved_id(userId);
//					newSample.setMark_rep_sign(userName);

					newSample.setMark_rep_status(QaAppConstants.marketrepresentativesaved);

					newamplerequestQARepo.save(newSample);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(newSample, HttpStatus.OK);

	}

	public ResponseEntity<?> submitSampleRequest(@Valid newamplerequestQA newSample, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();

		newamplerequestQA newSampleObject = new newamplerequestQA();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = newSample.getTest_id();

			if (id != null) {
				newSampleObject = newamplerequestQARepo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

			if (id != null) {
				BeanUtils.copyProperties(newSample, newSampleObject, IgnoreProps);

				 if (userRole.equalsIgnoreCase("MARKET_REPRESENTATIVE") && (newSampleObject.getMark_rep_status_b()!=null && newSampleObject.getMark_rep_status_b().equalsIgnoreCase(QaAppConstants.waitingStatus))) {

						newSampleObject.setMark_rep_saved_on_b(date);
						
						newSampleObject.setMark_rep_submit_id_b(id);
						newSampleObject.setMark_rep_sign_b(userName);
						newSampleObject.setMark_rep_submit_by_b(userName);
						newSampleObject.setMark_rep_status_b(QaAppConstants.marketrepresentativesubmitted);

						newSampleObject =	newamplerequestQARepo.save(newSampleObject);
						newamplerequestQAhistory newsSampleHistory = new newamplerequestQAhistory();
						BeanUtils.copyProperties(newSampleObject, newsSampleHistory);

						int version = newamplerequestQAhistoryRepo.getMaximumVersion(newSample.getRequisitionNo())
								.map(temp -> temp + 1).orElse(1);
						newsSampleHistory.setVersion(version);
						newamplerequestQAhistoryRepo.save(newsSampleHistory);
					}
				 
					else if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("QC_MANAGER")) {

					String num = newamplerequestQARepo.getRequis() != "" ? newamplerequestQARepo.getRequis() : null;
					if (newamplerequestQARepo.getRequis(newSampleObject.getTest_id()) != null
							&& newamplerequestQARepo.getRequis(newSampleObject.getTest_id()).startsWith(PREFIX)) {
						newSampleObject.setRequisitionNo(newamplerequestQARepo.getRequis(newSampleObject.getTest_id()));
					} else {
						newSampleObject.setRequisitionNo(getNextCode(num));
					}

					newSampleObject.setMark_rep_status_b(QaAppConstants.waitingStatus);
					newSampleObject.setQc_submit_on(date);
					newSampleObject.setQc_submit_id(userId);
					newSampleObject.setQc_sign(userName);
					newSampleObject.setQc_submit_by(userName);
					newSampleObject.setQc_status(QaAppConstants.QCApprove);

					newamplerequestQARepo.save(newSampleObject);
					newamplerequestQAhistory newsSampleHistory = new newamplerequestQAhistory();
					BeanUtils.copyProperties(newSampleObject, newsSampleHistory);

					int version = newamplerequestQAhistoryRepo.getMaximumVersion(newSample.getRequisitionNo())
							.map(temp -> temp + 1).orElse(1);
					newsSampleHistory.setVersion(version);
					newamplerequestQAhistoryRepo.save(newsSampleHistory);
				}
				 
					else if (userRole.equalsIgnoreCase("MARKET_REPRESENTATIVE") && (newSampleObject.getMark_rep_status_b()==null) || !newSampleObject.getQc_status().equalsIgnoreCase(QaAppConstants.QCApprove)) {
//
						newSampleObject.setQc_status(QaAppConstants.waitingStatus);

						newSampleObject.setMark_rep_submit_on(date);
						newSampleObject.setMark_rep_submit_id(userId);
						newSampleObject.setMark_rep_sign(userName);
						newSampleObject.setMark_rep_submit_by(userName);
						newSampleObject.setMark_rep_status(QaAppConstants.marketrepresentativesubmitted);

						newamplerequestQARepo.save(newSampleObject);
						newamplerequestQAhistory newsSampleHistory = new newamplerequestQAhistory();
						BeanUtils.copyProperties(newSampleObject, newsSampleHistory);

						int version = newamplerequestQAhistoryRepo.getMaximumVersion(newSample.getRequisitionNo())
								.map(temp -> temp + 1).orElse(1);
						newsSampleHistory.setVersion(version);
						newamplerequestQAhistoryRepo.save(newsSampleHistory);

					} 
					


								


				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {

				if (userRole.equalsIgnoreCase("MARKET_REPRESENTATIVE")) {

					String num = newamplerequestQARepo.getRequis() != "" ? newamplerequestQARepo.getRequis() : null;
					if (newamplerequestQARepo.getRequis(newSample.getTest_id()) != null
							&& newamplerequestQARepo.getRequis(newSample.getTest_id()).startsWith(PREFIX)) {
						newSample.setRequisitionNo(newamplerequestQARepo.getRequis(newSample.getTest_id()));
					} else {
						newSample.setRequisitionNo(getNextCode(num));
					}
					newSample.setQc_status(QaAppConstants.waitingStatus);

					newSample.setMark_rep_submit_on(date);
					newSample.setMark_rep_submit_id(userId);
					newSample.setMark_rep_sign(userName);
					newSample.setMark_rep_submit_by(userName);
					newSample.setMark_rep_status(QaAppConstants.marketrepresentativesubmitted);

					newamplerequestQARepo.save(newSample);
					newamplerequestQAhistory newsSampleHistory = new newamplerequestQAhistory();
					BeanUtils.copyProperties(newSample, newsSampleHistory);

					int version = newamplerequestQAhistoryRepo.getMaximumVersion(newSample.getRequisitionNo())
							.map(temp -> temp + 1).orElse(1);
					newsSampleHistory.setVersion(version);
					newamplerequestQAhistoryRepo.save(newsSampleHistory);

				}

//				else if (userRole.equalsIgnoreCase("QA_MANAGER") ||userRole.equalsIgnoreCase("QC_MANAGER") ){
//					
//					newSample.setQc_submit_on(date);
//					newSample.setQc_submit_id(userId);
//					newSample.setQc_sign(userName);
//					newSample.setQc_submit_by(userName);	
//					newSample.setQc_status(QaAppConstants.QCApprove);
//
//					newamplerequestQARepo.save(newSample);
//					newamplerequestQAhistory newsSampleHistory = new newamplerequestQAhistory();
//					BeanUtils.copyProperties(newSample, newsSampleHistory );
//
//					int version = newamplerequestQAhistoryRepo.getMaximumVersion(newSample.getRequisitionNo()).map(temp -> temp + 1)
//							.orElse(1);
//					newsSampleHistory.setVersion(version);
//					newamplerequestQAhistoryRepo.save(newsSampleHistory);
//				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}

			}

//			try {
//
//				qcmailfunction.sendEmailToF020(newSample);
//			} catch (Exception ex) {
//				return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
//						HttpStatus.OK);
//			}
//			
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(newSample, HttpStatus.OK);

	}

	public ResponseEntity<?> printNewSampleRequest(String batch ,String date,String month,String year) {

		List<newamplerequestQA> requis = new ArrayList<>();
		batch = (batch == null || batch.trim().isEmpty()) ? null : batch;
		date = (date == null || date.trim().isEmpty()) ? null : date;
		month = (month == null || month.trim().isEmpty()) ? null : month;
		year = (year == null || year.trim().isEmpty()) ? null : year;

		requis = newamplerequestQARepo.print(batch,date,month,year);

		try {
			return new ResponseEntity(requis, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getbyRequis(String year) {

		List<newamplerequestQA> requis = new ArrayList<>();
		year = (year == null || year.trim().isEmpty()) ? null : year;

		requis = newamplerequestQARepo.getbyRequis(year);

		try {
			return new ResponseEntity(requis, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getTestByIdCLF029(@Valid Long id) {
		newamplerequestQA requis = newamplerequestQARepo.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Test not found"));
		try {
			return new ResponseEntity(requis, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getallTestCLF029(HttpServletRequest http) {
		List<newamplerequestQA> newamplerequestQAList = new ArrayList<>();

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

		if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
				|| userRole.equalsIgnoreCase("QA_MANAGER")) {
			newamplerequestQAList = newamplerequestQARepo.InspecterManagerSummary();

		}

		else if (userRole.equalsIgnoreCase("MARKET_REPRESENTATIVE")) {

			newamplerequestQAList = newamplerequestQARepo.ManagerSummarydevelop();
		}

		try {
			return new ResponseEntity(newamplerequestQAList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);

		}

	}

	// -------------------------------------------------F047---------------------------------

	public ResponseEntity<?> savebatchcheckList(batchReleaseChecklist batchrelease, HttpServletRequest http) {
		batchReleaseChecklist batchreleaseObject = new batchReleaseChecklist();

		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = batchrelease.getTest_id();

			if (id != null) {
				batchreleaseObject = batchReleaseChecklistRepo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}
			BeanUtils.copyProperties(batchrelease, batchreleaseObject, IgnoreProps);

			if (id != null) {
				if (userRole.equalsIgnoreCase("ROLE_QA")) {

					batchreleaseObject.setIns_saved_on(date);

					batchreleaseObject.setIns_saved_id(userId);

//		batchreleaseObject.setIns_sign(userName);

					batchreleaseObject.setIns_status(QaAppConstants.qaInspectorSave);

					batchReleaseChecklistRepo.save(batchreleaseObject);
				}

				else if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					batchreleaseObject.setQc_saved_on(date);
					batchreleaseObject.setQc_saved_id(userId);

					batchreleaseObject.setQc_saved_by(userName);
					batchreleaseObject.setQc_status_b(AppConstantsQc.chemistSave);

					batchReleaseChecklistRepo.save(batchreleaseObject);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (userRole.equalsIgnoreCase("ROLE_QA")) {

					batchrelease.setIns_saved_on(date);
					batchrelease.setIns_saved_id(userId);
//		batchrelease.setIns_sign(userName);

					batchrelease.setIns_status(QaAppConstants.qaInspectorSave);

					batchReleaseChecklistRepo.save(batchrelease);
				}

				else if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					batchrelease.setQc_saved_on(date);
					batchrelease.setQc_saved_id(userId);

					batchrelease.setQc_saved_by(userName);
					batchrelease.setQc_status_b(AppConstantsQc.chemistSave);

					batchReleaseChecklistRepo.save(batchrelease);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(batchrelease, HttpStatus.OK);

	}

	public ResponseEntity<?> getPde(String department ,String batch ) {

		List<Object[]> orderResponse = new ArrayList<>();
		List<Map<String, Object>> responseList = new ArrayList<>();

		try {
			if (department != null) {

				switch (department) {
				case "Cotton_Buds":
					orderResponse = batchReleaseChecklistRepo.cottonBudsPDE(batch); // Retrieves data based on BATCH_NO
					break;
				case "Pad_Punching":
					orderResponse = batchReleaseChecklistRepo.padpunchingPDE(batch); // Retrieves data based on BATCH_NO
					break;
				case "Dry_Goods":
					orderResponse = batchReleaseChecklistRepo.drygoodsPDE(batch); // Retrieves data based on BATCH_NO
					break;
				default:
					return new ResponseEntity<>(new ApiResponse(false, "Invalid  BMR."), HttpStatus.BAD_REQUEST);
				}

				for (Object[] record : orderResponse) {
					Map<String, Object> map = new HashMap<>();
					map.put("product", record[0]);
					map.put("product_code", record[1]);
					map.put("start_date", record[2]);
					map.put("end_date", record[3]);
                    map.put("lot_no", record[4]);

					responseList.add(map);
				}
			}
			return new ResponseEntity(responseList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get PDE Data" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}
	public ResponseEntity<?> submitbatchcheckList(@Valid batchReleaseChecklist batchrelease, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();

		batchReleaseChecklist batchreleaseObject = new batchReleaseChecklist();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = batchrelease.getTest_id();

			if (id != null) {
				batchreleaseObject = batchReleaseChecklistRepo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

			if (id != null) {
				BeanUtils.copyProperties(batchrelease, batchreleaseObject, IgnoreProps);
				if (userRole.equalsIgnoreCase("ROLE_QA")) {

					batchreleaseObject.setQc_status(QaAppConstants.waitingStatus);
					if(batchreleaseObject.getQc_status_b()!=null && batchreleaseObject.getQc_status_b().equalsIgnoreCase(AppConstantsQc.chemistSubmitted)) {
						
					}else {
						batchreleaseObject.setQc_status_b(QaAppConstants.waitingStatus);	
					}
					

					batchreleaseObject.setIns_submit_on(date);
					batchreleaseObject.setIns_submit_id(userId);
					batchreleaseObject.setIns_sign(userName);
					batchreleaseObject.setIns_submit_by(userName);
					batchreleaseObject.setIns_status(QaAppConstants.qaInspectorSubmit);

					batchReleaseChecklistRepo.save(batchreleaseObject);
					batchReleaseChecklisthistory batchChecklisthistory = new batchReleaseChecklisthistory();
					BeanUtils.copyProperties(batchreleaseObject, batchChecklisthistory);

					int version = batchhistoryRepo
							.getMaximumVersion(batchrelease.getBmrNo(), batchrelease.getDepartment())
							.map(temp -> temp + 1).orElse(1);
					batchChecklisthistory.setVersion(version);
					batchhistoryRepo.save(batchChecklisthistory);

				}

				else if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
						&& batchreleaseObject.getIns_status().equalsIgnoreCase(QaAppConstants.qaInspectorSubmit)) {

					batchreleaseObject.setQc_submit_on_b(date);
					batchreleaseObject.setQc_submit_id_b(userId);
					batchreleaseObject.setQc_status(QaAppConstants.waitingStatus);
					batchreleaseObject.setQc_submit_by_n(userName);
					batchreleaseObject.setQc_sign_b(userName);
					batchreleaseObject.setQc_status_b(AppConstantsQc.chemistSubmitted);

					batchReleaseChecklistRepo.save(batchreleaseObject);
					batchReleaseChecklisthistory batchChecklisthistory = new batchReleaseChecklisthistory();
					BeanUtils.copyProperties(batchreleaseObject, batchChecklisthistory);

					int version = batchhistoryRepo
							.getMaximumVersion(batchrelease.getBmrNo(), batchrelease.getDepartment())
							.map(temp -> temp + 1).orElse(1);
					batchChecklisthistory.setVersion(version);
					batchhistoryRepo.save(batchChecklisthistory);
				}

//				else if (userRole.equalsIgnoreCase("ROLE_QA")) {
//
//					batchreleaseObject.setQa_submit_on(date);
//					batchreleaseObject.setQa_submit_id(userId);
//
//					batchreleaseObject.setQa_submit_by(userName);
//					batchreleaseObject.setQa_status(QaAppConstants.QCApprove);
//
//					batchReleaseChecklistRepo.save(batchreleaseObject);
//					batchReleaseChecklisthistory batchChecklisthistory = new batchReleaseChecklisthistory();
//					BeanUtils.copyProperties(batchreleaseObject, batchChecklisthistory);
//
//					int version = batchhistoryRepo
//							.getMaximumVersion(batchrelease.getBmrNo(), batchrelease.getDepartment())
//							.map(temp -> temp + 1).orElse(1);
//					batchChecklisthistory.setVersion(version);
//					batchhistoryRepo.save(batchChecklisthistory);
//				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {

				if (userRole.equalsIgnoreCase("ROLE_QA")) {

					batchrelease.setQc_status(QaAppConstants.waitingStatus);
					batchrelease.setQc_status_b(QaAppConstants.waitingStatus);

					batchrelease.setIns_submit_on(date);
					batchrelease.setIns_submit_id(userId);
					batchrelease.setIns_sign(userName);
					batchrelease.setIns_submit_by(userName);
					batchrelease.setIns_status(QaAppConstants.qaInspectorSubmit);

					batchReleaseChecklistRepo.save(batchrelease);
					batchReleaseChecklisthistory batchChecklisthistory = new batchReleaseChecklisthistory();
					BeanUtils.copyProperties(batchrelease, batchChecklisthistory);

					int version = batchhistoryRepo
							.getMaximumVersion(batchrelease.getBmrNo(), batchrelease.getDepartment())
							.map(temp -> temp + 1).orElse(1);
					batchChecklisthistory.setVersion(version);
					batchhistoryRepo.save(batchChecklisthistory);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}

			}
			
			// MAIL
			try {

				qamailfunction.sendMailToBatchChecklist(batchrelease , userRole);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
						HttpStatus.OK);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(batchrelease, HttpStatus.OK);

	}

	public ResponseEntity<?> printNewbatchcheckList(String bmr, String department) {

		List<batchReleaseChecklist> requis = new ArrayList<>();
		bmr = (bmr == null || bmr.trim().isEmpty()) ? null : bmr;
		department = (department == null || department.trim().isEmpty()) ? null : department;

		requis = batchReleaseChecklistRepo.print(bmr, department);

		try {
			return new ResponseEntity(requis, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getbybatchcheck(String bmr, String department,String year,String month) {

		List<batchReleaseChecklist> requis = new ArrayList<>();
		bmr = (bmr == null || bmr.trim().isEmpty()) ? null : bmr;
		department = (department == null || department.trim().isEmpty()) ? null : department;
		year = (year == null || year.trim().isEmpty()) ? null : year;
		month = (month == null || month.trim().isEmpty()) ? null : month;

		requis = batchReleaseChecklistRepo.findByBatch(bmr, department,year,month);

		try {
			return new ResponseEntity(requis, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getTestByIdCLF047(@Valid Long id) {
		batchReleaseChecklist requis = batchReleaseChecklistRepo.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Test not found"));
		try {
			return new ResponseEntity(requis, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getallTestCLF047(HttpServletRequest http) {
		List<batchReleaseChecklist> batchReleaseChecklistList = new ArrayList<>();

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

		if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
			batchReleaseChecklistList = batchReleaseChecklistRepo.exeManagerSummary();

		}

//		else if ( userRole.equalsIgnoreCase("QA_MANAGER")) {
//			batchReleaseChecklistList = batchReleaseChecklistRepo.exeManagerSummary();
//
//		}

		else if (userRole.equalsIgnoreCase("ROLE_QA")) {

			batchReleaseChecklistList = batchReleaseChecklistRepo.insSummary();
		}

		else if (userRole.equalsIgnoreCase("ROLE_DESIGNEE") || userRole.equalsIgnoreCase("QA_MANAGER")) {

			batchReleaseChecklistList = batchReleaseChecklistRepo.exeManagerSummary();
		}

		try {
			return new ResponseEntity(batchReleaseChecklistList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);

		}

	}

	public ResponseEntity<?> approveF047(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		batchReleaseChecklist batchReChecklist = new batchReleaseChecklist();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			batchReChecklist = batchReleaseChecklistRepo.findById(approvalResponse.getId())
					.orElseThrow(() -> new EntityNotFoundException("Test not found"));

			batchReleaseChecklisthistory batchReChecklisthistory = new batchReleaseChecklisthistory();

			String supervisiorStatus = batchReChecklist.getIns_status() != null ? batchReChecklist.getQc_status_b()
					: batchReChecklist.getIns_status();

			String hodStatus = batchReChecklist.getQc_status();

			if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
					|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.QainspecterAPPROVED)
					|| supervisiorStatus.equalsIgnoreCase(QaAppConstants.qaInspectorSubmit))
					&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus)
							|| hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected)
							|| hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject))) {

				if (userRole.equalsIgnoreCase("QA_Manager") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						batchReChecklist.setQc_status(AppConstantsQc.QCApprove);
						batchReChecklist.setQc_submit_on(date);
						batchReChecklist.setQc_submit_by(userName);
						batchReChecklist.setQc_submit_id(userId);
						batchReChecklist.setQc_sign(userName);

						batchReleaseChecklistRepo.save(batchReChecklist);

						batchReChecklisthistory = batchhistoryRepo.fetchLastSubmittedRecordPhNumber(
								batchReChecklist.getBmrNo(), batchReChecklist.getDepartment());

						batchReChecklisthistory.setQc_status(AppConstantsQc.QCApprove);
						batchReChecklisthistory.setQc_submit_on(date);
						batchReChecklisthistory.setQc_submit_by(userName);
						batchReChecklisthistory.setQc_sign(userName);
						batchReChecklisthistory.setQc_submit_id(userId);

						batchhistoryRepo.save(batchReChecklisthistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						batchReChecklist.setReason(reason);
						batchReChecklist.setQc_status(AppConstantsQc.QCRejected);
						batchReChecklist.setQc_submit_on(date);
						batchReChecklist.setQc_submit_id(userId);
						batchReChecklist.setQc_submit_by(userName);
//						batchReChecklist.setIns_status(QaAppConstants.waitingStatus);
//						batchReChecklist.setQc_status_b(QaAppConstants.waitingStatus);

						batchReChecklist.setQc_sign(userName);

						batchReleaseChecklistRepo.save(batchReChecklist);

						batchReChecklisthistory = batchhistoryRepo.fetchLastSubmittedRecordPhNumber(
								batchReChecklist.getBmrNo(), batchReChecklist.getDepartment());

						batchReChecklisthistory.setQc_status(AppConstantsQc.QCRejected);
						batchReChecklisthistory.setReason(reason);
						batchReChecklisthistory.setQc_submit_on(date);
						batchReChecklisthistory.setQc_submit_by(userName);
						batchReChecklisthistory.setQc_sign(userName);
						batchReChecklisthistory.setQc_submit_id(userId);
//						batchReChecklisthistory.setIns_status(QaAppConstants.waitingStatus);
//						batchReChecklisthistory.setQc_status_b(QaAppConstants.waitingStatus);

						batchhistoryRepo.save(batchReChecklisthistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
					HttpStatus.BAD_REQUEST);

		}

	}

	// -------------------------------------------------------------

	public ResponseEntity<?> saveProduction(productionretainedsampleregister40 productionRetain,
			HttpServletRequest http) {
		productionretainedsampleregister40 phy = new productionretainedsampleregister40();
		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = productionRetain.getTest_id();

			if (id != null) {
				phy = productionretainedsampleregister40repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

			if (id != null) {
				if (userRole.equalsIgnoreCase("ROLE_QA")||userRole.equalsIgnoreCase("QA_manager")||userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					for (productionretainedsampleregisterchild1 micro : productionRetain.getProductionSampleA()) {
						if (micro.getId() != null) {
							
//							micro.setIns_saved_by(userName);
//							micro.setIns_saved_id(id);
//							micro.setIns_saved_on(date);
//							micro.setIns_saved_on(date);
//							micro.setIns_status(AppConstantsQc.QainspecterSAVED);
							productionretainedsampleregister40childARepo.save(micro);
						} else {
							micro.setTest_id(productionRetain.getTest_id());
//							micro.setIns_saved_by(userName);
//							micro.setIns_saved_id(id);
//							micro.setIns_saved_on(date);
//							micro.setIns_status(AppConstantsQc.QainspecterSAVED);
							productionretainedsampleregister40childARepo.save(micro);
						}
						
					}

					
					if(productionRetain.getProductionSampleB()!=null && !productionRetain.getProductionSampleB().isEmpty()) {
						for (productionretainedsampleregisterchild2 obs : productionRetain.getProductionSampleB()) {

							if (obs.getId() != null) {
//								productionretainedsampleregisterchild2 obe = productionretainedsampleregister40childBRepo
//										.findById(obs.getId())
//										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
//								BeanUtils.copyProperties(obs, obe);
								obs.setIssue_status(AppConstantsQc.QainspecterSAVED);
								phy.setIssue_status(AppConstantsQc.QainspecterSAVED);
								productionretainedsampleregister40childBRepo.save(obs);
							} else {
								
								
//								productionretainedsampleregisterchild1 obe = productionretainedsampleregister40childARepo.findById(obs.getChild_a()).orElseThrow(() -> new EntityNotFoundException("Test not found"));
//								if(isWithinOneYear(obe.getDate(),obs.getDate())) {
									obs.setTest_id(productionRetain.getTest_id());
									obs.setIssue_status(AppConstantsQc.QainspecterSAVED);
//									obs.setIns_saved_by(userName);
//									obs.setIns_saved_id(id);
//									obs.setIns_saved_on(date);
//									obs.setIns_status(AppConstantsQc.QainspecterSAVED);
									productionretainedsampleregister40childBRepo.save(obs);
									phy.setIssue_status(AppConstantsQc.QainspecterSAVED);
									
//								}
							
							}
						}
					}
				else {
						BeanUtils.copyProperties(productionRetain, phy, IgnoreProps);
						phy.setIns_saved_by(userName);
						phy.setIns_saved_id(id);
						phy.setIns_saved_on(date);
						phy.setIns_saved_on(date);
						phy.setIns_status(AppConstantsQc.QainspecterSAVED);
						
						productionretainedsampleregister40repo.save(phy);
					}

				}
				

				

			} else {

				if (userRole.equalsIgnoreCase("ROLE_QA")||userRole.equalsIgnoreCase("QA_manager")||userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					productionRetain.setIns_saved_by(userName);
					productionRetain.setIns_saved_id(id);
					productionRetain.setIns_saved_on(date);
					productionRetain.setIns_saved_on(date);
					productionRetain.setIns_status(AppConstantsQc.QainspecterSAVED);
					productionretainedsampleregister40repo.save(productionRetain);

					for (productionretainedsampleregisterchild1 micro : productionRetain.getProductionSampleA()) {
						if (micro.getId() != null) {
//							micro.setIns_saved_by(userName);
//							micro.setIns_saved_id(id);
//							micro.setIns_saved_on(date);
//							micro.setIns_status(AppConstantsQc.QainspecterSAVED);
							productionretainedsampleregister40childARepo.save(micro);
						} else {
							micro.setTest_id(productionRetain.getTest_id());
//							micro.setIns_saved_by(userName);
//							micro.setIns_saved_id(id);
//							micro.setIns_saved_on(date);
//							micro.setIns_status(AppConstantsQc.QainspecterSAVED);
							productionretainedsampleregister40childARepo.save(micro);
						}
					}
					
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}

			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(productionRetain, HttpStatus.OK);

	}
	
	//submit
	
	public ResponseEntity<?> saveSubmit(productionretainedsampleregister40 productionRetain,
			HttpServletRequest http) {
		productionretainedsampleregister40 phy = new productionretainedsampleregister40();
		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = productionRetain.getTest_id();

			if (id != null) {
				phy = productionretainedsampleregister40repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

			if (id != null) {
				if (userRole.equalsIgnoreCase("ROLE_QA")||userRole.equalsIgnoreCase("QA_manager")||userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
					
					
					
					BeanUtils.copyProperties(productionRetain, phy, IgnoreProps);
					System.out.println("qc_status : "+phy.getQc_status());
					System.out.println("qc_status : "+AppConstantsQc.QAmanagerApproved.trim());
//					System.out.println("Comparison result: " + !phy.getQc_status().trim().equals(AppConstantsQc.QAmanagerApproved.trim()));

					if( phy.getQc_status() == null || (phy.getQc_status()!=null && !phy.getQc_status().trim().equals(AppConstantsQc.QAmanagerApproved.trim())) ) {
					
						phy.setIns_submit_by(userName);
						phy.setIns_submit_id(id);
						phy.setIns_submit_on(date);
						phy.setIns_sign(userName);
						phy.setSampleRetainedBy(userName);
						phy.setIns_status(AppConstantsQc.QainspecterAPPROVED);
						phy.setQc_status(AppConstantsQc.waitingStatus);
						phy.setProductionSampleA(null);
						phy.setProductionSampleB(null);
						productionretainedsampleregister40repo.save(phy);
					}	else {
//						phy.setIns_submit_by(userName);
//						phy.setIns_submit_id(id);
//						phy.setIns_submit_on(date);
//						phy.setIns_sign(userName);
						phy.setSampleRetainedBy(userName);
						phy.setIns_status(AppConstantsQc.QainspecterAPPROVED);
//						phy.setQc_status(AppConstantsQc.waitingStatus);
						phy.setProductionSampleA(null);
						phy.setProductionSampleB(null);
						productionretainedsampleregister40repo.save(phy);
					}		
					productionretainedsampleregister40history productionHistory = new productionretainedsampleregister40history();
					
					if(productionretainedsampleregister40historyRepo.fetchLastSubmittedRecordPhNumber(phy.getShift(),phy.getDate()) !=null) {
						productionHistory = productionretainedsampleregister40historyRepo.fetchLastSubmittedRecordPhNumber(phy.getShift(),phy.getDate());
					}
					

					BeanUtils.copyProperties(phy, productionHistory , "test_id");

					productionHistory.setProductionSampleA(null);
					productionHistory.setProductionSampleB(null);
					int version = productionretainedsampleregister40historyRepo.getMaximumVersion(phy.getShift(),phy.getDate())
							.map(temp -> temp + 1).orElse(1);
					productionHistory.setVersion(version);
					
					productionretainedsampleregister40historyRepo.save(productionHistory);
					for (productionretainedsampleregisterchild1 micro : productionRetain.getProductionSampleA()) {
						if (micro.getId() != null) {
							
//							micro.setIns_submit_by(userName);
//							micro.setIns_submit_id(id);
//							micro.setIns_submit_on(date);
//							micro.setIns_sign(userName);
//							micro.setIns_status(AppConstantsQc.QainspecterAPPROVED);
//							micro.setQc_status(AppConstantsQc.waitingStatus);
							productionretainedsampleregister40childARepo.save(micro);
							productionretainedsampleregisterHistorychild1 childhistory1 = new productionretainedsampleregisterHistorychild1();
								if(	productionretainedsampleregister40childAHistoryRepo.fetchLastSubmittedRecordPhNumber(phy.getShift(),phy.getDate(),phy.getProduct(),phy.getTest_id())!=null) {
									childhistory1 =	productionretainedsampleregister40childAHistoryRepo.fetchLastSubmittedRecordPhNumber(phy.getShift(),phy.getDate(),phy.getProduct(),phy.getTest_id());
								}
							BeanUtils.copyProperties(micro, childhistory1 , "test_id","id");
							childhistory1.setTest_id(productionHistory.getTest_id());
							productionretainedsampleregister40childAHistoryRepo.save(childhistory1);
							
						} else {
							micro.setTest_id(productionRetain.getTest_id());
//							micro.setIns_submit_by(userName);
//							micro.setIns_submit_id(id);
//							micro.setIns_submit_on(date);
//							micro.setIns_sign(userName);
//							micro.setIns_status(AppConstantsQc.QainspecterAPPROVED);
//							micro.setQc_status(AppConstantsQc.waitingStatus);
							productionretainedsampleregister40childARepo.save(micro);
							productionretainedsampleregisterHistorychild1 childhistory1 = new productionretainedsampleregisterHistorychild1();
							if(	productionretainedsampleregister40childAHistoryRepo.fetchLastSubmittedRecordPhNumber(phy.getShift(),phy.getDate(),phy.getProduct(),phy.getTest_id())!=null) {
								childhistory1 =	productionretainedsampleregister40childAHistoryRepo.fetchLastSubmittedRecordPhNumber(phy.getShift(),phy.getDate(),phy.getProduct(),phy.getTest_id());
							};
							BeanUtils.copyProperties(micro, childhistory1 , "test_id","id");
							childhistory1.setTest_id(productionHistory.getTest_id());
							productionretainedsampleregister40childAHistoryRepo.save(childhistory1);
	
							
						}
						
					}

					if(productionRetain.getProductionSampleB()!=null && !productionRetain.getProductionSampleB().isEmpty()) {
						for (productionretainedsampleregisterchild2 obs : productionRetain.getProductionSampleB()) {

							if (obs.getId() != null) {
								productionretainedsampleregisterchild2 obe = productionretainedsampleregister40childBRepo
										.findById(obs.getId())
										
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								productionretainedsampleregister40childBRepo.save(obs);
								BeanUtils.copyProperties(obs, obe);
								productionretainedsampleregisterHistorychild2 childhistory2 = new productionretainedsampleregisterHistorychild2();
								if(productionretainedsampleregister40childBHistoryRepo.fetchLastSubmittedRecordPhNumber(phy.getShift(),phy.getDate(),phy.getProduct(),phy.getTest_id())!=null) {
									childhistory2  = productionretainedsampleregister40childBHistoryRepo.fetchLastSubmittedRecordPhNumber(phy.getShift(),phy.getDate(),phy.getProduct(),phy.getTest_id());
								}
								BeanUtils.copyProperties(obs, childhistory2 , "test_id","id");
								childhistory2.setTest_id(productionHistory.getTest_id());
								productionretainedsampleregister40childBHistoryRepo.save(childhistory2);
								phy.setIssue_status(AppConstantsQc.QainspecterAPPROVED);
								productionretainedsampleregister40repo.save(phy);
//								productionretainedsampleregister40childBRepo.save(obe);
							} else {
								
//								productionretainedsampleregisterchild1 obe = productionretainedsampleregister40childARepo.findById(obs.getChild_a()).orElseThrow(() -> new EntityNotFoundException("Test not found"));
//								if(isWithinOneYear(obe.getDate(),obs.getDate())) {
									obs.setTest_id(productionRetain.getTest_id());
									productionretainedsampleregister40childBRepo.save(obs);
//									obs.setIns_submit_by(userName);
//									obs.setIns_submit_id(id);
//									obs.setIns_submit_on(date);
//									obs.setIns_status(AppConstantsQc.QainspecterAPPROVED);
//									obs.setQc_status(AppConstantsQc.waitingStatus);
									productionretainedsampleregisterHistorychild2 childhistory2 = new productionretainedsampleregisterHistorychild2();
											if(productionretainedsampleregister40childBHistoryRepo.fetchLastSubmittedRecordPhNumber(phy.getShift(),phy.getDate(),phy.getProduct(),phy.getTest_id())!=null) {
												childhistory2  = productionretainedsampleregister40childBHistoryRepo.fetchLastSubmittedRecordPhNumber(phy.getShift(),phy.getDate(),phy.getProduct(),phy.getTest_id());
											}
									BeanUtils.copyProperties(obs, childhistory2 , "test_id","id");
									childhistory2.setTest_id(productionHistory.getTest_id());
									productionretainedsampleregister40childBHistoryRepo.save(childhistory2);
									phy.setIssue_status(AppConstantsQc.QainspecterAPPROVED);
									productionretainedsampleregister40repo.save(phy);
									
									
//								}
							
							}
						}
					}
					
					
				}

			} else {

				if (userRole.equalsIgnoreCase("ROLE_QA")||userRole.equalsIgnoreCase("QA_manager")||userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
					
					productionRetain.setIns_submit_by(userName);
					productionRetain.setIns_submit_id(id);
					productionRetain.setIns_submit_on(date);
					productionRetain.setIns_sign(userName);
					productionRetain.setSampleRetainedBy(userName);
					productionRetain.setIns_status(AppConstantsQc.QainspecterAPPROVED);
					productionRetain.setQc_status(AppConstantsQc.waitingStatus);

					productionretainedsampleregister40repo.save(productionRetain);
					productionretainedsampleregister40history productionHistory = new productionretainedsampleregister40history();
					BeanUtils.copyProperties(productionRetain, productionHistory , "test_id");

					productionHistory.setProductionSampleA(null);
					productionHistory.setProductionSampleB(null);
					int version = productionretainedsampleregister40historyRepo.getMaximumVersion(phy.getShift(),phy.getDate())
							.map(temp -> temp + 1).orElse(1);
					productionHistory.setVersion(version);
					
					productionretainedsampleregister40historyRepo.save(productionHistory);
					for (productionretainedsampleregisterchild1 micro : productionRetain.getProductionSampleA()) {
						if (micro.getId() != null) {
//							micro.setIns_submit_by(userName);
//							micro.setIns_submit_id(id);
//							micro.setIns_submit_on(date);
//							micro.setIns_sign(userName);
//							micro.setIns_status(AppConstantsQc.QainspecterAPPROVED);
//							micro.setQc_status(AppConstantsQc.waitingStatus);
							
							productionretainedsampleregisterHistorychild1 childhistory1 = new productionretainedsampleregisterHistorychild1();
							if(	productionretainedsampleregister40childAHistoryRepo.fetchLastSubmittedRecordPhNumber(productionRetain.getShift(),productionRetain.getDate(),productionRetain.getProduct(),productionRetain.getTest_id())!=null) {
								childhistory1 =	productionretainedsampleregister40childAHistoryRepo.fetchLastSubmittedRecordPhNumber(productionRetain.getShift(),productionRetain.getDate(),productionRetain.getProduct(),productionRetain.getTest_id());
							};
							BeanUtils.copyProperties(micro, childhistory1 , "test_id","id");
							childhistory1.setTest_id(productionHistory.getTest_id());
							productionretainedsampleregister40childAHistoryRepo.save(childhistory1);
	
							productionretainedsampleregister40childARepo.save(micro);
						} else {
							micro.setTest_id(productionRetain.getTest_id());
//							micro.setIns_submit_by(userName);
//							micro.setIns_submit_id(id);
//							micro.setIns_submit_on(date);
//							micro.setIns_sign(userName);
//							micro.setIns_status(AppConstantsQc.QainspecterAPPROVED);
//							micro.setQc_status(AppConstantsQc.waitingStatus);
							productionretainedsampleregisterHistorychild1 childhistory1 = new productionretainedsampleregisterHistorychild1();
							if(	productionretainedsampleregister40childAHistoryRepo.fetchLastSubmittedRecordPhNumber(productionRetain.getShift(),productionRetain.getDate(),productionRetain.getProduct(),productionRetain.getTest_id())!=null) {
								childhistory1 =	productionretainedsampleregister40childAHistoryRepo.fetchLastSubmittedRecordPhNumber(productionRetain.getShift(),productionRetain.getDate(),productionRetain.getProduct(),productionRetain.getTest_id());
							};
							BeanUtils.copyProperties(micro, childhistory1 , "test_id","id");
							childhistory1.setTest_id(productionHistory.getTest_id());
							productionretainedsampleregister40childAHistoryRepo.save(childhistory1);
	
							productionretainedsampleregister40childARepo.save(micro);
						}
					}
					
					if(productionRetain.getProductionSampleB()!=null && productionRetain.getProductionSampleB().isEmpty()) {
					
						for (productionretainedsampleregisterchild2 obs : productionRetain.getProductionSampleB()) {

							if (obs.getId() != null) {
							
								productionretainedsampleregister40childBRepo.save(obs);
								
								productionretainedsampleregisterHistorychild2 childhistory2 = new productionretainedsampleregisterHistorychild2();
								if(productionretainedsampleregister40childBHistoryRepo.fetchLastSubmittedRecordPhNumber(phy.getShift(),phy.getDate(),phy.getProduct(),phy.getTest_id())!=null) {
									childhistory2  = productionretainedsampleregister40childBHistoryRepo.fetchLastSubmittedRecordPhNumber(phy.getShift(),phy.getDate(),phy.getProduct(),phy.getTest_id());
								}
								BeanUtils.copyProperties(obs, childhistory2 , "test_id","id");
								childhistory2.setTest_id(productionHistory.getTest_id());
								productionretainedsampleregister40childBHistoryRepo.save(childhistory2);
		
//								productionretainedsampleregister40childBRepo.save(obe);
							} else {
								
//								productionretainedsampleregisterchild1 obe = productionretainedsampleregister40childARepo.findById(obs.getChild_a()).orElseThrow(() -> new EntityNotFoundException("Test not found"));
//								if(isWithinOneYear(obe.getDate(),obs.getDate())) {
									obs.setTest_id(productionRetain.getTest_id());
									productionretainedsampleregister40childBRepo.save(obs);
//									obs.setIns_submit_by(userName);
//									obs.setIns_submit_id(id);
//									obs.setIns_submit_on(date);
//									obs.setIns_status(AppConstantsQc.QainspecterAPPROVED);
//									obs.setQc_status(AppConstantsQc.waitingStatus);
									productionretainedsampleregisterHistorychild2 childhistory2 = new productionretainedsampleregisterHistorychild2();
											if(productionretainedsampleregister40childBHistoryRepo.fetchLastSubmittedRecordPhNumber(phy.getShift(),phy.getDate(),phy.getProduct(),phy.getTest_id())!=null) {
												childhistory2  = productionretainedsampleregister40childBHistoryRepo.fetchLastSubmittedRecordPhNumber(phy.getShift(),phy.getDate(),phy.getProduct(),phy.getTest_id());
											}
									BeanUtils.copyProperties(obs, childhistory2 , "test_id","id");
									childhistory2.setTest_id(productionHistory.getTest_id());
									productionretainedsampleregister40childBHistoryRepo.save(childhistory2);
									
//								}
							
							}
						}
					}
					
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}

			}
			
			try {

				qamailfunction.sendMailToProductionRetainList(productionRetain , userRole);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
						HttpStatus.OK);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(productionRetain, HttpStatus.OK);

	}
	
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//	
	  public  boolean isWithinOneYear(String storedDateStr, String inputDateStr) {

	        LocalDate storedDate = LocalDate.parse(storedDateStr, DATE_FORMATTER);
	        LocalDate inputDate = LocalDate.parse(inputDateStr, DATE_FORMATTER);


	        LocalDate oneYearAhead = storedDate.plus(1, ChronoUnit.YEARS);


	        return !inputDate.isAfter(oneYearAhead);
	    }
	  
	  
	  public ResponseEntity<?> approveProduction(ApproveResponse approvalResponse, HttpServletRequest http) {

			SCAUtil sca = new SCAUtil();

			productionretainedsampleregister40 phy = new productionretainedsampleregister40();

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			try {

				phy = productionretainedsampleregister40repo.findById(approvalResponse.getId())
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));

				productionretainedsampleregister40history productionHistory = new productionretainedsampleregister40history();

				String supervisiorStatus = phy.getIns_status() ;

				String hodStatus = phy.getQc_status();

				if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.QainspecterAPPROVED)
						|| supervisiorStatus.equalsIgnoreCase(QaAppConstants.qaInspectorSubmit))
						&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus)
								|| hodStatus.equalsIgnoreCase(QaAppConstants.QaManagerReject)
								|| hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject))) {

					if (userRole.equalsIgnoreCase("QA_Manager") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

						if (approvalResponse.getStatus().equals("Approve")) {

							phy.setQc_status(AppConstantsQc.QAmanagerApproved);
							phy.setApprovedBy(userName);
							phy.setQc_submit_on(date);
							phy.setQc_submit_by(userName);
							phy.setQc_submit_id(userId);
							phy.setQc_sign(userName);

							productionretainedsampleregister40repo.save(phy);

							productionHistory = productionretainedsampleregister40historyRepo.fetchLastSubmittedRecordPhNumber(
									phy.getShift(),phy.getDate());

							productionHistory.setQc_status(AppConstantsQc.QAmanagerApproved);
							productionHistory.setApprovedBy(userName);
							productionHistory.setQc_submit_on(date);
							productionHistory.setQc_submit_by(userName);
							productionHistory.setQc_sign(userName);
							productionHistory.setQc_submit_id(userId);

							productionretainedsampleregister40historyRepo.save(productionHistory);

							return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

						}

						else if (approvalResponse.getStatus().equals("Reject")) {

							String reason = approvalResponse.getRemarks();
							phy.setReason(reason);
							phy.setQc_status(QaAppConstants.QaManagerReject);
							phy.setQc_submit_on(date);
							phy.setQc_submit_id(userId);
							phy.setQc_submit_by(userName);
							
							

							phy.setQc_sign(userName);

							productionretainedsampleregister40repo.save(phy);

							productionHistory = productionretainedsampleregister40historyRepo.fetchLastSubmittedRecordPhNumber(
									phy.getShift(),phy.getDate());

							productionHistory.setQc_status(QaAppConstants.QaManagerReject);
							productionHistory.setApprovedBy(userName);
							productionHistory.setReason(reason);
							productionHistory.setQc_submit_on(date);
							productionHistory.setQc_submit_by(userName);
							productionHistory.setQc_sign(userName);
							productionHistory.setQc_submit_id(userId);
							
							

							productionretainedsampleregister40historyRepo.save(productionHistory);

							return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

						}

						else {
							return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
						}

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
								HttpStatus.BAD_REQUEST);
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
							HttpStatus.BAD_REQUEST);
				}

			} catch (Exception e) {

				String msg = e.getMessage();
				logger.error("Unable to Approve Record" + msg);

				return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
						HttpStatus.BAD_REQUEST);

			}

		}

	  
	  
//	  public ResponseEntity<?> approval(ApproveResponse approvalResponse,HttpServletRequest http){
//		  
//		  String childName = approvalResponse.getProductionSample();
//
//		    try {
//		        if (childName.equalsIgnoreCase("childA")) {
//		            productionretainedsampleregisterchild1 childA = productionretainedsampleregister40childARepo.findById(approvalResponse.getId()).orElse(null);
//		            if (childA != null) {
//		                return approveProductionA(childA, http, approvalResponse);
//		            }
//		        } else if (childName.equalsIgnoreCase("childB")) {
//		            productionretainedsampleregisterchild2 childB = productionretainedsampleregister40childBRepo.findById(approvalResponse.getId()).orElse(null);
//		            if (childB != null) {
//		                return approveProductionB(childB, http, approvalResponse);
//		            }
//		        }
//		        return new ResponseEntity<>(new ApiResponse(false, "Invalid Production Sample"), HttpStatus.BAD_REQUEST);
//
//		    } catch (Exception e) {
//		        logger.error("Approval processing error: " + e.getMessage());
//		        return new ResponseEntity<>(new ApiResponse(false, "Approval/Reject process failed"), HttpStatus.INTERNAL_SERVER_ERROR);
//		    }
//	  }
	  
	  
	  
//	  public ResponseEntity<?> approveProductionA(productionretainedsampleregisterchild1 childA,HttpServletRequest http,ApproveResponse approvalResponse) {
//			
//			try {
//				
//				String userRole = getUserRole();
//				Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
//				String userName = userRepository.getUserName(userId);
//				LocalDateTime currentDate = LocalDateTime.now();
//				Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//				
//
//		
//			
//         productionretainedsampleregisterHistorychild1 childAhistory = new productionretainedsampleregisterHistorychild1();
//			String supervisiorStatus = childA.getIns_status() ;
//
//			String hodStatus = childA.getQc_status();
//
//			if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
//					|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))
//					&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus)
//							|| hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected)
//							|| hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject))) {
//
//				if (userRole.equalsIgnoreCase("QC_Manager") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
//
//					if (approvalResponse.getStatus().equals("Approve")) {
//
//						childA.setQc_status(AppConstantsQc.QCApprove);
//						childA.setQc_submit_on(date);
//						childA.setQc_submit_by(userName);
//						childA.setQc_submit_id(userId);
//						childA.setQc_sign(userName);
//
//						productionretainedsampleregister40childARepo.save(childA);
//
//						childAhistory = productionretainedsampleregister40childAHistoryRepo.fetchLastSubmittedRecordPhNumber(
//								childA.getShift(),childA.getDate(),childA.getProduct());
//
//						childAhistory.setQc_status(AppConstantsQc.QCApprove);
//						childAhistory.setQc_submit_on(date);
//						childAhistory.setQc_submit_by(userName);
//						childAhistory.setQc_sign(userName);
//						childAhistory.setQc_submit_id(userId);
//
//						productionretainedsampleregister40childAHistoryRepo.save(childAhistory);
//
//						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
//
//					}
//
//					else if (approvalResponse.getStatus().equals("Reject")) {
//
//						String reason = approvalResponse.getRemarks();
////						childA.setReason(reason);
//						childA.setQc_status(AppConstantsQc.QCRejected);
//						childA.setQc_submit_on(date);
//						childA.setQc_submit_id(userId);
//						childA.setQc_submit_by(userName);
//
//						childA.setQc_sign(userName);
//
//						productionretainedsampleregister40childARepo.save(childA);
//
//						childAhistory = productionretainedsampleregister40childAHistoryRepo.fetchLastSubmittedRecordPhNumber(
//								childA.getShift(),childA.getDate(),childA.getProduct());
//
//						childAhistory.setQc_status(AppConstantsQc.QCRejected);
////						childAhistory.setReason(reason);
//						childAhistory.setQc_submit_on(date);
//						childAhistory.setQc_submit_by(userName);
//						childAhistory.setQc_sign(userName);
//						childAhistory.setQc_submit_id(userId);
//
//						productionretainedsampleregister40childAHistoryRepo.save(childAhistory);
//
//						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);
//
//					}
//
//					else {
//						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
//					}
//
//				}
//
//				else {
//					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
//							HttpStatus.BAD_REQUEST);
//				}
//
//			}
//
//			else {
//				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
//						HttpStatus.BAD_REQUEST);
//			}
//
//		} catch (Exception e) {
//
//			String msg = e.getMessage();
//			logger.error("Unable to Approve Record" + msg);
//
//			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
//					HttpStatus.BAD_REQUEST);
//
//		}
//	}
//	  
//	  public ResponseEntity<?> approveProductionB(productionretainedsampleregisterchild2 childB,HttpServletRequest http,ApproveResponse approvalResponse) {
//			
//			try {
//				
//				String userRole = getUserRole();
//				Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
//				String userName = userRepository.getUserName(userId);
//				LocalDateTime currentDate = LocalDateTime.now();
//				Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//				
//
//		
//			
//       productionretainedsampleregisterHistorychild2 childBhistory = new productionretainedsampleregisterHistorychild2();
//			String supervisiorStatus = childB.getIns_status() ;
//
//			String hodStatus = childB.getQc_status();
//
//			if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
//					|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))
//					&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus)
//							|| hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected)
//							|| hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject))) {
//
//				if (userRole.equalsIgnoreCase("QC_Manager") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
//
//					if (approvalResponse.getStatus().equals("Approve")) {
//
//						childB.setQc_status(AppConstantsQc.QCApprove);
//						childB.setQc_submit_on(date);
//						childB.setQc_submit_by(userName);
//						childB.setQc_submit_id(userId);
//						childB.setQc_sign(userName);
//
//						productionretainedsampleregister40childBRepo.save(childB);
//
//						childBhistory = productionretainedsampleregister40childBHistoryRepo.fetchLastSubmittedRecordPhNumber(
//								childB.getShift(),childB.getDate(),childB.getProduct());
//
//						childBhistory.setQc_status(AppConstantsQc.QCApprove);
//						childBhistory.setQc_submit_on(date);
//						childBhistory.setQc_submit_by(userName);
//						childBhistory.setQc_sign(userName);
//						childBhistory.setQc_submit_id(userId);
//
//						productionretainedsampleregister40childBHistoryRepo.save(childBhistory);
//
//						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
//
//					}
//
//					else if (approvalResponse.getStatus().equals("Reject")) {
//
//						String reason = approvalResponse.getRemarks();
////						childB.setReason(reason);
//						childB.setQc_status(AppConstantsQc.QCRejected);
//						childB.setQc_submit_on(date);
//						childB.setQc_submit_id(userId);
//						childB.setQc_submit_by(userName);
//
//						childB.setQc_sign(userName);
//
//						productionretainedsampleregister40childBRepo.save(childB);
//
//						childBhistory = productionretainedsampleregister40childBHistoryRepo.fetchLastSubmittedRecordPhNumber(childB.getShift(),childB.getDate(),childB.getProduct());
//
//						childBhistory.setQc_status(AppConstantsQc.QCRejected);
//////						childBhistory.setReason(reason);
//						childBhistory.setQc_submit_on(date);
//						childBhistory.setQc_submit_by(userName);
//						childBhistory.setQc_sign(userName);
//						childBhistory.setQc_submit_id(userId);
//
//						productionretainedsampleregister40childBHistoryRepo.save(childBhistory);
//
//						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);
//
//					}
//
//					else {
//						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
//					}
//
//				}
//
//				else {
//					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
//							HttpStatus.BAD_REQUEST);
//				}
//
//			}
//
//			else {
//				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
//						HttpStatus.BAD_REQUEST);
//			}
//
//		} catch (Exception e) {
//
//			String msg = e.getMessage();
//			logger.error("Unable to Approve Record" + msg);
//
//			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
//					HttpStatus.BAD_REQUEST);
//
//		}
//	}
	  
		public ResponseEntity<?> getallProduction(HttpServletRequest http) {
			List<productionretainedsampleregister40> productionSample = new ArrayList<>();
			

			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);


				
				if (userRole.equalsIgnoreCase("ROLE_QA")) {

					productionSample = productionretainedsampleregister40repo.insSummary();

//					productionSample = productionSample
//					    .parallelStream()
//					    .filter(sample -> (sample.getProductionSampleA() == null || 
//					                       sample.getProductionSampleA()
//					                             .stream()
//					                             .allMatch(value -> (!"QC_APPROVED".equals(value.getIns_status()) && 
//					                                                 ("QA_INSPECTOR_APPROVED".equals(value.getIns_status()) || 
//					                                                  "QA_INSPECTOR_SAVED".equals(value.getIns_status())))))
//					                  &&
//					                  (sample.getProductionSampleB() == null || 
//					                       sample.getProductionSampleB()
//					                             .stream()
//					                             .allMatch(value -> (!"QC_APPROVED".equals(value.getIns_status()) && 
//					                                                 ("QA_INSPECTOR_APPROVED".equals(value.getIns_status()) || 
//					                                                  "QA_INSPECTOR_SAVED".equals(value.getIns_status()))))))
//					    .collect(Collectors.toList());

			}

			else if (userRole.equalsIgnoreCase("ROLE_DESIGNEE") || userRole.equalsIgnoreCase("QA_MANAGER")) {

				productionSample = productionretainedsampleregister40repo.designeSummary();
			}

			try {
				return new ResponseEntity(productionSample, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
						HttpStatus.BAD_REQUEST);

			}

		}
		
		public ResponseEntity<?> printProduction(String month,String year) {

			List<productionretainedsampleregister40> productionSample = new ArrayList<>();
			
			month = (month == null || month.trim().isEmpty()) ? null : month;
			year = (year == null || year.trim().isEmpty()) ? null : year;

			productionSample = productionretainedsampleregister40repo.print(month,year);

			try {
				return new ResponseEntity(productionSample, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
						HttpStatus.BAD_REQUEST);
			}

		}

		public ResponseEntity<?> getProductionUnique(String date,String shift) {

			List<productionretainedsampleregister40> requis = new ArrayList<>();
			date = (date == null || date.trim().isEmpty()) ? null : date;
			shift = (shift == null || shift.trim().isEmpty()) ? null : shift;

			requis = productionretainedsampleregister40repo.getunique(date,shift);

			try {
				return new ResponseEntity(requis, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
						HttpStatus.BAD_REQUEST);
			}

		}

		public ResponseEntity<?> getProductionById(@Valid Long id) {
			productionretainedsampleregister40 requis = productionretainedsampleregister40repo.findById(id)
					.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			try {
				return new ResponseEntity(requis, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
						HttpStatus.BAD_REQUEST);
			}

		}

		public ResponseEntity<?> deleteA(Long id) {			
					
			try {
				productionretainedsampleregister40childARepo.deleteById(id);
				return new ResponseEntity("Data deleted", HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
						HttpStatus.BAD_REQUEST);
			}
		}
		
		public ResponseEntity<?> deleteB(Long id) {			
			
			try {
			productionretainedsampleregister40childBRepo.deleteById(id);
				return new ResponseEntity("Data deleted", HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
						HttpStatus.BAD_REQUEST);
			}
		}


}
