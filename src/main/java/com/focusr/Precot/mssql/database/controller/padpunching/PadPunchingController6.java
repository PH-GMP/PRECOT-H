package com.focusr.Precot.mssql.database.controller.padpunching;

import java.security.Principal;
import java.util.Map;

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

import com.focusr.Precot.mssql.database.model.padpunching.BagMakingSpecificationDetailsF014;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingBagMakingDailyProductionDetailsF001;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingHouseKeepingCheckListF010;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingHouseKeepingCheckListF26;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingLogBookBagMakingF003;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingSanitizationOfMachinesAndSurfacesF21;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceHandSanitizationReportF025;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.padpunching.PadPunchingService6;
import com.focusr.Precot.payload.ApproveResponse;

@RestController
@RequestMapping("/api/PadPunching/Service")
public class PadPunchingController6 {
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private PadPunchingService6 padPunchingService9;
	
	/*
	 * ---------------------------------F26Start
	 */
	
	@PostMapping("/saveHouseKepping26")
	public ResponseEntity<?> saveHouseKeepingList26(@Valid @RequestBody PadPunchingHouseKeepingCheckListF26 details,
			BindingResult result, Principal principal, HttpServletRequest http) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> Response = padPunchingService9.saveHouseKeepingF26(details, http);

		return Response;
	}

	@PostMapping("/SubmitHouseKeepingF26")
	public ResponseEntity<?> SubmitHouseKeepingF0A(
			@Valid @RequestBody PadPunchingHouseKeepingCheckListF26 padPunchingHouseKeepingCheckLIst, BindingResult result,
			Principal principal, HttpServletRequest http) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = padPunchingService9.SubmitHouseKeepingF02A(padPunchingHouseKeepingCheckLIst, http);

		return response;
	}

	@GetMapping("/getDateHouseKeepingF26")
	public ResponseEntity<?> getDateHouseKeepingF0A(@RequestParam String date, HttpServletRequest http) {

		ResponseEntity<?> response = padPunchingService9.getHouseKeepingF02A(date, http);

		return response;
	}
	
	//overall  get
	
	@GetMapping("/getOverallDateHouseKeepingF26")
	public ResponseEntity<?> getDateHouseKeepingF02A( HttpServletRequest http) {

		ResponseEntity<?> response = padPunchingService9.getHouseKeepingOverallF02A( http);

		return response;
	}
//userlogin wise get
	@GetMapping("/getHouseKeepingSummeryF26")
	public ResponseEntity<?> getHouseKeepingSummeryF0A(HttpServletRequest http) {

		ResponseEntity<?> response = padPunchingService9.getHouseKeepingSummeryF0A(http);

		return response;
	}

//	@GetMapping("/getHouseKeepingMonthYearSummeryF26")
//	public ResponseEntity<?> getHouseKeepingMonthYearSummeryF02A(@RequestParam String month,
//			@RequestParam String year) {
//
//		ResponseEntity<?> response = padPunchingService9.getHouseKeepingMonthYearSummeryF02A(month, year);
//
//		return response;
//	}
	
	@PutMapping("/approveRejectF26")
	public ResponseEntity<?> approveRejectHouseKeepingF02A(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = padPunchingService9.approveRejectHouseKeepingRecordF009(approveResponse, http);
		return resp;
		
	}
	
//	@GetMapping("/getBmrDetailsF26")
//	public ResponseEntity<?> LayDownChecklist(@RequestParam String bmr) {
// 
//		ResponseEntity<?> response = padPunchingService9.LayDownChecklist(bmr);
// 
//		return response;
//	}
	
	//print
	
	@GetMapping("/PrintHouseCleaningReport")
	public ResponseEntity<?> PrintRPProdReportF14(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String month = requestParams.get("month");
		String year = requestParams.get("year");

		ResponseEntity<?> resp = padPunchingService9.PrintRPProdReportF14(month,year);
		return resp;
	}
	
	
	/*
	 * F010
	 */
	
	
	@PostMapping("/saveHouseKeppingF010")
	public ResponseEntity<?> saveHouseKeepingListF010(@Valid @RequestBody PadPunchingHouseKeepingCheckListF010 details,
			BindingResult result, Principal principal, HttpServletRequest http) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> Response = padPunchingService9.saveHouseKeepingF010(details, http);

		return Response;
	}

	@PostMapping("/SubmitHouseKeepingF010")
	public ResponseEntity<?> SubmitHouseKeepingF010(
			@Valid @RequestBody PadPunchingHouseKeepingCheckListF010 padPunchingHouseKeepingCheckLIst, BindingResult result,
			Principal principal, HttpServletRequest http) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = padPunchingService9.SubmitHouseKeepingF010(padPunchingHouseKeepingCheckLIst, http);

		return response;
	}

	@GetMapping("/getDateHouseKeepingF010")
	public ResponseEntity<?> getDateHouseKeepingF010(@RequestParam String date, HttpServletRequest http) {

		ResponseEntity<?> response = padPunchingService9.getHouseKeepingF010(date, http);

		return response;
	}
	
	//overall  get
	
	@GetMapping("/getOverallDateHouseKeepingF010")
	public ResponseEntity<?> getDateHouseKeepingF010( HttpServletRequest http) {

		ResponseEntity<?> response = padPunchingService9.getHouseKeepingOverallF010( http);

		return response;
	}
//userlogin wise get
	@GetMapping("/getHouseKeepingSummeryF010")
	public ResponseEntity<?> getHouseKeepingSummeryF010(HttpServletRequest http) {

		ResponseEntity<?> response = padPunchingService9.getHouseKeepingSummeryF010(http);

		return response;
	}

//	@GetMapping("/getHouseKeepingMonthYearSummeryF26")
//	public ResponseEntity<?> getHouseKeepingMonthYearSummeryF02A(@RequestParam String month,
//			@RequestParam String year) {
//
//		ResponseEntity<?> response = padPunchingService9.getHouseKeepingMonthYearSummeryF02A(month, year);
//
//		return response;
//	}
	
	@PutMapping("/approveRejectF010")
	public ResponseEntity<?> approveRejectHouseKeepingF010(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = padPunchingService9.approveRejectHouseKeepingRecordF010(approveResponse, http);
		return resp;
		
	}
	
//	@GetMapping("/getBmrDetailsF26")
//	public ResponseEntity<?> LayDownChecklist(@RequestParam String bmr) {
// 
//		ResponseEntity<?> response = padPunchingService9.LayDownChecklist(bmr);
// 
//		return response;
//	}
	
	//print
	
	@GetMapping("/PrintHouseCleaningReportF010")
	public ResponseEntity<?> PrintRPProdReportF010(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String month = requestParams.get("month");
		String year = requestParams.get("year");
		

		ResponseEntity<?> resp = padPunchingService9.PrintRPProdReportF010(month,year);
		return resp;
	}
	
	
	
//	========================================== PH-PRD05/F-001 ==================================================
	
	
//	Bag Making Daily Production Details
	
	@PostMapping("/SaveBagMakingDailyProductionDetails")
	public ResponseEntity<?> SaveBagMakingDailyProductionDetail(HttpServletRequest http, @Valid @RequestBody PadPunchingBagMakingDailyProductionDetailsF001 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = padPunchingService9.SaveBagMakingDailyProductionDetailsF001(details, http);
 
		return response;
	}
	
	
	@PostMapping("/SubmitBagMakingDailyProductionDetail")
	public ResponseEntity<?> SubmitBagMakingDailyProductionDetail(HttpServletRequest http, @Valid @RequestBody PadPunchingBagMakingDailyProductionDetailsF001 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = padPunchingService9.SubmitBagMakingDailyProductionDetails(details, http);
 
		return response;
	}
	
	
	
	@PutMapping("/approveOrRejectBagMaking")
	public ResponseEntity<?> approveRejectionReportF025(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = padPunchingService9.approveRejectionBagMaking(approvalResponse, http);
		return resp;
	}
	
	
	@GetMapping("/getSummaryBagMakingDailyProduction")
    public ResponseEntity<?> getHandSanitizationReportSummary(HttpServletRequest http) {
        return padPunchingService9.getBagMakingSpecificationSummaryF001(http);
    }
	
	
	@GetMapping("/findByDateShiftPrintApi")
    public ResponseEntity<?> findByDateShiftPrintApiBagMakingF001(@RequestParam (required = false) String date,@RequestParam (required = false) String shift) {
//		  @RequestParam (required = false)String order_no
        return padPunchingService9.getByDateShiftPrintApiBagMakingDailyProductionF001(date,shift);
    }
	
	@GetMapping("/findByDateShiftBagMaking")
    public ResponseEntity<?> findByDateShiftF025(@RequestParam String date,@RequestParam String shift) {
        return padPunchingService9.getByDateShiftBagMakingDailyProductionF001(date,shift);
    }	
	

//	========================================== PH-PRD05/F-001 ==================================================
	
	
//	Sanitization Of Machines And Surfaces
	
	@PostMapping("/SaveSanitisationOfMachinesAndSurfaces")
	public ResponseEntity<?> SaveSanitisationOfMachinesAndSurfaces(HttpServletRequest http, @Valid @RequestBody PadPunchingSanitizationOfMachinesAndSurfacesF21 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = padPunchingService9.SaveSanitizationOfMachinesAndSurfacesF21(details, http);
 
		return response;
	}
	
	
	@PostMapping("/SubmitSanitisationOfMachinesAndSurfaces")
	public ResponseEntity<?> SubmitSanitisationOfMachinesAndSurfaces(HttpServletRequest http, @Valid @RequestBody PadPunchingSanitizationOfMachinesAndSurfacesF21 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = padPunchingService9.SubmitSanitizationOFMachinesAndSurfaces(details, http);
 
		return response;
	}
	
	
	
	@PutMapping("/approveOrRejectSanitisationOfMachinesAndSurfaces")
	public ResponseEntity<?> approveRejectionReportF025SanitisationOfMachinesAndSurfaces(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = padPunchingService9.approveSanitizationOfMachinesAndSurfaces(approvalResponse, http);
		return resp;
	}
	
	
	@GetMapping("/getSummarySanitisationOfMachinesAndSurfaces")
    public ResponseEntity<?> getSanitisationOfMachinesAndSurfacesReportSummary(HttpServletRequest http) {
        return padPunchingService9.getSanitizationOfMachinesAndSurfacesReportSummary(http);
    }
	
	
	@GetMapping("/findByMachineNameWeekNoMonthAndYearPrintApi/SanitisationOfMachinesAndSurfaces")
    public ResponseEntity<?> findByDateShiftPrintApiSanitisationOfMachinesAndSurfaces(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String month = requestParams.get("month");
		String year = requestParams.get("year");
		
		return padPunchingService9.getByMachineNameWeekNoMonthYearPrint(month,year);
    }
	
	@GetMapping("/findByMachineNameWeekNoMonthAndYear/SanitisationOfMachinesAndSurfaces")
    public ResponseEntity<?> findBySanitisationOfMachinesAndSurfaces(@RequestParam String machineName,@RequestParam String weekNo,@RequestParam String month,@RequestParam String year) {
        return padPunchingService9.getBySanitisationOfMachinesAndSurfaces(machineName,weekNo,month,year);
    }
	
	
		// CR 
	
	@GetMapping("/chemicalName")
	public ResponseEntity<?> chemicalNameLov(Principal principal) {
		
		ResponseEntity<?> resp = padPunchingService9.chemicalNameLOV();
		return resp;
	}
	
	@GetMapping("/chemicalBatchNumber")
	public ResponseEntity<?> batchNameLov(Principal principal) {
		ResponseEntity<?> resp = padPunchingService9.batchNameLOV();
		return resp;
	}
	
	
//	======================================== Log Book Bag Making F003 ==========================================

//	======================================== Log Book Bag Making F003 ==========================================
	 
	 
	 
@PostMapping("/LogBook/SaveLogBookBagMakingF003")
	public ResponseEntity<?> saveBagMakingF014(HttpServletRequest http, @Valid @RequestBody PadPunchingLogBookBagMakingF003 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = padPunchingService9.SaveLogBookBagMakingF003(details, http);
 
		return response;
	}
	
	
	//Submit LogBookBagMakingFoo3
	
	@PostMapping("/LogBook/SubmitLogBookBagMakingF003")
	public ResponseEntity<?> submitBagMakingF014(HttpServletRequest http, @Valid @RequestBody PadPunchingLogBookBagMakingF003 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = padPunchingService9.SubmitLogBookF003(details, http);
 
		return response;
	}
	
	
	//Approve Reject
	
	@PutMapping("/LogBook/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF014(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = padPunchingService9.approveRejectionLogBookBagMakingF003(approvalResponse, http);
		return resp;
	}
	
	
	
	//Get DateShiftMachineNo
	
	@GetMapping("/LogBook/getByDateShiftMachineNo")
	public ResponseEntity<?> getByDateShiftF014(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
//		String machineNo = requestParams.get("machineNo");
//		String productName = requestParams.get("productName");
		
		ResponseEntity<?> resp = padPunchingService9.getByDateShiftMachineNoF003(date, shift);
		return resp;
	}
	
	
	//Get DateShiftMachineNoPrint
	
	
	@GetMapping("/LogBook/getByDateShiftPrint")
	public ResponseEntity<?> getByDateShiftPrintApiF014(@RequestParam (required = false)String date,@RequestParam (required = false) String shift) {
		
//		String date = requestParams.get("date");
//		String shift = requestParams.get("shift");
//		String machineNo = requestParams.get("machineNo");
 
		ResponseEntity<?> resp = padPunchingService9.getByDateShiftPrintAPiLogBookBagMakingF003(date, shift);
		return resp;
	}
	
	
	// Get Summary
	
	@GetMapping("/LogBook/getLogBookBagMakingSummary")
    public ResponseEntity<?> getBagMakingSpecificationSummaryF014(HttpServletRequest http) {
        return padPunchingService9.getLogBookBagMakingSummaryF003(http);
    }
	
	
	

}



