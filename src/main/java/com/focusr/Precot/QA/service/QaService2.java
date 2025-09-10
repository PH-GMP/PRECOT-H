package com.focusr.Precot.QA.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.QA.model.AuditNCReportSummaryDTO;
import com.focusr.Precot.QA.model.AuditParticipant;
import com.focusr.Precot.QA.model.AuditReportClauseInfo;
import com.focusr.Precot.QA.model.AuditReportSummaryDTO;
import com.focusr.Precot.QA.model.AuditSummaryDTO;
import com.focusr.Precot.QA.model.AuditType;
import com.focusr.Precot.QA.model.InternalAudit;
import com.focusr.Precot.QA.model.InternalAuditDepartment;
import com.focusr.Precot.QA.model.InternalAuditNCReport;
import com.focusr.Precot.QA.model.InternalAuditReport;
import com.focusr.Precot.QA.model.InternalAuditSchedule;
import com.focusr.Precot.QA.model.InternalAuditSummaryDTO;
import com.focusr.Precot.QA.model.audit.AuditReportClauseInfoHistory;
import com.focusr.Precot.QA.model.audit.InternalAuditHistory;
import com.focusr.Precot.QA.model.audit.InternalAuditNCReportHistory;
import com.focusr.Precot.QA.model.audit.InternalAuditReportHistory;
import com.focusr.Precot.QA.model.audit.InternalAuditScheduleHistory;
import com.focusr.Precot.QA.repository.AuditParticipantRepo;
import com.focusr.Precot.QA.repository.AuditReportClauseInfoRepo;
import com.focusr.Precot.QA.repository.AuditTypeRepository;
import com.focusr.Precot.QA.repository.InternalAuditDepartmentRepo;
import com.focusr.Precot.QA.repository.InternalAuditNCReportRepo;
import com.focusr.Precot.QA.repository.InternalAuditRepo;
import com.focusr.Precot.QA.repository.InternalAuditReportRepo;
import com.focusr.Precot.QA.repository.InternalAuditScheduleRepo;
//import com.focusr.Precot.QA.repository.InternalAuditSummaryRepo;
//import com.focusr.Precot.QA.repository.InternalAuditSummaryRepo;
import com.focusr.Precot.QA.repository.audit.AuditReportClauseInfoHistoryRepo;
import com.focusr.Precot.QA.repository.audit.InternalAuditHistoryRepo;
import com.focusr.Precot.QA.repository.audit.InternalAuditNCReportHistoryRepo;
import com.focusr.Precot.QA.repository.audit.InternalAuditReportHistoryRepo;
import com.focusr.Precot.QA.repository.audit.InternalAuditScheduleHistoryRepo;
import com.focusr.Precot.QA.util.QaAppConstants;
import com.focusr.Precot.QA.util.mail.QAMailFunction;
import com.focusr.Precot.mssql.database.model.bleaching.Department;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.SCAUtil;

@Service
public class QaService2 {
	
	Logger log = LoggerFactory.getLogger(QaService2.class);
	@Autowired
	private JwtTokenProvider tokenProvider;
	@Autowired
	private SCAUtil scaUtil;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private InternalAuditScheduleRepo auditScheduleRepo ;
	@Autowired
	private InternalAuditScheduleHistoryRepo auditScheduleHistoryRepo ;
	@Autowired
	private InternalAuditHistoryRepo internalAuditHistoryRepo;
	@Autowired
	private InternalAuditRepo internalAuditRepo;
	@Autowired
	private AuditReportClauseInfoRepo auditReportClauseInfoRepo;
	@Autowired
	private AuditTypeRepository auditTypeRepo;
	@Autowired
	private InternalAuditDepartmentRepo auditDepartmentRepo;
	@Autowired
	private AuditParticipantRepo auditParticipantRepo;
	@Autowired
	private InternalAuditReportRepo auditReportRepo ;
	@Autowired
	private AuditReportClauseInfoRepo clauseInfoRepo ;
	@Autowired
	private InternalAuditReportHistoryRepo auditReportHistoryRepo ;
	@Autowired
	private AuditReportClauseInfoHistoryRepo clauseInfoHistoryRepo ;
	@Autowired
	private InternalAuditNCReportRepo auditNCReportRepo;
	@Autowired
	private InternalAuditNCReportHistoryRepo auditNCReportHistoryRepo;
//	@Autowired
//	private InternalAuditSummaryRepo auditSummaryRepo;
	@Autowired
	QAMailFunction qamailfunction;
//	
	
	// ************** InternalAuditSchedule *********************************************************//

		public ResponseEntity<?> saveAuditSchedule(InternalAuditSchedule scheduleFromRequest, HttpServletRequest http) {
			if (scheduleFromRequest == null) {
				return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
			}
			InternalAuditSchedule auditSchedule = null;
			try {
				Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
				String userName = userRepository.getUserName(userId);
				String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
				LocalDateTime currentDate = LocalDateTime.now();
				Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
				if ( scheduleFromRequest.getScheduleId() != null) {
					auditSchedule = auditScheduleRepo.findAuditScheduleById(scheduleFromRequest.getScheduleId());
					String[] IgnoreProps = 
						{"scheduleId","createdBy","createdAt","auditScheduleStatus","scheduleSaveOn",
								"scheduleSaveBy","scheduleSaveId","scheduleSubmitOn",
								"scheduleSubmitBy","scheduleSubmitId","scheduleSignName"};
					BeanUtils.copyProperties(scheduleFromRequest, auditSchedule, IgnoreProps);
				} else {
					auditSchedule = scheduleFromRequest;
				}
				if (role.equals("ROLE_MR") || role.equals("QA_MANAGER") ) {
					List<InternalAudit> list = scheduleFromRequest.getInternalAuditList();
					List<String> auditDepartmentNamesList = new ArrayList<>();
					for (InternalAudit audit : list) {
						audit.setScheduleId(auditSchedule.getScheduleId());
						auditDepartmentNamesList.add(audit.getDepartment().trim());
					}
					auditSchedule.setInternalAuditList(list);
					auditSchedule.setScheduleSaveBy(role);
					auditSchedule.setScheduleSaveOn(date);
					auditSchedule.setScheduleSaveId(userId);
					auditSchedule.setAuditScheduleStatus(QaAppConstants.scheduleSave);
					auditScheduleRepo.save(auditSchedule);
					// Add Additional departments - Start
					addAdditionalDepartments(auditDepartmentNamesList);
					//	Add Additional departments - End
				} else {
					return new ResponseEntity(new ApiResponse(false, role + " cannot save details"),
							HttpStatus.BAD_REQUEST);
				}
			} catch (
			Exception ex) {
				log.error(" **** Unable to save Details! **** " + ex);
				String msg = ex.getMessage();
				return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
			}
//			return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);
			return new ResponseEntity(auditSchedule, HttpStatus.CREATED);
		}
		public ResponseEntity<?> submitAuditSchedule(InternalAuditSchedule scheduleFromRequest, HttpServletRequest http) {
			SCAUtil scaUtil = new SCAUtil();

			if (scheduleFromRequest == null) {
				return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
			}

			Long id = scheduleFromRequest.getScheduleId();

			InternalAuditSchedule auditScheduleObj = new InternalAuditSchedule();

			try {
				LocalDateTime currentDate = LocalDateTime.now();

				// Convert LocalDateTime to Date
				Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

				Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

				String userName = userRepository.getUserName(userId);

				String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

				if (id != null) {

					auditScheduleObj = auditScheduleRepo.findAuditScheduleById(scheduleFromRequest.getScheduleId());

					String[] IgnoreProps = {"scheduleId","createdBy","createdAt","auditScheduleStatus","scheduleSaveOn",
							"scheduleSaveBy","scheduleSaveId","scheduleSubmitOn",
							"scheduleSubmitBy","scheduleSubmitId","scheduleSignName"};

					BeanUtils.copyProperties(scheduleFromRequest, auditScheduleObj, IgnoreProps);

				} else {
					auditScheduleObj = scheduleFromRequest;
				}

				if (role.equals("ROLE_MR") || role.equals("QA_MANAGER")) {

						List<InternalAudit> auditList = scheduleFromRequest.getInternalAuditList();
						List<String> auditDepartmentNamesList = new ArrayList<>();
						for (InternalAudit audit : auditList) {
							audit.setScheduleId(scheduleFromRequest.getScheduleId());
							auditDepartmentNamesList.add(audit.getDepartment().trim());
						}
						auditScheduleObj.setInternalAuditList(auditList);
						auditScheduleObj.setScheduleSubmitBy(userName);
						auditScheduleObj.setScheduleSubmitOn(date);
						auditScheduleObj.setScheduleSubmitId(userId);
						auditScheduleObj.setAuditScheduleStatus(QaAppConstants.scheduleSubmit);
						auditScheduleObj.setScheduleSignName(userName);
						auditScheduleRepo.save(auditScheduleObj);
						// Add Additional departments - Start
							addAdditionalDepartments(auditDepartmentNamesList);
						//	Add Additional departments - End
						
						InternalAuditScheduleHistory scheduleHistory = new InternalAuditScheduleHistory();
						// getter setters fields & status
						scheduleHistory.setFormatName(auditScheduleObj.getFormatName());
						scheduleHistory.setFormatNo(auditScheduleObj.getFormatNo());
						scheduleHistory.setRevisionNo(auditScheduleObj.getRevisionNo());
						scheduleHistory.setSopNumber(auditScheduleObj.getSopNumber());
						scheduleHistory.setUnit(auditScheduleObj.getUnit());
						
						scheduleHistory.setAuditScheduleYear(auditScheduleObj.getAuditScheduleYear());
						scheduleHistory.setAuditScheduleMonth(auditScheduleObj.getAuditScheduleMonth());
						scheduleHistory.setAuditScheduleStatus(auditScheduleObj.getAuditScheduleStatus());
						
						// status
						scheduleHistory.setScheduleSubmitBy(auditScheduleObj.getScheduleSubmitBy());
						scheduleHistory.setScheduleSubmitOn(auditScheduleObj.getScheduleSubmitOn());
						scheduleHistory.setScheduleSubmitId(auditScheduleObj.getScheduleSubmitId());
						scheduleHistory.setScheduleSignName(auditScheduleObj.getScheduleSignName());
						// version
						String month = auditScheduleObj.getAuditScheduleMonth();

						String year = auditScheduleObj.getAuditScheduleYear();

						int version = 0;

						version = auditScheduleHistoryRepo.getMaximumVersion1(year,month)
									.map(temp -> temp + 1).orElse(1);
						
						// Version End
						

						scheduleHistory.setVersion(version);

						auditScheduleHistoryRepo.save(scheduleHistory); // ONE HISTORY

						List<InternalAudit> historyMapList = auditScheduleObj.getInternalAuditList();

						for (InternalAudit obj : historyMapList) {

							InternalAuditHistory objHistory = new InternalAuditHistory();
							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setScheduleId(scheduleHistory.getScheduleId());
							internalAuditHistoryRepo.save(objHistory);

						}
												
						auditScheduleHistoryRepo.save(scheduleHistory);

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

			return new ResponseEntity(new ApiResponse(true, "Audit Schedule Submitted Sucessfully"), HttpStatus.OK);

//			return new ResponseEntity(auditScheduleObj, HttpStatus.CREATED);

		}
		public void addAdditionalDepartments(List<String> auditDepartmentNamesList)
		{
			List<String> masterDeptList = auditDepartmentRepo.getAuditDepartments();
			auditDepartmentNamesList.removeAll(masterDeptList);
			if(auditDepartmentNamesList.size() > 0)
			{
				for(String dept : auditDepartmentNamesList)
				{
					InternalAuditDepartment department = new InternalAuditDepartment();
					department.setAuditDepartment(dept.trim());
					department.setFormatNo("PH-QAD01/F-010");
					auditDepartmentRepo.save(department);
				}
			}
		}
		
		public ResponseEntity<?> getAuditScheduleByUniqueParams( String year, String month) {
			try {

				InternalAuditSchedule auditSchedule = auditScheduleRepo.findByUniqueParams(year,month);

				if (auditSchedule == null) {
					return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
				}

				return new ResponseEntity<>(auditSchedule, HttpStatus.OK);
			} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
			}
		}
		public ResponseEntity<?> getAuditScheduleByPrintParams( String year, String month) {
			try {
				List<InternalAuditSchedule> auditScheduleList = auditScheduleRepo.findByPrintParams(year,month);
				if (auditScheduleList.size()==0) {
					return new ResponseEntity(new ApiResponse(true,"No data"), HttpStatus.OK);
				}
				return new ResponseEntity<>(auditScheduleList, HttpStatus.OK);
			} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
			}
		}
		public ResponseEntity<?> getAuditScheduleSummary(HttpServletRequest http) {

			List<AuditSummaryDTO> auditScheduleList = null;
			try {
				String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

				 if(userRole.equals("QA_MANAGER") || userRole.equals("ROLE_MR")) {

					 auditScheduleList = auditScheduleRepo.getAuditScheduleSummary();
				 }	 
				return new ResponseEntity<>(auditScheduleList, HttpStatus.OK);
			} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
			}
		}
		// DELETE CHILD - DEPARTMENT AUDIT INFO
		public ResponseEntity<?> deleteDepartmentInfoFromSchedule(Long id) {
			try {
				InternalAudit auditDepartment = internalAuditRepo.findAuditDepartmentById(id);
				if (auditDepartment == null) {
					return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
				}
				internalAuditRepo.deleteById(id);
			} catch (Exception ex) {
				log.error(" **** Unable to delete details! **** " + ex);
				String msg = ex.getMessage();
				return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
		}
		// AuditType - Start //
		
		public ResponseEntity<?> saveAuditType(AuditType auditType, HttpServletRequest http) {

			try {
				auditTypeRepo.save(auditType);
			} catch (Exception ex) {
				log.error(" **** Unable to save Details! **** " + ex);
				String msg = ex.getMessage();
				return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity(auditType, HttpStatus.CREATED);
		}
		public ResponseEntity<?> getAuditTypes() {
			try {
				List<AuditType> auditTypeList = auditTypeRepo.findAll();

				if (auditTypeList == null || auditTypeList.isEmpty()) {
					return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
				}

				return new ResponseEntity<>(auditTypeList, HttpStatus.OK);
			} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
			}
		}
		
		public ResponseEntity<?> deleteAuditType(Long id) {
			try {
				AuditType auditType = auditTypeRepo.findAuditById(id);
				if (auditType == null) {
					return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
				}
				auditTypeRepo.deleteById(id);
			} catch (Exception ex) {
				log.error(" **** Unable to delete details! **** " + ex);
				String msg = ex.getMessage();
				return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
		}
		// AuditType - End //

		// Audit Department - Start //
		public ResponseEntity<?> saveAuditDepartment(InternalAuditDepartment auditDepartment, HttpServletRequest http) {

			try {
				auditDepartmentRepo.save(auditDepartment);
			} catch (Exception ex) {
				log.error(" **** Unable to save Details! **** " + ex);
				String msg = ex.getMessage();
				return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity(auditDepartment, HttpStatus.CREATED);
		}
		public ResponseEntity<?> getAuditDepartments() {
			try {
				List<InternalAuditDepartment> auditDepartmentList = auditDepartmentRepo.findAll();

				if (auditDepartmentList == null || auditDepartmentList.isEmpty()) {
					return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
				}

				return new ResponseEntity<>(auditDepartmentList, HttpStatus.OK);
			} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
			}
		}
		
		public ResponseEntity<?> deleteAuditDepartment(Long id) {
			try {
				InternalAuditDepartment auditDepartment = auditDepartmentRepo.findAuditDepartmentById(id);
				if (auditDepartment == null) {
					return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
				}
				auditDepartmentRepo.deleteById(id);
			} catch (Exception ex) {
				log.error(" **** Unable to delete details! **** " + ex);
				String msg = ex.getMessage();
				return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
		}
		// Audit Department - End //
		// Audit Participant - Start //
		public ResponseEntity<?> saveAuditParticipant(AuditParticipant auditParticipant, HttpServletRequest http) {
			try {
				auditParticipantRepo.save(auditParticipant);
			} catch (Exception ex) {
				log.error(" **** Unable to save Details! **** " + ex);
				String msg = ex.getMessage();
				return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity(auditParticipant, HttpStatus.CREATED);
		}
		public ResponseEntity<?> getAuditParticipants() {
			try {
				List<AuditParticipant> auditParticipantList = auditParticipantRepo.findAll();
				if (auditParticipantList == null || auditParticipantList.isEmpty()) {
					return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
				}
				return new ResponseEntity<>(auditParticipantList, HttpStatus.OK);
			} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
			}
		}
		public ResponseEntity<?> deleteAuditParticipant(Long id) {
			try {
				AuditParticipant auditParticipant = auditParticipantRepo.findAuditParticipantById(id);
				if (auditParticipant == null) {
					return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
				}
				auditParticipantRepo.deleteById(id);
			} catch (Exception ex) {
				log.error(" **** Unable to delete details! **** " + ex);
				String msg = ex.getMessage();
				return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
		}
		
	// Internal Audit Schedule - END

//Internal Audit Report - Start

		public ResponseEntity<?> saveAuditReport(InternalAuditReport reportFromRequest, HttpServletRequest http) {
			if (reportFromRequest == null) {
				return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
			}
			InternalAuditReport auditReport = null;
			try {
				Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
				String userName = userRepository.getUserName(userId);
				String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
				LocalDateTime currentDate = LocalDateTime.now();
				Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
				if ( reportFromRequest.getReportId() != null) {
					auditReport = auditReportRepo.findAuditReportById(reportFromRequest.getReportId());
					String[] IgnoreProps = 
						{ "reportId","createdBy", "createdAt","auditeeStatus","auditeeSaveOn","auditeeSaveBy","auditeeSaveId",
								"auditeeSubmitOn","auditeeSubmitBy","auditeeSubmitId","auditeeSign","auditorStatus","auditorSubmitOn","auditorSubmitBy",
								"auditorSubmitId","auditorSign","qaMrStatus","qaMrSubmitOn","qaMrSubmitBy","qaMrSubmitId","qaMrSign"};
						BeanUtils.copyProperties(reportFromRequest, auditReport, IgnoreProps);
				} else {
					auditReport = reportFromRequest;
				}
				if (role.equals("ROLE_HOD")) {
					auditReportRepo.save(auditReport);
					List<AuditReportClauseInfo> caluseInfolist = reportFromRequest.getClauseInfoList();
					for (AuditReportClauseInfo clause : caluseInfolist) {
						clause.setReportId(reportFromRequest.getReportId());
						clauseInfoRepo.save(clause);
					}
					auditReport.setClauseInfoList(caluseInfolist);
					auditReport.setAuditeeSaveBy(userName);
					auditReport.setAuditeeSaveOn(date);
					auditReport.setAuditeeSaveId(userId);
					auditReport.setAuditeeStatus(QaAppConstants.auditeeSave);
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
	

		public ResponseEntity<?> submitAuditReport(InternalAuditReport reportFromRequest, HttpServletRequest http) {
			SCAUtil scaUtil = new SCAUtil();

			if (reportFromRequest == null) {
				return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
			}
			Long id = reportFromRequest.getReportId();
			InternalAuditReport auditReportObj = new InternalAuditReport();
			try {
				LocalDateTime currentDate = LocalDateTime.now();
				// Convert LocalDateTime to Date
				Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
				Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
				String userName = userRepository.getUserName(userId);
				String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
				if (id != null) {
					auditReportObj = auditReportRepo.findAuditReportById(reportFromRequest.getReportId());

					String[] IgnoreProps = { "reportId","createdBy","createdAt",
							"auditeeStatus","auditeeSaveOn","auditeeSaveBy","auditeeSaveId",
							"auditeeSubmitOn","auditeeSubmitBy","auditeeSubmitId","auditeeSign",
							"auditorStatus","auditorSubmitOn","auditorSubmitBy",
							"auditorSubmitId","auditorSign",
							"qaMrStatus","qaMrSubmitOn","qaMrSubmitBy","qaMrSubmitId","qaMrSign"};
					BeanUtils.copyProperties(reportFromRequest, auditReportObj, IgnoreProps);

					} else {
						auditReportObj = reportFromRequest;
					}

				if (role.equals("ROLE_HOD") ) {
					auditReportRepo.save(auditReportObj);
					List<AuditReportClauseInfo> clauseList = reportFromRequest.getClauseInfoList();
					for (AuditReportClauseInfo clause : clauseList) {
						clause.setReportId(reportFromRequest.getReportId());
						clauseInfoRepo.save(clause);
					}
					auditReportObj.setClauseInfoList(clauseList);
					auditReportObj.setAuditeeSubmitBy(userName);
					auditReportObj.setAuditeeSubmitOn(date);			
					auditReportObj.setAuditeeSubmitId(userId);
					auditReportObj.setAuditeeStatus(QaAppConstants.auditeeSubmit);
					if(auditReportObj.getQaMrStatus() != null && auditReportObj.getQaMrStatus().equals(QaAppConstants.qaMrRejectedStatus))
					{
						auditReportObj.setQaMrStatus(null);
					}
					auditReportObj.setAuditeeSign(userName);
					auditReportObj.setAuditorStatus(QaAppConstants.waitingStatus);
					auditReportRepo.save(auditReportObj);
				// InternalAuditReportHistory Save - Start 
				InternalAuditReportHistory reportHistory = new InternalAuditReportHistory();
				reportHistory.setFormatName(auditReportObj.getFormatName());
				reportHistory.setFormatNo(auditReportObj.getFormatNo());
				reportHistory.setRevisionNo(auditReportObj.getRevisionNo());
				reportHistory.setSopNumber(auditReportObj.getSopNumber());
				reportHistory.setUnit(auditReportObj.getUnit());
				reportHistory.setAuditYear(auditReportObj.getAuditYear());
				reportHistory.setAuditMonth(auditReportObj.getAuditMonth());
				reportHistory.setIarNo(auditReportObj.getIarNo());
				reportHistory.setAuditeeName(auditReportObj.getAuditeeName());
				reportHistory.setAuditorName(auditReportObj.getAuditorName());
				reportHistory.setDepartment(auditReportObj.getDepartment());
				reportHistory.setStandard(auditReportObj.getStandard());
				reportHistory.setReportDate(auditReportObj.getReportDate());
				reportHistory.setReason(auditReportObj.getReason());
				reportHistory.setAuditRemarks(auditReportObj.getAuditRemarks());
				reportHistory.setTotalNoOfNc(auditReportObj.getTotalNoOfNc());
				reportHistory.setNoOfMinorNc(auditReportObj.getNoOfMinorNc());
				reportHistory.setNoOfMajorNc(auditReportObj.getNoOfMajorNc());
				// status
				reportHistory.setAuditorStatus(auditReportObj.getAuditorStatus());
				reportHistory.setAuditeeStatus(auditReportObj.getAuditeeStatus());
				reportHistory.setQaMrStatus(auditReportObj.getQaMrStatus());
				reportHistory.setAuditeeSubmitBy(auditReportObj.getAuditeeSubmitBy());
				reportHistory.setAuditeeSubmitOn(auditReportObj.getAuditeeSubmitOn());
				reportHistory.setAuditeeSubmitId(auditReportObj.getAuditeeSubmitId());
				reportHistory.setAuditeeSign(auditReportObj.getAuditeeSign());
				// version
				String month = auditReportObj.getAuditMonth();
				String year = auditReportObj.getAuditYear();
				String department = auditReportObj.getDepartment();
				int version = 0;
				version = auditReportHistoryRepo.getMaximumVersion1(year,month,department)
							.map(temp -> temp + 1).orElse(1);
				// Version End
				reportHistory.setVersion(version);
				auditReportHistoryRepo.save(reportHistory); // ONE HISTORY
				List<AuditReportClauseInfo> historyMapList = auditReportObj.getClauseInfoList();
				for (AuditReportClauseInfo obj : historyMapList) {
					AuditReportClauseInfoHistory objHistory = new AuditReportClauseInfoHistory();
					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setReportId(reportHistory.getReportId());
					clauseInfoHistoryRepo.save(objHistory);
				}
				auditReportHistoryRepo.save(reportHistory);
				
				// MAIL
				 try {
					  
					  qamailfunction.sendMailToAuditorInternalAudit(auditReportObj); 
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
		

	public ResponseEntity<?> approveRejectAuditReport(ApproveResponse approvalResponse, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		InternalAuditReport auditReport = new InternalAuditReport();
		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			auditReport = auditReportRepo.findAuditReportById(approvalResponse.getId());
			InternalAuditReportHistory reportHistory = new InternalAuditReportHistory();
			String auditeeStatus = auditReport.getAuditeeStatus();
			String auditorStatus = auditReport.getAuditorStatus();
			String qaMrStatus = auditReport.getQaMrStatus();
			String status = "";
			if ((auditeeStatus!= null && auditeeStatus.equalsIgnoreCase(QaAppConstants.auditeeSubmit))
				&& (auditorStatus!=null && auditorStatus.equalsIgnoreCase(AppConstants.waitingStatus))) {
				if (userRole.equalsIgnoreCase("ROLE_HOD")) {
					String reason = approvalResponse.getRemarks();
					reportHistory = auditReportHistoryRepo.fetchLastSubmittedRecord(auditReport.getAuditYear(),auditReport.getAuditMonth(),auditReport.getDepartment());
					if (approvalResponse.getStatus().equals("Approve")) {
						auditReport.setAuditorStatus(QaAppConstants.auditorApproved);
						reportHistory.setAuditorStatus(QaAppConstants.auditorApproved);
						auditReport.setQaMrStatus(QaAppConstants.waitingStatus);
						reportHistory.setQaMrStatus(QaAppConstants.waitingStatus);
						status = "Approved";
						
					} else if (approvalResponse.getStatus().equals("Reject")) {
						auditReport.setReason(reason);
						auditReport.setAuditorStatus(QaAppConstants.auditorRejected);
						reportHistory.setReason(reason);
						reportHistory.setAuditorStatus(QaAppConstants.auditorRejected);
						status = "Rejected";
					}
					auditReport.setAuditorSubmitOn(date);
					auditReport.setAuditorSubmitBy(userName);
					auditReport.setAuditorSubmitId(userId);
					auditReport.setAuditorSign(userName);

					auditReportRepo.save(auditReport);

					reportHistory.setAuditorSubmitOn(date);
					reportHistory.setAuditorSubmitBy(userName);
					reportHistory.setAuditorSubmitId(userId);
					reportHistory.setAuditorSign(userName);

					auditReportHistoryRepo.save(reportHistory);
					if(status.equals("Approved"))
					{
					// MAIL
					try {
						  
						  qamailfunction.sendMailToQaManagerInternalAudit(auditReport); 
					} catch (Exception ex) {
						  System.out.println("Internal Audit Report");
						  ex.printStackTrace();;
						  return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "), HttpStatus.OK);
					 }
					
					}

					return new ResponseEntity<>(new ApiResponse(true, "Auditor " + status + " Successfully"),
					HttpStatus.OK);

					} else {
						return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
						HttpStatus.BAD_REQUEST);
					}
			}
			else if((auditorStatus != null && auditorStatus.equalsIgnoreCase(QaAppConstants.auditorApproved))
					&& (qaMrStatus != null && qaMrStatus.equalsIgnoreCase(AppConstants.waitingStatus))) {
					if (userRole.equalsIgnoreCase("ROLE_MR") || userRole.equalsIgnoreCase("QA_MANAGER")) {
						String reason = approvalResponse.getRemarks();
						reportHistory = auditReportHistoryRepo.fetchLastSubmittedRecord(auditReport.getAuditYear(),auditReport.getAuditMonth(),auditReport.getDepartment());
						if (approvalResponse.getStatus().equals("Approve")) {
							auditReport.setQaMrStatus(QaAppConstants.qaMrApprovedStatus);
							reportHistory.setQaMrStatus(QaAppConstants.qaMrApprovedStatus);
							status = "Approved";
						} else if (approvalResponse.getStatus().equals("Reject")) {
							auditReport.setReason(reason);
							auditReport.setQaMrStatus(QaAppConstants.qaMrRejectedStatus);
							reportHistory.setReason(reason);
							reportHistory.setQaMrStatus(QaAppConstants.qaMrRejectedStatus);
							status = "Rejected";
						}
						auditReport.setQaMrSubmitOn(date);
						auditReport.setQaMrSubmitBy(userName);
						auditReport.setQaMrSubmitId(userId);
						auditReport.setQaMrSign(userName);

						auditReportRepo.save(auditReport);

						reportHistory.setQaMrSubmitOn(date);
						reportHistory.setQaMrSubmitBy(userName);
						reportHistory.setQaMrSubmitId(userId);
						reportHistory.setQaMrSign(userName);

						auditReportHistoryRepo.save(reportHistory);

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
	public ResponseEntity<?> getAuditReportByUniqueParams( String year, String month,String department) {
		try {

			InternalAuditReport auditReport = auditReportRepo.findByUniqueParams(year,month,department);
			if (auditReport == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(auditReport, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}
	public ResponseEntity<?> getAuditReportByPrintParams( String year, String month , String department) {
		try {
			List<InternalAuditReport> auditReportist = auditReportRepo.findByPrintParams(year,month,department);
			if (auditReportist.size()==0) {
				return new ResponseEntity(new ApiResponse(true,"No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(auditReportist, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}
	public ResponseEntity<?> getAuditReportSummary(HttpServletRequest http) {
		List<AuditReportSummaryDTO> auditReportList = null;
		try {
		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			if(userRole.equals("QA_MANAGER") || userRole.equals("ROLE_MR")|| userRole.equals("ROLE_HOD")) {
				auditReportList = auditReportRepo.getAuditReportSummary();
			}	 
			return new ResponseEntity<>(auditReportList, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}
	// DELETE CHILD - CLAUSE INFO
	public ResponseEntity<?> deleteClauseInfoFromReport(Long id) {
		try {
			AuditReportClauseInfo auditDepartment = auditReportClauseInfoRepo.findClauseInfoById(id);
			if (auditDepartment == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
			}
			auditReportClauseInfoRepo.deleteById(id);
		} catch (Exception ex) {
			log.error(" **** Unable to delete details! **** " + ex);
			String msg = ex.getMessage();
			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}

//Internal Audit Report - END

//Internal Audit NC Report - Start
	
	public ResponseEntity<?> saveAuditNCReport(InternalAuditNCReport reportFromRequest, HttpServletRequest http) {
		if (reportFromRequest == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}
		InternalAuditNCReport auditNCReport = null;
		String level = http.getParameter("level");
		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			if ( reportFromRequest.getReportId() != null) {
				auditNCReport = auditNCReportRepo.findAuditNCReportById(reportFromRequest.getReportId());
				String[] IgnoreProps = {"createdBy", "createdAt",
						"firstAuditorSaveOn","firstAuditorSaveBy","firstAuditorSaveId","firstAuditorStatus","firstAuditorSign",
						"firstAuditorSubmitOn","firstAuditorSubmitBy","firstAuditorSubmitId",
						"auditeeSaveOn","auditeeSaveBy","auditeeSaveId","auditeeStatus","auditeeSign",
						"auditeeSubmitOn","auditeeSubmitBy","auditeeSubmitId",
						"secondAuditorSaveOn","secondAuditorSaveBy","secondAuditorSaveId","secondAuditorStatus","secondAuditorSign",
						"secondAuditorSubmitOn","secondAuditorSubmitBy","secondAuditorSubmitId",
						"qaMrSaveOn","qaMrSaveBy","qaMrSaveId","qaMrStatus","qaMrSign","qaMrSubmitStatus","qaMrApprovalStatus",
						"qaMrSubmitOn","qaMrSubmitBy","qaMrSubmitId"};
					BeanUtils.copyProperties(reportFromRequest, auditNCReport, IgnoreProps);
			} else {
				auditNCReport = reportFromRequest;
			}
			if (role.equals("ROLE_HOD") || role.equalsIgnoreCase("ROLE_MR") || role.equalsIgnoreCase("QA_MANAGER")) {
				if(level.equals("level1"))
				{
					auditNCReport.setFirstAuditorSaveBy(userName);
					auditNCReport.setFirstAuditorSaveOn(date);
					auditNCReport.setFirstAuditorSaveId(userId);
					auditNCReport.setFirstAuditorStatus(QaAppConstants.firstAuditorSaved);
					
				}else if(level.equals("level2"))
				{
					auditNCReport.setAuditeeSaveBy(userName);
					auditNCReport.setAuditeeSaveOn(date);
					auditNCReport.setAuditeeSaveId(userId);
					auditNCReport.setAuditeeStatus(QaAppConstants.auditeeSave);
					
				}else if(level.equals("level3"))
				{
					auditNCReport.setSecondAuditorSaveBy(userName);
					auditNCReport.setSecondAuditorSaveOn(date);
					auditNCReport.setSecondAuditorSaveId(userId);
					auditNCReport.setSecondAuditorStatus(QaAppConstants.secondAuditorSaved);
					
				}else if(level.equals("level4"))
				{
					auditNCReport.setQaMrSaveBy(userName);
					auditNCReport.setQaMrSaveOn(date);
					auditNCReport.setQaMrSaveId(userId);
					auditNCReport.setQaMrStatus(QaAppConstants.qaMrSaved);
					
				}
				auditNCReportRepo.save(auditNCReport);
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
		return new ResponseEntity(auditNCReport, HttpStatus.CREATED);
	}


	public ResponseEntity<?> submitAuditNCReport(InternalAuditNCReport reportFromRequest, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (reportFromRequest == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}
		Long id = reportFromRequest.getReportId();
		InternalAuditNCReport auditNCReportObj = new InternalAuditNCReport();
		try {
			LocalDateTime currentDate = LocalDateTime.now();
			String level = http.getParameter("level");
			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			if (id != null) {
				auditNCReportObj = auditNCReportRepo.findAuditNCReportById(reportFromRequest.getReportId());
				String[] IgnoreProps = {"createdBy", "createdAt",
						"firstAuditorSaveOn","firstAuditorSaveBy","firstAuditorSaveId","firstAuditorStatus","firstAuditorSign",
						"firstAuditorSubmitOn","firstAuditorSubmitBy","firstAuditorSubmitId",
						"auditeeSaveOn","auditeeSaveBy","auditeeSaveId","auditeeStatus","auditeeSign",
						"auditeeSubmitOn","auditeeSubmitBy","auditeeSubmitId",
						"secondAuditorSaveOn","secondAuditorSaveBy","secondAuditorSaveId","secondAuditorStatus","secondAuditorSign",
						"secondAuditorSubmitOn","secondAuditorSubmitBy","secondAuditorSubmitId",
						"qaMrSaveOn","qaMrSaveBy","qaMrSaveId","qaMrStatus","qaMrSign","qaMrSubmitStatus","qaMrApprovalStatus",
						"qaMrSubmitOn","qaMrSubmitBy","qaMrSubmitId"};
				
				BeanUtils.copyProperties(reportFromRequest, auditNCReportObj, IgnoreProps);

				} else {
					auditNCReportObj = reportFromRequest;
				}
				if (role.equals("ROLE_HOD") || role.equalsIgnoreCase("ROLE_MR") || role.equalsIgnoreCase("QA_MANAGER")) {
					if(level.equals("level1"))
					{
						auditNCReportObj.setFirstAuditorSubmitBy(userName);
						auditNCReportObj.setFirstAuditorSubmitOn(date);
						auditNCReportObj.setFirstAuditorSubmitId(userId);
						auditNCReportObj.setFirstAuditorStatus(QaAppConstants.firstAuditorSubmitted);
						auditNCReportObj.setAuditeeStatus(null);
						auditNCReportObj.setSecondAuditorStatus(null);
						auditNCReportObj.setQaMrStatus(null);
						auditNCReportObj.setQaMrSubmitStatus(null);
						auditNCReportObj.setFirstAuditorSign(userName);
					}else if(level.equals("level2"))
					{
						auditNCReportObj.setAuditeeSubmitBy(userName);
						auditNCReportObj.setAuditeeSubmitOn(date);
						auditNCReportObj.setAuditeeSubmitId(userId);
						auditNCReportObj.setAuditeeStatus(QaAppConstants.auditeeSubmit);
						auditNCReportObj.setAuditeeSign(userName);
					}else if(level.equals("level3"))
					{
						auditNCReportObj.setSecondAuditorSubmitBy(userName);
						auditNCReportObj.setSecondAuditorSubmitOn(date);
						auditNCReportObj.setSecondAuditorSubmitId(userId);
						auditNCReportObj.setSecondAuditorStatus(QaAppConstants.secondAuditorSubmitted);
						auditNCReportObj.setSecondAuditorSign(userName);
					}else if(level.equals("level4"))
					{
						auditNCReportObj.setQaMrSubmitBy(userName);
						auditNCReportObj.setQaMrSubmitOn(date);
						auditNCReportObj.setQaMrSubmitId(userId);
						auditNCReportObj.setQaMrSubmitStatus(QaAppConstants.qaMrSubmitted);
						auditNCReportObj.setQaMrStatus(QaAppConstants.waitingStatus);
						auditNCReportObj.setQaMrSign(userName);
					}
				
					auditNCReportRepo.save(auditNCReportObj);
					if(level.equals("level4"))
					{
						// InternalAuditNCReportHistory Save - Start 
						InternalAuditNCReportHistory ncReportHistory = new InternalAuditNCReportHistory();
						BeanUtils.copyProperties(auditNCReportObj,ncReportHistory);
						ncReportHistory.setReportId(null);
						// 	version
						String year = auditNCReportObj.getAuditYear();
						String iarNo = auditNCReportObj.getIarNo();
						String department = auditNCReportObj.getDepartment();
						String ncrNo = auditNCReportObj.getNcrNo();
						int version = 0;
						version = auditNCReportHistoryRepo.getMaximumVersion1(year,iarNo,department,ncrNo)
								.map(temp -> temp + 1).orElse(1);
						// Version End
						ncReportHistory.setVersion(version);
						auditNCReportHistoryRepo.save(ncReportHistory); // ONE HISTORY
						// MAIL
						 try {
							  
							  qamailfunction.sendMailToInternalAuditeeNcReportQaManager(auditNCReportObj); 
					  } catch (Exception ex) {
							  return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "), HttpStatus.OK);
							  }

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
	

	public ResponseEntity<?> approveRejectAuditNCReport(ApproveResponse approvalResponse, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		InternalAuditNCReport auditNCReport = new InternalAuditNCReport();
		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			auditNCReport = auditNCReportRepo.findAuditNCReportById(approvalResponse.getId());
			InternalAuditNCReportHistory ncReportHistory = new InternalAuditNCReportHistory();
			//String auditorStatus = auditNCReport.getAuditorStatus();
			String qaMrStatus = auditNCReport.getQaMrStatus();
			String status = "";
			if ((qaMrStatus!=null && qaMrStatus.equalsIgnoreCase(AppConstants.waitingStatus))) {
				if (userRole.equalsIgnoreCase("ROLE_MR") || userRole.equalsIgnoreCase("QA_MANAGER")) {
					String reason = approvalResponse.getRemarks();
					ncReportHistory = auditNCReportHistoryRepo.fetchLastSubmittedRecord(auditNCReport.getAuditYear(),auditNCReport.getIarNo(),auditNCReport.getDepartment(),auditNCReport.getNcrNo());
					if (approvalResponse.getStatus().equals("Approve")) {
						auditNCReport.setQaMrStatus(QaAppConstants.qaMrApprovedStatus);
						ncReportHistory.setQaMrStatus(QaAppConstants.qaMrApprovedStatus);
						auditNCReport.setQaMrApprovalStatus("Approved");
						ncReportHistory.setQaMrApprovalStatus("Approved");
						status = "Approved";
					} else if (approvalResponse.getStatus().equals("Reject")) {
						auditNCReport.setReason(reason);
						auditNCReport.setQaMrStatus(QaAppConstants.qaMrRejectedStatus);
						ncReportHistory.setReason(reason);
						ncReportHistory.setQaMrStatus(QaAppConstants.qaMrRejectedStatus);
						auditNCReport.setQaMrApprovalStatus("Rejected");
						ncReportHistory.setQaMrApprovalStatus("Rejected");
						status = "Rejected";
					}
					auditNCReport.setQaMrSubmitOn(date);
					auditNCReport.setQaMrSubmitBy(userName);
					auditNCReport.setQaMrSubmitId(userId);
					auditNCReport.setQaMrSign(userName);
					auditNCReportRepo.save(auditNCReport);
					ncReportHistory.setQaMrSubmitOn(date);
					ncReportHistory.setQaMrSubmitBy(userName);
					ncReportHistory.setQaMrSubmitId(userId);
					ncReportHistory.setQaMrSign(userName);
					auditNCReportHistoryRepo.save(ncReportHistory);
					return new ResponseEntity<>(new ApiResponse(true, "QA / MR " + status + " Successfully"),
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
	public ResponseEntity<?> getAuditNCReportByUniqueParams( String year, String iarNo,String department,String ncrNo) {
		try {
				List<InternalAuditNCReport> auditNCReport = auditNCReportRepo.findByUniqueParams(year,iarNo,ncrNo,department);
				if (auditNCReport == null) {
					return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
				}
				return new ResponseEntity<>(auditNCReport, HttpStatus.OK);
			} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
			}
	}
	public ResponseEntity<?> getAuditNCReportByPrintParams( String year, String iarNo) {
		try {
			List<InternalAuditNCReport> auditReportist = auditNCReportRepo.findByPrintParams(year,iarNo);
			if (auditReportist.size()==0) {
				return new ResponseEntity(new ApiResponse(true,"No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(auditReportist, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}
	public ResponseEntity<?> getAuditNCReportSummary(HttpServletRequest http) {
		List<AuditNCReportSummaryDTO> auditNCReportList = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			if(userRole.equals("QA_MANAGER") || userRole.equals("ROLE_MR")|| userRole.equals("ROLE_HOD")) {
				auditNCReportList = auditNCReportRepo.getAuditNCReportSummary();
			}	 
			return new ResponseEntity<>(auditNCReportList, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}
	public ResponseEntity<?> getIARFromAuditReport(HttpServletRequest http) {
		try {
			List<String> iarNoList = auditNCReportRepo.getIARFromAuditReport();
			return new ResponseEntity<>(iarNoList, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}
	public ResponseEntity<?> getOpenNcrs(HttpServletRequest http) {
		try {
			List<String> ncrNoList = auditNCReportRepo.getOpenNcrs();
			return new ResponseEntity<>(ncrNoList, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}
	//Internal Audit NC Report - End
	public ResponseEntity<?> getInternalAuditSummaryForPrint(HttpServletRequest request, String auditYear,String iarNo)
	{
		try {
			List<String> iarList = Arrays.stream(iarNo.split(","))
										.map(String::trim)
										.collect(Collectors.toList());
			Map<String, List<InternalAuditSummaryDTO>> iarSummaryMap = new HashMap<String, List<InternalAuditSummaryDTO>>();
			for(String iar : iarList)
			{
				ResponseEntity<?> response = getInternalAuditSummary(request,auditYear,iar);
				if(response != null)
				{
					if(response.getBody() instanceof List<?>)
					{
						List<InternalAuditSummaryDTO> auditSummaryListForIar = (List<InternalAuditSummaryDTO>)(response.getBody());
						iarSummaryMap.put(iar, auditSummaryListForIar);
					}
				}
			}
			List<InternalAuditSummaryDTO> internalAuditSummaryList = new ArrayList<InternalAuditSummaryDTO>();
			return new ResponseEntity<>(iarSummaryMap,HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}
	
	// Internal Audit Summary - Start
	public ResponseEntity<?> getInternalAuditSummary(HttpServletRequest request, String auditYear,String iarNo) {
		List<InternalAuditReport> internalAuditReportList = null;
		List<InternalAuditSummaryDTO> internalAuditSummaryList = new ArrayList<InternalAuditSummaryDTO>();
		List<InternalAuditNCReport> internalAuditNCReportList = null; 
		try {
			String userRole = scaUtil.getUserRoleFromRequest(request, tokenProvider);
			if(userRole.equals("QA_MANAGER") || userRole.equals("ROLE_MR")) {
				internalAuditNCReportList = auditNCReportRepo.getAuditNCReportForSummaryReport(auditYear,iarNo);
				Map<String,List<InternalAuditNCReport>> mapGroupedByDepartment =
						internalAuditNCReportList.stream()
							.collect(Collectors.groupingBy(InternalAuditNCReport::getDepartment));
				Map<String,Boolean> ncStatusMap = checkNCClosureForEachDepartment(mapGroupedByDepartment);
				internalAuditReportList = auditReportRepo.getAuditReportForSummaryReport(auditYear, iarNo);
				if(internalAuditReportList != null && internalAuditReportList.size()>0)
				{
					String basedOnStandard = internalAuditReportList.get(0).getStandard();
					for(InternalAuditReport report : internalAuditReportList ) {
						InternalAuditSummaryDTO summary = new InternalAuditSummaryDTO();
						summary.setReportId(report.getReportId());
						summary.setIarNo(report.getIarNo());
						summary.setDepartment(report.getDepartment());
						summary.setObservations(report.getClauseInfoList().size());
						summary.setTotalNcs(report.getTotalNoOfNc());
						summary.setMajorNcs(report.getNoOfMajorNc());
						summary.setMinorNcs(report.getNoOfMinorNc());
						summary.setStandard(basedOnStandard);
						summary.setClauseNos(getClauseNosForAudit(report.getClauseInfoList()));
						summary.setStatusOfNcs(Optional.ofNullable(ncStatusMap.get(report.getDepartment()))
								.map(status -> status ? "Closed" : "Open")
								.orElse("NA"));
						internalAuditSummaryList.add(summary);
					}
				}	
			}else {
				return new ResponseEntity<>("User is not allowed to get the Details", HttpStatus.OK);
			}
			return new ResponseEntity<>(internalAuditSummaryList, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}
	public static String getClauseNosForAudit(List<AuditReportClauseInfo> clauseInfoList)
	{
		return clauseInfoList == null || clauseInfoList.isEmpty() ? "" : 
			clauseInfoList.stream()
				.map(AuditReportClauseInfo::getClauseNo)
				.filter(Objects::nonNull)
				.collect(Collectors.joining(","));
	}	
	public boolean areAllNCsClosedForDepartment(List<InternalAuditNCReport> ncReportsForDepartment) {
	       return ncReportsForDepartment.stream()
	             .allMatch(report -> "Closed".equalsIgnoreCase(report.getNcrIs()));
	}
    public Map<String, Boolean> checkNCClosureForEachDepartment(Map<String,List<InternalAuditNCReport>> mapGroupedByDepartment) {
            return mapGroupedByDepartment.entrySet().stream()
	                .collect(Collectors.toMap(
	                        entry -> entry.getKey(), 
	                        entry -> areAllNCsClosedForDepartment(entry.getValue())
	               ));
	}
    public ResponseEntity<?> getIARForYear(String year) {
		try {
			List<String> iarNoList = auditReportRepo.getIarForYear(year);
			return new ResponseEntity<>(iarNoList, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}
   
    // Internal Audit Summary - End
}


