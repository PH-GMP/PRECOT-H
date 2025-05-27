package com.focusr.Precot.QA.controller;

//*******************************************************//
	// Supplier Audit Plan //
	// Supplier Audit Report //
	// Training Calendar //
	// Training Questionnaire //
//******************************************************//


import java.security.Principal;
import java.time.LocalDate;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.focusr.Precot.QA.model.CorrectiveActionReport;
import com.focusr.Precot.QA.model.DeviationForm;
import com.focusr.Precot.QA.model.InternalAuditDepartment;
import com.focusr.Precot.QA.model.InternalAuditNCReport;
import com.focusr.Precot.QA.model.SupplierAuditPlan;
import com.focusr.Precot.QA.model.SupplierAuditReport;
import com.focusr.Precot.QA.model.TrainingCalendar;
import com.focusr.Precot.QA.model.TrainingQuestionnaire;
import com.focusr.Precot.QA.model.TrainingTopic;
//import com.focusr.Precot.QA.model.SupplierAuditReportPdfDocument;
import com.focusr.Precot.QA.service.QaService5;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.payload.ApproveResponse;

@RestController
@RequestMapping("/api/QA/Service")
public class QaController5 {
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@Autowired
	private QaService5 qaService5;
	
	// ***************************** SUPPLIER AUDIT PLAN - START*********************************************************
	
	@PostMapping("/supplierAuditPlan/saveSupplierAuditPlan")
	public ResponseEntity<?> saveSupplierAuditPlan(HttpServletRequest http, @Valid @RequestBody SupplierAuditPlan auditPlan,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService5.saveSupplierAuditPlan(auditPlan, http);
 
		return response;
	}
	@PostMapping("/supplierAuditPlan/submitSupplierAuditPlan")
	public ResponseEntity<?> submitAuditReport(HttpServletRequest http, @Valid @RequestBody SupplierAuditPlan auditPlan,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService5.submitSupplierAuditPlan(auditPlan, http);
 
		return response;
	}
	@PutMapping("/supplierAuditPlan/approveOrReject")
	public ResponseEntity<?> approveRejectSupplierAuditPlan(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qaService5.approveRejectSupplierAuditPlan(approvalResponse, http);
		return resp;
	}
	@GetMapping("/supplierAuditPlan/getAuditPlanSummary")
    public ResponseEntity<?> getSupplierAuditPlanSummary(HttpServletRequest http) {
        return qaService5.getSupplierAuditPlanSummary(http);
    }
	@GetMapping("/supplierAuditPlan/getSupplierAuditPlan")
    public ResponseEntity<?> getAuditPlanByUniqueParams(@RequestParam Map<String, String> requestParams) {
		
		String financialYear = requestParams.get("financialYear");
		ResponseEntity<?> resp = qaService5.getAuditPlanByUniqueParams(financialYear);
		return resp;
    }
	@GetMapping("/supplierAuditPlan/print")	
	public ResponseEntity<?> getAuditPlanByPrintParams(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String financialYear = requestParams.get("financialYear");
		ResponseEntity<?> resp = qaService5.getAuditPlanByPrintParams(financialYear);
		return resp;
	}
	
	// ***************************** SUPPLIER AUDIT PLAN - END*********************************************************


	// ***************************** SUPPLIER AUDIT REPORT - START*********************************************************
	
	@PostMapping("/supplierAuditReport/saveSupplierAuditReport")
	public ResponseEntity<?> saveSupplierAuditReport(HttpServletRequest http, @Valid @RequestBody SupplierAuditReport auditReport,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService5.saveSupplierAuditReport(auditReport, http);
 
		return response;
	}
	@PostMapping("/supplierAuditReport/submitSupplierAuditReport")
	public ResponseEntity<?> submitSupplierAuditReport(HttpServletRequest http, @Valid @RequestBody SupplierAuditReport auditReport,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService5.submitSupplierAuditReport(auditReport, http);
 
		return response;
	}
	@GetMapping("/supplierAuditReport/getSupplierAuditReportSummary")
    public ResponseEntity<?> getSupplierAuditReportSummary(HttpServletRequest http) {
        return qaService5.getSupplierAuditReportSummary(http);
    }
	@GetMapping("/supplierAuditReport/getSupplierAuditReport")
    public ResponseEntity<?> getAuditReportByUniqueParams(@RequestParam Map<String, String> requestParams) {
		
		String supplierName = requestParams.get("supplierName");
		ResponseEntity<?> resp = qaService5.getAuditReportByUniqueParams(supplierName);
		return resp;
    }
	@GetMapping("/supplierAuditReport/getReportByDateAndSupplier")
    public ResponseEntity<?> getReportByDateAndSupplier(@RequestParam Map<String, String> requestParams) {
		
		String supplierName = requestParams.get("supplierName");
		String  reportDate = requestParams.get("reportDate");
		ResponseEntity<?> resp = qaService5.getReportByDateAndSupplier(supplierName,reportDate);
		return resp;
    }
	@GetMapping("/supplierAuditReport/print")	
	public ResponseEntity<?> getAuditReportByPrintParams(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String supplierName = requestParams.get("supplierName");
		ResponseEntity<?> resp = qaService5.getAuditReportByPrintParams(supplierName);
		return resp;
	}
	@GetMapping("/supplierAuditReport/printByFinancialYear")	
	public ResponseEntity<?> getAuditReportByFinancialYear(@RequestParam String financialYear,
			Principal principal) {
		ResponseEntity<?> resp = qaService5.getAuditReportByFinancialYear(financialYear);
		return resp;
	}
	@GetMapping("/supplierAuditReport/getSubmitDateBySuppliers")
	public ResponseEntity<?> getReportSubmittedDateBySupplier(@RequestParam Map<String, String> requestParams) 
	{
		String supplierName = requestParams.get("supplierName");
		ResponseEntity<?> resp = qaService5.getReportSubmittedDateBySupplier(supplierName);
		return resp;
	}
	@PutMapping("/supplierAuditReport/saveReportPdf")
	public ResponseEntity<?> saveReportPdf(HttpServletRequest request,@RequestPart("file") MultipartFile pdf, @RequestParam String fileName,
			@RequestParam String reportId,Principal principal) {
		ResponseEntity<?> response = qaService5.saveReportPdfInfo(request,fileName,pdf,reportId);
		return response;
	}
	@GetMapping("/supplierAuditReport/getReportPdf")
	public ResponseEntity<?> getReportPdf(@RequestParam Map<String, String> requestParams) 
	{
		String reportId = requestParams.get("reportId");
		ResponseEntity<?> resp = qaService5.getReportPdf(reportId);
		return resp;
	}

// ***************************** SUPPLIER AUDIT REPORT - END*********************************************************

//***************************** Training Calendar - Start **************************************************** //

	@PostMapping("/trainingCalendar/saveTrainingCalendar")
	public ResponseEntity<?> saveTrainingCalendar(HttpServletRequest http, @Valid @RequestBody TrainingCalendar calendar,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService5.saveTrainingCalendar(calendar, http);

		return response;
	}
	@PostMapping("/trainingCalendar/submitTrainingCalendar")
	public ResponseEntity<?> submitTrainingCalendar(HttpServletRequest http, @Valid @RequestBody TrainingCalendar calendar,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService5.submitTrainingCalendar(calendar, http);

		return response;
	}
	@PutMapping("/trainingCalendar/approveOrReject")
	public ResponseEntity<?> approveRejectTrainingCalendar(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qaService5.approveRejectTrainingCalendar(approvalResponse, http);
		return resp;
	}

	@GetMapping("/trainingCalendar/getTrainingCalendarSummary")
	public ResponseEntity<?> getTrainingCalendarSummary(HttpServletRequest http) {
		return qaService5.getTrainingCalendarSummary(http);
	}
	@GetMapping("/trainingCalendar/getTrainingCalendar")
	public ResponseEntity<?> getTrainingCalendarByUniqueParams(@RequestParam Map<String, String> requestParams) {
		
		String year = requestParams.get("year");
		ResponseEntity<?> resp = qaService5.getTrainingCalendarByUniqueParams(year);
		return resp;
	}	
	@GetMapping("/trainingCalendar/print")	
	public ResponseEntity<?> getTrainingCalendarByPrintParams(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String year = requestParams.get("year");
		ResponseEntity<?> resp = qaService5.getTrainingCalendarByPrintParams(year);
		return resp;
	}
//  Training Topics - Start
	@PostMapping("/trainingCalendar/addTrainingTopic")
	public ResponseEntity<?> saveTrainingTopic(HttpServletRequest http, @Valid @RequestBody TrainingTopic topic,
		BindingResult result, Principal principal) {
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qaService5.saveTrainingTopic(topic, http);
			return response;
	}
	@GetMapping("/trainingCalendar/getTrainingTopics")	
	public ResponseEntity<?> getTrainingTopics(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		ResponseEntity<?> resp = qaService5.getTrainingTopics();
		return resp;
	}
	@DeleteMapping("/trainingCalendar/deleteTrainingTopic")
		public ResponseEntity<?> deleteTrainingTopic(@RequestParam Long id) {
	    return qaService5.deleteTrainingTopic(id);
	}
//  Training Topics - End
	
	@DeleteMapping("/trainingCalendar/deleteSessionInfoFromCalendar")
    public ResponseEntity<?> deleteSessionInfoFromCalendar(@RequestParam Long id) {
        return qaService5.deleteSessionInfoFromCalendar(id);
    }
	
	
	// ***************************** Training Calendar - End **************************************************** //
	// ***************************** Training Questionnaire - Start **************************************************** //

		@PostMapping("/trainingQuestionnaire/saveTrainingQuestionnaire")
		public ResponseEntity<?> saveTrainingQuestionnaire(HttpServletRequest http, @Valid @RequestBody TrainingQuestionnaire questionnaire,
				BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qaService5.saveTrainingQuestionnaire(questionnaire, http);

			return response;
		}
		@PostMapping("/trainingQuestionnaire/submitTrainingQuestionnaire")
		public ResponseEntity<?> submitTrainingQuestionnaire(HttpServletRequest http, @Valid @RequestBody TrainingQuestionnaire questionnaire,
				BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qaService5.submitTrainingQuestionnaire(questionnaire, http);

			return response;
		}
		
		@GetMapping("/trainingQuestionnaire/getTrainingQuestionnaireSummary")
		public ResponseEntity<?> getTrainingQuestionnaireSummary(HttpServletRequest http) {
			return qaService5.getTrainingQuestionnaireSummary(http);
		}
		@GetMapping("/trainingQuestionnaire/getTrainingQuestionnaire")
		public ResponseEntity<?> getTrainingQuestionnaireByUniqueParams(@RequestParam Map<String, String> requestParams) {
			
			String trainingSessionNumber = requestParams.get("trainingSessionNumber");
			String traineeIdNumber = requestParams.get("traineeIdNumber");
			ResponseEntity<?> resp = qaService5.getTrainingQuestionnaireByUniqueParams(trainingSessionNumber,traineeIdNumber);
			return resp;
		}	
		@GetMapping("/trainingQuestionnaire/print")	
		public ResponseEntity<?> getTrainingQuestionnaireByPrintParams(@RequestParam Map<String, String> requestParams,
				Principal principal) {
			String year = requestParams.get("year");
			String month = requestParams.get("month");
			String traineeIdNumber = requestParams.get("traineeIdNumber");
			ResponseEntity<?> resp = qaService5.getTrainingQuestionnaireByPrintParams(year,month,traineeIdNumber);
			return resp;
		}
		
	// ***************************** Training Questionnaire - End **************************************************** //
		
		// ***************************** Corrective Action Report - Start **************************************************** //

		@PostMapping("/correctiveActionReport/saveActionReport")
		public ResponseEntity<?> saveActionReport(HttpServletRequest http, @Valid @RequestBody CorrectiveActionReport report,
				BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qaService5.saveActionReport(report, http);

			return response;
		}
		@PostMapping("/correctiveActionReport/submitActionReport")
		public ResponseEntity<?> submitActionReport(HttpServletRequest http, @Valid @RequestBody CorrectiveActionReport report,
				BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qaService5.submitActionReport(report, http);

			return response;
		}
		
		@GetMapping("/correctiveActionReport/getActionReportSummary")
		public ResponseEntity<?> getsaveActionReportSummary(HttpServletRequest http) {
			return qaService5.getCorrectiveActionReportSummary(http);
		}
		@GetMapping("/correctiveActionReport/getActionReport")
		public ResponseEntity<?> getActionReportByUniqueParams(@RequestParam Map<String, String> requestParams) {
			
			String reportDate = requestParams.get("reportDate");
			ResponseEntity<?> resp = qaService5.getCorrectiveActionReportByUniqueParams(reportDate);
			return resp;
		}	
		@GetMapping("/correctiveActionReport/print")	
		public ResponseEntity<?> getActionReportByPrintParams(@RequestParam Map<String, String> requestParams,
				Principal principal) {
			String year = requestParams.get("year");
			String month = requestParams.get("month");
			String reportDate = requestParams.get("reportDate");
			ResponseEntity<?> resp = qaService5.getCorrectiveActionReportByPrintParams(year,month,reportDate);
			return resp;
		}
		@PutMapping("/correctiveActionReport/approveOrReject")
		public ResponseEntity<?> approveRejectCorrectiveActionReport(@Valid @RequestBody ApproveResponse approvalResponse,
				HttpServletRequest http) {

			ResponseEntity<?> resp = qaService5.approveRejectCorrectiveActionReport(approvalResponse, http);
			return resp;
		}
		@DeleteMapping("/correctiveActionReport/deleteActionReportInfo")
	    public ResponseEntity<?> deleteActionReportInfo(@RequestParam Long id) {
	        return qaService5.deleteActionReportInfo(id);
	    }
	// ***************************** Corrective Action Report - End **************************************************** //
		// ***************************** Corrective Action Report - Start **************************************************** //

		@PostMapping("/deviationForm/saveDeviationForm")
		public ResponseEntity<?> saveDeviationForm(HttpServletRequest http, @Valid @RequestBody DeviationForm report,
				BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qaService5.saveDeviationForm(report, http);

			return response;
		}
		@PostMapping("/deviationForm/submitDeviationForm")
		public ResponseEntity<?> submitDeviationForm(HttpServletRequest http, @Valid @RequestBody DeviationForm report,
				BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qaService5.submitDeviationForm(report, http);

			return response;
		}
				
		@GetMapping("/deviationForm/getDeviationFormSummary")
		public ResponseEntity<?> getDeviationFormSummary(HttpServletRequest http) {
			return qaService5.getDeviationFormSummary(http);
		}
		@GetMapping("/deviationForm/getDeviationForm")
		public ResponseEntity<?> getDeviationFormByUniqueParams(@RequestParam Map<String, String> requestParams) {
			
			LocalDate dateOfIniation = LocalDate.parse(requestParams.get("dateOfIniation"));
			String department = requestParams.get("department");
			String deviationNumber = requestParams.get("deviationNumber");
			ResponseEntity<?> resp = qaService5.getDeviationFormByUniqueParams(dateOfIniation,department,deviationNumber);
			return resp;
		}	
		@GetMapping("/deviationForm/print")	
		public ResponseEntity<?> getDeviationByPrintParams(@RequestParam Map<String, String> requestParams,
				Principal principal) {
			String year = requestParams.get("year");
			String month = requestParams.get("month");
			LocalDate dateOfIniation = LocalDate.parse(requestParams.get("dateOfIniation"));
			String deviationNumber = requestParams.get("deviationNumber");
			
			ResponseEntity<?> resp = qaService5.getDeviationFormByPrintParams(year,month,dateOfIniation,deviationNumber);
			return resp;
		}
		@GetMapping("/deviationForm/getDeviationNumberByDepartment")
		public ResponseEntity<?> getDeviationNumberByDepartment(@RequestParam Map<String, String> requestParams) 
		{
			String department = requestParams.get("department");
			ResponseEntity<?> resp = qaService5.getDeviationNumberByDepartment(department);
			return resp;
		}
//		@PutMapping("/correctiveActionReport/approveOrReject")
//		public ResponseEntity<?> approveRejectCorrectiveActionReport(@Valid @RequestBody ApproveResponse approvalResponse,
//				HttpServletRequest http) {
//
//			ResponseEntity<?> resp = qaService5.approveRejectCorrectiveActionReport(approvalResponse, http);
//			return resp;
//		}
			// ***************************** Deviation FORM - End **************************************************** //
}
