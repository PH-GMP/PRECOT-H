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

import com.focusr.Precot.QA.model.ControlOfGHpWc;
import com.focusr.Precot.QA.model.ListOfGHpWc;
import com.focusr.Precot.QA.model.MomMockRecall;
import com.focusr.Precot.QA.model.QaBreakageReport;
import com.focusr.Precot.QA.service.QaService9;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.payload.ApproveResponse;

/**
 * 
 * @author Sivaprakasam.V
 *
 */

/*
 * (GLASS / HARD PLASTIC / WOOD / CERAMIC)-PH-QAD01-F-052
 *
 */

@RestController
@RequestMapping("/api/QA/Service")
public class QaController9 {

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private QaService9 qaservice7;

	@PostMapping("/SaveBreakageReport")
	public ResponseEntity<?> SaveBreakageReport(HttpServletRequest http, @Valid @RequestBody QaBreakageReport details,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaservice7.SaveBreakageReport(details, http);

		return response;
	}

	@PostMapping("/SubmitBreakageReport")
	public ResponseEntity<?> SubmitBreakageReport(HttpServletRequest http, @Valid @RequestBody QaBreakageReport details,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaservice7.SubmitBreakageReport(details, http);

		return response;

	}

	@GetMapping("/BreakageReportsummary")
	public ResponseEntity<?> summary(HttpServletRequest http) {

		ResponseEntity<?> response = qaservice7.summary(http);
		return response;
	}

	@GetMapping("/BreakageReportGetHodummary")
	public ResponseEntity<?> summary(@RequestParam Map<String, String> requestParams, HttpServletRequest http,
			Principal principal) {

		String department = requestParams.get("department");

		ResponseEntity<?> response = qaservice7.GetHodummary(department, http);
		return response;
	}

	@PutMapping("/BreakageReportapproveOrReject")
	public ResponseEntity<?> approveRejectNonConformityReport(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;

		ResponseEntity<?> resp = qaservice7.approveReject(approvalResponse, http);
		return resp;
	}

	@GetMapping("BreakageReportPrint")
	public ResponseEntity<?> TemplatePrint(@RequestParam Map<String, String> requestParams, Principal principal) {

		String month = requestParams.get("month");
		String year = requestParams.get("year");
		String reportNo = requestParams.get("reportNo");
		String date = requestParams.get("date");

		ResponseEntity<?> resp = qaservice7.Print(month, year, reportNo, date);
		return resp;
	}

	@GetMapping("BreakageReportParam")
	public ResponseEntity<?> param(@RequestParam Map<String, String> requestParams, Principal principal) {

		String reportNo = requestParams.get("reportNo");
		String department = requestParams.get("department");

		ResponseEntity<?> resp = qaservice7.param(reportNo, department);
		return resp;
	}

	@GetMapping("/BreakageReportgetAllSeqNo")
	public ResponseEntity<?> getAllSeqNo() {
		ResponseEntity<?> response = qaservice7.getLastSubbatchNo13();
		return response;
	}

	@GetMapping("/BreakageReportgetApproveSeqNo")
	public ResponseEntity<?> getApproveSeqNo() {
		ResponseEntity<?> response = qaservice7.getApproveSeqNo();
		return response;
	}

	@GetMapping("/getAllQADepartmentNames")
	public ResponseEntity<?> getRoleBaseDepartmentNames(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String rollNames = requestParams.get("rollNames");

		ResponseEntity<?> resp = qaservice7.getUsersByDepartment(rollNames);
		return resp;
	}

/////////////////////////////////////////////////////////////////////////////	
//
	@PostMapping("/SaveControlOfGHpWc")
	public ResponseEntity<?> SaveControlOfGHpWc(HttpServletRequest http, @Valid @RequestBody ControlOfGHpWc details,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaservice7.SaveControlOfGHpWc(details, http);

		return response;
	}

	@PostMapping("/SubmitControlOfGHpWc")
	public ResponseEntity<?> SubmitControlOfGHpWc(HttpServletRequest http, @Valid @RequestBody ControlOfGHpWc details,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaservice7.SubmitControlOfGHpWc(details, http);

		return response;
	}

	@GetMapping("/GetSupervisorSummeryControlOfGHpWc")
	public ResponseEntity<?> ControlOfGHpWcGetHodummary(@RequestParam Map<String, String> requestParams,
			HttpServletRequest http, Principal principal) {

		String department = requestParams.get("department");

		ResponseEntity<?> response = qaservice7.ControlOfGHpWcGetHodummary(department, http);
		return response;
	}

	@GetMapping("/GetSupervisorHodControlOfGHpWc")
	public ResponseEntity<?> GetSupervisorHodControlOfGHpWc(@RequestParam Map<String, String> requestParams,
			HttpServletRequest http, Principal principal) {

		String department = requestParams.get("department");

		ResponseEntity<?> response = qaservice7.GetSupervisorHodControlOfGHpWc(department, http);
		return response;
	}

//	@GetMapping("/GetHodummaryControlOfGHpWc")
//	public ResponseEntity<?> GetHodummaryControlOfGHpWc(HttpServletRequest http) {
//
//		ResponseEntity<?> response = qaservice7.GetHodummaryControlOfGHpWc(http);
//
//		return response;
//	}

	@GetMapping("PrintControlOfGHpWc")
	public ResponseEntity<?> PrintControlOfGHpWc(@RequestParam Map<String, String> requestParams, Principal principal) {

		String month = requestParams.get("month");
		String year = requestParams.get("year");
		String department = requestParams.get("department");

		ResponseEntity<?> resp = qaservice7.PrintControlOfGHpWc(month, year, department);
		return resp;
	}

	@PutMapping("/ControlOfGHpWcapproveOrReject")
	public ResponseEntity<?> ControlOfGHpWcapproveOrReject(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;

		ResponseEntity<?> resp = qaservice7.ControlOfGHpWcapproveOrReject(approvalResponse, http);
		return resp;
	}

	@GetMapping("ParamControlOfGHpWc")
	public ResponseEntity<?> ParamControlOfGHpWc(@RequestParam Map<String, String> requestParams, Principal principal) {

		String date = requestParams.get("date");
		String department = requestParams.get("department");

		ResponseEntity<?> resp = qaservice7.ParamControlOfGHpWc(date, department);
		return resp;
	}

	@DeleteMapping("/ControlOfGHpWcdelete")
	public ResponseEntity<?> ControlOfGHpWcdelete(@RequestParam Long id) {
		return qaservice7.ControlOfGHpWcdelete(id);
	}

/////////////////////////////////////////////////////////////////////////////

	@PostMapping("/SaveListOfGHpWc")
	public ResponseEntity<?> SaveListOfGHpWc(HttpServletRequest http, @Valid @RequestBody ListOfGHpWc details,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaservice7.SaveListOfGHpWc(details, http);

		return response;
	}

	@PostMapping("/SubmitListOfGHpWc")
	public ResponseEntity<?> SubmitListOfGHpWc(HttpServletRequest http, @Valid @RequestBody ListOfGHpWc details,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaservice7.SubmitListOfGHpWc(details, http);

		return response;

	}

	@GetMapping("/ListOfGHpWcsummary")
	public ResponseEntity<?> ListOfGHpWcsummary(HttpServletRequest http) {

		ResponseEntity<?> response = qaservice7.ListOfGHpWcsummary(http);
		return response;
	}

	@PutMapping("/ListOfGHpWcapproveOrReject")
	public ResponseEntity<?> ListOfGHpWcapproveOrReject(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;

		ResponseEntity<?> resp = qaservice7.ListOfGHpWcapproveOrReject(approvalResponse, http);
		return resp;
	}

	@GetMapping("ListOfGHpWcPrint")
	public ResponseEntity<?> ListOfGHpWcPrint(@RequestParam Map<String, String> requestParams, Principal principal) {

		String date = requestParams.get("date");
		String month = requestParams.get("month");
		String year = requestParams.get("year");
		String department = requestParams.get("department");

		ResponseEntity<?> resp = qaservice7.ListOfGHpWcPrint(date, month, year, department);
		return resp;
	}

	@GetMapping("ListOfGHpWcParam")
	public ResponseEntity<?> ListOfGHpWcParam(@RequestParam Map<String, String> requestParams, Principal principal) {

		String date = requestParams.get("date");
		String department = requestParams.get("department");

		ResponseEntity<?> resp = qaservice7.ListOfGHpWcParam(date, department);
		return resp;
	}

	@DeleteMapping("/ListOfGHpWcdelete")
	public ResponseEntity<?> ListOfGHpWcdelete(@RequestParam Long id) {
		return qaservice7.ListOfGHpWcdelete(id);
	}

	//

	/// Mom Recall

	@PostMapping("/SaveMomMocRecall")
	public ResponseEntity<?> SaveMomMocRecall(HttpServletRequest http, @Valid @RequestBody MomMockRecall details,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaservice7.SaveMomMocRecall(details, http);

		return response;
	}

	@PostMapping("/SubmitMomMocRecall")
	public ResponseEntity<?> SubmitMomMocRecall(HttpServletRequest http, @Valid @RequestBody MomMockRecall details,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaservice7.SubmitMomMocRecall(details, http);

		return response;
	}

	@PutMapping("/MomMocRecallapproveOrReject")
	public ResponseEntity<?> MomMocRecallapproveOrReject(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;

		ResponseEntity<?> resp = qaservice7.MomMocRecallapproveOrReject(approvalResponse, http);
		return resp;
	}

	@GetMapping("/ListOfMomRecallsummary")
	public ResponseEntity<?> ListOfMomRecallsummary(HttpServletRequest http) {

		ResponseEntity<?> response = qaservice7.ListOfMomRecallsummary(http);
		return response;
	}

	@GetMapping("ListOfMomRecallParam")
	public ResponseEntity<?> ListOfMomRecallParam(@RequestParam Map<String, String> requestParams,
			Principal principal) {

//		String year = requestParams.get("year");
		String date = requestParams.get("date");

		ResponseEntity<?> resp = qaservice7.ListOfMomRecallParam(date);
		return resp;
	}

	@GetMapping("ListOfMomRecallPrint")
	public ResponseEntity<?> ListOfMomRecallPrint(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String year = requestParams.get("year");
		String month = requestParams.get("month");
		String date = requestParams.get("date");

		ResponseEntity<?> resp = qaservice7.ListOfMomRecallPrint(year, month, date);
		return resp;
	}

	@DeleteMapping("/deleteMomRecall")
	public ResponseEntity<?> deleteMomRecall(@RequestParam Long id, String key) {

		return qaservice7.deleteMomRecall(id, key);
	}

}
