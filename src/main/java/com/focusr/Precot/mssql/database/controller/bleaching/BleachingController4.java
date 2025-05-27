package com.focusr.Precot.mssql.database.controller.bleaching;

import java.security.Principal;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.model.bleaching.BleachAppliedContAbCottonF08;
import com.focusr.Precot.mssql.database.model.bleaching.BleachHouseKeepingCheckListF02;
import com.focusr.Precot.mssql.database.model.bleaching.BleachHouseKeepingCheckListF02A;
import com.focusr.Precot.mssql.database.model.bleaching.BleachJobCardF13;
import com.focusr.Precot.mssql.database.model.bleaching.BleachMixingChangeMachineCleaningF38;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.bleaching.BleachingService4;
import com.focusr.Precot.payload.ApproveResponse;

@RestController
@RequestMapping("/api/Bleaching/Service")
public class BleachingController4 {

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private BleachingService4 bleachingservice4;

	/**
	 * ----------------------------------------F38-Start
	 */
	@PostMapping("/saveMixchMachineF38")
	public ResponseEntity<?> saveMixchMachineF38(@Valid @RequestBody BleachMixingChangeMachineCleaningF38 details,
			BindingResult result, Principal principal, HttpServletRequest http) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> Response = bleachingservice4.saveMixchMachineF38(details, http);

		return Response;
	}

	@PostMapping("/submitMixchMachineF38")
	public ResponseEntity<?> submitMixchMachineF38(@Valid @RequestBody BleachMixingChangeMachineCleaningF38 details,
			BindingResult result, Principal principal, HttpServletRequest http) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = bleachingservice4.submitMixchMachineF38(details, http);

		return response;
	}

	@GetMapping("/getMixchMachineF38")
	public ResponseEntity<?> getMixchMachineF38(@RequestParam Long id) {

		ResponseEntity<?> response = bleachingservice4.getMixchMachineF38(id);

		return response;
	}

	@GetMapping("/getSupervisorSummeryF38")
	public ResponseEntity<?> getListOfF38(Principal principal, HttpServletRequest http) {

		ResponseEntity<?> message = bleachingservice4.getSuperviserF38(http);

		return message;
	}

	// Not Use
	@GetMapping("/getDateSummeryF38")
	public ResponseEntity<?> getdetailsBsedonDateF38(@RequestParam String date, HttpServletRequest http) {

		ResponseEntity<?> response = bleachingservice4.getdetailsBsedonDateF38(date, http);

		return response;
	}

	@GetMapping("/getHodSummeryF38")
	public ResponseEntity<?> getHodSummeryF38(Principal principal) {

		ResponseEntity<?> message = bleachingservice4.getListOfF38();

		return message;
	}

	// New

	@GetMapping("/getBmrFromToSummeryF38")
	public ResponseEntity<?> getBmrFromToSummeryF38(@RequestParam String date, @RequestParam String bmrFrom,
			@RequestParam String bmrTo, HttpServletRequest http) {

		ResponseEntity<?> response = bleachingservice4.getBmrFromToSummeryF38(date, bmrFrom, bmrTo, http);

		return response;
	}
	
	
	@PutMapping("/approveRejectF38")
	public ResponseEntity<?> approveRejectHouseKeepingF38(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bleachingservice4.approveRejectF38(approveResponse, http);
		return resp;
		
	}
	

	/**
	 * -------------------------------------------------------------Start F13
	 */

	@PostMapping("/saveBleachingJobCardF13")
	public ResponseEntity<?> saveBleachingJobCardF13(@Valid @RequestBody BleachJobCardF13 bleachingheader,
			BindingResult result, Principal principal, HttpServletRequest http) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = bleachingservice4.saveBleachingJobCardF13(bleachingheader, http);

		return response;
	}

	@PostMapping("/submitBleachingJobCardF13")
	public ResponseEntity<?> submitBleachingJobCardF13(@Valid @RequestBody BleachJobCardF13 bleachingheader,
			BindingResult result, Principal principal, HttpServletRequest http) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = bleachingservice4.submitBleachingJobCardF13(bleachingheader, http);

		return response;
	}

	@GetMapping("/getBmrDetails13")
	public ResponseEntity<?> getBmrDetails13(@RequestParam String bmr_no) {

		ResponseEntity<?> response = bleachingservice4.getBmrDetails13(bmr_no);

		return response;
	}
	
	
	
	
	@GetMapping("/getApprovedBmrDetails13")
	public ResponseEntity<?> getApprovedBmrDetails13(@RequestParam String bmr_no) {

		ResponseEntity<?> response = bleachingservice4.getApprovedBmrDetails13(bmr_no);

		return response;
	}

	@GetMapping("/getBleachingJobSupervisorSummeryF13")
	public ResponseEntity<?> getBleachingJobSupervisorSummeryF13(Principal principal, HttpServletRequest http) {

		ResponseEntity<?> message = bleachingservice4.getBleachingJobSupervisorSummeryF13(http);

		return message;
	}

	@GetMapping("/geBleachingJobtHodSummeryF13")
	public ResponseEntity<?> geBleachingJobtHodSummeryF13(Principal principal, HttpServletRequest http) {

		ResponseEntity<?> message = bleachingservice4.geBleachingJobtHodSummeryF13(http);

		return message;
	}

	@GetMapping("/geBleachingJobQaSummeryF13")
	public ResponseEntity<?> geBleachingJobQaSummeryF13(Principal principal, HttpServletRequest http) {

		ResponseEntity<?> message = bleachingservice4.geBleachingJobQaSummeryF13(http);

		return message;
	}

	@GetMapping("/getBmrbatchNoDetails13")
	public ResponseEntity<?> getBmrDetails13(@RequestParam String bmr_no, @RequestParam String batchNo) {

		ResponseEntity<?> response = bleachingservice4.getBmrbatchDetails13(bmr_no, batchNo);

		return response;
	}
	
	
	
	@GetMapping("/getLastSubbatchNo13")
	public ResponseEntity<?> getLastSubbatchNo13() {
		ResponseEntity<?> response = bleachingservice4.getLastSubbatchNo13();
		return response;
	}
	
	@PutMapping("/approveRejectF13")
	public ResponseEntity<?> approveRejectF13(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bleachingservice4.approveRejectF13(approveResponse, http);
		return resp;
		
	}
	

	/**
	 * F08--------------------------------------------------------StartF08
	 */

	@PostMapping("/saveAppliedAbCottonF08")
	public ResponseEntity<?> createOrUpdateAppliedRawCotton(HttpServletRequest http,
			@Valid @RequestBody BleachAppliedContAbCottonF08 bleachappliedcontabcottonf08, BindingResult result,
			Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = bleachingservice4.createOrUpdateAppliedRawCotton(bleachappliedcontabcottonf08,
				http);

		return response;

	}

	@PostMapping("/submitAppliedAbCottonF08")
	public ResponseEntity<?> submitAppliedRawCotton(HttpServletRequest http,
			@Valid @RequestBody BleachAppliedContAbCottonF08 bleachappliedcontabcottonf08, BindingResult result,
			Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = bleachingservice4.submitAppliedRawCottonF04(bleachappliedcontabcottonf08, http);

		return response;

	}

	@GetMapping("/getAppliedAbCottonByBmrNumberF08")
	public ResponseEntity<?> getAppliedAbCottonByBmrNumberF08(@RequestParam Map<String, String> requestParams,
			Principal principal, HttpServletRequest http) {

		String bmrNumber = requestParams.get("bmrNumber");
		ResponseEntity<?> response = bleachingservice4.getAppliedAbCottonByBmrNumber(bmrNumber, http);
		return response;
	}

	@GetMapping("/getAppliedAbCottonSupervisorSummeryF08")
	public ResponseEntity<?> getAppliedAbCottonSupervisorSummeryF08(Principal principal, HttpServletRequest http) {

		ResponseEntity<?> message = bleachingservice4.getAbCottonSuperviserF04(http);

		return message;
	}

	@GetMapping("/geAppliedAbCottontHodSummeryF08")
	public ResponseEntity<?> geAppliedAbCottontHodSummeryF08(Principal principal, HttpServletRequest http) {

		ResponseEntity<?> message = bleachingservice4.getAbCottonHodSummeryF04(http);

		return message;
	}

	@PutMapping("/approveRejectF08")
	public ResponseEntity<?> approveRejectF08(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bleachingservice4.approveRejectF08(approveResponse, http);
		return resp;
		
	}
	
	/*
	 * ---------------------------------F02Start
	 */

	@PostMapping("/SubmitHouseKeepingF02")
	public ResponseEntity<?> SubmitHouseKeepingF02(
			@Valid @RequestBody BleachHouseKeepingCheckListF02 bleachhousekeepingchecklistf02, BindingResult result,
			Principal principal, HttpServletRequest http) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = bleachingservice4.SubmitHouseKeepingF02(bleachhousekeepingchecklistf02, http);

		return response;
	}

	@GetMapping("/getDateHouseKeepingF02")
	public ResponseEntity<?> getHouseKeepingF02(@RequestParam String date, HttpServletRequest http) {

		ResponseEntity<?> response = bleachingservice4.getHouseKeepingF02(date, http);

		return response;
	}

	@GetMapping("/getHouseKeepingSummeryF02")
	public ResponseEntity<?> getHouseKeepingSummeryF02(HttpServletRequest http) {

		ResponseEntity<?> response = bleachingservice4.getHouseKeepingSummeryF02(http);

		return response;
	}

	@GetMapping("/getHouseKeepingMonthYearSummeryF02")
	public ResponseEntity<?> getHouseKeepingMonthYearSummeryF02(@RequestParam String month, @RequestParam String year) {

		ResponseEntity<?> response = bleachingservice4.getHouseKeepingMonthYearSummeryF02(month, year);

		return response;
	}
	
	@PutMapping("/approveRejectF02")
	public ResponseEntity<?> approveRejectHouseKeepingF02(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bleachingservice4.approveRejectHouseKeepingRecordF02(approveResponse, http);
		return resp;
		
	}
	
	@DeleteMapping("/deleteMachineCleaningRecord")
	public ResponseEntity<?> deleteStoppageProductionLine(@RequestParam Map<String, String> requestParams, Principal principal) {
		
		Long id = Long.parseLong(requestParams.get("id"));
		
		ResponseEntity<?> resp = bleachingservice4.deleteMachineCleaningRecord(id);
		return resp;
	}
	

	/*
	 * ---------------------------------F02AStart
	 */

	@PostMapping("/SubmitHouseKeepingF02A")
	public ResponseEntity<?> SubmitHouseKeepingF0A(
			@Valid @RequestBody BleachHouseKeepingCheckListF02A bleachhousekeepingchecklistf02a, BindingResult result,
			Principal principal, HttpServletRequest http) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = bleachingservice4.SubmitHouseKeepingF02A(bleachhousekeepingchecklistf02a, http);

		return response;
	}

	@GetMapping("/getDateHouseKeepingF02A")
	public ResponseEntity<?> getDateHouseKeepingF0A(@RequestParam String date, HttpServletRequest http) {

		ResponseEntity<?> response = bleachingservice4.getHouseKeepingF02A(date, http);

		return response;
	}

	@GetMapping("/getHouseKeepingSummeryF02A")
	public ResponseEntity<?> getHouseKeepingSummeryF0A(HttpServletRequest http) {

		ResponseEntity<?> response = bleachingservice4.getHouseKeepingSummeryF0A(http);

		return response;
	}

	@GetMapping("/getHouseKeepingMonthYearSummeryF02A")
	public ResponseEntity<?> getHouseKeepingMonthYearSummeryF02A(@RequestParam String month,
			@RequestParam String year) {

		ResponseEntity<?> response = bleachingservice4.getHouseKeepingMonthYearSummeryF02A(month, year);

		return response;
	}
	
	@PutMapping("/approveRejectF02A")
	public ResponseEntity<?> approveRejectHouseKeepingF02A(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bleachingservice4.approveRejectHouseKeepingRecordF02A(approveResponse, http);
		return resp;
		
	}
	
	@GetMapping("/getBmrDetailsF08")
	public ResponseEntity<?> LayDownChecklist(@RequestParam String bmr) {
 
		ResponseEntity<?> response = bleachingservice4.LayDownChecklist(bmr);
 
		return response;
	}
	
	//---BMRLOV--Applied Contamination
	@GetMapping("/AppliedAbCottonF08/bmrLov")
	public ResponseEntity<?> bmrLovF08() {
		return bleachingservice4.bmrLovF08();
	}
	
	
	@GetMapping("/getDateSummeryF38Print")
	public ResponseEntity<?> getdetailsBsedonDateF38(
	        @RequestParam(required = false) String date,
	        @RequestParam(required = false) String month,
	        @RequestParam(required = false) String year) {
 
	    ResponseEntity<?> response = bleachingservice4.getdetailsBsedonDateF38Print(date, month, year);
 
	    return response;
	}
	
	
			// CR
	
	@GetMapping("/getPrintF38")
	public ResponseEntity<?> getSummaryF38(
	        @RequestParam(required = false) String date,
	        @RequestParam(required = false) String month,
	        @RequestParam(required = false) String year,
	        @RequestParam(required = false) String fromBmr,
	        @RequestParam(required = false) String toBmr
			) {
	    ResponseEntity<?> response = bleachingservice4.getSummaryF38(date, month, year,fromBmr,toBmr );
	    return response;
	}
	@GetMapping("/getFromBmr")
	public ResponseEntity<?> getFromBmr(
	        @RequestParam(required = false) String date,
	        @RequestParam(required = false) String month,
	        @RequestParam(required = false) String year) {
	    ResponseEntity<?> response = bleachingservice4.getFromBmr(date,month, year);
	    return response;
	}
	@GetMapping("/getToBmr")
	public ResponseEntity<?> getToBmr(
	        @RequestParam(required = false) String date,
	        @RequestParam(required = false) String month,
	        @RequestParam(required = false) String year) {
	    ResponseEntity<?> response = bleachingservice4.getToBmr(date,month, year);
	    return response;
	}
	

}
