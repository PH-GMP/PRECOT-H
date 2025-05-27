package com.focusr.Precot.mssql.database.controller.padpunching;

import java.security.Principal;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.QA.model.QaOnlineInspectionReport;
import com.focusr.Precot.QA.payload.PunchingTracebilityPayload;
import com.focusr.Precot.mssql.database.service.padpunching.PadPunchingTracebilityService;
import com.focusr.Precot.payload.ApiResponse;

@RestController
@RequestMapping("/api/punching/tracebility")
public class PadpunchingTracebilityController {

	Logger logger = LoggerFactory.getLogger(PadPunchingPdeController.class);

	@Autowired
	private PadPunchingTracebilityService padPunchingTracebilityService;
	
	@GetMapping("/getTraceblityBatchNo")
	public ResponseEntity<?> getTraceblityBatchNo(@RequestParam Map<String, String> requestParams,
			Principal principal) {
 
		String julianDay = requestParams.get("julianDay");
		String yearLastTwoDigits = requestParams.get("yearLastTwoDigits");
 
		ResponseEntity<?> resp = padPunchingTracebilityService.getTraceblityBatchNo(julianDay, yearLastTwoDigits);
		return resp;
	}
	
	
	
	 @GetMapping("/getCompleteTracebilityDetails")
	    public ResponseEntity<?> getCompleteTracebilityDetails(@RequestParam String batchNo) {
	        PunchingTracebilityPayload result = padPunchingTracebilityService.getCompleteTracebilityDetails(batchNo);
	        if (result != null) {
	            return ResponseEntity.ok(result);
	        } else {
	            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Data Found");
	        }
	    }
	
	
//	//Get PadPunchingProdDetails
//	
//		@GetMapping("/getPadPunchingProdDetails")
//		public ResponseEntity<?> getPadPunchingProdDetails(@RequestParam String batchNo) {
//			return padPunchingTracebilityService.getPunchingBmrProdDetails(batchNo);
//		}
//		
//		
//		//Get PadPunchingProdDetailsTblOrderInfo
//		
//			@GetMapping("/padPunchingProdDetailsTblOrderInfo")
//			public ResponseEntity<?> PadPunchingProdDetailsTblOrderInfo(@RequestParam String pOrder) {
//				return padPunchingTracebilityService.getPunchingBmrProdDetailsTblOrderInfo(pOrder);
//			}
//			
//			// Get PadPunchingRollConsumptionDetailsTracebility
//
//			@GetMapping("/padPunchingRollConsumptionDetailsTracebility")
//			public ResponseEntity<?> PadPunchingRollConsumptionDetails(@RequestParam String pOrder) {
//				return padPunchingTracebilityService.getPunchingRollConsumptionDetails(pOrder);
//			}
//		
//		
//	
////Get OnlineInspectionDetails
//	
//	@GetMapping("/getOnlineInspectionDetailsTracebility")
//	public ResponseEntity<?> getOnlineInspectionDetailsTracebility(@RequestParam String bmrNo) {
//		return padPunchingTracebilityService.getByDateShiftMachineNoBmrPOrder(bmrNo);
//	}
//
////	Get FinalInspectionDetails
//	
//	@GetMapping("/getFinalInspectionTracebility")
//	public ResponseEntity<?> getFinalInspectionTracebility(@RequestParam String bmrNo) {
//		return padPunchingTracebilityService.getFinalInspectionDetails(bmrNo);
//	}
//
////	Get PackingDetails
//	
//	@GetMapping("/getPackingDetailsTracebility")
//	public ResponseEntity<?> getPackingDetailsTracebility(@RequestParam String batchNo) {
//		return padPunchingTracebilityService.getPackingDetails(batchNo);
//	}

	
}

