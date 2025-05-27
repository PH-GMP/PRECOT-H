package com.focusr.Precot.mssql.database.controller.splunance;

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

import com.focusr.Precot.mssql.database.model.splunance.SpunlaceRPBalePressStoppageF015;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceShiftWiseRPProdSupportF14;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceShiftWiseStoppageReportF018;
import com.focusr.Precot.mssql.database.service.splunance.SpulanceService2;
import com.focusr.Precot.payload.ApproveResponse;

/**
 * 
 * @author Vijay.R
 * 
 */

@RestController
@RequestMapping("/api/spulance/report")
public class SpulanceController2 {

	@Autowired
	private SpulanceService2 spulanceService2;

	// ---------------------------- F-014 --------------------------

	@PostMapping("/submitRPProdReport")
	public ResponseEntity<?> submitRPProdReport(
			@Valid @RequestBody SpunlaceShiftWiseRPProdSupportF14 baleConsumptionF01, HttpServletRequest http) {

		ResponseEntity<?> resp = spulanceService2.submitRPProdReport(baleConsumptionF01, http);
		return resp;

	}

	@GetMapping("/fetchRPProdReport")
	public ResponseEntity<?> fetchRPProdReportF14(@RequestParam Map<String, String> requestParams, Principal principal,
			HttpServletRequest http) {

		String order = requestParams.get("order");
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");

		ResponseEntity<?> resp = spulanceService2.fetchRPProdReportF14(order, date, shift);
		return resp;
	}
	
	@GetMapping("/PrintRPProdReport")
	public ResponseEntity<?> PrintRPProdReportF14(@RequestParam Map<String, String> requestParams, Principal principal,
			HttpServletRequest http) {

		String order = requestParams.get("order");
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");

		ResponseEntity<?> resp = spulanceService2.PrintRPProdReportF14(order, date, shift);
		return resp;
	}

//	@GetMapping("/supervisorSummaryF014")
//	public ResponseEntity<?> supervisorSummaryF014() {
//		return spulanceService2.supervisorSummaryF014();
//	}
//
//	@GetMapping("/hodSummaryF014")
//	public ResponseEntity<?> hodSummaryF014() {
//		return spulanceService2.hodSummaryF014();
//	}

	@GetMapping("/SummarydetailsF014")
	public ResponseEntity<?> SummarydetailsF014() {

		ResponseEntity<?> records = spulanceService2.SummaryF014();

		return records;

	}
	
	@PutMapping("/approveOrRejectF014")
	public ResponseEntity<?> approveRejectionReportF014(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = spulanceService2.approveRejectionF014(approvalResponse, http);
		return resp;
	}

//  ---------------------------- F-018 BHARKAVI --------------------------

	@PostMapping("/submitShiftWiseStoppage")
	public ResponseEntity<?> submitShiftWiseStoppage(
			@Valid @RequestBody SpunlaceShiftWiseStoppageReportF018 baleConsumptionF01, HttpServletRequest http) {

		ResponseEntity<?> resp = spulanceService2.submitShiftWiseStoppage(baleConsumptionF01, http);
		return resp;

	}

	@GetMapping("/fetchStoppageReport")
	public ResponseEntity<?> fetchStoppageReportF018(@RequestParam Map<String, String> requestParams,
			Principal principal, HttpServletRequest http) {

		String order = requestParams.get("order");
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");

		ResponseEntity<?> resp = spulanceService2.fetchStoppageReportF018(order, date, shift);
		return resp;
	}
	
	// PRINT BY PASSING DATE - F-018
	
	@GetMapping("/printStoppageReport")
	public ResponseEntity<?> printStoppageReportF018(@RequestParam Map<String, String> requestParams,
			Principal principal, HttpServletRequest http) {

		String date = requestParams.get("date");

		ResponseEntity<?> resp = spulanceService2.printStoppageReportF018(date);
		return resp;
	}

	@GetMapping("/hodSummaryF018")
	public ResponseEntity<?> hodSummaryF018() {
		return spulanceService2.hodSummaryF018();
	}
	
	@PutMapping("/approveOrRejectF018")
	public ResponseEntity<?> approveRejectionReportF018(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = spulanceService2.approveRejectionF018(approvalResponse, http);
		return resp;
	}

//  ---------------------------- F-015 --------------------------

	@PostMapping("/submitRPBalePressStopage")
	public ResponseEntity<?> submitRPBalePressStopage(
			@Valid @RequestBody SpunlaceRPBalePressStoppageF015 baleConsumptionF01, HttpServletRequest http) {

		ResponseEntity<?> resp = spulanceService2.submitRPBalePressStopage(baleConsumptionF01, http);
		return resp;

	}

	@GetMapping("/fetchRPBalePressStopage")
	public ResponseEntity<?> fetchRPBalePressStopage(@RequestParam Map<String, String> requestParams,
			Principal principal, HttpServletRequest http) {

		String order = requestParams.get("order");
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");

		ResponseEntity<?> resp = spulanceService2.fetchRPBalePressStopage(order, date, shift);
		return resp;
	}
	
	@GetMapping("/printRPBalePressStopage")
	public ResponseEntity<?> printRPBalePressStopageF015(@RequestParam Map<String, String> requestParams,
			Principal principal, HttpServletRequest http) {

		String date = requestParams.get("date");

		ResponseEntity<?> resp = spulanceService2.printRPBalePressStopageF015(date);
		return resp;
	}

	@GetMapping("/hodSummaryF015")
	public ResponseEntity<?> hodSummaryF015() {
		return spulanceService2.hodSummaryF015();
	}
	
	// GET BY DATE F018
	
		@GetMapping("/getByDateF018")
		public ResponseEntity<?> getByDateF018(@RequestParam Map<String, String> requestParams,
				Principal principal, HttpServletRequest http) {
	 
			String date = requestParams.get("date");
	 
			ResponseEntity<?> resp = spulanceService2.getByDateF018(date);
			return resp;
		}
	 
		// GET BY DATE F015
		
		@GetMapping("/getByDateF015")
		public ResponseEntity<?> getByDateF015(@RequestParam Map<String, String> requestParams,
				Principal principal, HttpServletRequest http) {
	 
			String date = requestParams.get("date");
	 
			ResponseEntity<?> resp = spulanceService2.getByDateF015(date);
			return resp;
		}
		
		@PutMapping("/approveOrRejectF015")
		public ResponseEntity<?> approveRejectionReportF015(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
			
			ResponseEntity<?> resp = spulanceService2.approveRejectionF015(approvalResponse, http);
			return resp;
		}
}
