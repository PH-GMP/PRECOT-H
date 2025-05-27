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
import com.focusr.Precot.mssql.database.model.padpunching.DailyProdPackingDetailsF004;
import com.focusr.Precot.mssql.database.model.padpunching.DailyRollConsumptionReportF002;
import com.focusr.Precot.mssql.database.model.padpunching.MachineCleaningCheckListF005;
import com.focusr.Precot.mssql.database.model.padpunching.MetalDetectorCheckList007;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.padpunching.PunchingService1;
import com.focusr.Precot.payload.ApproveResponse;

@RestController
@RequestMapping("/api/PadPunching/Service")
public class PunchingController1 {

	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	@Autowired
	private PunchingService1 punchingService1;
	
//	========================================== F007 ==================================================

	@PostMapping("/MetalDetectorCheckList/SaveMetalDetectorCheckList")
	public ResponseEntity<?> SaveMetalDetectorCheckList(HttpServletRequest http, @Valid @RequestBody MetalDetectorCheckList007 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = punchingService1.SaveMetalDetectorCheckList(details, http);
 
		return response;
	}
	
	@PostMapping("/MetalDetectorCheckList/SubmitMetalDetectorCheckList")
	public ResponseEntity<?> SubmitMetalDetectorCheckList(HttpServletRequest http, @Valid @RequestBody MetalDetectorCheckList007 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = punchingService1.SubmitMetalDetectorCheckList(details, http);
 
		return response;
	}
	
	@GetMapping("/MetalDetectorCheckList/getByDate")
    public ResponseEntity<?> getByDateF007(@RequestParam String date) {
        return punchingService1.getByDateF007(date);
    }
	
	@GetMapping("/MetalDetectorCheckList/findByMonthPrintApi")	
	public ResponseEntity<?> findByMonthYearPrintApiF007(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String month = requestParams.get("month");
		String year = requestParams.get("year");
		
		ResponseEntity<?> resp = punchingService1.findByMonthPrintApiF007(month,year);
		return resp;
	}
	
	@GetMapping("/MetalDetectorCheckList/getMetalDetectorSummary")
    public ResponseEntity<?> getMetalDetectorSummary(HttpServletRequest http) {
        return punchingService1.getMetalDetectorSummary(http);
    }
	
	@PutMapping("/MetalDetectorCheckList/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF007(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = punchingService1.approveRejectionF007(approvalResponse, http);
		return resp;
	}
	
//	========================================== F014 ==================================================

	@PostMapping("/BagMaking/SaveBagMakingF014")
	public ResponseEntity<?> saveBagMakingF014(HttpServletRequest http, @Valid @RequestBody BagMakingSpecificationDetailsF014 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = punchingService1.SaveBagMakingF014(details, http);
 
		return response;
	}
	
	@PostMapping("/BagMaking/SubmitBagMakingF014")
	public ResponseEntity<?> submitBagMakingF014(HttpServletRequest http, @Valid @RequestBody BagMakingSpecificationDetailsF014 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = punchingService1.SubmitBagMakingF014(details, http);
 
		return response;
	}
	
	@GetMapping("/BagMaking/getByDateShift")
	public ResponseEntity<?> getByDateShiftF014(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		String machineName = requestParams.get("machineName");
		String productName = requestParams.get("productName");
		
		ResponseEntity<?> resp = punchingService1.getByDateShiftF014(date, shift,machineName,productName);
		return resp;
	}
	
	@GetMapping("/BagMaking/getByDateShiftPrint")
	public ResponseEntity<?> getByDateShiftPrintApiF014(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		
		ResponseEntity<?> resp = punchingService1.getByDateShiftPrintApiF014(date, shift);
		return resp;
	}
	
	@GetMapping("/BagMaking/getBagMakingSpecificationSummary")
    public ResponseEntity<?> getBagMakingSpecificationSummaryF014(HttpServletRequest http) {
        return punchingService1.getBagMakingSpecificationSummaryF014(http);
    }
	
	@PutMapping("/BagMaking/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF014(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = punchingService1.approveRejectionF014(approvalResponse, http);
		return resp;
	}
	
	
		// CR 
	
	@GetMapping("/productNameList")
	public ResponseEntity<?> getProductNameLov(Principal principal) {
		
		ResponseEntity<?> resp = punchingService1.productNameLOV();
		return resp;
	}
	
	@GetMapping("/productNamesBags")
	public ResponseEntity<?> productNamesBags(Principal principal) {
		
		ResponseEntity<?> resp = punchingService1.productNamesBags();
		return resp;
	}
	

//	========================================== F004 ==================================================

	
	@PostMapping("/PackingDetails/SubmitPackingDetails")
	public ResponseEntity<?> submitPackingDetailsF004(HttpServletRequest http, @Valid @RequestBody DailyProdPackingDetailsF004 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = punchingService1.SubmitPackingDetails(details, http);
 
		return response;
	}
	
	@GetMapping("/PackingDetails/getByDateShift")
	public ResponseEntity<?> getByDateShiftF004(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		
		ResponseEntity<?> resp = punchingService1.getByDateShiftF004(date, shift);
		return resp;
	}
	
	@GetMapping("/PackingDetails/getByDatePrint")
	public ResponseEntity<?> getByDatePrintApiF004(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String date = requestParams.get("date");
		
		ResponseEntity<?> resp = punchingService1.getByDatePrintApiF004(date);
		return resp;
	}
	
	@GetMapping("/PackingDetails/getPackingDetailsSummary")
    public ResponseEntity<?> getPackingDetailsSummaryF004(HttpServletRequest http) {
        return punchingService1.getPackingDetailsSummaryF004(http);
    }
	
	@PutMapping("/PackingDetails/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF004(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = punchingService1.approveRejectionF004(approvalResponse, http);
		return resp;
	}

//	========================================== F005 ==================================================

	@PostMapping("/MachineCleaning/SaveMachineCleaning")
	public ResponseEntity<?> saveMachineCleaningCheckListF005(HttpServletRequest http, @Valid @RequestBody MachineCleaningCheckListF005 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = punchingService1.SaveMachineCleaningCheckList(details, http);
 
		return response;
	}
	
	@PostMapping("/MachineCleaning/SubmitMachineCleaning")
	public ResponseEntity<?> submitMachineCleaningCheckListF005(HttpServletRequest http, @Valid @RequestBody MachineCleaningCheckListF005 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = punchingService1.SubmitMachineCleaningCheckList(details, http);
 
		return response;
	}
	
	@GetMapping("/MachineCleaning/getByDateShiftMachine")
	public ResponseEntity<?> getByDateShiftMachineF005(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String date = requestParams.get("date");
//		String shift = requestParams.get("shift");
		String machineName = requestParams.get("machineName");
		
		ResponseEntity<?> resp = punchingService1.getByDateMachineF005(date,machineName);
		return resp;
	}
	
	@GetMapping("/MachineCleaning/getByMonthPrint")
	public ResponseEntity<?> getByDatePrintApiF005(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String month = requestParams.get("month");
		String year = requestParams.get("year");
		
		ResponseEntity<?> resp = punchingService1.findByMonthPrintApiF005(month,year);
		return resp;
	}
	
	@GetMapping("/MachineCleaning/getMachineCleaningSummary")
    public ResponseEntity<?> getMachineCleaningSummaryF005(HttpServletRequest http) {
        return punchingService1.getMachineCleaningSummary(http);
    }
	
	@PutMapping("/MachineCleaning/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF005(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = punchingService1.approveRejectionF005(approvalResponse, http);
		return resp;
	}
	
//	========================================== F002 ==================================================

	@PostMapping("/RollConsumptionReport/saveReport")
	public ResponseEntity<?> saveRollConsumptionReportF002(HttpServletRequest http, @Valid @RequestBody DailyRollConsumptionReportF002 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = punchingService1.SaveRollConsumptionDetailsF002(details, http);
 
		return response;
	}
	
	@PostMapping("/RollConsumptionReport/SubmitReport")
	public ResponseEntity<?> submitRollConsumptionReportF002(HttpServletRequest http, @Valid @RequestBody DailyRollConsumptionReportF002 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = punchingService1.SubmitRollConsumptionDetailsF002(details, http);
 
		return response;
	}
	
	@GetMapping("/RollConsumptionReport/getByDateShiftMachine")
	public ResponseEntity<?> getByDateShiftMachineF002(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		String machineName = requestParams.get("machineName");
		
		ResponseEntity<?> resp = punchingService1.getByDateShiftMachineF002(date, shift,machineName);
		return resp;
	}
	
	@GetMapping("/RollConsumptionReport/getByDateShiftMachinePrint")
	public ResponseEntity<?> getByDateShiftMachinePrintApiF002(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		String machineName = requestParams.get("machineName");
		
		ResponseEntity<?> resp = punchingService1.getByDateShiftMachinePrintApiF002(date, shift,machineName);
		return resp;
	}
	
	@GetMapping("/RollConsumptionReport/getDailyRollConsumptionSummary")
    public ResponseEntity<?> getDailyRollConsumptionSummaryF002(HttpServletRequest http) {
        return punchingService1.getDailyRollConsumptionSummaryF002(http);
    }
	
	@PutMapping("/RollConsumptionReport/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF002(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = punchingService1.approveRejectionF002(approvalResponse, http);
		return resp;
	}

}
