package com.focusr.Precot.mssql.database.controller.bleaching;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.focusr.Precot.mssql.database.model.bleaching.BleachContAbsBleachedCottonF18;
import com.focusr.Precot.mssql.database.model.bleaching.BleachContRawCottonF05;
import com.focusr.Precot.mssql.database.model.bleaching.BleachMachineCleaningRecordF16;
import com.focusr.Precot.mssql.database.model.bleaching.BleachShiftLogBookF36;
import com.focusr.Precot.mssql.database.model.bleaching.EquipLogBookHydroExtractorF11;
import com.focusr.Precot.mssql.database.model.bleaching.MetalDetectorCheckListF03;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachContAbsBleachedCottonF18Repository;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.bleaching.BleachingService1;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.util.SCAUtil;

/*
 * F05 - CONTAMINATION CHECKING REPORT (RAW COTTON)
 * F11 - HYDRO EXTRACTOR
 * F03 - METAL DETECTOR CHECKLIST
 * F18 - CONTAMINATION CHECKING REPORT (AB COTTON)
 */

@RestController
@RequestMapping("/api/bleaching/Service")
public class BleachingController1 {

	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	@Autowired
	private BleachingService1 bleachingService1;
	@Autowired
	private BleachContAbsBleachedCottonF18Repository bleachContAbsBleachedCottonF18Repository;
	SCAUtil sca = new SCAUtil();

	private static final Logger log = LoggerFactory.getLogger(BleachShiftLogBookF36.class);

//  **************************************** PRD01/F-05  *************************************************
	// PRD01/F-05
//	@PostMapping("/BleachContRawCotton/CreateOrUpdate")
//	public ResponseEntity<?> createOrUpdateBleachContRawCotton(HttpServletRequest http, @Valid @RequestBody BleachContRawCottonF05 bleachContRawCotton,
//			BindingResult result, Principal principal) {
//
//		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
//		if (errorMap != null)
//			return errorMap;
//		ResponseEntity<?> response = bleachingService1.createOrUpdateBleachContRawCotton(bleachContRawCotton, http);
//
//		return response;
//	}
	@PostMapping("/BleachContRawCotton/SaveBleachContRawCotton")
	public ResponseEntity<?> SaveBleachContRawCotton(HttpServletRequest http,
			@Valid @RequestBody BleachContRawCottonF05 bleachContRawCotton, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = bleachingService1.SaveBleachContRawCotton(bleachContRawCotton, http);

		return response;
	}

	@PostMapping("/BleachContRawCotton/SubmitBleachContRawCotton")
	public ResponseEntity<?> SubmitBleachContRawCotton(HttpServletRequest http,
			@Valid @RequestBody BleachContRawCottonF05 bleachContRawCotton, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = bleachingService1.SubmitBleachContRawCotton(bleachContRawCotton, http);

		return response;
	}
//	@PutMapping("/BleachContRawCotton/approveOrRejectBleachContRawCotton")
//	public ResponseEntity<?> approveOrRejectBleachContRawCotton(HttpServletRequest http,@Valid @RequestBody ApproveResponse approveResponse, BindingResult result, Principal principal)
//	{
//		ResponseEntity<?> response = bleachingService1.approveBleachContRawCotton(approveResponse, http);
//		return response;
//	}

	// PRD01/F-05
	@GetMapping("/BleachContRawCotton/GetByFormatId/{formatNo}")
	public ResponseEntity<?> getBleachContRawCottonByFormatId(@PathVariable String formatNo) {
		return bleachingService1.getBleachContRawCottonByFormatNo(formatNo);
	}

	@GetMapping("/BleachContRawCotton/GetByPhNo")
	public ResponseEntity<?> getBleachContRawCottonByPhNo(@RequestParam String phNo) {
		return bleachingService1.getBleachContRawCottonByPhNo(phNo);
	}

	// PRD01/F-05
	@GetMapping("/BleachContRawCotton/GetById/{id}")
	public ResponseEntity<?> getBleachContRawCottonById(@PathVariable Long id) {
		return bleachingService1.getBleachContRawCottonById(id);
	}

	// PRD01/F-05
	@GetMapping("/BleachContRawCotton/GetAll")
	public ResponseEntity<?> getAllBleachContRawCotton() {
		return bleachingService1.getAllBleachContRawCotton();
	}
//    @GetMapping("/BleachContRawCotton/getAllSupervisorNotSubmitted")
//    public ResponseEntity<?> getAllSupervisorNotSubmittedF05(HttpServletRequest http) {
//        return bleachingService1.getAllSupervisorNotSubmittedF05(http);
//    }

	@GetMapping("/BleachContRawCotton/getAllSupervisorNotSubmitted")
	public ResponseEntity<?> getAllSupervisorNotSubmittedF05() {
		return bleachingService1.getAllSupervisorNotSubmittedF05();
	}

	@GetMapping("/BleachContRawCotton/getAllHodNotSubmitted")
	public ResponseEntity<?> getAllHodNotSubmittedF05() {
		return bleachingService1.getAllHodNotSubmittedF05();
	}
	@GetMapping("/BleachContRawCotton/getByDateF05")
	public ResponseEntity<?> getByDateF05(@RequestParam  String phNo) {
		return bleachingService1.getByDateDetailsF05(phNo);
	}
	
	
	@PutMapping("/approveRawcottonF05")
	public ResponseEntity<?> approveRawCottonF05(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bleachingService1.approveRawCottonF05(approvalResponse, http);
		return resp;
	}
	

//    **************************************** PRD01/F-18 *************************************************
// // PRD01/F-18 
// 	@PostMapping("/BleachAbsCotton/CreateOrUpdate")
// 	public ResponseEntity<?> createOrUpdateBleachAbsCotton(HttpServletRequest http, @Valid @RequestBody BleachContAbsBleachedCottonF18 BleachAbsCotton,
// 			BindingResult result, Principal principal) {
//
// 		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
// 		if (errorMap != null)
// 			return errorMap;
// 		ResponseEntity<?> response = bleachingService1.createOrUpdateBleachAbsCotton(BleachAbsCotton, http);
//
// 		return response;
// 	}
	@PostMapping("/BleachAbsCotton/SaveBleachAbsCotton")
	public ResponseEntity<?> SaveBleachAbsCotton(HttpServletRequest http,
			@Valid @RequestBody BleachContAbsBleachedCottonF18 BleachAbsCotton, BindingResult result,
			Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = bleachingService1.SaveBleachAbsCotton(BleachAbsCotton, http);

		return response;
	}

	@PostMapping("/BleachAbsCotton/SubmitBleachAbsCotton")
	public ResponseEntity<?> SubmitBleachAbsCotton(HttpServletRequest http,
			@Valid @RequestBody BleachContAbsBleachedCottonF18 BleachAbsCotton, BindingResult result,
			Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = bleachingService1.SubmitBleachAbsCotton(BleachAbsCotton, http);

		return response;
	}

	// PRD01/F-18
 	@PutMapping("/BleachAbsCotton/approveOrRejectBleachAbsCotton")
	public ResponseEntity<?> approveOrRejectBleachAbsCotton(HttpServletRequest http,@Valid @RequestBody ApproveResponse approveResponse, BindingResult result, Principal principal)
	{
		ResponseEntity<?> response = bleachingService1.approveBleachAbsCotton(approveResponse, http);
		return response;
	}
 	
	
	// PRD01/F-18
	@GetMapping("/BleachAbsCotton/GetByFormatId/{formatNo}")
	public ResponseEntity<?> getBleachAbsCottonByFormatId(@PathVariable String formatNo) {
		return bleachingService1.getBleachAbsCottonByFormatNo(formatNo);
	}

	// PRD01/F-18
	@GetMapping("/BleachAbsCotton/GetById/{id}")
	public ResponseEntity<?> getBleachAbsCottonById(@PathVariable Long id) {
		return bleachingService1.getBleachAbsCottonById(id);
	}

	// PRD01/F-18
	@GetMapping("/BleachAbsCotton/GetAll")
	public ResponseEntity<?> getAllBleachAbsCotton() {
		return bleachingService1.getAllBleachAbsCotton();
	}

	@GetMapping("/BleachAbsCotton/GetByBmr")
	public ResponseEntity<?> GetByBmrBleachAbsCotton(@RequestParam String bmrNo) {
		return bleachingService1.getGetByBmrBleachAbsCotton(bmrNo);
	}

	@GetMapping("/BleachAbsCottonByBmrAndSubbatchAndBale")
	public ResponseEntity<?> getByBmrBatchBale(@RequestParam("bmrNo") String bmrNo,
			@RequestParam("batchNo") Long batchNo, @RequestParam("baleNo") String baleNo) {
		try {
			List<BleachContAbsBleachedCottonF18> results = bleachContAbsBleachedCottonF18Repository
					.findByBmrNoAndBatchNoAndBaleNo(bmrNo, batchNo, baleNo);
			return new ResponseEntity<>(results, HttpStatus.OK);
		} catch (Exception e) {
			log.error("***************** Unable to get list Of Shift Log Book Details *********************\n", e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to get list Of Shift Log Book Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}

	}
//     @GetMapping("/BleachAbsCotton/getAllSupervisorNotSubmitted")
//     public ResponseEntity<?> getAllSupervisorNotSubmitted(HttpServletRequest http) {
//         return bleachingService1.getAllSupervisorNotSubmittedF18(http);
//     }

	@GetMapping("/BleachAbsCotton/getAllSupervisorNotSubmitted")
	public ResponseEntity<?> getAllSupervisorNotSubmitted() {
		return bleachingService1.getAllSupervisorNotSubmittedF18();
	}

	@GetMapping("/BleachAbsCotton/getAllHodNotSubmitted")
	public ResponseEntity<?> getAllHodNotSubmitted() {
		return bleachingService1.getAllHodNotSubmittedF18();
	}
	 
	@GetMapping("/BleachAbsCotton/batchNoLov")
		public ResponseEntity<?> bmrBasedBatchNoLov(@RequestParam String bmrNo) {
			return bleachingService1.bmrBasedBatchNoLov(bmrNo);
		}
		@GetMapping("/BleachAbsCotton/baleNoLov")
		public ResponseEntity<?> batchBasedBaleNoLov(@RequestParam String bmrNo,@RequestParam Long batchNo) {
			return bleachingService1.batchBasedBaleNoLov(bmrNo,batchNo);
		}
		
		//--BMR LOV--
		@GetMapping("/BleachAbsCotton/bmrLov")
		public ResponseEntity<?> bmrLovF18() {
			return bleachingService1.bmrLovF18();
		}
 

//  **************************************** PRD01/F-11 *************************************************
//     @PostMapping("/EquipLogHydroExtracotor/CreateOrUpdate")
//     public ResponseEntity<?> createOrUpdateEquipmentLogsHydroExtractor(HttpServletRequest http, @Valid @RequestBody EquipLogBookHydroExtractorF11 details,
//			BindingResult result, Principal principal) {
// 
//		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
//		if (errorMap != null)
//			return errorMap;
//		ResponseEntity<?> response = bleachingService1.createOrUpdateUsageLogHydroExtractor(details, http);
// 
//		return response;
//	}
	@GetMapping("/EquipLogHydroExtracotor/GetById/{id}")
	public ResponseEntity<?> getEquipLogHydroExtracotorById(@PathVariable Long id) {
		return bleachingService1.getUsageLogHydroExtractorById(id);
	}

	@GetMapping("/EquipLogHydroExtracotor/GetAll")
	public ResponseEntity<?> getAllEquipLogHydroExtracotor() {
		return bleachingService1.getAllUsageLogHydroExtractor();
	}

	@GetMapping("/EquipLogHydroExtracotor/GetByBmr")
	public ResponseEntity<?> GetByBmrEquipLogHydroExtracotor(@RequestParam String bmrNo) {
		return bleachingService1.getByBmrUsageLogHydroExtractor(bmrNo);
	}

	@GetMapping("/EquipLogHydroExtracotor/GetByBmrRange")
	public ResponseEntity<?> GetByBmrRangeF11(@RequestParam String fromBmr, @RequestParam String toBmr) {
		return bleachingService1.getByBmrRangeF11(fromBmr, toBmr);
	}

	@PostMapping("/EquipLogHydroExtracotor/SubmitUsageLogHydroExtractor")
	public ResponseEntity<?> SubmitUsageLogHydroExtractor(HttpServletRequest http,
			@Valid @RequestBody EquipLogBookHydroExtractorF11 details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = bleachingService1.SubmitUsageLogHydroExtractor(details, http);

		return response;
	}

	@PostMapping("/EquipLogHydroExtracotor/SaveUsageLogHydroExtractor")
	public ResponseEntity<?> SaveUsageLogHydroExtractor(HttpServletRequest http,
			@Valid @RequestBody EquipLogBookHydroExtractorF11 details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = bleachingService1.SaveUsageLogHydroExtractor(details, http);

		return response;
	}

	@GetMapping("/EquipLogHydroExtracotor/getAllSupervisorNotSubmitted")
	public ResponseEntity<?> getAllSupervisorNotSubmittedF11() {
		return bleachingService1.getAllSupervisorNotSubmittedF11();
	}

	@GetMapping("/EquipLogHydroExtracotor/getAllHodNotSubmitted")
	public ResponseEntity<?> getAllHodNotSubmittedF11() {
		return bleachingService1.getAllHodNotSubmittedF11();
	}

	@GetMapping("/EquipLogHydroExtracotor/getByBmrAndBatchNo")
	public ResponseEntity<?> findByBmrAndBatchNo(@RequestParam String bmrNo, @RequestParam String batchNo) {
		return bleachingService1.findByBmrAndBatchNo(bmrNo, batchNo);
	}

     @PutMapping("/EquipLogHydroExtracotor/approveOrRejectEquipLogHydroExtracotor")
 	public ResponseEntity<?> approveOrRejectEquipLogHydroExtracotor(HttpServletRequest http,@Valid @RequestBody ApproveResponse approveResponse, BindingResult result, Principal principal)
 	{
 		ResponseEntity<?> response = bleachingService1.approveUsageLogHydroExtractor(approveResponse, http);
 		return response;
 	}
//  **************************************** PRD01/F-03 *************************************************

	@PostMapping("/MetalDetectorList/SaveMetalDetectorList")
	public ResponseEntity<?> SaveMetalDetectorList(HttpServletRequest http,
			@Valid @RequestBody MetalDetectorCheckListF03 details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = bleachingService1.SaveMetalDetectorList(details, http);

		return response;
	}

	@PostMapping("/MetalDetectorList/SubmitMetalDetectorList")
	public ResponseEntity<?> SubmitMetalDetectorList(HttpServletRequest http,
			@Valid @RequestBody MetalDetectorCheckListF03 details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = bleachingService1.SubmitMetalDetectorList(details, http);

		return response;
	}

	@GetMapping("/MetalDetectorList/getAllMetalDetectorList")
	public ResponseEntity<?> getByMonthMetalDetectorList() {
		return bleachingService1.getAllMetalDetectorList();
	}

	@GetMapping("/MetalDetectorList/getByMonthMetalDetectorList")
	public ResponseEntity<?> getByMonthMetalDetectorList(@RequestParam int month, @RequestParam int year,
			@RequestParam String section) {
		return bleachingService1.getByMonthMetalDetectorList(month, year, section);
	}

	@GetMapping("/MetalDetectorList/getByDateMetalDetectorList")
	public ResponseEntity<?> getByDateMetalDetectorList(@RequestParam String date, @RequestParam String section) {
		return bleachingService1.getByDateMetalDetectorList(date, section);
	}

	@GetMapping("/MetalDetectorList/getAllSupervisorNotSubmitted")
	public ResponseEntity<?> getAllSupervisorNotSubmittedF03() {
		return bleachingService1.getAllSupervisorNotSubmittedF03();
	}

	@GetMapping("/MetalDetectorList/getAllHodNotSubmitted")
	public ResponseEntity<?> getAllHodNotSubmittedF03() {
		return bleachingService1.getAllHodNotSubmittedF03();
	}
	
	@PutMapping("/MetalDetectorList/approveOrReject")
 	public ResponseEntity<?> approveOrRejectMetalDetectorList(HttpServletRequest http,@Valid @RequestBody ApproveResponse approveResponse, BindingResult result, Principal principal)
 	{
 		ResponseEntity<?> response = bleachingService1.approveOrRejectMetalDetector(approveResponse, http);
 		return response;
 	}
	
//	========================================== PH-PRD02/F-16 ==================================================

	@PostMapping("/MachineCleaningRecord/SaveMachineCleaningRecord")
	public ResponseEntity<?> SaveMachineCleaningRecord(HttpServletRequest http, @Valid @RequestBody BleachMachineCleaningRecordF16 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = bleachingService1.SaveMachineCleaningRecordF16(details, http);
 
		return response;
	}
	
	@PostMapping("/MachineCleaningRecord/SubmitMachineCleaningRecord")
	public ResponseEntity<?> SubmitMachineCleaningRecord(HttpServletRequest http, @Valid @RequestBody BleachMachineCleaningRecordF16 details,
			BindingResult result, Principal principal) {
 
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = bleachingService1.SubmitMachineCleaningRecordF16(details, http);
 
		return response;
	}
	
	@GetMapping("/MachineCleaningRecord/getByDate")
    public ResponseEntity<?> getByDateF16(@RequestParam String date) {
        return bleachingService1.getByDateF16(date);
    }
	
	@GetMapping("/MachineCleaningRecord/findByMonthYearPrintApi")
    public ResponseEntity<?> findByMonthYearPrintApiF16(@RequestParam String month,@RequestParam String year) {
        return bleachingService1.findByMonthYearPrintApiF16(month,year);
    }
	
	@GetMapping("/MachineCleaningRecord/getMachineCleaningSummary")
    public ResponseEntity<?> getMachineCleaningRecordSummary(HttpServletRequest http) {
        return bleachingService1.getMachineCleaningRecordSummary(http);
    }
	
	@PutMapping("/MachineCleaningRecord/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF16(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bleachingService1.approveRejectionF16(approvalResponse, http);
		return resp;
	}
	
}