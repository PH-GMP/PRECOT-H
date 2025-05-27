package com.focusr.Precot.QA.controller;

import java.security.Principal;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import com.focusr.Precot.QA.model.MetalDetectorCalibrationRecord;
import com.focusr.Precot.QA.model.MetalDetectorPassReport;
import com.focusr.Precot.QA.model.TemplateForRecall;
import com.focusr.Precot.QA.model.TrainingRecord;
import com.focusr.Precot.QA.service.QaService6;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.payload.ApproveResponse;

/**
 * 
 * @author M1293
 * 
 **/

@RestController
@RequestMapping("/api/QA/Service")
public class QaController6 {

	@Autowired
	QaService6 qaService6;

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	Logger log = LoggerFactory.getLogger(QaController6.class);
	
	
	// LOV
	
	
	@GetMapping("/ProductDescription")
	public ResponseEntity<?> ProductDescription(@RequestParam Map<String, String> requestParams) {

		String department = requestParams.get("department");

		ResponseEntity<?> responseList = qaService6.ProductDescription(department);
		return responseList;
	}
	
	@GetMapping("/Machine")
	public ResponseEntity<?> Machine(@RequestParam Map<String, String> requestParams) {

		String department = requestParams.get("department");

		ResponseEntity<?> responseList = qaService6.Machine(department);
		return responseList;
	}
	
	
	@GetMapping("/getEquipmentId")
	public ResponseEntity<?> getEquipmentId() {

		ResponseEntity<?> responseList = qaService6.getEquipmentId();
		return responseList;
	}

	//     CODE


	@PostMapping("/SaveTemplate")
	public ResponseEntity<?> SaveTemplate(HttpServletRequest http,
			@Valid @RequestBody TemplateForRecall templateForRecall, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService6.SaveTemplate(templateForRecall, http);

		return response;
	}

	@PostMapping("/SubmitTemplate")
	public ResponseEntity<?> SubmitTemplate(HttpServletRequest http,
			@Valid @RequestBody TemplateForRecall templateForRecall, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService6.SubmitTemplate(templateForRecall, http);

		return response;
	}
	
	@GetMapping("getTemplate")
	public ResponseEntity<?> getTemplate(@RequestParam Map<String, String> requestParams, Principal principal) {

		String date = requestParams.get("date");

		ResponseEntity<?> resp = qaService6.getTemplate(date);
		return resp;
	}
	
	@GetMapping("/TemplateSummary")
	public ResponseEntity<?> TemplateSummary(HttpServletRequest http) {
		return qaService6.TemplateSummary(http);
	}
	
	@PutMapping("/ApproveOrRejectTemplate")
	public ResponseEntity<?> approveRejectionF26(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qaService6.approveRejectTemplate(approvalResponse, http);
		return resp;
	}
	
	@GetMapping("TemplatePrint")
	public ResponseEntity<?> TemplatePrint(@RequestParam Map<String, String> requestParams, Principal principal) {

		String month = requestParams.get("month");
		String year = requestParams.get("year");

		ResponseEntity<?> resp = qaService6.TemplatePrint(month,year);
		return resp;
	}
	
	// -----------------------------    METAL  DETECTOR CALIBRATION RECORD  ---------------------------- 
	
	@PostMapping("/SaveMetalDetector")
	public ResponseEntity<?> SaveMetalDetector(HttpServletRequest http,
			@Valid @RequestBody MetalDetectorCalibrationRecord templateForRecall, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService6.SaveMetalDetector(templateForRecall, http);

		return response;
	}
	
	@PostMapping("/SubmitMetalDetector")
	public ResponseEntity<?> SubmitMetalDetector(HttpServletRequest http,
			@Valid @RequestBody MetalDetectorCalibrationRecord templateForRecall, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService6.SubmitMetalDetector(templateForRecall, http);

		return response;
	}
	
	
	@GetMapping("MetalDetectorSummary")
	public ResponseEntity<?> MetalDetectorSummary(@RequestParam Map<String, String> requestParams, HttpServletRequest http , Principal principal) {

		String department = requestParams.get("department");

		ResponseEntity<?> resp = qaService6.MetalDetectorSummary(department,http);
		return resp;
	}
	
	@GetMapping("MetalDetectorPrint")
	public ResponseEntity<?> MetalDetectorPrint(@RequestParam Map<String, String> requestParams, Principal principal) {

		String month = requestParams.get("month");
		String year = requestParams.get("year");
		String date = requestParams.get("date");
		String eq_id = requestParams.get("eq_id");

		ResponseEntity<?> resp = qaService6.MetalDetectorPrint(month,year,date,eq_id);
		return resp;
	}
	
	@PutMapping("/ApproveOrRejectMetalDetector")
	public ResponseEntity<?> ApproveOrRejectMetalDetector(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qaService6.ApproveOrRejectMetalDetector(approvalResponse, http);
		return resp;
	}
	
	@GetMapping("getById")
	public ResponseEntity<?> getById(@RequestParam Map<String, String> requestParams, Principal principal) {

		String idString = requestParams.get("id");
		
		long id = Long.parseLong(idString);

		ResponseEntity<?> resp = qaService6.getById(id);
		return resp;
	}

	
 
	
	
	// METAL DETECTOR PASS REPORT
	
	// -----------------------------    METAL  DETECTOR PASS RECORD  ---------------------------- 
	
		@PostMapping("/SaveMetalDetectorPass")
		public ResponseEntity<?> SaveMetalDetectorPass(HttpServletRequest http,
				@Valid @RequestBody MetalDetectorPassReport templateForRecall, BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qaService6.SaveMetalDetectorPass(templateForRecall, http);

			return response;
		}
		
		@PostMapping("/SubmitMetalDetectorPass")
		public ResponseEntity<?> SubmitMetalDetectorPass(HttpServletRequest http,
				@Valid @RequestBody MetalDetectorPassReport templateForRecall, BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qaService6.SubmitMetalDetectorPass(templateForRecall, http);

			return response;
		}
		
		
//		@GetMapping("MetalDetectorPassSummary")
//		public ResponseEntity<?> MetalDetectorPassSummary(@RequestParam Map<String, String> requestParams, HttpServletRequest http , Principal principal) {
//
//			String department = requestParams.get("department");
//
//			ResponseEntity<?> resp = qaService6.MetalDetectorPassSummary(department,http);
//			return resp;
//		}
		
		@GetMapping("MetalPassSummary")
		public ResponseEntity<?> MetalPassSummary(@RequestParam Map<String, String> requestParams, HttpServletRequest http , Principal principal) {

			String department = requestParams.get("department");

			ResponseEntity<?> resp = qaService6.MetalPassSummary(department,http);
			return resp;
		}
		
		@GetMapping("MetalDetectorPassPrint")
		public ResponseEntity<?> MetalDetectorPassPrint(@RequestParam Map<String, String> requestParams, Principal principal) {

			String date = requestParams.get("date");

			ResponseEntity<?> resp = qaService6.MetalDetectorPassPrint(date);
			return resp;
		}
		
		@PutMapping("/ApproveOrRejectMetalDetectorPass")
		public ResponseEntity<?> ApproveOrRejectMetalDetectorPass(@Valid @RequestBody ApproveResponse approvalResponse,
				HttpServletRequest http) {

			ResponseEntity<?> resp = qaService6.ApproveOrRejectMetalDetectorPass(approvalResponse, http);
			return resp;
		}
		
		@GetMapping("getByIdPass")
		public ResponseEntity<?> getByIdPass(@RequestParam Map<String, String> requestParams, Principal principal) {

			String idString = requestParams.get("id");
			
			long id = Long.parseLong(idString);

			ResponseEntity<?> resp = qaService6.getByIdPass(id);
			return resp;
		}
		
		
		@DeleteMapping("/deleteMetalPass")
		public ResponseEntity<?> deleteMetalPass(@RequestParam Long line_id) {
			
			return qaService6.deleteMetalPass(line_id);
		}
		
		@DeleteMapping("/deleteMetalCalibration")
		public ResponseEntity<?> deleteMetalCalibration(@RequestParam Long line_id) {
			
			return qaService6.deleteMetalCalibration(line_id);
		}
		
		
		//
		//
		//
		//
		// TRAINING RECORDS
		
		
		@PostMapping("/SaveTrainingRecord")
		public ResponseEntity<?> SaveTrainingRecord(HttpServletRequest http,
				@Valid @RequestBody TrainingRecord templateForRecall, BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qaService6.SaveTrainingRecord(templateForRecall, http);

			return response;
		}
		
		@PostMapping("/SubmitTrainingRecord")
		public ResponseEntity<?> SubmitTrainingRecord(HttpServletRequest http,
				@Valid @RequestBody TrainingRecord templateForRecall, BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qaService6.SubmitTrainingRecord(templateForRecall, http);

			return response;
		}
		
		
		@GetMapping("TrainingRecordSummary")
		public ResponseEntity<?> TrainingRecordSummary( @RequestParam Map<String, String> requestParams, HttpServletRequest http , Principal principal) {

			String department = requestParams.get("department");	

			ResponseEntity<?> resp = qaService6.TrainingRecordSummary(department,http);
			return resp;
		}
		
		@GetMapping("TrainingRecordPrint")
		public ResponseEntity<?> TrainingRecordPrint(@RequestParam Map<String, String> requestParams, Principal principal) {

			String month = requestParams.get("month");
			String year = requestParams.get("year");
			String department = requestParams.get("department");	

			ResponseEntity<?> resp = qaService6.TrainingRecordPrint(month,year,department);
			return resp;
		}
		
		
		@GetMapping("getTrainingRecord")
		public ResponseEntity<?> getTrainingRecord(@RequestParam Map<String, String> requestParams, Principal principal) {

			String date = requestParams.get("date");
			String department = requestParams.get("department");

			ResponseEntity<?> resp = qaService6.getTrainingRecord(date,department);
			return resp;
		}
		
		@DeleteMapping("/deleteTrainingRecordLines")
		public ResponseEntity<?> deleteTrainingRecordLines(@RequestParam Long line_id) {
			
			return qaService6.deleteTrainingRecordLines(line_id);
		}
		
		
		
}
