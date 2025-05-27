package com.focusr.Precot.QA.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

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

import com.focusr.Precot.QA.model.ChangeControlLogBookDetails;
import com.focusr.Precot.QA.model.MasterListOfSharpToolDetails;
import com.focusr.Precot.QA.model.QaChangeControlLogBookF042;
import com.focusr.Precot.QA.model.QaMasterListOfSharpToolsF060;
import com.focusr.Precot.QA.model.QaSharpToolsIssueAndVerificationRegisterF062;
import com.focusr.Precot.QA.model.SharpToolIssueAndVerificationRegisterDetails;
import com.focusr.Precot.QA.model.audit.ChangeControlLogBookDetailsHistory;
import com.focusr.Precot.QA.model.audit.MasterListOfSharpToolDetailsHistory;
import com.focusr.Precot.QA.model.audit.QaChangeControlLogBookF042History;
import com.focusr.Precot.QA.model.audit.QaMasterListOfSharpToolsF060History;
import com.focusr.Precot.QA.payload.ApproveResponseF042;
import com.focusr.Precot.QA.repository.QaChangeControlLogBookDetailsRepo;
import com.focusr.Precot.QA.repository.QaChangeControlLogBookRepo;
import com.focusr.Precot.QA.repository.QaMaterialListOfSharpToolsF060Repo;
import com.focusr.Precot.QA.repository.QaMaterialOfSharpToolsDetailsRepo;
import com.focusr.Precot.QA.repository.QaSharpToolIssueAndVerificationRegisterDetailsRepo;
import com.focusr.Precot.QA.repository.QaSharpToolIssueAndVerificationRegisterF062Repo;
import com.focusr.Precot.QA.repository.audit.QaChangeControlLogBookDetailsRepoHistory;
import com.focusr.Precot.QA.repository.audit.QaChangeControlLogBookRepoHistory;
import com.focusr.Precot.QA.repository.audit.QaMasterListOfSharpToolDetailsHistoryRepo;
import com.focusr.Precot.QA.repository.audit.QaMasterSharpToolsF060HistoryRepo;
import com.focusr.Precot.QA.util.QaAppConstants;
import com.focusr.Precot.QA.util.mail.QAMailFunction;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.DepartmentRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.Qc.AppConstantsQc;

/**
 *PH-QAD01-F-042 
 *PH-QAD01-F-060
 *PH-QAD01/F-062
 *@author Jayanth Kumar A.S
 */


@Service
public class QaService7 {

	Logger log = LoggerFactory.getLogger(QaService5.class);

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private SCAUtil scaUtil;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private QaChangeControlLogBookRepo changeControlLogBookRepo;

	@Autowired
	private QaChangeControlLogBookDetailsRepo changeControlDetailsRepo;

	@Autowired
	private QaChangeControlLogBookRepoHistory changeControlLogBookRepoHistory;

	@Autowired
	private QaChangeControlLogBookDetailsRepoHistory changeControlDetailsRepoHistory;

	@Autowired
	private DepartmentRepository departmentrepository;

	@Autowired
	private QaMaterialListOfSharpToolsF060Repo materialListOfSharpToolsRepo;

	@Autowired
	private QaMaterialOfSharpToolsDetailsRepo materialOfSharpToolsDetailsRepo;

	@Autowired
	private QaMasterSharpToolsF060HistoryRepo masterSharpToolsF060HistoryRepo;

	@Autowired
	private QaMasterListOfSharpToolDetailsHistoryRepo masterListOfSharpToolDetailsHistoryRepo;

	@Autowired
	private QaSharpToolIssueAndVerificationRegisterF062Repo sharpToolIssueVerRegRepo;

	@Autowired
	private QaSharpToolIssueAndVerificationRegisterDetailsRepo sharpToolIssueVerRegDetailRepo;
	
	@Autowired
	private QAMailFunction qcMailFunction;


	@Autowired
	QAMailFunction qamailfunction;

	@Transactional
	public ResponseEntity<?> saveChangeControlLogBook(QaChangeControlLogBookF042 changeControlLogBook,
			HttpServletRequest http) {
		if (changeControlLogBook == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		QaChangeControlLogBookF042 savedReport = null;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (changeControlLogBook.getId() != null) {
				savedReport = changeControlLogBookRepo.findById(changeControlLogBook.getId())
						.orElseThrow(() -> new RuntimeException("Report not found"));

				BeanUtils.copyProperties(changeControlLogBook, savedReport, getIgnoredProperties());
				savedReport.setUpdatedAt(date);
				savedReport.setUpdatedBy(userName);
				savedReport.setChangeControlNo(savedReport.getChangeControlNo()); 
			} else {
				savedReport = changeControlLogBookRepo.save(changeControlLogBook);
			}

			if (role.equals("ROLE_HOD")) {
				savedReport.setHodOrDesigneeSavedBy(userName);
				savedReport.setHodOrDesigneeSavedOn(date);
				savedReport.setHodOrDesigneeSavedId(userId);
				savedReport.setHodOrDesigneeStatus(QaAppConstants.hodSaved);

				if (savedReport.getDetails() != null) {
					for (ChangeControlLogBookDetails changeControlDetails : savedReport.getDetails()) {
						changeControlDetails.setId(savedReport.getId());
						changeControlDetails.setIssuedBy(userName);
						changeControlDetails.setIssuedAt(date);
					}
					changeControlDetailsRepo.saveAll(savedReport.getDetails());
				}
			} else if (role.equals("ROLE_DESIGNEE")) {
				savedReport.setHodOrDesigneeSavedBy(userName);
				savedReport.setHodOrDesigneeSavedOn(date);
				savedReport.setHodOrDesigneeSavedId(userId);
				savedReport.setHodOrDesigneeStatus(QaAppConstants.designeeSaved);

				if (savedReport.getDetails() != null) {
					for (ChangeControlLogBookDetails changeControlDetails : savedReport.getDetails()) {
						changeControlDetails.setId(savedReport.getId());
						changeControlDetails.setIssuedBy(userName);
						changeControlDetails.setIssuedAt(date);

					}
					changeControlDetailsRepo.saveAll(savedReport.getDetails());
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
			}

			savedReport = changeControlLogBookRepo.save(savedReport);

		} catch (Exception ex) {
			log.error("**** Unable to save Unable to Save Change Control Log Book! ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Unable to save Change Control Log Book! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
	}

	@Transactional
	public ResponseEntity<?> submitChangeControlLogBook(QaChangeControlLogBookF042 report, HttpServletRequest http) {
		if (report == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		QaChangeControlLogBookF042 savedReportObj;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			QaChangeControlLogBookF042 reportObj = report.getId() != null 
					? changeControlLogBookRepo.findFormById(report.getId()) 
							: new QaChangeControlLogBookF042();

			if (report.getId() == null) {
				// New record, set created fields
				report.setCreatedAt(reportObj.getCreatedAt());
				report.setCreatedBy(reportObj.getCreatedBy());
				reportObj.setCreatedAt(date);// Set created_at to current date

			} else if (reportObj == null) {
				return new ResponseEntity<>(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);
			}

			BeanUtils.copyProperties(report, reportObj, getIgnoredProperties());				


			// Handle the role-specific submission logic
			if (role.equals("ROLE_HOD")) {
				reportObj.setHodOrDesigneeSubmittedBy(userName);
				reportObj.setHodOrDesigneeSubmittedOn(date);
				reportObj.setHodOrDesigneeSubmittedId(userId);
				reportObj.setHodOrDesigneeStatus(QaAppConstants.hodSubmitted);
				reportObj.setHodOrDesigneeSign(userName);

				reportObj.setMrOrQaManagerStatus(QaAppConstants.waitingStatus);
				reportObj.setMail_status(QaAppConstants.waitingStatus);

				reportObj = changeControlLogBookRepo.save(reportObj);

				if (reportObj.getDetails() != null) {
					for (ChangeControlLogBookDetails test : reportObj.getDetails()) {
						test.setId(reportObj.getId()); // Set foreign key
						test.setIssuedBy(userName);
						test.setIssuedAt(date);
					}

				}
				changeControlDetailsRepo.saveAll(reportObj.getDetails());

			} else if (role.equals("ROLE_DESIGNEE")) {
				reportObj.setHodOrDesigneeSubmittedBy(userName);
				reportObj.setHodOrDesigneeSubmittedOn(date);
				reportObj.setHodOrDesigneeSubmittedId(userId);
				reportObj.setHodOrDesigneeStatus(QaAppConstants.designeeSubmitted);
				reportObj.setHodOrDesigneeSign(userName);

				reportObj.setMrOrQaManagerStatus(AppConstantsQc.waitingStatus);
				reportObj.setMail_status(AppConstantsQc.waitingStatus);

				reportObj = changeControlLogBookRepo.save(reportObj);

				if (reportObj.getDetails() != null) {
					for (ChangeControlLogBookDetails test : reportObj.getDetails()) {
						test.setId(reportObj.getId()); // Set foreign key
						test.setIssuedBy(userName);
						test.setIssuedAt(date);
					}

				}

				changeControlDetailsRepo.saveAll(reportObj.getDetails());

			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Only Hod or Designee can submit "), HttpStatus.BAD_REQUEST);
			}
			savedReportObj = changeControlLogBookRepo.save(reportObj);

			saveAuditTrackAndSendEmailF042(savedReportObj, role);

		} catch (Exception ex) {
			log.error("**** Unable to Submit Raw Cotton Analysis Report ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Raw Cotton Analysis Report"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReportObj, HttpStatus.OK);
	}


	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveChangeControlLogBook(ApproveResponseF042 approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		QaChangeControlLogBookF042 report = new QaChangeControlLogBookF042();
		QaChangeControlLogBookF042History reportHistory = new QaChangeControlLogBookF042History();

		String respStatus;
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			report = changeControlLogBookRepo.findFormById(approvalResponse.getId());

			if (report == null) {
				return new ResponseEntity<>(new ApiResponse(false, "Report not found"), HttpStatus.NOT_FOUND);
			}

			reportHistory = changeControlLogBookRepoHistory.fetchLastSubmittedRecordChangeControlNo(report.getChangeControlNo());
			if (reportHistory == null) {
				reportHistory = new QaChangeControlLogBookF042History();
			}
			BeanUtils.copyProperties(report, reportHistory,"id","details");

			// Get statuses
			String hodOrDesigneeStatus = report.getHodOrDesigneeStatus();
			String mrOrQaManagerStatus = report.getMrOrQaManagerStatus();

			if (hodOrDesigneeStatus.equalsIgnoreCase(QaAppConstants.hodSubmitted) || hodOrDesigneeStatus.equalsIgnoreCase(QaAppConstants.designeeSubmitted)) {
				if (userRole.equalsIgnoreCase("ROLE_MR")) {

					if ((approvalResponse.getTentativeClosureDate() != null && !approvalResponse.getTentativeClosureDate().isEmpty())
							&& (approvalResponse.getActualClouserDate() == null || approvalResponse.getActualClouserDate().isEmpty())) {

						ChangeControlLogBookDetailsHistory historyDetail = null;
						if (report.getDetails() != null && reportHistory.getDetails() != null) {
							for (int i = 0; i < report.getDetails().size(); i++) {
								ChangeControlLogBookDetails detail = report.getDetails().get(i);


								if (detail.getDetailsId() == approvalResponse.getDetailsId()) {
									detail.setTentativeClosureDate(approvalResponse.getTentativeClosureDate());
									detail.setRecivedBy(userName);
									detail.setRecivedAt(date);
									historyDetail = reportHistory.getDetails().get(i);
									historyDetail.setTentativeClosureDate(approvalResponse.getTentativeClosureDate());
									historyDetail.setRecivedBy(userName);
									historyDetail.setRecivedAt(date);
									break;
								}
							}
						}
						changeControlDetailsRepo.saveAll(report.getDetails());
						changeControlDetailsRepoHistory.save(historyDetail);
						report.setMrOrQaManagerStatus(QaAppConstants.tentativeDateStatus);
						report.setMrOrQaManagerSavedOn(date);
						report.setMrOrQaManagerSavedBy(userName);
						report.setMrOrQaManagerSign(userName);
						report.setMrOrQaManagerSavedId(userId);

						reportHistory.setMrOrQaManagerStatus(QaAppConstants.tentativeDateStatus);
						reportHistory.setMrOrQaManagerSavedOn(date);
						reportHistory.setMrOrQaManagerSavedBy(userName);
						reportHistory.setMrOrQaManagerSign(userName);
						reportHistory.setMrOrQaManagerSavedId(userId);
					}

					else if (approvalResponse.getActualClouserDate()!=null||!approvalResponse.getActualClouserDate().isEmpty()) {
						report.setActualClouserDate(approvalResponse.getActualClouserDate());
						report.setMrOrQaManagerStatus(QaAppConstants.mrApproved);
						report.setMrOrQaManagerSubmittedOn(date);
						report.setMrOrQaManagerSubmittedBy(userName);
						report.setMrOrQaManagerSign(userName);
						report.setMrOrQaManagerSubmittedId(userId);
						report.setRemark(approvalResponse.getRemarks());

						reportHistory.setActualClouserDate(approvalResponse.getActualClouserDate());
						reportHistory.setMrOrQaManagerStatus(QaAppConstants.mrApproved);
						reportHistory.setMrOrQaManagerSubmittedOn(date);
						reportHistory.setMrOrQaManagerSubmittedBy(userName);
						reportHistory.setMrOrQaManagerSign(userName);
						reportHistory.setMrOrQaManagerSubmittedId(userId);
						reportHistory.setRemark(approvalResponse.getRemarks());
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					changeControlLogBookRepo.save(report);
					changeControlLogBookRepoHistory.save(reportHistory);
					if (report.getMrOrQaManagerStatus().equalsIgnoreCase(QaAppConstants.mrApproved)) {
						respStatus="Approved Successfully And Change Has Been Closed";
					}
					else {
						respStatus="Tentative Clousre Date Has Been Fixed";
					}

					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);

				}else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
					if ((approvalResponse.getTentativeClosureDate()!=null &&!approvalResponse.getTentativeClosureDate().isEmpty())
							&&(approvalResponse.getActualClouserDate()==null||approvalResponse.getActualClouserDate().isEmpty())) {

						ChangeControlLogBookDetailsHistory historyDetail = null;
						if (report.getDetails() != null && reportHistory.getDetails() != null) {
							for (int i = 0; i < report.getDetails().size(); i++) {
								ChangeControlLogBookDetails detail = report.getDetails().get(i);

								if (detail.getDetailsId() == approvalResponse.getDetailsId()) {
									detail.setTentativeClosureDate(approvalResponse.getTentativeClosureDate());
									detail.setRecivedBy(userName);
									detail.setRecivedAt(date);
									historyDetail = reportHistory.getDetails().get(i);
									historyDetail.setTentativeClosureDate(approvalResponse.getTentativeClosureDate());
									historyDetail.setRecivedBy(userName);
									historyDetail.setRecivedAt(date);
									break;
								}
							}
						}
						changeControlDetailsRepo.saveAll(report.getDetails());
						changeControlDetailsRepoHistory.save(historyDetail);
						report.setMrOrQaManagerStatus(QaAppConstants.tentativeDateStatus);
						report.setMrOrQaManagerSavedOn(date);
						report.setMrOrQaManagerSavedBy(userName);
						report.setMrOrQaManagerSign(userName);
						report.setMrOrQaManagerSavedId(userId);

						reportHistory.setMrOrQaManagerStatus(QaAppConstants.tentativeDateStatus);
						reportHistory.setMrOrQaManagerSavedOn(date);
						reportHistory.setMrOrQaManagerSavedBy(userName);
						reportHistory.setMrOrQaManagerSign(userName);
						reportHistory.setMrOrQaManagerSavedId(userId);

					}else if (approvalResponse.getActualClouserDate()!=null||!approvalResponse.getActualClouserDate().isEmpty()) {
						report.setActualClouserDate(approvalResponse.getActualClouserDate());
						report.setMrOrQaManagerStatus(QaAppConstants.QaManagerApproved);
						report.setMrOrQaManagerSubmittedOn(date);
						report.setMrOrQaManagerSubmittedBy(userName);
						report.setMrOrQaManagerSign(userName);
						report.setMrOrQaManagerSubmittedId(userId);
						report.setRemark(approvalResponse.getRemarks());

						reportHistory.setActualClouserDate(approvalResponse.getActualClouserDate());
						reportHistory.setMrOrQaManagerStatus(QaAppConstants.QaManagerApproved);
						reportHistory.setMrOrQaManagerSavedOn(date);
						reportHistory.setMrOrQaManagerSubmittedBy(userName);
						reportHistory.setMrOrQaManagerSign(userName);
						reportHistory.setMrOrQaManagerSubmittedId(userId);
						reportHistory.setRemark(approvalResponse.getRemarks());
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					changeControlLogBookRepo.save(report);
					changeControlLogBookRepoHistory.save(reportHistory);
					if (report.getMrOrQaManagerStatus().equalsIgnoreCase(QaAppConstants.QaManagerApproved)) {
						respStatus="Approved Successfully And Change Has Been Closed";
					}
					else {
						respStatus="Tentative Clousre Date Has Been Fixed";
					}

					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);
				}
				else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"), HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Hod or Designee status is not correct"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			String msg = e.getMessage();
			log.error("Unable to Approve Record: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/Reject Change Control Log Book: " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getChangeControlLogBookById(Long id) {
		try {

			Optional<QaChangeControlLogBookF042> response = changeControlLogBookRepo.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Change Control Log Book Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}


	public ResponseEntity<?> getChangeControlLogBookByChangeControlNo(String changeControlNo) {
		try {

			List<QaChangeControlLogBookF042> listOfChangeControlLogBook = changeControlLogBookRepo.fetchByChangeControlNo(changeControlNo);

			return new ResponseEntity<>(listOfChangeControlLogBook, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Change Control Log Book By Change Control No: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	//trial-2	
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllChangeControlLogBookReports(HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		String dep1 = scaUtil.getDepId(http, tokenProvider);
		String id = userRepository.getDepartmentByemail(dep1);
		String department = departmentrepository.getDeaprtmentById(Long.parseLong(id));
		System.out.println("department name = :"+" "+department);
		List<QaChangeControlLogBookF042> filteredList = null;

		try {
			List<QaChangeControlLogBookF042> listOfChangeControlLogBook = null;
			if (userRole.equalsIgnoreCase("ROLE_HOD")) {
				
				listOfChangeControlLogBook = changeControlLogBookRepo.hodFindAll(userName);
				
				filteredList = listOfChangeControlLogBook.stream()
						.filter(logBook -> department.equalsIgnoreCase(logBook.getIssuedToDepartment()))
						.collect(Collectors.toList());
				
			} else if (userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
				
				listOfChangeControlLogBook = changeControlLogBookRepo.designeeFindAll(userName);
				
				filteredList = listOfChangeControlLogBook.stream()
						.filter(logBook -> department.equalsIgnoreCase(logBook.getIssuedToDepartment()))
						.collect(Collectors.toList());
				
			} else if (userRole.equalsIgnoreCase("ROLE_MR") || userRole.equalsIgnoreCase("QA_MANAGER")) {
				
				listOfChangeControlLogBook = changeControlLogBookRepo.managerFindAll();
				filteredList=listOfChangeControlLogBook;
			}

			if (listOfChangeControlLogBook == null) {
				listOfChangeControlLogBook = new ArrayList<>();
			}

//			List<QaChangeControlLogBookF042> filteredList = listOfChangeControlLogBook.stream()
//					.filter(logBook -> department.equalsIgnoreCase(logBook.getIssuedToDepartment()))
//					.collect(Collectors.toList());

			return new ResponseEntity<>(filteredList, HttpStatus.OK);

		} catch (Exception e) {
			log.error("***************** Unable to get List Of All Change Control Log Book Details! *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get List Of All Change Control Log Book Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public List<String> getAllDepartments() {
		return departmentrepository.getAllDeaprtmentNames();
	}


	public List<String> getAllChangeControlNos() {
		return changeControlLogBookRepo.findAllChangeControlNos();
	}



	public ResponseEntity<?> getPrintChangeControlLogBookByYearAndMonth(String month,String year) {
		try {
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}

			List<QaChangeControlLogBookF042> listOfChangeControlLogBook = changeControlLogBookRepo.findByMonthYearForPrint(month,year);

			return new ResponseEntity<>(listOfChangeControlLogBook, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Bleaching Raw Cotton Contamination Details For Print : " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}


	@Transactional
	public ResponseEntity<?> deleteChildEntity(Long id) {
		try {
			if (!changeControlDetailsRepo.existsByDetailsId(id)) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body("Entity with ID " + id + " not found.");
			}

			changeControlDetailsRepo.deleteByDetailsId(id);

			if (changeControlDetailsRepo.existsByDetailsId(id)) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("Failed to delete entity with ID " + id);
			}

			return ResponseEntity.status(HttpStatus.OK)
					.body("Entity with ID " + id + " deleted successfully.");

		} catch (Exception e) {
			log.error("Error occurred while deleting entity with ID " + id, e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while trying to delete the entity.");
		}
	}
//------------------------------------------------------Material List Of Sharp Tools PH-QAD01-F-060-------------------------------------------------------------------

	@Transactional
	public ResponseEntity<?> saveMasterListSharpF060(QaMasterListOfSharpToolsF060 masterListOfSharpTools,
			HttpServletRequest http) {
		if (masterListOfSharpTools == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		QaMasterListOfSharpToolsF060 savedReport = null;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (masterListOfSharpTools.getId() != null) {
				savedReport = materialListOfSharpToolsRepo.findById(masterListOfSharpTools.getId())
						.orElseThrow(() -> new RuntimeException("Report not found"));

				BeanUtils.copyProperties(masterListOfSharpTools, savedReport, getIgnoredPropertiesF060());
				savedReport.setUpdatedAt(date);
				savedReport.setUpdatedBy(userName);
				savedReport.setDate(savedReport.getDate()); 
				savedReport.setDepartment(savedReport.getDepartment());
			} else {
				savedReport = materialListOfSharpToolsRepo.save(masterListOfSharpTools);
			}

			if (role.equals("ROLE_QA")) {
				savedReport.setQaInspectorSavedBy(userName);
				savedReport.setQaInspectorSavedOn(date);
				savedReport.setQaInspectorSavedId(userId);
				savedReport.setQaInspectorStatus(QaAppConstants.qaInspectorSaved);

				if (savedReport.getDetails() != null) {
					for (MasterListOfSharpToolDetails masterListOfSharpToolDetails : savedReport.getDetails()) {
						masterListOfSharpToolDetails.setId(savedReport.getId());
					}
					materialOfSharpToolsDetailsRepo.saveAll(savedReport.getDetails());
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
			}

			savedReport = materialListOfSharpToolsRepo.save(savedReport);

		} catch (Exception ex) {
			log.error("**** Unable to save Unable to Save Material List Of Sharp Tools  ! ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Unable to save Material List Of Sharp Tools ! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
	}

	@Transactional
	public ResponseEntity<?> submitMasterListSharpF060(QaMasterListOfSharpToolsF060 report, HttpServletRequest http) {
		if (report == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		QaMasterListOfSharpToolsF060 savedReportObj;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			QaMasterListOfSharpToolsF060 reportObj = report.getId() != null 
					? materialListOfSharpToolsRepo.findFormById(report.getId()) 
							: new QaMasterListOfSharpToolsF060();

			if (report.getId() == null) {
				report.setCreatedAt(reportObj.getCreatedAt());
				report.setCreatedBy(reportObj.getCreatedBy());
				reportObj.setCreatedAt(date);

			} else if (reportObj == null) {
				return new ResponseEntity<>(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);
			}

			BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesF060());				


			if (role.equals("ROLE_QA")) {
				reportObj.setQaInspectorSubmittedBy(userName);
				reportObj.setQaInspectorSubmittedOn(date);
				reportObj.setQaInspectorSubmittedId(userId);
				reportObj.setQaInspectorStatus(QaAppConstants.qaInspectorSubmit);
				reportObj.setQaInspectorSign(userName);

				reportObj.setManagerStatus(QaAppConstants.waitingStatus);
				reportObj.setMail_status(QaAppConstants.waitingStatus);

				reportObj = materialListOfSharpToolsRepo.save(reportObj);

				if (reportObj.getDetails() != null) {
					for (MasterListOfSharpToolDetails test : reportObj.getDetails()) {
						test.setId(reportObj.getId()); 
					}

				}
				materialOfSharpToolsDetailsRepo.saveAll(reportObj.getDetails());

			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Only Hod or Designee can submit "), HttpStatus.BAD_REQUEST);
			}
			savedReportObj = materialListOfSharpToolsRepo.save(reportObj);

			saveAuditTrackAndSendEmailF060(savedReportObj, role);

		} catch (Exception ex) {
			log.error("**** Unable to Submit Material List Of Sharp Tools ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Material List Of Sharp Tools"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReportObj, HttpStatus.OK);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveMasterListSharpF060(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		QaMasterListOfSharpToolsF060 report = new QaMasterListOfSharpToolsF060();
		QaMasterListOfSharpToolsF060History reportHistory = new QaMasterListOfSharpToolsF060History();

		String respStatus;
		String userRole = getUserRole();
		System.out.println("user role : "+userRole);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			report = materialListOfSharpToolsRepo.findFormById(approvalResponse.getId());

			if (report == null) {
				return new ResponseEntity<>(new ApiResponse(false, "Report not found"), HttpStatus.NOT_FOUND);
			}

			reportHistory = masterSharpToolsF060HistoryRepo.fetchLastSubmittedRecordDateAndDept(report.getDate(),report.getDepartment());
			if (reportHistory == null) {
				reportHistory = new QaMasterListOfSharpToolsF060History();
			}
			BeanUtils.copyProperties(report, reportHistory,"id","details");

			String qaInspectorStatus = report.getQaInspectorStatus();
			String managerStatus = report.getManagerStatus();

			if (qaInspectorStatus.equalsIgnoreCase(QaAppConstants.qaInspectorSubmit)&&managerStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus)) {
				if (userRole.equalsIgnoreCase("ROLE_MR")) {
					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManagerStatus(QaAppConstants.mrApproved);
						report.setManagerSubmittedOn(date);
						report.setManagerSubmittedBy(userName);
						report.setManagerSign(userName);
						report.setManagerSubmittedId(userId);
						report.setMail_status(QaAppConstants.mrApproved);
						
						reportHistory.setManagerStatus(QaAppConstants.mrApproved);
						reportHistory.setManagerSubmittedOn(date);
						reportHistory.setManagerSubmittedBy(userName);
						reportHistory.setManagerSign(userName);
						reportHistory.setManagerSubmittedId(userId);
						reportHistory.setMail_status(QaAppConstants.mrApproved);


					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManagerStatus(QaAppConstants.mrReject);
						report.setManagerSubmittedOn(date);
						report.setManagerSubmittedBy(userName);
						report.setManagerSign(userName);
						report.setManagerSubmittedId(userId);
						report.setMail_status(QaAppConstants.mrReject);


						reportHistory.setManagerStatus(QaAppConstants.mrReject);
						reportHistory.setReason(reason);
						reportHistory.setManagerSubmittedOn(date);
						reportHistory.setManagerSubmittedBy(userName);
						reportHistory.setManagerSign(userName);
						reportHistory.setManagerSubmittedId(userId);
						reportHistory.setMail_status(QaAppConstants.mrReject);

					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					materialListOfSharpToolsRepo.save(report);
					masterSharpToolsF060HistoryRepo.save(reportHistory);
					if (report.getManagerStatus().equalsIgnoreCase("MR_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);

				}else if (userRole.equalsIgnoreCase("QA_MANAGER")) {

					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManagerStatus(QaAppConstants.QaManagerApproved);
						report.setManagerSubmittedOn(date);
						report.setManagerSubmittedBy(userName);
						report.setManagerSign(userName);
						report.setManagerSubmittedId(userId);
						report.setMail_status(QaAppConstants.QaManagerApproved);
						
						reportHistory.setManagerStatus(QaAppConstants.QaManagerApproved);
						reportHistory.setManagerSubmittedOn(date);
						reportHistory.setManagerSubmittedBy(userName);
						reportHistory.setManagerSign(userName);
						reportHistory.setManagerSubmittedId(userId);
						reportHistory.setMail_status(QaAppConstants.QaManagerApproved);

					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManagerStatus(QaAppConstants.QaManagerReject);
						report.setManagerSubmittedOn(date);
						report.setManagerSubmittedBy(userName);
						report.setManagerSign(userName);
						report.setManagerSubmittedId(userId);
						report.setMail_status(QaAppConstants.QaManagerReject);


						reportHistory.setManagerStatus(QaAppConstants.QaManagerReject);
						reportHistory.setReason(reason);
						reportHistory.setManagerSubmittedOn(date);
						reportHistory.setManagerSubmittedBy(userName);
						reportHistory.setManagerSign(userName);
						reportHistory.setManagerSubmittedId(userId);
						reportHistory.setMail_status(QaAppConstants.QaManagerReject);

					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					materialListOfSharpToolsRepo.save(report);
					masterSharpToolsF060HistoryRepo.save(reportHistory);
					if (report.getManagerStatus().equalsIgnoreCase(QaAppConstants.QaManagerApproved)) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);

				}else if (userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManagerStatus(QaAppConstants.designeeApproved);
						report.setManagerSubmittedOn(date);
						report.setManagerSubmittedBy(userName);
						report.setManagerSign(userName);
						report.setManagerSubmittedId(userId);
						report.setMail_status(QaAppConstants.designeeApproved);
					
						reportHistory.setManagerStatus(QaAppConstants.designeeApproved);
						reportHistory.setManagerSubmittedOn(date);
						reportHistory.setManagerSubmittedBy(userName);
						reportHistory.setManagerSign(userName);
						reportHistory.setManagerSubmittedId(userId);
						reportHistory.setMail_status(QaAppConstants.designeeApproved);


					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManagerStatus(QaAppConstants.designeeRejected);
						report.setManagerSubmittedOn(date);
						report.setManagerSubmittedBy(userName);
						report.setManagerSign(userName);
						report.setManagerSubmittedId(userId);
						report.setMail_status(QaAppConstants.designeeRejected);


						reportHistory.setManagerStatus(QaAppConstants.designeeRejected);
						reportHistory.setReason(reason);
						reportHistory.setManagerSubmittedOn(date);
						reportHistory.setManagerSubmittedBy(userName);
						reportHistory.setManagerSign(userName);
						reportHistory.setManagerSubmittedId(userId);
						reportHistory.setMail_status(QaAppConstants.designeeRejected);

					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					materialListOfSharpToolsRepo.save(report);
					masterSharpToolsF060HistoryRepo.save(reportHistory);
					if (report.getManagerStatus().equalsIgnoreCase(QaAppConstants.designeeApproved)) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);

				}
				else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"), HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Access Denied For This Role"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			String msg = e.getMessage();
			log.error("Unable to Approve Record: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/Material List Of Sharp Tools  Report" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getMasterListSharpById(Long id) {
		try {

			Optional<QaMasterListOfSharpToolsF060> response = materialListOfSharpToolsRepo.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Material List Of Sharp Tools: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}


	public ResponseEntity<?> getMasterListSharpByDateAndDept(String date,String Department) {
		try {
			if (date != null && date.isEmpty()) {
				date = null;
			}
			if (Department != null && Department.isEmpty()) {
				Department = null;
			}

			List<QaMasterListOfSharpToolsF060> listOfMasterListOfSharpTools = materialListOfSharpToolsRepo.findByDateOrDept(date,Department);

			return new ResponseEntity<>(listOfMasterListOfSharpTools, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Change Control Log Book By Change Control No: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllMasterListSharp(HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		String dep1 = scaUtil.getDepId(http, tokenProvider);
		String id = userRepository.getDepartmentByemail(dep1);
		String department = departmentrepository.getDeaprtmentById(Long.parseLong(id));
		System.out.println("department name = :"+" "+department);

		try {
			List<QaMasterListOfSharpToolsF060> listOfMasterListOfSharpTools = null;
			if (userRole.equalsIgnoreCase("ROLE_QA")) {
				listOfMasterListOfSharpTools = materialListOfSharpToolsRepo.qaInspectorFindAll(userName);
			} else if (userRole.equalsIgnoreCase("ROLE_MR") || userRole.equalsIgnoreCase("QA_MANAGER")||userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
				listOfMasterListOfSharpTools = materialListOfSharpToolsRepo.managerFindAll();
			}

			if (listOfMasterListOfSharpTools == null) {
				listOfMasterListOfSharpTools = new ArrayList<>();
			}

//			List<QaMasterListOfSharpToolsF060> filteredList = listOfMasterListOfSharpTools.stream()
//					.filter(logBook -> department.equalsIgnoreCase(logBook.getDepartment()))
//					.collect(Collectors.toList());

			return new ResponseEntity<>(listOfMasterListOfSharpTools, HttpStatus.OK);

		} catch (Exception e) {
			log.error("***************** Unable to get List Of All Master List Of Sharp Tools! *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get List Of All Master List Of Sharp Tools!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getPrintMasterListSharpByYearAndMonthAndDate(String month,String year,String date,String department) {
		try {
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}
			if (date != null && date.isEmpty()) {
				date = null;
			}
			if (department != null && department.isEmpty()) {
				department = null;
			}

			List<QaMasterListOfSharpToolsF060> listOfMasterListOfSharpTools = materialListOfSharpToolsRepo.findByMonthYearDateDeptForPrint(month,year,date,department);

			return new ResponseEntity<>(listOfMasterListOfSharpTools, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Master List Of Sharp Tools Details For Print : " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	@Transactional
	public ResponseEntity<?> deleteChildEntityF060(Long id) {
		try {
			if (!materialOfSharpToolsDetailsRepo.existsByDetailsId(id)) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body("Entity with ID " + id + " not found.");
			}

			materialOfSharpToolsDetailsRepo.deleteByDetailsId(id);

			if (materialOfSharpToolsDetailsRepo.existsByDetailsId(id)) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("Failed to delete entity with ID " + id);
			}

			return ResponseEntity.status(HttpStatus.OK)
					.body("Entity with ID " + id + " deleted successfully.");

		} catch (Exception e) {
			log.error("Error occurred while deleting entity with ID " + id, e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while trying to delete the entity.");
		}
	}


	//------------------------------------------------------Sharp Tools Issue & Verification Register PH-QAD01-F-062-------------------------------------------------------------------

//	@Transactional
//	public ResponseEntity<?> saveSharpToolsF062(QaSharpToolsIssueAndVerificationRegisterF062 sharpToolsAndVerRegF062,
//			HttpServletRequest http) {
//		if (sharpToolsAndVerRegF062 == null) {
//			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
//		}
//
//		QaSharpToolsIssueAndVerificationRegisterF062 savedReport = null;
//
//		try {
//
//			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
//			String userName = userRepository.getUserName(userId);
//			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
//
//			LocalDateTime currentDate = LocalDateTime.now();
//			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//			if (sharpToolsAndVerRegF062.getId() != null) {
//				savedReport = sharpToolIssueVerRegRepo.findById(sharpToolsAndVerRegF062.getId())
//						.orElseThrow(() -> new RuntimeException("Report not found"));
//
//				BeanUtils.copyProperties(sharpToolsAndVerRegF062, savedReport, getIgnoredPropertiesF062());
//				savedReport.setUpdatedAt(date);
//				savedReport.setUpdatedBy(userName);
//				savedReport.setDepartment(savedReport.getDepartment());
//			} else {
//				savedReport = sharpToolIssueVerRegRepo.save(sharpToolsAndVerRegF062);
//			}
//
//			if (role.equals("ROLE_SUPERVISOR")) {
//
//				if (savedReport.getDetails() != null) {
//					for (SharpToolIssueAndVerificationRegisterDetails masterListOfSharpToolDetails : savedReport.getDetails()) {
////						masterListOfSharpToolDetails.setId(savedReport.getId());
//						masterListOfSharpToolDetails.setSupervisorSavedBy(userName);
//						masterListOfSharpToolDetails.setSupervisorSavedOn(date);
//						masterListOfSharpToolDetails.setSupervisorSavedId(userId);
//						masterListOfSharpToolDetails.setSupervisorStatus(QaAppConstants.SupervisorSave);
//						masterListOfSharpToolDetails.setParentReport(savedReport);
//					}
//					sharpToolIssueVerRegDetailRepo.saveAll(savedReport.getDetails());
//				}
//			} else {
//				return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
//			}
//
//			savedReport = sharpToolIssueVerRegRepo.save(savedReport);
//
//		} catch (Exception ex) {
//			log.error("**** Unable to save Unable to Sharp Tools Issue & Verification Register  ! ****", ex);
//			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Sharp Tools Issue & Verification Register ! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
//		}
//
//		return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
//	}
//2	
	@Transactional
	public ResponseEntity<?> saveSharpToolsF062(QaSharpToolsIssueAndVerificationRegisterF062 sharpToolsAndVerRegF062,
	                                            HttpServletRequest http) {
	    if (sharpToolsAndVerRegF062 == null) {
	        return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
	    }

	    QaSharpToolsIssueAndVerificationRegisterF062 savedReport = null;

	    try {
	        Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
	        String userName = userRepository.getUserName(userId);
	        String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

	        LocalDateTime currentDate = LocalDateTime.now();
	        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

	        // Check if it is an update or a new entry
	        if (sharpToolsAndVerRegF062.getId() != null) {
	            savedReport = sharpToolIssueVerRegRepo.findById(sharpToolsAndVerRegF062.getId())
	                    .orElseThrow(() -> new RuntimeException("Report not found"));

	            BeanUtils.copyProperties(sharpToolsAndVerRegF062, savedReport, getIgnoredPropertiesF062());
	            savedReport.setUpdatedAt(date);
	            savedReport.setUpdatedBy(userName);
	            savedReport.setDepartment(savedReport.getDepartment());
	        } else {
	            // Ensure the details have the parent report association
	            if (sharpToolsAndVerRegF062.getDetails() != null) {
	                for (SharpToolIssueAndVerificationRegisterDetails detail : sharpToolsAndVerRegF062.getDetails()) {
	                    detail.setParentReport(sharpToolsAndVerRegF062);
	                }
	            }
	            savedReport = sharpToolIssueVerRegRepo.save(sharpToolsAndVerRegF062);
	        }

	        if (role.equals("ROLE_SUPERVISOR")) {
	            if (savedReport.getDetails() != null) {
	                for (SharpToolIssueAndVerificationRegisterDetails detail : savedReport.getDetails()) {
	                    // Associate each detail with the parent report and update supervisor fields
	                    detail.setParentReport(savedReport);
	                    detail.setSupervisorSavedBy(userName);
	                    detail.setSupervisorSavedOn(date);
	                    detail.setSupervisorSavedId(userId);
	                    detail.setSupervisorStatus(QaAppConstants.SupervisorSave);
	                }
	                // Save all details in one batch
	                sharpToolIssueVerRegDetailRepo.saveAll(savedReport.getDetails());
	            }
	        } else {
	            return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
	        }

	        savedReport = sharpToolIssueVerRegRepo.save(savedReport);

	    } catch (Exception ex) {
	        log.error("**** Unable to save Unable to Sharp Tools Issue & Verification Register  ! ****", ex);
	        return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Sharp Tools Issue & Verification Register ! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
	    }

	    return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
	}



//	@Transactional
//	public ResponseEntity<?> submitSharpToolsF062(QaSharpToolsIssueAndVerificationRegisterF062 report, HttpServletRequest http) {
//		if (report == null) {
//			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
//		}
//
//		QaSharpToolsIssueAndVerificationRegisterF062 savedReportObj;
//
//		try {
//
//			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
//			String userName = userRepository.getUserName(userId);
//			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
//			LocalDateTime currentDate = LocalDateTime.now();
//			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//			QaSharpToolsIssueAndVerificationRegisterF062 reportObj = report.getId() != null 
//					? sharpToolIssueVerRegRepo.findFormById(report.getId()) 
//							: new QaSharpToolsIssueAndVerificationRegisterF062();
//
//			if (report.getId() == null) {
//				// New record, set created fields
//				report.setCreatedAt(reportObj.getCreatedAt());
//				report.setCreatedBy(reportObj.getCreatedBy());
//				reportObj.setCreatedAt(date);// Set created_at to current date
//
//			} else if (reportObj == null) {
//				return new ResponseEntity<>(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);
//			}
//
//			BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesF062());				
//
//
//			if (role.equals("ROLE_SUPERVISOR")) {
//
//				reportObj = sharpToolIssueVerRegRepo.save(reportObj);
//
//				if (reportObj.getDetails() != null) {
//					for (SharpToolIssueAndVerificationRegisterDetails test : reportObj.getDetails()) {
//						if (test.getRecivedBackOnReciversSign() != null &&
//								!test.getRecivedBackOnReciversSign().isEmpty() &&
//								!test.getRecivedBackOnReciversSign().equalsIgnoreCase("NA") &&
//								!test.getRecivedBackOnReciversSign().equalsIgnoreCase("N/A")) {
//
//							test.setSupervisorSubmittedBy(userName);
//							test.setSupervisorSubmittedOn(date);
//							test.setSupervisorSubmittedId(userId);
//							test.setSupervisorStatus(QaAppConstants.SupervisorApprove);
//							test.setSupervisorSign(userName);
//						}
//
//						test.setId(report.getId()); // Set foreign key
//					}
//
//				}
//				sharpToolIssueVerRegDetailRepo.saveAll(reportObj.getDetails());
//
//			} else {
//				return new ResponseEntity<>(new ApiResponse(false, "Only Hod or Designee can submit "), HttpStatus.BAD_REQUEST);
//			}
//			savedReportObj = sharpToolIssueVerRegRepo.save(reportObj);
//
//		} catch (Exception ex) {
//			log.error("**** Unable to Submit Material List Of Sharp Tools Issue & Verification Register ****", ex);
//			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Material List Of Sharp Tools Issue & Verification Register"), HttpStatus.BAD_REQUEST);
//		}
//
//		return new ResponseEntity<>(savedReportObj, HttpStatus.OK);
//	}
//2	
	@Transactional
	public ResponseEntity<?> submitSharpToolsF062(QaSharpToolsIssueAndVerificationRegisterF062 report, HttpServletRequest http) {
	    if (report == null) {
	        return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
	    }

	    QaSharpToolsIssueAndVerificationRegisterF062 savedReportObj;

	    try {
	        Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
	        String userName = userRepository.getUserName(userId);
	        String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
	        LocalDateTime currentDate = LocalDateTime.now();
	        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

	        // Check if the report exists or is a new report
	        QaSharpToolsIssueAndVerificationRegisterF062 reportObj = report.getId() != null 
	                ? sharpToolIssueVerRegRepo.findFormById(report.getId()) 
	                : new QaSharpToolsIssueAndVerificationRegisterF062();

	        if (report.getId() == null) {
	            // New record, set created fields
	            report.setCreatedAt(date); // Set created_at to current date
	            report.setCreatedBy(userName);
	            reportObj.setCreatedAt(date); // Ensure new record has the current creation date
	            reportObj.setCreatedBy(userName);
	        }else if(reportObj != null){
	            // Ensure the details have the parent report association
	            if (report.getDetails() != null) {
	                for (SharpToolIssueAndVerificationRegisterDetails detail : report.getDetails()) {
	                    detail.setParentReport(report);
	                }
	            }
	        }else if(reportObj == null)  {
	            return new ResponseEntity<>(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);
	        }

	        // Copy properties from incoming report to the existing or new report object, excluding specific fields
	        BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesF062());

	        if (role.equals("ROLE_SUPERVISOR")) {
	            // Save the parent report object
	            reportObj = sharpToolIssueVerRegRepo.save(reportObj);

	            if (reportObj.getDetails() != null) {
	                for (SharpToolIssueAndVerificationRegisterDetails detail : reportObj.getDetails()) {
	                    if (detail.getRecivedBackOnReciversSign() != null &&
	                            !detail.getRecivedBackOnReciversSign().isEmpty() &&
	                            !detail.getRecivedBackOnReciversSign().equalsIgnoreCase("NA") &&
	                            !detail.getRecivedBackOnReciversSign().equalsIgnoreCase("N/A")) {

	                        // Set supervisor approval details for the child entry
	                        detail.setSupervisorSubmittedBy(userName);
	                        detail.setSupervisorSubmittedOn(date);
	                        detail.setSupervisorSubmittedId(userId);
	                        detail.setSupervisorStatus(QaAppConstants.SupervisorApprove);
	                        detail.setSupervisorSign(userName);
	                    }

	                    // Set the parent report (foreign key) for each detail entry
	                    detail.setParentReport(reportObj); // This will set the foreign key reference

	                    // Save the child entry (whether new or updated)
	                    if (detail.getDetailsId() != null) {
	                        // Existing detail, update it
	                        sharpToolIssueVerRegDetailRepo.save(detail);
	                    } else {
	                        // New detail, save it and automatically set the foreign key through parentReport
	                    	if (detail.getRecivedBackOnReciversSign() != null &&
		                            !detail.getRecivedBackOnReciversSign().isEmpty() &&
		                            !detail.getRecivedBackOnReciversSign().equalsIgnoreCase("NA") &&
		                            !detail.getRecivedBackOnReciversSign().equalsIgnoreCase("N/A")) {

		                        // Set supervisor approval details for the child entry
		                        detail.setSupervisorSubmittedBy(userName);
		                        detail.setSupervisorSubmittedOn(date);
		                        detail.setSupervisorSubmittedId(userId);
		                        detail.setSupervisorStatus(QaAppConstants.SupervisorApprove);
		                        detail.setSupervisorSign(userName);
		                    }else {
		                    	  detail.setSupervisorSubmittedBy(userName);
			                        detail.setSupervisorSubmittedOn(date);
			                        detail.setSupervisorSubmittedId(userId);
			                        detail.setSupervisorStatus(QaAppConstants.SupervisorApprove);
			                        detail.setSupervisorSign(userName);
		                    }
	                        sharpToolIssueVerRegDetailRepo.save(detail);
	                    }
	                }
	            }
	        } else {
	            return new ResponseEntity<>(new ApiResponse(false, "Only Hod or Designee can submit"), HttpStatus.BAD_REQUEST);
	        }

	        // Save the parent report object (for updates)
	        savedReportObj = sharpToolIssueVerRegRepo.save(reportObj);

	    } catch (Exception ex) {
	        log.error("**** Unable to Submit Sharp Tools Issue & Verification Register ****", ex);
	        return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Sharp Tools Issue & Verification Register"), HttpStatus.BAD_REQUEST);
	    }

	    return new ResponseEntity<>(savedReportObj, HttpStatus.OK);
	}



	

	public ResponseEntity<?> getSharpToolsF062ById(Long id) {
		try {

			Optional<QaSharpToolsIssueAndVerificationRegisterF062> response = sharpToolIssueVerRegRepo.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Material List Of Sharp Tools Issue & Verification Register : " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}


//	@SuppressWarnings("unchecked")
//	public ResponseEntity<?> getAllSharpToolsF062(HttpServletRequest http) {
//		SCAUtil sca = new SCAUtil();
//		String userRole = getUserRole();
//		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//		String userName = userRepository.getUserName(userId);
//		String dep1 = scaUtil.getDepId(http, tokenProvider);
//		String id = userRepository.getDepartmentByemail(dep1);
//		String department = departmentrepository.getDeaprtmentById(Long.parseLong(id));
//		System.out.println("department name = :" + " " + department);
//
//		try {
//			List<QaSharpToolsIssueAndVerificationRegisterF062> listOfsharpToolsAndVerReg = null;
//
//			if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
//				listOfsharpToolsAndVerReg = sharpToolIssueVerRegRepo.qaInspectorFindAll(userName);
//			}
//
//			if (listOfsharpToolsAndVerReg == null) {
//				listOfsharpToolsAndVerReg = new ArrayList<>();
//			}
//
//			List<QaSharpToolsIssueAndVerificationRegisterF062> filteredList = listOfsharpToolsAndVerReg.stream()
//					.filter(logBook -> department.equalsIgnoreCase(logBook.getDepartment())) // Filter by department
//					.map(logBook -> {
//						// Filter out child entries with "SUPERVISOR_APPROVED" status
//						List<SharpToolIssueAndVerificationRegisterDetails> filteredDetails = logBook.getDetails().stream()
//								.filter(detail -> !"SUPERVISOR_APPROVED".equalsIgnoreCase(detail.getSupervisorStatus()))
//								.collect(Collectors.toList());
//					
//						logBook.setDetails(filteredDetails);
//						return logBook;
//					})
//					.collect(Collectors.toList());
//
//			return new ResponseEntity<>(filteredList, HttpStatus.OK);
//
//		} catch (Exception e) {
//			log.error("***************** Unable to get List Of All Master List Of Sharp Tools! *********************\n" + e);
//
//			String msg = sca.getErrorMessage(e);
//
//			return new ResponseEntity<>(
//					new ApiResponse(false, "Unable to get List Of All Master List Of Sharp Tools!" + msg),
//					HttpStatus.BAD_REQUEST
//					);
//		}
//	}
	
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllSharpToolsF062(HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		String dep1 = scaUtil.getDepId(http, tokenProvider);
		String id = userRepository.getDepartmentByemail(dep1);
		String department = departmentrepository.getDeaprtmentById(Long.parseLong(id));
		System.out.println("department name = :" + " " + department);

		try {
			List<QaSharpToolsIssueAndVerificationRegisterF062> listOfsharpToolsAndVerReg = null;

			if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
				listOfsharpToolsAndVerReg = sharpToolIssueVerRegRepo.qaInspectorFindAll(userName);
			}

			if (listOfsharpToolsAndVerReg == null) {
				listOfsharpToolsAndVerReg = new ArrayList<>();
			}

			List<QaSharpToolsIssueAndVerificationRegisterF062> filteredList = listOfsharpToolsAndVerReg.stream()
					.filter(logBook -> department.equalsIgnoreCase(logBook.getDepartment())) // Filter by department
					.map(logBook -> {
						// Filter out child entries with "SUPERVISOR_APPROVED" status
						List<SharpToolIssueAndVerificationRegisterDetails> filteredDetails = logBook.getDetails().stream()
								.filter(detail -> !"SUPERVISOR_APPROVED".equalsIgnoreCase(detail.getSupervisorStatus()))
								.collect(Collectors.toList());
					
						// Set details to empty if all children are SUPERVISOR_APPROVED
						if (filteredDetails.isEmpty()) {
							logBook.setDetails(new ArrayList<>());
						} else {
							logBook.setDetails(filteredDetails);
						}
						return logBook;
					})
					.collect(Collectors.toList());

			return new ResponseEntity<>(filteredList, HttpStatus.OK);

		} catch (Exception e) {
			log.error("***************** Unable to get List Of All Master List Of Sharp Tools! *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get List Of All Master List Of Sharp Tools!" + msg),
					HttpStatus.BAD_REQUEST
					);
		}
	}


//	@SuppressWarnings("unchecked")
//	public ResponseEntity<?> getForPrintSharpToolsF062(String department, String year, String month, String date) {
//		SCAUtil sca = new SCAUtil();
//
//		try {
//			List<QaSharpToolsIssueAndVerificationRegisterF062> listOfsharpToolsAndVerReg = null;
//
//			listOfsharpToolsAndVerReg = sharpToolIssueVerRegRepo.findAll();
//
//			if (listOfsharpToolsAndVerReg == null) {
//				listOfsharpToolsAndVerReg = new ArrayList<>();
//			}
//
//			List<QaSharpToolsIssueAndVerificationRegisterF062> filteredList = listOfsharpToolsAndVerReg.stream()
//					.filter(logBook -> (department == null || department.equalsIgnoreCase(logBook.getDepartment())))
//					.map(logBook -> {
//						List<SharpToolIssueAndVerificationRegisterDetails> filteredDetails = logBook.getDetails().stream()
//								.filter(detail -> "SUPERVISOR_APPROVED".equalsIgnoreCase(detail.getSupervisorStatus())
//										&& (year == null || year.equals(detail.getYear()))
//										&& (month == null || month.equals(detail.getMonth()))
//										&& (date == null || date.equals(detail.getIssueDetailsDate()))
//										)
//								.collect(Collectors.toList());
//
//						logBook.setDetails(filteredDetails);
//						return logBook;
//					})
//					.filter(logBook -> !logBook.getDetails().isEmpty())
//					.collect(Collectors.toList());
//
//			return new ResponseEntity<>(filteredList, HttpStatus.OK);
//
//		} catch (Exception e) {
//			log.error("***************** Unable to get List Of All Master List Of Sharp Tools! *********************\n" + e);
//
//			String msg = sca.getErrorMessage(e);
//
//			return new ResponseEntity<>(
//					new ApiResponse(false, "Unable to get List Of All Master List Of Sharp Tools!" + msg),
//					HttpStatus.BAD_REQUEST
//					);
//		}
//	}
	
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getForPrintSharpToolsF062(String department, String year, String month, String date) {
		SCAUtil sca = new SCAUtil();

		try {
			// Fetch all records without restricting the list
			List<QaSharpToolsIssueAndVerificationRegisterF062> listOfsharpToolsAndVerReg = sharpToolIssueVerRegRepo.findAll();

			if (listOfsharpToolsAndVerReg == null) {
				listOfsharpToolsAndVerReg = new ArrayList<>();
			}

			List<QaSharpToolsIssueAndVerificationRegisterF062> filteredList = listOfsharpToolsAndVerReg.stream()
					.filter(logBook -> department == null || department.equalsIgnoreCase(logBook.getDepartment()))
					.map(logBook -> {
						// Filter the child entities based on multiple conditions
						List<SharpToolIssueAndVerificationRegisterDetails> filteredDetails = logBook.getDetails().stream()
								.filter(detail -> "SUPERVISOR_APPROVED".equalsIgnoreCase(detail.getSupervisorStatus())
										&& (year == null || year.equals(detail.getYear()))
										&& (month == null || month.equals(detail.getMonth()))
										&& (date == null || date.equals(detail.getIssueDetailsDate()))
								)
								.collect(Collectors.toList());

						// Set the filtered details back to the logBook
						logBook.setDetails(filteredDetails);
						return logBook;
					})
					// Ensure only logBook entries with non-empty details are returned
					.filter(logBook -> !logBook.getDetails().isEmpty())
					.collect(Collectors.toList());

			return new ResponseEntity<>(filteredList, HttpStatus.OK);

		} catch (Exception e) {
			log.error("***************** Unable to get List Of All Master List Of Sharp Tools! *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get List Of All Master List Of Sharp Tools!" + msg),
					HttpStatus.BAD_REQUEST
			);
		}
	}


	@Transactional
	public ResponseEntity<?> deleteChildEntityF062(Long id) {
		try {
			if (!sharpToolIssueVerRegDetailRepo.existsByDetailsId(id)) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body("Entity with ID " + id + " not found.");
			}

			sharpToolIssueVerRegDetailRepo.deleteByDetailsId(id);

			if (sharpToolIssueVerRegDetailRepo.existsByDetailsId(id)) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("Failed to delete entity with ID " + id);
			}

			return ResponseEntity.status(HttpStatus.OK)
					.body("Entity with ID " + id + " deleted successfully.");

		} catch (Exception e) {
			log.error("Error occurred while deleting entity with ID " + id, e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while trying to delete the entity.");
		}
	}



	//-----------------------------------------------------helper method------------------------------------------------------------------------------------------------------------	

	private void saveAuditTrackAndSendEmailF042(QaChangeControlLogBookF042 reportObj, String role) {

		QaChangeControlLogBookF042History reportHistory = new QaChangeControlLogBookF042History();

		BeanUtils.copyProperties(reportObj, reportHistory, "id", "version", "details");

		int version = changeControlLogBookRepoHistory.getMaximumVersion(reportHistory.getChangeControlNo())
				.map(temp -> temp + 1)
				.orElse(1);
		reportHistory.setVersion(version);

		QaChangeControlLogBookF042History savedHistory = changeControlLogBookRepoHistory.save(reportHistory);

		if (reportObj.getDetails() != null) {
			List<ChangeControlLogBookDetailsHistory> detailHistories = new ArrayList<>();
			for (ChangeControlLogBookDetails test : reportObj.getDetails()) {
				ChangeControlLogBookDetailsHistory testHistory = new ChangeControlLogBookDetailsHistory();
				BeanUtils.copyProperties(test, testHistory, "detailsId");
				testHistory.setId(savedHistory.getId());
				detailHistories.add(testHistory);
			}
			changeControlDetailsRepoHistory.saveAll(detailHistories);
		}

//		 Optional: Implement email sending logic here
				try {
					qcMailFunction.sendMailToQaManagerF042(reportObj);
					qcMailFunction.sendMailToMrManagerF042(reportObj);
		
				} catch (Exception ex) {
					log.error("**** Unable to send email after submission ****", ex);
				}
	}

	private void saveAuditTrackAndSendEmailF060(QaMasterListOfSharpToolsF060 reportObj, String role) {

		QaMasterListOfSharpToolsF060History reportHistory = new QaMasterListOfSharpToolsF060History();

		BeanUtils.copyProperties(reportObj, reportHistory, "id", "version", "details");

		int version = masterSharpToolsF060HistoryRepo.getMaximumVersion(reportHistory.getDate(),reportHistory.getDepartment())
				.map(temp -> temp + 1)
				.orElse(1);
		reportHistory.setVersion(version);

		QaMasterListOfSharpToolsF060History savedHistory = masterSharpToolsF060HistoryRepo.save(reportHistory);

		if (reportObj.getDetails() != null) {
			List<MasterListOfSharpToolDetailsHistory> detailHistories = new ArrayList<>();
			for (MasterListOfSharpToolDetails test : reportObj.getDetails()) {
				MasterListOfSharpToolDetailsHistory testHistory = new MasterListOfSharpToolDetailsHistory();
				BeanUtils.copyProperties(test, testHistory, "detailsId");
				testHistory.setId(savedHistory.getId());
				detailHistories.add(testHistory);
			}
			masterListOfSharpToolDetailsHistoryRepo.saveAll(detailHistories);
		}

		try {
			
			qcMailFunction.sendMailToQaManagerF060(reportObj);
			qcMailFunction.sendMailToMrManagerF060(reportObj);

		} catch (Exception ex) {
			log.error("**** Unable to send email after submission ****", ex);
		}
	}



	private String[] getIgnoredProperties() {
		return new String[]{
				"id","createdBy", "createdAt", 
				"hodOrDesigneeSavedOn", "hodOrDesigneeSavedBy", "hodOrDesigneeSavedId", "hodOrDesigneeSubmittedOn", 
				"hodOrDesigneeSubmittedBy", "hodOrDesigneeSubmittedId", "hodOrDesigneeSign", "hodOrDesigneeStatus",
				"mrOrQaManagerSavedOn", "mrOrQaManagerSavedBy", "mrOrQaManagerSavedId", "mrOrQaManagerSubmittedOn", 
				"mrOrQaManagerSubmittedBy", "mrOrQaManagerSubmittedId", "mrOrQaManagerSign", "mrOrQaManagerStatus",
				"mail_status"
		};


	}

	private String[] getIgnoredPropertiesF060() {
		return new String[]{
				"id","createdBy", "createdAt", 
				"qaInspectorSavedOn", "qaInspectorSavedBy", "qaInspectorSavedId", "qaInspectorSubmittedOn", 
				"qaInspectorSubmittedBy", "qaInspectorSubmittedId", "qaInspectorSign", "qaInspectorStatus",
				"managerSubmittedOn","managerSubmittedBy", "managerSubmittedId", "managerSign", "managerStatus",
				"mail_status"
		};
	}

	private String[] getIgnoredPropertiesF062() {
		return new String[]{
				"id","createdBy", "createdAt", 
				"qaInspectorSavedOn", "qaInspectorSavedBy", "qaInspectorSavedId", "qaInspectorSubmittedOn", 
				"qaInspectorSubmittedBy", "qaInspectorSubmittedId", "qaInspectorSign", "qaInspectorStatus"
		};
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
