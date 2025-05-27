package com.focusr.Precot.Buds.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.Buds.model.bmr.BudsBmrEnclosureListHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrEquipmentAnnexureHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrManufacturerStepsHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrPackingMaterialHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrPostProductionReview;
import com.focusr.Precot.Buds.model.bmr.BudsBmrProcessDeviationRecordHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrProductRelease;
import com.focusr.Precot.Buds.model.bmr.BudsBmrProductionDetails;
import com.focusr.Precot.Buds.model.bmr.BudsBmrQualityReleaseHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrQualityReleaseLine;
import com.focusr.Precot.Buds.model.bmr.BudsBmrRework;
import com.focusr.Precot.Buds.model.bmr.BudsBmrStoppageHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrVerificationOfRecordsHeader;
import com.focusr.Precot.Buds.service.BudsBmrSummaryService;
import com.focusr.Precot.mssql.database.model.drygoods.BMR03GoodsPackingMeterialIssue;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrManufacturingSteps;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrProcessDeviationRecordHeader;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrProductionDetails;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrQualityReleaseLine;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrStoppageHeader;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.SCAUtil;

/**
 * @author Mr. Jawahar 
 */

@RestController
@RequestMapping("/api/buds/bmr")
public class BudsBmrSummaryController {

	@Autowired
	private BudsBmrSummaryService bmrSummaryService;
	
		/**
		 * POST PRODUCTION REVIEW
		 */
	
	@PostMapping("/submitPostProductionReview")
	public ResponseEntity<?> submitPostProductionReview(@Valid @RequestBody BudsBmrPostProductionReview postProductionReview, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bmrSummaryService.submitPostProductionReview(postProductionReview, http);
		return resp;
		
	}
	
	@GetMapping("/getPostProductionReview")
	public ResponseEntity<?> getPostProductionReviewByBatchNumber(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String batchNo = requestParams.get("batchNo");
		
		ResponseEntity<?> resp = bmrSummaryService.getPostProductionReviewByBatchNo(batchNo);
		return resp;
		
	}
	
	
		/**
		 * PRODUCT RELASE
		 */
	
	@PostMapping("/submitProductRelease")
	public ResponseEntity<?> submitProductRelease(@Valid @RequestBody BudsBmrProductRelease productRelease, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bmrSummaryService.submitProductRelease(productRelease, http);
		return resp;
	}
	
	
	@GetMapping("/getProductRelease")
	public ResponseEntity<?> getProductReleaseByBatchNo(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String batchNo = requestParams.get("batchNo");
		
		ResponseEntity<?> resp = bmrSummaryService.getProductReleaseByBatchNo(batchNo);
		return resp;
		
	}
	
	
	/**
	 * VERIFICATION OF RECORDS
	 */
	
	@PostMapping("/saveVerificationRecords")
	public ResponseEntity<?> saveVerificationOfRecords(
			@Valid @RequestBody BudsBmrVerificationOfRecordsHeader verificationRecords, HttpServletRequest http) {
		ResponseEntity<?> resp = bmrSummaryService.saveVerificationOfRecords(verificationRecords, http);
		return resp;
	}

	@PostMapping("/submitVerificationRecords")
	public ResponseEntity<?> submitVerificationOfRecords(
			@Valid @RequestBody BudsBmrVerificationOfRecordsHeader verificationRecords, HttpServletRequest http) {
		ResponseEntity<?> resp = bmrSummaryService.submitVerificationRecords(verificationRecords, http);
		return resp;
	}

	@GetMapping("/getVerificationRecords")
	public ResponseEntity<?> getVerificationOfRecords(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String batchNo = requestParams.get("batchNo");

		ResponseEntity<?> resp = bmrSummaryService.getVerificationOfRecords(batchNo);
		return resp;

	}
	
	
	/**
	 * MANUFACTURER STEPS 
	 */
	
	@PostMapping("/saveManufacturerSteps")
	public ResponseEntity<?> saveMaufacturerSteps(@Valid @RequestBody BudsBmrManufacturerStepsHeader manufacturerSteps,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrSummaryService.saveManufacturerSteps(manufacturerSteps, http);
		return resp;

	}

	@PostMapping("/submitManufacturerSteps")
	public ResponseEntity<?> submitMaufacturerSteps(@Valid @RequestBody BudsBmrManufacturerStepsHeader manufacturerSteps,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrSummaryService.submitManufacturerSteps(manufacturerSteps, http);
		return resp;

	}

	@GetMapping("/getManufacturerStepsByBatch")
	public ResponseEntity<?> getManufacturerByBatchNo(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String batchNo = requestParams.get("batchNo");

		ResponseEntity<?> resp = bmrSummaryService.getManufacturerStepsByOrder(batchNo);
		return resp;
	}
	
	/**
	 * EQUIPMENT ANNEXURE DETAILS 
	 */
	
	
	@PostMapping("/saveEquipmentDetails")
	public ResponseEntity<?> saveEquipmentDetails(@Valid @RequestBody BudsBmrEquipmentAnnexureHeader equipmentDetails,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrSummaryService.saveEquipmentAnnexure(equipmentDetails, http);
		return resp;

	}

	@PostMapping("/submitEquipmentDetails")
	public ResponseEntity<?> submitEquipmentDetails(@Valid @RequestBody BudsBmrEquipmentAnnexureHeader equipmentDetails,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrSummaryService.submitEquipmentAnnexureDetails(equipmentDetails, http);
		return resp;

	}

	@GetMapping("/getEquipmentDetailsByBatch")
	public ResponseEntity<?> getEquipmentDetailsByBatchNo(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String batchNo = requestParams.get("batchNo");

		ResponseEntity<?> resp = bmrSummaryService.getEquipmentAnnexureDeatilsByBatchNumber(batchNo);
		return resp;
	}
	
	
	/**
	 * PRODUCTION DETAILS
	 */
	
	@GetMapping("/fetchProductionDetails")
	public ResponseEntity<?> fetchProductionDetailsSAP() {
		ResponseEntity<?> resp = bmrSummaryService.getProductionDetailsLoV();
		return resp;
	}
	
	
	@GetMapping("/getProductionDetails")
	public ResponseEntity<?> getproductionDetailsbybatch(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String batchNo = requestParams.get("batchNo");
		String orderNo = requestParams.get("orderNo");
		String fromDate = requestParams.get("fromDate");
		String toDate = requestParams.get("toDate");
		
		ResponseEntity<?> resp = bmrSummaryService.getProductionDetailsByOrder(batchNo, orderNo, fromDate, toDate);
		return resp;
		
	}
	
	@PostMapping("/saveProductionDetails")
	public ResponseEntity<?> saveProductionDetails(@Valid @RequestBody BudsBmrProductionDetails productionDetails,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrSummaryService.saveProductionDetails(productionDetails, http);
		return resp;
	}

	@PostMapping("/submitProductionDetails")
	public ResponseEntity<?> submitProductionDetails(@Valid @RequestBody BudsBmrProductionDetails productionDetails,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrSummaryService.submitProductionDetails(productionDetails, http);
		return resp;
	}
	
	@GetMapping("/getOrderByBatchNumber")
	public ResponseEntity<?> getOrderNumberByBatchNumber(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String batchNumber = requestParams.get("batchNumber");
		
		ResponseEntity<?> resp = bmrSummaryService.getOrderNoByBatchNo(batchNumber);
		return resp;
	}
	
	@GetMapping("/getSubmittedProductionDetails")
	public ResponseEntity<?> getProductionDetailsByBatchNumber(@RequestParam Map<String, String> requestParams,
			Principal principal) {
	
		String batchNumber = requestParams.get("batchNumber");
		
		ResponseEntity<?> resp = bmrSummaryService.getSubmittedProductionDetaillsByBatchNumber(batchNumber);
		return resp;
		
	}
	
	
	/**
	 * ENCLOSURE LIST
	 */
	
	@PostMapping("/saveEnclosureList")
	public ResponseEntity<?> saveEnclosureList(@Valid @RequestBody BudsBmrEnclosureListHeader enclosureList, HttpServletRequest http) {
		ResponseEntity<?> resp = bmrSummaryService.saveEnclosureList(enclosureList, http);
		return resp;
	}
	
	@GetMapping("/enclosureListByBatch")
	public ResponseEntity<?> getEnclosureListByBatchNo(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String batchNumber = requestParams.get("batchNumber");
		
		ResponseEntity<?> resp = bmrSummaryService.getEnclosureListOrder(batchNumber);
		return resp;
		
	}
	
	
	/**
	 * QUALITY RELEASE
	 */
	
	@PostMapping("/saveQualityRelease")
	public ResponseEntity<?> saveQualityRelease(@Valid @RequestBody BudsBmrQualityReleaseHeader qualityRelease, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bmrSummaryService.saveQualityRelease(qualityRelease, http);
		return resp;
	}
	
	@PostMapping("/submitQualityRelease")
	public ResponseEntity<?> submitQualityRelease(@Valid @RequestBody BudsBmrQualityReleaseHeader qualityRelease, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bmrSummaryService.submitQualityRelease(qualityRelease, http);
		return resp;
	}
	
	@GetMapping("/getQualityRelease")
	public ResponseEntity<?> getQualityReleaseByBatchNo(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String batchNumber = requestParams.get("batchNumber");
		
		ResponseEntity<?> resp = bmrSummaryService.getQualityReleaseByBatchNo(batchNumber);
		return resp;
	}
	
	/**
	 * PROCESS DEVIATION 
	 */
	
	@PostMapping("/saveProcessDeviation")
	public ResponseEntity<?> saveProcessDeviationRecord(
			@Valid @RequestBody BudsBmrProcessDeviationRecordHeader deviationRecord, HttpServletRequest http) {

		ResponseEntity<?> resp = bmrSummaryService.saveProcessDeviationRecordHeader(deviationRecord, http);
		return resp;

	}

	@PostMapping("/submitProcessDeviation")
	public ResponseEntity<?> submitProcessDeviation(
			@Valid @RequestBody BudsBmrProcessDeviationRecordHeader deviationRecord, HttpServletRequest http) {

		ResponseEntity<?> resp = bmrSummaryService.submitProcessDeviation(deviationRecord, http);
		return resp;

	}

	@GetMapping("/getDeviationList")
	public ResponseEntity<?> getprocessDeviationList(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String batchNumber = requestParams.get("batchNumber");

		ResponseEntity<?> resp = bmrSummaryService.getProcessDeviationByOrder(batchNumber);
		return resp;
	}
	
	
	/**
	 * PRODUCT RECONILLATION
	 */
	
	@GetMapping("/productReconillation")
	public Map<String, Object> productReconillation(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String orderNumber = requestParams.get("orderNumber");
		String batchNo = requestParams.get("batchNo");
		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");
		
		return bmrSummaryService.productReconciliation(orderNumber, batchNo,fromdate, todate);
	}
	
	
	/**
	 * STOPPAGE
	 */
	
	
	@PostMapping("/saveStoppage")
	public ResponseEntity<?> saveStoppage(@Valid @RequestBody BudsBmrStoppageHeader stoppageHeader,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrSummaryService.saveStoppage(stoppageHeader, http);
		return resp;

	}

	@PostMapping("/submitStoppage")
	public ResponseEntity<?> submitStoppage(@Valid @RequestBody BudsBmrStoppageHeader stoppageHeader,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrSummaryService.submitStoppage(stoppageHeader, http);
		return resp;

	}
	
	
		// SUBMITTED STOPPAGE 
	
	@GetMapping("/getStoppageByBatch")
	public ResponseEntity<?> getStoppageList(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String batchNumber = requestParams.get("batchNumber");

		ResponseEntity<?> resp = bmrSummaryService.getStoppageDetailsByBatch(batchNumber);
		return resp;
	}
	
	
	@GetMapping("/getStoppageSAP")
	public ResponseEntity<?> getSAPData(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String fromDate = requestParams.get("fromDate");
		String toDate = requestParams.get("toDate");
		String shiftId = requestParams.get("shiftId");
		
		ResponseEntity<?> resp = bmrSummaryService.getStoppageSAPData(fromDate, toDate, shiftId);
		return resp;
	}
	
	
		// REWORK FORM 
	
	@PostMapping("/saveReworkForm")
	public ResponseEntity<?> saveReworkForm(@Valid @RequestBody BudsBmrRework reworkForm, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bmrSummaryService.saveReworkForm(reworkForm, http);
		return resp;
	}
	
	
	@PostMapping("/submitReworkForm")
	public ResponseEntity<?> submitReworkForm(@Valid @RequestBody BudsBmrRework reworkForm, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bmrSummaryService.submitReworkForm(reworkForm, http);
		return resp;
	}
	
	@PutMapping("/approveReworkForm")
	public ResponseEntity<?> approveReworkForm(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bmrSummaryService.approveReworkForm(approveResponse, http);
		return resp;
	}
	
	@GetMapping("/getReworkByBatch")
	public ResponseEntity<?> reworkFormByBatchNo(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String batchNumber = requestParams.get("batchNumber");
		
		ResponseEntity<?> resp = bmrSummaryService.getReworkFormByBatchNumber(batchNumber);
		return resp;
	}
	
	@PostMapping("/03.SavePackingMeterialIssue")
	public ResponseEntity<?> SavePackingMeterialIssue(@Valid @RequestBody BudsBmrPackingMaterialHeader details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrSummaryService.savePackingMaterial(details, http);
		return resp;
	}

	@PostMapping("/03.SubmitPackingMeterialIssue")
	public ResponseEntity<?> SubmitPackingMeterialIssue(@Valid @RequestBody BudsBmrPackingMaterialHeader details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrSummaryService.SubmitPackingMeterialIssue(details, http);
		return resp;
	}

	@GetMapping("/03.GetPackingMeterial")
	public ResponseEntity<?> GetPackingMeterial(@RequestParam Map<String, String> requestParams, Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrSummaryService.GetPackingMeterial(batch_no);
		return resp;
	}

	@GetMapping("/03.GetPackingMeterialPde")
	public ResponseEntity<?> GetPackingMeterialPde(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");
		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");

		ResponseEntity<?> resp = bmrSummaryService.GetPackingMeterialPde(batch_no, fromdate, todate);
		return resp;
	}
	
	
		// PRINT BMR 
	
	@GetMapping("/getBmrPrint")
	public ResponseEntity<?> budsBmrPrint(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String batchNumber = requestParams.get("batchNumber");
		
		ResponseEntity<?> resp = bmrSummaryService.getBudsPrint(batchNumber);
		return resp;
	}
	
	
		// TRACE 
	
//	@GetMapping("/julian")
//	public String budsTraceability(@RequestParam Map<String, String> requestParams,
//			Principal principal) {
//		
//		int julianDay = Integer.parseInt(requestParams.get("julianDay"));
//		int year = Integer.parseInt(requestParams.get("year"));
//		
//		String resp = bmrSummaryService.convertJulianToDate(julianDay, year);
//		return resp;
//	}
	
	
	@GetMapping("/julian")
	public ResponseEntity<?> budsTraceability(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		int julianDay = Integer.parseInt(requestParams.get("julianDay"));
		int year = Integer.parseInt(requestParams.get("year"));
		
		ResponseEntity<?> resp = bmrSummaryService.budsTraceability(julianDay, year);
		return resp;
	}
	 
	@GetMapping("/traceability")
	public ResponseEntity<?> traceablity(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String batchNumber = requestParams.get("batchNumber");
		
		ResponseEntity<?> resp = bmrSummaryService.budsTraceabilityByBatchNumber(batchNumber);
		return resp;
		
	}
	
	
	@GetMapping("/getBudsTraceblityBatchNo")
	public ResponseEntity<?> getBudsTraceblityBatchNo(@RequestParam Map<String, String> requestParams,
			Principal principal) {
 
		String julianDay = requestParams.get("julianDay");
		String yearLastTwoDigits = requestParams.get("yearLastTwoDigits");
 
		ResponseEntity<?> resp = bmrSummaryService.getBallsTraceblityBatchNo(julianDay, yearLastTwoDigits);
		return resp;
	}
	
	
	@GetMapping("/budsTraceability")
	public ResponseEntity<?> budsTrace(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String batchNumber = requestParams.get("batchNumber");
		
		ResponseEntity<?> resp = bmrSummaryService.budsTraceabilityByBatchNumbers(batchNumber);
		return resp;
		
	}
	
}
