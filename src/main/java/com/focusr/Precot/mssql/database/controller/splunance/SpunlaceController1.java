package com.focusr.Precot.mssql.database.controller.splunance;

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

import com.focusr.Precot.mssql.database.model.splunance.DailyProductionReportF006;
import com.focusr.Precot.mssql.database.model.splunance.DailyRejectionReportF007;
import com.focusr.Precot.mssql.database.model.splunance.FilterBagConsumptionDetailsF004;
import com.focusr.Precot.mssql.database.model.splunance.LogbookSpunlacePlanningF010;
import com.focusr.Precot.mssql.database.model.splunance.MachineCleaningRecordF023;
import com.focusr.Precot.mssql.database.model.splunance.MetalDetectorCheckListF020;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupVerificationRpBalePressF013;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupVerificationSliterWinderF016;
import com.focusr.Precot.mssql.database.model.splunance.ProductChangeOverCheckListSpunlaceF011;
import com.focusr.Precot.mssql.database.model.splunance.SanitizationOfMachineAndSurfacesF024;
import com.focusr.Precot.mssql.database.model.splunance.ShiftWiseSliterWinderProdReportF017;
import com.focusr.Precot.mssql.database.model.splunance.ShiftWiseWasteReportSpunlaceF019;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceGsmAnalysisReportF009;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceHandSanitizationReportF025;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.splunance.SpunlaceService1;
import com.focusr.Precot.payload.ApproveResponse;

/*
 *  PH-PRD02/F-007
 *  PH-PRD02/F-004
 *  PH-PRD02/F-006
 *  PH-PRD02/F-010
 *  PH-PRD02/F-009
 *  PH-PRD02/F-016
 *  PH-PRD02/F-013
 *  PH-PRD02/F-020
 *  PH-PRD02/F-019
 *  PH-PRD02/F-024
 *  PH-PRD02/F-011
 *  PH-PRD02/F-025
 *  PH-PRD02/F-023
 *  PH-PRD02/F-017
 */

@RestController
@RequestMapping("/api/spunlace/Service")
public class SpunlaceController1 {

	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	@Autowired
	private SpunlaceService1 spunlaceService1;
	
//	========================================== PH-PRD02/F-007 ==================================================

	
	@PostMapping("/RejectionReport/SubmitDailyRejectionReport")
	public ResponseEntity<?> SubmitDailyRejectionReport(HttpServletRequest http, @Valid @RequestBody DailyRejectionReportF007 report,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SubmitDailyRejectionReportF007(report, http);
 
		return response;
	}
	
	@GetMapping("/RejectionReport/getByDateAndShift")
    public ResponseEntity<?> getByDateAndShift(@RequestParam String date,@RequestParam String shift,@RequestParam String orderNo) {
        return spunlaceService1.getByDateAndShift(date,shift,orderNo);
    }
	
	@GetMapping("/RejectionReport/getByDateAndShiftPrintApi")
    public ResponseEntity<?> getByDateAndShiftPrintApi(@RequestParam String date,@RequestParam String shift,@RequestParam String orderNo) {
        return spunlaceService1.getByDateAndShiftPrintApi(date,shift,orderNo);
    }
	
	@GetMapping("/RejectionReport/supervisorSummary")
    public ResponseEntity<?> supervisorSummaryF007() {
        return spunlaceService1.supervisorSummaryF007();
    }
	
//	@GetMapping("/RejectionReport/hodSummary")
//    public ResponseEntity<?> hodSummaryF007() {
//        return spunlaceService1.hodSummaryF007();
//    }
	
	@PutMapping("/RejectionReport/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF07(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = spunlaceService1.approveRejectionReport(approvalResponse, http);
		return resp;
	}
	
//	========================================== PH-PRD02/F-004 ==================================================

	
	@PostMapping("/FilterConsumptionDetails/SaveFilterConsumptionDetails")
	public ResponseEntity<?> SaveFilterConsumptionDetails(HttpServletRequest http, @Valid @RequestBody FilterBagConsumptionDetailsF004 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SaveFilterConsumptionDetails(details, http);
 
		return response;
	}
	
	@PostMapping("/FilterConsumptionDetails/SubmitFilterConsumptionDetails")
	public ResponseEntity<?> SubmitFilterConsumptionDetails(HttpServletRequest http, @Valid @RequestBody FilterBagConsumptionDetailsF004 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SubmitFilterConsumptionDetails(details, http);
 
		return response;
	}
	
	@GetMapping("/FilterConsumptionDetails/getByDateAndShift")
    public ResponseEntity<?> getByDateAndShiftF004(@RequestParam String date,@RequestParam String shift) {
        return spunlaceService1.getByDateAndShiftF004(date,shift);
    }
	
	@GetMapping("/FilterConsumptionDetails/getByDateAndShiftPrintApi")
    public ResponseEntity<?> getByDateAndShiftPrintApiF004(@RequestParam String date,@RequestParam(required = false) String shift) {
        return spunlaceService1.getByDateAndShiftPrintApiF004(date,shift);
    }
	
	@GetMapping("/FilterConsumptionDetails/operatorSummary")
    public ResponseEntity<?> operatorSummaryF004() {
        return spunlaceService1.operatorSummaryF004();
    }
	
	@GetMapping("/FilterConsumptionDetails/supervisorSummary")
    public ResponseEntity<?> supervisorSummaryF004() {
        return spunlaceService1.supervisorSummaryF004();
    }
	
	@PutMapping("/FilterConsumptionDetails/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF004(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = spunlaceService1.approveRejectionF004(approvalResponse, http);
		return resp;
	}
	
//	@GetMapping("/FilterConsumptionDetails/hodSummary")
//    public ResponseEntity<?> hodSummaryF004() {
//        return spunlaceService1.hodSummaryF004();
//    }
	
//	========================================== PH-PRD02/F-006 ==================================================

	
	@PostMapping("/DailyProductionReport/SaveProductionReportDetails")
	public ResponseEntity<?> SaveProductionReport(HttpServletRequest http, @Valid @RequestBody DailyProductionReportF006 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SaveProductionReportDetails(details, http);
 
		return response;
	}
	
	@PostMapping("/DailyProductionReport/SubmitProductionReportDetails")
	public ResponseEntity<?> SubmitProductionReport(HttpServletRequest http, @Valid @RequestBody DailyProductionReportF006 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SubmitProductionReportDetails(details, http);
 
		return response;
	}
	
	@GetMapping("/DailyProductionReport/getByDateShiftOrderNo")
    public ResponseEntity<?> getByDateShiftOrderNoF006(@RequestParam String date,@RequestParam String shift,@RequestParam String orderNo) {
        return spunlaceService1.getByDateShiftOrderNoF006(date,shift,orderNo);
    }
	
	@GetMapping("/DailyProductionReport/getByDateShiftOrderNoPrintApi")
    public ResponseEntity<?> getByDateShiftOrderNoPrintApiF006(@RequestParam String date,@RequestParam String shift,@RequestParam String orderNo) {
        return spunlaceService1.getByDateShiftOrderNoPrintApiF006(date,shift,orderNo);
    }
	
	@GetMapping("/DailyProductionReport/operatorSummary")
    public ResponseEntity<?> operatorSummaryF006() {
        return spunlaceService1.operatorSummaryF006();
    }
	
	@GetMapping("/DailyProductionReport/supervisorSummary")
    public ResponseEntity<?> supervisorSummaryF006() {
        return spunlaceService1.supervisorSummaryF006();
    }
	
	@PutMapping("/DailyProductionReport/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF006(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = spunlaceService1.approveRejectionF006(approvalResponse, http);
		return resp;
	}
	
//	@GetMapping("/DailyProductionReport/hodSummary")
//    public ResponseEntity<?> hodSummaryF006() {
//        return spunlaceService1.hodSummaryF006();
//    }
	
//	========================================== PH-PRD02/F-010 ==================================================

	@PostMapping("/LogbookSpunlacePlanning/SaveLogbookSpunlacePlanning")
	public ResponseEntity<?> SaveLogbookSpunlacePlanningF010(HttpServletRequest http, @Valid @RequestBody LogbookSpunlacePlanningF010 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SaveLogbookSpunlacePlan(details, http);
 
		return response;
	}
	
	@PostMapping("/LogbookSpunlacePlanning/SubmitLogbookSpunlacePlanning")
	public ResponseEntity<?> SubmitLogbookSpunlacePlanningF010(HttpServletRequest http, @Valid @RequestBody LogbookSpunlacePlanningF010 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SubmitLogbookSpunlacePlan(details, http);
 
		return response;
	}
	
	@GetMapping("/LogbookSpunlacePlanning/getByDatePrintApi")
    public ResponseEntity<?> getByDatePrintApiF010(@RequestParam String date) {
        return spunlaceService1.getByDatePrintApiF010(date);
    }
	
	@GetMapping("/LogbookSpunlacePlanning/getByDate")
    public ResponseEntity<?> getByDateF010(@RequestParam String date) {
        return spunlaceService1.getByDateF010(date);
    }
	
	@GetMapping("/LogbookSpunlacePlanning/getLogbookSummary")
    public ResponseEntity<?> getLogbookSummaryF010(HttpServletRequest http) {
        return spunlaceService1.getLogbookSummaryF010(http);
    }
	
	@PutMapping("/LogbookSpunlacePlanning/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF010(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = spunlaceService1.approveRejectionF010(approvalResponse, http);
		return resp;
	}
	
	
	
	@DeleteMapping("/deleteLogbookLine")
	public ResponseEntity<?> deleteLogbookLine(@RequestParam Map<String, String> requestParams, Principal principal) {
		
		Long id = Long.parseLong(requestParams.get("id"));
		
		ResponseEntity<?> resp = spunlaceService1.deleteLogbookLine(id);
		return resp;
	}
	
	
//	========================================== PH-PRD02/F-009 ==================================================

	@PostMapping("/SpunlaceGsmAnalysisReport/SaveSpunlaceGsmAnalysisReport")
	public ResponseEntity<?> SaveSpunlaceGsmAnalysisReportF009(HttpServletRequest http, @Valid @RequestBody SpunlaceGsmAnalysisReportF009 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SaveSpunlaceGsmAnalysisReport(details, http);
 
		return response;
	}
	
	@PostMapping("/SpunlaceGsmAnalysisReport/SubmitSpunlaceGsmAnalysisReport")
	public ResponseEntity<?> SubmitSpunlaceGsmAnalysisReportF009(HttpServletRequest http, @Valid @RequestBody SpunlaceGsmAnalysisReportF009 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SubmitSpunlaceGsmAnalysisReport(details, http);
 
		return response;
	}
	
	@GetMapping("/SpunlaceGsmAnalysisReport/getByDateShiftOrderNoPrintApi")
    public ResponseEntity<?> getByDateShiftOrderNoPrintApiF009(@RequestParam String date,@RequestParam String shift,@RequestParam String orderNo) {
        return spunlaceService1.getByDateShiftOrderNoPrintApiF009(date,shift,orderNo);
    }
	
	@GetMapping("/SpunlaceGsmAnalysisReport/getByDateShiftOrderNo")
    public ResponseEntity<?> getByDateShiftOrderNoF009(@RequestParam String date,@RequestParam String shift,@RequestParam String orderNo) {
        return spunlaceService1.getByDateShiftOrderNoF009(date,shift,orderNo);
    }
	
	@GetMapping("/SpunlaceGsmAnalysisReport/getGsmAnalysisSummary")
    public ResponseEntity<?> getGsmAnalysisummaryF009(HttpServletRequest http) {
        return spunlaceService1.getGsmAnalysisSummaryF009(http);
    }
	
	@PutMapping("/SpunlaceGsmAnalysisReport/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF009(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = spunlaceService1.approveRejectionF009(approvalResponse, http);
		return resp;
	}
	
//	========================================== PH-PRD02/F-016 ==================================================

	@PostMapping("/ProcessSetupVerificationSliterWinder/SaveProcessSetupVerificationSliterWinder")
	public ResponseEntity<?> SaveProcessSetupVerificationSliterWinder(HttpServletRequest http, @Valid @RequestBody ProcessSetupVerificationSliterWinderF016 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SaveProcessSetupVerificationSliterWinder(details, http);
 
		return response;
	}
	
	@PostMapping("/ProcessSetupVerificationSliterWinder/SubmitProcessSetupVerificationSliterWinder")
	public ResponseEntity<?> SubmitProcessSetupVerificationSliterWinder(HttpServletRequest http, @Valid @RequestBody ProcessSetupVerificationSliterWinderF016 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SubmitProcessSetupVerificationSliterWinder(details, http);
 
		return response;
	}
	
	@GetMapping("/ProcessSetupVerificationSliterWinder/getByDateShiftOrderNoPrintApi")
    public ResponseEntity<?> getByDateShiftOrderNoPrintApiF016(@RequestParam String date,@RequestParam String shift,@RequestParam String orderNo) {
        return spunlaceService1.getByDateShiftOrderNoPrintApiF016(date,shift,orderNo);
    }
	
	@GetMapping("/ProcessSetupVerificationSliterWinder/getByDateShiftOrderNo")
    public ResponseEntity<?> getByDateShiftOrderNoF016(@RequestParam String date,@RequestParam String shift,@RequestParam String orderNo) {
        return spunlaceService1.getByDateShiftOrderNoF016(date,shift,orderNo);
    }
	
	@GetMapping("/ProcessSetupVerificationSliterWinder/getSliterWinderSummary")
    public ResponseEntity<?> getSliterWinderSummaryF016(HttpServletRequest http) {
        return spunlaceService1.getSliterWinderSummaryF016(http);
    }
	
	@PutMapping("/ProcessSetupVerificationSliterWinder/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF016(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = spunlaceService1.approveRejectionF016(approvalResponse, http);
		return resp;
	}
	
//	========================================== PH-PRD02/F-013 ==================================================

	@PostMapping("/ProcessSetupVerificationRpBalePress/SaveProcessSetupVerificationRpBalePress")
	public ResponseEntity<?> SaveProcessSetupVerificationRpBalePress(HttpServletRequest http, @Valid @RequestBody ProcessSetupVerificationRpBalePressF013 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SaveProcessSetupVerificationBalePress(details, http);
 
		return response;
	}
	
	@PostMapping("/ProcessSetupVerificationRpBalePress/SubmitProcessSetupVerificationRpBalePress")
	public ResponseEntity<?> SubmitProcessSetupVerificationRpBalePress(HttpServletRequest http, @Valid @RequestBody ProcessSetupVerificationRpBalePressF013 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SubmitProcessSetupVerificationBalePress(details, http);
 
		return response;
	}
	
	@GetMapping("/ProcessSetupVerificationRpBalePress/getByDateShiftOrderNoPrintApi")
    public ResponseEntity<?> getByDateShiftOrderNoPrintApiF013(@RequestParam String date,@RequestParam String shift,@RequestParam String orderNo) {
        return spunlaceService1.getByDateShiftOrderNoPrintApiF013(date,shift,orderNo);
    }
	
	@GetMapping("/ProcessSetupVerificationRpBalePress/getByDateShiftOrderNo")
    public ResponseEntity<?> getByDateShiftOrderNoF013(@RequestParam String date,@RequestParam String shift,@RequestParam String orderNo) {
        return spunlaceService1.getByDateShiftOrderNoF013(date,shift,orderNo);
    }
	
	@GetMapping("/ProcessSetupVerificationRpBalePress/getRpBalePressSummary")
    public ResponseEntity<?> getRpBalePressSummaryF013(HttpServletRequest http) {
        return spunlaceService1.getRpBalePressSummaryF013(http);
    }
	
	@PutMapping("/ProcessSetupVerificationRpBalePress/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF013(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = spunlaceService1.approveRejectionF013(approvalResponse, http);
		return resp;
	}
	
//	========================================== PH-PRD02/F-020 ==================================================

	@PostMapping("/MetalDetectorCheckList/SaveMetalDetectorCheckList")
	public ResponseEntity<?> SaveMetalDetectorCheckList(HttpServletRequest http, @Valid @RequestBody MetalDetectorCheckListF020 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SaveMetalDetectorCheckList(details, http);
 
		return response;
	}
	
	@PostMapping("/MetalDetectorCheckList/SubmitMetalDetectorCheckList")
	public ResponseEntity<?> SubmitMetalDetectorCheckList(HttpServletRequest http, @Valid @RequestBody MetalDetectorCheckListF020 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SubmitMetalDetectorCheckList(details, http);
 
		return response;
	}
	
	@GetMapping("/MetalDetectorCheckList/getByDate")
    public ResponseEntity<?> getByDateF020(@RequestParam String date) {
        return spunlaceService1.getByDateF020(date);
    }
	
	@GetMapping("/MetalDetectorCheckList/findByMonthYearPrintApi")
    public ResponseEntity<?> findByMonthYearPrintApiF020(@RequestParam String month,@RequestParam String year) {
        return spunlaceService1.findByMonthYearPrintApiF020(month,year);
    }
	
	@GetMapping("/MetalDetectorCheckList/getMetalDetectorSummary")
    public ResponseEntity<?> getMetalDetectorSummary(HttpServletRequest http) {
        return spunlaceService1.getMetalDetectorSummary(http);
    }
	
	@PutMapping("/MetalDetectorCheckList/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF020(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = spunlaceService1.approveRejectionF020(approvalResponse, http);
		return resp;
	}
	
//	========================================== PH-PRD02/F-019 ==================================================

	@PostMapping("/ShiftWiseWasteReportSpunlace/SaveShiftWiseWasteReport")
	public ResponseEntity<?> SaveShiftWiseWasteReport(HttpServletRequest http, @Valid @RequestBody ShiftWiseWasteReportSpunlaceF019 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SaveShiftWiseWasteReport(details, http);
 
		return response;
	}
	
	@PostMapping("/ShiftWiseWasteReportSpunlace/SubmitShiftWiseWasteReport")
	public ResponseEntity<?> SubmitShiftWiseWasteReport(HttpServletRequest http, @Valid @RequestBody ShiftWiseWasteReportSpunlaceF019 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SubmitShiftWiseWasteReport(details, http);
 
		return response;
	}
	
	@GetMapping("/ShiftWiseWasteReportSpunlace/findByDateShift")
    public ResponseEntity<?> findByDateShiftF019(@RequestParam String date,@RequestParam String shift) {
        return spunlaceService1.getByDateShiftF019(date,shift);
    }
	
	@GetMapping("/ShiftWiseWasteReportSpunlace/findByDateShiftPrintApi")
    public ResponseEntity<?> findByDateShiftPrintApiF019(@RequestParam String date,@RequestParam String shift) {
        return spunlaceService1.getByDateShiftPrintApiF019(date,shift);
    }
	
	@GetMapping("/ShiftWiseWasteReportSpunlace/getSummary")
    public ResponseEntity<?> getShiftWiseWasteReportSummary(HttpServletRequest http) {
        return spunlaceService1.getShiftWiseWasteReportSummary(http);
    }
	
	@PutMapping("/ShiftWiseWasteReportSpunlace/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF019(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = spunlaceService1.approveRejectionF019(approvalResponse, http);
		return resp;
	}
	
//	========================================== PH-PRD02/F-024 ==================================================

	@PostMapping("/SanitizationOfMachinesAndSurfaces/SaveSMS")
	public ResponseEntity<?> SaveSMS(HttpServletRequest http, @Valid @RequestBody SanitizationOfMachineAndSurfacesF024 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SaveSMSF024(details, http);
 
		return response;
	}
	
	@PostMapping("/SanitizationOfMachinesAndSurfaces/SubmitSMS")
	public ResponseEntity<?> SubmitSMS(HttpServletRequest http, @Valid @RequestBody SanitizationOfMachineAndSurfacesF024 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SubmitSMSF024(details, http);
 
		return response;
	}
	
	@GetMapping("/SanitizationOfMachinesAndSurfaces/findByMonthYearWeek")
    public ResponseEntity<?> findByMonthYearWeek024(@RequestParam String month,@RequestParam String year,@RequestParam String week) {
        return spunlaceService1.getByMonthYearWeekF024(month,year,week);
    }
	
	@GetMapping("/SanitizationOfMachinesAndSurfaces/findByMonthYearPrintApi")
    public ResponseEntity<?> findByMonthYearPrintApiF024(@RequestParam String month,@RequestParam String year) {
        return spunlaceService1.findByMonthYearPrintApiF024(month,year);
    }
	
	@GetMapping("/SanitizationOfMachinesAndSurfaces/getSMSSummary")
    public ResponseEntity<?> getSMSSummary(HttpServletRequest http) {
        return spunlaceService1.getSMSSummary(http);
    }
	
	@PutMapping("/SanitizationOfMachinesAndSurfaces/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF024(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = spunlaceService1.approveRejectionF024(approvalResponse, http);
		return resp;
	}
	
//	========================================== PH-PRD02/F-011 ==================================================

	@PostMapping("/ProductChangeOverCheckList/SaveProductChangeOverCheckList")
	public ResponseEntity<?> SaveProductChangeOver(HttpServletRequest http, @Valid @RequestBody ProductChangeOverCheckListSpunlaceF011 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SaveProductChangeOver(details, http);
 
		return response;
	}
	
	@PostMapping("/ProductChangeOverCheckList/SubmitProductChangeOverCheckList")
	public ResponseEntity<?> SubmitProductChangeOver(HttpServletRequest http, @Valid @RequestBody ProductChangeOverCheckListSpunlaceF011 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SubmitProductChangeOver(details, http);
 
		return response;
	}
	
	@GetMapping("/ProductChangeOverCheckList/findByDateShiftOrderNo")
    public ResponseEntity<?> findByDateShiftOrderNoF011(@RequestParam String date,@RequestParam String shift,@RequestParam String orderNo) {
        return spunlaceService1.getByDateShiftOrderNoF011(date,shift,orderNo);
    }
	
	@GetMapping("/ProductChangeOverCheckList/findByDateShiftOrderNoPrintApi")
    public ResponseEntity<?> findByDateShiftOrderNoPrintApi(@RequestParam String date,@RequestParam String shift,@RequestParam String orderNo) {
        return spunlaceService1.getByDateShiftOrderNoPrintF011(date,shift,orderNo);
    }
	
	@GetMapping("/ProductChangeOverCheckList/getSummary")
    public ResponseEntity<?> getProductChangeOverSummary(HttpServletRequest http) {
        return spunlaceService1.getProductChangeOverSummary(http);
    }
	
	@PutMapping("/ProductChangeOverCheckList/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF011(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = spunlaceService1.approveRejectionF011(approvalResponse, http);
		return resp;
	}
	
//	========================================== PH-PRD02/F-025 ==================================================

	@PostMapping("/HandSanitizationReport/SaveHandSanitizationReport")
	public ResponseEntity<?> SaveHandSanitizationReport(HttpServletRequest http, @Valid @RequestBody SpunlaceHandSanitizationReportF025 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SaveHandSanitizationReportF025(details, http);
 
		return response;
	}
	
	@PostMapping("/HandSanitizationReport/SubmitHandSanitizationReport")
	public ResponseEntity<?> SubmitHandSanitizationReport(HttpServletRequest http, @Valid @RequestBody SpunlaceHandSanitizationReportF025 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SubmitHandSanitizationReport(details, http);
 
		return response;
	}
	
	@GetMapping("/HandSanitizationReport/findByDateShift")
    public ResponseEntity<?> findByDateShiftF025(@RequestParam String date,@RequestParam String shift) {
        return spunlaceService1.getByDateShiftF025(date,shift);
    }
	
	@GetMapping("/HandSanitizationReport/findByDateShiftPrintApi")
    public ResponseEntity<?> findByDateShiftPrintApiF025(@RequestParam String date,@RequestParam String shift) {
        return spunlaceService1.getByDateShiftPrintApiF025(date,shift);
    }
	
	@GetMapping("/HandSanitizationReport/getSummary")
    public ResponseEntity<?> getHandSanitizationReportSummary(HttpServletRequest http) {
        return spunlaceService1.getHandSanitizationReportSummary(http);
    }
	
	@PutMapping("/HandSanitizationReport/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF025(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = spunlaceService1.approveRejectionF025(approvalResponse, http);
		return resp;
	}
	
//	========================================== PH-PRD02/F-023 ==================================================

	@PostMapping("/MachineCleaningRecord/SaveMachineCleaningRecord")
	public ResponseEntity<?> SaveMachineCleaningRecord(HttpServletRequest http, @Valid @RequestBody MachineCleaningRecordF023 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SaveMachineCleaningRecordF023(details, http);
 
		return response;
	}
	
	@PostMapping("/MachineCleaningRecord/SubmitMachineCleaningRecord")
	public ResponseEntity<?> SubmitMachineCleaningRecord(HttpServletRequest http, @Valid @RequestBody MachineCleaningRecordF023 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SubmitMachineCleaningRecordF023(details, http);
 
		return response;
	}
	
	@GetMapping("/MachineCleaningRecord/getByDate")
    public ResponseEntity<?> getByDateF023(@RequestParam String date) {
        return spunlaceService1.getByDateF023(date);
    }
	
	@GetMapping("/MachineCleaningRecord/findByMonthYearPrintApi")
    public ResponseEntity<?> findByMonthYearPrintApiF023(@RequestParam String month,@RequestParam String year) {
        return spunlaceService1.findByMonthYearPrintApiF023(month,year);
    }
	
	@GetMapping("/MachineCleaningRecord/getMachineCleaningSummary")
    public ResponseEntity<?> getMachineCleaningRecordSummary(HttpServletRequest http) {
        return spunlaceService1.getMachineCleaningRecordSummary(http);
    }
	
	@PutMapping("/MachineCleaningRecord/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF023(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = spunlaceService1.approveRejectionF023(approvalResponse, http);
		return resp;
	}
	
//	========================================== PH-PRD02/F-017 ==================================================

	@PostMapping("/ShiftWiseSliterWinderProdReport/SaveShiftWiseSliterWinderProdReport")
	public ResponseEntity<?> SaveShiftWiseSliterWinderProdReportF017(HttpServletRequest http, @Valid @RequestBody ShiftWiseSliterWinderProdReportF017 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SaveShiftWiseSliterWinderProdReportF017(details, http);
 
		return response;
	}
	
	@PostMapping("/ShiftWiseSliterWinderProdReport/SubmitShiftWiseSliterWinderProdReport")
	public ResponseEntity<?> SubmitShiftWiseSliterWinderProdReportF017(HttpServletRequest http, @Valid @RequestBody ShiftWiseSliterWinderProdReportF017 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = spunlaceService1.SubmitShiftWiseSliterWinderProdReportF017(details, http);
 
		return response;
	}
	
	@GetMapping("/ShiftWiseSliterWinderProdReport/getByDateShiftOrderNoPrintApi")
    public ResponseEntity<?> getByDateShiftOrderNoPrintApiF017(@RequestParam String date,@RequestParam String shift,@RequestParam String orderNo) {
        return spunlaceService1.getByDateShiftOrderNoPrintApiF017(date,shift,orderNo);
    }
	
	@GetMapping("/ShiftWiseSliterWinderProdReport/getByDateShiftOrderNo")
    public ResponseEntity<?> getByDateShiftOrderNoF017(@RequestParam String date,@RequestParam String shift,@RequestParam String orderNo) {
        return spunlaceService1.getByDateShiftOrderNoF017(date,shift,orderNo);
    }
	
	@GetMapping("/ShiftWiseSliterWinderProdReport/getSummary")
    public ResponseEntity<?> getSummaryF017(HttpServletRequest http) {
        return spunlaceService1.getSummaryF017(http);
    }
	
	@PutMapping("/ShiftWiseSliterWinderProdReport/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF017(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = spunlaceService1.approveRejectionF017(approvalResponse, http);
		return resp;
	}
}
