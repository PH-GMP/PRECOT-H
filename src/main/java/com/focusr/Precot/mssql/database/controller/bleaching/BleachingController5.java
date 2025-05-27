package com.focusr.Precot.mssql.database.controller.bleaching;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
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

import com.focusr.Precot.mssql.database.model.bleaching.BleachAppliedContRawCottonF04;
import com.focusr.Precot.mssql.database.model.bleaching.BleachHandSanitizationABPressF41;
import com.focusr.Precot.mssql.database.model.bleaching.BleachReprocessReportF16;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachReprocessReportHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachHandSanitizationABPressF41Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachReprocessReportRepositoryHistory;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.bleaching.BleachingExcelGenerationService;
import com.focusr.Precot.mssql.database.service.bleaching.BleachingService5;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.payload.ReprocessAuditRequest;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.SCAUtil;

/**
 * 
 * @author Jawahar.M
 * 
 *         Forms - Form 04, Form 14
 */

@RestController
@RequestMapping("/api/bleaching/Service")
public class BleachingController5 {

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private BleachingService5 bleachingService5;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	BleachHandSanitizationABPressF41Repository bleachhandsanitizationabpressf41repository;
	
		// EXCEL SERVICE
	
	@Autowired
	private BleachingExcelGenerationService excelGenerationService;
	
	@Autowired
	private BleachReprocessReportRepositoryHistory reprocessReportRepositoryHistory;

	SCAUtil sca = new SCAUtil();

	@PostMapping("/saveAppliedRawCottonF04")
	public ResponseEntity<?> createOrUpdateAppliedRawCotton(HttpServletRequest http,
			@Valid @RequestBody BleachAppliedContRawCottonF04 appliedContRawCottonF04, BindingResult result,
			Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = bleachingService5.createOrUpdateAppliedRawCotton(appliedContRawCottonF04, http);

		return response;

	}

	@PostMapping("/submitAppliedRawCottonF04")
	public ResponseEntity<?> submitAppliedRawCotton(HttpServletRequest http,
			@Valid @RequestBody BleachAppliedContRawCottonF04 appliedContRawCottonF04, BindingResult result,
			Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = bleachingService5.submitAppliedRawCottonF04(appliedContRawCottonF04, http);

		return response;

	}

//	
	@GetMapping("/getAppliedRawCottonByIdF04")
	public ResponseEntity<?> getAppliedRawCottonById(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		Long id = Long.valueOf(requestParams.get("id"));
		ResponseEntity<?> response = bleachingService5.getAppliedRawCottonById(id);
		return response;
	}

	@GetMapping("/getAppliedRawCottonByBmrNumberF04")
	public ResponseEntity<?> getAppliedRawCottonByBmR(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String bmrNumber = requestParams.get("bmrNumber");
		ResponseEntity<?> response = bleachingService5.getAppliedRawCottonByBmrNumber(bmrNumber);
		return response;
	}

	@GetMapping("/getSupervisorSummeryF04")
	public ResponseEntity<?> getListOfF38(Principal principal, HttpServletRequest http) {

		ResponseEntity<?> message = bleachingService5.getSuperviserF04(http);

		return message;
	}

	@GetMapping("/getHodSummeryF04")
	public ResponseEntity<?> getHodSummeryF04(Principal principal, HttpServletRequest http) {

		ResponseEntity<?> message = bleachingService5.getHodSummeryF04(http);

		return message;
	}
	
	@PutMapping("/approveOrRejectF04")
	public ResponseEntity<?> approveOrRejectF04(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bleachingService5.approveRejectF04(approveResponse, http);
		return resp;
	}
	
	
	@GetMapping("/getBmrDetailsF04")
		public ResponseEntity<?> getBmrDetailsF04(@RequestParam String bmr) {
	 
			ResponseEntity<?> response = bleachingService5.getBmrDetailsF04(bmr);
	 
			return response;
		}	
	
	//Kaviya

	@PostMapping("/getHandSanitizationByShiftAnddate")
	public ResponseEntity<Object> getHandSanitizationbydateAndshift(
			@RequestBody BleachHandSanitizationABPressF41 request) {
		List<BleachHandSanitizationABPressF41> results = bleachhandsanitizationabpressf41repository
				.findByDateAndShift(request.getDate(), request.getShift());

		if (results.isEmpty()) {
			Map<String, String> noDataResponse = new HashMap<>();
			noDataResponse.put("status", "No Data");
			return new ResponseEntity<>(noDataResponse, HttpStatus.OK);
		}

		return new ResponseEntity<>(results, HttpStatus.OK);
	}

	@PostMapping("/createHandSanitizationF41")
	public ResponseEntity<?> saveOrSubmitHandSanitization(HttpServletRequest http,
			@Valid @RequestBody BleachHandSanitizationABPressF41 handSanitization41, BindingResult result,
			Principal principal) {

//		ResponseEntity<?> response = bleachingService5.saveHandSanitization(handSanitization41, http);
		ResponseEntity<?> response = bleachingService5.saveHandSanitizationForm(handSanitization41, http);
		return response;

	}

	@PostMapping("/submitHandSanitizationF41")
	public ResponseEntity<?> submitHandSanitization(HttpServletRequest http,
			@Valid @RequestBody BleachHandSanitizationABPressF41 handSanitization41, BindingResult result,
			Principal principal) {

		ResponseEntity<?> response = bleachingService5.submitHandSanitization(handSanitization41, http);
		return response;

	}
	
	
	
	@GetMapping("/HandSanitizationSummaryForSupervisor")
	 public ResponseEntity<Object> getShiftlogBookF36SummaryForSupervisor(HttpServletRequest http) {
	  Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	     List<BleachHandSanitizationABPressF41> results = bleachhandsanitizationabpressf41repository.getsummaryForSupervisor();
	     
	     if (results.isEmpty()) {
	         Map<String, String> noDataResponse = new HashMap<>();
	         noDataResponse.put("status", "No Data");
	         return new ResponseEntity<>(noDataResponse, HttpStatus.OK);
	     }
	     
	     return new ResponseEntity<>(results, HttpStatus.OK);
	 }
 
 @GetMapping("/HandSanitizationSummaryForHod")
	 public ResponseEntity<Object> getShiftlogBookF36SummaryForHod(HttpServletRequest http) {
	  Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	     List<BleachHandSanitizationABPressF41> results = bleachhandsanitizationabpressf41repository.getsummaryForHod();
	     
	     if (results.isEmpty()) {
	         Map<String, String> noDataResponse = new HashMap<>();
	         noDataResponse.put("status", "No Data");
	         return new ResponseEntity<>(noDataResponse, HttpStatus.OK);
	     }
	     
	     return new ResponseEntity<>(results, HttpStatus.OK);
	 }
	

 	@PutMapping("/approveOrRejectF41")
	public ResponseEntity<?> approveOrRejectF41(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bleachingService5.approveRejectF41(approveResponse, http);
		return resp;
	}
 
 	
 		// REPROCESS REPORT 
 	
 	@PostMapping("/saveReprocessReport")
 	public ResponseEntity<?> saveReprocessReport(@Valid @RequestBody BleachReprocessReportF16 bleachReprocessReportF16, HttpServletRequest http) {
 		
 		ResponseEntity<?> resp = bleachingService5.saveBleachReprocessForm(bleachReprocessReportF16, http);
 		return resp;
 		
 	}
 	
 	
 	@PostMapping("/submitReprocessReport")
 	public ResponseEntity<?> submitReprocessReport(@Valid @RequestBody BleachReprocessReportF16 bleachReprocessReportF16, HttpServletRequest http) {
 		
 		ResponseEntity<?> resp = bleachingService5.submitReprocessForm(bleachReprocessReportF16, http);
 		return resp;
 		
 	}
 	
 	@PutMapping("/approveReprocessReport")
 	public ResponseEntity<?> approveReprocessReport(@Valid @RequestBody ApproveResponse bleachReprocessReportF16, HttpServletRequest http) {
 		
 		ResponseEntity<?> resp = bleachingService5.approveReprocessReport(bleachReprocessReportF16, http);
 		return resp;
 		
 	}
 	
 	@GetMapping("/getReprocessSummary")
 	public ResponseEntity<?> reprocessReportSummary() {
 		
 		ResponseEntity<?> resp = bleachingService5.reprocessSummary();
 		return resp;
 	}
 	
 	@GetMapping("/getReprocessReportById")
 	public ResponseEntity<?> getReprocessListById(@RequestParam Map<String, String> requestParams,
			Principal principal, HttpServletRequest http) {
 		
 		Long id = Long.parseLong(requestParams.get("id"));
 		
 		ResponseEntity<?> resp = bleachingService5.getReprocessReportById(id);
 		return resp;
 	}
 	
 	
 	@GetMapping("/getReprocessReportPrint")
 	public ResponseEntity<?> getReprocessListPrint(@RequestParam Map<String, String> requestParams,
			Principal principal, HttpServletRequest http) {
 		
 		String bmrNumber = requestParams.get("bmrNumber");
		String date = requestParams.get("date");
 		
 		ResponseEntity<?> resp = bleachingService5.getReprocessPrint(date, bmrNumber);
 		return resp;
 	}
 	
 	@GetMapping("/getReprocessReportByUnique")
 	public ResponseEntity<?> getReprocessListByUnique(@RequestParam Map<String, String> requestParams,
			Principal principal, HttpServletRequest http) {
 		
 		String bmrNumber = requestParams.get("bmrNumber");
		String batchNumber = requestParams.get("batchNumber");
 		
 		ResponseEntity<?> resp = bleachingService5.getReprocessReportUnique(bmrNumber, batchNumber);
 		return resp;
 	}

 	
 	
 		// AUDIT EXCEL - REPROCESS
 	
 	@PostMapping("/downloadExcel")
 	public ResponseEntity<?> downloadReprocessExcel(@RequestBody ReprocessAuditRequest summeryrequest, HttpServletResponse response) {
 		
 		Class<?> entityClass = getEntityClass(summeryrequest.getFormName());
		JpaRepository<?, ?> repository = getRepository(summeryrequest.getFormName());

		// Fetch the filtered entities by date range
		List<?> entities = fetchEntitiesByDateRange(summeryrequest, repository);
		
		// Check if entities list is empty
	    if (entities == null || entities.isEmpty()) {
	    	return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
	    }

		// Call the generic Excel generator with the dynamic entity class and list of
		// entities
		return excelGenerationService.generateExcel(response, entities, entityClass, summeryrequest.getFormName());
 		
 	}
 	
 	
 	private Class<?> getEntityClass(String entityName) {
 		
 		switch (entityName.toLowerCase()) {
		case "reprocess":
			return BleachReprocessReportHistory.class;

		default:
			throw new IllegalArgumentException("Entity not found: " + entityName);
		}
 		
 	}
 	
 	
 	private JpaRepository<?, ?> getRepository(String entityName) {
 		
 		switch (entityName.toLowerCase()) {
 		
 		case "reprocess" : 
 			return reprocessReportRepositoryHistory;
 		
 		default:
			throw new IllegalArgumentException("Repository not found for entity: " + entityName);
 			
 		}
 		
 	}
 	
 	private List<?> fetchEntitiesByDateRange(ReprocessAuditRequest summeryrequest, JpaRepository<?, ?> repository) {
 	
 		if("reprocess".equalsIgnoreCase(summeryrequest.getFormName())) {
 			return ( (BleachReprocessReportRepositoryHistory) repository).generateExcel(summeryrequest.getFromDate(), summeryrequest.getToDate(), summeryrequest.getBmrNumber(), summeryrequest.getBatchNumber());
 		} else {
			throw new IllegalArgumentException("Invalid entity for date filtering: " + summeryrequest.getFormName());
		}
 		
 	}
 	
}
