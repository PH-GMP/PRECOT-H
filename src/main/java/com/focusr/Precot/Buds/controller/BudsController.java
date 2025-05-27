package com.focusr.Precot.Buds.controller;

import java.security.Principal;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.Buds.model.BudsDailyProductionSliverHeader;
import com.focusr.Precot.Buds.model.BudsEquipmentUsuageHeader;
import com.focusr.Precot.Buds.model.BudsLogbookHeader;
import com.focusr.Precot.Buds.model.BudsProductChangeOver;
import com.focusr.Precot.Buds.service.BudsService;
import com.focusr.Precot.payload.ApproveResponse;

@RestController
@RequestMapping("/api/buds/Service")
public class BudsController {

	@Autowired
	private BudsService budsService;
	
	/**
	 * PRODUCT CHANGE OVER
	 */
	
	@PostMapping("/saveProductChangeOver")
	public ResponseEntity<?> saveProductChangeOver(@Valid @RequestBody BudsProductChangeOver productChangeOver, HttpServletRequest http) {
		
		ResponseEntity<?> resp = budsService.saveProductChangeOver(productChangeOver, http);
		return resp;
	}
	
	
	@PostMapping("/submitProductChangeOver")
	public ResponseEntity<?> submitProductChangeOver(@Valid @RequestBody BudsProductChangeOver productChangeOver, HttpServletRequest http) {
		
		ResponseEntity<?> resp = budsService.submitProductChangeOver(productChangeOver, http);
		return resp;
	}
	
	@PutMapping("/approveProductChangeOver")
	public ResponseEntity<?> approveProductChangeOver(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = budsService.approveProductChangeOver(approveResponse, http);
		return resp;
	}
	
	@GetMapping("/getProductChangeOver")
	public ResponseEntity<?> productChangeOverByOrder(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String orderNumber = requestParams.get("orderNumber");
		
		ResponseEntity<?> resp = budsService.getProductChangeOverDetailsByUnique(orderNumber);
		return resp;
	}
	
	@GetMapping("/productChangeOverSummary")
	public ResponseEntity<?> getProductChangeOverSummary() {
		
		ResponseEntity<?> resp = budsService.getProductChangeOverSummary();
		return resp;
	}
	
	@GetMapping("/printProductChangeOver")
	public ResponseEntity<?> printProductChangeOverSummary(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String date = requestParams.get("date");
		String machineName = requestParams.get("machineName");
		
		ResponseEntity<?> resp = budsService.printProductChangeOver(date, machineName);
		return resp;
	}
	
	
	/**
	 * DAILY PRODUCTION SLIVER MAKING 
	 */
	
	@PostMapping("/saveSliverProduction")
	public ResponseEntity<?> saveDailyProductionSliverMaking(@Valid @RequestBody BudsDailyProductionSliverHeader productionDetails, HttpServletRequest http) {
		
		ResponseEntity<?> resp = budsService.saveSliverDailyProductionDetails(productionDetails, http);
		return resp;
	}
	
	
	@PostMapping("/submitSliverProduction")
	public ResponseEntity<?> submitDailyProductionSliverMaking(@Valid @RequestBody BudsDailyProductionSliverHeader productionDetails, HttpServletRequest http) {
		
		ResponseEntity<?> resp = budsService.submitProductionDetails(productionDetails, http);
		return resp;
	}
	
	@GetMapping("/getSliverProduction")
	public ResponseEntity<?> getDailyProductionByMachine(@RequestParam Map<String, String> requestParams,
			Principal principal) {
	
		String machineName = requestParams.get("machineName");
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		
		ResponseEntity<?> resp = budsService.getProductionDetailsByMachine(machineName, date, shift);
		return resp;
	}
	
	@GetMapping("/getSliverSummary")
	public ResponseEntity<?> sliverProductionSummary() {
		
		ResponseEntity<?> resp = budsService.getProductionDetailsSummary();
		return resp;
	}
	
	@PutMapping("/approveSliverProduction")
	public ResponseEntity<?> approveSliverProduction(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = budsService.approveSliverProductionDetails(approveResponse, http);
		return resp;
	}
	
	
	@DeleteMapping("/deleteSliverProductionLine")
	public ResponseEntity<?> deleteSliverProductionLine(@RequestParam Map<String, String> requestParams, Principal principal) {
		
		Long id = Long.parseLong(requestParams.get("id"));
		
		ResponseEntity<?> resp = budsService.deleteProductionSliverLine(id);
		return resp;
	}
	
	@DeleteMapping("/deleteStoppageProductionLine")
	public ResponseEntity<?> deleteStoppageProductionLine(@RequestParam Map<String, String> requestParams, Principal principal) {
		
		Long id = Long.parseLong(requestParams.get("id"));
		
		ResponseEntity<?> resp = budsService.deleteProductionStoppageLine(id);
		return resp;
	}
	
	
	@GetMapping("/printSliverProduction")
	public ResponseEntity<?> printDailyProductionSliverHeader(@RequestParam Map<String, String> requestParams, Principal principal) {
		
		String machineName = requestParams.get("machineName");
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		
		ResponseEntity<?> resp = budsService.printDailySliverProduction(machineName, date, shift);
		return resp;
	}
	
	
	/**
	 * LOGBOOK MAKING 
	 */
	
	@PostMapping("/saveLogbook")
	public ResponseEntity<?> saveLogbookMaking(@Valid @RequestBody BudsLogbookHeader logbookHeader, HttpServletRequest http) {
		
		ResponseEntity<?> resp = budsService.saveLogbook(logbookHeader, http);
		return resp;
		
	}
	
	@PostMapping("/submitLogbook")
	public ResponseEntity<?> submitLogbookMaking(@Valid @RequestBody BudsLogbookHeader logbookHeader, HttpServletRequest http) {
		
		ResponseEntity<?> resp = budsService.submitLogbook(logbookHeader, http);
		return resp;
		
	}
	
	@PutMapping("/approveLogbook")
	public ResponseEntity<?> approveLogbookMaking(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
		ResponseEntity<?> resp = budsService.approveLogbook(approveResponse, http);
		return resp;
	}
	
	@GetMapping("/getLogbookMaking")
	public ResponseEntity<?> getLogbookHeaderByBatchNo(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		
		ResponseEntity<?> resp = budsService.getLogbookDetailsByUnique(date, shift);
		return resp;
	}
	
	@GetMapping("/getLogbookSummary")
	public ResponseEntity<?> getLogbookSummary(Principal principal) {
		
		ResponseEntity<?> resp = budsService.getLogbookSummary();
		return resp;
	}
	
	
	@DeleteMapping("/deleteLogbookLine")
	public ResponseEntity<?> deleteLogbookProductionLine(@RequestParam Map<String, String> requestParams, Principal principal) {
		
		Long id = Long.parseLong(requestParams.get("id"));
		
		ResponseEntity<?> resp = budsService.deleteProductionLine(id);
		return resp;
	}
	
	
	@GetMapping("/printLogbookSummary")
	public ResponseEntity<?> printLogbookSummary(@RequestParam Map<String, String> requestParams, Principal principal) {
		
		String year = requestParams.get("year");
		String month = requestParams.get("month");
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		
		ResponseEntity<?> resp = budsService.printLogbookSummary(year, month, date, shift);
		return resp;
	}
	
	
		/**
		 * EQUIPMENT DETAILS
		 */
	
	
	@PostMapping("/saveEquipmentDetails")
	public ResponseEntity<?> saveEquipmentUsuageHeaderDetails(@Valid @RequestBody BudsEquipmentUsuageHeader equipmentDetails, HttpServletRequest http) {
		ResponseEntity<?> resp = budsService.saveEquipmentUsuageHeader(equipmentDetails, http);
		return resp;
	}
	
	@PostMapping("/submitEquipmentDetails")
	public ResponseEntity<?> submitEquipmentDetails(@Valid @RequestBody BudsEquipmentUsuageHeader equipmentDetails, HttpServletRequest http) {
		ResponseEntity<?> resp = budsService.submitEquipmentUsuage(equipmentDetails, http);
		return resp;
	}
	
	@PutMapping("/approveEquipmentDetails")
	public ResponseEntity<?> approveEquipmentDetails(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
		ResponseEntity<?> resp = budsService.approveEquipmentUsuage(approveResponse, http);
		return resp;
	}
	
	@GetMapping("/equipmentDetailSummary")
	public ResponseEntity<?> getEquipmentDetailsSummary(Principal principal) {
		
		ResponseEntity<?> resp = budsService.getEquipmentUsuageSummary();
		return resp;
	}
	
	@GetMapping("/getEquipmentDetails")
	public ResponseEntity<?> getEquipmentDetailsByUnique(@RequestParam Map<String, String> requestParams, Principal principal) {
		
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		String bmrNumber = requestParams.get("bmrNumber");
		
		ResponseEntity<?> resp = budsService.getEquipmentDetailsByUnique(date, shift, bmrNumber);
		return resp;
	}
	
	@DeleteMapping("/deleteEquipmentDetails")
	public ResponseEntity<?> deleteEquipmentDetails(@RequestParam Map<String, String> requestParams, Principal principal) {
		
		Long id = Long.parseLong(requestParams.get("id"));
		
		ResponseEntity<?> resp = budsService.deleteEquipmentUsuageLine(id);
		return resp;
	}
	
	
	@GetMapping("/printEquipmentDetails")
	public ResponseEntity<?> printEquipmentDetails(@RequestParam Map<String, String> requestParams, Principal principal) {
	    
	    String date = requestParams.get("date");
	    String shift = requestParams.get("shift");
	    
	    Integer year = requestParams.containsKey("year") && !requestParams.get("year").isEmpty() 
	            ? Integer.valueOf(requestParams.get("year")) : null;
	    Integer month = requestParams.containsKey("month") && !requestParams.get("month").isEmpty() 
	            ? Integer.valueOf(requestParams.get("month")) : null;

	    ResponseEntity<?> resp = budsService.printEquipmentUsuageDetails(date, shift, year, month);
	    return resp;
	}

	@GetMapping("/qaandqcname")
	public ResponseEntity<?> getqamanager() {

		ResponseEntity<?> responseList = budsService.getqamanager();
		return responseList;
	}

 @GetMapping("/supervisoname")
	public ResponseEntity<?> getsupervisoname() {

		ResponseEntity<?> responseList = budsService.getsupervisoname();
		return responseList;
	}
 @GetMapping("/inspectoroname")
	public ResponseEntity<?> getinspectoroname() {

		ResponseEntity<?> responseList = budsService.getinspectoroname();
		return responseList;
	}

 @GetMapping("/hodname")
	public ResponseEntity<?> gethodname() {

		ResponseEntity<?> responseList = budsService.gethodname();
		return responseList;
	}



	
}
