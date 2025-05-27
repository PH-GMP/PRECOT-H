package com.focusr.Precot.mssql.database.controller.bleaching;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.model.bleaching.BleachEquipmentUsageLogBookF33;
import com.focusr.Precot.mssql.database.model.bleaching.BleachLayDownCheckListF42;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.bleaching.BleachingService2;
import com.focusr.Precot.payload.ApprovalResponse;
import com.focusr.Precot.payload.ApproveResponse;

/*
 * F42 - LAYDOWN CHECKLIST
 * F33 - WASTE BALE PRESS
 */

@RestController
@RequestMapping("/api/Bleaching/Service/CRUD")
public class BleachingController2 {

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private BleachingService2 bleachingService2;

	// FORMAT NO = PRD01/F-33 - SAVE

	@PostMapping("/saveEquipmentUsageF33")
	public ResponseEntity<?> saveMixchMachineF38(@Valid @RequestBody List<BleachEquipmentUsageLogBookF33> detailsList,
			HttpServletRequest http, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> Response = bleachingService2.saveEquipmentUsageF33(detailsList, http);

		return Response;
	}

	// FORMAT NO = PRD01/F-33 - SUPERVISOR SUBMIT

	@PostMapping("/submitEquipmentUsageF33")
	public ResponseEntity<?> submitEquipmentUsageF33(
			@Valid @RequestBody List<BleachEquipmentUsageLogBookF33> detailsList, BindingResult result,
			HttpServletRequest http, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> Response = bleachingService2.submitEquipmentUsageF33(detailsList, http);

		return Response;
	}

	@GetMapping("/EquipmentUsageF33/GetById/{id}")
	public ResponseEntity<?> getBleachContRawCottonById(@PathVariable Long id) {
		return bleachingService2.getEquipmentUsageById(id);
	}

	// GET BY DATE AND FOR APPROVAL GET LIST

	@GetMapping("/EquipmentUsageF33/GetByDate")
	public ResponseEntity<?> getBleachContRawCottonByDate(@RequestParam String date, HttpServletRequest http,
			Principal principal) {

		ResponseEntity<?> message = bleachingService2.getEquipmentUsageByDate(date, http);

		return message;
	}
	
//	@GetMapping("/EquipmentUsageF33/GetByDatePrint")
//	public ResponseEntity<?> getBleachContRawCottonByDatePrint(@RequestParam String date, HttpServletRequest http,
//			Principal principal) {
//
//		ResponseEntity<?> message = bleachingService2.wasteBaleApprovalPrint(date, http);
//
//		return message;
//	}
	
	
	@GetMapping("/EquipmentUsageF33/GetByDatePrint")
	public ResponseEntity<?> getBleachContRawCottonByDatePrint(@RequestParam Map<String, String> requestParams, HttpServletRequest http,
			Principal principal) {
		
//		String date = requestParams.get("date");
		
		String fromDate = requestParams.get("fromDate");
		String toDate = requestParams.get("toDate");
		
		
		 Integer month = requestParams.get("month") != null && !requestParams.get("month").isEmpty() 
			     ? Integer.valueOf(requestParams.get("month")) 
			     : null;

			 Integer year = requestParams.get("year") != null && !requestParams.get("year").isEmpty() 
			     ? Integer.valueOf(requestParams.get("year")) 
			     : null;
		ResponseEntity<?> message = bleachingService2.wasteBaleApprovalPrint(year, month, fromDate,toDate, http);

		return message;
	}
	

	@GetMapping("/EquipmentUsageF33/GetAll2")
	public ResponseEntity<?> getAllBleachContRawCotton() {
		return bleachingService2.getAllEquipmentUsage();
	}
	
	// SUMMARY UNIQUE RECORD
	
	@GetMapping("/EquipmentUsageF33/GetAll")
	public ResponseEntity<?> getSummary(HttpServletRequest http) {
		return bleachingService2.getSummary(http);
	}

	//
	//
	//
	//
	//
	//
	//
	//
	//

	// FORMAT NO = PRD01/F-42

	@PostMapping("/saveLayDownCheckF42")
	public ResponseEntity<?> saveLayDownCheckF42(@Valid @RequestBody BleachLayDownCheckListF42 details,
			HttpServletRequest http, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> Response = bleachingService2.saveLayDownCheckF42(details, http);

		return Response;
	}

	@PostMapping("/submitLayDownCheckF42")
	public ResponseEntity<?> submitLayDownCheckF42(@Valid @RequestBody BleachLayDownCheckListF42 details,
			HttpServletRequest http, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> Response = bleachingService2.submitLayDownCheckF42(details, http);

		return Response;
	}

	@GetMapping("/LaydownChechListF33/GetById/{id}")
	public ResponseEntity<?> getLaydownChechListById(@PathVariable Long id) {
		return bleachingService2.getLaydownChechListById(id);
	}

	@GetMapping("/LaydownChechListF33/GetAll")
	public ResponseEntity<?> getAllLaydownChechList() {
		return bleachingService2.getAllLaydownChechList();
	}
	
	
	@PutMapping("/approveLaydown")
	public ResponseEntity<?> approveLaydownChecklist(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bleachingService2.approveLaydownCheckList(approvalResponse, http);
		return resp;
	}
	
	@PutMapping("/approveWasteBaleF33")
	public ResponseEntity<?> approveWastebaleF33(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bleachingService2.approveRejectWasteBale(approvalResponse, http);
		return resp;
	}
	

	// GET BY TOKEN - SUMMARY

	@GetMapping("/LaydownChechListF33Summary")
	public ResponseEntity<?> LaydownChechListSummary(HttpServletRequest http, Principal principal) {

		ResponseEntity<?> message = bleachingService2.LaydownChechListSummary(http);

		return message;
	}

	@GetMapping("/LaydownChechListF33/GetByBMR")
	public ResponseEntity<?> getLaydownChechListByBmr(@RequestParam String formatNo, String bmrNo,
			HttpServletRequest http, Principal principal) {

		ResponseEntity<?> message = bleachingService2.getLaydownChechListByBmr(formatNo, bmrNo, http);

		return message;
	}

	// GET NEW FORMAT_NO , BMR_NO , LAYDOWN_NO // NEW

	@GetMapping("/LaydownChechListF33")
	public ResponseEntity<?> getLaydownChechList(@RequestParam String formatNo, String bmrNo, String layDownNo,
			HttpServletRequest http, Principal principal) {

		ResponseEntity<?> message = bleachingService2.getLaydownChechList(formatNo, bmrNo, layDownNo, http);

		return message;
	}
	
	@GetMapping("/getByLaydown")
	public ResponseEntity<?> getByLaydown(@RequestParam String layDownNo,
			HttpServletRequest http, Principal principal) {

		ResponseEntity<?> message = bleachingService2.getByLaydown(layDownNo, http);

		return message;
	}
	
	@GetMapping("/GetBaleNo")
	public ResponseEntity<?> GetBaleNO() {
		return bleachingService2.GetBaleNO();
	}

	@GetMapping("/EquipmentUsageSummary")
		public ResponseEntity<?> getSummaryNew(HttpServletRequest http) {
			return bleachingService2.getSummaryNew(http);
		}
	
	//Print
	
	@GetMapping("/LayDownChecklistDetailsF42")
	public ResponseEntity<?> LayDownChecklist(@RequestParam String layDownNo) {
 
		ResponseEntity<?> response = bleachingService2.LayDownChecklist(layDownNo);
 
		return response;
	}
	
	@GetMapping("/LayDownCheckHodApprovalF42")
	public ResponseEntity<?> LayDownChecklistHodApproval() {
 
		ResponseEntity<?> response = bleachingService2.laydownCheckListHOD();
 
		return response;
	}
	
	
		// CR - SIGNOFF
	
	@GetMapping("/getSharpCutterTools")
	public ResponseEntity<?> getSharpCutterTools() {
		
		ResponseEntity<?> resp = bleachingService2.getStrapCutterTools();
		return resp;
	}

}
