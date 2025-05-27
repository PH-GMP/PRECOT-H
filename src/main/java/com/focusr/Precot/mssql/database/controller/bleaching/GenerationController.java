package com.focusr.Precot.mssql.database.controller.bleaching;

import java.security.Principal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.repository.bleaching.BleachBmrLaydownMappingRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachLaydownGenerationRepository;
import com.focusr.Precot.mssql.database.service.bleaching.GenerationService;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApprovalResponse;
import com.focusr.Precot.payload.BmrLaydownMappingResponse;
import com.focusr.Precot.payload.TableRMResponse;
import com.focusr.Precot.payload.UpdateBMRResponse;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.TableRMResponseDTO;

@RestController
@RequestMapping("/api/bleaching/generation")
public class GenerationController {

	Logger logger = LoggerFactory.getLogger(GenerationController.class);

	@Autowired
	private GenerationService generationService;

	@Autowired
	BleachBmrLaydownMappingRepository BleachBmrLaydownMappingRepository;

	@Autowired
	private BleachLaydownGenerationRepository laydownNumberRepository;

	@GetMapping("/bmr")
	public ResponseEntity<?> bmrGenerationController(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		Long department_id = Long.valueOf(requestParams.get("department_id"));

		ResponseEntity<?> resp = generationService.generateBMRNumber(department_id);
		return resp;
	}

	@GetMapping("/laydown")
	public ResponseEntity<?> laydownGenerationController(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		Long department_id = Long.valueOf(requestParams.get("department_id"));

		ResponseEntity<?> resp = generationService.generateLaydownNumber(department_id);
		return resp;
	}

	@GetMapping("/getBMR")
	public ResponseEntity<?> bmrGenerationList(@RequestParam Map<String, String> requestParams, Principal principal) {

		Long department_id = Long.valueOf(requestParams.get("department_id"));

		ResponseEntity<?> resp = generationService.getBMRListByDeptId(department_id);
		return resp;
	}

	@GetMapping("/getLaydown")
	public ResponseEntity<?> laydownGenerationList(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		Long department_id = Long.valueOf(requestParams.get("department_id"));

		ResponseEntity<?> resp = generationService.getLaydownByDeptId(department_id);
		return resp;
	}

	@PostMapping("/BmrLaydownMapping")
	public ResponseEntity<?> ApproveOrRejectMixchMachineF38(@Valid @RequestBody BmrLaydownMappingResponse responce,
			HttpServletRequest http) {

		ResponseEntity<?> response = generationService.BmrLaydownMapping(responce, http);

		return response;
	}

	@GetMapping("/getJobCard")
	public ResponseEntity<?> getJobCard() {
		List<Map<String, Object>> jobCard;
		try {
			jobCard = BleachBmrLaydownMappingRepository.getJobCardDetails();
		} catch (Exception e) {
			return new ResponseEntity<>(new ApiResponse(false, "Unable to get Job Details: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(jobCard, HttpStatus.OK);
	}

	@GetMapping("/getMappingBmr")
	public ResponseEntity<?> getMappingBmr() {
		List<Map<String, Object>> getMappingBmr;
		try {
			getMappingBmr = BleachBmrLaydownMappingRepository.getMappingBmr();
		} catch (Exception e) {
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Mapping Bmr Details: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(getMappingBmr, HttpStatus.OK);
	}

	@GetMapping("/getMapLaydown")
	public ResponseEntity<?> getLaydown(@RequestParam String MappingBmr_No) {

		ResponseEntity<?> response = generationService.getLaydown(MappingBmr_No);
//		ResponseEntity<?> response = generationService.getCardingStartDate(MappingBmr_No);

		return response;
	}

	@GetMapping("/getStartDate")
	public ResponseEntity<?> getStartDate(@RequestParam String MappingBmr_No) {

//		ResponseEntity<?> response = generationService.getLaydown(MappingBmr_No);
		ResponseEntity<?> response = generationService.getCardingStartDate(MappingBmr_No);

		return response;
	}

	// JAWAHAR
	@GetMapping("/getMappingLaydown")
	public ResponseEntity<?> getMappingLaydown() {
		List<Map<String, Object>> getMappingBmr;
		try {
//	        	getMappingBmr = BleachBmrLaydownMappingRepository.getMappingLaydown();
			getMappingBmr = laydownNumberRepository.getMappingLaydown();
		} catch (Exception e) {
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Mapping Bmr Details: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(getMappingBmr, HttpStatus.OK);
	}

	@GetMapping("/getMapBMR")
	public ResponseEntity<?> getBMR(@RequestParam String MappingBmr_No) {

		ResponseEntity<?> response = generationService.getBMR(MappingBmr_No);

		return response;
	}

	@GetMapping("/getcloseBMR")
	public ResponseEntity<?> getCloseBMR() {

		ResponseEntity<?> response = generationService.getCloseBMR();

		return response;
	}

	@GetMapping("/fetchBaleByBMR")
	public ResponseEntity<?> fetchBaleNumberByBMR(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String bmr_no = requestParams.get("bmr_no");

		ResponseEntity<?> resp = generationService.getBaleByBMR(bmr_no);
		return resp;

	}

	@GetMapping("/fetchBatchByBMR")
	public ResponseEntity<?> fetchBatchNumberByBMR(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String bmr_no = requestParams.get("bmr_no");

		ResponseEntity<?> resp = generationService.getBatchByBMR(bmr_no);
		return resp;
	}

	@GetMapping("/fetchBatch")
	public ResponseEntity<?> fetchBatchNumberFromSAP(Principal principal) {

		ResponseEntity<?> resp = generationService.getBatchNumberwithYearFromSAP();
		return resp;
	}
	
	
	@GetMapping("/fetchBatchNumbers")
	public ResponseEntity<?> fetchBatchNumber1FromSAP(Principal principal) {

		ResponseEntity<?> resp = generationService.getBatchFromSAP1();
		return resp;
	}

	@GetMapping("/fetchBatchBale")
	public ResponseEntity<?> fetchBaleNumberFromSAP(Principal principal) {

		ResponseEntity<?> resp = generationService.fetchBaleFromSAP();
		return resp;
	}

	// new
	@GetMapping("/fetchBaleByBatch")
	public ResponseEntity<?> fetchBaleNumberByBatch(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		Long batchNo = Long.valueOf(requestParams.get("batchNo"));
		String bmr_no = requestParams.get("bmr_no");

		ResponseEntity<?> resp = generationService.getBaleByBatch(batchNo, bmr_no);
		return resp;
	}

	// New-spun

	@GetMapping("/fetchSpunlaceRollNo")
	public ResponseEntity<?> getSpunBatch(Principal principal) {

		ResponseEntity<?> resp = generationService.getSpunBatch();
		return resp;
	}

	@PostMapping("/closingBMR")
	public ResponseEntity<?> bmrClosing(@Valid @RequestBody UpdateBMRResponse request, Principal principal,
			HttpServletRequest http) {

		ResponseEntity<?> resp = generationService.bmrClosing(request, principal, http);
		return resp;

	}

	// Mix Lov

	@GetMapping("/getMixingLov")
	public ResponseEntity<?> getMixingLov(@RequestParam Map<String, String> requestParams, Principal principal) {

		String orderNo = requestParams.get("orderNo");

		List<Map<String, Object>> jobCard;
		try {
			jobCard = BleachBmrLaydownMappingRepository.getMixingLov(orderNo);
		} catch (Exception e) {
			return new ResponseEntity<>(new ApiResponse(false, "Unable to get Mixin Lov  Details: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(jobCard, HttpStatus.OK);
	}

	///

//	@GetMapping("/rawCottonData")
//	public ResponseEntity<?> tableRMData() {
//		ResponseEntity<?> resp = generationService.tableRMData();
//		return resp;
//	}

	@GetMapping("/rawCottonIssue")
	public ResponseEntity<?> rawCottonIssueRM(@RequestParam Map<String, String> requestParams, Principal principal) {
		String laydown_no = requestParams.get("laydown_no");
		ResponseEntity<?> resp = generationService.getRawCottonIssue(laydown_no);
		return resp;
	}

	@GetMapping("/rawCotton")
	public ResponseEntity<?> rawCottonIssueCakePress(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String laydown_no = requestParams.get("laydown_no");
		ResponseEntity<?> resp = generationService.getRawCotton(laydown_no);
		return resp;
	}

	@GetMapping("/rawCottonData")
	public ResponseEntity<?> tableRMData() {
		List<TableRMResponse> responseList = new ArrayList<>();
		List<TableRMResponseDTO> formattedResponseList = new ArrayList<>();
		try {
			responseList = BleachBmrLaydownMappingRepository.rmDataList();

			DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
			DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

			for (TableRMResponse response : responseList) {
				String dateString = response.getDate();
				LocalDate date = LocalDate.parse(dateString, inputFormatter);
				String formattedDate = date.format(outputFormatter);

				TableRMResponseDTO dto = new TableRMResponseDTO(response.getbatchNo(), response.getsupplier(),
						formattedDate);
				formattedResponseList.add(dto);
			}

			if (responseList.isEmpty() || responseList == null) {
				return new ResponseEntity(new ApiResponse(false, "No Data Found !!! "), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to get " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(formattedResponseList, HttpStatus.OK);
	}

	/**
	 * Waste Bale
	 */
	@GetMapping("/wasteBaleResponse")
	public ResponseEntity<?> wasteBaleResponse(@RequestParam Map<String, String> requestParams, Principal principal) {
		String date = requestParams.get("date");
		ResponseEntity<?> resp = generationService.getWasteBalePress(date);
		return resp;
	}

	@GetMapping("/wasteBaleResponseSAP")
	public ResponseEntity<?> wasteBaleResponseSAP() {

		ResponseEntity<?> resp = generationService.getWasteBalePressSAP();
		return resp;
	}

	@GetMapping("/fetchHodApprovedRecords")
	public ResponseEntity<?> fetchHodApprovedRecords(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String name = requestParams.get("name");
		ResponseEntity<?> resp = generationService.fetchApprovedRecords(name);
		return resp;
	}

	/**
	 * TRACEABILITY API
	 */

	@GetMapping("/bleachingTrace")
	public ResponseEntity<?> bleachingTrace(@RequestParam Map<String, String> requestParams, Principal principal) {

		String batchNo = requestParams.get("batchNo");
		String bale_no = requestParams.get("bale_no");

		ResponseEntity<?> resp = generationService.bleachingTraceability(batchNo, bale_no);
		return resp;
	}

	@GetMapping("/spulanceTrace")
	public ResponseEntity<?> spulanceTrace(@RequestParam Map<String, String> requestParams, Principal principal) {

		String roll = requestParams.get("roll");

		ResponseEntity<?> resp = generationService.spulanceTraceability(roll);
		return resp;
	}
	
	
	@GetMapping("/getAllMappingBmr")
	public ResponseEntity<?> getAllMappingBmr() {
		List<Map<String, Object>> getMappingBmr;
		try {
			getMappingBmr = BleachBmrLaydownMappingRepository.getAllMappingBmr();
		} catch (Exception e) {
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Mapping Bmr Details: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(getMappingBmr, HttpStatus.OK);
	}

	
		// FETCH BLEACHING DATA BY Batch NUMBER
	
	@GetMapping("/fetchBleachingdataByBatchNumber")
	public ResponseEntity<?> fetchBleachingDataByBatchNumber(@RequestParam Map<String, String> requestParams, Principal principal) {
		
		Long batchNumber = Long.valueOf(requestParams.get("batchNumber"));
		
		ResponseEntity<?> resp = generationService.fetchBleachingDataByBatchNumber(batchNumber);
		return resp;
		
	}
	
	
		// HAND SANITATION - ID NUMBER LOV
	
	@GetMapping("/fetchHandSanitationIdNumbers")
	public ResponseEntity<?> getHandSanitation(@RequestParam Map<String, String> requestParams, Principal principal) {
		
		Long department = Long.valueOf(requestParams.get("department"));
		
		ResponseEntity<?> resp = generationService.getHandSanitationByDepartment(department);
		return resp;
	}
	
	// HAND SANITATION - NAME LOV
	@GetMapping("/fetchHandSanitationName")
	public ResponseEntity<?> getHandSanitationName(Principal principal) {
			
		ResponseEntity<?> resp = generationService.getName();
		return resp;
	}
	
	
		// Generated Bmr Details
	
	
	@GetMapping("/generationDetailsByBmr")
	public ResponseEntity<?> generatedbmrProductionDetails(@RequestParam Map<String, String> requestParams, Principal principal) {
		
		String bmrNumber = requestParams.get("bmrNumber");
		
		ResponseEntity<?> resp = generationService.generatedProductionDetailsByBmr(bmrNumber);
		return resp;
		
	}
	
	
	
}
