package com.focusr.Precot.QA.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.bouncycastle.util.encoders.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.focusr.Precot.QA.model.ActionReportInfo;
import com.focusr.Precot.QA.model.CorrectiveActionReport;
import com.focusr.Precot.QA.model.SupplierAuditPlan;
import com.focusr.Precot.QA.model.SupplierAuditPlanInfo;
import com.focusr.Precot.QA.model.SupplierAuditPlanSummaryDTO;
import com.focusr.Precot.QA.model.SupplierAuditReport;
import com.focusr.Precot.QA.model.SupplierAuditReportSummaryDTO;
import com.focusr.Precot.QA.model.TrainingCalendar;
import com.focusr.Precot.QA.model.TrainingCalendarSummaryDTO;
import com.focusr.Precot.QA.model.TrainingQuestionnaire;
import com.focusr.Precot.QA.model.TrainingQuestionnaireSummaryDTO;
import com.focusr.Precot.QA.model.TrainingSession;
import com.focusr.Precot.QA.model.TrainingTopic;
import com.focusr.Precot.QA.model.audit.ActionReportInfoHistory;
import com.focusr.Precot.QA.model.audit.CorrectiveActionReportHistory;
import com.focusr.Precot.QA.model.CorrectiveActionReportSummaryDTO;
import com.focusr.Precot.QA.model.DeviationForm;
import com.focusr.Precot.QA.model.audit.DeviationFormHistory;
import com.focusr.Precot.QA.model.DeviationFormSummaryDTO;
import com.focusr.Precot.QA.model.audit.SupplierAuditPlanHistory;
import com.focusr.Precot.QA.model.audit.SupplierAuditPlanInfoHistory;
import com.focusr.Precot.QA.model.audit.SupplierAuditReportHistory;
import com.focusr.Precot.QA.model.audit.TrainingCalendarHistory;
import com.focusr.Precot.QA.model.audit.TrainingQuestionnaireHistory;
import com.focusr.Precot.QA.model.audit.TrainingSessionHistory;
import com.focusr.Precot.QA.repository.ActionReportInfoRepo;
import com.focusr.Precot.QA.repository.CorrectiveActionReportRepo;
import com.focusr.Precot.QA.repository.DeviationFormRepo;
import com.focusr.Precot.QA.repository.SupplierAuditPlanRepo;
import com.focusr.Precot.QA.repository.SupplierAuditReportRepo;
import com.focusr.Precot.QA.repository.TrainingCalendarRepo;
import com.focusr.Precot.QA.repository.TrainingQuestionnaireRepo;
import com.focusr.Precot.QA.repository.TrainingSessionRepo;
import com.focusr.Precot.QA.repository.TrainingTopicRepo;
import com.focusr.Precot.QA.repository.audit.ActionReportInfoHistoryRepo;
import com.focusr.Precot.QA.repository.audit.CorrectiveActionReportHistoryRepo;
import com.focusr.Precot.QA.repository.audit.DeviationFormHistoryRepo;
import com.focusr.Precot.QA.repository.audit.SupplierAuditPlanHistoryRepo;
import com.focusr.Precot.QA.repository.audit.SupplierAuditPlanInfoHistoryRepo;
import com.focusr.Precot.QA.repository.audit.SupplierAuditReportHistoryRepo;
import com.focusr.Precot.QA.repository.audit.TrainingCalendarHistoryRepo;
import com.focusr.Precot.QA.repository.audit.TrainingQuestionnaireHistoryRepo;
import com.focusr.Precot.QA.repository.audit.TrainingSessionHistoryRepo;
import com.focusr.Precot.QA.util.QaAppConstants;
import com.focusr.Precot.QA.util.mail.QAMailFunction;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.SCAUtil;

@Service
public class QaService5 {
	
	Logger log = LoggerFactory.getLogger(QaService5.class);
	@Autowired
	private JwtTokenProvider tokenProvider;
	@Autowired
	private SCAUtil scaUtil;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private SupplierAuditPlanRepo auditPlanRepo;
	@Autowired
	private SupplierAuditPlanHistoryRepo auditPlanHistoryRepo;
	@Autowired
	private SupplierAuditPlanInfoHistoryRepo auditPlanInfoHistoryRepo ;
	@Autowired
	private SupplierAuditReportRepo auditReportRepo;
	@Autowired
	private SupplierAuditReportHistoryRepo auditReportHistoryRepo;
	@Autowired
	private TrainingCalendarRepo calendarRepo;
	@Autowired
	private TrainingCalendarHistoryRepo calendarHistoryRepo;
	@Autowired
	private TrainingTopicRepo topicRepo;
	@Autowired
	private TrainingSessionRepo sessionRepo;
	@Autowired
	private TrainingSessionHistoryRepo sessionHistoryRepo;
	@Autowired
	private TrainingQuestionnaireRepo questionnaireRepo;
	@Autowired
	private TrainingQuestionnaireHistoryRepo questionnaireHistoryRepo;
	@Autowired
	private CorrectiveActionReportRepo actionReportRepo;
	@Autowired
	private CorrectiveActionReportHistoryRepo actionReportHistoryRepo;
	@Autowired
	private ActionReportInfoRepo actionReportInfoRepo;
	@Autowired
	private ActionReportInfoHistoryRepo actionReportInfoHistoryRepo;
	@Autowired
	private DeviationFormRepo deviationRepo;
	@Autowired
	private DeviationFormHistoryRepo deviationHistoryRepo;


	@Autowired
	QAMailFunction qamailfunction;
	
	//Supplier Audit Plan- Start
	
	public ResponseEntity<?> saveSupplierAuditPlan(SupplierAuditPlan planFromRequest, HttpServletRequest http) {
		if (planFromRequest == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}
		SupplierAuditPlan auditPlan = null;
		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			if ( planFromRequest.getPlanId() != null) {
				auditPlan = auditPlanRepo.findAuditPlanById(planFromRequest.getPlanId());
					String[] IgnoreProps = {"planId","createdBy", "createdAt",
									"designeeStatus","designeeSaveOn","designeeSaveBy","designeeSaveId","designeeSign",
									"designeeSubmitOn","designeeSubmitBy","designeeSubmitId",
									"qaManagerMrStatus","qaManagerMrSubmitOn","qaManagerMrSubmitBy","qaManagerMrSubmitId","qaManagerMrSign"};
						BeanUtils.copyProperties(planFromRequest, auditPlan, IgnoreProps);
				} else {
					auditPlan = planFromRequest;
				}
				if (role.equals("ROLE_DESIGNEE")) {
					List<SupplierAuditPlanInfo> infoList = planFromRequest.getAuditPlanInfoList();
					for (SupplierAuditPlanInfo info : infoList) {
						info.setPlanId(auditPlan.getPlanId());
					}
					auditPlan.setAuditPlanInfoList(infoList);
					auditPlan.setDesigneeSaveBy(userName);
					auditPlan.setDesigneeSaveOn(date);
					auditPlan.setDesigneeSaveId(userId);
					auditPlan.setDesigneeStatus(QaAppConstants.designeeSaved);
					auditPlanRepo.save(auditPlan);
				} else {
					return new ResponseEntity(new ApiResponse(false, role + " cannot save details"),
					HttpStatus.BAD_REQUEST);
				}
			} catch (Exception ex) {
				log.error(" **** Unable to save Details! **** " + ex);
				String msg = ex.getMessage();
				return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
			}
			//	return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);
			return new ResponseEntity(auditPlan, HttpStatus.CREATED);
		}


		public ResponseEntity<?> submitSupplierAuditPlan(SupplierAuditPlan planFromRequest, HttpServletRequest http) {
			SCAUtil scaUtil = new SCAUtil();

			if (planFromRequest == null) {
				return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
			}
			Long id = planFromRequest.getPlanId();
			SupplierAuditPlan auditPlanObj = new SupplierAuditPlan();
			try {
				LocalDateTime currentDate = LocalDateTime.now();
				// Convert LocalDateTime to Date
				Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
				Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
				String userName = userRepository.getUserName(userId);
				String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
				if (id != null) {
					auditPlanObj = auditPlanRepo.findAuditPlanById(planFromRequest.getPlanId());
					String[] IgnoreProps = {"planId","createdBy", "createdAt",
							"designeeStatus","designeeSaveOn","designeeSaveBy","designeeSaveId","designeeSign",
							"designeeSubmitOn","designeeSubmitBy","designeeSubmitId",
							"qaManagerMrStatus","qaManagerMrSubmitOn","qaManagerMrSubmitBy","qaManagerMrSubmitId","qaManagerMrSign"};
					BeanUtils.copyProperties(planFromRequest, auditPlanObj, IgnoreProps);
				} else {
					auditPlanObj = planFromRequest;
				}
				if (role.equals("ROLE_DESIGNEE") ) {
					List<SupplierAuditPlanInfo> infoList = planFromRequest.getAuditPlanInfoList();
					for (SupplierAuditPlanInfo info : infoList) {
						info.setPlanId(auditPlanObj.getPlanId());
					}
					auditPlanObj.setAuditPlanInfoList(infoList);
					auditPlanObj.setDesigneeSubmitBy(userName);
					auditPlanObj.setDesigneeSubmitOn(date);			
					auditPlanObj.setDesigneeSubmitId(userId);
					auditPlanObj.setDesigneeStatus(QaAppConstants.designeeSubmitted);
					auditPlanObj.setDesigneeSign(userName);
					auditPlanObj.setQaManagerMrStatus(QaAppConstants.waitingStatus);;
					auditPlanRepo.save(auditPlanObj);
					// Supplier Audit Plan History Save - Start 
						
					SupplierAuditPlanHistory planHistory = new SupplierAuditPlanHistory();
					// getter setters fields & status
					planHistory.setFormatName(auditPlanObj.getFormatName());
					planHistory.setFormatNo(auditPlanObj.getFormatNo());
					planHistory.setRevisionNo(auditPlanObj.getRevisionNo());
					planHistory.setSopNumber(auditPlanObj.getSopNumber());
					planHistory.setUnit(auditPlanObj.getUnit());
						
					planHistory.setFinancialYear(auditPlanObj.getFinancialYear());
					planHistory.setDesigneeStatus(auditPlanObj.getDesigneeStatus());
					planHistory.setQaManagerMrStatus(auditPlanObj.getQaManagerMrStatus());
						
					// status
					planHistory.setDesigneeSubmitBy(auditPlanObj.getDesigneeSubmitBy());
					planHistory.setDesigneeSubmitOn(auditPlanObj.getDesigneeSubmitOn());
					planHistory.setDesigneeSubmitId(auditPlanObj.getDesigneeSubmitId());
					planHistory.setDesigneeSign(auditPlanObj.getDesigneeSign());
					// version
					String financialYear = auditPlanObj.getFinancialYear();
					int version = 0;
					version = auditPlanHistoryRepo.getMaximumVersion1(financialYear)
								.map(temp -> temp + 1).orElse(1);
					// Version End
					planHistory.setVersion(version);

					auditPlanHistoryRepo.save(planHistory); // ONE HISTORY

					List<SupplierAuditPlanInfo> historyMapList = auditPlanObj.getAuditPlanInfoList();

					for (SupplierAuditPlanInfo obj : historyMapList) {
						SupplierAuditPlanInfoHistory objHistory = new SupplierAuditPlanInfoHistory();
						BeanUtils.copyProperties(obj, objHistory);
						objHistory.setPlanId(planHistory.getPlanId());
						auditPlanInfoHistoryRepo.save(objHistory);
					}
												
					auditPlanHistoryRepo.save(planHistory);
					// MAIL
					 try {
						  qamailfunction.sendMailToMRSupplierAuditPlan(auditPlanObj); 
					 } catch (Exception ex) {
						  return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "), HttpStatus.OK);
					 }

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " cannot submit details"),
						HttpStatus.BAD_REQUEST);
				}
			}
			catch(Exception ex) {
					log.error(" **** Unable to Submit Details **** " + ex);
					String msg = ex.getMessage();
					return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity(new ApiResponse(true, "Audit Report Submitted Sucessfully"), HttpStatus.OK);
			//	return new ResponseEntity(auditScheduleObj, HttpStatus.CREATED);
		}
		

		public ResponseEntity<?> approveRejectSupplierAuditPlan(ApproveResponse approvalResponse, HttpServletRequest http) {
			SCAUtil sca = new SCAUtil();
			SupplierAuditPlan auditPlan = new SupplierAuditPlan();
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			try {
				auditPlan = auditPlanRepo.findAuditPlanById(approvalResponse.getId());
				SupplierAuditPlanHistory auidtPlanHistory = new SupplierAuditPlanHistory();
				String designeeStatus = auditPlan.getDesigneeStatus();
				String qaManagerMrStatus = auditPlan.getQaManagerMrStatus();
				String status = "";
				if ((designeeStatus!= null && designeeStatus.equalsIgnoreCase(QaAppConstants.designeeSubmitted))
						&& (qaManagerMrStatus!=null && qaManagerMrStatus.equalsIgnoreCase(AppConstants.waitingStatus))) {
					if (userRole.equalsIgnoreCase("ROLE_MR") || userRole.equalsIgnoreCase("QA_MANAGER")) {
						String reason = approvalResponse.getRemarks();
						auidtPlanHistory = auditPlanHistoryRepo.fetchLastSubmittedRecord(auditPlan.getFinancialYear());
						if (approvalResponse.getStatus().equals("Approve")) {
							auditPlan.setQaManagerMrStatus(QaAppConstants.qaManagerMrApproved);
							auidtPlanHistory.setQaManagerMrStatus(QaAppConstants.qaManagerMrApproved);
							status = "Approved";
						} else if (approvalResponse.getStatus().equals("Reject")) {
							auditPlan.setReason(reason);
							auditPlan.setQaManagerMrStatus(QaAppConstants.qaManagerMrRejected);
							auidtPlanHistory.setReason(reason);
							auidtPlanHistory.setQaManagerMrStatus(QaAppConstants.qaManagerMrRejected);
							status = "Rejected";
						}
						auditPlan.setQaManagerMrSubmitOn(date);
						auditPlan.setQaManagerMrSubmitBy(userName);
						auditPlan.setQaManagerMrSubmitId(userId);
						auditPlan.setQaManagerMrSign(userName);
						auditPlanRepo.save(auditPlan);
						auidtPlanHistory.setQaManagerMrSubmitOn(date);
						auidtPlanHistory.setQaManagerMrSubmitBy(userName);
						auidtPlanHistory.setQaManagerMrSubmitId(userId);
						auidtPlanHistory.setQaManagerMrSign(userName);
						auditPlanHistoryRepo.save(auidtPlanHistory);
						return new ResponseEntity<>(new ApiResponse(true, "QA MANAGER / MR " + status + " Successfully"),
								HttpStatus.OK);
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
				return new ResponseEntity(new ApiResponse(false, "Failed to Approve/Reject Record " + msg),
						HttpStatus.BAD_REQUEST);
			}
		}
		public ResponseEntity<?> getAuditPlanByUniqueParams( String financialYear) {
			try {
					SupplierAuditPlan auditPlan = auditPlanRepo.findByUniqueParams(financialYear);
					if (auditPlan == null) {
						return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
					}
					return new ResponseEntity<>(auditPlan, HttpStatus.OK);
				} catch (Exception e) {
					log.error("Unable to get Details!", e);
					return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
				}
		}
		public ResponseEntity<?> getAuditPlanByPrintParams( String financialYear) {
			try {
				List<SupplierAuditPlan> auditReportist = auditPlanRepo.findByPrintParams(financialYear);
				if (auditReportist.size()==0) {
					return new ResponseEntity(new ApiResponse(true,"No data"), HttpStatus.OK);
				}
				return new ResponseEntity<>(auditReportist, HttpStatus.OK);
			} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
			}
		}
		public ResponseEntity<?> getSupplierAuditPlanSummary(HttpServletRequest http) {
			List<SupplierAuditPlanSummaryDTO> auditPlanList = null;
			try {
				String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
				if(userRole.equals("QA_MANAGER") || userRole.equals("ROLE_MR")|| userRole.equals("ROLE_DESIGNEE")) {
					auditPlanList = auditPlanRepo.getAuditPlanSummary();
				}	 
				return new ResponseEntity<>(auditPlanList, HttpStatus.OK);
			} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
			}
		}
		//Supplier Audit Plan - End
		
		//Supplier Audit Report - Start
		public ResponseEntity<?> saveSupplierAuditReport(SupplierAuditReport reportFromRequest, HttpServletRequest http) {
			if (reportFromRequest == null) {
				return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
				}
				SupplierAuditReport auditReport = null;
				try {
					Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
					String userName = userRepository.getUserName(userId);
					String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
					LocalDateTime currentDate = LocalDateTime.now();
					Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
					if ( reportFromRequest.getReportId() != null) {
						auditReport = auditReportRepo.findAuditReportById(reportFromRequest.getReportId());
							String[] IgnoreProps = {"reportId","createdBy", "createdAt","auditorStatus","auditorSaveOn","auditorSaveBy","auditorSaveId",
									 "auditorSubmitOn","auditorSubmitBy","auditorSubmitId","auditorSign"};
									BeanUtils.copyProperties(reportFromRequest, auditReport, IgnoreProps);
					} else {
							auditReport = reportFromRequest;
					}
					if (role.equals("ROLE_HOD")) {
						auditReport.setAuditorSaveBy(userName);
						auditReport.setAuditorSaveOn(date);
						auditReport.setAuditorSaveId(userId);
						auditReport.setAuditorStatus(QaAppConstants.auditorSave);
						auditReportRepo.save(auditReport);
					} else {
						return new ResponseEntity(new ApiResponse(false, role + " cannot save details"),
						HttpStatus.BAD_REQUEST);
					}
				} catch (Exception ex) {
					log.error(" **** Unable to save Details! **** " + ex);
					String msg = ex.getMessage();
					return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
				}
				//	return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);
					return new ResponseEntity(auditReport, HttpStatus.CREATED);
			}


			public ResponseEntity<?> submitSupplierAuditReport(SupplierAuditReport reportFromRequest, HttpServletRequest http) {
			SCAUtil scaUtil = new SCAUtil();

			if (reportFromRequest == null) {
				return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
			}
			Long id = reportFromRequest.getReportId();
			SupplierAuditReport auditReportObj = new SupplierAuditReport();
			try {
				LocalDateTime currentDate = LocalDateTime.now();
				// Convert LocalDateTime to Date
				Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
				Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
				String userName = userRepository.getUserName(userId);
				String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
				if (id != null) {
					auditReportObj = auditReportRepo.findAuditReportById(reportFromRequest.getReportId());
					String[] IgnoreProps = {"createdBy", "createdAt","qaManagerSaveOn","qaManagerSaveBy","qaManagerSaveId",
							"qaManagerSubmitOn","qaManagerSubmitBy","qaManagerSubmitId","mrDesigneeSubmitOn","mrDesigneeSubmitBy","mrDesigneeSubmitId"};
					BeanUtils.copyProperties(reportFromRequest, auditReportObj, IgnoreProps);
					} else {
						auditReportObj = reportFromRequest;
					}
					if (role.equals("ROLE_HOD") || role.equals("QA_MANAGER") || role.equals("ROLE_MR")|| role.equals("QA_DESIGNEE")) {
						auditReportObj.setAuditorSubmitBy(userName);
						auditReportObj.setAuditorSubmitOn(date);			
						auditReportObj.setAuditorSubmitId(userId);
						auditReportObj.setAuditorStatus(QaAppConstants.auditorSubmit);
						auditReportObj.setAuditorSign(userName);
						auditReportRepo.save(auditReportObj);
						// Supplier Audit Plan History Save - Start 
									
						SupplierAuditReportHistory reportHistory = new SupplierAuditReportHistory();
						BeanUtils.copyProperties(auditReportObj,reportHistory);
						reportHistory.setReportId(null);
						// version
						LocalDate reportDate = auditReportObj.getReportDate();
						String supplierName = auditReportObj.getSupplierName();
						int version = 0;

						version = auditReportHistoryRepo.getMaximumVersion1(reportDate,supplierName)
								.map(temp -> temp + 1).orElse(1);
									
						// Version End
						reportHistory.setVersion(version);
						auditReportHistoryRepo.save(reportHistory); // ONE HISTORY
						
						// MAIL
						 try {
							  qamailfunction.sendMailToSupplierForSupplierAuditReport(auditReportObj); 
						 } catch (Exception ex) {
							 System.out.println("Supplier Audit Report");
							 ex.printStackTrace();
							 return new ResponseEntity<>(new ApiResponse(false, ex.getMessage()), HttpStatus.OK);
						 }
					} else {
						return new ResponseEntity(new ApiResponse(false, role + " cannot submit details"),
						HttpStatus.BAD_REQUEST);
				}
			}
			catch(Exception ex) {
					log.error(" **** Unable to Submit Details **** " + ex);
					String msg = ex.getMessage();
					return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity(new ApiResponse(true, "Supplier Audit Report Submitted Sucessfully"), HttpStatus.OK);
			//	return new ResponseEntity(auditScheduleObj, HttpStatus.CREATED);
		}
					

		public ResponseEntity<?> getAuditReportByUniqueParams(String supplierName) {
			try {
				SupplierAuditReport auditReport = auditReportRepo.findByUniqueParams(supplierName);
				
				if (auditReport == null) {
					return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
				}
				return new ResponseEntity<>(auditReport, HttpStatus.OK);
			} catch (Exception e) {
					log.error("Unable to get Details!", e);
					return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
				}
		}
		public ResponseEntity<?> getReportByDateAndSupplier(String supplierName,String reportDate) {
			try {
				SupplierAuditReport auditReport = auditReportRepo.findByByDateAndSupplier(supplierName,reportDate);
				if (auditReport == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
				}
				return new ResponseEntity<>(auditReport, HttpStatus.OK);
			} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
			}
		}
		public ResponseEntity<?> getAuditReportByPrintParams( String supplierName) {
			try {
				List<SupplierAuditReport> auditReportist = auditReportRepo.findByPrintParams(supplierName);
				if (auditReportist.size()==0) {
					return new ResponseEntity(new ApiResponse(true,"No data"), HttpStatus.OK);
				}
				return new ResponseEntity<>(auditReportist, HttpStatus.OK);
			} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
			}
		}
		public ResponseEntity<?> getAuditReportByFinancialYear( String financialYear) {
			try {
				String[] years = financialYear.split("-");
		        int startYear = Integer.parseInt(years[0].trim());
		        int endYear = Integer.parseInt(years[1].trim());
		        LocalDate startDate = LocalDate.of(startYear, 4, 1); // April 1st of start year
		        LocalDate endDate = LocalDate.of(endYear, 3, 31); 
				List<SupplierAuditReport> auditReportist = auditReportRepo.findByFinancial(startDate, endDate);
				if (auditReportist.size()==0) {
					return new ResponseEntity(new ApiResponse(true,"No data"), HttpStatus.OK);
				}
				return new ResponseEntity<>(auditReportist, HttpStatus.OK);
			} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
			}
		}
		public ResponseEntity<?> getSupplierAuditReportSummary(HttpServletRequest http) {
			List<SupplierAuditReportSummaryDTO> auditReportList = null;
			try {
				String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
				if(userRole.equals("ROLE_HOD") || userRole.equals("QA_MANAGER") || userRole.equals("ROLE_MR")|| userRole.equals("QA_DESIGNEE")) {
					auditReportList = auditReportRepo.getAuditReportSummary();
				}else {
					log.error("User is not allowed to get the Details!");
					return new ResponseEntity<>("User is not allowed to get the Details! ", HttpStatus.BAD_REQUEST);
				}
				return new ResponseEntity<>(auditReportList, HttpStatus.OK);
			} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
			}
		}
		public ResponseEntity<?> getReportSubmittedDateBySupplier(String supplierName) {
			try {
				List<LocalDate> auditReport = auditReportRepo.getReportSubmittedDateBySupplier(supplierName);
				if (auditReport == null) {
					return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
				}
				return new ResponseEntity<>(auditReport, HttpStatus.OK);
			} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
			}
		}
		public ResponseEntity<?> saveReportPdfInfo(HttpServletRequest request,String fileName, MultipartFile pdf,String reportId)
		{
			SCAUtil sca = new SCAUtil();
			SupplierAuditReport auditReport = new SupplierAuditReport();
			String userRole = scaUtil.getUserRoleFromRequest(request, tokenProvider);
			Long userId = sca.getUserIdFromRequest(request, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			try {
				auditReport = auditReportRepo.findAuditReportById(Long.parseLong(reportId));
				SupplierAuditReportHistory auidtReportHistory = new SupplierAuditReportHistory();
				String auditorStatus = auditReport.getAuditorStatus();
				String supplierStatus = auditReport.getSupplierStatus();
				String status = "";
				if ((auditorStatus!= null && auditorStatus.equalsIgnoreCase(QaAppConstants.auditorSubmit))) {
					if (userRole.equalsIgnoreCase("ROLE_HOD")) {
						auidtReportHistory = auditReportHistoryRepo.fetchLastSubmittedRecord(auditReport.getReportDate(),auditReport.getSupplierName());
						byte[] pdfContent = pdf.getBytes();
						auditReport.setReportPdf(pdfContent);
						auditReport.setSupplierStatus("PDF_UPLOADED");
						auditReport.setFileName(fileName);
						auditReport.setPdfSubmitOn(date);
						auditReport.setPdfSubmitBy(userName);
						auditReport.setPdfSubmitId(userId);
						auditReport.setPdfSubmitBySign(userName);
						auditReportRepo.save(auditReport);
						auidtReportHistory.setReportPdf(pdfContent);
						auidtReportHistory.setSupplierStatus("PDF_UPLOADED");
						auidtReportHistory.setFileName(fileName);
						auidtReportHistory.setPdfSubmitOn(date);
						auidtReportHistory.setPdfSubmitBy(userName);
						auidtReportHistory.setPdfSubmitId(userId);
						auidtReportHistory.setPdfSubmitBySign(userName);
						auditReportHistoryRepo.save(auidtReportHistory);
						return new ResponseEntity<>(new ApiResponse(true, "PDF Uploaded Successfully"),
								HttpStatus.OK);
					} else {
							return new ResponseEntity(new ApiResponse(false, "User not authroized to Upload the Report PDF"),
									HttpStatus.BAD_REQUEST);
						}
				}
				else {
					return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
				}
			} catch (Exception e) {
				String msg = e.getMessage();
				log.error("Unable to Upload Report PDF" + msg);
				return new ResponseEntity(new ApiResponse(false, "Failed to Approve/Reject Record " + msg),
						HttpStatus.BAD_REQUEST);
			}
		}
		public ResponseEntity<?> getReportPdf(String reportId) {
			try {
				SupplierAuditReport auditReport = auditReportRepo.findAuditReportById(Long.parseLong(reportId));
				if (auditReport == null) {
					return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
				}
				if(auditReport.getSupplierStatus().equals("PDF_UPLOADED"))
				{
					return ResponseEntity.ok()
		                .contentType(MediaType.APPLICATION_PDF)
		                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + auditReport.getFileName() + "\"")
		                .body(auditReport.getReportPdf());
				}
				else {
					return new ResponseEntity(new ApiResponse(false, "pdf_not_uploaded"), HttpStatus.BAD_REQUEST);
				}
			} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
			}
		}
		// Training Calendar - Start
		
		public ResponseEntity<?> saveTrainingCalendar(TrainingCalendar calendarFromRequest, HttpServletRequest http) {
			if (calendarFromRequest == null) {
				return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
			}
			TrainingCalendar calendar = null;
			try {
				Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
				String userName = userRepository.getUserName(userId);
				String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
				LocalDateTime currentDate = LocalDateTime.now();
				Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
				if ( calendarFromRequest.getCalendarId() != null) {
					calendar = calendarRepo.findTrainingCalendarById(calendarFromRequest.getCalendarId());
					String[] IgnoreProps = {"calendarId","createdBy", "createdAt",
					"qaDesigneeStatus","qaDesigneeSaveOn","qaDesigneeSaveBy","qaDesigneeSaveId",
					"qaDesigneeSubmitOn","qaDesigneeSubmitBy","qaDesigneeSubmitId","qaDesigneeSign",
					"qaManagerMrStatus","qaManagerMrSubmitOn","qaManagerMrSubmitBy","qaManagerMrSubmitId","qaManagerMrSign"};
					BeanUtils.copyProperties(calendarFromRequest, calendar, IgnoreProps);
					} else {
						calendar = calendarFromRequest;
					}
					if (role.equals("ROLE_DESIGNEE")) {
						List<TrainingSession> sessionList = calendarFromRequest.getTrainingSessionList();
						for (TrainingSession session : sessionList) {
							session.setCalendarId(calendar.getCalendarId());
						}
						calendar.setTrainingSessionList(sessionList);						
						calendar.setQaDesigneeSaveBy(userName);
						calendar.setQaDesigneeSaveOn(date);
						calendar.setQaDesigneeSaveId(userId);
						calendar.setQaDesigneeStatus(QaAppConstants.qaDesigneeSaved);
						calendarRepo.save(calendar);
					} else {
						return new ResponseEntity(new ApiResponse(false, role + " cannot save details"),
						HttpStatus.BAD_REQUEST);
					}
				} catch (Exception ex) {
					log.error(" **** Unable to save Details! **** " + ex);
					String msg = ex.getMessage();
					return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
				}
				//	return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);
				return new ResponseEntity(calendar, HttpStatus.CREATED);
		}
		public ResponseEntity<?> submitTrainingCalendar(TrainingCalendar calendarFromRequest, HttpServletRequest http) {
			SCAUtil scaUtil = new SCAUtil();

			if (calendarFromRequest == null) {
				return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
			}
			Long id = calendarFromRequest.getCalendarId();
			TrainingCalendar calendarObj = new TrainingCalendar();
			try {
				LocalDateTime currentDate = LocalDateTime.now();
				// Convert LocalDateTime to Date
				Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
				Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
				String userName = userRepository.getUserName(userId);
				String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
				if (id != null) {
					calendarObj = calendarRepo.findTrainingCalendarById(calendarFromRequest.getCalendarId());
					String[] IgnoreProps = {"calendarId","createdBy", "createdAt",
							"qaDesigneeStatus","qaDesigneeSaveOn","qaDesigneeSaveBy","qaDesigneeSaveId",
							"qaDesigneeSubmitOn","qaDesigneeSubmitBy","qaDesigneeSubmitId","qaDesigneeSign",
							"qaManagerMrStatus","qaManagerMrSubmitOn","qaManagerMrSubmitBy","qaManagerMrSubmitId","qaManagerMrSign"};
							BeanUtils.copyProperties(calendarFromRequest, calendarObj, IgnoreProps);
				} else {
						calendarObj = calendarFromRequest;
					}
					if (role.equals("ROLE_DESIGNEE") ) {
						List<TrainingSession> sessionList = calendarFromRequest.getTrainingSessionList();
						for (TrainingSession session : sessionList) {
							session.setCalendarId(calendarObj.getCalendarId());
						}
						calendarObj.setTrainingSessionList(sessionList);						
						calendarObj.setQaDesigneeSubmitBy(userName);
						calendarObj.setQaDesigneeSubmitOn(date);			
						calendarObj.setQaDesigneeSubmitId(userId);
						calendarObj.setQaDesigneeStatus(QaAppConstants.qaDesigneeSubmitted);
						calendarObj.setQaManagerMrStatus(QaAppConstants.waitingStatus);
						calendarObj.setQaDesigneeSign(userName);
						calendarRepo.save(calendarObj);
						// Supplier Audit Plan History Save - Start 
						TrainingCalendarHistory calendarHistory = new TrainingCalendarHistory();
						// getter setters fields & status
						calendarHistory.setFormatName(calendarObj.getFormatName());
						calendarHistory.setFormatNo(calendarObj.getFormatNo());
						calendarHistory.setRevisionNo(calendarObj.getRevisionNo());
						calendarHistory.setSopNumber(calendarObj.getSopNumber());
						calendarHistory.setUnit(calendarObj.getUnit());
						calendarHistory.setYear(calendarObj.getYear());
						calendarHistory.setUpdatedDate(calendarObj.getUpdatedDate());
						calendarHistory.setQaDesigneeStatus(calendarObj.getQaDesigneeStatus());
						calendarHistory.setQaManagerMrStatus(calendarObj.getQaManagerMrStatus());
						// status
						calendarHistory.setQaDesigneeSubmitBy(calendarObj.getQaDesigneeSubmitBy());
						calendarHistory.setQaDesigneeSubmitOn(calendarObj.getQaDesigneeSubmitOn());
						calendarHistory.setQaDesigneeSubmitId(calendarObj.getQaDesigneeSubmitId());
						calendarHistory.setQaDesigneeSign(calendarObj.getQaDesigneeSign());
						// version
						String year = calendarObj.getYear();
						int version = 0;
						version = calendarHistoryRepo.getMaximumVersion1(year)
							.map(temp -> temp + 1).orElse(1);
						// Version End
						calendarHistory.setVersion(version);
						calendarHistoryRepo.save(calendarHistory); // ONE HISTORY
						List<TrainingSession> historyMapList = calendarObj.getTrainingSessionList();
						for (TrainingSession obj : historyMapList) {
							TrainingSessionHistory objHistory = new TrainingSessionHistory();
							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setHistoryId(calendarHistory.getHistoryId());
							sessionHistoryRepo.save(objHistory);
						}
						calendarHistoryRepo.save(calendarHistory);
//						// MAIL
//						try {
//							qamailfunction.sendMailToSupplierForSupplierAuditReport(calendarObj); 
//						} catch (Exception ex) {
//							  return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "), HttpStatus.OK);
//						}
					} else {
						return new ResponseEntity(new ApiResponse(false, role + " cannot submit details"),
						HttpStatus.BAD_REQUEST);
					}
				}
				catch(Exception ex) {
					log.error(" **** Unable to Submit Details **** " + ex);
					String msg = ex.getMessage();
					return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);
				}
				return new ResponseEntity(new ApiResponse(true, "Training Calendar Submitted Sucessfully"), HttpStatus.OK);
				//	return new ResponseEntity(auditScheduleObj, HttpStatus.CREATED);
			}
			public ResponseEntity<?> approveRejectTrainingCalendar(ApproveResponse approvalResponse, HttpServletRequest http) {
					SCAUtil sca = new SCAUtil();
					TrainingCalendar calendar = new TrainingCalendar();
					String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
					Long userId = sca.getUserIdFromRequest(http, tokenProvider);
					String userName = userRepository.getUserName(userId);
					LocalDateTime currentDate = LocalDateTime.now();
					Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

					try {
						calendar = calendarRepo.findTrainingCalendarById(approvalResponse.getId());
						TrainingCalendarHistory calendarHistory = new TrainingCalendarHistory();
						String qaDesigneeStatus = calendar.getQaDesigneeStatus();
						String qaManagerMrStatus = calendar.getQaManagerMrStatus();
						String status = "";
						if ((qaDesigneeStatus!= null && qaDesigneeStatus.equalsIgnoreCase(QaAppConstants.qaDesigneeSubmitted))
								&& (qaManagerMrStatus!=null && qaManagerMrStatus.equalsIgnoreCase(AppConstants.waitingStatus))) {
							if (userRole.equalsIgnoreCase("ROLE_MR") || userRole.equalsIgnoreCase("QA_MANAGER")) {
								String reason = approvalResponse.getRemarks();
								calendarHistory = calendarHistoryRepo.fetchLastSubmittedRecord(calendar.getYear());
								if (approvalResponse.getStatus().equals("Approve")) {
									calendar.setQaManagerMrStatus(QaAppConstants.qaManagerMrApproved);
									calendarHistory.setQaManagerMrStatus(QaAppConstants.qaManagerMrApproved);
									status = "Approved";
								} else if (approvalResponse.getStatus().equals("Reject")) {
									calendar.setReason(reason);
									calendar.setQaManagerMrStatus(QaAppConstants.qaManagerMrRejected);
									calendarHistory.setReason(reason);
									calendarHistory.setQaManagerMrStatus(QaAppConstants.qaManagerMrRejected);
									status = "Rejected";
								}
								calendar.setQaManagerMrSubmitOn(date);
								calendar.setQaManagerMrSubmitBy(userName);
								calendar.setQaManagerMrSubmitId(userId);
								calendar.setQaManagerMrSign(userName);
								calendarRepo.save(calendar);
								calendarHistory.setQaManagerMrSubmitOn(date);
								calendarHistory.setQaManagerMrSubmitBy(userName);
								calendarHistory.setQaManagerMrSubmitId(userId);
								calendarHistory.setQaManagerMrSign(userName);
								calendarHistoryRepo.save(calendarHistory);
								return new ResponseEntity<>(new ApiResponse(true, "QA MANAGER / MR " + status + " Successfully"),
										HttpStatus.OK);
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
						return new ResponseEntity(new ApiResponse(false, "Failed to Approve/Reject Record " + msg),
								HttpStatus.BAD_REQUEST);
					}
			}
			public ResponseEntity<?> getTrainingCalendarByUniqueParams(String year) {
				try {
					TrainingCalendar calendar = calendarRepo.findByUniqueParams(year);
					if (calendar == null) {
						return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
					}
					return new ResponseEntity<>(calendar, HttpStatus.OK);
				} catch (Exception e) {
						log.error("Unable to get Details!", e);
						return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
					}
			}
			public ResponseEntity<?> getTrainingCalendarSummary(HttpServletRequest http) {
				List<TrainingCalendarSummaryDTO> calendarList = null;
				List<TrainingCalendarSummaryDTO> qaMrList = null;
				try {
					String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
					if(userRole.equalsIgnoreCase("ROLE_MR") || userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
						calendarList = calendarRepo.getTrainingCalendarSummary();
						if(userRole.equals("ROLE_MR") || userRole.equalsIgnoreCase("QA_MANAGER")){
							qaMrList = calendarList.stream()
										.filter(c -> c.getQaDesigneeStatus() != null && c.getQaDesigneeStatus().equals(QaAppConstants.qaDesigneeSubmitted))
										.collect(Collectors.toList());
							return new ResponseEntity<>(qaMrList, HttpStatus.OK);
						}
						return new ResponseEntity<>(calendarList, HttpStatus.OK);
					}else {
						log.error("User is not allowed to get the Details!");
						return new ResponseEntity<>("User is not allowed to get the Details! ", HttpStatus.BAD_REQUEST);
					}
				} catch (Exception e) {
					log.error("Unable to get Details!", e);
					return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
				}
			}
			public ResponseEntity<?> getTrainingCalendarByPrintParams(String year) {
				try {
					List<TrainingCalendar> calendarList = calendarRepo.findByPrintParams(year);
					if (calendarList.size()==0) {
						return new ResponseEntity(new ApiResponse(true,"No data"), HttpStatus.OK);
					}
					return new ResponseEntity<>(calendarList, HttpStatus.OK);
				} catch (Exception e) {
					log.error("Unable to get Details!", e);
					return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
				}
			}
			public void addAdditionalTopics(List<String> trainingTopicList)
			{
				List<String> masterTopicList = topicRepo.getTrainingTopics();
				trainingTopicList.removeAll(masterTopicList);
				if(trainingTopicList.size() > 0)
				{
					for(String topic : trainingTopicList)
					{
						TrainingTopic trainingTopic = new TrainingTopic();
						trainingTopic.setTopic(topic);
						trainingTopic.setFormatNo("PH-QAD01-F-006");
						topicRepo.save(trainingTopic);
					}
				}
			}
			// Audit Department - Start //
			public ResponseEntity<?> saveTrainingTopic(TrainingTopic topic, HttpServletRequest http) {
				try {
					topicRepo.save(topic);
				} catch (Exception ex) {
					log.error(" **** Unable to save Details! **** " + ex);
					String msg = ex.getMessage();
					return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
				}
				return new ResponseEntity(topic, HttpStatus.CREATED);
			}
			public ResponseEntity<?> getTrainingTopics() {
				try {
					List<TrainingTopic> topicList = topicRepo.findAll();
					if (topicList == null || topicList.isEmpty()) {
						return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
					}
					return new ResponseEntity<>(topicList, HttpStatus.OK);
				} catch (Exception e) {
					log.error("Unable to get Details!", e);
					return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
				}
			}
				
			public ResponseEntity<?> deleteTrainingTopic(Long id) {
				try {
					TrainingTopic topic = topicRepo.findTrainingTopicById(id);
					if (topic == null) {
						return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
					}
					topicRepo.deleteById(id);
				} catch (Exception ex) {
					log.error(" **** Unable to delete details! **** " + ex);
					String msg = ex.getMessage();
					return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
				}
				return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
			}
			// Audit Department - End //
				
		// DELETE CHILD - TRAINING SESSION INFO
		public ResponseEntity<?> deleteSessionInfoFromCalendar(Long id) {
			try {
				TrainingSession session = sessionRepo.findTrainingSessionById(id);
				if (session == null) {
					return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
				}
				sessionRepo.deleteById(id);
			} catch (Exception ex) {
				log.error(" **** Unable to delete details! **** " + ex);
				String msg = ex.getMessage();
				return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
		}
// Training Questionnaire - Start
	public ResponseEntity<?> saveTrainingQuestionnaire(TrainingQuestionnaire questionnaireFromRequest, HttpServletRequest http) {
		if (questionnaireFromRequest == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}
		TrainingQuestionnaire questionnaire = null;
		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			if ( questionnaireFromRequest.getQuestionnaireId() != null) {
				questionnaire = questionnaireRepo.findTrainingQuestionnaireById(questionnaireFromRequest.getQuestionnaireId());
				String[] IgnoreProps = {"questionnaireId","createdBy", "createdAt",
				"hodDesigneeStatus","hodDesigneeSaveOn","hodDesigneeSaveBy","hodDesigneeSaveId",
				"hodDesigneeSubmitOn","hodDesigneeSubmitBy","hodDesigneeSubmitId","hodDesigneeSign"};
				BeanUtils.copyProperties(questionnaireFromRequest, questionnaire, IgnoreProps);
				} else {
					questionnaire = questionnaireFromRequest;
				}
				if (role.equals("ROLE_HOD") || role.equals("ROLE_DESIGNEE")
						|| role.equals("QA_MANAGER")|| role.equals("ROLE_MR") || role.equals("HR_EXECUTIVE")) {
					byte[] questions = Base64.decode(questionnaire.getQuestionsBase64() != null ? questionnaire.getQuestionsBase64() : "");
					questionnaire.setQuestions(questions);
					byte[] assessment = Base64.decode(questionnaire.getAssessmentBase64() != null ? questionnaire.getAssessmentBase64() : "");
					questionnaire.setAssessmentOfQuestionnaire(assessment);
					questionnaire.setHodDesigneeSaveBy(userName);
					questionnaire.setHodDesigneeSaveOn(date);
					questionnaire.setHodDesigneeSaveId(userId);
					questionnaire.setHodDesigneeStatus(QaAppConstants.hodDesigneeSaved);
					questionnaireRepo.save(questionnaire);
				} else {
					return new ResponseEntity(new ApiResponse(false, role + " cannot save details"),
					HttpStatus.BAD_REQUEST);
				}
			} catch (Exception ex) {
				log.error(" **** Unable to save Details! **** " + ex);
				String msg = ex.getMessage();
				return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity(questionnaire, HttpStatus.CREATED);
	}

public ResponseEntity<?> submitTrainingQuestionnaire(TrainingQuestionnaire questionnaireFromRequest, HttpServletRequest http) {
	SCAUtil scaUtil = new SCAUtil();

	if (questionnaireFromRequest == null) {
		return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
	}
	Long id = questionnaireFromRequest.getQuestionnaireId();
	TrainingQuestionnaire questionnaireObj = new TrainingQuestionnaire();
	try {
		LocalDateTime currentDate = LocalDateTime.now();
		// Convert LocalDateTime to Date
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		if (id != null) {
			questionnaireObj = questionnaireRepo.findTrainingQuestionnaireById(questionnaireFromRequest.getQuestionnaireId());
			String[] IgnoreProps = {"questionnaireId","createdBy", "createdAt",
					"hodDesigneeStatus","hodDesigneeSaveOn","hodDesigneeSaveBy","hodDesigneeSaveId",
					"hodDesigneeSubmitOn","hodDesigneeSubmitBy","hodDesigneeSubmitId","hodDesigneeSign"};
			BeanUtils.copyProperties(questionnaireFromRequest, questionnaireObj, IgnoreProps);
		} else {
			questionnaireObj = questionnaireFromRequest;
			}
			if (role.equals("ROLE_DESIGNEE") || role.equals("ROLE_HOD")|| role.equals("QA_MANAGER")
					|| role.equals("ROLE_MR") || role.equals("HR_EXECUTIVE") ) {
				byte[] questions = Base64.decode(questionnaireObj.getQuestionsBase64() != null ? questionnaireObj.getQuestionsBase64() : "");
				questionnaireObj.setQuestions(questions);
				byte[] assessment = Base64.decode(questionnaireObj.getAssessmentBase64() != null ? questionnaireObj.getAssessmentBase64() : "");
				questionnaireObj.setAssessmentOfQuestionnaire(assessment);
				questionnaireObj.setHodDesigneeSubmitBy(userName);
				questionnaireObj.setHodDesigneeSubmitOn(date);			
				questionnaireObj.setHodDesigneeSubmitId(userId);
				questionnaireObj.setHodDesigneeStatus(QaAppConstants.hodDesigneeSubmitted);
				questionnaireObj.setHodDesigneeSign(userName);
				questionnaireRepo.save(questionnaireObj);
				// Training Questionnaire History Save - Start 
				TrainingQuestionnaireHistory questionnaireHistory = new TrainingQuestionnaireHistory();
				// getter setters fields & status
				BeanUtils.copyProperties(questionnaireObj,questionnaireHistory);
				questionnaireHistory.setHistoryId(null);
				// version
				String trainingSessionNumber = questionnaireObj.getTrainingSessionNumber();
				String traineeIdNumber = questionnaireObj.getTraineeIdNumber();
				int version = 0;

				version = questionnaireHistoryRepo.getMaximumVersion1(trainingSessionNumber,traineeIdNumber)
						.map(temp -> temp + 1).orElse(1);
							
				// Version End
				questionnaireHistory.setVersion(version);
				questionnaireHistoryRepo.save(questionnaireHistory); // ONE HISTORY// version
				// MAIL
//							try {
//								qamailfunction.sendMailToSupplierForSupplierAuditReport(calendarObj); 
//							} catch (Exception ex) {
//								  return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "), HttpStatus.OK);
//							}
			} else {
				return new ResponseEntity(new ApiResponse(false, role + " cannot submit details"),
				HttpStatus.BAD_REQUEST);
			}
		}
		catch(Exception ex) {
			log.error(" **** Unable to Submit Details **** " + ex);
			String msg = ex.getMessage();
			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(new ApiResponse(true, "Training Questionnaire Submitted Sucessfully"), HttpStatus.OK);
		//	return new ResponseEntity(auditScheduleObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> getTrainingQuestionnaireByUniqueParams(String trainingSessionNumber, String traineeIdNumber) {
		try {
			TrainingQuestionnaire questionnaire = questionnaireRepo.findByUniqueParams(trainingSessionNumber,traineeIdNumber);
			if (questionnaire == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(questionnaire, HttpStatus.OK);
		} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
			}
	}
	public ResponseEntity<?> getTrainingQuestionnaireSummary(HttpServletRequest http) {
		List<TrainingQuestionnaireSummaryDTO> questionnnaireList = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			if(userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")|| userRole.equals("QA_MANAGER")
					|| userRole.equals("ROLE_MR") || userRole.equals("HR_EXECUTIVE")) {
				questionnnaireList = questionnaireRepo.getTrainingQuestionnaireSummary();
			}else {
				log.error("User is not allowed to get the Details!");
				return new ResponseEntity<>("User is not allowed to get the Details! ", HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<>(questionnnaireList, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}
	public ResponseEntity<?> getTrainingQuestionnaireByPrintParams(String year,String month,String traineeIdNumber) {
		try {
			List<TrainingQuestionnaire> questionnaireList = questionnaireRepo.findByPrintParams(year,month,traineeIdNumber);
			if (questionnaireList.size()==0) {
				return new ResponseEntity(new ApiResponse(true,"No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(questionnaireList, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}
	// Training Questionnaire - End	
	
	// Corrective Action Report - start
	public ResponseEntity<?> saveActionReport(CorrectiveActionReport reportFromRequest, HttpServletRequest http) {
		if (reportFromRequest == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}
		CorrectiveActionReport actionReport = null;
		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			if ( reportFromRequest.getReportId() != null) {
				actionReport = actionReportRepo.findReportById(reportFromRequest.getReportId());
				String[] IgnoreProps = {"reportId","createdBy", "createdAt",
				"qaInspectorStatus","qaInspectorSaveOn","qaInspectorSaveBy","qaInspectorSaveId",
				"qaInspectorSubmitOn","qaInspectorSubmitBy","qaInspectorSubmitId","qaInspectorSign",
				"qaDesigneeStatus","qaDesigneeSubmitOn","qaDesigneeSubmitBy","qaDesigneeSubmitId","qaDesigneeSign",
				"qaManagerMrStatus","qaManagerMrSubmitOn","qaManagerMrSubmitBy","qaManagerMrSubmitId","qaManagerMrSign"};
				BeanUtils.copyProperties(reportFromRequest, actionReport, IgnoreProps);
				} else {
					actionReport = reportFromRequest;
				}
				if (role.equals("ROLE_QA")) {
					List<ActionReportInfo> infoList = reportFromRequest.getActionReportInfoList();
					for (ActionReportInfo info : infoList) {
						info.setReportId(actionReport.getReportId());
					}
					actionReport.setActionReportInfoList(infoList);
					actionReport.setQaInspectorSaveBy(userName);
					actionReport.setQaInspectorSaveOn(date);
					actionReport.setQaInspectorSaveId(userId);
					actionReport.setQaInspectorStatus(QaAppConstants.qaInspectorSaved);
					actionReportRepo.save(actionReport);
				} else {
					return new ResponseEntity(new ApiResponse(false, role + " cannot save details"),
					HttpStatus.BAD_REQUEST);
				}
			} catch (Exception ex) {
				log.error(" **** Unable to save Details! **** " + ex);
				String msg = ex.getMessage();
				return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity(actionReport, HttpStatus.CREATED);
	}
	
	public ResponseEntity<?> submitActionReport(CorrectiveActionReport reportFromRequest, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (reportFromRequest == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}
		Long id = reportFromRequest.getReportId();
		CorrectiveActionReport reportObj = new CorrectiveActionReport();
		try {
			LocalDateTime currentDate = LocalDateTime.now();
			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			if (id != null) {
				reportObj = actionReportRepo.findReportById(reportFromRequest.getReportId());
				String[] IgnoreProps = {"reportId","createdBy", "createdAt",
						"qaInspectorStatus","qaInspectorSaveOn","qaInspectorSaveBy","qaInspectorSaveId",
						"qaInspectorSubmitOn","qaInspectorSubmitBy","qaInspectorSubmitId","qaInspectorSign",
						"qaDesigneeStatus","qaDesigneeSubmitOn","qaDesigneeSubmitBy","qaDesigneeSubmitId","qaDesigneeSign",
						"qaManagerMrStatus","qaManagerMrSubmitOn","qaManagerMrSubmitBy","qaManagerMrSubmitId","qaManagerMrSign"};
				BeanUtils.copyProperties(reportFromRequest, reportObj, IgnoreProps);
			} else {
				reportObj = reportFromRequest;
			}
			if (role.equals("ROLE_QA") ) {
				List<ActionReportInfo> infoList = reportFromRequest.getActionReportInfoList();
				for (ActionReportInfo info : infoList) {
					info.setReportId(reportObj.getReportId());
				}
				reportObj.setActionReportInfoList(infoList);
				reportObj.setQaInspectorSubmitBy(userName);
				reportObj.setQaInspectorSubmitOn(date);			
				reportObj.setQaInspectorSubmitId(userId);
				reportObj.setQaInspectorStatus(QaAppConstants.qaInspectorSubmitted);
				reportObj.setQaInspectorSign(userName);
				reportObj.setQaDesigneeStatus(QaAppConstants.waitingStatus);;
				actionReportRepo.save(reportObj);
				// Corrective Action Report History Save - Start 
				CorrectiveActionReportHistory reportHistory = new CorrectiveActionReportHistory();
				// getter setters fields & status
				BeanUtils.copyProperties(reportObj, reportHistory);
				reportHistory.setHistoryId(null);
//				reportHistory.setFormatName(reportObj.getFormatName());
//				reportHistory.setFormatNo(reportObj.getFormatNo());
//				reportHistory.setRevisionNo(reportObj.getRevisionNo());
//				reportHistory.setSopNumber(reportObj.getSopNumber());
//				reportHistory.setUnit(reportObj.getUnit());
//				reportHistory.setFinancialYear(reportObj.getFinancialYear());
//				reportHistory.setDesigneeStatus(reportObj.getDesigneeStatus());
//				reportHistory.setQaManagerMrStatus(reportObj.getQaManagerMrStatus());
//				// status
//				reportHistory.setDesigneeSubmitBy(reportObj.getDesigneeSubmitBy());
//				reportHistory.setDesigneeSubmitOn(reportObj.getDesigneeSubmitOn());
//				reportHistory.setDesigneeSubmitId(reportObj.getDesigneeSubmitId());
//				reportHistory.setDesigneeSign(reportObj.getDesigneeSign());
//				// version
				LocalDate reportDate = reportObj.getReportDate();
				int version = 0;
				version = actionReportHistoryRepo.getMaximumVersion1(reportDate)
							.map(temp -> temp + 1).orElse(1);
				// Version End
				reportHistory.setVersion(version);

				actionReportHistoryRepo.save(reportHistory);// ONE HISTORY

				List<ActionReportInfo> actionReportListForHistory = reportObj.getActionReportInfoList();

				for (ActionReportInfo obj : actionReportListForHistory) {
					ActionReportInfoHistory objHistory = new ActionReportInfoHistory();
					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setHistoryId(reportHistory.getHistoryId());
					actionReportInfoHistoryRepo.save(objHistory);
				}
											
				actionReportHistoryRepo.save(reportHistory);
				// MAIL
				 try {
					  qamailfunction.sendMailToQaManagerF044(reportObj);
					  qamailfunction.sendMailToDesigneeF044(reportObj);
					  qamailfunction.sendMailToMrManagerF044(reportObj);
				 } catch (Exception ex) {
					  return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "), HttpStatus.OK);
				 }

			} else {
				return new ResponseEntity(new ApiResponse(false, role + " cannot submit details"),
					HttpStatus.BAD_REQUEST);
			}
		}
		catch(Exception ex) {
				log.error(" **** Unable to Submit Details **** " + ex);
				String msg = ex.getMessage();
				return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(new ApiResponse(true, "Audit Report Submitted Sucessfully"), HttpStatus.OK);
		//	return new ResponseEntity(auditScheduleObj, HttpStatus.CREATED);
	}
	
	public ResponseEntity<?> approveRejectCorrectiveActionReport(ApproveResponse approvalResponse, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		CorrectiveActionReport correctiveActionReport = new CorrectiveActionReport();
		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			correctiveActionReport = actionReportRepo.findReportById(approvalResponse.getId());
			CorrectiveActionReportHistory reportHistory = new CorrectiveActionReportHistory();
			String qaInspectorStatus = correctiveActionReport.getQaInspectorStatus();
			String qaDesigneeStatus = correctiveActionReport.getQaDesigneeStatus();
			String qaManagerMrStatus = correctiveActionReport.getQaManagerMrStatus();
			String status = "";
			if ((qaInspectorStatus!= null && qaInspectorStatus.equalsIgnoreCase(QaAppConstants.qaInspectorSubmitted))
				&& (qaDesigneeStatus!=null && qaDesigneeStatus.equalsIgnoreCase(AppConstants.waitingStatus))) {
				if (userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
					String reason = approvalResponse.getRemarks();
					reportHistory = actionReportHistoryRepo.fetchLastSubmittedRecord(correctiveActionReport.getReportDate());
					if (approvalResponse.getStatus().equals("Approve")) {
						correctiveActionReport.setQaDesigneeStatus(QaAppConstants.qaDesigneeApproved);
						reportHistory.setQaDesigneeStatus(QaAppConstants.qaDesigneeApproved);
						correctiveActionReport.setQaManagerMrStatus(QaAppConstants.waitingStatus);
						reportHistory.setQaManagerMrStatus(QaAppConstants.waitingStatus);
						status = "Approved";
						// MAIL
//						 try {
//							  
//							  qamailfunction.sendMailToQaManagerInternalAudit(auditReport); 
//						 } catch (Exception ex) {
//							  return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "), HttpStatus.OK);
//						 }
					} else if (approvalResponse.getStatus().equals("Reject")) {
						correctiveActionReport.setReason(reason);
						correctiveActionReport.setQaDesigneeStatus(QaAppConstants.qaDesigneeRejected);
						reportHistory.setReason(reason);
						reportHistory.setQaDesigneeStatus(QaAppConstants.qaDesigneeRejected);
						status = "Rejected";
					}
					correctiveActionReport.setQaDesigneeSubmitOn(date);
					correctiveActionReport.setQaDesigneeSubmitBy(userName);
					correctiveActionReport.setQaDesigneeSubmitId(userId);
					correctiveActionReport.setQaDesigneeSign(userName);

					actionReportRepo.save(correctiveActionReport);

					reportHistory.setQaDesigneeSubmitOn(date);
					reportHistory.setQaDesigneeSubmitBy(userName);
					reportHistory.setQaDesigneeSubmitId(userId);
					reportHistory.setQaDesigneeSign(userName);

					actionReportHistoryRepo.save(reportHistory);
					

					return new ResponseEntity<>(new ApiResponse(true, "QA Designee " + status + " Successfully"),
					HttpStatus.OK);

					} else {
						return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
						HttpStatus.BAD_REQUEST);
					}
			}
			else if((qaDesigneeStatus != null && qaDesigneeStatus.equalsIgnoreCase(QaAppConstants.qaDesigneeApproved))
					&& (qaManagerMrStatus != null && qaManagerMrStatus.equalsIgnoreCase(AppConstants.waitingStatus))) {
					if (userRole.equalsIgnoreCase("ROLE_MR") || userRole.equalsIgnoreCase("QA_MANAGER")) {
						String reason = approvalResponse.getRemarks();
						reportHistory = actionReportHistoryRepo.fetchLastSubmittedRecord(correctiveActionReport.getReportDate());
						if (approvalResponse.getStatus().equals("Approve")) {
							correctiveActionReport.setQaManagerMrStatus(QaAppConstants.qaManagerMrApproved);
							reportHistory.setQaManagerMrStatus(QaAppConstants.qaManagerMrApproved);
							status = "Approved";
						} else if (approvalResponse.getStatus().equals("Reject")) {
							correctiveActionReport.setReason(reason);
							correctiveActionReport.setQaManagerMrStatus(QaAppConstants.qaManagerMrRejected);
							reportHistory.setReason(reason);
							reportHistory.setQaManagerMrStatus(QaAppConstants.qaManagerMrRejected);
							status = "Rejected";
						}
						correctiveActionReport.setQaManagerMrSubmitOn(date);
						correctiveActionReport.setQaManagerMrSubmitBy(userName);
						correctiveActionReport.setQaManagerMrSubmitId(userId);
						correctiveActionReport.setQaManagerMrSign(userName);

						actionReportRepo.save(correctiveActionReport);

						reportHistory.setQaManagerMrSubmitOn(date);
						reportHistory.setQaManagerMrSubmitBy(userName);
						reportHistory.setQaManagerMrSubmitId(userId);
						reportHistory.setQaManagerMrSign(userName);

						actionReportHistoryRepo.save(reportHistory);

						return new ResponseEntity<>(new ApiResponse(true, "QA Manager/MR " + status + " Successfully"),
								HttpStatus.OK);

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
			return new ResponseEntity(new ApiResponse(false, "Failed to Approve/Reject Record " + msg),
				HttpStatus.BAD_REQUEST);
		}
	}
	public ResponseEntity<?> getCorrectiveActionReportByUniqueParams(String reportDate) {
		try {
			List<CorrectiveActionReport> actionReportList = actionReportRepo.findByUniqueParams(reportDate);
			if (actionReportList == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(actionReportList, HttpStatus.OK);
		} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
			}
	}
	public ResponseEntity<?> getCorrectiveActionReportSummary(HttpServletRequest http) {
		List<CorrectiveActionReportSummaryDTO> reportList = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			if(userRole.equals("ROLE_QA") || userRole.equals("ROLE_DESIGNEE") || userRole.equals("QA_MANAGER")|| userRole.equals("ROLE_MR")) {
				reportList = actionReportRepo.getActionReportSummary();
			}else {
				log.error("User is not allowed to get the Details!");
				return new ResponseEntity<>("User is not allowed to get the Details! ", HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<>(reportList, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}
	public ResponseEntity<?> getCorrectiveActionReportByPrintParams(String year,String month,String reportDate) {
		try {
			List<CorrectiveActionReport> reportList = actionReportRepo.findByPrintParams(year,month,reportDate);
			if (reportList.size()==0) {
				return new ResponseEntity(new ApiResponse(true,"No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(reportList, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}
	
	// DELETE CHILD - ACTION REPORT INFO
	public ResponseEntity<?> deleteActionReportInfo(Long id) {
		try {
			ActionReportInfo reportInfo = actionReportInfoRepo.findActionReportInfoById(id);
			if(reportInfo == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
			}
			actionReportInfoRepo.deleteById(id);
		} catch (Exception ex) {
			log.error(" **** Unable to delete details! **** " + ex);
			String msg = ex.getMessage();
			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}
	// Corrective Action Report - End
	
	// Deviation form - Start
	
	public ResponseEntity<?> saveDeviationForm(DeviationForm deviationFromRequest, HttpServletRequest request) {
	if (deviationFromRequest == null) {
		return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}
		DeviationForm deviation = null;
		try {
			Long userId = scaUtil.getUserIdFromRequest(request, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(request, tokenProvider);
			String section = request.getParameter("section");
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			if ( deviationFromRequest.getDeviationId() != null) {
					deviation = deviationRepo.findDeviationFormById(deviationFromRequest.getDeviationId());
					String[] IgnoreProps = 
						{"deviationId","createdBy", "createdAt",
						"sec1SupervisorStatus", "sec1SupervisorSaveOn", "sec1SupervisorSaveBy", "sec1SupervisorSaveId",
						"sec1SupervisorSubmitOn", "sec1SupervisorSubmitBy", "sec1SupervisorSubmitId", "sec1SupervisorSign",
						"sec1HodDesigneeStatus", "sec1HodDesigneeSubmitOn", "sec1HodDesigneeSubmitBy", "sec1HodDesigneeSubmitId",
						"sec1HodDesigneeSign", "sec1QaManagerMrReviewStatus", "sec1QaManagerMrReviewSaveOn",
						"sec1QaManagerMrReviewSaveBy", "sec1QaManagerMrReviewSaveId", "sec1QaManagerMrReviewSubmitOn",
						"sec1QaManagerMrReviewSubmitBy", "sec1QaManagerMrReviewSubmitId", "sec1QaManagerMrReviewSign",
						"sec1QaManagerMrInvgStatus", "sec1QaManagerMrInvgSaveOn", "sec1QaManagerMrInvgSaveBy", "sec1QaManagerMrInvgSaveId",
						"sec1QaManagerMrInvgSubmitOn", "sec1QaManagerMrInvgSubmitBy", "sec1QaManagerMrInvgSubmitId", "sec1QaManagerMrInvgSign",
						"sec2SupervisorStatus", "sec2SupervisorSaveOn", "sec2SupervisorSaveBy", "sec2SupervisorSaveId",
						"sec2SupervisorSubmitOn", "sec2SupervisorSubmitBy", "sec2SupervisorSubmitId", "sec2SupervisorSign",
						"sec2HodDesigneeStatus", "sec2HodDesigneeSubmitOn", "sec2HodDesigneeSubmitBy", "sec2HodDesigneeSubmitId", "sec2HodDesigneeSign",
						"sec2QaManagerMrStatus", "sec2QaManagerMrSaveOn", "sec2QaManagerMrSaveBy", "sec2QaManagerMrSaveId", "sec2QaManagerMrSubmitOn",
						"sec2QaManagerMrSubmitBy", "sec2QaManagerMrSubmitId", "sec2QaManagerMrSign",
						"sec3SupervisorStatus", "sec3SupervisorSaveOn", "sec3SupervisorSaveBy", "sec3SupervisorSaveId",
						"sec3SupervisorSubmitOn", "sec3SupervisorSubmitBy", "sec3SupervisorSubmitId", "sec3SupervisorSign",
						"sec3HodDesigneeStatus", "sec3HodDesigneeSubmitOn", "sec3HodDesigneeSubmitBy", "sec3HodDesigneeSubmitId","sec3HodDesigneeSign",
						"sec3QaManagerMrStatus", "sec3QaManagerMrSaveOn","sec3QaManagerMrSaveBy","sec3QaManagerMrSaveId","sec3QaManagerMrSubmitOn",
						"sec3QaManagerMrSubmitBy", "sec3QaManagerMrSubmitId", "sec3QaManagerMrSign"};
						BeanUtils.copyProperties(deviationFromRequest, deviation, IgnoreProps);
			} else {
					deviation = deviationFromRequest;
			}
			if (role.equals("ROLE_SUPERVISOR") || role.equals("QA_MANAGER") || role.equals("ROLE_MR") || role.equals("ROLE_HOD") || role.equals("ROLE_DESIGNEE") ) {
				if(section.equals("sec1_spvr"))
				{
					deviation.setSec1SupervisorSaveBy(userName);
					deviation.setSec1SupervisorSaveOn(date);
					deviation.setSec1SupervisorSaveId(userId);
					deviation.setSec1SupervisorStatus(QaAppConstants.SupervisorSave);
				}
				else if(section.equals("sec1_qa_review"))
				{
					deviation.setSec1QaManagerMrReviewSaveBy(userName);
					deviation.setSec1QaManagerMrReviewSaveOn(date);
					deviation.setSec1QaManagerMrReviewSaveId(userId);
					deviation.setSec1QaManagerMrReviewStatus(QaAppConstants.qaManagerMrSaved);
				}
				else if(section.equals("sec1_qa_invg"))
				{
					deviation.setSec1QaManagerMrInvgSaveBy(userName);
					deviation.setSec1QaManagerMrInvgSaveOn(date);
					deviation.setSec1QaManagerMrInvgSaveId(userId);
					deviation.setSec1QaManagerMrInvgStatus(QaAppConstants.qaManagerMrSaved);
				}
				if(section.equals("sec2_spvr"))
				{
					deviation.setSec2SupervisorSaveBy(userName);
					deviation.setSec2SupervisorSaveOn(date);
					deviation.setSec2SupervisorSaveId(userId);
					deviation.setSec2SupervisorStatus(QaAppConstants.SupervisorSave);
				}
				else if(section.equals("sec2_qa"))
				{
					deviation.setSec2QaManagerMrSaveBy(userName);
					deviation.setSec2QaManagerMrSaveOn(date);
					deviation.setSec2QaManagerMrSaveId(userId);
					deviation.setSec2QaManagerMrStatus(QaAppConstants.qaManagerMrSaved);
				}
				if(section.equals("sec3_spvr"))
				{
					deviation.setSec3SupervisorSaveBy(userName);
					deviation.setSec3SupervisorSaveOn(date);
					deviation.setSec3SupervisorSaveId(userId);
					deviation.setSec3SupervisorStatus(QaAppConstants.SupervisorSave);
				}
				else if(section.equals("sec3_qa"))
				{
					deviation.setSec3QaManagerMrSaveBy(userName);
					deviation.setSec3QaManagerMrSaveOn(date);
					deviation.setSec3QaManagerMrSaveId(userId);
					deviation.setSec3QaManagerMrStatus(QaAppConstants.qaManagerMrSaved);					
				}
				deviationRepo.save(deviation);
			} else {
				return new ResponseEntity(new ApiResponse(false, role + " cannot save details"),
				HttpStatus.BAD_REQUEST);
			}
		} catch (Exception ex) {
			log.error(" **** Unable to save Details! **** " + ex);
			String msg = ex.getMessage();
			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
		//	return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);
			return new ResponseEntity(deviation, HttpStatus.CREATED);
	}


	public ResponseEntity<?> submitDeviationForm(DeviationForm deviationFromRequest, HttpServletRequest request) {
	SCAUtil scaUtil = new SCAUtil();

	if (deviationFromRequest == null) {
		return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
	}
	Long id = deviationFromRequest.getDeviationId();
	DeviationForm deviationObj = new DeviationForm();
	try {
		LocalDateTime currentDate = LocalDateTime.now();
		// Convert LocalDateTime to Date
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		Long userId = scaUtil.getUserIdFromRequest(request, tokenProvider);
		String userName = userRepository.getUserName(userId);
		String section = request.getParameter("section");
		String role = scaUtil.getUserRoleFromRequest(request, tokenProvider);
		if (id != null) {
			deviationObj = deviationRepo.findDeviationFormById(deviationFromRequest.getDeviationId());
			String[] IgnoreProps =
			{"deviationId","createdBy", "createdAt",
				"sec1SupervisorStatus", "sec1SupervisorSaveOn", "sec1SupervisorSaveBy", "sec1SupervisorSaveId",
				"sec1SupervisorSubmitOn", "sec1SupervisorSubmitBy", "sec1SupervisorSubmitId", "sec1SupervisorSign",
				"sec1HodDesigneeStatus", "sec1HodDesigneeSubmitOn", "sec1HodDesigneeSubmitBy", "sec1HodDesigneeSubmitId",
				"sec1HodDesigneeSign", "sec1QaManagerMrReviewStatus", "sec1QaManagerMrReviewSaveOn",
				"sec1QaManagerMrReviewSaveBy", "sec1QaManagerMrReviewSaveId", "sec1QaManagerMrReviewSubmitOn",
				"sec1QaManagerMrReviewSubmitBy", "sec1QaManagerMrReviewSubmitId", "sec1QaManagerMrReviewSign",
				"sec1QaManagerMrInvgStatus", "sec1QaManagerMrInvgSaveOn", "sec1QaManagerMrInvgSaveBy", "sec1QaManagerMrInvgSaveId",
				"sec1QaManagerMrInvgSubmitOn", "sec1QaManagerMrInvgSubmitBy", "sec1QaManagerMrInvgSubmitId", "sec1QaManagerMrInvgSign",
				"sec2SupervisorStatus", "sec2SupervisorSaveOn", "sec2SupervisorSaveBy", "sec2SupervisorSaveId",
				"sec2SupervisorSubmitOn", "sec2SupervisorSubmitBy", "sec2SupervisorSubmitId", "sec2SupervisorSign",
				"sec2HodDesigneeStatus", "sec2HodDesigneeSubmitOn", "sec2HodDesigneeSubmitBy", "sec2HodDesigneeSubmitId", "sec2HodDesigneeSign",
				"sec2QaManagerMrStatus", "sec2QaManagerMrSaveOn", "sec2QaManagerMrSaveBy", "sec2QaManagerMrSaveId", "sec2QaManagerMrSubmitOn",
				"sec2QaManagerMrSubmitBy", "sec2QaManagerMrSubmitId", "sec2QaManagerMrSign",
				"sec3SupervisorStatus", "sec3SupervisorSaveOn", "sec3SupervisorSaveBy", "sec3SupervisorSaveId",
				"sec3SupervisorSubmitOn", "sec3SupervisorSubmitBy", "sec3SupervisorSubmitId", "sec3SupervisorSign",
				"sec3HodDesigneeStatus", "sec3HodDesigneeSubmitOn", "sec3HodDesigneeSubmitBy", "sec3HodDesigneeSubmitId","sec3HodDesigneeSign",
				"sec3QaManagerMrStatus", "sec3QaManagerMrSaveOn","sec3QaManagerMrSaveBy","sec3QaManagerMrSaveId","sec3QaManagerMrSubmitOn",
				"sec3QaManagerMrSubmitBy", "sec3QaManagerMrSubmitId", "sec3QaManagerMrSign"};

				BeanUtils.copyProperties(deviationFromRequest, deviationObj, IgnoreProps);
			} else {
				deviationObj = deviationFromRequest;
			}
			if (role.equals("ROLE_SUPERVISOR") || role.equals("QA_MANAGER") || role.equals("ROLE_MR") || role.equals("ROLE_HOD") || role.equals("ROLE_DESIGNEE") ) {
			if(section.equals("sec1_spvr"))
			{
				deviationObj.setSec1SupervisorSubmitBy(userName);
				deviationObj.setSec1SupervisorSubmitOn(date);
				deviationObj.setSec1SupervisorSubmitId(userId);
				deviationObj.setSec1SupervisorStatus(QaAppConstants.supervisorSubmitted);
				deviationObj.setSec1SupervisorSign(userName);
			}
			else if(section.equals("sec1_hod_designee"))
			{
				deviationObj.setSec1HodDesigneeSubmitBy(userName);
				deviationObj.setSec1HodDesigneeSubmitOn(date);
				deviationObj.setSec1HodDesigneeSubmitId(userId);
				deviationObj.setSec1HodDesigneeStatus(QaAppConstants.hodDesigneeSubmitted);
				deviationObj.setSec1HodDesigneeSign(userName);
			}
			else if(section.equals("sec1_qa_review"))
			{
				deviationObj.setSec1QaManagerMrReviewSubmitBy(userName);
				deviationObj.setSec1QaManagerMrReviewSubmitOn(date);
				deviationObj.setSec1QaManagerMrReviewSubmitId(userId);
				deviationObj.setSec1QaManagerMrReviewStatus(QaAppConstants.qaManagerMrSubmitted);
				deviationObj.setSec1QaManagerMrReviewSign(userName);
			}
			else if(section.equals("sec1_qa_invg"))
			{
				deviationObj.setSec1QaManagerMrInvgSubmitBy(userName);
				deviationObj.setSec1QaManagerMrInvgSubmitOn(date);
				deviationObj.setSec1QaManagerMrInvgSubmitId(userId);
				deviationObj.setSec1QaManagerMrInvgStatus(QaAppConstants.qaManagerMrSubmitted);
				deviationObj.setSec1QaManagerMrInvgSign(userName);
			}
			if(section.equals("sec2_spvr"))
			{
				deviationObj.setSec2SupervisorSubmitBy(userName);
				deviationObj.setSec2SupervisorSubmitOn(date);
				deviationObj.setSec2SupervisorSubmitId(userId);
				deviationObj.setSec2SupervisorStatus(QaAppConstants.supervisorSubmitted);
				deviationObj.setSec2SupervisorSign(userName);
			}
			else if(section.equals("sec2_hod_designee"))
			{
				deviationObj.setSec2HodDesigneeSubmitBy(userName);
				deviationObj.setSec2HodDesigneeSubmitOn(date);
				deviationObj.setSec2HodDesigneeSubmitId(userId);
				deviationObj.setSec2HodDesigneeStatus(QaAppConstants.hodDesigneeSubmitted);
				deviationObj.setSec2HodDesigneeSign(userName);
			}
			else if(section.equals("sec2_qa"))
			{
				deviationObj.setSec2QaManagerMrSubmitBy(userName);
				deviationObj.setSec2QaManagerMrSubmitOn(date);
				deviationObj.setSec2QaManagerMrSubmitId(userId);
				deviationObj.setSec2QaManagerMrStatus(QaAppConstants.qaManagerMrSubmitted);
				deviationObj.setSec2QaManagerMrSign(userName);
			}
			if(section.equals("sec3_spvr"))
			{
				deviationObj.setSec3SupervisorSubmitBy(userName);
				deviationObj.setSec3SupervisorSubmitOn(date);
				deviationObj.setSec3SupervisorSubmitId(userId);
				deviationObj.setSec3SupervisorStatus(QaAppConstants.supervisorSubmitted);
				deviationObj.setSec3SupervisorSign(userName);
			}
			else if(section.equals("sec3_hod_designee"))
			{
				deviationObj.setSec3HodDesigneeSubmitBy(userName);
				deviationObj.setSec3HodDesigneeSubmitOn(date);
				deviationObj.setSec3HodDesigneeSubmitId(userId);
				deviationObj.setSec3HodDesigneeStatus(QaAppConstants.hoddesigneeSubmitted);
				deviationObj.setSec3HodDesigneeSign(userName);
			}
			else if(section.equals("sec3_qa"))
			{
				deviationObj.setSec3QaManagerMrSubmitBy(userName);
				deviationObj.setSec3QaManagerMrSubmitOn(date);
				deviationObj.setSec3QaManagerMrSubmitId(userId);
				deviationObj.setSec3QaManagerMrStatus(QaAppConstants.qaManagerMrSubmitted);
				deviationObj.setSec3QaManagerMrSign(userName);
			}
			deviationRepo.save(deviationObj);

			// Deviation Form History Save - Start 
						
			DeviationFormHistory deviationHistory = new DeviationFormHistory();
			BeanUtils.copyProperties(deviationObj,deviationHistory);
			deviationHistory.setDeviationId(null);
			// version
			LocalDate dateOfIniation = deviationObj.getDateOfInitiation();
			String department = deviationObj.getDepartment();
			String deviationNumber = deviationObj.getDeviationNumber();
			int version = 0;

			version = deviationHistoryRepo.getMaximumVersion1(dateOfIniation,department,deviationNumber)
					.map(temp -> temp + 1).orElse(1);
						
			// Version End
			deviationHistory.setVersion(version);
			deviationHistoryRepo.save(deviationHistory); // ONE HISTORY
			
			// MAIL
//					 try {
//						  qamailfunction.sendMailToSupplierForSupplierAuditReport(auditReportObj); 
//					 } catch (Exception ex) {
//						  return new ResponseEntity<>(new ApiResponse(false, ex.toString()), HttpStatus.OK);
//					 }
			} else {
				return new ResponseEntity(new ApiResponse(false, role + " cannot submit details"),
						HttpStatus.BAD_REQUEST);
			}
		}
		catch(Exception ex) {
			log.error(" **** Unable to Submit Details **** " + ex);
			String msg = ex.getMessage();
			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(new ApiResponse(true, "Deviation Form Submitted Sucessfully"), HttpStatus.OK);
		//	return new ResponseEntity(auditScheduleObj, HttpStatus.CREATED);
	}
				

	public ResponseEntity<?> getDeviationFormByUniqueParams(LocalDate dateOfIniation,String department,String deviationNumber) {
		try {
			DeviationForm deviation = deviationRepo.findByUniqueParams(dateOfIniation,department,deviationNumber) ;
			
			if (deviation == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(deviation, HttpStatus.OK);
		} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
			}
	}
	
	public ResponseEntity<?> getDeviationFormByPrintParams(String year,String month,LocalDate dateOfIniation,String deviationNumber) {
		try {
			List<DeviationForm> deviationList = deviationRepo.findByPrintParams(year,month,dateOfIniation,deviationNumber);
			if (deviationList.size()==0) {
				return new ResponseEntity(new ApiResponse(true,"No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(deviationList, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}
	public ResponseEntity<?> getDeviationFormSummary(HttpServletRequest http) {
		List<DeviationFormSummaryDTO> deviationList = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			if (userRole.equals("ROLE_SUPERVISOR") || userRole.equals("QA_MANAGER") || userRole.equals("ROLE_MR") || userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE") )
			{
				deviationList = deviationRepo.getDeviationFormSummary();
			}else {
				log.error("User is not allowed to get the Details!");
				return new ResponseEntity<>("User is not allowed to get the Details! ", HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<>(deviationList, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}
public	ResponseEntity<?> getDeviationNumberByDepartment(String department)
	{
		try {
			List<String> numberList = deviationRepo.findDeviationNumberByDepartment(department);
			if (numberList == null) {
			return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(numberList, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// Deviation form - End
}
