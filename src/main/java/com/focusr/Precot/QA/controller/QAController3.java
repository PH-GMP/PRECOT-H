package com.focusr.Precot.QA.controller;

import java.security.Principal;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.focusr.Precot.QA.model.AgendaForManagementReviewMeeting;
import com.focusr.Precot.QA.model.AnnualPlan;
import com.focusr.Precot.QA.model.AnnualProductReview;
import com.focusr.Precot.QA.model.AnnualProductReviewGraphDTO;
import com.focusr.Precot.QA.model.BatchReleaseNotesHeader;
import com.focusr.Precot.QA.model.InwardInspectionReport;
import com.focusr.Precot.QA.model.ListOfSharpTools;
import com.focusr.Precot.QA.model.ManagementOfIncidence;
import com.focusr.Precot.QA.model.MinutesOfMRM;
import com.focusr.Precot.QA.model.QASummaryOfTraceability;
import com.focusr.Precot.QA.model.QaPestControllerAreaOfTreatments;
import com.focusr.Precot.QA.model.ReviewMeetingTopics;
import com.focusr.Precot.QA.model.ReviewOfCriticalParameterChecksOfLine5;
import com.focusr.Precot.QA.payload.AllBMRDetailsDTO;
import com.focusr.Precot.QA.payload.GrReceiptDetailsDto;
import com.focusr.Precot.QA.payload.GrReceiptDto;
import com.focusr.Precot.QA.payload.MaterialDetailsDto;
import com.focusr.Precot.QA.repository.AnnualProductReviewRepository;
import com.focusr.Precot.QA.repository.InwardInspectionReportRepository;
import com.focusr.Precot.QA.service.QAService3;
import com.focusr.Precot.mssql.database.model.User;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;

/*
 * INWARD INSPECTION REPORT (5)
 * MANAGEMENT OF INCIDENCE
 * LIST OF SHARP TOOLS
 * ANNUAL PLAN
 * AGENDA FOR MANAGEMENT REVIEW
 * MINIUTES OF MRM
 */
@RestController
@RequestMapping("/api/qa")
public class QAController3 {

	@Autowired
	private QAService3 qaservice3;

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private InwardInspectionReportRepository inwardinspectionreportrepository;
	@Autowired
	private AnnualProductReviewRepository annualproductreviewrepository;
	@Autowired
	private UserRepository userRepository;

//-----------------------------INWARD INSPECTION REPORT (5)--------------------------------//
//SAVE F003//
	@PostMapping("/saveInwardInspectionReport")
	public ResponseEntity<?> saveInwardInspectionReport(@RequestBody InwardInspectionReport inwardinspectionreport,
			HttpServletRequest http) {

		ResponseEntity<?> submittedDetails = qaservice3.saveInwardInspectionReport(inwardinspectionreport, http);
		return submittedDetails;

	}

//SUBMIT F003//
	@PostMapping("/submitInwardInspectionReport")
	public ResponseEntity<?> submitInwardInspectionReport(@RequestBody InwardInspectionReport inwardinspectionreport,
			HttpServletRequest http) {

		ResponseEntity<?> submittedDetails = qaservice3.submitInwardInspectionReport(inwardinspectionreport, http);
		return submittedDetails;

	}

	@GetMapping("/getdetailsForPrintInward")
	public ResponseEntity<?> getdetailsForPrintInward(@RequestParam String formatNo, @RequestParam String gr_date,
			@RequestParam(value = "supplierName", required = false) String supplierName,
			@RequestParam(value = "invoice_no", required = false) String invoice_no,
			@RequestParam(value = "iir_no", required = false) String iir_no) {
		try {
			ResponseEntity<?> records = qaservice3.getByPrintInwardInspection(formatNo, gr_date, supplierName,
					invoice_no, iir_no);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getdetailsbyParamInward")
	public ResponseEntity<?> getdetailsByParamInward(@RequestParam String formatNo, @RequestParam String gr_date,
			@RequestParam String supplierName, @RequestParam String invoice_no, @RequestParam String item_description) {
		try {
			ResponseEntity<?> records = qaservice3.getByParamInwardInspection(formatNo, gr_date, supplierName,
					invoice_no, item_description);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getSummarydetailsInward")
	public ResponseEntity<?> getSummarydetailsF003(String formatNo, HttpServletRequest http) {

		ResponseEntity<?> records = qaservice3.getSummary(formatNo, http);

		return records;

	}

//approve or reject
	@PutMapping("/InwardInspection/approveOrReject")
	public ResponseEntity<?> approveRejectionReportInward(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qaservice3.approveRejectInwardInspection(approvalResponse, http);
		return resp;
	}

//----INWARD PDE------------------//
	/*
	 * @GetMapping("/inwardPde/details") public ResponseEntity<GrReceiptDetailsDto>
	 * getGrReceiptDetails(
	 * 
	 * @RequestParam("grDate") String grDate,
	 * 
	 * @RequestParam(value = "grNo", required = false) String grNo,
	 * 
	 * @RequestParam(value = "materialDescription", required = false) String
	 * materialDescription ) { GrReceiptDetailsDto response = new
	 * GrReceiptDetailsDto();
	 * 
	 * // Step 1: Retrieve GRNo, Supplier Name, PONO, Invoice Number based on GR
	 * Date if (grNo == null) { List<String> results =
	 * inwardinspectionreportrepository.getDetailsByGrDate(grDate);
	 * 
	 * response.setGrReceipts(results); }
	 * 
	 * // Step 2: Retrieve Material Descriptions based on GRNo else if
	 * (materialDescription == null) { List<String> materialDescriptions =
	 * inwardinspectionreportrepository.getDetailsByGrNo(grNo);
	 * response.setMaterialDescriptions(materialDescriptions); }
	 * 
	 * // Step 3: Retrieve Material Details based on GRNo and Material Description
	 * else { List<Object[]> results =
	 * inwardinspectionreportrepository.getDetailsByGrNo(grNo, materialDescription);
	 * if (!results.isEmpty()) { Object[] result = results.get(0);
	 * MaterialDetailsDto materialDetails = new MaterialDetailsDto();
	 * materialDetails.setMaterialCode((String) result[0]);
	 * materialDetails.setBatchNo((String) result[1]);
	 * materialDetails.setLotQuantity((String) result[2]);
	 * materialDetails.setSupplierName((String) result[3]);
	 * materialDetails.setPurchaseOrderNo((String) result[4]);
	 * materialDetails.setInvoiceNumber((String) result[5]);
	 * response.setMaterialDetails(materialDetails); } }
	 * 
	 * return new ResponseEntity<>(response, HttpStatus.OK); }
	 */
	@GetMapping("/inwardPde/details")
	public ResponseEntity<GrReceiptDetailsDto> getGrReceiptDetails(@RequestParam("grDate") String grDate,
			@RequestParam(value = "supplier", required = false) String supplier,
			@RequestParam(value = "invoice", required = false) String invoice,
			@RequestParam(value = "materialDescription", required = false) String materialDescription) {
		GrReceiptDetailsDto response = new GrReceiptDetailsDto();

		// Step 1: Retrieve Supplier Name based on GR Date
		if (supplier == null) {
			List<String> suppliers = inwardinspectionreportrepository.getSuppliersByGrDate(grDate);
			response.setSuppliers(suppliers);
		}

		// Step 2: Retrieve Invoice Numbers based on GR Date and Supplier
		else if (invoice == null) {
			List<String> invoices = inwardinspectionreportrepository.getInvoicesByDateAndSupplier(grDate, supplier);
			response.setInvoices(invoices);
		}

		// Step 3: Retrieve Material Descriptions based on GR Date, Supplier, and
		// Invoice
		else if (materialDescription == null) {
			List<String> materialDescriptions = inwardinspectionreportrepository
					.getMaterialDescriptionsByDateSupplierAndInvoice(grDate, supplier, invoice);
			response.setMaterialDescriptions(materialDescriptions);
		}

		// Step 4: Retrieve Material Details based on GR Date, Supplier, Invoice, and
		// Material Description
		else {
			// Make sure the result is a List<Object[]>
			List<Object[]> results = inwardinspectionreportrepository.getDetailsByDateSupplierInvoiceAndMatDesc(grDate,
					supplier, invoice, materialDescription);

			// Check if results are not null and contain at least one row
			if (results != null && !results.isEmpty()) {
				MaterialDetailsDto materialDetails = new MaterialDetailsDto();

				// Assuming you want the first result only
				Object[] result = results.get(0); // Get the first row

				if (result.length >= 6) { // Check if it has at least 6 elements
					materialDetails.setMaterialCode(result[0] != null ? result[0].toString() : null);
					materialDetails.setBatchNo(result[1] != null ? result[1].toString() : null);
					materialDetails.setLotQuantity(result[2] != null ? result[2].toString() : null);
					materialDetails.setSupplierName(result[3] != null ? result[3].toString() : null);
					materialDetails.setPurchaseOrderNo(result[4] != null ? result[4].toString() : null);
					materialDetails.setInvoiceNumber(result[5] != null ? result[5].toString() : null);
					materialDetails.setGrNo(result[6] != null ? result[6].toString() : null);
					materialDetails.setNOfRoll(result[7] != null ? result[7].toString() : null);
					response.setMaterialDetails(materialDetails);
				} else {
					// Handle case where result does not have enough columns
					response.setMaterialDetails(null); // or set a default value or error message
				}
			} else {
				// Handle case where no results were found
				response.setMaterialDetails(null); // or appropriate response
			}
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

//-----------------------------MANAGEMENT OF INCIDENCE--------------------------------//
//SAVE F003//
	@PostMapping("/saveManagementOfIncidence")
	public ResponseEntity<?> saveManagementOfIncidence(@RequestBody ManagementOfIncidence managmentofincidence,
			HttpServletRequest http) {

		ResponseEntity<?> submittedDetails = qaservice3.saveManagementOfIncidence(managmentofincidence, http);
		return submittedDetails;

	}

//SUBMIT F003//
	@PostMapping("/submitManagementOfIncidence")
	public ResponseEntity<?> submitManagementOfIncidence(@RequestBody ManagementOfIncidence managementofincidence,
			HttpServletRequest http) {

		ResponseEntity<?> submittedDetails = qaservice3.submitManagementOfIncidence(managementofincidence, http);
		return submittedDetails;

	}

	@GetMapping("/getdetailsForPrintIncidence")
	public ResponseEntity<?> getdetailsForPrintIncidence(@RequestParam String year) {
		try {
			ResponseEntity<?> records = qaservice3.getByPrintManagementOfIncidence(year);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getdetailsbyParamIncidence")
	public ResponseEntity<?> getdetailsByParamIncidence(@RequestParam String date) {
		try {
			ResponseEntity<?> records = qaservice3.getByParamIncidenceManagement(date);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getSummarydetailsIncidence")
	public ResponseEntity<?> getSummarydetailsIncidence(@RequestParam String department, HttpServletRequest http) {

		ResponseEntity<?> records = qaservice3.getSummaryManagmentOfIncidence(department, http);

		return records;

	}

//approve or reject
	@PutMapping("/ManagementOfIncidence/approveOrReject")
	public ResponseEntity<?> approveRejectionIncidence(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qaservice3.approveRejectManagementOfIncidence(approvalResponse, http);
		return resp;
	}

//-------------------------------------------LIST OF SHARP TOOLS-------------------------------------------------------------------//
//SAVE//
	@PostMapping("/saveSharpTools")
	public ResponseEntity<?> saveListOfSharpTools(@RequestBody ListOfSharpTools listofsharptools,
			HttpServletRequest http) {

		ResponseEntity<?> submittedDetails = qaservice3.saveSharpTools(listofsharptools, http);
		return submittedDetails;

	}

//SUBMIT//
	@PostMapping("/submitSharpTools")
	public ResponseEntity<?> submitListOfSharpTools(@RequestBody ListOfSharpTools listofsharptools,
			HttpServletRequest http) {

		ResponseEntity<?> submittedDetails = qaservice3.submitSharpTools(listofsharptools, http);
		return submittedDetails;

	}

	@GetMapping("/getdetailsForPrintSharpTools")
	public ResponseEntity<?> getdetailsForPrintSharpTools(@RequestParam(value = "date", required = false) String date,
			@RequestParam(value = "department", required = false) String department) {
		try {
			ResponseEntity<?> records = qaservice3.getByPrintListOfSharpTools(date, department);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getdetailsbyParamSharpTools")
	public ResponseEntity<?> getdetailsByParamSharpTools(@RequestParam String date, @RequestParam String department) {
		try {
			ResponseEntity<?> records = qaservice3.getByParamListOfSharpTools(date, department);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getSummarydetailsSharpTools")
	public ResponseEntity<?> getSummarydetailsSharpTools(HttpServletRequest http) {

		ResponseEntity<?> records = qaservice3.getSummaryListOfSharpTools(http);

		return records;

	}

//approve or reject
	@PutMapping("/SharpTools/approveOrReject")
	public ResponseEntity<?> approveRejectionSharpTools(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qaservice3.approveRejectListOfSharpTools(approvalResponse, http);
		return resp;
	}

//--------------------------------------------ANNUAL PLAN-----------------------------------------------------------//
//SAVE//
	@PostMapping("/saveAnnualPlan")
	public ResponseEntity<?> saveAnnualPlan(@RequestBody AnnualPlan annualplan, HttpServletRequest http) {

		ResponseEntity<?> savedDetails = qaservice3.saveAnnualPlan(annualplan, http);
		return savedDetails;

	}

//SUBMIT//
	@PostMapping("/submitAnnualPlan")
	public ResponseEntity<?> submitAnnualPlan(@RequestBody AnnualPlan annualplan, HttpServletRequest http) {

		ResponseEntity<?> submittedDetails = qaservice3.submitAnnualPlan(annualplan, http);
		return submittedDetails;

	}

	@GetMapping("/getdetailsForPrintAnnualplan")
	public ResponseEntity<?> getdetailsForPrintAnnualplan(@RequestParam String year) {
		try {
			ResponseEntity<?> records = qaservice3.getByPrintAnnualReport(year);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getdetailsbyParamAnnualplan")
	public ResponseEntity<?> getdetailsByParamAnnualplan(@RequestParam String year) {
		try {
			ResponseEntity<?> records = qaservice3.getByParamAnnualReport(year);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getSummarydetailsAnnualplan")
	public ResponseEntity<?> getSummarydetailsAnnualplan(HttpServletRequest http) {

		ResponseEntity<?> records = qaservice3.getSummaryAnnualPlan(http);

		return records;

	}

//-------------AGENDA FOR MANAGEMENT REVIEW MEETING-------------------//
//SAVE//
	@PostMapping("/saveAgenda")
	public ResponseEntity<?> saveAgenda(@RequestBody AgendaForManagementReviewMeeting agendaformanagementreviewmeeting,
			HttpServletRequest http) {

		ResponseEntity<?> savedDetails = qaservice3
				.saveAgendaForManagementReviewMeeting(agendaformanagementreviewmeeting, http);
		return savedDetails;

	}

//SUBMIT//
	@PostMapping("/submitAgenda")
	public ResponseEntity<?> submitAgenda(
			@RequestBody AgendaForManagementReviewMeeting agendaformanagementreviewmeeting, HttpServletRequest http) {

		ResponseEntity<?> submittedDetails = qaservice3
				.submitAgendaForManagementReviewMeeting(agendaformanagementreviewmeeting, http);
		return submittedDetails;

	}

	@GetMapping("/getdetailsForPrintAgenda")
	public ResponseEntity<?> getdetailsForPrintAgenda(@RequestParam(value = "year", required = false) String year,
			@RequestParam(value = "month", required = false) String month) {
		try {
			ResponseEntity<?> records = qaservice3.getByPrintAgendaForManagementReview(year, month);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getdetailsbyParamAgenda")
	public ResponseEntity<?> getdetailsByParamAgenda(@RequestParam String year, @RequestParam String month,
			@RequestParam String headings) {
		try {
			ResponseEntity<?> records = qaservice3.getByParamAgendaForManagementReview(year, month, headings);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getSummarydetailsAgenda")
	public ResponseEntity<?> getSummarydetailsAgenda(HttpServletRequest http) {

		ResponseEntity<?> records = qaservice3.getSummaryAgendaForManagementReview(http);

		return records;

	}

	@DeleteMapping("/AgendaDetails/delete")
	public ResponseEntity<?> deletePestControllertreatments(@RequestParam Long id) {
		ResponseEntity<?> records = qaservice3.deleteAgendaDetailsLines(id);
		return records;
	}

//AGENDA TOPIC
//ADD
	@PostMapping("/agenda/addTopic")
	public ResponseEntity<?> SaveAreaOfTreatments(HttpServletRequest http,
			@Valid @RequestBody ReviewMeetingTopics details, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaservice3.SaveAgendaTopics(details, http);

		return response;
	}

//GET
	@GetMapping("/agenda/GetTopics")
	public ResponseEntity<?> getDetails(@RequestParam Map<String, String> requestParams, Principal principal) {

		String headings = requestParams.get("headings");

		ResponseEntity<?> resp = qaservice3.getAgendaTopics(headings);
		return resp;
	}

//DELETE
	@DeleteMapping("/agenda/delete")
	public ResponseEntity<?> deleteagenda(@RequestParam Long id) {
		return qaservice3.deleteAgendaTopics(id);
	}

//GET USER FOR LOV

	@GetMapping("/agenda/GetActiveUser")
	public ResponseEntity<?> getActiveUserLov() {
		try {
			List<User> resp = userRepository.findAllActiveUser();

			return new ResponseEntity<>(resp, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

//-------------MINUTES OF MRM-------------------//
//SAVE//
	@PostMapping("/saveMOM")
	public ResponseEntity<?> saveMOM(@RequestBody MinutesOfMRM minutesofmrm, HttpServletRequest http) {

		ResponseEntity<?> savedDetails = qaservice3.saveMOM(minutesofmrm, http);
		return savedDetails;

	}

//SUBMIT//
	@PostMapping("/submitMOM")
	public ResponseEntity<?> submitAgenda(@RequestBody MinutesOfMRM minutesofmrm, HttpServletRequest http) {

		ResponseEntity<?> submittedDetails = qaservice3.submitMOM(minutesofmrm, http);
		return submittedDetails;

	}

	@GetMapping("/getdetailsForPrintMOM")
	public ResponseEntity<?> getdetailsForPrintMOM(@RequestParam(value = "year", required = false) String year,
			@RequestParam(value = "month", required = false) String month) {
		try {
			ResponseEntity<?> records = qaservice3.getByPrintMOM(year, month);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getdetailsbyParamMOM")
	public ResponseEntity<?> getdetailsByParamMOM(@RequestParam String year, @RequestParam String month,
			@RequestParam String headings) {
		try {
			ResponseEntity<?> records = qaservice3.getByParamMOM(year, month, headings);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

//Agenda Topics Mom
	@GetMapping("/getdetailsbyAgendaParamMOM")
	public ResponseEntity<?> getdetailsByParamAgendaMOM(@RequestParam String year, @RequestParam String month,
			@RequestParam(value = "headings", required = false) String headings) {
		try {
			ResponseEntity<?> records = qaservice3.getByParamAgendaTopicMOM(year, month, headings);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getSummarydetailsMOM")
	public ResponseEntity<?> getSummarydetailsMOM(HttpServletRequest http) {

		ResponseEntity<?> records = qaservice3.getSummaryMOM(http);

		return records;

	}

//------------------------SUMMARY OF TRACEABILITY--------------------------------//
//SAVE F003//
	@PostMapping("/saveSummaryOfTraceability")
	public ResponseEntity<?> saveSummaryOfTraceability(@RequestBody QASummaryOfTraceability qasummaryoftraceability,
			HttpServletRequest http) {

		ResponseEntity<?> submittedDetails = qaservice3.saveQASummaryOfTraceability(qasummaryoftraceability, http);
		return submittedDetails;

	}

//SUBMIT F003//
	@PostMapping("/submitSummaryOfTraceability")
	public ResponseEntity<?> submitQASummaryOfTraceability(@RequestBody QASummaryOfTraceability qasummaryoftraceability,
			HttpServletRequest http) {

		ResponseEntity<?> submittedDetails = qaservice3.submitQASummaryOfTraceability(qasummaryoftraceability, http);
		return submittedDetails;

	}

	@GetMapping("/getdetailsForPrintSummaryOfTraceability")
	public ResponseEntity<?> getdetailsForPrintSummaryOfTraceability(
			@RequestParam(value = "year", required = false) String year,
			@RequestParam(value = "month", required = false) String month) {
		try {
			ResponseEntity<?> records = qaservice3.getByPrintSummaryOfTraceability(year, month);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getdetailsbySummaryOfTraceability")
	public ResponseEntity<?> getdetailsByParamSummaryOfTraceability(@RequestParam String date,
			@RequestParam String department, @RequestParam String bmrNo) {
		try {
			ResponseEntity<?> records = qaservice3.getByParamSummaryOfTraceability(date, department, bmrNo);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getSummaryTracebility")
	public ResponseEntity<?> getSummaryTracebility(HttpServletRequest http) {

		ResponseEntity<?> records = qaservice3.getSummaryTracebility(http);

		return records;

	}

//approve or reject
	@PutMapping("/SummaryOfTraceability/approveOrReject")
	public ResponseEntity<?> approveSummaryOfTraceability(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qaservice3.approveRejectQASummaryOfTraceability(approvalResponse, http);
		return resp;
	}

//--BMR----//
	@GetMapping("/SummaryOfTraceabilityBMRDetails")
	public ResponseEntity<?> getBmrDetails(@RequestParam String department, @RequestParam String batchNo) {

		List<AllBMRDetailsDTO> bmrDetails = qaservice3.fetchBmrData(department, batchNo);
		return ResponseEntity.ok(bmrDetails);
	}
//----BATCH RELEASE NOTES-------//

//SAVE//
	@PostMapping("/saveBatchReleaseNotes")
	public ResponseEntity<?> saveSummaryOfTraceability(@RequestBody BatchReleaseNotesHeader batchreleasenotesheader,
			HttpServletRequest http) {

		ResponseEntity<?> submittedDetails = qaservice3.saveBatchReleaseNotes(batchreleasenotesheader, http);
		return submittedDetails;

	}

//SUBMIT//
	@PostMapping("/submitBatchReleaseNotes")
	public ResponseEntity<?> submitBatchReleaseNotes(@RequestBody BatchReleaseNotesHeader batchreleasenotesheader,
			HttpServletRequest http) {

		ResponseEntity<?> submittedDetails = qaservice3.submitBatchReleaseNotes(batchreleasenotesheader, http);
		return submittedDetails;

	}

	@GetMapping("/getdetailsForPrintBatchReleaseNotes")
	public ResponseEntity<?> getdetailsForPrintBatchReleaseNotes(
			@RequestParam(value = "year", required = false) String year,
			@RequestParam(value = "month", required = false) String month,
			@RequestParam(value = "department", required = false) String date) {
		try {
			ResponseEntity<?> records = qaservice3.getByPrintBatchReleaseNotes(year, month, date);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getdetailsbyParamBatchReleaseNotes")
	public ResponseEntity<?> getdetailsByParamBatchReleaseNotes(@RequestParam String date,
			@RequestParam String department) {
		try {
			ResponseEntity<?> records = qaservice3.getByParamBatchReleaseNotes(date);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getSummaryBatchReleaseNotes")
	public ResponseEntity<?> getSummaryBatchReleaseNotes(HttpServletRequest http) {

		ResponseEntity<?> records = qaservice3.getBatchReleaseNotesSummary(http);

		return records;

	}

//DELETE
	@DeleteMapping("/BatchReleaseNotesLines/delete")
	public ResponseEntity<?> deleteBatchReleaseNotesLines(@RequestParam Long id) {
		return qaservice3.deleteBatchReleaseNotesLines(id);
	}

//--ANNUAL PRODUCT REVIEW--//
//SAVE//
	@PostMapping("/saveAnnualProductReview")
	public ResponseEntity<?> saveAnnualProductReview(@RequestBody AnnualProductReview annualproductreview,
			HttpServletRequest http) {

		ResponseEntity<?> savedDetails = qaservice3.saveAnnualProductReview(annualproductreview, http);
		return savedDetails;

	}

//SUBMIT//
	@PostMapping("/submitAnnualProductReview")
	public ResponseEntity<?> submitAnnualProductReview(@RequestBody AnnualProductReview annualproductreview,
			HttpServletRequest http) {

		ResponseEntity<?> savedDetails = qaservice3.submitAnnualProductReview(annualproductreview, http);
		return savedDetails;

	}

//PARAM
	@GetMapping("/getdetailsbyParamAnnualProductReview")
	public ResponseEntity<?> getdetailsByParamAnnualProductReview(@RequestParam String date) {
		try {
			ResponseEntity<?> records = qaservice3.getByParamAnnualProductReview(date);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

//PRINT
	@GetMapping("/getdetailsForPrintAnnualProductReview")
	public ResponseEntity<?> getdetailsForPrintAnnualProductReview(
			@RequestParam(value = "year", required = false) String year,
			@RequestParam(value = "month", required = false) String month,
			@RequestParam(value = "date", required = false) String date) {
		try {
			ResponseEntity<?> records = qaservice3.getByPrintAnnualProductReview(year, month, date);

			return new ResponseEntity<>(records, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

//SUMMARY
	@GetMapping("/getSummaryAnnualProductReview")
	public ResponseEntity<?> getSummaryAnnualProductReview(HttpServletRequest http) {

		ResponseEntity<?> records = qaservice3.getAnnualProductReviewSummary(http);

		return records;

	}

//approve or reject
	@PutMapping("/AnnualProductReview/approveOrReject")
	public ResponseEntity<?> approveAnnualProductReview(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qaservice3.approveRejectAnnualProductReview(approvalResponse, http);
		return resp;
	}

//DELETE
	@DeleteMapping("/AnnualProductReview/delete")
	public ResponseEntity<?> deleteAnnualProductReview(@RequestParam String listName, @RequestParam Long id) {
		return qaservice3.deleteAnnualProductReview(listName, id);
	}

//GET GRAPH
	@GetMapping("/AnnualProductReview/getForgraph")
	public ResponseEntity<?> getForgraphAnnualProductReview(@RequestParam Long id) {
		List<AnnualProductReviewGraphDTO> graphdetails = annualproductreviewrepository.getGraph(id);
		return ResponseEntity.ok(graphdetails);
	}
	
		// GET BMR NUMBER 
	
	@GetMapping("/getAllBmrNumberByDate")
	public ResponseEntity<?> getBmrNumber(String date) {
		
		ResponseEntity<?> resp = qaservice3.getAllBmrNumbers(date);
		return resp;
	}
	

	@GetMapping("/getAllBmrDetailsByBatchNo")
	public ResponseEntity<?> getBmrDetailsByBatch(String batchNo) {
		
		ResponseEntity<?> resp = qaservice3.getBatchNumber(batchNo);
		return resp;
	}
	
}
