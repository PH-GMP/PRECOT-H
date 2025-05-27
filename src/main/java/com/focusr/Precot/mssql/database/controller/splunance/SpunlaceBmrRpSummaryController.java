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
import com.focusr.Precot.mssql.database.model.splunance.BMR06RP07VerificationOfRecords;
import com.focusr.Precot.mssql.database.model.splunance.BMR08RP09ProductionReconciliation;
import com.focusr.Precot.mssql.database.model.splunance.BMR09RP11ProcessDlyEqupBrkDwnRecord;
import com.focusr.Precot.mssql.database.model.splunance.BMR12RP13PostProdReview;
import com.focusr.Precot.mssql.database.model.splunance.BMR13RP14QaRelease;
import com.focusr.Precot.mssql.database.model.splunance.BMR14RP15ProductRelease;
import com.focusr.Precot.mssql.database.model.splunance.RP02AnnexerInputDetailsProductionDetails;
import com.focusr.Precot.mssql.database.model.splunance.RPB04PackingMeterialDetails;
import com.focusr.Precot.mssql.database.model.splunance.RPB06ProcessingEqupments;
import com.focusr.Precot.mssql.database.model.splunance.RPB08ManufactureSteps;
import com.focusr.Precot.mssql.database.model.splunance.RPB10ProcessDevRecord;
import com.focusr.Precot.mssql.database.model.splunance.RPB12ListOfEnclouser;
import com.focusr.Precot.mssql.database.service.splunance.SupulaceRpBmrSummaryService;

@RestController
@RequestMapping("/api/spunlace/rp/summary")
public class SpunlaceBmrRpSummaryController {

	@Autowired
	SupulaceRpBmrSummaryService supulacerpbmrsummaryservice;

	@PostMapping("/01.SaveProductionDetails")
	public ResponseEntity<?> ProductionDetails(@Valid @RequestBody BMR01RP01ProductionDetails details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SaveProductionDetails(details, http);
		return resp;
	}
	
	@PostMapping("/01.SubmitProductionDetails")
	public ResponseEntity<?> SubmitProductionDetails(@Valid @RequestBody BMR01RP01ProductionDetails details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SubmitProductionDetails(details, http);
		return resp;
	}

	// Save

	@PostMapping("/02.SaveAnnexurInputDetails")
	public ResponseEntity<?> SaveAnnexurInputDetails(
			@Valid @RequestBody RP02AnnexerInputDetailsProductionDetails details, HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SaveAnnexurInputDetails(details, http);
		return resp;
	}

	// Submit

	@PostMapping("/02.SubmitAnnexurInputDetails")
	public ResponseEntity<?> SubmitAnnexurInputDetails(
			@Valid @RequestBody RP02AnnexerInputDetailsProductionDetails details, HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SubmitAnnexurInputDetails(details, http);
		return resp;
	}

	@PostMapping("/04.SavePackingMeterialDetails")
	public ResponseEntity<?> SavePackingMeterialDetails(@Valid @RequestBody RPB04PackingMeterialDetails details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SavePackingMeterialDetails(details, http);
		return resp;
	}

	@PostMapping("/06.SaveProcessingEqupments")
	public ResponseEntity<?> SaveProcessingEqupments(@Valid @RequestBody RPB06ProcessingEqupments details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SaveProcessingEqupments(details, http);
		return resp;
	}
	
	@PostMapping("/06.SubmitProcessingEqupments")
	public ResponseEntity<?> SubmitProcessingEqupments(@Valid @RequestBody RPB06ProcessingEqupments details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SubmitProcessingEqupments(details, http);
		return resp;
	}

	@PostMapping("/07.SaveVerificationOfRecords")
	public ResponseEntity<?> SaveVerificationOfRecords(@Valid @RequestBody BMR06RP07VerificationOfRecords details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SaveVerificationOfRecords(details, http);
		return resp;
	}

	// Submit

	@PostMapping("/07.SubmitVerificationOfRecords")
	public ResponseEntity<?> SubmitVerificationOfRecords(@Valid @RequestBody BMR06RP07VerificationOfRecords details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SubmitVerificationOfRecords(details, http);
		return resp;
	}

	@PostMapping("/08.SaveManufactureSteps")
	public ResponseEntity<?> SaveManufactureSteps(@Valid @RequestBody RPB08ManufactureSteps details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SaveManufactureSteps(details, http);
		return resp;
	}
	// New

	@PostMapping("/08.SubmitManufactureSteps")
	public ResponseEntity<?> SubmitManufactureSteps(@Valid @RequestBody RPB08ManufactureSteps details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SubmitManufactureSteps(details, http);
		return resp;
	}

	@PostMapping("/09.SaveProductReconciliation")
	public ResponseEntity<?> SaveProductReconciliation(@Valid @RequestBody BMR08RP09ProductionReconciliation details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SaveProductReconciliation(details, http);
		return resp;
	}

	//

	@PostMapping("/10.SaveProcessDevRecord")
	public ResponseEntity<?> SaveProcessDevRecord(@Valid @RequestBody RPB10ProcessDevRecord details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SaveProcessDevRecord(details, http);
		return resp;
	}
	
	
	@PostMapping("/10.SubmitProcessDevRecord")
	public ResponseEntity<?> SubmitProcessDevRecord(@Valid @RequestBody RPB10ProcessDevRecord details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SubmitProcessDevRecord(details, http);
		return resp;
	}

	@PostMapping("/11.SaveDelayEqupmentBrkDwnRecord")
	public ResponseEntity<?> SaveDelayEqupmentBrkDwnRecord(
			@Valid @RequestBody BMR09RP11ProcessDlyEqupBrkDwnRecord details, HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SaveDelayEqupmentBrkDwnRecord(details, http);
		return resp;
	}
	
	@PostMapping("/11.SubmitDelayEqupmentBrkDwnRecord")
	public ResponseEntity<?> SubmitDelayEqupmentBrkDwnRecord(
			@Valid @RequestBody BMR09RP11ProcessDlyEqupBrkDwnRecord details, HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SubmitDelayEqupmentBrkDwnRecord(details, http);
		return resp;
	}

	@PostMapping("/12.SaveListOfEnclosurs")
	public ResponseEntity<?> SaveLinstOfEnclosurs(@Valid @RequestBody RPB12ListOfEnclouser details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SaveListOfEnclosurs(details, http);
		return resp;
	}

	// Submit

	@PostMapping("/12.SubmitListOfEnclosurs")
	public ResponseEntity<?> SubmitListOfEnclosurs(@Valid @RequestBody RPB12ListOfEnclouser details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SubmitListOfEnclosurs(details, http);
		return resp;
	}

	@PostMapping("/13.SavePostProductionReview")
	public ResponseEntity<?> SavePostProductionReview(@Valid @RequestBody BMR12RP13PostProdReview details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SavePostProductionReview(details, http);
		return resp;
	}
	
	
	@PostMapping("/13.SubmitPostProductionReview")
	public ResponseEntity<?> SubmitPostProductionReview(@Valid @RequestBody BMR12RP13PostProdReview details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SubmitPostProductionReview(details, http);
		return resp;
	}

	@PostMapping("/14.SaveQaRelease")
	public ResponseEntity<?> SaveQaRelease(@Valid @RequestBody BMR13RP14QaRelease details, HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SaveQaRelease(details, http);
		return resp;
	}
	
	@PostMapping("/14.SubmitQaRelease")
	public ResponseEntity<?> SubmitQaRelease(@Valid @RequestBody BMR13RP14QaRelease details, HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SubmitQaRelease(details, http);
		return resp;
	}

	@PostMapping("/15.SaveProductRelease")
	public ResponseEntity<?> SaveProductRelease(@Valid @RequestBody BMR14RP15ProductRelease details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SaveProductRelease(details, http);
		return resp;
	}
//********************************************************************GetList**************************************************************//

	@GetMapping("/01.GetProductionDetails")
	public ResponseEntity<?> GetProductionDetails(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.GetProductionDetails(batch_no);
		return resp;
	}

	@GetMapping("/02.GetAnnexurInputDetails")
	public ResponseEntity<?> GetAnnexurInputDetails(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.GetAnnexurInputDetails(batch_no);
		return resp;
	}

	@GetMapping("/04.GetPackingMeterialDetails")
	public ResponseEntity<?> GetPackingMeterialDetails(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.GetPackingMeterialDetails(batch_no);
		return resp;
	}

	@GetMapping("/06.GetProcessingEqupments")
	public ResponseEntity<?> GetProcessingEqupments(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.GetProcessingEqupments(batch_no);
		return resp;
	}

	@GetMapping("/07.GetVerificationOfRecords")
	public ResponseEntity<?> GetVerificationOfRecords(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.GetVerificationOfRecords(batch_no);
		return resp;
	}

	//

	@GetMapping("/08.GetManufactureSteps")
	public ResponseEntity<?> SaveManufactureSteps(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.SaveManufactureSteps(batch_no);
		return resp;
	}

	//

	@GetMapping("/09.GetProductReconciliation")
	public ResponseEntity<?> GetProductReconciliation(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.GetProductReconciliation(batch_no);
		return resp;
	}

	@GetMapping("/10.GetProcessDeviationRecord")
	public ResponseEntity<?> GetProcessDeviationRecord(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.GetProcessDeviationRecord(batch_no);
		return resp;
	}

	@GetMapping("/11.GetDelayEqupmentBrkDwnRecord")
	public ResponseEntity<?> GetDelayEqupmentBrkDwnRecord(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");
		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");
		
		ResponseEntity<?> resp = supulacerpbmrsummaryservice.GetDelayEqupmentBrkDwnRecord(batch_no, fromdate, todate);
		return resp;
	}

	@GetMapping("/12.GetListOfEnclosurs")
	public ResponseEntity<?> GetListOfEnclosurs(@RequestParam Map<String, String> requestParams, Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.GetListOfEnclosurs(batch_no);
		return resp;
	}

	@GetMapping("/13.GetPostProductionReview")
	public ResponseEntity<?> GetPostProductionReview(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.GetPostProductionReview(batch_no);
		return resp;
	}

	@GetMapping("/14.GetQaRelease")
	public ResponseEntity<?> GetQaRelease(@RequestParam Map<String, String> requestParams, Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.GetQaRelease(batch_no);
		return resp;
	}

	@GetMapping("/15.GetProductRelease")
	public ResponseEntity<?> GetProductRelease(@RequestParam Map<String, String> requestParams, Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.GetProductRelease(batch_no);
		return resp;
	}

	@GetMapping("/GetRpbPrint")
	public ResponseEntity<?> GetBmrPrint(@RequestParam Map<String, String> requestParams, Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = supulacerpbmrsummaryservice.GetBmrPrint(batch_no);
		return resp;
	}
	
	
	// LOV FOR PRODUCTION DETAILS - CR

		@GetMapping("/01.GetBatchNoSpulanceBmr")
		public ResponseEntity<?> fetchBatchNoforProductionDetails() {

			ResponseEntity<?> resp = supulacerpbmrsummaryservice.getProductionDetailsLoV();
			return resp;

		}
		
		
		@GetMapping("/getBaleDetailsByOrderDate")
		public ResponseEntity<?> getBaleNoByDateOrder(@RequestParam Map<String, String> requestParams,
				Principal principal) {
			
			String orderNumber = requestParams.get("order_no");
			String fromdate = requestParams.get("fromdate");
			String todate = requestParams.get("todate");
			
			ResponseEntity<?> resp = supulacerpbmrsummaryservice.getBaleByOrderDate(orderNumber, fromdate, todate);
			return resp;
			
		}
		
		
		@GetMapping("/getProductionDetailsByBaleOrderDate")
		public ResponseEntity<?> getProductionDetailsByBaleDateOrder(@RequestParam Map<String, String> requestParams,
				Principal principal) {
			
			String orderNumber = requestParams.get("order_no");
			String fromdate = requestParams.get("fromdate");
			String todate = requestParams.get("todate");
			String frombale = requestParams.get("frombale");
			String tobale = requestParams.get("tobale");
			
			ResponseEntity<?> resp = supulacerpbmrsummaryservice.productionDetailsByBaleDateOrder(orderNumber, fromdate, todate, frombale, tobale);
			return resp;
			
		}
		

}
