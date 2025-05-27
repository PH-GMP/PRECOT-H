package com.focusr.Precot.mssql.database.controller.Store;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.model.Store.EyeWashConditionChecklistF009;
import com.focusr.Precot.mssql.database.model.Store.ForkliftMovementCheckListF008;
import com.focusr.Precot.mssql.database.model.Store.MaterialInwardRegister;
import com.focusr.Precot.mssql.database.model.Store.NonReturnableGatePassF006;
import com.focusr.Precot.mssql.database.model.Store.ReceptionCheckListF003;
import com.focusr.Precot.mssql.database.service.Store.StoreService9;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;

@RestController
@RequestMapping("/api/Store")
public class StoreController9 {

	@Autowired
	private StoreService9 storeService;

	@GetMapping("/Invoice")
	public ResponseEntity<List<String>> getInvoiceNumbers() {
		List<String> invoiceNumbers = storeService.getAllUniqueInvoiceNumbers();
		return ResponseEntity.ok(invoiceNumbers);
	}

	@GetMapping("/invoice/descriptions")
	public ResponseEntity<List<String>> getDescriptionsByInvoiceNo(@RequestParam("invoiceNo") String invoiceNo) {

		List<String> descriptions = storeService.getDescriptionsByInvoiceNo(invoiceNo);
		return ResponseEntity.ok(descriptions);
	}

	@GetMapping("/gatepassNo")
	public ResponseEntity<List<String>> getAllGatePassNos() {
		List<String> gatePassNos = storeService.getAllGatePassNos();
		return ResponseEntity.ok(gatePassNos);
	}

	@PostMapping("/ReceptionChecklist/Save")
	public ResponseEntity<?> saveReceptionChecklist(HttpServletRequest http,
			@Valid @RequestBody ReceptionCheckListF003 ReceptionCheckList, BindingResult result, Principal principal) {

		ResponseEntity<?> response = storeService.saveReceptionChecklist(ReceptionCheckList, http);
		return response;

	}

	@PostMapping("/ReceptionChecklist/Submit")
	public ResponseEntity<?> submitHandSanitization(HttpServletRequest http,
			@Valid @RequestBody ReceptionCheckListF003 ReceptionCheckList, BindingResult result, Principal principal) {

		ResponseEntity<?> response = storeService.submitReceptionChecklist(ReceptionCheckList, http);
		return response;

	}

	@PutMapping("/ReceptionChecklist/approveOrReject")
	public ResponseEntity<?> approveOrRejectF41(@Valid @RequestBody ApproveResponse approveResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = storeService.approveRejectReceptionChecklist(approveResponse, http);
		return resp;
	}

	@GetMapping("/getReceptionChecklistSummary")
	public ResponseEntity<?> getReceptionCheckListSummary() {

		ResponseEntity<?> resp = storeService.getReceptionCheckListSummary();
		return resp;
	}

//	 @GetMapping("/getReceptionChecklistPrint")
//	 public ResponseEntity<?> getReceptionCheckListSummaryPrint(@RequestParam Map<String, String> requestParams,
//	         Principal principal) {
//
//	     String year = requestParams.get("year");
//	     String month = requestParams.get("month");
//	     String date = requestParams.get("date");
//
//	     ResponseEntity<?> resp = storeService.getReceptionCheckListSummaryPrint(year, month, date);
//	     return resp;
//	 }

	@GetMapping("/getReceptionChecklistPrint")
	public ResponseEntity<?> getReceptionCheckListSummaryPrint(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String year = requestParams.get("year");
		String month = requestParams.get("month");
		String invoice = requestParams.get("invoice");
		String fromDate = requestParams.get("fromDate");
		String toDate = requestParams.get("toDate");

		ResponseEntity<?> resp = storeService.getReceptionCheckListSummaryPrint(year, month, invoice, fromDate, toDate);
		return resp;
	}

	@GetMapping("/getReceptionCheckListByInvoiceAndDescription")
	public ResponseEntity<?> getReceptionCheckListByInvoiceAndDescription(@RequestParam("invoiceNo") String invoiceNo,
			@RequestParam("description") String description) {
		return storeService.getReceptionCheckListByInvoiceAndDescription(invoiceNo, description);
	}

//	 @GetMapping("/lastGatePassNo")
//	    public ResponseEntity<String> getLastGatePassNo() {
//	        String lastGatePassNo = storeService.getLastGatePassNumber();
//	        return ResponseEntity.ok(lastGatePassNo);
//	    }

	@GetMapping("/lastGatePassNo")
	public ResponseEntity<?> gatePassGenerationController() {
		ResponseEntity<?> resp = storeService.generateGatePassNumber();
		return resp;
	}

	@PostMapping("/Gatepass/Save")
	public ResponseEntity<?> saveGatePass(HttpServletRequest http,
			@Valid @RequestBody NonReturnableGatePassF006 NonReturnableGatePass, BindingResult result,
			Principal principal) {

		ResponseEntity<?> response = storeService.saveNonReturnableGatePass(NonReturnableGatePass, http);
		return response;

	}

	@PostMapping("/Gatepass/Submit")
	public ResponseEntity<?> submitGatePass(HttpServletRequest http,
			@Valid @RequestBody NonReturnableGatePassF006 NonReturnableGatePass, BindingResult result,
			Principal principal) {

		ResponseEntity<?> response = storeService.submitNonReturnableGatePass(NonReturnableGatePass, http);
		return response;

	}

	@PostMapping("/Gatepass/approveOrReject")
	public ResponseEntity<?> approveOrRejectGatePass(@Valid @RequestBody ApproveResponse approveResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = storeService.approveRejectGatePass(approveResponse, http);
		return resp;
	}

	@GetMapping("/getGatepassSummary")
	public ResponseEntity<?> getGatePassSummary() {

		ResponseEntity<?> resp = storeService.getGatePassSummary();
		return resp;
	}

	@GetMapping("/getGatePass")
	public ResponseEntity<?> getGatePass(@RequestParam("gatePassNo") String gatePassNo) {

		return storeService.getGatePassByid(gatePassNo);
	}

//		 @GetMapping("/getGatePassPrint")
//		 public ResponseEntity<?> getGatePassSummaryPrint(@RequestParam Map<String, String> requestParams, Principal principal) {
//		     String year = requestParams.get("year");
//		     String month = requestParams.get("month");
//		     String date = requestParams.get("date");
//
//		     ResponseEntity<?> resp = storeService.getGatePassSummaryPrint(year, month, date);
//		     return resp;
//		 }

	@GetMapping("/getGatePassPrint")
	public ResponseEntity<?> getGatePassSummaryPrint(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String year = requestParams.get("year");
		String month = requestParams.get("month");
		String fromDate = requestParams.get("fromDate");
		String toDate = requestParams.get("toDate");

		ResponseEntity<?> resp = storeService.getGatePassSummaryPrint(year, month, fromDate, toDate);
		return resp;
	}

	@PostMapping("/ForkliftCheckList/Save")
	public ResponseEntity<?> saveForkliftCheckLisT(HttpServletRequest http,
			@Valid @RequestBody ForkliftMovementCheckListF008 SaveForkliftCheckList, BindingResult result,
			Principal principal) {

		ResponseEntity<?> response = storeService.SaveForkliftCheckList(SaveForkliftCheckList, http);
		return response;

	}

	@PostMapping("/ForkliftCheckList/Submit")
	public ResponseEntity<?> submitForkliftCheckLisT(HttpServletRequest http,
			@Valid @RequestBody ForkliftMovementCheckListF008 SubmitForkliftCheckList, BindingResult result,
			Principal principal) {

		ResponseEntity<?> response = storeService.SubmitForkliftCheckList(SubmitForkliftCheckList, http);
		return response;

	}

	@PutMapping("/ForkliftCheckList/approveOrReject")
	public ResponseEntity<?> approveOrRejectForkliftCheckLisT(@Valid @RequestBody ApproveResponse approveResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = storeService.approveRejectForkliftCheckList(approveResponse, http);
		return resp;
	}

//			@GetMapping("/ForkliftCheckListPrint")
//			 public ResponseEntity<?> getForkliftCheckListPrint(@RequestParam Map<String, String> requestParams, Principal principal) {
//			     String year = requestParams.get("year");
//			     String month = requestParams.get("month");
//			     String date = requestParams.get("date");
//
//			     ResponseEntity<?> resp = storeService.getForkliftCheckListPrint(year, month, date);
//			     return resp;
//			 }

//			CR
//			 @GetMapping("/ForkliftCheckListPrint")
//			 public ResponseEntity<?> getForkliftCheckListPrint(@RequestParam Map<String, String> requestParams, Principal principal) {
//			     String year = requestParams.get("year");
//			     String month = requestParams.get("month");
//			     String fromDate = requestParams.get("fromDate");
//			     String toDate = requestParams.get("toDate");
//
//			     ResponseEntity<?> resp = storeService.getForkliftCheckListPrint(year, month, fromDate, toDate);
//			     return resp;
//			 }

	@GetMapping("/ForkliftCheckListPrint")
	public ResponseEntity<?> getForkliftCheckListPrint(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String year = requestParams.get("year");
		String month = requestParams.get("month");
		String fromDate = requestParams.get("fromDate");
		String toDate = requestParams.get("toDate");
		String forkliftNo = requestParams.get("forkliftNo");

		try {
			// Call the service with the provided parameters
			ResponseEntity<?> response = storeService.getForkliftCheckListPrint(year, month, forkliftNo, fromDate,
					toDate);
			return response;
		} catch (Exception ex) {
			String msg = ex.getMessage();
			return new ResponseEntity<>(new ApiResponse(false, "Failed to fetch forklift checklist: " + msg),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getForkliftCheckListSummary")
	public ResponseEntity<?> getForkliftCheckListSummary() {

		ResponseEntity<?> resp = storeService.getForkliftCheckListSummary();
		return resp;
	}

	@GetMapping("/getForkliftCheckList")
	public ResponseEntity<?> getForkliftCheckList(@RequestParam("date") String date,
			@RequestParam("forkliftNo") String forkliftNo) {
		return storeService.getForkliftCheckListByDateAndForkliftNo(date, forkliftNo);
	}

	@PostMapping("/EyeWashConditionChecklist/Save")
	public ResponseEntity<?> saveEyeWashConditionChecklist(HttpServletRequest http,
			@Valid @RequestBody EyeWashConditionChecklistF009 saveEyeWashConditionChecklist, BindingResult result,
			Principal principal) {

		ResponseEntity<?> response = storeService.saveEyeWashConditionChecklist(saveEyeWashConditionChecklist, http);
		return response;

	}

	@PostMapping("/EyeWashConditionChecklist/Submit")
	public ResponseEntity<?> submitEyeWashConditionChecklist(HttpServletRequest http,
			@Valid @RequestBody EyeWashConditionChecklistF009 SubmitEyeWashConditionChecklist, BindingResult result,
			Principal principal) {

		ResponseEntity<?> response = storeService.SubmitEyeWashConditionChecklist(SubmitEyeWashConditionChecklist,
				http);
		return response;

	}

	@PutMapping("/EyeWashConditionChecklist/approveOrReject")
	public ResponseEntity<?> approveOrRejectEyeWashConditionChecklist(
			@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = storeService.approveRejectEyeWashChecklist(approveResponse, http);
		return resp;
	}

//			 @GetMapping("/EyeWashConditionChecklistPrint")
//			 public ResponseEntity<?> getEyeWashConditionChecklistPrint(@RequestParam Map<String, String> requestParams, Principal principal) {
//			     String year = requestParams.get("year");
//			     String month = requestParams.get("month");
//			     String date = requestParams.get("date");
//
//			     ResponseEntity<?> resp = storeService.getEyeWashConditionChecklistPrint(year, month, date);
//			     return resp;
//			 }

//			 cR

	@GetMapping("/EyeWashConditionChecklistPrint")
	public ResponseEntity<?> getEyeWashConditionChecklistPrint(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String year = requestParams.get("year");
		String month = requestParams.get("month");
		String fromDate = requestParams.get("fromDate");
		String toDate = requestParams.get("toDate");

		ResponseEntity<?> resp = storeService.getEyeWashConditionChecklistPrint(year, month, fromDate, toDate);
		return resp;
	}

	@GetMapping("/getEyeWashChecklistSummary")
	public ResponseEntity<?> getEyeWashChecklistSummary() {

		ResponseEntity<?> resp = storeService.getEyeWashChecklistSummary();
		return resp;
	}

	@GetMapping("/getEyeWashChecklistCheckList")
	public ResponseEntity<?> getEyeWashChecklistCheckList(@RequestParam("date") String date) {
		return storeService.getEyeWashChecklistCheckList(date);
	}

	// 23-12-2024

	@PostMapping("/MetarialInwards/Save")
	public ResponseEntity<?> saveMetarialInwards(HttpServletRequest http,
			@Valid @RequestBody MaterialInwardRegister MaterialInward, BindingResult result, Principal principal) {

		ResponseEntity<?> response = storeService.saveMetarialInwards(MaterialInward, http);
		return response;

	}

	@PostMapping("/MetarialInwards/Submit")
	public ResponseEntity<?> SubmitMetarialInwards(HttpServletRequest http,
			@Valid @RequestBody MaterialInwardRegister MaterialInward, BindingResult result, Principal principal) {

		ResponseEntity<?> response = storeService.submitMetarialInwards(MaterialInward, http);
		return response;

	}

	@GetMapping("/getMetarialInwardsSummary")
	public ResponseEntity<?> getMetarialInwardsSummary() {

		ResponseEntity<?> resp = storeService.getMetarialInwardsSummary();
		return resp;
	}

	@GetMapping("/getMetarialInwards")
	public ResponseEntity<?> getMetarialInwards(@RequestParam("date") String date) {
		return storeService.getMetarialInwards(date);
	}

	@GetMapping("/getMetarialInwardsPrint")
	public ResponseEntity<?> getMetarialInwardsPrint(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String year = requestParams.get("year");
		String month = requestParams.get("month");
		String fromDate = requestParams.get("fromDate");
		String toDate = requestParams.get("toDate");

		ResponseEntity<?> resp = storeService.getMetarialInwardsPrint(year, month, fromDate, toDate);
		return resp;
	}

}
