package com.focusr.Precot.QA.controller;

import java.security.Principal;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.QA.model.AuditParticipant;
import com.focusr.Precot.QA.model.AuditType;
import com.focusr.Precot.QA.model.InternalAuditDepartment;
import com.focusr.Precot.QA.model.InternalAuditNCReport;
import com.focusr.Precot.QA.model.InternalAuditReport;
import com.focusr.Precot.QA.model.InternalAuditSchedule;
import com.focusr.Precot.QA.service.QaService2;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
//-- Internal Audit Schedule -- //
import com.focusr.Precot.payload.ApproveResponse;

@RestController
@RequestMapping("/api/QA/Service")
public class QaController2 {
		@Autowired
		private MapValidationErrorService mapValidationErrorService;
		
		@Autowired
		private QaService2 qaService2;
		
		// ***************************** INTERNAL AUDIT SCHEDULE *********************************************************
		
		@PostMapping("/internalAuditSchedule/saveAuditSchedule")
		public ResponseEntity<?> saveAuditSchedule(HttpServletRequest http, @Valid @RequestBody InternalAuditSchedule auditShedule,
				BindingResult result, Principal principal) {
	 
			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qaService2.saveAuditSchedule(auditShedule, http);
	 
			return response;
		}
		
		@PostMapping("/internalAuditSchedule/submitAuditSchedule")
		public ResponseEntity<?> SubmitPestController(HttpServletRequest http, @Valid @RequestBody InternalAuditSchedule auditSchedule,
				BindingResult result, Principal principal) {
	 
			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qaService2.submitAuditSchedule(auditSchedule, http);
	 
			return response;
		}
		
		@GetMapping("/internalAuditSchedule/getAuditSchedule")
	    public ResponseEntity<?> getAuditScheduleByUniqueParams(@RequestParam Map<String, String> requestParams) {
			
			String year = requestParams.get("year");
			String month = requestParams.get("month");
			
			ResponseEntity<?> resp = qaService2.getAuditScheduleByUniqueParams(year,month);
			return resp;
	    }
		
		@GetMapping("/internalAuditSchedule/print")	
		public ResponseEntity<?> getInternalAuditScheduleByPrintParams(@RequestParam Map<String, String> requestParams,
				Principal principal) {
			String year = requestParams.get("year");
			String month = requestParams.get("month");
			ResponseEntity<?> resp = qaService2.getAuditScheduleByPrintParams(year,month);
			return resp;
		}
		
		@GetMapping("/internalAuditSchedule/getAuditScheduleSummary")
	    public ResponseEntity<?> getAuditScheduleSummary(HttpServletRequest http) {
	        return qaService2.getAuditScheduleSummary(http);
	    }
		
		@DeleteMapping("/internalAuditSchedule/deleteDepartmentInfoFromSchedule")
	    public ResponseEntity<?> deleteDepartmentFromSchedule(@RequestParam Long id) {
	        return qaService2.deleteDepartmentInfoFromSchedule(id);
	    }
		
		//  AUDIT TYPE - START //
		@PostMapping("/internalAuditSchedule/addAuditType")
		public ResponseEntity<?> saveAuditType(HttpServletRequest http, @Valid @RequestBody AuditType auditType,
						BindingResult result, Principal principal) {
			 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
					return errorMap;
			ResponseEntity<?> response = qaService2.saveAuditType(auditType, http);
			return response;
		}
		
		@GetMapping("/internalAuditSchedule/getAuditTypes")	
		public ResponseEntity<?> getAuditTypes(@RequestParam Map<String, String> requestParams,
				Principal principal) {
			
			ResponseEntity<?> resp = qaService2.getAuditTypes();
			return resp;
		}
		
		@DeleteMapping("/internalAuditSchedule/deleteAuditType")
	    public ResponseEntity<?> deleteAuditType(@RequestParam Long id) {
	        return qaService2.deleteAuditType(id);
	    }
	//  AUDIT TYPE - END //
		
		//  AUDIT DEPARTMENT
		@PostMapping("/internalAuditSchedule/addAuditDepartment")
		public ResponseEntity<?> saveAuditDepartment(HttpServletRequest http, @Valid @RequestBody InternalAuditDepartment auditDepartment,
						BindingResult result, Principal principal) {
				 
			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
						return errorMap;
				ResponseEntity<?> response = qaService2.saveAuditDepartment(auditDepartment, http);
				return response;
		}
			
		@GetMapping("/internalAuditSchedule/getAuditDepartments")	
		public ResponseEntity<?> getAuditDepartments(@RequestParam Map<String, String> requestParams,
				Principal principal) {
			ResponseEntity<?> resp = qaService2.getAuditDepartments();
			return resp;
		}
			
		@DeleteMapping("/internalAuditSchedule/deleteAuditDepartment")
		public ResponseEntity<?> deleteAuditDepartment(@RequestParam Long id) {
		     return qaService2.deleteAuditDepartment(id);
		}
	//  AUDIT PARTICIPANT - START //
		@PostMapping("/internalAuditSchedule/addAuditParticipant")
		public ResponseEntity<?> saveAuditType(HttpServletRequest http, @Valid @RequestBody AuditParticipant auditParticipant,
							BindingResult result, Principal principal) {
				 
			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
						return errorMap;
				ResponseEntity<?> response = qaService2.saveAuditParticipant(auditParticipant, http);
				return response;
		}
		@GetMapping("/internalAuditSchedule/getAuditParticipants")	
		public ResponseEntity<?> getAuditParticipants(@RequestParam Map<String, String> requestParams,
					Principal principal) {
				
			ResponseEntity<?> resp = qaService2.getAuditParticipants();
			return resp;
		}
		@DeleteMapping("/internalAuditSchedule/deleteAuditParticipant")
		public ResponseEntity<?> deleteAuditParticipant(@RequestParam Long id) {
		        return qaService2.deleteAuditParticipant(id);
		}
		//  AUDIT PARTICIPANT - END //
		// ***************************** INTERNAL AUDIT SCHEDULE - END*********************************************************
		
		// ***************************** INTERNAL AUDIT REPORT - START*********************************************************
		
		@PostMapping("/internalAuditReport/saveAuditReport")
		public ResponseEntity<?> saveAuditReport(HttpServletRequest http, @Valid @RequestBody InternalAuditReport auditReport,
				BindingResult result, Principal principal) {
	 
			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qaService2.saveAuditReport(auditReport, http);
	 
			return response;
		}
		@PostMapping("/internalAuditReport/submitAuditReport")
		public ResponseEntity<?> submitAuditReport(HttpServletRequest http, @Valid @RequestBody InternalAuditReport auditReport,
				BindingResult result, Principal principal) {
	 
			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qaService2.submitAuditReport(auditReport, http);
	 
			return response;
		}
		@PutMapping("/internalAuditReport/approveOrReject")
		public ResponseEntity<?> approveRejectAuditReport(@Valid @RequestBody ApproveResponse approvalResponse,
				HttpServletRequest http) {

			ResponseEntity<?> resp = qaService2.approveRejectAuditReport(approvalResponse, http);
			return resp;
		}
		@GetMapping("/internalAuditReport/getAuditReportSummary")
	    public ResponseEntity<?> getAuditReportSummary(HttpServletRequest http) {
	        return qaService2.getAuditReportSummary(http);
	    }
		@GetMapping("/internalAuditReport/getAuditReport")
	    public ResponseEntity<?> getAuditReportByUniqueParams(@RequestParam Map<String, String> requestParams) {
			
			String year = requestParams.get("year");
			String month = requestParams.get("month");
			String department = requestParams.get("department");
			
			ResponseEntity<?> resp = qaService2.getAuditReportByUniqueParams(year,month,department);
			return resp;
	    }
		@GetMapping("/internalAuditReport/print")	
		public ResponseEntity<?> getInternalAuditReportByPrintParams(@RequestParam Map<String, String> requestParams,
				Principal principal) {
			String year = requestParams.get("year");
			String month = requestParams.get("month");
			String department = requestParams.get("department");
			ResponseEntity<?> resp = qaService2.getAuditReportByPrintParams(year,month,department);
			return resp;
		}
		@DeleteMapping("/internalAuditReport/deleteClauseInfoFromReport")
	    public ResponseEntity<?> deleteClauseInfoFromReport(@RequestParam Long id) {
	        return qaService2.deleteClauseInfoFromReport(id);
	    }
		// ***************************** INTERNAL AUDIT REPORT - END*********************************************************
		
	// ***************************** INTERNAL AUDIT NC REPORT - START*********************************************************
		
		@PostMapping("/internalAuditNCReport/saveAuditNCReport")
		public ResponseEntity<?> saveAuditNCReport(HttpServletRequest http, @Valid @RequestBody InternalAuditNCReport auditReport,
				BindingResult result, Principal principal) {
	 
			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qaService2.saveAuditNCReport(auditReport, http);
	 
			return response;
		}
		@PostMapping("/internalAuditNCReport/submitAuditNCReport")
		public ResponseEntity<?> submitAuditReport(HttpServletRequest http, @Valid @RequestBody InternalAuditNCReport auditReport,
				BindingResult result, Principal principal) {
	 
			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qaService2.submitAuditNCReport(auditReport, http);
	 
			return response;
		}
		@PutMapping("/internalAuditNCReport/approveOrReject")
		public ResponseEntity<?> approveRejectAuditNCReport(@Valid @RequestBody ApproveResponse approvalResponse,
				HttpServletRequest http) {

			ResponseEntity<?> resp = qaService2.approveRejectAuditNCReport(approvalResponse, http);
			return resp;
		}
		@GetMapping("/internalAuditNCReport/getAuditNCReportSummary")
	    public ResponseEntity<?> getAuditNCReportSummary(HttpServletRequest http) {
	        return qaService2.getAuditNCReportSummary(http);
	    }
		@GetMapping("/internalAuditNCReport/getAuditNCReport")
	    public ResponseEntity<?> getAuditNCReportByUniqueParams(@RequestParam Map<String, String> requestParams) {
			
			String year = requestParams.get("year");
			String iarNo = requestParams.get("iarNo");
			String department = requestParams.get("department");
			String ncrNo = requestParams.get("ncrNo");
			ResponseEntity<?> resp = qaService2.getAuditNCReportByUniqueParams(year,iarNo,department,ncrNo);
			return resp;
	    }
		@GetMapping("/internalAuditNCReport/print")	
		public ResponseEntity<?> getInternalAuditNCReportByPrintParams(@RequestParam Map<String, String> requestParams,
				Principal principal) {
			String year = requestParams.get("year");
			String iarNo = requestParams.get("iarNo");
			ResponseEntity<?> resp = qaService2.getAuditNCReportByPrintParams(year,iarNo);
			return resp;
		}
		@GetMapping("/internalAuditNCReport/getIARFromAuditReport")	
		public ResponseEntity<?> getIARFromAuditReport(HttpServletRequest http) {
			ResponseEntity<?> resp = qaService2.getIARFromAuditReport(http);
			return resp;
		}
		@GetMapping("/internalAuditNCReport/getOpenNcrs")	
		public ResponseEntity<?> getOpenNcrs(HttpServletRequest http) {
			ResponseEntity<?> resp = qaService2.getOpenNcrs(http);
			return resp;
		}
		// ***************************** INTERNAL AUDIT NC REPORT - END*********************************************************
		
		// Summary Of Internal Audit - Start
		
		@GetMapping("/internalAuditSummary/getInternalAuditSummary")
	    public ResponseEntity<?> getInternalAuditSummary(HttpServletRequest request, @RequestParam Map<String, String> requestParams) {
			String auditYear = requestParams.get("year");
			String iarNo = requestParams.get("iarNo");
	        return qaService2.getInternalAuditSummary(request,auditYear,iarNo);
	    }
		
		@GetMapping("/internalAuditSummary/getInternalAuditSummaryForPrint")
	    public ResponseEntity<?> getInternalAuditSummaryForPrint(HttpServletRequest request, @RequestParam Map<String, String> requestParams) {
			String auditYear = requestParams.get("year");
			String iarNo = requestParams.get("iarNo");
	        return qaService2.getInternalAuditSummaryForPrint(request,auditYear,iarNo);
	    }
		@GetMapping("/internalAuditSummary/getIarForYear")
	    public ResponseEntity<?> getIarForYear(HttpServletRequest request, @RequestParam Map<String, String> requestParams) {
			String auditYear = requestParams.get("year");
	        return qaService2.getIARForYear(auditYear);
	    }
		// Summary Of Internal Audit - End
	}

