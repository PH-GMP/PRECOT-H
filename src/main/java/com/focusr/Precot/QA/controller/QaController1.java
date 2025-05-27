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

import com.focusr.Precot.QA.model.QaChangeControlForm;
import com.focusr.Precot.QA.model.QaCustomerComplaintRegisterForm;
import com.focusr.Precot.QA.model.QaNonConformityReport;
import com.focusr.Precot.QA.model.QaPestController;
import com.focusr.Precot.QA.model.QaPestControllerAreaOfTreatments;
import com.focusr.Precot.QA.model.QaRodentBoxCheckList;
import com.focusr.Precot.QA.model.QaTrainingCard;
import com.focusr.Precot.QA.model.QaTrainingNeedIdentificationForm;
import com.focusr.Precot.QA.model.QaTrainingSessionAllotmentRegister;
import com.focusr.Precot.QA.service.QaService1;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.payload.ApproveResponse;

/*
 * TRAINING CARD
 * PEST CONTROLLER
 * RODENT BOX CHECK LIST
 * CUSTOMER COMPLAINT REGISTER FORM
 * CUSTOMER COMPLAINT REGISTER
 * NON CONFORMITY REPORT
 * CHANGE CONTROL FORM
 * TRAINING SESSION ALLOTMENT REGISTER
 */

@RestController
@RequestMapping("/api/QA/Service")
public class QaController1 {

	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	@Autowired
	private QaService1 qaService1;

	// ***************************************************** PEST CONTROLLER
	// *********************************************************

	@PostMapping("/PestController/SavePestController")
	public ResponseEntity<?> SavePestController(HttpServletRequest http, @Valid @RequestBody QaPestController details,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService1.SavePestController(details, http);

		return response;
	}

	@PostMapping("/PestController/SubmitPestController")
	public ResponseEntity<?> SubmitPestController(HttpServletRequest http, @Valid @RequestBody QaPestController details,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService1.SubmitPestController(details, http);

		return response;
	}

	@PutMapping("/PestController/approveOrReject")
	public ResponseEntity<?> approveRejectPestController(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qaService1.approveRejectPestController(approvalResponse, http);
		return resp;
	}

	@GetMapping("/PestController/getByparam")
	public ResponseEntity<?> getByParamPestController(@RequestParam Map<String, String> requestParams) {

		String format_no = requestParams.get("format_no");
		String month = requestParams.get("month");
		String year = requestParams.get("year");
		String date = requestParams.get("date");

		ResponseEntity<?> resp = qaService1.getByParamPestController(format_no, month, year, date);
		return resp;
	}

	@GetMapping("/PestController/print")
	public ResponseEntity<?> getByPrintPestController(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String format_no = requestParams.get("format_no");
		String month = requestParams.get("month");
		String year = requestParams.get("year");
		String date = requestParams.get("date");

		ResponseEntity<?> resp = qaService1.getByPrintPestController(format_no, month, year, date);
		return resp;
	}

	@GetMapping("/PestController/getPestControllerSummary")
	public ResponseEntity<?> getPestControllerSummary(@RequestParam String format_no, HttpServletRequest http) {
		return qaService1.getPestControllerSummary(format_no, http);
	}

	@DeleteMapping("/PestController/delete")
	public ResponseEntity<?> deletePestControllertreatments(@RequestParam Long id) {
		return qaService1.deletePestControllerTreatments(id);
	}

	// AREA OF TREATMENTS

	@PostMapping("/PestController/addArea")
	public ResponseEntity<?> SaveAreaOfTreatments(HttpServletRequest http,
			@Valid @RequestBody QaPestControllerAreaOfTreatments details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService1.SaveAreaOfTreatments(details, http);

		return response;
	}

	@GetMapping("/PestController/getAreaOfTreatments")
	public ResponseEntity<?> getDetails(@RequestParam Map<String, String> requestParams, Principal principal) {

		String format_no = requestParams.get("format_no");

		ResponseEntity<?> resp = qaService1.getAreaOfTreatments(format_no);
		return resp;
	}

	@DeleteMapping("/PestController/deleteAreaOfTreatments")
	public ResponseEntity<?> deleteAreaOfTreatments(@RequestParam Long id) {
		return qaService1.deleteAreaOfTreatments(id);
	}

	// ***************************************************** RODENT BOX CHECK LIST
	// *********************************************************

	@PostMapping("/RodentBox/SaveRodentBox")
	public ResponseEntity<?> SaveRodentBox(HttpServletRequest http, @Valid @RequestBody QaRodentBoxCheckList details,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService1.SaveRodentBox(details, http);

		return response;
	}

	@PostMapping("/RodentBox/SubmitRodentBox")
	public ResponseEntity<?> SubmitRodentBox(HttpServletRequest http, @Valid @RequestBody QaRodentBoxCheckList details,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService1.SubmitRodentBox(details, http);

		return response;
	}

	@PutMapping("/RodentBox/approveOrReject")
	public ResponseEntity<?> approveRejectRodentBox(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qaService1.approveRejectRodentBox(approvalResponse, http);
		return resp;
	}

	@GetMapping("/RodentBox/getByparam")
	public ResponseEntity<?> getByParamRodentBox(@RequestParam Map<String, String> requestParams) {

		String month = requestParams.get("month");
		String year = requestParams.get("year");
		String date = requestParams.get("date");

		ResponseEntity<?> resp = qaService1.getByParamRodentBox(month, year, date);
		return resp;
	}

	@GetMapping("/RodentBox/print")
	public ResponseEntity<?> getByPrintRodentBox(@RequestParam Map<String, String> requestParams) {

		String month = requestParams.get("month");
		String year = requestParams.get("year");
		String date = requestParams.get("date");

		ResponseEntity<?> resp = qaService1.getByPrintRodentBox(month, year, date);
		return resp;
	}

	@GetMapping("/RodentBox/getRodentBoxSummary")
	public ResponseEntity<?> getRodentBoxSummary(HttpServletRequest http) {
		return qaService1.getRodentBoxSummary(http);
	}

	@DeleteMapping("/RodentBox/delete")
	public ResponseEntity<?> deleteRodentBox(@RequestParam Long id) {
		return qaService1.deleteRodentBoxLine(id);
	}

	// RODENT BOX FIELDS

//	@PostMapping("/RodentBox/addField")
//	public ResponseEntity<?> SaveRodentBoxFields(HttpServletRequest http, @Valid @RequestBody QaRodentBoxFields details,
//			BindingResult result, Principal principal) {
//
//		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
//		if (errorMap != null)
//			return errorMap;
//		ResponseEntity<?> response = qaService1.SaveRodentBoxFields(details, http);
//
//		return response;
//	}
//
//	@GetMapping("/RodentBox/getFields")
//	public ResponseEntity<?> getRodentBoxFields(Principal principal) {
//
//		ResponseEntity<?> resp = qaService1.getRodentBoxFields();
//		return resp;
//	}
//
//	@DeleteMapping("/RodentBox/deleteField")
//	public ResponseEntity<?> deleteRodentBoxFields(@RequestParam Long id) {
//		return qaService1.deleteRodentBoxFields(id);
//	}

	// ***************************************************** CUSTOMER COMPLAINT
	// REGISTER FORM
	// *********************************************************

	@PostMapping("/CustomerComplaintRegisterForm/Save")
	public ResponseEntity<?> SaveCustomerComplaintRegForm(HttpServletRequest http,
			@Valid @RequestBody QaCustomerComplaintRegisterForm details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService1.SaveCustomerComplaintRegForm(details, http);

		return response;
	}

	@PostMapping("/CustomerComplaintRegisterForm/Submit")
	public ResponseEntity<?> SubmitCustomerComplaintRegForm(HttpServletRequest http,
			@Valid @RequestBody QaCustomerComplaintRegisterForm details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService1.SubmitCustomerComplaintRegForm(details, http);

		return response;
	}

	@PutMapping("/CustomerComplaintRegisterForm/approveOrReject")
	public ResponseEntity<?> approveRejectCustomerComplaintRegisterForm(
			@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = qaService1.approveRejectCustomerComplaintRegForm(approvalResponse, http);
		return resp;
	}

	@GetMapping("/CustomerComplaintRegisterForm/getByparam")
	public ResponseEntity<?> getByParamCustomerComplaintRegForm(@RequestParam Map<String, String> requestParams) {

		String ccf_no = requestParams.get("ccf_no");

		ResponseEntity<?> resp = qaService1.getByParamCustomerComplaintRegForm(ccf_no);
		return resp;
	}

	@GetMapping("/CustomerComplaintRegisterForm/print")
	public ResponseEntity<?> getByPrintCustomerComplaintRegForm(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String month = requestParams.get("month");
		String year = requestParams.get("year");
		String department = requestParams.get("department");

		ResponseEntity<?> resp = qaService1.getByPrintCustomerComplaintRegForm(month, year, department);
		return resp;
	}

//	@GetMapping("/CustomerComplaintRegisterForm/getSummary")
//	public ResponseEntity<?> getCustomerComplaintRegFormSummary(@RequestParam Map<String, String> requestParams,
//			HttpServletRequest http) {
//
//		String department = requestParams.get("department");
//
//		return qaService1.getCustomerComplaintRegFormSummary(department, http);
//	}

	@GetMapping("/CustomerComplaintRegisterForm/getSummaryQaManager")
	public ResponseEntity<?> getCustomerComplaintRegFormSummaryQaManager(HttpServletRequest http) {

		return qaService1.getCustomerComplaintRegFormSummaryQaManager(http);
	}

	@GetMapping("/CustomerComplaintRegisterForm/getSummaryHod")
	public ResponseEntity<?> getCustomerComplaintRegFormSummaryHod(@RequestParam Map<String, String> requestParams,
			HttpServletRequest http) {

		String department = requestParams.get("department");

		return qaService1.getCustomerComplaintRegFormSummaryHod(department, http);
	}

	// get for customer complaint register
	@GetMapping("/CustomerComplaintRegisterForm/getForRegister")
	public ResponseEntity<?> getForCustomerComplaintRegister(@RequestParam Map<String, String> requestParams,
			HttpServletRequest http) {

		String month = requestParams.get("month");
		String year = requestParams.get("year");

		ResponseEntity<?> resp = qaService1.getForCustomerComplaintRegister(month, year, http);
		return resp;
	}

	// Trend chart
	@GetMapping("/CustomerComplaintRegisterForm/getComplaintCountsGroupedByMonth")
	public ResponseEntity<?> getComplaintCountsGroupedByMonth(@RequestParam Map<String, String> requestParams) {

		String financialYear = requestParams.get("financialYear");

		return qaService1.getComplaintCountsByMonth(financialYear);
	}

	@GetMapping("/CustomerComplaintRegisterForm/getComplaintCounts")
	public ResponseEntity<?> getComplaintCounts(@RequestParam Map<String, String> requestParams) {

		String financialYear = requestParams.get("financialYear");

		return qaService1.getComplaintCounts(financialYear);
	}

	// Print api
	@GetMapping("/CustomerComplaintRegisterForm/printApiRegister")
	public ResponseEntity<?> getCustomerComplaintRegisterPrint(@RequestParam Map<String, String> requestParams) {

		String financialYear = requestParams.get("financialYear");

		return qaService1.getCustomerComplaintRegisterPrint(financialYear);
	}

	// ccf lov
	@GetMapping("/CustomerComplaintRegisterForm/getCcfLov")
	public ResponseEntity<?> getCcfLov() {
		return qaService1.getCcfLov();
	}

	// ***************************************************** NON CONFORMITY REPORT
	// *********************************************************

	@PostMapping("/NonConformityReport/Save")
	public ResponseEntity<?> saveNonConformityReport(HttpServletRequest http,
			@Valid @RequestBody QaNonConformityReport details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService1.saveNonConformityReport(details, http);

		return response;
	}

	@PutMapping("/NonConformityReport/approveOrReject")
	public ResponseEntity<?> approveRejectNonConformityReport(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qaService1.approveRejectNcReport(approvalResponse, http);
		return resp;
	}

	@GetMapping("/NonConformityReport/getByparam")
	public ResponseEntity<?> getByParamNcrNo(@RequestParam Map<String, String> requestParams) {

		String ncrNo = requestParams.get("ncrNo");

		ResponseEntity<?> resp = qaService1.getNonConformityReportbYNCRnumber(ncrNo);
		return resp;
	}

//	@GetMapping("/NonConformityReport/summary")
//	public ResponseEntity<?> getByParamNcrNo(HttpServletRequest http) {
//		ResponseEntity<?> resp = qaService1.getNcReportSummary(http);
//		return resp;
//	}

	@GetMapping("/NonConformityReport/summary")
	public ResponseEntity<?> getByParamNcrNo(@RequestParam Map<String, String> requestParams, HttpServletRequest http) {

		String department = requestParams.get("department");

		ResponseEntity<?> resp = qaService1.getNcReportSummary(department, http);
		return resp;
	}

	// Print
	@GetMapping("/NonConformityReport/print")
	public ResponseEntity<?> getByPrintNonConformityReport(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String year = requestParams.get("year");
		String ncrNumber = requestParams.get("ncrNumber");

		ResponseEntity<?> resp = qaService1.getNCReportPrint(year, ncrNumber);
		return resp;
	}

	// ncr lov
	@GetMapping("/NonConformityReport/NcrLov")
	public ResponseEntity<?> getNcrLov() {
		return qaService1.getNcrLov();
	}

	// ncr lov print based
	@GetMapping("/NonConformityReport/ncrNumberPrintLov")
	public ResponseEntity<?> ncrNumberPrintLov(@RequestParam Map<String, String> requestParams) {

		String financialYear = requestParams.get("financialYear");

		return qaService1.ncrNumberPrintLov(financialYear);
	}

	// SUMMARY FOR NC LOGBOOK
	@GetMapping("/NonConformityLogBook/getForNCLogbook")
	public ResponseEntity<?> getForNCLogbook(@RequestParam Map<String, String> requestParams, HttpServletRequest http) {

		String year = requestParams.get("year");

		ResponseEntity<?> resp = qaService1.getForNCLogbook(year, http);
		return resp;
	}

	@GetMapping("/NonConformityLogBook/getNCLogbookPrint")
	public ResponseEntity<?> getNCLogbookPrint(@RequestParam Map<String, String> requestParams, Principal principal) {

		String financialYear = requestParams.get("financialYear");

		ResponseEntity<?> resp = qaService1.getNCLogbookPrint(financialYear);
		return resp;
	}

	@GetMapping("/NonConformityLogBook/trendChart")
	public ResponseEntity<?> trendChartApi(@RequestParam Map<String, String> requestParams, Principal principal) {

		String financialYear = requestParams.get("financialYear");

		ResponseEntity<?> resp = qaService1.trendChartApi(financialYear);
		return resp;
	}

	@GetMapping("/bleachingBmrLov")
	public ResponseEntity<?> bleachingBmrLov() {
		return qaService1.bleachingBmrLov();
	}

	// ***************************************************** CHANGE CONTROL FORM
	// *********************************************************

	@PostMapping("/ChangeControlForm/SaveSubmit")
	public ResponseEntity<?> SaveSubmitChangeControlForm(HttpServletRequest http,
			@Valid @RequestBody QaChangeControlForm details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService1.SaveSubmitChangeControlForm(details, http);

		return response;
	}

	@GetMapping("/ChangeControlForm/getByParam")
	public ResponseEntity<?> getByParamChangeControlForm(@RequestParam Map<String, String> requestParams) {

		String date = requestParams.get("date");
		String changeControlTo = requestParams.get("changeControlTo");

		ResponseEntity<?> resp = qaService1.getByParamChangeControlForm(date, changeControlTo);
		return resp;
	}

	@GetMapping("/ChangeControlForm/HodSummary")
	public ResponseEntity<?> changeControlFormSummaryHod(HttpServletRequest http) {

		ResponseEntity<?> resp = qaService1.getChangeControlHodSummary(http);
		return resp;
	}

	@GetMapping("/ChangeControlForm/QaSummary")
	public ResponseEntity<?> changeControlFormSummaryQa(HttpServletRequest http) {

		ResponseEntity<?> resp = qaService1.getChangeControlQASummary(http);
		return resp;
	}

	@GetMapping("/ChangeControlForm/print")
	public ResponseEntity<?> getChangeControlPrint(@RequestParam Map<String, String> requestParams) {

		String month = requestParams.get("month");
		String year = requestParams.get("year");
		String department = requestParams.get("department");
		String changeControlNumber = requestParams.get("changeControlNumber");

		ResponseEntity<?> resp = qaService1.getChangeControlPrint(month, year, department, changeControlNumber);
		return resp;
	}

	@GetMapping("/ChangeControlForm/changeControlNumberLov")
	public ResponseEntity<?> changeControlNumberLov() {
		return qaService1.changeControlNumberLov();
	}

	@DeleteMapping("/ChangeControlForm/delete")
	public ResponseEntity<?> deleteChangeControlLine(@RequestParam Long id) {
		return qaService1.deleteChangeControlLine(id);
	}

	// ***************************************************** TRAINING SESSION
	// ALLOTMENT REGISTER
	// *********************************************************

	@PostMapping("/TrainingSessionAllotmentRegister/Save")
	public ResponseEntity<?> SaveTrainingSessionRegister(HttpServletRequest http,
			@Valid @RequestBody QaTrainingSessionAllotmentRegister details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService1.SaveTrainingSessionRegister(details, http);

		return response;
	}

	@PostMapping("/TrainingSessionAllotmentRegister/Submit")
	public ResponseEntity<?> SubmitTrainingSessionRegister(HttpServletRequest http,
			@Valid @RequestBody QaTrainingSessionAllotmentRegister details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService1.SubmitTrainingSessionRegister(details, http);

		return response;
	}

	@GetMapping("/TrainingSessionAllotmentRegister/getByParam")
	public ResponseEntity<?> getByParamTrainingSessionRegister(@RequestParam Map<String, String> requestParams) {

		String date = requestParams.get("date");
		String department = requestParams.get("department");

		ResponseEntity<?> resp = qaService1.getByParamTrainingSessionRegister(date, department);
		return resp;
	}

	@GetMapping("/TrainingSessionAllotmentRegister/Print")
	public ResponseEntity<?> getTrainingSessionRegisterPrint(@RequestParam Map<String, String> requestParams) {

		String month = requestParams.get("month");
		String year = requestParams.get("year");
		String department = requestParams.get("department");

		ResponseEntity<?> resp = qaService1.getTrainingSessionRegisterPrint(month, year, department);
		return resp;
	}

	@GetMapping("/TrainingSessionAllotmentRegister/Summary")
	public ResponseEntity<?> getTrainingSessionRegisterSummary(@RequestParam Map<String, String> requestParams,
			HttpServletRequest http) {

		String department = requestParams.get("department");

		ResponseEntity<?> resp = qaService1.getTrainingSessionRegisterSummary(department, http);
		return resp;
	}

	@DeleteMapping("/TrainingSessionAllotmentRegister/delete")
	public ResponseEntity<?> deleteTrainingSessionRegisterLine(@RequestParam Long id) {
		return qaService1.deleteTrainingSessionRegisterLine(id);
	}

	// ***************************************************** TRAINING NEED
	// IDENTIFICATION FORM
	// *********************************************************

	@PostMapping("/TrainingNeedIdentificationForm/Save")
	public ResponseEntity<?> SaveTrainingNeedIdentificationForm(HttpServletRequest http,
			@Valid @RequestBody QaTrainingNeedIdentificationForm details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService1.SaveTrainingNeedIdentificationForm(details, http);

		return response;
	}

	@PostMapping("/TrainingNeedIdentificationForm/Submit")
	public ResponseEntity<?> SubmitTrainingNeedIdentificationForm(HttpServletRequest http,
			@Valid @RequestBody QaTrainingNeedIdentificationForm details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService1.SubmitTrainingNeedIdentificationForm(details, http);

		return response;
	}

	@GetMapping("/TrainingNeedIdentificationForm/getByParam")
	public ResponseEntity<?> getByParamTrainingNeedIdentificationForm(@RequestParam Map<String, String> requestParams) {

		String year = requestParams.get("year");
		String department = requestParams.get("department");

		ResponseEntity<?> resp = qaService1.getByParamTrainingNeedIdentificationForm(year, department);
		return resp;
	}

	@GetMapping("/TrainingNeedIdentificationForm/print")
	public ResponseEntity<?> getTrainingNeedIdentificationFormPrint(@RequestParam Map<String, String> requestParams) {

		String year = requestParams.get("year");

		ResponseEntity<?> resp = qaService1.getTrainingNeedIdentificationFormPrint(year);
		return resp;
	}

	@GetMapping("/TrainingNeedIdentificationForm/HodSummary")
	public ResponseEntity<?> getTrainingNeedIdentificationFormSummaryHod(
			@RequestParam Map<String, String> requestParams, HttpServletRequest http) {

		String department = requestParams.get("department");

		ResponseEntity<?> resp = qaService1.getTrainingNeedIdentificationFormSummaryHod(department, http);
		return resp;
	}

	@GetMapping("/TrainingNeedIdentificationForm/QaManagerSummary")
	public ResponseEntity<?> getTrainingNeedIdentificationFormSummaryQaManager(HttpServletRequest http) {

		ResponseEntity<?> resp = qaService1.getTrainingNeedIdentificationFormSummaryQaManager(http);
		return resp;
	}

	@PutMapping("/TrainingNeedIdentificationForm/approveOrReject")
	public ResponseEntity<?> approveRejectTrainingNeedIdentificationForm(
			@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = qaService1.approveRejectTrainingNeedIdentificationForm(approvalResponse, http);
		return resp;
	}

	@DeleteMapping("/TrainingNeedIdentificationForm/delete")
	public ResponseEntity<?> deleteTrainingNeedIdentificationFormLine(@RequestParam Long id) {
		return qaService1.deleteTrainingNeedIdentificationFormLine(id);
	}

	// ***************************************************** TRAINING CARD
	// *********************************************************

	@PostMapping("/TrainingCard/Save")
	public ResponseEntity<?> SaveTrainingCard(HttpServletRequest http, @Valid @RequestBody QaTrainingCard details,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService1.SaveTrainingCard(details, http);

		return response;
	}

	@PostMapping("/TrainingCard/Submit")
	public ResponseEntity<?> SubmitTrainingCard(HttpServletRequest http,
			@Valid @RequestBody QaTrainingCard details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService1.SubmitTrainingCard(details, http);

		return response;
	}

	@GetMapping("/TrainingCard/getByParam")
	public ResponseEntity<?> getByParamTrainingCard(@RequestParam Map<String, String> requestParams) {
		
		String employeeNo = requestParams.get("employeeNo");
		String department = requestParams.get("department");
		
		return qaService1.getByParamTrainingCard(employeeNo,department);
	}

	@GetMapping("/TrainingCard/Print")
	public ResponseEntity<?> findByEmpPrintApi(@RequestParam Map<String, String> requestParams, Principal principal) {

		String month = requestParams.get("month");
		String year = requestParams.get("year");
		String employeeNo = requestParams.get("employeeNo");
		String department = requestParams.get("department");

		ResponseEntity<?> resp = qaService1.trainingCardPrint(month,year,employeeNo,department);
		return resp;
	}

	@GetMapping("/TrainingCard/Summary")
	public ResponseEntity<?> getTrainingCardSummary(@RequestParam Map<String, String> requestParams,HttpServletRequest http) {
		
		String department = requestParams.get("department");
		
		return qaService1.getTrainingCardSummary(department,http);
	}
	
	@GetMapping("/TrainingCard/trainingSessionNoLov")
	public ResponseEntity<?> trainingSessionNumberLov(@RequestParam Map<String, String> requestParams) {
		
		String department = requestParams.get("department");
		
		return qaService1.trainingSessionNumberLov(department);
	}
	
	@DeleteMapping("/TrainingCard/delete")
	public ResponseEntity<?> deleteTrainingCardLine(@RequestParam Long id) {
		return qaService1.deleteTrainingCardLine(id);
	}
	
	@GetMapping("/TrainingCard/GetTrainerName")
	public ResponseEntity<?> GetTrainerName(@RequestParam Map<String, String> requestParams) {
		
		String trainingSessionNo = requestParams.get("trainingSessionNo");
		
		return qaService1.GetTrainerName(trainingSessionNo);
	}
}
