package com.focusr.Precot.mssql.database.controller.bleaching;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.focusr.Precot.mssql.database.model.bleaching.BleachSummaryReport;
import com.focusr.Precot.mssql.database.model.bleaching.Department;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachSummaryReportRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.DepartmentRepository;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.bleaching.FormatService;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.FormatRequest;

@RestController
@RequestMapping("/api/Format/Service")
public class FormatController {

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private FormatService formatService;

	@Autowired
	private DepartmentRepository departmentrepository;

	@Autowired
	private BleachSummaryReportRepository bleachsummaryreportrepository;

//	@Autowired
//	private BleachSummaryReportRepository summaryReportRepo;
//	
//	@Autowired
//	private DepartmentRepository departmetRepo;

	// Create and Update Caking....
	@PostMapping("/getAllFormatSummary")
	public ResponseEntity<?> getTheAllFormatSummary(HttpServletRequest http,
			@Valid @RequestBody FormatRequest formatRequest, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> cakingResponse = formatService.getTheAllFormatSummary(formatRequest, http);

		return cakingResponse;
	}

	// Get the Summary Reports......
	@GetMapping("/getListofSummaryReport")
	public List<BleachSummaryReport> getAllSummaryReport(Principal principal) {
		List<BleachSummaryReport> listofSummaryReport = bleachsummaryreportrepository.findAll();
		return listofSummaryReport;
	}

	// Get the Summary Reports......
	@GetMapping("/getListofDepartmentFormats")
	public List<BleachSummaryReport> getAllSummaryReport(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		Long departmentId = Long.valueOf(requestParams.get("departmentId"));

		List<BleachSummaryReport> listofSummaryReport = bleachsummaryreportrepository.findByDepartmentId(departmentId);
		return listofSummaryReport;
	}

	@GetMapping("/getListofDepartment")
	public List<Department> getListofDepartment(Principal principal) {
		List<Department> listofDepartment = departmentrepository.findAll();
		return listofDepartment;
	}
	
	
	@GetMapping("/report")
	public ResponseEntity<?> fetchPDF() {
		ResponseEntity<?> resp = formatService.pdfApproach2(AppConstants.pdfPath);
		return resp;
	}
	
	
		// UPLOAD IMAGE
	
	@PostMapping("/uploadImage")
	public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file,
			@RequestParam Map<String, String> requestParams) {
		
		String username = requestParams.get("username");
		
		ResponseEntity<?> resp = formatService.uploadImage(file, username);
		return resp;
		
	}
	
	@DeleteMapping("/deleteImage")
	public ResponseEntity<?> deleteImage(@RequestParam Map<String, String> requestParams) {
		
		String username = requestParams.get("username");
		
		ResponseEntity<?> resp = formatService.deleteRecord(username);
		return resp;
	}
	
	@GetMapping("/getImages")
	public ResponseEntity<?> getImages() {
		ResponseEntity<?> resp = formatService.getAllImages();
		return resp;
	}
	
	@GetMapping("/imageById/{id}")
	public ResponseEntity<?> getImagesById(@PathVariable Long id) {
		ResponseEntity<?> resp = formatService.getImageById(id);
		return resp;
	}

	@GetMapping("/image")
	public ResponseEntity<?> getImagesByUser(@RequestParam Map<String, String> requestParams) {
		
		String username = requestParams.get("username");
		
		ResponseEntity<?> resp = formatService.getUserSignature(username);
		return resp;
	}
	
	@GetMapping("/formList")
	public ResponseEntity<?> getFormList(@RequestParam Map<String, String> requestParams) {
		
		Long departmentId = Long.valueOf(requestParams.get("departmentId"));
		ResponseEntity<?> resp = formatService.getFormList(departmentId);
		return resp;
		
	}
	
}
