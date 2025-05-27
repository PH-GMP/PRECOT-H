package com.focusr.Precot.mssql.database.controller.drygoods;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.service.drygoods.DryGoodsTraceabilityService;

@RestController
@RequestMapping("/api/drygoods/traceability")
public class DryGoodsTraceabilityController {

	@Autowired
	private DryGoodsTraceabilityService dryGoodsTraceabilityService;

	// Siva

	@GetMapping("/getTraceblityBatchNoPleat")
	public ResponseEntity<?> getTraceblityBatchNo(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String julianDay = requestParams.get("julianDay");
		String yearLastTwoDigits = requestParams.get("yearLastTwoDigits");

		ResponseEntity<?> resp = dryGoodsTraceabilityService.getTraceblityBatchNo(julianDay, yearLastTwoDigits);
		return resp;
	}

	@GetMapping("/productionDetailsPleat")
	public ResponseEntity<?> getByBatchNo(@RequestParam Map<String, String> requestParams) {

//		String formNo = requestParams.get("formNo");
		String batchNo = requestParams.get("batchNo");

		return dryGoodsTraceabilityService.productionDetailsPleat(batchNo);
	}

	// Gayathri

	@GetMapping("/getTraceblityWollRoll")
	public ResponseEntity<?> getTraceblityWollRoll(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String julianDay = requestParams.get("julianDay");
		String yearLastTwoDigits = requestParams.get("yearLastTwoDigits");

		ResponseEntity<?> resp = dryGoodsTraceabilityService.getTraceblityWollRoll(julianDay, yearLastTwoDigits);
		return resp;
	}
	
	
	
	@GetMapping("/productionDetailsWollRoll")
	public ResponseEntity<?> productionDetailsWollRoll(@RequestParam Map<String, String> requestParams) {

//		String formNo = requestParams.get("formNo");
		String batchNo = requestParams.get("batchNo");

		return dryGoodsTraceabilityService.productionDetailsWollRoll(batchNo);
	}
	
	
	
	// VIJAY 
	
	@GetMapping("/ballsTraceability")
	public ResponseEntity<?> traceablity(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String batchNumber = requestParams.get("batchNumber");
		
		ResponseEntity<?> resp = dryGoodsTraceabilityService.ballsTraceabilityByBatchNumber(batchNumber);
		return resp;
		
	}
	
	
	@GetMapping("/getBallTraceblityBatchNo")
	public ResponseEntity<?> getBallTraceblityBatchNo(@RequestParam Map<String, String> requestParams,
			Principal principal) {
 
		String julianDay = requestParams.get("julianDay");
		String yearLastTwoDigits = requestParams.get("yearLastTwoDigits");
 
		ResponseEntity<?> resp = dryGoodsTraceabilityService.getBallsTraceblityBatchNo(julianDay, yearLastTwoDigits);
		return resp;
	}
	
	
}
