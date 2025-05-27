package com.focusr.Precot.mssql.database.controller.bleaching;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.model.bleaching.BMRProcessDeviationRecord;
import com.focusr.Precot.mssql.database.model.bleaching.BMR_ManufacturingSteps;
import com.focusr.Precot.mssql.database.model.bleaching.BMR_ProcessDelayEqupment;
import com.focusr.Precot.mssql.database.model.bleaching.BMR_Summary_Bleach;
import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrAnnexureList;
import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrCompletionTable;
import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrLaydownMapping;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummary;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummaryProductionDetails;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummaryRecordVerification;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachBmrLaydownMappingRepository;
import com.focusr.Precot.mssql.database.service.bleaching.BleachBmrSummaryService;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.util.SCAUtil;

@RestController
@RequestMapping("/api/bleaching/summary")
public class BleachBmrSummaryController {

	@Autowired
	private BleachBmrSummaryService bmrSummaryService;
	@Autowired
	private BleachBmrLaydownMappingRepository bleachbmrlaydownmappingrepository;

	@GetMapping("/batchByBleach")
	public ResponseEntity<?> getBleachSummary(@RequestParam Map<String, String> requestParams, Principal principal) {

		String bmr_no = requestParams.get("bmr_no");

		ResponseEntity<?> resp = bmrSummaryService.getBatchByBMR(bmr_no);
		return resp;

	}

	@PostMapping("/createChemicals")
	public ResponseEntity<?> enterChemicalDetails(@Valid @RequestBody BmrSummary summaryObj, HttpServletRequest http) {

		ResponseEntity<?> resp = bmrSummaryService.createChemical_PackingDetails(summaryObj, http);
		return resp;
	}

	@PostMapping("/SubmitChemicals")
	public ResponseEntity<?> SubmitChemicals(@Valid @RequestBody BmrSummary summaryObj, HttpServletRequest http) {

		ResponseEntity<?> resp = bmrSummaryService.SubmitChemicals(summaryObj, http);
		return resp;
	}

	@GetMapping("/chemicalDetailsDate")
	public ResponseEntity<?> getBMRSummaryDate(@RequestParam Map<String, String> requestParams, Principal principal) {
		String bmr_no = requestParams.get("bmr_no");
		String date = requestParams.get("date");
		ResponseEntity<?> resp = bmrSummaryService.getChemicalDetailsByDateBMR(bmr_no, date);
		return resp;
	}

	@GetMapping("/chemicalDetailsbyBmr")
	public ResponseEntity<?> getBMRSummaryByBMR(@RequestParam Map<String, String> requestParams, Principal principal) {
		String bmr_no = requestParams.get("bmr_no");
		ResponseEntity<?> resp = bmrSummaryService.getChemicalDetailsByBMR(bmr_no);
		return resp;
	}

	// BMR PRODUCTION DETAILS

	@GetMapping("/fetchProductionDetails")
	public ResponseEntity<?> productionDetailsByBMR(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String bmr_no = requestParams.get("bmr_no");
		ResponseEntity<?> resp = bmrSummaryService.getProductionDetails(bmr_no);
		return resp;

	}

	@PostMapping("/submitProductionDetails")
	public ResponseEntity<?> submitProductionDetails(@Valid @RequestBody BmrSummaryProductionDetails productionDetails,
			Principal principal) {

		ResponseEntity<?> resp = bmrSummaryService.submitProductionDetails(productionDetails);
		return resp;
	}
	
	
	@PostMapping("/saveProductionDetails")
	public ResponseEntity<?> saveProductionDetails(@Valid @RequestBody BmrSummaryProductionDetails productionDetails, HttpServletRequest http,
			Principal principal) {

		ResponseEntity<?> resp = bmrSummaryService.saveProductionDetails(productionDetails, http);
		return resp;
	}
	
	
	@GetMapping("/getProductionDetailsByBmr")
	public ResponseEntity<?> getproductionDetailsByBMR(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String bmr_no = requestParams.get("bmr_no");
		ResponseEntity<?> resp = bmrSummaryService.getProductionStepsByBMR(bmr_no);
		return resp;

	}
	

	// MANUFACTURER STEPS
	// 01
	@PostMapping("/saveManufacturingSteps")
	public ResponseEntity<?> saveManufactureDetails(@Valid @RequestBody BMR_ManufacturingSteps productionDetails,
			Principal principal, HttpServletRequest http) {

		ResponseEntity<?> resp = bmrSummaryService.saveManufacturerSteps(productionDetails, http);
		return resp;
	}

	// 01
	@PostMapping("/submitManufacturingSteps")
	public ResponseEntity<?> submitManufactureDetails(@Valid @RequestBody BMR_ManufacturingSteps productionDetails,
			Principal principal, HttpServletRequest http) {

		ResponseEntity<?> resp = bmrSummaryService.submitManufacturerSteps(productionDetails, http);
		return resp;
	}

	@GetMapping("/fetchManufactureDetails")
	public ResponseEntity<?> manufacturerDetailsByBMR(@RequestParam Map<String, String> requestParams) {
		String bmr_no = requestParams.get("bmr_no");
		ResponseEntity<?> resp = bmrSummaryService.getManufacturerStepsByBMR(bmr_no);
		return resp;

	}

	// MACHINE OPERATIONS PARAMATERS
//02
	@PostMapping("/saveMachineOperations")
	public ResponseEntity<?> saveMachineOperations(@Valid @RequestBody BMR_Summary_Bleach summary_Bleach,
			HttpServletRequest http) {
		ResponseEntity<?> resp = bmrSummaryService.saveMachineOperations(summary_Bleach, http);
		return resp;
	}

//02
	@PostMapping("/submitMachineOperations")
	public ResponseEntity<?> submitMachineOperations(@Valid @RequestBody BMR_Summary_Bleach summary_Bleach,
			HttpServletRequest http) {
		ResponseEntity<?> resp = bmrSummaryService.submitMachineOperations(summary_Bleach, http);
		return resp;
	}

	@GetMapping("/machineOperationsBmr")
	public ResponseEntity<?> getMachineOperationsByBMR(@RequestParam Map<String, String> requestParams) {
		String bmr_no = requestParams.get("bmr_no");
		ResponseEntity<?> resp = bmrSummaryService.getMachineOperationsByBMR(bmr_no);
		return resp;
	}

	// save 03
	@PostMapping("/saveRecordVerification")
	public ResponseEntity<?> saveRecordVerification(@Valid @RequestBody BmrSummaryRecordVerification summary_Bleach,
			HttpServletRequest http) {
		ResponseEntity<?> resp = bmrSummaryService.SaveRecordVerification(summary_Bleach, http);
		return resp;
	}

	// submit 03
	@PostMapping("/SubmitRecordVerification")
	public ResponseEntity<?> submitRecordVerification(@Valid @RequestBody BmrSummaryRecordVerification summary_Bleach,
			HttpServletRequest http) {
		ResponseEntity<?> resp = bmrSummaryService.SubmitRecordVerification(summary_Bleach, http);
		return resp;
	}

	@GetMapping("/recordVerificationBmr")
	public ResponseEntity<?> getRecordVerificationByBMR(@RequestParam Map<String, String> requestParams) {
		String bmr_no = requestParams.get("bmr_no");
		ResponseEntity<?> resp = bmrSummaryService.getRecordVerificationByBMR(bmr_no);
		return resp;
	}

	// SHOPAPGE DETAILS

	@GetMapping("/shoppage")
	public ResponseEntity<?> getShoppageDetails(@RequestParam Map<String, String> requestParams) {

		String date1 = requestParams.get("date1");
		String date2 = requestParams.get("date2");
		ResponseEntity<?> resp = bmrSummaryService.getShoppageDetailsForDate(date1, date2);
		return resp;

	}

//	@PostMapping("/submitProcessDeviationRecord")
//	public ResponseEntity<?> submitProcessDeviationRecord(@RequestBody List<BMRProcessDeviationRecord> record) {
//		try {
//			List<BMRProcessDeviationRecord> savedRecord = bmrSummaryService.submitProcessDeviationRecord(record);
//			return new ResponseEntity<>(savedRecord, HttpStatus.OK);
//		} catch (IllegalArgumentException ex) {
//			return new ResponseEntity<>(new ApiResponse(false, ex.getMessage()), HttpStatus.BAD_REQUEST);
//		} catch (Exception ex) {
//			String msg = new SCAUtil().getErrorMessage(ex);
//			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Process Deviation Record: " + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//	}
	
	@PostMapping("/saveProcessDeviationRecord")
	public ResponseEntity<?> saveProcessDeviationRecord(@Valid @RequestBody List<BMRProcessDeviationRecord> record, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bmrSummaryService.saveProcessDeviationRecord(record);
		return resp;
	}
	
	
	@PostMapping("/submitProcessDeviationRecord")
	public ResponseEntity<?> submitProcessDeviationRecord(@Valid @RequestBody List<BMRProcessDeviationRecord> record, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bmrSummaryService.submitProcessDeviationRecords(record);
		return resp;
	}
	

	@GetMapping("/product")
	public ResponseEntity<?> productReconillation(@RequestParam Map<String, String> requestParams) {
		String bmr_no = requestParams.get("bmr_no");
		ResponseEntity<?> resp = bmrSummaryService.getProductReconillation2(bmr_no);
		return resp;
	}

	@PostMapping("/submitBmrCompletion")
	public ResponseEntity<?> submitBmrCompletion(@Valid @RequestBody BleachBmrCompletionTable bleachBmrCompletion) {
		ResponseEntity<?> resp = bmrSummaryService.submitBmrCompletion(bleachBmrCompletion);
		return resp;
	}

	@GetMapping("/checkVerification")
	public ResponseEntity<?> checkVerificationRecords(@RequestParam Map<String, String> requestParams) {
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		ResponseEntity<?> resp = bmrSummaryService.verficationRecords(date, shift);
		return resp;
	}

	// BMR TOTAL SUMMARY

	@GetMapping("/getFullSummary")
	public ResponseEntity<?> getTotalBMRSummary(@RequestParam Map<String, String> requestParams) {

		String bmr_no = requestParams.get("bmr_no");
		ResponseEntity<?> resp = bmrSummaryService.getFullSummary(bmr_no);
		return resp;

	}

	// GET BMR AND LAYDOWN LOV

	@GetMapping("/allBmrAndLaydownLov")
	public ResponseEntity<?> allBmrAndLaydownLov() {
		List<BleachBmrLaydownMapping> bmrLaydownLov = new ArrayList<>();
		try {
			bmrLaydownLov = bleachbmrlaydownmappingrepository.fetchBMRAndLaydownLov();
		} catch (Exception ex) {
			String msg = new SCAUtil().getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to get Lov "), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(bmrLaydownLov, HttpStatus.OK);
	}

	@GetMapping("/getAnnexure")
	public ResponseEntity<?> getAnnexure(@RequestParam Map<String, String> requestParams) {

		String bmr_no = requestParams.get("bmr_no");
		ResponseEntity<?> resp = bmrSummaryService.getAnnexureByBmr(bmr_no);
		return resp;

	}

	@PostMapping("/submitAnnexureCompletion")
	public ResponseEntity<?> submitAnnexureCompletion(@Valid @RequestBody BleachBmrAnnexureList bleachBmrCompletion, HttpServletRequest http) {
		ResponseEntity<?> resp = bmrSummaryService.submitAnnexureBmr(bleachBmrCompletion, http);
		return resp;
	}
	
	
	@PostMapping("/saveAnnexureCompletion")
	public ResponseEntity<?> saveAnnexureCompletion(@Valid @RequestBody BleachBmrAnnexureList bleachBmrCompletion, HttpServletRequest http) {
		ResponseEntity<?> resp = bmrSummaryService.saveAnnexureBmr(bleachBmrCompletion, http);
		return resp;
	}
	
	
	@GetMapping("/getApprovedVerifiers")
	public ResponseEntity<?> getDistinctAnnexureVerifiers(Principal principal) {
		
		ResponseEntity<?> resp = bmrSummaryService.getDistinctAnnexureVerifiedNames();
		return resp;
	}
	
	
	// 13/aug/2024--cr
	// Get Batch by BMR for Bleaching job card after cake press submit

	@GetMapping("/batchByBleach/bleachjobcard")
	public ResponseEntity<?> getBatchByCakepressbmr(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String bmr_no = requestParams.get("bmr_no");

		ResponseEntity<?> resp = bmrSummaryService.getBatchByCakepress(bmr_no);
		return resp;

	}

	// Get Batch by BMR for Hydro extractor after bleaching job card submit

	@GetMapping("/batchByBleach/hydroextractor")
	public ResponseEntity<?> getBatchByBleachingJobCard(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String bmr_no = requestParams.get("bmr_no");

		ResponseEntity<?> resp = bmrSummaryService.getBatchByBleachjobcard(bmr_no);
		return resp;

	}

	// Get no of bale and weight by passing the params to shift log book from pde

	@GetMapping("/getNoOfBaleAndWt")
	public ResponseEntity<?> getNoOfBaleAndWt(@RequestParam Map<String, String> requestParams, Principal principal) {

		String date = requestParams.get("date");
		String shift = requestParams.get("shift");

		ResponseEntity<?> resp = bmrSummaryService.getBaleDetailsByDateShiftOrder(date, shift);
		return resp;

	}

	// New Approch

	@PostMapping("/SaveProcessDelayEqupment")
	public ResponseEntity<?> ProcessDelayEqupment(@Valid @RequestBody BMR_ProcessDelayEqupment details) {
 
		ResponseEntity<?> resp = bmrSummaryService.saveStoppage(details);
		return resp;
	}
	
	
	@PostMapping("/SubmitProcessDelayEqupment")
	public ResponseEntity<?> SubmitProcessDelayEqupment(@Valid @RequestBody BMR_ProcessDelayEqupment details) {
 
		ResponseEntity<?> resp = bmrSummaryService.submitStoppage(details);
		return resp;
	}

	@GetMapping("/GetProcessDelayEqupment")
	public ResponseEntity<?> getBatchByBleachingJobCard(@RequestParam Map<String, String> requestParams) {

		String bmr_no = requestParams.get("bmr_no");

		ResponseEntity<?> resp = bmrSummaryService.ProcessDelayEqupment(bmr_no);
		return resp;

	}
	
	
		// CR LOVs
	
	@GetMapping("/getQAInspectorByDepartment")
	public ResponseEntity<?> getQAInspectorByDepartment(@RequestParam Map<String, String> requestParams) {
		
		Long dept_id = Long.valueOf(requestParams.get("dept_id"));
		
		ResponseEntity<?> resp = bmrSummaryService.getQAInspectorLOV(dept_id);
		return resp;
	}
	
	@GetMapping("/getQAManagerByDepartment")
	public ResponseEntity<?> getQAManagerByDepartment(@RequestParam Map<String, String> requestParams) {
		
		Long dept_id = Long.valueOf(requestParams.get("dept_id"));
		
		ResponseEntity<?> resp = bmrSummaryService.getQAManagerLOV(dept_id);
		return resp;
	}
	
	
	
	// NEW LOV OF APPROVED BMR NUMBER
	   
    @GetMapping("/fetchApprovedBMR")
    public ResponseEntity<?> approvedBMRforPrint(@RequestParam Map<String, String> requestParams, Principal principal) {
       
        String formNumber = requestParams.get("formNumber");
       
        ResponseEntity<?> resp = bmrSummaryService.approvedBMR(formNumber);
        return resp;
    }

}
