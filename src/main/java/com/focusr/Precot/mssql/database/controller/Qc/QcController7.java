package com.focusr.Precot.mssql.database.controller.Qc;

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

import com.focusr.Precot.mssql.database.model.Qc.ChemicalAnalysisReportARF003;
import com.focusr.Precot.mssql.database.model.Qc.DistilledWaterAnalysisReportARF012;
import com.focusr.Precot.mssql.database.model.Qc.QcPhMeterCalibrationReportF006;
import com.focusr.Precot.mssql.database.model.Qc.QcReagentPreparationRecordF017;
import com.focusr.Precot.mssql.database.model.Qc.QcShelfLifePeriodPhysicChemMicroF026;
import com.focusr.Precot.mssql.database.model.Qc.QcTdsMeterCalibrationReportF008;
import com.focusr.Precot.mssql.database.model.Qc.Qc_BacterialIncubatorTempCalibrationF012;
import com.focusr.Precot.mssql.database.model.Qc.Qc_CleaningOfAutoclavesF023;
import com.focusr.Precot.mssql.database.model.Qc.Qc_GlasswareBreakageDisposalRegisterF028;
import com.focusr.Precot.mssql.database.model.Qc.Qc_MediaGrowthPromotionTestReportF021;
import com.focusr.Precot.mssql.database.model.Qc.Qc_MediaPreparationAndConsumptionRecordF019;
import com.focusr.Precot.mssql.database.model.Qc.Qc_RawCottenConsolidatedAnalyticalReportF004;
import com.focusr.Precot.mssql.database.model.Qc.Qc_ValidationForAutoclaveByChemicalIndicatorF014;
import com.focusr.Precot.mssql.database.model.Qc.Qc_WiraFiberFinenessTesterReportF010;
import com.focusr.Precot.mssql.database.model.Qc.RawCottenAnalysisReportARF001;
import com.focusr.Precot.mssql.database.model.Qc.SampleInwardBookF001_F002_F003;
import com.focusr.Precot.mssql.database.model.Qc.SwabMicrobiologicalAnalysisARF008_009_010;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.Qc.QcService7;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;


/**
 * PH-QCL01-ARF-F001
 * PH-QCL01-ARF-F003
 * PH-QCL01-ARF-F008
 * PH-QCL01-ARF-F009
 * PH-QCL01-ARF-F010
 * PH-QCL01-ARF-F012
 * PH-QCL01F-001
 * PH-QCL01F-002
 * PH-QCL01F-003
 * PH-QCL01F-008
 * PH-QCL01/F-010
 * PH-QCL01/F-004
 * PH-QCL01/F-012
 * PH-QCL01/F-028
 * PH-QCL01/F-023
 * PH-QCL01/F-014
 * PH-QCL01/F-006
 * PH-QCL01/F-017
 * PH-QCL01/F-026
 * PH-QCL01/F-021
 * PH-QCL01/F-019
 * @author Jayanth Kumar A.S
 *
 */

@RestController
@RequestMapping("/api/qc")
public class QcController7 {
	
	@Autowired
	QcService7 qcService;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	Logger log = LoggerFactory.getLogger(QcController7.class);
	
	
//-----------------------------------PH-QCL01-AR-F-001(RAW COTTON ANALYSIS REPORT ) API'S----------------------------------------	

	@PostMapping("/saveRawCottonAnalysisReport")
    public ResponseEntity<?>  saveRawCottonAnalysisReport(@RequestBody RawCottenAnalysisReportARF001 report, HttpServletRequest request) {
        try {
        	log.info("Received payload: {}", report);
        	ResponseEntity<?> response =  qcService.saveRawCottonAnalysisReport(report,request);
            return response;
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to save Raw Cotton Analysis Report.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	

	@PostMapping("/SubmitRawCottonAnalysisReport")
	public ResponseEntity<?> SubmitRawCottonAnalysisReport(HttpServletRequest http,
			@Valid @RequestBody RawCottenAnalysisReportARF001 rawCottenAnalysisReportObj, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService.submitRawCottonAnalysisReport(rawCottenAnalysisReportObj, http);

		return response;
	}
	
	

	@PutMapping("/approveRawCottonAnalysisReport")
	public ResponseEntity<?> approveRawCottonAnalysisReport(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = qcService.approveRawCottonAnalysisReport(approvalResponse, http);
		return resp;
	}


	@GetMapping("/RawCottonAnalysisReport/GetByFormatId/{formatNo}")
	public ResponseEntity<?> getRawCottonAnalysisReportFormatId(@PathVariable String formatNo) {
		return qcService.getRawCottonAnalysisReportByFormatNo(formatNo);
	}

	@GetMapping("/RawCottonAnalysisReport/GetByMillBatchNo")
	public ResponseEntity<?> getRawCottonAnalysisReportByMillBatchNo(@RequestParam String millBatchNo) {
		return qcService.getRawCottonAnalysisReportByMillBatchNo(millBatchNo);
	}


	@GetMapping("/RawCottonAnalysisReport/GetById/{id}")
	public ResponseEntity<?> getRawCottonAnalysisReportById(@PathVariable Long id) {
		return qcService.getRawCottonAnalysisReportById(id);
	}


	@GetMapping("/RawCottonAnalysisReport/GetAll")
	public ResponseEntity<?> getAllBleachContRawCotton() {
		return qcService.getAllRawCottonAnalysisReport();
	}
	
	
	@GetMapping("/RawCottonAnalysisReport/getAllChemistAndMicroNotSubmitted")
	public ResponseEntity<?> getAllChemistAndMicroNotSubmittedF001() {
		return qcService.getAllChemistAndMicroNotSubmittedF001();
	}
	
	
	@GetMapping("/RawCottonAnalysisReport/getAllQcNotSubmitted")
	public ResponseEntity<?> getAllQcNotSubmittedF001() {
		return qcService.getAllQcNotSubmittedF001();
	}

	@GetMapping("/RawCottonAnalysisReport/getByDateF001")
	public ResponseEntity<?> getByDateF001(@RequestParam String date,@RequestParam String millBatchNo) {
		return qcService.getByDateDetailsF001(date,millBatchNo);
	}
	
	@GetMapping("/RawCottonAnalysisReport/GetRawCottonReportByPdeData")
	public ResponseEntity<?> getPdeDataARF001(String PH) {
	    try {
	        ResponseEntity<?> response = qcService.getPdeDataARF001(PH);
	        return response;
	    } catch (Exception ex) {
	    	
	        String msg = ex.getMessage();
	        log.error("Unable to get Raw Cotton Analysis Data: " + msg);
	       
	        return ResponseEntity
	            .status(HttpStatus.BAD_REQUEST)
	            .body(new ApiResponse(false, "Failed to get Raw Cotton Analysis Report Data: " + msg));
	    }
	}
	
	@GetMapping("/RawCottonAnalysisReport/GetReportForPrint")
	public ResponseEntity<?> getRawCottonAnalysisReportForPrint(@RequestParam String millBatchNo) {
		return qcService.getRawCottonAnalysisReportByMillBatchNoPrint(millBatchNo);
		
	}
	
	@GetMapping("/RawCottonAnalysisReport/GetPdeBatchNo")
	public ResponseEntity<?> getPdeBatchNo() { // Removed the unused String PH
	    try {
	        ResponseEntity<?> response = qcService.getBatchNumbersForLast45Days();
	        return response;
	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        log.error("Unable to get Batch No : " + msg);
	       
	        return ResponseEntity
	            .status(HttpStatus.BAD_REQUEST)
	            .body(new ApiResponse(false, "Failed to get Batch No: " + msg));
	    }
	}
	
	@GetMapping("/RawCottonAnalysisReport/GetByMillBatchNoFinalApproved")
	public ResponseEntity<?> getRawCottonAnalysisReportByMillBatchNoFinalApproved(@RequestParam String millBatchNo) {
		return qcService.getRawCottonAnalysisReportByMillBatchNoCompleteApproval(millBatchNo);
	}

	
//----------------------CHEMICAL ANALYSIS REPORT PH-QCL01-AR-F-003------------------------------

	@PostMapping("/SaveChemicalAnalysisReport")
    public ResponseEntity<?> saveChemicalAnalysisReport(@RequestBody ChemicalAnalysisReportARF003 report, HttpServletRequest request) {
        try {
        	log.info("Received payload: {}", report);
        	ResponseEntity<?> response =    qcService.saveChemicalAnalysisReport(report,request);
//            return new ResponseEntity<>("Chemical Analysis Report saved successfully.", HttpStatus.OK);
        	return response;
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to save Chemical Analysis Report.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

	@PostMapping("/SubmitChemicalAnalysisReport")
	public ResponseEntity<?> SubmitChemicalAnalysisReport(HttpServletRequest http,
			@Valid @RequestBody ChemicalAnalysisReportARF003 chemicalAnalysisReportObj, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService.submitChemicalAnalysisReport(chemicalAnalysisReportObj, http);

		return response;
	}
	

	@PutMapping("/ApproveChemicalAnalysisReport")
	public ResponseEntity<?> approveChemicalAnalysisReport(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = qcService.approveChemicalAnalysisReport(approvalResponse, http);
		return resp;
	}


	@GetMapping("/ChemicalAnalysisReport/GetByFormatId")
	public ResponseEntity<?> getChemicalAnalysisReportFormatId(@RequestParam String formatNo) {
		return qcService.getChemicalAnalysisReportByFormatNo(formatNo);
	}

	@GetMapping("/ChemicalAnalysisReport/GetByMaterialDocNo")
	public ResponseEntity<?> getChemicalAnalysisReportByMaterialDocNo(@RequestParam String materialDocNo) {
		return qcService.getChemicalAnalysisReportByMaterialDocNo(materialDocNo);
	}


	@GetMapping("/ChemicalAnalysisReport/GetById/{id}")
	public ResponseEntity<?> getChemicalAnalysisReportById(@PathVariable Long id) {
		return qcService.getChemicalAnalysisReportById(id);
	}


	@GetMapping("/ChemicalAnalysisReport/GetAll")
	public ResponseEntity<?> getAllChemicalAnalysisReport() {
		return qcService.getAllChemicalAnalysisReport();
	}
	
	
	@GetMapping("/ChemicalAnalysisReport/getAllChemistNotSubmitted")
	public ResponseEntity<?> getAllChemistNotSubmittedF003() {
		return qcService.getAllChemistNotSubmittedF003();
	}
	
	
	@GetMapping("/ChemicalAnalysisReport/getAllQcNotSubmitted")
	public ResponseEntity<?> getAllQcNotSubmittedF003() {
		return qcService.getAllQcNotSubmittedF003();
	}

	@GetMapping("/ChemicalAnalysisReport/getByDate")
	public ResponseEntity<?> getByDateF003(@RequestParam String date,@RequestParam String materialDocNo) {
		return qcService.getByDateDetailsF003(date,materialDocNo);
	}
	
	@GetMapping("/ChemicalAnalysisReport/GetReportForPrint")
	public ResponseEntity<?> getChemicalAnalysisReportForPrint(@RequestParam String materialDocNo) {
		return qcService.getChemicalAnalysisReportForPrint(materialDocNo);
		
	}
	
	@GetMapping("/ChemicalAnalysisReport/GetChemicalAnalysisReportPdeData")
	public ResponseEntity<?> getPdeData() {
	    try {
	        ResponseEntity<?> response = qcService.getPdeData();
	        return response;
	    } catch (Exception ex) {
	    	
	        String msg = ex.getMessage();
	        log.error("Unable to get Chemical Analysis Report Data: " + msg);
	       
	        return ResponseEntity
	            .status(HttpStatus.BAD_REQUEST)
	            .body(new ApiResponse(false, "Failed to get Chemical Analysis Report Data: " + msg));
	    }
	}
	
	//AMC
	
	@GetMapping("/getChemicalData")
	public ResponseEntity<?> getChemicalData(@RequestParam String chemical) {
	    try {
	        ResponseEntity<?> response = qcService.getChemicalData(chemical);
	        return response;
	    } catch (Exception ex) {
	    	
	        String msg = ex.getMessage();
	        log.error("Unable to get Chemical Analysis Report Data: " + msg);
	       
	        return ResponseEntity
	            .status(HttpStatus.BAD_REQUEST)
	            .body(new ApiResponse(false, "Failed to get Chemical Analysis Report Data: " + msg));
	    }
	}


//--------------------------SAMPLE INWARD BOOK F001,F002,F003-------------------------------------------	

//working	
	@PostMapping("/SaveSampleInwardBookF1F2F3")
	public ResponseEntity<?> saveSampleInwardBookF1F2F3(@RequestBody SampleInwardBookF001_F002_F003 report, HttpServletRequest request) {
	    try {
	        log.info("Received payload: {}", report);

	        // Call the service method which returns ResponseEntity<?> 
	        ResponseEntity<?> response = qcService.saveSampleInwardBook(report, request);

	        // Return the same response from service method
	        return response;

	    } catch (IllegalArgumentException e) {
	        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	    } catch (Exception e) {
	        return new ResponseEntity<>("Failed to save Report.", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}


//working	
	@PostMapping("/SubmitSampleInwardBookF1F2F3")
	public ResponseEntity<?> submitSampleInwardBook(HttpServletRequest http,
			@Valid @RequestBody SampleInwardBookF001_F002_F003 sampleInwardBookObj, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService.submitSampleInwardBook(sampleInwardBookObj, http);

		return response;
	}
	
////working
//	@PutMapping("/ApproveSampleInwardBookF1F2F3")
//	public ResponseEntity<?> approveSampleInwardBookF1F2F3(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
//		
//		ResponseEntity<?> resp = qcService.approveSampleInwardBook(approvalResponse, http);
//		return resp;
//	}


//working	
	@GetMapping("/SampleInwardBookF1F2F3/GetByFormatId")
	public ResponseEntity<?> getSampleInwardBookByFormatId(@RequestParam String formatNo) {
		return qcService.getSampleInwardBookByFormatNo(formatNo);
	}
	
//working	
	@GetMapping("/SampleInwardBookF1F2F3/GetByDateF001")
	public ResponseEntity<?> getSampleInwardBookByDateF001(@RequestParam String dateF001) {
		return qcService.getSampleInwardBookByDateF001(dateF001);
	}
//working
	@GetMapping("/SampleInwardBookF1F2F3/GetByDateF002")
	public ResponseEntity<?> getSampleInwardBookByDateF002(@RequestParam String dateF002) {
		return qcService.getSampleInwardBookByDateF002(dateF002);
	}

//working	
	@GetMapping("/SampleInwardBookF1F2F3/GetByDateF003")
	public ResponseEntity<?> getSampleInwardBookByDateF003(@RequestParam String dateF003) {
		return qcService.getSampleInwardBookByDateF003(dateF003);
	}
	
//working
	@GetMapping("/SampleInwardBookF1F2F3/GetById/{id}")
	public ResponseEntity<?> getSampleInwardBookById(@PathVariable Long id) {
		return qcService.getSampleInwardBookById(id);
	}


	@GetMapping("/SampleInwardBookF1F2F3/GetAll")
	public ResponseEntity<?> getAllSampleInwardBook() {
		return qcService.getAllSampleInwardBook();
	}
	
	
	@GetMapping("/SampleInwardBookF1F2F3/getAllChemistNotSubmitted")
	public ResponseEntity<?> getAllChemistNotSubmittedSampleInwardBook() {
		return qcService.getAllChemistNotSubmittedSampleInwardBook();
	}
	
	@GetMapping("/SampleInwardBookF1F2F3/getAllMicroNotSubmitted")
	public ResponseEntity<?> getAllMicroNotSubmittedSampleInwardBook() {
		return qcService.getAllMicroNotSubmittedSampleInwardBook();
	}
	
//	@GetMapping("/SampleInwardBookF1F2F3/getAllQcNotSubmitted")
//	public ResponseEntity<?> getAllQcNotSubmittedSampleInwardBook() {
//		return qcService.getAllQcNotSubmittedSampleInwardBook();
//	}
	
	@GetMapping("/SampleInwardBookF1F2F3/GetReportForPrint")
	public ResponseEntity<?> getSampleInwardBookForPrint (
			@RequestParam String formatNo,
			@RequestParam(required = false) String date,
	        @RequestParam(required = false) String month,
	        @RequestParam(required = false) String year) {
		return qcService.getMicroSampleInwardBookForPrint(formatNo,date,month,year);
	}

//----------------------------SWAB MICROBIOLOGIST ANALYSIS AR-F008,AR-F009,AR-F010-------------------------------------------	

//working
		@PostMapping("/SaveSwabMicroAnalysisF8F9F10")
		public ResponseEntity<?> saveSwabMicroAnalysisARF8F9F10(@RequestBody SwabMicrobiologicalAnalysisARF008_009_010 report, HttpServletRequest request) {
		    try {
		        log.info("Received payload: {}", report);

		        // Call the service method which returns ResponseEntity<?> 
		        ResponseEntity<?> response = qcService.saveSwabMicrobiologicalAnalysis(report, request);

		        // Return the same response from service method
		        return response;

		    } catch (IllegalArgumentException e) {
		        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		    } catch (Exception e) {
		        return new ResponseEntity<>("Failed to save Report.", HttpStatus.INTERNAL_SERVER_ERROR);
		    }
		}


//Working	
		@PostMapping("/SubmitSwabMicroAnalysisARF8F9F10")
		public ResponseEntity<?> submitSwabMicroAnalysisARF8F9F10(HttpServletRequest http,
				@Valid @RequestBody SwabMicrobiologicalAnalysisARF008_009_010 swabMicroAnalysisObj, BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qcService.submitSwabMicrobiologicalAnalysis(swabMicroAnalysisObj, http);

			return response;
		}
		
//working
		@PutMapping("/ApproveSwabMicrobiologicalAnalysis")
		public ResponseEntity<?> approveSwabMicrobiologicalAnalysis(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
			
			ResponseEntity<?> resp = qcService.approveSwabMicrobiologicalAnalysis(approvalResponse, http);
			return resp;
		}


//working	
		@GetMapping("/SwabMicroAnalysisF8F9F10/GetByFormatId")
		public ResponseEntity<?> getSwabMicroAnalysisByFormatId(@RequestParam String formatNo) {
			return qcService.getSwabMicrobiologicalAnalysisFormatNo(formatNo);
		}
		
//working		
		@GetMapping("/SwabMicroAnalysisF8F9F10/GetByDateF008MonthYear")
		public ResponseEntity<?> getSwabMicrobiologicalByDateF008(
				@RequestParam(required = false) String sampleDateF008,
		        @RequestParam(required = false) String month,
		        @RequestParam(required = false) String year) {
			return qcService.getSwabMicrobiologicalByDateF008(sampleDateF008,month,year);
		}
//working
		@GetMapping("/SwabMicroAnalysisF8F9F10/GetByDateF009MonthYear")
		public ResponseEntity<?> getSwabMicrobiologicalByDateF009(
				@RequestParam(required = false) String sampleDateF009,
		        @RequestParam(required = false) String month,
		        @RequestParam(required = false) String year) {
			return qcService.getSwabMicrobiologicalByDateF009(sampleDateF009,month,year);
		}

//working		
		@GetMapping("/SwabMicroAnalysisF8F9F10/GetByDateF010MonthYear")
		public ResponseEntity<?> getSwabMicrobiologicalByDateF010(
				@RequestParam(required = false) String sampleDateF010,
		        @RequestParam(required = false) String month,
		        @RequestParam(required = false) String year) {
			return qcService.getSwabMicrobiologicalByDateF010(sampleDateF010,month,year);
		}
		
//working	
		@GetMapping("/SwabMicroAnalysisF8F9F10/GetById/{id}")
		public ResponseEntity<?> getSwabMicrobiologicalById(@PathVariable Long id) {
			return qcService.getSwabMicrobiologicalById(id);
		}

//working
		@GetMapping("/SwabMicroAnalysisF8F9F10/GetAll")
		public ResponseEntity<?> getAllSwabMicrobiological() {
			return qcService.getAllSwabMicrobiological();
		}
		
//working	
		@GetMapping("/SwabMicroAnalysisF8F9F10/getAllMicroNotSubmitted")
		public ResponseEntity<?> getAllMicroNotSubmittedSwabMicrobiological() {
			return qcService.getAllMicroNotSubmittedSwabMicrobiological();
		}
//working		
		@GetMapping("/SwabMicroAnalysisF8F9F10/getAllQcNotSubmitted")
		public ResponseEntity<?> getAllQcNotSubmittedSwabMicrobiological() {
			return qcService.getAllQcNotSubmittedSwabMicrobiological();
		}
		
		@GetMapping("/SwabMicroAnalysisF8F9F10/GetReportForPrint")
		public ResponseEntity<?> getSwabMicrobiologicalForPrint (
				@RequestParam String formatNo,
				@RequestParam(required = false) String date,
		        @RequestParam(required = false) String month,
		        @RequestParam(required = false) String year) {
			return qcService.getSwabMicrobiologicalForPrint(formatNo,date,month,year);
		}
		
//-----------------------------------------------DISTILLED WATER ANALYSIS REPORT PH-QCL01-AR-F-012-----------------------------------------------------------------	

//working
		@PostMapping("/SaveDistilledWaterAnalysisReportARF012")
		public ResponseEntity<?> saveDistilledWaterAnalysisReport(@RequestBody DistilledWaterAnalysisReportARF012 report, HttpServletRequest request) {
			try {
				log.info("Received payload: {}", report);

				// Call the service method which returns ResponseEntity<?> 
				ResponseEntity<?> response = qcService.saveDistilledWaterAnalysis(report, request);

				// Return the same response from service method
				return response;

			} catch (IllegalArgumentException e) {
				return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
			} catch (Exception e) {
				return new ResponseEntity<>("Failed to save Report.", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

//working
		@PostMapping("/SubmitDistilledWaterAnalysisReportARF012")
		public ResponseEntity<?> submitDistilledWaterAnalysisReportARF012(HttpServletRequest http,
				@Valid @RequestBody DistilledWaterAnalysisReportARF012 distilledWaterAnalysisObj, BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qcService.submitDistilledWaterAnalysis(distilledWaterAnalysisObj, http);

			return response;
		}
//working
		@PutMapping("/ApproveDistilledWaterAnalysisARF012")
		public ResponseEntity<?> approveDistilledWaterAnalysis(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

			ResponseEntity<?> resp = qcService.approveDistilledWaterAnalysis(approvalResponse, http);
			return resp;
		}

////working
//		@GetMapping("/DistilledWaterAnalysisReportARF012/GetByFormatNo")
//		public ResponseEntity<?> getDistilledWaterAnalysisByFormatId(@RequestParam String formatNo) {
//			return qcService.getDistilledWaterAnalysisFormatNo(formatNo);
//		}

		
		@GetMapping("/DistilledWaterAnalysisReportARF012/GetByDateMonthYear")
		public ResponseEntity<?> getDistilledWaterAnalysisByDateDateMonthYear(
		        @RequestParam(required = false) String date,
		        @RequestParam(required = false) String month,
		        @RequestParam(required = false) String year) {
		    return qcService.getDistilledWaterAnalysisByDate(date, month, year);
		}

//working
		@GetMapping("/DistilledWaterAnalysisReportARF012/GetById/{id}")
		public ResponseEntity<?> getDistilledWaterAnalysisById(@PathVariable Long id) {
			return qcService.getDistilledWaterAnalysisById(id);
		}

//working
		@GetMapping("/DistilledWaterAnalysisReportARF012/GetAll")
		public ResponseEntity<?> getAllDistilledWaterAnalysis() {
			return qcService.getAllDistilledWaterAnalysis();
		}

//working
		@GetMapping("/DistilledWaterAnalysisReportARF012/getAllChemistNotSubmitted")
		public ResponseEntity<?> getAllChemistSubmittednotApprovedDistilledWaterAnalysis() {
			return qcService.getAllChemistNotSubmittedARF012();
		}
//working
		@GetMapping("/DistilledWaterAnalysisReportARF012/getAllQcNotSubmitted")
		public ResponseEntity<?> getAllQcNotSubmittedDistilledWaterAnalysis() {
			return qcService.getAllQcNotSubmittedF012();
		}

//working		
		@GetMapping("/DistilledWaterAnalysisReportARF012/GetByDateMonthYear/print")
		public ResponseEntity<?> getDistilledWaterAnalysisForPrint(		        
				@RequestParam(required = false) String date,
		        @RequestParam(required = false) String month,
		        @RequestParam(required = false) String year) {
			return qcService.getDistilledWaterAnalysisForPrint(date, month, year);
		}

//------------------------------------------------TDS-METER CALIBRATION REPORT PH-QCL01/F-008-----------------------------------------------------------------	
		
//working
		@PostMapping("/SaveTdsMeterCalibrationReportF008")
		public ResponseEntity<?> saveTdsMeterCalibrationReport(@RequestBody QcTdsMeterCalibrationReportF008 report, HttpServletRequest request) {
			try {
				log.info("Received payload: {}", report);

				// Call the service method which returns ResponseEntity<?> 
				ResponseEntity<?> response = qcService.saveTdsMeterCalibrationReport(report, request);

				// Return the same response from service method
				return response;

			} catch (IllegalArgumentException e) {
				return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
			} catch (Exception e) {
				return new ResponseEntity<>("Failed to save Report.", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

//working
		@PostMapping("/SubmitTdsMeterCalibrationReportF008")
		public ResponseEntity<?> submitTdsMeterCalibrationReportF008(HttpServletRequest http,
				@Valid @RequestBody QcTdsMeterCalibrationReportF008 qcTdsMeterCalibrationReportF008, BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qcService.submitTdsMeterCalibrationReport(qcTdsMeterCalibrationReportF008, http);

			return response;
		}

//working		
		@PutMapping("/ApproveTdsMeterCalibrationReportF008")
		public ResponseEntity<?> approveTdsMeterCalibrationReportF008(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

			ResponseEntity<?> resp = qcService.approveTdsMeterCalibrationReport(approvalResponse, http);
			return resp;
		}

//working
		@GetMapping("/TdsMeterCalibrationReportF008/GetByFormatId")
		public ResponseEntity<?> getTdsMeterCalibrationReportByFormatId(@RequestParam String formatNo) {
			return qcService.getTdsMeterCalibrationReportFormatNo(formatNo);
		}

//working
//		@GetMapping("/TdsMeterCalibrationReportF008/GetByDate")
//		public ResponseEntity<?> getTdsMeterCalibrationReportByDate(@RequestParam String date) {
//			return qcService.getTdsMeterCalibrationReportByDate(date);
//		}
		
		@GetMapping("/TdsMeterCalibrationReportF008/GetByDateMonthYear")
		public ResponseEntity<?> getTdsMeterCalibrationReportByDateMonthYear(
		        @RequestParam(required = false) String date,
		        @RequestParam(required = false) String month,
		        @RequestParam(required = false) String year) {
		    return qcService.getTdsMeterCalibrationReportByDateMonthYear(date, month, year);
		}


//working
		@GetMapping("/TdsMeterCalibrationReportF008/GetById/{id}")
		public ResponseEntity<?> getTdsMeterCalibrationReportById(@PathVariable Long id) {
			return qcService.getTdsMeterCalibrationReportById(id);
		}

//working
		@GetMapping("/TdsMeterCalibrationReportF008/GetAll")
		public ResponseEntity<?> getAllTdsMeterCalibrationReport() {
			return qcService.getAllTdsMeterCalibrationReport();
		}

//working
		@GetMapping("/TdsMeterCalibrationReportF008/getAllChemistNotSubmitted")
		public ResponseEntity<?> getAllChemistSubmittedNotApprovedTdsMeterCalibrationReport(HttpServletRequest http) {
			return qcService.getAllChemistNotSubmittedF008();
		}

		@GetMapping("/TdsMeterCalibrationReportF008/getAllQcNotSubmitted")
		public ResponseEntity<?> getAllQcNotSubmittedTdsMeterCalibrationReport() {
			return qcService.getAllQcNotSubmittedF008();
		}	
		
		@GetMapping("/TdsMeterCalibrationReportF008/GetByDateMonthYear/print")
		public ResponseEntity<?> getTdsMeterCalibrationReportForPrint(
		        @RequestParam(required = false) String date,
		        @RequestParam(required = false) String month,
		        @RequestParam(required = false) String year) {
		    return qcService.getTdsMeterCalibrationReportForPrint(date, month, year);
		}
		
//-----------------------------------------WIRA FIBER FINENESS TESTER CALIBRATION REPORT-PH-QCL01/F-010-----------------------------------------------------------------	
		
		@PostMapping("/SaveWiraFiberFinenessF010")
		public ResponseEntity<?> saveWiraFiberFinenessF010Report(@RequestBody Qc_WiraFiberFinenessTesterReportF010 report, HttpServletRequest request) {
			try {
				log.info("Received payload: {}", report);

				// Call the service method which returns ResponseEntity<?> 
				ResponseEntity<?> response = qcService.saveWiraFiberFinessF010(report, request);

				// Return the same response from service method
				return response;

			} catch (IllegalArgumentException e) {
				return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
			} catch (Exception e) {
				return new ResponseEntity<>("Failed to save Report.", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}


		@PostMapping("/SubmitWiraFiberFinenessF010")
		public ResponseEntity<?> submitWiraFiberFinenessF010(HttpServletRequest http,
				@Valid @RequestBody Qc_WiraFiberFinenessTesterReportF010 wiraFiberFinenessTesterReportF010, BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qcService.submitWiraFiberFinessF010(wiraFiberFinenessTesterReportF010, http);

			return response;
		}

	
		@PutMapping("/ApproveWiraFiberFinessF010")
		public ResponseEntity<?> approveWiraFiberFinessF010(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

			ResponseEntity<?> resp = qcService.approveWiraFiberFinenessF010Report(approvalResponse, http);
			return resp;
		}

		//working
		@GetMapping("/WiraFiberFinessF010/GetByFormatId")
		public ResponseEntity<?> getWiraFiberFinenessF010ByFormatId(@RequestParam String formatNo) {
			return qcService.getWiraFiberFinenessF010FormatNo(formatNo);
		}


		@GetMapping("/WiraFiberFinessF010/GetByMonthYear")
		public ResponseEntity<?> getWiraFiberFinenessF010ByMonthYear(
				@RequestParam(required = false) String month,
				@RequestParam(required = false) String year) {
			return qcService.getWiraFiberFinenessF010ByMonthYear( month, year);
		}


		
		@GetMapping("/WiraFiberFinessF010/GetById/{id}")
		public ResponseEntity<?> getWiraFiberFinenessF010ById(@PathVariable Long id) {
			return qcService.getWiraFiberFinenessF010ById(id);
		}

		
		@GetMapping("/WiraFiberFinessF010/GetAll")
		public ResponseEntity<?> getAllWiraFiberFinenessF010Report() {
			return qcService.getAllWiraFiberFinenessF010Report();
		}

	
		@GetMapping("/WiraFiberFinessF010/getAllChemistNotSubmitted")
		public ResponseEntity<?> getAllChemistNotSubmittedWiraFiberFinenessF010(HttpServletRequest http) {
			return qcService.getAllChemistNotSubmittedF010();
		}

		@GetMapping("/WiraFiberFinessF010/getAllQcNotSubmitted")
		public ResponseEntity<?> getAllQcNotSubmittedWiraFiberFinenessF010Report() {
			return qcService.getAllManagerNotSubmittedF010();
		}	

		@GetMapping("/WiraFiberFinessF010/GetByMonthYear/print")
		public ResponseEntity<?> getWiraFiberFinenessF010ReportForPrint(
				@RequestParam(required = false) String month,
				@RequestParam(required = false) String year) {
			return qcService.getWiraFiberFinenessF010ReportForPrint(month, year);
		}
		
//-----------------------------------------RAW COTTON CONSOLIDATED ANALYTICAL REPORT PH-QCL01/F-004------------------------------------------		
		
//		@PostMapping("/SaveRawCottonConsolidatedF004")
//		public ResponseEntity<?> saveRawCottonConsolidatedReport(@RequestBody Qc_RawCottenConsolidatedAnalyticalReportF004 report, HttpServletRequest request) {
//			try {
//				log.info("Received payload: {}", report);
//
//				// Call the service method which returns ResponseEntity<?> 
//				ResponseEntity<?> response = qcService.saveRawCottonConsolidatedReport(report, request);
//
//				// Return the same response from service method
//				return response;
//
//			} catch (IllegalArgumentException e) {
//				return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//			} catch (Exception e) {
//				return new ResponseEntity<>("Failed to save Report.", HttpStatus.INTERNAL_SERVER_ERROR);
//			}
//		}

//1		
//		@PostMapping("/SaveRawCottonConsolidatedF004")
//		public ResponseEntity<?> saveRawCottonConsolidatedReport(
//		        @RequestBody List<Qc_RawCottenConsolidatedAnalyticalReportF004> reports, 
//		        HttpServletRequest request) {
//		    try {
//		        log.info("Received payload with {} reports", reports.size());
//
//		        // Call the service method which handles the list of reports
//		        ResponseEntity<?> response = qcService.saveRawCottonConsolidatedReport(reports, request);
//
//		        // Return the same response from the service method
//		        return response;
//
//		    } catch (IllegalArgumentException e) {
//		        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//		    } catch (Exception e) {
//		        return new ResponseEntity<>("Failed to save reports.", HttpStatus.INTERNAL_SERVER_ERROR);
//		    }
//		}
		
		@PostMapping("/SaveRawCottonConsolidatedF004")
		public ResponseEntity<?> saveRawCottonConsolidatedReport(@RequestBody Qc_RawCottenConsolidatedAnalyticalReportF004 report, HttpServletRequest request) {
			try {
				log.info("Received payload: {}", report);

				// Call the service method which returns ResponseEntity<?> 
				ResponseEntity<?> response = qcService.saveRawCottonConsolidatedReport(report, request);

				// Return the same response from service method
				return response;

			} catch (IllegalArgumentException e) {
				return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
			} catch (Exception e) {
				return new ResponseEntity<>("Failed to save Report.", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		

		
		@PostMapping("/SubmitRawCottonConsolidatedF004")
		public ResponseEntity<?> submitRawCottonConsolidatedReport(HttpServletRequest http,
				@Valid @RequestBody Qc_RawCottenConsolidatedAnalyticalReportF004 rawCottenConsolidatedAnalyticalReportF004, BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qcService.submitRawCottonConsolidatedReport(rawCottenConsolidatedAnalyticalReportF004, http);

			return response;
		}
		
//		@PostMapping("/SubmitRawCottonConsolidatedF004")
//		public ResponseEntity<?> submitRawCottonConsolidatedReport(
//		        HttpServletRequest http,
//		        @Valid @RequestBody List<Qc_RawCottenConsolidatedAnalyticalReportF004> rawCottenConsolidatedReports, 
//		        BindingResult result, 
//		        Principal principal) {
//
//		    // Handle validation errors
//		    ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
//		    if (errorMap != null)
//		        return errorMap;
//
//		    // Call the service method, which expects a list of reports
//		    ResponseEntity<?> response = qcService.submitRawCottonConsolidatedReport(rawCottenConsolidatedReports, http);
//
//		    return response;
//		}

		
		@PutMapping("/ApproveRawCottonConsolidatedF004")
		public ResponseEntity<?> approveRawCottonConsolidatedF004(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

			ResponseEntity<?> resp = qcService.approveRawCottonConsolidatedReport(approvalResponse, http);
			return resp;
		}
		
		@GetMapping("/RawCottonConsolidatedF004/GetByFormatId")
		public ResponseEntity<?> getRawCottonConsolidatedF004ByFormatId(@RequestParam String formatNo) {
			return qcService.getRawCottonConsolidatedReportByFormatNo(formatNo);
		}
		
		@GetMapping("/RawCottonConsolidatedF004/GetByBmrNo")
		public ResponseEntity<?> getRawCottonConsolidatedF004ByBmrNo(@RequestParam String bleachingBmrNo) {
			return qcService.getRawCottonConsolidatedByBmrNo(bleachingBmrNo);
		}
		
		@GetMapping("/RawCottonConsolidatedF004/GetById/{id}")
		public ResponseEntity<?> getRawCottonConsolidatedF004ById(@PathVariable Long id) {
			return qcService.getRawCottonConsolidatedReportById(id);
		}
		
		@GetMapping("/RawCottonConsolidatedF004/GetAll")
		public ResponseEntity<?> getRawCottonConsolidatedF004Report() {
			return qcService.getAllRawCottonConsolidatedReport();
		}
		
		@GetMapping("/RawCottonConsolidatedF004/getAllChemistNotSubmitted")
		public ResponseEntity<?> getAllRawCottonConsolidatedF004() {
			return qcService.getAllChemistNotSubmittedF004();
		}
		
		@GetMapping("/RawCottonConsolidatedF004/getAllQcNotSubmitted")
		public ResponseEntity<?> getAllQcNotSubmittedRawCottonConsolidatedF004Report() {
			return qcService.getAllQcNotSubmittedF004();
		}	
		
		@GetMapping("/RawCottonConsolidatedF004/GetReportForPrint")
		public ResponseEntity<?> getRawCottonConsolidatedF004ForPrint(@RequestParam String bleachingBmrNo) {
			return qcService.getRawCottonConsolidatedReportForPrint(bleachingBmrNo);
			
		}
		
		 @GetMapping("/RawCottonConsolidatedF004/bmrNoList")
		    public ResponseEntity<?> getPdeDataRawCottonConsolidatedBmr() {
		        try {
		            // Call the service to get the key-value pair data
		            return qcService.getPdeDataRawCottonConsolidatedBmr();
		        } catch (Exception e) {
		            // Log the error and return a failure response
		            log.error("Error fetching BMR mapping data", e);
		            return new ResponseEntity<>(new ApiResponse(false, "Failed to fetch BMR mapping data"), HttpStatus.INTERNAL_SERVER_ERROR);
		        }
		    }
		 
		 @GetMapping("/RawCottonConsolidatedF004/batch-numbers")
		    public ResponseEntity<?> getExistingDatasFromRawCottonAnalysis(@RequestParam("bmrNo") String bmrNo) {
		        try {
		            // Calling service method to get batch numbers using BMR No
		            return qcService.getExistingDatasFromRawCottonAnalysis(bmrNo);
		        } catch (Exception ex) {
		            // Log error and return 500 Internal Server Error
		            log.error("Error fetching batch numbers for BMR No: " + bmrNo, ex);
		            return new ResponseEntity<>(new ApiResponse(false, "Error fetching data for BMR No: " + bmrNo), HttpStatus.INTERNAL_SERVER_ERROR);
		        }
		    }
		
//-----------------------------BACTERIAL INCUBATOR TEMPERATURE CALIBRATION REPORT PH-QCL01/F-012------------------------------------
		
		@PostMapping("/SaveBacterialIncubatorF012")
		public ResponseEntity<?> saveBacterialIncubatorReport(@RequestBody Qc_BacterialIncubatorTempCalibrationF012 report, HttpServletRequest request) {
			try {
				log.info("Received payload: {}", report);

				// Call the service method which returns ResponseEntity<?> 
				ResponseEntity<?> response = qcService.saveBacterialIncubatorTempCalibReportF012(report, request);

				// Return the same response from service method
				return response;

			} catch (IllegalArgumentException e) {
				return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
			} catch (Exception e) {
				return new ResponseEntity<>("Failed to save Report.", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		
		@PostMapping("/SubmitBacterialIncubatorF012")
		public ResponseEntity<?> submitBacterialIncubatorReport(HttpServletRequest http,
				@Valid @RequestBody Qc_BacterialIncubatorTempCalibrationF012 bacterialIncubatorTempCalibrationF012, BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qcService.submitBacterialIncubatorTempCalibReportF012(bacterialIncubatorTempCalibrationF012, http);

			return response;
		}
		
		@PutMapping("/ApproveBacterialIncubatorF012")
		public ResponseEntity<?> approveBacterialIncubatorReport(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

			ResponseEntity<?> resp = qcService.approveBacterialIncubatorTempCalibReport(approvalResponse, http);
			return resp;
		}
		
		@GetMapping("/BacterialIncubatorF012/GetByFormatId")
		public ResponseEntity<?> getBacterialIncubatorF012ByFormatId(@RequestParam String formatNo) {
			return qcService.getBacterialIncubatorTempCalibReportByFormatNo(formatNo);
		}
		
		@GetMapping("/BacterialIncubatorF012/GetByDateMonthYearEqIdNo")
		public ResponseEntity<?> getBacterialIncubatorF012ByDateMonthYear(
		        @RequestParam(required = false) String date,
		        @RequestParam(required = false) String month,
		        @RequestParam(required = false) String year,
		        @RequestParam(required = false) String eqIdNo) {
		    return qcService.getBacterialIncubatorTempCalibReportByDateMonthYearEqNo(date, month, year,eqIdNo);
		}
		
		@GetMapping("/BacterialIncubatorF012/GetById/{id}")
		public ResponseEntity<?> getBacterialIncubatorF012ById(@PathVariable Long id) {
			return qcService.getBacterialIncubatorTempCalibReportById(id);
		}
		
		@GetMapping("/BacterialIncubatorF012/GetAll")
		public ResponseEntity<?> getBacterialIncubatorTempCalibReport() {
			return qcService.getAllBacterialIncubatorTempCalibReport();
		}
		
		@GetMapping("/BacterialIncubatorF012/getAllMicroNotSubmitted")
		public ResponseEntity<?> getAllMicroBacterialIncubatorTempCalib() {
			return qcService.getAllMicroNotSubmittedF012();
		}
		
		@GetMapping("/BacterialIncubatorF012/getAllManagerNotSubmitted")
		public ResponseEntity<?> getAllManagerNotSubmittedBacterialIncubatorTempCalibF012() {
			return qcService.getAllManagerNotSubmittedF012();
		}	
		
		@GetMapping("/BacterialIncubatorF012/PrintForF012")
		public ResponseEntity<?> getPrintForF012ByDateMonthYear(
		        @RequestParam(required = false) String date,
		        @RequestParam(required = false) String month,
		        @RequestParam(required = false) String year,
		        @RequestParam(required = false) String eqIdNo) {
		    return qcService.getPrintBacterialIncubatorTemp(date, month, year,eqIdNo);
		}

//----------------------------------GLASSWARES BREAKAGE & DISPOSAL REGISTER PH-QCL01/F-028------------------------------------------
		
		@PostMapping("/SaveGlasswareBreakageDisposalF028")
		public ResponseEntity<?> saveGlasswareBreakageDisposalReport(@RequestBody Qc_GlasswareBreakageDisposalRegisterF028 report, HttpServletRequest request) {
			try {
				log.info("Received payload: {}", report);

				// Call the service method which returns ResponseEntity<?> 
				ResponseEntity<?> response = qcService.saveGlasswaresBreakageDisposalF028(report, request);

				// Return the same response from service method
				return response;

			} catch (IllegalArgumentException e) {
				return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
			} catch (Exception e) {
				return new ResponseEntity<>("Failed to save Report.", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		
		@PostMapping("/SubmitGlasswareBreakageDisposalF028")
		public ResponseEntity<?> submitGlasswareBreakageDisposalReport(HttpServletRequest http,
				@Valid @RequestBody Qc_GlasswareBreakageDisposalRegisterF028 glasswareBreakageDisposalRegisterF028, BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qcService.submitGlasswareBreakageDisposalF028(glasswareBreakageDisposalRegisterF028, http);

			return response;
		}
		
		@GetMapping("/GlasswareBreakageDisposal/GetByFormatId")
		public ResponseEntity<?> getGlasswareBreakageDisposalByFormatId(@RequestParam String formatNo) {
			return qcService.getGlasswareBreakageDisposalF028ByFormatNo(formatNo);
		}
		
		@GetMapping("/GlasswareBreakageDisposal/GetById/{id}")
		public ResponseEntity<?> getGlasswareBreakageDisposalById(@PathVariable Long id) {
			return qcService.getGlasswareBreakageDisposalF028ById(id);
		}
		
		@GetMapping("/GlasswareBreakageDisposal/GetAll")
		public ResponseEntity<?> getGlasswareBreakageDisposalReport(HttpServletRequest http) {
			return qcService.getAllGlasswareBreakageDisposalReport(http);
		}
		
		@GetMapping("/GlasswareBreakageDisposal/PrintForF028")
		public ResponseEntity<?> getPrintForF028ByDateMonthYear(
		        @RequestParam(required = false) String date,
		        @RequestParam(required = false) String month,
		        @RequestParam(required = false) String year) {
		    return qcService.getPrintGlasswareBreakageDisposal(date, month, year);
		}
		
//------------------------------------------ CLEANING OF AUTOCLAVE F023-----------------------------------------------------
		
		@PostMapping("/SaveCleaningOfAutoclaveF023")
		public ResponseEntity<?> saveCleaningOfAutoclaveReport(@RequestBody Qc_CleaningOfAutoclavesF023 report, HttpServletRequest request) {
			try {
				log.info("Received payload: {}", report);

				// Call the service method which returns ResponseEntity<?> 
				ResponseEntity<?> response = qcService.saveCleaningOfAutoclavesF023(report, request);

				// Return the same response from service method
				return response;

			} catch (IllegalArgumentException e) {
				return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
			} catch (Exception e) {
				return new ResponseEntity<>("Failed to save Report.", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		
		@PostMapping("/SubmitCleaningOfAutoclavesF023")
		public ResponseEntity<?> submitCleaningOfAutoclaveReport(HttpServletRequest http,
				@Valid @RequestBody Qc_CleaningOfAutoclavesF023 CleaningOfAutoclavesF023, BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qcService.submitCleaningOfAutoclavesF023(CleaningOfAutoclavesF023, http);

			return response;
		}
		
		@GetMapping("/CleaningOfAutoclavesF023/GetByFormatId")
		public ResponseEntity<?> getCleaningOfAutoclaveReportByFormatId(@RequestParam String formatNo) {
			return qcService.getCleaningOfAutoclavesF023ByFormatNo(formatNo);
		}
		
		@GetMapping("/CleaningOfAutoclavesF023/GetById/{id}")
		public ResponseEntity<?> getCleaningOfAutoclaveReportById(@PathVariable Long id) {
			return qcService.getCleaningOfAutoclavesF023ById(id);
		}
		
		@GetMapping("/CleaningOfAutoclavesF023/GetAll")
		public ResponseEntity<?> getCleaningOfAutoclavesF023Report() {
			return qcService.getAllCleaningOfAutoclavesF023Report();
		}
		
		@GetMapping("/CleaningOfAutoclavesF023/PrintForF028")
		public ResponseEntity<?> getCleaningOfAutoclavesF023DateMonthYearWeek(
		        @RequestParam(required = false) String date,
		        @RequestParam(required = false) String month,
		        @RequestParam(required = false) String year,
		        @RequestParam(required = false) String week) {
		    return qcService.getPrintCleaningOfAutoclavesF023(date, month, year,week);
		}
		
		@GetMapping("/CleaningOfAutoclavesF023/FetchF028ByDate")
		public ResponseEntity<?> getCleaningOfAutoclavesF023Date(
		        @RequestParam(required = false) String date,
		        @RequestParam(required = false) String month,
		        @RequestParam(required = false) String year) {
		    return qcService.getCleaningOfAutoclavesF023ByDate(date, month, year);
		}
		
//------------------------------------------ VALIDATION FOR AUTOCLAVE BY CHEMICAL INDICATOR PH-QCL01/F-014-----------------------------------------------------
		
		@PostMapping("/SavevalidationForAutoclaveChemistF014")
		public ResponseEntity<?> saveValidationForAutoclaveByChemicakIndiReport(@RequestBody Qc_ValidationForAutoclaveByChemicalIndicatorF014 report, HttpServletRequest request) {
			try {
				log.info("Received payload: {}", report);

				// Call the service method which returns ResponseEntity<?> 
				ResponseEntity<?> response = qcService.saveValidationForAutoclaveByChemicalIndiF014(report, request);

				// Return the same response from service method
				return response;

			} catch (IllegalArgumentException e) {
				return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
			} catch (Exception e) {
				return new ResponseEntity<>("Failed to save Report.", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		
		@PostMapping("/SubmitvalidationForAutoclaveChemistF014")
		public ResponseEntity<?> submitValidationForAutoclaveByChemicakIndiReport(HttpServletRequest http,
				@Valid @RequestBody Qc_ValidationForAutoclaveByChemicalIndicatorF014 validationForAutoclave, BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qcService.submitValidationForAutoclaveByChemicalIndiF014(validationForAutoclave, http);

			return response;
		}
		
		@PutMapping("/ApproveValidationForAutoclaveChemistF014")
		public ResponseEntity<?> approveValidationForAutoclaveByChemicalIndiReport(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

			ResponseEntity<?> resp = qcService.approveValidationForAutoclaveByChemicaIndiF014(approvalResponse, http);
			return resp;
		}
		
		@GetMapping("/ValidationForAutoclaveChemistF014/GetByFormatId")
		public ResponseEntity<?> getValidationForAutoclaveByChemicalByFormatId(@RequestParam String formatNo) {
			return qcService.getValidationForAutoclaveByChemicalIndiF014ByFormatNo(formatNo);
		}
		
		@GetMapping("/ValidationForAutoclaveChemistF014/GetByDate")
		public ResponseEntity<?> getValidationForAutoclaveByChemicalByDate(
				@RequestParam(required = false) String date,
				@RequestParam(required = false) String eqIdNo) {
			return qcService.getValidationForAutoclaveByChemicalIndiF014ByDate(date,eqIdNo);
		}
		
		@GetMapping("/ValidationForAutoclaveChemistF014/GetById/{id}")
		public ResponseEntity<?> getValidationForAutoclaveByChemicalById(@PathVariable Long id) {
			return qcService.getValidationForAutoclaveByChemicalIndiF014ById(id);
		}
		
		@GetMapping("/ValidationForAutoclaveChemistF014/GetAll")
		public ResponseEntity<?> getValidationForAutoclaveByChemicalReport() {
			return qcService.getAllValidationForAutoclaveByChemicalIndiF014Report();
		}
		
		@GetMapping("/ValidationForAutoclaveChemistF014/getAllMicroNotSubmitted")
		public ResponseEntity<?> getAllMicroNotSubmittedValidationForAutoclaveByChemical() {
			return qcService.getAllMicroNotSubmittedF014();
		}
		
		@GetMapping("/ValidationForAutoclaveChemistF014/getAllManagerNotSubmitted")
		public ResponseEntity<?> getAllManagerNotSubmittedValidationForAutoclaveByChemical() {
			return qcService.getAllManagerNotSubmittedF014();
		}
		
		@GetMapping("/ValidationForAutoclaveChemistF014/PrintForF014")
		public ResponseEntity<?> getPrintForF014ByDateMonthYear(
		        @RequestParam(required = false) String date,
		        @RequestParam(required = false) String month,
		        @RequestParam(required = false) String year,
		        @RequestParam(required = false) String eqIdNo) {
		    return qcService.getPrintValidationForAutoclaveByChemical(date, month, year,eqIdNo);
		}
		
//----------------------------------------------PH METER CALIBRATION REPORT PH-QCL01/F-006----------------------------------------------------------------		

		@PostMapping("/SavePhMeterCalibrationReportF006")
		public ResponseEntity<?> savePhMeterCalibrationReport(@RequestBody QcPhMeterCalibrationReportF006 report, HttpServletRequest request) {
			try {
				log.info("Received payload: {}", report);

				// Call the service method which returns ResponseEntity<?> 
				ResponseEntity<?> response = qcService.savePhMeterCalibrationReport(report, request);

				// Return the same response from service method
				return response;

			} catch (IllegalArgumentException e) {
				return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
			} catch (Exception e) {
				return new ResponseEntity<>("Failed to save Report.", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}


		@PostMapping("/SubmitPhMeterCalibrationReportF006")
		public ResponseEntity<?> submitPhMeterCalibrationReportF006(HttpServletRequest http,
				@Valid @RequestBody QcPhMeterCalibrationReportF006 qcPhMeterCalibrationReportF006, BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qcService.submitPhMeterCalibrationReport(qcPhMeterCalibrationReportF006, http);

			return response;
		}

	
		@PutMapping("/ApprovePhMeterCalibrationReportF006")
		public ResponseEntity<?> approvePhMeterCalibrationReportF006(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

			ResponseEntity<?> resp = qcService.approvePhMeterCalibrationReport(approvalResponse, http);
			return resp;
		}


		@GetMapping("/PhMeterCalibrationReportF006/GetByFormatId")
		public ResponseEntity<?> getPhMeterCalibrationReportByFormatId(@RequestParam String formatNo) {
			return qcService.getPhMeterCalibrationReportFormatNo(formatNo);
		}


		
		@GetMapping("/PhMeterCalibrationReportF006/GetByDateMonthYearEqNo")
		public ResponseEntity<?> getPhMeterCalibrationReportByDateMonthYear(
		        @RequestParam(required = false) String date,
		        @RequestParam(required = false) String month,
		        @RequestParam(required = false) String year,
		        @RequestParam(required = false) String eqIdNo) {
		    return qcService.getPhMeterCalibrationReportByDateMonthYear(date, month, year,eqIdNo);
		}



		@GetMapping("/PhMeterCalibrationReportF006/GetById/{id}")
		public ResponseEntity<?> getPhMeterCalibrationReportById(@PathVariable Long id) {
			return qcService.getPhMeterCalibrationReportById(id);
		}

		@GetMapping("/PhMeterCalibrationReportF006/GetAll")
		public ResponseEntity<?> getAllPhMeterCalibrationReport() {
			return qcService.getAllPhMeterCalibrationReport();
		}


		@GetMapping("/PhMeterCalibrationReportF006/getAllChemistNotSubmitted")
		public ResponseEntity<?> getAllChemistSubmittedNotApprovedPhMeterCalibrationReport(HttpServletRequest http) {
			return qcService.getAllChemistNotSubmittedF006();
		}

		@GetMapping("/PhMeterCalibrationReportF006/getAllQcNotSubmitted")
		public ResponseEntity<?> getAllQcNotSubmittedPhMeterCalibrationReport() {
			return qcService.getAllQcNotSubmittedF006();
		}	
		
		@GetMapping("/PhMeterCalibrationReportF006/GetByDateMonthYearEqId/print")
		public ResponseEntity<?> getPhMeterCalibrationReportForPrint(
		        @RequestParam(required = false) String date,
		        @RequestParam(required = false) String month,
		        @RequestParam(required = false) String year,
		        @RequestParam(required = false) String eqIdNo) {
		    return qcService.getPhMeterCalibrationReportForPrint(date, month, year,eqIdNo);
		}
		
//---------------------------------------------------- REAGENT PREPARATION RECORD PH-QCL01/F-017----------------------------------------
		

		@PostMapping("/SaveRegantPreparationReportF017")
		public ResponseEntity<?> saveRegantPreparationReportF017(@RequestBody QcReagentPreparationRecordF017 report, HttpServletRequest request) {
			try {
				log.info("Received payload: {}", report);

				// Call the service method which returns ResponseEntity<?> 
				ResponseEntity<?> response = qcService.saveRegantPreparationReportF017(report, request);

				// Return the same response from service method
				return response;

			} catch (IllegalArgumentException e) {
				return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
			} catch (Exception e) {
				return new ResponseEntity<>("Failed to save Report.", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}


		@PostMapping("/SubmitRegantPreparationReportF017")
		public ResponseEntity<?> submitRegantPreparationReportF017(HttpServletRequest http,
				@Valid @RequestBody QcReagentPreparationRecordF017 qcReagentPreparationRecordF017, BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qcService.submitRegantPreparationReportF017(qcReagentPreparationRecordF017, http);

			return response;
		}

					
		@PutMapping("/ApproveRegantPreparationReportF017")
		public ResponseEntity<?> approveRegantPreparationReportF017(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

			ResponseEntity<?> resp = qcService.approveRegantPreparationReportF017(approvalResponse, http);
			return resp;
		}
		
		
		@GetMapping("/RegantPreparationReportF017/GetByFormatId")
		public ResponseEntity<?> getRegantPreparationReportByFormatId(@RequestParam String formatNo) {
			return qcService.getRegantPreparationReportByFormatNo(formatNo);
		}



		@GetMapping("/RegantPreparationReportF017/GetByDateMonthYear")
		public ResponseEntity<?> getRegantPreparationReportByDateMonthYear(
				@RequestParam(required = false) String date,
				@RequestParam(required = false) String month,
				@RequestParam(required = false) String year) {
			return qcService.getRegantPreparationReportByDateMonthYear(date, month, year);
		}



		@GetMapping("/RegantPreparationReport/GetById/{id}")
		public ResponseEntity<?> getRegantPreparationReportById(@PathVariable Long id) {
			return qcService.getRegantPreparationReportById(id);
		}

		@GetMapping("/RegantPreparationReport/GetAll")
		public ResponseEntity<?> getAllRegantPreparationReport(HttpServletRequest http) {
			return qcService.getAllRegantPreparationReport(http);
		}


		@GetMapping("/RegantPreparationReport/getAllChemistNotSubmitted")
		public ResponseEntity<?> getAllChemistSubmittedNotApprovedRegantPreparationReport(HttpServletRequest http) {
			return qcService.getAllChemistNotApprovedRegantPreparationReportF017();
		}

		@GetMapping("/RegantPreparationReport/getAllQcNotSubmitted")
		public ResponseEntity<?> getAllQcNotSubmittedRegantPreparationReport(HttpServletRequest http) {
			return qcService.getAllQcNotSubmittedF017(http);
		}	

		@GetMapping("/RegantPreparationReport/GetByMonthYear/print")
		public ResponseEntity<?> getRegentPrepReportForPrint(
				@RequestParam(required = false) String month,
				@RequestParam(required = false) String year,
				HttpServletRequest http) {
			return qcService.getRegentPrepReportForPrint(month, year,http);
		}

//-----------------------------------------SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING REPORT DATA PH-QCL01/F-026----------------------------------------
		
		@PostMapping("/saveShelfLifePeriodReport")
		public ResponseEntity<?>  saveShelfLifePeriodReport(@RequestBody QcShelfLifePeriodPhysicChemMicroF026 report, HttpServletRequest request) {
			try {
				log.info("Received payload: {}", report);
				ResponseEntity<?> response =  qcService.saveShelfLifePeriodReportData(report,request);
				return response;
			} catch (IllegalArgumentException e) {
				return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
			} catch (Exception e) {
				return new ResponseEntity<>("Failed to save Shelf Life Period.", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		

		@PostMapping("/SubmitShelfLifePeriodReport")
		public ResponseEntity<?> SubmitShelfLifePeriodReport(HttpServletRequest http,
				@Valid @RequestBody QcShelfLifePeriodPhysicChemMicroF026 shelfLifePeriodPhysicChemMicroF026, BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qcService.submitShelfLifePeriodReportData(shelfLifePeriodPhysicChemMicroF026, http);

			return response;
		}
		
		

		@PutMapping("/approveShelfLifePeriodReport")
		public ResponseEntity<?> approveShelfLifePeriodReport(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
			
			ResponseEntity<?> resp = qcService.approveShelfLifePeriodReportData(approvalResponse, http);
			return resp;
		}


		@GetMapping("/ShelfLifePeriodReport/GetByFormatId")
		public ResponseEntity<?> getShelfLifePeriodReportFormatId(@RequestParam String formatNo) {
			return qcService.getShelfLifePeriodReportByFormatNo(formatNo);
		}


		@GetMapping("/ShelfLifePeriodReport/GetById/{id}")
		public ResponseEntity<?> getShelfLifePeriodReportById(@PathVariable Long id) {
			return qcService.getShelfLifePeriodReportDataById(id);
		}


		@GetMapping("/ShelfLifePeriodReport/GetAll")
		public ResponseEntity<?> getAllShelfLifePeriodReport() {
			return qcService.getAllShelfLifePeriodReport();
		}
		
		
		@GetMapping("/ShelfLifePeriodReport/getAllChemistAndMicroNotSubmitted")
		public ResponseEntity<?> getAllChemistAndMicroNotSubmittedF026() {
			return qcService.getAllChemistAndMicroNotSubmittedF026();
		}
		
		
		@GetMapping("/ShelfLifePeriodReport/getAllQcNotSubmitted")
		public ResponseEntity<?> getAllQcNotSubmittedF026() {
			return qcService.getAllQcNotSubmittedF026();
		}

		@GetMapping("/ShelfLifePeriodReport/ByProdDateTestingDateForF026")
		public ResponseEntity<?> getPrintForF026ForProdDateTestingDateYear(
		        @RequestParam(required = false) String productionDate,
		        @RequestParam(required = false) String testingDate,
		        @RequestParam(required = false) String lotNo,
		        @RequestParam(required = false) String year) {
		    return qcService.getShelfLifePeriodReportByDateYear(productionDate, testingDate,lotNo,year);
		}

		@GetMapping("/ShelfLifePeriodReport/PrintForF026")
		public ResponseEntity<?> getPrintForF026ForPrint(
		        @RequestParam(required = false) String productionDate,
		        @RequestParam(required = false) String testingDate,
		        @RequestParam(required = false) String lotNo,
		        @RequestParam(required = false) String year) {
		    return qcService.getShelfLifePeriodReportForPrint(productionDate, testingDate,lotNo, year);
		}
		
		@GetMapping("/ShelfLifePeriodReport/GetExistingDetailsByLotNo")
		public ResponseEntity<?> getShelfLifePeriodReportById(@RequestParam String lotNo) {
			return qcService.getShelfLifePeriodExistingReportByLot(lotNo);
		}
		
//------------------------------------ MEDIA GROWTH PROMOTION TEST REPORT PH-QCL01/F-021---------------------------------------------------
		
		@PostMapping("/SaveMediaGrowthF010Report")
		public ResponseEntity<?> saveMediaGrowthF021Report(@RequestBody Qc_MediaGrowthPromotionTestReportF021 report, HttpServletRequest request) {
			try {
				log.info("Received payload: {}", report);

				// Call the service method which returns ResponseEntity<?> 
				ResponseEntity<?> response = qcService.saveMediaGrowthReport(report, request);

				// Return the same response from service method
				return response;

			} catch (IllegalArgumentException e) {
				return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
			} catch (Exception e) {
				return new ResponseEntity<>("Failed to save Report.", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}


		@PostMapping("/SubmitMediaGrowthF010Report")
		public ResponseEntity<?> submitMediaGrowthF021Report(HttpServletRequest http,
				@Valid @RequestBody Qc_MediaGrowthPromotionTestReportF021 mediaGrowthPromotionTestReportF021, BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qcService.submitMediaGrowthReportF021(mediaGrowthPromotionTestReportF021, http);

			return response;
		}

	
		@PutMapping("/ApproveMediaGrowthF021Report")
		public ResponseEntity<?> approveMediaGrowthF021Report(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

			ResponseEntity<?> resp = qcService.approveMediaGrowthReportF021(approvalResponse, http);
			return resp;
		}

		//working
		@GetMapping("/MediaGrowthF021Report/GetByFormatId")
		public ResponseEntity<?> getMediaGrowthReportF021ByFormatId(@RequestParam String formatNo) {
			return qcService.getMediaGrowthReportF021FormatNo(formatNo);
		}


		@GetMapping("/MediaGrowthF021Report/GetByIncubationStartOn")
		public ResponseEntity<?> getMediaGrowthReportF021ByMonthYear(
				@RequestParam(required = false) String incubationStartOn) {
			return qcService.getMediaGrowthReportF021ByIncubationDate( incubationStartOn);
		}


		
		@GetMapping("/MediaGrowthF021Report/GetById/{id}")
		public ResponseEntity<?> getMediaGrowthReportF021ById(@PathVariable Long id) {
			return qcService.getMediaGrowthReportF021ById(id);
		}

		
		@GetMapping("/MediaGrowthF021Report/GetAll")
		public ResponseEntity<?> getAllMediaGrowthReportF021Report() {
			return qcService.getAllMediaGrowthReportF021Report();
		}

	
		@GetMapping("/MediaGrowthF021Report/getAllMicroNotSubmitted")
		public ResponseEntity<?> getAllMicroNotSubmittedWiraFiberFinenessF010() {
			return qcService.getAllMicroNotSubmittedF021();
		}

		@GetMapping("/MediaGrowthF021Report/getAllManagerNotSubmitted")
		public ResponseEntity<?> getAllManagerNotSubmittedF021Report() {
			return qcService.getAllManagerNotSubmittedF021();
		}	

		@GetMapping("/MediaGrowthF021Report/GetByIncubationStartOnMonthYear/print")
		public ResponseEntity<?> getMediaGrowthReportF021ReportForPrint(
				@RequestParam(required = false) String incubationStartOn,
				@RequestParam(required = false) String month,
				@RequestParam(required = false) String year) {
			return qcService.getMediaGrowthReportF021ReportForPrint(incubationStartOn,month, year);
		}	
		
//---------------------------------------------MEDIA PREPARATION & CONSUMPTION RECORD (PH-QCL01/F-019)---------------------------------------------
		
		@PostMapping("/SaveMediaPreparationF019")
		public ResponseEntity<?> saveMediaGrowthPreparationF019(@RequestBody Qc_MediaPreparationAndConsumptionRecordF019 report, HttpServletRequest request) {
			try {
				log.info("Received payload: {}", report);

				// Call the service method which returns ResponseEntity<?> 
				ResponseEntity<?> response = qcService.saveMediaPrepRecordF019(report, request);

				// Return the same response from service method
				return response;

			} catch (IllegalArgumentException e) {
				return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
			} catch (Exception e) {
				return new ResponseEntity<>("Failed to save Report.", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}	
		
		@PostMapping("/SubmitMediaPreparationF019")
		public ResponseEntity<?> submitMediaGrowthPreparationF019(HttpServletRequest http,
				@Valid @RequestBody Qc_MediaPreparationAndConsumptionRecordF019 mediaPreparationRecordF019, BindingResult result, Principal principal) {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			ResponseEntity<?> response = qcService.submitMediaPrepRecordF019(mediaPreparationRecordF019, http);

			return response;
		}
		
		@PutMapping("/ApproveMediaPreparationF019")
		public ResponseEntity<?> approveMediaGrowthPreparationF019(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

			ResponseEntity<?> resp = qcService.approveMediaPrepRecordF019(approvalResponse, http);
			return resp;
		}
		
		//working
		@GetMapping("/MediaPreparationF019/GetByFormatId")
		public ResponseEntity<?> getMediaGrowthPreparationF019ByFormatId(@RequestParam String formatNo) {
			return qcService.getMediaPrepRecordF019ByFormatNo(formatNo);
		}
		
		@GetMapping("/MediaPreparationF019/GetByPreparationDateAndLoadno")
		public ResponseEntity<?> getMediaGrowthPreparationF019ByPreparationdateLoadno(
				@RequestParam(required = false) String preparationDate,
				@RequestParam(required = false) String loadNo) {
			return qcService.getMediaPrepRecordF019ByPreparationmDateOrLoadNo(preparationDate,loadNo);
		}
		
		@GetMapping("/MediaPreparationF019/GetById/{id}")
		public ResponseEntity<?> getMediaGrowthPreparationF019ById(@PathVariable Long id) {
			return qcService.getMediaPrepRecordF019ById(id);
		}
		
		@GetMapping("/MediaPreparationF019/GetAll")
		public ResponseEntity<?> getAllMediaGrowthPreparationF019Report() {
			return qcService.getAllMediaPrepRecordF019Report();
		}
		

		@GetMapping("/MediaPreparationF019/getAllMicroNotSubmitted")
		public ResponseEntity<?> getAllMediaGrowthPreparationF019() {
			return qcService.getAllMicroNotSubmittedF019();
		}
		
		@GetMapping("/MediaPreparationF019/getAllManagerNotSubmitted")
		public ResponseEntity<?> getAllManagerNotSubmittedF019Report() {
			return qcService.getAllManagerNotSubmittedF019();
		}	
		
		@GetMapping("/MediaPreparationF019/GetByPreparationDateLoadNoMonthYear/print")
		public ResponseEntity<?> getMediaGrowthReportF021ReportForPrint(
				@RequestParam(required = false) String preparationDate,
				@RequestParam(required = false) String loadNo,
				@RequestParam(required = false) String month,
				@RequestParam(required = false) String year) {
			return qcService.getMediaPrepRecordF019ReportForPrint(preparationDate,loadNo,month, year);
		}	
		
}

