package com.focusr.Precot.mssql.database.controller.Ppc;

import java.io.ByteArrayOutputStream;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.focusr.Precot.mssql.database.model.PPC.ContractReviewMeetingExcel;
import com.focusr.Precot.mssql.database.model.PPC.ContractReviewMeetingF003;
import com.focusr.Precot.mssql.database.model.PPC.MonthlyplanSummaryF002;
import com.focusr.Precot.mssql.database.model.PPC.PreProductionMeetingF004;
import com.focusr.Precot.mssql.database.model.PPC.PreProductionParticipant;
import com.focusr.Precot.mssql.database.repository.ppc.ContractReviewMeetingExcelRepo;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.ppc.PpcAuditService;
//import com.focusr.Precot.mssql.database.service.ppc.PpcAuditService;
import com.focusr.Precot.mssql.database.service.ppc.PpcService9;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.payload.PpcAuditRequest;
import com.focusr.Precot.util.IdAndValuePair;

@RestController
@RequestMapping("/api/Ppc")
public class PpcController9 {

	@Autowired
	private PpcService9 PpcService;

	@Autowired
	private PpcAuditService AuditService;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private ContractReviewMeetingExcelRepo contractReviewMeetingExcelRepo;

	@PostMapping("/Monthlyplan/save")
	public ResponseEntity<?> saveMonthlyPlan(HttpServletRequest http,
			@Valid @RequestBody MonthlyplanSummaryF002 MonthlyplanSummary, BindingResult result, Principal principal) {

		ResponseEntity<?> response = PpcService.saveMonthlyPlanSummary(MonthlyplanSummary, http);
		return response;

	}

	@PostMapping("/Monthlyplan/submit")
	public ResponseEntity<?> submitMonthlyPlan(@RequestBody MonthlyplanSummaryF002 monthlyPlan,
			HttpServletRequest http) {
		if (monthlyPlan.getMonthyear() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse(false, "The 'Monthyear' field cannot be null."));
		}

		MonthlyplanSummaryF002 existingPlan = PpcService.findByMonthyear(monthlyPlan.getMonthyear());

		try {
			ResponseEntity<?> response = PpcService.submitMonthlyPlanSummary(monthlyPlan, http);
			return response;
		} catch (Exception e) {
			String msg = e.getMessage();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse(false, "Failed to submit monthly plan summary: " + msg));
		}
	}

	@PostMapping("/approveOrRejectMonthlyPlan")
	public ResponseEntity<?> approveOrRejectMonthlyPlan(@Valid @RequestBody ApproveResponse approveResponse,
			HttpServletRequest http) {
		ResponseEntity<?> response = PpcService.approveRejectMonthlyPlan(approveResponse, http);
		return response;
	}

	@GetMapping("/getMonthlyplanSummary")
	public ResponseEntity<?> getMonthlyplanSummary() {

		ResponseEntity<?> resp = PpcService.getMonthlyplanSummary();
		return resp;
	}

	@GetMapping("/getMonthlyplanSummaryPrint")
	public ResponseEntity<?> getMonthlyplanSummaryPrint(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String MonthYear = requestParams.get("monthYear");

		ResponseEntity<?> resp = PpcService.getMonthlyplanSummaryPrint(MonthYear);
		return resp;
	}

	@GetMapping("/getMonthlyPlanSummaryByMonthYear")
	public ResponseEntity<?> getMonthlyPlanSummaryByMonthYear(@RequestParam("monthYear") String monthYear) {
		return PpcService.getMonthlyPlanSummaryByMonthYear(monthYear);
	}

	@GetMapping("/lastnote")
	public ResponseEntity<String> getLastNote() {
		String lastNote = PpcService.getLastNote();
		return ResponseEntity.ok(lastNote);
	}

	@GetMapping("/lastchallenges")
	public ResponseEntity<String> getLastchallenges() {
		String lastchallenges = PpcService.getLastchallenges();
		return ResponseEntity.ok(lastchallenges);
	}

	@PostMapping("/PreProductionMeeting/Save")
	public ResponseEntity<?> SavePreproductionMeeting(HttpServletRequest http,
			@Valid @RequestBody PreProductionMeetingF004 savePreproductionMeeting, BindingResult result,
			Principal principal) {

		ResponseEntity<?> response = PpcService.savePreproductionMeetingForm(savePreproductionMeeting, http);
		return response;

	}

	@PostMapping("/PreProductionMeeting/Submit")
	public ResponseEntity<?> SubmitPreproductionMeeting(HttpServletRequest http,
			@Valid @RequestBody PreProductionMeetingF004 SubmitPreproductionMeeting, BindingResult result,
			Principal principal) {

		ResponseEntity<?> response = PpcService.submitPreproductionMeeting(SubmitPreproductionMeeting, http);
		return response;

	}

//	 @GetMapping("/GetPreproductionMeetingPrint")
//		public ResponseEntity<?> GetPrintPreproductionMeeting(@RequestParam Map<String, String> requestParams,
//				Principal principal) {
//			
//			String Date = requestParams.get("Date");
//			
//			
//			ResponseEntity<?> resp = PpcService.GetPrintPreproductionMeeting(Date);
//			return resp;
//		}
//	 

	@GetMapping("/GetPreproductionMeetingPrint")
	public ResponseEntity<?> GetPrintPreproductionMeeting(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String year = requestParams.get("year");
		String month = requestParams.get("month");
		String date = requestParams.get("date");

		ResponseEntity<?> resp = PpcService.GetPrintPreproductionMeeting(year, month, date);
		return resp;
	}

	@GetMapping("/GetPreproductionMeetingByDate")
	public ResponseEntity<?> GetPreproductionMeetingBydate(@RequestParam("Date") String date) {
		return PpcService.GetPreproductionMeetingBydate(date);
	}

	@GetMapping("/GetPreproductionSummary")
	public ResponseEntity<?> GetPreproductionSummary() {

		ResponseEntity<?> resp = PpcService.GetPreproductionSummary();
		return resp;
	}

//	  CR
	@PostMapping("/BussinessContractReviewMeeting/Save")
	public ResponseEntity<?> SaveBussinessContractReviewMeeting(HttpServletRequest http,
			@Valid @RequestBody ContractReviewMeetingF003 saveContractReviewMeetingF003, BindingResult result,
			Principal principal) {

		ResponseEntity<?> response = PpcService.saveBussinessContractReviewMeeting(saveContractReviewMeetingF003, http);
		return response;

	}

	@PostMapping("/BussinessContractReviewMeeting/Submit")
	public ResponseEntity<?> BussinessSubmitContractReviewMeeting(HttpServletRequest http,
			@Valid @RequestBody ContractReviewMeetingF003 SubmitContractReviewMeeting, BindingResult result,
			Principal principal) {

		ResponseEntity<?> response = PpcService.BussinessSubmitContractReviewMeeting(SubmitContractReviewMeeting, http);
		return response;

	}

	@PostMapping("/ContractReviewMeeting/Save")
	public ResponseEntity<?> SaveContractReviewMeeting(HttpServletRequest http,
			@Valid @RequestBody ContractReviewMeetingF003 saveContractReviewMeetingF003, BindingResult result,
			Principal principal) {

		ResponseEntity<?> response = PpcService.saveContractReviewMeeting(saveContractReviewMeetingF003, http);
		return response;

	}

	@PostMapping("/ContractReviewMeeting/Submit")
	public ResponseEntity<?> SubmitContractReviewMeeting(HttpServletRequest http,
			@Valid @RequestBody ContractReviewMeetingF003 SubmitContractReviewMeeting, BindingResult result,
			Principal principal) {

		ResponseEntity<?> response = PpcService.SubmitContractReviewMeeting(SubmitContractReviewMeeting, http);
		return response;

	}

	@GetMapping("/GetContractReviewMeetingPrint")
	public ResponseEntity<?> GetPrintContractReviewMeeting(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String year = requestParams.get("year");
		String month = requestParams.get("month");
		String date = requestParams.get("date");
		String customer = requestParams.get("customer");

		ResponseEntity<?> resp = PpcService.GetPrintContractReviewMeetingAMC(year, month, date, customer);
		return resp;
	}

	@GetMapping("/GetContractReviewMeetingByDate")
	public ResponseEntity<?> GetContractReviewMeetingBydate(@RequestParam("Date") String date,
			@RequestParam("customer") String customer) {
		return PpcService.GetContractReviewMeetingBydate(date, customer);
	}

	@GetMapping("/GetContractReviewMeetingSummary")
	public ResponseEntity<?> GetContractReviewMeetingSummary() {

		ResponseEntity<?> resp = PpcService.GetContractReviewMeetingSummary();
		return resp;
	}

////	  Upload Excel 
//	  
//	  @PostMapping("/uploadexcel")
//	    public ResponseEntity<String> uploadExcelFile(@RequestParam("file") MultipartFile file, 
//	                                                  @RequestParam("date") String date) {
//	        try {
//	        	PpcService.processExcelFiles(file, date);
//	            return ResponseEntity.ok("Excel file uploaded and processed successfully.");
//	        } catch (Exception e) {
//	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//	                                 .body("Failed to upload Excel file: " + e.getMessage());
//	        }
//	    }

	@PostMapping("/upload")
	public ResponseEntity<String> uploadExcelFiles(@RequestParam("files") MultipartFile[] files,
			@RequestParam("date") String date, String customerName) {
		try {
			// Validate that files are uploaded
			if (files == null || files.length == 0) {
				return ResponseEntity.badRequest().body("No files were uploaded. Please upload at least one file.");
			}

			// Process the uploaded files
			PpcService.processExcelFiles(files, date, customerName);

			return ResponseEntity.ok("Excel files uploaded and processed successfully.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Failed to upload Excel files: " + e.getMessage());
		}
	}

	@GetMapping("/downloadexcel")
	public ResponseEntity<byte[]> downloadExcelFilesByDate(@RequestParam("date") String date
			, String customer) {
		try {
			// Retrieve all entities by date
			List<ContractReviewMeetingExcel> meetings = contractReviewMeetingExcelRepo.findAllByDate(date,customer);

			if (meetings.isEmpty()) {
				throw new Exception("No records found for date: " + date);
			}

			// Create a ZIP file in memory
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			try (ZipOutputStream zipOut = new ZipOutputStream(baos)) {
				for (ContractReviewMeetingExcel meeting : meetings) {
					// Create a ZIP entry for each file
					ZipEntry entry = new ZipEntry(meeting.getDetails()); // Use the original file name
					zipOut.putNextEntry(entry);
					zipOut.write(meeting.getExcelFile()); // Write the file content to the ZIP
					zipOut.closeEntry();
				}
			}

			// Prepare the response
			return ResponseEntity.ok().header("Content-Disposition", "attachment; filename=ExcelFiles_" + date + ".zip")
					.contentType(org.springframework.http.MediaType.APPLICATION_OCTET_STREAM).body(baos.toByteArray());

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/getbydate")
	public ResponseEntity<?> getIdAndDetailsByDate(@RequestParam String date,String customer) {
		List<IdAndValuePair> idAndValuePairs = PpcService.getIdAndDetailsByDate(date,customer);
		if (!idAndValuePairs.isEmpty()) {
			return ResponseEntity.ok(idAndValuePairs);
		} else {
			return ResponseEntity.ok("No records found for the given date: " + date);
		}
	}

	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteContractReviewById(@RequestParam Long id) {
		String result = PpcService.deleteById(id);
		if (result.contains("successfully")) {
			return ResponseEntity.ok(result);
		} else {
			return ResponseEntity.status(404).body(result);
		}
	}

// *********** CR ************ //

	@GetMapping("/customerNameList")
	public ResponseEntity<?> getCustomerNameList(Principal principal) {

		ResponseEntity<?> resp = PpcService.getCustomerNameList();
		return resp;
	}

	@GetMapping("/getBrandByCustomer")
	public ResponseEntity<?> getBrandNameList(@RequestParam String customer, Principal principal) {

		ResponseEntity<?> resp = PpcService.getProductCodeBrandByCustomer(customer);
		return resp;
	}

	@GetMapping("/getDescriptionByProduct")
	public ResponseEntity<?> getMaterialByCustomer(@RequestParam String customer, @RequestParam String brand,
			Principal principal) {

		ResponseEntity<?> resp = PpcService.getProductDescriptionByProductCode(brand, customer);
		return resp;
	}

// ****************************************************************************************************
	@PostMapping("/getAuditSummary")
	public ResponseEntity<?> getAuditSummary(@RequestBody PpcAuditRequest summeryrequest) {

		ResponseEntity<?> message = AuditService.getAuditSummary(summeryrequest);

		return message;
	}

	// AMC LOV ADD, GET , DELETE

	@PostMapping("/preProduction/addAuditParticipant")
	public ResponseEntity<?> saveAuditType(HttpServletRequest http,
			@Valid @RequestBody PreProductionParticipant participantList, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = PpcService.saveAuditParticipant(participantList, http);
		return response;
	}

	@GetMapping("/preProduction/getAuditParticipants")
	public ResponseEntity<?> getAuditParticipants(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		ResponseEntity<?> resp = PpcService.getAuditParticipants();
		return resp;
	}

	@DeleteMapping("/preProduction/deleteAuditParticipant")
	public ResponseEntity<?> deleteAuditParticipant(@RequestParam Long id) {
		return PpcService.deleteAuditParticipant(id);
	}

	// GET CUSTOMER NAME

	@GetMapping("/getCustomerName")
	public ResponseEntity<?> getCustomerName() {

		ResponseEntity<?> responseList = PpcService.getCustomerName();
		return responseList;
	}

}
