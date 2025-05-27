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

import com.focusr.Precot.mssql.database.model.splunance.SplunanceBaleConsumptionF01;
import com.focusr.Precot.mssql.database.service.splunance.SpulanceService5;
import com.focusr.Precot.payload.ApproveResponse;

/**
 * F01
 * 
 * @author Jawahar.M
 *
 */

@RestController
@RequestMapping("/api/spulance")
public class SpulanceController5 {

	@Autowired
	private SpulanceService5 spulanceService5;

	@PostMapping("/submitBaleConsumption")
	public ResponseEntity<?> submitBaleConsumptionF01(
			@Valid @RequestBody SplunanceBaleConsumptionF01 baleConsumptionF01, HttpServletRequest http) {

		ResponseEntity<?> resp = spulanceService5.submitBaleConsumptionF01(baleConsumptionF01, http);
		return resp;
	}

	@GetMapping("/fetchBaleConsumption")
	public ResponseEntity<?> fetchBaleConsumptionF01(@RequestParam Map<String, String> requestParams,
			Principal principal, HttpServletRequest http) {

		String order = requestParams.get("order");
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");

		ResponseEntity<?> resp = spulanceService5.getBaleConsumptionByOrder(order, date, shift);
		return resp;
	}

	@GetMapping("/supervisorSummaryF001")
	public ResponseEntity<?> supervisorSummaryF001() {
		return spulanceService5.supervisorSummaryF001();
	}

//	@GetMapping("/hodSummaryF001")
//    public ResponseEntity<?> hodSummaryF001() {
//        return spulanceService5.hodSummaryF001();
//    }

	@GetMapping("/approvedBaleConsumptions")
	public ResponseEntity<?> fetchApprovedBaleConsumption(@RequestParam String order, @RequestParam String date,
			@RequestParam(required = false) String shift) {
		ResponseEntity<?> resp = spulanceService5.fetchApprovedBaleConsumptions(order, date, shift);
		return resp;
	}

	@PutMapping("/approveOrRejectF001")
	public ResponseEntity<?> approveRejectionReportF001(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = spulanceService5.approveRejectionF001(approvalResponse, http);
		return resp;
	}

	// new Bmr

	@GetMapping("/getBaleConsumptionDetails")
	public ResponseEntity<?> getBaleConsumptionDetails(@RequestParam Map<String, String> requestParams,
			Principal principal, HttpServletRequest http) {
		String order = requestParams.get("order");
		ResponseEntity<?> resp = spulanceService5.getBaleConsumptionDetails(order);
		return resp;
	}

}
