package com.focusr.Precot.mssql.database.controller.drygoods;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.model.drygoods.LogBookHeader;
import com.focusr.Precot.mssql.database.model.drygoods.MiniRoll;
import com.focusr.Precot.mssql.database.model.drygoods.SanitizationDetails;
import com.focusr.Precot.mssql.database.model.drygoods.SliverMakingHeader;
import com.focusr.Precot.mssql.database.repository.drygoods.LogBookHeaderRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.MiniRollRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.SanitiziationMachineSurfaceRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.SliverMakingHeaderRepository;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.drygoods.DrygoodsService4;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
/*
 * F02
 * F05
 */

@RestController
@RequestMapping("/api/Drygoods/Service")
public class DrygoodsController4 {

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private DrygoodsService4 drygoodsservice4;

	@Autowired
	private SliverMakingHeaderRepository slivermakingheaderrepository;

	@Autowired
	private MiniRollRepository minirollrepository;

	@Autowired
	private LogBookHeaderRepository logbookheaderrepository;
	
	@Autowired
	private SanitiziationMachineSurfaceRepository sanitiziationmachinesurfacerepository;
	


	@PostMapping("/saveSliverDetails02")
	public ResponseEntity<?> saveSliverDetails02(HttpServletRequest http,
			@Valid @RequestBody SliverMakingHeader slivermakingheader, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = drygoodsservice4.saveSliverDetails02(slivermakingheader, http);

		return response;

	}

	@PostMapping("/submitSliverDetails02")
	public ResponseEntity<?> submitSliverDetails02(HttpServletRequest http,
			@Valid @RequestBody SliverMakingHeader slivermakingheader, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = drygoodsservice4.submitSliverDetails02(slivermakingheader, http);

		return response;

	}

	// approve or reject
	@PutMapping("/approveOrReject")
	public ResponseEntity<?> approveOrReject(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = drygoodsservice4.approveOrReject(approvalResponse, http);
		return resp;
	}

	@GetMapping("/getOperSummarydetailsF02")
	public ResponseEntity<?> getOperSummarydetailsF02() {

		ResponseEntity<?> records = drygoodsservice4.getOperSummarydetailsF02();

		return records;

	}

	@GetMapping("/getSliverSummarydetailsF02")
	public ResponseEntity<?> getSummarydetailsF001() {

		ResponseEntity<?> records = drygoodsservice4.getSummarydetailsF02();

		return records;

	}

	@GetMapping("/getSliverdetailsbyF02")
	public ResponseEntity<?> getdetailsByParamF001(@RequestParam String machine_name, @RequestParam String date,
			@RequestParam String shift , @RequestParam String order_no) {
		try {
			List<SliverMakingHeader> records = slivermakingheaderrepository.getdetailsbyParam(machine_name, date, shift,order_no);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getsliverDetailsForPrintF01")
	public ResponseEntity<?> getdetailsForPrintF001(@RequestParam(required = false) String machine_name,
			@RequestParam(required = false) String date, @RequestParam(required = false) String shift,
			@RequestParam(required = false) String order_no
			) {
		try {
			List<SliverMakingHeader> records = slivermakingheaderrepository.printParam(machine_name, date, shift,order_no);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	// F05

	@PostMapping("/saveMiniRollDetails05")
	public ResponseEntity<?> saveMiniRollDetails05(HttpServletRequest http, @Valid @RequestBody MiniRoll miniroll,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = drygoodsservice4.saveMiniRollDetails05(miniroll, http);

		return response;

	}

	@PostMapping("/submitMiniRollDetails05")
	public ResponseEntity<?> submitMiniRollDetails05(HttpServletRequest http, @Valid @RequestBody MiniRoll miniroll,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = drygoodsservice4.submitMiniRollDetails05(miniroll, http);

		return response;

	}

	// approve or reject
	@PutMapping("/approveOrReject05")
	public ResponseEntity<?> approveOrReject05(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = drygoodsservice4.approveOrReject05(approvalResponse, http);
		return resp;
	}

	@GetMapping("/getOperatorSummarydetailsF05")
	public ResponseEntity<?> getOperatorSummarydetailsF05() {

		ResponseEntity<?> records = drygoodsservice4.getOperatorSummarydetailsF05();

		return records;

	}

	@GetMapping("/getHodSummarydetailsF05")
	public ResponseEntity<?> getSummarydetailsF05() {

		ResponseEntity<?> records = drygoodsservice4.getSummarydetailsF05();

		return records;

	}

	@GetMapping("/getRolldetailsbyF05")
	public ResponseEntity<?> getRolldetailsbyF05(@RequestParam String date, @RequestParam String shift,@RequestParam String order_no) {
		try {
			MiniRoll records = minirollrepository.getdetailsbyParam(date, shift, order_no);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getRollForPrintF05")
	public ResponseEntity<?> getRollForPrintF05(

			@RequestParam(required = false) String date, 
			@RequestParam(required = false) String shift,
			@RequestParam(required = false) String order_no ) {
		try {
			List<MiniRoll> records = minirollrepository.printParam(date, shift, order_no);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	// F10

	@PostMapping("/saveLogBookF10")
	public ResponseEntity<?> saveLogBookF10(HttpServletRequest http, @Valid @RequestBody LogBookHeader logbookheader,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = drygoodsservice4.saveLogBookF10(logbookheader, http);

		return response;

	}

	@PostMapping("/submitLogBookF10")
	public ResponseEntity<?> submitLogBookF10(HttpServletRequest http, @Valid @RequestBody LogBookHeader logbookheader,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = drygoodsservice4.submitLogBookF10(logbookheader, http);

		return response;

	}

	// approve or reject
	@PutMapping("/approveOrRejectF10")
	public ResponseEntity<?> approveOrRejectF10(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = drygoodsservice4.approveOrRejectF10(approvalResponse, http);
		return resp;
	}

	//
	@GetMapping("/getSupSummarydetailsF10")
	public ResponseEntity<?> getOperSummarydetailsF10() {

		ResponseEntity<?> records = drygoodsservice4.getSupSummarydetailsF10();

		return records;

	}

	@GetMapping("/getHodSummarydetailsF10")
	public ResponseEntity<?> getHodSummarydetailsF10() {

		ResponseEntity<?> records = drygoodsservice4.getHodSummarydetailsF10();

		return records;

	}

	@GetMapping("/getDryParamF10")
	public ResponseEntity<?> getDryGooodsF10(@RequestParam String date, @RequestParam String shift) {
		try {
			LogBookHeader records = logbookheaderrepository.getdetailsbyParam(date, shift);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getDryForPrintF10")
	public ResponseEntity<?> getDryForPrintF10(

			@RequestParam(required = false) String date, @RequestParam(required = false) String shift) {
		try {
			List<LogBookHeader> records = logbookheaderrepository.printParam(date, shift);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	
	/*
	 * 
	 */
	@PostMapping("/saveSanitiziationF12")
	public ResponseEntity<?> saveSanitixiationF12(HttpServletRequest http,
			@Valid @RequestBody SanitizationDetails sanitiziationmachinesurface, BindingResult result,
			Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = drygoodsservice4.saveSanitixiationF12(sanitiziationmachinesurface, http);

		return response;

	}

	@PostMapping("/submitSanitiziationF12")
	public ResponseEntity<?> submitSanitiziationF12(HttpServletRequest http,
			@Valid @RequestBody SanitizationDetails sanitiziationmachinesurface, BindingResult result,
			Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = drygoodsservice4.submitSanitiziationF12(sanitiziationmachinesurface, http);

		return response;

	}

	// approve or reject
	@PutMapping("/approveOrRejectF12")
	public ResponseEntity<?> approveOrRejectF12(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = drygoodsservice4.approveOrRejectF12(approvalResponse, http);
		return resp;
	}

	//

	@GetMapping("/getSupSummarydetailsF12")
	public ResponseEntity<?> getSupSummarydetailsF12() {

		ResponseEntity<?> records = drygoodsservice4.getSupSummarydetailsF12();

		return records;

	}

	@GetMapping("/getHodSummarydetailsF12")
	public ResponseEntity<?> getHodSummarydetailsF12() {

		ResponseEntity<?> records = drygoodsservice4.getHodSummarydetailsF12();

		return records;

	}
	
	
	@GetMapping("/getSaniParamDetailsbyF12")
	public ResponseEntity<?> getParamdetailsbyF12(@RequestParam String year, @RequestParam String month,@RequestParam String week) {
		
		try {
			 List<SanitizationDetails> records = sanitiziationmachinesurfacerepository.getdetailsbyParam(week, month, year);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getSaniPrintF12")
	public ResponseEntity<?> getSaniPrintF12(@RequestParam String month, @RequestParam String year) {
		try {
			List<SanitizationDetails> records = sanitiziationmachinesurfacerepository.printParam(month, year);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}
	
		// Logbook PDE Data changes
	
	

}
