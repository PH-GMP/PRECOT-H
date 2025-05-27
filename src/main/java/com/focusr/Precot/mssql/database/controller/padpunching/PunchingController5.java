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

import com.focusr.Precot.mssql.database.model.padpunching.PunchingHandSanitationF24;
import com.focusr.Precot.mssql.database.model.padpunching.PunchingProductChangeOverF03;
import com.focusr.Precot.mssql.database.service.padpunching.PunchingService5;
import com.focusr.Precot.payload.ApprovalResponse;
import com.focusr.Precot.payload.ApproveResponse;

/**
 * 
 * @author Jawahar.M
 * -- F03, PRODUCT CHANGE OVER
 * -- F24, HAND SANITATION 
 */

@RestController
@RequestMapping("/api/punching")
public class PunchingController5 {

	@Autowired
	private PunchingService5 punchingService5;
	
	@PostMapping("/saveProductChangeOverF03")
	public ResponseEntity<?> saveProductChangeOver(@Valid @RequestBody PunchingProductChangeOverF03 productChangeOver, HttpServletRequest http) {
		
		ResponseEntity<?> resp = punchingService5.saveProductChangeOver(productChangeOver, http);
		return resp;
	}
	
	@PostMapping("/submitProductChangeOverF03")
	public ResponseEntity<?> submitProductChangeOver(@Valid @RequestBody PunchingProductChangeOverF03 productChangeOver, HttpServletRequest http) {
		
		ResponseEntity<?> resp = punchingService5.submitProductChangeOver(productChangeOver, http);
		return resp;
	}
	
	@GetMapping("/summaryproductChangeOverF03")
	public ResponseEntity<?> getSummary() {
		ResponseEntity<?> resp = punchingService5.getSummaryRoles();
		return resp;
	}
	
	@GetMapping("/getproductChangeOverF03")
	public ResponseEntity<?> getProductChangeDetails(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		String machine = requestParams.get("machine");
		
		ResponseEntity<?> resp = punchingService5.getProductDetailsbyUniquefIELD(date, shift, machine);
		return resp;
	}
	
	
	@PutMapping("/approveProductChangeOverF03")
	public ResponseEntity<?> approveOrRejectProductChangeOver(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = punchingService5.approveRejectProductChangeOver(approvalResponse, http);
		return resp;
		
	}
	
	
	@GetMapping("/getproductChangeOverPrintF03")
	public ResponseEntity<?> getProductChangeDetailsPrint(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		String machine = requestParams.get("machine");
		
		ResponseEntity<?> resp = punchingService5.fetchPunchingPrintParameters(date, shift, machine);
		return resp;
	}
	
				
			// HAND SANITATION LIST - F24
	
	@PostMapping("/saveHandSanitationF24")
	public ResponseEntity<?> saveHandSanitationList(@Valid @RequestBody PunchingHandSanitationF24 handSanitationF24, HttpServletRequest http) {
		
		ResponseEntity<?> resp = punchingService5.saveHandSanitation(handSanitationF24, http);
		return resp;
		
	}
	
	
	@PostMapping("/submitHandSanitationF24")
	public ResponseEntity<?> submitHandSanitationList(@Valid @RequestBody PunchingHandSanitationF24 handSanitationF24, HttpServletRequest http) {
		
		ResponseEntity<?> resp = punchingService5.submitHandSanitationReport(handSanitationF24, http);
		return resp;
		
	}
	
	@GetMapping("/getHandSanitationF24")
	public ResponseEntity<?> getHandSanitationByParams(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		
		ResponseEntity<?> resp = punchingService5.getHandSanitationByDateShift(date, shift);
		return resp;
	}
	
	
	@GetMapping("/getHandSanitationSummaryF24")
	public ResponseEntity<?> getHandSanitationSummarry() {
		
		ResponseEntity<?> resp = punchingService5.getHandSanitationSummary();
		return resp;
	}
	
	@PutMapping("/approveHandSanitationF24")
	public ResponseEntity<?> approveOrRejectHandSanitation(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = punchingService5.approveOrRejectHandSanitation(approvalResponse, http);
		return resp;
		
	}
	
	@GetMapping("/getHandSanitationPrintF24")
	public ResponseEntity<?> getHandSanitationByPrintParams(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		
		ResponseEntity<?> resp = punchingService5.handSanitationPrint(date, shift);
		return resp;
	}
	
	
	
	
	
}
