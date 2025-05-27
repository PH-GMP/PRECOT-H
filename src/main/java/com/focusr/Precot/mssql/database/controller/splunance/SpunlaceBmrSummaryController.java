package com.focusr.Precot.mssql.database.controller.splunance;

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

import com.focusr.Precot.mssql.database.model.splunance.BMR01RP01ProductionDetails;
import com.focusr.Precot.mssql.database.model.splunance.BMR03PackingMeterialIssue;
import com.focusr.Precot.mssql.database.model.splunance.BMR05AnnexureList;
import com.focusr.Precot.mssql.database.model.splunance.BMR06RP07VerificationOfRecords;
import com.focusr.Precot.mssql.database.model.splunance.BMR07ManufacturingSteps;
import com.focusr.Precot.mssql.database.model.splunance.BMR08RP09ProductionReconciliation;
import com.focusr.Precot.mssql.database.model.splunance.BMR09RP11ProcessDlyEqupBrkDwnRecord;
import com.focusr.Precot.mssql.database.model.splunance.BMR10ProcessDeviationRecord;
import com.focusr.Precot.mssql.database.model.splunance.BMR11ListsOfEnclosures;
import com.focusr.Precot.mssql.database.model.splunance.BMR12RP13PostProdReview;
import com.focusr.Precot.mssql.database.model.splunance.BMR13RP14QaRelease;
import com.focusr.Precot.mssql.database.model.splunance.BMR14RP15ProductRelease;
import com.focusr.Precot.mssql.database.service.splunance.SupulaceBmrSummaryService;

@RestController
@RequestMapping("/api/spunlace/summary")
public class SpunlaceBmrSummaryController {

	@Autowired
	SupulaceBmrSummaryService supulacebmrsummaryservice;

	@PostMapping("/01.SaveProductionDetails")
	public ResponseEntity<?> SaveProductionDetails(@Valid @RequestBody BMR01RP01ProductionDetails details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.SaveProductionDetails(details, http);
		return resp;
	}

	@PostMapping("/01.SubmitProductionDetails")
	public ResponseEntity<?> ProductionDetails(@Valid @RequestBody BMR01RP01ProductionDetails details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.bmr_01_productiondetails(details, http);
		return resp;
	}

	// Save

	@PostMapping("/03.SavePackingMeterialIssue")
	public ResponseEntity<?> SavePackingMeterialIssue(@Valid @RequestBody BMR03PackingMeterialIssue details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.SavePackingMeterialIssue(details, http);
		return resp;
	}

	// Submit
	@PostMapping("/03.SubmitPackingMeterialIssue")
	public ResponseEntity<?> SubmitPackingMeterialIssue(@Valid @RequestBody BMR03PackingMeterialIssue details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.SubmitPackingMeterialIssue(details, http);
		return resp;
	}

	@PostMapping("/05.SaveProcessingEquipments")
	public ResponseEntity<?> SaveProcessingEquipments(@Valid @RequestBody BMR05AnnexureList details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.SaveProcessingEquipments(details, http);
		return resp;
	}

	
	@PostMapping("/05.SubmitProcessingEquipments")
	public ResponseEntity<?> SubmitProcessingEquipments(@Valid @RequestBody BMR05AnnexureList details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.SubmitProcessingEquipments(details, http);
		return resp;
	}

	@PostMapping("/06.SaveVerificationOfRecords")
	public ResponseEntity<?> SaveVerificationOfRecords(@Valid @RequestBody BMR06RP07VerificationOfRecords details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.SaveVerificationOfRecords(details, http);
		return resp;
	}

	// New

	@PostMapping("/06.SubmitVerificationOfRecords")
	public ResponseEntity<?> SubmitVerificationOfRecords(@Valid @RequestBody BMR06RP07VerificationOfRecords details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.SubmitVerificationOfRecords(details, http);
		return resp;
	}

	@PostMapping("/07.SaveManufacturingSteps")
	public ResponseEntity<?> SaveManufacturingSteps(@Valid @RequestBody BMR07ManufacturingSteps details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.SaveManufacturingSteps(details, http);
		return resp;
	}

	// New

	@PostMapping("/07.SubmitManufacturingSteps")
	public ResponseEntity<?> SubmitManufacturingSteps(@Valid @RequestBody BMR07ManufacturingSteps details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.SubmitManufacturingSteps(details, http);
		return resp;
	}

	@PostMapping("/08.SaveProductReconciliation")
	public ResponseEntity<?> SaveProductReconciliation(@Valid @RequestBody BMR08RP09ProductionReconciliation details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.SaveProductReconciliation(details, http);
		return resp;
	}

	@PostMapping("/09.SaveDelayEqupmentBrkDwnRecord")
	public ResponseEntity<?> SaveDelayEqupmentBrkDwnRecord(
			@Valid @RequestBody BMR09RP11ProcessDlyEqupBrkDwnRecord details, HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.SaveDelayEqupmentBrkDwnRecord(details, http);
		return resp;
	}
	
	
	@PostMapping("/09.SubmitDelayEqupmentBrkDwnRecord")
	public ResponseEntity<?> SubmitDelayEqupmentBrkDwnRecord(
			@Valid @RequestBody BMR09RP11ProcessDlyEqupBrkDwnRecord details, HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.SubmitDelayEqupmentBrkDwnRecord(details, http);
		return resp;
	}

	@PostMapping("/10.SaveProcessDeviationRecord")
	public ResponseEntity<?> SaveProcessDeviationRecord(@Valid @RequestBody BMR10ProcessDeviationRecord details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.SaveProcessDeviationRecord(details, http);
		return resp;
	}
	
	@PostMapping("/10.SubmitProcessDeviationRecord")
	public ResponseEntity<?> SubmitProcessDeviationRecord(@Valid @RequestBody BMR10ProcessDeviationRecord details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.SubmitProcessDeviationRecord(details, http);
		return resp;
	}

	
//	PDE DATA ONLY
	@PostMapping("/11.SaveListOFEnclousers")
	public ResponseEntity<?> SaveListOFEnclousers(@Valid @RequestBody BMR11ListsOfEnclosures details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.SaveListOFEnclousers(details, http);
		return resp;
	}

	@PostMapping("/12.SavePostProductionReview")
	public ResponseEntity<?> SavePostProductionReview(@Valid @RequestBody BMR12RP13PostProdReview details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.SavePostProductionReview(details, http);
		return resp;
	}
	
	@PostMapping("/12.SubmitPostProductionReview")
	public ResponseEntity<?> SubmitPostProductionReview(@Valid @RequestBody BMR12RP13PostProdReview details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.SubmitPostProductionReview(details, http);
		return resp;
	}

	@PostMapping("/13.SaveQaRelease")
	public ResponseEntity<?> SaveQaRelease(@Valid @RequestBody BMR13RP14QaRelease details, HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.SaveQaRelease(details, http);
		return resp;
	}
	
	
	@PostMapping("/13.SubmitQaRelease")
	public ResponseEntity<?> SubmitQaRelease(@Valid @RequestBody BMR13RP14QaRelease details, HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.SubmitQaRelease(details, http);
		return resp;
	}

	@PostMapping("/14.SaveProductRelease")
	public ResponseEntity<?> SaveProductRelease(@Valid @RequestBody BMR14RP15ProductRelease details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.SaveProductRelease(details, http);
		return resp;
	}
//********************************************************************GetList**************************************************************//

	@GetMapping("/01.GetProductionDetails")
	public ResponseEntity<?> GetProductionDetails(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String order_no = requestParams.get("order_no");
		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");

		ResponseEntity<?> resp = supulacebmrsummaryservice.GetProductionDetails(order_no, fromdate, todate);
		return resp;
	}
	
	
	@GetMapping("/01.fetchProductionDetailsByBatch")
	public ResponseEntity<?> getProductionDetailsBatchNo(@RequestParam Map<String, String> requestParams,
			Principal principal) {
	
		String order_no = requestParams.get("order_no");
		
		ResponseEntity<?> resp = supulacebmrsummaryservice.fetchProductionDetailsByBatchNumber(order_no);
		return resp;
		
	}
	

	// LOV FOR PRODUCTION DETAILS - CR

	@GetMapping("/01.GetBatchNoSpulanceBmr")
	public ResponseEntity<?> fetchBatchNoforProductionDetails(Principal principal) {

		ResponseEntity<?> resp = supulacebmrsummaryservice.getProductionDetailsLoV();
		return resp;

	}
	
	
		// CR - Production Details 
	
	@GetMapping("/getProductionDetailsByShaftDateOrder")
	public ResponseEntity<?> productionDetailsByShaftNoDateOrder(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String orderNumber = requestParams.get("orderNumber");
		String fromDate = requestParams.get("fromDate");
		String toDate = requestParams.get("toDate");
		String fromShaft = requestParams.get("fromShaft");
		String toShaft = requestParams.get("toShaft");
		
		return supulacebmrsummaryservice.getProductionDetailsByShaftDateOrder(orderNumber, fromDate, toDate, fromShaft, toShaft);
	}
	
	
	@GetMapping("/getShaftNoByOrderDate")
	public ResponseEntity<?> shaftNoListByOrderDate(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String orderNumber = requestParams.get("orderNumber");
		String fromDate = requestParams.get("fromDate");
		String toDate = requestParams.get("toDate");
		
		ResponseEntity<?> resp = supulacebmrsummaryservice.getShaftNumberDetailsByDate(orderNumber, fromDate, toDate);
		return resp;
	}

	@GetMapping("/03.GetPackingMeterialIssue")
	public ResponseEntity<?> GetPackingMeterialIssue(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String order_no = requestParams.get("order_no");

		ResponseEntity<?> resp = supulacebmrsummaryservice.GetPackingMeterialIssue(order_no);
		return resp;
	}

	@GetMapping("/05.GetProcessingEquipments")
	public ResponseEntity<?> GetProcessingEquipments(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String order_no = requestParams.get("order_no");

		ResponseEntity<?> resp = supulacebmrsummaryservice.GetProcessingEquipments(order_no);
		return resp;
	}

	@GetMapping("/06.GetVerificationOfRecords")
	public ResponseEntity<?> GetVerificationOfRecords(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String order_no = requestParams.get("order_no");

		ResponseEntity<?> resp = supulacebmrsummaryservice.GetVerificationOfRecords(order_no);
		return resp;
	}

	@GetMapping("/07.GetManufacturingSteps")
	public ResponseEntity<?> GetManufacturingSteps(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String order_no = requestParams.get("order_no");

		ResponseEntity<?> resp = supulacebmrsummaryservice.GetManufacturingSteps(order_no);
		return resp;
	}

	@GetMapping("/08.GetProductReconciliation")
	public ResponseEntity<?> GetProductReconciliation(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String order_no = requestParams.get("order_no");

		ResponseEntity<?> resp = supulacebmrsummaryservice.GetProductReconciliation(order_no);
		return resp;
	}

	@GetMapping("/09.GetDelayEqupmentBrkDwnRecord")
	public ResponseEntity<?> GetDelayEqupmentBrkDwnRecord(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String batch_no = requestParams.get("batch_no");
		String order_no = requestParams.get("order_no");
		String from_date = requestParams.get("from_date");
		String to_date = requestParams.get("to_date");

		ResponseEntity<?> resp = supulacebmrsummaryservice.GetDelayEqupmentBrkDwnRecord(batch_no,order_no, from_date, to_date);
		return resp;
	}

	@GetMapping("/10.GetProcessDeviationRecord")
	public ResponseEntity<?> GetProcessDeviationRecord(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String order_no = requestParams.get("order_no");

		ResponseEntity<?> resp = supulacebmrsummaryservice.GetProcessDeviationRecord(order_no);
		return resp;
	}

	@GetMapping("/11.GetListOFEnclousers")
	public ResponseEntity<?> GetListOFEnclousers(@RequestParam Map<String, String> requestParams, Principal principal) {
		String order_no = requestParams.get("order_no");

		ResponseEntity<?> resp = supulacebmrsummaryservice.GetListOFEnclousers(order_no);
		return resp;
	}

	@GetMapping("/12.GetPostProductionReview")
	public ResponseEntity<?> GetPostProductionReview(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String order_no = requestParams.get("order_no");

		ResponseEntity<?> resp = supulacebmrsummaryservice.GetPostProductionReview(order_no);
		return resp;
	}

	@GetMapping("/13.GetQaRelease")
	public ResponseEntity<?> GetQaRelease(@RequestParam Map<String, String> requestParams, Principal principal) {
		String order_no = requestParams.get("order_no");

		ResponseEntity<?> resp = supulacebmrsummaryservice.GetQaRelease(order_no);
		return resp;
	}

	@GetMapping("/14.GetProductRelease")
	public ResponseEntity<?> GetProductRelease(@RequestParam Map<String, String> requestParams, Principal principal) {
		String order_no = requestParams.get("order_no");

		ResponseEntity<?> resp = supulacebmrsummaryservice.GetProductRelease(order_no);
		return resp;
	}

	@GetMapping("/GetBmrPrint")
	public ResponseEntity<?> GetBmrPrint(@RequestParam Map<String, String> requestParams, Principal principal) {
		String order_no = requestParams.get("order_no");

		ResponseEntity<?> resp = supulacebmrsummaryservice.GetBmrPrint(order_no);
		return resp;
	}

}
