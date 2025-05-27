package com.focusr.Precot.mssql.database.controller.drygoods;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.model.drygoods.DryGoodsHouseKeepingCheckListF14;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.drygoods.DryGoodsService2;
import com.focusr.Precot.payload.ApproveResponse;

@RestController
@RequestMapping("/api/Drygoods/Service")
public class DryGoodsController2 {

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private DryGoodsService2 dryGoodsService2;

	// SUBMIT 
	
	@PostMapping("/SubmitHouseKeepingF14")
	public ResponseEntity<?> SubmitHouseKeepingF14(

			@Valid @RequestBody DryGoodsHouseKeepingCheckListF14 SubmitHouseKeepingF14, BindingResult result,
			Principal principal, HttpServletRequest http) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = dryGoodsService2.SubmitHouseKeepingF14(SubmitHouseKeepingF14, http);

		return response;
	}

	// GET BY DATE
	
	@GetMapping("/getDateHouseKeepingF14")
	public ResponseEntity<?> getHouseKeepingF14(@RequestParam String date, HttpServletRequest http) {

		ResponseEntity<?> response = dryGoodsService2.getHouseKeepingF14(date, http);

		return response;
	}
	
	// SUMMARY FOR ALL ROLES
	
	@GetMapping("/getHouseKeepingSummaryF14")
	public ResponseEntity<?> getHouseKeepingSummaryF14(HttpServletRequest http) {

		ResponseEntity<?> response = dryGoodsService2.getHouseKeepingSummaryF14(http);

		return response;
	}
	
	// PRINT
	
	@GetMapping("/getHouseKeepingMonthYearSummaryF14")
	public ResponseEntity<?> getHouseKeepingMonthYearSummaryF14(@RequestParam String month, @RequestParam String year) {

		ResponseEntity<?> response = dryGoodsService2.getHouseKeepingMonthYearSummaryF14(month, year);

		return response;
	}
	
	// APPROVE OR REJECT
	
	@PutMapping("/approveRejectF14")
	public ResponseEntity<?> approveRejectHouseKeepingF14(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = dryGoodsService2.approveRejectHouseKeepingF14(approveResponse, http);
		return resp;
		
	}

}
