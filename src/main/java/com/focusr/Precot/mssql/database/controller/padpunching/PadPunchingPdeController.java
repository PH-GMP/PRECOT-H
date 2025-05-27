package com.focusr.Precot.mssql.database.controller.padpunching;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.service.padpunching.PadPunchingPdeService;

@RestController
@RequestMapping("/api/padpunching")
public class PadPunchingPdeController {

	Logger logger = LoggerFactory.getLogger(PadPunchingPdeController.class);

	@Autowired
	private PadPunchingPdeService padPunchingPdeService;

	// F004
	@GetMapping("/productionpackingDetails")
	public ResponseEntity<?> getProductionpackingDetails(@RequestParam Map<String, String> requestParams) {

		String date = requestParams.get("date");
		String shift = requestParams.get("shift");

		ResponseEntity<?> responseList = padPunchingPdeService.getProductionpackingDetails(date, shift);
		return responseList;
	}

	// F003
	@GetMapping("/orderNoList")
	public ResponseEntity<?> getOrdersWithPadsCategory() {

		ResponseEntity<?> responseList = padPunchingPdeService.getOrdersWithPadsCategory();
		return responseList;
	}
	

	@GetMapping("/packingDetailsRunning")
	public ResponseEntity<?> findPackingDetailsRunning(@RequestParam Map<String, String> requestParams) {

		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		String machineName = requestParams.get("machineName");
		String orderNo = requestParams.get("orderNo");

		ResponseEntity<?> responseList = padPunchingPdeService.findPackingDetailsRunning(date, shift, machineName,
				orderNo);
		return responseList;
	}

//	@GetMapping("/findPackingDetailsNext")
//	public ResponseEntity<?> findPackingDetailsNext(@RequestParam Map<String, String> requestParams) {
//
//		String date = requestParams.get("date");
//		String shift = requestParams.get("shift");
//		String machineName = requestParams.get("machineName");
//		String orderNo = requestParams.get("orderNo");
//
//		ResponseEntity<?> responseList = padPunchingPdeService.findPackingDetailsNext(date, shift,machineName,orderNo);
//		return responseList;
//	}

//Bag Making Daily Production Detiail PdeF-001	

	@GetMapping("/api/bag-details")
	public List<Map<String, Object>> getBagDetails(@RequestParam String date, @RequestParam String shift) {
		try {
			return padPunchingPdeService.getBagDetailsDailyProductionPde(date, shift);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); // You can replace this with a proper logging statement

			Map<String, Object> errorMap = new HashMap<>();
			errorMap.put("error", "Unable to retrieve daily roll consumption details");
			errorMap.put("message", e.getMessage());

			List<Map<String, Object>> errorList = new ArrayList<>();
			errorList.add(errorMap);
			return errorList;

		}

	}

//Bag Making Log Book

	@GetMapping("/api/LogBooks-details")
	public List<Map<String, Object>> getBagDetailsLogBook() {
		try {
			return padPunchingPdeService.getBagDetailsLogBookPde();

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); // You can replace this with a proper logging statement

			Map<String, Object> errorMap = new HashMap<>();
			errorMap.put("error", "Unable to retrieve daily roll consumption details");
			errorMap.put("message", e.getMessage());

			List<Map<String, Object>> errorList = new ArrayList<>();
			errorList.add(errorMap);
			return errorList;

		}
	}

	// Daily Roll Consumption Detail 2

	@GetMapping("/api/DailyRollConsumptionDetail1")
	public List<Map<String, Object>> getDailyRollConsumptionDetails1(@RequestParam String ConsDt,@RequestParam String mcn,@RequestParam String shiftId) {
		try {
			return padPunchingPdeService.getDailyRollConsumptionDetails1(ConsDt,mcn,shiftId);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); // You can replace this with a proper logging statement

			Map<String, Object> errorMap = new HashMap<>();
			errorMap.put("error", "Unable to retrieve daily roll consumption details");
			errorMap.put("message", e.getMessage());

			List<Map<String, Object>> errorList = new ArrayList<>();
			errorList.add(errorMap);
			return errorList;

		}
	}

	@GetMapping("/api/DailyRollConsumption2")
	public List<Map<String, Object>> getDailyRollConsumptionDetails2(@RequestParam String ConsDt,
			@RequestParam String POrder,@RequestParam String ShiftId) {
		try {
 
			return padPunchingPdeService.getDailyRollConsumptionDetails2(ConsDt, POrder,ShiftId);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); // You can replace this with a proper logging statement
 
			Map<String, Object> errorMap = new HashMap<>();
			errorMap.put("error", "Unable to retrieve daily roll consumption details");
			errorMap.put("message", e.getMessage());
 
			List<Map<String, Object>> errorList = new ArrayList<>();
			errorList.add(errorMap);
			return errorList;
 
		}
 
	}

	@GetMapping("/api/DailyRollConsumption3")
	public List<Map<String, Object>> getDailyRollConsumptionDetails3(@RequestParam String PackDt,
			@RequestParam String ShiftID,@RequestParam String mcn) {

		try {

			return padPunchingPdeService.getDailyRollConsumptionDetails3(PackDt, ShiftID,mcn);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); // You can replace this with a proper logging statement

			Map<String, Object> errorMap = new HashMap<>();
			errorMap.put("error", "Unable to retrieve daily roll consumption details");
			errorMap.put("message", e.getMessage());

			List<Map<String, Object>> errorList = new ArrayList<>();
			errorList.add(errorMap);
			return errorList;
		}
	}
	
	//LogBookBagMaking
	
	@GetMapping("/api/LogBookBagMakingStoppage")
	public List<Map<String, Object>> getLogBookBagMaking(@RequestParam String PackDt,
			@RequestParam String ShiftID) {

		try {

			return padPunchingPdeService.getLogBookBagMaking(PackDt, ShiftID);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); // You can replace this with a proper logging statement

			Map<String, Object> errorMap = new HashMap<>();
			errorMap.put("error", "Unable to retrieve LogBookBagMakingStoppage details");
			errorMap.put("message", e.getMessage());

			List<Map<String, Object>> errorList = new ArrayList<>();
			errorList.add(errorMap);
			return errorList;

		}
	}
	
	@GetMapping("/MachineLov")
	public ResponseEntity<?> getMachineNameList(){
		
		ResponseEntity<?> responseList = padPunchingPdeService.getMachineLov();
		return responseList;
		
	}
	
//	PRODUCTION LOGBOOK
	
	@GetMapping("/getProductionDetails")
	public ResponseEntity<?> getProductionDetails(@RequestParam Map<String, String> requestParams) {
 
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		String machine = requestParams.get("machine");
		String orderNo = requestParams.get("orderNo");
 
 
		ResponseEntity<?> responseList = padPunchingPdeService.getProductionDetailList(date,shift, machine,orderNo);
		return responseList;
	}
	
//	OPENING QUANTITY
	
	 @GetMapping("/opening-qty")
	    public ResponseEntity<?> getOpeningQty(
	            @RequestParam String orderNo,
	            @RequestParam String packDate) {
	        return padPunchingPdeService.getOpeningQty(orderNo, packDate);
	    }

}
