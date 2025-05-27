package com.focusr.Precot.mssql.database.controller.padpunching;

import java.security.Principal;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.model.drygoods.BMR03GoodsPackingMeterialIssue;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrEnclosureList;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrEquipmentDetails;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrEquipmentSAP;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrManufacturingSteps;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrPostProductionReview;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrProcessDeviationRecordHeader;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrProductRelease;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrProductionDetails;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrQualityReleaseHeader;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrStoppageHeader;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrVerificationOfRecords;
import com.focusr.Precot.mssql.database.service.padpunching.PunchingBmrService;


@RestController
@RequestMapping("/api/punching/bmr")
public class PunchingBmrController {

	@Autowired
	private PunchingBmrService bmrService;

	// 14.0 PRODUCT RELEASE

	@PostMapping("/saveProductRelease")
	public ResponseEntity<?> saveProductRelease(@Valid @RequestBody PunchingBmrProductRelease productRelease,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrService.saveProductRelease(productRelease, http);
		return resp;
	}

	@GetMapping("/getProductRelease")
	public ResponseEntity<?> getProductRelease(@RequestParam Map<String, String> requestParams, Principal principal) {

		String order = requestParams.get("order");

		ResponseEntity<?> resp = bmrService.getProductReleaseByOrder(order);
		return resp;
	}

	@GetMapping("/getProductReleaseBatch")
	public ResponseEntity<?> getProductReleaseBatch(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String batchNo = requestParams.get("batchNo");

		ResponseEntity<?> resp = bmrService.getProductReleaseByBatch(batchNo);
		return resp;
	}

	// 01. PRODUCTION DETAILS

	@PostMapping("/SaveproductionDetails")
	public ResponseEntity<?> saveProductionDetails(@Valid @RequestBody PunchingBmrProductionDetails productionDetails,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrService.saveProductionDetails(productionDetails, http);
		return resp;
	}

	// 01Submit

	@PostMapping("/productionDetails")
	public ResponseEntity<?> submitProductionDetails(@Valid @RequestBody PunchingBmrProductionDetails productionDetails,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrService.submitProductionDetails(productionDetails, http);
		return resp;
	}

	@GetMapping("/getProductionDetails")
	public ResponseEntity<?> getProductionDetails(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String order = requestParams.get("order");

		ResponseEntity<?> resp = bmrService.getProductionDetails(order);
		return resp;
	}

	@GetMapping("/getProductionDetailsBatchOrder")
	public ResponseEntity<?> getProductionDetailsBatchOrder(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String batchNo = requestParams.get("batchNo");
		String orderNo = requestParams.get("orderNo");
		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");

		ResponseEntity<?> resp = bmrService.getProductionResponseByBatchOrder(batchNo, orderNo, fromdate, todate);
		return resp;
	}

	@GetMapping("/getProductionDetailsSAP")
	public ResponseEntity<?> getProductionDetailsSAP(Principal principal) {

		ResponseEntity<?> resp = bmrService.getProductionDetailsSAP();
		return resp;
	}

	@GetMapping("/getOrderByBatchNo")
	public ResponseEntity<?> getOrderByBatchNo(@RequestParam Map<String, String> requestParams, Principal principal) {

		String batchNo = requestParams.get("batchNo");
		ResponseEntity<?> resp = bmrService.getOrderLovOnBatchNo(batchNo);
		return resp;
	}
	
	
	@GetMapping("/fetchProductionDetailsByBatchNumber")
	public ResponseEntity<?> fetchProductionDetailsByBatchNumber(@RequestParam Map<String, String> requestParams, Principal principal) {
		
		String batchNo = requestParams.get("batchNo");
		
		ResponseEntity<?> resp = bmrService.fetchProductionDetailsByBatchNumber(batchNo);
		return resp;
	}
	

	// 6. VERIFICATION OF RECORDS

	@PostMapping("/saveVerificationRecords")
	public ResponseEntity<?> saveVerificationOfRecords(
			@Valid @RequestBody PunchingBmrVerificationOfRecords verificationRecords, HttpServletRequest http) {
		ResponseEntity<?> resp = bmrService.saveVerificationOfRecords1(verificationRecords, http);
		return resp;
	}

	@PostMapping("/submitVerificationRecords")
	public ResponseEntity<?> submitVerificationOfRecords(
			@Valid @RequestBody PunchingBmrVerificationOfRecords verificationRecords, HttpServletRequest http) {
		ResponseEntity<?> resp = bmrService.submitVerificationOfRecords(verificationRecords, http);
		return resp;
	}

	@GetMapping("/getVerificationRecords")
	public ResponseEntity<?> getVerificationOfRecords(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String order = requestParams.get("order");
//		String department = requestParams.get("department");

		ResponseEntity<?> resp = bmrService.getVerificationOfRecords(order);
		return resp;

	}

	// 12. POST PRODUCTION REVIEW

	@PostMapping("/savePostProductionReview")
	public ResponseEntity<?> savePostProductionReview(
			@Valid @RequestBody PunchingBmrPostProductionReview postProductionReview, HttpServletRequest http) {

		ResponseEntity<?> resp = bmrService.savePostProductionReview(postProductionReview, http);
		return resp;

	}

	@PostMapping("/submitPostProductionReview")
	public ResponseEntity<?> submitPostProductionReview(
			@Valid @RequestBody PunchingBmrPostProductionReview postProductionReview, HttpServletRequest http) {

		ResponseEntity<?> resp = bmrService.submitPostProductionReview(postProductionReview, http);
		return resp;

	}

	@GetMapping("/postProductionReview")
	public ResponseEntity<?> getPostProductionReview(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String order = requestParams.get("order");

		ResponseEntity<?> resp = bmrService.getPostProductionReviewByOrder(order);
		return resp;

	}

	// 5. EQUIPMENT ANNEXURE

	@PostMapping("/saveEquipmentAnnexure")
	public ResponseEntity<?> saveEquipmentAnnexure(@Valid @RequestBody PunchingBmrEquipmentDetails equipmentDetails,
			HttpServletRequest http) {
		ResponseEntity<?> resp = bmrService.saveEquipmentAnnexure(equipmentDetails, http);
		return resp;
	}

	@PostMapping("/submitEquipmentAnnexure")
	public ResponseEntity<?> submitEquipmentAnnexure(@Valid @RequestBody PunchingBmrEquipmentDetails equipmentDetails,
			HttpServletRequest http) {
		ResponseEntity<?> resp = bmrService.submitEquipmentAnnexure(equipmentDetails, http);
		return resp;
	}

	@GetMapping("/getEquipmentAnnexure")
	public ResponseEntity<?> getEquipmentAnnexure(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String order = requestParams.get("order");

		ResponseEntity<?> resp = bmrService.getEquipmentAnnexure(order);
		return resp;
	}
	
	
	@PostMapping("/saveEquipmentAnnexureSAP")
	public ResponseEntity<?> saveEquipmentAnnexureSAP(@Valid @RequestBody PunchingBmrEquipmentSAP equipmentDetails,
			HttpServletRequest http) {
		ResponseEntity<?> resp = bmrService.saveEquipmentAnnexureSAP(equipmentDetails);
		return resp;
	}
	
	@GetMapping("/getEquipmentAnnexureByName")
	public ResponseEntity<?> getEquipmentAnnexureByEquipName(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String equipmentName = requestParams.get("equipmentName");
		
		ResponseEntity<?> resp = bmrService.getEquipmentAnnexureByEquipmentName(equipmentName);
		return resp;
	}
	

	// 10. ENCLOSURE LIST

	@PostMapping("/saveEnclosureList")
	public ResponseEntity<?> saveEnclosureList(@Valid @RequestBody PunchingBmrEnclosureList enclosureList,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrService.saveEnclosureList(enclosureList, http);
		return resp;
	}

	@GetMapping("/getEnclosureList")
	public ResponseEntity<?> getEnclosureList(@RequestParam Map<String, String> requestParams, Principal principal) {

		String order = requestParams.get("order");

		ResponseEntity<?> resp = bmrService.getEnclosureListOrder(order);
		return resp;
	}

	// 02. DAILY PRODUCTION

	@GetMapping("/dailyProductionDetails")
	public ResponseEntity<?> dailyProductionDetails(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");
		String orderNo = requestParams.get("orderNo");

		ResponseEntity<?> resp = bmrService.dailyProductionPackingDetails(fromdate, todate, orderNo);
		return resp;
	}

	// 11. PROCESS DEVIATION

	@PostMapping("/saveProcessDeviation")
	public ResponseEntity<?> saveProcessDeviationRecord(
			@Valid @RequestBody PunchingBmrProcessDeviationRecordHeader deviationRecord, HttpServletRequest http) {

		ResponseEntity<?> resp = bmrService.saveProcessDeviation(deviationRecord, http);
		return resp;

	}

	@PostMapping("/submitProcessDeviation")
	public ResponseEntity<?> submitProcessDeviation(
			@Valid @RequestBody PunchingBmrProcessDeviationRecordHeader deviationRecord, HttpServletRequest http) {

		ResponseEntity<?> resp = bmrService.submitProcessDeviation(deviationRecord, http);
		return resp;

	}

	@GetMapping("/getDeviationList")
	public ResponseEntity<?> getprocessDeviationList(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String order = requestParams.get("order");

		ResponseEntity<?> resp = bmrService.getProcessDeviationByOrder(order);
		return resp;
	}

	@GetMapping("/fetchProductionDetails")
	public ResponseEntity<?> fetchProductionDetailsBatchNumber(Principal principal) {
		ResponseEntity<?> resp = bmrService.getProductionDetailsLoV();
//		ResponseEntity<?> resp = bmrService.getProductionLOV();
//		ResponseEntity<?> resp = bmrService.getFilteredBatchNumbers();
		return resp;
	}

// 10. PRODUCT RECONILLATION
	@GetMapping("/productReconillation")
	public ResponseEntity<?> productReconillation(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String order = requestParams.get("order");
		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");
		String batchNo = requestParams.get("batchNo");
		ResponseEntity<?> resp = bmrService.productReconillation(batchNo, order, fromdate, todate);
		return resp;
	}

// FOR PRINT 
	@GetMapping("/punchingprint")
	public ResponseEntity<?> printPunching(@RequestParam Map<String, String> requestParams, Principal principal) {
		String batchNo = requestParams.get("batchNo");
		ResponseEntity<?> resp = bmrService.punchingPrint(batchNo);
		return resp;
	}

	// 13. QA RELEASE

	@PostMapping("/saveQualityRelease")
	public ResponseEntity<?> saveQualityRecord(@Valid @RequestBody PunchingBmrQualityReleaseHeader deviationRecord,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrService.saveQARelease(deviationRecord, http);
		return resp;

	}

	@PostMapping("/submitQualityRelease")
	public ResponseEntity<?> submitQualityRelease(@Valid @RequestBody PunchingBmrQualityReleaseHeader deviationRecord,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrService.submitQARelease(deviationRecord, http);
		return resp;

	}

	@GetMapping("/getQualityReleaseList")
	public ResponseEntity<?> getQualityReleaseList(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String order = requestParams.get("order");

		ResponseEntity<?> resp = bmrService.getQualityRelease(order);
		return resp;
	}

	// STOPPAGE //09

	@GetMapping("/stoppageReports")
	public ResponseEntity<?> getStoppageReports(@RequestParam Map<String, String> requestParams, Principal principal) {

		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");
		String machine = requestParams.get("machine");

		ResponseEntity<?> resp = bmrService.getStoppageOrders(fromdate, todate, machine);
		return resp;
	}

	@PostMapping("/saveStoppage")
	public ResponseEntity<?> saveStoppage(@Valid @RequestBody PunchingBmrStoppageHeader stoppageHeader,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrService.saveStoppageRows(stoppageHeader, http);
		return resp;

	}

	@PostMapping("/submitStoppage")
	public ResponseEntity<?> submitStoppage(@Valid @RequestBody PunchingBmrStoppageHeader stoppageHeader,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrService.submitStoppageRows(stoppageHeader, http);
		return resp;

	}

	@GetMapping("/getSubmittedStoppages")
	public ResponseEntity<?> getSubmittedStoppages(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");
		String machine = requestParams.get("machine");

		ResponseEntity<?> resp = bmrService.getStoppageRows(fromdate, todate, machine);
		return resp;
	}

	// NEW

	@GetMapping("/getStoppagesBybatch")
	public ResponseEntity<?> getStoppagesBybatch(@RequestParam Map<String, String> requestParams, Principal principal) {

		String batchNo = requestParams.get("batchNo");

		ResponseEntity<?> resp = bmrService.getStoppagesBybatch(batchNo);
		return resp;
	}

	// 7. MANUFACTURER STEPS

	@PostMapping("/saveManufacturerSteps")
	public ResponseEntity<?> saveMaufacturerSteps(@Valid @RequestBody PunchingBmrManufacturingSteps manufacturerSteps,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrService.saveManufacturerSteps(manufacturerSteps, http);
		return resp;

	}

	@PostMapping("/submitManufacturerSteps")
	public ResponseEntity<?> submitMaufacturerSteps(@Valid @RequestBody PunchingBmrManufacturingSteps manufacturerSteps,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrService.submitManufacturerSteps(manufacturerSteps, http);
		return resp;

	}

	@GetMapping("/getManufacturerStepsByBatch")
	public ResponseEntity<?> getManufacturerByBatchNo(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String batchNo = requestParams.get("batchNo");

		ResponseEntity<?> resp = bmrService.getManufacturerSteps(batchNo);
		return resp;
	}

	@GetMapping("/getManufacturerStepsByOrder")
	public ResponseEntity<?> getManufacturerByOrder(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String order = requestParams.get("order");

		ResponseEntity<?> resp = bmrService.getManufacturerStepsByOrder(order);
		return resp;
	}

	// TRACEABILITY

	@GetMapping("/punchTrace")
	public ResponseEntity<?> punchTraceability(@RequestParam Map<String, String> requestParams, Principal principal) {

		String date = requestParams.get("date");
		String product = requestParams.get("product");

		ResponseEntity<?> resp = bmrService.punchingTraceability(date, product);
		return resp;
	}

//	@GetMapping("/punchTraceability")
//	public ResponseEntity<?> punchTraceability1(@RequestParam Map<String, String> requestParams,
//			Principal principal) {
//		
//		String item = requestParams.get("item");
//		String saleOrder = requestParams.get("saleOrder");
//		String product = requestParams.get("product");
//		
//		ResponseEntity<?> resp = bmrService.punchingTraceabilityRequest(saleOrder,item ,product);
//		return resp;
//	}

	@GetMapping("/punchTraceability")
	public ResponseEntity<?> punchTraceability1(@RequestParam Map<String, String> requestParams, Principal principal) {
		String item = requestParams.get("item");
		String saleOrder = requestParams.get("saleOrder");
		// FOR PASS MAN DATE
		String manDate = requestParams.get("manDate");
		// FOR JULIAN
		String day = requestParams.get("day");
		String shiftId = requestParams.get("shiftId");
		String year = requestParams.get("year");
		String product = requestParams.get("product");
		ResponseEntity<?> resp = bmrService.traceAbility1(saleOrder, item, product, manDate, year, day, shiftId);
		return resp;
	}

	// GOODS
	@GetMapping("/goodsTraceability")
	public ResponseEntity<?> goodsTraceability1(@RequestParam Map<String, String> requestParams, Principal principal) {
		String item = requestParams.get("item");
		String saleOrder = requestParams.get("saleOrder");
		String product = requestParams.get("product");
		// FOR PASS MAN DATE
		String manDate = requestParams.get("manDate");

		// FOR JULIAN

		String day = requestParams.get("day");
		String shiftId = requestParams.get("shiftId");
		String year = requestParams.get("year");
		ResponseEntity<?> resp = bmrService.dryGoodsTraceability(saleOrder, item, product, manDate, year, day, shiftId);
		return resp;
	}

	// packing meterial issue

	@PostMapping("/03.SavePackingMeterialIssue")
	public ResponseEntity<?> SavePackingMeterialIssue(@Valid @RequestBody BMR03GoodsPackingMeterialIssue details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrService.SavePackingMeterialIssue(details, http);
		return resp;
	}

	@PostMapping("/03.SubmitPackingMeterialIssue")
	public ResponseEntity<?> SubmitPackingMeterialIssue(@Valid @RequestBody BMR03GoodsPackingMeterialIssue details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrService.SubmitPackingMeterialIssue(details, http);
		return resp;
	}

	@GetMapping("/03.GetPackingMeterial")
	public ResponseEntity<?> GetPackingMeterial(@RequestParam Map<String, String> requestParams, Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrService.GetPackingMeterial(batch_no);
		return resp;
	}

	@GetMapping("/03.GetPackingMeterialPde")
	public ResponseEntity<?> GetPackingMeterialPde(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");
		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");

		ResponseEntity<?> resp = bmrService.GetPackingMeterialPde(batch_no, fromdate, todate);
		return resp;
	}

}
