package com.focusr.Precot.mssql.database.controller.padpunching;

import java.security.Principal;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.model.padpunching.ProductionDetailLogBook01;
import com.focusr.Precot.mssql.database.model.padpunching.ProductionDetailsLogBook01;
import com.focusr.Precot.mssql.database.service.padpunching.PunchingService2;
import com.focusr.Precot.payload.ApproveResponse;

/**
 * 
 * @author Vijay.R
 */

@RestController
@RequestMapping("/api/Punching/Service")
public class PunchingController2 {

	@Autowired
	private PunchingService2 punchingService2;

//	@PostMapping("/saveProductionDetailsF01")
//	public ResponseEntity<?> saveProductionDetails(@Valid @RequestBody ProductionDetailsLogBook01 productionDetails,
//			HttpServletRequest http) {
//
//		ResponseEntity<?> resp = punchingService2.saveProductionDetails(productionDetails, http);
//		return resp;
//	}
//
//	@PostMapping("/submitProductionDetailsF01")
//	public ResponseEntity<?> submitProductionDetails(@Valid @RequestBody ProductionDetailsLogBook01 productionDetails,
//			HttpServletRequest http) {
//
//		ResponseEntity<?> resp = punchingService2.submitProductionDetails(productionDetails, http);
//		return resp;
//	}

	@GetMapping("/summaryProductionF01")
	public ResponseEntity<?> getSummary() {
		ResponseEntity<?> resp = punchingService2.getSummaryF01();
		return resp;
	}

	@GetMapping("/getproductiondetailsF01")
	public ResponseEntity<?> getProductionDetails(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String date = requestParams.get("date");
		String shift = requestParams.get("shift");

		ResponseEntity<?> resp = punchingService2.getProductDetailsbyUniquefield(date, shift);
		return resp;
	}

	@PutMapping("/approveProdDetailsF01")
	public ResponseEntity<?> approveOrRejectProductChangeOver(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = punchingService2.approveRejectProdDetails(approvalResponse, http);
		return resp;

	}

	@GetMapping("/getProdDetailsPrintF01")
	public ResponseEntity<?> getProdDetailPrint(@RequestParam Map<String, String> requestParams, Principal principal) {
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");

		ResponseEntity<?> resp = punchingService2.fetchPrint(date, shift);
		return resp;
	}
	
	
	@PostMapping("/saveProdDetailsF01")
	public ResponseEntity<?> saveProdDetails(@Valid @RequestBody ProductionDetailLogBook01 productionDetails,
			HttpServletRequest http) {

		ResponseEntity<?> resp = punchingService2.saveProdDetails(productionDetails, http);
		return resp;
	}

	@PostMapping("/submitProdDetailsF01")
	public ResponseEntity<?> submitProdDetails(@Valid @RequestBody ProductionDetailLogBook01 productionDetails,
			HttpServletRequest http) {

		ResponseEntity<?> resp = punchingService2.submitProdDetails(productionDetails, http);
		return resp;
	}

}
