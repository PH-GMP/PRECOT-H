package com.focusr.Precot.QA.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.focusr.Precot.QA.model.BmrIssueRegisterF045;
import com.focusr.Precot.QA.model.DistributionAndDestructionRecordF003;
import com.focusr.Precot.QA.model.FinalInspectionReportF037;
import com.focusr.Precot.QA.model.ProductDispositionLogBookF049;
import com.focusr.Precot.QA.model.QaContainerInspectionReport;
import com.focusr.Precot.QA.model.QaOnlineInspectionReport;
import com.focusr.Precot.QA.model.QaQualityReviewMeetings;
import com.focusr.Precot.QA.model.RequestAndIssunceOfDocumentF002;
import com.focusr.Precot.QA.service.QaService4;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.payload.ApproveResponseContainerInspection;

@RestController
@RequestMapping("/api/QA/Service")
public class QaController4 {
	Logger log = LoggerFactory.getLogger(QaController4.class);

	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	@Autowired
	private QaService4 qaService4;

	// MachineLov

	@GetMapping("/api/machineLov")
	public ResponseEntity<?> getBagDetailsLogBook(@RequestParam String department){
		try {
			return qaService4.getMachineNameLov(department);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); // You can replace this with a proper logging statement

			String msg = e.getMessage();
			log.error("Error fetching Machine Name by department " + department + ": " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "An error occurred: " + msg),
					HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}

	// BMR LOV

	@GetMapping("/api/bmrLov")
	public ResponseEntity<?> getBmrByDepartment(@RequestParam String department) {
		try {
			return qaService4.getBmrLov(department);
		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("Error fetching BMR by department " + department + ": " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "An error occurred: " + msg),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// POrder LOV

	@GetMapping("/api/pOderLov")
	public ResponseEntity<?> getOrderNoByDepartmentAndBmr(@RequestParam String department,
			@RequestParam String batchNo) {
		try {
			return qaService4.getOrderNoByDepartmentAndBmr(department, batchNo);
		} catch (Exception ex) {
			// TODO: handle exception
			String msg = ex.getMessage();
			log.error("Error fetching BMR by department " + department + ": " + msg + batchNo + ": ");
			return new ResponseEntity<>(new ApiResponse(false, "An error occurred: " + msg),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	// PONO And Material

//	@GetMapping("/api/poNoAndMaterial")
//	public ResponseEntity<?> getPoNoMaterial(@RequestParam String pOrder) {
//	try{
//	    return qaService4.getPoNoMaterial(pOrder);
//	}catch (Exception ex) {
//		// TODO: handle exception
//		String msg = ex.getMessage();
//        log.error("Error fetching POrdder And Material by Porder " + pOrder + ": " );
//        return new ResponseEntity<>(new ApiResponse(false, "An error occurred: " + msg), HttpStatus.INTERNAL_SERVER_ERROR);
//	}

//}

	@GetMapping("/api/poNoAndMaterial")
	public ResponseEntity<?> getPoNoMaterial(@RequestParam String pOrder) {
		try {
			// Delegate the call to the service and return its result
			Map<String, String> records = qaService4.getPoNoMaterial(pOrder);
			return new ResponseEntity<>(records, HttpStatus.OK);
		} catch (Exception ex) {
			// Log the error and return an appropriate error response
			String msg = ex.getMessage();
			log.error("Error fetching POrder And Material by POrder " + pOrder + ": " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "An error occurred: " + msg),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// CustomerNameANdProductDescription
	@GetMapping("/api/CustomerNameANdProductDesc")
	public ResponseEntity<?> getCustomerNameAndProductDesc(@RequestParam String material) {
		try {
			// Call the service to get the records
			Map<String, String> records = qaService4.getCustomerNameANdProductDesc(material);
			return new ResponseEntity<>(records, HttpStatus.OK);
		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("Error fetching CustomerName and ProductDesc by Material: " + material, ex);
			return new ResponseEntity<>(new ApiResponse(false, "An error occurred: " + msg),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

//	SAVE

	@PostMapping("/api/saveOnlineInspectionReport")
	public ResponseEntity<?> saveOnlineInspectionReportF034(HttpServletRequest http,
			@Valid @RequestBody QaOnlineInspectionReport details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService4.saveInspection34(details, http);

		return response;
	}

	// Submit

	@PostMapping("/api/SubmitReport")
	public ResponseEntity<?> submitOnlineInspectionReportF034(HttpServletRequest http,
			@Valid @RequestBody QaOnlineInspectionReport details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService4.SubmitOnlineInspectionF034(details, http);

		return response;
	}

	// Approve or Reject

	@PutMapping("/api/approveOrReject")
	public ResponseEntity<?> ApproveOrRejectQaOnlineInspectionReportF035(
			@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = qaService4.approveRejectionOnlineInspectionReportF034(approvalResponse, http);
		return resp;
	}

	// Param Based Get

//	@GetMapping("/api/findByDateShidtMachineNoPordeBmr")
//	public ResponseEntity<?> findByDateShiftF025(@RequestParam String date, @RequestParam String shift,
//			@RequestParam String machineNo, @RequestParam String pOrder, @RequestParam String bmrNo, @RequestParam String formatNo) {
//		return qaService4.getByDateShiftMachineNoBmrPOrder(date, shift, machineNo, pOrder, bmrNo,formatNo);
//	}
//06-11-2024	
	@GetMapping("/api/findByDateShidtMachineNoPordeBmr")
	public ResponseEntity<?> findByDateShiftF025(@RequestParam String date, @RequestParam String shift,
			@RequestParam String machineNo, @RequestParam String pOrder, @RequestParam String bmrNo, @RequestParam String formatNo) {
		return qaService4.getByDateShiftMachineNoBmrPOrder(date, shift, machineNo, pOrder, bmrNo,formatNo);
	}
//	
//	Summary

//	@GetMapping("/api/getOnlineInspectionReportSummary")
//	public ResponseEntity<?> getDailyRollConsumptionSummaryF002(HttpServletRequest http, @RequestParam Map<String, String> requestParams, Principal principal) {
//	    String department = requestParams.get("department");
//	    return qaService4.getOnlineInspectionReportF034Summary(http, department);
//	}
//	

	@GetMapping("/api/getOnlineInspectionReportSummary")
	public ResponseEntity<?> getOnlineInspectionReportSummary(HttpServletRequest http,
			@RequestParam Map<String, String> requestParams, Principal principal) {
		String department = requestParams.get("department");

		String formatNo = requestParams.get("formatNo");

		log.info("Department from request parameters: " + department); // Log the department

		return qaService4.getOnlineInspectionReportF034Summary(http, department, formatNo);
	}

	// PRINT API

	@GetMapping("/api/getOnlineInspectionReportPrint")
	public ResponseEntity<?> getOnlineInspectionReportPrintF034(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		String machineNo = requestParams.get("machineNo");
		String pOrder = requestParams.get("pOrder");
		String bmrNo = requestParams.get("bmrNo");
		String formatNo = requestParams.get("formatNo");

		ResponseEntity<?> resp = qaService4.getByOnlineInspectionReportPrint(date, shift, machineNo, pOrder, bmrNo,
				formatNo);
		return resp;
	}

	@GetMapping("/api/departmentsLov")
	public List<String> getDepartments() {
		return qaService4.getDepartments();
	}

//	======================================= CONTAINER INSPECTION REPORT F039 ===============================================

//	SAVE

	@PostMapping("/api/saveContainerInspectionReport")
	public ResponseEntity<?> saveContainerInspectionReport(HttpServletRequest http,
			@Valid @RequestBody QaContainerInspectionReport details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService4.saveContainerOnlineException(details, http);

		return response;
	}

	// Submit

	@PostMapping("/api/SubmitContainerInspectionReport")
	public ResponseEntity<?> submitContainerInspectionReport(HttpServletRequest http,
			@Valid @RequestBody QaContainerInspectionReport details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService4.SubmitContainerInspectionReport(details, http);

		return response;
	}

	// Approve or Reject

	@PutMapping("/api/approveOrRejectContainerInspectionReport")
	public ResponseEntity<?> ApproveOrRejectContainerInspectionReport(
			@Valid @RequestBody ApproveResponseContainerInspection approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = qaService4.approveRejectionContainerInspectionReport(approvalResponse, http);
		return resp;
	}

	// PARAM BASED GET

	@GetMapping("/api/findByDateCirNoContainerInspectionReport")
	public ResponseEntity<?> findByDateCirNo(@RequestParam String date, @RequestParam String cirNo) {
		return qaService4.getByDateCirNo(date, cirNo);
	}

	// SUMMARY BASED GET

	@GetMapping("/api/getContainerInspectionReportSummary")
	public ResponseEntity<?> getContainerInspectionReportSummary(HttpServletRequest http, Principal principal) {

		return qaService4.getContainerInspectionReportSummary(http);
	}

	// PRINT API

	@GetMapping("/api/getContainerInspectionReportPrint")
	public ResponseEntity<?> getContainerInspectionReportPrintF039(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String date = requestParams.get("date");
		String cirNo = requestParams.get("cirNo");

		ResponseEntity<?> resp = qaService4.getByContainerInspectionReportPrint(date, cirNo);
		return resp;
	}

//		//BMR BASED DEPARTMENET
//		
//		@GetMapping("/api/closingBmr")
//	    public ResponseEntity<List<Object[]> getClosingBmr(@RequestParam("department") String department) {
//	        List<String> result = qaService4.getClosingBmrByDepartment(department);
//	        return ResponseEntity.ok(result);
//	    }

//		/ API to get closing BMR based on department
	@GetMapping("/closingBmr")
	public ResponseEntity<List<Object[]>> getClosingBmr(@RequestParam("department") String department) {
		List<Object[]> result = qaService4.getClosingBmrByDepartment(department);
		return ResponseEntity.ok(result);
	}

//	    APPROVED CIRNO

	@GetMapping("/api/getContainerInspectionReportCirLov")
	public ResponseEntity<List<Map<String, String>>> getApprovedCirNo(HttpServletRequest http, Principal principal) {
		// Get the key-value pairs from the service
		List<Map<String, String>> approvedCirKeyValueList = qaService4.getApprovedCir(http);
		// Return the key-value list wrapped in a ResponseEntity
		return ResponseEntity.ok(approvedCirKeyValueList);
	}

//	    ============================================= REQUEST DOCUMET OF ISSUNCE===============================================

//		SAVE

	@PostMapping("/api/saveRequestDocumentOfIssunce")
	public ResponseEntity<?> saveRequestDocumentOfIssunce(HttpServletRequest http,
			@Valid @RequestBody RequestAndIssunceOfDocumentF002 details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService4.saveRequestAndIssunceOfDocumnet(details, http);

		return response;
	}

	// Submit

	@PostMapping("/api/SubmitRequestDocumentOfIssunce")
	public ResponseEntity<?> submitRequestDocumentOfIssunce(HttpServletRequest http,
			@Valid @RequestBody RequestAndIssunceOfDocumentF002 details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService4.submitRequestAndIssunceOfDocument(details, http);

		return response;
	}

	// approve or reject
	@PutMapping("/api/approveOrRejectRequestAndIssunceOfDocument")
	public ResponseEntity<?> approveRejectionSharpTools(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qaService4.approveRejectRequestAndIssunceOfDocuments(approvalResponse, http);
		return resp;
	}

//		PARAM BASED GET

	@GetMapping("/api/findByDateRequestAndIssunceOfDocument")
	public ResponseEntity<?> findByDateRequestDocumentOfIssunce(@RequestParam String date, @RequestParam String month,
			@RequestParam String year) {
		return qaService4.getByDateRequestDocumentOfIssunce(date, month, year);
	}

	// SUMMARY BASED GET

	@GetMapping("/api/getRequestAndIssunceOfDocumentSummary")
	public ResponseEntity<?> getRequestDocumentOfIssunceSummary(HttpServletRequest http, Principal principal) {

		return qaService4.getRequestAndIssunceOfDocument(http);
	}
//			
//			
	// PRINT API

	@GetMapping("/api/getRequestAndIssunceOfDocumentPrint")
	public ResponseEntity<?> getRequestDocumentOfIssuncePrintF002(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String department=requestParams.get("department");
		String date = requestParams.get("date");
		String month = requestParams.get("month");
		String year = requestParams.get("year");

		ResponseEntity<?> resp = qaService4.getByRequestDocumentOfIssuncePrint(department,date, month, year);
		return resp;
	}

//			===================================== DISTRIBUTION AND DESTRUCTION RECORD ========================================

//			PARAM BASED GET

	@GetMapping("/api/getAllFromRequestAndIssunceOfDocumentApprovedData")
	public ResponseEntity<?> getAllApprovedDataFromRequesItAndIssunceOfDocument() {
		return qaService4.getAllFromRequestAndIssunceOfDocument();
	}

//			SAVE

	@PostMapping("/api/saveDistributionAndDistructionRecord")
	public ResponseEntity<?> saveDistributionAndDistructionRecord(HttpServletRequest http,
			@Valid @RequestBody DistributionAndDestructionRecordF003 details, BindingResult result,
			Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService4.saveDistributionAndDesctruction(details, http);

		return response;
	}

	// Submit

	@PostMapping("/api/SubmitDistributionAndDistructionRecord")
	public ResponseEntity<?> submitDistributionAndDistructionRecord(HttpServletRequest http,
			@Valid @RequestBody DistributionAndDestructionRecordF003 details, BindingResult result,
			Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService4.submitDistributionAndDestruction(details, http);

		return response;
	}

//			PARAM BASED GET

	@GetMapping("/api/findByDistributionAndDestruction")
	public ResponseEntity<?> findByDateDistributionAndDestruction(@RequestParam String date, @RequestParam String month,
			@RequestParam String year) {
		return qaService4.getByDateDistributionAndDistructionRecord(date, month, year);
	}

	// SUMMARY BASED GET

	@GetMapping("/api/getDistributionAndDestructionSummary")
	public ResponseEntity<?> getDistributionAndDestructionSummary(HttpServletRequest http, Principal principal) {

		return qaService4.getDistributionAndDistructionRecordSummary(http);
	}
//				
//				
	// PRINT API

	@GetMapping("/api/getDistributionAndDestructionPrint")
	public ResponseEntity<?> getDistributionAndDestructionPrintF002(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String date = requestParams.get("date");
		String month = requestParams.get("month");
		String year = requestParams.get("year");

		ResponseEntity<?> resp = qaService4.getByDistributionAndDistructionRecordPrint(date, month, year);
		return resp;
	}

// =============================================== FINAL INSPECTION REPORT ====================================================

	@GetMapping("/api/getAllBatchNumbers/finalInspectionReport")
	public ResponseEntity<?> getAllBatchNumbers() {
		List<String> batchNumbers = qaService4.getAllBatchNumbersFinalInspectionReport();
		return new ResponseEntity<>(batchNumbers, HttpStatus.OK);
	}

	@GetMapping("/api/findOrderNoByBmr/finalInspectionReport")
	public ResponseEntity<?> findOrderNoByBmr(@RequestParam("batchNo") String batchNo) {
		try {
			List<String> orderNumbers = qaService4.findOrderNoByBmr(batchNo);

			if (orderNumbers == null || orderNumbers.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(false, "No order numbers found for the given batchNo"),
						HttpStatus.NOT_FOUND);
			}

			return new ResponseEntity<>(orderNumbers, HttpStatus.OK);
		} catch (Exception e) {
			// Log the error message and stack trace
			log.error("Error occurred while processing the request for batchNo: " + batchNo, e);

			return new ResponseEntity<>(new ApiResponse(false, "An error occurred while fetching order numbers"),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/api/poNoAndMaterial/finalInspectionReport")
	public ResponseEntity<?> getPoNoMaterialFinalInspectionreport(@RequestParam String pOrder) {
		try {
			// Delegate the call to the service and return its result
			List<Map<String, Object>> records = qaService4.getPoNoMaterialFinalInspectionReportt(pOrder);
			return new ResponseEntity<>(records, HttpStatus.OK);
		} catch (Exception ex) {
			// Log the error and return an appropriate error response
			String msg = ex.getMessage();
			log.error("Error fetching POrder And Material by POrder " + pOrder + ": " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "An error occurred: " + msg),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// CustomerNameANdProductDescription
	@GetMapping("/api/CustomerNameANdProductDesc/finalInspectionReport")
	public ResponseEntity<?> getCustomerNameAndProductDescFinalInspectionReport(@RequestParam String material) {
		try {
			// Call the service to get the records
			Map<String, String> records = qaService4.getCustomerNameANdProductDescFinalInspectionReport(material);
			return new ResponseEntity<>(records, HttpStatus.OK);
		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("Error fetching CustomerName and ProductDesc by Material: " + material, ex);
			return new ResponseEntity<>(new ApiResponse(false, "An error occurred: " + msg),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

//				SAVE

	@PostMapping("/api/saveFinalInspectionReport")
	public ResponseEntity<?> saveFinalInspectionReportF037(HttpServletRequest http,
			@Valid @RequestBody FinalInspectionReportF037 details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService4.saveFinalInspectionReportF037(details, http);

		return response;
	}

	// Submit

	@PostMapping("/api/SubmitFinalInspectionReport")
	public ResponseEntity<?> submitFinalInspectionReportF037(HttpServletRequest http,
			@Valid @RequestBody FinalInspectionReportF037 details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService4.SubmitFinalInspectionReportF037(details, http);

		return response;
	}

	// Approve or Reject

	@PutMapping("/api/approveOrRejectFinalInspectionReport")
	public ResponseEntity<?> ApproveOrRejectFinalInspectionReportF037(
			@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = qaService4.approveRejectFinalInspectionReport(approvalResponse, http);
		return resp;
	}

//				PARAM BASED GET

	@GetMapping("/api/findByParamFinalInspectionReport")
	public ResponseEntity<?> findByParamFinalInspectionReport(@RequestParam String date, @RequestParam String shift,
			@RequestParam String pOrder, @RequestParam String formatNo, @RequestParam String bmrNo, HttpServletRequest http) {
		return qaService4.getByParamFinalInspectionRecord(date, shift, pOrder, bmrNo, formatNo,http);
	}

//PRINT API

	@GetMapping("/api/getFinalInspectionReportPrint")
	public ResponseEntity<?> getFinalInspectionReportPrintF002(@RequestParam Map<String, String> requestParams,
			Principal principal, HttpServletRequest http) {

		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		String bmrNo = requestParams.get("bmrNo");
		String pOrder = requestParams.get("pOrder");
		String formatNo = requestParams.get("formatNo");
		
		ResponseEntity<?> resp = qaService4.getByFinalInspectionReportPrint(date, shift, bmrNo, pOrder, formatNo,http);
		return resp;
	}

//	SUMMARY

	@GetMapping("/api/getFinalInspectionReportSummary")
	public ResponseEntity<?> getFinalInspectionReportSummary(@RequestParam Map<String, String> requestParams,HttpServletRequest http, Principal principal) {

		String formatNo = requestParams.get("formatNo");
		
		return qaService4.getFinalInspectionReportSummary(formatNo, http);
	}

// =============================================== PRODUCT DISPOSITION LOG BOOK ====================================================

//				SAVE

	@PostMapping("/api/saveProductDispositionLogBook")
	public ResponseEntity<?> saveProductDispositionLogBookF049(HttpServletRequest http,
			@Valid @RequestBody ProductDispositionLogBookF049 details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService4.saveProductDispositionLogBook(details, http);

		return response;
	}

	// Submit

	@PostMapping("/api/SubmitProductDispositionLogBook")
	public ResponseEntity<?> submitProductDispositionLogBookF049(HttpServletRequest http,
			@Valid @RequestBody ProductDispositionLogBookF049 details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService4.submitProductDispostionLogBook(details, http);

		return response;
	}

	// Approve or Reject

	@PutMapping("/api/approveOrRejectProductDispositionLogBook")
	public ResponseEntity<?> ApproveOrRejectProductDispositionLogBookF049(
			@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = qaService4.approveRejectProductDispositionLogBook(approvalResponse, http);
		return resp;
	}

//				PARAM BASED GET

	@GetMapping("/api/findByParamProductDispositionLogBook")
	public ResponseEntity<?> findByParamProductDispositionLogBookF049(@RequestParam String date) {
		return qaService4.getByParamProductDispositionRecord(date);
	}

//PRINT API

	@GetMapping("/api/getProductDispositionLogBookPrint")
	public ResponseEntity<?> getProductDispositionLogBookPrintF049(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String date = requestParams.get("date");
		String month = requestParams.get("month");
		String year = requestParams.get("year");

		ResponseEntity<?> resp = qaService4.getByProductDispositionLogBookPrint(date, month, year);
		return resp;
	}

//	SUMMARY

	@GetMapping("/api/getProductDispositionLogBookSummary")
	public ResponseEntity<?> getProductDispositionLogBookSummary(HttpServletRequest http, Principal principal) {

		return qaService4.getProductDispositionLogBookSummary(http);
	}

//				DELETE

	@DeleteMapping("/api/deleteProductDispositionLogBook")
	public ResponseEntity<?> deleteProductDispositionLogBook(@RequestParam Long id) {
		ResponseEntity<?> records = qaService4.deleteProductDispositionLines(id);
		return records;
	}

// =========================================== BMR ISSUE REGISTER F045 ==================================================

//				SAVE

	@PostMapping("/api/saveBmrIssueRegister")
	public ResponseEntity<?> saveBmrIssueRegisterF045(HttpServletRequest http,
			@Valid @RequestBody BmrIssueRegisterF045 details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService4.saveBmrIssueRegister(details, http);

		return response;
	}

	// Submit

	@PostMapping("/api/SubmitBmrIssueRegister")
	public ResponseEntity<?> submitBmrIssueRegisterF045(HttpServletRequest http,
			@Valid @RequestBody BmrIssueRegisterF045 details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService4.submitBmrIssueRegister(details, http);

		return response;
	}

	// Approve or Reject

	@PutMapping("/api/approveOrRejectBmrIssueRegister")
	public ResponseEntity<?> ApproveOrRejectBmrIssueRegisterF045(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qaService4.approveRejectBmrIssueRegister(approvalResponse, http);
		return resp;
	}

//				PARAM BASED GET

	@GetMapping("/api/findByParamBmrIssueRegister")
	public ResponseEntity<?> findByParamBmrIssueRegisterF045(@RequestParam String date,
			@RequestParam String department) {
		return qaService4.getByParamBmrIssueRegister(date, department);
	}

//PRINT API

	@GetMapping("/api/getBmrIssueRegisterPrint")
	public ResponseEntity<?> getBmrIssueRegisterF045(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String date = requestParams.get("date");
		String month = requestParams.get("month");
		String year = requestParams.get("year");
		String department = requestParams.get("department");

		ResponseEntity<?> resp = qaService4.getByBmrIssueRegisterPrint(date, month, year, department);
		return resp;
	}

//	SUMMARY

	@GetMapping("/api/getBmrIssueRegisterSummary")
	public ResponseEntity<?> getBmrIssueRegisterSummary(HttpServletRequest http, Principal principal) {

		return qaService4.getBmrIssueRegisterSummary(http);
	}

//				DELETE

	@DeleteMapping("/api/deleteBmrIssueRegister")
	public ResponseEntity<?> deleteBmrIssueRegisterF045(@RequestParam Long id) {
		ResponseEntity<?> records = qaService4.deleteBmrIssueRegisterLines(id);
		return records;
	}
	
	// =========================================== QUALITY REVIEW MEETINGS ==================================================
	 
//		SAVE
	 
		@PostMapping("/api/saveQualityReviewMeetings")
		public ResponseEntity<?> saveQualityReviewMeetings(HttpServletRequest http,
				@Valid @RequestBody QaQualityReviewMeetings details, BindingResult result, Principal principal) {
	 
			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qaService4.saveQualityReviewMeeting(details, http);
	 
			return response;
		}
	 
	// Submit
	 
		@PostMapping("/api/SubmitQualityReviewMeetings")
		public ResponseEntity<?> submitQualityReviewMeetings(HttpServletRequest http,
				@Valid @RequestBody QaQualityReviewMeetings details, BindingResult result, Principal principal) {
	 
			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qaService4.submitQualityReviewMeetings(details, http);
	 
			return response;
		}
	 
	// Approve or Reject
	 
		@PutMapping("/api/approveOrRejectQualityReviewMeetings")
		public ResponseEntity<?> ApproveOrRejectQualityReviewMeetings(@Valid @RequestBody ApproveResponse approvalResponse,
				HttpServletRequest http) {
	 
			ResponseEntity<?> resp = qaService4.approveOrRejectQualityReviewMeeting(approvalResponse, http);
			return resp;
		}
	 
//		PARAM BASED GET
	 
		@GetMapping("/api/findByParamQualityReviewMeetings")
		public ResponseEntity<?> findByParamQualityReviewMeetings(@RequestParam String date)
		{
			return qaService4.getByParamQaQualityReviewMeetings(date);
		}
	 
	//PRINT API
	 
		@GetMapping("/api/getQualityReviewMeetingsPrint")
		public ResponseEntity<?> getQualityReviewMeetingsPrint(@RequestParam Map<String, String> requestParams,
				Principal principal) {
	 
			String date = requestParams.get("date");
			String month = requestParams.get("month");
			String year = requestParams.get("year");
//			String department = requestParams.get("department");
	 
			ResponseEntity<?> resp = qaService4.getByQualityReviewMeetingsPrint(date, month, year);
			return resp;
		}
	 
	//SUMMARY
	 
		@GetMapping("/api/getQualityReviewMeetingsSummary")
		public ResponseEntity<?> getBmrQualityReviewMeetingsSummary(HttpServletRequest http, Principal principal) {
	 
			return qaService4.getQaQualityReviewMeetingsSummary(http);
		}
	 
//		DELETE
	 
		@DeleteMapping("/api/deleteQualityReviewMeetingAttendanceSheet")
		public ResponseEntity<?> deleteQualityReviewMeetingAttendanceSheet(@RequestParam Long id) {
			ResponseEntity<?> records = qaService4.deleteQualityReviewMeetingsAttendanceSheet(id);
			return records;
		}
		
//		DELETE
	 
		@DeleteMapping("/api/deleteQualityReviewMeetingDiscussion")
		public ResponseEntity<?> deleteQualityReviewMeetingDiscussion(@RequestParam Long id) {
			ResponseEntity<?> records = qaService4.deleteQualityReviewMeetingsDiscussion(id);
			return records;
		}
		
		

}
